# Naming decision record — the two student charters

**Status: convention ratified, names open, awaiting the founder.**
Recorded 21 September 2026. See `BRAND_DECISIONS.md` section 7.

---

## What is settled

The **convention** is ratified: one noun phrase per product, "Charter" as the
product-class suffix, two products, no sub-brands.

Customer-facing surfaces now use **one** name per product where four were in
circulation:

| Product | Public name in use | Short form |
|---|---|---|
| Paid-tuition destinations | **Global Admissions Charter** | GAC |
| Tuition-free public Europe | **Europe Public Charter** | EPC |

## What was retired from customer view

`ZCF` and `ZTF` are gone from marketing surfaces: the "Internal code" lines on
both plan cards, and the codes in the comparison table headers.

**They are kept where they are contractual** and must not be removed there:

- the signed Zero Tuition Fee declarations shown on `/testimonials`
- `docs/brand/company-docs/` where a document cites the charter by its
  contractual name
- `cancellationRefundPolicy.js`
- the footer's corporate statement

A marketing name and a contract name are allowed to differ. What is not allowed
is four of them.

## What is still open, and why it matters more than it looks

**The specific names are a commercial decision, not a design one.** The
repository has carried at least five namings across its history: *ZCF / ZTF
Student Plan*, *Global Career Launch*, the *Concierge* trio, a *ZTF Charter* at
₹19,999, and the current *Global Admissions Charter / Europe Public Charter*.

Nobody outside the founder can tell which pair is contractually live.

This is not cosmetic. `/products` is wired to `CheckoutButton` and Cashfree.
A product named wrongly on a page that takes money is **a mis-sold service**,
not a typographic inconsistency. The same page also had three different prices
for one charter across the site until this week, which is the same class of
problem.

## The instruction in the meantime

Use **Global Admissions Charter** and **Europe Public Charter** consistently
everywhere. Consistency is recoverable with a find-and-replace. A wrong name on
an issued invoice is not.

## Do not change without checking

`CheckoutButton` takes a `product` prop that is a **Cashfree lookup key**, not
a display name:

```
product="global-admissions-charter"
product="europe-public-charter"
```

Display names can be changed freely. Changing those two strings breaks payment.

## To close this record

The founder confirms which pair of names is contractually live. Then:

1. Update this file with the ruling and the date.
2. Sweep the two repositories for the superseded names.
3. Check the Cashfree product keys still resolve.
4. Reissue any document template that names a charter.
