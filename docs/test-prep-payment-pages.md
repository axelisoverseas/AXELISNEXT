# Test Prep — Razorpay payment-page spec

One row per pack. Sixteen pages to create on Razorpay (Dashboard → Payment Pages → Create new). Paste the returned `rzp.io/rzp/...` URL into the final column and hand back; we wire each pack to its own checkout.

**Defaults to set on every page**
- Currency: **INR**
- Payment methods: UPI, card, netbanking, wallet (Razorpay default checkout)
- Notify on payment: `axelisoverseas@overseeducation.com`
- Refund policy: as per /refund-cancellation
- Receipt prefix: `AXELIS-TP-`
- GST: as applicable (toggle on per Razorpay account setting)
- Logo on payment page: Axelis Overseas logo (`/1yellow svg logoaxelis.svg`)

**Custom fields to collect at checkout** (same for every page)
1. Full name *(required)*
2. WhatsApp number *(required)*
3. Email *(required)*
4. Target exam date *(optional, dropdown: < 1 month, 1–2 months, 3+ months, not decided)*
5. Target score / band *(optional, free text)*

---

## 1. IELTS

| Pack code | Page title | Short description | Amount (₹) | Internal SKU | Razorpay URL (cowork fills) |
|---|---|---|---|---|---|
| **BL-103** | Axelis IELTS — 1-on-1 Crash Course (12 sessions) | Premium 1-on-1 IELTS coaching, 12 sessions across Listening, Reading, Writing and Speaking, full-length mocks with line-by-line review. | 6,000 | TP-IELTS-103 | `_____________` |
| **BL-101** | Axelis IELTS — Couple Batch (15 sessions) | IELTS couple batch (2 students), 15 sessions, same tutor through all modules, two full mocks each. Per-student price. | 5,300 | TP-IELTS-101 | `_____________` |
| **BL-102** | Axelis IELTS — Batch of 3 (20 sessions) | IELTS small batch (3 students), 20 sessions, full mock cycle, individual writing + speaking review. Per-student price. | 6,000 | TP-IELTS-102 | `_____________` |

## 2. PTE Academic *(includes Alpha PTE subscription, retail value ₹1,299)*

| Pack code | Page title | Short description | Amount (₹) | Internal SKU | Razorpay URL (cowork fills) |
|---|---|---|---|---|---|
| **BL-106** | Axelis PTE — 1-on-1 Crash Course (9 sessions) | PTE Academic 1-on-1 crash, 9 sessions across all 20 question types, two full Alpha PTE mocks reviewed line-by-line. Alpha PTE subscription included. | 5,300 | TP-PTE-106 | `_____________` |
| **BL-104** | Axelis PTE — Couple Batch (15 sessions) | PTE couple batch (2 students), 15 sessions, Alpha PTE subscription included. Per-student price. | 4,600 | TP-PTE-104 | `_____________` |
| **BL-105** | Axelis PTE — Batch of 3 (15 sessions) | PTE small batch (3 students), 15 sessions, Alpha PTE subscription included. Per-student price. | 5,300 | TP-PTE-105 | `_____________` |

## 3. TOEFL · DET · CELPIP · Other Certs *(per-session)*

| Pack code | Page title | Short description | Amount (₹) | Internal SKU | Razorpay URL (cowork fills) |
|---|---|---|---|---|---|
| **BL-110** | Axelis TOEFL / DET / CELPIP / Lang Cert — 1-on-1 Session | Single 1-on-1 session of TOEFL iBT, Duolingo English Test, CELPIP or other language-cert coaching. Sessions counted hourly. Practice portal cost is separate. | 625 | TP-LANG-110 | `_____________` |

> Cowork: please also create a 5-pack and 10-pack bundle for this track if you can — discount math is on you, we'll surface whichever bundles you create.

## 4. SAT (Digital · College Board) *(per-session, minimum lock-in)*

| Pack code | Page title | Short description | Amount (₹) | Internal SKU | Razorpay URL (cowork fills) |
|---|---|---|---|---|---|
| **BL-201** | Axelis SAT — 1-on-1 (per session, min 16 sessions) | Digital SAT 1-on-1 coaching. Reading & Writing modules, adaptive Math, full Bluebook mock cycle. Single-session price; minimum 16-session lock-in. | 760 | TP-SAT-201 | `_____________` |
| **BL-202** | Axelis SAT — Batch of 2 (per session, min 20 sessions) | Digital SAT batch of 2 students. Single-session price per student; minimum 20-session lock-in. | 1,175 | TP-SAT-202 | `_____________` |
| **BL-203** | Axelis SAT — Batch of 3 (per session, min 30 sessions) | Digital SAT batch of 3 students. Single-session price per student; minimum 30-session lock-in. | 1,600 | TP-SAT-203 | `_____________` |

