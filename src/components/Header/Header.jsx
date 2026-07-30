import React, { useState, useEffect } from 'react';
import './header.css';
import logo from '../../assets/logo/logo_white.png';
import { useTranslation } from 'react-i18next';
import enFlag from '../../assets/icons/language/en.png';
import arFlag from '../../assets/icons/language/ar.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
 
const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
 
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  const handleNavAnchorClick = (e, hash) => {
    e.preventDefault();
 
    if (location.pathname !== '/') {
      navigate('/');
 
      setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
 
    setIsMenuOpen(false);
  };
 
  const menuItems = [
    { label: t('nav.home'), to: '/', type: 'route' },
    { label: t('nav.about'), hash: 'about', type: 'anchor' },
    { label: t('nav.partners'), hash: 'partners', type: 'anchor' },
    { label: t('nav.products'), hash: 'products', type: 'anchor' },
    { label: t('nav.projects'), hash: 'projects', type: 'anchor' },
    { label: t('nav.services'), hash: 'services', type: 'anchor' },
    { label: t('nav.clients'), hash: 'clients', type: 'anchor' },
    { label: t('nav.contact'), hash: 'contact', type: 'anchor' },
    { label: t('nav.career'), to: '/careers', type: 'route' },
  ];
 
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (isMobile) setIsMenuOpen(false);
  };
 
  const getOppositeLanguage = () => (i18n.language === 'en' ? 'ar' : 'en');
  const getOppositeLanguageName = () => (i18n.language === 'en' ? 'العربية' : 'English');
 
  const scrollToHome = () => {
    const hero = document.getElementById('home');
    hero?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
 
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
 
        <div className="header-actions">
          <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            {menuItems.map((item, index) => {
              if (item.type === 'route') {
                if (item.to === '/' && isHome) {
                  return (
                    <button key={index} className="nav-link" onClick={scrollToHome}>
                      {item.label}
                    </button>
                  );
                }
                return (
                  <Link
                    key={index}
                    to={item.to}
                    className="nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }
 
              return (
                <a
                  key={index}
                  href={`/#${item.hash}`}
                  className="nav-link"
                  onClick={(e) => handleNavAnchorClick(e, item.hash)}
                >
                  {item.label}
                </a>
              );
            })}
 
            {isMobile && (
              <div className="mobile-language-item">
                <button
                  className="mobile-language-btn"
                  onClick={() => changeLanguage(getOppositeLanguage())}
                >
                  {getOppositeLanguageName()}
                </button>
              </div>
            )}
          </nav>
 
          {!isMobile && (
            <div className="language-switcher">
              <button
                className="lang-btn"
                onClick={() => changeLanguage(getOppositeLanguage())}
              >
                <img
                  src={i18n.language === 'en' ? arFlag : enFlag}
                  alt="Language Flag"
                />
              </button>
            </div>
          )}
 
          {isMobile && (
            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={`bar ${isMenuOpen ? 'open' : ''}`} />
              <span className={`bar ${isMenuOpen ? 'open' : ''}`} />
              <span className={`bar ${isMenuOpen ? 'open' : ''}`} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
 
export default React.memo(Header);