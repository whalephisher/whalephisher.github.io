import React, { useEffect, useRef } from "react";
import { skillsData } from "../data/portfolioData";
import "./Skills.css";

const Skills = () => {
  const skillsRef = useRef(null);

  useEffect(() => {
    const tags = skillsRef.current?.querySelectorAll(".skill-tag");
    if (!tags) return;

    // Create a bouncing cascade animation
    tags.forEach((tag, i) => {
      tag.style.opacity = "0";
      tag.style.transform = "translateY(-30px) rotate(10deg) scale(0)";
      tag.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

      setTimeout(() => {
        tag.style.opacity = "1";
        tag.style.transform = "translateY(0) rotate(0deg) scale(1)";
      }, 40 * i);
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
