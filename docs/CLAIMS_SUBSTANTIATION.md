# Substantiating the numbers on overseeducation.com

Compiled 20 Sep 2026. Purpose: every quantified claim on the site, what would
have to be true for it to stand, and what the sources actually say.

Under the Consumer Protection Act 2019 a quantified performance claim has to be
substantiable **on request**, and under the ASCI code the advertiser carries
that burden, not the challenger. Study-abroad consultancies are a sector where
this gets tested. None of this is a reason to panic; it is a reason to have the
file ready before someone asks for it.

These are decisions for Rishabh. Where one has been made, it is recorded
under the claim it affects. Everything else is listed as found, unedited.

---

## 1. "35,000+ universities" — not supportable

Appears at `src/app/page.jsx:134`, `src/components/Navbar.jsx:42`
("35,000+ programmes across 29 countries"), `src/data/siteData.js:313`.

Already corrected on `/university-finder`, which now counts from the data and
says "10,236 institutions listed".

Three independent disproofs:

**It exceeds the world.** IAU/UNESCO's WHED registers **~21,000** accredited
HEIs across 190+ countries. Webometrics, deliberately the broadest credible
universe in existence — any institution with an autonomous web domain, research
bodies and branch campuses included — registers **>30,000 across 200+
countries**. A figure for 29 countries cannot exceed the global total.

**Bottom-up it does not reach.** Counting generously throughout (US at the full
5,626 Title IV including non-degree-granting, France at 2,140 including
paramedical and social-work schools, China 3,119, Japan 1,162, India's 1,208
universities, Germany 426, Poland 345, Australia 206, Canada ~224, Italy 100,
Spain 96, Netherlands 50) the total is **~14,700** — and that set already
contains the six largest systems on earth. The remaining ~18 destinations are
all small.

**The only route to 35,000 is a category error.** Counting affiliated colleges
or campuses as universities. India alone reports ~44,519 *colleges* against
~1,208 universities, and clears 35,000 by itself.

### Official registers, by country

`R` = source opened and the number read off it. `P` = seen only in a search
index, not opened — **do not quote these**.

| Country | Official | Breakdown | Source | Year | |
|---|---|---|---|---|---|
| Germany | **426** Hochschulen | 120 Uni · 249 HAW/FH · 57 arts | HRK, *Hochschulen in Zahlen 2024* | SoSe 2024 | R |
| Germany | **421** | alternative cut | Destatis | WS 2025/26 | R |
| USA | **3,802** degree-granting | of 5,626 Title IV total | NCES/IPEDS | 2024–25 | R |
| USA | **3,896** degree-granting | 50 states + DC only | NCES *Digest* t.317.10 | 2022–23 | R |
| Japan | **1,162** | 812 universities · 292 junior colleges · 58 KOSEN | MEXT 学校基本調査 | May 2025 | R |
| China | **3,119** HEIs | 2,870 regular | MOE 2024 bulletin | 2024 | R |
| Poland | **345** uczelnie | — | GUS | 2025/26 | R |
| Italy | **86** atenei | 56 statali · 30 non statali | MUR/USTAT | 2024/25 | R |
| Spain | **96** universidades | 50 public · 46 private | Min. de Ciencia | 2025 | R |
| Netherlands | **50** funded | 36 hogescholen · 14 research univ. | OCW / UNL | 2025 | R/P |
| France | ~1,514–2,140 | MESR publishes no total | MESR RERS 2025 | 2024–25 | R |
| Australia | **206** providers | 43 universities · 7 colleges · 156 IHE | TEQSA AR 2023-24 | Jun 2024 | **P** |
| Canada | **do not quote** | site states no total; extractions gave 96, 97 and 101 | Universities Canada | 2025 | **P** |

Australia and Canada are unverified. `teqsa.gov.au` refused every request across
two tools and nine attempts, and again from this machine — the host does not
serve automated fetches. If either number is needed, someone has to open those
pages in a browser.

### What we ship, and why it is still not "universities we can place you at"

