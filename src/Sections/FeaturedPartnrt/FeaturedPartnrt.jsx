import React, { useState, useEffect, useCallback } from 'react';
import './featuredPartnrt.css';
import { useTranslation } from 'react-i18next';

import hytera1 from '../../assets/images/FeaturedPartners/hytera/Hytera1.png';
import hytera2 from '../../assets/images/FeaturedPartners/hytera/Hytera2.png';
import hytera3 from '../../assets/images/FeaturedPartners/hytera/Hytera3.png';
import hytera4 from '../../assets/images/FeaturedPartners/hytera/Hytera4.png';
import jauda1 from '../../assets/images/FeaturedPartners/jauda/jaudaImage1.png';
import jauda2 from '../../assets/images/FeaturedPartners/jauda/jaudaImage2.png';
import jauda3 from '../../assets/images/FeaturedPartners/jauda/jaudaImage3.png';
import jauda4 from '../../assets/images/FeaturedPartners/jauda/jaudaImage4.png';
import hascelik1 from '../../assets/images/FeaturedPartners/hascelikfiber/hascelikfiber1.png';
import hascelik2 from '../../assets/images/FeaturedPartners/hascelikfiber/hascelikfiber2.png';
import hascelik3 from '../../assets/images/FeaturedPartners/hascelikfiber/hascelikfiber3.png';
import hascelik4 from '../../assets/images/FeaturedPartners/hascelikfiber/hascelikfiber4.png';
import quaildigital1 from '../../assets/images/FeaturedPartners/quaildigital/quaildigital1.png';
import quaildigital2 from '../../assets/images/FeaturedPartners/quaildigital/quaildigital2.jpg';
import quaildigital3 from '../../assets/images/FeaturedPartners/quaildigital/quaildigital3.png';
import quaildigital4 from '../../assets/images/FeaturedPartners/quaildigital/quaildigital4.jpg';
import ixcoders1 from '../../assets/images/FeaturedPartners/ixcodersPartner/ixcoders1.jpg';
import ixcoders2 from '../../assets/images/FeaturedPartners/ixcodersPartner/ixcoders2.png';
import ixcoders3 from '../../assets/images/FeaturedPartners/ixcodersPartner/ixcoders3.png';
import ixcoders4 from '../../assets/images/FeaturedPartners/ixcodersPartner/ixcoders4.png';
import hyteraLogo from '../../assets/images/FeaturedPartners/hytera/hytera-logo.png';
import jaudaLogo from '../../assets/images/FeaturedPartners/jauda/jauda-logo.png';
import hascelikfiber from '../../assets/images/FeaturedPartners/hascelikfiber/hascelikfiber-logo.png';
import ixcoders from '../../assets/images/FeaturedPartners/ixcodersPartner/ixcoders.png'; 
import quaildigital from '../../assets/images/FeaturedPartners/quaildigital/quaildigital.png';

import cyberwiseLogo from '../../assets/images/FeaturedPartners/cyberwise/cyberwiseLogo.png';
import cyber1 from '../../assets/images/FeaturedPartners/cyberwise/cyber1.webp';
import cyber2 from '../../assets/images/FeaturedPartners/cyberwise/cyber2.jpg';
import cyber3 from '../../assets/images/FeaturedPartners/cyberwise/cyber3.jpg';
import cyber4 from '../../assets/images/FeaturedPartners/cyberwise/cyber4.jpg';

const FeaturedPartnersCard = ({ images, texts, externalLink, companyName, logo, startDelay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setProgress(0);
  }, [images.length]);

  useEffect(() => {
    if (!isStarted) return; 

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
  }, [isStarted, nextSlide]);

  const handleCardClick = (e) => {
    if (e.target.closest('.circle-arrow')) return;
    nextSlide();
  };

  return (
    <div
      className="glass-card active-story"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        cursor: 'pointer',
        transition: 'background-image 0.5s ease'
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

  const cyberWise = [cyber1, cyber2, cyber3, cyber4];
  const hyteraImages = [hytera1, hytera2, hytera3, hytera4];
  const jaudaImages = [jauda1, jauda2, jauda3, jauda4];
  const hascelikImages = [hascelik1, hascelik2, hascelik3, hascelik4];
  const partner4Images = [quaildigital1, quaildigital2, quaildigital3, quaildigital4];
  const partner5Images = [ixcoders1, ixcoders2, ixcoders3, ixcoders4];

  const cards = [
    { images: cyberWise, link: "https://cyberwise.ae/", logo: cyberwiseLogo, name: t('Featuredpartners.cyberwise.name'), texts: t('Featuredpartners.cyberwise.slides', { returnObjects: true }) },
    { images: hyteraImages, link: "https://hytera.ae/", logo: hyteraLogo, name: t('Featuredpartners.hytera.name'), texts: t('Featuredpartners.hytera.slides', { returnObjects: true }) },
    { images: jaudaImages, link: "https://www.jauda-koks.lv/", logo: jaudaLogo, name: t('Featuredpartners.jaudaKoks.name'), texts: t('Featuredpartners.jaudaKoks.slides', { returnObjects: true }) },
    { images: hascelikImages, link: "https://hascelikfiber.com.tr/", logo: hascelikfiber, name: t('Featuredpartners.hascelikTexts.name'), texts: t('Featuredpartners.hascelikTexts.slides', { returnObjects: true }) },
    { images: partner4Images, link: "https://www.quaildigital.com/", logo: quaildigital, name: t('Featuredpartners.quaildigital.name'), texts: t('Featuredpartners.quaildigital.slides', { returnObjects: true })},
    { images: partner5Images, link: "https://ixcoders.com/", logo: ixcoders, name: t('Featuredpartners.ixcoders.name'), texts: t('Featuredpartners.ixcoders.slides', { returnObjects: true })  }
  ];

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
            images={card.images}
            texts={card.texts}
            externalLink={card.link}
            companyName={card.name}
            logo={card.logo}

            startDelay={index * 2000} 
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPartnersCardLayout;