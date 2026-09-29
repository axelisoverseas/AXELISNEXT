import { Instrument_Serif } from 'next/font/google';

// The italic accent phrase in /sessions and /ivy-league headlines (Ambitio's
// move, in our colours). Self-hosted by next/font; no runtime request to Google.
export const serif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});