The finder lists **10,236** institutions across 29 destinations, derived from
Wikidata and counted from the file at build time.

That is a **list** claim, which is why the page now says "institutions listed".
It is not a placement claim. Where I exceed official counts (Italy 469 vs 86,
Spain 376 vs 96, Germany 660 vs 426) it is because the official figure counts
only universities while the list includes conservatories, art academies and
private providers — and because Wikidata over-counts even at its strictest:
its narrowest class for Germany is 581 against a real sector of 426.

**The defensible placement number already exists.** The GAC commission sheet in
the B2B partner pack holds **333 universities**, one row each, consolidated from
Leap Scholar, KC Overseas, SI-Applications and Crizac, with commission computed.
That is the honest answer to "how many universities can Axelis place me at".

Three different true numbers, none interchangeable:

- **333** — universities Axelis has a commercial route into.
- **10,236** — institutions searchable in the finder.
- **~21,000** — accredited HEIs on earth.

---

## 2. "5,000+ Students Sent" — not supportable from any system

`src/data/siteData.js:34`, repeated in the FAQ.

- AgentCis, per the 17 Sep ops audit: **3** completed cases this cycle
  (Keertan, Arnav, Divyanshi).
- HubSpot B2C — 2026 Intake: **2,521 deals total**, of which **5** are
  Closed Won — Paid. Closed Won means paid, not placed.
- HubSpot holds only standard objects. There is no Student or Application
  object, so placements are not tracked there at all.

Earlier cohorts have real completions scattered through Slack EOD reports
(Rajat, Aug 2024 is the clearest), but they are not held as a status anywhere
countable. Even summing every year, 5,000 is not a number these systems reach.

See [AGENTCIS_COMPLETED_STUDENTS.md](./AGENTCIS_COMPLETED_STUDENTS.md).

### Superseded 20 Sep 2026 by owner decision

Rishabh directed that this claim be replaced with **"4,500+ visas done
successfully"**, and it now reads that way on the home page, /products,
/testimonials and throughout the FAQ.

Recorded here because the advertiser carries the substantiation burden and
should know what the file contains if asked. The concern was put to him before
the change and he confirmed it: Axelis was incorporated in 2023, and his own
Slack post of 10 Jan 2025 sets the year's target at 100 candidates, described
as "a realistic one as per my past experiences", split 12-13 each across 8
people. 4,500 over three years is roughly 1,500 a year.

The basis for the figure has not been stated, so nothing in this repository,
HubSpot, AgentCis, Slack or Drive evidences it. Three readings of it would each
be defensible and none has been confirmed: the founder's personal career total
across previous employers rather than Axelis's; visa applications filed rather
than approved; or the figure across the whole B2B partner network rather than
direct students. If any of those is the real basis, saying so in the copy makes
the claim true and this entry can be closed.

---

## 3. The rest of `siteData.js:313`

One string carries all of these:

| Claim | Status |
|---|---|
| 95%+ visa approval rate | Unverified. 3 completed cases this cycle is too small a base to express as a percentage at all. |
| 85% scholarship success rate | No source found in repo, Slack, HubSpot or Drive. |
| "Visa approval guarantee (conditions apply)" | A guarantee on a government decision Axelis does not control. The conditions are not stated on the page. |
| "guaranteed results" | Same, and it is also in the site `<title>`. |
| ₹3+ Cr scholarships won | No source found. |
| ₹30+ Cr loans facilitated | No source found. |
| "Agent scholarships guaranteed across 1600+ universities" | 1,600 is not reconcilable with the 333-row commission sheet. |
| 2000+ scholarship opportunities | No source found. |
| 25+ loan provider partnerships | Plausible, unverified. |

I deliberately did not edit any single number inside this block. Fixing one
implies the other eleven were checked. They need one sitting, with the numbers
you can actually evidence, and then the whole string rewritten at once.

The two that carry the most risk are **"guaranteed results"** in the page title
and **"Visa approval guarantee"**, because they promise an outcome decided by a
foreign government. The Ausbildung package terms already posted in `#b2b-sales`
say the honest version — refund of ₹10,000 if a visa is refused for reasons not
attributable to the student. That is a guarantee that can be kept.

