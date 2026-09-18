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
  // `disclosure` renders on the checkout form before payment. The EPC Success
  // Fee is a further ₹1,80,000 liability; a student who pays ₹19,999 without
  // being told that has a clean unfair-trade-practice claim under the
  // Consumer Protection Act 2019. It must be on the surface that takes money,
  // not only in the charter they receive afterwards.
  'global-admissions-charter': {
    amount: 9999, url: null, label: 'Global Admissions Charter (GAC)',
    disclosure: 'This ₹9,999 is refunded in full once your visa is granted, you have arrived, and you have paid your university tuition in full. See Section 4A of the Global Admissions Charter. GAC carries no other Axelis fee.',
  },
  'europe-public-charter': {
    amount: 19999, url: null, label: 'Europe Public Charter (EPC)',
    disclosure: 'EPC is a two-part fee. This ₹19,999 Service Fee is payable now. A Success Fee of ₹1,80,000 becomes payable only if and when you accept an offer from a tuition-free public university. Total ₹1,99,999. No offer, or an offer you decline, means no Success Fee.',
  },

  // --- Certification programmes (/certifications) -------------------------
  'global-career-launch': { amount: 200000, url: null, label: 'Global Career Launch' },
  'phd-fellowship-concierge': { amount: 250000, url: null, label: 'PhD & Fellowship Concierge' },
  'executive-mba-concierge': { amount: 300000, url: null, label: 'Executive MBA Concierge' },

  // --- Visa filing ---------------------------------------------------------
  // Sold on both sides. This is the same service and the same price as
  // `visa-filing-tourist-uk` in the B2B map on axelisoverseas.com; if one
  // moves, move both. Filed in-house by Axelis.
  'visa-filing-tourist-uk': { amount: 10000, url: null, label: 'Tourist visa filing (UK)' },
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
