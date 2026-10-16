# Usman Javaid — Senior Front-End Developer Portfolio

A quiet, editorial, high-performance personal portfolio built for **Usman Javaid** (Front-End Developer & Web Development Specialist, Warsaw, Poland). Designed in the spirit of an Awwwards "Site of the Day" with a minimalist, black-and-white-and-gray palette on a warm `#f4f2ee` paper canvas.

---

## 1. Quick Start

### Prerequisites
- **Node.js**: v18.18+ or v20+ (developed on v24.15)
- **Python**: 3.10+ (required only if rebuilding hero video assets)
- **FFmpeg**: Essentials or full build (required only if rebuilding hero video assets)

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
# Open http://localhost:3000

# 3. Production build
npm run build

# 4. Run production server
npm run start
```

---

## 2. Architecture & Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS 4 with custom design tokens in `globals.css`
- **Smooth Scrolling**: Lenis (`src/lib/scroll.tsx`)
- **Self-Hosted Variable Fonts** (`src/fonts` via `next/font/local`):
  - `Inter Tight` (variable 100–900): display headings & body typography
  - `Instrument Serif` (regular & italic): editorial italic accents
  - `JetBrains Mono` (variable 100–800): indices, coordinates, and labels
- **Zero Runtime CDNs**: No external runtime scripts, trackers, or image CDNs.
- **Zero Horizontal Overflow**: Guaranteed across 360 px to 1920 px viewports.

---

## 3. Sections & Component Hierarchy

All text content strictly originates from [`resume.pdf`](./public/resume.pdf) without fabrication:

| # | Section | Component | Key Interaction & Behavior |
|---|---|---|---|
| **00** | **Hero** | `src/components/hero/Hero.tsx` | Seamless looping video with `mix-blend-mode: multiply`, background whitening, voice autoplay with graceful mute fallback, 46px ▶/❚❚ sound toggle, viewport pause observer, and outlined ghost typography. |
| **01** | **About** | `src/components/sections/About.tsx` | 3-column layout featuring an interactive 3D ID card on a woven lanyard strap with physics-based pendulum sway, 3D flip card (front/back), verbatim résumé summary, and direct coordinates. |
| **02** | **Skills** | `src/components/sections/Skills.tsx` | "The Periodic Table of My Stack" with 30 skills, 8-column periodic grid, family filter chips, and a sticky 320px Inspector panel with official brand logos and glow accents. |
| **03** | **Work** | `src/components/sections/Work.tsx` | Expanding accordion gallery with side-by-side folding panels, project capability breakdown, tech chips, and grayscale illustrative UI mockups (Responsive Viewport, SQL Query Runner, Salesforce Console). |
| **04** | **Certifications** | `src/components/sections/Certifications.tsx` | Pure white band with hairline borders and an ink-flood hover list (`scaleX: 0 → 1`) revealing 5 accredited credentials from Google and NITSEP. |
| **05** | **Experience** | `src/components/sections/Experience.tsx` | Single continuous vertical timeline whose active spine draws with scroll progress, illuminating career stops at Lacoste, Mastercard, and Hamdard University. |
| **06** | **Contact & Footer** | `src/components/sections/Contact.tsx` | Interactive hopping letter bounce on hover, clipboard email copy with live feedback, rotating circular SVG badge, direct coordinates, and footer. |

*Note: Per Rule 1 and explicit user confirmation, the Achievements section was omitted since the résumé contains no competitive programming ranks or LeetCode statistics.*

---

## 4. The Hero Video Pipeline

The hero video is generated from `intro.mp4` via `scripts/build-hero-assets.py` using FFmpeg and NumPy:

1. **Crop & Centering**: Crops tightly around the subject at `crop=800:1000:560:50` and scales to `768x960` (`aspect-ratio: 768/960`).
2. **Background Whitening**: Whitens off-white background with `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98`, enabling seamless blending with `mix-blend-mode: multiply`.
3. **Seamless Video & Audio Loop**:
   - Cross-fades the last 0.5s into the first 0.5s using FFmpeg `xfade`.
   - Sample-accurately cross-fades audio in NumPy using equal-power sine/cosine windows, preventing pops or clicks.
   - Retains lip-sync without time-stretching.
4. **Dual Output Formats**:
   - `public/hero/hero.webm`: VP9 (CRF 36, Opus 80k)
   - `public/hero/hero.mp4`: H.264 (CRF 24, AAC 96k, `+faststart`)
5. **Stills**:
   - `public/portrait-bust.webp`: 480×600 head-to-shirt crop for the ID card.
   - `public/og.jpg`: 1200×630 OpenGraph card with editorial typography.

### Rebuilding Hero Assets
```bash
python scripts/build-hero-assets.py
```

---

## 5. Brand Logos & Licenses

Brand logos in `public/logos/` are official SVGs licensed under MIT and respective brand guidelines:
- **Devicon**: Licensed under MIT (Copyright © 2015-present Devicon contributors).
- **Simple Icons**: Licensed under CC0 1.0 Universal.
- Full details in [`public/logos/LICENSE`](./public/logos/LICENSE).

---

## 6. Quality Checks Performed

- `npm run build` passes with zero type or lint errors.
- Playwright automated tests verified:
  - Desktop 1440×900: `document.documentElement.scrollWidth === innerWidth` (0 horizontal overflow).
  - Mobile 390×844: `document.documentElement.scrollWidth === innerWidth` (0 horizontal overflow).
  - Runtime console: 0 errors detected.
