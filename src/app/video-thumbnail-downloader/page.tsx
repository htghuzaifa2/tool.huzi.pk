
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Youtube, Link, Download, Video } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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
            if (!response.ok) {
                throw new Error('Thumbnail not found or could not be fetched.');
            }
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `youtube_thumbnail_${videoId}_${quality}.jpg`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.error(err);
            toast({
                title: "Download Failed",
                description: "This thumbnail quality may not exist for this video.",
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
                            <Card key={thumb.quality} className="overflow-hidden flex flex-col">
                                <CardHeader className="p-0">
                                    <div className="aspect-video bg-muted overflow-hidden">
                                        <img 
                                            src={thumb.url} 
                                            alt={`${thumb.quality} thumbnail`} 
                                            className="w-full h-full object-cover" 
                                            onError={(e) => {
                                                const card = e.currentTarget.closest('.group');
                                                if (card) {
                                                    e.currentTarget.parentElement?.parentElement?.parentElement?.style.display = 'none';
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

const GenericDownloader = ({ platform }: { platform: 'Vimeo' | 'Dailymotion' }) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [thumbnail, setThumbnail] = useState<Thumbnail | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleGetThumbnail = async () => {
        if (!videoUrl) return;

        setIsLoading(true);
        setThumbnail(null);

        try {
            const oembedUrl = platform === 'Vimeo'
                ? `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}`
                : `https://www.dailymotion.com/services/oembed?url=${encodeURIComponent(videoUrl)}`;
            
            const response = await fetch(oembedUrl);
            
            if (!response.ok) {
                 throw new Error(`Could not fetch data from ${platform}.`);
            }
            
            const data = await response.json();
            
            if (data.thumbnail_url) {
                setThumbnail({
                    quality: 'High Quality',
                    url: data.thumbnail_url.replace(/\\/g, ''),
                    width: data.width,
                    height: data.height,
                });
            } else {
                 throw new Error(`Thumbnail not found for this ${platform} video.`);
            }

        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message || `Failed to fetch thumbnail for the given ${platform} URL.`,
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
            a.download = `${platform.toLowerCase()}_thumbnail.jpg`;
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
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder={`Enter ${platform} video URL`}
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button onClick={handleGetThumbnail} disabled={isLoading}>{isLoading ? 'Fetching...' : 'Get Thumbnail'}</Button>
            </div>
            {thumbnail && (
                <div className="flex justify-center">
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
                </div>
            )}
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
                                <GenericDownloader platform="Vimeo" />
                            </TabsContent>
                            <TabsContent value="dailymotion" className="pt-6">
                                <GenericDownloader platform="Dailymotion" />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
