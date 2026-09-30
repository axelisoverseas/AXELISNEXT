/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // The footer linked here for months while no page existed. The policy
      // now lives at a fixed URL; keep the old one resolving permanently.
      { source: '/refund-cancellation', destination: '/policies/cancellation-refund', permanent: true },

      // The old Vite site served a /blog and /mba-abroad. Neither exists in the
      // App Router, and FAQ copy still pointed at seven of those slugs. The
      // in-content links now point at real pages; these 301s catch anything
      // still arriving from outside (bookmarks, old indexes, shared links).
      { source: '/blog', destination: '/resources', permanent: true },
      { source: '/blog/canada-scholarships', destination: '/scholarships', permanent: true },
      { source: '/blog/uk-scholarships', destination: '/scholarships', permanent: true },
      { source: '/blog/canada-study-guide', destination: '/guide/study-in-canada', permanent: true },
      { source: '/blog/uk-study-guide', destination: '/guide/study-in-uk', permanent: true },
      { source: '/blog/us-visa-guide', destination: '/guide/study-in-usa', permanent: true },
      { source: '/blog/part-time-work', destination: '/resources', permanent: true },
      { source: '/blog/education-loans', destination: '/financing', permanent: true },
      { source: '/mba-abroad', destination: '/certifications/executive-mba-concierge', permanent: true },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
