import React from "react";
import "./groupcompanies.css";
import { useTranslation } from 'react-i18next';

import deltaLogo from "../../assets/icons/partners/delta.png";

import primerLogo from "../../assets/icons/partners/primer.png";



const GroupCompanies = () => {
    const { t } = useTranslation();
    const companies = [
        {
            company: "Delta Line International (DLI)",
            flag: deltaLogo,
            website: "https://deltaline-it.com/",
            description: t("groupCompanies.delta.description")
        },
        {
            company: "Primer Comercio",
            flag: primerLogo,
            website: "https://pclps.com",
            description: t("groupCompanies.primer.description")
        }
    ];
    return (
        <section className="group-section section">
            <div className="group-container">
                <h2 className="group-title">{t("groupCompanies.title")}</h2>
                <p className="group-subtitle">
                    {t("groupCompanies.subtitle")}
                </p>

                <div className="group-grid">
                    {companies.map((item, index) => (
                        <a
                            key={index}
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group-card"
                        >
                            <img
                                src={item.flag}
                                alt={item.company}
                                className="group-flag"
                            />
                            <h3 className="group-company">{item.company}</h3>
                            <p className="group-description">{item.description}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GroupCompanies;