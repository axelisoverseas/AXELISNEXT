import { Montserrat } from "next/font/google";
import Script from "next/script";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpiralIntroMount from '@/components/ui/SpiralIntroMount';
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://overseeducation.com'),
  icons: {
    icon: '/favicon.png',
  },
  title: {
    template: '%s | Axelis Overseas Education',
    default: 'Axelis Overseas | Study Abroad Consultancy — 70+ Universities, 6 Countries',
  },
  description: "India's trusted study abroad consultancy. Search 5,000+ courses at 70+ partner universities across UK, USA, Ireland, Germany, France & Finland. Guaranteed admissions, visa support, zero tuition options. Book a free consultation today.",
  keywords: [
    "study abroad", "overseas education", "study abroad consultancy India",
    "study in UK", "study in USA", "study in Ireland", "study in Germany",
    "study in Europe free tuition", "study abroad from India",
    "masters abroad", "MBA abroad", "undergraduate abroad",
    "university admissions", "student visa assistance", "IELTS preparation",
    "education loan abroad", "scholarship abroad", "zero tuition university",
    "Student Plans", "Axelis Overseas", "overseeducation",
    "best study abroad consultant Bengaluru", "study abroad consultant India",
  ],
  authors: [{ name: 'Axelis Overseas Education' }],
  creator: 'Axelis Overseas Education',
  publisher: 'Axelis Overseas Education',
  alternates: {
    canonical: 'https://overseeducation.com',
  },
  openGraph: {
    title: 'Axelis Overseas — Study Abroad Consultancy | 70+ Partner Universities',
    description: 'We guide Indian students to their dream university with guaranteed admission and high visa success rates. Zero tuition & zero consultation fee options available.',
    url: 'https://overseeducation.com',
    siteName: 'Axelis Overseas Education',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Axelis Overseas Education — Study Abroad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axelis Overseas | Study Abroad — 70+ Universities, 6 Countries',
    description: 'India\'s trusted study abroad consultancy. Guaranteed admissions, visa support, zero tuition options.',
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
  description: 'India\'s trusted study abroad consultancy helping students pursue higher education at 70+ partner universities across UK, USA, Ireland, Germany, France, and Finland.',
  email: 'axelisoverseas@overseeducation.com',
  telephone: '+91 8970224250',
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
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <head>
        {/* Spiral intro anti-flash: ship the cover styles INLINE so they
            apply on the first paint, before globals.css has loaded. The
            blocking script below adds `intro-pending` synchronously when
            the spiral should show. Together they guarantee the page never
            flashes through before SpiralIntro hydrates on top. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html.intro-pending,html.intro-pending body{overflow:hidden!important;background:#000!important}html.intro-pending::before{content:"";position:fixed;inset:0;z-index:999;background:#000;pointer-events:none}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var f=new URLSearchParams(location.search).get('intro')==='force';if(f||!sessionStorage.getItem('axelis_intro_seen_v1')){document.documentElement.classList.add('intro-pending');}}catch(e){}})();`,
          }}
        />
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://overseeducation.com" />
      </head>
      <body className="font-sans antialiased text-[var(--storm-bolt)] bg-[var(--storm-deep)] flex flex-col min-h-screen site-body">
        <div className="site-wallpaper" aria-hidden="true">
          <div className="site-wallpaper__layer site-wallpaper__layer--gradient" />
          <div className="site-wallpaper__layer site-wallpaper__layer--stars" />
          <div className="site-wallpaper__layer site-wallpaper__layer--stars site-wallpaper__layer--stars-far" />
          <div className="site-wallpaper__layer site-wallpaper__layer--nebula" />
        </div>
        <Navbar />
        <main className="flex-grow relative z-[1]">
          {children}
        </main>
        <Footer />
        <SpiralIntroMount />
        <SpeedInsights />
      </body>
    </html>
  );
}
