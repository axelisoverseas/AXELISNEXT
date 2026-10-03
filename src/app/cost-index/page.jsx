import Link from 'next/link';
import { SITE_URL, ORG_ID } from '@/lib/seo';
import { SLUG_BY_KEY } from '@/data/countryGuides';
import costIndex from '@/data/costIndex.json';
import { UG_ROWS, PG_ROWS, COST_META, COST_AS_OF, COST_AS_OF_LABEL, lakh, byNet } from '@/lib/costIndex';

// ============================================================================
// THE COST INDEX
// ============================================================================
// Every destination Axelis prices, bachelor's and master's, in one table, with
// the date it was priced on it. This is the one page on the site carrying data
// nobody else publishes, which is also why it has to stay honest:
//
//   * Gross, assumed part-time earnings and net are all shown. Net on its own
//     is the figure that misleads -- Germany's undergraduate net of Rs 7.4
//     lakh is Rs 41.8 lakh of actual cost with Rs 34.3 lakh of term-time
//     earnings deducted, and a student who cannot work those hours pays the
//     gross.
//   * Public and private are separate rows wherever the sheet prices them
//     separately. Averaging them produces a number that is true of nobody.
//   * No AggregateRating, no "cheapest", no ranking claim. The table is
//     sorted, not judged.
// ============================================================================

const TITLE = 'The Axelis Cost Index: what studying abroad really costs from India';
const DEK =
  `${COST_META.ugRows} study options priced end to end: tuition, living and accommodation, ` +
  `for a bachelor's and for a master's, in rupees, with the part-time earnings kept in their ` +
  `own column rather than quietly netted off.`;

