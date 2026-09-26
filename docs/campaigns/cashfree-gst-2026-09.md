# D2C campaign: payments move to Cashfree, 18% GST

**Status: DRAFT. Nothing sent, nothing scheduled, no auto-reply enabled.**
Prepared 26 September 2026 for founder approval.

Recipient phones and emails are in `cashfree-gst-2026-09.private.csv` beside
this file, which is gitignored.

---

## 1. Who gets it

From HubSpot, pipeline *B2C — 2026 Intake*, excluding Closed Won and Closed Lost.

| Wave | Stage | Count | Channels | Send? |
|---|---|---|---|---|
| 1 | 3 Qualified to 7 Payment Aligned | **11** | AdviseAI WhatsApp, email, personal WhatsApp from Rishabh | Yes, first |
| 2 | 2 Attempting contact | **270** | AdviseAI WhatsApp, email | Yes, 2 to 3 days after wave 1 |
| 3 | 1 New lead (bulk-imported, never engaged) | **1,840** | Hold | **Recommend not** |
| | **Total open B2C** | **2,121** | | |

**Why hold wave 3.** A notice about a payment rail and a new tax is only
relevant to someone about to pay. These 1,840 have never replied. Every
marketing template they receive spends Meta's per-person frequency cap
(error 131049), and a capped person stays capped for weeks: in the August
run, 54% failed again sixteen days later. Spending that cap on a GST notice
means the next real offer to them does not land. If you want to reach them,
send them an offer-first message later, not this one.

**Owner-network referrals ("Axelis Partner Rishabh Agrawal").** HubSpot holds
this as the partner company *Axelis Owner Network — Rishabh Agarwal*. It has
three students: Shourya Mudliar, Omung Kumar and Shubham Kaushik. **All three
are Closed Won, Paid.** There are no open personal-network prospects in
HubSpot, so none are in this campaign. See blocker 4 for the two who may
still owe an EPC success fee.

**Personal WhatsApp.** Because there are no open personal leads, the
first-person message goes to the **11 warm leads** instead. They are in live
conversation, which is where a note from the founder converts best.

---

## 2. The messages

Prices are **net**: checkout adds 18% GST on top (`withGst()`,
`GST_NOTE = "+ 18% GST"` in `src/data/cashfreeLinks.js`). With GST:
GAC ₹9,999 + ₹1,800 = **₹11,799**. EPC ₹19,999 + ₹3,600 = **₹23,599**, and the
₹1,80,000 success fee + ₹32,400 = **₹2,12,400**.

Terms link is `/products`, because `/charters` is not live yet (404 on
production until commit `88d237b` is pushed). Swap it once pushed.

### A. AdviseAI WhatsApp template (52 words)

Needs a new Meta-approved template. `{{1}}` = `there`, one static value for
the whole campaign, per the AdviseAI rule.

> Hi {{1}}, an update from Axelis Overseas.
>
> We now take payments through Cashfree. Your plan, services and refund terms stay the same. One change: 18% GST now applies and shows on your receipt.
>
> GAC ₹9,999 + GST, refundable: [GAC_CASHFREE_LINK]
> EPC ₹19,999 + GST: [EPC_CASHFREE_LINK]
>
> Questions? Book a free call: calendly.com/axelisoverseas/counsellingsession

### B. Personal WhatsApp from Rishabh (46 words)

> Hi [first name], Rishabh here. Quick heads-up: we've moved payments to Cashfree. Your plan and refund terms don't change. The only difference is 18% GST, now on the receipt.
>
> When you're ready: GAC [GAC_CASHFREE_LINK] · EPC [EPC_CASHFREE_LINK]
>
> Or book a call with me: calendly.com/axelisoverseas/counsellingsession

### C. Email

**Subject:** We've moved to Cashfree: one change (37 characters)

> Hi [first name],
>
> From today, Axelis Overseas takes payments through Cashfree.
>
> What stays the same: your plan, what we do for you, and every refund condition.
>
> What changes: 18% GST now applies, as the law requires for our services. It is shown on your receipt, never added later.
>
> **Global Admissions Charter:** ₹9,999 + GST (₹11,799), refundable. [GAC_CASHFREE_LINK]
> **Europe Public Charter:** ₹19,999 + GST (₹23,599) now. The ₹1,80,000 success fee + GST applies only if you accept an offer. [EPC_CASHFREE_LINK]
>
> Every term, in full: overseeducation.com/products
>
> Want to talk it through first? Book a free call:
> calendly.com/axelisoverseas/counsellingsession
>
> [signature: docs/brand/signatures/rishabh-agrawal.html]

(Body 108 words.)

### How these were tuned

One idea per message, the price stated with the tax, the thing that did not
change stated before the thing that did, one easy next step, and no invented
urgency or scarcity. Checked for: no "guaranteed", "risk-free", "100%",
"full money back", no em dashes.

---

## 3. Personal auto-replier: design only, not switched on

Watches Rishabh's direct WhatsApp chats with the 11 warm leads (and any
future lead he tags). Replies on its own **only** from the whitelist below;
everything else is drafted and waits for him.

**May send on its own**
- Price and GST: the exact figures in section 2, nothing else.
- The two payment links and the booking link.
- "Is this refundable?" → the plan's refund conditions verbatim from
  `src/data/charterPromises.js`, plus the terms link.
- Booking confirmations and "I'll send you the link".
- Office hours and contact: info@overseeducation.com, +91 88823 20522.

**Must hand to Rishabh, never answer**
- Refund requests, disputes, complaints, chargebacks.
- Anything about a visa or admission outcome.
- Discounts, custom prices, payment plans, EMI.
- Anything about an existing paid contract or the success fee on one.
- Any message it is not sure of, any message in a language other than
  English or Hindi, and anything that is not a question.

**Daily digest** to Rishabh at 7 pm: who replied, what the bot sent, what is
waiting on him, and anyone who has gone quiet for 48 hours.

**Recommendation:** auto-send only the whitelist, and for the first three days
run it in draft mode so every reply is visible before it goes.

---

## 4. Blockers, in order

1. **No Cashfree links for GAC or EPC.** Both are `url: null` in
   `src/data/cashfreeLinks.js`. Every message above has placeholders. Do not
   send until both forms exist, carry 18% GST, and are tested.
2. **The website still shows ₹9,999 and ₹19,999 without "+ GST"** on the
   plan cards. A lead who reads this message and then opens /products sees a
   different number. Update the site first.
3. **GST on a refundable deposit.** A refundable security deposit is not
   usually a taxable supply until it is kept. Confirm with your CA whether GST
   goes on the GAC ₹9,999 at payment, or only when it is retained.
4. **Existing EPC clients.** At least Omung Kumar (Germany) and possibly
   Shourya Mudliar (Italy) are paid EPC students whose signed charter says the
   success fee is ₹1,80,000. Adding 18% to a signed contract is a founder and
   CA decision. They are excluded from this campaign and need a separate,
   individual conversation.
5. **New AdviseAI template** needs Meta approval before wave 1 or 2 can go.
   Expect it to be classed Marketing, which means the 131049 cap applies.
6. **Email volume.** 281 emails from one Gmail account in a day is near the
   sending limit. Send wave 2 in batches, or through HubSpot.
7. **/charters** must be pushed before it is linked (commit `88d237b`).

---

## 5. What you need to approve

1. The three messages, as written or with edits.
2. Waves 1 and 2 only, and holding the 1,840 in wave 3.
3. The Cashfree links for GAC and EPC, once created.
4. Your CA's answer on GST for the refundable deposit, and on the paid EPC
   clients.
5. The auto-replier whitelist, and whether it starts in draft mode.
