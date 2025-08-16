
"use client"

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { diffChars } from 'diff';
import { GitCompareArrows, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function TextDiffHighlighterPage() {
    const [originalText, setOriginalText] = useState('This is the original text.\nIt has two lines.');
    const [changedText, setChangedText] = useState('This is the updated text.\nIt has two lines and some changes.');
    const textDiffGuide = guides.find(g => g.href.includes('text-diff-highlighter'));

    const differences = useMemo(() => {
        return diffChars(originalText, changedText);
    }, [originalText, changedText]);

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-6xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <GitCompareArrows className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Text Difference Highlighter</CardTitle>
                        <CardDescription>Compare two blocks of text and see the differences highlighted below.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="font-medium">Original Text</label>
                                <Textarea
                                    placeholder="Paste the first version of your text here."
                                    value={originalText}
                                    onChange={(e) => setOriginalText(e.target.value)}
                                    className="min-h-[250px] font-mono text-sm"
                                />
                            </div>
                             <div className="space-y-2">
                                <label className="font-medium">Changed Text</label>
                                <Textarea
                                    placeholder="Paste the second version of your text here."
                                    value={changedText}
                                    onChange={(e) => setChangedText(e.target.value)}
                                    className="min-h-[250px] font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-medium text-center block">Highlighted Differences</label>
                            <Card className="min-h-[250px] bg-muted">
                                <CardContent className="p-4">
                                    <pre className="whitespace-pre-wrap font-mono text-sm">
                                        {differences.map((part, index) => {
                                            const colorClass = part.added
                                                ? 'bg-green-500/20 text-green-800 dark:text-green-200'
                                                : part.removed
                                                ? 'bg-red-500/20 text-red-800 dark:text-red-200 line-through'
                                                : 'text-muted-foreground';
                                            return (
                                                <span key={index} className={colorClass}>
                                                    {part.value}
                                                </span>
                                            );
                                        })}
                                    </pre>
                                </CardContent>
                            </Card>
                             <div className="flex justify-center items-center gap-6 mt-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 rounded-sm bg-green-500/20"></span>
                                    <span>Added</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 rounded-sm bg-red-500/20"></span>
                                    <span>Removed</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {textDiffGuide && (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" className="border-none flex flex-col items-center">
                            <AccordionTrigger asChild>
                                <button className="relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-foreground group bg-gradient-to-br from-primary via-accent to-destructive group-hover:from-primary/90 group-hover:via-accent/90 group-hover:to-destructive/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40 h-11 px-8">
                                    <span className="relative flex items-center px-6 py-3 transition-all ease-in duration-200 bg-background rounded-md group-hover:bg-opacity-0">
                                        <BookOpen className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                                        Read The Guide
                                    </span>
                                </button>
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{textDiffGuide.title}</CardTitle>
                                        <CardDescription>{textDiffGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {textDiffGuide.steps.map((step, stepIndex) => (
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