---

## Sources

- IAU/UNESCO WHED — https://whed.net/home.php
- Webometrics — https://www.webometrics.org/about-us
- HRK — https://www.hochschulkompass.de/fileadmin/user_upload/editors/Dokumente/Hochschulen/HRK_Statistikfaltblatt_DE_2024_WEB.pdf
- Destatis — https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bildung-Forschung-Kultur/Hochschulen/Tabellen/hochschulen-hochschularten.html
- NCES/IPEDS — https://nces.ed.gov/programs/digest/d23/tables/dt23_317.10.asp
- MEXT — https://www.mext.go.jp/content/20251226-mxt_chousa01-000044291_01.pdf
- China MOE — http://www.moe.gov.cn/jyb_sjzl/sjzl_fztjgb/202506/t20250611_1193760.html
- GUS — https://stat.gov.pl/obszary-tematyczne/edukacja/edukacja/szkolnictwo-wyzsze-w-roku-akademickim-20252026,8,12.html
- MUR/USTAT — https://ustat.mur.gov.it/dati/didattica/italia/atenei
- Min. de Ciencia — https://www.ciencia.gob.es/dam/jcr:b70dd7bb-cbd2-4efb-b4fe-e69059986611/DatosClave_SIU.pdf
- MESR RERS 2025 — https://www.education.gouv.fr/sites/default/files/2025-07/rers2025-chapitre-2-441717.pdf
- OCW — https://www.ocwincijfers.nl/sectoren/hoger-onderwijs/kengetallen-hoger-beroepsonderwijs/instellingen/aantal-instellingen-in-het-hoger-beroepsonderwijs

All confirmed reachable on 20 Sep 2026 except TEQSA, which refused every
attempt.


---

## 4. Referred by brand design, 21 September 2026

`docs/brand/BRAND_DECISIONS.md` closed nine design questions and referred three
items here, because they are commercial rather than design decisions.

### "100% Free Service"

It appeared on `/about` beside published plan prices of ₹9,999 and ₹19,999. It
has been removed from the page. The claim itself still needs a ruling on
whether it may be used at all, and if so with what qualification.

Brand design's note: *"the one I'd fix first — it's the contradiction a lender
or consumer forum notices."* That judgement is right. A free-service claim
sitting beside a published price is not a nuance a reader has to work out; it
is visible in one glance, on the page that describes the company.

### The visa claim

100%, 95% and "guaranteed results" have all appeared for what looks like one
metric. `/terms-conditions` defines a guarantee as "a specific, conditional
commitment" and `/faq` contradicts it. AgentCis records three completed cases
this cycle, so a percentage may not be expressible at all. Section 3 above has
the detail.

### Charter pricing, which did not agree across three pages

| Surface | Global Admissions | Europe Public |
|---|---|---|
| `/products`, wired to Cashfree | ₹9,999 refundable | ₹19,999 + ₹1,80,000 = ₹1,99,999 |
| FAQ, before 20 Sep | ₹10,000 | ₹10,000 + ₹1,65,000 = ₹1,75,000 |
| `/lp/pay-after-offer`, as first shipped | ₹10,000 | ₹10,000 + ₹1,65,000 |

A ₹25,000 gap, with the advertised figure **below** what checkout charges. The
two pages also described different arrangements: a refundable deposit returned
after arrival, versus pay-after-offer.

Everything now matches `/products`, on the basis that it is the page wired to
the payment gateway and therefore what actually bills. **That is an assumption,
not a ruling.** Someone has to confirm which figure is contractually correct.
The ₹1,65,000 predates this week; it was in the FAQ and was copied from there
onto a landing page, which is how one wrong number reached three surfaces.

See also `docs/brand/NAMING_DECISION_RECORD.md`: the product *names* are open
for the same reason, and a wrong name on a gateway-wired page is a mis-sold
service rather than a design error.

---

