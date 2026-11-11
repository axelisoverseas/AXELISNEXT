/**
 * Every promise in the three student charters, in one place.
 *
 * NEW CONDITIONS ONLY. The Razorpay-era charters (Zero Consultation Fee, Zero
 * Tuition Fee) are retired. Where they differed from the current checkout, the
 * current checkout wins, per the founder on 26 September 2026:
 *
 *   - GAC deposit comes back once the visa is granted, the student has arrived
 *     and tuition is paid in full, or if no offer arrives.
 *   - EPC service fee: NO staging. Refunded if no university on the student's
 *     preference list (status tracker and portal) makes an offer, judged across
 *     intakes rather than one intake, because public universities run several.
 *   - EPC success fee comes back if the visa is refused for a reason not
 *     attributable to the student. The old "₹90,000" figure is gone.
 *   - EPC includes GAC free: an EPC student can add private universities to
 *     the same preference list at no extra fee and no ₹9,999 deposit. A
 *     private offer counts as an offer (no service-fee refund) but carries no
 *     success fee, which applies only to tuition-free public universities.
 *   - ILC v1.2 (29 Sep 2026), per the founder: a visa refusal not down to
 *     the student returns HALF the success fee paid (US student-visa refusals
 *     are common); deferring an accepted offer to a later intake means no
 *     refund of the success fee at all, visa refusal included.
 *   - ILC v1.1 (29 Sep 2026): the success fee now applies to the whole ILC
 *     list (Ivy League, Ivy Plus, Public Ivies, Little Ivies with graduate
 *     programmes; 49 universities, src/data/ilcUniversities.json), per the
 *     founder. The list rule is two from the ILC list, not two Ivies.
 *   - ILC (Ivy League Charter, launched 29 Sep 2026) runs on the EPC model
 *     and amounts, per the founder: ₹19,999 + GST now, refunded if no
 *     university on the preference list makes an offer; ₹1,80,000 + GST only
 *     when the student accepts an offer from one of the eight Ivy League
 *     universities. Other US universities on the list carry no success fee.
 *     The list needs at least five universities, at least two of them Ivy.
 *   - 18% GST is added on top of every fee and itemised on the receipt.
 *   - 5 Nov 2026 (EPC/GAC v2.1, ILC v1.3), per the founder's written
 *     commitment to a student's family that day:
 *       * GST is never refunded, on any charter or any refund. Only the base
 *         fee comes back: ₹19,999 (EPC, ILC), ₹9,999 (GAC), ₹1,80,000 or
 *         ₹90,000 of a success fee.
 *       * An EPC student who goes ahead only with GAC universities gets the
 *         ₹19,999 service fee back within 20 working days of visa granted
 *         and arrival, with NO tuition-paid condition, and carries on under
 *         the GAC terms with no ₹9,999 deposit. Not "leaving the process".
 *       * Older PDFs (EPC/GAC v2.0, ILC v1.2) stay published: they are what
 *         earlier students accepted.
 *   - Checkout is Cashfree. Razorpay and PayU are no longer used.
 */

import ILC_US from './ilcUsUniversities.json';
import ILC_GROUPS from './ilcUniversities.json';

/* The ILC list: where the success fee applies. Annex A of the ILC charter. */
export const ILC_LIST = ILC_GROUPS;
export const ILC_LIST_COUNT = ILC_GROUPS.reduce((n, g) => n + g.members.length, 0);

/* The US universities on our GAC commission sheet that take Master's or MBA
   applicants: the rest of an ILC preference list, alongside the Ivy League.
   From the GAC commission sheet (USA tab, 29 Sep 2026), minus two rows the
   sheet does not resolve and eight it lists for undergraduates only. The
   sheet says its USA tab is partial, so this list grows as it does. */
export const ILC_US_UNIVERSITIES = ILC_US;

export const CHARTER_DOCS = {
  // GAC/EPC v2.1 and ILC v1.3, reissued 5 November 2026. The previous
  // versions stay in public/charters (CHARTER_DOCS_PREVIOUS) because they are
  // what students signed before that date. Never delete them.
  gac: '/charters/global-admissions-charter-v2.1.pdf',
  epc: '/charters/europe-public-charter-v2.1.pdf',
  ilc: '/charters/ivy-league-charter-v1.3.pdf',
};

export const CHARTER_DOCS_PREVIOUS = {
  gac: '/charters/global-admissions-charter-v2.0.pdf',
  epc: '/charters/europe-public-charter-v2.0.pdf',
  ilc: '/charters/ivy-league-charter-v1.2.pdf',
};

/* Effective date of GAC/EPC v2.1 and ILC v1.3. SET TO THE DEPLOY DATE, and set
   EFFECTIVE in docs/brand/kit/charters/build_charters.py to match, then rebuild
   the PDFs. Until deploy, checkout still shows v2.0 / v1.2. */
