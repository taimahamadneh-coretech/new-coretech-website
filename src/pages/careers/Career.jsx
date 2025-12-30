import React, {useEffect , useState } from "react";
import './careers.css';
import CareerForm from './CareerForm'; 
import CanvasBackground from "../../components/CanvasBackground/CanvasBackground";
import { useTranslation } from "react-i18next";

export default function Careers() {
  const { t,i18n } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
    useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const openings = [
    {
      title: t("careers.salesExecutive"),
      location: t("careers.remote"),
      type: t("careers.contract"),
      description: t("careers.salesDescription")
    }
  ];

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedJob(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const formspreeURL = "https://formspree.io/f/xqargeeg";
      const response = await fetch(formspreeURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(t("careers.applicationSuccess", { job: selectedJob.title }));
      } else {
        alert(t("careers.applicationFailed"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(t("careers.applicationError"));
    } finally {
      handleCloseForm();
    }
  };

  return (
    <>
      <CanvasBackground/>
      <div className="careers-page">
        <header className="careers-hero">
          <h1>{t("careers.title")}</h1>
          <p>{t("careers.subtitle")}</p>
        </header>

        <section className="careers-openings">
          <h2>{t("careers.openPositions")}</h2>

          <div className="careers-job-list">
            {openings.map((job, index) => (
              <div className="careers-job-card" key={index}>
                <h3>{job.title}</h3>
                <p className="careers-job-meta">
                  {job.location} • {job.type}
                </p>
                <p className="careers-job-description">{job.description}</p>

                <button className="careers-apply-btn" onClick={() => handleApply(job)}>
                  {t("careers.applyNow")}
                </button>
              </div>
            ))}
          </div>
        </section>

        {showForm && selectedJob && (
          <div className="careers-form-overlay">
            <div className="careers-form-popup">
              <div className="careers-popup-header">
                <h2>{t("careers.applyFor", { job: selectedJob.title })}</h2>
                <button className="careers-close-btn" onClick={handleCloseForm}>
                  &times;
                </button>
              </div>
              
              <div className="careers-popup-content">
                <CareerForm 
                  onSubmit={handleFormSubmit} 
                  onCancel={handleCloseForm}
                  jobTitle={selectedJob.title}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
