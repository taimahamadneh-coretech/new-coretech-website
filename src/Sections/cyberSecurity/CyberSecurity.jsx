import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaShieldAlt, FaNetworkWired, FaDatabase, FaHandshake, FaExternalLinkAlt,
  FaDesktop, FaClipboardCheck, FaBuilding, FaUserShield, FaChartBar, FaSearch,
  FaBalanceScale, FaBug, FaUserCog, FaUserCheck, FaSlidersH, FaUsers, FaServer,
  FaGlobe, FaTasks, FaTools, FaKey, FaTachometerAlt, FaCloudUploadAlt,
} from "react-icons/fa";
import deltaLogo from "../../assets/icons/partners/delta.png";
import cyberwiseLogo from "../../assets/icons/partners/cyberwise.png";
import { cyberClients } from "./cyberClients";
import "./cyberSecurity.css";

// Services grouped by category.
// Names: services.dli.items.<key> · Descriptions: services.dli.desc.<key>
const groups = [
  {
    key: "security", titleKey: "services.filters.security", icon: <FaShieldAlt />,
    items: [
      { key: "endpoint", icon: <FaDesktop /> },
      { key: "assessment", icon: <FaClipboardCheck /> },
      { key: "enterprise", icon: <FaBuilding /> },
      { key: "specialized", icon: <FaUserShield /> },
      { key: "monitoring", icon: <FaChartBar /> },
      { key: "securityAudit", icon: <FaSearch /> },
      { key: "gapAnalysis", icon: <FaBalanceScale /> },
      { key: "vulnerability", icon: <FaBug /> },
    ],
  },
  {
    key: "consulting", titleKey: "cyber.groupServices", icon: <FaHandshake />,
    items: [
      { key: "techConsulting", icon: <FaUserCog /> },
      { key: "securityConsulting", icon: <FaUserCheck /> },
      { key: "techManagement", icon: <FaSlidersH /> },
      { key: "professional", icon: <FaUsers /> },
      { key: "managed", icon: <FaServer /> },
      { key: "outsource", icon: <FaGlobe /> },
      { key: "projectManagement", icon: <FaTasks /> },
      { key: "installation", icon: <FaTools /> },
    ],
  },
  {
    key: "infrastructure", titleKey: "services.filters.infrastructure", icon: <FaNetworkWired />,
    items: [
      { key: "network", icon: <FaNetworkWired /> },
      { key: "access", icon: <FaKey /> },
      { key: "optimization", icon: <FaTachometerAlt /> },
    ],
  },
  {
    key: "data", titleKey: "services.filters.data", icon: <FaDatabase />,
    items: [
      { key: "data", icon: <FaDatabase /> },
      { key: "backup", icon: <FaCloudUploadAlt /> },
    ],
  },
];

// Ticker: repeat the list so it is always wider than the screen
const MIN_PER_LOOP = 8;
const reps = cyberClients.length
  ? Math.max(1, Math.ceil(MIN_PER_LOOP / cyberClients.length))
  : 0;
const loop = Array.from({ length: reps }, () => cyberClients).flat();

export default function CyberSecurity() {
  const { t } = useTranslation();
  const [activeGroup, setActiveGroup] = useState(groups[0].key);
  const current = groups.find((g) => g.key === activeGroup) || groups[0];

  const cwSlides = t("Featuredpartners.cyberwise.slides", { returnObjects: true });
  const companies = [
    {
      key: "delta",
      logo: deltaLogo,
      darkLogo: false,
      url: "https://deltaline-it.com/",
      name: t("services.dli.name"),
      desc: t("services.dli.description"),
      badges: [t("cyber.since"), t("services.dli.highlights.gcc")],
    },
    {
      key: "cyberwise",
      logo: cyberwiseLogo,
      darkLogo: false,
      url: "https://cyberwise.ae/",
      name: t("Featuredpartners.cyberwise.name"),
      desc: Array.isArray(cwSlides) ? cwSlides[0] : "",
      badges: [t("cyber.partner")],
    },
  ];

  return (
    <section id="cybersecurity" className="section cy-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{t("cyber.title")}</h2>
          <p className="section-subtitle">{t("cyber.subtitle")}</p>
        </div>

        {/* Companies */}
        <div className="cy-companies">
          {companies.map((c) => (
            <article className="cy-card cy-company" key={c.key}>
              <div className={`cy-logo ${c.darkLogo ? "cy-logo--dark" : ""}`}>
                <img src={c.logo} alt={c.name} loading="lazy" />
              </div>
              <h3 className="cy-company-name">{c.name}</h3>
              <div className="cy-badges">
                {c.badges.map((b) => (
                  <span className="cy-badge" key={b}>{b}</span>
                ))}
              </div>
              <p className="cy-company-desc">{c.desc}</p>
              <a className="cy-visit" href={c.url} target="_blank" rel="noopener noreferrer">
                {t("cyber.visit")} <FaExternalLinkAlt aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        {/* Services: category menu + cards */}
        <div className="cy-services">
          <div className="cy-menu" role="tablist" aria-label={t("cyber.title")}>
            {groups.map((g) => (
              <button
                key={g.key}
                type="button"
                role="tab"
                id={`cy-tab-${g.key}`}
                aria-selected={g.key === activeGroup}
                aria-controls="cy-panel"
                className={`cy-menu-item ${g.key === activeGroup ? "is-active" : ""}`}
                onClick={() => setActiveGroup(g.key)}
              >
                <span className="cy-menu-icon" aria-hidden="true">{g.icon}</span>
                <span className="cy-menu-label">{t(g.titleKey)}</span>
                <span className="cy-count">{g.items.length}</span>
              </button>
            ))}
          </div>

          <div
            className="cy-cards"
            id="cy-panel"
            role="tabpanel"
            aria-labelledby={`cy-tab-${current.key}`}
            key={current.key}
          >
            {current.items.map((item) => (
              <div className="cy-card cy-service" key={item.key}>
                <span className="cy-service-icon" aria-hidden="true">{item.icon}</span>
                <div>
                  <h4 className="cy-service-name">{t(`services.dli.items.${item.key}`)}</h4>
                  <p className="cy-service-desc">{t(`services.dli.desc.${item.key}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clients ticker (hidden until clients are added) */}
        {cyberClients.length > 0 && (
          <div className="cy-card cy-clients">
            <h3 className="cy-clients-title">{t("cyber.clientsTitle")}</h3>
            <div className="cy-marquee">
              <div className="cy-marquee-track">
                {[0, 1].map((copy) =>
                  loop.map((c, i) => {
                    const Tag = c.url ? "a" : "div";
                    const linkProps = c.url
                      ? { href: c.url, target: "_blank", rel: "noopener noreferrer" }
                      : {};
                    const hidden = copy === 1 || i >= cyberClients.length;
                    return (
                      <Tag
                        key={`${copy}-${i}`}
                        className="cy-client"
                        title={c.name}
                        aria-hidden={hidden || undefined}
                        tabIndex={hidden ? -1 : undefined}
                        {...linkProps}
                      >
                        {c.logo
                          ? <img src={c.logo} alt={hidden ? "" : c.name} loading="lazy" />
                          : <span>{c.name}</span>}
                      </Tag>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
