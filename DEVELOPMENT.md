# Development Notes & Codebase Overview

## Project Summary

**whalephisher.github.io** — Gabriel Liau's personal portfolio website.  
A single-page React app deployed to GitHub Pages with a glassmorphism aesthetic, scroll-triggered animations, and interactive visual effects.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 7 |
| Language | JavaScript (JSX) |
| Styling | Vanilla CSS (no preprocessor, no CSS-in-JS) |
| Animations | Custom IntersectionObserver hooks, CSS keyframes, requestAnimationFrame |
| Deployment | GitHub Pages via `gh-pages` package |
| Bundler | Vite (relative base path `./`) |

---

## Architecture

```
App.jsx
├── ParticleSystem (full-page floating particles)
├── Navbar (floating glassmorphism nav, scroll progress bar)
├── Hero (landing with floating circles, typewriter tagline)
├── main
│   ├── About (profile card, tabbed content)
│   │   ├── Timeline (experience items with CTF challenge)
│   │   ├── Skills (categorized skill tags)
│   │   ├── Education (degree, certs, military education)
│   │   └── Interests (categorized interest grid)
│   └── Portfolio (project cards grid)
└── Footer
```

---

## Key Design Patterns

1. **Data-driven rendering** — All content lives in `src/data/portfolioData.js`. Components are purely presentational.
2. **Custom hooks** — `useScrollAnimation` (IntersectionObserver-based visibility), `useTypewriter`, `useSmoothScroll` in `src/hooks/useAnimations.js`.
3. **Per-component CSS** — Each component has a co-located `.css` file. Global variables and resets in `src/styles/global.css`.
4. **No routing** — Single page, anchor-based navigation with smooth scroll.
5. **No state management library** — React useState/useEffect only.

---

## Current Sections & Features

### Hero
- Animated floating circles (physics-based movement, glow effects, shooting star)
- Typewriter effect for tagline ("I build stuff with code and data.")
- Resets on scroll-out for replay

### Navbar
- Floating glassmorphism design with whale logo
- Scroll progress bar
- Desktop: fixed logo left + nav links right
- Mobile: responsive social dock with hamburger menu
- Auto-hides on mobile when About section is reached

### About
- Profile image + typewriter heading ("Hi, I'm Gabriel Liau.")
- Tabbed interface: Experience | Skills | Education | Interests
- **Experience tab**: Vertical timeline with expandable role details
- **CTF Challenge**: Hidden cipher easter egg in experience section (SHA-256 validated)

### Portfolio
- Grid of project cards with images, descriptions, and tech tags
- Current projects: Chordex (React/TS chord app), Text Editor (Node.js/WebSocket)

### Effects
- `ParticleSystem`: Fixed-position floating dots with wrap-around, twinkle, and fade-in
- `CustomCursor`: Custom cursor replacement
- `InteractiveEffects`: Ripple click effects
- `LoadingAnimation`: Image lazy-loading placeholder

---

## File Structure Quick Reference

```
src/
├── App.jsx              # Root component
├── main.jsx             # Entry point (React root render)
├── App.css              # App-level styles
├── index.css            # Base resets
├── assets/              # Static images (whale.png logo)
├── components/
│   ├── effects/         # Visual effect components
│   ├── layout/          # Structural components (Hero, Navbar, Footer)
│   ├── sections/        # Page sections (About, Portfolio)
│   └── ui/              # Reusable UI (Timeline, Skills, Education, Interests, LoadingAnimation)
├── data/
│   └── portfolioData.js # ALL content data (profile, experience, skills, education, interests, projects)
├── hooks/
│   └── useAnimations.js # Custom React hooks (scroll animation, typewriter, smooth scroll)
└── styles/
    └── global.css       # CSS custom properties, global styles
```

---

## Development Commands

```bash
npm run dev       # Start Vite dev server (hot reload)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run deploy    # Build + deploy to GitHub Pages
npm run lint      # ESLint
```

---

## Current State & Observations

### What's Working Well
- Clean component separation with data-driven architecture
- Smooth animations via IntersectionObserver (no heavy animation libraries)
- Responsive design with mobile-specific behavior
- CTF easter egg adds personality

### Potential Areas for Development

| Area | Notes |
|------|-------|
| **More projects** | Portfolio only has 2 projects currently |
| **Contact section** | No contact form or CTA |
| **Blog/Writing** | No blog or article section |
| **Dark/Light theme** | Currently dark-only |
| **SEO/Meta** | Minimal meta tags, no OG tags |
| **Accessibility** | No ARIA labels, keyboard navigation untested |
| **Performance** | Particle system uses DOM manipulation (could use Canvas) |
| **Testing** | No tests exist |
| **TypeScript** | Currently plain JS (types are in devDeps but unused) |
| **404 handling** | Has public/404.html for SPA routing on GH Pages |
| **Animations library** | Everything is custom — could benefit from Framer Motion for complex sequences |
| **Image optimization** | No lazy loading strategy beyond custom LoadingAnimation |
| **Resume/PDF** | No downloadable resume |

---

## Questions for Alignment

Before diving into new features, it would help to know:

1. **Priority features** — What do you want to add/change next? (e.g., more projects, contact form, blog, resume download)
2. **Design direction** — Are you happy with the current glassmorphism dark theme, or considering a redesign?
3. **Content updates** — Any new experience, projects, or skills to add?
4. **Performance concerns** — Is the site feeling slow anywhere (especially mobile)?
5. **Deployment workflow** — Are you happy with the current gh-pages deploy, or considering alternatives (Vercel, Netlify, Cloudflare Pages)?

---

*This document lives on the `develop` branch for planning purposes.*
