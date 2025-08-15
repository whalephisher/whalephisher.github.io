import React from 'react';
import './Home.css';

const Home = () => {
  // Page title remains simple; hero copy reflects primary Data Engineering focus.

  return (
    <div className="home">
      <section className="section hero">
        <div className="container hero-inner">
          <div>
            <h1>Gabriel Liau</h1>
            <p className="muted" style={{ marginTop: '.35rem' }}>
              Data Engineer | Army Veteran | Software Development | Data Analytics | Cybersecurity Expertise
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#/projects">View Projects</a>
              <a className="btn btn-ghost" href="#/about">About Me</a>
              <a className="btn" href="#/contact">Get in Touch</a>
            </div>
          </div>
          <div>
            <div className="card">
              <div className="card-body">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <img src={process.env.PUBLIC_URL + '/profile.png'} alt="Profile" className="avatar" />
                  <div className="muted" style={{ fontSize: '.95rem' }}>
                    Hi, I’m Gabriel — building data platforms and practical software.
                  </div>
                </div>
                <div className="pill-row">
                  <div className="pill">📊 Data Engineering</div>
                  <div className="pill">🐍 Python</div>
                  <div className="pill">🧮 SQL</div>
                  <div className="pill">🔁 ETL / ELT</div>
                  <div className="pill">🧱 Data Modeling</div>
                  <div className="pill">🔗 APIs</div>
                  <div className="pill">⚛️ React.js</div>
                  <div className="pill">📈 Analytics</div>
                  <div className="pill">☁️ Cloud (AWS/GCP)</div>
                  <div className="pill">🚀 CI/CD</div>
                  <div className="pill">🐳 Docker</div>
                  <div className="pill">🔐 Cybersecurity</div>
                  <div className="pill">🧰 Backend</div>
                  <div className="pill">🧪 Testing</div>
                  <div className="pill">📦 Data Warehousing</div>
                  <div className="pill">🗂️ Orchestration</div>
                  <div className="pill">🕵️ Observability</div>
                </div>
                <p className="muted" style={{ marginTop: '1rem' }}>
                  Focused on reliability, observability, and maintainable models—with a secure-by-default mindset.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
