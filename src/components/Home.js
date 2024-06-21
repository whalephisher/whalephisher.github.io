import React, { useEffect } from 'react';
import './Home.css';

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="home-container">
      <h1 className="bounce">
        <span style={{ '--index': 1 }}>W</span>
        <span style={{ '--index': 2 }}>h</span>
        <span style={{ '--index': 3 }}>a</span>
        <span style={{ '--index': 4 }}>l</span>
        <span style={{ '--index': 5 }}>e</span>
        <span style={{ '--index': 6 }}>p</span>
        <span style={{ '--index': 7 }}>h</span>
        <span style={{ '--index': 8 }}>i</span>
        <span style={{ '--index': 9 }}>s</span>
        <span style={{ '--index': 10 }}>h</span>
        <span style={{ '--index': 11 }}>e</span>
        <span style={{ '--index': 12 }}>r</span>
      </h1>
      <h2 className="gabriel-liau">
        <span style={{ '--index': 1 }}>G</span>
        <span style={{ '--index': 2 }}>a</span>
        <span style={{ '--index': 3 }}>b</span>
        <span style={{ '--index': 4 }}>r</span>
        <span style={{ '--index': 5 }}>i</span>
        <span style={{ '--index': 6 }}>e</span>
        <span style={{ '--index': 7 }}>l</span>
        <span style={{ '--index': 8 }}>&nbsp;</span>
        <span style={{ '--index': 9 }}>L</span>
        <span style={{ '--index': 10 }}>i</span>
        <span style={{ '--index': 11 }}>a</span>
        <span style={{ '--index': 12 }}>u</span>
      </h2>
    </div>
  );
}

export default Home;
