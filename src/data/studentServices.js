// ---------------------------------------------------------------------------
// STUDENT SERVICES — sold on their own, not only inside a charter
// ---------------------------------------------------------------------------
//
// These run inside GAC, EPC, Ausbildung and Chancenkarte, and they are also
// sold singly to anyone who needs one piece. Every price here is the price a
// student actually pays Axelis. Where a government or third party charges on
// top, that is stated rather than folded in, because a fee that appears only
// after payment is how a service becomes a complaint.
// ---------------------------------------------------------------------------

export const serviceGroups = [
  {
    id: 'documents',
    title: 'Documents and legalisation',
    intro:
      'Everything a foreign university, employer or mission needs before they will look at your file.',
    services: [
      {
        name: 'MEA apostille',
        price: '₹1,500',
        per: 'per document',
        body:
          'Ministry of External Affairs apostille on degree certificates, marksheets, birth certificates and police clearance. Most candidates need four to eight documents.',
        thirdParty: null,
      },
      {
        name: 'Sworn translation',
        price: '₹2,500',
        per: 'per document',
        body:
          'Certified translation by a sworn translator. German and most European authorities will not accept anything else.',
        thirdParty: null,
      },
      {
        name: 'APS certificate support',
        price: 'Included in your charter',
        per: null,
        body:
          'Academic credential verification, mandatory for most German routes. We prepare and track the application.',
        thirdParty: 'APS India charges approximately ₹18,000 directly. Takes 8 to 12 weeks.',
      },
      {
        name: 'ZAB recognition report',
        price: 'Included in your charter',
        per: null,
        body:
          'Formal German recognition of a foreign qualification, where a profession or employer requires it.',
        thirdParty: 'ZAB charges its own assessment fee directly.',
      },
    ],
  },
  {
    id: 'visa',
    title: 'Visa and travel',
    intro: 'Filing, preparation and the practical parts of actually getting there.',
    services: [
      {
        name: 'Tourist visa filing, UK',
        price: '₹10,000',
        per: 'per application',
        body:
          'Filed in house. Document set, application completion, appointment booking and submission.',
        thirdParty: 'UK government visa fee and VFS charges are billed by them directly.',
      },
      {
        name: 'Student visa file build',
        price: 'Included in your charter',
        per: null,
        body:
          'Full visa dossier, financial documentation, appointment booking and two mock interviews with a counsellor.',
        thirdParty: 'Government visa fees and VFS service charges are paid directly by you.',
      },
      {
        name: 'Blocked account setup',
        price: 'Included in your charter',
        per: null,
        body:
          'Sperrkonto opened through Fintiba or Expatrio, wire coordination, and the confirmation letter the mission asks for.',
        thirdParty:
          'The blocked amount itself is your money, held in your name and released to you monthly after arrival. €13,092 for 2026.',
      },
    ],
  },
  {
    id: 'language',
    title: 'Language and test preparation',
    intro:
      'Taught in house and priced per session. Never bundled into a programme fee, so you can see what teaching actually costs.',
    services: [
      {
        name: 'German A1 and A2',
        price: 'From ₹900',
        per: 'per session, 1-on-1',
        body:
          'Goethe-Zertifikat format. Required for German student visas and for Ausbildung tracks. Batch rates are lower per student.',
        thirdParty:
          'Goethe exam fees are paid to Goethe-Institut: A1 ₹9,400, A2 ₹10,600, as at August 2026.',
      },
      {
        name: 'French A1 and A2',
        price: 'From ₹900',
        per: 'per session, 1-on-1',
        body: 'DELF format, for France and francophone Europe. Batch rates are lower per student.',
        thirdParty: 'DELF exam fees are paid to the exam centre.',
      },
      {
        name: 'German B1 and B2',
        price: 'Arranged with partner institutes',
        per: null,
        body:
          'Required for Ausbildung, and B2 for nursing. We arrange placement with a partner institute rather than teaching these in house, and you pay the institute directly.',
        thirdParty:
          'Goethe exam fees: B1 ₹18,800, B2 ₹21,200. telc is also accepted for Ausbildung.',
      },
      {
        name: 'IELTS, PTE and TOEFL',
        price: 'From ₹4,600',
        per: 'per student',
        body:
          'Crash and batch formats. See the Test Prep page for every pack, session count and price.',
        thirdParty: 'Exam registration is paid to the test provider.',
      },
    ],
  },
];

/** Stated once, prominently, rather than buried per service. */
export const servicesPromise = [
  'Every price here is what you pay Axelis. Nothing else is added later.',
  'Where a government, university or exam body charges you separately, we say so on the service itself.',
  'Axelis does not take a margin on third-party fees. You pay them directly wherever we can arrange it that way.',
  'If a service will not help your case, we will tell you before you buy it.',
];
