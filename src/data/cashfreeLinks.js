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
  'global-career-launch': { url: 'https://payments.cashfree.com/forms/axelis-global-career-launch', amount: 200000, label: 'Global Career Launch' },
  'phd-fellowship-concierge': { url: 'https://payments.cashfree.com/forms/axelis-phd-fellowship-concierge', amount: 250000, label: 'PhD & Fellowship Concierge' },
  'executive-mba-concierge': { url: 'https://payments.cashfree.com/forms/axelis-executive-mba-concierge', amount: 300000, label: 'Executive MBA Concierge' },

  // --- Student services (/services) ----------------------------------------
  // Apostille and translation are priced PER DOCUMENT. There is no honest
  // fixed-amount hosted form for them: a candidate needing six documents and
  // one needing one document owe different totals, and a single-price form
  // would overcharge the first or undercharge us on the second. The page
  // therefore computes the exact total from a document count and hands it to
  // a counsellor, which is how these are already sold in practice.
  'mea-apostille': {
    amount: 1500, url: null, perUnit: true, unit: 'document', label: 'MEA apostille',
  },
  'sworn-translation': {
    amount: 2500, url: null, perUnit: true, unit: 'document', label: 'Sworn translation',
  },

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

// ---------------------------------------------------------------------------
// RAZORPAY -> CASHFREE MIGRATION
// ---------------------------------------------------------------------------
//
// Razorpay currently carries 21 live payment surfaces: 19 Test Prep packs and
// the two student plans. Cashfree is to replace them.
//
// The order matters. Pulling Razorpay before the Cashfree form exists would
// leave a priced card with no way to pay it, which costs real enrolments. So
// both rails run side by side, and Razorpay is withdrawn per item, only once
// that item has a Cashfree form. `payRails()` below enforces that: it will not
// return an item with no rail at all, whatever the flags say.
//
// TO FINISH THE MIGRATION: paste each minted form URL into the maps below.
// When every value is filled, set SHOW_RAZORPAY to false and Razorpay
// disappears everywhere in one edit.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// GST ON HOSTED FORMS
// ---------------------------------------------------------------------------
//
// Ruling: Test Prep charges 18% GST on top of the listed price. That matches
// what /test-prep already tells the buyer ("GST applicable as per Indian tax
// law"), so a form that adds 18% is consistent with the page.
//
// It is NOT applied to the other surfaces, because their pages say the
// opposite and the page is the offer:
//
//   /services      states in its promise block, "Every price here is what you
//                  pay Axelis. Nothing else is added later." Adding 18% at
//                  checkout would contradict a written promise on the same
//                  screen.
//   /certifications  quotes Rs 2,00,000 to Rs 3,00,000 with no mention of tax,
//                  so the figure reads as final. The three live forms collect
//                  exactly that.
//
// To charge GST on those too, the page copy has to change first. Change the
// copy, then the forms, in that order.
export const GST_RATE_TEST_PREP = 18;

/** Set false once every item below has a Cashfree form. */
export const SHOW_RAZORPAY = true;

/** Test Prep packs, keyed by the pack code shown on /test-prep. */
export const cashfreeTestPrepForms = {
  'BL-103': null, // IELTS 1-on-1 Crash        ₹6,000
  'BL-101': null, // IELTS Couple Batch        ₹5,300
  'BL-102': null, // IELTS Batch of 3          ₹6,000
  'BL-106': null, // PTE 1-on-1 Crash          ₹5,300
  'BL-104': null, // PTE Couple Batch          ₹4,600
  'BL-105': null, // PTE Batch of 3            ₹5,300
  'BL-110': null, // TOEFL 1-on-1              ₹625 per session
  'BL-201': null, // SAT 1-on-1                ₹760 per session
  'BL-202': null, // SAT Batch of 2            ₹1,175 per session
  'BL-203': null, // SAT Batch of 3            ₹1,600 per session
  'BL-109': null, // Spoken English 1-on-1     ₹460 per session
  'BL-108': null, // Spoken English Batch of 2 ₹620 per session
  'BL-107': null, // Spoken English Batch of 3 ₹920 per session
  'FR-1': null,   // French DELF 1-on-1        ₹900 per session
  'FR-2': null,   // French DELF Batch of 2    ₹1,300 per session
  'FR-3': null,   // French DELF Batch of 3    ₹1,725 per session
  'DE-1': null,   // German Goethe 1-on-1      ₹900 per session
  'DE-2': null,   // German Goethe Batch of 2  ₹1,300 per session
  'DE-3': null,   // German Goethe Batch of 3  ₹1,725 per session
};

/**
 * Which rails to show for one item.
 *
 * Razorpay is hidden only when Cashfree can actually take the payment. That
 * invariant is the point of this function: flipping SHOW_RAZORPAY can never
 * strand an item with no way to pay.
 */
export function payRails({ razorpayUrl = null, cashfreeUrl = null }) {
  const cashfree = cashfreeUrl || null;
  const razorpay = razorpayUrl || null;
  const showRazorpay = razorpay && (SHOW_RAZORPAY || !cashfree);
  return {
    cashfree,
    razorpay: showRazorpay ? razorpay : null,
    count: (cashfree ? 1 : 0) + (showRazorpay ? 1 : 0),
  };
}
