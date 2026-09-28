// Playwright check for the scroll-story pages (/receipts, /, /testimonials,
// /products): desktop, phone and reduced motion, the scroll path in frames,
// horizontal overflow, console errors, and a reload at 55%.
// Usage: node scripts/scroll-check.mjs [path=/receipts] [outDir]
import { chromium } from '@playwright/test';
const PATH = process.argv[2] || '/receipts';
const OUT = process.argv[3] || `tmp/scroll-check${PATH.replace(/\//g, '-') || '-home'}`;
const URL = `http://localhost:3000${PATH}`;
import fs from 'node:fs'; fs.mkdirSync(OUT, { recursive: true });
const report = [];
const b = await chromium.launch();
for (const [name, vp, motion] of [['desktop', { width: 1440, height: 900 }, 'no-preference'], ['phone', { width: 390, height: 844 }, 'no-preference'], ['desktop-reduced', { width: 1440, height: 900 }, 'reduce']]) {
  const ctx = await b.newContext({ viewport: vp, reducedMotion: motion });
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(String(e)));
  p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await p.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await p.waitForTimeout(2200);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const shots = [0, 0.04, 0.08, 0.13, 0.18, 0.24, 0.3, 0.36, 0.42, 0.5, 0.56, 0.62, 0.7, 0.78, 0.86, 0.95];
  const frames = [];
  for (const f of shots) {
    await p.evaluate((y) => { window.lenis ? window.lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y); }, Math.round(f * (H - vp.height)));
    await p.waitForTimeout(900);
    const st = await p.evaluate(() => ({
      rail: document.querySelector('[aria-hidden="true"] b')?.textContent || null,
      stat0: document.querySelector('[data-n]')?.textContent || null,
      trackX: document.querySelector('[data-track]') ? getComputedStyle(document.querySelector('[data-track]')).transform : null,
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
    }));
    frames.push({ f, ...st });
    await p.screenshot({ path: `${OUT}/${name}-${String(Math.round(f * 100)).padStart(2, '0')}.jpg`, quality: 60, type: 'jpeg' });
  }
  // mid-page reload must land correct
  await p.evaluate((y) => window.scrollTo(0, y), Math.round(0.55 * H));
  await p.reload({ waitUntil: 'load', timeout: 60000 });
  await p.waitForTimeout(1800);
  await p.screenshot({ path: `${OUT}/${name}-reload55.jpg`, quality: 60, type: 'jpeg' });
  const h1 = await p.evaluate(() => document.querySelector('h1')?.getAttribute('aria-label'));
  report.push({ name, H, h1, errors, frames });
  await ctx.close();
}
await b.close();
fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
