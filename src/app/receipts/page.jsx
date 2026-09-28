import universities from '@/data/finder-universities.json';
import ReceiptsClient from './ReceiptsClient';

/**
 * A scroll-driven story page, ported from the scroll-site sample
 * (~/Downloads/scroll-site-sample, 28 Sep 2026) and pushed further.
 *
 * Every figure here is one the site already publishes, and the ones that can
 * be counted are counted from the data, not typed. The sample had four claims
 * the site does not make: "30k+ universities" (the finder holds 10,236),
 * "4,500 offers" (the 4,500 are visas), "₹30+ Cr scholarships" (₹30 Cr is
 * loans; scholarships are ₹3+ Cr), and "100% refundable on visa refusal" for
 * paid-tuition universities (GAC refunds on placement or no offer, not on a
 * refused visa). Those are corrected below.
 *
 * Imagery is only what the site already publishes: student photos and quotes
 * from /testimonials (src/data/studentStories.js), Anjali Sangwan's video
 * testimonial, and the city photos the homepage uses per country. The scroll
 * moves are shared components in src/components/scroll.
 *
 * Not indexed while it is under review. Flip `robots` when it is approved.
 */

const all = [...universities.epa, ...universities.gac];
const TOTAL = all.length;
const DESTINATIONS = new Set(all.map((u) => u.country)).size;

function countBy(list) {
  const m = new Map();
  for (const u of list) m.set(u.country, (m.get(u.country) || 0) + 1);
  return m;
}
const epa = countBy(universities.epa);
const gac = countBy(universities.gac);

// Same photo per country as the homepage destinations grid.
const RAIL = [
  ['United Kingdom', 'UK', 'GAC', null, '/photos/photo-1513635269975-59663e0ac1ad-1200.jpg'],
  ['Germany', 'DE', 'EPC', epa.get('Germany'), '/photos/photo-1527866959252-deab85ef7d1b-1200.jpg'],
  ['United States', 'US', 'GAC', gac.get('USA'), '/photos/photo-1485871981521-5b1fd3805eee-1200.jpg'],
  ['France', 'FR', 'EPC', epa.get('France'), '/photos/photo-1502602898657-3e91760cbb34-1200.jpg'],
  ['Canada', 'CA', 'GAC', gac.get('Canada'), '/photos/photo-1517935706615-2717063c2225-1200.jpg'],
  ['Netherlands', 'NL', 'EPC', epa.get('Netherlands'), '/photos/photo-1512470876302-972faa2aa9a4-1200.jpg'],
  ['Ireland', 'IE', 'GAC', gac.get('Ireland'), '/photos/photo-1590089415225-401ed6f9db8e-1200.jpg'],
  ['Finland', 'FI', 'EPC', epa.get('Finland'), '/photos/photo-1531366936337-7c912a4589a7-1200.jpg'],
].map(([name, code, route, n, img]) => ({
  name, code, route, img,
  note: n ? `${n.toLocaleString('en-IN')} institutions in the finder` : 'Shortlisted with your counsellor',
}));

export const metadata = {
  title: 'Every Fee Published Before You Pay',
  description:
    'How Axelis Overseas works, in receipts: the numbers we publish, the students we placed, the two charters, the destinations, and one counsellor from shortlist to arrival.',
  alternates: { canonical: '/receipts' },
  robots: { index: false, follow: true },
};

export default function ReceiptsPage() {
  return <ReceiptsClient total={TOTAL} destinations={DESTINATIONS} rail={RAIL} />;
}
