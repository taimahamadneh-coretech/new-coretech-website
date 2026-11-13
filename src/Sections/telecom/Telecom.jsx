import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  GiElectric, GiNetworkBars, GiCircuitry, GiToolbox, GiRadarDish,
  GiRadioTower, GiWalkieTalkie, GiCctvCamera,
} from "react-icons/gi";
import {
  FaProjectDiagram, FaBroadcastTower, FaMobileAlt, FaCamera, FaServer,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { MdHeadsetMic } from "react-icons/md";
import { companyData } from "../../data/companyData";
import { projects, ProjectCard } from "../ourProjects/ProjectsSection";
import primerLogo from "../../assets/icons/partners/primer.png";
import { telecomClients } from "./telecomClients";
import "./telecom.css";

// Same icons as the original Products section
const productIcons = {
  "Wooden Poles": <GiElectric />,
  "Fiber Cables and Accessories": <GiNetworkBars />,
  "FTTx Core Network": <GiCircuitry />,
  "Tools and Testing Equipment": <GiToolbox />,
  "GIS and Project Management Software": <FaProjectDiagram />,
  "ONUs and Access Points": <GiRadarDish />,
  "Steel Structures for Radio Towers": <GiRadioTower />,
  "DMR Radio Solutions": <GiWalkieTalkie />,
  "TETRA Radio Systems": <FaBroadcastTower />,
  "PTT over Cellular (PoC)": <FaMobileAlt />,
  "Broadband Terminals & Systems": <FaServer />,
  "Body Worn Cameras": <FaCamera />,
  "Two-Way Radio Types": <GiWalkieTalkie />,
  "Integrated Communication Solutions": <GiCctvCamera />,
  "Quail Wearable Communication Devices": <MdHeadsetMic />,
};

// Product tabs (products come from companyData; split by English title)
const FIXED_LINE = [
  "Wooden Poles",
  "Fiber Cables and Accessories",
  "FTTx Core Network",
  "Tools and Testing Equipment",
  "GIS and Project Management Software",
  "ONUs and Access Points",
  "Steel Structures for Radio Towers",
];

const allProducts = companyData.products[0].items;
const tabs = [
  { key: "fixed", labelKey: "telecom.tabFixed", items: allProducts.filter((p) => FIXED_LINE.includes(p.title.en)) },
  { key: "radio", labelKey: "telecom.tabRadio", items: allProducts.filter((p) => !FIXED_LINE.includes(p.title.en)) },
];

// Ticker: repeat the list so it is always wider than the screen
const MIN_PER_LOOP = 8;
const reps = telecomClients.length
  ? Math.max(1, Math.ceil(MIN_PER_LOOP / telecomClients.length))
  : 0;
const loop = Array.from({ length: reps }, () => telecomClients).flat();

export default function Telecom() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const current = tabs.find((tb) => tb.key === activeTab) || tabs[0];

  // Every project is tagged "Supplied by Primer" (ProjectCard shows tags)
  const supplied = {
    en: [i18n.getFixedT("en")("telecom.suppliedBy")],
    ar: [i18n.getFixedT("ar")("telecom.suppliedBy")],
  };
  const telecomProjects = projects.map((p) => ({ ...p, tags: supplied }));

  return (
    <section id="telecom" className="section tc-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{t("telecom.title")}</h2>
          <p className="section-subtitle">{t("telecom.subtitle")}</p>
        </div>

        {/* 1. Sister company */}
        <article className="tc-card tc-primer">
          <div className="tc-primer-logo">
            <img src={primerLogo} alt="Primer Comercio" loading="lazy" />
          </div>
          <div className="tc-primer-body">
            <h3 className="tc-primer-name">Primer Comercio</h3>
            <div className="tc-badges">
              <span className="tc-badge">{t("telecom.badgeSister")}</span>
              <span className="tc-badge">{t("telecom.badgeSupply")}</span>
              <span className="tc-badge">{t("telecom.badgeLogistics")}</span>
            </div>
            <p className="tc-primer-desc">{t("telecom.primerDesc")}</p>
            <a className="tc-visit" href="https://pclps.com" target="_blank" rel="noopener noreferrer">
              {t("telecom.visit")} <FaExternalLinkAlt aria-hidden="true" />
            </a>
          </div>
        </article>

        {/* 2. Products */}
        <h3 className="tc-block-title">{t("telecom.productsTitle")}</h3>
        <div className="tc-tabs" role="tablist" aria-label={t("telecom.productsTitle")}>
          {tabs.map((tb) => (
            <button
              key={tb.key}
              type="button"
              role="tab"
              id={`tc-tab-${tb.key}`}
              aria-selected={tb.key === activeTab}
              aria-controls="tc-panel"
              className={`tc-tab ${tb.key === activeTab ? "is-active" : ""}`}
              onClick={() => setActiveTab(tb.key)}
            >
              {t(tb.labelKey)}
              <span className="tc-count">{tb.items.length}</span>
            </button>
          ))}
        </div>

        <div
          className="tc-products"
          id="tc-panel"
          role="tabpanel"
          aria-labelledby={`tc-tab-${current.key}`}
          key={current.key}
        >
          {current.items.map((p) => (
            <div className="tc-card tc-product" key={p.title.en}>
              <span className="tc-product-icon" aria-hidden="true">
                {productIcons[p.title.en]}
              </span>
              <h4 className="tc-product-name">{p.title[lang]}</h4>
              <p className="tc-product-desc">{p.description[lang]}</p>
            </div>
          ))}
        </div>

        {/* 3. Projects (same cards as the original Projects section) */}
        <h3 className="tc-block-title">{t("telecom.projectsTitle")}</h3>
        <div className="tc-projects" dir={lang === "ar" ? "rtl" : "ltr"}>
          {telecomProjects.map((project, i) => (
            <ProjectCard key={project.title.en} project={project} index={i} />
          ))}
        </div>

        {/* 4. Clients ticker */}
        {telecomClients.length > 0 && (
          <div className="tc-card tc-clients">
            <h3 className="tc-clients-title">{t("telecom.clientsTitle")}</h3>
            <div className="tc-marquee">
              <div className="tc-marquee-track">
                {[0, 1].map((copy) =>
                  loop.map((c, i) => {
                    const Tag = c.url ? "a" : "div";
                    const linkProps = c.url
                      ? { href: c.url, target: "_blank", rel: "noopener noreferrer" }
                      : {};
                    const hidden = copy === 1 || i >= telecomClients.length;
                    return (
                      <Tag
                        key={`${copy}-${i}`}
                        className="tc-client"
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
