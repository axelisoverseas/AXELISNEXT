// ============================================================================
// CANCELLATION & REFUND POLICY — published text
// ============================================================================
//
// Source: CANCELLATION_REFUND_POLICY_DEV_HANDOVER.md (11 Sep 2026), which is
// marked "verbatim — this is what goes on the site". Every departure from that
// file below was ruled by Rishabh Agrawal on 11 Sep 2026 and is marked
// [RULING n] so a reviewer can trace it:
//
//   [RULING 1] Bajaj Finserv is not onboarded. It is removed from Section 2,
//              Section 6 and the Section 8 worked example. The example's
//              arithmetic is unchanged; only the partner name is generalised.
//   [RULING 4] src/data/certificationPrograms.js is the canonical catalogue.
//              Section 1 lists those 16 programmes. Section 3's amounts follow.
//              No bundles exist yet, so bundle language is dropped from 1 and 3.
//              "Global Scholar Concierge" exists only in the policy, so its
//              Section 7 guarantee is NOT published — see TODO_FROM_FOUNDER.md.
//   [RULING 6] support@overseeducation.com does not exist yet. Sections 6 and
//              12 use axelisoverseas@overseeducation.com until it does.
//
// The protected numbers (7-business-day window, ₹2,500 fee, guarantee
// percentages, 48-hour / 5-day / 2-day / 7–10-day SLAs) are untouched and
// also live in `refundPolicy` in certificationPrograms.js so every surface
// agrees. Change them in one place, with sign-off.
// ============================================================================

import { programs, TIERS, refundPolicy } from './certificationPrograms';

const titlesFor = (tierId) => programs.filter((p) => p.tier === tierId).map((p) => p.title);

export const policyMeta = {
  title: 'Cancellation & Refund Policy',
  company: 'Axelis Overseas Education Pvt Ltd',
  registration: 'CIN U85500CT2023PTC014913 · MCC 8299 (Educational Services)',
  effectiveFrom: refundPolicy.effectiveFrom,
  version: refundPolicy.version,
};

