# overseeducation.com — palette conversion

> **The two-machine split is no longer needed. Both halves were taken on one
> machine and the conversion is complete.** This file is kept as the record of
> what was done and the rules that were followed.

**Status: converted.** ~90 files, every page and component. The branch builds
and every route has been looked at in a browser.

Still deliberately dark, and correct that way: the Footer, the 3D globes and
backdrops, the Navbar drawer and its scrim, the photographic heroes, the
closing CTA band, and the navy regions on /faq, /scholarships and
/privacy-policy.

**One pre-existing bug, not from this work:** the `/faq` H1 renders at
`opacity: 0`. Its colour is correct white on the navy hero; the framer-motion
`animate` never completes. The markup is byte-identical to `7d9db48`, before
any palette work, so it is broken on production today for an unrelated
reason. Worth a separate fix.

## Why a white ground

The kit contradicts itself. Its migration map sends every dark token to another
dark token and never mentions `--background`, so following it leaves a
navy-black site. §5.2 says white and tint 70%, navy 20%, accent 10%.

`BRAND_GUIDELINES.md` line 13 breaks the tie — *"if the two ever disagree, the
page is right"* — and the approved page, `samples/axelis-final-navy.html`, sets
`body { background: var(--white) }` with 11 sections white, 6 tint, 6 navy.

**Navy is a band colour, not the ground.** The migration map is the wrong part.

## The one rule

> The same class is correct inside a navy band and wrong on a white card.

So this cannot be sed'd. For each file: find which ground the element sits on,
then convert. Roughly 2,055 literals across ~105 files.

## Conversion table

| Found | On a **white/tint** ground | Inside a **navy band** |
|---|---|---|
| `text-white` | `text-[var(--color-navy)]` | keep |
| `text-slate-300/400` | `text-[var(--color-dim)]` | `text-[var(--color-dim-dark)]` |
| `text-slate-200` | `text-[var(--color-navy)]` | `text-white` |
| `bg-white/[0.05]` etc. | `bg-[var(--color-tint)]` | keep |
| `border-white/10` | `border-[var(--color-rule)]` | keep |
| `text-[var(--dawn-glow)]` | `text-[var(--color-axelis)]` | `text-[var(--accent-on-dark)]` |
| `text-[var(--storm-electric)]` | `text-[var(--color-axelis)]` | keep |
| `bg-[#0C0A09]` / `stone-950` | `bg-white` or `bg-[var(--color-tint)]` | `bg-[var(--color-navy)]` |

Already handled globally by the foundation — do not redo:
`text-[var(--storm-deep)]` (now `text-white` on fills), the white→accent CTA
gradients, the focus ring, the `<body>` ground in `layout.js`, and the fixed
starfield wallpaper (removed — it was a dark-ground device).

Machine A has also already converted the money path: `CheckoutButton`,
`ServiceCheckout`, `DocumentUpload`, `/policies/payment-terms`,
`/policies/cancellation-refund`, `/delivery-policy`.

## Three traps

1. **`#4080BD` is never text.** 4.17:1 on white, 3.25:1 on navy — fails AA on
   both. It is bound to `--color-accent-surface` and to no text utility. Use
   `--color-axelis` `#2F6795` for text on light, `--accent-on-dark` `#7FB4E0`
   on navy.
2. **`--color-rule` `#D5E1EB` is decorative only.** 1.33:1 on white. Never an
   input or control border — those need 3:1 under 1.4.11. Use `--color-dim`.
3. **Don't reintroduce a one-colour focus ring.** No single value clears 3:1 on
   both grounds. The two-tone ring in `globals.css` is deliberate.

## Split — 1,137 literal hits each

Balanced by weight. `legacy_pages/` (19 files) is **excluded — not rendered**;
don't spend time there.

### Machine A — this MacBook (47 files)
Shared chrome and the money path, so it lands first and the rest builds on it.

