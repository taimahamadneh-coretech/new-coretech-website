import { useState } from "react";
import "./careerform.css";
import { useTranslation } from "react-i18next";

export default function CareerForm({ onCancel, jobTitle }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    country: "",
    city: "",
    degrees: [{ degreeName: "", universityGpa: "", qualificationLevel: "" }],
    tawjihiGpa: "",
    experiences: [{
      jobTitle: "",
      company: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      currentlyWorking: false,
      description: ""
    }],
    jobTitle: jobTitle || "",
    skills: [""],
    languages: [""],
    skillLevels: ["intermediate"],
    languageLevels: ["B1"]
  });

  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({ open: false, message: "" });

  const validators = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    mobile: /^05\d{8}$/,
    universityGpa: /^(4(\.0{1,2})?|([0-3])(\.\d{1,2})?|0(\.\d{1,2})?)$/,
  };

  const validateField = (name, value, index = null) => {
    let error = "";
    
    if (!value && name !== "tawjihiGpa") {
      if (name === "degreeName") error = t("careers.requiredField");
      else if (name === "skills" || name === "languages") error = t("careers.cannotBeEmpty");
      else if (name !== "employer" && name !== "currentSalary") error = t("careers.requiredField");
    }
    
    if (value) {
      if (name === "email" && !validators.email.test(value))
        error = t("careers.invalidEmail");
      if (name === "mobile" && !validators.mobile.test(value))
        error = t("careers.invalidPhone");
      if (name === "universityGpa" && !validators.universityGpa.test(value))
        error = t("careers.invalidUniversityGpa");
    }

    setErrors((prev) => {
      if (index !== null) {
        const arrErrors = prev[name] ? [...prev[name]] : [];
        arrErrors[index] = error;
        return { ...prev, [name]: arrErrors };
      } else {
        return { ...prev, [name]: error };
      }
    });

    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitized = name === "mobile" ? value.replace(/\D/g, "") : value;
    setForm({ ...form, [name]: sanitized });
    
    if (name !== "skills" && name !== "languages") {
      validateField(name, sanitized);
    }
  };

  const handleArrayChange = (type, index, field, value) => {
    const updated = [...form[type]];
    
    if (type === "degrees") {
      updated[index] = { ...updated[index], [field]: value };
    } else if (type === "experiences") {
      updated[index] = { ...updated[index], [field]: value };
    } else {
      updated[index] = value;
    }
    
    setForm({ ...form, [type]: updated });
    
    if (type === "degrees" && (field === "degreeName" || field === "universityGpa" || field === "qualificationLevel")) {
      validateField(field, value, index);
    }
  };

  const addField = (type) => {
    if (type === "degrees") {
      setForm({ ...form, degrees: [...form.degrees, { degreeName: "", universityGpa: "", qualificationLevel: "" }] });
      setForm(prev => ({
        ...prev,
        skillLevels: [...prev.skillLevels, "intermediate"]
      }));
    } else if (type === "experiences") {
      setForm({ ...form, experiences: [...form.experiences, {
        jobTitle: "",
        company: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        currentlyWorking: false,
        description: ""
      }]});
    } else if (type === "skills") {
      setForm({ ...form, skills: [...form.skills, ""] });
      setForm(prev => ({
        ...prev,
        skillLevels: [...prev.skillLevels, "intermediate"]
      }));
    } else if (type === "languages") {
      setForm({ ...form, languages: [...form.languages, ""] });
      setForm(prev => ({
        ...prev,
        languageLevels: [...prev.languageLevels, "B1"]
      }));
    }
  };

  const removeField = (type, index) => {
    if (type === "degrees") {
      setForm({ ...form, degrees: form.degrees.filter((_, i) => i !== index) });
      setForm(prev => ({
        ...prev,
        skillLevels: prev.skillLevels.filter((_, i) => i !== index)
      }));
    } else if (type === "experiences") {
      setForm({ ...form, experiences: form.experiences.filter((_, i) => i !== index) });
    } else if (type === "skills") {
      setForm({ ...form, skills: form.skills.filter((_, i) => i !== index) });
      setForm(prev => ({
        ...prev,
        skillLevels: prev.skillLevels.filter((_, i) => i !== index)
      }));
    } else if (type === "languages") {
      setForm({ ...form, languages: form.languages.filter((_, i) => i !== index) });
      setForm(prev => ({
        ...prev,
        languageLevels: prev.languageLevels.filter((_, i) => i !== index)
      }));
    }
  };

  const isStepValid = () => {
    let valid = true;
    if (step === 0) {
      ["firstName", "lastName", "email", "mobile", "country", "city"].forEach(f => {
        if (!validateField(f, form[f])) valid = false;
      });
    } else if (step === 1) {
      form.degrees.forEach((deg, i) => {
        if (!validateField("degreeName", deg.degreeName, i)) valid = false;
        if (deg.universityGpa && !validateField("universityGpa", deg.universityGpa, i)) valid = false;
        if (!validateField("qualificationLevel", deg.qualificationLevel, i)) valid = false;
      });
    } else if (step === 2) {
    } else if (step === 3) {
      setErrors(prev => ({ ...prev, skills: [] }));
      
      form.skills.forEach((s, i) => { 
        if (s.trim() === "") {
          valid = false;
          setErrors(prev => {
            const skillsErrors = prev.skills ? [...prev.skills] : [];
            skillsErrors[i] = t("careers.cannotBeEmpty");
            return { ...prev, skills: skillsErrors };
          });
        }
      });
      
      setErrors(prev => ({ ...prev, languages: [] }));
      
      form.languages.forEach((l, i) => { 
        if (l.trim() === "") {
          valid = false;
          setErrors(prev => {
            const languagesErrors = prev.languages ? [...prev.languages] : [];
            languagesErrors[i] = t("careers.cannotBeEmpty");
            return { ...prev, languages: languagesErrors };
          });
        }
      });
    }
    return valid;
  };

  const nextStep = () => { 
    if (isStepValid()) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStepValid()) return;

    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/xqargeeg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setModal({
        open: true,
        message: res.ok ? t("careers.applicationSuccessForm") : t("careers.applicationFailedForm"),
      });
    } catch {
      setModal({ open: true, message: t("careers.networkError") });
    }
    setLoading(false);
  };

  const renderInput = (name, placeholder, type = "text") => (
    <div className="careers-form-group">
      <input
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={errors[name] ? "careers-error-input" : ""}
      />
      {errors[name] && <div className="careers-error-label">{errors[name]}</div>}
    </div>
  );

  return (
    <>
      {modal.open && (
        <div className="careers-modal-overlay">
          <div className="careers-modal">
            <button 
              className="careers-modal-close" 
              onClick={() => setModal({ open: false, message: "" })}
              aria-label="Close"
            >
              ×
            </button>
            <p>{modal.message}</p>
            <button onClick={() => setModal({ open: false, message: "" })}>{t("careers.ok")}</button>
          </div>
        </div>
      )}

      <div className="careers-form-wrapper">
        <form className="careers-form" onSubmit={handleSubmit}>
          <div className="careers-form-tabs">
            {[t("careers.tab.personal"), t("careers.tab.education"), t("careers.tab.experience"), t("careers.tab.skills")]
              .map((tLabel, i) => (
                <div key={i} className={`careers-tab ${step === i ? "active" : ""}`}>{tLabel}</div>
            ))}
          </div>

          {step === 0 && (
            <div className="careers-form-grid">
              {renderInput("firstName", t("careers.firstName"))}
              {renderInput("lastName", t("careers.lastName"))}
              {renderInput("email", t("careers.email"))}
              {renderInput("mobile", t("careers.mobile"), "text")}
              {renderInput("country", t("careers.country"))}
              {renderInput("city", t("careers.city"))}
            </div>
          )}

          {step === 1 && (
            <div className="careers-education-section">
              <h3>{t("careers.education")}</h3>

              <h4>{t("careers.universityDegrees")}</h4>
              {form.degrees.map((deg, i) => (
                <div key={i} className="careers-degree-card">
                  <div className="careers-degree-header">
                    <span>{t("careers.degree")} #{i + 1}</span>
                    {i > 0 && (
                      <button 
                        type="button" 
                        className="careers-remove-btn"
                        onClick={() => removeField("degrees", i)}
                        aria-label={t("careers.removeDegree")}
                      >
                        ❌ {t("careers.remove")}
                      </button>
                    )}
                  </div>
                  
                  <div className="careers-form-grid">
                    <div className="careers-form-group">
                      <label>{t("careers.degreeName")} *</label>
                      <input
                        type="text"
                        value={deg.degreeName}
                        onChange={(e) => handleArrayChange("degrees", i, "degreeName", e.target.value)}
                        placeholder={t("careers.degreeNamePlaceholder")}
                        className={errors.degreeName?.[i] ? "careers-error-input" : ""}
                        required
                      />
                      {errors.degreeName?.[i] && (
                        <div className="careers-error-label">{errors.degreeName[i]}</div>
                      )}
                    </div>

                    <div className="careers-form-group">
                      <label>{t("careers.qualificationLevel")} *</label>
                      <select
                        value={deg.qualificationLevel}
                        onChange={(e) => handleArrayChange("degrees", i, "qualificationLevel", e.target.value)}
                        className={errors.qualificationLevel?.[i] ? "careers-error-input" : ""}
                        required
                      >
                        <option value="">{t("careers.selectLevel")}</option>
                        <option value="bachelor">{t("careers.bachelor")}</option>
                        <option value="master">{t("careers.master")}</option>
                        <option value="phd">{t("careers.phd")}</option>
                        <option value="diploma">{t("careers.diploma")}</option>
                        <option value="associate">{t("careers.associate")}</option>
                      </select>
                      {errors.qualificationLevel?.[i] && (
                        <div className="careers-error-label">{errors.qualificationLevel[i]}</div>
                      )}
                    </div>

                    <div className="careers-form-group">
                      <label>{t("careers.universityGpa")}</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="4"
                        value={deg.universityGpa}
                        onChange={(e) => handleArrayChange("degrees", i, "universityGpa", e.target.value)}
                        placeholder="0.00 - 4.00"
                        className={errors.universityGpa?.[i] ? "careers-error-input" : ""}
                      />
                      {errors.universityGpa?.[i] && (
                        <div className="careers-error-label">{errors.universityGpa[i]}</div>
                      )}
                      <div className="careers-hint">{t("careers.universityGpaHint")}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                type="button" 
                className="careers-add-btn" 
                onClick={() => addField("degrees")}
              >
                ➕ {t("careers.addAnotherDegree")}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="careers-experience-section">
              <div className="careers-section-header">
                <h3>{t("careers.experience")}</h3>
                <p className="careers-section-description">{t("careers.experienceDescription")}</p>
              </div>
              
              <div className="experiences-list">
                {form.experiences?.map((experience, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <h4>{t("careers.experience")} #{index + 1}</h4>
                      {index > 0 && (
                        <button
                          type="button"
                          className="remove-experience-btn"
                          onClick={() => {
                            const experiences = [...form.experiences];
                            experiences.splice(index, 1);
                            setForm({...form, experiences: experiences});
                          }}
                          aria-label={t("careers.removeExperience")}
                        >
                          ×
                        </button>
                      )}
                    </div>
                    
                    <div className="careers-form-grid">
                      <div className="careers-form-group">
                        <label>{t("careers.jobTitle")}</label>
                        <input
                          value={experience.jobTitle || ""}
                          onChange={(e) => {
                            const experiences = [...form.experiences];
                            experiences[index].jobTitle = e.target.value;
                            setForm({...form, experiences: experiences});
                          }}
                          placeholder={t("careers.jobTitlePlaceholder")}
                        />
                      </div>
                      
                      <div className="careers-form-group">
                        <label>{t("careers.company")}</label>
                        <input
                          value={experience.company || ""}
                          onChange={(e) => {
                            const experiences = [...form.experiences];
                            experiences[index].company = e.target.value;
                            setForm({...form, experiences: experiences});
                          }}
                          placeholder={t("careers.companyPlaceholder")}
                        />
                      </div>
                      
                      <div className="careers-form-group">
                        <label>{t("careers.startDate")}</label>
                        <div className="date-inputs">
                          <select
                            value={experience.startMonth || ""}
                            onChange={(e) => {
                              const experiences = [...form.experiences];
                              experiences[index].startMonth = e.target.value;
                              setForm({...form, experiences: experiences});
                            }}
                            className="month-select"
                          >
                            <option value="">{t("careers.month")}</option>
                            <option value="01">{t("careers.jan")}</option>
                            <option value="02">{t("careers.feb")}</option>
                            <option value="03">{t("careers.mar")}</option>
                            <option value="04">{t("careers.apr")}</option>
                            <option value="05">{t("careers.may")}</option>
                            <option value="06">{t("careers.jun")}</option>
                            <option value="07">{t("careers.jul")}</option>
                            <option value="08">{t("careers.aug")}</option>
                            <option value="09">{t("careers.sep")}</option>
                            <option value="10">{t("careers.oct")}</option>
                            <option value="11">{t("careers.nov")}</option>
                            <option value="12">{t("careers.dec")}</option>
                          </select>
                          
                          <select
                            value={experience.startYear || ""}
                            onChange={(e) => {
                              const experiences = [...form.experiences];
                              experiences[index].startYear = e.target.value;
                              setForm({...form, experiences: experiences});
                            }}
                            className="year-select"
                          >
                            <option value="">{t("careers.year")}</option>
                            {Array.from({length: 40}, (_, i) => {
                              const year = new Date().getFullYear() - i;
                              return <option key={year} value={year}>{year}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                      
                      <div className="careers-form-group">
                        <label>{t("careers.endDate")}</label>
                        <div className="date-inputs">
                          <select
                            value={experience.endMonth || ""}
                            onChange={(e) => {
                              const experiences = [...form.experiences];
                              experiences[index].endMonth = e.target.value;
                              setForm({...form, experiences: experiences});
                            }}
                            className="month-select"
                            disabled={experience.currentlyWorking}
                          >
                            <option value="">{t("careers.month")}</option>
                            <option value="01">{t("careers.jan")}</option>
                            <option value="02">{t("careers.feb")}</option>
                            <option value="03">{t("careers.mar")}</option>
                            <option value="04">{t("careers.apr")}</option>
                            <option value="05">{t("careers.may")}</option>
                            <option value="06">{t("careers.jun")}</option>
                            <option value="07">{t("careers.jul")}</option>
                            <option value="08">{t("careers.aug")}</option>
                            <option value="09">{t("careers.sep")}</option>
                            <option value="10">{t("careers.oct")}</option>
                            <option value="11">{t("careers.nov")}</option>
                            <option value="12">{t("careers.dec")}</option>
                          </select>
                          
                          <select
                            value={experience.endYear || ""}
                            onChange={(e) => {
                              const experiences = [...form.experiences];
                              experiences[index].endYear = e.target.value;
                              setForm({...form, experiences: experiences});
                            }}
                            className="year-select"
                            disabled={experience.currentlyWorking}
                          >
                            <option value="">{t("careers.year")}</option>
                            {Array.from({length: 40}, (_, i) => {
                              const year = new Date().getFullYear() - i;
                              return <option key={year} value={year}>{year}</option>;
                            })}
                          </select>
                        </div>
                        
                        <div className="currently-working-checkbox">
                          <input
                            type="checkbox"
                            id={`currentlyWorking-${index}`}
                            checked={experience.currentlyWorking || false}
                            onChange={(e) => {
                              const experiences = [...form.experiences];
                              experiences[index].currentlyWorking = e.target.checked;
                              if (e.target.checked) {
                                experiences[index].endMonth = "";
                                experiences[index].endYear = "";
                              }
                              setForm({...form, experiences: experiences});
                            }}
                          />
                          <label htmlFor={`currentlyWorking-${index}`}>
                            {t("careers.iCurrentlyWorkHere")}
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="careers-form-group">
                      <label>{t("careers.description")}</label>
                      <textarea
                        value={experience.description || ""}
                        onChange={(e) => {
                          const experiences = [...form.experiences];
                          experiences[index].description = e.target.value;
                          setForm({...form, experiences: experiences});
                        }}
                        placeholder={t("careers.descriptionPlaceholder")}
                        rows="3"
                        className="experience-description"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                type="button"
                className="add-experience-btn"
                onClick={() => addField("experiences")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {t("careers.addExperience")}
              </button>
              
              <div className="optional-message">
                <p>{t("careers.experienceOptional")}</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <>
              <div className="careers-skills-section">
                <div className="careers-section-header">
                  <h3>{t("careers.skills")}</h3>
                  <p className="careers-section-description">{t("careers.skillsDescription")}</p>
                </div>
                
                <div className="skills-container">
                  {form.skills.map((skill, i) => (
                    <div key={i} className="skill-item">
                      <div className="skill-content">
                        <div className="skill-number">#{i + 1}</div>
                        <input
                          value={skill}
                          onChange={(e) => {
                            handleArrayChange("skills", i, null, e.target.value);
                            // Clear error when user starts typing
                            setErrors(prev => {
                              const skillsErrors = prev.skills ? [...prev.skills] : [];
                              if (e.target.value.trim() !== "") {
                                skillsErrors[i] = "";
                              }
                              return { ...prev, skills: skillsErrors };
                            });
                          }}
                          placeholder={t("careers.skillPlaceholder")}
                          className={errors.skills?.[i] ? "careers-error-input" : ""}
                        />
                        <div className="skill-level-selector">
                          <select
                            value={form.skillLevels?.[i] || "intermediate"}
                            onChange={(e) => {
                              const levels = [...(form.skillLevels || [])];
                              levels[i] = e.target.value;
                              setForm({...form, skillLevels: levels});
                            }}
                          >
                            <option value="beginner">{t("careers.beginner")}</option>
                            <option value="intermediate">{t("careers.intermediate")}</option>
                            <option value="advanced">{t("careers.advanced")}</option>
                            <option value="expert">{t("careers.expert")}</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="skill-actions">
                        {errors.skills?.[i] && <div className="careers-error-label">{errors.skills[i]}</div>}
                        {i > 0 && (
                          <button 
                            type="button" 
                            className="skill-remove-btn"
                            onClick={() => removeField("skills", i)}
                            aria-label={t("careers.removeSkill")}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  type="button" 
                  className="careers-add-btn-large" 
                  onClick={() => addField("skills")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  {t("careers.addSkill")}
                </button>
              </div>

              <div className="careers-languages-section">
                <div className="careers-section-header">
                  <h3>{t("careers.languages")}</h3>
                  <p className="careers-section-description">{t("careers.languagesDescription")}</p>
                </div>
                
                <div className="languages-container">
                  {form.languages.map((language, i) => (
                    <div key={i} className="language-item">
                      <div className="language-content">
                        <div className="language-flag">
                          <span>🌐</span>
                        </div>
                        <input
                          value={language}
                          onChange={(e) => {
                            handleArrayChange("languages", i, null, e.target.value);
                            setErrors(prev => {
                              const languagesErrors = prev.languages ? [...prev.languages] : [];
                              if (e.target.value.trim() !== "") {
                                languagesErrors[i] = "";
                              }
                              return { ...prev, languages: languagesErrors };
                            });
                          }}
                          placeholder={t("careers.languagePlaceholder")}
                          className={errors.languages?.[i] ? "careers-error-input" : ""}
                        />
                        
                        <div className="language-proficiency">
                          <div className="proficiency-buttons">
                            {["A1", "A2", "B1", "B2", "C1", "C2", "Native"].map((level) => (
                              <button
                                key={level}
                                type="button"
                                className={`proficiency-btn ${form.languageLevels?.[i] === level ? 'active' : ''}`}
                                onClick={() => {
                                  const levels = [...(form.languageLevels || [])];
                                  levels[i] = level;
                                  setForm({...form, languageLevels: levels});
                                }}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="language-actions">
                        {errors.languages?.[i] && <div className="careers-error-label">{errors.languages[i]}</div>}
                        {i > 0 && (
                          <button 
                            type="button" 
                            className="language-remove-btn"
                            onClick={() => removeField("languages", i)}
                            aria-label={t("careers.removeLanguage")}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  type="button" 
                  className="careers-add-btn-large" 
                  onClick={() => addField("languages")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  {t("careers.addLanguage")}
                </button>
                
                <div className="proficiency-guide">
                  <h4>{t("careers.proficiencyGuide")}</h4>
                  <div className="guide-grid">
                    <div className="guide-item">
                      <span className="guide-level beginner">A1-A2</span>
                      <span>{t("careers.beginnerLevel")}</span>
                    </div>
                    <div className="guide-item">
                      <span className="guide-level intermediate">B1-B2</span>
                      <span>{t("careers.intermediateLevel")}</span>
                    </div>
                    <div className="guide-item">
                      <span className="guide-level advanced">C1-C2</span>
                      <span>{t("careers.advancedLevel")}</span>
                    </div>
                    <div className="guide-item">
                      <span className="guide-level native">Native</span>
                      <span>{t("careers.nativeLevel")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="careers-form-buttons">
            {step > 0 && <button type="button" className="careers-cancel-btn" onClick={prevStep}>{t("careers.back")}</button>}
            {step < 3 ? (
              <button type="button" className="careers-apply-btn" onClick={nextStep}>{t("careers.next")}</button>
            ) : (
              <button type="submit" className="careers-apply-btn" disabled={loading}>
                {loading ? t("careers.submitting") : t("careers.submitApplication")}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
