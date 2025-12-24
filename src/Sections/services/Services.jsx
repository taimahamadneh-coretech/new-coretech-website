import { companyData } from '../../data/companyData';
import './services.css';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <section id="services" className="section services-section">
      <div className="section-container">

        <div className="section-header">
          <h2 className="section-title">
            {t('services.sectionTitle')}
          </h2>
          <p className="section-subtitle">
            {t('services.sectionSubtitle')}
          </p>
        </div>

        <div className="services-grid">
          {companyData.services.map((service, index) => (
            <div key={index} className="service-card">

              <div className="service-header">
                <a
                  href={service.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-logo-link"
                >
                  <img
                    src={service.logo}
                    alt={service.provider}
                    className="service-logo"
                  />
                </a>

                <div className="service-header-text">
                  <h3 className="service-category">
                    {service.category[lang]}
                  </h3>
                  <p className="service-provider">
                    {service.provider}
                  </p>
                </div>
              </div>

              <p className="service-description">
                {service.description[lang]}
              </p>

              <div className="services-content-grid">
                <div className="service-offerings">
                  <h4>{t('services.offeredTitle')}</h4>
                  <ul className="service-list">
                    {service.offerings.map((offering, idx) => (
                      <li key={idx}>
                        {offering[lang]}
                      </li>
                    ))}
                  </ul>
                </div>

                {service.features && (
                  <div className="service-offerings">
                    <h4>{t('services.featuresTitle')}</h4>
                    <ul className="service-list">
                      {service.features.map((feature, idx) => (
                        <li key={idx}>
                          {feature[lang]}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {service.partners && (
                <div className="service-partners">
                  <h4>{t('services.partnersTitle')}</h4>
                  <div className="partners-grid">
                    {service.partners.map((partner, idx) => (
                      <span key={idx} className="partner-badge">
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
