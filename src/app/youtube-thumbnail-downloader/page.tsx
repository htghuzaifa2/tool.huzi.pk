
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Youtube, Link, Download, BookOpen } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

type Thumbnail = {
    quality: string;
    url: string;
    width?: number;
    height?: number;
};

export default function YouTubeThumbnailDownloaderPage() {
    const [videoUrl, setVideoUrl] = useState('');
    const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
    const [videoId, setVideoId] = useState<string | null>(null);
    const { toast } = useToast();
    const youtubeGuide = guides.find(g => g.href.includes('youtube-thumbnail-downloader'));

    const getYouTubeVideoId = (url: string): string | null => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleGetThumbnails = () => {
        const id = getYouTubeVideoId(videoUrl);
        if (id) {
            setVideoId(id);
            const qualities = [
                { quality: 'Max-Res', url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`, width: 1280, height: 720 },
                { quality: 'Standard', url: `https://img.youtube.com/vi/${id}/sddefault.jpg`, width: 640, height: 480 },
                { quality: 'High', url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`, width: 480, height: 360 },
                { quality: 'Medium', url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`, width: 320, height: 180 },
                { quality: 'Default', url: `https://img.youtube.com/vi/${id}/default.jpg`, width: 120, height: 90 },
            ];
            setThumbnails(qualities);
        } else {
            toast({
                title: "Invalid URL",
                description: "Please enter a valid YouTube video URL.",
                variant: "destructive",
            });
            setVideoId(null);
            setThumbnails([]);
        }
    };
    
    const handleDownload = async (url: string, quality: string) => {
        try {
            const response = await fetch(url);
            // YouTube returns a 404 as a 200 with a 1x1 pixel image, so we check content type
            if (!response.ok || response.headers.get('content-type')?.includes('text/html')) {
                throw new Error('Thumbnail not found or could not be fetched.');
            }
            const blob = await response.blob();
             if (blob.size < 2000) { // Check if the blob size is too small (likely a 404 image)
                throw new Error('This thumbnail quality may not exist for this video.');
            }
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `youtube_thumbnail_${videoId}_${quality}.jpg`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (err: any) {
            console.error(err);
            toast({
                title: "Download Failed",
                description: err.message,
                variant: "destructive",
            });
        }
    }

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Youtube className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">YouTube Thumbnail Downloader</CardTitle>
                        <CardDescription>Download high-quality thumbnails from any YouTube video instantly.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    placeholder="Enter YouTube video URL"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button onClick={handleGetThumbnails}>Get Thumbnails</Button>
                        </div>
                        
                        {thumbnails.length > 0 && (
                            <div className="space-y-8">
                                <h3 className="text-2xl font-bold text-center font-headline">Available Thumbnails</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {thumbnails.map(thumb => (
                                        <Card key={thumb.quality} className="overflow-hidden flex flex-col group">
                                            <CardHeader className="p-0">
                                                <div className="aspect-video bg-muted overflow-hidden">
                                                    <img 
                                                        src={thumb.url} 
                                                        alt={`${thumb.quality} thumbnail`} 
                                                        className="w-full h-full object-cover"
                                                         onError={(e) => {
                                                            const card = e.currentTarget.closest('.group');
                                                            if (card) {
                                                                (card as HTMLElement).style.display = 'none';
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <CardTitle className="text-lg">{thumb.quality}</CardTitle>
                                                    <CardDescription>{thumb.width} x {thumb.height}</CardDescription>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="mt-auto">
                                                <Button 
                                                    className="w-full"
                                                    onClick={() => handleDownload(thumb.url, thumb.quality)}
                                                >
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {youtubeGuide && (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" className="border-none">
                            <div className="flex justify-center">
                                <AccordionTrigger asChild>
                                    <button className="relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-foreground group bg-gradient-to-br from-primary via-accent to-destructive group-hover:from-primary/90 group-hover:via-accent/90 group-hover:to-destructive/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40 h-11 px-8">
                                        <span className="relative flex items-center px-6 py-3 transition-all ease-in duration-200 bg-background rounded-md group-hover:bg-opacity-0">
                                            <BookOpen className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                                            Read The Guide
                                        </span>
                                    </button>
                                </AccordionTrigger>
                            </div>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{youtubeGuide.title}</CardTitle>
                                        <CardDescription>{youtubeGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {youtubeGuide.steps.map((step, stepIndex) => (
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
    )
}
