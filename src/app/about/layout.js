export const metadata = {
    title: 'About Us',
    description:
        "India's study-abroad consultancy. Bengaluru corporate office, Bilaspur registered office, 29 destination markets and an in-house certification catalogue.",
    alternates: { canonical: 'https://www.overseeducation.com/about' },
};

export default function AboutLayout({ children }) {
    // The organisation schema is emitted once for the whole site, from
    // src/lib/seo.js via the root layout.
    return <>{children}</>;
}