export const metadata = {
  title: TITLE,
  description: DEK,
  alternates: { canonical: '/cost-index' },
  openGraph: {
    title: TITLE,
    description: DEK,
    url: `${SITE_URL}/cost-index`,
    type: 'article',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const guideHref = (country) => {
  const key = Object.keys(costIndex.byCountryKey).find((k) =>
    costIndex.byCountryKey[k].includes(country)
  );
  return key ? `/guide/${SLUG_BY_KEY[key]}` : null;
};

const Table = ({ caption, rows, id }) => (
  <div className="overflow-x-auto rounded-2xl border border-[var(--color-rule)]">
    <table className="w-full text-sm min-w-[46rem]">
      <caption className="sr-only">{caption}</caption>
      <thead className="bg-[var(--color-tint)] text-left text-[var(--color-navy)]">
        <tr>
          <th scope="col" className="px-4 py-3 font-bold">Destination</th>
          <th scope="col" className="px-4 py-3 font-bold">Length</th>
          <th scope="col" className="px-4 py-3 font-bold">Course, living &amp; stay</th>
          <th scope="col" className="px-4 py-3 font-bold">Less part-time</th>
          <th scope="col" className="px-4 py-3 font-bold">Net</th>
          <th scope="col" className="px-4 py-3 font-bold">Entry bar</th>
          <th scope="col" className="px-4 py-3 font-bold">Post-study stay</th>
        </tr>
      </thead>
      <tbody>
        {byNet(rows).map((r) => {
          const href = guideHref(r.country);
          return (
            <tr key={`${id}-${r.country}`} className="border-t border-[var(--color-rule)] align-top">
              <th scope="row" className="px-4 py-3 text-left font-bold text-[var(--color-navy)]">
                {href ? (
                  <Link href={href} className="text-[var(--color-axelis)] hover:underline">{r.country}</Link>
                ) : (
                  r.country
                )}
              </th>
              <td className="px-4 py-3 whitespace-nowrap">{r.duration}</td>
              <td className="px-4 py-3 whitespace-nowrap font-semibold">{lakh(r.cost_l)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-[var(--color-dim)]">
                &minus; {lakh(r.earnings_l)}
                <span className="block text-xs">at {r.hours}/week</span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap font-bold text-[var(--color-navy)]">{lakh(r.net_l)}</td>
              <td className="px-4 py-3">{r.requirements}</td>
              <td className="px-4 py-3">{r.opt}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default function CostIndexPage() {
  const url = `${SITE_URL}/cost-index`;

  const datasetLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Axelis Cost Index',
    description: DEK,
    url,
    inLanguage: 'en-IN',
    dateModified: COST_AS_OF,
    temporalCoverage: COST_AS_OF,
    creator: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    variableMeasured: [
      'Total cost of education, living and accommodation in INR',
      'Indicative part-time earnings over the course in INR',
      'Net cost of education in INR',
      'Permitted part-time work hours per week',
      'Post-study work visa duration',
    ],
    spatialCoverage: [...new Set(UG_ROWS.map((r) => r.country.replace(/\s*\((Public|Private)\)$/, '')))]
      .sort()
      .map((name) => ({ '@type': 'Country', name })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Cost Index', item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="bg-white pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm mb-8 text-[var(--color-dim)]">
            <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
            <span aria-hidden="true"> / </span>
            <span className="text-[var(--color-navy)]">Cost Index</span>
          </nav>

          <header className="mb-10 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-[var(--color-navy)] mb-5 tracking-tight">
              What studying abroad actually costs from India
            </h1>
            <p className="text-xl text-[var(--color-dim)] leading-relaxed mb-5">{DEK}</p>
            <p className="text-sm text-[var(--color-dim)]">
              Priced {COST_AS_OF_LABEL}. Figures are indicative, move with the exchange rate as
              well as with fees, and are not a quotation.
            </p>
          </header>

          <div className="rounded-2xl bg-[var(--color-tint)] border border-[var(--color-rule)] p-6 mb-12 max-w-3xl">
            <h2 className="text-lg font-bold text-[var(--color-navy)] mb-2">How to read the net column</h2>
            <p className="text-[var(--foreground)] leading-relaxed">
              Net is what is left after the part-time earnings a student could expect at the hours
              their visa allows. It is the smaller, friendlier number, and it is the one to treat
              with suspicion: it assumes you find that work, hold it for the whole course, and are
              well enough to do it alongside your degree. The source sheet is explicit that these
              earnings do not guarantee part-time work and vary case by case. The column to budget
              against is &ldquo;course, living &amp; stay&rdquo;.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-4" id="masters">
            Master&rsquo;s (PG), cheapest net first
          </h2>
          <Table id="pg" rows={PG_ROWS} caption="Cost of a master's degree abroad for Indian students, in Indian rupees" />

          <h2 className="text-2xl font-bold text-[var(--color-navy)] mt-14 mb-4" id="bachelors">
            Bachelor&rsquo;s (UG), cheapest net first
          </h2>
          <Table id="ug" rows={UG_ROWS} caption="Cost of a bachelor's degree abroad for Indian students, in Indian rupees" />

          <section className="mt-14 max-w-3xl">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-3">Where these numbers come from</h2>
            <p className="text-[var(--foreground)] leading-relaxed mb-3">
              Tuition plus living cost, multiplied by the length of the course. Public and private
              institutions are priced as separate rows wherever they differ, because an average of
              the two describes nobody&rsquo;s situation. The figures are approximate by design:
              they are there to tell you which destinations are in the same bracket, not to quote
              your file.
            </p>
            <p className="text-[var(--foreground)] leading-relaxed mb-3">
              Government, exam and visa charges are set by those bodies, not by us, and Axelis takes
              no margin on any of them. Our own fees are published in full on{' '}
              <Link href="/products" className="text-[var(--color-axelis)] hover:underline">the plans page</Link>{' '}
              before you pay anything.
            </p>
            <p className="text-[var(--foreground)] leading-relaxed">
              Rupee figures were converted on the day the sheet was priced. Five of the rates used
              are on the record: 1 EUR = Rs {COST_META.fx_snapshot.EUR}, 1 USD =
              Rs {COST_META.fx_snapshot.USD}, 1 GBP = Rs {COST_META.fx_snapshot.GBP}, 1 AUD =
              Rs {COST_META.fx_snapshot.AUD}, 1 CAD = Rs {COST_META.fx_snapshot.CAD}. Destinations
              priced in other currencies used that day&rsquo;s rate for their own currency, which
              was not kept, so those rows cannot be re-based on a newer rate without repricing them.
            </p>
          </section>

          <aside className="mt-12 rounded-2xl bg-[var(--color-navy)] p-8 text-white max-w-3xl">
            <h2 className="text-2xl font-bold mb-2">Want this run against your own profile?</h2>
            <p className="text-[var(--color-dim-dark)] mb-6">
              A counsellor will take your marks, your budget and your test scores and tell you which
              of these are realistic for you, including the ones we would advise you against.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/bookings" className="inline-block bg-white text-[var(--color-navy)] font-bold py-3 px-5 rounded-xl hover:bg-[var(--color-tint)]">
                Book a free counselling call
              </Link>
              <Link href="/financing" className="inline-block border border-[var(--dark-rule)] text-white font-bold py-3 px-5 rounded-xl hover:bg-[var(--dark-surface)]">
                How students fund it
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
