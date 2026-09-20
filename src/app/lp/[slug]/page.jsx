import React from 'react';
import { notFound } from 'next/navigation';
import LandingPage from '@/components/LandingPage';
import { LANDING_PAGES, LANDING_SLUGS } from '@/data/landingPages';

/**
 * The three conversion landing pages.
 *
 * One dynamic segment, one param, with generateStaticParams, so every page is
 * prerendered at build time and an unknown slug 404s rather than rendering
 * something. The previous attempt at a dynamic route on this site used two
 * params inside one path segment, which Next cannot resolve: both arrived
 * undefined and every URL returned a 500 for as long as it existed. Hence one
 * param, an explicit list, and dynamicParams off.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = LANDING_PAGES[slug];
  if (!page) return {};

  const url = `https://www.overseeducation.com/lp/${slug}`;
  // The root layout already appends the brand via its title template, so
  // adding it here printed it twice in the tab and in search results.
  const title = page.h1;

  return {
    title,
    description: page.sub,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    // openGraph is not passed through the layout's title template, so the
    // brand has to be spelled out here or shared links arrive unbranded.
    openGraph: {
      title: `${page.h1} | Axelis Overseas`,
      description: page.sub,
      url,
      type: 'website',
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = LANDING_PAGES[slug];
  if (!page) notFound();

  // FAQPage schema, built from the same array the page renders, so the two
  // can never disagree. Google treats a mismatch between them as cloaking.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingPage page={page} />
    </>
  );
}
