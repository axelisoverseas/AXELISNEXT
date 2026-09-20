# Brand decisions — answers to the implementation brief

**21 September 2026.** Numbered against the brief. Every contrast figure was
computed against the locked palette, not estimated. Where something is genuinely
open it says so.

**Palette taken as locked and used throughout:** `--color-navy #16265C`,
`--color-axelis #1D4ED8`, `--accent-on-dark #9EC0FF`, `--color-dim #586179`,
`--color-dim-dark #C3CBDD`, `--color-tint #F7F9FC`, `--color-rule #DDE3EE`,
`--foreground #1B2233`, `#4F80F0` surfaces-only.

> This supersedes the palette in `BRAND_GUIDELINES.md` §5 and
> `AXELIS_BRAND_ARTEFACT.md` §1, which still carry the earlier `#0E3240`
> family. Those two documents are now wrong on colour and right on everything
> else. Fix them or delete their colour tables — do not leave two palettes in
> the repo.

---

## 1 · Logo sizing and clear space

**Clear space** = **½ the mark's height**, measured on the planet disc, on all
four sides. One rule, scales everywhere, easy to check by eye. Nothing enters
it — not a badge, not a tagline, not a nav link.

**Minimum sizes**

| Asset | Screen min | Print min |
|---|---|---|
| Mark | 24 px | 8 mm |
| Lockup | 120 px wide | 32 mm wide |
| Seal | 96 px | 28 mm |

Below 24 px the mark is a favicon problem, not a logo placement — see the note
at the end of this item.

**Specific placements**

| Context | Asset | Size |
|---|---|---|
| Navbar, desktop | Mark | **40 px** |
| Navbar, mobile | Mark | **32 px** |
| Footer | Lockup | **160 px** wide |
| Favicon | Mark | 16 / 32 / 48 |
| App icon (apple-touch, android) | Mark, white on navy | 180 / 192 / 512 |
| OG image 1200×630 | Lockup, white | **360 px** wide, optically centred |
| Document header (letterhead, invoice, engagement) | Lockup | **34 mm** wide |
| Certificate | Lockup | **42 mm** wide |
| Business card front | Lockup | **28 mm** wide |
| Email signature | Mark | **58 px** |

The mark has read small twice because 28–32 px was being used where the nav bar
is 64–72 px tall. **40 px desktop** is the fix; it sits at roughly 55% of bar
height, which is where a mark stops looking apologetic.

**Light and dark** — identical geometry, different file. `-navy` on white and
tint, `-white` on navy. Never recolour in CSS; see item 2.

**The 16 px slot is still open.** Below ~24 px the rocket and the slipstream
merge. A simplified variant — planet and slipstream, rocket dropped — has not
been drawn. Ship the full mark at 16 px and log it; do not invent a
simplification in code.

---

## 2 · Mark, lockup, seal — and the seal's real job

**Mark** — anywhere the lockup would fall under 120 px: navbar, favicon, app
icon, avatars, email signature, any square crop.

**Lockup** — first-impression surfaces where the name must be read: footer, OG
image, document headers, cover pages, business card, presentation title slides.

**Seal — documents only. Three uses, and the web is not one of them.**

1. The programme certificate
2. The signed guarantee page of a proposal
3. The engagement / enrolment agreement signature block

**This corrects my own earlier instruction.** `WEB_AGENT_PROMPT.md` item 5 told
you to place the seal on the homepage guarantee block and on
`/policies/cancellation-refund`. That was wrong and it is the contradiction you
found. A seal earns its credibility by appearing only on instruments someone
signs; the moment it decorates a marketing page it is a graphic. On the web the
guarantee gets typographic treatment and the clause number — `§4.2` — not the
seal.

**Your white and navy seal variants are sanctioned.** `currentColor` does not
cross the `<img>` boundary — an external SVG has no inherited colour to
resolve, so it falls back to black. That is expected behaviour, not a bug in
the asset. Keep three files:

- `axelis-seal.svg` — `currentColor`, for **inline** `<svg>` only
- `axelis-seal-navy.svg` — flat, for `<img>` on light
- `axelis-seal-white.svg` — flat, for `<img>` on navy

