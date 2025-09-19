import React from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import About from "./components/sections/About";
import Portfolio from "./components/sections/Portfolio";
import Footer from "./components/layout/Footer";
import ParticleSystem from "./components/effects/ParticleSystem";
import "./styles/global.css";

// Main App component
function App() {
  return (
    <div className="App">
      <ParticleSystem particleCount={25} />
      <Navbar />
      <Hero />
      <main>
        <About />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}

export default App;
