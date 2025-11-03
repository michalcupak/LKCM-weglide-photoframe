import React, {useState, useEffect, useMemo} from 'react';
import './App.css';


/**
 * App loads image_urls.json from its PUBLIC_URL and renders the photo presentation.
 * Extras:
 * - URL params:
 *   - scale / zoom: font scaling (default 1.0). e.g. ?scale=1.25 or ?zoom=120
 */
function App() {

    const params = useMemo(() => new URLSearchParams(window.location.search), []);
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    // const scaleParam = params.get('scale') ?? (params.get('zoom') ? Number(params.get('zoom')) / 100 : null);
    const scaleParam = params.get('scale') ?? params.get('zoom');
    const scale = useMemo(() => {
        const s = Number(scaleParam);
        return clamp(Number.isFinite(s) && s > 0 ? s : 1, 0.5, 5);
    }, [scaleParam]);

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
                    height: `calc(100vh - ${20 * scale}px)`,
                  }}
              />
              <div className="slide-description" style={{ fontSize: `${16 * scale}px` }}>
                {image.pilot}, {image.datum}
              </div>
            </div>
        ))}
      </div>
  );
}

export default App;