import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import woodenPoles1 from "../../assets/projects/woodenPoles1.jpeg";
import woodenPoles2 from "../../assets/projects/woodenPoles2.jpeg";
import woodenPoles3 from "../../assets/projects/woodenPoles3.jpeg";
import woodenPoles4 from "../../assets/projects/woodenPoles4.jpeg";
import woodenPoles5 from "../../assets/projects/woodenPoles5.jpeg";
import woodenPoles6 from "../../assets/projects/woodenPoles6.jpeg";

import padelCourt1 from "../../assets/projects/padelCourt1.jpeg";
import padelCourt2 from "../../assets/projects/padelCourt2.jpeg";
import padelCourt3 from "../../assets/projects/padelCourt3.jpeg";

import fiberCable1 from "../../assets/projects/cables1.jpeg";
import fiberCable2 from "../../assets/projects/cables2.jpeg";
import fiberCable3 from "../../assets/projects/cables3.jpeg";

import cabent1 from "../../assets/projects/cabent1.jpeg";
import cabent2 from "../../assets/projects/cabent2.jpeg";
import cabent3 from "../../assets/projects/cabent3.jpeg";
import cabent4 from "../../assets/projects/cabent4.jpeg";
import cabent5 from "../../assets/projects/cabent5.jpeg";

import "./ProjectsSection.css";

const projects = [
  {
        title: {
      en: "Wooden Utility Pole Installation",
      ar: "تركيب أعمدة الكهرباء الخشبية",
    },
    description: {
      en: "Supply  of treated wooden utility poles for a regional power distribution upgrade, including site survey, foundation work, and line stringing.",
      ar: "توريد وتركيب أعمدة كهرباء خشبية معالجة ضمن مشروع تطوير شبكة توزيع الكهرباء، ويشمل المسح الميداني، وأعمال القواعد، وتمديد خطوط الكهرباء.",
    },
    tags: {
      en: ["2025"],
      ar: [ "٢٠٢٥"],
    },
    images: [
      woodenPoles1,
      woodenPoles2,
      woodenPoles3,
      woodenPoles4,
      woodenPoles5,
      woodenPoles6,
    ],
  },
  {
     title: {
      en: "Padel Court Construction",
      ar: "إنشاء ملاعب البادل",
    },
    description: {
      en: "Complete construction of a two-court padel facility including sub-base preparation, drainage, synthetic turf installation, glass and steel structure, fencing, and LED floodlighting.",
      ar: "تنفيذ مشروع متكامل لإنشاء ملعبي بادل، يشمل تجهيز البنية التحتية، ونظام تصريف المياه، وتركيب العشب الصناعي، والهيكل الزجاجي والحديدي، والأسوار، وإنارة LED.",
    },
    tags: {
      en: ["Nablus", "2 Courts", "2026"],
      ar: ["نابلس", "ملعبان", "٢٠٢٦"],
    },
    images: [padelCourt1, padelCourt2, padelCourt3],
  },
  {
     title: {
      en: "Fiber Optic Cable Network",
      ar: "شبكة كابلات الألياف الضوئية",
    },
    description: {
      en: "Underground fiber optic network connecting multiple neighborhoods, including trenching, duct installation, fiber splicing, testing, and commissioning.",
      ar: "تنفيذ شبكة ألياف ضوئية تحت الأرض لربط عدة مناطق، وتشمل أعمال الحفر، وتمديد القنوات، ولحام الألياف الضوئية، والاختبارات، والتشغيل النهائي.",
    },
    tags: {
      en: ["Regional Network", "2024"],
      ar: ["شبكة إقليمية","٢٠٢٤"],
    },
    images: [
      fiberCable1,
      fiberCable2,
      fiberCable3,
    ],
  },
    {
title: { en: "Electrical Cabinets Supply", 
  ar: "توريد صناديق الكهرباء ", },
   description: { en: "Supply and import of electrical cabinets for power distribution and control systems, ensuring compliance with project specifications and international quality standards.", ar: "توريد واستيراد صناديق الكهرباء  الخاصة بأنظمة توزيع وتحكم الطاقة، بما يتوافق مع مواصفات المشروع ومعايير الجودة العالمية.", }, 
   tags: { en: ["Electrical Cabinets", "2025"],
     ar: ["صناديق الكهرباء", "٢٠٢٥"], },
    images: [
      cabent1,
      cabent2,
      cabent3,
      cabent4,
      cabent5,

    ],
  }
];

function ProjectCard({ project, index }) {
const { i18n } = useTranslation();
  const language = i18n.language.startsWith("ar") ? "ar" : "en";
  const number = String(index + 1).padStart(2, "0");

  const [currentImage, setCurrentImage] = useState(0);

  const hasImages = project.images && project.images.length > 0;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <article className="proj-card">
      <div className="proj-card__media">
        {hasImages ? (
          <>
            <img
              src={project.images[currentImage]}
              alt={project.title}
              loading="lazy"
            />

            {project.images.length > 1 && (
              <>
                <button
                  className="slider-btn prev"
                  onClick={prevImage}
                  type="button"
                >
                  ❮
                </button>

                <button
                  className="slider-btn next"
                  onClick={nextImage}
                  type="button"
                >
                  ❯
                </button>

                <div className="slider-dots">
                  {project.images.map((_, i) => (
                    <span
                      key={i}
                      className={
                        i === currentImage
                          ? "slider-dot active"
                          : "slider-dot"
                      }
                      onClick={() => setCurrentImage(i)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="proj-card__placeholder">
            <span>{number}</span>
          </div>
        )}
      </div>

      <div className="proj-card__body">
        <div className="proj-card__meta">
          <span className="proj-card__index">PRJ.{number}</span>

       {project.tags?.[language]?.length > 0 && (
  <ul className="proj-card__tags">
    {project.tags[language].map((tag) => (
      <li key={tag}>{tag}</li>
    ))}
  </ul>
)}
        </div>

        <h3 className="proj-card__title">{project.title[language]}</h3>

        <p className="proj-card__desc">{project.description[language]}</p>

      </div>
    </article>
  );
}

export default function ProjectsSection({ items = projects }) {
  const { i18n } = useTranslation();

  return (
    <section className="projects" id="projects " dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="section-container">
        <header className="section-header">

          <h2 className="section-title">{i18n.t("projects.title")}</h2>
        </header>

        <div className="projects__grid">
          {items.map((project, i) => (
            <ProjectCard
              key={`${project.title}-${i}`}
              project={project}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}