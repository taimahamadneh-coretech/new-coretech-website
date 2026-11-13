import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GlobeMap from "./GlobeMap";
import Map from "./Map"; // previous flat map — used as a fallback if WebGL fails
import "./globe.css";

export default function MapGlobeSection() {
  const { t, i18n } = useTranslation();
  const [failed, setFailed] = useState(false);

  if (failed) return <Map />;

  return (
    <section id="Map" className="section globe-section">
      <div className="section-header">
        <h2 className="section-title">{t("map.sub-title")}</h2>
      </div>

      <GlobeMap lang={i18n.language} onError={() => setFailed(true)} />

      <div className="globe-legend">
        <span className="globe-legend-item">
          <span className="globe-dot globe-dot--market" aria-hidden="true" />
          {t("map.legendMarkets")}
        </span>
        <span className="globe-legend-hint">{t("map.dragHint")}</span>
      </div>
    </section>
  );
}
