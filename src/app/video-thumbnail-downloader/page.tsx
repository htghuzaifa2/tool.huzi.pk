
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Youtube, Link, Download, Video, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import NextLink from "next/link"


type Thumbnail = {
    quality: string;
    url: string;
    width?: number;
    height?: number;
};

const YouTubeDownloader = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
    const [videoId, setVideoId] = useState<string | null>(null);
    const { toast } = useToast();

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
        <div className="space-y-6">
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
        </div>
    )
}

const PlaceholderDownloader = ({ platform, href }: { platform: string, href: string }) => {
    return (
        <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">The {platform} downloader has its own dedicated page.</p>
            <Button asChild>
                <NextLink href={href}>Go to {platform} Downloader</NextLink>
            </Button>
        </div>
    )
}

export default function VideoThumbnailDownloaderPage() {
    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Video className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Video Thumbnail Downloader</CardTitle>
                        <CardDescription>Download high-quality thumbnails from YouTube, Vimeo, and Dailymotion.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="youtube" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="youtube">YouTube</TabsTrigger>
                                <TabsTrigger value="vimeo">Vimeo</TabsTrigger>
                                <TabsTrigger value="dailymotion">Dailymotion</TabsTrigger>
                            </TabsList>
                            <TabsContent value="youtube" className="pt-6">
                                <YouTubeDownloader />
                            </TabsContent>
                            <TabsContent value="vimeo" className="pt-6">
                               <PlaceholderDownloader platform="Vimeo" href="/vimeo-thumbnail-downloader" />
                            </TabsContent>
                            <TabsContent value="dailymotion" className="pt-6">
                                <PlaceholderDownloader platform="Dailymotion" href="/dailymotion-thumbnail-downloader" />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
