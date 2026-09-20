// ---------------------------------------------------------------------------
// SERVICE PROMISES: what Axelis commits to, per service
// ---------------------------------------------------------------------------
//
// One source of truth, used in three places:
//
//   1. /policies/payment-terms, which every Cashfree payment form links to as
//      its Terms and Conditions, and which the payer ticks to agree.
//   2. The per-service letterhead PDFs handed to a candidate.
//   3. Anywhere the site needs to state what a fee actually buys.
//
// The rule these entries follow: a promise is only written here if it can be
// checked. "We will submit within 3 working days of receiving your documents"
// is a promise. "Fast turnaround" is not, and does not appear.
//
// `notIncluded` matters as much as `included`. Most service disputes are not
// about work done badly, they are about work the buyer assumed was covered.
// ---------------------------------------------------------------------------

import { refundPolicy } from './certificationPrograms';

export const promiseMeta = {
  company: 'Axelis Overseas Education Pvt Ltd',
  cin: 'U85500CT2023PTC014913',
  mcc: '8299 (Educational Services)',
  address: 'B20, Vrindavan Plaza, Bilaspur, Chhattisgarh 495001, India',
  email: refundPolicy.supportEmail,
  phone: refundPolicy.supportPhone,
  version: '1.0',
  effectiveFrom: '19 September 2026',
};

/**
 * The agreement the payer accepts. Shown on /policies/payment-terms and
 * printed on every letterhead document, word for word the same in both.
 */
export const consent = {
  heading: 'Your agreement',
  lead:
    'Payment is how you accept these terms. There is no separate contract to sign for a single service, and nothing here takes effect until your payment succeeds.',
  points: [
    'By completing payment you confirm that you have read the scope, the exclusions and the refund terms for the service you are buying, and that you agree to them.',
    'You confirm that the details you give us, including your name, contact details and documents, are true and yours to give.',
    'You accept that Axelis fees and third-party charges are separate. Where a government body, exam board, university or translator charges a fee, that fee is theirs and is not covered by what you pay us.',
    'You accept that 18% GST is added to every Axelis fee and is itemised on your receipt.',
    'Your receipt, together with these terms, is the record of the agreement. Keep it.',
  ],
  footer:
    'If you do not agree to any part of this, do not complete the payment. Write to us instead and we will talk it through before you pay.',
};

/** Applies to every service, so it is stated once rather than repeated. */
export const universalTerms = [
  {
    title: 'What the fee is',
    body:
      'Every price we publish is the Axelis fee before GST. 18% GST is added at checkout and shown separately on your receipt. We do not add handling charges, convenience fees or anything else.',
  },
  {
    title: 'Third-party charges are yours',
    body:
      'Government fees, apostille charges levied by the Ministry of External Affairs, APS and ZAB fees, exam registration, visa fees and VFS charges are paid to those bodies. We never take a margin on them, and we tell you the expected amount before you commit.',
  },
  {
    title: 'Cooling off',
    body: `You have ${refundPolicy.coolingOffBusinessDays} business days from payment to cancel, and receive a full refund less the ₹${refundPolicy.adminFee.toLocaleString('en-IN')} administrative fee, provided work has not already started on your file. Once a document has been submitted to a government body or a session has been delivered, that part cannot be unwound.`,
  },
  {
    title: 'If we cannot deliver',
    body:
      'If Axelis cannot perform the service for any reason within our control, you receive a full refund of the unused value. We do not keep money for work we did not do.',
  },
  {
    title: 'What we will not promise',
    body:
      'No one can guarantee a visa, an admission, an employer contract or an exam score, and we do not. We guarantee the work: the preparation, the submission and the deadlines set out per service below.',
  },
  {
    title: 'Your data',
    body:
      'Documents you send us are used only to deliver the service you paid for. Every candidate exchange runs through an Axelis-controlled email address so nothing is lost or disputed later. We do not sell your data.',
  },
];

