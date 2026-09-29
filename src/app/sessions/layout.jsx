import { Instrument_Serif } from 'next/font/google';

// The italic accent phrase in every /sessions headline (Ambitio's move, in our
// colours). Self-hosted by next/font, so no request to Google at runtime.
const serif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export default function SessionsLayout({ children }) {
  return <div className={serif.variable}>{children}</div>;
}
