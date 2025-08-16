
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, Copy, Code, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function HtmlMinifierPage() {
    const [htmlInput, setHtmlInput] = useState('<!-- This is a comment -->\n<div class="   extra-space   ">\n    <p>Hello World</p>\n</div>');
    const [minifiedHtml, setMinifiedHtml] = useState('');
    const { toast } = useToast();
    const htmlMinifierGuide = guides.find(g => g.href.includes('html-minifier'));

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
            <div className="max-w-4xl mx-auto space-y-8">
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

                {htmlMinifierGuide && (
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
                                        <CardTitle className="font-headline">{htmlMinifierGuide.title}</CardTitle>
                                        <CardDescription>{htmlMinifierGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {htmlMinifierGuide.steps.map((step, stepIndex) => (
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
