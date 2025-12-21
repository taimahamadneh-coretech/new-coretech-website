import { companyData } from '../../data/companyData';
import { logoMap } from './logoMap';
import './clients.css';
import { useTranslation } from 'react-i18next';


const Clients = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
    return (
        <section id="clients" className="section clients-section">
            <div className="section-container">
                <div className="section-header">
                    <h2 className="section-title">
                          {t('clients.sectionTitle')}</h2>
                    <p className="section-subtitle">{t('clients.sectionSubtitle')}</p>
                </div>

                <div className="orbital-container">

                    <div className="orbital-ring orbital-ring-1">
                        {companyData.clients.slice(0, 5).map((client, index) => (
                            <div
                                key={`ring1-${index}`}
                                className="orbital-item"
                                style={{
                                    '--item-index': index,
                                    '--total-items': 5,
                                    '--ring-speed': '20s'
                                }}
                            >
                                <div className="client-orbital-circle">
                                    <img
                                        src={logoMap[client.logo]}
                                        alt={client.name[lang]}
                                        loading="lazy" 
                                        className="client-logo"
                                    />
                                </div>
                                <div className="client-name-overlay">{client.name[lang]}</div>
                            </div>
                        ))}
                    </div>

                    <div className="orbital-ring orbital-ring-2">
                        {companyData.clients.slice(5, 10).map((client, index) => (
                            <div
                                key={`ring2-${index}`}
                                className="orbital-item"
                                style={{
                                    '--item-index': index + 5,
                                    '--total-items': 5,
                                    '--ring-speed': '25s'
                                }}
                            >
                                <div className="client-orbital-circle">
                                    <img
                                        src={logoMap[client.logo]}
                                        alt={client.name[lang]}
                                        className="client-logo"
                                    />
                                </div>
                                <div className="client-name-overlay">{client.name[lang]}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Clients;
