# Handover — brand implementation

**For:** the web agent implementing the approved brand on overseeducation.com
**From:** the brand session, 20 September 2026
**Repo:** `/Users/rishabhagrawal/Downloads/AXELISNEXT` · Next.js 16.1.6, App Router, JavaScript, Tailwind v4 → Vercel
**Founder:** Rishabh Agrawal · axelisoverseas@overseeducation.com · +91 9098522711

Read this file before touching anything. It is self-contained.

---

## 1 · What was decided

The founder approved **navy**. One direction, signed off, no further options to weigh.

| | |
|---|---|
| **Logo** | The founder's own SVG. **Not redrawn, not re-traced, not substituted.** |
| **Typefaces** | **Instrument Serif** (display) + **Instrument Sans** (text). Both Google Fonts. |
| **Palette** | Leverage Edu's navy and blue — `#0E3240` ground, `#4080BD` brand blue |
| **Architecture** | Derived from Leverage Edu's page structure |
| **Radius** | 10px buttons and tiles, 14px cards |

**The canonical reference is `docs/brand/samples/axelis-final-navy.html`.** If this
document and that page ever disagree, the page is right. Build to match it.

### Two things to understand before you start

**1 · The palette is Leverage Edu's own.** `#0E3240` and `#4080BD` are read
from their stylesheet. The founder saw a shifted alternative, compared both,
and chose theirs. The trade-dress exposure of pairing a direct competitor's
page architecture with their exact colours was raised twice and overruled.
It is a decision, not an oversight — do not "fix" it.

**2 · Instrument Serif has exactly one weight.** 400, plus italic. It is a
display face and cannot carry body copy, labels or tables. So the system is two
faces, not one: **Instrument Serif** for display and headings, with *italic* as
the emphasis device, and **Instrument Sans** (400/500/600/700) for everything
else. Do not fake extra weights with `font-weight: 800` on the serif — the
browser will synthesise a bolded outline and it looks broken.

---

## 2 · Where everything lives

```
docs/brand/
├── BRAND_GUIDELINES.md        ← v4.0, the spec. Read §4, §5, §6.
├── brand-tokens.css           ← drop-in for globals.css + migration map
├── assets/
│   ├── axelis-lockup.svg      ← mark + wordmark, stacked
│   ├── axelis-mark.svg        ← mark alone, currentColor
│   ├── axelis-seal.svg        ← guarantee seal, currentColor
│   ├── axelis-mark-navy.svg   ← flat navy, for <img> use
│   ├── axelis-mark-white.svg  ← flat white, for <img> on navy
│   └── axelis-seal-navy.svg
├── samples/
│   ├── axelis-final-navy.html ← THE REFERENCE
│   ├── fonts/                 ← legacy Cabinet Grotesk files, no longer used
│   ├── logos/                 ← university logos
│   └── _superseded/           ← dead directions, ignore
└── company-docs/              ← the printed document kit (§6)
brand-review/                  ← static review site, not production
```

---

## 3 · Tasks, in order

### Task A · Fonts (do this first — everything else looks wrong without it)

Both faces are on Google Fonts. In `src/app/layout.js`:

```js
import { Instrument_Serif, Instrument_Sans } from 'next/font/google'

const display = Instrument_Serif({
  subsets: ['latin'], weight: '400', style: ['normal', 'italic'],
  variable: '--font-display', display: 'swap',
})
const sans = Instrument_Sans({
  subsets: ['latin'], weight: ['400', '500', '600', '700'],
  variable: '--font-sans', display: 'swap',
})
```

Then **delete the Montserrat import** — line 1 of `layout.js` today, and the
single biggest reason the site looks like every competitor.

Usage split:

- `--font-display` — h1 to h4, the wordmark, pull quotes. Weight 400 only.
  Emphasis inside a heading is **italic**, never bolder.
- `--font-sans` — body, nav, labels, tables, forms, figures. 400 body,
  500 meta, 600 labels, 700 figures.

The old self-hosted Cabinet Grotesk `.woff2` files under
`docs/brand/samples/fonts/` are dead. Do not copy them into `public/`.

### Task B · Tokens

Replace the `@theme` and `:root` blocks in `src/app/globals.css` with
`docs/brand/brand-tokens.css`. The migration map at the foot of that file maps
every old `--storm-*` / `--dawn-*` variable to its replacement.

Expect visible breakage where stray colours are hard-coded — that is the point.
Hunt these down and replace them with tokens:

```
#ffde59  #4C9DF0  #3590f3  #8fbcf7  #1B365D  #172A7E  #4f46e5  #22d3ee
#1F4E79  #FFF4E0   (old certificate navy/cream)
```

### Task C · The accent traps — there are two

Leverage's brand blue is a **surface colour**. It fails as text.

