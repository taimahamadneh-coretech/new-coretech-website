import React from "react";
import { useTranslation } from "react-i18next";
import Smooth3DCarousel from "./Smooth3DCarousel";
import { allClients } from "./allClients";
import "./clientsShowcase.css";

// Previous version (crumple paper, WebGL) is kept in ./CrumpleCarousel.jsx — not used.

export default function ClientsShowcase() {
  const { t } = useTranslation();

  return (
    <section id="clients" className="section cf-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{t("clients.sectionTitle")}</h2>
          <p className="section-subtitle">{t("clients.sectionSubtitle")}</p>
        </div>
      </div>

      <Smooth3DCarousel items={allClients} ariaLabel={t("clients.sectionTitle")} />
      
      {/* Client names for screen readers and search engines */}
      <ul className="cf-sr-only">
        {allClients.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
    </section>
  );
}
