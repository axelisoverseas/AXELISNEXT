# Axelis Overseas — Brand Guidelines

> **Superseded on colour and typeface — 21 September 2026.**
> The palette and the Instrument Serif/Sans pairing in this document are
> retired. The live system is Lato on the `#16265C` / `#1D4ED8` palette,
> and the seal is documents-only. See `docs/brand/BRAND_DECISIONS.md`,
> which wins wherever the two disagree. Everything else here still stands.


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
| **Typefaces** | **Lato** (one family, 400 / 700 / 900) |
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
grotesque.
>
> *The audit finding stands; the conclusion drawn from it does not. Instrument
> was retired on 21 September because a second family costs a second load and
> a re-do of every heading, and differentiation by typeface was not worth that
> against a category this uniform. The differentiation now sits in the palette
> and the voice. See `BRAND_DECISIONS.md` section 3.* The palette deliberately does not differentiate: it matches
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
any typeface — the lockup carries its own lettering.

---

## 4 · Typography

> **Superseded 21 September 2026.** The Instrument Serif + Instrument Sans
> pairing described here previously is **retired**. It meant a second family,
> a second load, and re-doing every heading, for no defect it fixed. See
> `BRAND_DECISIONS.md` section 3.

**Ratified: Lato, one family.** Weights **400 / 700 / 900**, roman and italic,
loaded through `next/font/google`. SIL OFL, self-hosted at build, with a
size-adjusted fallback so there is no layout shift.

### The scale

| Role | Desktop | Mobile | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | 56 px | 36 px | 900 | 1.05 | −0.02em |
| H1 | 40 px | 30 px | 900 | 1.10 | −0.015em |
| H2 | 30 px | 24 px | 700 | 1.15 | −0.01em |
| H3 | 22 px | 20 px | 700 | 1.25 | −0.005em |
| Lead | 20 px | 18 px | 400 | 1.55 | 0 |
| Body | 17 px | 16 px | 400 | 1.65 | 0 |
| Small | 15 px | 14 px | 400 | 1.55 | 0 |
| Label / eyebrow | 12 px | 12 px | 700 | 1.4 | +0.12em, uppercase |
| Figure | inherits | inherits | 700 | 1.2 | 0 |

Body copy never exceeds **68 characters**. Lato runs small for its point size,
so **17 px body is deliberate**: 16 px reads thin at this measure.

Headings are sentence case. Emphasis inside a heading is weight, not italic,
now that the family has a real 900.

### Figures: tabular numerals are not the fix

Assumed, then measured. With Lato loaded, `1111111111` and `0000000000` both
render at **185.60 px**, and `font-variant-numeric: tabular-nums` changes
neither — **185.60 px either way**. Lato's digits already share one advance
width, so `tnum` is a no-op on this family.

The money shift is **layout, not type**. Fix it by:

- right-aligning every currency cell
- giving the column a fixed width in `ch`, so ₹9,999 and ₹2,00,000 share a box
- keeping the ₹, the digits and the commas in one non-breaking string

The token stays anyway. It costs nothing and is correct the day the family
changes.

---

## 5 · Colour

Full token layer: `brand-tokens.css`.

| Token | Hex | Role |
|---|---|---|
| **Navy** | `#16265C` | Deep ground: nav bands, footer, document covers |
| **Navy 2** | `#223273` | Raised dark surface |
| **Accent** | `#1D4ED8` | Text, links and button fills on light grounds |
| **Accent Light** | `#9EC0FF` | Accent on dark grounds |
| **Surface blue** | `#4F80F0` | Graphics, fills and rules only. Never text. |
| **White** | `#FFFFFF` | Primary page ground |
| **Ink** | `#1B2233` | Headings |
| **Dim** | `#586179` | Secondary text on light grounds |
| **Dim dark** | `#C3CBDD` | Secondary text on navy |
| **Tint** | `#F7F9FC` | Tinted sections |
| **Tint 2** | `#EEF2F9` | Tinted cards |
| **Rule** | `#DDE3EE` | Hairlines. Decorative only, never a control border. |
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
| White on Navy | 14.33 | AAA |
| Navy on White | 14.33 | AAA |
| Navy on Tint | 13.58 | AAA |
| Ink `#1B2233` on White | 15.87 | AAA |
| Accent light `#9EC0FF` on Navy | 7.80 | AAA |
| Accent `#1D4ED8` on White | 6.70 | AA |
| White on `#1D4ED8` | 6.70 | AA |
| Dim `#586179` on White | 6.17 | AA |
| Dim on Tint | 5.85 | AA |
| **Surface blue `#4F80F0` on White** | **3.70** | **FAILS for body text** |
| **Surface blue `#4F80F0` on Navy** | **3.87** | **FAILS for body text** |

**The surface blue fails as body text on both grounds.** At 3.70:1 on white
and 3.87:1 on navy it clears the 3:1 floor for large text and UI components
and nothing else, so it is bound to a token no text utility can reach. Text
and button fills on light grounds take `#1D4ED8`; accents on navy take
`#9EC0FF`.

