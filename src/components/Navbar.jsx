import React from "react";
import { navigationData } from "../data/portfolioData";
import "./Navbar.css";

const Navbar = () => {
  const { logo, links, socialLinks } = navigationData;

  return (
    <nav className="navbar">
      <div className="logo">{logo}</div>

      <ul className="nav-links">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <div className="social-icons">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            className="icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={social.icon} alt={social.alt} />
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
