import Link from 'next/link';
import { CITY_PAGES, ROLLUP_CITIES, STATES, PAGE_THRESHOLD } from '@/data/cityPages';
import { SITE_URL } from '@/lib/seo';

export const metadata = {
  title: 'Study abroad consultants by city: where Axelis counsels students',
  description:
    'Axelis counsels students across India online, from offices in Bengaluru and Bilaspur. ' +
    'City pages for every location with measured search demand.',
  alternates: { canonical: '/study-abroad' },
};

export default function StudyAbroadIndex() {
  const byState = {};
  for (const c of CITY_PAGES) (byState[c.state] ||= []).push(c);
  const rollupByState = {};
  for (const c of ROLLUP_CITIES) (rollupByState[c.state] ||= []).push(c);

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: CITY_PAGES.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Study abroad from ${c.city}`,
      item: `${SITE_URL}/study-abroad/${c.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <div className="bg-white pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm mb-8 text-[var(--color-dim)]">
            <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-navy)]">Study abroad by city</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] tracking-tight mb-4">
            Where Axelis counsels students
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Axelis has two offices, in <Link href="/offices/bengaluru" className="underline underline-offset-2">Bengaluru</Link>{' '}
            and <Link href="/offices/bilaspur" className="underline underline-offset-2">Bilaspur</Link>.
            Everywhere else is counselled online over Google Meet, with one counsellor from
            shortlist to arrival and the same published fee regardless of where you live.
          </p>

          {Object.keys(byState).sort().map((state) => (
            <section key={state} className="mb-8">
              <h2 className="text-lg font-bold text-[var(--color-navy)] mb-2 capitalize">{state}</h2>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-slate-700">
                {byState[state].sort((a, b) => b.phrases - a.phrases).map((c) => (
                  <li key={c.slug}>
                    <Link href={`/study-abroad/${c.slug}`} className="underline underline-offset-2">
                      {c.city}
                    </Link>
                  </li>
                ))}
              </ul>
              {rollupByState[state]?.length > 0 && (
                <p className="text-sm text-[var(--color-dim)] mt-1">
                  Also counselled online, without a dedicated page:{' '}
                  {rollupByState[state].map((c) => c.city).join(', ')}
                </p>
              )}
            </section>
          ))}

          <p className="text-sm text-[var(--color-dim)] mt-10">
            {CITY_PAGES.length} cities have a page here. Another {ROLLUP_CITIES.length} are listed
            above without one, because they returned fewer than {PAGE_THRESHOLD} distinct search
            phrases when measured and a dedicated page for each would say the same thing in
            different words. Students in those cities are counselled identically.
          </p>
        </div>
      </div>
    </>
  );
}