export const policySections = [
  {
    id: 'programme-details',
    number: 1,
    title: 'Programme details and scope',
    blocks: [
      { p: 'This policy applies to every certification programme offered by Axelis Overseas Education Pvt Ltd on overseeducation.com:' },
      {
        list: TIERS.map((t) => `${t.name}-tier programmes (${titlesFor(t.id).join(', ')})`),
      },
      { p: 'Programme fees range from ₹4,000 to ₹3,00,000. Each programme carries a dedicated page on overseeducation.com/certifications with its own fee, duration, syllabus, and outcome deliverables.' },
    ],
  },
  {
    id: 'emi-eligibility',
    number: 2,
    title: 'EMI eligibility',
    blocks: [
      { p: 'All programmes priced ₹10,000 and above are eligible for EMI on the checkout page. Tenure range: minimum 6 months, maximum 24 months. EMI is provided by our financing partners:' },
      {
        list: [
          'Razorpay EMI — Credit-card EMI across all major issuers, 6 / 9 / 12 / 18 / 24-month tenures where the card issuer supports it.',
          'Cashfree EMI — Credit-card EMI and Cardless EMI, 6 / 9 / 12 / 18 / 24-month tenures where the card issuer supports it.',
        ],
      },
      { p: 'Additional financing partners will be listed as they onboard.' },
      { p: 'The financing partner’s approval terms apply. Axelis does not underwrite the loan.' },
    ],
  },
  {
    id: 'transaction-parameters',
    number: 3,
    title: 'Transaction parameters',
    blocks: [
      {
        list: [
          'Minimum EMI ticket value: ₹10,000',
          'Maximum EMI ticket value: ₹3,00,000',
          'One programme is one loan account.',
        ],
      },
    ],
  },
  {
    id: 'cancellation-window',
    number: 4,
    title: 'Cancellation window',
    blocks: [
      { p: 'Cancellation is available at any stage of the programme, subject to the refund tiers in Section 7.' },
      { p: 'Every enrolled student has a 7-business-day cooling-off window from the date of enrolment payment (or, for EMI-financed enrolments, from the date of loan disbursement to Axelis). Within this window, a student receives a full refund minus the administrative fee (Section 7), provided the student has not:' },
      {
        list: [
          'attended more than one (1) live session, OR',
          'consumed more than 10% of the course material on the Axelis LMS, OR',
          'for Concierge-tier programmes, received the initial consultant assignment or the first written deliverable, whichever is later.',
        ],
      },
      { p: 'If any of the above has occurred within the 7-business-day window, the standard tiered refund in Section 7 applies instead of the full cooling-off refund. The tiered refund remains available until Day 45 or 75% consumption, whichever is earlier.' },
    ],
  },
  {
    id: 'processing-fees',
    number: 5,
    title: 'Processing fees',
    blocks: [
      { p: 'Axelis does not charge any processing fee on any enrolment. All EMI processing charges, if any, are set by the financing partner and disclosed on the checkout page before payment.' },
    ],
  },
  {
    id: 'cancellation-process',
    number: 6,
    title: 'Cancellation & refund process',
    blocks: [
      { p: `Step 1 — Request: The student emails ${refundPolicy.supportEmail} from the enrolment email address with the enrolment ID, programme name, reason, and payment reference.` },
      { p: 'Step 2 — Acknowledgement: Axelis acknowledges the request within 48 business hours with a cancellation ticket ID.' },
      { p: 'Step 3 — Verification: Axelis verifies enrolment status, consumption, and eligibility against Section 4. Verification is completed within 5 business days of acknowledgement.' },
      { p: 'Step 4 — Approval and refund calculation: Axelis communicates the refund decision and refund amount to the student in writing, using the refund tiers in Section 7. Decision is communicated within 2 business days of verification completion.' },
      { p: 'Step 5 — Refund credit:' },
      {
        list: [
          'For direct-payment enrolments (UPI, card, netbanking, wallet): refund is credited to the source of payment within 7 to 10 working days of approval.',
          'For EMI-financed enrolments: refund is routed to the financing partner (Razorpay / Cashfree) within 7 to 10 working days of approval. See Section 8.',
        ],
      },
    ],
  },
  {
    id: 'refund-tiers',
    number: 7,
    title: 'Refund tiers and cancellation charges',
    blocks: [
      {
        table: {
          head: ['Time since enrolment payment', 'Refund', 'Retained by Axelis'],
          rows: [
            ['Day 1 to Day 7 (cooling-off)', 'Fee paid minus ₹2,500 administrative fee', '₹2,500'],
            ['Day 8 to Day 15', '75% of fee paid', '25%'],
            ['Day 16 to Day 30', '50% of fee paid', '50%'],
            ['Day 31 to Day 45', '25% of fee paid', '75%'],
            ['Day 46 onwards, or on completion of 75% of the programme', '0%', '100%'],
          ],
        },
      },
      { p: 'Concierge-tier outcome guarantee: Concierge programmes carry a written outcome guarantee published on the individual programme page. If the guarantee is not met, the promised refund percentage is issued regardless of the tier position. Guarantee percentages:' },
      {
        list: programs
          .filter((p) => p.tier === 'concierge' && p.guarantee)
          .map((p) => `${p.title}: ${p.guarantee.pct}% refund if ${p.guarantee.condition}`),
      },
    ],
  },
  {
    id: 'emi-refund-routing',
    number: 8,
    title: 'EMI-financed refund routing',
    blocks: [
      { p: 'For enrolments financed through Razorpay EMI or Cashfree EMI, the refund is credited to the financing partner. The financing partner then either closes the loan account (if the refund equals or exceeds the outstanding principal) or reduces the principal (if the refund is partial). Any surplus after loan closure is credited to the student’s registered bank account within 15 working days of the loan closure.' },
      { p: 'Interest already accrued, EMIs already paid to the financing partner, and applicable GST on those EMIs are not refundable. These are set by the financing partner.' },
      { p: 'Example — 3 EMIs already paid, ₹2,00,000 Concierge programme, 6-month tenure:' },
      {
        ordered: [
          'Student has paid 3 × ₹33,333 = ₹99,999 to the financing partner.',
          'Outstanding principal with the financing partner is approximately ₹1,00,000.',
          'Student cancels on day 40 (Day 31–45 tier = 25% refund of ₹2,00,000 = ₹50,000).',
          '₹50,000 is credited by Axelis to the financing partner within 7 to 10 working days.',
          'The financing partner reduces the outstanding principal from ₹1,00,000 to ₹50,000 and revises the remaining EMI schedule accordingly. The student pays reduced EMIs on the balance.',
        ],
      },
      { p: 'If the outcome-guarantee clause is triggered (say 40% refund on the same programme), ₹80,000 is credited to the financing partner, the ₹1,00,000 outstanding is reduced to ₹20,000, and the student’s remaining EMIs are recalculated on ₹20,000.' },
    ],
  },
  {
    id: 'non-refundable',
    number: 9,
    title: 'Non-refundable items',
    blocks: [
      { p: 'The following are non-refundable under any tier:' },
      {
        list: [
          'The ₹2,500 administrative fee',
          'Application / enrolment kit fee (₹1,000; waived for ZTF Charter students)',
          'Third-party exam registration fees paid by Axelis on the student’s behalf (IELTS, PTE, Goethe, DELF, embassy fees)',
          'Physical books or hardware shipped to the student',
          'Certificates already issued to the student',
          'Written deliverables already handed over (SOP drafts, mock interview recordings, Concierge visa file, submitted university applications)',
          'Recorded live sessions already streamed by the student',
        ],
      },
    ],
  },
  {
    id: 'force-majeure',
    number: 10,
    title: 'Force majeure',
    blocks: [
      { p: 'If Axelis is unable to deliver a programme due to instructor unavailability, technical failure, regulatory change, or any event outside reasonable control, the student receives a 100% refund of the unused programme value plus a ₹1,000 goodwill credit valid on any future Axelis programme, credited within 7 working days.' },
    ],
  },
  {
    id: 'important-information',
    number: 11,
    title: 'Important information',
    blocks: [
      {
        list: [
          'Cancellation is per programme, not per session.',
          'Cancellation requests are processed on business days (Monday to Friday, 09:00–18:00 IST). Requests received on weekends or public holidays are treated as received on the next business day.',
          'Axelis reserves the right to revise this policy. Any revision applies only to enrolments after the revision date. Enrolments before the revision date are governed by the policy version at the time of enrolment.',
          'All refunds are issued in Indian Rupees (INR) only.',
        ],
      },
    ],
  },
  {
    id: 'contact',
    number: 12,
    title: 'Contact for cancellation and disputes',
    blocks: [
      {
        list: [
          `First line — cancellation and refund support: ${refundPolicy.supportEmail} · ${refundPolicy.supportPhone}`,
          'Escalation: axelisoverseas@overseeducation.com — Rishabh Agrawal, Founder',
          'Corporate office: WorkFlo, KR Puram Hobli, Bengaluru',
          'Registered office: Bilaspur',
        ],
      },
    ],
  },
  {
    id: 'governing-law',
    number: 13,
    title: 'Governing law and jurisdiction',
    blocks: [
      { p: 'This policy is governed by the laws of India. All disputes arising out of this policy are subject to the exclusive jurisdiction of the courts of Bengaluru. This policy does not waive any right available to the student under the Consumer Protection Act, 2019.' },
    ],
  },
];
