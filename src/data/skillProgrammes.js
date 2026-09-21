/**
 * Skill programmes, structured for lender empanelment.
 *
 * WHY THIS FILE EXISTS, SEPARATELY FROM certificationPrograms.js
 *
 * Bajaj Finserv came back saying study-abroad courses are not on their
 * approved list. That is a category judgement, not a rejection of Axelis: a
 * lender finances a COURSE, which has a syllabus, contact hours, an
 * assessment and a credential, and it declines a SERVICE RETAINER, which has
 * deliverables and a counsellor. AccioJob and AlmaBetter are financed because
 * what they sell is unambiguously the former.
 *
 * The five families below are the ones Axelis already named to Bajaj in the
 * 9 Sep 2026 outreach, verbatim:
 *
 *   "application coaching, language proficiency (German/French to CEFR B1),
 *    Executive MBA application coaching, PhD & Fellowship applications, and
 *    our Global Career Launch programme"
 *
 * Nothing here invents a new product. Each one is the same programme,
 * described by the attributes a credit team actually assesses. Where a field
 * is not yet true, it is marked `verified: false` and it does not render as a
 * claim.
 *
 * THE HONEST POSITION ON ACCREDITATION
 *
 * Axelis certificates are issued by Axelis. They are not a degree, not a
 * qualification under any national framework, and not accredited by DPIIT,
 * the British Council or AIRC, all of which accredit the agency rather than
 * the credential. That is stated on the certificate itself and it must stay
 * stated here. `credentialRoadmap` below is the route to changing that, and
 * until a step is actually complete it is listed as a plan, not a claim.
 */

/** Flip when Bajaj merchant EMI is genuinely live. Mirrors BAJAJ_EMI_LIVE. */
export const LENDER_EMI_LIVE = false;

/**
 * What a lender's credit team checks, and where Axelis stands on each.
 * Anything false is a gap to close before the meeting, not something to hide.
 */
export const EMPANELMENT_CHECKLIST = [
  { item: 'Registered private limited entity', value: 'Axelis Overseas Education Pvt Ltd, CIN U85500CT2023PTC014913', ready: true },
  { item: 'GST registration', value: 'GSTIN 22AAZCA0637P1Z5', ready: true },
  { item: 'Merchant category', value: 'MCC 8299, Educational Services', ready: true },
  { item: 'Published fee per programme', value: 'Every programme priced on its own page, inclusive of GST where applicable', ready: true },
  { item: 'Written cancellation and refund policy', value: 'Effective 15 September 2026, version 1.0, published at a fixed URL', ready: true },
  { item: 'Defined programme duration', value: 'Every programme states weeks, contact hours and cohort size', ready: true },
  { item: 'Published curriculum', value: 'Module-level syllabus on each programme page', ready: true },
  { item: 'Assessment and pass criteria', value: 'Each programme ends in a graded submission against stated criteria', ready: true },
  { item: 'Verifiable credential', value: 'Unique certificate ID, checkable at overseeducation.com/verify', ready: true },
  { item: 'Payment gateway already live', value: 'Cashfree, PCI-DSS, card EMI on 6 to 24 months', ready: true },
  { item: 'Third-party credential alignment', value: 'In progress. See the roadmap below.', ready: false },
];

/**
 * The five families, restated as programmes.
 *
 * `financeable` records WHY each one reads as a course rather than a service,
 * because that sentence is the one a credit officer needs.
 */
