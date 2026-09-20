# Brief for brand design — Axelis Overseas

**From:** the web implementation side
**Date:** 21 September 2026
**Reply needed before:** the company document kit and the brand guidelines can
be revised. Everything listed under "What I will produce" is blocked on this.

---

## What you are looking at

Axelis Overseas Education Pvt Ltd (CIN U85500CT2023PTC014913) runs two public
sites:

- **overseeducation.com** — D2C, students and parents. Next.js, live.
- **axelisoverseas.com** — B2B, partner institutions. Next.js, live.

Plus a company document kit in `docs/brand/company-docs/`: letterhead, invoice,
engagement letter, certificate, business card, compliment slip, email
signature, proposal.

The brand system exists and is partly implemented. This brief asks only for the
decisions that are still missing or contradicted, so the documents can be
finished. It does not ask you to redesign anything that is working.

---

## Already decided. Please do not reopen these

These are locked and implemented across both sites. Changing them now means
re-auditing every page, so treat them as constraints:

| Token | Value | Role |
|---|---|---|
| `--color-navy` | `#16265C` | Primary. Headings, dark surfaces. |
| `--color-axelis` | `#1D4ED8` | Accent. Links, primary buttons, rules. |
| `--accent-on-dark` | `#9EC0FF` | Accent **on dark surfaces only**. |
| `--color-dim` | `#586179` | Secondary text on light. |
| `--color-dim-dark` | `#C3CBDD` | Secondary text on dark. |
| `--color-tint` | `#F7F9FC` | Section fill. |
| `--color-tint-2` | `#EEF2F9` | Second section fill. |
| `--color-rule` | `#DDE3EE` | Hairlines, borders. |
| `--foreground` | `#1B2233` | Body text. |

Ground is **white**, not navy. `#4F80F0` is quarantined to surfaces only; it
fails as text at 3.70:1.

---

## What I need you to decide

Answer each by number. Where you have no view, say "implementer's call" and I
will decide and record it as such.

### 1. Logo sizing and clear space

There is no sizing table anywhere in the guidelines. Every surface currently
picks its own size, which is why the mark has been called too small twice.

Give me, for **mark**, **lockup** and **seal**, each in **light and dark**:

- minimum size, in px for screen and mm for print
- clear space, expressed as a multiple of some feature of the mark
- the maximum size at which the mark alone is used before the lockup takes over
- navbar, footer, favicon, app icon, OG image and document header sizes

### 2. When mark, when lockup, when seal

Section 3 of the guidelines describes rules that current usage contradicts.
Rather than police that, tell me the rule you actually want:

- Which surfaces get the **mark alone**?
- Which get the **lockup** (mark plus wordmark)?
- What is the **seal** for? It currently appears on landing pages and on the
  specimen certificate. Is it a guarantee device, a document device, or
  decorative? If it carries meaning, may it appear on marketing pages at all?

Note: `axelis-seal.svg` is drawn in `currentColor`, which does not resolve when
loaded as an image. I have produced `axelis-seal-white.svg` and
`axelis-seal-navy.svg` with the colour baked in. Confirm those two are the
sanctioned variants, or tell me the correct set.

### 3. Typography, as a scale rather than a choice

Section 4 names fonts but the sites do not implement a type system. Give me:

- the heading and body families, with weights actually licensed for web
- a type scale: display, h1, h2, h3, body-lg, body, body-sm, label, caption,
  each with size, line height, weight and letter spacing
- how it changes between mobile and desktop
- which one is used for figures and prices, and whether tabular numerals are
  required (money appears throughout and currently shifts)

If the intent is to stay on the system stack, say so plainly and I will
document that as the decision rather than a gap.

### 4. Dark surfaces, as a documented set

This is the most expensive gap. Twice this month a component written for a
light background was moved onto a dark one and kept its light tokens: the
footer, and the specimen certificate, where the programme title measured
**1.10:1** and was invisible. Both are fixed, but nothing stops it recurring.

Give me a **dark-surface palette** as a named set: background, raised surface,
primary text, secondary text, accent, hairline, and the disabled state. I will
implement it as tokens so a dark section cannot be built out of light ones.

### 5. Elevation, radius and section rhythm

Undocumented, so each page improvised. I have a working scale in
`globals.css`. Either ratify it or replace it:

- shadow steps, and what each is for
- radius steps, and what each is for
- vertical section rhythm: the spacing between sections, and how it compresses
  on mobile

