// ============================================================================
// AXELIS CERTIFICATION CATALOGUE — v2
// ============================================================================
//
// ⚠️  DRAFT — PENDING SIGN-OFF FROM RISHABH AGRAWAL
//
// DEV_HANDOVER_v2_certifications_website.md points to a companion spec,
// `AXELIS_CERTIFICATION_CATALOGUE_v2.md`, for programme names, fees, syllabi
// and slugs. That file was not found on disk, in Drive, or in Gmail.
//
// Everything below is therefore DERIVED from the two sources that do exist:
//
//   1. DEV_HANDOVER_v2_certifications_website.md
//        - 16 programmes, 4 tiers (Foundation / Core / Advanced / Concierge)
//        - Ticket range ₹4,000 to ₹3,00,000
//        - Average ticket ₹2,00,000, carried by the Concierge tier
//        - Concierge defined as ₹1.5L+, spotlight band quotes ₹2L to ₹3L
//        - EMI: fee/12 for Concierge, fee/6 for Core and Advanced
//
//   2. Bajaj Finserv merchant-EMI outreach (Gmail, 9 Sep 2026), which names
//      the five programme families verbatim:
//        "application coaching, language proficiency (German/French to
//         CEFR B1), Executive MBA application coaching, PhD & Fellowship
//         applications, and our Global Career Launch programme"
//
// WHAT IS DERIVED (needs sign-off): every programme `title`, `slug`,
// `price`, `duration`, `format`, `cohortSize`, `syllabus`, `outcomes` and
// blurb. The tier split (4/5/4/3) and the price ladder are chosen to satisfy
// the handover's constraints exactly, not copied from a source.
//
// WHAT IS AUTHORITATIVE: tier names, programme count, price range, average
// ticket, EMI divisors, the five families, and all financing/compliance copy.
//
// Replace the derived fields once the real catalogue lands. Every page reads
// from this file, so one edit pass updates the whole site.
// ============================================================================

// Bajaj Finserv merchant EMI is NOT live yet — onboarding is in progress.
// The handover says to reserve DOM space and grey out the checkbox until it
// closes. Flip this single constant when the merchant ID lands; every
// Bajaj-dependent string and logo slot reads from it.
export const BAJAJ_EMI_LIVE = false;

export const TIERS = [
  {
    id: 'foundation',
    name: 'Foundation',
    tagline: 'Short, focused, self-paced with live checkpoints.',
    description:
      'Single-skill programmes for students early in the process. Each one ends in a graded submission and a verifiable certificate.',
    accent: 'storm-electric',
  },
  {
    id: 'core',
    name: 'Core',
    tagline: 'Small-cohort coaching on the work that decides your offer.',
    description:
      'Language proficiency and application coaching run as live cohorts, with a named programme lead reviewing your submissions.',
    accent: 'storm-electric',
  },
  {
    id: 'advanced',
    name: 'Advanced',
    tagline: 'Specialist tracks for competitive applications.',
    description:
      'CEFR B1 language intensives and research or executive application coaching, for students targeting selective programmes.',
    accent: 'dawn-glow',
  },
  {
    id: 'concierge',
    name: 'Concierge',
    tagline: 'End-to-end, one counsellor, written outcome guarantee.',
    description:
      'Application, language, visa and first-90-days-abroad support in a single engagement. Capped cohorts. EMI available.',
    accent: 'dawn-glow',
  },
];

