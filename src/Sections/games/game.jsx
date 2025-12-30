import React, { useState } from "react";
import "./game.css";
import { useTranslation } from "react-i18next";


import farm from "../../assets/images/farm.png";
import laptop from "../../assets/images/laptop.png";
import controller from "../../assets/images/controller.png";
import rocket from "../../assets/images/rocket.png";
import rocket1 from "../../assets/images/rocket2.png";
import monitor from "../../assets/images/screen.png";
import robot from "../../assets/images/robot.png";
import bulb from "../../assets/images/bulb.png";
import gear from "../../assets/images/geer.png";
import dashboard from "../../assets/images/dashboard.png";

const Game = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const { t } = useTranslation();
  
  return (
    <section className="coming-soon-wrap">
      <div className="game-scene">
        <div className="scene-background"></div>

     
        <div className="items-container">
          <img 
            src={monitor} 
            className={`item monitor pulse  ${hoveredItem === 'monitor' ? 'hovered' : ''}`} 
            alt="monitor"
            onMouseEnter={() => setHoveredItem('monitor')}
            onMouseLeave={() => setHoveredItem(null)}
          />
           <img 
            src={dashboard} 
            className={`item dashboard pulse  `} 
            alt="dashboard"
            onMouseEnter={() => setHoveredItem('dashboard')}
            onMouseLeave={() => setHoveredItem(null)}
          />
          <img 
            src={farm} 
            className={`item farm float  ${hoveredItem === 'farm' ? 'hovered' : ''}`} 
            alt="farm"
            onMouseEnter={() => setHoveredItem('farm')}
            onMouseLeave={() => setHoveredItem(null)}
          />
          <img 
            src={laptop} 
            className={`item laptop tilt  ${hoveredItem === 'laptop' ? 'hovered' : ''}`} 
            alt="laptop"
            onMouseEnter={() => setHoveredItem('laptop')}
            onMouseLeave={() => setHoveredItem(null)}
          />
          <img 
            src={robot} 
            className={`item robot dance  ${hoveredItem === 'robot' ? 'hovered' : ''}`} 
            alt="robot"
            onMouseEnter={() => setHoveredItem('robot')}
            onMouseLeave={() => setHoveredItem(null)}
          />
          <img 
            src={gear} 
            className={`item gear spin-slow  ${hoveredItem === 'gear' ? 'hovered' : ''}`} 
            alt="gear"
            onMouseEnter={() => setHoveredItem('gear')}
            onMouseLeave={() => setHoveredItem(null)}
          />
           <img 
            src={gear} 
            className={`item gear1 spin-slow  ${hoveredItem === 'gear' ? 'hovered' : ''}`} 
            alt="gear"
            onMouseEnter={() => setHoveredItem('gear')}
            onMouseLeave={() => setHoveredItem(null)}
          />
          <img 
            src={controller} 
            className={`item controller shake  ${hoveredItem === 'controller' ? 'hovered' : ''}`} 
            alt="controller"
            onMouseEnter={() => setHoveredItem('controller')}
            onMouseLeave={() => setHoveredItem(null)}
          />
          <img 
            src={rocket} 
            className={`item rocket fly  ${hoveredItem === 'rocket' ? 'hovered' : ''}`} 
            alt="rocket"
            onMouseEnter={() => setHoveredItem('rocket')}
            onMouseLeave={() => setHoveredItem(null)}
          />
          <img 
            src={rocket1} 
            className={`item rocket1 fly  ${hoveredItem === 'rocket' ? 'hovered' : ''}`} 
            alt="rocket1"
            onMouseEnter={() => setHoveredItem('rocket')}
            onMouseLeave={() => setHoveredItem(null)}
          />
          <img 
            src={bulb} 
            className={`item bulb glow  ${hoveredItem === 'bulb' ? 'hovered' : ''}`} 
            alt="bulb"
            onMouseEnter={() => setHoveredItem('bulb')}
            onMouseLeave={() => setHoveredItem(null)}
          />
         
        </div>

        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="coming-text">
        <div className="title-wrapper">
          <span className="title-sub">{t("game.titleSub")}</span>
          <h1>{t("game.title")}</h1>
          <div className="title-line"></div>
        </div>
        
       <p>{t("game.description")}</p>
        
        <div className="progress-container">
          <div className="progress-info">
            <span className="progress-label"> {t("game.progress.label")}</span>
            <span className="progress-percent">75%</span>
          </div>
          <div className="progress-line">
            <div className="progress-fill"></div>
          </div>
          <p className="progress-sub">{t("game.progress.comingSoon")}</p>
        </div>
      </div>
    </section>
  );
};

export default Game;