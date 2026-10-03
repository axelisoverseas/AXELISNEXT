// ============================================================================
// Content blocks for the city landing pages. Every value here is traceable.
// ============================================================================
//
// Products and prices: public/llms.txt and /products (the live page).
// Payment links: lifted from src/app/products/page.jsx, not invented.
// Booking link: the Calendly already used across the site.
// Proof images: already published at /proof on the live site, used on
//   /testimonials. Nothing new is being exposed by reusing them here.
//
// NOT INCLUDED, on purpose: a table naming local competitors. Competitor names
// auto-extracted from autocomplete came back noisy -- "Telangana" read as a
// business, "Ashiraj Private" and "Adam" were truncations. Publishing a wrong
// name against a real company is a defamation exposure, and a comparison built
// on guesses is worth less than one built on facts. The comparison below is
// instead a set of checkable claims about Axelis that a reader can take to any
// other consultant and ask the same question.
// ============================================================================

export const BOOK_URL = 'https://calendly.com/axelisoverseas/counsellingsession';
export const PAY_GAC = 'https://pages.razorpay.com/pl_Rk1qpiuEJifDx1/view';
export const PAY_EPC = 'https://pages.razorpay.com/pl_Rk1J9M0s2qvgUz/view';

export const PRODUCTS = [
  {
    name: 'Global Admissions Charter',
    tag: 'UK · USA · Canada · Australia',
    price: '₹9,999',
    priceNote: 'onboarding, paid once',
    pay: PAY_GAC,
    points: [
      'One counsellor from shortlist to arrival',
      'Applications, SOP and document checks',
      'Visa filing included',
      'Deposit refunded if the offer or visa does not come through',
    ],
  },
  {
    name: 'Europe Public Charter',
    tag: 'Tuition-free public universities in Europe',
    price: '₹19,999',
    priceNote: 'plus ₹1,80,000 success fee, only once an offer is accepted',
    pay: PAY_EPC,
    points: [
      'Public universities with no tuition fee',
      'APS, uni-assist and blocked account handled',
      'Visa filing included',
      'The success fee is payable only on an accepted offer',
    ],
  },
  {
    name: 'Test prep',
    tag: 'IELTS · TOEFL · PTE · Duolingo',
    price: 'from ₹460',
    priceNote: 'a session',
    pay: null,
    points: ['In-house faculty', 'Book single sessions, not a package', 'Online, so your city does not matter'],
  },
  {
    name: 'MEA apostille',
    tag: 'Document attestation',
    price: '₹1,500',
    priceNote: 'per document, plus GST',
    pay: null,
    points: ['Notary → state → MEA, sequenced for you', 'Charged per document, published upfront'],
  },
];

// Claims a reader can verify, about us. Each is checkable on this site, which
// is the point: the comparison is "ask anyone else for the same page".
export const COMPARISON = [
  { claim: 'Every fee published before you pay', us: 'Yes. On this page and on /products' },
  { claim: 'Price changes by city', us: 'No. Same fee whether you are in Mumbai or Ratlam' },
  { claim: 'Consultation fee', us: 'None. The first call is free' },
  { claim: 'Admission promised', us: 'No. Axelis does not promise admission anywhere' },
  { claim: 'Refund if the offer or visa fails', us: 'Deposit refunded, committed in writing' },
  { claim: 'Which universities pay us commission', us: 'Published, so you can weigh any recommendation' },
  { claim: 'Counsellor', us: 'One named counsellor, not a call centre' },
];

// Already published at /proof and used on /testimonials.
export const PROOF = [
  { src: '/proof/razorpay-receipt-1.jpeg', alt: 'Razorpay payment receipt issued to an Axelis student' },
  { src: '/proof/esign-zft-1.jpeg', alt: 'Electronically signed Axelis student agreement' },
  { src: '/proof/visa-poland-raghav.jpeg', alt: 'Student visa granted to an Axelis student for Poland' },
  { src: '/proof/razorpay-receipt-2.jpeg', alt: 'Razorpay payment receipt issued to an Axelis student' },
];
