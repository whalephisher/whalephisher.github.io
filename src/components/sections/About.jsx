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
          src={profileData.profileImage}
          alt="Profile"
          className="profile-img"
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
