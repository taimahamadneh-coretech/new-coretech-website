import React, { useState, useRef, useEffect } from 'react';
import './hero.css';
import { useTranslation } from 'react-i18next';

const videos = [
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/hero1.mp4",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/hero2.mp4",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/hero3.mp4"
];

function Hero() {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef([]);

  const isRTL = i18n.dir() === 'rtl';

  const handleEnded = () => {
    const next = (current + 1) % videos.length;
    setCurrent(next);

    setTimeout(() => {
      const nextVideo = videoRefs.current[next];
      if (nextVideo) {
        const playPromise = nextVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }, 700);
  };

  useEffect(() => {
    const currentVideo = videoRefs.current[current];
    if (currentVideo) {
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [current]);

  return (
    <section id="home" className="hero-section">
      <div className="video-slider">
        <div
          className="video-track"
          style={{
            transform: isRTL
              ? `translateX(${current * 100}%)`
              : `translateX(-${current * 100}%)`
          }}
        >
          {videos.map((video, index) => (
            <video
              key={index}
              ref={(el) => (videoRefs.current[index] = el)}
              src={video}
              muted
              playsInline
              preload="auto"
              autoPlay={index === 0}
              onEnded={index === current ? handleEnded : null}
              className="hero-video"
            />
          ))}
        </div>
      </div>

      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="content-wrapper">
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>

          <div className="hero-buttons">
            <a href="#products" className="btn btn-primary">
              {t('hero.buttons.products')}
            </a>
            <a href="#contact" className="btn btn-secondary">
              {t('hero.buttons.contact')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
