
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, Copy, Code } from 'lucide-react';

export default function HtmlMinifierPage() {
    const [htmlInput, setHtmlInput] = useState('<!-- This is a comment -->\n<div class="   extra-space   ">\n    <p>Hello World</p>\n</div>');
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
            // A more robust minification process
            let minified = htmlInput
                .replace(/<!--[\s\S]*?-->/g, '')      // 1. Remove comments
                .replace(/\s+/g, ' ')               // 2. Collapse whitespace (newlines, tabs, multiple spaces) into a single space
                .replace(/>\s+</g, '><')            // 3. Remove space between tags
                .replace(/\s(class|id|href|src)=/g, ' $1=') // Ensure required spaces around attributes
                .trim();                            // 4. Trim leading/trailing whitespace

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
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
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
