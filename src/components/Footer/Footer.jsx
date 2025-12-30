import React from 'react';
import logo from '../../assets/logo/logo_white.png';
import './footer.css';
import { useTranslation } from 'react-i18next';
 
import {
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaGlobe,
  FaPhoneAlt,
} from 'react-icons/fa';
 
function Footer() {
  const { t } = useTranslation();
 
  const socialMediaLinks = [
    {
      name: 'Facebook',
      icon: FaFacebookF,
      url: 'https://www.facebook.com/p/Coretech-61557547092075/',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      url: 'https://www.linkedin.com/company/coretechpal/',
    },
    // {
    //   name: 'Instagram',
    //   icon: FaInstagram,
    //   url: 'https://instagram.com/coretechpal',
    // },
  ];
 
  const quickLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'products', href: '#products' },
    { key: 'services', href: '#services' },
    { key: 'clients', href: '#clients' },
    { key: 'contact', href: '#contact' },
    { key: 'career', href: '/careers' },
   
  ];
 
  return (
    <footer className="footer section">
      <div className="footer-container">
 
        <div className="footer-column footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="Coretech Logo" />
          </div>
 
          <p className="footer-description">
            {t('footer.description')}
          </p>
 
          <div className="social-icons">
            {socialMediaLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={social.name}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
 
        <div className="footer-column">
          <h3 className="footer-title">{t('footer.quickLinks.title')}</h3>
          <ul className="footer-links">
            {quickLinks.map((link) => (
              <li key={link.key}>
                <a href={link.href}>
                  {t(`footer.quickLinks.${link.key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
 
        <div className="footer-column">
          <h3 className="footer-title">{t('footer.services.title')}</h3>
          <ul className="footer-links">
            <li><a href="#products">{t('footer.services.telecom')}</a></li>
            <li><a href="#services">{t('footer.services.cyber')}</a></li>
            <li><a href="#services">{t('footer.services.software')}</a></li>
            <li><a href="#services">{t('footer.services.cloud')}</a></li>
            <li><a href="#services">{t('footer.services.consulting')}</a></li>
          </ul>
 
        </div>
 
        <div className="footer-column">
          <h3 className="footer-title">{t('footer.contact.title')}</h3>
 
          <div className="contact-details">
            <div className="contact-item">
              <FaMapMarkerAlt />
              <p>{t('footer.contact.address')}</p>
            </div>
 
            <div className="contact-item">
              <FaEnvelope />
              <p>{t('footer.contact.email')}</p>
            </div>
 
            <div className="contact-item">
              <FaGlobe />
              <p>{t('footer.contact.website')}</p>
            </div>
 
            <div className="contact-item">
              <FaPhoneAlt />
              <p>{t('footer.contact.phone')}</p>
            </div>
          </div>
        </div>
 
      </div>
 
      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
 
export default React.memo(Footer);
 