# Axelis Overseas — Brand Guidelines

**Version 4.0 · APPROVED · 20 September 2026 · Owner: Rishabh Agrawal**

This document governs how Axelis looks and sounds — in documents, in PDFs sent
to students and lenders, and on overseeducation.com. Where this document and an
existing asset disagree, this document wins and the asset gets reissued.

**Superseded:** v1.0 (deep green, Source Serif 4) — rejected as too quiet.
v2.0 (Leverage-matched navy) — reviewed and passed over in favour of navy. Nothing from
either survives except the working method: measure contrast, don't assert it.

**The live reference is `samples/axelis-final-navy.html`.** Everything below is
implemented there; if the two ever disagree, the page is right.

---

## 1 · The decisions, in one place

| | |
|---|---|
| **Positioning** | Three end-to-end concierge programmes. A written outcome guarantee. |
| **Logo** | The founder's own SVG — planet, slipstream, rocket. Not redrawn. |
| **Typefaces** | **Instrument Serif** (display) + **Instrument Sans** (text) |
| **Palette** | Leverage Edu's navy and blue — `#0E3240` / `#4080BD` |
| **Architecture** | Derived from Leverage Edu's page structure |
| **Radius** | 10px buttons and tiles, 14px cards |

---

## 2 · The category, measured

Fonts and hex values read from each firm's own stylesheets, 13 and 19 September
2026. Method: hex values and `font-family` declarations pulled from served HTML
and CSS bundles — it catches what a homepage paints and misses what lives only
in an unreferenced stylesheet. Nine firms is a sample, not a census.

| Firm | Heading face | Primary | Family |
|---|---|---|---|
| Ambitio | Space Grotesk | `#B1060F` | Geometric grotesque |
| Yocket | Satoshi | `#E37712` | Neo-grotesque |
| AECC Global | Outfit | `#715AE6` | Geometric sans |
| IDP Education | Farro | `#28558C` | Humanist sans |
| Edvoy | Gilroy | `#9317CE` | Geometric sans |
| upGrad Abroad | Geist | `#B86E00` | Neo-grotesque |
| GradRight | Poppins | `#782BFF` | Geometric sans |
| Leverage Edu | Rubik | `#0E3240` | Rounded grotesque |
| Collegify | — | `#061421` | — |
| **Axelis, before** | Montserrat | `#ffde59` | Geometric sans |

**The finding.** Every firm in the sample sets headlines in a wide or
geometric sans — eight companies, one silhouette. Not one of them is
condensed, and every one is a sans. **Instrument Serif takes the lane none of
them occupy** — a serif display face in a category that is unanimously
grotesque. The palette deliberately does not differentiate: it matches
Leverage Edu's, by the founder's decision (see §5).

---

## 3 · The mark

The logo is the founder's existing artwork: a solid planet, a tapering
slipstream cutting through it with two trailing wake lines, and the rocket at
the tip. **It is not redrawn and must not be redrawn.**

| File | Use |
|---|---|
| `assets/axelis-lockup.svg` | Mark + wordmark, stacked. Hero, letterhead, avatars. |
| `assets/axelis-mark.svg` | Mark alone. Nav, favicon, seal, small sizes. |
| `assets/axelis-seal.svg` | Guarantee seal. Three uses only — see §6.3. |

**Colour is dynamic.** The original SVGs were hard-coded white. Their fills are
now `currentColor`, and the yellow inside them is `var(--axelis-accent)`. One
file takes any colour from the page around it — set `color` and
`--axelis-accent` on a parent, nothing else. There is no per-colour copy to
maintain, and there must never be one.

**Clear space** equals the height of the planet on all four sides. **Minimum
size** 28px for the mark, 120px wide for the lockup.

**Do not:** recolour outside the palette · rotate · add shadow or glow ·
stretch · outline · place on a busy photograph · rebuild the wordmark in
Instrument Serif — the lockup carries its own lettering.

---

## 4 · Typography

**Two faces, and a reason for each.**

| Role | Face | Weights |
|---|---|---|
| Display, headings, wordmark, pull quotes | **Instrument Serif** | 400 + italic |
| Body, nav, labels, tables, forms, figures | **Instrument Sans** | 400 / 500 / 600 / 700 |

**Why two and not one.** Instrument Serif ships a single weight plus italic. It
is a display face: it cannot carry body copy, and it has no bold. Faking one
with `font-weight: 800` makes the browser synthesise an outline, which looks
broken at any size. So emphasis inside a heading is **italic**, never heavier.

