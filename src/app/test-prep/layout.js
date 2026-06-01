const PAGE_URL = 'https://overseeducation.com/test-prep';
const RAZORPAY_URL = 'https://rzp.io/rzp/c5K4pKY';
const OG_IMAGE = 'https://overseeducation.com/og-image.jpg';

export const metadata = {
  title: 'IELTS, TOEFL, PTE, SAT, DET Coaching — Premium 1-on-1 Test Prep',
  description:
    'Premium 1-on-1 IELTS, TOEFL, PTE Academic, SAT and Duolingo English Test coaching with in-house tutors who have 8+ years of teaching experience. Score-targeted plans from ₹460/session, full-length mocks, flexible scheduling, and Razorpay-secured enrolment. Bengaluru, India — live online worldwide.',
  keywords: [
    'IELTS coaching',
    'IELTS classes',
    'IELTS preparation',
    'IELTS coaching online',
    'IELTS coaching fees India',
    'TOEFL coaching',
    'TOEFL iBT preparation',
    'PTE coaching',
    'PTE Academic preparation',
    'SAT coaching',
    'Digital SAT preparation',
    'College Board SAT prep India',
    'Duolingo English Test coaching',
    'DET preparation',
    'CELPIP coaching India',
    'spoken English classes India',
    'English fluency training',
    'French A1 A2 classes India',
    'German A1 A2 classes India',
    'English test prep India',
    'one on one IELTS coaching',
    'premium IELTS tutor',
    'IELTS coaching Bangalore',
    'IELTS coaching Bengaluru',
    'online IELTS classes India',
    'Axelis Overseas test prep',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'Axelis Overseas Education',
    title: 'IELTS, TOEFL, PTE, SAT, DET Coaching — Premium 1-on-1 Test Prep | Axelis Overseas',
    description:
      'Crack IELTS, TOEFL, PTE, SAT and DET with tutors who have 8+ years of teaching behind them. Live 1-on-1 sessions, full-length mocks, score-targeted plans from ₹460/session. Enrol via Razorpay.',
    locale: 'en_IN',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Axelis Overseas — Premium 1-on-1 IELTS, TOEFL, PTE, SAT and DET coaching',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IELTS, TOEFL, PTE, SAT, DET — Premium 1-on-1 Test Prep | Axelis Overseas',
    description:
      'Live 1-on-1 coaching with 8+ year tutors. Score-targeted plans for IELTS, TOEFL, PTE, SAT and DET. From ₹460/session.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'education',
  // Geo / locale hints for traditional search engines.
  other: {
    'geo.region': 'IN-KA',
    'geo.placename': 'Bengaluru',
    'geo.position': '12.9716;77.5946',
    'ICBM': '12.9716, 77.5946',
    'language': 'en-IN',
    'content-language': 'en-IN',
  },
};

const provider = {
  '@type': 'EducationalOrganization',
  '@id': 'https://overseeducation.com/#org',
  name: 'Axelis Overseas Education',
  alternateName: 'Axelis Overseas',
  url: 'https://overseeducation.com',
  logo: 'https://overseeducation.com/logo.png',
  email: 'axelisoverseas@overseeducation.com',
  telephone: '+91 8970224250',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'WorkFlo Ranka Junction, Property No. 224, 3rd Floor, #80/3, Vijinapur Village, Old Madras Road, KR Puram Hobli',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560016',
    addressCountry: 'IN',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  sameAs: [
    'https://www.instagram.com/axelisoverseas/',
    'https://www.youtube.com/@axelisoverseas',
  ],
};

const buildCourse = ({ name, alt, abstract, price, priceUnit = 'per student per pack' }) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name,
  alternateName: alt,
  description: abstract,
  provider,
  inLanguage: 'en',
  educationalLevel: 'Beginner to Advanced',
  educationalCredentialAwarded: 'Test readiness for international university admission',
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'Prospective international student',
    audienceType: 'Students preparing for university admission abroad',
  },
  offers: {
    '@type': 'Offer',
    url: RAZORPAY_URL,
    availability: 'https://schema.org/InStock',
    priceCurrency: 'INR',
    price,
    category: 'Premium 1-on-1 tutoring',
    description: `Indicative starting price (${priceUnit}). Multiple packs available — see /test-prep for the full matrix.`,
  },
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT1H',
      instructor: {
        '@type': 'Person',
        name: 'Axelis Overseas in-house tutor (8+ years teaching experience)',
      },
    },
  ],
});

