
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Youtube, Link, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

type Thumbnail = {
    quality: string;
    url: string;
    width: number;
    height: number;
};

export default function YouTubeThumbnailDownloaderPage() {
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
            const qualities = {
                'Max-Res': { url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`, width: 1280, height: 720 },
                'Standard': { url: `https://img.youtube.com/vi/${id}/sddefault.jpg`, width: 640, height: 480 },
                'High': { url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`, width: 480, height: 360 },
                'Medium': { url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`, width: 320, height: 180 },
                'Default': { url: `https://img.youtube.com/vi/${id}/default.jpg`, width: 120, height: 90 },
            };
            const thumbArray = Object.entries(qualities).map(([quality, data]) => ({ quality, ...data }));
            setThumbnails(thumbArray);
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
    
    const handleDownload = (url: string, quality: string) => {
        fetch(url, {
            method: 'GET',
            headers: {}
        })
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `youtube_thumbnail_${videoId}_${quality}.jpg`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(blobUrl);
        })
        .catch(err => {
            console.error(err);
            toast({
                title: "Download Failed",
                description: "Could not download the thumbnail. It may not exist for this video.",
                variant: "destructive",
            });
        });
    }

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto">
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
                                        <Card key={thumb.quality} className="overflow-hidden">
                                            <CardHeader className="p-0">
                                                <div className="aspect-video bg-muted overflow-hidden">
                                                    <img 
                                                        src={thumb.url} 
                                                        alt={`${thumb.quality} thumbnail`} 
                                                        className="w-full h-full object-cover" 
                                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <CardTitle className="text-lg">{thumb.quality}</CardTitle>
                                                    <CardDescription>{thumb.width} x {thumb.height}</CardDescription>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
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
            </div>
        </div>
    );
}
