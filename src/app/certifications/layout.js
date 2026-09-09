import { programs, catalogueStats, formatINR } from '../../data/certificationPrograms';

const priceRange = `${formatINR(catalogueStats.priceFloor)} to ${formatINR(catalogueStats.priceCeiling)}`;

export const metadata = {
  title: 'Certification Programmes — 16 Programmes, 4 Tiers, EMI Available',
  description: `Sixteen Axelis certification programmes across four tiers, from ${priceRange}. Application coaching, German and French to CEFR B1, Executive MBA prep, PhD and fellowship applications, and Global Career Launch. EMI available.`,
  keywords: [
    'study abroad certification', 'application coaching certificate',
    'German CEFR B1 course India', 'French CEFR B1 course India',
    'Executive MBA application coaching', 'PhD application coaching India',
    'fellowship application support', 'SOP writing course',
    'student visa interview coaching', 'study abroad course EMI',
    'Axelis certifications', 'overseas education certification programmes',
  ],
  alternates: { canonical: 'https://overseeducation.com/certifications' },
  openGraph: {
    title: 'Axelis Certification Programmes — 16 Programmes Across 4 Tiers',
    description: `Earn a verifiable credential on the way to your offer letter. Sixteen programmes, ${priceRange}, EMI available.`,
    url: 'https://overseeducation.com/certifications',
    siteName: 'Axelis Overseas Education',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axelis Certification Programmes — 16 Programmes, 4 Tiers',
    description: `Application coaching, languages to CEFR B1, Executive MBA and PhD support. ${priceRange}. EMI available.`,
  },
};

// ItemList of every programme, so the catalogue is machine-readable as a set.
const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Axelis Overseas Certification Programmes',
  numberOfItems: programs.length,
  itemListElement: programs.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.title,
    url: `https://overseeducation.com/certifications/${p.slug}`,
  })),
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://overseeducation.com' },
    { '@type': 'ListItem', position: 2, name: 'Certifications', item: 'https://overseeducation.com/certifications' },
  ],
};

export default function CertificationsLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  );
}
