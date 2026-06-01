import React, { useEffect, useRef, useState } from "react";
import { interestsData } from "../../data/portfolioData";
import "./Interests.css";

const visitedPlaces = {
  countries: ["Canada", "Taiwan", "South Korea", "Japan", "Italy", "France", "Greece", "Germany", "Spain"],
  states: ["Hawaii", "Washington", "California", "Arizona", "Nevada", "Utah", "Oregon", "Idaho", "Montana", "Wyoming", "Illinois", "Indiana", "Maryland", "New York", "Virginia", "South Carolina", "North Carolina", "Georgia", "Pennsylvania"]
};

// SVG path coordinates for world map highlights (simplified polygons)
const countryPaths = {
  "Canada": "M 60 80 L 180 80 L 180 120 L 60 120 Z",
  "Taiwan": "M 610 250 L 620 250 L 620 265 L 610 265 Z",
  "South Korea": "M 620 200 L 635 200 L 635 220 L 620 220 Z",
  "Japan": "M 640 180 L 660 180 L 660 230 L 640 230 Z",
  "Italy": "M 370 190 L 380 190 L 380 230 L 370 230 Z",
  "France": "M 340 170 L 365 170 L 365 200 L 340 200 Z",
  "Greece": "M 385 200 L 400 200 L 400 220 L 385 220 Z",
  "Germany": "M 355 155 L 375 155 L 375 180 L 355 180 Z",
  "Spain": "M 320 190 L 345 190 L 345 215 L 320 215 Z",
};

const statePaths = {
  "Hawaii": "M 130 280 L 145 280 L 145 290 L 130 290 Z",
  "Washington": "M 70 130 L 95 130 L 95 145 L 70 145 Z",
  "California": "M 65 165 L 80 165 L 80 210 L 65 210 Z",
  "Arizona": "M 90 200 L 110 200 L 110 220 L 90 220 Z",
  "Nevada": "M 80 165 L 95 165 L 95 200 L 80 200 Z",
  "Utah": "M 95 165 L 110 165 L 110 195 L 95 195 Z",
  "Oregon": "M 65 140 L 90 140 L 90 160 L 65 160 Z",
  "Idaho": "M 90 130 L 105 130 L 105 165 L 90 165 Z",
  "Montana": "M 100 120 L 130 120 L 130 140 L 100 140 Z",
  "Wyoming": "M 110 140 L 130 140 L 130 160 L 110 160 Z",
  "Illinois": "M 175 160 L 185 160 L 185 190 L 175 190 Z",
  "Indiana": "M 185 160 L 195 160 L 195 185 L 185 185 Z",
  "Maryland": "M 210 175 L 225 175 L 225 185 L 210 185 Z",
  "New York": "M 210 140 L 230 140 L 230 165 L 210 165 Z",
  "Virginia": "M 200 180 L 225 180 L 225 195 L 200 195 Z",
  "South Carolina": "M 200 205 L 220 205 L 220 215 L 200 215 Z",
  "North Carolina": "M 200 195 L 225 195 L 225 205 L 200 205 Z",
  "Georgia": "M 190 205 L 205 205 L 205 225 L 190 225 Z",
  "Pennsylvania": "M 205 155 L 225 155 L 225 170 L 205 170 Z",
};

