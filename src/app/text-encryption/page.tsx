"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Lock, Unlock, Key, ArrowRight, Copy, BookOpen } from 'lucide-react';
import { z } from 'zod';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

const formSchema = z.object({
  text: z.string().min(1, "Text to process cannot be empty."),
  shift: z.coerce.number().int().min(1, "Shift key must be at least 1.").max(25, "Shift key must be at most 25."),
});

export default function TextEncryptionPage() {
    const [inputText, setInputText] = useState('');
    const [shiftKey, setShiftKey] = useState('3');
    const [outputText, setOutputText] = useState('');
    const { toast } = useToast();
    const textEncryptionGuide = guides.find(g => g.href.includes('text-encryption'));

    const processText = (mode: 'encrypt' | 'decrypt') => {
        const validation = formSchema.safeParse({ text: inputText, shift: shiftKey });
        if (!validation.success) {
            toast({
                title: "Invalid Input",
                description: validation.error.errors[0].message,
                variant: "destructive",
            });
            return;
        }

        const { text, shift } = validation.data;
        const finalShift = mode === 'encrypt' ? shift : -shift;

        const result = text.split('').map(char => {
            const charCode = char.charCodeAt(0);

            // Uppercase letters
            if (charCode >= 65 && charCode <= 90) {
                return String.fromCharCode(((charCode - 65 + finalShift + 26) % 26) + 65);
            }
            // Lowercase letters
            else if (charCode >= 97 && charCode <= 122) {
                return String.fromCharCode(((charCode - 97 + finalShift + 26) % 26) + 97);
            }
            // Not a letter, return as is
            else {
                return char;
            }
        }).join('');

        setOutputText(result);
        toast({
            title: `Success!`,
            description: `Text has been ${mode}ed.`,
        });
    };

    const copyToClipboard = () => {
        if (!outputText) {
            toast({
                title: "Nothing to Copy",
                description: "There is no output text to copy.",
                variant: "destructive"
            });
            return;
        }
        navigator.clipboard.writeText(outputText);
        toast({
            title: "Copied!",
            description: "The output text has been copied to your clipboard.",
        });
    };


    return (
        <div className="container mx-auto py-10">
            <div className="max-w-2xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                         <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Lock className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Text Encryption Tool</CardTitle>
                        <CardDescription>Encrypt or decrypt text using a simple Caesar cipher.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        &lt;div className="grid gap-2"&gt;
                           &lt;Label htmlFor="input-text"&gt;Input Text&lt;/Label&gt;
                           &lt;Textarea
                                id="input-text"
                                placeholder="Enter the text you want to process..."
                                value={inputText}
                                onChange={(e) =&gt; setInputText(e.target.value)}
                                className="min-h-[150px] font-mono"
                           /&gt;
                        &lt;/div&gt;
                        &lt;div className="grid gap-2"&gt;
                           &lt;Label htmlFor="shift-key"&gt;Cipher Shift Key (1-25)&lt;/Label&gt;
                           &lt;div className="relative"&gt;
                               &lt;Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /&gt;
                               &lt;Input
                                    id="shift-key"
                                    type="number"
                                    min="1"
                                    max="25"
                                    value={shiftKey}
                                    onChange={(e) =&gt; setShiftKey(e.target.value)}
                                    className="pl-10"
                                /&gt;
                           &lt;/div&gt;
                        &lt;/div&gt;

                        &lt;div className="flex justify-center gap-4"&gt;
                            &lt;Button onClick={() =&gt; processText('encrypt')} size="lg"&gt;
                                &lt;Lock className="mr-2" /&gt; Encrypt
                            &lt;/Button&gt;
                            &lt;Button onClick={() =&gt; processText('decrypt')} size="lg" variant="secondary"&gt;
                                &lt;Unlock className="mr-2" /&gt; Decrypt
                            &lt;/Button&gt;
                        &lt;/div&gt;
                        
                        {outputText && (
                            &lt;div className="grid gap-2"&gt;
                                &lt;Label htmlFor="output-text"&gt;Output Text&lt;/Label&gt;
                                &lt;div className="relative"&gt;
                                    &lt;Textarea
                                        id="output-text"
                                        value={outputText}
                                        readOnly
                                        className="min-h-[150px] font-mono bg-muted"
                                    /&gt;
                                    &lt;Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={copyToClipboard}&gt;
                                        &lt;Copy className="h-5 w-5" /&gt;
                                    &lt;/Button&gt;
                                &lt;/div&gt;
                           &lt;/div&gt;
                        )}
                    &lt;/CardContent&gt;
                &lt;/Card&gt;

                {textEncryptionGuide && (
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
                                        &lt;CardTitle className="font-headline"&gt;{textEncryptionGuide.title}&lt;/CardTitle&gt;
                                        &lt;CardDescription&gt;{textEncryptionGuide.description}&lt;/CardDescription&gt;
                                    &lt;/CardHeader&gt;
                                    &lt;CardContent&gt;
                                        &lt;ol className="list-decimal list-inside space-y-2 text-muted-foreground"&gt;
                                            {textEncryptionGuide.steps.map((step, stepIndex) =&gt; (
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
