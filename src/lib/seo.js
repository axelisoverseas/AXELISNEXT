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
      streetAddress: 'WorkFlo Ranka Junction, 3rd Floor, Old Madras Road, KR Puram Hobli',
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

export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    organization,
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
