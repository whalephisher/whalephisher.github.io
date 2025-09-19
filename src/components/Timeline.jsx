import React, { useEffect, useRef } from "react";
import { experienceData } from "../data/portfolioData";
import "./Timeline.css";

const Timeline = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const items = timelineRef.current?.querySelectorAll(".timeline-item");
    const line = timelineRef.current?.querySelector(".timeline-line");
    if (!items || !line) return;

    // Animate timeline line drawing
    line.style.transform = "scaleY(0)";
    line.style.transformOrigin = "top";
    line.style.transition =
      "transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

    setTimeout(() => {
      line.style.transform = "scaleY(1)";
    }, 200);

    // Animate timeline items with slide-in from left/right alternating
    items.forEach((item, i) => {
      const isEven = i % 2 === 0;
      item.style.opacity = "0";
      item.style.transform = `translateX(${
        isEven ? "-50px" : "50px"
      }) scale(0.8)`;
      item.style.transition =
        "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateX(0) scale(1)";
      }, 400 + 120 * i);
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
