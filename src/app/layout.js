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
import Script from "next/script";
import Navbar from '@/components/Navbar';
import FollowRail from '@/components/FollowRail';
import Footer from '@/components/Footer';
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Self-hosted at build time by next/font: no third-party request, and
// next/font emits a size-adjusted fallback so there is no layout shift.
export const metadata = {
  metadataBase: new URL('https://overseeducation.com'),
  icons: {
    icon: '/favicon.png',
  },
  title: {
    template: '%s | Axelis Overseas Education',
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
  alternates: {
    canonical: 'https://overseeducation.com',
  },
  openGraph: {
    title: 'Axelis Overseas. Every Fee Published Before You Pay',
    description: 'End-to-end certification programmes. Concierge tiers carry a written refund commitment. Application coaching, languages to CEFR B1, executive MBA and PhD support. EMI available.',
    url: 'https://overseeducation.com',
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

// JSON-LD structured data for the organization
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Axelis Overseas Education',
  alternateName: 'Axelis Overseas',
  url: 'https://overseeducation.com',
  logo: 'https://overseeducation.com/logo.png',
  description: 'India\'s trusted study abroad consultancy helping students pursue higher education across 29 countries, including the UK, USA, Canada, Australia and Europe.',
  email: 'axelisoverseas@overseeducation.com',
  telephone: '+91 9098522711',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/axelisoverseas/',
    'https://www.youtube.com/@axelisoverseas',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  serviceType: ['Study Abroad Consulting', 'University Admissions', 'Visa Assistance', 'Scholarship Guidance', 'Education Loans'],
  knowsAbout: ['Study in UK', 'Study in USA', 'Study in Ireland', 'Study in Germany', 'Study in France', 'Study in Finland'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lato.variable} suppressHydrationWarning>
      <head>
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
