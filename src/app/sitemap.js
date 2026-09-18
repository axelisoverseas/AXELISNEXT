import { programs } from '../data/certificationPrograms';

const BASE_URL = 'https://overseeducation.com';

export default function sitemap() {
  const now = new Date().toISOString().split('T')[0];

  const corePages = [
    { url: `${BASE_URL}/`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/bookings`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/university-finder`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/resources`, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/test-prep`, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/accommodation`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/scholarships`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/portal`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/faq`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/testimonials`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/certifications`, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/vocational`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/accreditations`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/policies/cancellation-refund`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/terms-conditions`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/delivery-policy`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/verify`, changeFrequency: 'monthly', priority: 0.6 },
  ].map((page) => ({ ...page, lastModified: now }));

  const countryGuides = [
    'study-in-uk', 'study-in-usa', 'study-in-canada', 'study-in-australia',
    'study-in-ireland', 'study-in-germany', 'study-in-france', 'study-in-finland',
    'study-in-italy', 'study-in-austria', 'study-in-netherlands',
  ].map((slug) => ({
    url: `${BASE_URL}/guide/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const certificationPages = programs.map((program) => ({
    url: `${BASE_URL}/certifications/${program.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...corePages, ...certificationPages, ...countryGuides];
}
