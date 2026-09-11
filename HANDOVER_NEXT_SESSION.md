# Handover — next session

**Repo:** `/Users/rishabhagrawal/Downloads/AXELISNEXT` · Next.js 16.1.6, App Router, **JavaScript** (no TypeScript), Tailwind v4, Vercel → `overseeducation.com`
**Branch:** `p0/cancellation-policy-legal-links` · **PR #1 (draft):** https://github.com/axelisoverseas/AXELISNEXT/pull/1
**Deadline:** 15 September 2026, Bajaj Finserv merchant EMI review
**Founder:** Rishabh Agrawal · axelisoverseas@overseeducation.com · +91 9098522711

Read this file first. It is self-contained — you do not need the four handover docs, and two of them (`AXELIS_CERTIFICATION_CATALOGUE_v2.md`, `CASHFREE_PAYMENT_LINKS_SPEC.md`) **do not exist**. Do not go looking.

---

## 1 · State of play

**Shipped to `main`** (live on overseeducation.com): certifications catalogue + 16 programme pages, `/accreditations`, white/neutral theme, trust band, financing block, orbital-descent hero, contact number `+91 9098522711`, placements "5,000+".

**On the branch, not merged** — 6 commits, all verified, build passes at 41 static pages:

| Commit | What |
|---|---|
| `b61af44` | EMI rules re-based on the policy: eligible from ₹10,000, tenures 6/9/12/18/24, rounding matches the policy's ₹33,333 example, Concierge guarantees as structured data |
| `746abe4` | `/policies/cancellation-refund` — 13 sections, anchors, print CSS, `MerchantReturnPolicy` schema |
| `684bff9` | Cancellation & Refund block on all programme pages + canonical guarantee callout |
| `32af93e` | Footer rename + the three dead legal links fixed |
| `e65d129` | About: annual learner target removed |
| `e659162` | `TODO_FROM_FOUNDER.md` |

**The founder has NOT signed off on the merge.** Ask before pushing to `main`.

---

## 2 · Decisions already made — do not relitigate

Rulings from 11 Sep (all applied on the branch):

1. **Bajaj stays OUT** until the merchant ID lands. No chip, no logo, no placeholder, and **no "no-cost EMI" claim anywhere** — no-cost EMI *is* the Bajaj product. Gated behind `BAJAJ_EMI_LIVE` in `src/data/certificationPrograms.js`; flipping that one constant restores everything.
2. **"5,000+ students placed" stays** as an achieved claim. The *"5,000–10,000 learners per year"* target is partner-facing only and is off the site.
3. **Homepage stats strip stays removed.**
4. **`src/data/certificationPrograms.js` is the canonical catalogue.** The policy derives from it, not the reverse.
5. Cashfree links: mint per slug from the code.
6. **`support@overseeducation.com` does not exist** — use `axelisoverseas@overseeducation.com`. One constant: `refundPolicy.supportEmail`.
7. Dead legal links fixed (redirect + two noindex shells).
8. Nav placement is the dev's call.

Rulings from 12 Sep (**not yet applied — these are your tasks**):

9. **Remove Global Scholar Concierge** — already withheld from the published policy; now remove the residual mentions.
10. **ZTF Charter stays scoped out** of the Cancellation & Refund Policy. Already done; keep it that way.
11. **Remove the ₹1,000 enrolment kit fee** from policy §9.
12. **Remove every certification programme under ₹2,00,000.**

---

## 3 · TASK A — the ≥₹2,00,000 purge

### What survives

| Slug | Programme | Fee |
|---|---|---|
| `global-career-launch` | Global Career Launch | ₹2,00,000 |
| `phd-fellowship-concierge` | PhD & Fellowship Concierge | ₹2,50,000 |
| `executive-mba-concierge` | Executive MBA Concierge | ₹3,00,000 |

### What goes — 13 programmes

`study-abroad-readiness` ₹4,000 · `sop-and-personal-statement` ₹7,500 · `university-shortlisting-strategy` ₹9,500 · `student-visa-interview-readiness` ₹12,000 · `german-a1-a2` ₹28,000 · `french-a1-a2` ₹28,000 · `scholarship-and-funding-strategy` ₹32,000 · `application-coaching-undergraduate` ₹35,000 · `application-coaching-postgraduate` ₹42,000 · `german-b1-intensive` ₹85,000 · `french-b1-intensive` ₹85,000 · `phd-research-proposal` ₹1,10,000 · `executive-mba-application-coaching` ₹1,25,000

### ⚠ BLOCKER — ask the founder before you start

**The site's entire positioning is "16 certification programmes across four tiers, ₹4,000 to ₹3,00,000."** After the purge it is three programmes in one tier, ₹2,00,000 to ₹3,00,000. That sentence appears in the site title, the homepage hero, the footer tagline, the About page and five metadata blocks. Every one becomes false the moment this ships.

