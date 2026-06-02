import React, { useEffect, useRef, useState, useCallback } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { interestsData } from "../../data/portfolioData";
import "./Interests.css";

const WORLD_GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const US_GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Country names to match — exclude USA (states handle it), exclude Canada (only BC, can't show provinces)
const visitedCountryNames = new Set([
  "Taiwan", "South Korea", "Japan", "Italy",
  "France", "Greece", "Germany", "Spain"
]);

// US state names for visited states
const visitedStateNames = new Set([
  "Hawaii", "Washington", "California", "Arizona", "Nevada", "Utah",
  "Oregon", "Idaho", "Montana", "Wyoming", "Illinois", "Indiana",
  "Maryland", "New York", "Virginia", "South Carolina", "North Carolina",
  "Georgia", "Pennsylvania"
]);

const Interests = () => {
  const containerRef = useRef(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [stars, setStars] = useState([]);
  const [hyperspace, setHyperspace] = useState(false);
  const [hyperspaceExit, setHyperspaceExit] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [hoveredGeo, setHoveredGeo] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [mapZoom, setMapZoom] = useState(1);
  const [mapCenter, setMapCenter] = useState([0, 30]);
  const mapContainerRef = useRef(null);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    setMapZoom((prev) => {
      const delta = e.deltaY > 0 ? -0.3 : 0.3;
      return Math.min(8, Math.max(1, prev + delta));
    });
  }, []);

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
    setShowMap(false);
    setHyperspaceExit(true);
    setTimeout(() => {
      setHyperspace(false);
      setHyperspaceExit(false);
    }, 1500);
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

      {/* Hyperspace streaks overlay — radial from center */}
      {hyperspace && !showMap && (
        <div className={`hyperspace-overlay ${hyperspaceExit ? "hyperspace-reverse" : ""}`}>
          {Array.from({ length: 80 }).map((_, i) => {
            const angle = (i / 80) * 360;
            const delay = Math.random() * 0.3;
            return (
              <div
                key={i}
                className="hyperspace-streak"
                style={{
                  "--angle": `${angle}deg`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
          <div className="hyperspace-flash" />
        </div>
      )}

      {/* World Map Overlay */}
      {showMap && (
        <div className={`travel-map-overlay ${mapReady ? "map-visible" : ""}`} onClick={closeMap}>
          <div className="travel-map-container" onClick={(e) => e.stopPropagation()}>
            <button className="map-close-btn" onClick={closeMap}>✕</button>
            <h2 className="map-title">Places I've Been 🌍</h2>

            {hoveredGeo && (
              <div
                className="map-tooltip"
                style={{ left: tooltipPos.x, top: tooltipPos.y }}
              >
                {hoveredGeo}
              </div>
            )}

            <div
              className="map-content"
              ref={mapContainerRef}
              onWheel={handleWheel}
              onMouseMove={(e) => {
                const rect = e.currentTarget.closest('.travel-map-container').getBoundingClientRect();
                setTooltipPos({ x: e.clientX - rect.left + 12, y: e.clientY - rect.top - 10 });
              }}
            >
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 130, center: [0, 30] }}
                className="world-map-svg"
              >
                <ZoomableGroup
                  zoom={mapZoom}
                  center={mapCenter}
                  onMoveEnd={({ coordinates, zoom }) => {
                    setMapCenter(coordinates);
                    setMapZoom(zoom);
                  }}
                  minZoom={1}
                  maxZoom={8}
                >
                {/* World countries */}
                <Geographies geography={WORLD_GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const name = geo.properties.name;
                      const isVisited = visitedCountryNames.has(name);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          className={isVisited ? "geo-visited-country" : "geo-default"}
                          onMouseEnter={() => {
                            if (isVisited) setHoveredGeo(name);
                          }}
                          onMouseLeave={() => setHoveredGeo("")}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* US states overlaid on top */}
                <Geographies geography={US_GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const name = geo.properties.name;
                      const isVisited = visitedStateNames.has(name);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          className={isVisited ? "geo-visited-state" : "geo-us-default"}
                          onMouseEnter={() => {
                            if (isVisited) setHoveredGeo(name);
                          }}
                          onMouseLeave={() => setHoveredGeo("")}
                        />
                      );
                    })
                  }
                </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </div>
          </div>
        </div>
      )}

      <div className={`interests-grid ${hyperspace && !showMap && !hyperspaceExit ? "hyperspace-fade" : ""} ${hyperspaceExit ? "hyperspace-fade-in" : ""} ${hyperspace && showMap ? "hyperspace-hidden" : ""}`}>
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
