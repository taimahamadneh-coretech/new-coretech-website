import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./partnersSpotlight.css";

import hytera1 from "../../assets/images/FeaturedPartners/hytera/Hytera1.png";
import hytera2 from "../../assets/images/FeaturedPartners/hytera/Hytera2.png";
import hytera3 from "../../assets/images/FeaturedPartners/hytera/Hytera3.png";
import hytera4 from "../../assets/images/FeaturedPartners/hytera/Hytera4.png";
import jauda1 from "../../assets/images/FeaturedPartners/jauda/jaudaImage1.png";
import jauda2 from "../../assets/images/FeaturedPartners/jauda/jaudaImage2.png";
import jauda3 from "../../assets/images/FeaturedPartners/jauda/jaudaImage3.png";
import jauda4 from "../../assets/images/FeaturedPartners/jauda/jaudaImage4.png";
import hascelik1 from "../../assets/images/FeaturedPartners/hascelikfiber/hascelikfiber1.png";
import hascelik2 from "../../assets/images/FeaturedPartners/hascelikfiber/hascelikfiber2.png";
import hascelik3 from "../../assets/images/FeaturedPartners/hascelikfiber/hascelikfiber3.png";
import hascelik4 from "../../assets/images/FeaturedPartners/hascelikfiber/hascelikfiber4.png";
import quail1 from "../../assets/images/FeaturedPartners/quaildigital/quaildigital1.png";
import quail2 from "../../assets/images/FeaturedPartners/quaildigital/quaildigital2.jpg";
import quail3 from "../../assets/images/FeaturedPartners/quaildigital/quaildigital3.png";
import quail4 from "../../assets/images/FeaturedPartners/quaildigital/quaildigital4.jpg";
import cyber1 from "../../assets/images/FeaturedPartners/cyberwise/cyber1.webp";
import cyber2 from "../../assets/images/FeaturedPartners/cyberwise/cyber2.jpg";
import cyber3 from "../../assets/images/FeaturedPartners/cyberwise/cyber3.jpg";
import cyber4 from "../../assets/images/FeaturedPartners/cyberwise/cyber4.jpg";
import hyteraLogo from "../../assets/images/FeaturedPartners/hytera/hytera-logo.png";
import jaudaLogo from "../../assets/images/FeaturedPartners/jauda/jauda-logo.png";
import hascelikLogo from "../../assets/images/FeaturedPartners/hascelikfiber/hascelikfiber-logo.png";
import quailLogo from "../../assets/images/FeaturedPartners/quaildigital/quaildigital.png";
import cyberwiseLogo from "../../assets/images/FeaturedPartners/cyberwise/cyberwiseLogo.png";

// "Spotlight" version of Our Partners. The previous story-cards version is
// kept in FeaturedPartnrt.jsx (not used). IXCoders is no longer listed.

const SLIDE_MS = 4500; // time each story slide stays on screen

const PARTNERS = [
  { key: "cyberwise", images: [cyber1, cyber2, cyber3, cyber4], link: "https://cyberwise.ae/", logo: cyberwiseLogo },
  { key: "hytera", images: [hytera1, hytera2, hytera3, hytera4], link: "https://hytera.ae/", logo: hyteraLogo },
  { key: "jaudaKoks", images: [jauda1, jauda2, jauda3, jauda4], link: "https://www.jauda-koks.lv/", logo: jaudaLogo },
  { key: "hascelikTexts", images: [hascelik1, hascelik2, hascelik3, hascelik4], link: "https://hascelikfiber.com.tr/", logo: hascelikLogo },
  { key: "quaildigital", images: [quail1, quail2, quail3, quail4], link: "https://www.quaildigital.com/", logo: quailLogo },
];

