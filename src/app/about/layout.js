export const metadata = {
    title: 'About Us',
    description:
        "India's certification-first study-abroad platform. Bengaluru corporate office, Bilaspur registered office, scaling to serve 5,000 to 10,000 learners a year across 16 certification programmes.",
    alternates: { canonical: 'https://overseeducation.com/about' },
};

// EducationalOrganization, per handover section 8.
const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Axelis Overseas Education Pvt Ltd',
    alternateName: 'Axelis Overseas',
    url: 'https://overseeducation.com',
    logo: 'https://overseeducation.com/1yellow%20svg%20logoaxelis.svg',
    description:
        "India's certification-first study-abroad platform. Sixteen certification programmes across four tiers, alongside end-to-end study-abroad advisory across 29 destination markets.",
    foundingDate: '2023-07-18',
    identifier: {
        '@type': 'PropertyValue',
        propertyID: 'CIN',
        value: 'U85500CT2023PTC014913',
    },
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
    sameAs: [
        'https://www.facebook.com/profile.php?id=61552129672233',
        'https://www.instagram.com/axelis_overseas/',
        'https://www.linkedin.com/company/axelis-overseas-education-pvt-ltd/',
        'https://www.youtube.com/@axelisoverseas',
    ],
};

export default function AboutLayout({ children }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
            />
            {children}
        </>
    );
}
