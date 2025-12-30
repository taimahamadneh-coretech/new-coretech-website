import { useState, useEffect } from 'react';
import { companyData } from '../../data/companyData';
import './contact.css';
import { useTranslation } from 'react-i18next';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const FormPopup = ({ isOpen, type, message, onClose }) => {  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getPopupStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'var(--success-bg, #d4edda)',
          borderColor: 'var(--success-border, #c3e6cb)',
          textColor: 'var(--success-text, #155724)',
          icon: '✓'
        };
      case 'error':
        return {
          bgColor: 'var(--error-bg, #f8d7da)',
          borderColor: 'var(--error-border, #f5c6cb)',
          textColor: 'var(--error-text, #721c24)',
          icon: '✗'
        };
      default:
        return {
          bgColor: 'var(--info-bg, #d1ecf1)',
          borderColor: 'var(--info-border, #bee5eb)',
          textColor: 'var(--info-text, #0c5460)',
          icon: 'ℹ'
        };
    }
  };

  const styles = getPopupStyles();

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div 
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: styles.bgColor,
          border: `2px solid ${styles.borderColor}`,
          color: styles.textColor
        }}
      >
        <button className="popup-close" onClick={onClose}>×</button>
        <div className="popup-icon" style={{ color: styles.textColor }}>
          {styles.icon}
        </div>
        <div className="popup-message">{message}</div>
        <div className="popup-progress">
          <div 
            className="popup-progress-bar"
            style={{ backgroundColor: styles.textColor }}
          />
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const { t, i18n } = useTranslation();

  const countryByLang = {
    ar: 'PS',
    en: 'US'
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [phoneError, setPhoneError] = useState('');
  const [popup, setPopup] = useState({
    isOpen: false,
    type: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
    if (phoneError) setPhoneError('');
    if (errors.phone) {
      setErrors({
        ...errors,
        phone: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = t('contact.errors.nameRequired');
    if (!formData.email.trim()) newErrors.email = t('contact.errors.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('contact.errors.emailInvalid');

    if (!formData.phone) {
      newErrors.phone = t('contact.errors.phoneRequired');
      setPhoneError(t('contact.errors.phoneRequired'));
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = t('contact.errors.phoneInvalid');
      setPhoneError(t('contact.errors.phoneInvalid'));
    }

    if (!formData.subject.trim()) newErrors.subject = t('contact.errors.subjectRequired');
    if (!formData.message.trim()) newErrors.message = t('contact.errors.messageRequired');

    return newErrors;
  };

  const showPopup = (type, message) => {
    setPopup({
      isOpen: true,
      type,
      message
    });
  };

  const closePopup = () => {
    setPopup({
      isOpen: false,
      type: '',
      message: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      showPopup('error', t('contact.alertError'));
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xqargeeg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setErrors({});
        setPhoneError('');
        showPopup('success', t('contact.alertSuccess'));
      } else {
        showPopup('error', t('contact.alertError'));
      }
    } catch {
      showPopup('error', t('contact.alertNetworkError'));
    }
  };

  return (
    <>
      <FormPopup
        isOpen={popup.isOpen}
        type={popup.type}
        message={popup.message}
        onClose={closePopup}
      />

      <section id="contact" className="section contact-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">{t('contact.sectionTitle')}</h2>
            <p className="section-subtitle">{t('contact.sectionSubtitle')}</p>
          </div>

          <div className="contact-content">
            <form onSubmit={handleSubmit} className="contact-form" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
              <h3>{t('contact.formTitle')}</h3>

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder={t('contact.form.name')}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder={t('contact.form.email')}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <PhoneInput
                  international
                  defaultCountry={countryByLang[i18n.language] || 'US'}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder={t('contact.form.phone')}
                  className={`phone-wrapper ${errors.phone ? 'error' : ''} form-input`}
                  countrySelectProps={{
                    unicodeFlags: true
                  }}
                />
                {(errors.phone || phoneError) && (
                  <span className="error-message">{errors.phone || phoneError}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`form-input ${errors.subject ? 'error' : ''}`}
                  placeholder={t('contact.form.subject')}
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder={t('contact.form.message')}
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <button type="submit" className="form-submit">
                {t('contact.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
