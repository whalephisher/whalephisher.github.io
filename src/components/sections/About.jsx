import React, { useState, useEffect, useRef } from "react";
import { profileData, aboutData } from "../../data/portfolioData";
import { useScrollAnimation } from "../../hooks/useAnimations";
import Timeline from "../ui/Timeline";
import Skills from "../ui/Skills";
import Education from "../ui/Education";
import Interests from "../ui/Interests";
import "./About.css";

const About = () => {
  const [activeTab, setActiveTab] = useState("experience");
  const [profileRef, profileVisible] = useScrollAnimation({ threshold: 0.3 });
  const profileImages = [profileData.profileImage, "/assets/profile2.jpeg", "/assets/whalephisher.png"];
  const [imageIndex, setImageIndex] = useState(0);
  const imageIndexRef = useRef(0);
  const profileImgRef = useRef(null);

  // Typewriter state for the main heading
  const typewriterRef = useRef(null);
  const [isTypewriterVisible, setIsTypewriterVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  // Separate animation for the description that fades in after typewriter
  const [descriptionRef, descriptionVisible] = useScrollAnimation({
    threshold: 0.3,
  });

  // Intersection observer for typewriter - triggers for heading
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

  // Typewriter effect for "Hi, I'm Gabriel Liau" when visible
  useEffect(() => {
    if (!isTypewriterVisible) return;

    let timeoutId;
    let currentIndex = 0;
    const text = `Hi, I'm ${profileData.name}.`;

    // Reset
    setDisplayText("");
    setShowCursor(true);

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextChar, 50); // Slightly slower for main heading
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

  // Coin flip interaction
  const coinRef = useRef({
    isDragging: false,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    progress: 0, // 0 = fully showing current face, 1 = fully showing next face
    direction: 1, // 1 = right (next), -1 = left (prev)
    animFrame: null,
    isAnimating: false,
  });

  // Get the next/prev image index
  const getAdjacentImage = (dir) => {
    const len = profileImages.length;
    return (imageIndexRef.current + dir + len) % len;
  };

  const updateImage = (newIndex) => {
    imageIndexRef.current = newIndex;
    setImageIndex(newIndex);
  };

  // Apply coin visual: progress 0-1 maps to a full 180° turn
  // 0 = flat face showing, 0.5 = edge-on, 1 = new face showing
  const applyCoin = (progress) => {
    const img = profileImgRef.current;
    if (!img) return;
    // Map progress to scaleX: 0→1 at start, goes to ~0.12 at edge, back to 1
    const angle = progress * Math.PI; // 0 to π
    const rawScale = Math.abs(Math.cos(angle));
    const scaleX = Math.max(0.12, rawScale); // Thick visible edge
    const edgeness = 1 - rawScale;

    img.style.transform = `scaleX(${scaleX})`;
    img.style.boxShadow = `0 ${4 + edgeness * 8}px ${12 + edgeness * 20}px rgba(0, 0, 0, ${0.15 + edgeness * 0.4})`;
    img.style.borderWidth = `${4 + edgeness * 3}px`; // Border thickens at edge

    // Swap image at the midpoint (edge-on)
    if (progress >= 0.5 && coinRef.current.progress < 0.5) {
      // Crossed the midpoint going forward
      const dir = coinRef.current.direction;
      updateImage(getAdjacentImage(dir));
    } else if (progress < 0.5 && coinRef.current.progress >= 0.5) {
      // Crossed back (user reversed before committing)
      const dir = coinRef.current.direction;
      updateImage(getAdjacentImage(-dir)); // Go back
    }

    coinRef.current.progress = progress;
  };

  const resetCoin = () => {
    const img = profileImgRef.current;
    if (!img) return;
    img.style.transform = "";
    img.style.boxShadow = "";
    img.style.borderWidth = "";
    coinRef.current.progress = 0;
  };

  // Animate progress from current to target (0 or 1)
  const animateToTarget = (from, to, duration, easeFn) => {
    const coin = coinRef.current;
    coin.isAnimating = true;
    const start = performance.now();
    const delta = to - from;

    const frame = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const current = from + delta * easeFn(t);
      applyCoin(current);

      if (t < 1) {
        coin.animFrame = requestAnimationFrame(frame);
      } else {
        resetCoin();
        coin.isAnimating = false;
      }
    };
    coin.animFrame = requestAnimationFrame(frame);
  };

  // Multi-flip animation (fast swipe)
  const animateMultiFlip = (flips, direction) => {
    const coin = coinRef.current;
    coin.isAnimating = true;
    coin.direction = direction;
    const totalDuration = 200 + flips * 180; // Fast spins
    const start = performance.now();
    let completedFlips = 0;

    const frame = (now) => {
      const t = Math.min((now - start) / totalDuration, 1);
      const ease = 1 - Math.pow(1 - t, 2.5); // Ease out
      const totalProgress = ease * flips; // 0 to N flips
      const currentFlip = Math.floor(totalProgress);
      const withinFlip = totalProgress - currentFlip; // 0-1 within current flip

      // When we complete a flip, update direction for next
      if (currentFlip > completedFlips) {
        completedFlips = currentFlip;
        coin.progress = 0; // Reset for next flip cycle
      }

      applyCoin(withinFlip);

      if (t < 1) {
        coin.animFrame = requestAnimationFrame(frame);
      } else {
        resetCoin();
        coin.isAnimating = false;
      }
    };
    coin.animFrame = requestAnimationFrame(frame);
  };

  const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  // Auto single flip
  const triggerFlip = () => {
    const coin = coinRef.current;
    if (coin.isAnimating || coin.isDragging) return;
    coin.direction = 1;
    coin.progress = 0;
    animateToTarget(0, 1, 600, easeInOut);
  };

  // Drag handlers
  const handlePointerDown = (e) => {
    const coin = coinRef.current;
    if (coin.isAnimating) {
      cancelAnimationFrame(coin.animFrame);
      coin.isAnimating = false;
      resetCoin();
    }
    e.preventDefault();
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    coin.isDragging = true;
    coin.startX = x;
    coin.lastX = x;
    coin.lastTime = performance.now();
    coin.velocity = 0;
    coin.progress = 0;
  };

  const handlePointerMove = (e) => {
    const coin = coinRef.current;
    if (!coin.isDragging) return;
    e.preventDefault();
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const now = performance.now();
    const dt = now - coin.lastTime;
    if (dt > 0) {
      coin.velocity = (x - coin.lastX) / dt;
    }
    coin.lastX = x;
    coin.lastTime = now;

    // Map drag distance to progress: 100px = full flip
    const dx = x - coin.startX;
    const direction = dx >= 0 ? 1 : -1;
    coin.direction = direction;
    // Progress is 0-1 based on how far through the flip we are
    const progress = Math.min(1, Math.abs(dx) / 100);
    applyCoin(progress);
  };

  const handlePointerUp = () => {
    const coin = coinRef.current;
    if (!coin.isDragging) return;
    coin.isDragging = false;

    const speed = Math.abs(coin.velocity);
    const currentProgress = coin.progress;

    if (speed > 1.5) {
      // Fast flick — do multiple flips
      const dir = coin.velocity > 0 ? 1 : -1;
      coin.direction = dir;
      const flips = Math.min(5, Math.ceil(speed * 1.5));
      // Continue from current progress
      animateMultiFlip(flips, dir);
    } else if (currentProgress > 0.25) {
      // Past 25% commitment threshold — complete the flip
      animateToTarget(currentProgress, 1, 250 * (1 - currentProgress), easeOut);
    } else {
      // Not enough — snap back
      animateToTarget(currentProgress, 0, 200, easeOut);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (coinRef.current.animFrame) cancelAnimationFrame(coinRef.current.animFrame);
    };
  }, []);

  // Auto-flip periodically
  useEffect(() => {
    const scheduleFlip = () => {
      const delay = 6000 + Math.random() * 4000;
      return setTimeout(() => {
        triggerFlip();
        timerId = scheduleFlip();
      }, delay);
    };
    let timerId = scheduleFlip();
    return () => clearTimeout(timerId);
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "experience":
        return <Timeline key={`timeline-${activeTab}`} />;
      case "skills":
        return <Skills key={`skills-${activeTab}`} />;
      case "education":
        return <Education key={`education-${activeTab}`} />;
      case "interests":
        return <Interests key={`interests-${activeTab}`} />;
      default:
        return <Timeline key={`timeline-${activeTab}`} />;
    }
  };

  return (
    <section id="about" className="about-section">
      <div
        ref={profileRef}
        className={`about-profile animate-fade-in-up ${
          profileVisible ? "visible" : ""
        }`}
      >
        <img
          ref={profileImgRef}
          src={profileImages[imageIndex]}
          alt="Profile"
          className="profile-img"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={() => { if (coinRef.current.isDragging) handlePointerUp(); }}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          draggable={false}
        />
        <div className="profile-intro">
          <h3 className="about-typewriter" ref={typewriterRef}>
            {displayText}
            {showCursor && <span className="caret">|</span>}
          </h3>
          <p
            ref={descriptionRef}
            className={`about-description animate-fade-in-up ${
              descriptionVisible ? "visible" : ""
            }`}
          >
            {profileData.typewriterText}
          </p>
        </div>
      </div>

      <div className="about-glass-tabs">
        <div className="about-tabs">
          {aboutData.tabs.map((tab) => (
            <button
              key={tab.id}
              className={`about-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <span className="card-icon">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        <div className="about-tab-content">
          <div className="tab-content-wrapper" key={activeTab}>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