// ---------------------------------------------------------------------------
// The 16 programmes.
// `family` maps each one to the five families named in the Bajaj email.
// ---------------------------------------------------------------------------
export const programs = [
  // ---- FOUNDATION -------------------------------------------------------
  {
    slug: 'study-abroad-readiness',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Desk with a laptop, notebook and travel documents mid-planning',
    title: 'Study Abroad Readiness',
    tier: 'foundation',
    family: 'Application coaching',
    price: 4000,
    duration: '2 weeks',
    format: 'Self-paced + 2 live clinics',
    cohortSize: 'Up to 40',
    certificate: 'Axelis Certified — Study Abroad Readiness',
    summary:
      'Work out which country, degree level and budget actually fit you, before you spend money on applications.',
    description:
      'Most students pick a country first and discover the cost afterwards. This programme runs the order in reverse. You map your academic record and budget against real entry requirements across sixteen destination markets, then leave with a written shortlist of three countries you can afford and qualify for.',
    outcomes: [
      'A costed three-country shortlist matched to your marks and budget',
      'An intake calendar with the deadlines that apply to you',
      'A document checklist for your target countries',
    ],
    syllabus: [
      { title: 'Where you actually stand', detail: 'Grade conversion, backlogs, gaps, and how each market reads them.' },
      { title: 'The real cost of a degree', detail: 'Tuition, living, visa funds and part-time earning limits per country.' },
      { title: 'Public versus private routes', detail: 'Tuition-free public Europe against paid-tuition markets.' },
      { title: 'Building the shortlist', detail: 'Reach, match and safety, scored against your own numbers.' },
    ],
  },
  {
    slug: 'sop-and-personal-statement',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'A fountain pen resting on a handwritten page',
    title: 'SOP & Personal Statement Craft',
    tier: 'foundation',
    family: 'Application coaching',
    price: 7500,
    duration: '3 weeks',
    format: 'Live cohort + 2 written reviews',
    cohortSize: 'Up to 25',
    certificate: 'Axelis Certified — Statement of Purpose',
    summary:
      'Write a statement of purpose that survives an admissions reader who has already read four hundred of them.',
    description:
      'You write, we mark it up, you rewrite. Two full line-by-line reviews from a programme lead who has read the receiving end of these documents. The draft you leave with is the one you submit.',
    outcomes: [
      'A submission-ready SOP for one target programme',
      'A reusable structure you can adapt per university',
      'Two rounds of line-by-line written feedback',
    ],
    syllabus: [
      { title: 'What the reader is scanning for', detail: 'Fit, evidence and trajectory in the first paragraph.' },
      { title: 'Evidence over adjectives', detail: 'Replacing claims about yourself with things you did.' },
      { title: 'The programme-fit paragraph', detail: 'Naming modules, faculty and outcomes without padding.' },
      { title: 'Tailoring without rewriting', detail: 'One core draft, five submissions.' },
    ],
  },
  {
    slug: 'university-shortlisting-strategy',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Two people comparing options across a laptop and printed notes',
    title: 'University Shortlisting & Application Strategy',
    tier: 'foundation',
    family: 'Application coaching',
    price: 9500,
    duration: '3 weeks',
    format: 'Live cohort + 1:1 strategy call',
    cohortSize: 'Up to 25',
    certificate: 'Axelis Certified — Application Strategy',
    summary:
      'Build a university list with an honest admit probability against each row, then sequence the applications.',
    description:
      'A shortlist is a spreadsheet with a strategy behind it. You build yours against published entry data, rank it by admit probability and cost, then sequence submissions so the deadlines you care about are not the ones you miss.',
    outcomes: [
      'A ranked 8 to 12 university list with admit-probability notes',
      'A submission calendar working backwards from each deadline',
      'A funding plan per row, including agent scholarships',
    ],
    syllabus: [
      { title: 'Reading entry requirements properly', detail: 'Stated minimums against actual admitted profiles.' },
      { title: 'Scoring the list', detail: 'Reach, match, safety, with cost and visa risk as columns.' },
      { title: 'Sequencing submissions', detail: 'Rolling intakes, hard deadlines, and offer-holding periods.' },
      { title: 'Funding each row', detail: 'Where scholarships exist and who actually gets them.' },
    ],
  },
  {
    slug: 'student-visa-interview-readiness',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Someone signing a document across a desk in an interview setting',
    title: 'Student Visa & Interview Readiness',
    tier: 'foundation',
    family: 'Application coaching',
    price: 12000,
    duration: '4 weeks',
    format: 'Live cohort + 2 recorded mock interviews',
    cohortSize: 'Up to 20',
    certificate: 'Axelis Certified — Visa Readiness',
    summary:
      'Build the visa file and sit two recorded mock interviews before the real one.',
    description:
      'Visa refusals are usually a documentation problem wearing an interview costume. You assemble the financial file to the standard your destination actually applies, then sit two recorded mocks with a counsellor who marks you on the criteria the officer uses.',
    outcomes: [
      'A complete visa document file, checked against your destination',
      'Two recorded mock interviews with written assessment',
      'A financial-evidence pack that matches the stated threshold',
    ],
    syllabus: [
      { title: 'The financial file', detail: 'Blocked accounts, sponsor affidavits, and the paper trail behind them.' },
      { title: 'Genuine-student assessment', detail: 'What the officer is testing and how answers get scored.' },
      { title: 'Mock interview one', detail: 'Recorded, marked, returned with a written assessment.' },
      { title: 'Mock interview two', detail: 'Re-run after corrections, benchmarked against the first.' },
    ],
  },

  // ---- CORE -------------------------------------------------------------
  {
    slug: 'german-a1-a2',
    image: 'https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'The German flag against a clear sky',
    title: 'German A1 to A2 (CEFR)',
    tier: 'core',
    family: 'Language proficiency',
    price: 28000,
    duration: '12 weeks',
    format: 'Live small-group, 3 sessions per week',
    cohortSize: '4 to 6',
    certificate: 'Axelis Certified — German A2 (CEFR-aligned)',
    summary:
      'Reach CEFR A2 German, the level German student-visa files and most public-university applications ask for.',
    description:
      'Three live sessions a week in a group of four to six, with a tutor who teaches to the Goethe assessment format. You sit graded checkpoints at A1 and A2 rather than a single exam at the end, so a weak skill gets caught in week four instead of week twelve.',
    outcomes: [
      'CEFR A2 across reading, writing, listening and speaking',
      'Graded checkpoint reports at A1 and A2',
      'Goethe A2 exam-format preparation and booking guidance',
    ],
    syllabus: [
      { title: 'A1 foundation', detail: 'Cases, present tense, and everyday registers.' },
      { title: 'A1 checkpoint', detail: 'Graded across all four skills, reported in writing.' },
      { title: 'A2 consolidation', detail: 'Past tenses, modal verbs, and connected speech.' },
      { title: 'A2 checkpoint and exam prep', detail: 'Full-format mock under timed conditions.' },
    ],
    relatedNote: 'Also available as pay-per-session coaching on our Test Prep page.',
    relatedHref: '/test-prep',
  },
  {
    slug: 'french-a1-a2',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'The Eiffel Tower over the Seine at dusk',
    title: 'French A1 to A2 (CEFR)',
    tier: 'core',
    family: 'Language proficiency',
    price: 28000,
    duration: '12 weeks',
    format: 'Live small-group, 3 sessions per week',
    cohortSize: '4 to 6',
    certificate: 'Axelis Certified — French A2 (CEFR-aligned)',
    summary:
      'Reach CEFR A2 French, the level Campus France interviews and most public-university applications ask for.',
    description:
      'Three live sessions a week in a group of four to six, taught to the DELF assessment format. Graded checkpoints at A1 and A2 mean a weak skill surfaces early enough to fix.',
    outcomes: [
      'CEFR A2 across reading, writing, listening and speaking',
      'Graded checkpoint reports at A1 and A2',
      'DELF A2 exam-format preparation and booking guidance',
    ],
    syllabus: [
      { title: 'A1 foundation', detail: 'Present tense, gender, and everyday registers.' },
      { title: 'A1 checkpoint', detail: 'Graded across all four skills, reported in writing.' },
      { title: 'A2 consolidation', detail: 'Passé composé, imparfait, and connected speech.' },
      { title: 'A2 checkpoint and exam prep', detail: 'Full-format mock under timed conditions.' },
    ],
    relatedNote: 'Also available as pay-per-session coaching on our Test Prep page.',
    relatedHref: '/test-prep',
  },
  {
    slug: 'application-coaching-undergraduate',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Undergraduate students at desks in a bright classroom',
    title: 'Undergraduate Application Coaching',
    tier: 'core',
    family: 'Application coaching',
    price: 35000,
    duration: '10 weeks',
    format: 'Live cohort + 4 one-to-one reviews',
    cohortSize: 'Up to 15',
    certificate: 'Axelis Certified — Undergraduate Applications',
    summary:
      'Take an undergraduate application from shortlist to submitted across UCAS, Common App or direct European portals.',
    description:
      'Ten weeks that end with submitted applications rather than a folder of drafts. Four one-to-one reviews cover the personal statement, the activity record, the reference strategy and the final portal check before you press send.',
    outcomes: [
      'Submitted applications to your shortlisted universities',
      'A personal statement through four review rounds',
      'A reference and predicted-grade strategy agreed with your school',
    ],
    syllabus: [
      { title: 'Portal mechanics', detail: 'UCAS, Common App and direct European systems compared.' },
      { title: 'The personal statement', detail: 'Drafted, reviewed, rewritten twice.' },
      { title: 'Activities and references', detail: 'Framing what you have; briefing your referees.' },
      { title: 'Submission week', detail: 'Portal-by-portal final check before submission.' },
    ],
  },
  {
    slug: 'application-coaching-postgraduate',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Postgraduate students working together over laptops',
    title: 'Postgraduate Application Coaching',
    tier: 'core',
    family: 'Application coaching',
    price: 42000,
    duration: '12 weeks',
    format: 'Live cohort + 5 one-to-one reviews',
    cohortSize: 'Up to 15',
    certificate: 'Axelis Certified — Postgraduate Applications',
    summary:
      'Take a master’s application from shortlist to submitted, including the academic CV and reference strategy.',
    description:
      'Postgraduate admissions read for fit with a specific research group or professional track, not general merit. Twelve weeks building the SOP, academic CV and reference set that make that fit legible, with five one-to-one reviews and submission support.',
    outcomes: [
      'Submitted applications to your shortlisted programmes',
      'An academic CV in the format your target system expects',
      'A reference strategy with briefing notes for each referee',
    ],
    syllabus: [
      { title: 'Programme fit', detail: 'Reading module lists and faculty research properly.' },
      { title: 'SOP and academic CV', detail: 'Drafted and reviewed against the target system.' },
      { title: 'References', detail: 'Choosing referees and giving them something to write from.' },
      { title: 'Submission and follow-up', detail: 'Portal checks, then handling conditional offers.' },
    ],
  },
  {
    slug: 'scholarship-and-funding-strategy',
    image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'A seedling growing from a jar of coins',
    title: 'Scholarship & Funding Strategy',
    tier: 'core',
    family: 'Application coaching',
    price: 32000,
    duration: '8 weeks',
    format: 'Live cohort + 3 application reviews',
    cohortSize: 'Up to 20',
    certificate: 'Axelis Certified — Scholarship Applications',
    summary:
      'Find the funding you are actually eligible for and submit applications that clear the first-round cut.',
    description:
      'Most scholarship applications fail on eligibility, not merit. You start by filtering to awards you can genuinely win, then build the essays and evidence pack for three of them, each reviewed before submission.',
    outcomes: [
      'A filtered list of awards you are eligible for, with deadlines',
      'Three submitted scholarship applications',
      'An education-loan comparison across our lending partners',
    ],
    syllabus: [
      { title: 'Filtering by eligibility', detail: 'Government, university, and agent scholarships compared.' },
      { title: 'The funding essay', detail: 'What selection panels reward, and what they discard.' },
      { title: 'Evidence packs', detail: 'Income documentation, endorsements, and proof of need.' },
      { title: 'Loans as the backstop', detail: 'Comparing offers across lending partners.' },
    ],
  },

  // ---- ADVANCED ---------------------------------------------------------
  {
    slug: 'german-b1-intensive',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'A traditional German town square in summer',
    title: 'German B1 Intensive (CEFR)',
    tier: 'advanced',
    family: 'Language proficiency',
    price: 85000,
    duration: '20 weeks',
    format: 'Live small-group, 4 sessions per week',
    cohortSize: '3 to 5',
    certificate: 'Axelis Certified — German B1 (CEFR-aligned)',
    summary:
      'Reach CEFR B1 German, the bar for German-taught degrees, Ausbildung routes and most skilled-visa pathways.',
    description:
      'Twenty weeks, four sessions a week, in a group of three to five. B1 is where German stops being a visa checkbox and starts being usable, so the programme is built around production: you speak and write far more than you drill. Ends in a full-format Goethe B1 mock under timed conditions.',
    outcomes: [
      'CEFR B1 across all four skills',
      'Goethe-Zertifikat B1 exam readiness with a timed full mock',
      'Written assessments at A2, mid-B1 and B1',
    ],
    syllabus: [
      { title: 'A2 to B1 bridge', detail: 'Subordinate clauses, Konjunktiv II, and extended writing.' },
      { title: 'Production focus', detail: 'Weekly speaking assessments and written submissions.' },
      { title: 'Academic and workplace German', detail: 'Registers for university and Ausbildung settings.' },
      { title: 'Goethe B1 mock', detail: 'Full format, timed, marked to the published band descriptors.' },
    ],
  },
  {
    slug: 'french-b1-intensive',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'The curved balconies of a classical library',
    title: 'French B1 Intensive (CEFR)',
    tier: 'advanced',
    family: 'Language proficiency',
    price: 85000,
    duration: '20 weeks',
    format: 'Live small-group, 4 sessions per week',
    cohortSize: '3 to 5',
    certificate: 'Axelis Certified — French B1 (CEFR-aligned)',
    summary:
      'Reach CEFR B1 French, the bar for French-taught degrees and the level Campus France interviews test against.',
    description:
      'Twenty weeks, four sessions a week, in a group of three to five, built around production rather than drills. Ends in a full-format DELF B1 mock under timed conditions, marked to the published band descriptors.',
    outcomes: [
      'CEFR B1 across all four skills',
      'DELF B1 exam readiness with a timed full mock',
      'Written assessments at A2, mid-B1 and B1',
    ],
    syllabus: [
      { title: 'A2 to B1 bridge', detail: 'Subjunctive, conditional, and extended argumentative writing.' },
      { title: 'Production focus', detail: 'Weekly speaking assessments and written submissions.' },
      { title: 'Campus France preparation', detail: 'The interview format and how it is scored.' },
      { title: 'DELF B1 mock', detail: 'Full format, timed, marked to the published band descriptors.' },
    ],
  },
  {
    slug: 'executive-mba-application-coaching',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'A working session around a table in a modern office',
    title: 'Executive MBA Application Coaching',
    tier: 'advanced',
    family: 'Executive MBA application coaching',
    price: 125000,
    duration: '16 weeks',
    format: '1:1 coaching, weekly',
    cohortSize: '1:1',
    certificate: 'Axelis Certified — Executive MBA Applications',
    summary:
      'Build an Executive MBA application around your actual career record, for schools that read work history before scores.',
    description:
      'Executive MBA admissions weigh trajectory and impact over test scores. Sixteen weeks of weekly one-to-one work turning your career record into essays, a recommender strategy and interview answers that hold up under questioning from a panel that has run businesses.',
    outcomes: [
      'Submitted applications to your target schools',
      'Essays built on quantified career impact',
      'Two recorded mock interviews with panel-style questioning',
    ],
    syllabus: [
      { title: 'Career audit', detail: 'Quantifying scope, P&L impact, and progression.' },
      { title: 'Essay architecture', detail: 'Goals, gap, and school fit without the boilerplate.' },
      { title: 'Recommender strategy', detail: 'Choosing and briefing recommenders who will write specifics.' },
      { title: 'Interview simulation', detail: 'Two recorded panel-style mocks with written assessment.' },
    ],
  },
  {
    slug: 'phd-research-proposal',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Laboratory glassware arranged on a bench',
    title: 'PhD & Research Proposal Certificate',
    tier: 'advanced',
    family: 'PhD & Fellowship applications',
    price: 110000,
    duration: '16 weeks',
    format: '1:1 supervision, weekly',
    cohortSize: '1:1',
    certificate: 'Axelis Certified — Research Proposal',
    summary:
      'Write a research proposal and supervisor approach that gets a reply from the people you want to work with.',
    description:
      'A PhD application is won or lost on the proposal and the first email to a prospective supervisor. Sixteen weeks of weekly supervision producing a defensible proposal, a literature positioning, and a supervisor outreach sequence that reads as though you have read their work, because you will have.',
    outcomes: [
      'A complete research proposal in your field’s conventions',
      'A shortlist of supervisors with a tailored approach for each',
      'An academic CV and writing sample ready to send',
    ],
    syllabus: [
      { title: 'Finding the gap', detail: 'Positioning against current literature, not around it.' },
      { title: 'Proposal architecture', detail: 'Question, method, feasibility, and contribution.' },
      { title: 'Supervisor outreach', detail: 'Identifying, reading, and approaching the right people.' },
      { title: 'Funding alignment', detail: 'Matching the proposal to available studentships.' },
    ],
  },

  // ---- CONCIERGE --------------------------------------------------------
  {
    slug: 'global-career-launch',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'An aircraft wing above the clouds',
    title: 'Global Career Launch',
    tier: 'concierge',
    family: 'Global Career Launch',
    price: 200000,
    duration: '12 months',
    format: 'One dedicated counsellor, end to end',
    cohortSize: 'Capped at 12 per intake',
    certificate: 'Axelis Certified — Global Career Launch',
    flagship: true,
    summary:
      'Application, language, visa and your first ninety days abroad, run end to end by one counsellor.',
    description:
      'Our flagship programme, and the one the rest of the catalogue is built around. Twelve months with a single named counsellor covering university applications, language certification to the level your destination requires, the visa file, accommodation, and the first ninety days after you land. Written outcome guarantee.',
    outcomes: [
      'Admission to a university on your agreed shortlist',
      'Language certification to your destination’s required level',
      'Visa file, accommodation and arrival logistics handled',
      'Ninety days of post-arrival support after you land',
    ],
    syllabus: [
      { title: 'Months 1 to 2 — strategy', detail: 'Shortlist, budget, funding plan, and language baseline.' },
      { title: 'Months 3 to 6 — applications', detail: 'SOP, CV, references, and submissions across the shortlist.' },
      { title: 'Months 6 to 9 — offers and language', detail: 'Offer negotiation, scholarships, and certification.' },
      { title: 'Months 9 to 12 — visa and landing', detail: 'Visa file, accommodation, departure, first 90 days.' },
    ],
    guarantee:
      'Written outcome guarantee. Terms, including the refund conditions and what counts as a qualifying outcome, are set out in your engagement letter before you pay.',
  },
  {
    slug: 'phd-fellowship-concierge',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Graduates throwing their caps in the air',
    title: 'PhD & Fellowship Concierge',
    tier: 'concierge',
    family: 'PhD & Fellowship applications',
    price: 250000,
    duration: '15 months',
    format: 'One dedicated counsellor + research supervisor',
    cohortSize: 'Capped at 8 per intake',
    certificate: 'Axelis Certified — PhD & Fellowship Concierge',
    summary:
      'Funded-PhD and fellowship applications run end to end, from proposal through supervisor placement to visa.',
    description:
      'Funded doctoral places turn on a proposal a supervisor wants to take on and a funding application that lands in the same cycle. Fifteen months with both a counsellor and a research supervisor covering proposal development, supervisor placement, fellowship applications, and the visa file. Written outcome guarantee.',
    outcomes: [
      'A research proposal developed with an academic supervisor',
      'Supervisor outreach through to a confirmed placement conversation',
      'Fellowship and studentship applications submitted in cycle',
      'Visa file and arrival logistics handled',
    ],
    syllabus: [
      { title: 'Months 1 to 4 — proposal', detail: 'Literature positioning, method, and feasibility.' },
      { title: 'Months 4 to 8 — supervisors', detail: 'Outreach, calls, and refining to their group’s work.' },
      { title: 'Months 8 to 12 — funding', detail: 'Fellowship, studentship and council applications.' },
      { title: 'Months 12 to 15 — visa and landing', detail: 'Offer, visa file, and arrival.' },
    ],
    guarantee:
      'Written outcome guarantee. Terms, including the refund conditions and what counts as a qualifying outcome, are set out in your engagement letter before you pay.',
  },
  {
    slug: 'executive-mba-concierge',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80&auto=format&fit=crop',
    imageAlt: 'Senior colleagues in discussion around a boardroom table',
    title: 'Executive MBA Concierge',
    tier: 'concierge',
    family: 'Executive MBA application coaching',
    price: 300000,
    duration: '15 months',
    format: 'One dedicated counsellor, 1:1 throughout',
    cohortSize: 'Capped at 8 per intake',
    certificate: 'Axelis Certified — Executive MBA Concierge',
    summary:
      'Executive MBA admission run end to end, including financing, relocation and the move itself.',
    description:
      'Our most senior engagement, for candidates applying to top-tier Executive MBA programmes while working. Fifteen months covering school selection, essays, recommenders, interviews, financing and relocation, with one counsellor across the whole thing. Written outcome guarantee.',
    outcomes: [
      'Admission to a school on your agreed shortlist',
      'Essays, recommenders and interviews prepared end to end',
      'Financing structured, including EMI and education loans',
      'Relocation and family logistics coordinated',
    ],
    syllabus: [
      { title: 'Months 1 to 3 — positioning', detail: 'Career audit, school selection, and testing strategy.' },
      { title: 'Months 3 to 8 — applications', detail: 'Essays, recommenders, and round-by-round submission.' },
      { title: 'Months 8 to 12 — interviews and offers', detail: 'Mock panels, offer comparison, and financing.' },
      { title: 'Months 12 to 15 — relocation', detail: 'Visa, housing, and family logistics.' },
    ],
    guarantee:
      'Written outcome guarantee. Terms, including the refund conditions and what counts as a qualifying outcome, are set out in your engagement letter before you pay.',
  },
];

