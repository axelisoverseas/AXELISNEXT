# Eduvanz lender track — Axelis Overseas Education Pvt Ltd

**Prepared 21 September 2026. Research and preparation only.**
Nothing in this file has been sent. No form was submitted, no email despatched,
no contact made. The covering email in §3 is a draft for the founder to review
and send himself.

Every URL below was fetched live on 21 September 2026. Every claim is marked
either **VERIFIED** (read from the named primary source on that date) or
**UNVERIFIED** (could not be established — stated as a gap, not as a fact).

---

## BLOCKER — read before sending anything

**The five programmes in the §3 email are not published on overseeducation.com.**
Verified 21 September 2026 by fetching the live site:

| URL | Result |
|---|---|
| `https://www.overseeducation.com/programmes` | **HTTP 404.** Does not exist in production. |
| `https://www.overseeducation.com/certifications` | Live — publishes **three** programmes: Global Career Launch, PhD & Fellowship Concierge, Executive MBA Concierge, ₹2,00,000–₹3,00,000 |
| `https://www.overseeducation.com/policies/cancellation-refund` | Live. Effective 15 September 2026, Version 1.0. **Its §1 scope names those same three Concierge programmes.** |
| `https://www.overseeducation.com/verify` | Live, with a working certificate-ID lookup field |

The domain hard-404s on a bogus path, so these results are real, not soft-404s.

Searching `/certifications` for the programme names in the email returns
**nothing** for "CEFR B1", "University Application Craft", "Executive MBA
Application Intensive" or "Research Proposal". Only "Global Career Launch"
appears — and it appears described as *"Application, language, visa and your
first ninety days abroad, run end to end by one counsellor"*, under a tier
strapline reading *"End-to-end, one counsellor, written outcome guarantee."*

**The consequence.** Eduvanz will open overseeducation.com. What they will find
is three counsellor-led concierge engagements at ₹2L–₹3L carrying an outcome
guarantee — which is the service-retainer shape this whole track exists to
avoid — and no language course at all. The email's strongest asset, the CEFR B1
programme, is unverifiable on the website it points to. The refund policy the
email cites as a compliance artifact does not cover the programme the email
leads with.

