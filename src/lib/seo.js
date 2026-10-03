import { OFFICES } from '@/data/offices';

// One host, one organisation. Production serves www and redirects the apex to
// it, so every canonical, sitemap entry and schema URL uses www. Pointing
// search engines at the apex meant every signal landed on a redirect.
export const SITE_URL = 'https://www.overseeducation.com';

export const ORG_ID = `${SITE_URL}/#org`;

// Facts here are the ones already published on /about and the policy pages.
// Add nothing that is not on the site: AI answer engines quote this verbatim.
export const organization = {
  '@type': 'EducationalOrganization',
  '@id': ORG_ID,
  name: 'Axelis Overseas Education',
  legalName: 'Axelis Overseas Education Pvt Ltd',
  alternateName: 'Axelis Overseas',
  url: SITE_URL,
  // Navy on white: Google shows organisation logos on a white card, where
  // the old white-on-transparent logo.png rendered as nothing.
  logo: `${SITE_URL}/brand/axelis-logo-navy-512.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "India's study-abroad consultancy across 29 destination markets. One counsellor from shortlist to arrival, every fee published before you pay, and a written refund commitment on concierge programmes.",
  foundingDate: '2023-07-18',
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'CIN',
    value: 'U85500CT2023PTC014913',
  },
  email: 'axelisoverseas@overseeducation.com',
  telephone: '+91-9098522711',
  address: [
    {
      '@type': 'PostalAddress',
      name: 'Corporate office',
      streetAddress: 'No. 224, 3rd Floor, WorkFlo Ranka Junction Property, 80/3, KR Puram Bridge, Krishna Reddy Industrial Estate, Dooravani Nagar',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560016',
      addressCountry: 'IN',
    },
    {
      '@type': 'PostalAddress',
      name: 'Registered office',
      streetAddress: '1st Floor, Vrindavan Plaza, B-20, Nehru Chowk',
      addressLocality: 'Bilaspur',
      addressRegion: 'Chhattisgarh',
      postalCode: '495001',
      addressCountry: 'IN',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9098522711',
    contactType: 'admissions',
    email: 'axelisoverseas@overseeducation.com',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
  areaServed: { '@type': 'Country', name: 'India' },
  subOrganization: [
    { '@id': `${SITE_URL}/offices/bengaluru#local` },
    { '@id': `${SITE_URL}/offices/bilaspur#local` },
  ],
  knowsAbout: [
    'Study abroad admissions',
    'Student visas',
    'IELTS, TOEFL, PTE and Duolingo English Test preparation',
    'German and French to CEFR B1',
    'Ausbildung and Chancenkarte Germany',
    'Education loans and EMI',
  ],
  // axelis_overseas is the live Instagram profile; axelisoverseas shows no profile.
  sameAs: [
    'https://www.facebook.com/profile.php?id=61552129672233',
    'https://www.instagram.com/axelis_overseas/',
    'https://www.linkedin.com/company/axelis-overseas-education-pvt-ltd/',
    'https://www.youtube.com/@axelisoverseas',
  ],
};

// ---------------------------------------------------------------------------
// The two branches, as LocalBusiness.
// ---------------------------------------------------------------------------
// EducationalOrganization is NOT a LocalBusiness subtype -- it descends from
// Organization only, while LocalBusiness descends from both Organization and
// Place. So `geo` and `openingHoursSpecification` cannot be bolted onto the
// organization node above; the premises need their own nodes. Multi-typing each
// one keeps it recognisable as an education provider as well as a place.
//
// parentOrganization, not branchOf: schema.org supersedes branchOf.
//
// DELIBERATELY NO aggregateRating OR review ON THESE NODES, EVER. Google's
// self-serving reviews rule makes a page ineligible for review star treatment
// when the business marks up reviews about itself -- and because siteGraph is
// injected site-wide from src/app/layout.js, adding one here would apply that
// to every page on the site, not to one. The legitimate route to visible stars
// is the Business Profile surfacing in Maps and the local pack, which is what
// sameAs below supports. Real stars are never on-page markup.
export const offices = OFFICES.map((o) => ({
  '@type': ['LocalBusiness', 'EducationalOrganization'],
  '@id': `${SITE_URL}/offices/${o.slug}#local`,
  name: o.name,
  url: `${SITE_URL}/offices/${o.slug}`,
  parentOrganization: { '@id': ORG_ID },
  telephone: '+91-9098522711',
  email: 'axelisoverseas@overseeducation.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: o.streetAddress,
    addressLocality: o.addressLocality,
    addressRegion: o.addressRegion,
    postalCode: o.postalCode,
    addressCountry: o.addressCountry,
  },
  areaServed: { '@type': 'Country', name: 'India' },
  ...(o.geo
    ? { geo: { '@type': 'GeoCoordinates', latitude: o.geo.latitude, longitude: o.geo.longitude } }
    : {}),
  ...(o.openingHours
    ? {
        openingHoursSpecification: o.openingHours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
      }
    : {}),
  ...(o.mapsUrl ? { sameAs: [o.mapsUrl] } : {}),
  ...(o.photos.length ? { image: o.photos.map((src) => `${SITE_URL}${src}`) } : {}),
}));

export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    organization,
    ...offices,
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Axelis Overseas',
      inLanguage: 'en-IN',
      publisher: { '@id': ORG_ID },
    },
  ],
};
