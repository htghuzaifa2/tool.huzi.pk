
"use client"

import { useState, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Voicemail } from "lucide-react";

export default function VowelConsonantCounterPage() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.")

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
      <div className="max-w-4xl mx-auto">
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
      </div>
    </div>
  )
}
