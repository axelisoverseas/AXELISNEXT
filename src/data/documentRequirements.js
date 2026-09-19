// ---------------------------------------------------------------------------
// DOCUMENT REQUIREMENTS — what a candidate must upload, per service
// ---------------------------------------------------------------------------
//
// Shared by the upload form, the guidance shown next to it, and the Slack
// message that reaches operations. One list, so what we ask for, what we
// validate and what the ops team is told to expect cannot disagree.
//
// Only services that genuinely need documents appear here. Language and test
// preparation do not, so they have no entry and render no uploader.
//
// SIZE LIMITS: the API route runs as a serverless function, which caps the
// request body at 4.5 MB. That is a platform limit, not a preference, so the
// form enforces it client side and says so plainly rather than letting an
// upload fail after the wait. A candidate with heavier scans submits twice;
// each submission posts its own Slack message and both carry the same
// payment reference.
// ---------------------------------------------------------------------------

export const UPLOAD_LIMITS = {
  maxFiles: 12,
  maxFileBytes: 4 * 1024 * 1024,
  maxTotalBytes: 4.2 * 1024 * 1024,
  accept: ['application/pdf', 'image/jpeg', 'image/png', 'image/heic'],
  acceptLabel: 'PDF, JPG, PNG or HEIC',
};

/** Advice that applies to every upload. Shown once, above the file picker. */
export const uploadGuidance = [
  'Scan or photograph the whole page, including stamps, seals and anything printed on the reverse.',
  'Make sure every word is legible at full zoom. A blurred marksheet is the single most common reason a file is sent back.',
  'Name each file so we can tell what it is, for example "10th-marksheet.pdf" rather than "IMG_4821.jpg".',
  'Scan at around 150 to 200 DPI. Higher resolution makes the file large without making it more readable.',
  'Do not password-protect the files. We cannot open them, and it delays your application.',
];

export const documentRequirements = {
  'mea-apostille': {
    service: 'MEA apostille',
    intro:
      'Upload every document you want apostilled. We check each one is in a form MEA will accept before anything is submitted.',
    required: [
      'The original document, scanned in full colour',
      'Your passport identity page',
    ],
    conditional: [
      'Notarised copy, if the document has already been notarised',
      'Marriage certificate or gazette notification, if your name differs across documents',
    ],
    note:
      'Post the physical originals only after we confirm the scans. MEA apostilles the original document, not a copy, but we check first so nothing travels needlessly.',
  },
  'sworn-translation': {
    service: 'Sworn translation',
    intro:
      'Upload the documents to be translated. The translator works from these scans, so legibility decides the quality of the output.',
    required: [
      'The document to be translated, complete and in full colour',
      'Your passport identity page, so names are transliterated exactly as they appear there',
    ],
    conditional: [
      'Any existing translation, if you want consistency with a document already submitted somewhere',
    ],
    note:
      'Tell us the exact spelling of your name as printed in your passport. German authorities reject translations where the spelling differs from the passport, even by one letter.',
  },
  'aps-certificate-support': {
    service: 'APS certificate support',
    intro: 'APS verifies your academic record, so the academic set must be complete.',
    required: [
      'Degree certificate, or provisional certificate if the degree is not yet issued',
      'All semester or year marksheets, with none missing',
      'Class 10 and Class 12 certificates and marksheets',
      'Passport identity page',
      'Recent passport-size photograph on a white background',
    ],
    conditional: [
      'Migration certificate, if your university issues one',
      'Medium of instruction certificate, where available',
    ],
    note:
      'A missing semester marksheet is the most common cause of APS delay. Check the count before you submit: six semesters means six marksheets.',
  },
  'zab-recognition-report': {
    service: 'ZAB recognition report',
    intro: 'ZAB compares your qualification against the German equivalent.',
    required: [
      'Degree certificate',
      'Complete transcript of records',
      'Sworn translations of both, if they are not already in German or English',
      'Passport identity page',
    ],
    conditional: ['Professional licence or registration, where your trade requires one'],
    note:
      'If the sworn translations are not ready, upload the originals now and send the translations when they arrive. We will hold the file rather than submit it incomplete.',
  },
  'visa-filing-tourist-uk': {
    service: 'Tourist visa filing, UK',
    intro:
      'The financial evidence decides most visitor visa outcomes. Send the full statement period, not a summary.',
    required: [
      'Passport, all pages with stamps or visas, plus the identity page',
      'Bank statements for the last 6 months, stamped by the bank',
      'Employment letter or business proof, showing your role and salary',
      'Income tax returns for the last 2 years',
      'Your travel itinerary and accommodation booking, if made',
    ],
    conditional: [
      'Invitation letter and the host’s status documents, if you are visiting someone',
      'Leave approval letter from your employer',
      'Previous UK or Schengen visas, if held',
    ],
    note:
      'Bank statements must show the running balance and be continuous. A statement with gaps, or a screenshot from an app, is usually refused as evidence.',
  },
  'student-visa-file-build': {
    service: 'Student visa file build',
    intro: 'Your full student visa dossier is assembled from these.',
    required: [
      'Admission or offer letter from the university',
      'Passport identity page',
      'Academic certificates and transcripts',
      'Language test result, IELTS, PTE, TOEFL or Goethe as applicable',
      'Financial proof, bank statements or loan sanction letter',
    ],
    conditional: [
      'Blocked account confirmation, for Germany',
      'Scholarship letter, if you hold one',
      'Sponsor documents and their relationship proof, if funded by someone else',
    ],
    note:
      'Send the loan sanction letter rather than the application. Missions want evidence of funds available, not funds applied for.',
  },
  'blocked-account-setup': {
    service: 'Blocked account setup',
    intro: 'The provider needs these to open your Sperrkonto.',
    required: [
      'Passport identity page, valid for the full period of study',
      'Admission or offer letter',
    ],
    conditional: ['Visa appointment confirmation, if already booked'],
    note:
      'The blocked amount itself stays yours. It is held in your name and released to you monthly after you arrive in Germany.',
  },
};

export function getDocumentRequirement(key) {
  return documentRequirements[key] || null;
}

/** True when a service needs documents and should render an uploader. */
export function needsDocuments(key) {
  return Boolean(documentRequirements[key]);
}
