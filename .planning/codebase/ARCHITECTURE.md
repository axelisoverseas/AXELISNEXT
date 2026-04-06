# Architecture

## Pattern: Static Marketing Site with Client-Side Interactivity

The application is a **Next.js 16 App Router** marketing website for Axelis Overseas Education. It is primarily a static site with rich client-side animations and integrations, no server-side API routes, and no database.

## Layers

```
┌─────────────────────────────────────────┐
│          Next.js App Router             │
│   src/app/ — Pages & Layouts            │
├─────────────────────────────────────────┤
│          Components Layer               │
│   src/components/ — 52 UI components    │
├─────────────────────────────────────────┤
│          Data Layer                     │
│   src/data/ — Static JSON + siteData.js │
├─────────────────────────────────────────┤
│          Services Layer                 │
│   src/services/ — API abstraction       │
│   (EmailJS, WhatsApp, YouTube, etc.)    │
├─────────────────────────────────────────┤
│          Shared                         │
│   src/hooks/    — 3 custom hooks        │
│   src/utils/    — 7 utility files       │
│   src/context/  — ThemeContext           │
│   src/assets/   — Static assets         │
└─────────────────────────────────────────┘
```

## Entry Points

- `src/app/layout.js` — Root layout with `<Navbar />` and `<Footer />`
- `src/app/page.jsx` — Homepage (hero, program finder, stats, social proof)
- `src/app/globals.css` — Tailwind imports + custom styles

## App Router Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.jsx` | Homepage |
| `/about` | `src/app/about/` | About Axelis |
| `/contact` | `src/app/contact/` | Contact forms & info |
| `/products` | `src/app/products/` | Charter programs |
| `/accommodation` | `src/app/accommodation/` | Housing partners |
| `/courses/[course]-in-[country]` | `src/app/courses/` | Dynamic course pages |
| `/universities/[country]/[university]` | `src/app/universities/` | University explorer |
| `/guide/[slug]` | `src/app/guide/` | Country study guides |
| `/scholarships` | `src/app/scholarships/` | Scholarship info |
| `/portal` | `src/app/portal/` | Admin/student portal |

## Legacy Pages (`src/legacy_pages/`)

26 page components migrated from a previous React Router setup. These appear to be the original pages before the Next.js App Router migration:
- `Home.jsx`, `About.jsx`, `Contact.jsx`, `Products.jsx`
- Country pages: `StudyInUK.jsx`, `StudyInUSA.jsx`, `StudyInCanada.jsx`, `StudyInAustralia.jsx`
- `AdminDashboard.jsx` (54KB — largest file), `BlogPost.jsx` (52KB)
- Policy pages: `PrivacyPolicy.jsx`, `TermsConditions.jsx`, `RefundCancellation.jsx`, `DeliveryPolicy.jsx`
- `Loans.jsx`, `Accommodation.jsx`, `Careers.jsx`, `FAQ.jsx`, `Testimonials.jsx`, etc.

## Data Flow

1. **Static Data**: `src/data/siteData.js` (84KB) contains all site content — features, testimonials, FAQs, blog posts, loan data, accommodation data, team members
2. **Program Data**: `src/data/programsData.json` (222KB) — university/course catalog
3. **Lead Capture**: `LeadCaptureModal.jsx` → `leadService.js` → `mockLeadService.js` (localStorage) + `emailNotificationService.js` (EmailJS)
4. **No SSR Data Fetching**: All pages use `"use client"` directive

## Key Abstractions

- **Lead Capture Hook**: `src/hooks/useLeadCapture.js` — Manages modal state and form submission
- **Animation Hook**: `src/hooks/useAnimations.js` — Shared animation configurations
- **Smooth Scroll Hook**: `src/hooks/useLenis.js` — Lenis smooth scroll setup
- **Theme Context**: `src/context/ThemeContext.jsx` — Dark/light mode toggle
- **Error Boundary**: `src/components/ErrorBoundary.jsx` — Error handling wrapper

## Component Categories

| Category | Components | Examples |
|----------|-----------|---------|
| Navigation | 2 | `Navbar.jsx`, `Footer.jsx` |
| Hero/Visual | 8 | `CobeGlobe.jsx`, `ParticleField.jsx`, `GradientMesh.jsx`, `HemisphereGlobe.jsx` |
| Lead Capture | 3 | `LeadCaptureModal.jsx` (26KB), `LeadDashboard.jsx`, `ProtectedRoute.jsx` |
| Testimonials | 5 | `TestimonialCarousel.jsx`, `TestimonialGlobeCarousel.jsx`, etc. |
| Content Cards | 4 | `FeatureCard.jsx`, `TeamCard.jsx`, `CTAButton.jsx`, `BankLogo.jsx` |
| Social/Media | 5 | `YouTubeShorts.jsx`, `InstagramSuccessStories.jsx`, `VideoWidget.jsx` |
| Tools/Interactive | 4 | `ScholarshipMatcher.jsx`, `VisaSuccessPredictor.jsx`, `CibilScoreWidget.jsx` |
| Animations | 5 | `AnimatedHero.jsx`, `AnimatedSection.jsx`, `TextReveal.jsx`, `MagneticButton.jsx` |
