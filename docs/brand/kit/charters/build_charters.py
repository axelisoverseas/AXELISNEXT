#!/usr/bin/env python3
"""Reissue the two student charters (GAC and EPC) in the brand design.

Version 2.0 retires the Razorpay-era Zero Consultation Fee and Zero Tuition Fee
declarations. Terms follow the current checkout (see
src/data/charterPromises.js, which the /charters page renders from the same
decisions). Output: HTML here, PDF into public/charters/ for the site to link.

Run from the repo root:  python3 docs/brand/kit/charters/build_charters.py
"""
import os, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
KIT = os.path.join(ROOT, 'docs', 'brand', 'kit')
HERE = os.path.join(KIT, 'charters')
PUB = os.path.join(ROOT, 'public', 'charters')
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
EFFECTIVE = '26 September 2026'
VERSION = '2.0'

HEAD = '''<meta charset="utf-8"><title>{title}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400&display=swap">
<link rel="stylesheet" href="{kit}/assets/doc.css">
<link rel="stylesheet" href="{kit}/assets/orient-portrait.css">
<style>
  table td:first-child{{width:36%}}
  .ver{{font-size:7.5pt;color:#586179;margin-top:1mm}}
  .yes{{border-left:2pt solid #186A3B;background:#F1F8F3}}
  .no{{border-left:2pt solid #9A2222;background:#FBF1F1}}
  .fine{{font-size:7.8pt;color:#586179;font-style:italic;margin-top:1mm}}
  ol.c{{padding-left:5mm}} ol.c li{{margin-bottom:1.6mm}}
</style>
<div class="sheet">
<div class="hd"><img src="{kit}/assets/axelis-lockup-h-navy.svg" alt="Axelis Overseas"><div class="co"><b>Axelis Overseas Education Pvt&nbsp;Ltd</b>CIN U85500CT2023PTC014913<br>GSTIN 22AAZCA0637P1Z5<br>Regd: 1st Floor, Vrindavan Plaza, B-20, Nehru Chowk, Bilaspur, C.G. 495001<br>Corporate: WorkFlo Ranka Junction, 224, 3rd Floor, KR Puram, Bengaluru 560016</div></div>
'''

FOOT = '''<div class="ft"><div><b>Axelis Overseas Education Pvt Ltd</b><br>info@overseeducation.com &middot; +91 88823 20522 &middot; overseeducation.com/charters</div><div>{short} Charter v{ver}<br>Effective {eff}</div></div>
</div>'''

COMMON_LEGAL = '''
<h2>{n}. Your part</h2>
<ol class="c">
  <li><b>Preference list.</b> You rank the universities you want on the status tracker. Once you confirm, the order is locked. The same list appears in your student portal.</li>
  <li><b>Only the list counts.</b> Refunds are assessed against the universities on your preference list and nothing else.</li>
  <li><b>Genuine information.</b> Every document and detail you give us must be true. Forged documents, fraud or defamation end this agreement and may attract liability under the Bharatiya Nyaya Sanhita, 2023, including Sections 316, 318 and 336 to 338.</li>
</ol>

<h2>{n2}. Law and disputes</h2>
<p>This agreement is governed by the laws of India, including the Information Technology Act, 2000 and the Bharatiya Nyaya Sanhita, 2023. Disputes are subject to the exclusive jurisdiction of the courts of Bilaspur, Chhattisgarh.</p>

<h2>{n3}. Electronic acceptance</h2>
<p>This agreement is executed electronically. By ticking <i>"I have read and agree to the {name}"</i> and completing payment on the Axelis Cashfree checkout, you confirm that you have read and understood it, including the refund conditions, and that the information you entered is true. This is a binding electronic signature under Section 10A of the Information Technology Act, 2000. No physical signature is required. Your name, phone and email as entered at checkout form part of this agreement.</p>

<p class="small" style="margin-top:6mm">This version replaces the {former} Charter Declaration in full. Payments are collected through Cashfree. Razorpay and PayU are no longer used.</p>
'''

