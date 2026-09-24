import { programs } from '../data/certificationPrograms';
import { GUIDE_SLUGS } from '../data/countryGuides';
import { LANDING_SLUGS } from '../data/landingPages';
import { SITE_URL } from '@/lib/seo';

// Every URL here must be indexable and self-canonical: no /portal (a demo
// dashboard, noindex) and no /payment-status. There is no lastModified: it
// was stamped with the build time on every deploy, which teaches search
// engines to ignore it.
const CORE = [
  ['/', 'daily', 1.0],
  ['/certifications', 'weekly', 0.95],
  ['/products', 'weekly', 0.9],
  ['/university-finder', 'weekly', 0.9],
  ['/scholarships', 'weekly', 0.9],
  ['/programmes', 'weekly', 0.9],
  ['/vocational', 'weekly', 0.9],
  ['/start', 'weekly', 0.9],
  ['/resources', 'weekly', 0.85],
  ['/test-prep', 'weekly', 0.85],
  ['/services', 'weekly', 0.85],
  ['/about', 'monthly', 0.8],
  ['/contact', 'monthly', 0.8],
  ['/bookings', 'monthly', 0.8],
  ['/accommodation', 'weekly', 0.8],
  ['/financing', 'monthly', 0.8],
  ['/testimonials', 'weekly', 0.7],
  ['/faq', 'monthly', 0.6],
  ['/accreditations', 'monthly', 0.6],
  ['/verify', 'monthly', 0.6],
  ['/for-lenders', 'monthly', 0.5],
  ['/policies/cancellation-refund', 'monthly', 0.5],
  ['/policies/payment-terms', 'monthly', 0.5],
  ['/terms-conditions', 'monthly', 0.5],
  ['/delivery-policy', 'monthly', 0.5],
  ['/privacy-policy', 'monthly', 0.5],
];

const entry = (path, changeFrequency, priority) => ({
  url: `${SITE_URL}${path}`,
  changeFrequency,
  priority,
});

export default function sitemap() {
  return [
    ...CORE.map(([path, freq, priority]) => entry(path, freq, priority)),
    ...programs.map((p) => entry(`/certifications/${p.slug}`, 'weekly', 0.85)),
    ...GUIDE_SLUGS.map((slug) => entry(`/guide/${slug}`, 'monthly', 0.8)),
    ...LANDING_SLUGS.map((slug) => entry(`/lp/${slug}`, 'monthly', 0.7)),
  ];
}
