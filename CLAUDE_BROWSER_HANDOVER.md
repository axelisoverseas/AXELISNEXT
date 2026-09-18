# Claude Browser — handover prompt

Paste the block below into Claude with browser access. Run the tasks in order;
1 and 2 feed Monday's Bajaj call, 3 unblocks checkout.

Do not use this for the 15 ex-Bajaj LinkedIn DMs in `05_linkedin_intel/`.
Automated DMs breach LinkedIn's ToS and put the company page at risk, and the
intel they're after is obtainable from tasks 1 and 2 without that exposure.

---

## The prompt

> You are helping Axelis Overseas Education prepare for a Bajaj Finserv call on
> Monday 21 September and verifying two live sites. Work through the tasks in
> order. Open a new tab for each site. Report findings as you go — do not batch
> everything to the end.
>
> **Do not sign in to anything, do not submit any form, and do not make any
> payment.** If a task seems to need a login or a payment, stop and say so.
>
> ### Task 1 — Comparable-merchant evidence (the Monday argument)
>
> Bajaj said they "do not finance study abroad courses". Axelis needs evidence
> that Bajaj already finances structurally similar education products.
>
> For each of **upGrad**, **Great Learning**, **Simplilearn** and **Byju's**:
> 1. Open their public pricing or programme page for an executive/PG certificate.
> 2. Record: programme name, published fee, stated duration, delivery mode, and
>    whether a certificate is awarded.
> 3. Look specifically for a financing or EMI section. Record **which lenders
>    are named** — screenshot any page that names Bajaj Finserv, and note the
>    exact wording and the URL.
>
> Deliver a table: merchant · programme · fee · duration · certificate · lenders
> named · URL · whether Bajaj appears.
>
> The single most valuable find is a live page where Bajaj is offered on an
> education product priced ₹1.5L–₹3L. If you find one, capture the URL and a
> screenshot.
>
> ### Task 2 — How these merchants describe themselves
>
> On the same four sites, capture the exact H1 and meta description of the
> homepage and one executive-certificate page. Axelis wants to see the language
> lenders are used to reading. Quote verbatim, with URLs.
>
> ### Task 3 — Verify the Axelis sites render correctly
>
> On **overseeducation.com**, open each and report anything broken, misaligned,
> or contradictory. Check at 1440px and at 400px width:
>
> - `/` — hero, stats grid, the three programme cards
> - `/certifications` — should show exactly 3 programmes, one tier heading
> - `/certifications/global-career-launch` — enquiry form, EMI line, refund block
> - `/certifications/german-b1-intensive` — should show a "Withdrawn from the
>   catalogue" banner, no EMI offer, no enquiry form
> - `/verify` — type `AXL-SPEC-0000-DEMO` into the certificate field and press
>   Verify. It should report a **specimen**, not a valid certificate. Screenshot
>   the result and the specimen certificate below it.
> - `/terms-conditions` and `/delivery-policy` — should be full documents, not
>   "under revision" placeholders
> - `/policies/cancellation-refund` — check it prints cleanly (Cmd+P preview)
>
> On **axelisoverseas.com**, open `/pay` and confirm five payment cards render:
> partner signup ₹4,999, Tier 1 ₹45,000, UK tourist visa ₹10,000, MEA apostille
> ₹1,500/document, sworn translation ₹2,500/document. On the two per-document
> cards, change the document count and confirm the total recalculates
> (₹1,500 × 6 = ₹9,000). **Do not press Pay.**
>
> ### Task 4 — Cashfree dashboard (read-only)
>
> The user is signed in at merchant.cashfree.com. Without changing any setting:
> 1. Open Payment Links and report whether links can be created in the UI.
> 2. Find the Card EMI / EMI Plus settings and report exactly which banks and
>    which tenures are available, and whether no-cost EMI is offered.
> 3. Report whether the account is in test or production mode.
>
> Do not enable, disable or save anything. Report only.

---

## Why task 4 matters

`/financing` copy must state what is actually enabled, not what we hope is.
The site currently claims card EMI on 6/9/12/18/24-month tenures through
Razorpay and Cashfree — task 4 either confirms that or catches a false claim
before a lender does.

## Standing constraint the browser agent must not break

**No "no-cost EMI" claim anywhere.** No-cost EMI is a Bajaj product and Bajaj
has declined. If task 4 finds Cashfree offers genuine no-cost EMI, that changes
the answer — but it needs Rishabh's sign-off before it reaches a page, not an
agent's judgement.
