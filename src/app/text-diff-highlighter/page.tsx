"use client"

import { useState, useMemo, ReactNode } from 'react';
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
                            &lt;Card className="min-h-[250px] bg-muted"&gt;
                                &lt;CardContent className="p-4"&gt;
                                     &lt;pre className="whitespace-pre-wrap font-mono text-sm"&gt;
                                        &lt;code&gt;{highlightedText}&lt;/code&gt;
                                    &lt;/pre&gt;
                                &lt;/CardContent&gt;
                            &lt;/Card&gt;
                             &lt;div className="flex justify-center items-center gap-6 mt-4 text-sm"&gt;
                                &lt;div className="flex items-center gap-2"&gt;
                                    &lt;span className="w-4 h-4 rounded-sm bg-green-500/20"&gt;&lt;/span&gt;
                                    &lt;span&gt;Added&lt;/span&gt;
                                &lt;/div&gt;
                                &lt;div className="flex items-center gap-2"&gt;
                                    &lt;span className="w-4 h-4 rounded-sm bg-red-500/20"&gt;&lt;/span&gt;
                                    &lt;span&gt;Removed&lt;/span&gt;
                                &lt;/div&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/CardContent&gt;
                &lt;/Card&gt;

                {textDiffGuide && (
                    &lt;Accordion type="single" collapsible className="w-full"&gt;
                        &lt;AccordionItem value="guide" className="border-none flex flex-col items-center"&gt;
                            &lt;AccordionTrigger&gt;
                                &lt;Button variant="outline" className="w-fit"&gt;
                                    &lt;BookOpen className="mr-2 h-5 w-5"/&gt;Read The Guide
                                &lt;/Button&gt;
                            &lt;/AccordionTrigger&gt;
                            &lt;AccordionContent className="pt-6 w-full"&gt;
                                &lt;Card&gt;
                                    &lt;CardHeader&gt;
                                        &lt;CardTitle className="font-headline"&gt;{textDiffGuide.title}&lt;/CardTitle&gt;
                                        &lt;CardDescription&gt;{textDiffGuide.description}&lt;/CardDescription&gt;
                                    &lt;/CardHeader&gt;
                                    &lt;CardContent&gt;
                                        &lt;ol className="list-decimal list-inside space-y-2 text-muted-foreground"&gt;
                                            {textDiffGuide.steps.map((step, stepIndex) =&gt; (
                                                &lt;li key={stepIndex}&gt;{step}&lt;/li&gt;
                                            ))}
                                        &lt;/ol&gt;
                                    &lt;/CardContent&gt;
                                &lt;/Card&gt;
                            &lt;/AccordionContent&gt;
                        &lt;/AccordionItem&gt;
                    &lt;/Accordion&gt;
                )}
            &lt;/div&gt;
        &lt;/div&gt;
    );
}
