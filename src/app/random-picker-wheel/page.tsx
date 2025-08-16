
"use client"

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Gift, Play } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";
import { FancyAccordionButton } from '@/components/ui/fancy-accordion-button';
import confetti from 'canvas-confetti';

const colors = ["#3F51B5", "#7952B3", "#5C6BC0", "#9575CD", "#7E8CCB", "#B3A2D8"];


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
        
        const arc = Math.PI * 2 / options.length;
        const outsideRadius = canvas.width / 2 - 10;
        const textRadius = outsideRadius * 0.75;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.font = 'bold 16px Inter, sans-serif';
        
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);

        for (let i = 0; i < options.length; i++) {
            const angle = i * arc;
            ctx.fillStyle = colors[i % colors.length];

            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.arc(0, 0, outsideRadius, angle, angle + arc, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

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
        
        // Pointer
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.moveTo(outsideRadius - 5, -4);
        ctx.lineTo(outsideRadius + 15, 0);
        ctx.lineTo(outsideRadius - 5, 4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

    }, [options]);

    useEffect(() => {
        const parsedOptions = optionsText.split('\n').map(o => o.trim()).filter(Boolean);
        setOptions(parsedOptions);
    }, [optionsText]);

    useEffect(() => {
        const resizeCanvas = () => {
          const canvas = canvasRef.current;
          if (canvas) {
            const size = Math.min(canvas.parentElement!.clientWidth * 0.9, 450);
            canvas.width = size;
            canvas.height = size;
            drawWheel();
          }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [drawWheel]);

    const handleSpin = () => {
        if (isSpinning || options.length < 2) return;
        
        setIsSpinning(true);
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const spinAngleStart = Math.random() * 10 + 10;
        let spinTime = 0;
        const spinTimeTotal = Math.random() * 4000 + 5000;
        let currentAngle = parseFloat(canvas.dataset.rotation || '0');

        const easeOut = (t: number, b: number, c: number, d: number) => {
            const ts = (t /= d) * t;
            const tc = ts * t;
            return b + c * (tc + -3 * ts + 3 * t);
        };
        
        const rotateWheel = () => {
            spinTime += 20;
            if (spinTime >= spinTimeTotal) {
                const arcSize = 360 / options.length;
                const finalAngle = currentAngle % 360;
                const winningSegment = Math.floor((360 - finalAngle) / arcSize);
                const winner = options[winningSegment];
                
                toast({
                    title: "We have a winner!",
                    description: `Congratulations to: ${winner}`,
                });
                
                confetti({
                    particleCount: 150,
                    spread: 90,
                    origin: { y: 0.6 }
                });

                canvas.dataset.rotation = String(currentAngle);
                setIsSpinning(false);
                return;
            }

            const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
            currentAngle += spinAngle;
            canvas.style.transform = `rotate(${currentAngle}deg)`;
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
                        <div className="space-y-4 md:order-last">
                            <Label htmlFor="options-input">Enter options (one per line)</Label>
                            <Textarea
                                id="options-input"
                                placeholder="Option 1\nOption 2\nOption 3"
                                value={optionsText}
                                onChange={(e) => setOptionsText(e.target.value)}
                                className="min-h-[250px] font-mono"
                                disabled={isSpinning}
                            />
                        </div>
                        <div className="relative flex items-center justify-center w-full min-h-[300px] md:min-h-[450px]">
                           <canvas ref={canvasRef} className="transition-transform duration-[5000ms] ease-out"></canvas>
                           <Button 
                             onClick={handleSpin}
                             disabled={isSpinning || options.length < 2}
                             className="absolute z-10 w-24 h-24 rounded-full border-4 border-background text-lg font-bold shadow-lg"
                           >
                             SPIN
                           </Button>
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
