
"use client"

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { diffChars } from 'diff';
import { GitCompareArrows } from 'lucide-react';

export default function TextDiffHighlighterPage() {
    const [originalText, setOriginalText] = useState('This is the original text.\nIt has two lines.');
    const [changedText, setChangedText] = useState('This is the updated text.\nIt has two lines and some changes.');

    const differences = useMemo(() => {
        return diffChars(originalText, changedText);
    }, [originalText, changedText]);

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-6xl mx-auto">
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
            </div>
        </div>
    );
}