You cannot mechanically find-and-replace "16" with "3" — *"India's certification-first study-abroad platform. Three certification programmes."* is a materially weaker pitch to a lender than sixteen, and the Concierge-only ladder removes the entry point that makes the ₹2L flagship look like a step up rather than the only option.

**Ask Rishabh for the replacement positioning line before writing copy.** Two options worth putting to him:
- Keep the 13 as **unlisted** — remove them from the catalogue, tile grid and sitemap, but keep the pages reachable so existing links and any in-flight enquiries survive. Preserves the option to relist.
- Hard-delete and reposition around the three Concierge programmes, e.g. *"Three end-to-end concierge programmes"* — honest, and the ₹2L average-ticket claim finally becomes true (it computes to ₹2,50,000).

### Cascade — every site that breaks

Structural, will crash or render empty:

- **`src/components/HomeCertificationsPreview.jsx`** — hard-codes three supporting slugs (`german-b1-intensive`, `application-coaching-postgraduate`, `sop-and-personal-statement`). **All three are being deleted.** `supporting` becomes `[]` and the flagship-plus-three layout collapses. Rewrite it.
- **`src/app/certifications/page.jsx`** — renders a `TierHeading` + section per tier. Foundation, Core and Advanced become empty and would render headings over nothing. Either filter to non-empty tiers or drop the tier grouping entirely.
- **`src/data/certificationPrograms.js`** — `TIERS` keeps four entries with three unused; `catalogueStats.priceFloor` becomes ₹2,00,000.
- **`related` on the programme template** — only two siblings remain; the `.slice(0, 3)` is fine but the section gets thin.

Copy, all hard-coded (line numbers as of `e659162`):

| File | Lines | What |
|---|---|---|
| `src/app/layout.js` | 21, 23, 44, 45, 62 | site title "16 Programmes", description "Sixteen programmes across four tiers, from ₹4,000", OG + Twitter |
| `src/app/certifications/layout.js` | 6, 7, 18, 19, 27 | title, description, OG, Twitter — all say 16 / 4 tiers |
| `src/app/certifications/page.jsx` | 188, 197 | "Sixteen programmes, four tiers…", "Browse all 16 programmes" |
| `src/app/page.jsx` | 132 | hero: "Sixteen certification programmes…" |
| `src/components/Footer.jsx` | 141 | tagline: "16 certification programmes" — **on every page, Bajaj will see it** |
| `src/components/HomeCertificationsPreview.jsx` | 29, 31, 133 | "Sixteen programmes." / "Four tiers." / "See all 16 programmes" |
| `src/app/about/page.jsx` | 117 | "runs 16 certification programmes" |
| `src/app/about/layout.js` | 4, 17 | description + `EducationalOrganization` schema |
| `src/data/cancellationRefundPolicy.js` | §1 last block | **hard-coded** "Programme fees range from ₹4,000 to ₹3,00,000" → ₹2,00,000. The programme *list* in §1 auto-derives and needs no edit. |
| `public/llms.txt` | — | grep it |

**SEO:** the 13 slugs are in the sitemap and were deployed to production yesterday. Deleting them creates 13 live 404s. Add redirects to `/certifications` in `next.config.mjs` alongside the existing `/refund-cancellation` one.

### Also in Task A

- **Global Scholar Concierge** (ruling 9) — grep `"Global Scholar"`. It is already absent from the published policy; clear the remaining references in `src/data/cancellationRefundPolicy.js` header comments and `TODO_FROM_FOUNDER.md`.
- **₹1,000 kit fee** (ruling 11) — `src/data/cancellationRefundPolicy.js`, §9 `non-refundable`, the list item reading `'Application / enrolment kit fee (₹1,000; waived for ZTF Charter students)'`. Delete the line. This also removes the last ZTF mention from the policy, which suits ruling 10.
- **Regenerate the Bajaj PDF afterwards** — see §6. The current PDF says ₹4,000–₹3,00,000 and lists 16 programmes in §1. It must match the live site when Bajaj pulls it.

---

## 4 · TASK B — Cashfree payment links (after the purge, and only after Rishabh confirms)

Three links, not twenty-one. The founder will be logged into the Cashfree dashboard in the browser.

| Slug | Programme | Amount |
|---|---|---|
| `global-career-launch` | Global Career Launch | ₹2,00,000 |
| `phd-fellowship-concierge` | PhD & Fellowship Concierge | ₹2,50,000 |
| `executive-mba-concierge` | Executive MBA Concierge | ₹3,00,000 |

**This creates real payment instruments.** Confirm the amount with the founder before creating each link, and read back what was created. Do not batch-create silently.

