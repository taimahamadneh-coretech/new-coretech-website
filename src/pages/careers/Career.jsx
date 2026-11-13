import React, { useEffect, useState } from "react";
import './careers.css';
import CareerForm from './CareerForm';
import './careersRefresh.css';
import CanvasBackground from "../../components/CanvasBackground/CanvasBackground";
import { useTranslation } from "react-i18next";
import { FaRocket, FaGlobe, FaUsers, FaMapMarkerAlt, FaBriefcase, FaArrowRight } from "react-icons/fa";

// Previous version kept in Career.old.jsx.txt (not used).

export default function Careers() {
  const { t, i18n } = useTranslation();
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const openings = [
    {
      title: t("careers.salesExecutive"),
      location: t("careers.remote"),
      type: t("careers.contract"),
      description: t("careers.salesDescription"),
    },
  ];

  const perks = [
    { icon: <FaRocket />, title: t("careers.perks.growthTitle"), text: t("careers.perks.growthText") },
    { icon: <FaGlobe />, title: t("careers.perks.flexTitle"), text: t("careers.perks.flexText") },
    { icon: <FaUsers />, title: t("careers.perks.teamTitle"), text: t("careers.perks.teamText") },
  ];

  const closeDrawer = () => setSelectedJob(null);

  // Drawer: close with Esc, and stop the page scrolling behind it
  useEffect(() => {
    if (!selectedJob) return;
    const onKey = (e) => { if (e.key === "Escape") setSelectedJob(null); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedJob]);

  return (
    <>
      <CanvasBackground />
      <div className="careers-page cr-page">
        <header className="careers-hero" data-nav="dark">
          <h1>{t("careers.title")}</h1>
          <p>{t("careers.subtitle")}</p>
        </header>

        {/* Why join us */}
        <section className="cr-perks" aria-labelledby="cr-perks-title">
          <h2 id="cr-perks-title" className="cr-section-title">{t("careers.perks.title")}</h2>
          <div className="cr-perks-grid">
            {perks.map((p) => (
              <div className="cr-perk" key={p.title}>
                <span className="cr-perk-icon" aria-hidden="true">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open positions */}
        <section className="cr-openings" aria-labelledby="cr-open-title">
          <h2 id="cr-open-title" className="cr-section-title">{t("careers.openPositions")}</h2>
          <div className="cr-job-list">
            {openings.map((job) => (
              <article className="cr-job" key={job.title}>
                <div className="cr-job-main">
                  <h3>{job.title}</h3>
                  <div className="cr-tags">
                    <span className="cr-tag"><FaMapMarkerAlt aria-hidden="true" /> {job.location}</span>
                    <span className="cr-tag"><FaBriefcase aria-hidden="true" /> {job.type}</span>
                  </div>
                  <p>{job.description}</p>
                </div>
                <button type="button" className="cr-apply" onClick={() => setSelectedJob(job)}>
                  {t("careers.applyNow")} <FaArrowRight className="cr-arrow" aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Application drawer */}
        {selectedJob && (
          <div className="cr-drawer-overlay" onClick={closeDrawer}>
            <aside
              className="cr-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cr-drawer-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cr-drawer-header">
                <h2 id="cr-drawer-title">{t("careers.applyFor", { job: selectedJob.title })}</h2>
                <button type="button" className="cr-drawer-close" onClick={closeDrawer} aria-label="Close">
                  &times;
                </button>
              </div>
              <div className="cr-drawer-body">
                <CareerForm onCancel={closeDrawer} jobTitle={selectedJob.title} />
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