const courses = [
  buildCourse({
    name: 'IELTS Premium 1-on-1 Coaching',
    alt: 'International English Language Testing System preparation',
    abstract:
      'Live 1-on-1 IELTS coaching for Academic and General Training. Section-by-section drills, full-length mocks, line-by-line writing and speaking reviews with tutors who have 8+ years of teaching experience. 1-on-1 crash course (12 sessions) at ₹6,000; couple batch (15 sessions) at ₹5,300; batch of 3 (20 sessions) at ₹6,000 per student.',
    price: '6000',
  }),
  buildCourse({
    name: 'TOEFL iBT Premium 1-on-1 Coaching',
    alt: 'Test of English as a Foreign Language preparation',
    abstract:
      'Live 1-on-1 TOEFL iBT, CELPIP and general language-cert coaching covering Reading, Listening, Speaking and Writing. Score-targeted curriculum, weekly mocks with same-week feedback. ₹625 per session, practice portal extra.',
    price: '625',
    priceUnit: 'per session',
  }),
  buildCourse({
    name: 'PTE Academic Premium 1-on-1 Coaching',
    alt: 'Pearson Test of English Academic preparation',
    abstract:
      'Live 1-on-1 PTE Academic coaching with Alpha PTE subscription included (worth ₹1,299). Speaking and writing fluency drills, integrated-skills strategies, full-length mocks. 1-on-1 crash (9 sessions) at ₹5,300; couple batch (15 sessions) at ₹4,600; batch of 3 (15 sessions) at ₹5,300 per student.',
    price: '5300',
  }),
  buildCourse({
    name: 'Duolingo English Test (DET) Premium 1-on-1 Coaching',
    alt: 'Duolingo English Test preparation',
    abstract:
      'Live 1-on-1 Duolingo English Test coaching. At-home test strategy, adaptive question drills, writing-sample reviews, and full-length practice attempts. Pricing matches the TOEFL/CELPIP/Language Cert track at ₹625 per session.',
    price: '625',
    priceUnit: 'per session',
  }),
  buildCourse({
    name: 'SAT (Digital) Premium Coaching — Axelis Overseas',
    alt: 'Digital SAT (College Board) preparation',
    abstract:
      'Live coaching for the Digital SAT. Reading & Writing modules and the adaptive Math sections, full Bluebook mock cycle. 1-on-1 (min 16 sessions) from ₹760/session; batch of 2 (min 20) from ₹1,175/session; batch of 3 (min 30) from ₹1,600/session.',
    price: '760',
    priceUnit: 'per session, minimum 16 sessions for 1-on-1',
  }),
  buildCourse({
    name: 'Spoken English & Communication Training',
    alt: 'English fluency and interview preparation',
    abstract:
      'Live coaching to build spoken English fluency, confidence, and interview readiness for visa interviews, university interviews, or workplace English. 1-on-1 from ₹460/session, batches available.',
    price: '460',
    priceUnit: 'per session',
  }),
  buildCourse({
    name: 'French and German (A1 / A2) Coaching',
    alt: 'European language certifications A1 A2',
    abstract:
      'A1 and A2 level coaching for French and German. Suited for German student-visa language thresholds and French university admissions. 1-on-1 at ₹900/session; batch of 2 at ₹1,300/session; batch of 3 at ₹1,725/session.',
    price: '900',
    priceUnit: 'per session, 1-on-1',
  }),
];

const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'English language test preparation coaching',
  name: 'Axelis Premium 1-on-1 Test Prep (IELTS, TOEFL, PTE, DET)',
  description:
    'Premium 1-on-1 English language test coaching for IELTS, TOEFL, PTE Academic and the Duolingo English Test. Delivered live online by in-house tutors with 8+ years of teaching experience.',
  provider,
  areaServed: { '@type': 'Country', name: 'India' },
  audience: {
    '@type': 'Audience',
    audienceType: 'Students applying to universities abroad',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Test prep enrolment',
    itemListElement: courses.map((c, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: { '@type': 'Course', name: c.name },
      url: RAZORPAY_URL,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    })),
  },
};

const breadcrumbs = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://overseeducation.com/' },
    { '@type': 'ListItem', position: 2, name: 'Test Prep', item: PAGE_URL },
  ],
};

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which English test should I take — IELTS, TOEFL, PTE or DET?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the country and university you are applying to. UK and most European universities accept all four; the US accepts TOEFL, IELTS and increasingly DET; Canadian and Australian universities accept IELTS, TOEFL and PTE. The free 30-minute Axelis demo includes a diagnostic that picks the test most likely to get you to your target band fastest.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the test prep classes really 1-on-1?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every Axelis Premium Test Prep session is one student, one tutor, live online. There are no batches, no recorded lectures pretending to be live, and no shared screens with other students.',
      },
    },
    {
      '@type': 'Question',
      name: 'How experienced are the Axelis test prep tutors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every in-house tutor at Axelis Overseas has at least 8 years of full-time English test prep teaching experience across IELTS, TOEFL, PTE and DET. We share tutor profiles and past score histories on request before you enrol.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I do not hit my target band?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If a student finishes the planned hours and has not reached the target band agreed at the start, Axelis continues coaching until that band is hit. There is no extra fee for the additional sessions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I enrol and pay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enrol securely via Razorpay at rzp.io/rzp/c5K4pKY. You will receive a tax invoice the same day, your diagnostic call is scheduled within 24 hours, and your first 1-on-1 session is booked within the week.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Axelis Overseas based and do you teach students outside India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Axelis Overseas Education Private Limited is incorporated in Bengaluru, Karnataka, India. All test prep sessions are delivered live online, which means students based anywhere in India and abroad can attend at a time that suits their timezone.',
      },
    },
  ],
};

export default function TestPrepLayout({ children }) {
  // Plain <script type="application/ld+json"> tags so the JSON-LD is part of
  // the initial server-rendered HTML — visible to search-engine crawlers and
  // generative-AI fetchers on first request, not deferred behind hydration.
  return (
    <>
      <script
        type="application/ld+json"
        id="ld-test-prep-service"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />
      {courses.map((c, i) => (
        <script
          key={c.name}
          type="application/ld+json"
          id={`ld-test-prep-course-${i}`}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(c) }}
        />
      ))}
      <script
        type="application/ld+json"
        id="ld-test-prep-breadcrumbs"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        id="ld-test-prep-faq"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      {children}
    </>
  );
}
