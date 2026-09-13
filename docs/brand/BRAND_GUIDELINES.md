# Axelis Overseas — Brand Guidelines

**Version 1.0 · 13 September 2026 · Owner: Rishabh Agrawal**

This document governs how Axelis looks and sounds — in written documents, in
PDFs sent to students and lenders, and on overseeducation.com. Where this
document and an existing asset disagree, this document wins and the asset gets
reissued.

Decisions taken to write it: the mark is open to redesign; the positioning is
**three end-to-end concierge programmes**; the Bajaj Finserv review is not a
constraint on the design.

---

## 0 · Why the current brand is being replaced

Not taste. Four findings from an audit of the live codebase.

**0.1 — There are five unrelated colour systems in production.**

| System | Colours | Where |
|---|---|---|
| Logo | `#ffde59` highlighter yellow | `1yellow svg logoaxelis.svg`, 25 uses in `src/` |
| Storm / Dawn | `#0C0A09` `#F59E0B` `#FBBF24` | `globals.css`, nav, footer, homepage |
| Certificate | `#1F4E79` navy + `#FFF4E0` cream | `TODO_FROM_FOUNDER.md` §4 |
| Stray blues | `#4C9DF0` `#1B365D` `#172A7E` `#3590f3` | scattered components |
| Indigo / cyan | `#4f46e5` `#22d3ee` | border-beam effects |

A student who sees an Instagram post, a fee PDF and the website sees three
different companies.

**0.2 — The documented theme and the shipped theme disagree.**
`HANDOVER_NEXT_SESSION.md` §1 records a "white/neutral theme" as live. The code
says otherwise: `globals.css` sets `--background: #0C0A09`, and `Navbar.jsx`,
`Footer.jsx` and `page.jsx` all paint `--storm-deep`. The site is near-black.
Whatever ships next, this gap gets closed in writing.

**0.3 — The mark is the category cliché.** A rocket orbiting a planet is the
single most-used metaphor in study-abroad marketing, alongside the globe, the
aeroplane and the graduation cap. At 512px it reads as clip-art; at 32px the
rocket and the ring merge into a smudge.

**0.4 — The colour is wrong for the price.** Highlighter yellow is the colour of
discounts, warnings and highlighter pens. Axelis now sells three programmes at
₹2,00,000–₹3,00,000 with a written outcome guarantee. Nothing in the current
palette carries that weight.

---

## 1 · The category, measured

Palettes pulled from the homepage stylesheets of the firms Axelis is compared
to, on 13 September 2026. **Method and its limits:** hex values were read out of
each homepage's served HTML and inline CSS — it catches what a homepage paints,
and misses colours declared only in external stylesheets. Three firms returned
nothing usable and are not in the table: Crimson Education and Julius Baer
(both served an error or app shell), and Shiksha Study Abroad (no response).
Nine firms is a sample of the category, not a census.

| Firm | Primary | Secondary |
|---|---|---|
| IDP Education | `#28558C` navy | `#0B6FE3` blue |
| Leverage Edu | `#0E3240` teal-navy | `#4080BD` blue |
| Collegify | `#061421` navy | `#153DD1` blue · `#FFD000` yellow |
| AECC Global | `#715AE6` violet | `#FDC700` yellow |
| Edvoy | `#9317CE` purple | `#FF3D53` red |
| GradRight | `#782BFF` violet | `#2F6BE3` blue |
| Yocket | `#E37712` orange | `#2B3340` slate |
| upGrad Abroad | `#B86E00` amber | `#FFEACB` cream |
| Hale Education | `#1B365D` navy | `#EDE9E4` warm paper |

Across all nine, the primary is **blue, violet, or orange**.

Two consequences. First, the current amber-and-yellow direction is not
differentiated — upGrad Abroad already owns amber-on-cream and Yocket owns
orange. Second, the open lane is the one nobody in the sample is standing in: **deep
green, on paper, set quietly.** None of the nine uses green as a primary — a
finding about these nine firms, not proof that no Indian study-abroad firm
anywhere uses green.

The category also shares a manner: exclamation marks, gradients, "Dream. Apply.
Fly.", stock photography of students with backpacks against skylines. A firm
selling three programmes at ₹2L+ with a refund clause cannot sound like that
and be believed.

---

## 2 · Positioning and the brand idea

**Positioning line (approved 13 Sep 2026):**

> Three end-to-end concierge programmes. A written outcome guarantee.

**Supporting line, for places that need one sentence more:**

