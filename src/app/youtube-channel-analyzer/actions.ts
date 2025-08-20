
'use server'

import { z } from 'zod';

const YOUTUBE_API_KEY = 'AIzaSyD-Vw0nS7S1qP-TMR-N3l3etv2SgED3qAI';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

const channelSchema = z.object({
    id: z.string(),
    snippet: z.object({
        title: z.string(),
        description: z.string(),
        customUrl: z.string().optional(),
        publishedAt: z.string().transform(val => new Date(val).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })),
        thumbnails: z.object({
            high: z.object({
                url: z.string(),
            }),
        }),
        country: z.string().optional(),
    }),
    statistics: z.object({
        viewCount: z.string(),
        subscriberCount: z.string().optional(),
        videoCount: z.string(),
    }),
    brandingSettings: z.object({
        image: z.object({
            bannerExternalUrl: z.string().optional(),
        }).optional(),
    }),
    auditDetails: z.object({
        overallGoodStanding: z.boolean(),
    }).optional(),
});

export type YouTubeChannel = {
    id: string;
    title: string;
    description: string;
    handle: string | undefined;
    publishedAt: string;
    thumbnailUrl: string;
    bannerUrl: string | undefined;
    country: string | undefined;
    viewCount: string;
    subscriberCount: string | undefined;
    videoCount: string;
    isVerified: boolean;
};

// Function to extract channel ID from various URL formats
const getChannelIdFromUrl = (url: string): string | null => {
    // Standard URL: youtube.com/channel/UC...
    let match = url.match(/youtube\.com\/channel\/([\w-]+)/);
    if (match) return match[1];
  
    // Handle URL: youtube.com/@handle
    match = url.match(/youtube\.com\/@([\w-]+)/);
    if (match) return match[1];

    // User URL: youtube.com/user/username
    match = url.match(/youtube\.com\/user\/([\w-]+)/);
    if (match) return match[1];
    
    // Short URL: youtu.be/videoID
    match = url.match(/youtu\.be\/([\w-]+)/);
    if (match) return match[1];
    
    // Watch URL: youtube.com/watch?v=videoID
    match = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
    if (match) return match[1];
  
    return null;
  };
  
// This is the main server action that will be called from the client
export async function fetchChannelAnalytics(query: string): Promise<{ data?: YouTubeChannel; error?: string }> {
    if (!YOUTUBE_API_KEY) {
        return { error: 'YouTube API key is not configured on the server.' };
    }
    
    let channelId: string | null = null;
    let searchBy: 'id' | 'forUsername' | 'handle' = 'id';

    const potentialId = getChannelIdFromUrl(query);

    if (potentialId) {
        if (query.includes('/@') || !potentialId.startsWith('UC')) {
             // It's likely a handle or from a non-channel URL, so we'll search by that handle/id
             searchBy = 'handle';
             channelId = potentialId;
        } else {
             channelId = potentialId;
        }
    } else {
        // If no ID/handle is found in URL, assume it's a raw username/handle
        searchBy = 'handle';
        channelId = query;
    }

    if (!channelId) {
        return { error: 'Invalid YouTube channel URL or handle.' };
    }

    try {
        const params = new URLSearchParams({
            part: 'snippet,statistics,brandingSettings,auditDetails',
            key: YOUTUBE_API_KEY,
        });

        if (searchBy === 'id') {
            params.append('id', channelId);
        } else {
            // The API doesn't have a direct handle search for channels, so we search and take the first result.
            // This is less reliable but necessary for vanity URLs.
             const searchResponse = await fetch(`${BASE_URL}/search?part=snippet&q=${channelId}&type=channel&key=${YOUTUBE_API_KEY}`);
             if (!searchResponse.ok) {
                 const errorData = await searchResponse.json();
                 console.error("YouTube API Search Error:", errorData);
                 return { error: errorData.error?.message || 'Failed to search for channel.' };
             }
             const searchData = await searchResponse.json();
             if (!searchData.items || searchData.items.length === 0) {
                 return { error: 'Channel not found with that name or handle.' };
             }
             const foundChannelId = searchData.items[0].id.channelId;
             params.append('id', foundChannelId);
        }
        
        const response = await fetch(`${BASE_URL}/channels?${params.toString()}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error("YouTube API Channels Error:", errorData);
            return { error: errorData.error?.message || 'Failed to fetch channel data.' };
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            return { error: 'Channel not found.' };
        }
        
        const parsed = channelSchema.safeParse(data.items[0]);
        if (!parsed.success) {
            console.error("Zod Parsing Error:", parsed.error.flatten());
            return { error: 'Failed to parse channel data from YouTube API.' };
        }

        const channel = parsed.data;

        const result: YouTubeChannel = {
            id: channel.id,
            title: channel.snippet.title,
            description: channel.snippet.description,
            handle: channel.snippet.customUrl,
            publishedAt: channel.snippet.publishedAt,
            thumbnailUrl: channel.snippet.thumbnails.high.url,
            bannerUrl: channel.brandingSettings.image?.bannerExternalUrl,
            country: channel.snippet.country,
            viewCount: channel.statistics.viewCount,
            subscriberCount: channel.statistics.subscriberCount,
            videoCount: channel.statistics.videoCount,
            isVerified: channel.auditDetails?.overallGoodStanding ?? false,
        };

        return { data: result };

    } catch (error) {
        console.error('Server Action Error:', error);
        return { error: 'An unexpected error occurred on the server.' };
    }
}
