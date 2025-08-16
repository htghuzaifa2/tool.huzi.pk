
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Copy, CodeXml, ArrowRightLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';

// Using a div element's textContent to decode entities
const decodeHtml = (html: string): string => {
    if (typeof window === 'undefined') return '';
    try {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    } catch (e) {
        return "Invalid HTML entities provided.";
    }
};

// Simple regex-based encoding
const encodeHtml = (str: string): string => {
    return str.replace(/[&<>"']/g, function(m) {
        switch (m) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            default: return '&#039;'; // '
        }
    });
};


export default function HtmlEscaperUnescaperPage() {
    const [input, setInput] = useState('<p class="greeting">Hello & Welcome!</p>');
    const [output, setOutput] = useState('');
    const { toast } = useToast();

    const handleEncode = () => {
        setOutput(encodeHtml(input));
        toast({ title: 'Success', description: 'Text has been HTML-encoded.' });
    };

    const handleDecode = () => {
        setOutput(decodeHtml(input));
        toast({ title: 'Success', description: 'Text has been HTML-decoded.' });
    };

    const copyToClipboard = () => {
        if (!output) {
            toast({ title: "Nothing to Copy", variant: "destructive" });
            return;
        }
        navigator.clipboard.writeText(output);
        toast({ title: "Copied!", description: "Output text copied to clipboard." });
    };
    
    const swapContent = () => {
        setInput(output);
        setOutput(input);
    }

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <CodeXml className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">HTML Escaper / Unescaper</CardTitle>
                        <CardDescription>Encode special characters to HTML entities and decode them back.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="input-text">Input</Label>
                            <Textarea
                                id="input-text"
                                placeholder="<p>Hello World</p>"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="min-h-[200px] font-mono text-sm"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Button onClick={handleEncode}>Encode &rarr;</Button>
                            <Button variant="outline" size="icon" onClick={swapContent}>
                                <ArrowRightLeft className="h-4 w-4" />
                            </Button>
                            <Button onClick={handleDecode}>&larr; Decode</Button>
                        </div>
                        
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="output-text">Output</Label>
                                <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!output}>
                                    <Copy className="h-5 w-5" />
                                </Button>
                            </div>
                            <Textarea
                                id="output-text"
                                placeholder="Output will appear here..."
                                value={output}
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
