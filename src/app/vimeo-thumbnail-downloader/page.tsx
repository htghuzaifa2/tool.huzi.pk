"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Youtube, Link, Download, Video, Loader2, BookOpen } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

type Thumbnail = {
    quality: string;
    url: string;
    width?: number;
    height?: number;
};

export default function VimeoThumbnailDownloaderPage() {
    const [videoUrl, setVideoUrl] = useState('');
    const [thumbnail, setThumbnail] = useState<Thumbnail | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const vimeoGuide = guides.find(g => g.href.includes('vimeo-thumbnail-downloader'));

    const handleGetThumbnail = async () => {
        if (!videoUrl) {
            toast({
                title: "Invalid URL",
                description: "Please enter a valid Vimeo video URL.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        setThumbnail(null);

        try {
            const oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}`;

            const response = await fetch(oembedUrl);
            
            if (!response.ok) {
                 throw new Error(`Could not fetch data from Vimeo. Please check the URL.`);
            }
            
            const data = await response.json();
            
            if (data.thumbnail_url) {
                const highResUrl = data.thumbnail_url.replace(/_(\d+)\.jpg$/, '_1920.jpg');
                setThumbnail({
                    quality: 'High Quality',
                    url: highResUrl,
                    width: data.width,
                    height: data.height,
                });
            } else {
                 throw new Error(`Thumbnail not found for this Vimeo video.`);
            }

        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message || `Failed to fetch thumbnail. The URL may be incorrect or the video private.`,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }
    
    const handleDownload = async (url: string) => {
        try {
            // Using a CORS proxy to prevent potential cross-origin issues on download
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error('Could not fetch image for download.');
            
            const corsData = await response.json();
            const imageResponse = await fetch(corsData.contents);
            const blob = await imageResponse.blob();

            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `vimeo_thumbnail.jpg`;
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
        &lt;div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8"&gt;
            &lt;div className="max-w-2xl mx-auto space-y-8"&gt;
                 &lt;Card&gt;
                    &lt;CardHeader className="text-center"&gt;
                        &lt;div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4"&gt;
                            &lt;Video className="w-8 h-8" /&gt;
                        &lt;/div&gt;
                        &lt;CardTitle className="text-4xl font-bold font-headline"&gt;Vimeo Thumbnail Downloader&lt;/CardTitle&gt;
                        &lt;CardDescription&gt;Download the thumbnail from any public Vimeo video.&lt;/CardDescription&gt;
                    &lt;/CardHeader&gt;
                    &lt;CardContent className="space-y-6"&gt;
                        &lt;div className="flex flex-col sm:flex-row gap-4"&gt;
                            &lt;div className="relative flex-grow"&gt;
                                &lt;Link className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /&gt;
                                &lt;Input
                                    placeholder="Enter Vimeo video URL"
                                    value={videoUrl}
                                    onChange={(e) =&gt; setVideoUrl(e.target.value)}
                                    className="pl-10"
                                /&gt;
                            &lt;/div&gt;
                            &lt;Button onClick={handleGetThumbnail} disabled={isLoading}&gt;
                                {isLoading ? &lt;&gt;&lt;Loader2 className="mr-2 h-4 w-4 animate-spin"/&gt; Fetching...&lt;/&gt; : 'Get Thumbnail'}
                            &lt;/Button&gt;
                        &lt;/div&gt;
                    &lt;/CardContent&gt;
                     {thumbnail && (
                        &lt;CardFooter className="flex justify-center"&gt;
                            &lt;Card key={thumbnail.quality} className="overflow-hidden flex flex-col max-w-sm"&gt;
                                &lt;CardHeader className="p-0"&gt;
                                    &lt;div className="aspect-video bg-muted overflow-hidden"&gt;
                                        &lt;img src={thumbnail.url} alt={`${thumbnail.quality} thumbnail`} className="w-full h-full object-cover" /&gt;
                                    &lt;/div&gt;
                                    &lt;div className="p-4"&gt;
                                        &lt;CardTitle className="text-lg"&gt;{thumbnail.quality}&lt;/CardTitle&gt;
                                        &lt;CardDescription&gt;{thumbnail.width} x {thumbnail.height}&lt;/CardDescription&gt;
                                    &lt;/div&gt;
                                &lt;/CardHeader&gt;
                                &lt;CardContent className="mt-auto p-4"&gt;
                                    &lt;Button className="w-full" onClick={() =&gt; handleDownload(thumbnail.url)}&gt;
                                        &lt;Download className="mr-2 h-4 w-4" /&gt; Download
                                    &lt;/Button&gt;
                                &lt;/CardContent&gt;
                            &lt;/Card&gt;
                        &lt;/CardFooter&gt;
                    )}
                &lt;/Card&gt;

                {vimeoGuide && (
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
                                        &lt;CardTitle className="font-headline"&gt;{vimeoGuide.title}&lt;/CardTitle&gt;
                                        &lt;CardDescription&gt;{vimeoGuide.description}&lt;/CardDescription&gt;
                                    &lt;/CardHeader&gt;
                                    &lt;CardContent&gt;
                                        &lt;ol className="list-decimal list-inside space-y-2 text-muted-foreground"&gt;
                                            {vimeoGuide.steps.map((step, stepIndex) =&gt; (
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
    );
}
