# Whalephisher Portfolio

A modern, interactive portfolio website built with React and Vite, featuring advanced animations, glassmorphism design, and immersive visual effects.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 and Vite for fast development and optimal performance
- **Advanced Animations**: Custom scroll-triggered animations, typewriter effects, and particle systems
- **Glassmorphism Design**: Beautiful floating navbar with backdrop blur and translucent elements
- **Interactive Elements**: Custom cursor, ripple effects, and dynamic circle animations
- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **Component Organization**: Clean, scalable folder structure for maintainable code

## 🎨 Visual Effects

### Floating Circles Animation

- Physics-based floating circles with smooth motion
- Subtle glow effect on blue circle with periodic pulsing
- Rare shooting star effect on orange circle with diagonal light beams

### Typewriter Effects

- Hero section typing animation with scroll-based reset
- About section faster typing with intersection observer
- Automatic restart when scrolling back into view

### Modern Navigation

- Floating glassmorphism navbar with whale logo integration
- Smooth scroll progress tracking
- Responsive social dock with animated menu

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/               # Layout components
│   │   ├── Hero.jsx         # Landing section with floating circles
│   │   ├── Hero.css
│   │   ├── Navbar.jsx       # Floating glassmorphism navigation
│   │   ├── Navbar.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── sections/            # Main page sections
│   │   ├── About.jsx        # Profile and tabbed content
│   │   ├── About.css
│   │   ├── Portfolio.jsx    # Project showcase
│   │   └── Portfolio.css
│   ├── ui/                  # Reusable UI components
│   │   ├── Timeline.jsx     # Experience timeline with animations
│   │   ├── Timeline.css
│   │   ├── Skills.jsx       # Interactive skill tags
│   │   ├── Skills.css
│   │   ├── Education.jsx    # Education cards
│   │   ├── Education.css
│   │   ├── Interests.jsx    # Interest grid
│   │   ├── Interests.css
│   │   ├── LoadingAnimation.jsx
│   │   └── LoadingAnimation.css
│   ├── effects/             # Animation & effect components
│   │   ├── CustomCursor.jsx
│   │   ├── CustomCursor.css
│   │   ├── InteractiveEffects.jsx  # Ripple effects
│   │   ├── InteractiveEffects.css
│   │   ├── ParticleSystem.jsx
│   │   └── ParticleSystem.css
│   └── common/              # Shared components (future use)
├── hooks/
│   └── useAnimations.js     # Custom animation hooks
├── data/
│   └── portfolioData.js     # All portfolio content and configuration
├── styles/
│   └── global.css          # Global styles and CSS variables
└── assets/                 # Images and static files
    └── whale.png           # Navbar logo
```

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: CSS3 with modern features (backdrop-filter, custom properties)
- **Animations**: Custom intersection observers, CSS keyframes
- **State Management**: React hooks (useState, useEffect, useRef)
- **Performance**: Optimized with Vite's fast refresh and minimal bundle

## 🎯 Component Organization

### Layout Components (`/layout/`)

Core structural elements that define the page layout and navigation.

### Section Components (`/sections/`)

Main content areas that represent different sections of the portfolio.

### UI Components (`/ui/`)

Reusable interface elements that can be composed within sections.

### Effects Components (`/effects/`)

Specialized components for animations, transitions, and visual effects.

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/whalephisher/whalephisher.github.io.git
cd whalephisher.github.io
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Build for production**

```bash
npm run build
```

## 🎨 Customization

### Updating Content

All portfolio content is centralized in `src/data/portfolioData.js`. Update this file to modify:

- Personal information and bio
- Experience timeline
- Skills and technologies
- Education history
- Project portfolio
- Social links

### Styling

- Global styles and CSS variables: `src/styles/global.css`
- Component-specific styles: Located alongside each component
- Color scheme: Teal-based palette with dark theme

### Animations

Custom animation hooks in `src/hooks/useAnimations.js`:

- `useScrollAnimation`: Intersection observer for scroll-triggered effects
- `useTypewriter`: Typewriter text animation
- `useScrollTypewriter`: Scroll-based typewriter with reset
- `useSmoothScroll`: Smooth scrolling navigation
- `useMousePosition`: Mouse tracking for interactive effects
- `useParallax`: Parallax scrolling effects

## 🌟 Performance Features

- **Lazy Loading**: Components load as needed
- **Optimized Animations**: Uses `requestAnimationFrame` for smooth 60fps
- **Minimal Re-renders**: Efficient state management and ref usage
- **Fast Refresh**: Vite's instant hot module replacement

## 📱 Browser Compatibility

- Modern browsers with ES6+ support
- CSS backdrop-filter support for glassmorphism effects
- Intersection Observer API for scroll animations

## 🚀 Deployment

The site is configured for GitHub Pages deployment:

```bash
npm run build
npm run deploy
```