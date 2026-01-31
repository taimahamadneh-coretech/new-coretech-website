import React, { useState, useMemo } from "react";
import "./services.css";
import delta from "../../assets/images/Services/delta.png";
import ixcoders from "../../assets/images/Services/ixcoders.png";
import { useTranslation } from "react-i18next";

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

/* -------------------- Data -------------------- */

const companyLogos = {
  dli: delta,
  ixcoders: ixcoders,
};

const services = [
  { key: "endpoint", category: "security", icon: <FaShieldAlt /> },
  { key: "network", category: "infrastructure", icon: <FaNetworkWired /> },
  { key: "data", category: "data", icon: <FaDatabase /> },
  { key: "assessment", category: "security", icon: <FaClipboardCheck /> },
  { key: "access", category: "infrastructure", icon: <FaKey /> },
  { key: "enterprise", category: "security", icon: <FaBuilding /> },
  { key: "specialized", category: "security", icon: <FaUserShield /> },
  { key: "monitoring", category: "security", icon: <FaChartBar /> },
  { key: "optimization", category: "infrastructure", icon: <FaTachometerAlt /> },
  { key: "backup", category: "data", icon: <FaEnvelope /> },
];

const devServices = [
  { key: "web", category: "web", icon: <FaCode /> },
  { key: "mobile", category: "mobile", icon: <FaMobileAlt /> },
  { key: "database", category: "backend", icon: <FaCloud /> },
  { key: "servers", category: "backend", icon: <FaDatabase /> },
  { key: "security", category: "backend", icon: <FaLock /> },
  { key: "uiux", category: "web", icon: <FaShapes /> },
  { key: "support", category: "support", icon: <FaTachometerAlt /> },
];

/* -------------------- Component -------------------- */

const Services = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDevCategory, setActiveDevCategory] = useState("all");

  const displayedServices = useMemo(() => {
    return activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const displayedDevServices = useMemo(() => {
    return activeDevCategory === "all"
      ? devServices
      : devServices.filter((s) => s.category === activeDevCategory);
  }, [activeDevCategory]);

  return (
    <section id="services" className="services-section">
      <div className="services-container">

        {/* ---------- Header ---------- */}
        <div className="section-header">
          <h1 className="section-title">{t("services.sectionTitle")}</h1>
          <p className="section-subtitle">{t("services.sectionSubtitle")}</p>
        </div>

        {/* ================== DLI ================== */}
        <div className="company-profile">
          <div className="company-header">
            <div className="company-info">
              <div className="company-logo-container">
                <a href="https://deltaline-it.com/" target="_blank" rel="noreferrer">
                  <img src={companyLogos.dli} alt="DLI Logo" className="company-logo" />
                </a>
              </div>
              <h2 className="company-name">{t("services.dli.name")}</h2>
            </div>

            <div className="company-badge">
              Since 2006
              <a href="https://deltaline-it.com/" target="_blank" rel="noreferrer">
                <FaArrowRight className="company-badge-arrow" />
              </a>
            </div>
          </div>

          <p className="company-description">
            {t("services.dli.description")}
          </p>

          <div className="company-highlights">
            <div className="highlight">
              <FaTrophy /> {t("services.dli.highlights.gcc")}
            </div>
            <div className="highlight">
              <FaStar /> {t("services.dli.highlights.quality")}
            </div>
            <div className="highlight">
              <FaRocket /> {t("services.dli.highlights.tech")}
            </div>
          </div>

          <div className="services-filter">
            {["all", "security", "infrastructure", "data"].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {t(`services.filters.${cat}`)}
              </button>
            ))}
          </div>

          <div className="services-list">
            <h3 className="services-list-title">
              {t("services.dli.listTitle")}
            </h3>

            <div className="services-grid">
              {displayedServices.map((service) => (
                <div className="service-card" key={service.key}>
                  <div className="service-icon">{service.icon}</div>
                  <h4 className="service-name">
                    {t(`services.dli.items.${service.key}`)}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================== IXCoders ================== */}
        <div className="company-profile">
          <div className="company-header">
            <div className="company-info">
              <div className="company-logo-container">
                <a href="https://ixcoders.com/" target="_blank" rel="noreferrer">
                  <img src={companyLogos.ixcoders} alt="IXCoders Logo" className="company-logo" />
                </a>
              </div>
              <h2 className="company-name">{t("services.ixcoders.name")}</h2>
            </div>

            <div className="company-badge">
              Since 2020
              <a href="https://ixcoders.com/" target="_blank" rel="noreferrer">
                <FaArrowRight className="company-badge-arrow" />
              </a>
            </div>
          </div>

          <p className="company-description">
            {t("services.ixcoders.description")}
          </p>

          <div className="company-highlights">
            <div className="highlight">
              <FaCode /> {t("services.ixcoders.highlights.custom")}
            </div>
            <div className="highlight">
              <FaMobileAlt /> {t("services.ixcoders.highlights.cross")}
            </div>
            <div className="highlight">
              <FaRocket /> {t("services.ixcoders.highlights.fast")}
            </div>
          </div>

          <div className="services-filter">
            {["all", "web", "mobile", "backend", "support"].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeDevCategory === cat ? "active" : ""}`}
                onClick={() => setActiveDevCategory(cat)}
              >
                {t(`services.filters.${cat}`)}
              </button>
            ))}
          </div>

          <div className="services-list">
            <h3 className="services-list-title">
              {t("services.ixcoders.listTitle")}
            </h3>

            <div className="services-grid">
              {displayedDevServices.map((service) => (
                <div className="service-card" key={service.key}>
                  <div className="service-icon">{service.icon}</div>
                  <h4 className="service-name">
                    {t(`services.ixcoders.items.${service.key}`)}
                  </h4>
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
