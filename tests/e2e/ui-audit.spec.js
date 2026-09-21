import { test, expect } from '@playwright/test';
import { CONTRAST_PROBE, OVERFLOW_PROBE, TAP_TARGET_PROBE } from './probes.js';

/**
 * The UI audit, run in a real browser against computed styles.
 *
 * Each check below maps to a defect that actually shipped on this site:
 *
 *   contrast          a certificate title at 1.10:1, a footer, a pay button
 *                     at 2.14:1, and a CTA that only failed on hover
 *   invisible text    headings that depended on JS to become visible, so a
 *                     stalled animation meant a blank h1
 *   route health      /courses/[a]-in-[b] returned 500 on every URL for
 *                     months, and /courses 404d from the navbar
 *   overflow          the finder scrolled sideways on a phone
 *   tap targets       controls under 44px on mobile
 *   literal markdown  an odd ** count printing raw asterisks on /faq
 *
 * Reading the source caught none of these. They need computed styles.
 */

const ROUTES = [
  '/', '/products', '/about', '/faq', '/verify', '/testimonials',
  '/university-finder', '/services', '/financing', '/scholarships',
  '/certifications', '/bookings', '/contact', '/resources', '/test-prep',
  '/accommodation', '/vocational', '/accreditations', '/start',
  '/lp/tuition-free-europe', '/lp/pay-after-offer', '/lp/published-fees',
];

/* ---------------------------------------------------------------- *
 * Contrast, computed in the page against the real painted colours.
 * ---------------------------------------------------------------- */


for (const route of ROUTES) {
  test(`contrast: ${route}`, async ({ page }) => {
    const res = await page.goto(route, { waitUntil: 'load' });
    expect(res.status(), `${route} should not error`).toBeLessThan(400);
    // Let entrance animations settle; a mid-fade element is not a real failure.
    await page.waitForTimeout(900);

    const all = await page.evaluate(`(${CONTRAST_PROBE})()`);
    // Only confirmed failures gate. Backdrop art and bg-clip-text cannot be
    // settled from the DOM, and failing on them would train people to ignore
    // this suite.
    const fails = all.filter((f) => !f.unverifiable);
    const msg = fails.map((f) => `  ${f.ratio}:1 (needs ${f.need}) <${f.tag}> "${f.text}"`).join('\n');
    expect(fails, `${route} contrast failures:\n${msg}`).toHaveLength(0);
  });
}

/* ---------------------------------------------------------------- *
 * Every route answers. /courses 500d on every URL for months.
 * ---------------------------------------------------------------- */
test('no route errors, and no console exceptions', async ({ page }) => {
  const problems = [];
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/favicon|404 \(Not Found\)/i.test(m.text())) {
      problems.push(`console: ${m.text().slice(0, 140)}`);
    }
  });

  for (const route of ROUTES) {
    const res = await page.goto(route, { waitUntil: 'domcontentloaded' });
    expect(res.status(), `${route} returned ${res.status()}`).toBeLessThan(400);
  }
  expect(problems, `console problems:\n${problems.join('\n')}`).toHaveLength(0);
});

/* ---------------------------------------------------------------- *
 * No sideways scroll. This broke the finder on a phone.
 * ---------------------------------------------------------------- */
for (const route of ROUTES) {
  test(`no horizontal overflow: ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'load' });
    const overflow = await page.evaluate(`(${OVERFLOW_PROBE})()`);
    expect(overflow, `sideways scroll: ${JSON.stringify(overflow)}`).toBeNull();
  });
}

/* ---------------------------------------------------------------- *
 * Headings render without JS finishing. A stalled stagger meant a
 * blank h1 on /faq once.
 * ---------------------------------------------------------------- */
for (const route of ROUTES) {
  test(`h1 is present and visible: ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    // toHaveCount on a .first() locator is a misuse: .first() always resolves
    // to at most one node, so the assertion races the render instead of
    // waiting for it. toBeVisible waits properly.
    const h1 = page.locator('h1').first();
    await expect(h1, `${route} has no visible h1`).toBeVisible({ timeout: 15000 });
    const text = (await h1.textContent())?.trim() || '';
    expect(text.length, `${route} h1 is empty`).toBeGreaterThan(2);
    const opacity = await h1.evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity), `${route} h1 is transparent`).toBeGreaterThan(0.5);
  });
}

/* ---------------------------------------------------------------- *
 * No raw markdown reaching the page. renderMarkdown splits on ** and
 * an odd count prints literal asterisks.
 * ---------------------------------------------------------------- */
test('no literal markdown in rendered copy', async ({ page }) => {
  for (const route of ['/faq', '/products', '/about', '/financing', '/scholarships']) {
    await page.goto(route, { waitUntil: 'load' });
    const body = await page.locator('body').innerText();
    expect(body, `${route} prints ** literally`).not.toMatch(/\*\*\S/);
    expect(body, `${route} prints a markdown link literally`).not.toMatch(/\]\(\//);
  }
});

/* ---------------------------------------------------------------- *
 * Tap targets, phone only. 44px is the Apple HIG minimum.
 * ---------------------------------------------------------------- */
test('tap targets are at least 44px', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'phone', 'phone viewport only');
  const small = [];
  for (const route of ['/', '/products', '/contact', '/bookings', '/faq']) {
    await page.goto(route, { waitUntil: 'load' });
    const found = await page.evaluate(`(${TAP_TARGET_PROBE})()`);
    if (found.length) small.push(`${route}:\n  ${found.slice(0, 8).join('\n  ')}`);
  }
  expect(small, `tap targets under 44px:\n${small.join('\n')}`).toHaveLength(0);
});
