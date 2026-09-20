# Prompt for the website coding agent

Paste the block below into `HANDOVER_SESSION.md`, or hand it to the cloud agent
directly. It is written to be actioned without further context.

---

## Brand asset remediation — audited 20 September 2026

Read `docs/brand/AXELIS_BRAND_ARTEFACT.md` first; §2 is the audit these tasks
come from and §3 is the manifest they have to satisfy. Source files are in
`docs/brand/assets/`.

Two properties are in scope. `overseeducation.com` is this repo. **`axelisoverseas.com`
is a separate Next.js app and is still entirely on the old brand** — if you do
not have that repo, stop and say so rather than guessing.

Do not start any of this until `brand/d2c-palette` has both halves merged.
Half-converted pages that take money are the thing to avoid.

### 1 · Favicons — every slot still serves the old planet-and-rocket

Regenerate the whole icon set from `docs/brand/assets/axelis-mark-navy.svg`
(and `-white` for the navy-backed sizes):

- `favicon.ico` — 16, 32, 48 in one file
- `favicon-16x16.png`, `favicon-32x32.png` — mark, transparent
- `apple-touch-icon.png` 180 — white mark on navy `#0E3240`, 20% corner radius
- `android-chrome-192x192.png`, `android-chrome-512x512.png` — white mark on navy, square
- `site.webmanifest` — `theme_color` `#0E3240`, `background_color` `#FFFFFF`, and **link it from the head**; it is currently served but not referenced

At 16px the rocket and slipstream merge. Use the simplified variant if one has
been supplied; if not, ship the full mark and flag that 16px is unresolved. Do
not invent a simplified mark yourself.

### 2 · Open Graph image — wrong brand, wrong shape, false claim

`public/og-image.jpg` is 640×640 (the meta declares 1200×630), is a PNG with a
`.jpg` extension, uses the retired gold-on-navy treatment with a world map, and
claims **"2000+ Scholarships"** — not part of the current positioning.

Replace with a real 1200×630 JPEG: navy `#0E3240` ground, `axelis-lockup-white.svg`,
one line in Instrument Serif. No photograph, no gradient, no map, no statistic
that is not on the site. Then confirm `og:image:width` / `height` match.

### 3 · Structured data — the logo Google sees

- `overseeducation.com` has **no `logo` field** in its organisation schema. Add it.
- `axelisoverseas.com` declares `assets/logo-white.svg` — white on transparent,
  invisible on Google's white card. Change it.

Both must point at a navy asset:

```json
"logo": "https://<domain>/brand/axelis-lockup-navy.svg"
```

### 4 · Deploy the two missing brand assets

`brand/axelis-lockup-navy.svg` and `brand/axelis-seal-navy.svg` both 404 in
production. Copy from `docs/brand/assets/` into `public/brand/`.

### 5 · The guarantee seal is not on the site at all

The string "seal" appears zero times on `overseeducation.com`. The seal is the
brand's strongest trust device and the product sells on a written guarantee.

Place `axelis-seal-navy.svg` on the guarantee block of the homepage, on
`/policies/cancellation-refund`, and on the certificate specimen. Nowhere else —
it is not decoration, and using it as such spends what makes it credible.

### 6 · B2B nav is using the wrong file at the wrong size

`axelisoverseas.com` puts the full stacked lockup into a 36×36 box
(`class="h-9 w-9" src="/assets/logo-white.svg"`). At that size the wordmark is
an unreadable smudge, and it ships 71 KB with an embedded PNG to do it. Beside
it the name is typed in a bold sans instead of using the logo lettering.

Use `axelis-mark-white.svg` for the 36px slot, and set the wordmark from the
lockup artwork — not typeset — wherever it appears at legible size.

### 7 · Certification badges disagree across the properties

D2C shows AIRC + DPIIT + British Council. B2B shows AIRC + Startup India +
British Council, with a different British Council file.

**The founder has decided: DPIIT.** Note that DPIIT and Startup India are the
same recognition — DPIIT is the department, Startup India the scheme it
recognises startups under, and the D2C badge is already labelled
`alt="DPIIT Startup India"`. So replacing the B2B "Startup India" badge with
the DPIIT badge removes a duplicate presentation, not a credential.

Standardise both properties on, in this order:

1. AIRC
2. British Council — the colour file, one copy, shared
3. DPIIT

On white or `--color-tint`, never on navy, never recoloured or stretched.
Alt text on both: `DPIIT Recognised — Startup India`.

While you are in there: the asset is `public/logos/dppit logo.png`. **"dppit"
is a misspelling** of DPIIT and the space forces `%20` into a public URL.
Rename to `dpiit-recognition.png` and update every reference.

### 8 · Bring `axelisoverseas.com` onto the brand

It has no `/brand/` directory, the old icon set, no manifest, no OG file. It
needs the same treatment as the D2C site: token layer, Instrument Serif and
Sans, white ground with navy bands, the asset manifest in §3 of the artefact.

Treat this as its own piece of work, not a tail of the D2C conversion.

---

### Rules that apply to all of it

- `#4080BD` is a **surface** colour. It is 4.17:1 on white and 3.25:1 on navy —
  it fails as text on both. Text on light is `#2F6795`; accents on navy are `#7FB4E0`.
- The ground is **white**. Navy is a band. Target roughly 11 white : 6 tint : 6 navy.
- **Instrument Serif has one weight.** Emphasis is *italic*, never bolder —
  a synthesised bold looks broken.
- Every rupee figure, EMI amount, certificate ID and phone number carries
  `font-variant-numeric: tabular-nums`.
- The logo is never redrawn. The mark takes `currentColor`; the lockup does not
  (see artefact §5) — pick the right variant instead of recolouring it.
- Never the phrase "guaranteed admission" anywhere, including alt text.

### Report back with

1. Which of the eight items you completed, and which are blocked and on what
2. A before/after screenshot of one page and of the OG card
3. Anything in `AXELIS_BRAND_ARTEFACT.md` that turned out to be wrong when you
   hit the real code — the artefact is meant to be corrected, not defended
