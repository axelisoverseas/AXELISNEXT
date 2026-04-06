# Concerns

## 🔴 Critical

### No Persistent Backend
- **Where**: `src/services/mockLeadService.js`, `src/services/leadService.js`
- **Issue**: Lead data is stored in browser localStorage only. Leads are lost when users clear browser data or switch devices.
- **Impact**: Business-critical lead capture data has zero persistence or backup.
- **Recommendation**: Implement a real backend (Supabase, Firebase, or custom API) for lead storage.

### No Authentication System
- **Where**: `src/components/AdminLogin.jsx`, `src/components/ProtectedRoute.jsx`
- **Issue**: Admin dashboard and lead management appear to use client-side auth only. No server-side session management.
- **Impact**: Any user could potentially access admin features; lead data is not secure.

## 🟠 High Priority

### Massive Data Files Inflating Bundle
- **Where**: `src/data/siteData.js` (84KB), `src/data/programsData.json` (222KB)
- **Issue**: 300KB+ of data is bundled into client-side JavaScript. All FAQ, blog, testimonial, loan, and accommodation data is loaded on every page.
- **Impact**: Slow initial page load; poor Core Web Vitals scores.
- **Recommendation**: Move to SSR data loading, API routes, or split data per page.

### Legacy Pages Duplication
- **Where**: `src/legacy_pages/` (26 files)
- **Issue**: Full set of page components from the pre-App-Router era still exists alongside the new `src/app/` routes. Many appear to be duplicated.
- **Impact**: Code confusion, maintenance burden, potential inconsistencies between legacy and current pages.
- **Recommendation**: Complete migration and remove legacy pages.

### "use client" on Everything
- **Where**: Nearly all components and pages
- **Issue**: Almost no server-side rendering is used. Every component is client-rendered.
- **Impact**: Misses Next.js SSR/SSG benefits — worse SEO, slower TTFB, larger JS bundles.
- **Recommendation**: Convert data-heavy pages (FAQs, blog, country guides) to Server Components.

## 🟡 Medium Priority

### No TypeScript
- **Where**: Entire codebase
- **Issue**: No type safety anywhere. All files are `.js`/`.jsx`.
- **Impact**: Runtime type errors, harder to refactor, no IDE autocompletion for props.

### Single monolithic siteData.js
- **Where**: `src/data/siteData.js`
- **Issue**: One 84KB file contains ALL site data — features, FAQs, testimonials, blog posts, loan info, accommodation, team.
- **Impact**: Any data change requires editing this massive file; hard to maintain.
- **Recommendation**: Split into domain-specific files (e.g., `faqData.js`, `teamData.js`, `loanData.js`).

### Large Lint Output
- **Where**: `lint_output.txt` (53KB)
- **Issue**: 53KB of lint warnings/errors exist, suggesting significant code quality issues have accumulated.
- **Impact**: Code quality degradation over time.

### External CDN Dependency
- **Where**: `src/app/page.jsx` — references `grainy-gradients.vercel.app`
- **Issue**: Production site depends on external Vercel CDN for a noise texture.
- **Impact**: If the CDN goes down, visual elements break.
- **Recommendation**: Self-host the noise SVG in `public/`.

### No SEO Consistency
- **Where**: Various pages reference both `overseeducation.com` and `axelisoverseas.com`
- **Issue**: `layout.js` uses `axelisoverseas.com` for OpenGraph, but many pages use `overseeducation.com` for canonical URLs.
- **Impact**: SEO confusion; search engines may not properly consolidate page authority.

## 🟢 Low Priority (Tech Debt)

### Emoji Console Logging
- **Where**: Throughout services layer
- **Issue**: Heavy use of emoji-prefixed console.log for debugging, not removed for production.
- **Recommendation**: Replace with proper logging library or remove for production builds.

### Inconsistent Image Strategy
- **Where**: Throughout components
- **Issue**: Mix of Next.js `<Image>`, stock image URLs (`stockImages.js`), local imports, and public folder references.
- **Recommendation**: Standardize on Next.js `<Image>` component with consistent path strategy.

### Missing Error Pages
- **Where**: `src/app/`
- **Issue**: No `error.js`, `not-found.js`, or `loading.js` in the App Router.
- **Recommendation**: Add proper App Router error/loading states.