// ---------------------------------------------------------------------------
// Derived values — computed, never hand-maintained.
// ---------------------------------------------------------------------------

// Tailwind scans source statically, so class names must be written out in
// full — `text-[var(--${accent})]` compiles to nothing. Every accent class
// used by the certification pages is spelled out here and looked up by tier.
const ACCENTS = {
  electric: {
    text: 'text-[var(--storm-electric)]',
    badge: 'bg-[var(--storm-electric)]/10 border-[var(--storm-electric)]/30 text-[var(--storm-electric)]',
    step: 'bg-[var(--storm-electric)]/12 border-[var(--storm-electric)]/30 text-[var(--storm-electric)]',
    cardBorder: 'border-white/10 hover:border-[var(--storm-electric)]/50',
    ring: 'focus-visible:ring-[var(--storm-electric)]',
  },
  glow: {
    text: 'text-[var(--dawn-glow)]',
    badge: 'bg-[var(--dawn-glow)]/10 border-[var(--dawn-glow)]/30 text-[var(--dawn-glow)]',
    step: 'bg-[var(--dawn-glow)]/12 border-[var(--dawn-glow)]/30 text-[var(--dawn-glow)]',
    cardBorder: 'border-[var(--dawn-glow)]/35 hover:border-[var(--dawn-glow)]/70',
    ring: 'focus-visible:ring-[var(--dawn-glow)]',
  },
};

