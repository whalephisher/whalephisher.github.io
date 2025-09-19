import React, { useEffect, useRef } from "react";
import { interestsData } from "../data/portfolioData";
import "./Interests.css";

const Interests = () => {
  const interestsRef = useRef(null);

  useEffect(() => {
    const items = interestsRef.current?.querySelectorAll(".interest-item");
    if (!items) return;

    // Animate interests with a throwing effect
    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(-40px) scale(0.7)";

      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0) scale(1)";
      }, 60 * i);
    });
  }, []);

  return (
    <div className="interests-container" ref={interestsRef}>
      <div className="interests-grid">
        {interestsData.map((interest, index) => (
          <span key={index} className="interest-item">
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Interests;
