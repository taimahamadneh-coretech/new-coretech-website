import React, { useState } from 'react';
import './feedback.css';
import { useTranslation } from 'react-i18next';

const Feedback = () => {
    const { t } = useTranslation();
  const testimonials = [
    {
      rating: "5.0",
      comment: t('feedback.woodenPoles.comment'),
      initials: "EC",
      name: t('feedback.woodenPoles.name'),
      position: t('feedback.woodenPoles.position')
    },
    {
      rating: "5.0",
      comment: t('feedback.fiber.comment'),
      initials: "TN",
      name: t('feedback.fiber.name'),
      position: t('feedback.fiber.position')
    },
    {
      rating: "5.0",
      comment: t('feedback.cyber.comment'),
      initials: "GE",
      name: t('feedback.cyber.name'),
      position: t('feedback.cyber.position')
    },
    {
      rating: "5.0",
      comment: t('feedback.softwareAi.comment'),
      initials: "DS",
      name: t('feedback.softwareAi.name'),
      position: t('feedback.softwareAi.position')
    },
    {
      rating: "5.0",
      comment: t('feedback.ecommerce.comment'), 
      initials: "OB",
      name: t('feedback.ecommerce.name'),
      position: t('feedback.ecommerce.position')
    },
    {
      rating: "4.8",
      comment: t('feedback.steel.comment'),
      initials: "TC",
      name: t('feedback.steel.name'),
      position: t('feedback.steel.position')
    }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '☆'}
        {'✩'.repeat(emptyStars)}
      </>
    );
  };

  const nextSlide = () => {
    if (currentIndex < testimonials.length - 3) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(testimonials.length - 3);
    }
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  return (
    <section className="feedback-section section">
      <div className="feedback-container">
        <div className="feedback-header">
           <h2 className="feedback-title">{t('feedback.title')}</h2>
          <p className="feedback-subtitle">{t('feedback.subtitle')}</p>
        </div>
        
        <div className="feedback-content">
          <div className="carousel-container">
            <button 
              className="carousel-btn carousel-btn-prev" 
              onClick={prevSlide}
              aria-label="Previous testimonials"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="testimonials-grid">
              {visibleTestimonials.map((testimonial, index) => (
                <div className="testimonial-card" key={index}>
                  <div className="testimonial-rating">
                    <span className="rating-value">{testimonial.rating}</span>
                    <div className="stars">
                      {renderStars(parseFloat(testimonial.rating))}
                    </div>
                  </div>
                  <p className="testimonial-comment">{testimonial.comment}</p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <span className="author-name">{testimonial.name}</span>
                      <span className="author-position">{testimonial.position}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="carousel-btn carousel-btn-next" 
              onClick={nextSlide}
              aria-label="Next testimonials"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="carousel-indicators">
            {Array.from({ length: testimonials.length - 2 }).map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;