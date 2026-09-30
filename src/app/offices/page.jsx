import Link from 'next/link';
import { OFFICES, formatAddress } from '@/data/offices';
import { SITE_URL } from '@/lib/seo';

export const metadata = {
  title: 'Axelis Overseas offices: Bengaluru and Bilaspur',
  description:
    'Both Axelis Overseas locations: the Bengaluru corporate office and the Bilaspur registered office, with addresses and contact details.',
  alternates: { canonical: '/offices' },
  openGraph: {
    title: 'Axelis Overseas offices',
    description: 'Bengaluru corporate office and Bilaspur registered office.',
    url: `${SITE_URL}/offices`,
    type: 'website',
  },
};

export default function OfficesPage() {
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: OFFICES.map((o, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: o.name,
      item: `${SITE_URL}/offices/${o.slug}`,
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Offices', item: `${SITE_URL}/offices` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="bg-white pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm mb-8 text-[var(--color-dim)]">
            <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-navy)]">Offices</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] tracking-tight mb-8">
            Where to find us
          </h1>

          <ul className="space-y-8">
            {OFFICES.map((o) => (
              <li key={o.slug}>
                <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-axelis)] mb-1">
                  {o.role}
                </p>
                <h2 className="text-xl font-bold text-[var(--color-navy)] mb-1">
                  <Link href={`/offices/${o.slug}`} className="underline underline-offset-2">
                    {o.addressLocality}
                  </Link>
                </h2>
                <address className="not-italic text-slate-700">{formatAddress(o)}</address>
              </li>
            ))}
          </ul>

          <p className="mt-10">
            <Link href="/contact" className="btn btn-primary">Contact us</Link>
          </p>
        </div>
      </div>
    </>
  );
}
