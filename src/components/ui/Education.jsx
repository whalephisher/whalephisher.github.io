import React, { useEffect, useRef, useState } from "react";
import { educationData } from "../../data/portfolioData";
import "./Education.css";

const Education = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleCards, setVisibleCards] = useState(new Set());
  const educationRef = useRef(null);

  useEffect(() => {
    const categoryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.dataset.section;
          if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
            setVisibleSections((prev) => new Set([...prev, sectionId]));
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.05) {
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              newSet.delete(sectionId);
              return newSet;
            });
          }
        });
      },
      { threshold: [0, 0.05, 0.15, 0.3] }
    );

    // More forgiving card observer - once visible, stays visible unless completely out of view
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = entry.target.dataset.cardId;
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            setVisibleCards((prev) => new Set([...prev, cardId]));
          } else if (!entry.isIntersecting) {
            // Only remove if completely out of viewport
            setVisibleCards((prev) => {
              const newSet = new Set(prev);
              newSet.delete(cardId);
              return newSet;
            });
          }
        });
      },
      {
        threshold: [0, 0.1, 0.25],
        rootMargin: "50px 0px -50px 0px", // Give some buffer space
      }
    );

    const sections = educationRef.current?.querySelectorAll(
      ".education-category"
    );
    const cards = educationRef.current?.querySelectorAll(".education-card");

    sections?.forEach((section) => categoryObserver.observe(section));
    cards?.forEach((card) => cardObserver.observe(card));

    return () => {
      categoryObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <div className="education-container" ref={educationRef}>
      <div className="education-content">
        {Object.entries(educationData).map(([key, category], categoryIndex) => (
          <div
            key={key}
            className={`education-category ${
              visibleSections.has(key) ? "visible" : ""
            }`}
            data-section={key}
            style={{ "--delay": `${categoryIndex * 0.1}s` }}
          >
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <h3 className="category-title">{category.title}</h3>
              <div
                className="category-line"
                style={{ "--category-color": category.color }}
              ></div>
            </div>

            <div className="category-items">
              {category.items.map((item, itemIndex) => {
                const cardId = `${key}-${itemIndex}`;
                return (
                  <div
                    key={itemIndex}
                    className={`education-card ${
                      visibleCards.has(cardId) ? "animate-in" : ""
                    }`}
                    data-card-id={cardId}
                    style={{
                      "--item-delay": `${itemIndex * 0.15}s`,
                      "--accent-color": category.color,
                    }}
                  >
                    <div className="card-header">
                      <h4 className="item-title">{item.title}</h4>
                      <span className="item-year">{item.year}</span>
                    </div>
                    <div className="card-body">
                      <p className="item-institution">{item.institution}</p>
                      <p className="item-details">{item.details}</p>
                    </div>
                    <div
                      className="card-accent"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <div className="card-glow"></div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
