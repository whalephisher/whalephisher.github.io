import React from "react";
import { portfolioData } from "../data/portfolioData";
import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section id="work" className="portfolio-section">
      <div className="container">
        <h2>Featured Work</h2>
        <div className="portfolio-grid">
          {portfolioData.map((project) => (
            <div key={project.id} className="portfolio-card">
              <div className="portfolio-image">
                {project.image ? (
                  <img src={project.image} alt={`${project.title} Logo`} />
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
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
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
