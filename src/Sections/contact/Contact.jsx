
import { useState } from 'react';
import { companyData } from '../../data/companyData';
import './contact.css';
import { useTranslation } from 'react-i18next';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
        alert(t('contact.alertSuccess'));
      } else {
        alert(t('contact.alertError'));
      }
    } catch {
      alert(t('contact.alertNetworkError'));
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">{t('contact.sectionTitle')}</h2>
          <p className="section-subtitle">{t('contact.sectionSubtitle')}</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>{t('contact.infoTitle')}</h3>
            <div className="contact-details">
              <p>
                <strong>{t('contact.emailLabel')}</strong> {companyData.email}
              </p>
              <p>
                <strong>{t('contact.addressLabel')}</strong> {t('company.address')}
              </p>
            </div>
            <div className="contact-persons">
              {companyData.contacts.map((contact, index) => (
                <div key={index} className="contact-person">
                  <h4>{contact.name}</h4>
                  <p>{contact.position}</p>
                  <p>
                    <strong>{t('contact.phoneLabel')}</strong> {contact.phone}
                  </p>
                  <p>
                    <strong>{t('contact.emailLabel')}</strong> {contact.email}
                  </p>
                </div>
              ))}
            </div>
          </div>

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
  );
};

export default Contact;