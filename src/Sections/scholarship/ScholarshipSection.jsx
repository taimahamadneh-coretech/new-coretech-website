import React, { useState } from "react";
import "./ScholarshipSection.css";
import universityLogo from "../../assets/university.png";
import usersLogo from "../../assets/searching.png";
import checklistLogo from "../../assets/checklist.png";
import starLogo from "../../assets/dart.png";
const scholarship = {
  title: "منحة البكالوريوس لجامعات فلسطين 2026",

  universities: [
    "جامعة بيرزيت",
    "جامعة النجاح الوطنية",
    "جامعة القدس المفتوحة"
  ],

  lookingFor: [
    "طلبة الثانوية العامة المتوقع تخرجهم في العام الدراسي 2026/2027.",
    "الطلبة الذين لديهم سجل مثبت في المشاركة بالأنشطة والخدمات المجتمعية.",
    "الطلبة الفلسطينيون."
  ],

  requirements: [
    "أن يكون المتقدم فلسطينياً.",
    "أن يكون من المتوقع تخرجه من الثانوية العامة خلال العام الدراسي 2026/2027.",
    "أن يمتلك خبرة في العمل التطوعي أو المشاركة في الخدمات المجتمعية مع وجود إثباتات أو شهادات داعمة.",
    "الالتزام باستكمال جميع متطلبات التقديم ضمن المواعيد المحددة."
  ],

  whyOurScholarship: {
    title: "لماذا منحتنا؟",
    description:
      "نؤمن بأن الاستثمار في الشباب المتميزين أكاديمياً ومجتمعياً هو استثمار في مستقبل فلسطين. تهدف منحتنا إلى دعم الطلبة الذين يجمعون بين التفوق، وروح المبادرة، وخدمة المجتمع، ومنحهم فرصة لمواصلة تعليمهم الجامعي في أفضل الجامعات الفلسطينية. كما نسعى إلى بناء جيل من القادة القادرين على إحداث أثر إيجابي في مجتمعاتهم، من خلال توفير الدعم المالي، وتشجيع التميز، وتعزيز ثقافة المسؤولية المجتمعية."
  }
};
const timeline = [
  {
    title: "مدة التقديم",
    date: "1 آب 2026",
  },
  {
    title: "إغلاق التسجيل",
    date: "31 آب 2026",
  },
  {
    title: "مراجعة الطلبات",
    date: "1 - 5 أيلول 2026",
  },
  {
    title: "إجراء المقابلات",
    date: "10 أيلول 2026",
  },
];

export default function ScholarshipSection() {
  const renderListSection = (title, items, icon) => (
  <div className="info-card">
    <h3 className="info-card__title">
      <span>{icon}</span>
      {title}
    </h3>

    <ul className="info-card__list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);
  return (
    <section className="section " id="scholarship" dir="rtl">
      <div className="section-container">
         
              <header className="section-header">
          <h2 className="section-title ">{scholarship.title}</h2>
           </header>
          <p className="scholarship__desc">{scholarship.description}</p>
          <div className="scholarship__timeline">
            <h3 className="scholarship__timeline-title">
              الجدول الزمني للمنحة
            </h3>

            <div className="timeline-chain">
              {timeline.map((item, index) => (
                <React.Fragment key={item.title}>
                  <div className="timeline-step">
                    <div className="timeline-circle">{index + 1}</div>
                    <div className="timeline-content">
                      <h4>{item.title}</h4>
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {index !== timeline.length - 1 && (
                    <div className="timeline-arrow">➜</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="scholarship-info">
  {renderListSection(
    "الجامعات المشمولة",
    scholarship.universities,
    "🎓"
  )}

  {renderListSection(
    "من نبحث؟",
    scholarship.lookingFor,
    "👥"
  )}

  {renderListSection(
    "شروط التقديم",
    scholarship.requirements,
    "✅"
  )}

  <div className="info-card why-card">
    <h3 className="info-card__title">
      <span>⭐</span>
      {scholarship.whyOurScholarship.title}
    </h3>

    <p className="why-card__text">
      {scholarship.whyOurScholarship.description}
    </p>
  </div>
</div>
      </div>
    </section>
  );
}