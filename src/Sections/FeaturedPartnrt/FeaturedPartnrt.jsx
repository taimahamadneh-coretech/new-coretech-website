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

const FeaturedPartnersCard = ({ images, texts, externalLink, companyName, logo, isActive, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCurrentIndex(0);
      setProgress(0);
    }
  }, [isActive]);

  const nextSlide = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onComplete(); 
    }
  };

  useEffect(() => {
    if (!isActive) return; 

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
  }, [isActive, currentIndex, images.length]);

  const handleCardClick = (e) => {
    if (e.target.closest('.circle-arrow')) return;
    nextSlide(); 
  };

  return (
    <div 
      className={`glass-card ${isActive ? 'active-story' : 'inactive-story'}`} 
      style={{ 
        backgroundImage: `url(${images[currentIndex]})`, 
        cursor: 'pointer',

        transition: 'all 0.5s ease'
      }}
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
                // إذا كان السلايد قادم: 0%، إذا انتهى: 100%، إذا كان الحالي: حسب الـ progress
                width: index === currentIndex && isActive ? `${progress}%` : index < currentIndex ? '100%' : '0%',
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
  // تحديد أي كارت يعمل الآن (0 هو الأول)
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const hyteraImages = [hytera2, hytera1, hytera3, hytera4];
  const jaudaImages = [jauda1, jauda2, jauda3, jauda4];
  const hascelikImages = [hascelik1, hascelik2, hascelik3, hascelik4];

  const cards = [
    { images: hyteraImages, link: "https://hytera.ae/", logo: hyteraLogo, name: t('Featuredpartners.hytera.name'), texts: t('Featuredpartners.hytera.slides', { returnObjects: true }) },
    { images: jaudaImages, link: "https://www.jauda-koks.lv/", logo: jaudaLogo, name: t('Featuredpartners.jaudaKoks.name'), texts: t('Featuredpartners.jaudaKoks.slides', { returnObjects: true }) },
    { images: hascelikImages, link: "https://hascelikfiber.com.tr/", logo: hascelikfiber, name: t('Featuredpartners.jaudaKoks.name'), texts: t('Featuredpartners.jaudaKoks.slides', { returnObjects: true }) }
  ];

  const handleCardComplete = () => {
    // الانتقال للكارت التالي أو العودة للأول
    setActiveCardIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div id="partners" className="main-wrapper section">
      <div className="section-header">
        <h2 className="section-title">{t('Featuredpartners.sectionTitle')}</h2>
        <p className="section-subtitle">{t('Featuredpartners.sectionSubtitle')}</p>
      </div>
      <div className="cards-container">
        {cards.map((card, index) => (
          <FeaturedPartnersCard
            key={index}
            isActive={index === activeCardIndex} // هل الكارت نشط؟
            onComplete={handleCardComplete}      // ماذا يفعل عند النهاية
            images={card.images}
            texts={card.texts}
            externalLink={card.link}
            companyName={card.name}
            logo={card.logo}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPartnersCardLayout;