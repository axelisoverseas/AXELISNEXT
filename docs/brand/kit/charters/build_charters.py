#!/usr/bin/env python3
"""Reissue the three student charters (GAC, EPC, ILC) in the brand design.

v2.1 / ILC v1.3 (5 Nov 2026): GST is never refunded; an EPC student who goes
ahead only with GAC universities gets the service fee back. New versions are
written to NEW filenames: never overwrite an older PDF, because it is what
earlier students accepted.

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
EFFECTIVE = '9 November 2026'  # SET TO THE DEPLOY DATE; keep equal to CHARTER_EFFECTIVE in src/data/charterPromises.js
VERSION = '2.1'
ILC_VERSION = '1.3'

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
  table.annex td{{padding:1mm 2mm;font-size:8.3pt}}
  /* Both office addresses make the footer 3 lines. A position:fixed footer sits
     inside the content area and body text runs under it, so the footer is drawn
     in the @page margin boxes instead (Chrome 131+), and .ft is hidden. */
  @page{{margin:16mm 16mm 30mm;
    @bottom-left{{content:"Axelis Overseas Education Pvt Ltd \\B7  info@overseeducation.com \\B7  +91 88823 20522 \\B7  overseeducation.com/charters\\A Registered office: 1st Floor, Vrindavan Plaza, B-20, Nehru Chowk, Bilaspur, C.G. 495001\\A Corporate office: WorkFlo Ranka Junction, 224, 3rd Floor, KR Puram, Bengaluru 560016";
      white-space:pre; font-family:Lato,sans-serif; font-size:7.2pt; line-height:1.45; color:#586179; vertical-align:top; padding-top:4mm; border-top:.6pt solid #DDE3EE; width:140mm}}
    @bottom-right{{content:"{short} Charter v{ver}\\A Effective {eff}  \\B7  page " counter(page) " of " counter(pages);
      white-space:pre; text-align:right; font-family:Lato,sans-serif; font-size:7.2pt; line-height:1.45; color:#586179; vertical-align:top; padding-top:4mm; border-top:.6pt solid #DDE3EE}}
  }}
  .ft{{display:none}}
</style>
<div class="sheet">
<div class="hd"><img src="{kit}/assets/axelis-lockup-h-navy.svg" alt="Axelis Overseas"><div class="co"><b>Axelis Overseas Education Pvt&nbsp;Ltd</b>CIN U85500CT2023PTC014913<br>GSTIN 22AAZCA0637P1Z5<br>Regd: 1st Floor, Vrindavan Plaza, B-20, Nehru Chowk, Bilaspur, C.G. 495001<br>Corporate: WorkFlo Ranka Junction, 224, 3rd Floor, KR Puram, Bengaluru 560016</div></div>
'''

FOOT = '''<div class="ft"><div><b>Axelis Overseas Education Pvt Ltd</b> &middot; info@overseeducation.com &middot; +91 88823 20522 &middot; overseeducation.com/charters<br>Registered office: 1st Floor, Vrindavan Plaza, B-20, Nehru Chowk, Bilaspur, C.G. 495001<br>Corporate office: WorkFlo Ranka Junction, 224, 3rd Floor, KR Puram, Bengaluru 560016</div><div>{short} Charter v{ver}<br>Effective {eff}</div></div>
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

<p class="small" style="margin-top:6mm">This version replaces the {former} Charter Declaration in full. It applies to agreements accepted on or after {{eff}}. For an agreement accepted earlier, the visa-filing refund in Section 3 also applies, on the same terms; everything else stays as in the version accepted. Payments are collected through Cashfree. Razorpay and PayU are no longer used.</p>
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
    <tr><td>Onboarding deposit (refundable, GST is not)</td><td class="n">&#8377;9,999</td><td class="n">&#8377;1,799.82</td><td class="n">&#8377;11,798.82</td><td>Now, to start</td></tr>
    <tr><td>Consultation fee</td><td class="n">&#8377;0</td><td class="n">&ndash;</td><td class="n">&#8377;0</td><td>Never</td></tr>
  </tbody>
</table>
<p class="small">GST is added on top of the fee and itemised on your Cashfree receipt. A student on the Europe Public Charter is covered by this charter free, with no deposit and no other fee.</p>

<h2>3. When your deposit comes back</h2>
<div class="box yes"><b>You are placed.</b> The &#8377;9,999 deposit is refunded once your visa is granted, you have arrived, and you have paid your university tuition in full.</div>
<div class="box yes"><b>No offer.</b> The &#8377;9,999 deposit is refunded if no university on your preference list makes you any offer, conditional or unconditional.</div>
<p class="small"><b>GST is never refunded.</b> Only the &#8377;9,999 comes back; the &#8377;1,799.82 GST does not. Refunds are paid to the original payment method within 20 working days of the condition being met.</p>

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
  <li><b>Global Admissions Charter included free.</b> You may add private and paid-tuition universities to the same preference list, with no &#8377;9,999 deposit and no extra fee.</li>
  <li>A dedicated email ID used only for your applications. Until the success fee is paid, every university message is shared with you as a screenshot or forwarded email.</li>
  <li>Europass CV, Statement of Purpose and Letters of Recommendation.</li>
  <li>Visa SOP and visa filing, scholarship applications, education loans through 25+ lending partners, housing assistance, and part-time job guidance after you land.</li>
</ul>

<h2>2. What you pay</h2>
<table>
  <thead><tr><th>Fee</th><th class="n">Amount</th><th class="n">GST 18%</th><th class="n">Total</th><th>When</th></tr></thead>
  <tbody>
    <tr><td>Service fee</td><td class="n">&#8377;19,999</td><td class="n">&#8377;3,599.82</td><td class="n">&#8377;23,598.82</td><td>Now, to start</td></tr>
    <tr><td>Success fee</td><td class="n">&#8377;1,80,000</td><td class="n">&#8377;32,400</td><td class="n">&#8377;2,12,400</td><td>Only when you accept an offer from a tuition-free public university. Never on a private university offer.</td></tr>
    <tr class="tot"><td colspan="3">The most you ever pay</td><td class="n">&#8377;2,35,998.82</td><td></td></tr>
  </tbody>
</table>
<p class="small">GST is added on top of each fee and itemised on your Cashfree receipt. No offer, or an offer you decline, means no success fee.</p>

<h2>3. When your money comes back</h2>
<div class="box yes"><b>No offer from your preference list.</b> The &#8377;19,999 service fee is refunded if no university on your preference list makes you an offer.
<p class="fine">Assessed across every intake on your preference list, not one intake at a time, because public universities run more than one.</p></div>
<div class="box yes"><b>Visa filed for a Global Admissions Charter university.</b> If your student visa is filed for a Global Admissions Charter university (private or paid-tuition) and not for a tuition-free public university, the &#8377;19,999 service fee is refunded to the original payment method within 20 working days of your visa being granted and your arrival. You do not need to have paid your tuition first. The university named on your visa application decides this, and nothing else. From then on your file continues under the Global Admissions Charter terms and conditions, with no &#8377;9,999 deposit and no other fee.</div>
<div class="box yes"><b>Visa refused, and not down to you.</b> The &#8377;1,80,000 success fee is refunded if your visa is refused for a reason not attributable to you.</div>
<p class="small"><b>GST is never refunded.</b> Every refund above is the fee itself; the GST paid on it does not come back. Except where a different time is stated above, approved refunds are paid to the original payment method within 14 days.</p>

<h2>4. When it does not</h2>
<div class="box no">
<ul style="margin:0">
  <li>You receive an offer from any university on your preference list, public or private. A private university offer carries no success fee. Exception: if your visa is filed for a Global Admissions Charter university, the visa-filing refund in Section 3 applies.</li>
  <li>You leave the process yourself after the first shortlist has been shared. Filing your visa for a Global Admissions Charter university is not leaving the process.</li>
  <li>You decline an offer from a university that was not your preference. The service fee is not refunded, but no success fee is charged.</li>
</ul>
</div>
''' + COMMON_LEGAL.format(n=5, n2=6, n3=7, name='Europe Public Charter', former='Zero Tuition Fee') + FOOT


ILC = HEAD + '''
<p class="eyebrow" style="margin-top:7mm">Student charter</p>
<h1 style="margin-top:1mm">Ivy League Charter</h1>
<p class="ver">Version {ver} &middot; Effective {eff} &middot; Follows versions 1.0, 1.1 and 1.2</p>
<p class="lead" style="margin-top:4mm">For Master's and MBA applications to the universities on the ILC list (Annex A: the Ivy League, the Ivy Plus, the Public Ivies and the Little Ivies that take graduate students), with other US universities on the same list. This is the agreement between Axelis Overseas Education Pvt Ltd ("Axelis") and you, the student.</p>

<h2>1. What we do for you</h2>
<ul>
  <li>Profile evaluation, and a shortlist of programmes at universities on the ILC list (Annex A), balanced with other US universities. The list becomes your locked preference list on the status tracker.</li>
  <li>Essay and SOP strategy with feedback on every draft, a US-format r&eacute;sum&eacute;, guidance on letters of recommendation, and mock interviews for programmes that interview.</li>
  <li>Application submission; scholarship, fellowship and assistantship applications where offered; education loans through 25+ lending partners.</li>
  <li>I-20, SEVIS and F-1 visa filing with a mock visa interview, housing assistance and pre-departure support.</li>
</ul>

<h2>2. What you pay</h2>
<table>
  <thead><tr><th>Fee</th><th class="n">Amount</th><th class="n">GST 18%</th><th class="n">Total</th><th>When</th></tr></thead>
  <tbody>
    <tr><td>Service fee</td><td class="n">&#8377;19,999</td><td class="n">&#8377;3,599.82</td><td class="n">&#8377;23,598.82</td><td>Now, to start</td></tr>
    <tr><td>Success fee</td><td class="n">&#8377;1,80,000</td><td class="n">&#8377;32,400</td><td class="n">&#8377;2,12,400</td><td>Only when you accept an offer from a university on the ILC list (Annex A). Never on an offer from any other university.</td></tr>
    <tr class="tot"><td colspan="3">The most you ever pay</td><td class="n">&#8377;2,35,998.82</td><td></td></tr>
  </tbody>
</table>
<p class="small">GST is added on top of each fee and itemised on your Cashfree receipt. Not included, and paid by you directly: test fees (GRE, GMAT, TOEFL, IELTS, Duolingo), university application fees, the SEVIS fee and the visa fee.</p>

<h2 style="break-before:page;padding-top:4mm">3. When your money comes back</h2>
<div class="box yes"><b>No offer from your preference list.</b> The &#8377;19,999 service fee is refunded if no university on your preference list, on the ILC list or not, makes you an offer.
<p class="fine">Your preference list must contain at least five universities, at least two of them from the ILC list.</p></div>
<div class="box yes"><b>Visa filed for a Global Admissions Charter university.</b> If your student visa is filed for a Global Admissions Charter university, meaning any university that is not on the ILC list, the &#8377;19,999 service fee is refunded to the original payment method within 20 working days of your visa being granted and your arrival. You do not need to have paid your tuition first. The university named on your visa application decides this, and nothing else. From then on your file continues under the Global Admissions Charter terms and conditions, with no &#8377;9,999 deposit, no success fee and no other fee.</div>
<div class="box yes"><b>Visa refused, and not down to you.</b> Half of the success fee, &#8377;90,000, is refunded if your F-1 visa is refused for a reason not attributable to you.
<p class="fine">Half, because US student-visa refusals are common and the admission work is complete by then. Nothing is refunded if you have deferred the offer to a later intake.</p></div>
<p class="small"><b>GST is never refunded.</b> Every refund above is the fee itself; the GST paid on it does not come back. Except where a different time is stated above, approved refunds are paid to the original payment method within 14 days.</p>

<h2>4. When it does not</h2>
<div class="box no">
<ul style="margin:0">
  <li>You receive an offer from any university on your preference list, on the ILC list or not. Exception: if your visa is filed for a Global Admissions Charter university, the visa-filing refund in Section 3 applies.</li>
  <li>You defer an accepted offer to a later intake. The success fee stays due and none of it is refunded, even if a later visa is refused.</li>
  <li>You leave the process yourself after the first shortlist has been shared. Filing your visa for a Global Admissions Charter university is not leaving the process.</li>
  <li>You decline an offer from a university on your list. The service fee is not refunded; a success fee is due only if you accept an offer from the ILC list.</li>
</ul>
</div>
<p class="small" style="margin-top:3mm">No admission, scholarship, fellowship or visa is guaranteed. Axelis is not affiliated with, endorsed by or acting for the Ivy League or any university named in this charter; their names describe where we apply on your behalf.</p>
''' + COMMON_LEGAL.format(n=5, n2=6, n3=7, name='Ivy League Charter', former='(none)').replace('<p class="small" style="margin-top:6mm">This version replaces the (none) Charter Declaration in full. It applies to agreements accepted on or after {eff}. For an agreement accepted earlier, the visa-filing refund in Section 3 also applies, on the same terms; everything else stays as in the version accepted. Payments are collected through Cashfree. Razorpay and PayU are no longer used.</p>', '<p class="small" style="margin-top:6mm">This version applies to agreements accepted on or after {eff}. For an agreement accepted earlier, the visa-filing refund in Section 3 also applies, on the same terms; everything else stays as in the version accepted. Payments are collected through Cashfree.</p>') + FOOT

import json as _json
_G = _json.load(open(os.path.join(ROOT, 'src', 'data', 'ilcUniversities.json')))
_SRC = {'ivy': 'The eight members of the Ivy League.',
        'plus': 'Ivy-Plus as defined in Chetty, Deming &amp; Friedman, &ldquo;Diversifying Society&rsquo;s Leaders?&rdquo;, NBER Working Paper 31492 (2023): the Ivy League plus the four below.',
        'public': 'The 30 universities named in H. R. Greene &amp; M. W. Greene, <i>The Public Ivies: America&rsquo;s Flagship Public Universities</i> (2001). Main campus only, as named.',
        'little': 'The colleges shown as &ldquo;Little Ivies&rdquo; by Bloomberg Businessweek (22 December 2016) that admit graduate students. Covered for their graduate programmes only.'}
def _annex():
    rows = []
    n = 0
    for g in _G:
        brk = 'break-before:page;padding-top:4mm;' if g['key'] in ('public', 'little') else 'margin-top:4mm;'
        rows.append(f'<h2 style="{brk}">{g["label"]} ({len(g["members"])})</h2><p class="small">{_SRC[g["key"]]}</p><table class="annex"><tbody>')
        for m in g['members']:
            n += 1
            rows.append(f'<tr><td class="n" style="width:8mm">{n}</td><td>{m["name"]}</td><td>{m["city"]}, {m["state"]}</td></tr>')
        rows.append('</tbody></table>')
        if g.get('undergradOnly'):
            rows.append(f'<p class="small">Not on the ILC list, because they admit undergraduates only: {", ".join(g["undergradOnly"])}.</p>')
    return ('<div style="break-before:page;padding-top:4mm"><p class="eyebrow">Annex A</p><h1 style="margin-top:1mm;font-size:18pt">The ILC list</h1>'
            f'<p class="lead" style="margin-top:2mm">The {n} universities where the success fee applies. Main campuses only, as named. A university not on this list carries no success fee.</p>'
            + ''.join(rows) + '</div>')
ILC = ILC.replace(FOOT, _annex() + FOOT)

os.makedirs(PUB, exist_ok=True)
for short, tpl, stem, ver, eff in [('GAC', GAC, 'global-admissions-charter', VERSION, EFFECTIVE), ('EPC', EPC, 'europe-public-charter', VERSION, EFFECTIVE), ('ILC', ILC, 'ivy-league-charter', ILC_VERSION, EFFECTIVE)]:
    html = tpl.format(title=f'{short} Charter v{ver}', kit=KIT, short=short, ver=ver, eff=eff)
    hp = os.path.join(HERE, stem + '.html')
    open(hp, 'w', encoding='utf-8').write(html)
    pdf = os.path.join(PUB, f'{stem}-v{ver}.pdf')
    subprocess.run([CHROME, '--headless', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer',
                    f'--print-to-pdf={pdf}', 'file://' + hp], capture_output=True)
    print(f'  {stem}: {os.path.getsize(pdf)} bytes')
