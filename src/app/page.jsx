import HomeClient from './HomeClient';
import finder from '@/data/finder-universities.json';

// Counted here, on the server, so the 10k-row finder list never ships to the browser.
const ALL = [...finder.epa, ...finder.gac];
const UNIVERSITIES = ALL.length;
const DESTINATIONS = new Set(ALL.map((u) => u.country)).size;

// The homepage owns its canonical here, not in the root layout: a canonical
// set in layout.js is inherited by every route that doesn't set its own, and
// for months that told Google six pages were duplicates of this one.
export const metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HomeClient universities={UNIVERSITIES} destinations={DESTINATIONS} />;
}
