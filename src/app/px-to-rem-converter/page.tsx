
"use client"

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Scaling, ArrowRightLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function PxToRemConverterPage() {
    const [pixels, setPixels] = useState('16');
    const [rems, setRems] = useState('1');
    const [baseSize, setBaseSize] = useState('16');
    const [lastChanged, setLastChanged] = useState<'px' | 'rem'>('px');
    const pxToRemGuide = guides.find(g => g.href.includes('px-to-rem-converter'));

    useEffect(() => {
        const base = parseFloat(baseSize);
        if (isNaN(base) || base <= 0) return;

        if (lastChanged === 'px') {
            const pxValue = parseFloat(pixels);
            if (!isNaN(pxValue)) {
                setRems((pxValue / base).toString());
            } else {
                setRems('');
            }
        } else { // lastChanged === 'rem'
            const remValue = parseFloat(rems);
            if (!isNaN(remValue)) {
                setPixels((remValue * base).toString());
            } else {
                setPixels('');
            }
        }
    }, [pixels, rems, baseSize, lastChanged]);
    
    const handlePixelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPixels(e.target.value);
        setLastChanged('px');
    }

    const handleRemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRems(e.target.value);
        setLastChanged('rem');
    }

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Scaling className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Pixel to Rem Converter</CardTitle>
                        <CardDescription>Convert pixel values to rems and vice versa for responsive design.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="text-center">
                            <Label htmlFor="base-size">Base Font Size (px)</Label>
                            <Input 
                                id="base-size"
                                type="number" 
                                value={baseSize} 
                                onChange={(e) => setBaseSize(e.target.value)}
                                className="w-32 mx-auto mt-2 text-center text-lg"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="w-full space-y-2">
                                <Label htmlFor="pixels" className="font-medium">Pixels (px)</Label>
                                <Input 
                                    id="pixels" 
                                    type="number"
                                    value={pixels}
                                    onChange={handlePixelChange}
                                    className="text-lg"
                                />
                            </div>
                            
                            <div className="pt-8">
                                <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
                            </div>

                            <div className="w-full space-y-2">
                                <Label htmlFor="rems" className="font-medium">Rems (rem)</Label>
                                <Input 
                                    id="rems" 
                                    type="number"
                                    value={rems}
                                    onChange={handleRemChange}
                                    className="text-lg"
                                />
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {pxToRemGuide && (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" className="border-none flex flex-col items-center">
                            <AccordionTrigger className="relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-foreground group bg-gradient-to-br from-primary via-accent to-destructive group-hover:from-primary/90 group-hover:via-accent/90 group-hover:to-destructive/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40 h-11 px-8">
                                <span className="relative flex items-center px-6 py-3 transition-all ease-in duration-200 bg-background rounded-md group-hover:bg-opacity-0">
                                    <BookOpen className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                                    Read The Guide
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{pxToRemGuide.title}</CardTitle>
                                        <CardDescription>{pxToRemGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {pxToRemGuide.steps.map((step, stepIndex) => (
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
