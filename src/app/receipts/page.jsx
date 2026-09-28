import universities from '@/data/finder-universities.json';
import { testimonials } from '@/data/siteData';
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
 * from /testimonials (siteData), Anjali Sangwan's video testimonial, and the
 * city photos the homepage uses per country. Nothing generated.
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
].map(([name, code, route, n, img]) => ({ name, code, route, n: n || null, img }));

// Published student stories, first sentence of each real quote, unedited.
const firstSentence = (t) => (t.match(/^.*?[.!?](\s|$)/)?.[0] || t).trim();
const STORIES = testimonials
  .filter((t) => t.image && t.image.startsWith('/assets/'))
  .map((t) => ({
    name: t.name,
    university: t.university,
    country: t.country,
    quote: firstSentence(t.content || t.review || ''),
    // 600x750 web copies of the same photos (public/receipts/stories); the originals run to 6 MB.
    img: `/receipts/stories/${t.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
  }));

export const metadata = {
  title: 'Every Fee Published Before You Pay',
  description:
    'How Axelis Overseas works, in receipts: the numbers we publish, the students we placed, the two charters, the destinations, and one counsellor from shortlist to arrival.',
  alternates: { canonical: '/receipts' },
  robots: { index: false, follow: true },
};

export default function ReceiptsPage() {
  return <ReceiptsClient total={TOTAL} destinations={DESTINATIONS} rail={RAIL} stories={STORIES} />;
}
