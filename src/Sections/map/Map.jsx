import { useState, useEffect, useRef } from "react";
import "./map.css";
import { mapPaths } from "./mapData";
import { useTranslation } from 'react-i18next';

const Map = () => {
    const { t } = useTranslation();

  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });

  const [projects, setProjects] = useState(0);
  const [expansion, setExpansion] = useState(0);
  const [Partners, setPartners] = useState(0);

  const countersRef = useRef(null);
  const hasStarted = useRef(false);

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
 useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasStarted.current) {
        hasStarted.current = true;

        const startCounter = (end, setter) => {
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setter(count);
            if (count === end) clearInterval(interval);
          }, 30);
        };

        startCounter(100, setProjects);
        startCounter(20, setExpansion);
        startCounter(22, setPartners);
      }
    },
    { threshold: 0.4 }
  );

  if (countersRef.current) {
    observer.observe(countersRef.current);
  }

  return () => observer.disconnect();
}, []);


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
                  fill: isAlwaysGreen
                    ? "#94b4e1ff"
                    : isHovered
                      ? "#ffb6c1"
                      : "#ececec",
                  cursor: "pointer"
                }}
              />
            );
          })
        )}
      </svg>
<div className="map-counters" ref={countersRef}>
  <div className="counter-box">
    <h3 className="counter-number">+{projects}</h3>
    <p className="counter-title">{t('map.projects')}</p>
  </div>

  <div className="counter-box">
    <h3 className="counter-number">+{expansion}</h3>
    <p className="counter-title">{t('map.expansion')}</p>
  </div>

  <div className="counter-box">
    <h3 className="counter-number">+{Partners}</h3>
    <p className="counter-title">{t('map.partners')}</p>
  </div>
</div>
    </section>
  );
};

export default Map;
