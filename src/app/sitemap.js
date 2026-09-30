import { programs } from '../data/certificationPrograms';
import { GUIDE_SLUGS } from '../data/countryGuides';
import { LANDING_SLUGS } from '../data/landingPages';
import { SESSION_SLUGS } from '../data/sessions';
import { SITE_URL } from '@/lib/seo';

// Every URL here must be indexable and self-canonical: no /portal (a demo
// dashboard, noindex) and no /payment-status.
//
// lastModified used to be omitted entirely, for a good reason: it had been
// stamped with the build time on every deploy, which teaches search engines to
// ignore the field. The fix is a REAL date per entry, not no date.
//
// The fourth tuple element is that date. It was seeded once, by hand, from
// `git log -1 --format=%cs -- <the route's page/layout>`, and should be updated
// when the page's content meaningfully changes. It is deliberately NOT read
// from git at build time: Vercel may build from a shallow clone, where git
// history is not available.
//
// Entries with no date emit no lastModified at all. Never emit a date you do
// not have.
const CORE = [
  ['/',                            'daily',      1.0, '2026-09-30'],
  ['/certifications',              'weekly',     0.95, '2026-09-25'],
  ['/products',                    'weekly',     0.9, '2026-09-29'],
  ['/ivy-league',                  'weekly',     0.9, '2026-09-29'],
  ['/university-finder',           'weekly',     0.9, '2026-09-20'],
  ['/scholarships',                'weekly',     0.9, '2026-09-25'],
  ['/programmes',                  'weekly',     0.9, '2026-09-21'],
  ['/vocational',                  'weekly',     0.9, '2026-09-25'],
  ['/start',                       'weekly',     0.9, '2026-09-29'],
  ['/resources',                   'weekly',     0.85, '2026-09-25'],
  ['/test-prep',                   'weekly',     0.85, '2026-09-29'],
  ['/services',                    'weekly',     0.85, '2026-09-25'],
  ['/about',                       'monthly',    0.8, '2026-09-25'],
  ['/contact',                     'monthly',    0.8, '2026-09-25'],
  ['/bookings',                    'monthly',    0.8, '2026-09-25'],
  ['/accommodation',               'weekly',     0.8, '2026-09-30'],
  ['/financing',                   'monthly',    0.8, '2026-09-25'],
  ['/testimonials',                'weekly',     0.7, '2026-09-28'],
  ['/sessions',                    'weekly',     0.8, '2026-09-29'],
  ['/faq',                         'monthly',    0.6, '2026-09-30'],
  ['/accreditations',              'monthly',    0.6, '2026-09-25'],
  ['/verify',                      'monthly',    0.6, '2026-09-25'],
  ['/charters',                    'monthly',    0.6, '2026-09-29'],
  ['/for-lenders',                 'monthly',    0.5, '2026-09-21'],
  ['/policies/cancellation-refund','monthly',    0.5, '2026-09-25'],
  ['/policies/payment-terms',      'monthly',    0.5, '2026-09-25'],
  ['/terms-conditions',            'monthly',    0.5, '2026-09-25'],
  ['/delivery-policy',             'monthly',    0.5, '2026-09-25'],
  ['/privacy-policy',              'monthly',    0.5, '2026-09-25'],
];

// The dynamic groups below carry no lastModified on purpose. Each is backed by
// ONE shared data file (country-details.json feeds all 11 guides), so a file
// date would falsely bump every sibling on a single edit. To give these real
// dates, add a per-item `updatedOn` field to the data objects and read it here.
const entry = (path, changeFrequency, priority, updatedOn) => ({
  url: `${SITE_URL}${path}`,
  changeFrequency,
  priority,
  ...(updatedOn ? { lastModified: new Date(updatedOn) } : {}),
});

export default function sitemap() {
  return [
    ...CORE.map(([path, freq, priority, updatedOn]) => entry(path, freq, priority, updatedOn)),
    ...programs.map((p) => entry(`/certifications/${p.slug}`, 'weekly', 0.85)),
    ...GUIDE_SLUGS.map((slug) => entry(`/guide/${slug}`, 'monthly', 0.8)),
    ...LANDING_SLUGS.map((slug) => entry(`/lp/${slug}`, 'monthly', 0.7)),
    ...SESSION_SLUGS.map((slug) => entry(`/sessions/${slug}`, 'monthly', 0.75)),
  ];
}
