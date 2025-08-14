import React from 'react';

const Projects = () => {
  return (
    <section className="section">
      <div className="container">
        <header className="section-header">
          <h1 className="section-title">Projects</h1>
          <p className="section-subtitle">Selected builds, tools, and experiments.</p>
        </header>

        <div className="card" style={{ maxWidth: 720, margin: '1rem auto' }}>
          <div className="card-body">
            <h3>Coming soon</h3>
            <p className="muted">Under Construction. Check back shortly.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