GAC = HEAD + '''
<p class="eyebrow" style="margin-top:7mm">Student charter</p>
<h1 style="margin-top:1mm">Global Admissions Charter</h1>
<p class="ver">Version {ver} &middot; Effective {eff} &middot; Formerly the Zero Consultation Fee Charter</p>
<p class="lead" style="margin-top:4mm">For admission to private and paid-tuition universities abroad. This is the agreement between Axelis Overseas Education Pvt Ltd ("Axelis") and you, the student.</p>

<h2>1. What we do for you</h2>
<ul>
  <li>Shortlisting in three rounds: your subject, your budget, then the final university list.</li>
  <li>A status tracker with every shortlisted university and its deadline, which becomes your locked preference list.</li>
  <li>A dedicated email ID for university correspondence, with the credentials shared with you.</li>
  <li>Education loan support through 25+ lending partners, accommodation assistance, and visa processing.</li>
</ul>

<h2>2. What you pay</h2>
<table>
  <thead><tr><th>Fee</th><th class="n">Amount</th><th class="n">GST 18%</th><th class="n">Total</th><th>When</th></tr></thead>
  <tbody>
    <tr><td>Onboarding deposit (refundable)</td><td class="n">&#8377;9,999</td><td class="n">&#8377;1,800</td><td class="n">&#8377;11,799</td><td>Now, to start</td></tr>
    <tr><td>Consultation fee</td><td class="n">&#8377;0</td><td class="n">&ndash;</td><td class="n">&#8377;0</td><td>Never</td></tr>
  </tbody>
</table>
<p class="small">GST is added on top of the fee and itemised on your Cashfree receipt.</p>

<h2>3. When your deposit comes back</h2>
<div class="box yes"><b>You are placed.</b> The full &#8377;9,999 is refunded once your visa is granted, you have arrived, and you have paid your university tuition in full.</div>
<div class="box yes"><b>No offer.</b> The full &#8377;9,999 is refunded if no university on your preference list makes you any offer, conditional or unconditional.</div>
<p class="small">Refunds are paid to the original payment method within 20 working days of the condition being met.</p>

<h2>4. When it does not</h2>
<div class="box no">
<ul style="margin:0">
  <li>You change your mind or your destination.</li>
  <li>You withdraw from the process yourself.</li>
  <li>You decline an offer from a university on your preference list.</li>
  <li>You leave Axelis after receiving an offer from a university on your preference list. Before leaving, you acknowledge a Termination of Declaration.</li>
</ul>
</div>
''' + COMMON_LEGAL.format(n=5, n2=6, n3=7, name='Global Admissions Charter', former='Zero Consultation Fee') + FOOT

EPC = HEAD + '''
<p class="eyebrow" style="margin-top:7mm">Student charter</p>
<h1 style="margin-top:1mm">Europe Public Charter</h1>
<p class="ver">Version {ver} &middot; Effective {eff} &middot; Formerly the Zero Tuition Fee Charter</p>
<p class="lead" style="margin-top:4mm">For admission to tuition-free public universities in Europe. This is the agreement between Axelis Overseas Education Pvt Ltd ("Axelis") and you, the student.</p>

<h2>1. What we do for you</h2>
<ul>
  <li>Profile evaluation: the right subject and country for your budget.</li>
  <li>Shortlisting of tuition-free public universities, and a status tracker that becomes your locked preference list.</li>
  <li>A dedicated email ID used only for your applications. Until the success fee is paid, every university message is shared with you as a screenshot or forwarded email.</li>
  <li>Europass CV, Statement of Purpose and Letters of Recommendation.</li>
  <li>Visa SOP and visa filing, scholarship applications, education loans through 25+ lending partners, housing assistance, and part-time job guidance after you land.</li>
</ul>

<h2>2. What you pay</h2>
<table>
  <thead><tr><th>Fee</th><th class="n">Amount</th><th class="n">GST 18%</th><th class="n">Total</th><th>When</th></tr></thead>
  <tbody>
    <tr><td>Service fee</td><td class="n">&#8377;19,999</td><td class="n">&#8377;3,600</td><td class="n">&#8377;23,599</td><td>Now, to start</td></tr>
    <tr><td>Success fee</td><td class="n">&#8377;1,80,000</td><td class="n">&#8377;32,400</td><td class="n">&#8377;2,12,400</td><td>Only when you accept an offer from a tuition-free public university</td></tr>
    <tr class="tot"><td colspan="3">The most you ever pay</td><td class="n">&#8377;2,35,999</td><td></td></tr>
  </tbody>
</table>
<p class="small">GST is added on top of each fee and itemised on your Cashfree receipt. No offer, or an offer you decline, means no success fee.</p>

<h2>3. When your money comes back</h2>
<div class="box yes"><b>No offer from your preference list.</b> The &#8377;19,999 service fee is refunded in full if no university on your preference list makes you an offer.
<p class="fine">Assessed across every intake on your preference list, not one intake at a time, because public universities run more than one.</p></div>
<div class="box yes"><b>Visa refused, and not down to you.</b> The success fee you have paid is refunded in full if your visa is refused for a reason not attributable to you.</div>
<p class="small">Approved refunds are paid to the original payment method within 14 days.</p>

<h2>4. When it does not</h2>
<div class="box no">
<ul style="margin:0">
  <li>You receive an offer from any university on your preference list, public or private.</li>
  <li>You leave the process yourself after the first shortlist has been shared.</li>
  <li>You decline an offer from a university that was not your preference. The service fee is not refunded, but no success fee is charged.</li>
</ul>
</div>
''' + COMMON_LEGAL.format(n=5, n2=6, n3=7, name='Europe Public Charter', former='Zero Tuition Fee') + FOOT

os.makedirs(PUB, exist_ok=True)
for short, tpl, stem in [('GAC', GAC, 'global-admissions-charter'), ('EPC', EPC, 'europe-public-charter')]:
    html = tpl.format(title=f'{short} Charter v{VERSION}', kit=KIT, short=short, ver=VERSION, eff=EFFECTIVE)
    hp = os.path.join(HERE, stem + '.html')
    open(hp, 'w', encoding='utf-8').write(html)
    pdf = os.path.join(PUB, f'{stem}-v{VERSION}.pdf')
    subprocess.run([CHROME, '--headless', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer',
                    f'--print-to-pdf={pdf}', 'file://' + hp], capture_output=True)
    print(f'  {stem}: {os.path.getsize(pdf)} bytes')