> For SAT, also create three **bundle** pages at the minimum-session totals (₹12,160 · ₹23,500 · ₹48,000) so students can buy the full lock-in in one click.

## 5. Spoken English & Communication *(per-session, low minimum)*

| Pack code | Page title | Short description | Amount (₹) | Internal SKU | Razorpay URL (cowork fills) |
|---|---|---|---|---|---|
| **BL-109** | Axelis Spoken English — 1-on-1 (per session, min 3) | Spoken English and communication coaching, 1-on-1, single-session price, minimum 3 sessions. | 460 | TP-SE-109 | `_____________` |
| **BL-108** | Axelis Spoken English — Batch of 2 (per session, min 5) | Spoken English batch of 2 students, per-session price, minimum 5 sessions. | 620 | TP-SE-108 | `_____________` |
| **BL-107** | Axelis Spoken English — Batch of 3 (per session, min 10) | Spoken English batch of 3 students, per-session price, minimum 10 sessions. | 920 | TP-SE-107 | `_____________` |

## 6. French (DELF · A1 / A2) 🇫🇷 *(per-session)*

| Pack code | Page title | Short description | Amount (₹) | Internal SKU | Razorpay URL (cowork fills) |
|---|---|---|---|---|---|
| **FR-1** | Axelis French (DELF A1/A2) — 1-on-1 Session | Single 1-on-1 session of French A1/A2, aligned to the DELF exam format. Practice booklets shared digitally. | 900 | TP-FR-101 | `_____________` |
| **FR-2** | Axelis French (DELF A1/A2) — Batch of 2 Session | Single session, batch of 2 students. Per-student price. | 1,300 | TP-FR-102 | `_____________` |
| **FR-3** | Axelis French (DELF A1/A2) — Batch of 3 Session | Single session, batch of 3 students. Per-student price. | 1,725 | TP-FR-103 | `_____________` |

## 7. German (Goethe · A1 / A2) 🇩🇪 *(per-session)*

| Pack code | Page title | Short description | Amount (₹) | Internal SKU | Razorpay URL (cowork fills) |
|---|---|---|---|---|---|
| **DE-1** | Axelis German (Goethe A1/A2) — 1-on-1 Session | Single 1-on-1 session of German A1/A2, aligned to the Goethe-Zertifikat exam format. Practice booklets shared digitally. | 900 | TP-DE-101 | `_____________` |
| **DE-2** | Axelis German (Goethe A1/A2) — Batch of 2 Session | Single session, batch of 2 students. Per-student price. | 1,300 | TP-DE-102 | `_____________` |
| **DE-3** | Axelis German (Goethe A1/A2) — Batch of 3 Session | Single session, batch of 3 students. Per-student price. | 1,725 | TP-DE-103 | `_____________` |

---

## Wiring back to the website

Once cowork returns the per-page Razorpay URLs, paste them into [`src/app/test-prep/page.jsx`](../src/app/test-prep/page.jsx) — every pack object in the `tracks` array accepts an optional `razorpayUrl` field:

```js
{ code: 'BL-103', label: '1-on-1 Crash', sessions: '12 sessions', price: '₹6,000', per: 'per student', highlight: true,
  razorpayUrl: 'https://rzp.io/rzp/PASTE_HERE' },
```

Any pack without `razorpayUrl` falls back to the shared catch-all link (`https://rzp.io/rzp/c5K4pKY`). Safe to ship partial — add URLs as Razorpay returns them.

## Totals summary (16 pages)

| Track | Pages |
|---|---|
| IELTS | 3 (BL-103, BL-101, BL-102) |
| PTE Academic | 3 (BL-106, BL-104, BL-105) |
| TOEFL / DET / CELPIP / Lang Cert | 1 (BL-110) — optional bundles on top |
| SAT (Digital) | 3 per-session + 3 bundle pages (recommended) = 3 to 6 |
| Spoken English | 3 (BL-109, BL-108, BL-107) |
| French DELF | 3 (FR-1, FR-2, FR-3) |
| German Goethe | 3 (DE-1, DE-2, DE-3) |
| **Total** | **16 mandatory pages, +3 SAT bundles = up to 19** |
