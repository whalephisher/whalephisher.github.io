import React, { useState } from "react";
import { profileData, aboutData } from "../data/portfolioData";
import { useScrollAnimation, useTypewriter } from "../hooks/useAnimations";
import Timeline from "./Timeline";
import Skills from "./Skills";
import Education from "./Education";
import Interests from "./Interests";
import "./About.css";

const About = () => {
  const [activeTab, setActiveTab] = useState("experience");
  const [profileRef, profileVisible] = useScrollAnimation({ threshold: 0.3 });

  // Typewriter effect for the about text
  const { displayText, showCursor } = useTypewriter(
    profileData.typewriterText,
    50,
    1000
  );

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
          <h3>Hi, I'm {profileData.name}.</h3>
          <p className="about-typewriter">
            {displayText}
            {showCursor && <span className="caret">|</span>}
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
