import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { experienceData } from "../../data/portfolioData";
import "./Timeline.css";

const Timeline = () => {
  const timelineRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [showFullTimeline, setShowFullTimeline] = useState(false);
  const [ctfInput, setCtfInput] = useState("");
  const [ctfAttempts, setCtfAttempts] = useState(0);
  const [showCtfChallenge, setShowCtfChallenge] = useState(false);
  const [ctfSolved, setCtfSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filter tech-related experiences
  const techKeywords = [
    "data",
    "cyber",
    "software",
    "web",
    "developer",
    "engineer",
    "analyst",
    "specialist",
    "intern",
  ];

  const filteredExperiences = experienceData.items.filter((item) => {
    const titleLower = item.title.toLowerCase();
    const subtitlesLower = item.subtitles
      ? item.subtitles.join(" ").toLowerCase()
      : "";
    const fullText = titleLower + " " + subtitlesLower;

    return techKeywords.some((keyword) => fullText.includes(keyword));
  });

  const displayedExperiences = showFullTimeline
    ? experienceData.items
    : filteredExperiences;

  const handleExperienceClick = (experience) => {
    if (experience.description) {
      setSelectedExperience(experience);
      setShowModal(true);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Restore body scrolling
    document.body.style.overflow = "unset";
    setTimeout(() => setSelectedExperience(null), 300); // Wait for animation
  };

  const handleCtfSubmit = async () => {
    if (ctfInput.trim() === "") return;

    setCtfAttempts((prev) => prev + 1);

    // Validate using SHA-256 hash comparison
    const isCorrect = await experienceData.ctfChallenge.validate(ctfInput);

    if (isCorrect) {
      setCtfSolved(true);
      setShowFullTimeline(true);
      setShowCtfChallenge(false);
    } else {
      // Show hint after 2 failed attempts
      if (ctfAttempts >= 1) {
        setShowHint(true);
      }
      setCtfInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCtfSubmit();
    }
  };

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
            setVisibleItems((prev) => new Set([...prev, index]));
          } else {
            // Remove from visible items when out of view for re-animation
            setVisibleItems((prev) => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    // Observe all timeline items and success section
    items.forEach((item, index) => {
      item.dataset.index = index;
      observer.observe(item);
    });

    // Also observe the success section if it exists
    const successSection = timelineRef.current?.querySelector(".ctf-success-section");
    if (successSection) {
      successSection.dataset.index = displayedExperiences.length;
      observer.observe(successSection);
    }

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
  }, [ctfSolved, displayedExperiences.length]);

  // Effect to handle timeline item animations
  useEffect(() => {
    const items = timelineRef.current?.querySelectorAll(".timeline-item, .ctf-success-section");
    if (!items) return;

    // Animate visible items
    items.forEach((item, i) => {
      const isVisible = visibleItems.has(i);
      const isEven = i % 2 === 0;
      
      // Special handling for success section
      const isSuccessSection = item.classList.contains('ctf-success-section');

      if (isVisible) {
        item.style.opacity = "1";
        item.style.transform = "translateX(0) scale(1)";
        item.style.transition =
          "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        
        // Add visible class for success section
        if (isSuccessSection) {
          item.classList.add('visible');
        }
      } else {
        item.style.opacity = "0";
        item.style.transform = `translateX(${
          isEven ? "-80px" : "80px"
        }) scale(0.8)`;
        item.style.transition = "all 0.4s ease-out";
        
        // Remove visible class for success section
        if (isSuccessSection) {
          item.classList.remove('visible');
        }
      }
    });
  }, [visibleItems]);

  // Effect to reinitialize observer when timeline view changes
  useEffect(() => {
    if (ctfSolved) {
      // Clear visible items first
      setVisibleItems(new Set());

      // Wait for DOM to update, then reinitialize observer
      setTimeout(() => {
        const items = timelineRef.current?.querySelectorAll(".timeline-item");
        const line = timelineRef.current?.querySelector(".timeline-line");
        if (!items || !line) return;

        // Create new intersection observer
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const index = parseInt(entry.target.dataset.index);
              if (entry.isIntersecting) {
                setVisibleItems((prev) => new Set([...prev, index]));
              } else {
                setVisibleItems((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(index);
                  return newSet;
                });
              }
            });
          },
          {
            threshold: 0.3,
            rootMargin: "0px 0px -20% 0px",
          }
        );

        // Re-observe all timeline items
        items.forEach((item, index) => {
          item.dataset.index = index;
          observer.observe(item);
        });

        // Re-animate timeline line
        line.style.transform = "scaleY(0)";
        line.style.transformOrigin = "top";
        line.style.transition =
          "transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

        setTimeout(() => {
          line.style.transform = "scaleY(1)";
        }, 100);
      }, 300);
    }
  }, [showFullTimeline, ctfSolved]);

  return (
    <div className="timeline-container" ref={timelineRef}>
      <div className="timeline">
        <div className="timeline-line"></div>

        <div className="timeline-label timeline-label-top">
          {experienceData.topLabel}
        </div>

        {displayedExperiences.map((item, index) => (
          <div
            key={index}
            className={`timeline-item ${item.current ? "current" : ""} ${
              item.description ? "clickable" : ""
            }`}
          >
            <div className="timeline-dot"></div>
            <div
              className="timeline-content"
              onClick={() => handleExperienceClick(item)}
            >
              <span className="timeline-title">
                {item.title}
                {item.description && (
                  <span className="timeline-click-hint">ⓘ</span>
                )}
              </span>
              {item.subtitles && (
                <div className="timeline-sub">
                  {item.subtitles.map((subtitle, subIndex) => {
                    const roleData = item.description?.roles?.find(
                      (role) => role.title === subtitle
                    );
                    return (
                      <span
                        key={subIndex}
                        className={roleData ? "clickable-subtitle" : ""}
                        onClick={(e) => {
                          if (roleData) {
                            e.stopPropagation();
                            handleExperienceClick({
                              title: roleData.title,
                              period: roleData.period,
                              description: {
                                responsibilities: roleData.responsibilities,
                              },
                            });
                          }
                        }}
                      >
                        {subtitle}
                        {roleData && (
                          <span className="subtitle-click-hint"> ⓘ</span>
                        )}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* CTF Challenge Section */}
        {!showFullTimeline && !ctfSolved && (
          <div
            className={`ctf-unlock-section ${
              showCtfChallenge ? "challenge-active" : ""
            }`}
          >
            {!showCtfChallenge && <div className="timeline-dot ctf-dot"></div>}
            <div className="ctf-content">
              {!showCtfChallenge ? (
                <div className="ctf-prompt">
                  <div className="ctf-header">
                    <div className="ctf-title">
                                            🔒 Additional Experience Available
                    </div>
                  </div>
                  <div className="ctf-description">
                                        Additional work history is locked behind a mini challenge
                  </div>
                  <button
                    className="ctf-start-btn"
                    onClick={() => setShowCtfChallenge(true)}
                  >
                    🎯 Unlock Full Timeline
                  </button>
                </div>
              ) : (
                <div className="ctf-challenge-container">
                  <div className="ctf-challenge">
                    <div className="ctf-header">
                      <div className="ctf-title">🕵️ Mini CTF Challenge</div>
                      <button
                        className="ctf-close-btn"
                        onClick={() => {
                          setShowCtfChallenge(false);
                          setCtfInput("");
                          setCtfAttempts(0);
                          setShowHint(false);
                        }}
                        aria-label="Close challenge"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="ctf-description">
                      Decode this message to unlock the complete timeline:
                    </div>
                    <div className="ctf-cipher-container">
                      <div className="ctf-cipher">
                        <code>{experienceData.ctfChallenge.cipher}</code>
                      </div>
                    </div>
                    <div className="ctf-input-section">
                      <input
                        type="text"
                        value={ctfInput}
                        onChange={(e) => setCtfInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter decoded message..."
                        className="ctf-input"
                        autoComplete="off"
                      />
                      <button
                        onClick={handleCtfSubmit}
                        className="ctf-submit-btn"
                        disabled={!ctfInput.trim()}
                      >
                        Submit
                      </button>
                    </div>
                    {ctfAttempts > 0 && !ctfSolved && (
                      <div className="ctf-feedback">
                        ❌ Incorrect! Attempts: {ctfAttempts}
                      </div>
                    )}
                    {showHint && (
                      <div className="ctf-hint">
                        💡 Hint: {experienceData.ctfChallenge.hint}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {ctfSolved && (
          <div
            className={`ctf-success-section timeline-item ${
              visibleItems.has(displayedExperiences.length) ? "visible" : ""
            }`}
            data-index={displayedExperiences.length}
          >
            <div className="timeline-dot success-dot"></div>
            <div
              className="success-content timeline-content"
              onClick={() => {
                // Immediate scroll before state change to prevent jump
                const aboutSection = document.querySelector(".about-section");
                if (aboutSection) {
                  aboutSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }

                // Delay state change slightly to allow scroll to start
                setTimeout(() => {
                  setShowFullTimeline(!showFullTimeline);
                }, 50);
              }}
            >
              <div className="success-title">
                {showFullTimeline
                  ? "Show Tech-Focused Experience"
                  : "Show Complete Work History"}
              </div>
              <div className="success-message">
                {showFullTimeline
                  ? "Click to show only current tech-focused roles"
                  : "Click to view the complete work history including all roles"}
              </div>
            </div>
          </div>
        )}

        <div className="timeline-label timeline-label-bottom">
          {experienceData.bottomLabel}
        </div>
      </div>

      {/* Experience Detail Modal */}
      {showModal &&
        selectedExperience &&
        createPortal(
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="modal-title">{selectedExperience.title}</h2>
                {selectedExperience.period && (
                  <p className="modal-period">{selectedExperience.period}</p>
                )}
                <button
                  className="modal-close-btn"
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="modal-content">
                {selectedExperience.description.responsibilities && (
                  <div className="modal-responsibilities">
                    <h3>Key Responsibilities</h3>
                    <ul>
                      {selectedExperience.description.responsibilities.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {selectedExperience.description.roles && (
                  <div className="modal-roles">
                    {selectedExperience.description.roles.map((role, index) => (
                      <div key={index} className="modal-role">
                        <h4>{role.title}</h4>
                        <p className="role-period">{role.period}</p>
                        <ul>
                          {role.responsibilities.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Timeline;
