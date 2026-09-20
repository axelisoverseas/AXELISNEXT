import UniversityFinder from '@/components/UniversityFinder';
import universities from '@/data/finder-universities.json';


export const metadata = {
  title: 'University Finder',
  description:
    'Search 900+ universities across 29 study destinations, from tuition-free public universities in Europe to full-fee options in the UK, US, Canada and Australia.',
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
              35,000+ universities · 29 destinations
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              University Finder.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[var(--color-navy)]">
              Search every university we can place students at, from tuition-free public universities
              in Europe to full-fee options in the UK, US, Canada, Australia and beyond.
            </p>
          </div>

          {/* Two figures, not three. The listing here is a working subset, so
              printing its exact length next to a 35,000+ claim invited the
              obvious question. */}
          <div className="flex shrink-0 gap-8 sm:gap-10">
            <div>
              <div className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--color-axelis)' }}>
                35,000+
              </div>
              <div className="mt-1 text-xs font-semibold text-[var(--color-dim)]">Universities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--color-navy)] sm:text-4xl">29</div>
              <div className="mt-1 text-xs font-semibold text-[var(--color-dim)]">Destinations</div>
            </div>
          </div>
        </div>
      </section>

      <UniversityFinder />
    </div>
  );
}
