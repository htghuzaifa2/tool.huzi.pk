
"use client"

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Gift, Play, Plus, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";
import { FancyAccordionButton } from '@/components/ui/fancy-accordion-button';
import confetti from 'canvas-confetti';
import { ScrollArea } from '@/components/ui/scroll-area';

// New, more professional color palettes for the wheel
const themeColors = {
    light: ['#5E5CE6', '#7879F1', '#4831D4', '#6C63FF', '#3D3B94', '#939DFF'],
    dark: ['#63E6BE', '#A6F6E2', '#42D9A7', '#25B88A', '#74E8C0', '#1A9E72'],
    blue: ['#00A6FB', '#4DBFFF', '#0081C9', '#80D4FF', '#0093E0', '#B3E5FF'],
    orange: ['#FF8F00', '#FFA726', '#FFB74D', '#FF6F00', '#FFC107', '#FFD54F'],
};

const getCurrentThemeColors = () => {
    if (typeof window === 'undefined') return themeColors.dark;
    const body = document.documentElement;
    if (body.classList.contains('theme-blue')) return themeColors.blue;
    if (body.classList.contains('theme-orange')) return themeColors.orange;
    if (body.classList.contains('light')) return themeColors.light;
    return themeColors.dark;
}

export default function RandomPickerWheelPage() {
    const [newOption, setNewOption] = useState('');
    const [options, setOptions] = useState<string[]>(['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry', 'Mango']);
    const [isSpinning, setIsSpinning] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { toast } = useToast();
    const pickerWheelGuide = guides.find(g => g.href.includes('random-picker-wheel'));
    const [currentAngle, setCurrentAngle] = useState(0);
    const [colors, setColors] = useState(themeColors.dark);

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
        const textRadius = outsideRadius * 0.7;
        const center = canvas.width / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < options.length; i++) {
            const angle = i * arc;
            ctx.fillStyle = colors[i % colors.length];

            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.arc(center, center, outsideRadius, angle, angle + arc, false);
            ctx.closePath();
            ctx.fill();

            // Add a subtle border to each segment for better definition
            ctx.strokeStyle = 'hsl(var(--background))';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.save();
            ctx.fillStyle = "hsl(var(--card-foreground))";
            ctx.font = 'bold 16px Inter, sans-serif';
            ctx.translate(
                center + textRadius * Math.cos(angle + arc / 2),
                center + textRadius * Math.sin(angle + arc / 2)
            );
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            const text = options[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }

    }, [options, colors]);
    
    useEffect(() => {
        setColors(getCurrentThemeColors());
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setColors(getCurrentThemeColors());
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const resizeCanvas = () => {
          const canvas = canvasRef.current;
          if (canvas && canvas.parentElement) {
            const size = Math.min(canvas.parentElement.clientWidth, 450);
            canvas.width = size;
            canvas.height = size;
            drawWheel();
          }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [drawWheel]);
    
     useEffect(() => {
        drawWheel();
    }, [options, colors, drawWheel]);

    const handleAddOption = () => {
        if (newOption.trim() === '') {
            toast({ title: "Option cannot be empty.", variant: "destructive" });
            return;
        }
        setOptions([...options, newOption.trim()]);
        setNewOption('');
    }
    
    const handleRemoveOption = (indexToRemove: number) => {
        setOptions(options.filter((_, index) => index !== indexToRemove));
    }

    const handleSpin = () => {
        if (isSpinning || options.length < 2) return;
        
        setIsSpinning(true);
        
        const winnerIndex = Math.floor(Math.random() * options.length);
        const winner = options[winnerIndex];
        const arcSize = 360 / options.length;
        
        const randomOffset = (Math.random() - 0.5) * arcSize * 0.8;
        const stopAngle = (winnerIndex * arcSize) + (arcSize / 2) - 90 + randomOffset;
        
        const totalRotations = Math.floor(Math.random() * 5) + 8;
        const finalAngle = (totalRotations * 360) + (360 - stopAngle);

        setCurrentAngle(prev => prev + finalAngle);
        
        setTimeout(() => {
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
        }, 6000);
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-6xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Gift className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Random Picker Wheel</CardTitle>
                        <CardDescription>Add a list of options, spin the wheel, and let fate decide a winner!</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="new-option-input">Add an Option</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="new-option-input"
                                        placeholder="Enter a new option..."
                                        value={newOption}
                                        onChange={(e) => setNewOption(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddOption()}
                                        disabled={isSpinning}
                                    />
                                    <Button onClick={handleAddOption} disabled={isSpinning}><Plus className="h-4 w-4" /></Button>
                                </div>
                            </div>
                            <ScrollArea className="h-72 w-full rounded-md border p-2">
                                <div className="space-y-2">
                                    {options.length > 0 ? options.map((option, index) => (
                                        <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                                            <span className="truncate pr-2">{option}</span>
                                            <Button variant="ghost" size="icon" onClick={() => handleRemoveOption(index)} disabled={isSpinning}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    )) : (
                                        <p className="text-muted-foreground text-center py-12">Add some options to get started!</p>
                                    )}
                                </div>
                            </ScrollArea>
                             <Button onClick={handleSpin} disabled={isSpinning || options.length < 2} size="lg" className="w-full">
                                <Play className="mr-2" /> {isSpinning ? 'Spinning...' : 'Spin The Wheel'}
                            </Button>
                        </div>
                        <div className="relative flex items-center justify-center w-full min-h-[300px] md:min-h-[450px] overflow-hidden">
                            <div 
                                className="absolute top-0 left-1/2 -translate-x-1/2 z-10" 
                                style={{
                                    borderLeft: '15px solid transparent',
                                    borderRight: '15px solid transparent',
                                    borderTop: '30px solid hsl(var(--destructive))',
                                    filter: 'drop-shadow(0px -2px 2px rgba(0,0,0,0.2))'
                                }}
                            ></div>
                           <canvas 
                                ref={canvasRef}
                                style={{
                                    transform: `rotate(${currentAngle}deg)`,
                                    transition: isSpinning ? 'transform 6s cubic-bezier(0.2, 0.8, 0.4, 1)' : 'none',
                                }}
                           ></canvas>
                           <Button 
                             onClick={handleSpin}
                             disabled={isSpinning || options.length < 2}
                             className="absolute z-10 w-24 h-24 rounded-full border-4 border-background text-lg font-bold shadow-lg"
                             variant="secondary"
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

    