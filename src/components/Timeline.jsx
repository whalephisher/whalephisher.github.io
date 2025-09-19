import React, { useEffect, useRef, useState } from "react";
import { experienceData } from "../data/portfolioData";
import "./Timeline.css";

const Timeline = () => {
  const timelineRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const items = timelineRef.current?.querySelectorAll(".timeline-item");
    const line = timelineRef.current?.querySelector(".timeline-line");
    if (!items || !line) return;

    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]));
          } else {
            // Remove from visible items when out of view for re-animation
            setVisibleItems(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
      }
    );

    // Observe all timeline items
    items.forEach((item, index) => {
      item.dataset.index = index;
      observer.observe(item);
    });

    // Animate timeline line drawing
    line.style.transform = "scaleY(0)";
    line.style.transformOrigin = "top";
    line.style.transition =
      "transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

    setTimeout(() => {
      line.style.transform = "scaleY(1)";
    }, 200);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const items = timelineRef.current?.querySelectorAll(".timeline-item");
    if (!items) return;

    // Animate visible items
    items.forEach((item, i) => {
      const isVisible = visibleItems.has(i);
      const isEven = i % 2 === 0;
      
      if (isVisible) {
        item.style.opacity = "1";
        item.style.transform = "translateX(0) scale(1)";
        item.style.transition = "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      } else {
        item.style.opacity = "0";
        item.style.transform = `translateX(${isEven ? '-80px' : '80px'}) scale(0.8)`;
        item.style.transition = "all 0.4s ease-out";
      }
    });
  }, [visibleItems]);

  return (
    <div className="timeline-container" ref={timelineRef}>
      <div className="timeline">
        <div className="timeline-line"></div>

        <div className="timeline-label timeline-label-top">
          {experienceData.topLabel}
        </div>

        {experienceData.items.map((item, index) => (
          <div
            key={index}
            className={`timeline-item ${item.current ? "current" : ""}`}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-title">{item.title}</span>
              {item.subtitles && (
                <div className="timeline-sub">
                  {item.subtitles.map((subtitle, subIndex) => (
                    <span key={subIndex}>{subtitle}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="timeline-label timeline-label-bottom">
          {experienceData.bottomLabel}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
