import { Lato } from "next/font/google";

// Metabase's stack is Lato with a Helvetica fallback. Lato is SIL OFL and
// served by Google Fonts, so it is licensed for this use. next/font self-hosts
// it at build time and emits a size-adjusted fallback, so there is no layout
// shift on first paint.
const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
import { SITE_URL, siteGraph } from "@/lib/seo";
import Navbar from '@/components/Navbar';
import FollowRail from '@/components/FollowRail';
import Footer from '@/components/Footer';
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Self-hosted at build time by next/font: no third-party request, and
// next/font emits a size-adjusted fallback so there is no layout shift.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/favicon.png',
  },
  title: {
    template: '%s | Axelis Overseas',
    default: 'Axelis Overseas. Every Fee Published Before You Pay',
  },
  description: "India's study-abroad consultancy across 29 destination markets. One counsellor from shortlist to arrival, every fee published before you pay. Bengaluru + Bilaspur.",
  keywords: [
    "study abroad", "overseas education", "study abroad consultancy India",
    "study in UK", "study in USA", "study in Ireland", "study in Germany",
    "study in Europe free tuition", "study abroad from India",
    "masters abroad", "MBA abroad", "undergraduate abroad",
    "university admissions", "student visa assistance", "IELTS preparation",
    "education loan abroad", "scholarship abroad", "zero tuition university",
    "Student Plans", "Axelis Overseas", "overseeducation",
    "best study abroad consultant Bengaluru", "study abroad consultant India",
    "study abroad certification", "application coaching certificate",
    "German CEFR B1 India", "French CEFR B1 India", "Executive MBA application coaching",
    "PhD application coaching India", "study abroad course EMI", "certification programmes India",
  ],
  authors: [{ name: 'Axelis Overseas Education' }],
  creator: 'Axelis Overseas Education',
  publisher: 'Axelis Overseas Education',
  openGraph: {
    title: 'Axelis Overseas. Every Fee Published Before You Pay',
    description: 'End-to-end certification programmes. Concierge tiers carry a written refund commitment. Application coaching, languages to CEFR B1, executive MBA and PhD support. EMI available.',
    siteName: 'Axelis Overseas Education',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Axelis Overseas Education. Study Abroad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axelis Overseas. Every Fee Published Before You Pay',
    description: 'Certification programmes. Concierge tiers carry a written refund commitment. EMI available. Bengaluru + Bilaspur.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  category: 'education',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lato.variable} suppressHydrationWarning>
      <head>
        {/* A plain script, not next/script: that injects after hydration, and
            answer-engine crawlers do not run JavaScript. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
        />
      </head>
      <body className="font-sans antialiased text-[var(--foreground)] bg-[var(--background)] flex flex-col min-h-screen site-body">
        <Navbar />
        <main className="flex-grow relative z-[1]">
          {children}
        </main>
        <Footer />
        <FollowRail />
        <SpeedInsights />
      </body>
    </html>
  );
}
