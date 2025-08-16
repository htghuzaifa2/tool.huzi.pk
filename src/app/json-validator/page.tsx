
"use client"

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertTriangle, Braces, BookOpen, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function JsonValidatorPage() {
    const [jsonInput, setJsonInput] = useState('{\n  "name": "John Doe",\n  "age": 30,\n  "isStudent": false,\n  "courses": ["Math", "Science"]\n}');
    const jsonValidatorGuide = guides.find(g => g.href.includes('json-validator'));

    const validationResult = useMemo(() => {
        if (!jsonInput.trim()) {
            return { isValid: null, message: 'Paste your JSON data above to validate.' };
        }
        try {
            JSON.parse(jsonInput);
            return { isValid: true, message: 'The JSON is well-formed and valid.' };
        } catch (error: any) {
            return { isValid: false, message: `Error: ${error.message}` };
        }
    }, [jsonInput]);

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-2xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Braces className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">JSON Validator</CardTitle>
                        <CardDescription>Paste your JSON to validate it and check for errors.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Textarea
                            placeholder='{"key": "value"}'
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            className="min-h-[300px] font-mono text-sm"
                        />
                        
                        {validationResult.isValid === true && (
                             <Alert variant="default" className="border-green-500/50 text-green-700 dark:border-green-500/60 dark:text-green-300 [&>svg]:text-green-600 dark:[&>svg]:text-green-400">
                                <CheckCircle2 className="h-4 w-4" />
                                <AlertTitle className="font-semibold">Valid JSON</AlertTitle>
                                <AlertDescription>
                                    {validationResult.message}
                                </AlertDescription>
                            </Alert>
                        )}

                        {validationResult.isValid === false && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle className="font-semibold">Invalid JSON</AlertTitle>
                                <AlertDescription>
                                    {validationResult.message}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>

                 {jsonValidatorGuide && (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" className="border-none flex flex-col items-center">
                            <AccordionTrigger asChild>
                                <Button variant="outline" className="w-fit">
                                    <span>
                                        <BookOpen className="mr-2 h-5 w-5 inline-block"/>Read The Guide
                                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 ml-2" />
                                    </span>
                                </Button>
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{jsonValidatorGuide.title}</CardTitle>
                                        <CardDescription>{jsonValidatorGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {jsonValidatorGuide.steps.map((step, stepIndex) => (
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