export const CHARTER_EFFECTIVE = '9 November 2026';

/* Said once, on every refund surface. */
export const GST_NOT_REFUNDED = 'GST is never refunded, on any plan. Every refund is the fee itself, without the GST.';

/* The eight Ivy League universities, by their usual names. Used only to say
   where we apply; Axelis is not affiliated with the Ivy League or any of them. */
export const IVY_LEAGUE = [
  { name: 'Brown University', city: 'Providence, RI' },
  { name: 'Columbia University', city: 'New York, NY' },
  { name: 'Cornell University', city: 'Ithaca, NY' },
  { name: 'Dartmouth College', city: 'Hanover, NH' },
  { name: 'Harvard University', city: 'Cambridge, MA' },
  { name: 'University of Pennsylvania', city: 'Philadelphia, PA' },
  { name: 'Princeton University', city: 'Princeton, NJ' },
  { name: 'Yale University', city: 'New Haven, CT' },
];

export const PLANS = [
  {
    key: 'gac',
    name: 'Global Admissions Charter',
    short: 'GAC',
    formerly: 'Zero Consultation Fee',
    for: 'Global private universities: UK, Ireland, USA, Canada, Australia and more.',
    headline: '₹9,999',
    headlineNote: 'Refundable deposit (GST is not refunded). No consultation fee.',
    pay: [
      { what: 'Onboarding deposit', amount: '₹9,999', gst: '+ ₹1,799.82 GST', when: 'Now, to start', note: 'The ₹9,999 is refundable. The GST is not. See below.' },
      { what: 'Consultation fee', amount: '₹0', when: 'Never', note: 'Axelis charges nothing for the consultancy itself.' },
    ],
    total: '₹11,798.82. If you are placed, the ₹9,999 comes back and only the ₹1,799.82 GST stays.',
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
        body: 'Your ₹9,999 comes back once your visa is granted, you have arrived, and you have paid your university tuition in full. The ₹1,799.82 GST is not refunded. A placed student pays Axelis no fee.',
      },
      {
        title: 'No university makes you an offer',
        body: 'Your ₹9,999 comes back if no university on your status tracker makes you any offer, conditional or unconditional. The GST is not refunded.',
      },
    ],
    refundNo: [
      'You change your mind or your destination',
      'You withdraw from the process yourself',
      'You turn down an offer from a university on your shortlist',
      'You leave Axelis after receiving an offer from one of your preferred universities',
    ],
    timeline: 'Within 20 working days of the refund condition being met. GST is never refunded.',
  },
  {
    key: 'epc',
    name: 'Europe Public Charter',
    short: 'EPC',
    formerly: 'Zero Tuition Fee',
    for: 'Tuition-free public universities in Europe: Germany, Norway, Finland and more. The Global Admissions Charter is included free for private universities: no deposit, no extra fee.',
    headline: '₹19,999',
    headlineNote: 'Now. ₹1,80,000 only if you accept an offer.',
    pay: [
      { what: 'Service fee', amount: '₹19,999', gst: '+ ₹3,599.82 GST', when: 'Now, to start', note: 'The ₹19,999 is refunded if no offer comes, or if your visa is filed for a Global Admissions Charter university. The GST is not.' },
      { what: 'Success fee', amount: '₹1,80,000', gst: '+ ₹32,400 GST', when: 'Only when you accept an offer from a tuition-free public university', note: 'Covers final enrolment and visa processing.' },
    ],
    total: '₹1,99,999 + GST (₹2,35,998.82), and only if you accept an offer from a tuition-free public university',
    scope: [
      'Profile evaluation: the right subject and the right country for your budget',
      'Shortlisting of tuition-free public universities',
      'The Global Admissions Charter included free: private universities go on the same preference list, with no ₹9,999 deposit and no extra fee',
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
        title: 'No university on your preference list makes you an offer',
        body: 'Your ₹19,999 service fee comes back if no university on your preference list, the one in your status tracker and your portal, makes you an offer. The GST is not refunded.',
        note: 'Judged across every intake on your list, not one intake at a time, because public universities run more than one. Paid within 14 days of approval.',
      },
      {
        title: 'Your visa is filed for a Global Admissions Charter university',
        body: 'If your student visa is filed for a Global Admissions Charter university (private or paid-tuition) and not for a tuition-free public university, your ₹19,999 service fee comes back. It is paid within 20 working days of your visa being granted and you arriving. You do not need to have paid your tuition first. The GST is not refunded.',
        note: 'The university named on your visa application decides this, and nothing else. From then on your file continues under the Global Admissions Charter terms and conditions. You pay no ₹9,999 deposit and no other fee for it.',
      },
      {
        title: 'Your visa is refused, and it is not down to you',
        body: 'The ₹1,80,000 success fee comes back if your visa is refused for a reason not attributable to you. The GST on it is not refunded.',
        note: 'Paid within 14 days of approval.',
      },
    ],
    refundNo: [
      'You receive an offer from any university on your preference list, public or private. A private offer carries no success fee. Exception: if your visa is filed for a Global Admissions Charter university, the visa-filing refund above applies.',
      'You leave the process yourself after the first shortlist has been shared. Filing your visa for a Global Admissions Charter university is not leaving the process.',
      'You decline an offer from a university that was not your preference. The ₹19,999 is not refunded, but you owe no success fee either.',
    ],
    timeline: 'To the payment method you used: within 14 days of approval, or within 20 working days of visa and arrival if your visa is filed for a Global Admissions Charter university. GST is never refunded.',
  },
  {
    key: 'ilc',
    name: 'Ivy League Charter',
    short: 'ILC',
    formerly: null,
    for: "Master's and MBA applications to the Ivy League, the Ivy Plus, the Public Ivies and the Little Ivies: 49 universities, with other US universities on the same list.",
    headline: '₹19,999',
    headlineNote: "Now. ₹1,80,000 only if you accept an offer from the ILC list.",
    pay: [
      { what: 'Service fee', amount: '₹19,999', gst: '+ ₹3,599.82 GST', when: 'Now, to start', note: 'The ₹19,999 is refunded if no offer comes, or if your visa is filed for a Global Admissions Charter university. The GST is not.' },
      { what: 'Success fee', amount: '₹1,80,000', gst: '+ ₹32,400 GST', when: 'Only when you accept an offer from a university on the ILC list: the Ivy League, Ivy Plus, Public Ivies or Little Ivies', note: 'Other US universities on your list: no success fee.' },
    ],
    total: '₹1,99,999 + GST (₹2,35,998.82), and only if you accept an offer from the ILC list',
    scope: [
      'Profile evaluation against what the Ivy League and other top US programmes actually weigh',
      `A shortlist of programmes across the 49 universities on the ILC list, balanced with ${ILC_US.length} more US universities we work with`,
      'Essay and SOP strategy, with feedback on every draft, and a US-format résumé',
      'Letters of recommendation: who to ask and what they should cover',
      'Mock interviews for programmes that interview',
      'Application submission and a live status tracker with every deadline',
      'Scholarship, fellowship and assistantship applications where the programme offers them',
      'Education loans through 25+ lending partners',
      'I-20, SEVIS and F-1 visa filing, with a mock visa interview',
      'Housing assistance and pre-departure support',
    ],
    refundYes: [
      {
        title: 'No university on your preference list makes you an offer',
        body: 'Your ₹19,999 service fee comes back if no university on your preference list, on the ILC list or not, makes you an offer. The GST is not refunded.',
        note: 'Your list needs at least five universities, at least two of them from the ILC list, so that it is a real application strategy and not a lottery ticket. Paid within 14 days of approval.',
      },
      {
        title: 'Your visa is filed for a Global Admissions Charter university',
        body: 'If your student visa is filed for a Global Admissions Charter university, meaning any university that is not on the ILC list, your ₹19,999 service fee comes back. It is paid within 20 working days of your visa being granted and you arriving. You do not need to have paid your tuition first. The GST is not refunded.',
        note: 'The university named on your visa application decides this, and nothing else. From then on your file continues under the Global Admissions Charter terms and conditions. You pay no ₹9,999 deposit, no success fee and no other fee for it.',
      },
      {
        title: 'Your visa is refused, and it is not down to you',
        body: 'Half the success fee, ₹90,000, comes back if your F-1 visa is refused for a reason not attributable to you. The GST is not refunded.',
        note: 'Half, not all, because US student-visa refusals are common and the admission work is complete by then. None of it comes back if you have deferred the offer to a later intake.',
      },
    ],
    refundNo: [
      'You receive an offer from any university on your preference list, on the ILC list or not. Exception: if your visa is filed for a Global Admissions Charter university, the visa-filing refund above applies.',
      'You leave the process yourself after the first shortlist has been shared. Filing your visa for a Global Admissions Charter university is not leaving the process.',
      'You decline an offer from a university on your list. The ₹19,999 is not refunded; you owe a success fee only if you accept an offer from the ILC list.',
      'You defer an accepted offer to a later intake. The success fee stays due and none of it is refunded, even if a later visa is refused.',
    ],
    timeline: 'To the payment method you used: within 14 days of approval, or within 20 working days of visa and arrival if your visa is filed for a Global Admissions Charter university. GST is never refunded.',
    notIncluded: 'Test fees (GRE, GMAT, TOEFL, IELTS, Duolingo), university application fees, the SEVIS fee and the visa fee are paid by you directly. Test preparation is sold separately.',
  },
];

/* What every charter asks of the student. */
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
