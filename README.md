This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Hero Spline scene (optional)

The homepage hero uses an optional Spline 3D centerpiece. If no scene URL is
configured, a CSS planet fallback renders automatically — nothing breaks.

Set the scene URL in `.env.local` to enable Spline:

```
NEXT_PUBLIC_SPLINE_HERO_URL=https://prod.spline.design/xxxxxxxx/scene.splinecode
```

Build a scene at [spline.design](https://spline.design) — the storm-to-dawn
direction works best with: a slow-rotating dark-sapphire sphere, faint
electric arcs on the surface, optional debris ring, lighting biased
top-right cyan + bottom-left amber. Export as "Code Export → Next.js"
and paste the `.splinecode` URL above.

Spline runtime is lazy-loaded only when the hero enters the viewport,
so the fallback has no perf cost.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
