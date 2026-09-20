# Axelis Overseas — brand artefact

**v4.1 · 20 September 2026 · the single source of truth**

Supersedes nothing in `BRAND_GUIDELINES.md` — that stays the full spec. This
document is the operational layer: what the brand *is* in one page, what the
two live sites actually serve today, and exactly which assets are missing.

Two properties carry this brand:

| Domain | Audience | Stack | State |
|---|---|---|---|
| `overseeducation.com` | D2C students | Next.js, `AXELISNEXT` | New brand partially live |
| `axelisoverseas.com` | B2B partners | Separate Next.js app | **Still on the old brand** |

---

## 1 · The brand in one page

**Positioning.** Three end-to-end concierge programmes. A written outcome
guarantee. Never "guaranteed admission" — it is a defined remedy on a defined
failure, and the clause number goes with the claim.

**Logo.** The founder's own artwork. Never redrawn, never re-traced.

| File | Use |
|---|---|
| `axelis-lockup-navy.svg` | Full lockup on white and tint |
| `axelis-lockup-white.svg` | Full lockup on navy |
| `axelis-mark-navy.svg` | Mark alone — nav, favicon, small sizes on light |
| `axelis-mark-white.svg` | Mark alone on navy |
| `axelis-seal-navy.svg` | Guarantee seal — certificates and signed pages only |

**Typefaces.** Both Google Fonts, nothing to licence.

- **Instrument Serif** 400 + italic — display, headings, wordmark, pull quotes.
  One weight only; emphasis is *italic*, never a heavier weight.
- **Instrument Sans** 400/500/600/700 — body, nav, labels, tables, figures.

**Colour.**

| Token | Hex | Role |
|---|---|---|
| Navy | `#0E3240` | Bands: nav, footer, dark sections, document covers |
| Navy 2 | `#154457` | Raised dark surface |
| Brand blue | `#4080BD` | **Surfaces and graphics only** |
| Accent text | `#2F6795` | Text and button fills on light |
| Accent light | `#7FB4E0` | Accent on navy |
| White | `#FFFFFF` | **The page ground** |
| Tint | `#F0F4F8` | Tinted sections |
| Tint 2 | `#E3EDF5` | Tinted cards |
| Rule | `#D5E1EB` | Hairlines |
| Dim | `#5A7280` | Secondary text |

**The site is white.** Roughly 11 white sections : 6 tint : 6 navy. Navy is a
band colour, not a ground. A page that reads mostly navy is wrong however
faithfully it followed the token map.

**Two contrast traps, measured:** `#4080BD` is 4.17:1 on white and 3.25:1 on
navy — it fails as text on both. Text on light takes `#2F6795`; accents on
navy take `#7FB4E0`.

---

## 2 · Live audit — 20 September 2026

Fetched from the production domains, not from the repo.

### Severity 1 — visible to customers or to Google

| # | Finding | Evidence |
|---|---|---|
| 1 | **Favicons are still the old mark.** Every icon slot on `overseeducation.com` serves the black planet-and-rocket, not the navy Axelis mark. | `android-chrome-512x512.png` renders the old artwork |
| 2 | **The OG image is the previous brand and the wrong shape.** Gold gradient bars, world map, no logo, and it claims "2000+ Scholarships" — a number that is not in the current positioning. It is 640×640 while the meta tag declares 1200×630, so every platform crops it badly. It is also a PNG named `.jpg`. | `og-image.jpg` = 640×640 PNG; `og:image:width` says 1200 |
| 3 | **`axelisoverseas.com` declares a white logo to Google.** The JSON-LD `logo` field points at `assets/logo-white.svg`. Google renders organisation logos on a white card — a white-on-transparent SVG is invisible there. | `"logo":"…/assets/logo-white.svg"` |
| 4 | **`overseeducation.com` declares no logo at all.** There is no `logo` field in its organisation schema, so Google has nothing to show. | no `"logo":` in the markup |
| 5 | **The B2B nav squeezes the full stacked lockup into 36×36 px.** A mark-above-wordmark lockup at 36px renders the wordmark as an unreadable smudge — and ships a 71 KB file with an embedded PNG to do it. It then types "AXELIS" beside it in a bold sans instead of using the logo lettering. | `class="h-9 w-9" src="/assets/logo-white.svg"` |

### Severity 2 — brand integrity

| # | Finding | Evidence |
|---|---|---|
| 6 | **The guarantee seal is not deployed anywhere.** `brand/axelis-seal-navy.svg` 404s on both domains and the string "seal" appears zero times on the D2C site. The single strongest trust device in the brand is absent from the product that sells on trust. | 404 + 0 occurrences |
| 7 | **No navy lockup is deployed.** Only `axelis-lockup-white.svg` exists on `overseeducation.com`; the navy variant 404s. Any light-ground placement has to fall back to the mark plus typeset text. | `brand/axelis-lockup-navy.svg` → 404 |
| 8 | **`axelisoverseas.com` carries none of the new brand.** No `/brand/` directory at all, no navy assets, old icon set, no manifest, no OG image file. It is an entire property still on the previous identity. | every `/brand/*` path 404s |
| 9 | **Certification badges differ between the two sites.** D2C shows AIRC + DPIIT + British Council. B2B shows AIRC + Startup India + British Council. Two different British Council files (colour `.webp` and black `.svg`). A partner who visits both sees two different accreditation stories. | badge paths on each site |