Navbar · Footer · LeadCaptureModal · DocumentUpload · CheckoutButton ·
ServiceCheckout · PayRail · CTAButton · layout.js
/test-prep · /certifications/[slug] · /contact · /faq · /about ·
/accreditations · /bookings · /resources · /verify · /payment-status ·
/guide/[slug] · /policies/payment-terms · /policies/cancellation-refund ·
/delivery-policy
FinancingBlock · StudyAbroadGuides · HomeCertificationsPreview ·
CertificationEnquiryForm · GoogleReviewsFloat · GoogleReviewsSection ·
UniversityFinder · StudentDashboardMock · TrustBand · PlanComparison ·
TeamGlobeCarousel · TeamCard · VisaSuccessPredictor · ui/LogoColumn ·
VideoWidget · PrintButton · HeroOrbitalBackdrop · TestimonialsSection ·
BankLogo · TestimonialCard · WhatsAppTest · ui/ShinyButton ·
RealisticGlobe · HemisphereGlobe

### Machine B — other MacBook (43 files)
The marketing surface. Independent of A; no shared files.

/products · / (home) · /accommodation · /vocational · /testimonials ·
/certifications · /scholarships · /financing · /services · /privacy-policy ·
/terms-conditions · /university-finder · /courses/[course]-in-[country] ·
/verify/CertificateLookup · /payment-status/StatusPanel
ui/SpatialPlanShowcase · InstagramSuccessStories · ScholarshipFinder ·
EnhancedFAQ · VisualTestimonialCarousel · SpecimenCertificate ·
CancellationRefundBlock · SocialMediaButtons · TestimonialGlobeCarousel ·
TestimonialRealisticGlobe · WhatsAppWidget · ScholarshipMatcher ·
PaymentPartnersStrip · ui/TestimonialsColumn · Professional3DGlobe ·
LoanDocumentCTA · AnimatedHero · ErrorBoundary · ui/ContainerScroll ·
CibilScoreWidget · ui/lightning-bolt · UniversityLogosSection ·
FeaturesCarousel · ui/storm-backdrop · TestimonialCarousel · Layout ·
AdminLogin · data/certificationPrograms.js

`SpecimenCertificate.jsx:23` carries a hardcoded `#17140F`/`#0C0A09` gradient —
the last literal of the old palette. Machine B owns it.

## Components and their host pages are coupled

The file lists don't overlap, but what renders inside what does. A converted
component dropped into an unconverted page looks wrong until both land — a
white stepper on a navy card, for example. That is expected mid-flight and is
**not** a bug to chase:

| Machine A component | renders inside (Machine B) |
|---|---|
| `ServiceCheckout` | `/services` |
| `CheckoutButton` | `/products`, `/certifications` |
| `DocumentUpload` | `/services`, `/certifications` |

Judge a page only once both halves have landed.

## Working agreement

Both machines branch **from `brand/d2c-palette`**, not from `main`.

This clone's fetch refspec is narrowed to main only:

    +refs/heads/main:refs/remotes/origin/main

So a plain `git fetch` never sees any other branch, and
`git checkout brand/d2c-palette` fails with "pathspec did not match" even
though the branch is on the remote. It hid four other branches here too, and
it is why this branch was read as unpushed. Widen it once, on each machine:

    git config --add remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'
    git fetch origin
    git checkout brand/d2c-palette
    git checkout -b brand/d2c-palette-b     # machine B only

Confirm with `git ls-remote --heads origin`, which asks the server. Never
judge whether a branch was pushed from `git branch -r` in this clone — that
reads local tracking refs, which the narrowed refspec leaves stale.

The file lists do not overlap, so the only conflict risk is `globals.css` —
**neither machine edits it.** If a token is missing, say so rather than adding
one locally; it needs to land once, for both.

Before pushing: `npm run build` (the price-drift assertion runs in it), then
check one navy band and one white card in the browser for leftover
white-on-white.
