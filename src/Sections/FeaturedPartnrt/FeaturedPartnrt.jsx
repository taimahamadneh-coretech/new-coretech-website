import React, { useState, useEffect } from 'react';
import './featuredPartnrt.css';
import { useTranslation } from 'react-i18next';

import hytera1 from '../../assets/images/FeaturedPartners/Hytera1.png';
import hytera2 from '../../assets/images/FeaturedPartners/Hytera2.png';
import hytera3 from '../../assets/images/FeaturedPartners/Hytera3.jpg';
import hytera4 from '../../assets/images/FeaturedPartners/Hytera4.jpg';

import jauda1 from '../../assets/images/FeaturedPartners/jaudaImage1.png';
import jauda2 from '../../assets/images/FeaturedPartners/jaudaImage2.png';
import jauda3 from '../../assets/images/FeaturedPartners/jaudaImage3.png';
import jauda4 from '../../assets/images/FeaturedPartners/jaudaImage4.png';

import hascelik1 from '../../assets/images/FeaturedPartners/hascelikfiber1.jpg';
import hascelik2 from '../../assets/images/FeaturedPartners/hascelikfiber2.jpg';
import hascelik3 from '../../assets/images/FeaturedPartners/hascelikfiber3.jpg';
import hascelik4 from '../../assets/images/FeaturedPartners/hascelikfiber4.jpg';

import hyteraLogo from '../../assets/images/FeaturedPartners/hytera-logo.png';
import jaudaLogo from '../../assets/images/FeaturedPartners/jauda-logo.png';
import hascelikfiber from '../../assets/images/FeaturedPartners/hascelikfiber-logo.png';

const FeaturedPartnersCard = ({ images, texts, externalLink, companyName, logo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setProgress(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const handleCardClick = (e) => {
    if (e.target.closest('.circle-arrow')) return;
    nextSlide();
  };

  return (
    <div 
      className="glass-card" 
      style={{ backgroundImage: `url(${images[currentIndex]})`, cursor: 'pointer' }}
      onClick={handleCardClick} 
    >
      <div className="orange-overlay"></div>
      <div className="top-nav">
        <div className="nav-left">
           <img src={logo} alt={companyName} className="partner-logo-img" />
        </div>
        <div className="nav-right">
          <a href={externalLink} target="_blank" rel="noopener noreferrer" className="circle-arrow" onClick={(e) => e.stopPropagation()}>
            ↗
          </a>
        </div>
      </div>
      <div className="middle-content">
        <h2 key={currentIndex} className="slide-up-text">
          <strong>{texts[currentIndex]}</strong>
        </h2>
      </div>
      <div className="progress-group">
        {images.map((_, index) => (
          <div key={index} className="bar-track">
            <div 
              className="bar-fill"
              style={{ 
                width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                transition: index === currentIndex ? 'none' : 'width 0.3s ease'
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeaturedPartnersCardLayout = () => {
  const { t } = useTranslation();

  const hyteraImages = [hytera2, hytera1, hytera3, hytera4];
  const jaudaImages = [jauda1, jauda2, jauda3, jauda4];
  const hascelikImages = [hascelik1, hascelik2, hascelik3, hascelik4];


  return (
    <div className="main-wrapper section">
      <div className="section-header">
        <h2 className="section-title">{t('Featuredpartners.sectionTitle')}</h2>
        <p className="section-subtitle">{t('Featuredpartners.sectionSubtitle')}</p>
      </div>
      <div className="cards-container">
        <FeaturedPartnersCard 
          images={hyteraImages}
          texts={t('Featuredpartners.hytera.slides', { returnObjects: true })}
          externalLink="https://hytera.ae/"
          companyName={t('Featuredpartners.hytera.name')}
          logo={hyteraLogo}
        />
        <FeaturedPartnersCard 
          images={jaudaImages}
          texts={t('Featuredpartners.jaudaKoks.slides', { returnObjects: true })}
          externalLink="https://www.jauda-koks.lv/"
          companyName={t('Featuredpartners.jaudaKoks.name')}
          logo={jaudaLogo}
        />
         <FeaturedPartnersCard 
          images={hascelikImages}
          texts={t('Featuredpartners.jaudaKoks.slides', { returnObjects: true })}
          externalLink="https://hascelikfiber.com.tr/"
          companyName={t('Featuredpartners.jaudaKoks.name')}
          logo={hascelikfiber}
        />
      </div>
    </div>
  );
};

export default FeaturedPartnersCardLayout;