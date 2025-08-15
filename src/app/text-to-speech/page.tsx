
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Volume2, Wand2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { convertTextToSpeech } from '@/ai/text-to-speech';

// List of some available prebuilt voices for the TTS model
const voices = [
  "Alloy", "Echo", "Fable", "Onyx", "Nova", "Shimmer",
  "Luna", "Stella", "Leo", "Orion", "Lyra", "Draco",
  "Aquila", "Cygnus", "Pegasus", "Andromeda", "Cassiopeia",
  "Ursa", "Canis", "Vela", "Carina",
];

export default function TextToSpeechPage() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Alloy');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to convert to speech.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setAudioUrl(null);

    try {
      const result = await convertTextToSpeech({ text, voice });
      setAudioUrl(result.audio);
      toast({
        title: "Audio Generated!",
        description: "Your text has been converted to speech.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "Something went wrong while generating the audio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Volume2 className="w-8 h-8" />
            </div>
            <CardTitle className="text-4xl font-bold font-headline">Text to Speech Converter</CardTitle>
            <CardDescription>Convert text into natural-sounding audio using the power of AI.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid w-full gap-2">
              <Textarea
                placeholder="Enter the text you want to convert..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[150px]"
              />
               <p className="text-sm text-muted-foreground">
                Enter up to 5,000 characters.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div>
                <label className="text-sm font-medium">Select a Voice</label>
                <Select value={voice} onValueChange={setVoice}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {voices.map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleGenerate} disabled={isGenerating} size="lg">
                {isGenerating ? 
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...</> : 
                  <><Wand2 className="mr-2" /> Generate Audio</>
                }
              </Button>
            </div>
            {audioUrl && (
              <div className="pt-4">
                <Card className="bg-muted p-4">
                    <audio controls src={audioUrl} className="w-full">
                        Your browser does not support the audio element.
                    </audio>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
