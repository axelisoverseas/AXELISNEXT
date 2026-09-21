# Handover — start here in the next thread

**Written 21 September 2026, updated after the four open items were closed.**
Everything below is local. **Nothing is pushed.**
Production still serves the old copy.

---

## Read this first

Ten commits sit on `main` ahead of `origin/main`. The founder reviews locally
and says when to push, so do not push without being asked.

| Commit | What it did |
|---|---|
| `9b9e16e` | Retired "guaranteed" from marketing copy |
| `895f55d` | Student-roster merge across four local sources |
| `8913f4f` | Moved the lender pitch off `/programmes` onto `/for-lenders` |
| `daea4bf` | Fixed the dead anchor and duplicated heading that move created |
| `271550a` | Document kit, and the first version of this handover |
| `74cc9a7` | Accent moved blue to crimson; visa rate derived as 90% |
| `d3d7683` | Vectorised wordmark, 16px mark, dimensional set |
| `1a6ef0f` | Kit rebuilt on the vector lockup and crimson rule |
| `d878cb6` | Escaped the angle brackets that broke three lockup files |

Run `git log origin/main..HEAD --oneline` for the live list; the count moves as
this file is itself committed.

Verify with `git log origin/main..HEAD --oneline`. Production check:
`curl -s https://overseeducation.com/ | grep -o '<title>[^<]*</title>'` still
returns the old **"Outcome Guaranteed"** title, which confirms nothing shipped.

Dev server: `npm run dev`. **Never run `npm run build` while it is live** — it
clobbers `.next` and produces `ChunkLoadError` that looks like a site defect.
Port 3000 was taken by a different project mid-session and made several pages
look like they were 500ing when they were fine. Check which port the log prints.

---

## 1 · The claim change, and the two rules that came out of it

The site contradicted itself. `servicePromises.js` said *"No one can guarantee a
visa, an admission, an employer contract or an exam score, and we do not"* while
the FAQ sold a **"Visa approval guarantee"** and `/products` meta sold
**"Guaranteed admission to your dream university."** The B2B site says *"No
promised outcomes, no guaranteed visas."* Those could not all be true.

**Deleted, not softened** (nothing backed them): the visa approval guarantee,
guaranteed admission, "guaranteed results" on visa assistance, "this risk-free
approach."

**Relabelled:** "Outcome Guaranteed" → **"We Deliver or We Refund"**;
"written outcome guarantee" → **"written refund commitment"**.

Two rules now govern every claim on the site. Both were defects I introduced and
then had to fix, so they are worth stating plainly:

- **Scope.** Only **3 of 16** programmes carry a refund. The claim must never sit
  in the root `layout.js` title template, where it applied to the thirteen that
  have none.
- **Magnitude.** The contract pays **25% to 40%**, never in full. "Your money
  back" overstates it.

**Do not rename the `guarantee` object key.** It is read by five call sites
(`cancellationRefundPolicy.js` ×2, `certifications/[slug]/page.jsx` ×3).
Renaming it empties the refund table on the policy page **silently, with no
error**. The word survives only where it is contractual: the refund policy,
Terms §6, and that object.

Full record in `docs/CLAIMS_SUBSTANTIATION.md`.

---

## 2 · New page: `/for-lenders`

The empanelment checklist and credentialing roadmap used to sit at the bottom of
`/programmes`, aimed at the wrong reader. The founder's words: *"looks like we
are too desperate."* Both sections moved verbatim to `/for-lenders`, which is the
URL to send a credit officer. `/programmes` keeps the hero button and one quiet
line at the foot.

The CIN and MCC still visible on `/programmes` are the site-wide footer legal
line at 11px, which is ordinary disclosure, not a pitch.

---

## 3 · Slogan

Current site title is **"Axelis Overseas. Every Fee Published Before You Pay"**.

It was chosen over the sharper *"You pay after the offer, not before"* because
that one is only true of the ZCF and ZTF student plans; the programmes are paid
up front. Recommended split, not yet approved by the founder:

