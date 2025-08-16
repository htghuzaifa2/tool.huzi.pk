
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
            </div>
        </div>
    );
}
