import React, { useEffect, useState } from "react";
import "./loader.css";
import "../../styles/global.css";

const Loader = ({ onFinish }) => {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true);

      setTimeout(() => {
        onFinish();
      }, 800);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`loader-screen ${exit ? "slide-out" : ""}`}>
      <h1 className="loader-title">CoreTech</h1>

      <div className="boxes-container">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>

      <p className="loader-subtitle">
        Innovation · Future · Technology
      </p>
    </div>
  );
};

export default React.memo(Loader);