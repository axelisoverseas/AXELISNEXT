#!/usr/bin/env node
/**
 * Standalone UI auditor. Same probes as the Playwright suite, but prints a
 * readable report instead of failing a test, which is what you want while
 * fixing rather than gating.
 *
 *   node scripts/ui-audit.mjs                  every route, desktop
 *   node scripts/ui-audit.mjs --phone          375px
 *   node scripts/ui-audit.mjs /about /faq      just these
 */
import { chromium } from '@playwright/test';
import { CONTRAST_PROBE, OVERFLOW_PROBE } from '../tests/e2e/probes.js';

const BASE = process.env.BASE_URL || 'http://localhost:3456';
const args = process.argv.slice(2);
const phone = args.includes('--phone');
const routes = args.filter((a) => a.startsWith('/'));

const ALL = [
  '/', '/products', '/about', '/faq', '/verify', '/testimonials',
  '/university-finder', '/services', '/financing', '/scholarships',
  '/certifications', '/bookings', '/contact', '/resources', '/test-prep',
  '/accommodation', '/vocational', '/accreditations', '/start',
  '/lp/tuition-free-europe', '/lp/pay-after-offer', '/lp/published-fees',
];

const targets = routes.length ? routes : ALL;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: phone ? { width: 375, height: 812 } : { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

let totalContrast = 0;
let totalOverflow = 0;
let totalUnver = 0;
const byClass = new Map();

for (const route of targets) {
  let res;
  try {
    // 'load', not 'networkidle'. Pages with a YouTube embed or a Calendly
    // widget keep a connection open, so networkidle never fires and the page
    // is reported unreachable when it is simply still streaming something.
    res = await page.goto(BASE + route, { waitUntil: 'load', timeout: 45000 });
  } catch (e) {
    console.log(`\n${route}\n  UNREACHABLE  ${e.message.split('\n')[0]}`);
    continue;
  }
  await page.waitForTimeout(800);

  const all = await page.evaluate(`(${CONTRAST_PROBE})()`);
  const contrast = all.filter((f) => !f.unverifiable);
  const unver = all.filter((f) => f.unverifiable);
  totalUnver += unver.length;
  const overflow = await page.evaluate(`(${OVERFLOW_PROBE})()`);

  if (contrast.length || overflow) {
    console.log(`\n${route}   [${res.status()}]`);
    if (overflow) {
      totalOverflow++;
      console.log(`  OVERFLOW  page ${overflow.page}px in ${overflow.viewport}px viewport`);
      overflow.guilty.slice(0, 3).forEach((g) => console.log(`            ${g}`));
    }
    for (const f of contrast.slice(0, 10)) {
      totalContrast++;
      console.log(`  ${String(f.ratio).padStart(5)}:1 (needs ${f.need})  <${f.tag}> ${JSON.stringify(f.text)}`);
      console.log(`            ${f.color} on ${f.bg}   ${f.cls}`);
      const k = f.cls.split(/\s+/).slice(0, 3).join(' ') || f.tag;
      byClass.set(k, (byClass.get(k) || 0) + 1);
    }
    if (contrast.length > 10) {
      totalContrast += contrast.length - 10;
      console.log(`  ... and ${contrast.length - 10} more on this route`);
    }
  }
}

console.log(`\n${'='.repeat(70)}`);
console.log(`${phone ? 'PHONE 375px' : 'DESKTOP 1440px'}   ${targets.length} routes`);
console.log(`contrast failures (confirmed): ${totalContrast}`);
console.log(`unverifiable from the DOM (backdrop art / bg-clip-text): ${totalUnver}`);
console.log(`routes with sideways scroll: ${totalOverflow}`);
if (byClass.size) {
  console.log(`\nmost common offenders:`);
  [...byClass.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)
    .forEach(([k, n]) => console.log(`  ${String(n).padStart(4)}  ${k}`));
}
await browser.close();
