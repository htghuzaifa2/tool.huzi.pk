
"use client"

import { useState, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Voicemail, BookOpen } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function VowelConsonantCounterPage() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.")
  const vowelConsonantGuide = guides.find(g => g.href.includes('vowel-consonant-counter'));

  const stats = useMemo(() => {
    let vowels = 0;
    let consonants = 0;
    const lowerCaseText = text.toLowerCase();
    
    for (let i = 0; i < lowerCaseText.length; i++) {
        const char = lowerCaseText[i];
        if (char >= 'a' && char <= 'z') {
            if ('aeiou'.includes(char)) {
                vowels++;
            } else {
                consonants++;
            }
        }
    }

    return { vowels, consonants, characters: text.length };
  }, [text]);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Voicemail className="w-8 h-8" />
                </div>
                <CardTitle className="text-4xl font-bold font-headline">Vowel & Consonant Counter</CardTitle>
                <CardDescription>Instantly count the number of vowels and consonants in your text.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Textarea
                  placeholder="Start typing or paste your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] text-base font-mono bg-muted/50"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold">{stats.vowels}</CardTitle>
                            <p className="text-muted-foreground">Vowels</p>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold">{stats.consonants}</CardTitle>
                            <p className="text-muted-foreground">Consonants</p>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold">{stats.characters}</CardTitle>
                            <p className="text-muted-foreground">Total Characters</p>
                        </CardHeader>
                    </Card>
                </div>
            </CardContent>
        </Card>

        {vowelConsonantGuide && (
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="guide" className="border-none flex flex-col items-center">
                    <AccordionTrigger asChild>
                        <button className="relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-foreground group bg-gradient-to-br from-primary via-accent to-destructive group-hover:from-primary/90 group-hover:via-accent/90 group-hover:to-destructive/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40 h-11 px-8">
                            <span className="relative flex items-center px-6 py-3 transition-all ease-in duration-200 bg-background rounded-md group-hover:bg-opacity-0">
                                <BookOpen className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                                Read The Guide
                            </span>
                        </button>
                    </AccordionTrigger>
                    <AccordionContent className="pt-6 w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">{vowelConsonantGuide.title}</CardTitle>
                                <CardDescription>{vowelConsonantGuide.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                    {vowelConsonantGuide.steps.map((step, stepIndex) => (
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
  )
}