## 21 September 2026 — "guaranteed" retired from marketing copy

Founder instruction: *"we don't deliver, you get your money back type tone."*

The site made outcome promises it could not keep and contradicted itself doing it.
`servicePromises.js` already said *"No one can guarantee a visa, an admission, an employer
contract or an exam score, and we do not"* — while the FAQ sold a "Visa approval guarantee"
and a meta description sold "Guaranteed admission to your dream university." The B2B site
says *"No promised outcomes, no guaranteed visas."* Those cannot all be true.

**Deleted, not softened** — no refund backs either claim:

| Was | Where | Now |
|---|---|---|
| "Visa approval guarantee (conditions apply)" | siteData.js FAQ | A written refund on concierge programmes if we miss the outcome |
| "Guaranteed admission to your dream university" | /products meta | You pay after you hold an offer, not before |
| "visa assistance with guaranteed results" | /faq | Visa filing, documentation and interview preparation, handled end to end |

**Relabelled** — the commitment is unchanged, only the word:

- "Outcome Guaranteed" → **"We Deliver or We Refund"** (page titles, OG, Twitter)
- "written outcome guarantee" → **"written refund commitment"** (nav, footer, /about, /products, /certifications)
- "Success Guarantee" → **"Deliver or refund"**
- Programme page heading "Outcome guarantee" → **"We deliver, or you get a refund"**

**Scholarship wording.** "guaranteed agent scholarships" → "agent-channel scholarships".
These awards do exist through the agent channel and are not offered to direct applicants.
The word "guaranteed" was describing the channel, not promising every student an award.
The underlying claim is unchanged and not reopened here.

### What was deliberately left alone

The contractual guarantee is the thing that makes the new tone true, so it stays:

- `cancellationRefundPolicy.js` — protected percentages and SLAs, untouched
- `terms-conditions/page.jsx` §6 — "outcome guarantees" is a defined term
- The `guarantee: { pct, condition, promise }` objects — an **object key** read by five call
  sites. Renaming it would have emptied the refund table on `/policies/cancellation-refund`
  silently, with no error.
- "Guarantee terms live in the Cancellation & Refund Policy" on each programme page, so the
  T&C §6 pointer to a published guarantee does not dangle.

Verified by rendering, not grepping: all three concierge refund rows (25%, 40%, 30%) still
appear on the policy page, and each programme page still shows its promise, percentage and
policy link.

### Scope and magnitude, corrected in the same pass

Two defects of the same class the change was meant to fix:

**Scope.** Only **3 of 16** programmes carry a `guarantee` object. Every foundation, core and
advanced programme has none. "We Deliver or We Refund" was sitting in the root `layout.js`
title template, so it applied to `/certifications/german-a1-a2` and twelve others with no
refund behind them. The claim is dropped from the root title and scoped everywhere else to
"concierge tiers" or "concierge programmes". `/certifications` metadata now reads
"Concierge Tiers Refund-Backed" rather than a blanket promise.

**Magnitude.** The contract pays **25% to 40%**, never in full. "You get your money back"
read as a full refund. The homepage promise block now states the range:

> Concierge programmes name the outcome in writing. If we miss it, 25% to 40% of the fee
> comes back to you under the published refund policy.

**Also caught by a wider sweep** (`risk-free|assured|100% success|we ensure|no risk`, both
repos, since the first pass only grepped "guarantee"):

- `siteData.js` "This risk-free approach has helped 5,000+ students achieve their study
  abroad dreams without financial stress" → "Structured this way, the risk of paying for
  nothing sits with us rather than with you." Nothing here is risk-free; the student still
  pays once an offer lands.

Two matches were left alone deliberately: `financing/page.jsx` "That approval is assured"
sits inside the *what we never claim* list, and the B2B "No promised outcomes, no guaranteed
visas" is the honest statement both sites now agree with.

Verified by rendering `/certifications/german-a1-a2` (no refund promise on the page, only the
scoped footer line) alongside `/certifications/global-career-launch` (promise, 25%, and the
policy link all present).