Same pattern already applies to the lockup, and for the same reason.

---

## 3 · Typography

**Ratified: Lato, single family.** Weights **400 / 700 / 900**, roman and
italic, via `next/font/google` — SIL OFL, self-hosted at build, size-adjusted
fallback so there is no CLS. It is already implemented and there is no measured
gap it fails to cover.

> This retires the Instrument Serif + Instrument Sans pairing named in
> `BRAND_GUIDELINES.md` §4. Adding a display serif now means a second family, a
> second load, and a re-do of every heading for no defect it fixes. Delete the
> Instrument references so the repo carries one answer.
>
> There is a dead comment in `layout.js` above the metadata block — *"Display
> face. Ships in one weight."* — left from that plan. Remove it.

**Scale.** Desktop / mobile, line-height, tracking:

| Role | Desktop | Mobile | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | 56 px | 36 px | 900 | 1.05 | −0.02em |
| H1 | 40 px | 30 px | 900 | 1.10 | −0.015em |
| H2 | 30 px | 24 px | 700 | 1.15 | −0.01em |
| H3 | 22 px | 20 px | 700 | 1.25 | −0.005em |
| Lead | 20 px | 18 px | 400 | 1.55 | 0 |
| Body | 17 px | 16 px | 400 | 1.65 | 0 |
| Small | 15 px | 14 px | 400 | 1.55 | 0 |
| Label / eyebrow | 12 px | 12 px | 700 | 1.4 | **+0.12em**, uppercase |
| Figure | inherits | inherits | 700 | 1.2 | 0 |

Body copy never exceeds **68 characters**. Lato runs small for its point size —
17 px body is deliberate, not a typo; 16 px reads thin at this measure.

**Figures — tabular numerals are not the fix, and here is why.**

Measured in the browser with Lato loaded: `1111111111` and `0000000000` both
render at **185.60 px**, and `font-variant-numeric: tabular-nums` changes
nothing — **185.60 px either way**. Lato's digits already share one advance
width; the `tnum` feature is a no-op on this family.

So the money shift is **layout, not type**. Fix it by:

- right-aligning every currency cell (`text-align: right`)
- giving the column a fixed width in `ch` so ₹9,999 and ₹2,00,000 share a box
- keeping the ₹, the digits and the commas in one non-breaking string

Keep `font-variant-numeric: tabular-nums` in the token anyway — it costs
nothing and it is correct the day the family changes.

---

## 4 · The dark surface set

This is the expensive gap and it now has names. **On a navy ground, three
tokens in the light palette are forbidden** — this is what produced the 1.10:1
certificate title:

| Token | On `#16265C` | Verdict |
|---|---|---|
| `--foreground` `#1B2233` | **1.11:1** | never |
| `--color-axelis` `#1D4ED8` | **2.14:1** | never |
| `--color-dim` `#586179` | **2.32:1** | never |
| `#4F80F0` | 3.87:1 | large graphics only, never text |

**The dark set — add these as first-class tokens:**

| Token | Hex | On navy | Use |
|---|---|---|---|
| `--dark-bg` | `#16265C` | — | The ground |
| `--dark-surface` | `#1E3270` | 12.03:1 with white | Raised card on navy |
| `--dark-rule` | `#33437E` | 1.53:1 | Hairlines on navy |
| `--dark-fg` | `#FFFFFF` | **14.33:1** AAA | Primary text |
| `--dark-dim` | `#C3CBDD` | **8.80:1** AAA | Secondary text |
| `--dark-accent` | `#9EC0FF` | **7.80:1** AAA | Links, accents, focus |
| `--dark-btn-fill` | `#FFFFFF` | — | Button fill; label in `#16265C` |

**Enforcement, so this cannot recur.** Any component that can render on navy
declares the pair explicitly rather than inheriting. A `.on-dark` class that
remaps `--foreground → var(--dark-fg)`, `--color-dim → var(--dark-dim)`,
`--color-axelis → var(--dark-accent)`, `--color-rule → var(--dark-rule)` is the
cheapest guard — then a component moved onto navy inherits correct values
instead of silently keeping light ones.

