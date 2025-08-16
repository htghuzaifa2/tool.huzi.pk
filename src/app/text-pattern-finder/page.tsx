"use client"

import { useState, useMemo, ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileSearch, AlertTriangle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function TextPatternFinderPage() {
    const [pattern, setPattern] = useState('\\b\\w{4}\\b'); // Default to find 4-letter words
    const [flags, setFlags] = useState('gi'); // Default to global, case-insensitive
    const [text, setText] = useState('This is a sample text for testing regular expressions. Find all words that are exactly four letters long.');
    const [error, setError] = useState<string | null>(null);
    const textPatternGuide = guides.find(g => g.href.includes('text-pattern-finder'));

    const highlightedText = useMemo<ReactNode[] | null>(() => {
        if (!pattern) {
            setError(null);
            return [&lt;span key="full-text"&gt;{text}&lt;/span&gt;];
        }

        try {
            const regex = new RegExp(pattern, flags);
            setError(null);

            if (!flags.includes('g')) {
                 const match = text.match(regex);
                 if (!match) return [&lt;span key="full-text"&gt;{text}&lt;/span&gt;];
                 
                 const index = match.index || 0;
                 return [
                    &lt;span key="start"&gt;{text.substring(0, index)}&lt;/span&gt;,
                    &lt;span key="match" className="bg-primary/20 text-primary-foreground rounded px-1"&gt;{match[0]}&lt;/span&gt;,
                    &lt;span key="end"&gt;{text.substring(index + match[0].length)}&lt;/span&gt;
                 ];
            }

            const parts: ReactNode[] = [];
            let lastIndex = 0;
            let match;

            while ((match = regex.exec(text)) !== null) {
                if (match.index > lastIndex) {
                    parts.push(
                        &lt;span key={`text-${lastIndex}`}&gt;
                            {text.substring(lastIndex, match.index)}
                        &lt;/span&gt;
                    );
                }
                parts.push(
                    &lt;span key={`match-${match.index}`} className="bg-primary/20 text-primary-foreground rounded px-1"&gt;
                        {match[0]}
                    &lt;/span&gt;
                );
                lastIndex = regex.lastIndex;
                 if (!regex.global) break; // Prevent infinite loops
            }

            if (lastIndex &lt; text.length) {
                parts.push(
                    &lt;span key={`text-${lastIndex}`}&gt;
                        {text.substring(lastIndex)}
                    &lt;/span&gt;
                );
            }

            return parts;

        } catch (e: any) {
            setError(e.message);
            return [&lt;span key="full-text"&gt;{text}&lt;/span&gt;];
        }
    }, [pattern, flags, text]);

    return (
        &lt;div className="container mx-auto py-10"&gt;
            &lt;div className="max-w-4xl mx-auto space-y-8"&gt;
                &lt;Card&gt;
                    &lt;CardHeader className="text-center"&gt;
                        &lt;div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4"&gt;
                            &lt;FileSearch className="w-8 h-8" /&gt;
                        &lt;/div&gt;
                        &lt;CardTitle className="text-4xl font-bold font-headline"&gt;Text Pattern Finder (Regex)&lt;/CardTitle&gt;
                        &lt;CardDescription&gt;Search and highlight specific patterns or words using regular expressions.&lt;/CardDescription&gt;
                    &lt;/CardHeader&gt;
                    &lt;CardContent className="space-y-6"&gt;
                        &lt;div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4"&gt;
                            &lt;div className="space-y-2"&gt;
                                &lt;Label htmlFor="pattern"&gt;Regular Expression Pattern&lt;/Label&gt;
                                &lt;Input
                                    id="pattern"
                                    value={pattern}
                                    onChange={(e) =&gt; setPattern(e.target.value)}
                                    placeholder="e.g., \\d+"
                                    className="font-mono"
                                /&gt;
                            &lt;/div&gt;
                             &lt;div className="space-y-2"&gt;
                                &lt;Label htmlFor="flags"&gt;Flags&lt;/Label&gt;
                                &lt;Input
                                    id="flags"
                                    value={flags}
                                    onChange={(e) =&gt; setFlags(e.target.value.replace(/[^gimuy]/g, ''))}
                                    placeholder="e.g., gi"
                                    className="font-mono w-24"
                                /&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;

                        &lt;div className="space-y-2"&gt;
                            &lt;Label htmlFor="text-input"&gt;Your Text&lt;/Label&gt;
                            &lt;Textarea
                                id="text-input"
                                value={text}
                                onChange={(e) =&gt; setText(e.target.value)}
                                className="min-h-[200px] font-mono"
                                placeholder="Paste the text you want to search here..."
                            /&gt;
                        &lt;/div&gt;

                        &lt;div className="space-y-2"&gt;
                             &lt;Label&gt;Result&lt;/Label&gt;
                             &lt;Card className="min-h-[200px] bg-muted"&gt;
                                &lt;CardContent className="p-4"&gt;
                                     &lt;pre className="whitespace-pre-wrap font-mono text-sm"&gt;
                                        &lt;code&gt;{highlightedText}&lt;/code&gt;
                                    &lt;/pre&gt;
                                &lt;/CardContent&gt;
                            &lt;/Card&gt;
                        &lt;/div&gt;

                         {error && (
                            &lt;Alert variant="destructive"&gt;
                                &lt;AlertTriangle className="h-4 w-4" /&gt;
                                &lt;AlertTitle&gt;Invalid Regular Expression&lt;/AlertTitle&gt;
                                &lt;AlertDescription&gt;{error}&lt;/AlertDescription&gt;
                            &lt;/Alert&gt;
                        )}
                    &lt;/CardContent&gt;
                &lt;/Card&gt;

                {textPatternGuide && (
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
                                        &lt;CardTitle className="font-headline"&gt;{textPatternGuide.title}&lt;/CardTitle&gt;
                                        &lt;CardDescription&gt;{textPatternGuide.description}&lt;/CardDescription&gt;
                                    &lt;/CardHeader&gt;
                                    &lt;CardContent&gt;
                                        &lt;ol className="list-decimal list-inside space-y-2 text-muted-foreground"&gt;
                                            {textPatternGuide.steps.map((step, stepIndex) =&gt; (
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
