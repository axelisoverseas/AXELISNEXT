import universities from '@/data/finder-universities.json';
import ReceiptsClient from './ReceiptsClient';

/**
 * A scroll-driven story page, ported from the scroll-site sample
 * (~/Downloads/scroll-site-sample, 28 Sep 2026).
 *
 * Every figure here is one the site already publishes, and the ones that can
 * be counted are counted from the data, not typed. The sample had four claims
 * the site does not make: "30k+ universities" (the finder holds 10,236),
 * "4,500 offers" (the 4,500 are visas), "₹30+ Cr scholarships" (₹30 Cr is
 * loans; scholarships are ₹3+ Cr), and "100% refundable on visa refusal" for
 * paid-tuition universities (GAC refunds on placement or no offer, not on a
 * refused visa). Those are corrected below.
 *
 * Not indexed while it is under review. Flip `robots` when it is approved.
 */

const all = [...universities.epa, ...universities.gac];
const TOTAL = all.length;

function countBy(list) {
  const m = new Map();
  for (const u of list) m.set(u.country, (m.get(u.country) || 0) + 1);
  return m;
}
const epa = countBy(universities.epa);
const gac = countBy(universities.gac);
const DESTINATIONS = new Set(all.map((u) => u.country)).size;

// A mix of both routes, largest lists first within each.
const RAIL = [
  ['United Kingdom', null, 'GAC'],
  ['Germany', epa.get('Germany'), 'EPC'],
  ['USA', gac.get('USA'), 'GAC'],
  ['France', epa.get('France'), 'EPC'],
  ['Canada', gac.get('Canada'), 'GAC'],
  ['Italy', epa.get('Italy'), 'EPC'],
  ['Australia', gac.get('Australia'), 'GAC'],
  ['Netherlands', epa.get('Netherlands'), 'EPC'],
  ['Ireland', gac.get('Ireland'), 'GAC'],
  ['Finland', epa.get('Finland'), 'EPC'],
].map(([name, n, route]) => ({ name, n: n || null, route }));

export const metadata = {
  title: 'Every Fee Published Before You Pay',
  description:
    'How Axelis Overseas works, in six receipts: the numbers we publish, the two charters, the destinations, and one counsellor from shortlist to arrival.',
  alternates: { canonical: '/receipts' },
  robots: { index: false, follow: true },
};

export default function ReceiptsPage() {
  return <ReceiptsClient total={TOTAL} destinations={DESTINATIONS} rail={RAIL} />;
}