Buttons on navy: **white fill, navy label**. Do not use `--color-axelis` as a
fill on navy — 2.14:1 against its own ground.

---

## 5 · Elevation, radius, rhythm

**Ratified as written in `globals.css`.** The scale there is good work and
replacing it would be churn:

- `--shadow-ring` / `--shadow-e-1` / `-e-2` / `-e-3` / `-e-lift`
- `--radius-xs 4` / `sm 6` / `md 8` / `lg 12` / `xl 16` / `2xl 24`

Navy-tinted alphas at 4–7% and a hairline drawn as a ring shadow rather than a
border are both right — a ring costs no layout size, which is why nothing shifts
on hover.

**Assignment, so pages stop improvising:**

| Element | Radius | Elevation |
|---|---|---|
| Input, chip, badge | `sm` 6 | ring |
| Button | `md` 8 | none resting, `e-1` hover |
| Card, tile | `lg` 12 | `e-2` |
| Panel, modal, hero capture | `xl` 16 | `e-3` |
| Full-bleed media | `2xl` 24 | none |
| Document sheets (print) | 0 | none |

**Section rhythm** — vertical padding, desktop / mobile: major section
**96 / 64 px**, sub-section **64 / 40 px**, band (nav, footer, CTA strip)
**48 / 32 px**. Gap between cards in a grid: **20 px**. One rhythm, no page-level
exceptions.

**Two amendments:**

1. **Delete `.glass-card`** (globals.css ~line 228). Black-alpha shadows and a
   dark-mode variant, both from the retired brand. It contradicts the navy-tinted
   scale directly above it.
2. Radius above `2xl` is not in the system. If a design needs 32 px, the design
   is wrong, not the scale.

---

## 6 · Document kit sign-off

**Design conformance: signed off on all eight**, with the marked-up items
below. To be exact about what that means — I can sign off that a document
conforms to the brand system. **Only the founder can sign off a document as
issuable by the company**, because that is a commercial and legal act. Those
are two different approvals and the kit needs both.

| # | Document | Design | Marked up |
|---|---|---|---|
| 1 | Letterhead | ✅ | — |
| 2 | Letterhead, blank | ✅ | — |
| 3 | Compliment slip | ✅ | — |
| 4 | Email signature | ✅ | — |
| 5 | Proposal | ✅ | Clause 4 must stay at body size; never reduce it to fit a page |
| 6 | Tax invoice | ✅ | Bank block stays a placeholder in the repo (see the security commit) |
| 7 | Engagement letter | ⚠️ | Design fine. **Blocked on counsel** for clauses 5–7 — not a design hold |
| 8 | Certificate | ✅ | Two changes below |
| 9 | Business card | ✅ | — |

**Certificate — seal placement.** Correct as drawn: on the signature baseline,
right of the two rules, 34 mm. It reads as countersigning the signatures rather
than decorating the sheet.

**Certificate — the blank signatory block holds. Ratified, and for the reason
you gave.** A specimen carrying a plausible signature is a forgeable template;
anyone who lifts the PDF has a signed-looking artefact. Keep the rules empty.

**But remove the sign-off note from `SpecimenCertificate.jsx`.** *"Design is not
signed off by the founder yet"* is an internal status leaking onto a lender-facing
page, and it undermines the document it sits on. Replace it with a standing
specimen mark that is honest and permanent:

> **SPECIMEN** — layout and security features only. Not a valid certificate.
> Issued certificates carry a unique ID verifiable at overseeducation.com/verify.

Set it in `--color-dim`, 12 px, uppercase label style, directly under the sheet.
That line can stay forever, which is the point — the current note implies it
will be removed, and nobody will remember to.

---

## 7 · Product naming

**Convention ratified. The names themselves are not mine to ratify.**

The convention — one noun phrase, "Charter" as the product-class suffix, two
products, no sub-brands — is correct and I would keep it. Standardising four
systems down to one was the right call regardless of which names win.