| Line | Where |
|---|---|
| Every fee published before you pay | Permanent title and meta |
| No promises. Published prices. | Campaign, ads, lender deck |
| One counsellor. Twenty-nine countries. | Hero subhead |

---

## 4 · Students — 83 names, none publishable yet

`docs/students/` is **gitignored** and must stay that way. These are real people
from internal commission records and a partner-portal export. Nothing may be
published without that student's consent.

Rebuild with:
```
python3 scripts/build-student-roster.py
python3 scripts/student-roster-report.py
```

Four sources merged and de-duplicated into `docs/students/NAMES_FOR_CONFIRMATION.md`:

| Tier | Count | Meaning |
|---|---|---|
| A | 16 | Already live on `/testimonials` |
| B | 12 | Commission paid, so placed, not yet public |
| Offer issued | 8 | From the Drive CRM export |
| C | 27 | Converted, outcome not recorded |
| D | 20 | **Dropped — must never be counted as placed** |

**Founder decisions already applied:** Sai Vikas confirmed and kept (his
university is still unresolved: Maynooth in SEP'24, DePaul in the master sheet).
One student was removed at the founder's instruction from every extracted file.

**Still needs the founder:**

- **Two conflicts.** Ishaan Maalik and Shubham Pingley appear in the incentive
  sheets (commission paid) *and* are marked dropped in the converted-leads sheet.
- **Jitesh Jha.** He is live on `/testimonials` as placed at TU Dublin. A bank
  statement on this laptop records a refund of ₹1,26,070 to him on 01-Aug-2025.
  A refund has ordinary explanations, so this is not an accusation, but a
  refunded student used as a placement testimonial needs checking. The detail is
  deliberately kept out of every file — ask in session.
- **Esha Chandrakant Kotian.** A real converted student, but no local file
  records a university, intake or outcome for her.

**Google Drive is largely unread.** About 25 roster-shaped files there are
`.gsheet` pointers with no local content, including *closing students axelis
overseas fall 26* and *SI-UK Student Applications Tracker*. Reading them needs
the Drive connector.

---

## 5 · Brand

Live artifact: **https://claude.ai/artifact/Tpqew1RVfGpb6UmpRsmWYu** (v6.0).

`docs/brand/AXELIS_BRAND_ARTEFACT.md` v4.1 is **wrong on two things** and its own
banner admits it: it specifies Instrument Serif + Instrument Sans, and carries
the retired `#0E3240` palette. The live system is **Lato** on **`#16265C`**.
`BRAND_DECISIONS.md` wins wherever they disagree.

Corrections made to v5.0 of the artifact:

- Axelis blue on white is **AA, not AAA** — AAA needs 7:1 and it measures 6.70.
- The two surface-blue rows were labelled FAIL. They are 3.70 and 3.87, which
  clear the 3:1 bar for large text and non-text, which is what "graphics only"
  means.
- Its own type specimens were set in the retired guarantee language.

### Defects found in the source artwork

1. **The lockup rendered in two colours.** "AXELIS" navy, "OVERSEAS" near-black
   teal, from the embedded PNG plus alpha mask patched with `feColorMatrix`.
   **Fixed** by vectorising: `public/brand/axelis-lockup*.svg`.
2. **The seal read "WRITTEN OUTCOME GUARANTEE"** — retired language, and it would
   sit on certificates for all 16 programmes when only 3 carry a refund.
3. **The seal's bottom text rendered upside down.** Its `seal-bot` arc ran the
   wrong direction. Fixed by reversing the sweep flag.
4. **The seal baked in an `AXC-YYYY-####` placeholder** that collided with the
   ring text. Removed — the certificate body carries the ID.

---

## 6 · Document kit — `docs/brand/kit/`

Four documents, each as **HTML + PDF + DOCX**, all on the brand system:

| File | Notes |
|---|---|
| `01-letterhead` | A4, blank body |
| `02-tax-invoice` | GST-compliant: SAC 9992, CGST/SGST 9% each, worked on the ₹1,80,000 programme |
| `03-engagement-letter` | **Not reviewed by counsel — do not issue to a student yet** |
| `04-certificate` | A4 landscape, seal, unique ID, non-accreditation disclaimer |

Two seal variants in `kit/assets/`: `axelis-seal-certificate.svg`
("CERTIFIED PROGRAMME", true of every programme) and `axelis-seal-refund.svg`
("WRITTEN REFUND COMMITMENT", concierge signed pages only).

Rebuild: Chrome headless `--print-to-pdf` for PDF, `pandoc -f html -t docx` for
Word. DOCX cannot embed SVG without `rsvg-convert`, so the certificate uses the
PNG seal.

---

## 7 · Testing

```
BASE_URL=http://localhost:3000 node scripts/ui-audit.mjs
BASE_URL=http://localhost:3000 node scripts/ui-audit.mjs --phone
```

28 routes, 0 contrast failures, 0 sideways scroll on both viewports.

**`/programmes` was never in the audit list** until this session, along with the
refund policy, the terms, and both programme-page shapes. Six routes added. If
you add a page, add it to `ALL` in `scripts/ui-audit.mjs` or it goes unchecked.

---

## 8 · Open, and who owns it

**Closed since this file was written.** All four items that stood open in the
brand artifact are done:

- **Palette.** Accent moved from blue `#1D4ED8` to crimson `#A51C30`. Navy is
  unchanged. Contrast on white went 6.70 to **7.48**, gaining AAA. Fourteen
  hardcoded blues across ten files moved with the tokens, and the B2B repo too.
- **Visa rate.** The site claimed 95%+ in four places while also claiming 4,500
  visas against 5,000 placements, which is **90%**. It now reads 90% and the FAQ
  states the derivation.
- **"OVERSEAS" vectorised.** Set in Oswald 400, converted to outlines with
  fontTools. One fill, **71,738 bytes down to ~15,200**, takes `currentColor`.
  The two-tone defect is gone from the site and the documents.
- **16px mark.** `public/brand/axelis-mark-16.svg`. Rocket dropped, slipstream
  thickened. Use the full mark at 24px and above.

Also added: a dimensional (3D) mark in two grounds and a 1200x630 promo card,
all in `public/brand/`.

**Founder:**

- 5,000+ students, 4,500+ visas, 35,000+ universities are still unsourced.
  Separate figures, must stay separate.
- Two per-destination stats still read 95%. Different claim from the Axelis
  rate, deliberately left alone.
- Whether `#ffde59`, the retired logo yellow, is really dead.
- The two student conflicts, Jitesh Jha, and the Sai Vikas university.
- Slogan split in §3.

**Design / build:**

- Facebook and LinkedIn feeds, photography direction, course data beyond NL.
- Oswald is now a brand dependency for regenerating the wordmark. The TTF is not
  committed; refetch it from Google Fonts if the lockup needs rebuilding.

**Blocked:**

- Engagement letter, with counsel.
- Bajaj category decision. See `docs/lenders/BAJAJ_REPLY_AND_ESCALATION.md`.
  Eduvanz is the live parallel track.

**Uncommitted right now:** `HANDOVER_SESSION.md` (modified before this session),
`scripts/student-roster-report.py` (the permission classifier blocked the amend;
the edits add the Esha and Drive notes), and `docs/brand/kit/` plus two preview
PNGs, untracked.

---

## 9 · Working agreements

- Do not push without being asked. Build new things as **separate pages**.
- Verify before asserting. Several claims turned out false on checking:
  that AccioJob/AlmaBetter are Bajaj-financed, that Eduvanz publishes a product
  taxonomy, that competitor partner URLs resolved. "Could not verify" beats a
  confident wrong answer.
- Claims are the founder's to settle, not the agent's.
- Do not relabel a service to clear a lender's category exclusion. The CEFR
  language course genuinely is a course; sell that.
- Commit author email is `axelisoverseas@overseeducation.com`.
