import { useEffect, useRef, useState } from "react";
import { companyData } from "../../data/companyData";
import "./about.css";
import { useTranslation } from "react-i18next";
import { FiEye, FiTarget, FiChevronDown } from "react-icons/fi";
import teamPhoto from "../../assets/images/about/about-team.jpg";
import cyberPhoto from "../../assets/images/about/about-cyber.jpg";

const CLD = "https://res.cloudinary.com/dslt4vswp/image/upload";
// Old collage photos (kept for reference):
//   `${CLD}/c_fill,w_420,h_310,f_auto,q_auto/v1768475833/image04_j0oisg.png`  (wooden poles)

// Photos for the collage (from your gallery on Cloudinary) — swap any time
const collage = [
  teamPhoto, // our team on site (replaced the Cloudinary image02 photo)
  `${CLD}/c_fill,w_420,h_310,f_auto,q_auto/v1768475832/image03_qemn8j.png`, // software — girl with laptop
  // softwarePhoto alternative (no people): import from "../../assets/images/about/about-software.jpg"
  cyberPhoto, // cybersecurity — was image04 wooden poles
];

const stats = [
  { end: 100, key: "map.projects" },
  { end: 20, key: "map.expansion" },
  { end: 22, key: "map.partners" },
];

const About = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  // Fade-in on scroll
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".about-reveal") || [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Count-up numbers when the stats row is visible
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1500;
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCounts(stats.map((s) => Math.round(s.end * eased)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="about" className="section about-section" ref={sectionRef} data-nav="light">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{t("about.sectionTitle")}</h2>
        </div>

        {/* Overview + photo collage */}
        <div className="about-split">
          <div className="about-text about-card about-reveal">
            <h3>{t("about.cardTitle")}</h3>
            <p
              id="about-overview"
              className={`about-overview ${expanded ? "is-expanded" : ""}`}
            >
              {companyData.description[lang]}
            </p>
            <button
              type="button"
              className="about-toggle"
              aria-expanded={expanded}
              aria-controls="about-overview"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? t("about.readLess") : t("about.readMore")}
              <FiChevronDown
                className={`about-chevron ${expanded ? "is-up" : ""}`}
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="about-collage about-reveal">
            {collage.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                className={`collage-img collage-${i}`}
              />
            ))}
          </div>
        </div>

        {/* Key numbers */}
        <div className="about-stats about-reveal" ref={statsRef}>
          {stats.map((s, i) => (
            <div className="about-stat about-card" key={s.key}>
              <span className="about-stat-number">+{counts[i]}</span>
              <span className="about-stat-label">{t(s.key)}</span>
            </div>
          ))}
        </div>

        {/* Vision + Mission */}
        <div className="vision-mission-grid">
          <div className="vm-card about-card about-reveal">
            <h3>
              <span className="vm-icon"><FiEye aria-hidden="true" /></span>
              {t("about.visionTitle")}
            </h3>
            <p>{companyData.vision[lang]}</p>
          </div>

          <div className="vm-card about-card about-reveal">
            <h3>
              <span className="vm-icon"><FiTarget aria-hidden="true" /></span>
              {t("about.missionTitle")}
            </h3>
            <p>{companyData.mission[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;