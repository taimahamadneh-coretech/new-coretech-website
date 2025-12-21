import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';

import Home from './pages/Home';

import './styles/global.css';

function App() {

  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('loaderShown');
  });
useEffect(() => {
  if (!sessionStorage.getItem('loaderShown')) {
    setLoading(true);
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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