export const SKILL_PROGRAMMES = [
  {
    slug: 'language-b1',
    family: 'Language proficiency',
    title: 'German and French to CEFR B1',
    strapline: 'Exam-ready language training benchmarked to an international standard.',
    level: 'A1 to B1, CEFR',
    weeks: 24,
    contactHours: 120,
    mode: 'Live online cohort, twice weekly, plus graded homework',
    cohortSize: 'Capped at 15',
    assessment: 'Continuous graded assignments, a mock at each CEFR level, and a final assessment mapped to Goethe-Zertifikat B1 or DELF B1 task types.',
    outcome: 'A CEFR B1 level of German or French, which is the level most German and French public universities require for a taught degree.',
    credential: 'Axelis Certificate of Completion, with the CEFR level assessed against stated criteria',
    external: 'Students sit the Goethe-Institut or Alliance Française examination independently. Axelis prepares for it and does not issue it.',
    financeable:
      'The clearest case of the five. CEFR is an international framework, the syllabus is fixed, contact hours are countable, and the assessment maps to a third-party examination. This is a language course by any definition a lender uses.',
    priority: 1,
  },
  {
    slug: 'application-coaching',
    family: 'Application coaching',
    title: 'University Application Craft',
    strapline: 'The writing and evidence that decides a competitive application.',
    level: 'Undergraduate and postgraduate applicants',
    weeks: 10,
    contactHours: 40,
    mode: 'Live online cohort with one-to-one submission review',
    cohortSize: 'Capped at 12',
    assessment: 'A complete application portfolio: statement of purpose, academic CV and two drafted recommendation briefs, each marked against a published rubric.',
    outcome: 'A finished, reviewed application portfolio the student can submit, and the skill to write the next one alone.',
    credential: 'Axelis Certificate of Completion, awarded on portfolio assessment',
    external: null,
    financeable:
      'Taught as a writing and research skills course with a marked portfolio, not as an application-handling service. The student writes the work; it is assessed against a published rubric.',
    priority: 2,
  },
  {
    slug: 'executive-mba-applications',
    family: 'Executive MBA application coaching',
    title: 'Executive MBA Application Intensive',
    strapline: 'For working professionals applying to selective MBA programmes.',
    level: 'Mid-career, typically 5 to 15 years of experience',
    weeks: 12,
    contactHours: 48,
    mode: 'Live online cohort, evenings, plus recorded review',
    cohortSize: 'Capped at 10',
    assessment: 'A submitted application set with essays, a career-narrative brief and a recorded mock admissions interview, each marked against a published rubric.',
    outcome: 'A complete application set for selective MBA programmes, and interview technique practised under assessment.',
    credential: 'Axelis Certificate of Completion, awarded on assessment',
    external: null,
    financeable:
      'Fixed duration, evening cohort, assessed deliverables, and a professional-development audience. Structurally the closest of the five to what AccioJob and AlmaBetter already finance.',
    priority: 3,
  },
  {
    slug: 'phd-fellowship-applications',
    family: 'PhD & Fellowship applications',
    title: 'Research Proposal and Fellowship Applications',
    strapline: 'Research writing, supervisor outreach and funded-place applications.',
    level: 'Master’s graduates and early researchers',
    weeks: 16,
    contactHours: 56,
    mode: 'Live online cohort with supervised research-writing sessions',
    cohortSize: 'Capped at 10',
    assessment: 'A full research proposal, a literature positioning note and a supervisor outreach portfolio, marked against academic criteria.',
    outcome: 'A submittable research proposal and a funding application set for DAAD, Erasmus Mundus, Chevening, Fulbright-Nehru or Vanier.',
    credential: 'Axelis Certificate of Completion, awarded on proposal assessment',
    external: null,
    financeable:
      'Academic research-writing training with a substantial assessed output. The proposal is the student’s own work, produced under supervision.',
    priority: 4,
  },
  {
    slug: 'global-career-launch',
    family: 'Global Career Launch',
    title: 'Global Career Launch',
    strapline: 'The full programme, application through to the first ninety days abroad.',
    level: 'Students committed to a specific intake',
    weeks: 52,
    contactHours: 180,
    mode: 'Blended: taught modules, cohort sessions and a named programme lead',
    cohortSize: 'Capped at 12 per intake',
    assessment: 'Module assessments across language, application craft, financial planning and relocation readiness, plus a final readiness review.',
    outcome: 'A placed student with the language level, application portfolio, financial plan and relocation preparation the destination requires.',
    credential: 'Axelis Certificate of Completion, awarded on module assessment',
    external: null,
    financeable:
      'The longest and highest-value programme, and therefore the one most likely to be examined closely. It is presented as a taught programme with module assessment, and the counselling that accompanies it is stated as a support wrapper rather than as the product.',
    priority: 5,
  },
];

/**
 * The route to a credential that is not simply self-issued.
 *
 * NOTHING HERE IS CLAIMED AS HELD. Each step carries its real status. This is
 * the section to take into the Bajaj meeting, because "we are three months
 * from an NSQF-aligned credential" is a far stronger answer than silence, and
 * it is one a credit team can diligence.
 */
export const CREDENTIAL_ROADMAP = [
  {
    step: 'ISO 21001:2018, Educational Organisations Management System',
    what: 'A management-system standard specific to education providers. It certifies how the organisation runs its teaching, assessment and learner support, not the content of any one course.',
    why: 'Fastest credible third-party mark for a training provider, and it speaks directly to the questions a credit team asks about delivery and refunds.',
    status: 'Not started',
    verified: false,
  },
  {
    step: 'NSDC partnership and NSQF-aligned certification',
    what: 'Affiliation with the National Skill Development Corporation, delivering against a Qualification Pack and National Occupational Standards, with co-branded certification.',
    why: 'The credential most Indian lenders recognise without explanation, and the one that moves a course from self-issued to nationally framed.',
    status: 'To be scoped. Requires identifying a QP that genuinely fits these programmes rather than forcing a mapping.',
    verified: false,
  },
  {
    step: 'Sector Skill Council alignment',
    what: 'Affiliation with the relevant council for education and professional services, mapping each programme to a published occupational standard.',
    why: 'Provides the QP that NSDC certification is delivered against.',
    status: 'To be scoped',
    verified: false,
  },
  {
    step: 'Goethe-Institut or Alliance Française examination-preparation alignment',
    what: 'Formal recognition as a preparation provider for the B1 examinations the language programme already targets.',
    why: 'The language programme is the strongest candidate for external alignment because it already maps to a published international framework.',
    status: 'To be scoped',
    verified: false,
  },
];

/** Every figure a credit team will ask for, in one place. */
export const LENDER_FACTS = {
  entity: 'Axelis Overseas Education Pvt Ltd',
  cin: 'U85500CT2023PTC014913',
  gstin: '22AAZCA0637P1Z5',
  mcc: '8299, Educational Services',
  gateway: 'Cashfree, PCI-DSS compliant',
  emiTenures: [6, 9, 12, 18, 24],
  refundPolicyHref: '/policies/cancellation-refund',
  refundEffective: '15 September 2026',
  verifyHref: '/verify',
  offices: 'Bengaluru and Bilaspur',
};
