"use client"

import { useState, useMemo } from "react"
import { Textarea from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Type, BookOpen } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function WordCounterPage() {
  const [text, setText] = useState("")
  const wordCounterGuide = guides.find(g => g.href.includes('word-counter'));

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const characters = text.length;
    const sentences = trimmedText ? (trimmedText.match(/[.!?]+/g) || []).length : 0;
    const paragraphs = trimmedText ? trimmedText.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
    return { words, characters, sentences, paragraphs };
  }, [text]);

  return (
    &lt;div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8"&gt;
      &lt;div className="max-w-4xl mx-auto space-y-8"&gt;
        &lt;Card&gt;
            &lt;CardHeader className="text-center"&gt;
                &lt;div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4"&gt;
                    &lt;Type className="w-8 h-8" /&gt;
                &lt;/div&gt;
                &lt;CardTitle className="text-4xl font-bold font-headline"&gt;Word &amp; Character Counter&lt;/CardTitle&gt;
                &lt;CardDescription&gt;Instantly count words, characters, sentences, and paragraphs in your text.&lt;/CardDescription&gt;
            &lt;/CardHeader&gt;
            &lt;CardContent className="space-y-6"&gt;
                &lt;Textarea
                  placeholder="Start typing or paste your text here to see the magic happen..."
                  value={text}
                  onChange={(e) =&gt; setText(e.target.value)}
                  className="min-h-[300px] text-base font-mono bg-muted/50"
                /&gt;
                &lt;div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"&gt;
                    &lt;Card&gt;
                        &lt;CardHeader&gt;
                            &lt;CardTitle className="text-4xl font-bold"&gt;{stats.words}&lt;/CardTitle&gt;
                            &lt;p className="text-muted-foreground"&gt;Words&lt;/p&gt;
                        &lt;/CardHeader&gt;
                    &lt;/Card&gt;
                     &lt;Card&gt;
                        &lt;CardHeader&gt;
                            &lt;CardTitle className="text-4xl font-bold"&gt;{stats.characters}&lt;/CardTitle&gt;
                            &lt;p className="text-muted-foreground"&gt;Characters&lt;/p&gt;
                        &lt;/CardHeader&gt;
                    &lt;/Card&gt;
                     &lt;Card&gt;
                        &lt;CardHeader&gt;
                            &lt;CardTitle className="text-4xl font-bold"&gt;{stats.sentences}&lt;/CardTitle&gt;
                            &lt;p className="text-muted-foreground"&gt;Sentences&lt;/p&gt;
                        &lt;/CardHeader&gt;
                    &lt;/Card&gt;
                     &lt;Card&gt;
                        &lt;CardHeader&gt;
                            &lt;CardTitle className="text-4xl font-bold"&gt;{stats.paragraphs}&lt;/CardTitle&gt;
                            &lt;p className="text-muted-foreground"&gt;Paragraphs&lt;/p&gt;
                        &lt;/CardHeader&gt;
                    &lt;/Card&gt;
                &lt;/div&gt;
            &lt;/CardContent&gt;
        &lt;/Card&gt;

        {wordCounterGuide && (
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
                                &lt;CardTitle className="font-headline"&gt;{wordCounterGuide.title}&lt;/CardTitle&gt;
                                &lt;CardDescription&gt;{wordCounterGuide.description}&lt;/CardDescription&gt;
                            &lt;/CardHeader&gt;
                            &lt;CardContent&gt;
                                &lt;ol className="list-decimal list-inside space-y-2 text-muted-foreground"&gt;
                                    {wordCounterGuide.steps.map((step, stepIndex) =&gt; (
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
  )
}
