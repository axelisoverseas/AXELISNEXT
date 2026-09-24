import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Receipt, UserRound, Plane, ArrowRight } from 'lucide-react';
import StartRouter from '../../components/StartRouter';
import { siteInfo } from '../../data/siteData';

/**
 * Standalone conversion landing page.
 *
 * Built on the PAS framework: the pain is that nobody will tell an Indian
 * student what studying abroad actually costs until they have already paid an
 * agency. The page names that, sharpens it, then offers the two things that
 * resolve it — a published price and a free call.
 *
 * It routes rather than dead-ends: the visitor says what they are after and
 * gets sent to the page that answers it. Capturing the lead is the second
 * option on the page, not the toll gate in front of it.
 *
 * Design comes from the site's own tokens and .btn/.sec classes rather than a
 * template palette, so this cannot drift away from the rest of the site.
 */

const CANONICAL = 'https://www.overseeducation.com/start';

export const metadata = {
  title: 'Study Abroad From India, Priced Upfront',
  description:
    'Every fee published before you pay, one counsellor from shortlist to arrival, and a refundable deposit on both student plans. Book a free first call.',
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Study Abroad From India, Priced Upfront | Axelis Overseas',
    description:
      'Every fee published before you pay. One counsellor from shortlist to arrival. A free first call with a straight answer.',
    url: CANONICAL,
    type: 'website',
  },
};

const PROOF = [
  { Icon: Receipt, title: 'Every fee published first', body: 'The plan price is on the page before you pay. No agency markup added later.' },
  { Icon: UserRound, title: 'One counsellor throughout', body: 'The person who shortlists with you is the person who sees your visa through.' },
  { Icon: ShieldCheck, title: 'Refundable deposit', body: 'Both student plans refund the deposit if the visa or the offer does not come.' },
  { Icon: Plane, title: '29 destinations', body: 'Tuition-free public Europe through to the UK, USA, Canada and Australia.' },
];

const FAQS = [
  { q: 'What does Axelis charge?',
    a: 'Both student plans are priced on the Student Plans page and the figure there is the whole Axelis fee. Government, apostille, exam and visa charges are paid to those bodies directly and we take no margin on them.' },
  { q: 'Is the first call really free?',
    a: 'Yes. It ends with a recommendation, and sometimes that recommendation is that we are not the right fit. There is no charge and no obligation either way.' },
  { q: 'Can I study in Europe without paying tuition?',
    a: 'In much of public Europe, yes. Germany, Norway and several others charge little or no tuition to international students. The Europe Public Charter is built around those routes.' },
  { q: 'Do you help with the student visa?',
    a: 'Yes. Visa filing is part of both student plans, and your counsellor stays on the file until you have arrived.' },
];

export default function StartPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero: the pain, stated plainly */}
      <section className="sec-lg border-b border-[var(--color-rule)] bg-gradient-to-b from-[var(--color-tint)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="label">Study abroad from India</p>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-navy)]">
              Nobody will tell you what it costs until you have already paid.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-dim)] measure">
              Most agencies quote a service fee, then bill for the things they left out.
              We publish the whole fee on the page, put one counsellor on your file from
              shortlist to arrival, and refund the deposit if the visa does not come.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#start" className="btn btn-primary btn-lg">
                Find your route <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/products" className="btn btn-secondary btn-lg">
                See the plans and prices
              </Link>
            </div>
            <p className="mt-4 text-sm text-[var(--color-dim)]">
              Free first call &middot; no obligation &middot; {siteInfo?.social ? '29 destinations' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="sec">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
            {PROOF.map(({ Icon, title, body }) => (
              <li key={title} className="glass-storm p-6">
                <Icon size={22} aria-hidden="true" className="text-[var(--color-axelis)]" />
                <h2 className="mt-4 text-base font-bold text-[var(--color-navy)]">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-dim)]">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The router plus the lead form */}
      <section id="start" className="sec bg-[var(--color-tint)] border-y border-[var(--color-rule)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StartRouter />
        </div>
      </section>

      {/* FAQ, matching the schema above */}
      <section className="sec">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)]">
            The questions people actually ask.
          </h2>
          <dl className="mt-6 grid gap-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="rounded-[var(--radius-lg)] border border-[var(--color-rule)] bg-white p-5">
                <dt className="font-bold text-[var(--color-navy)]">{q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--color-dim)]">{a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-[var(--color-dim)]">
            More in the <Link href="/faq" className="text-[var(--color-axelis)] underline underline-offset-2">full FAQ</Link>,
            or read the <Link href="/policies/payment-terms" className="text-[var(--color-axelis)] underline underline-offset-2">payment terms</Link> before you pay anything.
          </p>
        </div>
      </section>
    </>
  );
}
