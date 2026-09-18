// ---------------------------------------------------------------------------
// CASHFREE PAYMENT LINKS — D2C (overseeducation.com)
// ---------------------------------------------------------------------------
//
// Cashfree payment links ARE hosted payment pages. We do not build a checkout
// form, take an order-creation API or run a webhook: doing any of that would
// re-implement what Cashfree already hosts, and would pull card data into our
// own pages for no gain. One map, and the existing CTAs point at it.
//
// TO GO LIVE: mint the link in the Cashfree dashboard for the exact amount
// below, then paste its URL into `url`. Nothing else changes. Until a `url`
// is set the product falls back to the enquiry form, so a half-configured
// catalogue never shows a dead checkout button.
//
// Amounts are duplicated here deliberately — they are what you must key into
// the dashboard, and `assertAmountsMatchCatalogue()` below fails loudly if
// this file and the catalogue ever disagree.
// ---------------------------------------------------------------------------

/** slug -> { amount (paise-free INR), url }. url stays null until minted. */
export const cashfreeLinks = {
  // --- Student Plans (/products) ------------------------------------------
  'global-admissions-charter': { amount: 9999, url: null, label: 'Global Admissions Charter (GAC)' },
  'europe-public-charter': { amount: 19999, url: null, label: 'Europe Public Charter (EPC)' },

  // --- Certification programmes (/certifications) -------------------------
  'global-career-launch': { amount: 200000, url: null, label: 'Global Career Launch' },
  'phd-fellowship-concierge': { amount: 250000, url: null, label: 'PhD & Fellowship Concierge' },
  'executive-mba-concierge': { amount: 300000, url: null, label: 'Executive MBA Concierge' },
};

/** The hosted link for a product, or null when it has not been minted yet. */
export function payLink(slug) {
  return cashfreeLinks[slug]?.url || null;
}

/**
 * Guards the one failure mode that actually costs money: this file and the
 * catalogue disagreeing, so a student is charged an amount the page never
 * quoted. Called from the certifications data module at import time.
 */
export function assertAmountsMatchCatalogue(programs) {
  const mismatches = programs
    .filter((p) => cashfreeLinks[p.slug] && cashfreeLinks[p.slug].amount !== p.price)
    .map((p) => `${p.slug}: catalogue ₹${p.price} vs cashfreeLinks ₹${cashfreeLinks[p.slug].amount}`);

  if (mismatches.length) {
    throw new Error(
      `Cashfree link amounts disagree with the catalogue:\n  ${mismatches.join('\n  ')}`,
    );
  }
  return true;
}
