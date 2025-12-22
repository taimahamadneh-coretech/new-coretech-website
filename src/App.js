import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import Home from './pages/Home';

import './styles/global.css';

const heroVideos = [
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/hero1.mp4",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/hero2.mp4",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/hero3.mp4"
];

function App() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('loaderShown');
  });

  const videosRef = useRef([]);

  useEffect(() => {
    if (!sessionStorage.getItem('loaderShown')) {
      setLoading(true);

      heroVideos.forEach((src, index) => {
        const video = document.createElement('video');
        video.src = src;
        video.preload = 'auto';
        video.muted = true; 
        videosRef.current[index] = video;
      });
    }
  }, []);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Loader
        onFinish={() => {
          sessionStorage.setItem('loaderShown', 'true');
          setLoading(false);
        }}
      />
    );
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />

      {showScrollTop && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </Router>
  );
}

export default App;
