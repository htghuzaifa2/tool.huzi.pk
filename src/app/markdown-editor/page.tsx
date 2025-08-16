
"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { TerminalSquare, BookOpen, ChevronDown } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

const placeholder = `# Welcome to your Markdown Editor!

## Start typing to see the magic happen.

- Supports basic Markdown (headings, lists, bold, italic).
- Also supports GitHub Flavored Markdown (like tables and strikethrough).

| Feature    | Support |
|------------|---------|
| Tables     | ✔       |
| Code Blocks| ✔       |
| Links      | ✔       |

\`\`\`javascript
// Here's some code
console.log("Hello, Markdown!");
\`\`\`

> Blockquotes are also supported.

Go ahead, give it a try!
`;

export default function MarkdownEditorPage() {
    const [markdown, setMarkdown] = useState(placeholder);
    const markdownEditorGuide = guides.find(g => g.href.includes('markdown-editor'));

    return (
        <div className="container mx-auto py-10 space-y-8">
            <Card>
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <TerminalSquare className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-4xl font-bold font-headline">Markdown Editor</CardTitle>
                    <CardDescription>Write in Markdown on the left and see the live preview on the right.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6 min-h-[60vh]">
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold mb-2 text-center">Editor</h2>
                            <Textarea
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                className="flex-1 w-full h-full resize-none font-mono text-base bg-muted/50"
                                placeholder="Type your Markdown here..."
                            />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold mb-2 text-center">Preview</h2>
                            <div className="flex-1 border rounded-md p-4 overflow-y-auto prose dark:prose-invert max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {markdown}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {markdownEditorGuide && (
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
                                    <CardTitle className="font-headline">{markdownEditorGuide.title}</CardTitle>
                                    <CardDescription>{markdownEditorGuide.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                        {markdownEditorGuide.steps.map((step, stepIndex) => (
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
    );
}
