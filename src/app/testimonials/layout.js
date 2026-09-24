// The page is a client component, so its metadata has to live here. Without
// this file the route inherited the homepage's title.
export const metadata = {
  title: 'Student Stories and Reviews',
  description:
    'Named Axelis Overseas students on camera, with their offers, visas and Google reviews. Real payments, signed declarations, verifiable visas.',
  alternates: { canonical: '/testimonials' },
};

export default function TestimonialsLayout({ children }) {
  return <>{children}</>;
}
