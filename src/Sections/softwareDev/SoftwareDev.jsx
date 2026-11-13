import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaCode, FaMobileAlt, FaDatabase, FaServer, FaLock,
  FaPalette, FaTools, FaArrowRight,
} from "react-icons/fa";
import { softwareClients } from "./softwareClients";
import "./softwareDev.css";

const services = [
  { key: "web", icon: <FaCode /> },
  { key: "mobile", icon: <FaMobileAlt /> },
  { key: "database", icon: <FaDatabase /> },
  { key: "servers", icon: <FaServer /> },
  { key: "security", icon: <FaLock /> },
  { key: "uiux", icon: <FaPalette /> },
  { key: "support", icon: <FaTools />, wide: true },
];

// Repeat the list so the ticker is always wider than the screen,
// then render it twice for a seamless loop.
const MIN_PER_LOOP = 8;
const reps = Math.max(1, Math.ceil(MIN_PER_LOOP / softwareClients.length));
const loop = Array.from({ length: reps }, () => softwareClients).flat();

export default function SoftwareDev() {
  const { t } = useTranslation();

  return (
    <section id="software" className="section sw-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{t("software.title")}</h2>
        </div>

        <div className="sw-bento">

          {/* Intro (big tile) */}
          <div className="sw-tile sw-intro">
            <span className="sw-tag">{t("software.tag")}</span>
            <p className="sw-desc">{t("software.description")}</p>
            <a href="#contact" className="sw-cta">
              {t("software.cta")}
              <FaArrowRight className="sw-cta-icon" aria-hidden="true" />
            </a>
          </div>

          {/* Services */}
          {services.map((s) => (
            <div
              key={s.key}
              className={`sw-tile sw-service ${s.wide ? "sw-wide" : ""}`}
            >
              <span className="sw-icon" aria-hidden="true">{s.icon}</span>
              <h3 className="sw-service-name">{t(`software.items.${s.key}`)}</h3>
            </div>
          ))}

          {/* Clients — full-width ticker */}
          <div className="sw-tile sw-clients">
            <h3 className="sw-clients-title">{t("software.clientsTitle")}</h3>
            <div className="sw-marquee">
              <div className="sw-marquee-track">
                {[0, 1].map((copy) =>
                  loop.map((c, i) => {
                    const Tag = c.url ? "a" : "div";
                    const linkProps = c.url
                      ? { href: c.url, target: "_blank", rel: "noopener noreferrer" }
                      : {};
                    const hidden = copy === 1 || i >= softwareClients.length;
                    return (
                      <Tag
                        key={`${copy}-${i}`}
                        className="sw-client"
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

        </div>
      </div>
    </section>
  );
}
