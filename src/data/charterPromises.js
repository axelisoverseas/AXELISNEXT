/**
 * Every promise in the two student charters, in one place.
 *
 * SOURCE: the two charter declarations students accept at checkout, read
 * 26 September 2026 from the documents linked on the Razorpay enrolment pages
 * pl_Rk1qpiuEJifDx1 (Zero Consultation Fee, now the Global Admissions Charter)
 * and pl_Rk1J9M0s2qvgUz (Zero Tuition Fee, now the Europe Public Charter).
 *
 * The site renamed both plans and moved checkout from Razorpay to Cashfree.
 * The promises carried over; the names and the payment rail did not.
 *
 * TWO POINTS WHERE THE SOURCE DOCUMENTS DISAGREE. Both are resolved here in
 * favour of what the live Cashfree checkout discloses, because a page that sits
 * next to a pay button must say what the pay button says. Both need the
 * founder's confirmation, and the charters need reissuing to match:
 *
 *   1. GAC deposit refund. The Razorpay-era charter refunds the ₹9,999 "within
 *      20 working days of the Student receiving their visa". The live checkout
 *      says it is refunded once the visa is granted, the student has arrived,
 *      and university tuition is paid in full ("Section 4A"). The stricter,
 *      newer condition is used.
 *   2. EPC visa-rejection refund. The charter says the "full Success Fee
 *      (₹90,000 or applicable paid amount)" is refunded. The Success Fee is
 *      ₹1,80,000 everywhere else, including two lines earlier in the same
 *      charter. The ₹90,000 figure is not reproduced; "the Success Fee you
 *      have paid" is what "applicable paid amount" means.
 */

export const CHARTER_DOCS = {
  gac: 'https://drive.google.com/file/d/1A-uIsE-7CwydZq2xG8YBysz1MkXBYOUa/view',
  epc: 'https://drive.google.com/file/d/1AInWwkVqgksPKWQCumFtKLtdrq3VEctv/view',
};

export const PLANS = [
  {
    key: 'gac',
    name: 'Global Admissions Charter',
    short: 'GAC',
    formerly: 'Zero Consultation Fee',
    for: 'Global private universities: UK, Ireland, USA, Canada, Australia and more.',
    headline: '₹9,999',
    headlineNote: 'Refundable deposit. No consultation fee.',
    pay: [
      { what: 'Onboarding deposit', amount: '₹9,999', when: 'Now, to start', note: 'Refundable. See below.' },
      { what: 'Consultation fee', amount: '₹0', when: 'Never', note: 'Axelis charges nothing for the consultancy itself.' },
    ],
    total: 'Nothing, if you are placed',
    scope: [
      'Shortlisting in three rounds: your subject, your budget, then the final university list',
      'A live status tracker with every shortlisted university and its deadline',
      'A dedicated email ID for university correspondence, with the password shared with you',
      'Education loan support through 25+ lending partners',
      'Accommodation assistance',
      'Visa processing',
    ],
    refundYes: [
      {
        title: 'You are placed',
        body: 'The full ₹9,999 comes back once your visa is granted, you have arrived, and you have paid your university tuition in full. A placed student pays Axelis nothing.',
      },
      {
        title: 'No university makes you an offer',
        body: 'The full ₹9,999 comes back if no university on your status tracker makes you any offer, conditional or unconditional.',
      },
    ],
    refundNo: [
      'You change your mind or your destination',
      'You withdraw from the process yourself',
      'You turn down an offer from a university on your shortlist',
      'You leave Axelis after receiving an offer from one of your preferred universities',
    ],
    timeline: 'Within 20 working days of the refund condition being met.',
  },
  {
    key: 'epc',
    name: 'Europe Public Charter',
    short: 'EPC',
    formerly: 'Zero Tuition Fee',
    for: 'Tuition-free public universities in Europe: Germany, Norway, Finland and more.',
    headline: '₹19,999',
    headlineNote: 'Now. ₹1,80,000 only if you accept an offer.',
    pay: [
      { what: 'Service fee', amount: '₹19,999', when: 'Now, to start', note: 'Refunded if no offer comes.' },
      { what: 'Success fee', amount: '₹1,80,000', when: 'Only when you accept an offer from a tuition-free public university', note: 'Covers final enrolment and visa processing.' },
    ],
    total: '₹1,99,999, and only if you accept an offer',
    scope: [
      'Profile evaluation: the right subject and the right country for your budget',
      'Shortlisting of tuition-free public universities',
      'A live status tracker with applications, statuses and deadlines',
      'A dedicated email ID for your applications, used only for them',
      'Europass CV, Statement of Purpose and Letters of Recommendation',
      'Every university message shared with you as a screenshot or forwarded email until the success fee is paid',
      'Visa SOP and visa filing',
      'Scholarship applications, and education loans through 25+ lending partners',
      'Housing assistance, and part-time job guidance after you land',
    ],
    refundYes: [
      {
        title: 'No university makes you an offer',
        body: 'The ₹19,999 service fee comes back if no university on your status tracker makes you an offer.',
      },
      {
        title: 'Your visa is refused',
        body: 'The success fee you have paid comes back in full, if you choose not to reapply.',
      },
    ],
    refundNo: [
      'You receive an offer from any university on your tracker, public or private',
      'You leave the process yourself after the first shortlist has been shared',
      'You decline an offer from a university that was not your preference. The ₹19,999 is not refunded, but you owe no success fee either.',
    ],
    timeline: 'Within 14 days of approval, to the payment method you used.',
  },
];

/* What both charters ask of the student. */
export const YOUR_PART = [
  {
    title: 'Mark your preferences',
    body: 'On the status tracker, you rank the universities you want. Once you confirm, that order is locked, so neither side can move the goalposts later.',
  },
  {
    title: 'Only the tracker counts',
    body: 'Refunds are judged against the universities on your official status tracker, and nothing else. If it is not on the tracker, it does not count either way.',
  },
  {
    title: 'Tell us the truth',
    body: 'Every document and detail you give us must be genuine. Forged documents or fraud end the agreement and can carry criminal liability.',
  },
];

export const LEGAL = [
  { k: 'Signed how', v: 'Electronically. Ticking "I agree" and paying is a binding signature under Section 10A of the Information Technology Act, 2000. No paper needed.' },
  { k: 'Governing law', v: 'The laws of India, including the IT Act 2000 and the Bharatiya Nyaya Sanhita 2023.' },
  { k: 'Disputes', v: 'The courts of Bilaspur, Chhattisgarh, where our registered office is.' },
  { k: 'Who you contract with', v: 'Axelis Overseas Education Pvt Ltd, CIN U85500CT2023PTC014913, GSTIN 22AAZCA0637P1Z5.' },
];
