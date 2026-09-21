/**
 * Browser probes, shared between the Playwright suite and the standalone
 * auditor in scripts/ui-audit.mjs.
 *
 * These are strings rather than functions because they are serialised into
 * page.evaluate(). Keeping them in one file means the suite and the ad-hoc
 * audit cannot drift apart and report different numbers, which is exactly
 * what happened with the hand-rolled contrast checks earlier in this project.
 */

export const CONTRAST_PROBE = `() => {
  const lin = (c) => { c /= 255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
  const lum = ([r,g,b]) => 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b);
  const parse = (s) => {
    const m = (s || '').match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(',').map((x) => parseFloat(x));
    return { rgb: p.slice(0,3), a: p.length > 3 ? p[3] : 1 };
  };
  const blend = (fg, a, bg) => fg.map((c, i) => Math.round(a * c + (1 - a) * bg[i]));

  // Walk up for the first ancestor that actually paints an opaque background,
  // compositing any translucent layers on the way. Scoring against the element
  // itself is wrong: most text sits on a transparent span.
  // A gradient paints an opaque background while backgroundColor stays
  // transparent. Missing that made the probe walk past a blue gradient button
  // to the white page behind it and report white-on-white. Average the stops:
  // for a two-stop gradient that is a fair representative colour, and for text
  // sitting on one it is the number that matters.
  const gradientOf = (cs) => {
    const bi = cs.backgroundImage || '';
    if (!/gradient\\(/.test(bi)) return null;
    const stops = bi.match(/rgba?\\([^)]+\\)/g);
    if (!stops || !stops.length) return null;
    const cols = stops.map(parse).filter((c) => c && c.a > 0.5);
    if (!cols.length) return null;
    return [0,1,2].map((i) => Math.round(cols.reduce((s,c) => s + c.rgb[i], 0) / cols.length));
  };

  // A backdrop is often an absolutely-positioned SIBLING, not an ancestor:
  // the hero sections here paint a photo and a navy scrim that way. Walking
  // ancestors alone reported white-on-white for headings that are plainly
  // readable. elementsFromPoint is no help either, because those backdrops
  // carry pointer-events:none and are excluded from it.
  //
  // So: look for any element whose box covers this one and which actually
  // paints something. If one exists, the contrast cannot be settled from the
  // DOM and the case is reported as UNVERIFIABLE rather than as a failure. A
  // false failure is worse than a gap, because it trains people to ignore the
  // report.
  const painters = Array.from(document.querySelectorAll('body *')).filter((n) => {
    const cs = getComputedStyle(n);
    if (cs.position !== 'absolute' && cs.position !== 'fixed') return false;
    if (cs.visibility === 'hidden' || cs.display === 'none') return false;
    const c = parse(cs.backgroundColor);
    const hasBg = (c && c.a > 0.5) || /url\\(|gradient\\(/.test(cs.backgroundImage || '');
    if (!hasBg) return false;
    const r = n.getBoundingClientRect();
    return r.width > 120 && r.height > 60;
  }).map((n) => ({ el: n, r: n.getBoundingClientRect() }));

  const coveredByBackdrop = (el, box) => {
    for (const p of painters) {
      if (p.el.contains(el)) continue;
      if (p.r.left <= box.left + 2 && p.r.right >= box.right - 2 &&
          p.r.top <= box.top + 2 && p.r.bottom >= box.bottom - 2) return true;
    }
    return false;
  };

  const bgOf = (el) => {
    const stack = [];
    let n = el;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      const g = gradientOf(cs);
      if (g) { let base = g; for (let i = stack.length - 1; i >= 0; i--) base = blend(stack[i].rgb, stack[i].a, base); return base; }
      if (/url\\(/.test(cs.backgroundImage || '')) return null; // photo: unknowable
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) {
        if (c.a >= 0.99) { let base = c.rgb; for (let i = stack.length - 1; i >= 0; i--) base = blend(stack[i].rgb, stack[i].a, base); return base; }
        stack.push(c);
      }
      n = n.parentElement;
    }
    let base = [255,255,255];
    for (let i = stack.length - 1; i >= 0; i--) base = blend(stack[i].rgb, stack[i].a, base);
    return base;
  };

  const ratio = (a,b) => {
    const l = [lum(a), lum(b)].sort((x,y) => y-x);
    return (l[0] + 0.05) / (l[1] + 0.05);
  };

  const out = [];
  for (const el of document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,a,span,li,td,th,dt,dd,label,button,strong,em')) {
    const own = Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
    if (!own || own.length < 2) continue;

    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;

    // Effective opacity, including every ancestor. A parent at 0 hides a child
    // at 1, and a mid-fade element is not a real contrast failure.
    let eff = 1, n = el;
    while (n && n !== document.documentElement) { eff *= parseFloat(getComputedStyle(n).opacity); n = n.parentElement; }
    if (eff < 0.9) continue;

    const box = el.getBoundingClientRect();
    if (box.width < 4 || box.height < 4) continue;
    // Off-screen or clipped decorative text.
    if (box.bottom < 0 || box.right < 0) continue;

    const fg = parse(cs.color);
    if (!fg) continue;

    // bg-clip-text: the visible colour is the gradient, not the color
    // property, which is transparent by design. Not resolvable from the DOM.
    const clipped = /text/.test(cs.webkitBackgroundClip || cs.backgroundClip || '');
    const bg = bgOf(el);
    if (bg === null || clipped || coveredByBackdrop(el, box)) {
      out.push({ unverifiable: true, reason: clipped ? 'bg-clip-text' : 'backdrop art',
                 text: own.slice(0, 60), tag: el.tagName, cls: (el.className || '').toString().slice(0, 70) });
      continue;
    }
    const fgc = fg.a >= 0.99 ? fg.rgb : blend(fg.rgb, fg.a, bg);

    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const need = large ? 3 : 4.5;

    const r = ratio(fgc, bg);
    if (r < need - 0.02) {
      out.push({
        text: own.slice(0, 60), ratio: +r.toFixed(2), need,
        size: +size.toFixed(1), tag: el.tagName,
        color: cs.color, bg: 'rgb(' + bg.join(',') + ')',
        cls: (el.className || '').toString().slice(0, 70),
      });
    }
  }
  return out;
}`;

export const OVERFLOW_PROBE = `() => {
  const d = document.documentElement;
  if (d.scrollWidth <= d.clientWidth + 1) return null;
  const guilty = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.right > d.clientWidth + 1 && r.width > 8) {
      guilty.push(el.tagName + '.' + (el.className || '').toString().slice(0, 60) + ' right=' + Math.round(r.right));
    }
    if (guilty.length > 4) break;
  }
  return { page: d.scrollWidth, viewport: d.clientWidth, guilty };
}`;

export const TAP_TARGET_PROBE = `() => {
  const bad = [];
  for (const el of document.querySelectorAll('a,button,[role="button"],input,select')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    // WCAG 2.5.8 exempts a target that is "in a sentence or block of text".
    // An inline-displayed link is exactly that; a block or flex one is a
    // control and is held to 44px.
    if (el.tagName === 'A' && cs.display === 'inline') continue;
    if (r.height < 44 || r.width < 44) {
      bad.push(el.tagName + ' ' + Math.round(r.width) + 'x' + Math.round(r.height) + ' "' + (el.textContent||'').trim().slice(0,30) + '"');
    }
  }
  return bad;
}`;
