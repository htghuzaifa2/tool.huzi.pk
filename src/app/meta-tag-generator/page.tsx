
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Copy, Tags, Code } from 'lucide-react';

export default function MetaTagGeneratorPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const { toast } = useToast();

    const generatedTags = `
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
    `.trim();

    const copyToClipboard = () => {
        if (!title && !description && !keywords) {
            toast({
                title: "Nothing to Copy",
                description: "Please generate some tags first.",
                variant: "destructive"
            });
            return;
        }
        navigator.clipboard.writeText(generatedTags);
        toast({
            title: "Copied!",
            description: "Meta tags copied to clipboard.",
        });
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Tags className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Meta Tag Generator</CardTitle>
                        <CardDescription>Create SEO-friendly meta tags for your website pages.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title" className="font-medium">Title</label>
                            <Input 
                                id="title"
                                placeholder="Your Page Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                         <div className="space-y-2">
                            <label htmlFor="description" className="font-medium">Description</label>
                            <Textarea 
                                id="description"
                                placeholder="A brief description of your page content."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="keywords" className="font-medium">Keywords</label>
                            <Input 
                                id="keywords"
                                placeholder="e.g. tool, generator, seo, meta tags"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                            />
                             <p className="text-xs text-muted-foreground">Separate keywords with commas.</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Card className="w-full bg-muted">
                            <CardHeader className="flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Code className="h-5 w-5" />
                                    <CardTitle className="text-lg font-headline">Generated Tags</CardTitle>
                                </div>
                                <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                                    <Copy className="h-5 w-5" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <pre className="p-4 rounded-md bg-background/70 text-sm overflow-x-auto">
                                    <code>
                                        {generatedTags}
                                    </code>
                                </pre>
                            </CardContent>
                        </Card>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