> Axelis takes a small number of students end to end — application to admission
> — under terms that are written down, including what happens if we fail.

**The brand idea: the written word.**

Axelis's actual product differentiator is not the counselling. It is that the
outcome, and the refund if the outcome fails, exist as a document a student can
hold. Competitors promise; Axelis signs. Every brand decision below follows
from that one fact.

So the brand should look like **a serious document** — a charter, a deed, an
instrument — and not like a consumer app. That is the strategy in one line: the
category looks like software; Axelis looks like paper.

**What this rules out, permanently:**

- Globes, aeroplanes, passports, graduation caps, rockets, planets, world maps
- Gradient buttons, glow effects, pill shapes, floating 3D objects
- Exclamation marks in any published copy
- The words *dream, journey, unlock, empower, seamless, hassle-free, fly*
- Stock photography of students with backpacks

**On the old positioning copy.** "16 certification programmes", "four tiers"
and "₹4,000 to ₹3,00,000" were live across nine files as of
`HANDOVER_NEXT_SESSION.md` §3. Checked again on 13 September 2026: commits
`e7db572` and `a4b5144` cleared them. What remains is a stale header comment at
`src/data/certificationPrograms.js:14` ("16 programmes, 4 tiers"). The
"Sixteen weeks" in two programme descriptions is a real duration, not stale
positioning — leave it.

---

## 3 · Voice

**Plain, exact, unhurried.** Write like a firm that will be held to the
sentence.

| Principle | Instead of | Write |
|---|---|---|
| State the term | "Get your dream admit — guaranteed!" | "If you receive no offer, clause 4 applies: 60% of the fee is returned within 30 days." |
| Number with a source | "Thousands of happy students" | "5,000+ students placed." |
| Name the limit | silence on what is excluded | "The guarantee does not cover visa refusal on grounds of document fraud." |
| No hedging | "We strive to ensure…" | "We do this. If we don't, here's what you get." |
| Respect the reader's money | "Affordable EMI options!" | "₹2,00,000. EMI from ₹8,334/month over 24 months." |

**Mechanics.** Indian English. Rupees as `₹2,00,000` — Indian digit grouping, no
space after the symbol. Dates as `13 September 2026`. Percentages as figures.
Sentence case for all headings, including web. The Oxford comma. Never a
double exclamation, never an emoji in a published document.

**On the guarantee specifically.** Never write "guaranteed admission" — Axelis
does not guarantee admission, it guarantees a defined remedy on a defined
failure. Write "written outcome guarantee" and link to the clause. This is a
brand rule because it is also a legal one.

---

## 4 · The mark

### 4.1 The Axial A

The mark is the letter **A**, drawn with two departures from a normal A:

1. **The right stroke is inclined 23.4° from vertical** — the Earth's axial
   tilt. Studying abroad is in the mark without a globe in it. *Axelis* shares
   a root with *axis*; the mark says so.
2. **The crossbar extends past both legs as a full rule** — the line a document
   is signed on.

Files: `assets/axelis-mark.svg` (axis green), `axelis-mark-brass.svg` (on dark),
`axelis-mark-mono.svg` (inherits `currentColor`).

It survives at 16px, which the current mark does not, and it is a shape no
competitor in §1 can also own.

### 4.2 The lockup

Mark left, wordmark right, optically centred on the crossbar rule.

- **Wordmark:** `AXELIS OVERSEAS` set in **Source Serif 4 SemiBold**, all caps,
  letter-spaced **+0.08em**.
- **Mark height = cap height × 1.9.**
- **Gap between mark and wordmark = 0.75 × cap height.**
- **Clear space on all four sides = the height of the letter A in the wordmark.**
  Nothing enters it — no badge, no tagline, no accreditation logo.
- **Minimum sizes:** lockup 120px wide on screen, 32mm in print. Below that,
  mark alone.

### 4.3 The seal

`assets/axelis-seal.svg` — the mark inside a double rule, with
`AXELIS OVERSEAS · WRITTEN OUTCOME GUARANTEE` on the circular path and the
certificate ID beneath in IBM Plex Mono.

**The seal is not a logo and is not decoration.** It appears on exactly three
things: the programme certificate, the signed guarantee page of a proposal PDF,
and the enrolment agreement. Using it anywhere else spends the one asset that
makes the guarantee feel real.

### 4.4 Misuse

Do not: recolour outside the palette · rotate · add a shadow, glow or bevel ·
stretch · place on a busy photograph · outline it · animate the tilt · set the
wordmark in any other typeface · reintroduce the planet alongside it.