/** Accent class set for a tier. Advanced and Concierge run warm, the rest cool. */
export function accentFor(tier) {
  return tier === 'concierge' || tier === 'advanced' ? ACCENTS.glow : ACCENTS.electric;
}

/** EMI tenure per the handover: fee/12 for Concierge, fee/6 for Core & Advanced. */
export function emiTenure(tier) {
  if (tier === 'concierge') return 12;
  if (tier === 'core' || tier === 'advanced') return 6;
  return null; // Foundation tickets are too small to finance.
}

/** Monthly EMI outgo, rounded up to the rupee. Null when the tier has no EMI. */
export function monthlyEmi(program) {
  const tenure = emiTenure(program.tier);
  if (!tenure) return null;
  return Math.ceil(program.price / tenure);
}

/**
 * Tenures offered per tier. The handover offers 3/6/9/12 on Concierge; the
 * shorter tiers stop at 6, which is the divisor its quick-facts spec uses.
 */
export function emiTenures(tier) {
  if (tier === 'concierge') return [3, 6, 9, 12];
  if (tier === 'core' || tier === 'advanced') return [3, 6];
  return [];
}

/**
 * Per-tenure schedule. `monthly` is fee/tenure — the NO-COST figure, true
 * only where interest is genuinely nil. Card EMI through a bank carries the
 * issuer's rate, so the UI labels these as no-cost rather than implying every
 * payment route reaches this number.
 */
