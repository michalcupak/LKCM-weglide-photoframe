import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [shuffledImages, setShuffledImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const shuffledUrls = [...imageUrls].sort(() => Math.random() - 0.5);
  //   setShuffledImageUrls(shuffledUrls);
  // }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/image_urls.json?t=${Date.now()}`);
        const images = await response.json();
        const shuffled_images = [...images].sort(() => Math.random() - 0.5);
        setShuffledImages(shuffled_images);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledImages.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [shuffledImages.length]);

  return (
      <div className="fullscreen-background">
        {shuffledImages.map((image, index) => (
            <div key={index} className={`slide-container ${index === currentIndex ? 'active' : ''}`}>
              <div
                  className="slide"
                  style={{
                    backgroundImage: `url(${image.url})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: 'calc(100vh - 20px)',
                  }}
              />
              <div className="slide-description">
                {image.pilot}, {image.datum}
              </div>
            </div>
        ))}
      </div>
  );
}

export default App;