Per link: EMI enabled (all three clear the ₹10,000 floor), tenures 6/9/12/18/24, notes/tags carrying the slug. Then:

- Store the codes in a JSON map keyed by slug — `src/data/cashfreeLinks.js`, one export, nothing else.
- Point each programme page's enrol CTA at its link. **There is no checkout page today** — the current CTA is `#enquire`, an enquiry form.
- Master v3 §C.2 item 4 wants an acceptance clause below the EMI toggle: *"By proceeding, you accept the Cancellation & Refund Policy and the Terms of Service. For EMI-financed enrolments, refunds are routed to your financing partner."* Both links open in a new tab. This is on Bajaj's checklist — it needs a surface to live on.
- Success/failure redirects and `/api/cashfree/webhook` are specified in master v3 §C.3 but need the dashboard's callback config; leave stubs if the founder hasn't set them.

---

## 5 · Constraints

**Never change without written sign-off:** the 7-business-day cooling-off window · the ₹2,500 administrative fee · the Concierge guarantee percentages (25% Global Career Launch / 40% PhD & Fellowship / 30% Executive MBA) · the 48-business-hour acknowledgement, 5-business-day verification, 2-business-day decision and 7–10-working-day credit SLAs. All of these live in `refundPolicy` in `certificationPrograms.js` and in `cancellationRefundPolicy.js`.

**Must never appear on the public site:** projected GMV (₹100–200 Cr) · any per-lender subvention rate · any Bajaj claim while `BAJAJ_EMI_LIVE === false` · any "no-cost EMI" claim (same reason) · `support@overseeducation.com` · the 5,000–10,000/year target.

**Must be true on the live site by 15 September:** policy published at a fixed URL · policy link visible from checkout · clear pricing on every programme page, no "call for price" · footer carries CIN U85500CT2023PTC014913 + MCC 8299 · a sample certificate visible · both offices on About · policy prints cleanly on A4.

---

## 6 · Regenerating the Bajaj PDF

```bash
npm run dev
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$HOME/Desktop/Axelis_Cancellation_Refund_EMI_Policy_v1.0.pdf" \
  "http://localhost:3000/policies/cancellation-refund"
pdftotext -layout "$HOME/Desktop/Axelis_Cancellation_Refund_EMI_Policy_v1.0.pdf" - | head -40
```

Expect ~8 pages, ~240 KB, **zero embedded images**. If it comes out multi-megabyte with images, the print stylesheet has stopped hiding `.site-wallpaper` and the fixed star layers are rasterising onto every page — that was the first failure mode and it is the thing to check.

---

## 7 · Gotchas that already cost time

- **`git` has no user identity configured.** Commits fail with "Author identity unknown". Pass it per-commit: `GIT_AUTHOR_NAME="Rishabh Agrawal" GIT_AUTHOR_EMAIL="rishabhagrawal@Rishabhs-MacBook-Air-2.local"` plus the matching `GIT_COMMITTER_*`. Do not edit global git config.
- **Unsplash 200 ≠ correct image.** Two wrong-subject photos shipped this way (Christmas wrapping paper; a gallery wall captioned "Norway"). Always render candidates on a contact sheet and look at them.
- **Tailwind cannot resolve template-literal class names.** `text-[var(--${accent})]` compiles to nothing. Use the static `accentFor()` map in `certificationPrograms.js`.
- **The browser-automation harness does not fire scroll events for programmatic `window.scrollTo`.** Scroll-linked code looks broken when it is fine. Dispatch `new Event('scroll')` manually to test, or verify by reading computed transforms.
- **Never `grep` a PDF for content.** Raw streams are compressed — every check silently "passes" as absent. Use `pdftotext -layout`, and remember it hard-wraps, so match on short phrases.
- **SSR comments pollute HTML greps.** `curl | grep -c` over-counts because Next inlines the RSC payload. Strip `<!--…-->` first.
- **`prefers-reduced-motion` is respected** in `HeroOrbitalBackdrop`; keep it that way in anything new.

---

## 8 · Still blocked on the founder

From master v3 §F, none delivered: positioning line sign-off (now urgent — see the Task A blocker) · founder photo + bio · programme lead names · **sample certificate design approval** (nothing exists; Bajaj's checklist wants one visible) · Bajaj merchant ID · cohort intake dates · Calendly URL for the Discovery Call embed.

**HubSpot is not connected.** `HUBSPOT_PRIVATE_APP_TOKEN`, `HUBSPOT_CERT_PIPELINE_ID` and `HUBSPOT_CERT_STAGE_ENQUIRY` are unset in Vercel, so `/api/certification-enquiry` validates the payload, logs it server-side and returns success. Real enquiries are reaching production logs and nothing else. Worth raising early.
