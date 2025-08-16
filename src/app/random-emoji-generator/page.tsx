"use client"

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw, Smile, BookOpen } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

// A curated list of common emojis
const emojiList = [
  '😀', '😂', '😍', '🤔', '👍', '🙏', '🔥', '🎉', '🚀', '⭐', '❤️', '💯', '🤯',
  '😎', '😢', '😡', '😴', '😮', '🤩', '🥳', '🥺', '🥴', '😵', '🤪', '😇', '🤠',
  '🤡', '👻', '👽', '🤖', '👾', '🎃', '🎄', '🎁', '🎈', '🎊', '✨', '🍕', '🍔',
  '🍟', '🍦', '🍩', '🍪', '🎂', '🍭', '🍺', '🍷', '🍹', '🦄', '🐳', '🐢', '🐙',
  '🌞', '🌛', '⭐', '🌈', '🌊', '🌍', '💻', '📱', '💡', '💸', '💰', '👑'
];

export default function RandomEmojiGeneratorPage() {
    const [count, setCount] = useState(1);
    const [generatedEmojis, setGeneratedEmojis] = useState('😀');
    const { toast } = useToast();
    const emojiGeneratorGuide = guides.find(g => g.href.includes('random-emoji-generator'));

    const handleGenerate = () => {
        if (count > 0) {
            let result = '';
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * emojiList.length);
                result += emojiList[randomIndex];
            }
            setGeneratedEmojis(result);
        } else {
            setGeneratedEmojis('');
        }
    };
    
    const copyToClipboard = () => {
        if (!generatedEmojis) {
            toast({ title: "Nothing to Copy", variant: "destructive" });
            return;
        }
        navigator.clipboard.writeText(generatedEmojis);
        toast({ title: "Copied!", description: "Emoji(s) copied to clipboard." });
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-md mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Smile className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Random Emoji Generator</CardTitle>
                        <CardDescription>Generate a random emoji or emoji set instantly.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div 
                            className="h-40 flex items-center justify-center border-2 border-dashed rounded-lg text-6xl p-4 bg-muted"
                        >
                           &lt;span className="truncate"&gt;{generatedEmojis}&lt;/span&gt;
                        </div>

                        <div className="flex flex-col sm:flex-row items-end gap-4">
                            <div className="w-full sm:w-auto flex-grow">
                                <Label htmlFor="emoji-count">Number of Emojis</Label>
                                <Input
                                    id="emoji-count"
                                    type="number"
                                    value={count}
                                    onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10)))}
                                    min="1"
                                    max="50"
                                    className="mt-2"
                                />
                            </div>
                            <Button onClick={handleGenerate} size="lg">
                                &lt;RefreshCw className="mr-2 h-4 w-4" /&gt; Generate
                            </Button>
                        </div>
                        
                        &lt;Button onClick={copyToClipboard} size="lg" variant="outline" className="w-full" disabled={!generatedEmojis}&gt;
                            &lt;Copy className="mr-2" /&gt; Copy to Clipboard
                        &lt;/Button&gt;
                    &lt;/CardContent&gt;
                &lt;/Card&gt;

                {emojiGeneratorGuide && (
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
                                        &lt;CardTitle className="font-headline"&gt;{emojiGeneratorGuide.title}&lt;/CardTitle&gt;
                                        &lt;CardDescription&gt;{emojiGeneratorGuide.description}&lt;/CardDescription&gt;
                                    &lt;/CardHeader&gt;
                                    &lt;CardContent&gt;
                                        &lt;ol className="list-decimal list-inside space-y-2 text-muted-foreground"&gt;
                                            {emojiGeneratorGuide.steps.map((step, stepIndex) =&gt; (
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