| Use | Token | Ratio |
|---|---|---|
| Large surfaces, graphics, rules | `#4080BD` | — |
| Text and button fills on light | `#2F6795` | 6.01 AA |
| Accent on navy grounds | `#7FB4E0` | 6.14 AAA |

- `#4080BD` on white = **4.17 — fails** AA for text
- `#4080BD` on navy = **3.25 — fails**

After the token swap, grep every use of the brand blue and decide which of the
three it is. Buttons take `#2F6795` with white text.

### Task D · Retire the decoration

These belong to the old brand and must go from `globals.css`:

- `.glass-card` — glassmorphism, three usages
- `.bb-ring` / `--bb-angle` — the rotating border beam
- `bg-first` / `bg-second` / `bg-third` — the background blob animations
- The two CTA gradients in `Navbar.jsx` (desktop bar ~line 183, mobile drawer
  ~line 357) — `bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)]`

Replace gradients with a flat `--color-accent` fill. **No gradients anywhere.**

### Task E · Rebuild the homepage

Match `samples/axelis-final-navy.html` section for section:

1. Utility ribbon (address, phone)
2. Sticky white nav — mark + wordmark, links, one filled CTA
3. Hero — claim left, lead-capture card right, trust figures below
4. Outcome band on navy — university logo wall
5. Two-pillar tile grid — Study Global / Apply Global
6. Programme cards on tint — three concierge programmes, fee + EMI on each
7. Guarantee block — clause 4 with the seal
8. Financing table — tabular figures
9. Closing CTA on navy
10. Footer on deep navy

### Task F · Theme inversion — the part that bites

`globals.css` sets `--background: #0C0A09` and the site renders near-black.
The new brand is **white ground with navy bands**: nav, footer, hero band and
the outcome strip take navy; everything else is white or tint. Target ratio is
roughly 11 white : 6 tint : 6 navy, per the reference page.

**Do not follow the token migration map literally.** It renames tokens; it does
not invert the ground. Every `--storm-*` maps to another dark value, so a
faithful remap yields a navy-black site that satisfies the map and breaks §5.2.
Set `--background` to `#FFFFFF` and `--foreground` to `#0E3240` first.

Four things the first conversion hit (20 Sep), all confirmed:

1. **`layout.js` hard-codes `bg-[var(--storm-deep)]` on `<body>`.** It sits
   above every page and overrides the white ground no matter what the tokens
   say. Remove it, and the fixed starfield behind it — a dark-ground device.
2. **39 near-black labels** land on brand blue at ~2.5:1. A label on `#4080BD`
   takes white, or the chip takes `--color-tint`.
3. **5 CTAs use a white → accent gradient**, where no text colour clears 4.5:1
   at both ends. Flat `--color-accent-text` fill, white text.
4. **The focus ring cannot be one colour** — nothing clears 3:1 on both white
   and navy. Two-tone it: navy on light, accent-light on navy.

**The money path needs checking by hand**, not by remap: `CheckoutButton`,
`ServiceCheckout`, `DocumentUpload`, and the three policy pages Cashfree links
out to. `DocumentUpload` was a `bg-black/25` panel with white text — invisible
on a white page.

### Task G · Reissue the mark

Favicons (16/32/180/192/512), `og-image.jpg`, email signature, social avatars.

**Flagged:** below 24px the rocket and the slipstream merge into a smudge. The
16px and 20px favicon slots need a simplified variant — planet and slipstream,
rocket dropped. **That variant has not been drawn yet.** Either commission it or
ask the brand session for it; do not ship a 16px favicon of the full mark and
call it done.

### Task H · Copy

One stale comment remains: `src/data/certificationPrograms.js:14` still reads
"16 programmes, 4 tiers". The rest of the "16 programmes / four tiers /
₹4,000" copy was already purged in commits `e7db572` and `a4b5144`.

---

## 4 · Rules that will be checked in review

1. **Two faces, no more.** Instrument Serif 400 for display, Instrument Sans
   400/500/600/700 for everything else. Emphasis in a heading is italic, never
   a heavier weight. A third family is a review failure.
2. **Figures are tabular.** Every rupee amount, EMI figure, certificate ID and
   phone number: `font-variant-numeric: tabular-nums`.
3. **The accent inverts on dark.** See Task C.
4. **No gradients, no glassmorphism, no pill shapes.** Max radius 14px.
5. **Never "guaranteed admission."** It is a *written outcome guarantee* — a
   defined remedy on a defined failure. This is a legal rule, not a style one.
6. **The logo takes `currentColor`.** Never create a second SVG per colour; set
   `color` and `--axelis-accent` on a parent instead. Flat-colour copies exist
   only for `<img>` contexts that cannot inherit.