### Severity 3 — hygiene

| # | Finding |
|---|---|
| 10 | `axelisoverseas.com` has no `site.webmanifest`, no 192/512 icons, and its `favicon.ico` carries only 16 and 32 px — no installable identity, poor Android home-screen behaviour. |
| 11 | `overseeducation.com` serves `site.webmanifest` but it is not linked from the document head, so it is effectively inert. |
| 12 | `apple-touch-icon.png` exists on D2C, is absent on B2B (which uses `apple-icon.png` instead) — the two properties disagree on naming. |

### What is already right

- The D2C nav correctly preloads and uses `axelis-mark-navy.svg` on the white ground.
- The D2C footer correctly uses `axelis-lockup-white.svg` on navy.
- The white ground, Instrument Serif headings and tinted cards are landing properly on converted pages — `/payment-terms` is the reference.

---

## 3 · The asset manifest — what must exist

Every path below is relative to `public/` on **both** properties.

### Icons

| Path | Size | Artwork | Ground |
|---|---|---|---|
| `favicon.ico` | 16, 32, 48 | Simplified mark | Transparent |
| `favicon-16x16.png` | 16 | **Simplified mark** — see note | Transparent |
| `favicon-32x32.png` | 32 | Mark | Transparent |
| `apple-touch-icon.png` | 180 | Mark, white | Navy `#0E3240`, 20% corner radius |
| `android-chrome-192x192.png` | 192 | Mark, white | Navy, square |
| `android-chrome-512x512.png` | 512 | Mark, white | Navy, square |
| `site.webmanifest` | — | `theme_color` `#0E3240`, `background_color` `#FFFFFF` | — |

**The 16px note.** Below about 24px the rocket and the slipstream merge into a
smudge. The 16px and 20px slots need a simplified variant — planet and
slipstream, rocket dropped. **That variant has not been drawn.** Until it
exists, 16px is a known compromise, not a solved problem.

### Brand assets

| Path | Notes |
|---|---|
| `brand/axelis-lockup-navy.svg` | **Missing in production** |
| `brand/axelis-lockup-white.svg` | Present on D2C only |
| `brand/axelis-mark-navy.svg` | Present on D2C only |
| `brand/axelis-mark-white.svg` | Present on D2C only |
| `brand/axelis-seal-navy.svg` | **Missing on both** |

### Social

| Path | Spec |
|---|---|
| `og-image.jpg` | **1200×630**, real JPEG. Navy ground, white lockup, one line in Instrument Serif, no photograph, no gradient, no world map. |
| `opengraph-image` (B2B) | Same spec, generated or static |

### Structured data — both sites

```json
"logo": "https://<domain>/brand/axelis-lockup-navy.svg"
```

Navy on transparent, so it survives Google's white card. Never the white variant.

---

## 4 · Certification policy

One set, both properties, same files, same order:

1. **AIRC** — American International Recruitment Council
2. **British Council** — one file, the colour version, on white or tint
3. **DPIIT / Startup India** — decide which is the real recognition and show
   only that one. Showing DPIIT on one site and Startup India on the other
   reads as two different companies.

Badges sit on white or `--color-tint`, never on navy, never recoloured, never
stretched. The `/accreditations` page is the canonical list; badges elsewhere
link to it.

---

## 5 · Known defects in the source artwork

**"OVERSEAS" is not vector.** The lockup SVG is 49 paths plus two embedded
PNGs: one is the visible "OVERSEAS" artwork, the second is its alpha mask. The
artwork is gold on opaque black with no alpha of its own, which is why earlier
code forced the whole rectangle white and why it cannot sit on a white nav
untreated.

The navy and white variants work around this with an `feColorMatrix` applied to
the visible raster only — the mask must not be touched, or the wordmark greys
out. This is a patch on a defect:

- At large print sizes "OVERSEAS" will soften while "AXELIS" beside it stays crisp.
- It cannot take `currentColor`, so every colourway needs its own file.

**Get the wordmark properly vectorised.** Until then, treat the lockup as a
fixed-colour asset with two variants, and use the mark — which is clean vector
— wherever colour needs to be dynamic.

---

## 6 · Open, needing the founder

- The simplified small-size favicon variant (§3)
- Which recognition is real: DPIIT or Startup India (§4)
- Vectorised "OVERSEAS" wordmark (§5)
- Founder photo and bio; programme lead names and credentials
- Legal sign-off on the engagement letter
