
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Shuffle, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

const findAnagrams = (word: string): Set<string> => {
    const results = new Set<string>();
    if (word.length <= 1) {
        results.add(word);
        return results;
    }

    const findPermutations = (prefix: string, remaining: string) => {
        if (remaining.length === 0) {
            results.add(prefix);
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            const newPrefix = prefix + remaining[i];
            const newRemaining = remaining.substring(0, i) + remaining.substring(i + 1);
            findPermutations(newPrefix, newRemaining);
        }
    };

    findPermutations('', word);
    return results;
};

export default function AnagramFinderPage() {
    const [word, setWord] = useState('');
    const [anagrams, setAnagrams] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const maxLength = 8; // Limit input length to prevent performance issues
    const anagramFinderGuide = guides.find(g => g.href.includes('anagram-finder'));

    const handleFindAnagrams = () => {
        const trimmedWord = word.trim();
        if (!trimmedWord) {
            toast({
                title: "Input Required",
                description: "Please enter a word to find anagrams for.",
                variant: "destructive"
            });
            return;
        }
        if (trimmedWord.length > maxLength) {
            toast({
                title: "Word Too Long",
                description: `For performance reasons, please enter a word with ${maxLength} characters or less.`,
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        setAnagrams([]);
        
        // Use a timeout to allow the UI to update to the loading state
        setTimeout(() => {
            const results = findAnagrams(trimmedWord.toLowerCase());
            setAnagrams(Array.from(results).sort());
            setIsLoading(false);
        }, 50);
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-2xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Shuffle className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Anagram Finder</CardTitle>
                        <CardDescription>Find all possible letter combinations for a given word.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Input
                                placeholder="Enter a word..."
                                value={word}
                                onChange={(e) => setWord(e.target.value)}
                                maxLength={maxLength}
                                className="text-lg"
                            />
                            <Button onClick={handleFindAnagrams} disabled={isLoading} className="sm:w-48">
                                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Working...</> : 'Find Anagrams'}
                            </Button>
                        </div>

                        {anagrams.length > 0 && (
                            <div>
                                <h3 className="text-center font-semibold mb-2">{anagrams.length} Anagrams Found for "{word}"</h3>
                                <ScrollArea className="h-72 w-full rounded-md border p-4 bg-muted">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2 font-mono">
                                        {anagrams.map((ana, index) => (
                                            <p key={index}>{ana}</p>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {anagramFinderGuide && (
                   <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" className="border-none flex flex-col items-center">
                            <AccordionTrigger asChild>
                                <button className="relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-foreground group bg-gradient-to-br from-primary via-accent to-destructive group-hover:from-primary/90 group-hover:via-accent/90 group-hover:to-destructive/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40">
                                    <span className="relative flex items-center px-6 py-3 transition-all ease-in duration-200 bg-background rounded-md group-hover:bg-opacity-0">
                                        <BookOpen className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                                        Read The Guide
                                    </span>
                                </button>
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{anagramFinderGuide.title}</CardTitle>
                                        <CardDescription>{anagramFinderGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {anagramFinderGuide.steps.map((step, stepIndex) => (
                                                <li key={stepIndex}>{step}</li>
                                            ))}
                                        </ol>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
            </div>
        </div>
    );
}
