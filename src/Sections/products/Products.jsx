import { useState } from "react";
import { companyData } from "../../data/companyData";
import "./products.css";
import { useTranslation } from "react-i18next";

import {
  GiElectric,
  GiNetworkBars,
  GiCircuitry,
  GiToolbox,
  GiRadarDish,
  GiRadioTower,
  GiWalkieTalkie,
  GiSatelliteCommunication,
  GiCctvCamera,
} from "react-icons/gi";

import {
  FaProjectDiagram,
  FaBroadcastTower,
  FaMobileAlt,
  FaCamera,
  FaServer,
} from "react-icons/fa";

import { MdHeadsetMic } from "react-icons/md";

const productIcons = {
  "Wooden Poles": <GiElectric />,
  "Fiber Cables and Accessories": <GiNetworkBars />,
  "FTTx Core Network": <GiCircuitry />,
  "Tools and Testing Equipment": <GiToolbox />,
  "GIS and Project Management Software": <FaProjectDiagram />,
  "ONUs and Access Points": <GiRadarDish />,
  "Steel Structures for Radio Towers": <GiRadioTower />,

  "DMR Radio Solutions": <GiWalkieTalkie />,
  "TETRA Radio Systems": <FaBroadcastTower />,
  "PTT over Cellular (PoC)": <FaMobileAlt />,
  "Broadband Terminals & Systems": <FaServer />,
  "Body Worn Cameras": <FaCamera />,
  "Two-Way Radio Types": <GiWalkieTalkie />,
  "Satellite Communication": <GiSatelliteCommunication />,
  "Integrated Communication Solutions": <GiCctvCamera />,
  "Quail Wearable Communication Devices": <MdHeadsetMic />,
};

const Products = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [showAll, setShowAll] = useState(false);

  const products = companyData.products[0].items;
  const visibleProducts = showAll ? products : products.slice(0, 6);

  return (
    <section id="products" className="section products-section">
      <div className="section-container">

        <div className="section-header">
          <h2 className="section-title">{t('products.sectionTitle')}</h2>
          <p className="section-subtitle">
            {t('products.sectionSubtitle')}
          </p>
        </div>

        <div className="products-grid">
          {visibleProducts.map((product, index) => (
            <div key={index} className="product-card">

              <div className="product-icon">
                {productIcons[product.title.en]}
              </div>

              <h3 className="product-title">{product.title[lang]}</h3>
              <p className="product-description">
                {product.description[lang]}
              </p>

            </div>
          ))}
        </div>

      {products.length > 6 && (
  <div className="see-more-wrapper">
    <button
      className="see-more-btn"
      onClick={() => setShowAll(!showAll)}
    >
      {showAll
        ? t('products.seeLess') || 'See Less'
        : t('products.seeMore') || 'See More'}
    </button>
  </div>
)}

      </div>
    </section>
  );
};

export default Products;
