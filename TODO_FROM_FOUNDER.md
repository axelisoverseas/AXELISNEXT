# TODO from the founder — P0 certifications rollout

Branch: `p0/cancellation-policy-legal-links`. Nothing merges to `main` without sign-off.

## 1. Cashfree payment links — 16 slugs to mint (ruling 5)

One link per programme, in one sitting. The slug is the key the site will use.

| # | Slug | Programme | Fee |
|---|---|---|---|
| 1 | `study-abroad-readiness` | Study Abroad Readiness | ₹4,000 |
| 2 | `sop-and-personal-statement` | SOP & Personal Statement Craft | ₹7,500 |
| 3 | `university-shortlisting-strategy` | University Shortlisting & Application Strategy | ₹9,500 |
| 4 | `student-visa-interview-readiness` | Student Visa & Interview Readiness | ₹12,000 |
| 5 | `german-a1-a2` | German A1 to A2 (CEFR) | ₹28,000 |
| 6 | `french-a1-a2` | French A1 to A2 (CEFR) | ₹28,000 |
| 7 | `application-coaching-undergraduate` | Undergraduate Application Coaching | ₹35,000 |
| 8 | `application-coaching-postgraduate` | Postgraduate Application Coaching | ₹42,000 |
| 9 | `scholarship-and-funding-strategy` | Scholarship & Funding Strategy | ₹32,000 |
| 10 | `german-b1-intensive` | German B1 Intensive (CEFR) | ₹85,000 |
| 11 | `french-b1-intensive` | French B1 Intensive (CEFR) | ₹85,000 |
| 12 | `executive-mba-application-coaching` | Executive MBA Application Coaching | ₹1,25,000 |
| 13 | `phd-research-proposal` | PhD & Research Proposal Certificate | ₹1,10,000 |
| 14 | `global-career-launch` | Global Career Launch | ₹2,00,000 |
| 15 | `phd-fellowship-concierge` | PhD & Fellowship Concierge | ₹2,50,000 |
| 16 | `executive-mba-concierge` | Executive MBA Concierge | ₹3,00,000 |

Bundles: none exist as products yet — mint later (ruling 5). Hand the 16 codes back and they go into a JSON map keyed by slug; `Enrol Now` on each page then points at its link.

## 2. Policy — items that need your eyes (ruling 4)

- ~~**Global Scholar Concierge — NOT published.**~~ **RESOLVED 13 Sep (ruling 9): dropped.** It existed only in the source policy, never in the catalogue. Its 40% / "3 admits" guarantee is not published and every residual mention is now cleared.
- **ZTF Charter (₹19,999 on /products) — scoped out.** The policy draft listed "the ZTF Charter service fee" under Section 1. The Student Plans page promises that fee as *fully refundable on visa refusal or zero offers*. Putting it under this policy's tiered table would contradict that promise. The published policy covers the 16 certification programmes only. **Confirmed 13 Sep (ruling 10): the Charter stays scoped out.**
- ~~**₹1,000 enrolment kit fee (§9)**~~ **RESOLVED 13 Sep (ruling 11): struck.** Nothing on the site charged it. Removing it also cleared the policy's last ZTF Charter reference, which suits ruling 10.
- **Section 8 worked example** — the numbers are untouched, but "Bajaj Finserv" became "the financing partner" and "6-month Bajaj tenure" became "6-month tenure" (ruling 1). Flagging because the file was marked verbatim.
- **Sections 1 and 3** — realigned to the 16 programmes; ₹4,75,000 became ₹3,00,000; bundle lines dropped (no bundles exist).

## 3. Mailbox (ruling 6)

`support@overseeducation.com` doesn't exist, so the policy (§6, §12) uses `axelisoverseas@overseeducation.com`. When `support@` is live, the switch is one constant: `refundPolicy.supportEmail` in `src/data/certificationPrograms.js`.

## 4. Still outstanding from master v3 §F

- [ ] Positioning line sign-off — "India's certification-first study-abroad platform" is live on the homepage hero
- [ ] Founder photo + short bio (About page + Concierge pages)
- [ ] Programme lead names + 1-line credential, one per programme
- [ ] Sample certificate design approval (navy `#1F4E79` header, cream `#FFF4E0`, cert ID `AXC-YYYY-####`) — no certificate mock exists on the site yet; Bajaj's checklist wants one visible
- [ ] Bajaj Finserv merchant ID — flip `BAJAJ_EMI_LIVE` in `certificationPrograms.js` when it lands
- [ ] Cohort intake dates for the next 6 months
- [ ] Calendly URL for the Discovery Call embed (currently `/bookings` links to `calendly.com/axelisoverseas/counsellingsession`)
- [ ] HubSpot: set `HUBSPOT_PRIVATE_APP_TOKEN`, `HUBSPOT_CERT_PIPELINE_ID`, `HUBSPOT_CERT_STAGE_ENQUIRY` in Vercel — enquiries currently log server-side only

## 5. Placement decisions I made (ruling 8 — yours to reverse)

- Nav keeps the label **Certifications** on the desktop bar (nine items; "Courses & Certifications" wraps) and uses the full label in the drawer. It already points at `/certifications`.
- The Cancellation & Refund block sits after the financing block and before the enquiry form. The programme template has no FAQ section to sit "above"; if one is added, the block moves above it.
- `/terms-conditions` and `/delivery-policy` shells are `noindex` while they carry placeholder text. They resolve, which is what the reviewer needs.
