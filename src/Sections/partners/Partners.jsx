import './partners.css';
import partners from './partnersData';
import { useTranslation } from 'react-i18next';
 
const Partners = () => {
  const { t } = useTranslation();
  return (
    <section  className="partners-section section">
      <div className="section-header">
        <h2 className="section-title">{t('partners.sectionTitle')}</h2>
        <p className="section-subtitle">{t('partners.sectionSubtitle')}</p>
      </div>

      <div className="partners-slider">
        <div className="partners-track">
          {[...partners, ...partners].map((partner, index) => (
            <div className="partner-logo" key={index}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.name}
              >
                <img src={partner.logo} alt={partner.name} />
              </a>
            </div>
          ))}
 
        </div>
      </div>
    </section>
  );
};
 
export default Partners;