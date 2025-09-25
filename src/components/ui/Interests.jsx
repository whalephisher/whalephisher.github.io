import React, { useEffect, useRef, useState } from "react";
import { interestsData } from "../../data/portfolioData";
import "./Interests.css";

const Interests = () => {
  const containerRef = useRef(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Create enhanced starfield
    const createStars = () => {
      const starElements = [];
      for (let i = 0; i < 80; i++) {
        starElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkle: Math.random() * 4 + 1.5,
          color:
            Math.random() > 0.7
              ? Math.random() > 0.5
                ? "#a8d8ea"
                : "#aa96da"
              : "#ffffff",
        });
      }
      setStars(starElements);
    };

    createStars();

    // Add floating animation to container when it becomes visible
    const container = containerRef.current;
    if (container) {
      container.classList.add("interests-visible");
    }
  }, []);

  return (
    <div className="interests-container" ref={containerRef}>
      <div className="space-background">
        <div className="nebula-layer"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star shooting-star-2"></div>
      </div>
      <div className="starfield">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: `${star.twinkle}s`,
              background: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            }}
          />
        ))}
      </div>

      <div className="interests-grid">
        {Object.entries(interestsData).map(
          ([categoryName, categoryData], categoryIndex) => (
            <div
              key={categoryName}
              className={`interest-card ${
                hoveredCategory === categoryName ? "hovered" : ""
              }`}
              style={{
                "--animation-delay": `${categoryIndex * 0.15}s`,
                "--wave-delay": `${categoryIndex * 0.4}s`,
              }}
              onMouseEnter={() => setHoveredCategory(categoryName)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="card-glow"></div>
              <div className="card-content">
                <div
                  className="card-icon"
                  style={{
                    "--icon-index": categoryIndex,
                  }}
                >
                  {categoryData.icon}
                </div>
                <h3 className="card-title">{categoryName}</h3>
                <div className="interest-tags">
                  {categoryData.interests.map((interest, index) => (
                    <span key={index} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Interests;
