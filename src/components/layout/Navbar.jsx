import React, { useState, useEffect } from "react";
import whaleImage from "../../assets/whale.png";
import { navigationData } from "../../data/portfolioData";
import { useSmoothScroll } from "../../hooks/useAnimations";
import { RippleEffect } from "../effects/InteractiveEffects";
import "./Navbar.css";

const Navbar = () => {
  const { logo, links, socialLinks } = navigationData;
  const scrollToElement = useSmoothScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth <= 768;
      setIsMobile(newIsMobile);
      
      // Reset showStickyNav when switching to desktop
      if (!newIsMobile) {
        setShowStickyNav(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // On mobile, hide sticky nav when about section is in view
      if (isMobile) {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          const aboutTop = aboutSection.offsetTop;
          const scrollPosition = window.scrollY + window.innerHeight * 0.1; // When about is 10% visible
          setShowStickyNav(scrollPosition < aboutTop);
        }
      }

      // Update scroll progress
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.pageYOffset;
      const progress = (scrollTop / scrollHeight) * 100;
      const progressBar = document.querySelector(".scroll-progress");
      if (progressBar) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
      }

      // Update active section based on scroll position
      const sections = ["work", "about"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const elementId = href.replace("#", "");
    scrollToElement(elementId, 80);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Logo - Fixed Left Position */}
      <div className={`floating-logo ${isScrolled ? "scrolled" : ""} ${
        isMobile && !showStickyNav ? "hidden" : ""
      }`}>
        <div className="logo-container">
          <img src={whaleImage} alt="Whale" className="logo-whale" />
          <span className="logo-text">{logo}</span>
        </div>
      </div>

      {/* Navigation - Fixed Right Position */}
      <nav
        className={`modern-navbar ${isScrolled ? "scrolled" : ""} ${
          isMobile && !showStickyNav ? "hidden" : ""
        }`}
      >
        <div className="nav-container">
          {/* Navigation Pills */}
          <div className="nav-pills">
            {links.map((link, index) => (
              <RippleEffect key={index} className="nav-pill-wrapper">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`nav-pill ${
                    activeSection === link.href.replace("#", "") ? "active" : ""
                  }`}
                >
                  <span className="nav-pill-text">{link.label}</span>
                  <div className="nav-pill-indicator"></div>
                </a>
              </RippleEffect>
            ))}
          </div>

          {/* Social Dock */}
          <div className="social-dock">
            <button
              className={`dock-toggle ${isMenuOpen ? "open" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle social menu"
            >
              <div className="dock-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>

            <div className={`social-menu ${isMenuOpen ? "open" : ""}`}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="social-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "--delay": `${index * 0.1}s` }}
                >
                  <img src={social.icon} alt={social.alt} />
                  <span className="social-tooltip">{social.alt}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll Progress Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-progress"></div>
      </div>
    </>
  );
};

export default Navbar;
