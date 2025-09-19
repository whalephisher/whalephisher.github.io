import React from "react";
import { navigationData } from "../data/portfolioData";
import { useSmoothScroll } from "../hooks/useAnimations";
import { RippleEffect } from "./InteractiveEffects";
import "./Navbar.css";

const Navbar = () => {
  const { logo, links, socialLinks } = navigationData;
  const scrollToElement = useSmoothScroll();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const elementId = href.replace("#", "");
    scrollToElement(elementId, 80); // 80px offset for navbar height
  };

  return (
    <nav className="navbar">
      <div className="logo">{logo}</div>

      <ul className="nav-links">
        {links.map((link, index) => (
          <li key={index}>
            <RippleEffect>
              <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            </RippleEffect>
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
