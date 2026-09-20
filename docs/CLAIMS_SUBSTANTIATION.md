# Substantiating the numbers on overseeducation.com

Compiled 20 Sep 2026. Purpose: every quantified claim on the site, what would
have to be true for it to stand, and what the sources actually say.

Under the Consumer Protection Act 2019 a quantified performance claim has to be
substantiable **on request**, and under the ASCI code the advertiser carries
that burden, not the challenger. Study-abroad consultancies are a sector where
this gets tested. None of this is a reason to panic; it is a reason to have the
file ready before someone asks for it.

Nothing below has been edited on the site. These are decisions for Rishabh.

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