> ### The palette is locked
>
> `#1D4ED8` is the accent. Settled 20 September 2026 and not to be revisited
> without a reason written down here. It replaced a muted steel blue that read
> flat, and the whole family moved with it — a saturated accent against the
> previous teal-ish navy clashed, so the navy, surface and on-dark values were
> re-chosen as a set and every pairing above was measured before anything
> shipped, not picked by eye.
>
> Both sites run these exact values from one token layer. If this table and a
> running site ever disagree, the site is wrong.

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
3. **Fonts** — Lato via `next/font/google`, one family (done)
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


---

## 10 · Logo sizing and clear space

*Added 21 September 2026 from `BRAND_DECISIONS.md` section 1. This table did
not exist, which is why the mark was reported as too small twice.*

**Clear space = half the mark's height**, measured on the planet disc, on all
four sides. Nothing enters it: not a badge, not a tagline, not a nav link.

### Minimums

| Asset | Screen | Print |
|---|---|---|
| Mark | 24 px | 8 mm |
| Lockup | 120 px wide | 32 mm wide |
| Seal | 96 px | 28 mm |

### Placements

| Context | Asset | Size |
|---|---|---|
| Navbar, desktop | Mark | 40 px |
| Navbar, mobile | Mark | 32 px |
| Footer | Lockup | 160 px wide |
| Favicon | Mark | 16 / 32 / 48 |
| App icon | Mark, white on navy | 180 / 192 / 512 |
| OG image 1200×630 | Lockup, white | 360 px wide, optically centred |
| Document header | Lockup | 34 mm wide |
| Certificate | Lockup | 42 mm wide |
| Business card front | Lockup | 28 mm wide |
| Email signature | Mark | 58 px |

40 px desktop is roughly 55% of a 72 px bar, which is where a mark stops
looking apologetic. 28–32 px in that bar is what produced the complaints.

**Open:** the 16 px favicon. Below ~24 px the rocket and slipstream merge and
no simplified variant has been drawn. Ship the full mark at 16 px and log it.
Do not invent a simplification in code.

### Which asset, and which file

| Asset | When |
|---|---|
| Mark | Anywhere the lockup would fall under 120 px |
| Lockup | Where the name must be read: footer, OG, document headers, cards |
| Seal | **Documents only.** Certificate, signed guarantee page, engagement signature block |

The seal is not a web device. It earns credibility by appearing only on
instruments someone signs; decorating a marketing page with it makes it a
graphic. On the web the guarantee is carried typographically with its clause
number.

**`currentColor` does not cross the `<img>` boundary.** An external SVG has no
inherited colour to resolve and falls back to black. Three files exist and the
right one must be picked per surface:

| File | Use |
|---|---|
| `axelis-seal.svg` | inline `<svg>` only |
| `axelis-seal-navy.svg` | `<img>` on light |
| `axelis-seal-white.svg` | `<img>` on navy |

---

## 11 · Dark surfaces

*Added 21 September 2026 from `BRAND_DECISIONS.md` section 4. This gap caused
two production defects.*

**Three light-palette tokens are forbidden on navy:**

| Token | On `#16265C` | |
|---|---|---|
| `--foreground` `#1B2233` | 1.11:1 | never |
| `--color-axelis` `#1D4ED8` | 2.14:1 | never |
| `--color-dim` `#586179` | 2.32:1 | never |
| `#4F80F0` | 3.87:1 | large graphics only, never text |

**The dark set:**

| Token | Hex | On navy |
|---|---|---|
| `--dark-bg` | `#16265C` | the ground |
| `--dark-surface` | `#1E3270` | 12.03:1 with white |
| `--dark-rule` | `#33437E` | hairline |
| `--dark-fg` | `#FFFFFF` | 14.33:1 AAA |
| `--dark-dim` | `#C3CBDD` | 8.80:1 AAA |
| `--dark-accent` | `#9EC0FF` | 7.80:1 AAA |
| `--dark-btn-fill` | `#FFFFFF` | fill; label in `--dark-bg` |

**Use `.on-dark`.** It remaps the four light tokens, so a component written
against a light surface and later moved onto navy inherits correct values
instead of silently keeping light ones. The guard has to be cheaper than
remembering, or nobody uses it.

Buttons on navy are **white-filled with a navy label**. `--color-axelis` as a
fill on navy is 2.14:1 against its own ground.

---

## 12 · Elevation, radius, rhythm

*Ratified as implemented, 21 September 2026. Assignment table added so pages
stop improvising.*

| Element | Radius | Elevation |
|---|---|---|
| Input, chip, badge | `sm` 6 | ring |
| Button | `md` 8 | none resting, `e-1` hover |
| Card, tile | `lg` 12 | `e-2` |
| Panel, modal, hero capture | `xl` 16 | `e-3` |
| Full-bleed media | `2xl` 24 | none |
| Document sheets (print) | 0 | none |

**Section rhythm**, desktop / mobile: major **96 / 64**, sub-section
**64 / 40**, band **48 / 32**. Grid gap **20**. One rhythm, no page-level
exceptions.

**Nothing above `2xl`.** A design needing 32 px is wrong, not the scale.

`.glass-card` was deleted on 21 September: black-alpha shadows and a dark-mode
variant from the retired brand, contradicting the navy-tinted scale. It had no
users.
