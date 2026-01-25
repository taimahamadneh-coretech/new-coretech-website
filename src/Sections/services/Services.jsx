import React, { useState } from "react";
import "./services.css";
import delta from "../../assets/images/Services/delta.png";
import ixcoders from "../../assets/images/Services/ixcoders.png";

import {
  FaShieldAlt,
  FaNetworkWired,
  FaDatabase,
  FaClipboardCheck,
  FaKey,
  FaBuilding,
  FaUserShield,
  FaChartBar,
  FaTachometerAlt,
  FaEnvelope,
  FaTrophy,
  FaStar,
  FaRocket,
  FaCode,
  FaMobileAlt,
  FaLock,
  FaShapes,
  FaCloud,
  FaArrowRight,
} from "react-icons/fa";

const companyLogos = {
  dli: delta,
  ixcoders: ixcoders,
};

const services = [
  { name: "Endpoint Security", icon: <FaShieldAlt /> },
  { name: "Network Security", icon: <FaNetworkWired /> },
  { name: "Data Security", icon: <FaDatabase /> },
  { name: "Security Assessment", icon: <FaClipboardCheck /> },
  { name: "Access Control", icon: <FaKey /> },
  { name: "Enterprise Cybersecurity Services", icon: <FaBuilding /> },
  { name: "Specialized Cyber Security Solutions", icon: <FaUserShield /> },
  { name: "Security Monitoring and Reporting", icon: <FaChartBar /> },
  { name: "IT Optimization", icon: <FaTachometerAlt /> },
  { name: "Data and Email Backup", icon: <FaEnvelope /> },
];

