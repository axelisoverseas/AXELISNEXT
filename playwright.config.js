import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright, aimed at the defects this site actually ships.
 *
 * Not a smoke suite. Every check below exists because the same class of bug
 * reached production here more than once, and reading the code did not catch
 * it: text the same colour as its background, a route that 500s on every URL,
 * a layout that scrolls sideways on a phone, a tap target too small to hit.
 * Those are all only visible once the page is rendered and computed styles
 * exist, which is the whole argument for running a browser in CI.
 *
 * Three viewports, because the failures differ: the horizontal-overflow and
 * tap-target ones only appear at 375, and the navbar ones only above lg.
 */
export default defineConfig({
  testDir: './tests/e2e',
  // A dev server compiles routes on demand. Running 22 routes x 3 viewports
  // fully parallel asks it to compile everything at once, and pages that lose
  // that race report as missing content rather than as slow. Four workers is
  // the point where this stopped producing phantom failures. Against a
  // production build (next build && next start) the limit is unnecessary.
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3456',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'phone', use: { ...devices['iPhone 13'] } },
    // iPad (gen 7) defaults to WebKit. Pinned to Chromium so the suite runs
    // with the one browser we install; the point here is viewport behaviour,
    // not engine differences.
    { name: 'tablet', use: { ...devices['Desktop Chrome'], viewport: { width: 810, height: 1080 }, isMobile: false } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
  ],

  // Reuse a running dev server rather than starting a second one, because
  // building clobbers .next underneath an already-running server and produces
  // ChunkLoadError, which looks like a test failure and is not.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npx next dev -p 3456',
        url: 'http://localhost:3456',
        reuseExistingServer: true,
        timeout: 180_000,
      },
});
