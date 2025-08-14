import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container">
                <p>© {year} Gabriel Liau • Built with React • <a href="https://github.com/whalephisher" target="_blank" rel="noreferrer">GitHub</a></p>
            </div>
        </footer>
    );
};

export default Footer;
