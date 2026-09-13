// ---------------------------------------------------------------------------
// CERTIFICATE REGISTER
// ---------------------------------------------------------------------------
//
// The site has claimed since launch that "every certificate carries a unique ID
// that anyone can check against our register" — on the trust band, on every
// programme page, and now in the Terms of Service and Delivery Policy. Until
// this file existed there was no register, so the claim failed the moment
// anyone tested it. A checkable claim that fails when checked is worse than no
// claim at all, particularly in front of a lender.
//
// This is the register. It is deliberately a flat file rather than a database:
// no certificates have been issued yet, and a file that one person can append
// to correctly beats a schema nobody maintains.
//
// WHEN YOU ISSUE A REAL CERTIFICATE, append an entry here. `id` is what the
// student types into /verify. Never reuse an id, and never delete an entry —
// revoke it instead, so a revoked certificate reports as revoked rather than
// as "not found", which is indistinguishable from a typo.
// ---------------------------------------------------------------------------

/** Certificate ID format: AXL-<programme code>-<year>-<serial>. */
export const CERTIFICATE_ID_PATTERN = /^AXL-[A-Z0-9]{3,6}-\d{4}-[A-Z0-9]{4}$/;

export const SPECIMEN_ID = 'AXL-SPEC-0000-DEMO';

/**
 * Every certificate Axelis has issued, plus one specimen.
 *
 * status: 'valid' | 'revoked' | 'specimen'
 */
export const certificateRegister = [
  {
    id: SPECIMEN_ID,
    status: 'specimen',
    holder: 'Specimen — not issued to a student',
    programme: 'Global Career Launch',
    certificate: 'Axelis Certified — Global Career Launch',
    issued: null,
    note:
      'This entry exists so the specimen certificate published on this page resolves. It is not a record of any student and confers nothing.',
  },
];

/** Case-insensitive, whitespace-tolerant lookup. Returns null when unknown. */
export function lookupCertificate(rawId) {
  if (typeof rawId !== 'string') return null;
  const id = rawId.trim().toUpperCase();
  if (!id) return null;
  return certificateRegister.find((c) => c.id.toUpperCase() === id) || null;
}

/** True when the string is shaped like an Axelis ID, whether or not it exists. */
export function isWellFormedId(rawId) {
  return typeof rawId === 'string' && CERTIFICATE_ID_PATTERN.test(rawId.trim().toUpperCase());
}

export const registerStats = {
  /** Specimens are not issued certificates and must not be counted as such. */
  issuedCount: certificateRegister.filter((c) => c.status !== 'specimen').length,
};
