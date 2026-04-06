# Technology Stack

## Runtime & Language

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | ≥18 (inferred) | Server runtime |
| JavaScript (JSX) | ES2022+ | Primary language |
| Next.js | 16.1.6 | Full-stack React framework (App Router) |
| React | 19.2.3 | UI library |
| React DOM | 19.2.3 | DOM rendering |

## CSS & Styling

| Technology | Version | Purpose |
|-----------|---------|---------|
| Tailwind CSS | ^4 | Utility-first CSS framework |
| @tailwindcss/postcss | ^4 | PostCSS integration for Tailwind |
| PostCSS | (via postcss.config.mjs) | CSS processing |
| Custom CSS | — | `globals.css` with glass-card styles, scrollbar, line-clamp |

### Design Tokens (globals.css)
- `--color-navy: #0A1128` — Primary dark
- `--color-axelis: #1E40AF` — Brand blue
- `--color-axelis-light: #3B82F6` — Light blue
- `--color-axelis-accent: #F59E0B` — Accent amber
- Dark mode support via `prefers-color-scheme`

## Typography

- **Font**: Inter (Google Fonts, loaded via `next/font/google`)
- **Fallbacks**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

## Animation & 3D

| Library | Version | Purpose |
|---------|---------|---------|
| Framer Motion | ^12.34.3 | Page animations, scroll-triggered effects |
| anime.js | ^4.1.2 | Additional animations |
| Lenis | ^1.3.8 | Smooth scrolling |
| Cobe | ^0.6.5 | WebGL globe visualization (hero section) |
| Three.js | ^0.179.1 | 3D rendering engine |
| react-globe.gl | ^2.35.0 | React globe component |
| globe.gl | ^2.43.0 | Globe visualization library |
| react-parallax-tilt | ^1.7.319 | Tilt/parallax card effects |

## UI Components

| Library | Version | Purpose |
|---------|---------|---------|
| Lucide React | ^0.525.0 | Icon system |

## Data Visualization

| Library | Version | Purpose |
|---------|---------|---------|
| d3-scale | ^4.0.2 | Data scaling |
| d3-scale-chromatic | ^3.1.0 | Color scales |

## External Services (Client-side)

| Service | Library | Purpose |
|---------|---------|---------|
| EmailJS | @emailjs/browser ^4.4.1 | Client-side email sending |

## Build & Dev Tools

| Tool | Version | Purpose |
|------|---------|---------|
| ESLint | ^9 | Linting |
| eslint-config-next | 16.1.6 | Next.js ESLint rules |
| Turbopack | (built into Next.js 16) | Dev server bundler |

## Configuration Files

- `next.config.mjs` — Minimal (empty config object)
- `postcss.config.mjs` — Tailwind PostCSS plugin
- `eslint.config.mjs` — ESLint config
- `jsconfig.json` — JS path aliases (`@/` → `src/`)
- `.gitignore` — Standard Next.js ignores

## No Backend/Database

The project is a **static/client-side rendered Next.js site**. There is:
- No database connection
- No server-side API routes
- Lead storage uses a **mock service** (localStorage-based)
- Email notifications via EmailJS (client-side)
