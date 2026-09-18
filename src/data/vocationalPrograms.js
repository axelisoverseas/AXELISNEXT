// ---------------------------------------------------------------------------
// VOCATIONAL SKILL PROGRAMMES — Ausbildung and Chancenkarte (Germany)
// ---------------------------------------------------------------------------
//
// Launched WITHOUT the bundled premium language package. That bundle was
// priced at ₹1,50,000 against a delivered cost that could not be verified:
// the language line assumed ₹62,000 for roughly 600 contact hours, or ₹103 an
// hour, which only holds in large cohorts. Rather than sell a bundle whose
// cost we cannot stand behind, language is unbundled and every cost the
// candidate will meet is published here instead.
//
// THE RULE THIS FILE EXISTS TO ENFORCE: a candidate should be able to add up
// what this journey costs them before they pay us anything. Axelis fees and
// third-party costs are listed separately, and third-party costs are marked
// as payable to whoever actually charges them.
// ---------------------------------------------------------------------------

/** Axelis fees. These are the only amounts Axelis receives. */
export const vocationalFees = {
  d2c: {
    upfront: 19999,
    success: 180000,
    total: 199999,
    successTrigger:
      'Payable on visa completion, meaning your visa has been granted. Not on an invitation letter, and not on an offer.',
  },
  b2b: {
    signup: 4999,
    partnerFee: 45000,
    total: 49999,
    successTrigger: 'Partner fee settled on visa completion, per candidate.',
  },
};

/**
 * Costs the candidate pays to someone other than Axelis. Published so nobody
 * discovers them halfway through. Ranges are honest ranges, not the lowest
 * number we could find.
 */
export const thirdPartyCosts = [
  {
    item: 'German language training, A1 to B2',
    amount: '₹1,16,000 to ₹1,80,000',
    payableTo: 'Your language school',
    note:
      'Goethe-Institut India charges roughly ₹29,000 per level and there are four levels. Axelis runs A1 and A2 in-house at published Test Prep rates, which are usually lower. B1 and B2 are arranged separately. Around 600 contact hours in total.',
    required: true,
  },
  {
    item: 'Language exam fees',
    amount: '₹28,200 to ₹60,000',
    payableTo: 'Goethe-Institut or telc',
    note:
      'Goethe fees as at August 2026, including GST: A1 ₹9,400, A2 ₹10,600, B1 ₹18,800, B2 ₹21,200. Most Ausbildung candidates sit A1 and then B1, which is ₹28,200. Nursing tracks usually need B2.',
    required: true,
  },
  {
    item: 'APS certificate',
    amount: '₹18,000 approx',
    payableTo: 'APS India, New Delhi',
    note: 'Academic credential verification. Mandatory for most German routes. Takes 8 to 12 weeks, so start it early.',
    required: true,
  },
  {
    item: 'Document apostille',
    amount: '₹1,500 per document',
    payableTo: 'Axelis, on your behalf to MEA',
    note: 'Ministry of External Affairs apostille. Most candidates need between 4 and 8 documents.',
    required: true,
  },
  {
    item: 'Sworn translation',
    amount: '₹2,500 per document',
    payableTo: 'Axelis, via a sworn translator',
    note: 'German authorities require translations by a sworn translator. Same document count as above.',
    required: true,
  },
  {
    item: 'Blocked account (Sperrkonto)',
    amount: '€13,092 for 2026',
    payableTo: 'Fintiba, Expatrio or your chosen provider',
    note:
      'This is YOUR money, not a fee. It is held in your name and released to you monthly after you arrive in Germany. Providers charge a small setup and monthly maintenance fee on top. Ausbildung candidates who are paid a training wage may need a reduced amount or none at all, depending on the contract.',
    required: false,
    isDeposit: true,
  },
  {
    item: 'National visa fee',
    amount: '€75 approx',
    payableTo: 'German Mission in India',
    note: 'Charged in INR at the mission rate on the day.',
    required: true,
  },
  {
    item: 'VFS service charge',
    amount: '₹2,000 approx',
    payableTo: 'VFS Global',
    note: 'Plus optional premium lounge or courier services, which are not required.',
    required: true,
  },
  {
    item: 'Health insurance',
    amount: '₹8,000 to ₹15,000 per year',
    payableTo: 'Your insurer',
    note: 'Travel or incoming cover until German statutory insurance starts.',
    required: true,
  },
  {
    item: 'Flights and initial setup',
    amount: '₹40,000 to ₹70,000',
    payableTo: 'Airline, landlord and others',
    note: 'One-way fare, first rent and deposit, and basics for the first weeks.',
    required: false,
  },
];

