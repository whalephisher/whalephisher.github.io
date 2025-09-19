import React, { useState, useEffect } from "react";
import "./InteractiveEffects.css";

// Ripple Effect Component
export const RippleEffect = ({ children, className = "" }) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div className={`ripple-container ${className}`} onClick={createRipple}>
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </div>
  );
};

// Magnetic Effect Component
export const MagneticButton = ({
  children,
  strength = 0.3,
  className = "",
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!isHovered) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className={`magnetic-button ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered ? "none" : "transform 0.3s ease-out",
      }}
    >
      {children}
    </div>
  );
};

// Tilt Effect Component
export const TiltCard = ({
  children,
  maxTilt = 15,
  perspective = 1000,
  scale = 1.05,
  className = "",
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const tiltX = (mouseY / (rect.height / 2)) * maxTilt;
    const tiltY = (mouseX / (rect.width / 2)) * -maxTilt;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
          tilt.x || tilt.y ? scale : 1
        })`,
        transition: tilt.x || tilt.y ? "none" : "transform 0.3s ease-out",
      }}
    >
      {children}
    </div>
  );
};

// Floating Action Button with Tooltip
export const FloatingButton = ({
  icon,
  tooltip,
  onClick,
  position = "bottom-right",
  color = "primary",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`floating-button ${position} ${color}`}>
      <button
        className="fab-button"
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {icon}
      </button>
      {showTooltip && <div className="fab-tooltip">{tooltip}</div>}
    </div>
  );
};

// Progress Indicator
export const ProgressIndicator = ({ progress, className = "" }) => {
  return (
    <div className={`progress-indicator ${className}`}>
      <div className="progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
};

// Scroll Progress Bar
export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.pageYOffset;
      const progress = (scrollTop / scrollHeight) * 100;
      setProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="scroll-progress">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

// Particle Burst Effect
export const ParticleBurst = ({ trigger, particleCount = 20 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        angle: (Math.PI * 2 * i) / particleCount,
        velocity: 2 + Math.random() * 3,
        life: 1,
      }));

      setParticles(newParticles);

      const animateParticles = () => {
        setParticles((prev) =>
          prev
            .map((particle) => ({
              ...particle,
              x: particle.x + Math.cos(particle.angle) * particle.velocity,
              y: particle.y + Math.sin(particle.angle) * particle.velocity,
              life: particle.life - 0.02,
            }))
            .filter((particle) => particle.life > 0)
        );
      };

      const interval = setInterval(animateParticles, 16);

      setTimeout(() => {
        clearInterval(interval);
        setParticles([]);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [trigger, particleCount]);

  return (
    <div className="particle-burst">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.life,
          }}
        />
      ))}
    </div>
  );
};

// Sound Effect Hook (for button clicks, etc.)
export const useSoundEffect = () => {
  const playSound = (frequency = 800, duration = 100, type = "sine") => {
    if (typeof window === "undefined" || !window.AudioContext) return;

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duration / 1000
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  };

  return { playSound };
};
