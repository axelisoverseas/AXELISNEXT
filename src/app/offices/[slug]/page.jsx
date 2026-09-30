import Link from 'next/link';
import { notFound } from 'next/navigation';
import { OFFICES, OFFICE_SLUGS, officeBySlug, formatAddress } from '@/data/offices';
import { SITE_URL } from '@/lib/seo';
import { reviewsSummaryLine, capturedOnLabel, googleReviewsMeta } from '@/data/googleReviews';

// One page per physical office, so each Google Business Profile has a specific
// URL to point its website field at. Everything rendered here comes from
// src/data/offices.js, and anything unknown there (Bengaluru's coordinates,
// Bilaspur's hours) is simply not rendered rather than guessed.
export const dynamicParams = false;

export function generateStaticParams() {
  return OFFICE_SLUGS.map((slug) => ({ slug }));
}

const DAY_LABEL = {
  Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu',
  Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun',
};

const hoursLabel = (h) => {
  const days = h.days.length > 1
    ? `${DAY_LABEL[h.days[0]]}–${DAY_LABEL[h.days[h.days.length - 1]]}`
    : DAY_LABEL[h.days[0]];
  return `${days} ${h.opens}–${h.closes}`;
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const o = officeBySlug(slug);
  if (!o) return {};
  return {
    title: `Axelis Overseas in ${o.addressLocality}: address, hours and contact`,
    description: `Our ${o.role.toLowerCase()} at ${formatAddress(o)}. Talk to a counsellor about studying abroad, with every fee published before you pay.`,
    alternates: { canonical: `/offices/${slug}` },
    openGraph: {
      title: `Axelis Overseas, ${o.addressLocality}`,
      description: `${o.role} - ${formatAddress(o)}`,
      url: `${SITE_URL}/offices/${slug}`,
      type: 'website',
    },
  };
}

export default async function OfficePage({ params }) {
  const { slug } = await params;
  const o = officeBySlug(slug);
  if (!o) notFound();

  const url = `${SITE_URL}/offices/${slug}`;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Offices', item: `${SITE_URL}/offices` },
      { '@type': 'ListItem', position: 3, name: o.addressLocality, item: url },
    ],
  };

  return (
    <>
      {/* The LocalBusiness node for this office is already in the site-wide
          graph from src/app/layout.js, keyed by this page's @id. Emitting it
          again here would put the same @id in two blocks on one page, so only
          the breadcrumb is page-specific. The node's `url` is what ties it to
          this page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div className="bg-white pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm mb-8 text-[var(--color-dim)]">
            <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/offices" className="hover:text-[var(--color-navy)]">Offices</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-navy)]">{o.addressLocality}</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-axelis)] mb-2">
            {o.role}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] tracking-tight mb-6">
            Axelis Overseas in {o.addressLocality}
          </h1>

          <address className="not-italic text-lg text-slate-700 leading-relaxed mb-8">
            {o.streetAddress}
            <br />
            {o.addressLocality}, {o.addressRegion} {o.postalCode}
            <br />
            <a href="tel:+919098522711" className="underline underline-offset-2">+91 90985 22711</a>
            {' · '}
            <a href="mailto:axelisoverseas@overseeducation.com" className="underline underline-offset-2">
              axelisoverseas@overseeducation.com
            </a>
          </address>

          {o.openingHours && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[var(--color-navy)] mb-2">Opening hours</h2>
              <ul className="text-slate-700">
                {o.openingHours.map((h) => <li key={h.opens + h.days[0]}>{hoursLabel(h)}</li>)}
                <li>Sun closed</li>
              </ul>
            </div>
          )}

          {/* Honest per-office review state. The 4.9 belongs to Bilaspur; saying
              so here matters more than anywhere else on the site, because an
              unqualified rating on a Bengaluru page would be a straight
              misrepresentation of a profile that has no reviews yet. */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[var(--color-navy)] mb-2">Reviews</h2>
            <p className="text-slate-700">
              {o.reviewState === 'established'
                ? `${reviewsSummaryLine}, as of ${capturedOnLabel}.`
                : `This office has no Google reviews yet. The ${googleReviewsMeta.rating} rating is from the Bilaspur office, as of ${capturedOnLabel}.`}
            </p>
            {o.mapsUrl && (
              <p className="mt-2">
                <a href={o.mapsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  See this office on Google Maps
                </a>
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/bookings" className="btn btn-primary">Book a Discovery Call</Link>
            <Link href="/contact" className="btn btn-secondary">All contact details</Link>
          </div>

          <p className="mt-10 text-sm text-[var(--color-dim)]">
            Our other location:{' '}
            {OFFICES.filter((x) => x.slug !== o.slug).map((x) => (
              <Link key={x.slug} href={`/offices/${x.slug}`} className="underline underline-offset-2">
                {x.addressLocality} ({x.role.toLowerCase()})
              </Link>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
