import Script from 'next/script';
import { faqData } from '@/data/siteData';

export const metadata = {
  title: 'FAQ — Study Abroad Questions Answered',
  description:
    'Answers to the most common questions about studying abroad with Axelis Overseas: countries served, fees, scholarships, visa process, student plans, and more.',
  alternates: { canonical: 'https://overseeducation.com/faq' },
  openGraph: {
    title: 'FAQ | Axelis Overseas',
    description:
      'Frequently asked questions about studying abroad — countries, fees, scholarships, visas, and Axelis student plans.',
    url: 'https://overseeducation.com/faq',
    type: 'website',
  },
};

const stripMarkdown = (text) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: stripMarkdown(item.answer),
    },
  })),
};

export default function FaqLayout({ children }) {
  return (
    <>
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
