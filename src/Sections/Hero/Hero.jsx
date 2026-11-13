import React, { useState, useRef, useEffect } from 'react';
import './hero.css';
import { useTranslation } from 'react-i18next';
import { heroVideos } from './heroVideos';

function Hero() {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const videoRefs = useRef([]);
  const sectionRef = useRef(null);

  const isRTL = i18n.dir() === 'rtl';
  const total = heroVideos.length;

  // Users who asked for less motion or data-saving get the poster only
  const staticOnly =
    (typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
    (typeof navigator !== 'undefined' && navigator.connection?.saveData);

  // Pause when the hero is scrolled out of view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pause when the browser tab is hidden
  useEffect(() => {
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Play only the current video, pause the rest
  useEffect(() => {
    if (staticOnly) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current && inView && pageVisible) {
        const p = v.play();
        if (p !== undefined) p.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [current, inView, pageVisible, staticOnly]);

  const handleEnded = () => setCurrent((c) => (c + 1) % total);

  // Download only the current video and the next one
  const preloadFor = (index) =>
    index === current || index === (current + 1) % total ? 'auto' : 'none';

  return (
    <section id="home" className="hero-section" ref={sectionRef} data-nav="dark">
      <div className="video-slider">
        <div
          className="video-track"
          style={{
            transform: isRTL
              ? `translateX(${current * 100}%)`
              : `translateX(-${current * 100}%)`,
          }}
        >
          {heroVideos.map((video, index) => (
            <video
              key={video.src}
              ref={(el) => (videoRefs.current[index] = el)}
              src={staticOnly ? undefined : video.src}
              poster={video.poster}
              muted
              playsInline
              preload={staticOnly ? 'none' : preloadFor(index)}
              onEnded={index === current ? handleEnded : undefined}
              onError={index === current ? handleEnded : undefined}
              className="hero-video"
              aria-hidden="true"
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