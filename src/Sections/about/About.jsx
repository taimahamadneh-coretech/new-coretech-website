import { useEffect } from "react";
import { companyData } from '../../data/companyData';
import './about.css';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const cards = document.querySelectorAll(
      ".company-card, .vision-card, .mission-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section">
      <div className="section-container">

        <div className="section-header">
          <h2 className="section-title">
            {t('about.sectionTitle')}
          </h2>
        </div>

        <div className="company-card">
          <h3>{t('about.cardTitle')}</h3>
          <p>{companyData.description[lang]}</p>
        </div>

        <div className="vision-mission-grid">
          <div className="vision-card">
            <h3>{t('about.visionTitle')}</h3>
            <p>{companyData.vision[lang]}</p>
          </div>

          <div className="mission-card">
            <h3>{t('about.missionTitle')}</h3>
            <p>{companyData.mission[lang]}</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;