---

## 5 · Colour

Full token layer with measured contrast: `brand-tokens.css`.

### 5.1 The palette

The reference is **greenbar ledger paper** — the faintly green accounting stock
that figures have been ruled onto for a century. It gives the page a ground that
is warm enough to read long-form on, cool enough not to look like a wedding
invitation, and it is the same hue family as the brand green, so ink and paper
belong to one another.

| Token | Hex | Role |
|---|---|---|
| **Axis** | `#12463A` | Primary brand green. Logo, primary buttons, headings on paper. |
| **Field** | `#0B2B23` | Deep surface. Footer, dark sections, PDF covers. |
| **Ink** | `#101A16` | Body text on light. The darkest value. |
| **Bone** | `#F1F3EE` | The page. Greenbar-ledger off-white — never `#FFFFFF` on screen. |
| **Bone Deep** | `#E2E8DE` | Cards, table stripes, quiet panels. |
| **Rule** | `#C8D1C6` | Hairlines, dividers, table borders. |
| **Brass** | `#B0862F` | Accent, on dark grounds only. |
| **Brass Deep** | `#7E5C1C` | Accent text on light grounds. |
| **Gold** | `#D9B166` | Accent text on dark grounds. |
| **Oxblood** | `#8A2B22` | Errors, refusals, refund denials. Nothing else. |
| **Muted** | `#5F6660` | Secondary text, captions, metadata. |

**Where the yellow went.** The existing `#ffde59` is not deleted, it is
promoted: the same warm thread survives as **brass**, a metal rather than a
highlighter. Continuity for anyone who knows the old logo; a different price
bracket to everyone who doesn't.

### 5.2 Measured contrast

Every pair below was computed, not estimated:

| Pair | Ratio | Grade |
|---|---|---|
| Ink on Bone | 15.91 | AAA |
| Axis on Bone | 9.58 | AAA |
| Bone on Field | 13.58 | AAA |
| Gold on Field | 7.54 | AAA |
| Brass Deep on Bone | 5.47 | AA |
| Brass on Ink | 5.33 | AA |
| Oxblood on Bone | 7.67 | AAA |
| Muted on Bone | 5.29 | AA |

**Brass `#B0862F` on Bone is 2.98:1 and fails.** For accent text on a light
ground, always Brass Deep `#7E5C1C`. This is the one trap in the palette.

### 5.3 Proportion — the 60/30/8/2 rule

Bone 60% · Axis and Field 30% · Bone Deep and Rule 8% · **Brass 2%**.

Brass is scarce on purpose. On a given page it marks *one* thing: the
guarantee, the seal, or the single primary action. A page with brass in four
places has no accent at all.

---

## 6 · Typography

Three families, all open-licensed, all available in Google Docs, Google Fonts,
Adobe Fonts and on the web. No licensing cost, no fallback drift between the
website and a PDF.

| Role | Family | Use |
|---|---|---|
| **Display** | **Source Serif 4** | Headings, pull quotes, the wordmark, PDF covers. SemiBold 600 for headings; Regular 400 italic for quotes. |
| **Text & UI** | **IBM Plex Sans** | Body copy, navigation, forms, tables, labels. Also carries Devanagari if Hindi is ever needed. |
| **Figures** | **IBM Plex Mono** | Fees, EMI tenures, certificate IDs (`AXC-2026-0001`), policy clause numbers, dates in tables. |

**Montserrat is retired.** It is currently the only font in the app
(`layout.js:1`) and is the default typeface of the Indian education category.

**Why mono for money.** Setting `₹2,00,000` and `AXC-2026-0001` in a monospace
face makes them read as figures on an instrument rather than marketing numbers.
It is a small thing that does more for credibility than any badge. Always with
`font-variant-numeric: tabular-nums` so rupee columns align.

**Scale.** 1.250 major third, fluid, defined in `brand-tokens.css`.
**Body copy is never wider than 62 characters.** Line height 1.6 for body, 1.12
for display. Headings in sentence case, never all-caps except the wordmark.

---

## 7 · Applied — documents, PDFs, certificate, website

### 7.1 Letter and proposal documents (Docs / Word)

A4, margins 25mm, single column, body IBM Plex Sans 10.5pt / 1.55.
Lockup top-left at 32mm wide; a Rule hairline 8mm beneath it; nothing else in
the header. Footer in Muted 8pt: entity name, `overseeducation.com`,
`axelisoverseas@overseeducation.com`, page `n/N` in IBM Plex Mono.
Headings Source Serif 4 SemiBold in Axis. Tables: no vertical borders, no fill
except Bone Deep on alternate rows, Rule hairlines horizontally, figures right-
aligned in IBM Plex Mono.

