import { universities } from '@/data/universityData';

const BASE_URL = 'https://overseeducation.com';

export default function sitemap() {
  const now = new Date().toISOString().split('T')[0];

  // Core pages
  const corePages = [
    { url: `${BASE_URL}/`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/accommodation`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/scholarships`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/universities`, changeFrequency: 'weekly', priority: 0.9 },
  ].map(page => ({ ...page, lastModified: now }));

  // Country guide pages
  const countryGuides = [
    'study-in-uk', 'study-in-usa', 'study-in-canada', 'study-in-australia',
    'study-in-ireland', 'study-in-germany', 'study-in-france', 'study-in-finland',
    'study-in-italy', 'study-in-austria', 'study-in-netherlands',
  ].map(slug => ({
    url: `${BASE_URL}/guide/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // University pages
  const universityPages = universities.map(uni => ({
    url: `${BASE_URL}/universities/${uni.country.toLowerCase()}/${uni.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Country university listing pages
  const countryListings = [...new Set(universities.map(u => u.country))].map(country => ({
    url: `${BASE_URL}/universities/${country.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Policy pages
  const policyPages = [
    'privacy-policy', 'terms-conditions', 'refund-cancellation', 'delivery-policy',
  ].map(slug => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.3,
  }));

  // Other content pages
  const otherPages = [
    { url: `${BASE_URL}/blog`, changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE_URL}/testimonials`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/faq`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/mba-abroad`, changeFrequency: 'weekly', priority: 0.8 },
  ].map(page => ({ ...page, lastModified: now }));

  return [
    ...corePages,
    ...countryGuides,
    ...countryListings,
    ...universityPages,
    ...otherPages,
    ...policyPages,
  ];
}
