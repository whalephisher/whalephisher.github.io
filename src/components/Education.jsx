import React, { useEffect, useRef } from "react";
import { educationData } from "../data/portfolioData";
import "./Education.css";

const Education = () => {
  const educationRef = useRef(null);

  useEffect(() => {
    const badges = educationRef.current?.querySelectorAll(".edu-badge");
    if (!badges) return;

    // Animate badges in sequence
    badges.forEach((badge, i) => {
      badge.style.opacity = "0";
      badge.style.transform = "scale(0.9) translateY(10px)";

      setTimeout(() => {
        badge.style.opacity = "1";
        badge.style.transform = "scale(1) translateY(0)";
      }, 50 * i);
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