7. **Motion:** opacity and ≤8px translation, 200ms ease-out, and honour
   `prefers-reduced-motion`. Nothing floats, pulses or orbits.

---

## 5 · Accessibility, measured

Every pair below was computed, not estimated. Do not regress them.

| Pair | Ratio | |
|---|---|---|
| White on Navy `#0E3240` | 13.56 | AAA |
| Navy on White | 13.56 | AAA |
| Navy on Tint `#F0F4F8` | 12.27 | AAA |
| Accent light `#7FB4E0` on Navy | 6.14 | AAA |
| Accent text `#2F6795` on White | 6.01 | AAA |
| White on `#2F6795` | 6.01 | AAA |
| Dim `#5A7280` on White | 5.06 | AA |
| **Brand blue `#4080BD` on White** | **4.17** | **FAILS for text** |
| **Brand blue `#4080BD` on Navy** | **3.25** | **FAILS** |

---

## 6 · The company document kit

`docs/brand/company-docs/` — nine templates, one stylesheet
(`axelis-doc.css`). Open `index.html` for the set. These are **print
documents**, not web pages: open and use the browser's print-to-PDF.

The letterhead is the master; its header, the 2.6mm navy rule with the 38mm
accent segment, and the four-part legal footer repeat on every document.

**Company facts — verified:**

- **Axelis Overseas Education Pvt Ltd**
- CIN `U85500CT2023PTC014913` · MCC 8299 (Educational Services)
- **GSTIN `22AAZCA0637P1Z5`** · **PAN `AAZCA0637P`**
- Registered office: B20 Vrindavan Plaza, Nehru Chowk, Bilaspur,
  Chhattisgarh 495001
- Corporate office: WorkFlo, Ranka Junction, Property No. 224, 3rd Floor,
  #80/3, Vijinapur Village, Old Madras Road, KR Puram Hobli, Bengaluru,
  Karnataka 560016
- +91 9098522711 · axelisoverseas@overseeducation.com · info@overseeducation.com
- Bank: IDFC FIRST Bank Ltd., Bilaspur Branch — **account number, IFSC, SWIFT
  and UPI are deliberately NOT recorded in this repository.** They are on the
  existing invoices in the company Google Drive. Fill them into the invoice
  template at issue time; never commit them.
- Signatory: Rishabh Agrawal, Director & Authorised Signatory

GST registration is in **Chhattisgarh (22)**. Supply to any other state is
inter-state — **IGST 18%**. A Chhattisgarh candidate takes CGST 9% + SGST 9%.
SACs in live use: `999293` programme fees · `998596` B2B partner support ·
`996211` recruitment commission.

All of the above was recovered from invoices already in the company Google
Drive (`AX/B2B/26-27/001` and `AXLO0002`). Nothing here is invented.

**Two blanks left before any document is issued:**

1. **Legal sign-off on the engagement letter** — clauses 5, 6 and 7 are drafted
   to match the published policy, not reviewed by counsel.
2. **Programme lead names and credentials** — placeholders throughout.

GSTIN, PAN, the registered-office address and the bank block are filled in and
live on the invoice template.

---

## 7 · Open items needing the founder

- Founder photo and short bio (About page, concierge pages)
- Programme lead names + one-line credential, one per programme
- The simplified small-size favicon variant (Task G)
- Confirmation that the certificate may leave the old navy `#1F4E79` / cream
  `#FFF4E0` specification — the new certificate already assumes yes
- Confirm the SAC per invoice type with your accountant (three are in use)
- GitHub repo for the `brand-review/` static site, for Vercel hosting

---

## 8 · What has NOT been done

Nothing in this handover has been applied to the running site. No component
under `src/` has been modified by the brand session. The branch state is
whatever the previous session left; check `git log` before you start.

Three artifact links exist for approval reference (private to the founder):
direction A vermilion, **B navy — the approved one**, C dark.

---

## 9 · Brand asset remediation — added 20 September 2026

A live audit of both production domains found eleven brand defects, five of
them customer- or Google-facing. The findings are in
`docs/brand/AXELIS_BRAND_ARTEFACT.md` §2, the required end state is §3, and
the actionable brief for the coding agent is `docs/brand/WEB_AGENT_PROMPT.md`.

Headlines:

- Every favicon slot still serves the old planet-and-rocket mark
- The OG image is the retired gold-on-navy treatment, is 640×640 against a
  declared 1200×630, and claims "2000+ Scholarships"
- `overseeducation.com` declares no logo to Google; `axelisoverseas.com`
  declares a white one, invisible on Google's white card
- The guarantee seal is deployed nowhere — 404 on both domains, zero mentions
- `axelisoverseas.com` is still entirely on the old brand

**Do not start this until `brand/d2c-palette` has both halves merged.**
