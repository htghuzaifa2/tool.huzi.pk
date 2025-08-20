
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Youtube, Search, BarChart2, Video, Users, Eye, Info, Hash, Globe, Calendar, BadgeCheck, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchChannelAnalytics, type YouTubeChannel } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | undefined }) => (
    <Card className="bg-muted/50 text-center p-4">
        <div className="text-primary mx-auto mb-2">{icon}</div>
        <p className="text-2xl font-bold">{value ? Number(value).toLocaleString() : 'N/A'}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
    </Card>
);

export default function YouTubeChannelAnalyzerPage() {
    const [query, setQuery] = useState('');
    const [channelData, setChannelData] = useState<YouTubeChannel | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const handleSearch = async () => {
        if (!query.trim()) {
            toast({ title: "Search query is empty", description: "Please enter a channel URL.", variant: "destructive" });
            return;
        }
        setIsLoading(true);
        setError(null);
        setChannelData(null);
        
        try {
            const result = await fetchChannelAnalytics(query);
            if (result.error) {
                throw new Error(result.error);
            }
            if (!result.data) {
                throw new Error("Channel not found or no data available.");
            }
            setChannelData(result.data);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | undefined | null; }) => {
        if (!value) return null;
        return (
            <div className="flex items-start justify-between py-2 border-b border-border/50">
                <div className="flex items-center gap-2 font-semibold">
                    {icon}
                    <span>{label}</span>
                </div>
                <span className="text-muted-foreground text-right">{value}</span>
            </div>
        );
    };
    
    const LoadingSkeleton = () => (
         <div className="space-y-6">
            <Card className="overflow-hidden">
                <Skeleton className="h-32 md:h-48 w-full" />
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
                    <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full -mt-16 sm:-mt-20 border-4 border-background" />
                    <div className="space-y-2 text-center sm:text-left">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-5 w-32" />
                    </div>
                </div>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
    );

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <BarChart2 className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">YouTube Channel Analyzer</CardTitle>
                        <CardDescription>Get in-depth analytics for any YouTube channel.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                                placeholder="Enter YouTube channel URL..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="text-base"
                            />
                            <Button onClick={handleSearch} disabled={isLoading} size="lg" className="w-full sm:w-auto">
                                <Search className="mr-2" />
                                {isLoading ? 'Analyzing...' : 'Analyze Channel'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {isLoading && <LoadingSkeleton />}
                
                {error && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                
                {channelData && (
                    <div className="space-y-6">
                        <Card className="overflow-hidden shadow-2xl shadow-primary/10">
                            {channelData.bannerUrl && <img src={channelData.bannerUrl} alt={`${channelData.title} banner`} className="h-32 md:h-48 w-full object-cover"/>}
                            <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 -mt-12 sm:-mt-16">
                                <img src={channelData.thumbnailUrl} alt={channelData.title} className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background shadow-lg"/>
                                <div className="space-y-1 text-center sm:text-left">
                                    <h2 className="text-2xl md:text-3xl font-bold font-headline">{channelData.title}</h2>
                                    <div className="flex items-center gap-2 text-muted-foreground justify-center sm:justify-start">
                                        <p>{channelData.handle}</p>
                                        {channelData.isVerified && <BadgeCheck className="w-5 h-5 text-blue-500" />}
                                    </div>
                                </div>
                            </div>
                        </Card>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                           <StatCard icon={<Users className="w-8 h-8" />} label="Subscribers" value={channelData.subscriberCount} />
                           <StatCard icon={<Eye className="w-8 h-8" />} label="Total Views" value={channelData.viewCount} />
                           <StatCard icon={<Video className="w-8 h-8" />} label="Videos" value={channelData.videoCount} />
                        </div>
                        
                        <Tabs defaultValue="about">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="about"><Info className="mr-2"/>About</TabsTrigger>
                                <TabsTrigger value="stats"><BarChart2 className="mr-2"/>Statistics</TabsTrigger>
                            </TabsList>
                            <TabsContent value="about">
                                <Card>
                                    <CardContent className="pt-6 space-y-2">
                                        {channelData.description && <p className="text-muted-foreground text-sm whitespace-pre-wrap">{channelData.description}</p>}
                                        <InfoRow icon={<Calendar className="w-4 h-4"/>} label="Published Date" value={channelData.publishedAt} />
                                        <InfoRow icon={<Globe className="w-4 h-4"/>} label="Country" value={channelData.country} />
                                        <InfoRow icon={<Hash className="w-4 h-4"/>} label="Channel ID" value={channelData.id} />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                             <TabsContent value="stats">
                                <Card>
                                    <CardContent className="pt-6 space-y-2">
                                        <InfoRow icon={<Users className="w-4 h-4"/>} label="Subscriber Count" value={channelData.subscriberCount ? Number(channelData.subscriberCount).toLocaleString() : 'Hidden'} />
                                        <InfoRow icon={<Eye className="w-4 h-4"/>} label="Total Views" value={Number(channelData.viewCount).toLocaleString()} />
                                        <InfoRow icon={<Video className="w-4 h-4"/>} label="Total Videos" value={Number(channelData.videoCount).toLocaleString()} />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                )}
            </div>
        </div>
    );
}
