
"use client"

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Copy, CodeXml } from 'lucide-react';

export default function HtmlEntityDecoderPage() {
    const [encodedText, setEncodedText] = useState('&lt;p&gt;Hello &amp; welcome!&lt;/p&gt;');
    const { toast } = useToast();

    const decodedText = useMemo(() => {
        if (typeof window === 'undefined') return '';
        if (!encodedText.trim()) return '';

        try {
            // Use the browser's own parser to decode entities
            const textarea = document.createElement('textarea');
            textarea.innerHTML = encodedText;
            return textarea.value;
        } catch (error) {
            console.error("Decoding error:", error);
            return "Invalid HTML entities provided.";
        }
    }, [encodedText]);

    const copyToClipboard = () => {
        if (!decodedText) {
            toast({
                title: "Nothing to Copy",
                description: "There is no decoded text to copy.",
                variant: "destructive"
            });
            return;
        }
        navigator.clipboard.writeText(decodedText);
        toast({
            title: "Copied!",
            description: "Decoded text copied to clipboard.",
        });
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <CodeXml className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">HTML Entity Decoder</CardTitle>
                        <CardDescription>Convert HTML entities like &amp;amp; or &amp;lt; back to normal text.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-4">
                            <div className="grid gap-2">
                                <label className="font-medium text-center">Encoded Text</label>
                                <Textarea
                                    placeholder="&lt;p&gt;...&lt;/p&gt;"
                                    value={encodedText}
                                    onChange={(e) => setEncodedText(e.target.value)}
                                    className="min-h-[250px] font-mono text-sm"
                                />
                            </div>
                            
                            <ArrowRight className="h-8 w-8 text-muted-foreground hidden md:block" />

                            <div className="grid gap-2">
                                <div className="flex items-center justify-center md:justify-between">
                                    <label className="font-medium">Decoded Text</label>
                                    <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!decodedText}>
                                        <Copy className="h-5 w-5" />
                                    </Button>
                                </div>
                                <Textarea
                                    placeholder="Decoded output will appear here..."
                                    value={decodedText}
                                    readOnly
                                    className="min-h-[250px] font-mono text-sm bg-muted"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
