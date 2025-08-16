
"use client"

import { useState, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Type } from "lucide-react";

export default function WordCounterPage() {
  const [text, setText] = useState("")

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const characters = text.length;
    const sentences = trimmedText ? (trimmedText.match(/[.!?]+/g) || []).length : 0;
    const paragraphs = trimmedText ? trimmedText.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
    return { words, characters, sentences, paragraphs };
  }, [text]);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card>
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Type className="w-8 h-8" />
                </div>
                <CardTitle className="text-4xl font-bold font-headline">Word & Character Counter</CardTitle>
                <CardDescription>Instantly count words, characters, sentences, and paragraphs in your text.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Textarea
                  placeholder="Start typing or paste your text here to see the magic happen..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] text-base font-mono bg-muted/50"
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold">{stats.words}</CardTitle>
                            <p className="text-muted-foreground">Words</p>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold">{stats.characters}</CardTitle>
                            <p className="text-muted-foreground">Characters</p>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold">{stats.sentences}</CardTitle>
                            <p className="text-muted-foreground">Sentences</p>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold">{stats.paragraphs}</CardTitle>
                            <p className="text-muted-foreground">Paragraphs</p>
                        </CardHeader>
                    </Card>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
