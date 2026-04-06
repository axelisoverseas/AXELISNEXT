# Code Conventions

## Component Patterns

### File Structure
- All components are in `src/components/` as flat files (no subdirectories)
- Components use `.jsx` extension
- Pages in `src/app/` use `.jsx` or `.js` extension
- One component per file, exported as default

### Component Style
```jsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { IconName } from 'lucide-react';

const fadeInUp = { /* animation variants */ };

export default function ComponentName() {
  return (
    <section className="py-24 bg-white">
      <motion.div variants={fadeInUp}>
        {/* content */}
      </motion.div>
    </section>
  );
}
```

### Key Conventions
- **"use client"**: Almost all components use this directive (no SSR)
- **Dynamic imports**: Heavy components loaded with `next/dynamic` + `{ ssr: false }`
- **Framer Motion**: Extensive use of `motion.div`, `whileInView`, `variants`
- **Tailwind classes**: Inline utility classes throughout (no CSS modules)
- **No TypeScript**: Entire codebase is JavaScript

## Styling Patterns

- **Glassmorphism**: `.glass-card` class in `globals.css`
- **Gradient text**: `text-transparent bg-clip-text bg-gradient-to-r`
- **Dark sections**: `bg-slate-900 text-white` for alternating sections
- **Hover effects**: `group-hover:`, `hover:-translate-y-2`, glow shadows
- **Responsive**: `sm:`, `md:`, `lg:` breakpoint prefixes
- **Custom shadows**: `shadow-[0_0_40px_-10px_rgba(...)]` syntax

## Data Patterns

- **Centralized data**: All content in `src/data/siteData.js` as exported arrays/objects
- **No CMS**: Content is hardcoded in JavaScript/JSON files
- **Image loading**: Mix of local imports (`src/assets/`) and `public/` references
- **Dynamic image helpers**: `getTestimonialImage()`, `getTeamMemberImage()` functions

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `LeadCaptureModal.jsx` |
| Services | camelCase + Service | `emailNotificationService.js` |
| Hooks | use + PascalCase | `useLeadCapture.js` |
| Data exports | camelCase | `export const faqData = [...]` |
| CSS classes | Tailwind utility-first | `className="text-lg font-bold"` |
| Routes | lowercase kebab-case | `/courses/[course]-in-[country]` |
| JSON data files | camelCase | `programsData.json` |

## Error Handling

- **ErrorBoundary**: `src/components/ErrorBoundary.jsx` wraps sections
- **Service try/catch**: All service calls wrapped in try/catch
- **Graceful degradation**: Email failures don't block lead storage
- **Console logging**: Emoji-prefixed console logs (`💾`, `📧`, `✅`, `🔥`, `⚠️`)

## Import Patterns

- **Path aliases**: `@/` maps to `src/` (via `jsconfig.json`)
- **Named imports**: `import { storeLead } from './services/leadService'`
- **Default exports**: Components use default exports
- **Dynamic imports**: `const Component = dynamic(() => import('../components/X'), { ssr: false })`
