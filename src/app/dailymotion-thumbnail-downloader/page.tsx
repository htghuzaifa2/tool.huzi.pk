"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Link, Download, Video, Loader2, BookOpen } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

type Thumbnail = {
    quality: string;
    url: string;
    width?: number;
    height?: number;
};

export default function DailymotionThumbnailDownloaderPage() {
    const [videoUrl, setVideoUrl] = useState('');
    const [thumbnail, setThumbnail] = useState<Thumbnail | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const dailymotionGuide = guides.find(g => g.href.includes('dailymotion-thumbnail-downloader'));

    const getVideoId = (url: string) => {
        const match = url.match(/dailymotion.com\/(video|embed\/video|swf)\/([a-zA-Z0-9]+)/);
        return match ? match[2] : null;
    }

    const handleGetThumbnail = async () => {
        const videoId = getVideoId(videoUrl);
        if (!videoId) {
            toast({
                title: "Invalid URL",
                description: "Please enter a valid Dailymotion video URL.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        setThumbnail(null);

        try {
            const thumbnailUrl = `https://www.dailymotion.com/thumbnail/video/${videoId}`;
            // Check if image exists
            const response = await fetch(thumbnailUrl);
            if (!response.ok) {
                 throw new Error(`Thumbnail not found. The video may be private or deleted.`);
            }

            setThumbnail({
                quality: 'High Quality',
                url: thumbnailUrl,
            });

        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message || `Failed to fetch thumbnail.`,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }
    
    const handleDownload = async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Could not fetch image for download.');
            
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `dailymotion_thumbnail.jpg`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch(err: any) {
             toast({
                title: "Download Failed",
                description: err.message,
                variant: "destructive",
            });
        }
    }

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-8">
                 <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Video className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Dailymotion Thumbnail Downloader</CardTitle>
                        <CardDescription>Download the thumbnail from any Dailymotion video.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Enter Dailymotion video URL"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button onClick={handleGetThumbnail} disabled={isLoading}>
                                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Fetching...</> : 'Get Thumbnail'}
                            </Button>
                        </div>
                    </CardContent>
                     {thumbnail && (
                        <CardFooter className="flex justify-center">
                            <Card key={thumbnail.quality} className="overflow-hidden flex flex-col max-w-sm">
                                <CardHeader className="p-0">
                                    <div className="aspect-video bg-muted overflow-hidden">
                                        <img src={thumbnail.url} alt={`${thumbnail.quality} thumbnail`} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <CardTitle className="text-lg">{thumbnail.quality}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="mt-auto p-4">
                                    <Button className="w-full" onClick={() => handleDownload(thumbnail.url)}>
                                        <Download className="mr-2 h-4 w-4" /> Download
                                    </Button>
                                </CardContent>
                            </Card>
                        </CardFooter>
                    )}
                </Card>

                {dailymotionGuide && (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" className="border-none">
                            <AccordionTrigger asChild>
                                <div className="flex justify-center">
                                    <Button size="lg" variant="ghost" className="relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-foreground group bg-gradient-to-br from-primary via-accent to-destructive group-hover:from-primary/90 group-hover:via-accent/90 group-hover:to-destructive/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40">
                                        <span className="relative flex items-center px-6 py-3 transition-all ease-in duration-200 bg-background rounded-md group-hover:bg-opacity-0">
                                            <BookOpen className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                                            Read The Guide
                                        </span>
                                    </Button>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{dailymotionGuide.title}</CardTitle>
                                        <CardDescription>{dailymotionGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {dailymotionGuide.steps.map((step, stepIndex) => (
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
