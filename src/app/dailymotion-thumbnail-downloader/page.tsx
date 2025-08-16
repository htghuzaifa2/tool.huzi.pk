
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Link, Download, Video, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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

    const handleGetThumbnail = async () => {
        if (!videoUrl) {
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
            // Dailymotion doesn't have a direct public API endpoint, so we use a CORS proxy.
            // Note: This relies on a free, public CORS proxy which may have rate limits.
            const oembedUrl = `https://www.dailymotion.com/services/oembed?url=${encodeURIComponent(videoUrl)}`;
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(oembedUrl)}`;
            
            const response = await fetch(proxyUrl);
            
            if (!response.ok) {
                 throw new Error(`Could not fetch data from Dailymotion. Please check the URL.`);
            }
            
            const corsData = await response.json();
            const data = JSON.parse(corsData.contents);
            
            if (data.thumbnail_url) {
                setThumbnail({
                    quality: 'High Quality',
                    url: data.thumbnail_url.replace(/\\/g, ''),
                    width: data.width,
                    height: data.height,
                });
            } else {
                 throw new Error(`Thumbnail not found for this Dailymotion video.`);
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
            // Use the same CORS proxy for downloading the image blob to avoid tainted canvas issues.
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
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
            <div className="max-w-2xl mx-auto">
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
                                        <CardDescription>{thumbnail.width} x {thumbnail.height}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="mt-auto">
                                    <Button className="w-full" onClick={() => handleDownload(thumbnail.url)}>
                                        <Download className="mr-2 h-4 w-4" /> Download
                                    </Button>
                                </CardContent>
                            </Card>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
    );
}
