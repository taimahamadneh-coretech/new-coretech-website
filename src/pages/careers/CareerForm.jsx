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
    universityGpa: "",
    tawjihiGpa: "",
    qualificationLevel: "",
    experienceYears: "",
    employer: "",
    currentSalary: "",
    jobTitle: jobTitle || "",
    skills: [""],
    languages: [""],
  });

  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({ open: false, message: "" });

  const validators = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    mobile: /^05\d{8}$/,
    tawjihiGpa: /^(100(\.0{1,2})?|(\d{1,2})(\.\d{1,2})?)$/,
    universityGpa: /^(4(\.0{1,2})?|([0-3])(\.\d{1,2})?)$/,
    experienceYears: /^\d+$/,
  };

  const validateField = (name, value, index = null) => {
    let error = "";

    if (!value) error = t("careers.requiredField");

    if (name === "email" && value && !validators.email.test(value))
      error = t("careers.invalidEmail");
    if (name === "mobile" && value && !validators.mobile.test(value))
      error = t("careers.invalidPhone");
    if (name === "tawjihiGpa" && value && !validators.tawjihiGpa.test(value))
      error = t("careers.invalidTawjihi");
    if (name === "universityGpa" && value && !validators.universityGpa.test(value))
      error = t("careers.invalidUniversityGpa");
    if (name === "experienceYears" && value && !validators.experienceYears.test(value))
      error = t("careers.invalidNumber");

    if ((name === "skills" || name === "languages") && value.trim() === "")
      error = t("careers.cannotBeEmpty");

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
    validateField(name, sanitized);
  };

  const handleArrayChange = (type, index, value) => {
    const updated = [...form[type]];
    updated[index] = value;
    setForm({ ...form, [type]: updated });
    validateField(type, value, index);
  };

  const addField = (type) => setForm({ ...form, [type]: [...form[type], ""] });
  const removeField = (type, index) =>
    setForm({ ...form, [type]: form[type].filter((_, i) => i !== index) });

  const isStepValid = () => {
    const stepFields =
      step === 0
        ? ["firstName", "lastName", "email", "mobile", "country", "city"]
        : step === 1
        ? ["tawjihiGpa", "universityGpa", "qualificationLevel"]
        : step === 2
        ? ["experienceYears"]
        : [];

    let valid = true;
    stepFields.forEach((f) => {
      if (!form[f] || (validators[f] && !validators[f].test(form[f]))) {
        valid = false;
        validateField(f, form[f]);
      }
    });

    if (step === 3) {
      form.skills.forEach((s, i) => { if (!validateField("skills", s, i)) valid = false; });
      form.languages.forEach((l, i) => { if (!validateField("languages", l, i)) valid = false; });
    }

    return valid;
  };

  const nextStep = () => { if (isStepValid()) setStep(step + 1); };
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
            <p>{modal.message}</p>
            <button onClick={() => setModal({ open: false, message: "" })}>{t("careers.ok")}</button>
          </div>
        </div>
      )}

      <form className="careers-form" onSubmit={handleSubmit}>
        <div className="careers-form-tabs">
          {[
            t("careers.tab.personal"),
            t("careers.tab.education"),
            t("careers.tab.experience"),
            t("careers.tab.skills")
          ].map((tLabel, i) => (
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
          <div className="careers-form-grid">
            {renderInput("universityGpa", t("careers.universityGpa"), "number")}
            <div className="careers-form-group">
              <select
                name="qualificationLevel"
                value={form.qualificationLevel}
                onChange={handleChange}
                className={errors.qualificationLevel ? "careers-error-input" : ""}
              >
                <option value="">{t("careers.qualificationLevel")}</option>
                <option>{t("careers.bachelor")}</option>
                <option>{t("careers.master")}</option>
                <option>{t("careers.phd")}</option>
              </select>
              {errors.qualificationLevel && <div className="careers-error-label">{errors.qualificationLevel}</div>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="careers-form-grid">
            {renderInput("experienceYears", t("careers.experienceYears"), "number")}
            <input name="employer" value={form.employer} onChange={handleChange} placeholder={t("careers.employer")} />
            <input name="currentSalary" value={form.currentSalary} onChange={handleChange} placeholder={t("careers.currentSalary")} />
            <input name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder={t("careers.jobTitle")} />
          </div>
        )}

        {step === 3 && (
          <>
            <h3>{t("careers.skills")}</h3>
            {form.skills.map((s, i) => (
              <div key={i} className="careers-dynamic-row">
                <input
                  value={s}
                  onChange={(e) => handleArrayChange("skills", i, e.target.value)}
                  placeholder={t("careers.skill")}
                  className={errors.skills?.[i] ? "careers-error-input" : ""}
                />
                {errors.skills?.[i] && <div className="careers-error-label">{errors.skills[i]}</div>}
                {i > 0 && <button type="button" onClick={() => removeField("skills", i)}>❌</button>}
              </div>
            ))}
            <button type="button" className="careers-add-btn" onClick={() => addField("skills")}>➕ {t("careers.addSkill")}</button>

            <h3>{t("careers.languages")}</h3>
            {form.languages.map((l, i) => (
              <div key={i} className="careers-dynamic-row">
                <input
                  value={l}
                  onChange={(e) => handleArrayChange("languages", i, e.target.value)}
                  placeholder={t("careers.language")}
                  className={errors.languages?.[i] ? "careers-error-input" : ""}
                />
                {errors.languages?.[i] && <div className="careers-error-label">{errors.languages[i]}</div>}
                {i > 0 && <button type="button" onClick={() => removeField("languages", i)}>❌</button>}
              </div>
            ))}
            <button type="button" className="careers-add-btn" onClick={() => addField("languages")}>➕ {t("careers.addLanguage")}</button>
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
    </>
  );
}
