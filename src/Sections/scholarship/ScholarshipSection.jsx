import React from "react";
import { useTranslation } from "react-i18next";
import "./ScholarshipSection.css";

import universityLogo from "../../assets/icons/scholarship/university.png";
import usersLogo from "../../assets/icons/scholarship/searching.png";
import checklistLogo from "../../assets/icons/scholarship/checklist.png";
import starLogo from "../../assets/icons/scholarship/dart.png";

export default function ScholarshipSection() {
  const { t, i18n } = useTranslation();

  const scholarship = {
    title: t("scholarship.title"),

    universities: t("scholarship.universities", {
      returnObjects: true,
    }),

    lookingFor: t("scholarship.lookingFor", {
      returnObjects: true,
    }),

    requirements: t("scholarship.requirements", {
      returnObjects: true,
    }),

    whyOurScholarship: {
      title: t("scholarship.whyTitle"),
      description: t("scholarship.whyDescription"),
    },
  };

  const timeline = t("scholarship.timeline", {
    returnObjects: true,
  });

  const renderListSection = (title, items, icon) => (
    <div className="info-card">
      <h3 className="info-card__title">
        <span className="info-card__icon">
          <img src={icon} alt={title} />
        </span>
        {title}
      </h3>

      <ul className="info-card__list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <section
      className="section"
      id="scholarship"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="section-container">
        <header className="section-header">
          <h2 className="section-title">{scholarship.title}</h2>
        </header>

        <p className="scholarship__desc">{scholarship.description}</p>

        <div className="scholarship__timeline">
          <h3 className="scholarship__timeline-title">
            {t("scholarship.timelineTitle")}
          </h3>

          <div className="timeline-chain">
            {timeline.map((item, index) => (
              <React.Fragment key={index}>
                <div className="timeline-step">
                  <div className="timeline-circle">{index + 1}</div>

                  <div className="timeline-content">
                    <h4>{item.title}</h4>
                    <span>{item.date}</span>
                  </div>
                </div>

                {index !== timeline.length - 1 && (
                  <div className="timeline-arrow">
                    {i18n.language === "ar" ? "➜" : "➜"}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="scholarship__actions">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfGoxDQIHMQHvtMRQ4T5pDPt5i4TA-DtXEQhKnY89R60Jo4tg/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="apply-btn"
            >
              {t("scholarship.applyNow")}
            </a>
          </div>
        </div>

        <div className="scholarship-info">
          {renderListSection(
            t("scholarship.universitiesTitle"),
            scholarship.universities,
            universityLogo
          )}

          {renderListSection(
            t("scholarship.lookingForTitle"),
            scholarship.lookingFor,
            usersLogo
          )}

          {renderListSection(
            t("scholarship.requirementsTitle"),
            scholarship.requirements,
            checklistLogo
          )}

          <div className="info-card why-card">
            <h3 className="info-card__title">
              <span className="info-card__icon">
                <img
                  src={starLogo}
                  alt={scholarship.whyOurScholarship.title}
                />
              </span>

              {scholarship.whyOurScholarship.title}
            </h3>

            <p className="why-card__text">
              {scholarship.whyOurScholarship.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}