
"use client"

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Volume2, ArrowRightLeft, Languages, Copy, Loader2 } from 'lucide-react';

const MORSE_CODE_MAP: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ' ': '/', ',': '--..--', '.': '.-.-.-', '?': '..--..', ';': '-.-.-.', ':': '---...',
    '\'': '.----.', '-': '-....-', '(': '-.--.', ')': '-.--.-', '_': '..--.-', '"': '.-..-.',
    '$': '...-..-', '!': '-.-.--', '@': '.--.-.', '=': '-...-', '+': '.-.-.'
};

const REVERSE_MORSE_CODE_MAP: { [key: string]: string } = Object.entries(MORSE_CODE_MAP)
    .reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {});

export default function MorseCodeTranslatorPage() {
    const [textInput, setTextInput] = useState('Hello World');
    const [morseInput, setMorseInput] = useState('.... . .-.. .-.. --- / .-- --- .-. .-.. -..');
    const [isPlaying, setIsPlaying] = useState(false);
    const { toast } = useToast();
    let audioContext: AudioContext | null = null;

    const textToMorse = useCallback(() => {
        if (!textInput) {
            setMorseInput('');
            return;
        }
        const morse = textInput.toUpperCase().split('').map(char => MORSE_CODE_MAP[char] || '').join(' ');
        setMorseInput(morse);
    }, [textInput]);

    const morseToText = useCallback(() => {
        if (!morseInput) {
            setTextInput('');
            return;
        }
        const text = morseInput.split(' ').map(code => REVERSE_MORSE_CODE_MAP[code] || '').join('');
        setTextInput(text);
    }, [morseInput]);
    
    const playMorseSound = async () => {
        if (!morseInput || isPlaying) return;

        setIsPlaying(true);
        if (!audioContext) {
            try {
                audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            } catch (e) {
                toast({ title: "Audio Error", description: "Your browser does not support the Web Audio API.", variant: "destructive"});
                setIsPlaying(false);
                return;
            }
        }

        const dotDuration = 80; // ms
        const dashDuration = dotDuration * 3;
        const symbolSpace = dotDuration;
        const letterSpace = dotDuration * 3;
        const wordSpace = dotDuration * 7;

        let currentTime = audioContext.currentTime;

        const playTone = (duration: number, time: number) => {
            if (!audioContext) return;
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 600; // a pleasant beep frequency
            gainNode.gain.setValueAtTime(0, time);
            gainNode.gain.linearRampToValueAtTime(0.5, time + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, time + duration);

            oscillator.start(time);
            oscillator.stop(time + duration);
        };

        for (const char of morseInput) {
            switch (char) {
                case '.':
                    playTone(dotDuration / 1000, currentTime);
                    currentTime += (dotDuration + symbolSpace) / 1000;
                    break;
                case '-':
                    playTone(dashDuration / 1000, currentTime);
                    currentTime += (dashDuration + symbolSpace) / 1000;
                    break;
                case ' ':
                    currentTime += (letterSpace - symbolSpace) / 1000;
                    break;
                case '/':
                    currentTime += (wordSpace - letterSpace) / 1000;
                    break;
            }
        }

        setTimeout(() => setIsPlaying(false), (currentTime - audioContext.currentTime) * 1000);
    };

    const handleSwap = () => {
        setTextInput(morseInput);
        setMorseInput(textInput);
    };
    
    const copyToClipboard = (text: string) => {
        if(!text) return;
        navigator.clipboard.writeText(text);
        toast({ title: "Copied!", description: "Content copied to clipboard." });
    };

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Languages className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Morse Code Translator</CardTitle>
                        <CardDescription>Translate text to Morse code and back, with sound playback.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="text-input">Text</Label>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(textInput)}>
                                        <Copy className="h-4 w-4"/>
                                    </Button>
                                </div>
                                <Textarea
                                    id="text-input"
                                    placeholder="Enter text..."
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                    className="min-h-[200px] font-mono"
                                />
                                <Button onClick={textToMorse} className="w-full">Translate to Morse</Button>
                            </div>
                             <div className="space-y-2">
                                 <div className="flex justify-between items-center">
                                    <Label htmlFor="morse-input">Morse Code</Label>
                                    <div className="flex items-center">
                                        <Button variant="ghost" size="icon" onClick={playMorseSound} disabled={isPlaying}>
                                            {isPlaying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4"/>}
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(morseInput)}>
                                            <Copy className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </div>
                                <Textarea
                                    id="morse-input"
                                    placeholder="Enter morse code..."
                                    value={morseInput}
                                    onChange={(e) => setMorseInput(e.target.value.replace(/[^.\- /]/g, ''))}
                                    className="min-h-[200px] font-mono"
                                />
                                <Button onClick={morseToText} className="w-full">Translate to Text</Button>
                            </div>
                        </div>

                        <div className="text-center">
                            <Button variant="outline" onClick={handleSwap}>
                                <ArrowRightLeft className="mr-2 h-4 w-4" />
                                Swap
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

