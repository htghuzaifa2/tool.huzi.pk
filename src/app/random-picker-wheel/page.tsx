
"use client"

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Gift, Play, RotateCw } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";
import { FancyAccordionButton } from '@/components/ui/fancy-accordion-button';
import confetti from 'canvas-confetti';

const colors = [
  "#FFC107", "#FF5722", "#E91E63", "#9C27B0", "#3F51B5", 
  "#2196F3", "#00BCD4", "#4CAF50", "#CDDC39", "#FF9800"
];

export default function RandomPickerWheelPage() {
    const [optionsText, setOptionsText] = useState('Apple\nBanana\nOrange\nGrape\nStrawberry\nMango');
    const [options, setOptions] = useState<string[]>([]);
    const [isSpinning, setIsSpinning] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();
    const pickerWheelGuide = guides.find(g => g.href.includes('random-picker-wheel'));

    const handleGuideClick = () => {
        requestAnimationFrame(() => {
            const guideElement = document.getElementById('guide-section');
            if (guideElement) {
                const yOffset = -80;
                const y = guideElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    };

    const drawWheel = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !options.length) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const arc = Math.PI / (options.length / 2);
        const startAngle = 0;
        const outsideRadius = 200;
        const textRadius = 160;
        const insideRadius = 50;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.font = 'bold 16px Arial';
        
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        for (let i = 0; i < options.length; i++) {
            const angle = startAngle + i * arc;
            ctx.fillStyle = colors[i % colors.length];

            ctx.beginPath();
            ctx.arc(0, 0, outsideRadius, angle, angle + arc, false);
            ctx.arc(0, 0, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();

            ctx.save();
            ctx.fillStyle = "white";
            ctx.translate(
                textRadius * Math.cos(angle + arc / 2),
                textRadius * Math.sin(angle + arc / 2)
            );
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            const text = options[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }
        ctx.restore();

        // Draw pointer
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + outsideRadius + 5, canvas.height / 2);
        ctx.lineTo(canvas.width / 2 + outsideRadius - 20, canvas.height / 2 - 10);
        ctx.lineTo(canvas.width / 2 + outsideRadius - 20, canvas.height / 2 + 10);
        ctx.fill();

    }, [options]);

    useEffect(() => {
        const parsedOptions = optionsText.split('\n').map(o => o.trim()).filter(Boolean);
        setOptions(parsedOptions);
    }, [optionsText]);

    useEffect(() => {
        drawWheel();
    }, [drawWheel]);

    const handleSpin = () => {
        if (isSpinning || options.length < 2) return;
        
        setIsSpinning(true);
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        let angle = 0;
        const spinAngleStart = Math.random() * 10 + 10; // Random start velocity
        let spinTime = 0;
        const spinTimeTotal = Math.random() * 3000 + 4000; // Random duration

        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        
        const rotateWheel = () => {
            spinTime += 20;
            if (spinTime >= spinTimeTotal) {
                // finished
                const degrees = (angle * 180) / Math.PI;
                const arcd = (Math.PI / (options.length / 2)) * 180 / Math.PI;
                const index = Math.floor(((360 - degrees % 360) % 360) / arcd);
                const winner = options[index];
                
                toast({
                    title: "We have a winner!",
                    description: `Congratulations to: ${winner}`,
                });
                
                confetti({
                    particleCount: 150,
                    spread: 90,
                    origin: { y: 0.6 }
                });

                setIsSpinning(false);
                return;
            }

            const spinAngle = spinAngleStart - easeOut(spinTime / spinTimeTotal) * spinAngleStart;
            angle += (spinAngle * Math.PI) / 180;
            canvas.style.transform = `rotate(${angle}rad)`;
            requestAnimationFrame(rotateWheel);
        };
        
        rotateWheel();
    };


    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Gift className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Random Picker Wheel</CardTitle>
                        <CardDescription>Add a list of options, spin the wheel, and let fate decide a winner!</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <Label htmlFor="options-input">Enter options (one per line)</Label>
                            <Textarea
                                id="options-input"
                                placeholder="Option 1\nOption 2\nOption 3"
                                value={optionsText}
                                onChange={(e) => setOptionsText(e.target.value)}
                                className="min-h-[250px] font-mono"
                                disabled={isSpinning}
                            />
                             <Button onClick={handleSpin} disabled={isSpinning || options.length < 2} className="w-full" size="lg">
                                <Play className="mr-2" /> {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
                            </Button>
                        </div>
                        <div className="flex items-center justify-center h-[450px]">
                           <canvas ref={canvasRef} width="450" height="450" className="transition-transform duration-[4000ms] ease-out"></canvas>
                        </div>
                    </CardContent>
                </Card>

                {pickerWheelGuide && (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" id="guide-section" className="border-none flex flex-col items-center">
                            <AccordionTrigger onClick={handleGuideClick}>
                                <FancyAccordionButton />
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{pickerWheelGuide.title}</CardTitle>
                                        <CardDescription>{pickerWheelGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {pickerWheelGuide.steps.map((step, stepIndex) => (
                                                <li key={stepIndex}>{step}</li>
                                            ))}
                                        </ol>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
            </div>
        </div>
    );
}