/**
 * Caps. These exist so the obligation is bounded and so a candidate knows what
 * they are buying. Industry guidance for Indian Ausbildung applicants is 10 to
 * 15 employer applications, so 60 is roughly four times what is normally
 * needed and no candidate should ever reach it.
 */
export const programCaps = {
  ausbildung: {
    label: 'Up to 60 employer applications',
    detail:
      'Axelis will prepare and submit up to 60 applications to Ausbildung employers on your behalf. Typical Indian candidates secure an Ausbildungsvertrag within 10 to 15 applications, so this ceiling exists to bound the commitment rather than to limit you.',
  },
  chancenkarte: {
    label: 'One visa filing, one document revision cycle, 12-month window',
    detail:
      'Chancenkarte is a points-based job-seeker visa, so there is no employer application stage before you travel. Axelis covers your points assessment, document set, one full visa filing and one round of revisions if the mission asks for more, within a 12-month service window from enrolment.',
  },
};

export const vocationalPrograms = [
  {
    slug: 'ausbildung',
    name: 'Ausbildung',
    tagline: 'Paid vocational training in Germany, with an employer contract before you fly.',
    summary:
      'A German company takes you on as a trainee, pays you a monthly training wage, and you qualify in a recognised trade in two to three and a half years.',
    whoFor: [
      'Candidates aged 18 to 32 with school completion or a diploma',
      'Nursing, hospitality, logistics, mechatronics, IT and retail are the strongest tracks',
      'Anyone who would rather earn while training than pay tuition',
    ],
    requires: [
      'German at B1, or B2 for nursing',
      'An Ausbildungsvertrag, the signed training contract from a German employer',
      'APS certificate',
      'Recognised school or diploma certificates, apostilled and translated',
    ],
    axelisDoes: [
      'Profile assessment against the trades that actually hire Indian candidates',
      'CV rebuilt to German format, with a German-language covering letter per employer',
      'Employer sourcing and application submission, up to the cap below',
      'Interview coordination and preparation with the employer',
      'Ausbildungsvertrag review before you sign anything',
      'APS application support',
      'Full visa file build and VFS appointment',
      'Two mock visa interviews with a German-speaking counsellor',
      'Blocked account and insurance guidance',
      'Arrival support: Anmeldung, bank account, health insurance, Steuer-ID, SIM',
    ],
    cap: 'ausbildung',
    duration: 'Training runs 2 to 3.5 years in Germany. Preparation before departure is typically 12 to 18 months.',
    earnWhileTraining: '€1,000 to €1,300 per month training wage, rising each year',
  },
  {
    slug: 'chancenkarte',
    name: 'Chancenkarte (Opportunity Card)',
    tagline: 'A points-based visa that lets you enter Germany and look for work on the ground.',
    summary:
      'Germany scores you on qualification, German and English ability, experience and age. Clear the points threshold and you get a one-year visa to be in Germany and find skilled work.',
    whoFor: [
      'Graduates or candidates with a recognised vocational qualification',
      'Candidates with two or more years of relevant work experience',
      'Anyone who would rather search for a role in-country than from India',
    ],
    requires: [
      'A recognised degree or vocational qualification',
      'Six points or more on the official scale',
      'German at A1 or English at B2, and more points for higher German',
      'Proof of funds for the year, usually a blocked account',
    ],
    axelisDoes: [
      'Points assessment against the official criteria before you commit to anything',
      'Honest read on whether you clear the threshold, and what would move you over it',
      'Qualification recognition check, including ZAB where it applies',
      'APS application support',
      'Document set, apostille and sworn translation coordination',
      'Full visa file build and VFS appointment',
      'Two mock visa interviews',
      'Blocked account and insurance guidance',
      'Job search strategy for once you land, including CV and portal setup',
      'Arrival support: Anmeldung, bank account, health insurance, Steuer-ID, SIM',
    ],
    cap: 'chancenkarte',
    duration: 'One-year visa, extendable once you find qualifying work. Preparation is typically 8 to 14 months.',
    earnWhileTraining: null,
  },
];

export function getVocationalProgram(slug) {
  return vocationalPrograms.find((p) => p.slug === slug) || null;
}