### 6. The document kit, formally signed off

`SpecimenCertificate.jsx` still carries the comment *"Design is not signed off
by the founder yet."* The kit is being shown to lenders. I need a yes or a
marked-up no on each of: letterhead, invoice, engagement letter, certificate,
business card, compliment slip, email signature, proposal.

On the certificate specifically:

- Is the seal placement and size correct?
- Is the signatory block correct? It is deliberately a ruled blank, because a
  specimen carrying a plausible signature is a forgeable template. Confirm that
  reasoning holds, or tell me what an issued certificate should show instead.
- Should an issued certificate differ visually from the specimen beyond the
  watermark?

### 7. Product naming

Not strictly design, but it is a brand decision and it is currently four
systems for two products: **GAC / EPC**, **ZCF / ZTF**, the full charter names,
and "Student Plan". I have standardised customer-facing surfaces on **Global
Admissions Charter** and **Europe Public Charter**, retiring the codes from
customer view while keeping ZTF where it is contractual.

Ratify that, or give me the naming you want. A product whose name changes per
page cannot be differentiated, so this needs one answer.

### 8. B2B and D2C, one brand or two expressions

`D2C_PALETTE_SPLIT.md` documents a split. Since it was written, both sites have
converged on the same palette. Tell me whether the split still stands, and if
so what legitimately differs: palette, type, imagery, tone, or only tone.

### 9. Imagery and iconography

- Is there a photography direction, or is stock acceptable? If stock, what is
  the rule for choosing it?
- Icons are Lucide throughout. Ratify or replace.
- Flags: currently SVGs from a flag set. Confirm acceptable.
- Is there any circumstance in which emoji may be used? I have removed them
  from headings, product chips and FAQ answers on the basis that they render
  inconsistently across platforms. Confirm that is the standing rule.

---

## Two things only the founder can settle

These are on brand surfaces, so they reach you, but they are not design
questions and I will not resolve them by choosing:

**a. The visa claim.** The sites have carried 100%, 95%, and "guaranteed
results" for what appears to be one metric. `/terms-conditions` defines a
guarantee as "a specific, conditional commitment"; the FAQ contradicts it.
AgentCis records three completed cases this cycle, so a percentage may not be
expressible at all. `docs/CLAIMS_SUBSTANTIATION.md` sets out the evidence.

**b. "100% Free Service."** It appeared on `/about` beside published prices of
₹9,999 and ₹19,999. I have removed it. It needs a ruling on whether it may be
used at all, and if so with what qualification.

A third, which surfaced this week: **the charter pricing does not agree across
pages.** `/products`, which is wired to the payment gateway, says the Europe
Public Charter is ₹19,999 plus a ₹1,80,000 success fee. The FAQ said ₹10,000
plus ₹1,65,000. I have made everything match `/products` on the basis that it
is what actually bills, but someone must confirm which is contractually right.

---

## How to reply

Plain prose or a table, numbered against the sections above. Hex values,
pixel and millimetre figures, and font names with weights. Where a decision has
a reason, give the reason in one line; I will carry it into the documentation
so the next person does not reopen it.

If something is genuinely open, say so. A recorded open question is more useful
than a guess I then implement everywhere.

---

## What I will produce from your reply

Every document below is either revised or created new:

**Brand**
- `BRAND_GUIDELINES.md` — sections 3, 4, 5 and 6 rewritten against your answers
- `brand-tokens.css` — dark-surface tokens, type scale, elevation, radius
- `AXELIS_BRAND_ARTEFACT.md` — asset manifest and open items closed out
- `D2C_PALETTE_SPLIT.md` — either updated or formally retired
- `HANDOVER_BRAND_FIXES.md` — closed, with each item marked resolved or
  carried forward
- New: a logo usage sheet, and a dark-surface reference page

**Implementation**
- `src/app/globals.css` — tokens brought in line
- The document kit in `docs/brand/company-docs/`, revised to the signed-off
  design
- A contrast audit re-run across both sites against the new token set

**Company**
- A naming decision record for the two charters
- `docs/CLAIMS_SUBSTANTIATION.md` — updated with the rulings on (a) and (b)
- README or CONTRIBUTING guidance so a new component cannot be built with the
  wrong token set

Nothing in that list can be finished without the answers above, which is why
this brief exists rather than me guessing and you correcting it later.
