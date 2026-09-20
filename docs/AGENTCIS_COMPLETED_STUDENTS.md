# Completed students — what the systems actually say

Checked 20 Sep 2026. Sources: Slack (#operation-axelis-blr ops audit, 17 Sep),
HubSpot CRM, AgentCis tenant lookup.

## AgentCis: not directly readable from here

There is no AgentCis MCP connector in this session. The tenant is
`axelisoverseas.agentcisapp.com` (agentcis**app**.com — `agentcis.com` and
`app.agentcis.com` are dead ends). It loads a login form with no saved Chrome
session, and entering credentials is something I don't do. So the figures below
come from the internal record of AgentCis, not from AgentCis itself.

## Completed — visa done, case closable

Three, per the 17 Sep ops audit, which instructs Sourav to close them in
AgentCis so they leave the board:

- Keertan
- Arnav
- Divyanshi

Nothing else in Slack marks a 2026-cycle case as visa-granted. Earlier cohorts
have their own completions (Rajat, Aug 2024, is the clearest single example),
but they are scattered across EOD reports rather than held as a status anywhere.

## Still open, not completed

Rajesh (Wismar sign-off, oldest at 46 days), Amardeep (GISMA ECTS), Ayush and
Samridhi (Vistula tuition, Cassino DOV 15 Oct), Akanksha (Poland appointment
25 Sep), Ashutosh, Nishika, Ashish, Datta, Yamak, Sheela, Shourya.

## HubSpot, for cross-reference

B2C — 2026 Intake pipeline, ~2,521 deals:

| Stage | Deals |
|---|---|
| 1. New Lead | 1,908 |
| Closed Lost | 335 |
| 2. Attempting Contact | 262 |
| 4. Session 1 Booked | 5 |
| 8. Closed Won — Paid | 5 |
| 3. Interested — Qualified | 3 |
| 5. Option Sheet Delivered | 3 |

Closed Won means paid, not placed. The portal holds only standard HubSpot
objects — there is no Student or Application custom object, so placement
outcomes are not tracked there at all.

## The claim that does not survive this

`src/data/siteData.js` line 34 says **"5,000+ Students Sent"**, and the FAQ
repeats "helped 5,000+ students". The CRM shows 2,521 B2C deals in total across
the 2026 pipeline, 5 of them paid, and 3 visa outcomes this cycle. Even counting
every prior year, 5,000 placements is not a number these systems can support.

This is a quantified performance claim on a commercial site. Under the CCPA 2019
and the ASCI code an advertiser has to be able to substantiate one on request,
and a study-abroad consultancy is exactly the sector where that gets tested. It
also sits next to "Outcome Guaranteed" in the page title, which compounds it.

It needs either a substantiating record or a different number. That is a call for
Rishabh, not something to quietly edit.
