import React, { useEffect, useRef } from "react";
import { interestsData } from "../../data/portfolioData";
import "./Interests.css";

const Interests = () => {
  const interestsRef = useRef(null);

  useEffect(() => {
    const items = interestsRef.current?.querySelectorAll(".interest-item");
    if (!items) return;

    // Create a popcorn/explosion animation
    items.forEach((item, i) => {
      const randomX = (Math.random() - 0.5) * 100;
      const randomY = (Math.random() - 0.5) * 100;
      const randomRotation = (Math.random() - 0.5) * 720;

      item.style.opacity = "0";
      item.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg) scale(0)`;
      item.style.transition =
        "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translate(0, 0) rotate(0deg) scale(1)";
      }, 50 * i);
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
