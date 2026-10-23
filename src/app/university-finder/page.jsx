import FinderEmbed from '@/components/FinderEmbed';
import finder from '../../../public/university-finder-widget/finder-covered.json';

// Counted from the data the page actually serves, never typed by hand. The
// page once advertised "35,000+ universities" beside a list of 2,795, which is
// the kind of gap a visitor finds in about four seconds.
const TOTAL = finder.totals.universities;
const DESTINATIONS = finder.totals.destinations;
const ROUTED = finder.totals.routed;
const TOTAL_LABEL = TOTAL.toLocaleString('en-IN');


export const metadata = {
  title: 'University Finder',
  description:
    `Search ${TOTAL_LABEL} higher-education institutions across ${DESTINATIONS} study destinations and see which Axelis charter each one falls under, from tuition-free public universities in Europe to full-fee options in the US, Canada and Australia.`,
  alternates: { canonical: '/university-finder' },
};

export default function UniversityFinderPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Midnight Dodger hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-tint)] to-white px-6 pt-32 pb-16 text-[var(--color-navy)] border-b border-[var(--color-rule)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ background: 'rgba(53,144,243,0.18)' }} />
          <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full blur-3xl" style={{ background: 'rgba(190,183,164,0.12)' }} />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span
              className="inline-block rounded-full px-4 py-1 text-sm font-semibold"
              style={{ background: 'rgba(53,144,243,0.12)', color: 'var(--color-axelis)' }}
            >
              {TOTAL_LABEL} institutions listed · {DESTINATIONS} destinations
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              University Finder.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[var(--color-navy)]">
              Every university here is a real, currently operating institution with its own official
              website, checked against Wikidata rather than typed up by us. Search any one of them to
              see which charter it falls under — and if it is not listed yet, tell us and we will check it.
            </p>
          </div>

          {/* Both figures are counted from the list on this page. */}
          <div className="flex shrink-0 gap-8 sm:gap-10">
            <div>
              <div className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--color-axelis)' }}>
                {TOTAL_LABEL}
              </div>
              <div className="mt-1 text-xs font-semibold text-[var(--color-dim)]">Institutions listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--color-navy)] sm:text-4xl">{DESTINATIONS}</div>
              <div className="mt-1 text-xs font-semibold text-[var(--color-dim)]">Destinations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--color-navy)] sm:text-4xl">
                {ROUTED.toLocaleString('en-IN')}
              </div>
              <div className="mt-1 text-xs font-semibold text-[var(--color-dim)]">Routed today</div>
            </div>
          </div>
        </div>
      </section>

      <FinderEmbed />
    </div>
  );
}
