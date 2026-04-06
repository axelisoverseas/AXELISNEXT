# Directory Structure

```
axelis-next/
├── .planning/                    # GSD planning (new)
├── public/                       # Static assets
│   ├── assets/                   # Additional static assets
│   ├── flag-icons-main/          # Country flag icons
│   ├── knowledge base/           # Knowledge base files
│   ├── logos/                    # University/partner logos
│   ├── reels/                    # Social media reels
│   ├── team/                     # Team member photos
│   ├── trust-badges/             # Trust/certification badges
│   ├── robots.txt                # SEO robots config
│   ├── sitemap.xml               # SEO sitemap
│   ├── site.webmanifest          # PWA manifest
│   ├── og-image.jpg              # Open Graph image
│   └── *.svg, *.png, *.ico       # Favicon variants, logos
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.js             # Root layout (Navbar + Footer)
│   │   ├── page.jsx              # Homepage
│   │   ├── globals.css           # Global styles + Tailwind
│   │   ├── favicon.ico
│   │   ├── about/                # /about route
│   │   ├── accommodation/        # /accommodation route
│   │   ├── contact/              # /contact route
│   │   ├── courses/              # /courses/[course]-in-[country]
│   │   ├── guide/                # /guide/[slug]
│   │   ├── portal/               # /portal (admin)
│   │   ├── products/             # /products route
│   │   ├── scholarships/         # /scholarships route
│   │   └── universities/         # /universities/[country]/[uni]
│   ├── assets/                   # Imported images/assets
│   │   ├── testimonials/         # Testimonial images
│   │   └── exweb/                # Team member images
│   ├── components/               # 52 React components
│   │   ├── Navbar.jsx            # Navigation (12KB)
│   │   ├── Footer.jsx            # Footer (6.7KB)
│   │   ├── LeadCaptureModal.jsx  # Lead form (26.5KB) ← largest component
│   │   ├── YouTubeShorts.jsx     # YT Shorts (22.8KB)
│   │   ├── InstagramSuccessStories.jsx  # IG stories (23.6KB)
│   │   ├── CobeGlobe.jsx         # WebGL globe (3.7KB)
│   │   ├── ScholarshipMatcher.jsx  # Interactive tool (13.7KB)
│   │   ├── VisaSuccessPredictor.jsx  # Interactive tool (14.7KB)
│   │   └── ... (44 more components)
│   ├── context/
│   │   └── ThemeContext.jsx      # Dark/light theme toggle
│   ├── data/
│   │   ├── siteData.js           # All site content (84KB) ← largest file
│   │   ├── programsData.json     # University/course catalog (222KB)
│   │   ├── universityDomains.json  # Domain mappings (11.6KB)
│   │   ├── stockImages.js        # Fallback image URLs
│   │   └── jobs.json             # Career listings (1.5KB)
│   ├── hooks/
│   │   ├── useAnimations.js      # Animation presets
│   │   ├── useLeadCapture.js     # Lead modal logic
│   │   └── useLenis.js           # Smooth scroll setup
│   ├── legacy_pages/             # 26 pages from pre-App-Router
│   │   ├── AdminDashboard.jsx    # Admin panel (54.8KB) ← largest page
│   │   ├── BlogPost.jsx          # Blog system (52.6KB)
│   │   ├── Products.jsx          # Charter programs (32.4KB)
│   │   └── ... (23 more legacy pages)
│   ├── services/
│   │   ├── emailNotificationService.js  # EmailJS (11.2KB)
│   │   ├── calendlyService.js    # Calendly booking (10.4KB)
│   │   ├── whatsappService.js    # WhatsApp chat (8KB)
│   │   ├── youtubeService.js     # YouTube embeds (5KB)
│   │   ├── youtubeShortsService.js  # YT Shorts (9.3KB)
│   │   ├── leadService.js        # Lead facade (2.2KB)
│   │   ├── mockLeadService.js    # Mock backend (8KB)
│   │   └── otpService.js         # OTP verification (2KB)
│   └── utils/
│       ├── animations.js         # Animation utilities (6KB)
│       ├── performance.js        # Performance helpers (3KB)
│       ├── accessibilityTest.js  # A11y testing (8.7KB)
│       ├── emailTest.js          # Email test script (2.5KB)
│       ├── sendTestMessage.js    # Test WhatsApp (4.4KB)
│       ├── testWhatsApp.js       # WhatsApp tests (5KB)
│       └── videoShuffler.js      # Video randomization (4.6KB)
├── scripts/                      # Build/utility scripts
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── eslint.config.mjs
└── jsconfig.json
```

## Key Locations

| Need | Location |
|------|----------|
| Add a new page | `src/app/[route-name]/page.jsx` |
| Add a component | `src/components/[Name].jsx` |
| Edit site content | `src/data/siteData.js` |
| University data | `src/data/programsData.json` |
| Service integration | `src/services/[service]Service.js` |
| Custom hook | `src/hooks/use[Name].js` |
| Global styles | `src/app/globals.css` |
| Static files | `public/` |

## Naming Conventions

- **Components**: PascalCase (`LeadCaptureModal.jsx`)
- **Services**: camelCase with `Service` suffix (`emailNotificationService.js`)
- **Hooks**: camelCase with `use` prefix (`useLeadCapture.js`)
- **Data files**: camelCase (`siteData.js`) or camelCase JSON (`programsData.json`)
- **App routes**: lowercase kebab-case directories