export const servicePromises = [
  {
    slug: 'mea-apostille',
    name: 'MEA apostille',
    fee: '₹1,500 per document, plus GST',
    summary:
      'We get your documents apostilled by the Ministry of External Affairs so foreign authorities will accept them.',
    included: [
      'Checking each document is in a form MEA will accept, before anything is submitted',
      'Notarisation and state-level attestation where the document requires it first',
      'Submission to MEA and collection of the apostilled document',
      'Tracking, and a written update at each stage',
      'Return of the original apostilled documents to you by tracked courier',
    ],
    notIncluded: [
      'The MEA apostille charge itself and any state attestation fee, which are government charges',
      'Courier cost where you ask for international delivery',
      'Replacing a document that an issuing authority refuses to attest',
    ],
    youProvide: [
      'The original documents, or clear scans first if you want them checked before you post them',
      'A copy of your passport identity page',
    ],
    turnaround:
      'Submitted to MEA within 3 working days of receiving your originals. MEA itself typically takes 7 to 15 working days, which is outside our control.',
    refund:
      'Refundable in full, less the administrative fee, until the document is submitted to MEA. Once submitted, the fee for that document is not refundable because the work and the government charge have both been spent.',
  },
  {
    slug: 'sworn-translation',
    name: 'Sworn translation',
    fee: '₹2,500 per document, plus GST',
    summary:
      'Certified translation by a sworn translator, in the form German and most European authorities require.',
    included: [
      'Translation by a translator sworn before a court, not a general translator',
      'The translator’s certification, stamp and signature on every page',
      'A check that names, dates and numbers match your original exactly',
      'One round of correction if you spot a transcription error',
      'Digital copy to you, and the certified hard copy where the authority needs one',
    ],
    notIncluded: [
      'Apostille of the translation, where an authority asks for it. That is charged separately',
      'Re-translation because you later supply a different version of the document',
    ],
    youProvide: [
      'A clear, complete scan of the document, including stamps and reverse side',
      'The exact spelling of your name as it appears in your passport',
    ],
    turnaround:
      'Delivered within 5 working days of receiving legible scans. Longer documents are quoted before we start.',
    refund:
      'Refundable in full, less the administrative fee, until the document is sent to the translator. After that it is not refundable, because the translator’s work has been commissioned.',
  },
  {
    slug: 'aps-certificate-support',
    name: 'APS certificate support',
    fee: 'Included in your charter. No separate Axelis fee.',
    summary:
      'We prepare and track your APS application, the academic verification most German routes require.',
    included: [
      'Checking your academic record against APS requirements before you apply',
      'Preparing the application and the document set',
      'Submitting on your behalf and tracking to decision',
      'Responding to APS queries on your file',
    ],
    notIncluded: [
      'The APS fee of approximately ₹18,000, which is paid to APS India directly',
      'Any re-application fee if APS rejects the file for reasons in your academic record',
    ],
    youProvide: [
      'Degree certificates and all semester marksheets',
      'Passport copy and recent photographs to APS specification',
    ],
    turnaround:
      'Application prepared within 5 working days of receiving your complete document set. APS itself takes 8 to 12 weeks, which is outside our control.',
    refund:
      'No Axelis fee is charged, so there is nothing to refund. The APS fee is governed by APS India.',
  },
  {
    slug: 'zab-recognition-report',
    name: 'ZAB recognition report',
    fee: 'Included in your charter. No separate Axelis fee.',
    summary:
      'Formal German recognition of a foreign qualification, where a profession or employer requires it.',
    included: [
      'Assessing whether your qualification needs a ZAB statement at all, before you spend anything',
      'Preparing and submitting the application',
      'Tracking to decision and relaying the outcome in plain terms',
    ],
    notIncluded: [
      'The ZAB assessment fee, which is paid to ZAB directly',
      'Any bridging qualification ZAB may say you need',
    ],
    youProvide: ['Degree certificates, transcripts and their sworn translations'],
    turnaround:
      'Submitted within 5 working days of receiving your complete set. ZAB decision times vary and are outside our control.',
    refund: 'No Axelis fee is charged, so there is nothing to refund.',
  },
  {
    slug: 'visa-filing-tourist-uk',
    name: 'Tourist visa filing, UK',
    fee: '₹10,000 per application, plus GST',
    summary:
      'Your UK visitor visa application prepared and filed in house, from document set to submitted application.',
    included: [
      'An honest read on your profile before you pay anything, including if we think it will be refused',
      'The full document checklist built around your circumstances, not a generic list',
      'Completing the online application form with you',
      'Reviewing your financial evidence and cover letter before submission',
      'Booking your VFS appointment and telling you exactly what to carry',
      'Submission and tracking to decision',
    ],
    notIncluded: [
      'The UK government visa fee and the VFS service charge, which you pay them directly',
      'Any priority or premium service you choose to add at VFS',
      'A second application if the first is refused. That is quoted separately',
    ],
    youProvide: [
      'Passport, travel history and bank statements for the required period',
      'Employment or study proof, and any invitation letter',
    ],
    turnaround:
      'Application ready to submit within 7 working days of receiving your complete documents. UKVI decision times are published by them and are outside our control.',
    refund: `Refundable in full, less the administrative fee, within the ${refundPolicy.coolingOffBusinessDays}-business-day window provided we have not yet submitted the application. Once submitted, the fee is not refundable. A refusal is not a refund event, because the work was performed.`,
  },
  {
    slug: 'student-visa-file-build',
    name: 'Student visa file build',
    fee: 'Included in your charter. No separate Axelis fee.',
    summary:
      'Your full student visa dossier built, checked and rehearsed before it is filed.',
    included: [
      'Complete visa dossier assembled against the mission’s current checklist',
      'Financial documentation review, including blocked account confirmation where required',
      'Appointment booking',
      'Two mock interviews with a counsellor, with written feedback',
      'Submission support and tracking',
    ],
    notIncluded: [
      'Government visa fees and VFS service charges, paid by you directly',
      'The blocked account deposit, which is your own money held in your name',
    ],
    youProvide: [
      'Admission letter, financial proof, academic records and passport',
    ],
    turnaround:
      'Dossier ready within 10 working days of receiving your complete documents and your offer letter.',
    refund:
      'Governed by the charter you signed, not by a separate service fee.',
  },
  {
    slug: 'blocked-account-setup',
    name: 'Blocked account setup',
    fee: 'Included in your charter. No separate Axelis fee.',
    summary:
      'Your Sperrkonto opened and the confirmation letter the mission asks for, obtained.',
    included: [
      'Opening the account with Fintiba, Expatrio or your chosen provider',
      'Coordinating the wire transfer and chasing confirmation',
      'Obtaining the blocking confirmation the mission requires',
    ],
    notIncluded: [
      'The blocked amount itself, €13,092 for 2026. This is your money, held in your name, released to you monthly after you arrive',
      'The provider’s own setup and monthly maintenance fees',
      'Currency conversion and bank transfer charges',
    ],
    youProvide: ['Passport, and the funds to be blocked'],
    turnaround:
      'Account application submitted within 3 working days of your instruction. Provider confirmation usually follows within 5 to 10 working days of funds arriving.',
    refund: 'No Axelis fee is charged, so there is nothing to refund.',
  },
  {
    slug: 'german-a1-a2',
    name: 'German A1 and A2',
    fee: 'From ₹900 per session, 1-on-1, plus GST. Batch rates are lower per student.',
    summary:
      'German taught in house to Goethe-Zertifikat A1 and A2 format, priced per session so you can see what teaching costs.',
    included: [
      'Live one-to-one sessions with a named tutor, not recorded lectures',
      'Goethe exam format practice across reading, listening, writing and speaking',
      'Written progress feedback and homework review',
      'Rescheduling with 24 hours notice at no charge',
    ],
    notIncluded: [
      'Goethe exam fees, paid to Goethe-Institut. A1 ₹9,400 and A2 ₹10,600 as at August 2026',
      'Exam registration, which you book yourself or we assist with separately',
      'Course books, where a specific edition is required',
    ],
    youProvide: ['A working device, headset and a quiet place to attend sessions'],
    turnaround:
      'First session scheduled within 7 working days of payment, subject to a slot you can attend.',
    refund:
      'Unused sessions are refundable at the per-session rate. Sessions already delivered, and sessions missed without 24 hours notice, are not.',
  },
  {
    slug: 'french-a1-a2',
    name: 'French A1 and A2',
    fee: 'From ₹900 per session, 1-on-1, plus GST. Batch rates are lower per student.',
    summary:
      'French taught in house to DELF A1 and A2 format, for France and francophone Europe.',
    included: [
      'Live one-to-one sessions with a named tutor',
      'DELF format practice across all four skills',
      'Written progress feedback and homework review',
      'Rescheduling with 24 hours notice at no charge',
    ],
    notIncluded: [
      'DELF exam fees, paid to the exam centre',
      'Exam registration',
      'Course books, where a specific edition is required',
    ],
    youProvide: ['A working device, headset and a quiet place to attend sessions'],
    turnaround:
      'First session scheduled within 7 working days of payment, subject to a slot you can attend.',
    refund:
      'Unused sessions are refundable at the per-session rate. Sessions already delivered, and sessions missed without 24 hours notice, are not.',
  },
  {
    slug: 'german-b1-b2',
    name: 'German B1 and B2',
    fee: 'Arranged with partner institutes. You pay the institute directly. Axelis charges no placement fee.',
    summary:
      'We place you with a partner institute for B1 and B2 rather than teaching these in house, and we say so plainly.',
    included: [
      'An honest assessment of which institute suits your level, budget and timeline',
      'Introduction and placement with that institute',
      'Coordinating your schedule against your visa or Ausbildung timeline',
    ],
    notIncluded: [
      'The institute’s tuition, which you pay them directly',
      'Goethe or telc exam fees. Goethe B1 ₹18,800 and B2 ₹21,200 as at August 2026',
      'Teaching itself, which the institute delivers and is responsible for',
    ],
    youProvide: ['Evidence of your current level, usually your A2 certificate'],
    turnaround: 'Introduction made within 5 working days of your request.',
    refund:
      'Axelis charges nothing for this, so there is nothing to refund from us. The institute’s own terms govern their fee.',
  },
  {
    slug: 'ielts-pte-toefl',
    name: 'IELTS, PTE and TOEFL preparation',
    fee: 'From ₹4,600 per student, plus GST. Every pack, session count and price is listed on the Test Prep page.',
    summary:
      'Score-targeted English test preparation with in-house tutors, in crash and batch formats.',
    included: [
      'Live sessions with a tutor who has taught the specific exam, not a generalist',
      'A diagnostic before the plan is set, so the pack matches the score you need',
      'Full-length mocks under exam conditions',
      'Line-by-line writing and speaking feedback from a person',
      'Tax invoice issued the same day',
    ],
    notIncluded: [
      'Exam registration, paid to the test provider',
      'Practice portal subscriptions where a pack notes them as extra',
      'A retake of the exam itself',
    ],
    youProvide: ['A working device, headset and a quiet place to attend sessions'],
    turnaround:
      'Diagnostic call scheduled within 24 hours of payment. First session booked within the week.',
    refund:
      'Unused sessions are refundable at the per-session rate of the pack purchased. Sessions already delivered, and sessions missed without 24 hours notice, are not.',
  },
];

export function getServicePromise(slug) {
  return servicePromises.find((s) => s.slug === slug) || null;
}