**But the specific names are a commercial decision, and the record disagrees
with itself.** The catalogue in this repo has carried *Global Career Launch*,
*PhD & Fellowship Concierge*, *Executive MBA Concierge*, and separately a *ZTF
Charter* at ₹19,999. Your *Global Admissions Charter* / *Europe Public Charter*
are a fifth naming. I cannot tell from here which pair is contractually live,
and naming a product wrong on a page wired to a payment gateway is not a design
error, it is a mis-sold service.

**Open — founder.** Use your two names consistently everywhere in the meantime;
consistency is recoverable, a wrong name on an invoice is not.

---

## 8 · B2B vs D2C split

**Retire `D2C_PALETTE_SPLIT.md`.** It was a work-allocation device for two
machines converting in parallel, not a brand rule, and if both sites have
converged it is now a document describing a state that no longer exists —
exactly the kind of file that misleads someone in three months.

**The brand is one.** Same palette, same type scale, same asset manifest, same
certification set on both properties. The only legitimate differences are
content and proof: B2B leads with partner economics and carries partner badges;
D2C leads with the guarantee and carries student proof. Nothing in the visual
system forks.

Delete the file, or replace its body with one line pointing at this document.

---

## 9 · Imagery and icons

**Icons — Lucide, ratified.** One set, `currentColor`, **1.5 px stroke**, sized
16 / 20 / 24 only. Never two icon sets; never an icon inside a sentence.

**Flags — a real flag set, never emoji.** Emoji flags do not render on Windows
Chrome at all, which is a large share of Indian desktop traffic, and they fall
back to two-letter boxes. Use the SVG flag set already in `public/flags` at a
fixed 20 × 15, with a 1 px `--color-rule` hairline so white flags stay visible.

**Emoji — never in product UI, navigation, documents, invoices, certificates,
error states or email templates. Your removal is ratified.** They are
platform-dependent, they break in PDFs, and they read as unserious next to a
₹3,00,000 fee and a refund clause. The one place they are acceptable is an
informal social caption written by a human, which is outside this system.

**Photography direction.**

- **Permitted:** real documents and signed pages; hands, desks, pens, paper;
  university architecture shot straight-on in flat daylight; the Bengaluru and
  Bilaspur offices; real students, named, with written consent, photographed as
  portraits.
- **Not permitted:** stock photography of any kind; backpacks against skylines;
  aeroplane windows; graduation-cap tosses; flag collages; anyone jumping.
- **Treatment:** no filters, no duotone, no colour overlay. If an image needs a
  gradient scrim to carry text, use a different image.
- **Consent is a hard gate.** A named student's face needs written permission on
  file. No permission, no photograph — a stock face is not a substitute, it is
  the thing this direction exists to prevent.

---

## Open — founder, not design

Recorded rather than guessed. All three are claims or prices, and a designer
guessing at them creates liability.

1. **The visa claim.** 100% / 95% / "guaranteed results" appear against one
   metric, and the FAQ contradicts the Terms. Pick one number, source it, and
   make every surface match — then the Terms and the FAQ get edited together, not
   separately.
2. **"100% Free Service"** sits beside published ₹9,999 and ₹19,999 prices.
   Those cannot both be true on the same site. This is the one I would fix first;
   it is the kind of contradiction a lender or a consumer forum notices.
3. **Charter pricing disagrees across pages.** Matching everything to `/products`
   because it is gateway-wired was the right call under uncertainty — the page
   that takes money should win a tie. But someone must confirm those are the
   contractually correct figures, because that page is now the source of truth by
   default rather than by decision.

---

## Corrections this document makes to earlier brand docs

So nobody has to reconcile them:

1. **Palette** — `BRAND_GUIDELINES.md` §5 and `AXELIS_BRAND_ARTEFACT.md` §1
   carry the retired `#0E3240` family. Superseded by the locked palette above.
2. **Typeface** — the Instrument Serif + Sans pairing is retired in favour of
   Lato. Both documents still name it.
3. **Seal placement** — `WEB_AGENT_PROMPT.md` item 5 put the seal on the
   homepage and the refund policy page. Withdrawn; documents only.
