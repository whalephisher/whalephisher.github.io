import React, { useState, useRef, useEffect } from "react";
import { skillsData } from "../../data/portfolioData";
import "./Skills.css";

const Skills = () => {
  const categories = Object.entries(skillsData);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({
          x: Math.max(0, Math.min(100, x)),
          y: Math.max(0, Math.min(100, y)),
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <div
      className="skills-container"
      ref={containerRef}
      style={{
        "--mouse-x": `${mousePosition.x}%`,
        "--mouse-y": `${mousePosition.y}%`,
      }}
    >
      <div className="ubuntu-terminal-header">
        <div className="terminal-title">gabriel@portfolio:~/skills</div>
      </div>

      <div className="terminal-content">
        <div className="terminal-output">
          {categories.map(([categoryName, categoryInfo], categoryIndex) => (
            <div
              key={categoryName}
              className={`terminal-category ${
                hoveredCategory === categoryName ? "active" : ""
              }`}
              style={{
                "--category-index": categoryIndex,
                "--typing-delay": `${categoryIndex * 1.2}s`,
              }}
              onMouseEnter={() => setHoveredCategory(categoryName)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="terminal-session">
                <div className="terminal-command-line">
                  <span className="prompt-user">gabriel@portfolio</span>
                  <span className="prompt-separator">:</span>
                  <span className="prompt-path">~/skills</span>
                  <span className="prompt-symbol">$</span>
                  <span className="command-text">
                    ls -la ./{categoryName.toLowerCase().replace(/\s+/g, "_")}/
                    --color=always
                  </span>
                </div>

                <div className="terminal-category-content">
                  <div className="skills-listing">
                    {categoryInfo.skills.map((skill, skillIndex) => (
                      <div
                        key={skill}
                        className="skill-file-line"
                        style={{
                          "--skill-delay": `${skillIndex * 0.1}s`,
                        }}
                      >
                        <span className="file-permissions">-rwxr-xr-x</span>
                        <span className="file-owner">gabriel</span>
                        <span className="file-group">dev</span>
                        <span className="file-size">
                          {(skill.length * 0.5 + 1).toFixed(1)}K
                        </span>
                        <span className="file-date">
                          Sep 24 {new Date().getFullYear()}
                        </span>
                        <span className="skill-filename">
                          {skill.toLowerCase().replace(/\s+/g, "_")}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="terminal-stats">
                    <span className="stats-text">
                      total {categoryInfo.skills.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
