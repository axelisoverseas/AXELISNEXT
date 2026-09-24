import HomeClient from './HomeClient';

// The homepage owns its canonical here, not in the root layout: a canonical
// set in layout.js is inherited by every route that doesn't set its own, and
// for months that told Google six pages were duplicates of this one.
export const metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HomeClient />;
}
