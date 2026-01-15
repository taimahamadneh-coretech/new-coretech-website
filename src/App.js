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
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475834/image01_g81lxq.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475834/image02_crz9yp.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image03_qemn8j.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475833/image04_j0oisg.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image05_w9zxjz.jpg",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image06_cjhjal.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image07_a33rwa.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image08_xzrdhm.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475832/image09_sy1fbs.jpg",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475833/image10_fovzva.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475833/image11_w393wk.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475833/image12_t5xwcq.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475834/image13_fzfvkj.png",
  "https://res.cloudinary.com/dslt4vswp/image/upload/v1768475834/image14_vdpqb3.png",
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