export default function PartnersSpotlight() {
  const { t } = useTranslation();
  const [p, setP] = useState(0);         // active partner
  const [s, setS] = useState(0);         // active slide
  const [progress, setProgress] = useState(0); // 0–1 for the active slide
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef(null);

  const reduced =
    typeof window !== "undefined" && window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const partner = PARTNERS[p];
  const slides = t(`Featuredpartners.${partner.key}.slides`, { returnObjects: true });
  const texts = Array.isArray(slides) ? slides : [];

  const progressRef = useRef(0);
  const resetProgress = () => { progressRef.current = 0; setProgress(0); };

  const goTo = (pi, si = 0) => {
    setP(pi);
    setS(si);
    resetProgress();
  };

  const next = () => {
    if (s < PARTNERS[p].images.length - 1) setS(s + 1);
    else {
      setP((p + 1) % PARTNERS.length);
      setS(0);
    }
    resetProgress();
  };

  const prev = () => {
    if (s > 0) setS(s - 1);
    else {
      const pp = (p - 1 + PARTNERS.length) % PARTNERS.length;
      setP(pp);
      setS(PARTNERS[pp].images.length - 1);
    }
    resetProgress();
  };

  // Latest `next` for the timer (avoids restarting the timer every slide)
  const nextRef = useRef(next);
  nextRef.current = next;

  // Only run while the section is on screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Progress timer
  useEffect(() => {
    if (reduced || paused || !inView) return;
    let raf;
    let last = performance.now();
    const tick = (now) => {
      progressRef.current += (now - last) / SLIDE_MS;
      last = now;
      if (progressRef.current >= 1) nextRef.current();
      else setProgress(progressRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, paused, inView]);

  // Click on the stage: left third = back, rest = forward
  const onStageClick = (e) => {
    if (e.target.closest(".ps-visit")) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const isRtl = document.documentElement.dir === "rtl";
    const back = isRtl ? x > 0.67 : x < 0.33;
    back ? prev() : next();
  };

  return (
    <div id="partners" className="section ps-section" ref={rootRef}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{t("Featuredpartners.sectionTitle")}</h2>
          <p className="section-subtitle">{t("Featuredpartners.sectionSubtitle")}</p>
        </div>

        <div className="ps-layout">
          {/* Stage */}
          <div
            className="ps-stage"
            onClick={onStageClick}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            role="group"
            aria-roledescription="story"
            aria-label={t(`Featuredpartners.${partner.key}.name`)}
          >
            {partner.images.map((img, i) => (
              <img
                key={img}
                src={img}
                alt=""
                className={`ps-img ${i === s ? "is-active" : ""}`}
                draggable={false}
              />
            ))}
            <div className="ps-shade" aria-hidden="true" />

            <div className="ps-bars" aria-hidden="true">
              {partner.images.map((_, i) => (
                <span key={i} className="ps-bar">
                  <span style={{ width: `${i < s ? 100 : i === s ? progress * 100 : 0}%` }} />
                </span>
              ))}
            </div>

            <div className="ps-top">
              <img src={partner.logo} alt={t(`Featuredpartners.${partner.key}.name`)} className="ps-logo" />
              <a className="ps-visit" href={partner.link} target="_blank" rel="noopener noreferrer"
                 aria-label={`${t("Featuredpartners.visit", "Visit website")}: ${t(`Featuredpartners.${partner.key}.name`)}`}>
                ↗
              </a>
            </div>

            <p key={`${p}-${s}`} className="ps-text" aria-live="polite">{texts[s]}</p>
          </div>

          {/* Partner list */}
          <ul className="ps-list">
            {PARTNERS.map((pt, i) => (
              <li key={pt.key}>
                <button
                  type="button"
                  className={`ps-item ${i === p ? "is-active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-current={i === p || undefined}
                >
                  <img src={pt.images[0]} alt="" className="ps-thumb" />
                  <span className="ps-item-body">
                    <span className="ps-item-name">{t(`Featuredpartners.${pt.key}.name`)}</span>
                    {i === p && (
                      <span className="ps-item-progress" aria-hidden="true">
                        <span style={{ width: `${((s + progress) / pt.images.length) * 100}%` }} />
                      </span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
