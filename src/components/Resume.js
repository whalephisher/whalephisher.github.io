import React from 'react';

const Resume = () => {
    const resumeUrl = process.env.PUBLIC_URL + '/resume.pdf';
    return (
        <section className="section">
            <div className="container">
                <header className="section-header">
                    <h1 className="section-title">Resume</h1>
                    <p className="section-subtitle">Download the PDF and skim a quick snapshot below.</p>
                </header>

                <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <a className="btn btn-primary" href={resumeUrl} target="_blank" rel="noreferrer">Download PDF</a>
                    <a className="btn" href="#/contact">Contact</a>
                </div>

                <div className="about-grid">
                    <div className="card">
                        <div className="card-body">
                            <h2>Core skills</h2>
                            <div className="grid" style={{ gap: '.5rem', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
                                <span className="pill">Data Engineering</span>
                                <span className="pill">Python</span>
                                <span className="pill">SQL</span>
                                <span className="pill">Airflow</span>
                                <span className="pill">React.js</span>
                                <span className="pill">APIs</span>
                                <span className="pill">Docker</span>
                                <span className="pill">Cloud (AWS/GCP)</span>
                                <span className="pill">CI/CD</span>
                                <span className="pill">Cybersecurity</span>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h2>Highlights</h2>
                            <ul style={{ paddingLeft: '1rem' }}>
                                <li>Built scalable ELT pipelines and analytics layers enabling data‑driven decisions.</li>
                                <li>Developed backend services and automation tooling to reduce manual ops.</li>
                                <li>Shipped secure‑by‑default patterns informed by prior security experience.</li>
                                <li>Delivered across government and enterprise settings with clear, maintainable code.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="muted" style={{ marginTop: '1rem' }}>Tip: place your PDF at public/resume.pdf to enable the download button.</p>
            </div>
        </section>
    );
};

export default Resume;
