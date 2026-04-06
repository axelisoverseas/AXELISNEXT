# Testing

## Current State: Minimal Testing

The project has **no formal test suite**. There are no:
- Unit test files (no `__tests__/` or `*.test.js` files)
- Integration tests
- E2E tests (no Playwright, Cypress, etc.)
- CI/CD pipeline configuration

## Test Utilities (Manual/Ad-hoc)

The `src/utils/` directory contains several manual testing scripts:

| File | Purpose |
|------|---------|
| `accessibilityTest.js` (8.7KB) | A11y testing utilities — runs accessibility checks |
| `emailTest.js` (2.5KB) | Tests EmailJS integration manually |
| `sendTestMessage.js` (4.4KB) | Tests WhatsApp message sending |
| `testWhatsApp.js` (5KB) | WhatsApp service tests |

Additionally:
- `SEND_TEST_EMAILS_NOW.js` (root) — Standalone email test script
- `check_icons.js` (root) — Validates icon imports

## Test Components

- `src/components/WhatsAppTest.jsx` (5KB) — Visual WhatsApp integration test page
- `src/legacy_pages/AdminTest.jsx` (8KB) — Admin functionality test page

## Lint Configuration

- ESLint v9 with `eslint-config-next` 16.1.6
- Config in `eslint.config.mjs`
- Lint output previously generated: `lint_output.txt` (53KB) — indicates significant lint issues exist

## Testing Recommendations

The project would benefit from:
1. **Component tests**: React Testing Library for key components
2. **E2E tests**: Playwright for critical user flows (lead capture, contact form)
3. **Integration tests**: Service layer tests for EmailJS, lead management
4. **Visual regression**: Screenshot tests for the marketing pages
5. **CI pipeline**: Automated testing on commits
