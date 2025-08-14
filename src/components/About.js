import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="section">
      <div className="container">
        <header className="section-header">
          <h1 className="section-title">About Me</h1>
          <p className="section-subtitle">Data engineer with a builder mindset (and a security background).</p>
        </header>

        <div className="about-grid">
          <div className="card">
            <div className="card-body">
              <h2>Who I am</h2>
              <p>
                I'm a Data Engineer and Software Developer with a background in military cyber operations. I specialize in building scalable data pipelines, automating workflows, and developing backend systems that turn complex data into actionable insights. My experience spans full-stack development, cloud-based solutions, and custom tooling across both government and global enterprise environments. I’m passionate about solving real-world problems at the intersection of software, data, and strategy.
              </p>
              <ul style={{ paddingLeft: '1rem', marginTop: '.5rem' }}>
                <li>Designed and operated reliable ELT workflows and analytics layers.</li>
                <li>Built backend services and automation that reduced manual work.</li>
                <li>Partnered with stakeholders to turn ambiguous needs into shipped features.</li>
                <li>Brought a security-first perspective to data and platform engineering.</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h2>Why “Whalephisher”?</h2>
              <p>
                “Whale phishing” (also called “whaling”) is a cybersecurity term for highly targeted phishing aimed at high‑profile individuals. My handle is a nod to the precision, research, and care required to tackle high‑impact targets—applied ethically to engineering problems. It reflects my security roots and how I approach data and software today: measured, practical, and secure‑by‑default.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
