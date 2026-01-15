import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import Home from './pages/Home';
import Careers from './pages/careers/Career';

import './styles/global.css';

const heroVideos = [
  "https://res.cloudinary.com/dslt4vswp/video/upload/v1768467098/hero1_znyrrt.mp4",
  "https://res.cloudinary.com/dslt4vswp/video/upload/v1768467098/hero3_wbo25o.mp4",
  "https://res.cloudinary.com/dslt4vswp/video/upload/v1768467098/hero3_wbo25o.mp4"
];

const images = [
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image01.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image02.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image03.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image04.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image05.jpeg",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image06.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image07.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image08.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image09.jpg",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image10.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image11.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image12.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image13.png",
  "https://xnsi8ilhu94scx3r.public.blob.vercel-storage.com/image14.png",
];
function App() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('loaderShown');
  });

  const videosRef = useRef([]);

  useEffect(() => {
    if (!sessionStorage.getItem('loaderShown')) {
      heroVideos.forEach((src, index) => {
        const video = document.createElement('video');
        video.src = src;
        video.preload = 'auto';
        video.muted = true;
        video.load(); 
        videosRef.current[index] = video;
      });

      images.forEach((src) => {
        const img = new Image();
        img.src = src;
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
         <Route path="/careers" element={<Careers />} />
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