const devServices = [
  { name: "Website Applications", icon: <FaCode /> },
  { name: "Mobile Applications", icon: <FaMobileAlt /> },
  { name: "Database", icon: <FaCloud /> },
  { name: "Servers Management", icon: <FaDatabase /> },
  { name: "Systems Security", icon: <FaLock /> },
  { name: "UI/UX Design", icon: <FaShapes /> },
  { name: "Maintenance & Support", icon: <FaTachometerAlt /> },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDevCategory, setActiveDevCategory] = useState("all");

  const categorizedServices = {
    security: services.filter(
      (s) => s.name.includes("Security") || s.name.includes("Cybersecurity"),
    ),
    infrastructure: services.filter(
      (s) =>
        s.name.includes("Network") ||
        s.name.includes("IT Optimization") ||
        s.name.includes("Access Control"),
    ),
    data: services.filter(
      (s) =>
        s.name.includes("Data") ||
        s.name.includes("Backup") ||
        s.name.includes("Email"),
    ),
    other: services.filter(
      (s) =>
        !s.name.includes("Security") &&
        !s.name.includes("Network") &&
        !s.name.includes("Data") &&
        !s.name.includes("IT"),
    ),
  };

  const categorizedDevServices = {
    web: devServices.filter(
      (s) =>
        s.name.includes("Website") ||
        s.name.includes("E-Commerce") ||
        s.name.includes("UI/UX"),
    ),
    mobile: devServices.filter(
      (s) => s.name.includes("Mobile") || s.name.includes("Application"),
    ),
    backend: devServices.filter(
      (s) =>
        s.name.includes("Database") ||
        s.name.includes("Server") ||
        s.name.includes("API"),
    ),
    support: devServices.filter(
      (s) =>
        s.name.includes("Maintenance") ||
        s.name.includes("Support") ||
        s.name.includes("Digital"),
    ),
  };

  const displayedServices =
    activeCategory === "all" ? services : categorizedServices[activeCategory];

  const displayedDevServices =
    activeDevCategory === "all"
      ? devServices
      : categorizedDevServices[activeDevCategory];

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
            <div className="company-info">
              <div className="company-logo-container">
                <a
                  href="https://deltaline-it.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={companyLogos.dli}
                    alt="Delta Line International Logo"
                    className="company-logo"
                  />
                </a>
              </div>
              <h2 className="company-name">Delta Line International (DLI)</h2>
            </div>
            <div className="company-badge">
              Since 2006
              <a
                href="https://deltaline-it.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="company-badge-link"
              >
                <FaArrowRight className="company-badge-arrow" />
              </a>
            </div>
          </div>

          <p className="company-description">
            Leading Cyber Security Company over GCC since 2006, providing IT
            security with high quality service and up-to-date technology.
          </p>

          <div className="company-highlights">
            <div className="highlight">
              <span className="highlight-icon">
                <FaTrophy />
              </span>
              <span>Leading in GCC</span>
            </div>
            <div className="highlight">
              <span className="highlight-icon">
                <FaStar />
              </span>
              <span>High Quality Service</span>
            </div>
            <div className="highlight">
              <span className="highlight-icon">
                <FaRocket />
              </span>
              <span>Up-to-date Technology</span>
            </div>
          </div>

          <div className="services-filter">
            <button
              className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All Services
            </button>
            <button
              className={`filter-btn ${activeCategory === "security" ? "active" : ""}`}
              onClick={() => setActiveCategory("security")}
            >
              Security
            </button>
            <button
              className={`filter-btn ${activeCategory === "infrastructure" ? "active" : ""}`}
              onClick={() => setActiveCategory("infrastructure")}
            >
              Infrastructure
            </button>
            <button
              className={`filter-btn ${activeCategory === "data" ? "active" : ""}`}
              onClick={() => setActiveCategory("data")}
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
        </div>

        <div className="company-profile">
          <div className="company-header">
            <div className="company-info">
              <div className="company-logo-container">
                <a
                  href="https://ixcoders.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={companyLogos.ixcoders}
                    alt="IXCoders Logo"
                    className="company-logo"
                  />
                </a>
              </div>
              <h2 className="company-name">IXCoders</h2>
            </div>
            <div className="company-badge">
              Since 2020
              <a
                href="https://ixcoders.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="company-badge-link"
              >
                <FaArrowRight className="company-badge-arrow" />
              </a>
            </div>
          </div>

          <p className="company-description">
            Our premier partner for web and mobile application development.
            Specializing in creating cutting-edge digital solutions with
            innovative technology and exceptional user experience.
          </p>

          <div className="company-highlights">
            <div className="highlight">
              <span className="highlight-icon">
                <FaCode />
              </span>
              <span>Custom Development</span>
            </div>
            <div className="highlight">
              <span className="highlight-icon">
                <FaMobileAlt />
              </span>
              <span>Cross-Platform Apps</span>
            </div>
            <div className="highlight">
              <span className="highlight-icon">
                <FaRocket />
              </span>
              <span>Fast Deployment</span>
            </div>
          </div>

          <div className="services-filter">
            <button
              className={`filter-btn ${activeDevCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveDevCategory("all")}
            >
              All Services
            </button>
            <button
              className={`filter-btn ${activeDevCategory === "web" ? "active" : ""}`}
              onClick={() => setActiveDevCategory("web")}
            >
              Web Development
            </button>
            <button
              className={`filter-btn ${activeDevCategory === "mobile" ? "active" : ""}`}
              onClick={() => setActiveDevCategory("mobile")}
            >
              Mobile Apps
            </button>
            <button
              className={`filter-btn ${activeDevCategory === "backend" ? "active" : ""}`}
              onClick={() => setActiveDevCategory("backend")}
            >
              Backend & API
            </button>
            <button
              className={`filter-btn ${activeDevCategory === "support" ? "active" : ""}`}
              onClick={() => setActiveDevCategory("support")}
            >
              Support
            </button>
          </div>

          <div className="services-list">
            <h3 className="services-list-title">Development Services</h3>
            <div className="services-grid">
              {displayedDevServices.map((service, index) => (
                <div className="service-card" key={index}>
                  <div className="service-icon">{service.icon}</div>
                  <h4 className="service-name">{service.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