### 7.2 PDFs sent to students or lenders

Cover: Field ground, lockup in brass reversed out, title in Source Serif 4 at
`--step-4`, and **nothing else** — no photograph, no gradient. Interior pages
revert to Bone. Any page stating the guarantee carries the seal at 28mm,
bottom-right. Fees always in IBM Plex Mono. Every PDF ends with a terms page
naming the refund clause, in full, in Ink at body size — never in small print,
because the terms are the product.

### 7.3 The certificate

Supersedes the navy `#1F4E79` / cream `#FFF4E0` specification in
`TODO_FROM_FOUNDER.md` §4 — that was drawn from the old palette and no longer
belongs to a system.

A4 landscape, `#FFFFFF` stock (print is the one place pure white is correct).
A 6mm Axis rule inset 12mm from the trim on all four sides. Recipient name in
Source Serif 4 Regular at 36pt, Ink. Programme name in Axis SemiBold. The seal
at 34mm, bottom-centre-right. Certificate ID `AXC-YYYY-####` in IBM Plex Mono
10pt, Brass Deep, bottom-left, with the verification URL beneath it. Two
signature rules: founder, and programme lead.

### 7.4 Website

The site is currently near-black with amber accents. The target is **Bone,
with Field used deliberately per section** — an inversion of what ships today.

- Page ground Bone. Body Ink. Headings Axis.
- Footer, hero and one or two considered sections take `.on-field`.
- Primary button: Axis ground, Bone label, 4px radius. Hover: Axis Lift. **No
  gradient** — `Navbar.jsx` currently gradients storm-accent into dawn-glow on
  two CTAs (desktop bar and mobile drawer); both go.
- Cards: Bone Deep with a Rule hairline. **Hairlines, not shadows.** The
  `glass-card`, `bb-ring` border-beam and background-blob animations in
  `globals.css` are all retired; they belong to the software category, not this
  one.
- Radius never exceeds 6px. No pills.
- Motion: opacity and ≤8px translation, 200ms, ease-out. Nothing floats,
  pulses, or orbits. Honour `prefers-reduced-motion`.
- Fees, EMI figures and certificate IDs in IBM Plex Mono, tabular.

### 7.5 Photography and imagery

**Permitted:** real documents and signed pages; hands, desks, pens, paper;
university architecture shot straight-on in flat daylight; the Bengaluru and
Bilaspur offices; real students, named, with consent, photographed as portraits
rather than as lifestyle.

**Not permitted:** stock photography of any kind; backpacks-against-a-skyline;
aeroplane windows; graduation-cap tosses; flag collages; anyone jumping.

Treatment: no filters, no duotone, no colour overlay. If an image needs a
gradient scrim to carry text, use a different image.

### 7.6 Social and OG

Bone or Field ground, lockup, one sentence set in Source Serif 4, generous
margin. No photograph behind text. No more than one brass element. The current
`og-image.jpg` is reissued against this spec.

---

## 8 · Rollout

Nothing here has been applied to the running site. Order of work, cheapest and
most visible first:

1. **Reissue the mark** — lockup, favicon set, `og-image.jpg`, email signature,
   Instagram and YouTube avatars. One day's work, changes every impression.
2. **Finish the positioning-copy purge** — largely done by `e7db572` and
   `a4b5144`; one stale comment left at `certificationPrograms.js:14`.
3. **Swap the token layer** — `brand-tokens.css` into `globals.css` using the
   migration map at the foot of that file. Expect the stray blues and the
   indigo/cyan beam effects to surface as visual breakage; that is the point.
4. **Fonts** — Montserrat out, Source Serif 4 + IBM Plex Sans + Mono in, via
   `next/font/google` in `layout.js`.
5. **Invert the theme** — Bone ground, `.on-field` sections. Largest job;
   Navbar, Footer, homepage hero, certifications pages.
6. **Reissue the document templates** — letter, proposal, certificate.

**Open, needs the founder:**

- Founder photo and bio; programme lead names and credentials
  (`TODO_FROM_FOUNDER.md` §4) — the concierge positioning is unprovable without
  named people behind it.
- Confirmation that the certificate may move off navy/cream (§7.3).
- Whether Hindi/Devanagari is ever needed — it decides nothing today, but it is
  why IBM Plex Sans was chosen over the alternatives.
