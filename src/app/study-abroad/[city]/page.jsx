import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CITY_PAGES, CITY_SLUGS, cityBySlug, questionsFor, hasOffice } from '@/data/cityPages';
import { SITE_URL, ORG_ID } from '@/lib/seo';

// One page per city that has enough measured search demand to warrant it.
// Deliberately NOT one page per city in India: see the rules in
// src/data/cityPages.js.
export const dynamicParams = false;

export function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const c = cityBySlug(city);
  if (!c) return {};
  return {
    title: `Study abroad consultant for ${c.city} students: published fees, online counselling`,
    description:
      `Axelis counsels ${c.city} students online, with every fee published before you pay. ` +
      `Offices in Bengaluru and Bilaspur; counselling for ${c.city} is over Google Meet.`,
    alternates: { canonical: `/study-abroad/${c.slug}` },
    openGraph: {
      title: `Study abroad from ${c.city} with Axelis Overseas`,
      description: `Online counselling for ${c.city} students. Every fee published before you pay.`,
      url: `${SITE_URL}/study-abroad/${c.slug}`,
      type: 'website',
    },
  };
}

export default async function CityPage({ params }) {
  const { city } = await params;
  const c = cityBySlug(city);
  if (!c) notFound();

  const url = `${SITE_URL}/study-abroad/${c.slug}`;
  const local = hasOffice(c.city);
  const questions = questionsFor(c);

  const faqs = [
    {
      q: `Does Axelis have an office in ${c.city}?`,
      a: local
        ? `Yes. See the ${c.city} office page for the address and opening hours.`
        : `No. Axelis has two offices, in Bengaluru and Bilaspur. Counselling for ${c.city} ` +
          `students runs online over Google Meet, which is how most of our students are ` +
          `counselled regardless of where they live.`,
    },
    {
      q: `What does Axelis charge a student from ${c.city}?`,
      a: `The same as anywhere else, and it is published before you pay. The Global Admissions ` +
         `Charter is ₹9,999 onboarding for the UK, USA, Canada and Australia. The Europe ` +
         `Public Charter is ₹19,999 plus a ₹1,80,000 success fee, payable only once an ` +
         `offer is accepted. Test prep starts at ₹460 a session and MEA apostille is ` +
         `₹1,500 a document plus GST.`,
    },
    {
      q: `Can counselling really be done online?`,
      a: `It is how Axelis works by default. Shortlisting, applications, document checks and ` +
         `visa filing are all done over Google Meet and email, with one counsellor from ` +
         `shortlist to arrival. Students in ${c.city} get the same counsellor and the same ` +
         `process as students who walk into an office.`,
    },
    {
      q: `Does Axelis promise admission?`,
      a: `No. Axelis does not promise admission anywhere. What is committed in writing is the ` +
         `fee, and a refundable deposit on both student plans if the offer or visa does not ` +
         `come through.`,
    },
  ];

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Study abroad counselling for ${c.city} students`,
    serviceType: 'Overseas education consultancy',
    provider: { '@id': ORG_ID },
    // areaServed, NOT a LocalBusiness: there is no Axelis premises here.
    areaServed: { '@type': 'City', name: c.city, containedInPlace: { '@type': 'State', name: c.state } },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE_URL}/bookings`,
      availableLanguage: ['en', 'hi'],
    },
    url,
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Study abroad by city', item: `${SITE_URL}/study-abroad` },
      { '@type': 'ListItem', position: 3, name: c.city, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="bg-white pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm mb-8 text-[var(--color-dim)]">
            <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/study-abroad" className="hover:text-[var(--color-navy)]">Study abroad by city</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-navy)]">{c.city}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] tracking-tight mb-4">
            Study abroad from {c.city}
          </h1>

          {/* The honest line, stated before anything else. */}
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            {local ? (
              <>Axelis has an office in {c.city}. <Link href={`/offices/${c.slug}`} className="underline underline-offset-2">Address and hours</Link>.</>
            ) : (
              <>
                <strong>Axelis does not have an office in {c.city}.</strong> Our two offices are in
                Bengaluru and Bilaspur, and counselling for {c.city} students runs online over
                Google Meet. That is not a workaround: it is how most Axelis students are
                counselled, and it is why we can publish one fee for everyone rather than pricing
                by postcode.
              </>
            )}
          </p>

          <h2 className="text-xl font-bold text-[var(--color-navy)] mt-10 mb-3">What it costs</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Every Axelis fee is published before you pay, and it does not change because you are
            in {c.city}:
          </p>
          <table className="w-full text-sm border-collapse mb-4">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4">Global Admissions Charter (UK, USA, Canada, Australia)</td>
                <td className="py-2 font-bold whitespace-nowrap">₹9,999 onboarding</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4">Europe Public Charter (tuition-free public universities)</td>
                <td className="py-2 font-bold whitespace-nowrap">₹19,999 + ₹1,80,000 on offer</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4">Test prep (IELTS, TOEFL, PTE, Duolingo)</td>
                <td className="py-2 font-bold whitespace-nowrap">from ₹460 a session</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4">MEA apostille</td>
                <td className="py-2 font-bold whitespace-nowrap">₹1,500 a document + GST</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-[var(--color-dim)] mb-8">
            Government, exam and visa charges are paid directly to those bodies, never to Axelis.
            Axelis does not promise admission.
          </p>

          {questions.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-[var(--color-navy)] mt-10 mb-3">
                What {c.city} students are searching
              </h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                These are real queries measured for {c.city}, not guesses:
              </p>
              <ul className="list-disc ml-6 text-slate-700 mb-8">
                {questions.map((q) => <li key={q}>{q}</li>)}
              </ul>
            </>
          )}

          <h2 className="text-xl font-bold text-[var(--color-navy)] mt-10 mb-3">Common questions</h2>
          <dl className="mb-10">
            {faqs.map((f) => (
              <div key={f.q} className="mb-5">
                <dt className="font-bold text-slate-900 mb-1">{f.q}</dt>
                <dd className="text-slate-700 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-3">
            <Link href="/bookings" className="btn btn-primary">Book a discovery call</Link>
            <Link href="/products" className="btn btn-secondary">See student plans</Link>
          </div>

          <p className="mt-10 text-sm text-[var(--color-dim)]">
            <Link href="/study-abroad" className="underline underline-offset-2">
              All {CITY_PAGES.length} cities we publish for
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
