# Building with the system

Short rules for anyone adding a component. Each one exists because it was
broken in production, not because it is tidy.

The full reasoning is in `BRAND_DECISIONS.md`. This is the working version.

---

## 1. Building anything on navy? Add `.on-dark`

This is the rule that matters most, because it has failed twice.

A component written for a white background and later dropped onto a navy one
keeps its light tokens and goes quietly unreadable. It happened to the footer,
and to the specimen certificate, where the programme title measured **1.10:1**
and the anti-forgery watermark did not render at all — on a document shown to
lenders.

```jsx
<section className="on-dark bg-[var(--dark-bg)]">
```

`.on-dark` remaps `--foreground`, `--color-dim`, `--color-axelis` and
`--color-rule` to their dark equivalents. Your existing classes then resolve
correctly with no further thought, which is the point.

**Never put these on navy:**

| Token | On `#16265C` |
|---|---|
| `--foreground` `#1B2233` | 1.11:1 |
| `--color-axelis` `#1D4ED8` | 2.14:1 |
| `--color-dim` `#586179` | 2.32:1 |

**Buttons on navy** are white-filled with a navy label. `.on-dark .btn-primary`
already does this. Do not use the accent blue as a fill on its own ground.

## 2. SVGs loaded as `<img>` cannot use `currentColor`

An external SVG has no inherited colour to resolve, so `currentColor` falls
back to black. This is expected behaviour, and it silently affected every seal
on the site.

| File | Use |
|---|---|
| `axelis-seal.svg` | inline `<svg>` only |
| `axelis-seal-navy.svg` | `<img>` on light |
| `axelis-seal-white.svg` | `<img>` on navy |

Same pattern for the mark and the lockup. If you find yourself writing
`<img src="...currentColor asset...">`, pick the flat variant instead.

## 3. The seal is documents only

Certificate, signed guarantee page, engagement signature block. That is the
whole list.

It is not a web device. A seal earns credibility by appearing only on
instruments someone signs; on a marketing page it is a graphic. On the web the
guarantee is carried typographically with its clause number.

## 4. Logo sizes are specified, not chosen

Navbar 40 px desktop, 32 mobile. Footer lockup 160 px wide. Clear space is half
the mark's height on all four sides, and nothing enters it.

The full table is `BRAND_GUIDELINES.md` section 10. The mark was reported as
too small twice because people were picking sizes by eye.

## 5. Money columns: right-align, do not reach for tabular numerals

Measured with Lato loaded, `1111111111` and `0000000000` both render at
**185.60 px**, and `tabular-nums` changes neither. Lato's digits already share
one advance width, so the feature is a no-op on this family.

If a money column is shifting, it is layout:

- right-align the cell
- fix the column width in `ch` so ₹9,999 and ₹2,00,000 share a box
- keep the ₹, digits and commas in one non-breaking string

## 6. Radius and elevation are assigned, not picked

| Element | Radius | Elevation |
|---|---|---|
| Input, chip, badge | `sm` 6 | ring |
| Button | `md` 8 | none, `e-1` on hover |
| Card, tile | `lg` 12 | `e-2` |
| Panel, modal | `xl` 16 | `e-3` |
| Full-bleed media | `2xl` 24 | none |

**Nothing above `2xl`.** If a design needs 32 px, the design is wrong.

Section rhythm, desktop / mobile: major **96 / 64**, sub-section **64 / 40**,
band **48 / 32**. Grid gap **20**.

## 7. No emoji in the interface

Not as icons, not in headings, not as flags. Emoji flags do not render at all
in Chrome on Windows, which is a large share of Indian desktop traffic, and the
rest are font-dependent across platforms.

Icons are **Lucide**, 1.5 px stroke, `currentColor`, at 16 / 20 / 24. Flags are
the SVGs in `public/flags` at 20×15 with a hairline.

## 8. One name per product

**Global Admissions Charter** and **Europe Public Charter**. Not ZCF, not ZTF,
not "Student Plan" on customer-facing surfaces. The codes stay only where they
are contractual: signed declarations, the refund policy, the document kit.

The names themselves are still open with the founder. Consistency is
recoverable; a wrong name on an invoice is not. See
`NAMING_DECISION_RECORD.md`.

**`CheckoutButton`'s `product` prop is a Cashfree lookup key**, not a display
name. Rename displays freely; changing `product="global-admissions-charter"`
breaks payment.

## 9. Before you open a PR

- [ ] Anything on navy carries `.on-dark`
- [ ] No `currentColor` asset loaded through `<img>`
- [ ] Contrast: 4.5:1 body, 3:1 large text and non-text
- [ ] Radius and elevation from the table above
- [ ] No emoji
- [ ] `npm run build` passes and `npx eslint` reports 0 errors

The contrast check is worth doing by measurement rather than eye. Every failure
found on this site so far looked acceptable in the browser to whoever shipped
it.