| Role | Setting |
|---|---|
| H1 | Serif 400, 1.06 leading, −1% tracking |
| H2–H4 | Serif 400, 1.1 leading |
| Emphasis in a heading | Serif 400 *italic*, in the accent |
| Labels, eyebrows | Sans 600, +14% tracking, uppercase |
| Figures — fees, EMI, IDs | Sans 700, tabular numerals |
| Meta, captions | Sans 500 |
| Body | Sans 400, 1.6 leading |

Body copy is never wider than 62 characters. Headings are sentence case;
uppercase is reserved for labels.

Both faces are on Google Fonts, so they work on the web, in Google Docs and in
anything that can reach `fonts.googleapis.com`. Nothing to self-host, nothing
to license.

## 5 · Colour

Full token layer: `brand-tokens.css`.

| Token | Hex | Role |
|---|---|---|
| **Navy** | `#0E3240` | Deep ground — nav bands, footer, document covers |
| **Navy 2** | `#154457` | Raised dark surface |
| **Accent** | `#4080BD` | Accent and buttons on light grounds |
| **Accent Dark** | `#2F6795` | Hover and pressed |
| **Accent Light** | `#7FB4E0` | Accent on dark grounds |
| **White** | `#FFFFFF` | Primary page ground |
| **Tint** | `#F0F4F8` | Tinted sections |
| **Tint 2** | `#E3EDF5` | Tinted cards |
| **Rule** | `#D5E1EB` | Hairlines |
| **Dim** | `#5A7280` | Secondary text on light |
| **Dim dark** | `#A8C3D4` | Secondary text on navy |

**On the palette.** These are Leverage Edu's own values, read from their
stylesheet. A shifted alternative was built, compared side by side, and the
founder chose theirs. The trade-dress exposure of carrying a direct
competitor's architecture *and* their exact colours was raised twice and
overruled. Recorded here so nobody later mistakes it for an accident.

**The brand blue is a surface colour, not a text colour.** `#4080BD` is 4.17:1
on white — below AA. Text and button fills on light grounds use `#2F6795`;
accents on navy use `#7FB4E0`.

### 5.1 Measured contrast

| Pair | Ratio | Grade |
|---|---|---|
| White on Navy | 13.56 | AAA |
| Navy on White | 13.56 | AAA |
| Navy on Tint | 12.27 | AAA |
| Accent light `#7FB4E0` on Navy | 6.14 | AAA |
| Accent text `#2F6795` on White | 6.01 | AAA |
| White on `#2F6795` | 6.01 | AAA |
| Dim on White | 5.06 | AA |
| **Brand blue `#4080BD` on White** | **4.17** | **FAILS for text** |
| **Brand blue `#4080BD` on Navy** | **3.25** | **FAILS** |

**Two traps, not one.** The brand blue fails as text on *both* grounds. Use it
for surfaces, rules and graphics only. Text and button fills on light take
`#2F6795`; accents on navy take `#7FB4E0`.

### 5.2 The ground, and proportion

**The site is white.** `--background` is `#FFFFFF`; navy is a band colour used
for the utility bar, the nav on dark sections, the outcome strip, the closing
CTA and the footer. The approved reference page is 11 white sections, 6 tint,
6 navy — that ratio is the spec, not an accident of one page.

This matters because the previous brand was a dark site, and a token-by-token
migration reproduces a dark site while appearing to follow every rule. If a
converted page reads mostly navy, the conversion is wrong regardless of which
tokens it uses.

White and Tint 70% · Navy 20% · blue in all three variants 8% · everything
else 2%. The accent marks one thing at a time: the primary action, the
guarantee, or the seal.

---

## 6 · Applied

### 6.1 Website

Structure follows `samples/axelis-final-navy.html`: utility ribbon, sticky white nav
with the mark and one filled CTA, claim-and-capture hero on a tint-to-white
gradient, outcome proof on an ink band, the two-pillar tile grid, programme
cards on a tinted section, guarantee block, financing table, closing CTA on
ink, footer on black.

- Cards 14px radius with a hairline; buttons and tiles 10px
- Shadows only under the hero capture card; everywhere else a hairline
- Motion: opacity and ≤8px translation, 200ms ease-out; honour `prefers-reduced-motion`
- Every fee, EMI figure and certificate ID carries tabular numerals

### 6.2 Documents and proposals

