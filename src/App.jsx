import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Footer from "./components/Footer";
import "./styles/global.css";

function App() {
  return (
    <div className="App">
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
