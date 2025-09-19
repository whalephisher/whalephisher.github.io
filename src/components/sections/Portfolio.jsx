import React from "react";
import { portfolioData } from "../data/portfolioData";
import { useScrollAnimation } from "../hooks/useAnimations";
import { ImageLoader } from "./LoadingAnimation";
import "./Portfolio.css";

const Portfolio = () => {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.3 });
  const [gridRef, gridVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="work" className="portfolio-section">
      <div className="container">
        <h2
          ref={titleRef}
          className={`portfolio-title animate-fade-in-up ${
            titleVisible ? "visible" : ""
          }`}
        >
          Featured Work
        </h2>
        <div
          ref={gridRef}
          className={`portfolio-grid animate-fade-in animate-delay-300 ${
            gridVisible ? "visible" : ""
          }`}
        >
          {portfolioData.map((project, index) => (
            <div
              key={project.id}
              className={`portfolio-card animate-scale-in animate-delay-${
                (index + 1) * 200
              } ${gridVisible ? "visible" : ""}`}
              onClick={() => project.link && window.open(project.link, '_blank')}
              style={{ cursor: project.link ? 'pointer' : 'default' }}
            >
              <div className="portfolio-image">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} Logo`}
                    className="portfolio-img"
                  />
                ) : (
                  <div className="placeholder-image">
                    <span>{project.title[0]}</span>
                  </div>
                )}
              </div>
              <div className="portfolio-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.technologies && (
                  <div className="tech-tags">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="tech-tag"
                        style={{ animationDelay: `${techIndex * 0.1}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
