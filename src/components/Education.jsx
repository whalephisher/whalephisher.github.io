import React, { useEffect, useRef, useState } from "react";
import { educationData } from "../data/portfolioData";
import "./Education.css";

const Education = () => {
  const educationRef = useRef(null);
  const [unlockedItems, setUnlockedItems] = useState(new Set());

  useEffect(() => {
    const badges = educationRef.current?.querySelectorAll(".edu-item");
    if (!badges) return;

    // Create achievement unlocking animation
    badges.forEach((badge, i) => {
      badge.style.opacity = "0";
      badge.style.transform = "scale(0.5) rotateY(90deg)";
      badge.style.filter = "grayscale(100%) brightness(0.5)";

      setTimeout(() => {
        badge.style.opacity = "1";
        badge.style.transform = "scale(1) rotateY(0deg)";
        badge.style.filter = "grayscale(0%) brightness(1)";
        badge.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        
        // Add to unlocked items
        setTimeout(() => {
          setUnlockedItems(prev => new Set([...prev, i]));
        }, 400);
      }, 120 * i);
    });
  }, []);

  const getEducationType = (item) => {
    if (item.includes("B.S.")) return "degree";
    if (item.includes("Certificate") || item.includes("Professional")) return "certificate";
    if (item.includes("CompTIA") || item.includes("ce")) return "certification";
    if (item.includes("Course") || item.includes("Academy")) return "course";
    return "achievement";
  };

  const getEducationIcon = (type) => {
    switch (type) {
      case "degree": return "🎓";
      case "certificate": return "📜";
      case "certification": return "🏆";
      case "course": return "📚";
      default: return "⭐";
    }
  };

  const getEducationColor = (type) => {
    switch (type) {
      case "degree": return "#FFD700";
      case "certificate": return "#3cbbb1";
      case "certification": return "#FF6B6B";
      case "course": return "#4ECDC4";
      default: return "#95E1D3";
    }
  };

  return (
    <div className="education-container" ref={educationRef}>
      <div className="education-grid">
        {educationData.map((item, index) => {
          const type = getEducationType(item);
          const icon = getEducationIcon(type);
          const color = getEducationColor(type);
          const isUnlocked = unlockedItems.has(index);
          
          return (
            <div 
              key={index} 
              className={`edu-item ${type} ${isUnlocked ? 'unlocked' : ''}`}
              style={{ '--accent-color': color }}
            >
              <div className="edu-icon">{icon}</div>
              <div className="edu-content">
                <span className="edu-text">{item}</span>
                <div className="edu-progress">
                  <div className="progress-bar"></div>
                </div>
              </div>
              <div className="unlock-effect"></div>
            </div>
          );
        })}
      </div>
      
      <div className="education-stats">
        <div className="stat-item">
          <span className="stat-number">{unlockedItems.size}</span>
          <span className="stat-label">Achievements Unlocked</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{educationData.length}</span>
          <span className="stat-label">Total Milestones</span>
        </div>
      </div>
    </div>
  );
};

export default Education;
