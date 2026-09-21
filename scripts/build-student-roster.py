#!/usr/bin/env python3
"""Merge every local Axelis student source into one de-duplicated roster.

Sources, strongest first:
  1. axelis-student-testimonials/students.csv  - curated; its own `source` column
     says whether each row is actually live on /testimonials. Two legacy rows are
     photo-only and must NOT be counted as published.
  2. INCENTIVE DISTRIBUTION SHEET*.xlsx        - commission paid, so placed.
  3. Google Drive My Drive/student.xlsx        - partner-portal CRM export, carries
     Primary Status (Offer Issued / Case Closed / ...). PII columns (passport,
     email, phone) are deliberately never read.
  4. AO BDM CALLING SHEET - converted leads.csv - 45 enquiries, carries drop status.

Output lands in docs/students/, which is gitignored: these are real students and
none of it may be published without per-student consent.

Run:  python3 scripts/build-student-roster.py && python3 scripts/student-roster-report.py
"""
import csv, json, io, re, difflib, sys, os
B="/Users/rishabhagrawal/Downloads/Personal_Backup_Cardiff_Uni/Downloads/15 march downloads backup"
T="/Users/rishabhagrawal/Downloads/axelis-student-testimonials/students.csv"
ALIAS={'ishaanmaalik':'ishaanmalik','rajatlimayee':'rajatlimaye'}
def norm(n):
    k=re.sub(r'[^a-z]','',n.lower())
    return ALIAS.get(k,k)
roster={}
def add(name,**kw):
    name=" ".join(name.split()).strip()
    if not name or name.lower() in ('unknown',): return
    k=norm(name)
    r=roster.setdefault(k,{"name":name,"sources":[],"university":"","course":"","country":"","intake":"","status":"","location":"","crm_status":""})
    if len(name)>len(r["name"]): r["name"]=name
    for f,v in kw.items():
        if f=="source": r["sources"].append(v)
        elif f=="crm_status" and v:
            RANK={'Offer Issued':5,'With CAS Team/Payment Team':4,'Application Processed':3,
                  'Case Closed':2,'Application Fee Pending':2,'Suggested Alternate Institution':1,
                  'Application Not Processed':1,'Non Commissionable Cases':1,'Enquiry':0}
            if RANK.get(v,0) >= RANK.get(r.get("crm_status",""),-1): r[f]=v
        elif v and not r.get(f): r[f]=v

# Tier A: curated testimonials (already public on /testimonials)
for row in csv.DictReader(io.open(T,encoding='utf-8')):
    if row['name'].strip().lower().startswith('unknown'): continue
    live = 'no live testimonial' not in row['source'].lower()
    add(row['name'],university=row['university'],course=row['course'],country=row['country'],
        intake=row['intake'],status=row['visa_status'],
        source=("testimonials-live" if live else "testimonials-legacy-photo"))

# Tier B: incentive sheets (commission paid = placed)
for s in json.load(open('docs/students/candidates-from-incentive-sheets.json')):
    add(s['name'],university=s.get('university',''),course=s.get('course',''),
        country=s.get('country',''),intake=s.get('intake',''),source="incentive-sheet")

# Tier C: converted-leads BDM sheet (carries drop status)
DROP=re.compile(r'drop|hold',re.I)
for row in csv.reader(io.open(B+"/CSV CRM/AO BDM CALLING SHEET - converted leads.csv",encoding='utf-8')):
    if not row or row[0].strip() in ('','Name'): continue
    nm=row[0].strip(); loc=row[1].strip() if len(row)>1 else ''; c=row[2].strip() if len(row)>2 else ''
    add(nm,location=loc,status=("DROPPED" if DROP.search(c) else ""),source="converted-leads")

# Tier: Drive CRM export (partner-portal application records)
try:
    for r in json.load(open('docs/students/drive-crm-export.json')):
        st=r['Primary Status']
        add(r['Student Name'],university=r['University'],course=r['Course'],
            intake=r['Intake'],source="drive-crm",crm_status=st)
except FileNotFoundError: pass

# Amardeep removed per founder instruction
for k in [k for k in roster if 'amardeep' in k]: del roster[k]
json.dump(sorted(roster.values(),key=lambda r:r['name']),
          io.open('docs/students/consolidated-roster.json','w',encoding='utf-8'),indent=2,ensure_ascii=False)
rs=list(roster.values())
pub=[r for r in rs if 'testimonials-live' in r['sources']]
paid=[r for r in rs if 'incentive-sheet' in r['sources']]
drop=[r for r in rs if r['status']=='DROPPED']
multi=[r for r in rs if len(set(r['sources']))>1]
print(f"unique students     {len(rs)}")
print(f"  live on site      {len(pub)}")
print(f"  commission paid   {len(paid)}")
print(f"  marked DROPPED    {len(drop)}")
print(f"  in 2+ sources     {len(multi)}")
print("\ncorroborated across sources:")
for r in sorted(multi,key=lambda r:r['name']): print(f"  {r['name']:34} {'+'.join(sorted(set(r['sources'])))}")
print("\nDROPPED (must not be counted as placed):")
print("  "+", ".join(sorted(r['name'] for r in drop)))