const Interests = () => {
  const containerRef = useRef(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [stars, setStars] = useState([]);
  const [hyperspace, setHyperspace] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
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

    const container = containerRef.current;
    if (container) {
      container.classList.add("interests-visible");
    }
  }, []);

  const handleTagClick = (interest) => {
    if (interest === "Traveling") {
      setHyperspace(true);
      setTimeout(() => {
        setShowMap(true);
        setTimeout(() => setMapReady(true), 50);
      }, 1500);
    }
  };

  const closeMap = () => {
    setMapReady(false);
    setTimeout(() => {
      setShowMap(false);
      setHyperspace(false);
    }, 400);
  };

  return (
    <div className="interests-container" ref={containerRef}>
      <div className="space-background">
        <div className="nebula-layer"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star shooting-star-2"></div>
      </div>
      <div className={`starfield ${hyperspace ? "hyperspace-active" : ""}`}>
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

      {/* Hyperspace streaks overlay */}
      {hyperspace && !showMap && (
        <div className="hyperspace-overlay">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="hyperspace-streak"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${0.6 + Math.random() * 0.6}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* World Map Overlay */}
      {showMap && (
        <div className={`travel-map-overlay ${mapReady ? "map-visible" : ""}`} onClick={closeMap}>
          <div className="travel-map-container" onClick={(e) => e.stopPropagation()}>
            <button className="map-close-btn" onClick={closeMap}>✕</button>
            <h2 className="map-title">Places I've Been 🌍</h2>
            <div className="map-content">
              <svg viewBox="0 0 720 400" className="world-map-svg">
                {/* World outline - simplified continents */}
                <path d="M 50 100 Q 80 80, 120 90 L 180 80 Q 220 75, 250 100 L 240 140 Q 220 160, 200 180 L 210 220 Q 200 260, 180 280 L 150 300 Q 130 280, 120 250 L 100 200 Q 70 160, 50 140 Z" className="continent" /> {/* North America */}
                <path d="M 150 300 Q 170 310, 180 330 L 170 370 Q 150 380, 140 370 L 130 340 Q 140 320, 150 300 Z" className="continent" /> {/* South America */}
                <path d="M 310 140 Q 350 120, 400 130 L 420 160 Q 410 200, 390 220 L 350 230 Q 320 220, 310 200 L 300 170 Z" className="continent" /> {/* Europe */}
                <path d="M 330 240 Q 370 230, 420 250 L 440 300 Q 420 340, 380 360 L 340 350 Q 310 320, 320 280 Z" className="continent" /> {/* Africa */}
                <path d="M 430 130 Q 500 110, 580 130 L 650 160 Q 660 200, 640 240 L 580 270 Q 520 260, 470 230 L 440 200 Q 430 160, 430 130 Z" className="continent" /> {/* Asia */}
                <path d="M 580 320 Q 620 310, 650 330 L 660 360 Q 640 380, 600 370 L 580 350 Z" className="continent" /> {/* Australia */}

                {/* Visited countries */}
                {Object.entries(countryPaths).map(([name, path]) => (
                  <path key={name} d={path} className="visited-country">
                    <title>{name}</title>
                  </path>
                ))}

                {/* Visited US states */}
                {Object.entries(statePaths).map(([name, path]) => (
                  <path key={name} d={path} className="visited-state">
                    <title>{name}</title>
                  </path>
                ))}
              </svg>

              <div className="map-legend">
                <div className="legend-section">
                  <h4>🌏 Countries ({visitedPlaces.countries.length})</h4>
                  <div className="legend-tags">
                    {visitedPlaces.countries.map((c) => (
                      <span key={c} className="legend-tag country-tag">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="legend-section">
                  <h4>🇺🇸 US States ({visitedPlaces.states.length})</h4>
                  <div className="legend-tags">
                    {visitedPlaces.states.map((s) => (
                      <span key={s} className="legend-tag state-tag">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`interests-grid ${hyperspace && !showMap ? "hyperspace-fade" : ""}`}>
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
                    "--jiggle-delay": `${
                      categoryIndex * 0.7 + Math.random() * 0.5
                    }s`,
                    "--jiggle-duration": `${2 + Math.random() * 1.5}s`,
                  }}
                >
                  {categoryData.icon}
                </div>
                <h3 className="card-title">{categoryName}</h3>
                <div className="interest-tags">
                  {categoryData.interests.map((interest, index) => {
                    const isClickable = interest === "Traveling";
                    return (
                      <span
                        key={index}
                        className={`interest-tag ${isClickable ? "interest-tag-clickable" : ""}`}
                        onClick={isClickable ? () => handleTagClick(interest) : undefined}
                      >
                        {interest}
                        {isClickable && <span className="tag-click-hint">↗</span>}
                      </span>
                    );
                  })}
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
