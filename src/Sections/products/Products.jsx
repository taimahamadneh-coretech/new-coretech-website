import { companyData } from '../../data/companyData';
import './products.css';
import { useTranslation } from 'react-i18next';

import {
  GiElectric,
  GiNetworkBars,
  GiCircuitry,
  GiToolbox,
  GiRadarDish,
  GiRadioTower
} from 'react-icons/gi';

import { FaProjectDiagram } from 'react-icons/fa';

const productIcons = {
  "Wooden Poles": <GiElectric />,
  "Fiber Cables and Accessories": <GiNetworkBars />,
  "FTTx Core Network": <GiCircuitry />,
  "Tools and Testing Equipment": <GiToolbox />,
  "GIS and Project Management Software": <FaProjectDiagram />,
  "ONUs and Access Points": <GiRadarDish />,
  "Steel Structures for Radio Towers": <GiRadioTower />
};

 
const Products = () => {
    const { t,i18n } = useTranslation();
  const lang = i18n.language; 
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
          {companyData.products[0].items.map((product, index) => (
            <div key={index} className="product-card">
              
              <div className="product-icon">
                {productIcons[product.title.en]}
              </div>

              <h3 className="product-title">{product.title[lang]}</h3>
              <p className="product-description">{product.description[lang]}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Products;
