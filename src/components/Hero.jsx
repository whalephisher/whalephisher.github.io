import React, { useEffect, useRef, useState } from "react";
import { profileData } from "../data/portfolioData";
import "./Hero.css";

const Hero = () => {
  const heroRef = useRef(null);
  const circlesRef = useRef([]);

  // Typewriter state
  const typewriterRef = useRef(null);
  const [isTypewriterVisible, setIsTypewriterVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  // Intersection observer for typewriter - same pattern as timeline
  useEffect(() => {
    const element = typewriterRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsTypewriterVisible(true);
          } else {
            // Reset when out of view for re-animation
            setIsTypewriterVisible(false);
            setDisplayText("");
            setShowCursor(false);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  // Typewriter effect when visible
  useEffect(() => {
    if (!isTypewriterVisible || !profileData.description) return;

    let timeoutId;
    let currentIndex = 0;
    const text = profileData.description;

    // Reset
    setDisplayText("");
    setShowCursor(true);

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextChar, 50); // Hero typing speed
      } else {
        // Keep cursor for a bit then hide
        timeoutId = setTimeout(() => setShowCursor(false), 1000);
      }
    };

    // Start typing immediately
    typeNextChar();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isTypewriterVisible]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const circles = circlesRef.current;
    const circleStates = [];

    // Initialize circle states
    circles.forEach((circle, i) => {
      if (!circle) return;

      const bounds = {
        left: 0,
        top: 0, // No navbar offset needed with floating design
        right: hero.offsetWidth,
        bottom: hero.offsetHeight,
        width: hero.offsetWidth,
        height: hero.offsetHeight,
      };

      const cw = circle.offsetWidth;
      const ch = circle.offsetHeight;

      let x = Math.random() * (bounds.width - cw);
      let y = bounds.top + Math.random() * (bounds.height - ch);

      // Ensure circles start fully within bounds
      x = Math.max(bounds.left, Math.min(x, bounds.right - cw));
      y = Math.max(bounds.top, Math.min(y, bounds.bottom - ch));

      const speed = 0.7 + Math.random() * 0.7;
      const angle = (Math.random() * Math.PI * 2 * (i + 1)) / circles.length;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      circleStates.push({ circle, x, y, vx, vy, cw, ch });
    });

    let animationId;

    function animateCircles() {
      const bounds = {
        left: 0,
        top: 0,
        right: hero.offsetWidth,
        bottom: hero.offsetHeight,
        width: hero.offsetWidth,
        height: hero.offsetHeight,
      };

      circleStates.forEach((state) => {
        state.x += state.vx;
        state.y += state.vy;

        // Bounce off left/right
        if (state.x <= bounds.left) {
          state.x = bounds.left;
          state.vx = Math.abs(state.vx);
        } else if (state.x >= bounds.right - state.cw) {
          state.x = bounds.right - state.cw;
          state.vx = -Math.abs(state.vx);
        }

        // Bounce off top and bottom
        if (state.y <= bounds.top) {
          state.y = bounds.top;
          state.vy = Math.abs(state.vy);
        } else if (state.y >= bounds.bottom - state.ch) {
          state.y = bounds.bottom - state.ch;
          state.vy = -Math.abs(state.vy);
        }

        state.circle.style.left = `${state.x}px`;
        state.circle.style.top = `${state.y}px`;
      });

      animationId = requestAnimationFrame(animateCircles);
    }

    animateCircles();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <header className="hero" ref={heroRef}>
      <div className="parallax-bg">
        <div
          ref={(el) => (circlesRef.current[0] = el)}
          className="parallax-circle circle-lg circle-pos-1 circle-white"
        ></div>
        <div
          ref={(el) => (circlesRef.current[1] = el)}
          className="parallax-circle circle-md circle-pos-2 circle-blue circle-star-beam"
        ></div>
        <div
          ref={(el) => (circlesRef.current[2] = el)}
          className="parallax-circle circle-sm circle-pos-3 circle-orange circle-shooting-star"
        ></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title animated">{profileData.title}</h1>
        <p className="hero-desc hero-typewriter" ref={typewriterRef}>
          {displayText}
          {showCursor && <span className="caret">|</span>}
        </p>
      </div>
    </header>
  );
};

export default Hero;