The five programmes exist in the repo at `src/data/skillProgrammes.js`
(committed 21 Sep 2026, "Add /programmes: the five families restated as
assessable courses") but that route is not deployed.

**Either deploy `/programmes` and bring the refund policy's §1 scope into line
with it before sending, or expect the category objection this track was opened
to pre-empt.** This is a deployment task, not a drafting one, and no rewording
of the email fixes it.

---

## 0. How URLs were verified, and why it matters

`eduvanz.com` does **not** return HTTP 404 for pages that do not exist. It
returns **HTTP 200** with a 1,248-character body reading *"Oh, something went
wrong! Sorry, we can't find the page you're looking for."*

A status-code check alone would therefore have reported every guessed URL as
live. Each candidate was fetched, stripped to text, and byte-compared against a
deliberately bogus control path (`/zzz-nonexistent-abc/`). Identical body =
soft-404 = the page does not exist.

This is almost certainly why the earlier competitor research produced dead
links. The same control test was applied to every lender in §5.

---

## 1. The Eduvanz institute-partner route

### 1.1 Entity and regulatory status

| Fact | Value | Status |
|---|---|---|
| Legal entity | **Eduvanz Financing Private Limited** | VERIFIED — site footer, all pages |
| RBI NBFC registration | *"Eduvanz Financing Private Limited (the "Company") registered as Non-Banking Financial Company (NBFC) with Reserve Bank of India ("RBI")"* | VERIFIED — [eduvanz.com/fair](https://eduvanz.com/fair), Fair Practices Code §1 |
| RBI Certificate of Registration number | — | **UNVERIFIED.** Not published on `/fair`, `/about`, `/legal`, `/interest`, or in the CRISIL rating document Eduvanz links from its own homepage. Ask for it in diligence. |
| Credit rating | *"rated by CRISIL Limited and enjoys BBB- (minus) rating for Long-Term borrowings"* | VERIFIED — [eduvanz.com/about](https://eduvanz.com/about) |
| Founded | 2016 | VERIFIED — site footer |
| Head office | F-2, Cosmos Square, Chikhaldongari Rd, Evershine Global City, Dongarpada, Rustomjee Global City, Virar West, Virar, Maharashtra 401303 | VERIFIED — [eduvanz.com/contact](https://eduvanz.com/contact) |

### 1.2 Which URLs actually resolve

| URL | Result | Notes |
|---|---|---|
| `https://eduvanz.com/enquiry` | **LIVE** | **This is the institute intake route.** Title "Enquiry - Eduvanz" |
| `https://eduvanz.com/contact` | **LIVE** | Phone desks, city selector, head office |
| `https://eduvanz.com/admin/instituteportal` | **LIVE** | Institute login (existing partners only) |
| `https://eduvanz.com/fair` | **LIVE** | Fair Practices Code — the RBI-NBFC statement |
| `https://eduvanz.com/interest` | **LIVE** | Interest Rate Policy — **the subvention band, see §1.5** |
| `https://eduvanz.com/faq` | **LIVE** | Student-side product mechanics |
| `https://eduvanz.com/about` | **LIVE** | Leadership, CRISIL rating |
| `https://eduvanz.com/schools` | **LIVE** | Only vertical with its own page |
| `https://eduvanz.com/partner-with-us/` | **DOES NOT EXIST** | HTTP 200, soft-404 body. Do not cite or link. |
| `https://eduvanz.com/institute-partner/` | **DOES NOT EXIST** | HTTP 200, soft-404 body. Do not cite or link. |

There is **no dedicated institute-onboarding landing page** on eduvanz.com. The
onboarding route is the general `/enquiry` form with "Institute Owner" selected,
or a direct mail to the published partnerships desk.

### 1.3 Correction to the working premise — the taxonomy is thinner than assumed

The brief for this track assumed Eduvanz "publishes an explicit product
taxonomy — Schools / College / Vocational Courses / Upskilling Courses / Online
Courses". That is **half true, and the half that is false matters.**

The five labels exist only as dropdown entries under "Loans for Education" in
the site navigation. Reading the nav markup directly:

- `Schools` → `https://eduvanz.com/schools` (a real page)
- `College` → `https://eduvanz.com/login`
- `Vocational Courses` → `https://eduvanz.com/login`
- `Upskilling Courses` → `https://eduvanz.com/login`
- `Online Courses` → `https://eduvanz.com/login`

Four of the five verticals are nav labels pointing at the sign-in screen.
**Eduvanz publishes no definition, no eligibility criterion, and no course-type
list for any of them.** The mapping in §2 is therefore a *reasoned* mapping
against label names plus the one substantive published sentence (§1.5), not a
mapping validated against published criteria. It should be put to Eduvanz as a
question, not asserted as a fit.

### 1.4 The intake form — exact fields

`https://eduvanz.com/enquiry` — VERIFIED by reading the form markup.

| Field | Name | Type | Options / constraint |
|---|---|---|---|
| You are a/an | `inquery` | select, required | Prospective student · **Institute Owner** · Eduvanz Student · Others |
| Application ID | `appid` | text, max 10 | "For existing students" — leave blank |
| Full Name | `fullname` | text, required | alpha-only validation |
| Mobile Number | `mobile` | text, max 10 | numeric only |
| Email-ID | `email` | text | |
| Type of Your Query | `queryType` | select | **Inquiring for a Partnership with Eduvanz** · Inquiring for a Loan for a Course · Queries regarding Repayment of EMI · I cannot find my course / Institute · General Query |
| Description | `description` | textarea | free text — this is where the covering note in §3 goes |

The form carries **no file upload**. Documents cannot be attached at intake;
they will be requested afterwards. The page states *"We have received your query
and We'll revert within 24 Hrs."* — that is Eduvanz's own published SLA, not a
timeline Axelis should assume.

### 1.5 Published commercial terms — read this before writing to them

From [eduvanz.com/interest](https://eduvanz.com/interest), Interest Rate Policy
§2, quoted verbatim (VERIFIED):

> "Eduvanz Financing Private Limited offers zero cost loan to individuals
> pursuing vocational/educational courses from a **recognized institute**.
> Students are offered zero cost loans at institutes that have partnered with
> Eduvanz. In such scenarios, **institute bears the interest cost**, as would
> have been borne by an individual student in the absence of such partnership.
> Eduvanz may have a subvention arrangement with the Institution pursuant to
> which Eduvanz shall be entitled to **subvention benefits in the range of 15%
> to 45%**. In all other scenarios normal interest rates are charged from the
> students/customer."

Two consequences, both material:

1. **The "no-cost EMI" product is not free to Axelis.** It is a merchant
   discount. At the published band, a ₹2,00,000 ticket costs Axelis ₹30,000 to
   ₹90,000; a ₹3,00,000 ticket costs ₹45,000 to ₹1,35,000. The band is wide
   enough that the rate quoted to Axelis decides whether the product is viable
   at all. **Ask what the band is for this ticket size before agreeing to
   anything.** There is also a non-subvented path — "normal interest rates are
   charged from the students" — which may be the better opening structure.
2. **"Recognized institute" is the eligibility risk.** See §1.7.

Other published terms:

| Term | Value | Source |
|---|---|---|
| Maximum tenure | 60 months, at Eduvanz's discretion | `/faq` — VERIFIED |
| Coverage | "up to 100% of the Course fee", profile-dependent | `/faq` — VERIFIED |
| Collateral | "may or may not insist", case by case | `/faq` — VERIFIED |
| Disbursal | "to institute can be within 24 hours" | `/faq` — VERIFIED |
| Repayment starts | date of disbursal or course commencement, whichever is earlier | `/faq` — VERIFIED |
| Repayment mechanism | eNACH mandate; also NetBanking / UPI / debit card | `/faq` — VERIFIED |
| Unlisted institutes | *"You can still avail our monthly instalment facility... fill the form mentioning your educational Institute's name and we will reach out"* | `/faq` — VERIFIED |
| Processing fee to institute | — | **UNVERIFIED** — not published |
| Onboarding timeline | — | **UNVERIFIED** — not published |
| Minimum / maximum ticket for institute partners | — | **UNVERIFIED** — not published |

### 1.6 Contacts

**Published desk emails** (VERIFIED, printed on `/enquiry` under "Write to Us"):

- **`partnerships@eduvanz.com`** — the institute/partnership desk. This is the
  address for the §3 email.
- `support@eduvanz.com` — customer support.

**Phone** (VERIFIED, `/contact`): 022-6480 4550 · 022-4973 3624 ·
022-4973 3674, described on the page as *"Having trouble in processing your loan
application or want your institute to become our Partner. To talk to our
experts, please call us on the below mentioned number."* Service hours stated as
9.30am–7.00pm except Sunday and public holidays. WhatsApp: 9324 971 080.

The `/contact` page carries a city dropdown that includes **Bangalore**; the
homepage also carries a `tel:080 – 45860196` link. **UNVERIFIED:** that number
is not labelled on the page as the Bangalore desk — the city mapping is
inferred from the dropdown and should not be asserted.

**Named contacts: NONE.** Eduvanz publishes leadership names (Varun Chopra,
CEO; Parth Upadhyay, Co-Founder; Harshvardhan Singh Khangarot, Chief Collections
Officer) on `/about`, but no partnerships or institute-onboarding contact is
named anywhere on the site. Do not invent one and do not cold-mail a C-level
address in place of the published desk.

### 1.7 Eligibility criteria and required documents — the honest gap

**Eduvanz publishes no institute eligibility criteria and no institute document
checklist.** Both are presumably behind `/admin/instituteportal`, which requires
an existing user ID, password, T&C acceptance and an OTP. There is no public
registration path into that portal. §4 is therefore an *inferred* list.

The single published gate is the phrase **"a recognized institute"** in the
Interest Rate Policy. Eduvanz does not define it.

This collides directly with the position Axelis has already committed to in
writing (`src/data/skillProgrammes.js`): Axelis certificates are issued by
Axelis, are **not a degree, not a qualification under any national framework**,
and are not accredited by DPIIT, the British Council or AIRC. That position
should not be softened for this conversation — it is on the certificate itself.

The defensible answer, and the only one supported by the repo:

- The **language programme** is externally benchmarked. CEFR is an international
  framework; the assessment maps to Goethe-Zertifikat B1 and DELF B1 task types;
  students sit the Goethe-Institut / Alliance Française examination
  independently, and Axelis does not issue it. That is third-party alignment.
- **No other Axelis programme has an external benchmark.** Say so.
- The `CREDENTIAL_ROADMAP` in the repo (MEP/Q4401 NSQF Level 5) does **not**
  close this gap and must not be presented as though it does. Its own recorded
  caveat: *"It certifies the counsellor, not the student... It does not
  reclassify a fee paid by a student going abroad."* It is a future product for
  people training to become counsellors, not a recognition route for the
  student-facing catalogue.

---

## 2. Which Axelis programmes fit which Eduvanz vertical

Mapping basis: nav labels (no published definitions — see §1.3) plus the
Interest Rate Policy phrase *"vocational/educational courses from a recognized
institute"*. Programme attributes are from `src/data/skillProgrammes.js`.

All five are **online, live-cohort** delivery, so *Online Courses* is a true
statement about every one of them and therefore discriminates between none of
them. The useful question is Vocational vs Upskilling.

| Programme | Weeks / contact hrs | Assessment | Best-fit vertical | Fit |
|---|---|---|---|---|
| **German and French to CEFR B1** | 24 wk / 120 hr | Continuous graded assignments, a mock at each CEFR level, final assessment mapped to Goethe-Zertifikat B1 / DELF B1 task types | **Vocational Courses** (secondarily Upskilling, and Online by delivery) | **Strongest. Open here.** |
| **Executive MBA Application Intensive** | 12 wk / 48 hr | Essays, career-narrative brief, recorded mock admissions interview, each marked to a published rubric | **Upskilling Courses** | Strong second |
| **University Application Craft** | 10 wk / 40 hr | Marked portfolio: SOP, academic CV, two drafted recommendation briefs | **Upskilling Courses** | Moderate |
| **Research Proposal and Fellowship Applications** | 16 wk / 56 hr | Full research proposal, literature positioning note, supervisor outreach portfolio, marked to academic criteria | **Upskilling Courses** | Moderate |
| **Global Career Launch** | 52 wk / 180 hr | Module assessments across language, application craft, financial planning, relocation readiness, plus final readiness review | No clean fit | **Weakest. Do not lead with it.** |

### The strongest opener: German and French to CEFR B1

It is the only one of the five that a credit officer can verify without taking
Axelis's word for anything:

- **CEFR is a published international framework**, not an Axelis construct.
- **The assessment maps to a third-party examination** (Goethe-Zertifikat B1,
  DELF B1) that Axelis prepares for and does not issue.
- **120 contact hours over 24 weeks** is countable, with a fixed syllabus and a
  capped cohort of 15.
- Language training is the least contestable "vocational course" in the
  catalogue. It is the shape of merchant Eduvanz already finances.

This also survives §1.7 best: it is the one programme where "recognized" has an
answer that does not depend on Axelis recognising itself.

*(This preference is already recorded in the repo — `priority: 1`, with the
reason: "CEFR is an international framework, the syllabus is fixed, contact
hours are countable, and the assessment maps to a third-party examination. This
is a language course by any definition a lender uses.")*

### Where the fit is honestly weak

- **Global Career Launch** (52 weeks, the highest ticket) is the programme most
  likely to be examined closely and the one whose counselling component is
  hardest to present as taught content. The repo's own note concedes it is
  "most likely to be examined closely". Leading with it invites the exact
  category objection this track exists to avoid. Hold it back until at least one
  programme is empanelled.
- **University Application Craft** and **Research Proposal and Fellowship
  Applications** are genuinely taught, assessed courses, but their *subject
  matter* is applying to universities abroad. A credit team scanning for
  category risk will notice. They are second-wave, not openers.
- **None of the four non-language programmes has any external benchmark.** Their
  rubrics are Axelis's own. That is defensible as pedagogy and is not defensible
  as recognition; do not blur the two.

---

## 3. Draft covering email — for the founder to review and send

**To:** `partnerships@eduvanz.com`
**Subject:** Institute partnership enquiry — Axelis Overseas Education Pvt Ltd (Bengaluru)

> Dear Eduvanz Partnerships team,
>
> I am writing to ask about institute partnership for Axelis Overseas Education
> Pvt Ltd. We run assessed, fixed-duration certification programmes for Indian
> students and working professionals, delivered as live online cohorts. I have
> set out the programmes and our entity details below.
>
> **The programme I would like to start with: German and French to CEFR B1.**
> Twenty-four weeks, 120 contact hours, live online cohort twice weekly with
> graded homework, capped at fifteen students. Students are assessed by
> continuous graded assignments, a mock at each CEFR level, and a final
> assessment mapped to Goethe-Zertifikat B1 and DELF B1 task types. Students sit
> the Goethe-Institut or Alliance Française examination independently; we prepare
> them for it and do not issue it. On completion, Axelis issues an Axelis
> Certificate of Completion recording the CEFR level assessed against stated
> criteria.
>
> We run four further programmes on the same basis, each with a fixed duration,
> stated contact hours, a published syllabus and a marked assessment:
>
> - **University Application Craft** — 10 weeks, 40 contact hours. Assessed on a
>   portfolio (statement of purpose, academic CV, two drafted recommendation
>   briefs), marked against a published rubric.
> - **Executive MBA Application Intensive** — 12 weeks, 48 contact hours,
>   evening cohort for working professionals. Assessed on essays, a career
>   narrative brief and a recorded mock admissions interview.
> - **Research Proposal and Fellowship Applications** — 16 weeks, 56 contact
>   hours. Assessed on a full research proposal, a literature positioning note
>   and a supervisor outreach portfolio.
> - **Global Career Launch** — 52 weeks, 180 contact hours, blended delivery with
>   module assessments and a final readiness review.
>
> **On the credential, so there is no ambiguity.** Certificates are issued by
> Axelis. They are not a degree and they are not a qualification under any
> national framework. Each certificate carries a unique ID that can be checked
> at overseeducation.com/verify. The one external reference point in the
> catalogue is the language programme, where the level assessed is CEFR and the
> assessment is built to the Goethe-Zertifikat B1 and DELF B1 task formats.
>
> **Entity and compliance:**
>
> - Axelis Overseas Education Pvt Ltd
> - CIN U85500CT2023PTC014913
> - GSTIN 22AAZCA0637P1Z5
> - Merchant category code 8299, Educational Services
> - Offices in Bengaluru and Bilaspur
> - A written Cancellation & Refund Policy, version 1.0, in force from
>   15 September 2026, published at a fixed URL on our site
> - Every programme carries a published fee, duration, contact hours, syllabus
>   and assessment criteria on its own page
>
> **Payments:** our gateway is already live. We collect through Cashfree
> (PCI-DSS compliant) and Razorpay, including card EMI on six to twenty-four
> month tenures. We have no lending partner onboarded at present, which is why
> I am writing.
>
> **Ticket sizes.** Published fees on our current catalogue run from ₹2,00,000
> to ₹3,00,000. Our policy sets a minimum EMI ticket of ₹10,000 and a maximum of
> ₹3,00,000, with one programme treated as one loan account.
>
> **What I would like to understand:**
>
> 1. Which of your verticals these programmes fall under — Vocational Courses,
>    Upskilling Courses or Online Courses. Your site lists the categories but
>    does not define them, and I would rather ask than assume.
> 2. What "recognized institute" means for the purposes of your Interest Rate
>    Policy, and whether a provider whose certificates are self-issued, with the
>    external alignment described above for the language programme, is eligible.
> 3. Which financing structures are available to us. I understand from your
>    published Interest Rate Policy that the zero-cost product is subvented by
>    the institute at 15% to 45%, and that a non-subvented arrangement exists
>    where the student bears normal interest. I would like to understand the
>    indicative band for our ticket sizes under the first, and the terms of the
>    second, before choosing.
> 4. Your onboarding requirements — the eligibility criteria and the document
>    checklist for an institute partner.
>
> I can provide incorporation, tax, banking and signatory documentation on
> request, along with syllabi, contact-hour schedules and assessment rubrics for
> each programme.
>
> I am happy to take this on a call at your convenience.
>
> Regards,
>
> [Name]
> [Designation]
> Axelis Overseas Education Pvt Ltd
> axelisoverseas@overseeducation.com
> [Phone]
> overseeducation.com

### Drafting notes

- **No per-programme fee is stated, deliberately.** The five programmes in
  `skillProgrammes.js` carry no prices, and the prices in
  `certificationPrograms.js` attach to differently-named catalogue entries.
  Inventing a figure would be a material misstatement to a lender. The ticket
  paragraph instead quotes only what is genuinely published on the live refund
  policy — the ₹2,00,000–₹3,00,000 catalogue range and the ₹10,000 / ₹3,00,000
  EMI bounds — and is worded as a statement about the *catalogue*, not about the
  five named programmes. Without it, question 3 is unanswerable, so do not drop
  it. Per-programme fees still need to be set before any commercial call.
- **The policy-scope mismatch is unresolved.** The email cites the published
  refund policy as a compliance artifact. That policy's §1 scope covers three
  Concierge programmes, not the five described above — see the BLOCKER section.
  The email does not claim the policy covers the five, but a diligence reader
  who opens the link will see the gap. Fix the site, not the sentence.
- The email asks *which structures are available*; it does not request zero-cost
  EMI. Requesting it invites a 45% quote by default.
- "Study abroad consultancy" does not appear. The product described is the
  courses.
- No accreditation is claimed. The certificate paragraph is deliberately blunt.
- No other lender is mentioned.
- Gateway wording separates two true things that must not be merged: Cashfree
  card EMI **is** live; lender EMI **is not** (`LENDER_EMI_LIVE = false`,
  `BAJAJ_EMI_LIVE = false` in the repo).
- `[Name]`, `[Designation]` and `[Phone]` are placeholders, not omissions.
- **Alternative route:** paste a condensed version of this into the `description`
  field at `https://eduvanz.com/enquiry` with *You are a/an* = **Institute
  Owner** and *Type of Query* = **Inquiring for a Partnership with Eduvanz**.
  The form has no attachment field, so the email is the better first move; the
  form is a useful second touch if the email goes unanswered.

---

## 4. Documents Eduvanz is likely to want

**Inferred, not published.** Eduvanz publishes no institute document checklist
(§1.7). This list is built from the Bajaj 15 Sep 2026 pack plus what a subvented
NBFC merchant arrangement structurally requires. Treat the right-hand column as
the planning signal.

### Already in hand — submitted to Bajaj, 15 September 2026

| Document | Reuse |
|---|---|
| Company PAN | Yes, as-is |
| Cancelled cheque | Yes, as-is |
| Certificate of Incorporation | Yes, as-is |
| MOA / AOA | Yes, as-is |
| Email authorisation | Yes, as-is |
| Board resolution | Likely needs re-issue — a board resolution usually names the counterparty and the facility. Check whether the existing one is drawn narrowly. |
| Authorised signatory POA / POI | Yes, as-is |
| GSTIN certificate | Yes, as-is |
| Premises photographs | Yes — but see the note below on delivery mode |
| 6-month bank statement | Refresh to the latest six months at the date of submission |

### New — would have to be produced

| Document | Why | Effort |
|---|---|---|
| **Per-programme syllabus, contact-hour schedule and assessment rubric** | This is the pack that makes the case that these are courses, not retainers. The data exists in `skillProgrammes.js`; it has never been produced as a document. | Medium — assemble from the repo |
| **Sample certificate** | `TODO_FROM_FOUNDER.md` records that no certificate mock exists on the site and that the design (navy `#1F4E79`, cream `#FFF4E0`, cert ID `AXC-YYYY-####`) is still awaiting sign-off. A lender financing a credential will ask to see the credential. **This is the clearest blocker.** | Medium — needs founder sign-off, then artwork |
| **Cancellation & Refund Policy as a signed PDF** | Published on the site from 15 Sep 2026, but lenders take it on letterhead, signed and dated | Low |
| **Subvention / partnership agreement** | Eduvanz's own paper. Axelis's side is to have the commercial decision made before signing — see the 15–45% band in §1.5 | Review, not production |
| **Enrolment, attendance and completion records** | Subvention lenders commonly tie clawback or non-disbursal to non-commencement and non-completion. Axelis needs a defensible record of who enrolled, who attended and who completed. | **Unknown — check whether any system does this today** |
| **GST treatment of a subvention discount** | A 15–45% merchant discount on an MCC 8299 supply has a GST position. Needs the accountant, not the lender. | Low, but do it before signing |
| **Cohort calendar / intake dates** | Eduvanz disburses to the institute against a course start. `TODO_FROM_FOUNDER.md` lists "cohort intake dates for the next 6 months" as still outstanding. | Low — founder decision |
| **Programme lead names and credentials** | Also open in `TODO_FROM_FOUNDER.md`. A credit team assessing teaching capacity will ask who teaches. | Low — founder decision |
| **Fee schedule per programme, GST-inclusive** | The five programmes in `skillProgrammes.js` carry no prices. Required before any commercial conversation. | Low — founder decision |
| **Premises note for online delivery** | The programmes are delivered live online. Premises photos of Bengaluru and Bilaspur are still worth supplying, but expect a question about delivery infrastructure rather than classrooms — answer it in writing rather than being asked. | Low |

### Not the institute checklist — do not confuse these

The following are published on `/faq` and are **student-side** requirements at
loan application, not institute empanelment requirements: KYC per regulatory
requirement plus address proof; optional financial details depending on credit
profile; a co-borrower/guarantor who is an Indian citizen; an eNACH mandate set
up at disbursal.

---

## 5. Other RBI-registered NBFCs worth opening in parallel

All URLs fetched and content-verified on **21 September 2026**. Each domain was
control-tested with a bogus path before any URL below was accepted.

### Open these two

**Auxilo Finserve Pvt Ltd** — VERIFIED
`https://www.auxilo.com/partner-with-us`
A real intake form (`id="partner-with-us-form"`) with fields: name, email,
contact number, city, **type of partner**, comments. The partner-type dropdown
includes **"Educational Institutes/Universities (India & Abroad)"**, "Test
Preparation Centres" and "Education Consultants (India & Abroad)". The site
navigation carries **"Skill Development"**, **"Skill Education Loans"**,
**"Executive Education Loan"** and **"Education Institution Loans"**.
*Caveat, applying the same test as §1.3:* those are nav labels read off the
page, not fetched pages — a guessed `/skill-development` path returns a hard
404, so confirm each target URL before citing it. The intake form itself is
verified. Published contact: `info@auxilo.com`, 1800 123 289456.
Best structural fit after Eduvanz — it has an explicit skills vertical *and* an
institute-partner intake path.

**Avanse Financial Services Ltd** — VERIFIED
`https://www.avanse.com/associate-with-us`
A real POST form (`id="associateWithUsForm"` → `/associate-with-us/thankyou`)
with fields: name, contact number, email, city, **type of partnership**. The
partnership dropdown includes **"University or Institute"** and "Test Prep
Centre". Relevant published product pages, both confirmed live:
`https://www.avanse.com/education-loan/skill-enhancement-loan` and
`https://www.avanse.com/education-loan/executive-education-loan`. Avanse returns
a hard 404 on nonexistent paths, so these are genuinely live pages.
Note the dropdown's first option is "Study Abroad Consultants" — select
**"University or Institute"**, consistent with the positioning in §3.

### Could not verify — do not treat as live routes

**Propelld** — **UNVERIFIED.** `propelld.com` serves an identical 9,332-byte
single-page-application shell for every path tested, including a deliberately
bogus one. `/partner`, `/for-institutes`, `/site/partner` and
`/site/institute-partner` cannot be confirmed to exist. Their blog is served
under `/site/`, which suggests the marketing site is structured differently from
the app. **Needs a browser session to verify**, not an HTTP fetch. Do not mail a
guessed address.

**InCred** — **UNVERIFIED.** `incred.com/partner-with-us/` returns HTTP 200 with
a 1,142-byte empty body (client-rendered). Content could not be read.
`incred.com/education-loan/` is live. Needs a browser session.

### Assessed and set aside

- **Varthana** (`varthana.com`) and **Shiksha Finance** (`shikshafinance.com`) —
  both live, both lend to *schools and educational institutions* as borrowers,
  not to students of a training provider. Wrong product shape.
- **LiquiLoans** (`liquiloans.com`) — live, but the entity is **NDX P2P Private
  Limited**, an RBI-registered P2P platform, not an education-vertical NBFC.
- **GrayQuest** (`grayquest.com`) — site live, but outreach already bounced.
  Excluded per instruction. Same for **Fibe**.
- **Credenc** (`credenc.com`) — live; not assessed in depth. Candidate for a
  later pass.

---

## 6. Open questions to resolve before or during first contact

0. **Deploy `/programmes`, and align the refund policy's §1 scope to it.**
   Blocking, and blocking on Axelis's side, not Eduvanz's. See the BLOCKER
   section. Until this is done the email points a lender at a website that
   contradicts it.
1. **What subvention rate applies to Axelis ticket sizes?** The published band
   is 15–45%. The difference between the ends is the difference between a viable
   product and an unviable one. Nothing should be signed before this is a number.
2. **Does "recognized institute" admit a provider with self-issued
   certificates?** This is the binary. If the answer is no, the language
   programme's CEFR and Goethe/DELF alignment is the only argument available.
3. **Is there a non-subvented route?** The Interest Rate Policy says there is.
   It may be the better opening structure, since it costs Axelis nothing and
   proves the category fit before any discount is committed.
4. **Fees per programme.** Blocking for any commercial discussion.
5. **Sample certificate.** Blocking for credential diligence, and still
   unsigned-off.
6. **Completion and attendance records.** Unknown whether any system produces
   them today.

---

## Sources

All fetched 21 September 2026.

- [eduvanz.com](https://eduvanz.com/) — homepage, navigation markup
- [eduvanz.com/enquiry](https://eduvanz.com/enquiry) — intake form fields, desk emails
- [eduvanz.com/contact](https://eduvanz.com/contact) — phones, head office, city list
- [eduvanz.com/fair](https://eduvanz.com/fair) — Fair Practices Code, RBI NBFC statement
- [eduvanz.com/interest](https://eduvanz.com/interest) — Interest Rate Policy, 15–45% subvention band
- [eduvanz.com/faq](https://eduvanz.com/faq) — tenure, coverage, collateral, disbursal, student documents
- [eduvanz.com/about](https://eduvanz.com/about) — entity description, leadership, CRISIL BBB-
- [eduvanz.com/admin/instituteportal](https://eduvanz.com/admin/instituteportal) — institute login
- [CRISIL rating document](https://www.crisil.com/mnt/winshare/Ratings/RatingList/RatingDocs/EduvanzFinancingPrivateLimited_March%2030,%202022_RR_288556.html) — checked for CoR number; not present
- [auxilo.com/partner-with-us](https://www.auxilo.com/partner-with-us)
- [avanse.com/associate-with-us](https://www.avanse.com/associate-with-us)
- [avanse.com/education-loan/skill-enhancement-loan](https://www.avanse.com/education-loan/skill-enhancement-loan)
- [avanse.com/education-loan/executive-education-loan](https://www.avanse.com/education-loan/executive-education-loan)
- [overseeducation.com/policies/cancellation-refund](https://www.overseeducation.com/policies/cancellation-refund) — live; effective 15 Sep 2026, v1.0; §1 scope, §2 financing partners, §3 transaction parameters
- [overseeducation.com/verify](https://www.overseeducation.com/verify) — live; certificate-ID lookup field present (placeholder format `AXL-SPEC-0000-DEMO…`, which does not match the `AXC-YYYY-####` design noted in `TODO_FROM_FOUNDER.md` — worth reconciling)
- [overseeducation.com/certifications](https://www.overseeducation.com/certifications) — live; three Concierge programmes only
- `https://www.overseeducation.com/programmes` — **HTTP 404**, not deployed
- Repo: `src/data/skillProgrammes.js` (programme attributes, `LENDER_FACTS`, `EMPANELMENT_CHECKLIST`, `CREDENTIAL_ROADMAP`), `src/data/certificationPrograms.js` (`refundPolicy.effectiveFrom`, `BAJAJ_EMI_LIVE`), `src/data/cancellationRefundPolicy.js`, `TODO_FROM_FOUNDER.md`
