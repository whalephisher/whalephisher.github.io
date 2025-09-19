import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Footer from "./components/Footer";
import ParticleSystem from "./components/ParticleSystem";
import { ScrollProgress } from "./components/InteractiveEffects";
import "./styles/global.css";

function App() {
  return (
    <div className="App">
      <ScrollProgress />
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
