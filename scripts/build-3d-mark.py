import io, os, re

T = os.environ['CLAUDE_JOB_DIR'] + '/tmp'
src = io.open(T + '/brand-assets/axelis-mark-navy.svg', encoding='utf-8').read()
defs = re.search(r'<defs>.*?</defs>', src, re.S).group(0)
body = re.search(r'(<g id="e867b6e268">.*?</g>)\s*</svg>', src, re.S).group(1)


def mk(idp, light, mid, dark, shadow):
    b = body.replace('fill:#16265C', 'fill:url(#%s-g)' % idp)
    back = body.replace('fill:#16265C', 'fill:%s' % dark)
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 375" width="375" '
        'height="375" role="img" aria-label="Axelis, dimensional mark">\n'
        '<title>Axelis</title><defs>\n'
        '<linearGradient id="%s-g" x1="18%%" y1="8%%" x2="82%%" y2="95%%">'
        '<stop offset="0%%" stop-color="%s"/><stop offset="46%%" stop-color="%s"/>'
        '<stop offset="100%%" stop-color="%s"/></linearGradient>\n'
        '<radialGradient id="%s-s" cx="34%%" cy="26%%" r="42%%">'
        '<stop offset="0%%" stop-color="#fff" stop-opacity=".55"/>'
        '<stop offset="55%%" stop-color="#fff" stop-opacity=".10"/>'
        '<stop offset="100%%" stop-color="#fff" stop-opacity="0"/></radialGradient>\n'
        '<filter id="%s-l" x="-25%%" y="-25%%" width="150%%" height="160%%">'
        '<feDropShadow dx="0" dy="9" stdDeviation="11" flood-color="%s" flood-opacity=".40"/>'
        '<feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="%s" flood-opacity=".28"/>'
        '</filter></defs>\n%s\n'
        '<g filter="url(#%s-l)"><g transform="translate(0,7)" opacity=".30">%s</g>%s</g>\n'
        '<ellipse cx="163" cy="139" rx="70" ry="58" fill="url(#%s-s)"/></svg>'
    ) % (idp, light, mid, dark, idp, idp, shadow, shadow, defs, idp, back, b, idp)


# name: (highlight, accent, deep, shadow)
SETS = {
    'emerald':  ('#3FB27A', '#046A38', '#03301B', '#021A0E'),
    'teal':     ('#49B3A8', '#0F766E', '#06352F', '#031C19'),
    'violet':   ('#A377F0', '#5B21B6', '#2C0B5C', '#170533'),
    'plum':     ('#C766A0', '#7A1E56', '#3B0C28', '#210617'),
    'bronze':   ('#D08A42', '#8A4B16', '#42230A', '#251305'),
    'forest':   ('#3E8A5F', '#14432A', '#0A2317', '#04120B'),
    'graphite': ('#8A8A93', '#2E2E32', '#131316', '#08080A'),
}

import xml.etree.ElementTree as ET
for k, (l, m, d, s) in SETS.items():
    path = '%s/m3d-%s.svg' % (T, k)
    io.open(path, 'w', encoding='utf-8').write(mk(k, l, m, d, s))
    ET.parse(path)          # fail loudly rather than ship invalid XML again
    print('  ok  m3d-%s.svg' % k)
