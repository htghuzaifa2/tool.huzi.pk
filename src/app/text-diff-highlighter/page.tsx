
"use client"

import { useState, useMemo, ReactNode } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { diffChars } from 'diff';
import { GitCompareArrows, BookOpen, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function TextDiffHighlighterPage() {
    const [originalText, setOriginalText] = useState('This is the original text.\nIt has two lines.');
    const [changedText, setChangedText] = useState('This is the updated text.\nIt has two lines and some changes.');
    const textDiffGuide = guides.find(g => g.href.includes('text-diff-highlighter'));

    const highlightedText = useMemo(() => {
        const differences = diffChars(originalText, changedText);
        return differences.map((part, index) => {
            const style = {
                backgroundColor: part.added ? 'rgba(0, 255, 0, 0.2)' : part.removed ? 'rgba(255, 0, 0, 0.2)' : 'transparent'
            };
            return <span key={index} style={style}>{part.value}</span>;
        });
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
                                        <code>{highlightedText}</code>
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
