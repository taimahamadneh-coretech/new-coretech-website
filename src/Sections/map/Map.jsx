import { useState } from "react";
import "./map.css";
import { mapPaths } from "./mapData";
import { useTranslation } from 'react-i18next';

const Map = () => {
    const { t } = useTranslation();

  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });


  const ALWAYS_GREEN = [
    "Palestine",
    "Egypt",
    "China",
    "United Arab Emirates",
    "Turkey",
    "Greece",
    "Italy",
    "Spain",
    "Portugal",
    "Latvia",
    "Estonia",
    "Lithuania",
    "Saudi Arabia",
    "Jordan",
    "United Arab Emirates",
    "South Africa",
    "Qatar"

  ];


  return (
    <section id="Map" className="section map-section">
      <div className="section-header">
        <h2 className="section-title">{t('map.sub-title')}</h2>
      </div>
      <div 
        id="name"
        style={{
          top: tooltip.y - 50,
          left: tooltip.x + 15,
          opacity: hovered ? 1 : 0
        }}
      >
        <p>{hovered}</p>
      </div>

      <svg
        id="allSvg"
        viewBox="0 0 2000 857"
      >
        {mapPaths.map((country) =>
          country.paths.map((d, index) => {
            const isAlwaysGreen = ALWAYS_GREEN.includes(country.id);
            const isHovered = hovered === country.id;

            return (
              <path
                key={`${country.id}-${index}`}
                d={d}
                className="allPaths"
                onMouseEnter={(e) => {
                  setHovered(country.id);
                  setTooltip({
                    x: e.clientX,
                    y: e.clientY
                  });
                }}
                onMouseMove={(e) => {
                  setTooltip({
                    x: e.clientX,
                    y: e.clientY
                  });
                }}
                onMouseLeave={() => setHovered(null)}
                style={{
                  fill: isHovered
                    ? "#0B3C8A"   /* hover = blue-dark */
                    : isAlwaysGreen
                      ? "#1E7FE6" /* our markets = blue-deep */
                      : "#DCE8F7", /* other countries = soft blue tint */
                  stroke: "#F7F9FC",
                  strokeWidth: 0.6,
                  transition: "fill 0.2s ease",
                  cursor: "pointer"
                }}
              />
            );
          })
        )}
      </svg>
    </section>
  );
};

export default Map;
