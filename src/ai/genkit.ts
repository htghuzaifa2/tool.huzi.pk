
'use server';
/**
 * @fileoverview This file initializes the Genkit AI singleton.
 *
 * It is important that this file is imported before any other Genkit-related
 * files.
 */
import {genkit, type GenkitErrorCode} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {firebase} from '@genkit-ai/firebase';

export const ai = genkit({
  plugins: [
    firebase(), // This must be listed before googleAI().
    googleAI({
      apiVersion: ['v1', 'v1beta'],
    }),
  ],
  logLevel: 'debug',
  enableTracing: true,
});

export type GenkitError = {
  code: GenkitErrorCode;
  message: string;
};
