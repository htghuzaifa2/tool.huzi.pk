
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Copy, Code, Share2, BookOpen } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function OpenGraphGeneratorPage() {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('website');
    const [imageUrl, setImageUrl] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const { toast } = useToast();
    const openGraphGuide = guides.find(g => g.href.includes('open-graph-generator'));

    const generateTags = () => {
        let tags = '';
        if (title) tags += `<meta property="og:title" content="${title}">\n`;
        if (type) tags += `<meta property="og:type" content="${type}">\n`;
        if (imageUrl) tags += `<meta property="og:image" content="${imageUrl}">\n`;
        if (url) tags += `<meta property="og:url" content="${url}">\n`;
        if (description) tags += `<meta property="og:description" content="${description}">`;
        return tags.trim();
    };

    const generatedTags = generateTags();

    const copyToClipboard = () => {
        if (!generatedTags) {
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
            description: "Open Graph meta tags copied to clipboard.",
        });
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-2xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Share2 className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Open Graph Tag Generator</CardTitle>
                        <CardDescription>Generate perfect Open Graph meta tags for better link previews on social media.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">OG Title</Label>
                            <Input 
                                id="title"
                                placeholder="Your Page Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        
                         <div className="space-y-2">
                            <Label htmlFor="type">OG Type</Label>
                             <Select value={type} onValueChange={setType}>
                                <SelectTrigger id="type"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="website">Website</SelectItem>
                                    <SelectItem value="article">Article</SelectItem>
                                    <SelectItem value="video.movie">Video/Movie</SelectItem>
                                    <SelectItem value="music.song">Music/Song</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="image-url">OG Image URL</Label>
                            <Input 
                                id="image-url"
                                placeholder="https://example.com/image.jpg"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="url">OG URL</Label>
                            <Input 
                                id="url"
                                placeholder="https://example.com/page.html"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="description">OG Description</Label>
                            <Textarea 
                                id="description"
                                placeholder="A brief description of your page content for the link preview."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
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

                {openGraphGuide && (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" className="border-none flex flex-col items-center">
                            <AccordionTrigger asChild>
                                <button className="relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-foreground group bg-gradient-to-br from-primary via-accent to-destructive group-hover:from-primary/90 group-hover:via-accent/90 group-hover:to-destructive/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40">
                                    <span className="relative flex items-center px-6 py-3 transition-all ease-in duration-200 bg-background rounded-md group-hover:bg-opacity-0">
                                        <BookOpen className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                                        Read The Guide
                                    </span>
                                </button>
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{openGraphGuide.title}</CardTitle>
                                        <CardDescription>{openGraphGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {openGraphGuide.steps.map((step, stepIndex) => (
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
