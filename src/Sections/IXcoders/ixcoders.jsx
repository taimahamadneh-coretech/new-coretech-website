import React, { useState } from 'react';
import './ixcoders.css';
import {
  FaGlobe,
  FaMobileAlt,
  FaDatabase,
  FaServer,
  FaShieldAlt,
  FaPalette,
} from 'react-icons/fa';

const IxcodersServices = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const services = [
    {
      title: "Website Applications",
      description: "PHP Frameworks & CMSs, .Net, NodeJs, Bootstrap, React & Angular",
      icon: <FaGlobe />,
      category: "web"
    },
    {
      title: "Mobile Applications",
      description: "Android Java & Kotlin, IOS Swift, Apache Cordova, Ionic & Flutter",
      icon: <FaMobileAlt />,
      category: "mobile"
    },
    {
      title: "Databases",
      description: "MySQL, Microsoft SQL Server, Oracle & NoSQL MongoDB",
      icon: <FaDatabase />,
      category: "data"
    },
    {
      title: "Servers Management",
      description: "Operating Systems (Windows - Linux), Emails Management, SSL, Backups, Domains",
      icon: <FaServer />,
      category: "infrastructure"
    },
    {
      title: "Systems Security",
      description: "Access Control, Firewalls, Application Security, Data Loss Prevention (DLP) & etc...",
      icon: <FaShieldAlt />,
      category: "security"
    },
    {
      title: "UI/UX Design",
      description: "Adobe XD, Photoshop, Illustrator, After Effects and More.",
      icon: <FaPalette />,
      category: "design"
    }
  ];

  const categorizedServices = {
    'web': services.filter(s => s.category === 'web'),
    'mobile': services.filter(s => s.category === 'mobile'),
    'data': services.filter(s => s.category === 'data'),
    'infrastructure': services.filter(s => s.category === 'infrastructure'),
    'security': services.filter(s => s.category === 'security'),
    'design': services.filter(s => s.category === 'design')
  };

  const displayedServices = activeCategory === 'all' 
    ? services 
    : categorizedServices[activeCategory];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <div className="section-header">
        
        </div>

        <div className="company-profile">
          <div className="company-header">
            <h2 className="company-name">IXCoders Development Studio</h2>
            <div className="company-badge">Expert Developers</div>
          </div>
          <p className="company-description">
            We specialize in creating innovative software solutions that combine cutting-edge 
            technology with exceptional user experience. Our team delivers high-quality, 
            secure, and scalable applications tailored to your business needs.
          </p>
        </div>

        <div className="services-filter">
          <button 
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Services
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'web' ? 'active' : ''}`}
            onClick={() => setActiveCategory('web')}
          >
            Web Development
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'mobile' ? 'active' : ''}`}
            onClick={() => setActiveCategory('mobile')}
          >
            Mobile Apps
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'infrastructure' ? 'active' : ''}`}
            onClick={() => setActiveCategory('infrastructure')}
          >
            Infrastructure
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'security' ? 'active' : ''}`}
            onClick={() => setActiveCategory('security')}
          >
            Security
          </button>
        </div>

        <div className="services-list">
          <h3 className="services-list-title">Services Offered</h3>
          <div className="services-grid">
            {displayedServices.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">{service.icon}</div>
                <h4 className="service-name">{service.title}</h4>
                <div className="service-divider"></div>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IxcodersServices;