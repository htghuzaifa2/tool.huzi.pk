
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';

const ConvertTextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
  voice: z.string().describe('The prebuilt voice to use.'),
});

export type ConvertTextToSpeechInput = z.infer<typeof ConvertTextToSpeechInputSchema>;

const ConvertTextToSpeechOutputSchema = z.object({
  audio: z.string().describe("A data URI of the generated WAV audio. Format: 'data:audio/wav;base64,<encoded_data>'"),
});

export type ConvertTextToSpeechOutput = z.infer<typeof ConvertTextToSpeechOutputSchema>;

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const textToSpeechFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: ConvertTextToSpeechInputSchema,
    outputSchema: ConvertTextToSpeechOutputSchema,
  },
  async ({ text, voice }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
      prompt: text,
    });

    if (!media) {
      throw new Error('No media returned from the TTS model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavBase64 = await toWav(audioBuffer);

    return {
      audio: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);

export async function convertTextToSpeech(input: ConvertTextToSpeechInput): Promise<ConvertTextToSpeechOutput> {
  return textToSpeechFlow(input);
}
