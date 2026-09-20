# Brand handover — what the docs still need

Written 20 September 2026, after the palette lock. For whoever maintains the
brand documents next. Everything here is a discrepancy between what the
guidelines say and what the two sites actually do, or a gap the guidelines
never covered.

Source of truth for colour is now `brand-tokens.css`. If that file and a
running site disagree, the site is wrong.

---

## 1. The mark is used against its own spec

§3 is unambiguous:

| File | Use |
|---|---|
| `axelis-mark.svg` | Mark alone. **Nav**, favicon, seal, small sizes. |
| `axelis-lockup.svg` | Mark + wordmark. Hero, letterhead, avatars. |

Both sites put the **lockup** in the nav. The wordmark repeats a company name
that is already in the page title, the footer and the URL, and it forces the
whole thing smaller to fit the bar. The mark alone can then be larger and read
better at the same width.

**Fix:** nav uses `axelis-mark.svg`. Minimum 28px per §3; 40–44px is the
comfortable size in a 64–80px bar.

### The part the spec gets wrong

§3 says colour is dynamic: the fills are `fill:currentColor` and
`fill:var(--axelis-accent, currentColor)`, so "set `color` on a parent,
nothing else."

**That only works when the SVG is inlined in the DOM.** Referenced through
`<img src="...">` or `next/image`, the file renders in an isolated context,
`currentColor` has nothing to inherit, and the custom property never reaches
it. This is almost certainly why `-navy` and `-white` copies exist in
`assets/` despite §3 saying "there must never be one".

Either:
- inline the mark as a React component so `currentColor` works as designed,
  and delete the per-colour copies; or
- amend §3 to state that `<img>` usage requires a per-colour file, and treat
  the existing copies as intended rather than as a mistake.

Pick one. The current state documents the first and practises the second.

---

## 2. The guidelines have no logo sizing table

§3 gives a minimum and nothing else, so every implementation has invented its
own. Add a table covering nav, footer, favicon, OG image, letterhead, seal and
email signature, in px, with the clear-space rule restated per context.

Clear space is defined as "the height of the planet". That is unmeasurable
without opening the file. Give it a number or express it as a fraction of the
mark's own height.

---

## 3. Colour is locked, and the provenance changed

`#1D4ED8` is the accent, locked 20 September 2026. `brand-tokens.css` carries
the reasoning and the full set. §5 and §5.1 in the guidelines are updated, and
all eleven contrast pairings were re-measured against the new values rather
than carried over.

Two things a maintainer needs to know:

- The competitor analysis in §2 and §5 cites **Leverage Edu's** own navy and
  blue. Those are facts about a third party. Do not sweep them up in a
  find-and-replace when the palette next changes. It has already happened once
  and it made the document claim a competitor uses our colour.
- The comparison pages under `samples/` record Leverage Edu's real values on
  purpose. They are research. Repainting them destroys the record of what was
  compared against what.

The palette no longer contains any value taken from a competitor's stylesheet.
The trade-dress note in the old `brand-tokens.css` header is therefore
obsolete, and the new header explains why.

---

## 4. Typography is documented but not implemented

§4 specifies Instrument Serif for display and gives leading and tracking per
role. Both sites run **Lato** for everything, including headings at 700.

That was a deliberate choice, not drift, but §4 has not been updated to match
and now describes a site that does not exist. Either restore the serif or
rewrite §4. Leaving it is the worst of the three, because the next person will
implement the document and produce a third look.

If §4 is rewritten for Lato, note that Instrument Serif ships a **single
weight**: any bold heading in it is browser-synthesised and smears. That
constraint belongs in the document.

---

## 5. Section rhythm, elevation and radius are undocumented

The sites run three systems the guidelines never mention:

- **Elevation** — five steps, `--shadow-e-1` to `--shadow-e-lift`, alphas
  between 4% and 12%, tinted with the navy rather than neutral black.
- **Radius** — six steps, `--radius-xs` 4px through `--radius-2xl` 24px.
- **Section rhythm** — `.sec` / `.sec-sm` / `.sec-lg`, fluid via `clamp()`.

These are as much a part of the brand as the palette and are currently only
discoverable by reading `globals.css`. They belong in the guidelines.

---

## 6. Two claims the brand cannot settle

Not design problems, but they are on brand surfaces and nobody has resolved
them:

- **Visa success rate.** The sites state 100%, 95%, and "guaranteed results"
  for what looks like one metric. `/terms-conditions` correctly defines a
  guarantee as "a specific, conditional commitment", and `/faq` contradicts it.
- **"100% Free Service"** appeared on `/about` alongside published plan prices
  of ₹9,999 and ₹19,999. It has been removed; the claim itself needs a ruling.

Both need a decision from the founder, not a designer.

---

## 7. Assets now staged in both repos

`public/brand/` in each repo holds `axelis-mark.svg`, `axelis-lockup.svg` and
`axelis-seal.svg`, copied from `docs/brand/assets/`. They were previously only
in the docs folder, which is why the sites were using ad-hoc recoloured files
instead.

**These are copies.** If the source changes, re-copy. A build step that syncs
them would be better than trusting anyone to remember.
