"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RichTextEditor } from "@/components/rich-text-editor";
import { Pilcrow, BookOpen } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function RichTextEditorPage() {
  const richTextEditorGuide = guides.find(g => g.href.includes('rich-text-editor'));

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Pilcrow className="w-8 h-8" />
                </div>
                <CardTitle className="text-4xl font-bold font-headline">Rich Text Editor</CardTitle>
                <CardDescription>An advanced editor for all your formatting needs. Content is saved locally.</CardDescription>
            </CardHeader>
            <CardContent>
                <RichTextEditor />
            </CardContent>
        </Card>

        {richTextEditorGuide && (
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="guide" className="border-none">
                    <AccordionTrigger asChild>
                        <div className="flex justify-center">
                            <Button size="lg" variant="ghost" className="relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-foreground group bg-gradient-to-br from-primary via-accent to-destructive group-hover:from-primary/90 group-hover:via-accent/90 group-hover:to-destructive/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40">
                                <span className="relative flex items-center px-6 py-3 transition-all ease-in duration-200 bg-background rounded-md group-hover:bg-opacity-0">
                                    <BookOpen className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                                    Read The Guide
                                </span>
                            </Button>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-6 w-full">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">{richTextEditorGuide.title}</CardTitle>
                                <CardDescription>{richTextEditorGuide.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                    {richTextEditorGuide.steps.map((step, stepIndex) => (
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
