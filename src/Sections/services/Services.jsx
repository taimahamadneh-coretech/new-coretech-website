import React, { useState } from 'react';
import './services.css';

import { 
  FaShieldAlt, 
  FaNetworkWired, 
  FaDatabase, 
  FaClipboardCheck, 
  FaKey, 
  FaUserGraduate,
  FaBuilding,
  FaUserShield,
  FaChartBar,
  FaTachometerAlt,
  FaEnvelope,
  FaTrophy,
  FaStar,
  FaRocket
} from 'react-icons/fa';

const services = [
  { name: "Endpoint Security", icon: <FaShieldAlt /> },
  { name: "Network Security", icon: <FaNetworkWired /> },
  { name: "Data Security", icon: <FaDatabase /> },
  { name: "Security Assessment", icon: <FaClipboardCheck /> },
  { name: "Access Control", icon: <FaKey /> },
  { name: "End-user Education", icon: <FaUserGraduate /> },
  { name: "Enterprise Cybersecurity Services", icon: <FaBuilding /> },
  { name: "Specialized Cyber Security Solutions", icon: <FaUserShield /> },
  { name: "Security Monitoring and Reporting", icon: <FaChartBar /> },
  { name: "IT Optimization", icon: <FaTachometerAlt /> },
  { name: "Data and Email Backup", icon: <FaEnvelope /> }
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categorizedServices = {
    'security': services.filter(s => 
      s.name.includes('Security') || s.name.includes('Cybersecurity')
    ),
    'infrastructure': services.filter(s => 
      s.name.includes('Network') || s.name.includes('IT Optimization') || s.name.includes('Access Control')
    ),
    'data': services.filter(s => 
      s.name.includes('Data') || s.name.includes('Backup') || s.name.includes('Email')
    ),
    'other': services.filter(s => 
      !s.name.includes('Security') && 
      !s.name.includes('Network') && 
      !s.name.includes('Data') && 
      !s.name.includes('IT')
    )
  };

  const displayedServices = activeCategory === 'all' 
    ? services 
    : categorizedServices[activeCategory];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <div className="section-header">
          <h1 className="section-title">Our Services</h1>
          <p className="section-subtitle">
            Advanced ICT and software solutions through strategic partnerships
          </p>
        </div>

        <div className="company-profile">
          <div className="company-header">
            <h2 className="company-name">Delta Line International (DLI)</h2>
            <div className="company-badge">Since 2006</div>
          </div>
          <p className="company-description">
            Leading Cyber Security Company over GCC since 2006, providing IT security 
            with high quality service and up-to-date technology.
          </p>
          <div className="company-highlights">
            <div className="highlight">
              <span className="highlight-icon"><FaTrophy /></span>
              <span>Leading in GCC</span>
            </div>
            <div className="highlight">
              <span className="highlight-icon"><FaStar /></span>
              <span>High Quality Service</span>
            </div>
            <div className="highlight">
              <span className="highlight-icon"><FaRocket /></span>
              <span>Up-to-date Technology</span>
            </div>
          </div>
        </div>

        <div className="services-filter">
          <button 
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Services
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'security' ? 'active' : ''}`}
            onClick={() => setActiveCategory('security')}
          >
            Security
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'infrastructure' ? 'active' : ''}`}
            onClick={() => setActiveCategory('infrastructure')}
          >
            Infrastructure
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'data' ? 'active' : ''}`}
            onClick={() => setActiveCategory('data')}
          >
            Data Management
          </button>
        </div>

        <div className="services-list">
          <h3 className="services-list-title">Services Offered</h3>
          <div className="services-grid">
            {displayedServices.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">{service.icon}</div>
                <h4 className="service-name">{service.name}</h4>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-section">
          <h3 className="cta-title">Ready to Secure Your Digital Assets?</h3>
          <p className="cta-text">
            Contact us today to learn how DLI's comprehensive cybersecurity solutions 
            can protect your organization from evolving threats.
          </p>
          <button className="cta-button">
            <a 
            href="https://deltaline-it.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cta-button">  Get in Touch </a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;