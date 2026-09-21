#!/usr/bin/env python3
"""Render docs/students/NAMES_FOR_CONFIRMATION.md from the consolidated roster."""
import json,io
r=json.load(open('docs/students/consolidated-roster.json'))
def tier(s):
    if 'testimonials-live' in s['sources']: return 'A'
    if s.get('crm_status')=='Offer Issued': return 'OFFER'
    if s['status']=='DROPPED': return 'D'
    if 'incentive-sheet' in s['sources']: return 'B'
    return 'C'
for s in r: s['tier']=tier(s)
A=[s for s in r if s['tier']=='A']; Bt=[s for s in r if s['tier']=='B']
OF=[s for s in r if s['tier']=='OFFER']
LEG=[s for s in r if 'testimonials-legacy-photo' in s['sources']]
C=[s for s in r if s['tier']=='C']; D=[s for s in r if s['tier']=='D']
conflict=[s for s in r if s['status']=='DROPPED' and 'incentive-sheet' in s['sources']]
o=["# Axelis student roster, consolidated","",
"Updated 21 September 2026. Three local sources merged and de-duplicated.",
"Not committed, not published: `docs/students/` is in `.gitignore`.","",
"| Source | What it is |","|---|---|",
"| `axelis-student-testimonials/students.csv` | Curated, already live on `/testimonials`, photos on disk |",
"| `INCENTIVE DISTRIBUTION SHEET*.xlsx` | Commission paid, so the placement completed |",
"| `AO BDM CALLING SHEET - converted leads.csv` | 45 converted enquiries, carries drop status |","",
f"**{len(r)} unique students.** {len(A)} already public, {len(Bt)} commission-paid, "
f"{len(C)} converted with no outcome recorded, {len(D)} dropped.","",
"## Founder decisions applied","",
"- **Confirmed and kept**, though the university is unresolved across two sheets:",
"  pick one before the name appears anywhere.",
"- **Amardeep Singh Saluja — removed** from every extracted file. He was in the incentive sheet",
"  and the converted-leads sheet; both entries are gone. He was never on either website.","",
f"## Tier A — already live on the site ({len(A)})","",
"Already live on `/testimonials`. This is the CSV's own `source` column, not an assumption:",
"two further rows in that file are legacy photos marked *no live testimonial on site* and are",
"excluded here ("+", ".join(sorted(x["name"] for x in LEG))+").","",
"| Name | University | Course | Country | Intake | Status |","|---|---|---|---|---|---|"]
for s in sorted(A,key=lambda x:x['name']):
    o.append(f"| {s['name']} | {s['university']} | {s['course']} | {s['country']} | {s['intake']} | {s['status']} |")
o+=["",f"## Tier B — commission paid, not yet public ({len(Bt)})","",
"Commission was paid, so the placement completed. **Each needs that student's consent before",
"use** — these came off internal commission records, not anything a student agreed to publish.","",
"| Name | University | Course | Country | Intake |","|---|---|---|---|---|"]
for s in sorted(Bt,key=lambda x:x['name']):
    o.append(f"| {s['name']} | {s['university'] or '—'} | {s['course'] or '—'} | {s['country'] or '—'} | {s['intake'] or '—'} |")
o+=["",f"## Offer issued, from the Drive CRM export ({len(OF)})","",
"`My Drive/student.xlsx` is a partner-portal application export. These carry Primary Status",
"**Offer Issued**, which is a stronger record than a calling sheet. Passport, email and phone",
"columns in that file were deliberately not read.","",
"| Name | University | Course | Intake |","|---|---|---|---|"]
for s_ in sorted(OF,key=lambda x:x["name"]):
    o.append(f"| {s_['name']} | {s_['university'] or chr(8212)} | {s_['course'] or chr(8212)} | {s_['intake'] or chr(8212)} |")
o+=["",f"## Tier C — converted, outcome not recorded ({len(C)})","",
"In the converted-leads sheet with a course but no university and no drop marker. Whether they",
"were placed is not answerable from these files.","",
"| Name | Location | Course |","|---|---|---|"]
for s in sorted(C,key=lambda x:x['name']):
    o.append(f"| {s['name']} | {s['location'] or '—'} | {s['course'] or '—'} |")
o+=["",f"## Tier D — dropped, do not count as placed ({len(D)})","",
", ".join(sorted(s['name'] for s in D)),"","## What needs your call",""]
o+=[f"**Conflicts ({len(conflict)}).** These appear in the incentive sheet, meaning commission was",
"paid, *and* are marked dropped in the converted-leads sheet. Both cannot be right:",""]
for s in conflict:
    o.append(f"- **{s['name']}** — incentive sheet says placed"+(f" ({s['university']}, {s['course']})" if s['university'] else "")+"; converted-leads says dropped.")
o+=["","The incentive sheet is the stronger record, since money changed hands. Confirm before either",
"name is used.","",
"**Spelling.** Two students are each spelled two ways across the sheets. The alias map in",
"`build-student-roster.py` merges them as one person each; pick the correct spelling.","",
"**Two rows are still mis-parsed** in the incentive sheet, a column slipped:",
"two rows where the university and course fields hold fragments rather than values",
"(see the mis-parsed rows in the table above).","",
"**One converted student has nothing more locally.** They are in the converted-leads sheet",
"with no drop marker, and appear identically in the bescom copy of the",
"same calling sheet. No university, intake or outcome is recorded for her in any local file.",
"Placing her needs the Drive sheets or AgentCis.","",
"**Google Drive is largely unread.** About 25 roster-shaped files there are `.gsheet` pointers",
"holding no local content, including *closing students axelis overseas fall 26* and *SI-UK",
"Student Applications Tracker*. Reading them needs the Drive connector.","",
"**One student live on `/testimonials` has a finance-record discrepancy** that is deliberately",
"not written down here. Ask in session before reusing testimonial names.","",
"## Corroborated across sources",""]
for s in sorted([x for x in r if len(set(x['sources']))>1],key=lambda x:x['name']):
    o.append(f"- **{s['name']}** — {' + '.join(sorted(set(s['sources'])))}")
o+=["","**Swapnil Arya** is in all three, with matching university and course in each.","",
"## Before any name goes on the site","",
"Tier A is already public, which is a fact about the site, not a record of consent: the",
"source file contains no consent or permission column. Tiers B and C came from commission",
"records, a partner-portal export and a calling sheet.",
"Each needs that student's consent before appearing as a testimonial, case study or logo wall.",""]
io.open('docs/students/NAMES_FOR_CONFIRMATION.md','w',encoding='utf-8').write("\n".join(o))
print(f"A={len(A)} B={len(Bt)} C={len(C)} D={len(D)} total={len(r)} conflicts={[s['name'] for s in conflict]}")
