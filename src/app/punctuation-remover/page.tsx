"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, Copy, Eraser, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function PunctuationRemoverPage() {
    const [inputText, setInputText] = useState('Hello, world! This is a test. Isn\'t it great?');
    const [outputText, setOutputText] = useState('');
    const { toast } = useToast();
    const punctuationRemoverGuide = guides.find(g => g.href.includes('punctuation-remover'));

    const handleRemovePunctuation = () => {
        if (!inputText.trim()) {
            toast({
                title: 'Nothing to Process',
                description: 'Please enter some text first.',
                variant: 'destructive',
            });
            return;
        }

        try {
            // Regex to match most common punctuation marks
            const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g;
            const result = inputText.replace(punctuationRegex, '');
            setOutputText(result);
            toast({
                title: 'Success!',
                description: 'Punctuation has been removed.',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An unexpected error occurred.',
                variant: 'destructive',
            });
        }
    };

    const copyToClipboard = () => {
        if (!outputText) {
            toast({
                title: "Nothing to Copy",
                description: "There is no output text to copy.",
                variant: "destructive"
            });
            return;
        }
        navigator.clipboard.writeText(outputText);
        toast({
            title: "Copied!",
            description: "The text has been copied to your clipboard.",
        });
    };

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Eraser className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Punctuation Remover</CardTitle>
                        <CardDescription>Remove all punctuation marks from your text with a single click.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                           <label className="font-medium">Original Text</label>
                           <Textarea
                                placeholder="Enter text with punctuation..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="min-h-[200px] font-mono text-sm"
                           />
                        </div>
                        
                        <div className="text-center">
                            <Button onClick={handleRemovePunctuation} size="lg">
                                <Eraser className="mr-2" /> Remove Punctuation
                            </Button>
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <label className="font-medium">Cleaned Text</label>
                                <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!outputText}>
                                    <Copy className="h-5 w-5" />
                                </Button>
                            </div>
                           <Textarea
                                placeholder="Text without punctuation will appear here..."
                                value={outputText}
                                readOnly
                                className="min-h-[200px] font-mono text-sm bg-muted"
                           />
                        </div>
                    </CardContent>
                </Card>

                {punctuationRemoverGuide && (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" className="border-none flex flex-col items-center">
                            <AccordionTrigger asChild>
                               <div className="flex justify-center">
                                    <Button
                                    size="lg"
                                    variant="ghost"
                                    className="relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-foreground group bg-gradient-to-br from-primary via-accent to-destructive group-hover:from-primary/90 group-hover:via-accent/90 group-hover:to-destructive/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40"
                                    >
                                    <span className="relative flex items-center px-6 py-3 transition-all ease-in duration-200 bg-background rounded-md group-hover:bg-opacity-0">
                                        <BookOpen className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                                        Read The Guide
                                    </span>
                                    </Button>
                               </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{punctuationRemoverGuide.title}</CardTitle>
                                        <CardDescription>{punctuationRemoverGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {punctuationRemoverGuide.steps.map((step, stepIndex) => (
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
