import React, { useEffect, useRef } from "react";
import "./ParticleSystem.css";

const ParticleSystem = ({ particleCount = 30, className = "" }) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing particles
    container.innerHTML = "";
    particlesRef.current = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random initial position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      // Random size
      const size = Math.random() * 4 + 1;

      // Random color variation
      const colors = [
        "rgba(60, 187, 177, 0.6)",
        "rgba(0, 151, 167, 0.5)",
        "rgba(224, 247, 250, 0.4)",
        "rgba(255, 255, 255, 0.3)",
      ];

      particle.style.cssText = `
        position: fixed;
        left: 0;
        top: 0;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        opacity: 0;
        will-change: transform, opacity;
        transform: translate(${x}px, ${y}px);
        animation: particleFadeIn 2s ease-in-out forwards;
        animation-delay: ${Math.random() * 2}s;
      `;

      container.appendChild(particle);

      // Store particle data
      particlesRef.current.push({
        element: particle,
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 100 + 50,
      });
    }

    // Animation loop
    let frame = 0;
    const animate = () => {
      frame++;

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen edges
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;

        // Apply floating motion
        particle.y += Math.sin((frame + index) * 0.01) * 0.2;

        // Use transform instead of left/top to avoid layout thrashing
        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;

        // Twinkle effect (less frequent to reduce style recalcs)
        if (frame % 90 === index % 90) {
          particle.element.style.opacity = Math.random() * 0.5 + 0.2;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      particlesRef.current.forEach((particle) => {
        if (particle.x > window.innerWidth) particle.x = window.innerWidth - 10;
        if (particle.y > window.innerHeight)
          particle.y = window.innerHeight - 10;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount]);

  return (
    <div ref={containerRef} className={`particle-system ${className}`}></div>
  );
};

export default ParticleSystem;
