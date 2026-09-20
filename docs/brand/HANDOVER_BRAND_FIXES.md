# Handover to brand design — CLOSED

**Raised 20 September 2026. Answered 21 September in `BRAND_DECISIONS.md`.
Implemented the same day.**

Seven items went to brand design. Six are closed. One is carried forward to the
founder because it was never a design question.

---

## 1. The mark used against its own spec — CLOSED

**Answer:** the spec was wrong, not the usage. `WEB_AGENT_PROMPT.md` item 5
instructed the seal onto the homepage guarantee block and the refund page.
Brand design has **withdrawn that instruction** and restated the rule:

> The seal is **documents only**: the programme certificate, the signed
> guarantee page of a proposal, and the engagement agreement signature block.

A seal earns credibility by appearing only on instruments someone signs. On the
web the guarantee is carried typographically with the clause number.

**Implemented:** the seal has been removed from the three landing pages, where
this session had added it before the rule existed. It remains on the specimen
certificate.

## 2. No logo sizing table — CLOSED

**Answer:** clear space is **half the mark's height** on all four sides, and
there is now a full placement table.

**Implemented:**

| Surface | Was | Now |
|---|---|---|
| Navbar, desktop | 56 px | **40 px** |
| Navbar, mobile | 56 px | **32 px** |
| Footer lockup | height-driven, ~56 px tall | **160 px wide** |

The mark read small twice because 28–32 px sat in a 64–72 px bar. 40 px is
about 55% of bar height.

**Left open by design:** the 16 px favicon slot. Below ~24 px the rocket and
slipstream merge, and the simplified variant has not been drawn. The
instruction is explicit: ship the full mark at 16 px and log it, do not invent
a simplification in code. Logged here.

## 3. Colour locked, provenance changed — CLOSED

The palette stands. The two older documents have been marked superseded on
colour and typeface by brand design, so the repository no longer carries two
palettes.

## 4. Typography documented but not implemented — CLOSED

**Answer:** **Lato ratified as the single family**, 400 / 700 / 900. The
Instrument Serif + Instrument Sans pairing is **retired**: a second family for
no defect it fixes.

A full scale with line-heights and tracking is in `BRAND_DECISIONS.md` section 3.

**One finding worth keeping.** Tabular numerals were assumed to be the fix for
money columns shifting. Measured in the browser, `1111111111` and `0000000000`
both render at **185.60 px** in Lato, and `tabular-nums` changes neither — the
family's digits already share one advance width, so `tnum` is a no-op here.

The money shift is **layout, not type**: right-align the cell, fix the column
width in `ch`, keep the ₹ and digits in one non-breaking string. The token is
kept anyway, because it costs nothing and is correct the day the family changes.

**Implemented:** the dead `// Display face. Ships in one weight.` comment in
`layout.js`, left from the Instrument plan, has been removed.

## 5. Section rhythm, elevation, radius undocumented — CLOSED

**Answer: ratified as written.** The `globals.css` scale stands, including
navy-tinted alphas and hairline-as-ring-shadow, which is why nothing shifts on
hover. There is now an assignment table so pages stop improvising, and a
rhythm of 96 / 64 / 48.

**Two amendments, both implemented:**

- `.glass-card` **deleted** — black-alpha shadows and a dark-mode variant from
  the retired brand, contradicting the navy-tinted scale directly above it. It
  had zero users, so removing it was free.
- Nothing above `2xl` (24 px). A design needing 32 px is wrong, not the scale.

## 6. Two claims the brand cannot settle — CARRIED FORWARD

Still open, still not design questions. Now recorded with evidence in
`docs/CLAIMS_SUBSTANTIATION.md`:

- **The visa claim.** 100%, 95% and "guaranteed results" have all appeared for
  what looks like one metric, and `/terms-conditions` contradicts `/faq` on
  what a guarantee is.
- **"100% Free Service"** beside published prices of ₹9,999 and ₹19,999.
  Removed from `/about`; the claim needs a ruling.

Brand design's note: *"'100% Free Service' beside ₹9,999 is the one I'd fix
first — it's the contradiction a lender or consumer forum notices."*

**A third has since joined them:** charter pricing did not agree across
`/products`, the FAQ and a landing page. Everything now matches `/products`
because that is the page wired to the payment gateway, but which figure is
contractually correct still needs confirming.

## 7. Assets staged in both repos — CLOSED

Confirmed, plus a new rule that came out of implementation.

**`currentColor` does not cross the `<img>` boundary.** An external SVG has no
inherited colour to resolve, so it falls back to black. This is expected
behaviour, not a defect in the artwork, and it silently affected every seal on
the site.

Three files, and the right one must be chosen per surface:

| File | Use |
|---|---|
| `axelis-seal.svg` | `currentColor` — **inline `<svg>` only** |
| `axelis-seal-navy.svg` | flat navy — `<img>` on light |
| `axelis-seal-white.svg` | flat white — `<img>` on navy |

The same pattern already applies to the lockup and the mark.

---

## What came out of this that nobody asked for

The most expensive item was not on the original list. Twice this month a
component written for a light surface was moved onto a dark one and kept its
light tokens: the footer, and the specimen certificate, where the programme
title measured **1.10:1** and the anti-forgery watermark did not render at all.

Brand design's section 4 names a dark-surface set, and it is now implemented as
first-class tokens plus an `.on-dark` class that remaps the four light tokens.
A component moved onto navy inherits correct values instead of silently keeping
light ones.

That guard is the single most useful thing in this round, because it is the one
item that stops the defect recurring rather than fixing an instance of it.
