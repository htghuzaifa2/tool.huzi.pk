"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, Copy, Combine } from 'lucide-react';

export default function ParagraphMergerPage() {
    const [inputText, setInputText] = useState('This is the first paragraph.\n\nThis is the second paragraph.');
    const [outputText, setOutputText] = useState('');
    const { toast } = useToast();

    const handleMerge = () => {
        if (!inputText.trim()) {
            toast({
                title: 'Nothing to Merge',
                description: 'Please enter some text first.',
                variant: 'destructive',
            });
            return;
        }

        try {
            // Replace one or more newline characters with a single space
            const result = inputText.replace(/\n+/g, ' ').trim();
            setOutputText(result);
            toast({
                title: 'Success!',
                description: 'Paragraphs have been merged.',
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
            description: "The merged text has been copied to your clipboard.",
        });
    };

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Combine className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Paragraph Merger</CardTitle>
                        <CardDescription>Merge multiple paragraphs into a single block of text.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                           <label className="font-medium">Original Text</label>
                           <Textarea
                                placeholder="Enter text with multiple paragraphs..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="min-h-[200px] font-mono text-sm"
                           />
                        </div>
                        
                        <div className="text-center">
                            <Button onClick={handleMerge} size="lg">
                                <ArrowDown className="mr-2" /> Merge Paragraphs
                            </Button>
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <label className="font-medium">Merged Text</label>
                                <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!outputText}>
                                    <Copy className="h-5 w-5" />
                                </Button>
                            </div>
                           <Textarea
                                placeholder="Merged text will appear here..."
                                value={outputText}
                                readOnly
                                className="min-h-[200px] font-mono text-sm bg-muted"
                           />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
