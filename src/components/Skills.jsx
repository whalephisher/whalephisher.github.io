import React, { useEffect, useRef } from "react";
import { skillsData } from "../data/portfolioData";
import "./Skills.css";

const Skills = () => {
  const skillsRef = useRef(null);

  useEffect(() => {
    const tags = skillsRef.current?.querySelectorAll(".skill-tag");
    if (!tags) return;

    // Animate tags in sequence
    tags.forEach((tag, i) => {
      tag.style.opacity = "0";
      tag.style.transform = "scale(0.8)";

      setTimeout(() => {
        tag.style.opacity = "1";
        tag.style.transform = "scale(1)";
      }, 30 * i);
    });
  }, []);

  return (
    <div className="skills-container" ref={skillsRef}>
      <div className="skills-tags">
        {skillsData.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;
