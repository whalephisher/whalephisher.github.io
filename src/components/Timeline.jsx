import React, { useEffect, useRef } from "react";
import { experienceData } from "../data/portfolioData";
import "./Timeline.css";

const Timeline = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const items = timelineRef.current?.querySelectorAll(".timeline-item");
    if (!items) return;

    // Animate timeline items in sequence
    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";

      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, 80 * i);
    });
  }, []);

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
