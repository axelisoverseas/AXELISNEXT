#!/usr/bin/env python3
"""Generate an HTML email signature per team member, plus a preview sheet.

Email clients are not browsers. Gmail strips <style> blocks, Outlook renders
through Word's engine, and most clients ignore flexbox, grid and CSS shorthand.
So this emits table-based HTML with every style inline, which is the only thing
that survives across Gmail, Outlook, Apple Mail and the mobile clients.

Two more constraints that shape the output:
  - SVG does not render in Outlook or most webmail, so the mark is a hosted PNG.
  - Local file paths break the moment the mail leaves the machine, so the image
    is referenced by absolute https URL on the live site.

Run:  python3 scripts/build-email-signatures.py
Out:  docs/brand/signatures/<slug>.html  and  _preview.html
"""
import io, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'docs', 'brand', 'signatures')
TEAM = json.load(io.open(os.path.join(OUT, 'team.json'), encoding='utf-8'))

NAVY, BLUE, DIM, RULE = '#16265C', '#1D4ED8', '#586179', '#DDE3EE'
MARK = 'https://www.overseeducation.com/brand/axelis-mark-email-116.png'
SITE = 'https://www.overseeducation.com'
FONT = "Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif"

CIN = 'CIN U85500CT2023PTC014913'
GST = 'GSTIN 22AAZCA0637P1Z5'
OFFICES = 'Bengaluru &amp; Bilaspur, India'


def slug(name):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')


def signature(m):
    """One signature. Fixed 58px mark per the brand placement table."""
    phone = ''
    if m['phone']:
        phone = (
            '<span style="color:%s;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>'
            '<a href="tel:%s" style="color:%s;text-decoration:none;">%s</a>'
        ) % (RULE, m['phone'].replace(' ', ''), DIM, m['phone'])

    email_cell = (
        '<a href="mailto:%s" style="color:%s;text-decoration:none;">%s</a>' % (m['email'], BLUE, m['email'])
        if m['email'] else
        '<span style="color:#B3271E;">[email address not confirmed]</span>'
    )

    return """<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:%(font)s;">
  <tr>
    <td style="padding:0 16px 0 0;vertical-align:top;">
      <img src="%(mark)s" width="58" height="58" alt="Axelis Overseas"
           style="display:block;width:58px;height:58px;border:0;outline:none;">
    </td>
    <td style="padding:0;vertical-align:top;border-left:2px solid %(navy)s;padding-left:16px;">
      <div style="font-size:15px;line-height:20px;font-weight:bold;color:%(navy)s;">%(name)s</div>
      <div style="font-size:12px;line-height:18px;color:%(dim)s;">%(role)s</div>
      <div style="font-size:12px;line-height:18px;color:%(navy)s;font-weight:bold;padding-top:6px;">
        Axelis Overseas Education Pvt Ltd
      </div>
      <div style="font-size:12px;line-height:18px;padding-top:2px;">
        %(email)s%(phone)s
      </div>
      <div style="font-size:12px;line-height:18px;">
        <a href="%(site)s" style="color:%(dim)s;text-decoration:none;">overseeducation.com</a>
        <span style="color:%(rule)s;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <span style="color:%(dim)s;">%(offices)s</span>
      </div>
      <div style="font-size:10px;line-height:15px;color:%(dim)s;padding-top:8px;border-top:1px solid %(rule)s;margin-top:8px;">
        %(cin)s &nbsp;&middot;&nbsp; %(gst)s
      </div>
    </td>
  </tr>
</table>""" % dict(font=FONT, mark=MARK, navy=NAVY, dim=DIM, rule=RULE, site=SITE,
                   name=m['name'], role=m['role'], email=email_cell, phone=phone,
                   offices=OFFICES, cin=CIN, gst=GST)


cards = []
for m in TEAM['members']:
    html = signature(m)
    path = os.path.join(OUT, slug(m['name']) + '.html')
    io.open(path, 'w', encoding='utf-8').write(html)
    flag = ('<span style="background:#FBEAE9;color:#B32318;font-size:11px;font-weight:700;'
            'padding:2px 8px;border-radius:99px;">EMAIL UNCONFIRMED</span>'
            if not m['verified'] else
            '<span style="background:#E8F5ED;color:#186A3B;font-size:11px;font-weight:700;'
            'padding:2px 8px;border-radius:99px;">VERIFIED</span>')
    cards.append(
        '<div style="background:#fff;border:1px solid %s;border-radius:12px;padding:22px;margin-bottom:14px;">'
        '<div style="font-family:%s;font-size:11px;letter-spacing:.1em;text-transform:uppercase;'
        'color:#8A93A8;margin-bottom:14px;">%s &nbsp; %s</div>%s</div>'
        % (RULE, FONT, slug(m['name']) + '.html', flag, html))
    print('  %-34s %s' % (slug(m['name']) + '.html', 'verified' if m['verified'] else 'UNCONFIRMED'))

preview = """<meta charset="utf-8"><title>Axelis Email Signatures</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap">
<div style="background:#EEF1F6;padding:28px 16px;font-family:%s;">
<div style="max-width:720px;margin:0 auto;">
<h1 style="font-size:26px;font-weight:900;color:%s;margin:0 0 6px;letter-spacing:-.02em;">Email signatures</h1>
<p style="color:%s;font-size:14px;margin:0 0 6px;">One file per person in this folder. Open the file,
select all, copy, and paste into Gmail Settings &rarr; Signature. Paste keeps the formatting; do not
retype it.</p>
<p style="color:%s;font-size:14px;margin:0 0 22px;">The mark loads from the live site, so it only
renders once <code>brand/axelis-mark-email-116.png</code> is deployed.</p>
%s
</div></div>""" % (FONT, NAVY, DIM, DIM, "\n".join(cards))
io.open(os.path.join(OUT, '_preview.html'), 'w', encoding='utf-8').write(preview)
print('\n  %d signatures + _preview.html' % len(TEAM['members']))
