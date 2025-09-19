import React, { useEffect, useRef } from "react";
import { educationData } from "../data/portfolioData";
import "./Education.css";

const Education = () => {
  const educationRef = useRef(null);

  useEffect(() => {
    const badges = educationRef.current?.querySelectorAll(".edu-badge");
    if (!badges) return;

    // Create a magnetic flip animation
    badges.forEach((badge, i) => {
      badge.style.opacity = "0";
      badge.style.transform = "rotateY(90deg) scale(0.5)";
      badge.style.transformStyle = "preserve-3d";
      badge.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

      setTimeout(() => {
        badge.style.opacity = "1";
        badge.style.transform = "rotateY(0deg) scale(1)";
      }, 80 * i);
    });
  }, []);

  return (
    <div className="education-container" ref={educationRef}>
      <div className="edu-badges">
        {educationData.map((item, index) => (
          <span key={index} className="edu-badge">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Education;
