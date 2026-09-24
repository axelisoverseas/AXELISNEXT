import Link from 'next/link';
import { notFound } from 'next/navigation';
import countryDetails from '../../../data/country-details.json';
import { GUIDES, GUIDE_SLUGS } from '../../../data/countryGuides';
import { SITE_URL, ORG_ID } from '@/lib/seo';

// Each guide is built from src/data/country-details.json (last edited July
// 2026). The previous template rendered placeholder numbers ("154+ partner
// universities") and "University 1 of Uk" links for any slug at all; only
// these eleven exist now, and anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

function load(slug) {
  const guide = GUIDES[slug];
  if (!guide) return null;
  const data = countryDetails[guide.key];
  return data ? { ...guide, data } : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const g = load(slug);
  if (!g) return {};
  const title = `Study in ${g.short} from India: Costs, Visa & Intakes`;
  return {
    title,
    description: g.data.tagline,
    alternates: { canonical: `/guide/${slug}` },
    openGraph: {
      title: `${title} | Axelis Overseas`,
      description: g.data.tagline,
      url: `/guide/${slug}`,
      type: 'article',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
  };
}

const Section = ({ q, children }) => (
  <section className="py-8 border-t border-[var(--color-rule)]">
    <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-3">{q}</h2>
    {children}
  </section>
);

const Prose = ({ children }) => (
  <p className="text-[var(--foreground)] leading-relaxed measure">{children}</p>
);

const Chips = ({ items }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((item) => (
      <li
        key={item}
        className="px-3 py-1.5 rounded-full bg-[var(--color-tint)] border border-[var(--color-rule)] text-sm text-[var(--color-navy)]"
      >
        {item}
      </li>
    ))}
  </ul>
);

export default async function CountryGuidePage({ params }) {
  const { slug } = await params;
  const g = load(slug);
  if (!g) notFound();
  const { data, name, short } = g;
  const url = `${SITE_URL}/guide/${slug}`;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Study in ${short} from India: costs, visa and intakes`,
    description: data.tagline,
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}/og-image.jpg`,
    inLanguage: 'en-IN',
    about: { '@type': 'Country', name: short },
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/resources` },
      { '@type': 'ListItem', position: 3, name: `Study in ${short}`, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="bg-white pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm mb-8 text-[var(--color-dim)]">
            <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/resources" className="hover:text-[var(--color-navy)]">Guides</Link>
            <span aria-hidden="true"> / </span>
            <span className="text-[var(--color-navy)]">Study in {short}</span>
          </nav>

          <header className="mb-4">
            <h1 className="text-4xl md:text-5xl font-black text-[var(--color-navy)] mb-5 tracking-tight">
              Study in {name} from India
            </h1>
            <p className="text-xl text-[var(--color-dim)] leading-relaxed">{data.tagline}</p>
          </header>

          <Section q={`What does it cost to study in ${name}?`}>
            <Prose>{data.costNotes}</Prose>
          </Section>

          <Section q={`How does the student visa for ${name} work?`}>
            <Prose>{data.visaNotes}</Prose>
          </Section>

          <Section q="What English or language scores do you need?">
            <Prose>{data.languageNotes}</Prose>
          </Section>

          <Section q="Can you work during and after your studies?">
            <Prose>{data.workRights}</Prose>
          </Section>

          <Section q="When are the intakes?">
            <Chips items={data.intakes} />
          </Section>

          <Section q="What do Indian students usually study there?">
            <Chips items={data.popularCourses} />
          </Section>

          <Section q="Which universities and cities are best known?">
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-dim)] mb-2">Universities</p>
            <Chips items={data.universities} />
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-dim)] mt-5 mb-2">Cities</p>
            <Chips items={data.cities} />
          </Section>

          <aside className="mt-10 rounded-2xl bg-[var(--color-navy)] p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Talk to a counsellor about {short}</h2>
            <p className="text-[var(--color-dim-dark)] mb-6">
              One counsellor from shortlist to arrival, and every fee published before you pay.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/bookings"
                className="inline-block bg-white text-[var(--color-navy)] font-bold py-3 px-5 rounded-xl hover:bg-[var(--color-tint)]"
              >
                Book a free counselling call
              </Link>
              <Link
                href="/university-finder"
                className="inline-block border border-[var(--dark-rule)] text-white font-bold py-3 px-5 rounded-xl hover:bg-[var(--dark-surface)]"
              >
                Find a university
              </Link>
            </div>
          </aside>

          <p className="mt-8 text-sm text-[var(--color-dim)]">
            Figures are indicative and change with each intake. Confirm current fees and visa rules with your counsellor before you apply.
          </p>

          <nav aria-label="Other country guides" className="mt-10 pt-8 border-t border-[var(--color-rule)]">
            <h2 className="text-lg font-bold text-[var(--color-navy)] mb-3">Other country guides</h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[var(--color-axelis)]">
              {GUIDE_SLUGS.filter((s) => s !== slug).map((s) => (
                <li key={s}>
                  <Link href={`/guide/${s}`} className="hover:underline">Study in {GUIDES[s].short}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