`company-docs/proposal.html` is the template. A4 portrait, 24mm margins.
Cover on Navy with the mark reversed out, a accent band at the foot, and
nothing else. Interior on white. The guarantee page carries the seal and sets
clause 4 **in full, at body size** — never in small print, because the terms
are the product.

### 6.3 Certificate and the seal

`company-docs/certificate.html`. A4 landscape, white stock, 1.4mm navy frame with
a 3.4mm accent band at the top edge. Recipient name at 900. Certificate ID
`AXC-YYYY-####` in Accent Dark. The seal sits on the signature baseline at
~34mm. Supersedes the old navy `#1F4E79` / cream `#FFF4E0` specification.

**The seal appears on exactly three things:** the programme certificate, the
signed guarantee page of a proposal, and the enrolment agreement. Nowhere else.

---

## 6.4 · The company document kit

`company-docs/` holds every printed document, all driven by one stylesheet,
`company-docs/axelis-doc.css`. Open `company-docs/index.html` for the set.

| Document | Size | File |
|---|---|---|
| Letterhead (worked example) | A4 portrait | `letterhead.html` |
| Letterhead (blank) | A4 portrait | `letterhead-blank.html` |
| Compliment slip | 210 × 99 mm | `compliment-slip.html` |
| Email signature | HTML | `email-signature.html` |
| Proposal | A4 portrait ×2 | `proposal.html` |
| Tax invoice | A4 portrait | `invoice.html` |
| Engagement letter | A4 portrait ×2 | `engagement-letter.html` |
| Certificate | A4 landscape | `certificate.html` |
| Business card | 90 × 54 mm | `business-card.html` |

**The letterhead is the master.** Its header block, the 2.6mm navy rule with
the 38mm accent segment, and the four-part legal footer appear unchanged on
every document. Change them in `axelis-doc.css` and every document changes.

**Verified company facts** — GSTIN `22AAZCA0637P1Z5`, PAN `AAZCA0637P`,
registered office B20 Vrindavan Plaza, Nehru Chowk, Bilaspur 495001, and the
IDFC FIRST bank block — are filled in throughout, recovered from invoices in
the company Drive rather than invented.

**Two things still outstanding before issue:** legal sign-off on the engagement
letter, and real programme lead names.

---

## 7 · Voice

Plain, exact, unhurried. Write like a firm that will be held to the sentence.

| Principle | Instead of | Write |
|---|---|---|
| State the term | "Get your dream admit — guaranteed!" | "If you receive no offer, clause 4 applies: 60% of the fee is returned within 30 days." |
| Number with a source | "Thousands of happy students" | "5,000+ students placed." |
| Name the limit | silence on exclusions | "The guarantee does not cover visa refusal on grounds of document fraud." |
| Respect the money | "Affordable EMI options!" | "₹2,00,000. EMI from ₹8,334 a month over 24 months." |

Indian English. Rupees as `₹2,00,000`. Dates as `20 September 2026`. Sentence
case headings. No exclamation marks in published copy. Never the words *dream,
journey, unlock, empower, seamless, hassle-free, fly*.

**Never write "guaranteed admission."** Axelis guarantees a defined remedy on a
defined failure. Write "written outcome guarantee" and link the clause. This is
a brand rule because it is also a legal one.

---

## 8 · Rollout

Nothing here has been applied to the running site.

1. **Reissue the mark** — favicons, `og-image.jpg`, email signature, social avatars
2. **Swap the token layer** — `brand-tokens.css` into `globals.css` via the migration map at the foot of that file
3. **Fonts** — Montserrat out of `layout.js`, Instrument Serif + Instrument Sans in via `next/font/google`
4. **Rebuild the homepage** to the architecture in `samples/axelis-final.html`
5. **Reissue documents** — letter, proposal, certificate
6. **Finish the copy purge** — one stale comment at `certificationPrograms.js:14`

**Open, needs the founder:** founder photo and bio; programme lead names and
credentials; confirmation that the certificate may move off navy/cream.

---

## 9 · On the architecture

The page structure is derived from Leverage Edu's — sticky nav with a dashboard
link, claim-plus-capture hero, outcome proof band, two-pillar tile grid,
programme cards, guarantee, financing, closing CTA. Layout patterns are not
protectable and this one is well-built for how Indian students actually shop.

The palette and typeface are deliberately **not** theirs. Wearing a
competitor's navy and Rubik alongside their layout would edge from convention
into trade dress, and would undo the differentiation the rest of this document
is built on. `samples/axelis-final.html` carries a comparison toggle that swaps
in Leverage's navy — that is a reference tool, not a brand option.
