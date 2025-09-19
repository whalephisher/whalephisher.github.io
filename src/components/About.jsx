import React, { useState } from "react";
import { profileData, aboutData } from "../data/portfolioData";
import Timeline from "./Timeline";
import Skills from "./Skills";
import Education from "./Education";
import Interests from "./Interests";
import "./About.css";

const About = () => {
  const [activeTab, setActiveTab] = useState("experience");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "experience":
        return <Timeline />;
      case "skills":
        return <Skills />;
      case "education":
        return <Education />;
      case "interests":
        return <Interests />;
      default:
        return <Timeline />;
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="about-profile">
        <img
          src={profileData.profileImage}
          alt="Profile"
          className="profile-img"
        />
        <div className="profile-intro">
          <h3>Hi, I'm {profileData.name}.</h3>
          <p className="about-typewriter">{profileData.typewriterText}</p>
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

        <div className="about-tab-content">{renderTabContent()}</div>
      </div>
    </section>
  );
};

export default About;
