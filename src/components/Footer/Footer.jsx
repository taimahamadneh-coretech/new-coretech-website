import React from 'react';
import logo from '../../assets/logo/logo_white.png';
import { useNavigate, useLocation } from 'react-router-dom';
import './footer.css';
import { useTranslation } from 'react-i18next';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaGlobe,
  FaPhoneAlt,
  FaArrowUp,
} from 'react-icons/fa';

// Previous footer is kept in Footer.old.jsx.txt and footer.old.css (not used).

const socialMediaLinks = [
  { name: 'Facebook', icon: FaFacebookF, url: 'https://www.facebook.com/share/1RKsAy2nF3/' },
  { name: 'LinkedIn', icon: FaLinkedinIn, url: 'https://www.linkedin.com/company/coretech-pal/' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/coretechtel/' },
];

const quickLinks = [
  { label: 'footer.quickLinks.home', hash: 'home' },
  { label: 'footer.quickLinks.about', hash: 'about' },
  { label: 'footer.quickLinks.clients', hash: 'clients' },
  { label: 'footer.quickLinks.contact', hash: 'contact' },
  { label: 'footer.quickLinks.career', path: '/careers' },
];

const fieldLinks = [
  { label: 'nav.software', hash: 'software' },
  { label: 'nav.cyber', hash: 'cybersecurity' },
  { label: 'nav.telecom', hash: 'telecom' },
];

function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to a home-page section (goes to the home page first if needed)
  const goToSection = (e, hash) => {
    e.preventDefault();
    const scroll = () => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scroll, 100);
    } else {
      scroll();
    }
  };

  const goToPage = (e, path) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0 });
  };

  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const renderLink = (link) =>
    link.path ? (
      <a href={link.path} onClick={(e) => goToPage(e, link.path)}>{t(link.label)}</a>
    ) : (
      <a href={`/#${link.hash}`} onClick={(e) => goToSection(e, link.hash)}>{t(link.label)}</a>
    );

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-column footer-brand">
          <img className="footer-logo" src={logo} alt="Coretech" />
          <p className="footer-description">{t('footer.description')}</p>
          <div className="footer-social">
            {socialMediaLinks.map(({ name, icon: Icon, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <nav className="footer-column" aria-label={t('footer.quickLinks.title')}>
          <h3 className="footer-title">{t('footer.quickLinks.title')}</h3>
          <ul className="footer-links">
            {quickLinks.map((link) => <li key={link.label}>{renderLink(link)}</li>)}
          </ul>
        </nav>

        {/* Our fields */}
        <nav className="footer-column" aria-label={t('footer.fieldsTitle')}>
          <h3 className="footer-title">{t('footer.fieldsTitle')}</h3>
          <ul className="footer-links">
            {fieldLinks.map((link) => <li key={link.label}>{renderLink(link)}</li>)}
          </ul>
        </nav>

        {/* Contact */}
        <div className="footer-column">
          <h3 className="footer-title">{t('footer.contact.title')}</h3>
          <ul className="footer-contact">
            <li>
              <FaMapMarkerAlt aria-hidden="true" />
              <a href="/#contact" onClick={(e) => goToSection(e, 'contact')}>{t('footer.contact.address')}</a>
            </li>
            <li>
              <FaEnvelope aria-hidden="true" />
              <a href={`mailto:${t('footer.contact.email')}`}>{t('footer.contact.email')}</a>
            </li>
            <li>
              <FaGlobe aria-hidden="true" />
              <a href="https://www.coretechpal.com" target="_blank" rel="noopener noreferrer">{t('footer.contact.website')}</a>
            </li>
            <li>
              <FaPhoneAlt aria-hidden="true" />
              <a href="tel:+97092368180" dir="ltr">{t('footer.contact.phone')}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p className="footer-copy">© {new Date().getFullYear()} {t('footer.copyright')}</p>
        <button type="button" className="footer-top" onClick={backToTop}>
          {t('footer.backToTop')} <FaArrowUp aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
