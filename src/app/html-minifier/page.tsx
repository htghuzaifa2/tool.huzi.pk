
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, Copy, Code } from 'lucide-react';

export default function HtmlMinifierPage() {
    const [htmlInput, setHtmlInput] = useState('');
    const [minifiedHtml, setMinifiedHtml] = useState('');
    const { toast } = useToast();

    const handleMinify = () => {
        if (!htmlInput.trim()) {
            toast({
                title: 'Nothing to Minify',
                description: 'Please paste your HTML code first.',
                variant: 'destructive',
            });
            return;
        }

        try {
            // 1. Remove comments
            let minified = htmlInput.replace(/<!--[\s\S]*?-->/g, '');
            // 2. Remove newlines and tabs, and reduce multiple spaces to a single space
            minified = minified.replace(/\s+/g, ' ').trim();
            // 3. Remove spaces between tags
            minified = minified.replace(/> </g, '><');

            setMinifiedHtml(minified);
            toast({
                title: 'Success!',
                description: 'HTML has been minified.',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An unexpected error occurred during minification.',
                variant: 'destructive',
            });
        }
    };

    const copyToClipboard = () => {
        if (!minifiedHtml) {
            toast({
                title: "Nothing to Copy",
                description: "There is no minified HTML to copy.",
                variant: "destructive"
            });
            return;
        }
        navigator.clipboard.writeText(minifiedHtml);
        toast({
            title: "Copied!",
            description: "Minified HTML copied to clipboard.",
        });
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Code className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">HTML Minifier</CardTitle>
                        <CardDescription>Paste your HTML to remove spaces, line breaks, and comments.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                           <label className="font-medium">Original HTML</label>
                           <Textarea
                                placeholder="<html>...</html>"
                                value={htmlInput}
                                onChange={(e) => setHtmlInput(e.target.value)}
                                className="min-h-[250px] font-mono text-sm"
                           />
                        </div>
                        
                        <div className="text-center">
                            <Button onClick={handleMinify} size="lg">
                                <ArrowDown className="mr-2" /> Minify HTML
                            </Button>
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <label className="font-medium">Minified HTML</label>
                                <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!minifiedHtml}>
                                    <Copy className="h-5 w-5" />
                                </Button>
                            </div>
                           <Textarea
                                placeholder="Minified output will appear here..."
                                value={minifiedHtml}
                                readOnly
                                className="min-h-[250px] font-mono text-sm bg-muted"
                           />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
