# Claude Browser — fix the Cashfree 401

Paste the block below into Claude with browser access.

**Context it needs and cannot discover on its own:** the code and the Vercel
configuration are both correct and verified. The Cashfree API key pair is being
refused with `401 authentication Failed`, tested both from Vercel and from a
local machine, so the fault is inside the Cashfree account — not the site.

---

## The prompt

> You are fixing a Cashfree API authentication failure for Axelis Overseas
> Education. The user is signed in at `merchant.cashfree.com` and at
> `vercel.com`.
>
> **Already established — do not re-investigate:**
> - Two Vercel projects (`axelisnext`, `axelis-b2b`) both have
>   `CASHFREE_APP_ID` (29 chars) and `CASHFREE_SECRET_KEY` (54 chars) set for
>   Production, with no whitespace and no truncation. Verified.
> - Both are on current deployments.
> - The same key pair returns `401 {"type":"authentication_error","message":
>   "authentication Failed"}` when called directly against
>   `https://api.cashfree.com/pg/orders`, from outside Vercel entirely.
> - Order creation on this account **does** work via OAuth, so the account and
>   the Payment Gateway product are active. Only these static API keys fail.
>
> So the question is narrow: **why is Cashfree refusing this key pair?**
>
> ### Rules
>
> - **Do not type, paste, or copy any API key, secret, password or token into
>   any field.** If a step needs that, stop and tell the user to do it.
> - **Do not click Regenerate, Revoke, Delete or Save on any key** until you
>   have reported what you found and the user has said to proceed. Regenerating
>   invalidates the current key and can break anything else using it.
> - Do not make a payment or create an order.
> - Report what you see as you go.
>
> ### Task 1 — Read the API key configuration
>
> In the Cashfree dashboard, go to **Developers → API Keys** (it may sit under
> Developers → Credentials or Settings depending on the account). Report:
>
> 1. Is the dashboard in **Production** or **Test/Sandbox** mode? Say which,
>    and where you read it.
> 2. How many key pairs exist, when each was created, and whether any is marked
>    inactive, expired, revoked or pending.
> 3. **Does the Client ID shown start with `CF1349`?** Do not report the rest of
>    it. This tells us whether the key in use is the current one or a stale copy.
> 4. Is there an **IP allowlist / whitelist / IP restriction** on the account or
>    on a key? If yes, list exactly what is allowed. This is the leading
>    hypothesis: a pinned IP would produce this exact 401 from both Vercel and a
>    local machine, and Vercel's IPs are dynamic so it can never satisfy one.
>
> ### Task 1b — Confirm the keys are PAYMENT GATEWAY keys
>
> Cashfree issues separate credentials per product — Payment Gateway, Payouts,
> and Secure ID each have their own. A perfectly valid Payouts or Secure ID key
> returns exactly this `401 authentication Failed` when used against
> `api.cashfree.com/pg/`. This is now the leading hypothesis alongside the IP
> allowlist.
>
> Report: under which product heading do the API keys live? If the dashboard
> offers keys in more than one place (e.g. a Payouts section with its own
> credentials), say so and report which section the `CF1349…` Client ID belongs
> to. The keys must come from the **Payment Gateway** section.
>
> ### Task 2 — Check for account-level gating
>
> 1. Open the dashboard home and report any banner about products in review,
>   pending activation, KYC, or restricted features. An earlier screenshot
>   showed "Products In-Review: Global Collections" — say whether that is still
>   there and whether Payment Gateway itself shows as fully active.
> 2. Find whether **API access / server-to-server** is separately enabled. This
>   account already has `link_creation_api` disabled, so feature-level gating is
>   known to exist here — check whether the PG order API is gated the same way.
> 3. Look for any setting named "API keys restricted to", "allowed origins",
>   "webhook/API security", or two-factor requirement on API use.
>
> ### Task 3 — Report, then stop
>
> Write up:
> - Production or test mode
> - Whether an IP allowlist exists, and its contents
> - Whether the live Client ID prefix matches `CF1349`
> - Any pending/in-review/gating banner
> - Your single best explanation for the 401
>
> Then **stop and ask the user** whether to regenerate the key pair. Do not
> regenerate on your own initiative.
>
> ### If the user says to regenerate
>
> You may click Regenerate and confirm. Then **stop again**: tell the user to
> copy the new Client ID and Client Secret themselves into both Vercel projects
> as `CASHFREE_APP_ID` and `CASHFREE_SECRET_KEY` (Type: Secret, Environment:
> Production), and redeploy each. You must not handle the values.
>
> ### Verification the user can run afterwards
>
> Loading these URLs now reports whether Cashfree actually accepts the keys,
> not merely whether the variables exist:
>
> - `https://www.overseeducation.com/api/cashfree/health`
> - `https://www.axelisoverseas.com/api/cashfree/health`
>
> `"ready": true` with `"credentialsAccepted": {"authenticated": true}` means
> checkout works. `"authenticated": false` shows Cashfree's own reason.

---

## Note on the secret already in circulation

The current secret was at one point pasted into a Vercel **variable name**
field, which is not masked, and appears in screenshots. It also sits in
plaintext at `~/Documents/API.txt`. Whatever the outcome above, that key should
be rotated and the file deleted once Vercel holds the values.
