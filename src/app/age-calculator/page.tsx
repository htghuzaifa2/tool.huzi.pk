
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from "lucide-react";
import { intervalToDuration } from 'date-fns';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";
import { FancyAccordionButton } from '@/components/ui/fancy-accordion-button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Age Calculator – tool.huzi.pk",
  description: "Find out your exact age in years, months, and days by entering your date of birth. A free and simple online age calculation tool.",
};

export default function AgeCalculatorPage() {
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState<{ years?: number; months?: number; days?: number } | null>(null);
    const [error, setError] = useState('');
    const ageCalculatorGuide = guides.find(g => g.href.includes('age-calculator'));

    const handleGuideClick = () => {
        // The content is not immediately available, so we wait for the next render tick.
        requestAnimationFrame(() => {
            const guideElement = document.getElementById('guide-section');
            if (guideElement) {
                const yOffset = -80; // a little space from the top
                const y = guideElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        });
    };

    const calculateAge = () => {
        setError('');
        setAge(null);

        if (!birthDate) {
            setError('Please enter your date of birth.');
            return;
        }

        const today = new Date();
        const birth = new Date(birthDate);

        if (birth > today) {
            setError('Date of birth cannot be in the future.');
            return;
        }
        
        const ageDuration = intervalToDuration({ start: birth, end: today });
        setAge(ageDuration);
    };

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl font-bold font-headline">Age Calculator</CardTitle>
                        <CardDescription>Find out your exact age, down to the day.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="pl-10"
                                max={new Date().toISOString().split("T")[0]}
                            />
                        </div>

                        <Button onClick={calculateAge} size="lg" className="w-full">Calculate Age</Button>
                        
                        {error && <p className="text-red-500 text-center">{error}</p>}

                        {age && (
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-4xl font-bold">{age.years || 0}</CardTitle>
                                        <p className="text-muted-foreground">Years</p>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-4xl font-bold">{age.months || 0}</CardTitle>
                                        <p className="text-muted-foreground">Months</p>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-4xl font-bold">{age.days || 0}</CardTitle>
                                        <p className="text-muted-foreground">Days</p>
                                    </CardHeader>
                                </Card>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {ageCalculatorGuide && (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" id="guide-section" className="border-none flex flex-col items-center">
                            <AccordionTrigger onClick={handleGuideClick}>
                                <FancyAccordionButton />
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{ageCalculatorGuide.title}</CardTitle>
                                        <CardDescription>{ageCalculatorGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {ageCalculatorGuide.steps.map((step, stepIndex) => (
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
