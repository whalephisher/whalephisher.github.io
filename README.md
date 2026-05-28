# Whalephisher Portfolio

Personal portfolio site built with React 19 and Vite.

## Features

- Scroll-triggered animations via IntersectionObserver
- Floating particle system and physics-based circle animations
- Glassmorphism navbar with scroll progress
- Typewriter text effects with scroll-based reset
- Tabbed experience section with CTF easter egg
- Terminal-styled skills display
- Responsive design

## Project Structure

```
src/
├── components/
│   ├── layout/          # Hero, Navbar, Footer
│   ├── sections/        # About, Portfolio
│   ├── ui/              # Timeline, Skills, Education, Interests, LoadingAnimation
│   └── effects/         # ParticleSystem, InteractiveEffects (ripple)
├── hooks/
│   └── useAnimations.js # useScrollAnimation, useTypewriter, useSmoothScroll
├── data/
│   └── portfolioData.js # All content data
├── styles/
│   └── global.css       # CSS variables, animations, utilities
└── assets/
    └── whale.png
```

## Tech Stack

- React 19, Vite 7
- Vanilla CSS (custom properties, backdrop-filter, keyframes)
- Custom IntersectionObserver hooks for animations
- GitHub Pages deployment via `gh-pages`

## Getting Started

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build     # Production build → dist/
npm run deploy    # Build + deploy to GitHub Pages
```

## Customization

All content lives in `src/data/portfolioData.js` — edit that file to update personal info, experience, skills, education, and projects.

Styles use CSS custom properties in `src/styles/global.css` for theming.