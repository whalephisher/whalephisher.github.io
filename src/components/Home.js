import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [bannerText, setBannerText] = useState('Top Secret//SCI');

  useEffect(() => {
    document.title = "Home";

    const texts = ['Top Secret//SCI', '54 6F 70 20 53 65 63 72 65 74 2F 2F 53 43 49', 'GO BIG OR GO HOME', '47 4F 20 42 49 47 20 4F 52 20 47 4F 20 48 4F 4D 45'];
    let index = 0;

    const intervalId = setInterval(() => {
      index = (index + 1) % texts.length;
      setBannerText(texts[index]);
    }, 10000); // Change text every 10 seconds

    return () => clearInterval(intervalId);

  }, []);

  return (
    <div className="home-container">
      <div className="top-secret-banner">{bannerText}</div>
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
