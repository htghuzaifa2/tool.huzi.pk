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
        &lt;div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="max-w-4xl mx-auto space-y-8"&gt;
                &lt;Card&gt;
                    &lt;CardHeader className="text-center"&gt;
                        &lt;div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4"&gt;
                            &lt;Youtube className="w-8 h-8" /&gt;
                        &lt;/div&gt;
                        &lt;CardTitle className="text-4xl font-bold font-headline"&gt;YouTube Thumbnail Downloader&lt;/CardTitle&gt;
                        &lt;CardDescription&gt;Download high-quality thumbnails from any YouTube video instantly.&lt;/CardDescription&gt;
                    &lt;/CardHeader&gt;
                    &lt;CardContent className="space-y-6"&gt;
                        &lt;div className="flex flex-col sm:flex-row gap-4"&gt;
                            &lt;div className="relative flex-grow"&gt;
                                &lt;Link className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /&gt;
                                &lt;Input
                                    placeholder="Enter YouTube video URL"
                                    value={videoUrl}
                                    onChange={(e) =&gt; setVideoUrl(e.target.value)}
                                    className="pl-10"
                                /&gt;
                            &lt;/div&gt;
                            &lt;Button onClick={handleGetThumbnails}&gt;Get Thumbnails&lt;/Button&gt;
                        &lt;/div&gt;
                        
                        {thumbnails.length > 0 && (
                            &lt;div className="space-y-8"&gt;
                                &lt;h3 className="text-2xl font-bold text-center font-headline"&gt;Available Thumbnails&lt;/h3&gt;
                                &lt;div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"&gt;
                                    {thumbnails.map(thumb =&gt; (
                                        &lt;Card key={thumb.quality} className="overflow-hidden flex flex-col group"&gt;
                                            &lt;CardHeader className="p-0"&gt;
                                                &lt;div className="aspect-video bg-muted overflow-hidden"&gt;
                                                    &lt;img 
                                                        src={thumb.url} 
                                                        alt={`${thumb.quality} thumbnail`} 
                                                        className="w-full h-full object-cover"
                                                         onError={(e) =&gt; {
                                                            const card = (e.target as HTMLElement).closest('.group');
                                                            if (card) {
                                                                (card as HTMLElement).style.display = 'none';
                                                            }
                                                        }}
                                                    /&gt;
                                                &lt;/div&gt;
                                                &lt;div className="p-4"&gt;
                                                    &lt;CardTitle className="text-lg"&gt;{thumb.quality}&lt;/CardTitle&gt;
                                                    &lt;CardDescription&gt;{thumb.width} x {thumb.height}&lt;/CardDescription&gt;
                                                &lt;/div&gt;
                                            &lt;/CardHeader&gt;
                                            &lt;CardContent className="mt-auto p-4"&gt;
                                                &lt;Button 
                                                    className="w-full"
                                                    onClick={() =&gt; handleDownload(thumb.url, thumb.quality)}
                                                &gt;
                                                    &lt;Download className="mr-2 h-4 w-4" /&gt;
                                                    Download
                                                &lt;/Button&gt;
                                            &lt;/CardContent&gt;
                                        &lt;/Card&gt;
                                    ))}
                                &lt;/div&gt;
                            &lt;/div&gt;
                        )}
                    &lt;/CardContent&gt;
                &lt;/Card&gt;

                {youtubeGuide && (
                   &lt;Accordion type="single" collapsible className="w-full"&gt;
                        &lt;AccordionItem value="guide" className="border-none flex flex-col items-center"&gt;
                            &lt;AccordionTrigger&gt;
                                &lt;Button variant="outline" className="w-fit"&gt;
                                    &lt;BookOpen className="mr-2 h-5 w-5"/&gt;Read The Guide
                                &lt;/Button&gt;
                            &lt;/AccordionTrigger&gt;
                            &lt;AccordionContent className="pt-6 w-full"&gt;
                                &lt;Card&gt;
                                    &lt;CardHeader&gt;
                                        &lt;CardTitle className="font-headline"&gt;{youtubeGuide.title}&lt;/CardTitle&gt;
                                        &lt;CardDescription&gt;{youtubeGuide.description}&lt;/CardDescription&gt;
                                    &lt;/CardHeader&gt;
                                    &lt;CardContent&gt;
                                        &lt;ol className="list-decimal list-inside space-y-2 text-muted-foreground"&gt;
                                            {youtubeGuide.steps.map((step, stepIndex) =&gt; (
                                                &lt;li key={stepIndex}&gt;{step}&lt;/li&gt;
                                            ))}
                                        &lt;/ol&gt;
                                    &lt;/CardContent&gt;
                                &lt;/Card&gt;
                            &lt;/AccordionContent&gt;
                        &lt;/AccordionItem&gt;
                    &lt;/Accordion&gt;
                )}
            &lt;/div&gt;
        &lt;/div&gt;
    )
}