export function emiSchedule(program) {
  return emiTenures(program.tier).map((months) => ({
    months,
    monthly: Math.ceil(program.price / months),
  }));
}

/** ₹2,00,000 — Indian digit grouping, no decimals. */
export function formatINR(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function getProgram(slug) {
  return programs.find((p) => p.slug === slug) || null;
}

export function programsByTier(tierId) {
  return programs.filter((p) => p.tier === tierId);
}

export const catalogueStats = {
  programCount: programs.length,
  tierCount: TIERS.length,
  priceFloor: Math.min(...programs.map((p) => p.price)),
  priceCeiling: Math.max(...programs.map((p) => p.price)),
  // Handover: this is a TARGET, never a claim of past enrolment.
  annualLearnerTarget: '5,000 to 10,000',
  averageTicket: 200000,
};

// ---------------------------------------------------------------------------
// Financing copy. Single source of truth so the Bajaj claim stays accurate.
//
// The handover's metrics table splits these correctly — "No-cost EMI on Bajaj
// Finserv + card EMI on Razorpay & Cashfree" — while its §3 financing strip
// flattens both into "no-cost". The table wins: Bajaj is not onboarded yet,
// so claiming live no-cost EMI across all three would be false.
// ---------------------------------------------------------------------------
export const financing = {
  liveCopy:
    'Card EMI on 3, 6, 9 and 12-month tenures through Razorpay and Cashfree, on all major credit cards.',
  bajajPendingCopy:
    'No-cost EMI through the Bajaj Finserv EMI Network is being onboarded and is not live yet.',
  bajajLiveCopy:
    'No-cost EMI on the Bajaj Finserv EMI Network, across 3, 6, 9 and 12-month tenures.',
  get strip() {
    return BAJAJ_EMI_LIVE
      ? `${this.bajajLiveCopy} ${this.liveCopy}`
      : this.liveCopy;
  },
};
