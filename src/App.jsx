import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

// Color scheme
const COLORS = {
  lightBg: "#F3FAFB",
  darkBg: "#0C1B2A",
  text: "#111827",
  muted: "#6B7280",
  accent: "#2DD4BF",
  highlight: "#60A5FA",
};

function Clock({ color }) {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span
      style={{
        color,
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: 2,
        marginRight: 0,
      }}
    >
      {time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </span>
  );
}

function CurrentDate({ color }) {
  const [date, setDate] = React.useState(new Date());
  React.useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span
      style={{
        color,
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: 1,
        marginRight: 0,
      }}
    >
      {date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  );
}

function AppRoutes({ dark, setPage, setNavOpen }) {
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname === "/") {
      setPage("home");
    } else if (location.pathname.startsWith("/about")) {
      setPage("about");
    } else if (location.pathname.startsWith("/work")) {
      setPage("work");
    } else if (location.pathname.startsWith("/contact")) {
      setPage("contact");
    }
  }, [location, setPage]);
  return null;
}

function App() {
  const [dark, setDark] = React.useState(false);
  const [navOpen, setNavOpen] = React.useState(false);
  const [page, setPage] = React.useState("home");
  React.useEffect(() => {
    document.body.style.background = dark ? COLORS.darkBg : COLORS.lightBg;
    document.body.style.color = dark ? COLORS.lightBg : COLORS.text;
  }, [dark]);
  const navLinks = [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
  ];
  function NavBar() {
    const navigate = useNavigate();
    return (
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 1.25rem",
          background: dark ? "rgba(12,27,42,0.85)" : "rgba(243,250,251,0.85)",
          boxShadow: "0 2px 16px 0 rgba(0,0,0,0.04)",
          backdropFilter: "blur(12px)",
          zIndex: 100,
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {/* Left: Logo (clickable, goes to Home) */}
        <div style={{ display: "flex", alignItems: "center", marginRight: 18 }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setPage("home");
              navigate("/");
              setNavOpen(false);
            }}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src="/images/whalephisher.png"
              alt="Whalephisher Logo"
              style={{
                height: 32,
                width: 32,
                objectFit: "contain",
                borderRadius: 10,
                boxShadow: "0 2px 8px 0 #2DD4BF22",
              }}
            />
          </a>
        </div>
        {/* Nav Links */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            height: 52,
            justifyContent: "center",
          }}
        >
          <div
            className="nav-desktop"
            style={{
              display: "flex",
              gap: 14,
              height: 52,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`/${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(link.id);
                  navigate(`/${link.id}`);
                  setNavOpen(false);
                }}
                style={{
                  color:
                    page === link.id
                      ? COLORS.accent
                      : dark
                      ? COLORS.lightBg
                      : COLORS.text,
                  fontWeight: 700,
                  fontSize: 16,
                  textDecoration: "none",
                  padding: "2px 8px",
                  borderRadius: 7,
                  background: page === link.id ? COLORS.accent + "22" : "none",
                  transition: "color 0.2s, background 0.2s",
                  lineHeight: 1.2,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          {/* Hamburger for mobile */}
          <button
            className="nav-hamburger"
            aria-label="Open navigation menu"
            style={{
              display: "none",
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              marginLeft: 8,
            }}
            onClick={() => setNavOpen((o) => !o)}
          >
            <span style={{ color: dark ? COLORS.lightBg : COLORS.text }}>
              &#9776;
            </span>
          </button>
        </div>
        {/* Right: CURRENT TIME and MODE side by side, perfectly aligned and smaller */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            minWidth: 180,
            marginLeft: "auto",
            justifyContent: "flex-end",
            height: 52,
            gap: 24,
          }}
        >
          {/* Current Time */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 80,
              height: 40,
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
                color: COLORS.muted,
                marginBottom: 0,
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: 1.1,
              }}
            >
              CURRENT TIME
            </span>
            <Clock color={COLORS.highlight} />
          </div>
          {/* MODE toggle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: 48,
              height: 40,
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 1,
                color: COLORS.muted,
                marginBottom: 0,
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: 1.1,
              }}
            >
              MODE
            </span>
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDark((d) => !d)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 20,
                marginTop: 0,
                marginBottom: 0,
                lineHeight: 1,
              }}
            >
              {dark ? (
                <span style={{ color: COLORS.highlight }}>🌙</span>
              ) : (
                <span style={{ color: COLORS.highlight }}>☀️</span>
              )}
            </button>
          </div>
        </div>
      </nav>
    );
    // ...existing code...
  }
  return (
    <Router>
      <AppRoutes dark={dark} setPage={setPage} setNavOpen={setNavOpen} />
      <NavBar />
      <div
        style={{
          minHeight: "100vh",
          background: dark ? COLORS.darkBg : COLORS.lightBg,
          color: dark ? COLORS.lightBg : COLORS.text,
        }}
      >
        {/* Main Content (pages, animated) */}
        <div
          style={{
            paddingTop: 68,
            maxWidth: 820,
            margin: "0 auto",
            minHeight: "75vh",
            position: "relative",
            color: dark ? COLORS.lightBg : COLORS.text,
          }}
        >
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <motion.section
                    key="home"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      minHeight: "70vh",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      paddingTop: 36,
                      color: dark ? COLORS.lightBg : COLORS.text,
                    }}
                  >
                    <img
                      src="/images/profile.png"
                      alt="Gabriel Liau"
                      className="rounded-full"
                      style={{
                        marginBottom: 24,
                        width: 104,
                        height: 104,
                        boxShadow: `0 4px 24px 0 ${COLORS.accent}22`,
                      }}
                    />
                    <h1
                      style={{
                        color: dark ? COLORS.lightBg : COLORS.text,
                        fontSize: "2.5rem",
                        marginBottom: 16,
                      }}
                    >
                      Gabriel Liau
                    </h1>
                    <h2
                      style={{
                        fontWeight: 400,
                        marginBottom: 18,
                        color: COLORS.muted,
                        fontSize: "1.25rem",
                      }}
                    >
                      Creative Developer & Designer
                    </h2>
                    <p
                      style={{
                        maxWidth: 480,
                        margin: "0 auto 1.5rem auto",
                        color: dark ? COLORS.lightBg : COLORS.text,
                        fontSize: "1.05rem",
                      }}
                    >
                      I build bold, minimal, and highly interactive web
                      experiences.
                      <br />
                      <span style={{ color: COLORS.accent, fontWeight: 700 }}>
                        Available for freelance & collaborations.
                      </span>
                    </p>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage("contact");
                        navigate("/contact");
                      }}
                      className="cta"
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        padding: "0.6em 1.5em",
                        borderRadius: 9999,
                        background: COLORS.accent,
                        color: "#fff",
                        textDecoration: "none",
                        boxShadow: `0 2px 12px 0 ${COLORS.accent}22`,
                      }}
                    >
                      Contact Me
                    </a>
                  </motion.section>
                }
              />
              <Route
                path="/about"
                element={
                  <motion.section
                    key="about"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: "center" }}
                  >
                    <h2 style={{ color: COLORS.text }}>About</h2>
                    <p style={{ color: COLORS.text }}>
                      I’m a developer and designer passionate about crafting
                      digital experiences that blend minimalism, accessibility,
                      and visual impact. My work is inspired by the intersection
                      of art, code, and motion—always striving for clarity,
                      boldness, and a touch of play.
                    </p>
                    <p style={{ color: COLORS.text }}>
                      <strong>Skills:</strong> React, JavaScript, CSS, Framer
                      Motion, GSAP, UI/UX, Accessibility, Animation, Branding
                    </p>
                  </motion.section>
                }
              />
              <Route
                path="/work"
                element={
                  <motion.section
                    key="work"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 style={{ color: COLORS.text }}>Selected Work</h2>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "2.5rem",
                        marginTop: 32,
                      }}
                    >
                      {/* Example Project Card */}
                      <div
                        style={{
                          background: "#fff",
                          borderRadius: 24,
                          boxShadow: `0 4px 24px 0 ${COLORS.highlight}11`,
                          padding: 32,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          transition: "transform 0.2s",
                          minHeight: 320,
                        }}
                      >
                        <img
                          src="/images/whalephisher.png"
                          alt="Whalephisher"
                          style={{
                            width: "100%",
                            maxWidth: 240,
                            marginBottom: 24,
                            boxShadow: `0 4px 24px 0 ${COLORS.accent}22`,
                          }}
                        />
                        <h3 style={{ color: COLORS.text }}>Whalephisher</h3>
                        <p style={{ textAlign: "center", color: COLORS.text }}>
                          A playful, interactive web art project exploring
                          generative design and motion.
                        </p>
                        <a
                          href="#"
                          style={{
                            color: COLORS.accent,
                            fontWeight: 700,
                            marginTop: 12,
                          }}
                        >
                          View Project
                        </a>
                      </div>
                      {/* Add more project cards as needed */}
                    </div>
                  </motion.section>
                }
              />
              <Route
                path="/contact"
                element={
                  <motion.section
                    key="contact"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      border: "none",
                      paddingBottom: 64,
                      textAlign: "center",
                    }}
                  >
                    <h2 style={{ color: COLORS.text }}>Contact</h2>
                    <p style={{ color: COLORS.text }}>
                      Let’s create something bold together.
                      <br />
                      <a
                        href="mailto:hello@gabrielliau.com"
                        style={{ color: COLORS.accent, fontWeight: 700 }}
                      >
                        hello@gabrielliau.com
                      </a>
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        color: COLORS.muted,
                        marginTop: 32,
                      }}
                    >
                      &copy; {new Date().getFullYear()} Gabriel Liau
                    </p>
                  </motion.section>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

export default App;
