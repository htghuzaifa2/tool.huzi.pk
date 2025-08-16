"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Copy, CaseSensitive, BookOpen } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
};

const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
};

const invertCase = (str: string) => {
    return str.split('').map(char => {
        if (char >= 'A' && char <= 'Z') {
            return char.toLowerCase();
        } else if (char >= 'a' && char <= 'z') {
            return char.toUpperCase();
        }
        return char;
    }).join('');
};

export default function TextToolsPage() {
  const [text, setText] = useState("Hello World! This is an example sentence.")
  const { toast } = useToast();
  const textToolsGuide = guides.find(g => g.href.includes('text-tools'));

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const characters = text.length;
    const sentences = trimmedText ? (trimmedText.match(/[.!?]+(?:\s|$)/g) || []).length : 0;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    return { words, characters, sentences, paragraphs };
  }, [text]);

  const copyToClipboard = () => {
        if (!text) {
            toast({
                title: "Nothing to Copy",
                variant: "destructive"
            });
            return;
        }
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: "Text copied to clipboard.",
        });
    };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        &lt;div className="text-center mb-8"&gt;
            &lt;div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4"&gt;
                &lt;CaseSensitive className="w-8 h-8" /&gt;
            &lt;/div&gt;
          &lt;h1 className="text-4xl md:text-5xl font-bold font-headline"&gt;Text Manipulation Tools&lt;/h1&gt;
          &lt;p className="text-muted-foreground mt-2"&gt;
            A versatile set of tools to convert, count, and analyze your text.
          &lt;/p&gt;
        &lt;/div&gt;

        &lt;Tabs defaultValue="case-converter" className="w-full"&gt;
          &lt;TabsList className="grid w-full grid-cols-2"&gt;
            &lt;TabsTrigger value="case-converter"&gt;Case Converter&lt;/TabsTrigger&gt;
            &lt;TabsTrigger value="counter"&gt;Counter&lt;/TabsTrigger&gt;
          &lt;/TabsList&gt;
          
          &lt;TabsContent value="case-converter"&gt;
            &lt;Card&gt;
               &lt;CardHeader&gt;
                    &lt;CardTitle&gt;Case Converter&lt;/CardTitle&gt;
                    &lt;CardDescription&gt;Convert your text to various case formats.&lt;/CardDescription&gt;
                &lt;/CardHeader&gt;
              &lt;CardContent className="space-y-4"&gt;
                &lt;Textarea
                  placeholder="Enter text to convert..."
                  value={text}
                  onChange={(e) =&gt; setText(e.target.value)}
                  className="min-h-[250px] text-base"
                /&gt;
                &lt;div className="flex flex-wrap gap-2 justify-between items-center"&gt;
                    &lt;div className="flex flex-wrap gap-2"&gt;
                        &lt;Button onClick={() =&gt; setText(text.toUpperCase())}&gt;Uppercase&lt;/Button&gt;
                        &lt;Button onClick={() =&gt; setText(text.toLowerCase())}&gt;Lowercase&lt;/Button&gt;
                        &lt;Button onClick={() =&gt; setText(toTitleCase(text))}&gt;Title Case&lt;/Button&gt;
                        &lt;Button onClick={() =&gt; setText(toSentenceCase(text))}&gt;Sentence Case&lt;/Button&gt;
                        &lt;Button onClick={() =&gt; setText(invertCase(text))}&gt;Invert Case&lt;/Button&gt;
                    &lt;/div&gt;
                    &lt;Button variant="ghost" size="icon" onClick={copyToClipboard}&gt;&lt;Copy className="h-5 w-5"/&gt;&lt;/Button&gt;
                &lt;/div&gt;
              &lt;/CardContent&gt;
            &lt;/Card&gt;
          &lt;/TabsContent&gt;

          &lt;TabsContent value="counter"&gt;
             &lt;Card&gt;
              &lt;CardHeader&gt;
                &lt;CardTitle&gt;Text Counter&lt;/CardTitle&gt;
                 &lt;CardDescription&gt;Analyze your text for word, character, and line counts.&lt;/CardDescription&gt;
              &lt;/CardHeader&gt;
              &lt;CardContent className="space-y-4"&gt;
                &lt;Textarea
                  placeholder="Enter text to analyze..."
                  value={text}
                  onChange={(e) =&gt; setText(e.target.value)}
                  className="min-h-[250px] text-base"
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
          &lt;/TabsContent&gt;
        &lt;/Tabs&gt;

        {textToolsGuide && (
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
                                &lt;CardTitle className="font-headline"&gt;{textToolsGuide.title}&lt;/CardTitle&gt;
                                &lt;CardDescription&gt;{textToolsGuide.description}&lt;/CardDescription&gt;
                            &lt;/CardHeader&gt;
                            &lt;CardContent&gt;
                                &lt;ol className="list-decimal list-inside space-y-2 text-muted-foreground"&gt;
                                    {textToolsGuide.steps.map((step, stepIndex) =&gt; (
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
