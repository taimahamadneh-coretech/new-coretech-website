import { useState, useEffect, useRef, useMemo } from "react";
import Globe from "react-globe.gl";
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';
import './map.css';

export default function GlobeComponent() {
    const highlightCountries = [
        "Palestine", "Egypt", "China", "United Arab Emirates", "Turkey", 
        "Greece", "Italy", "Spain", "Portugal", "Latvia", 
        "Estonia", "Lithuania", "Saudi Arabia", "Jordan", 
        "South Africa", "Qatar"
    ];
    const { t } = useTranslation();
    const [ setHoverD] = useState();
    const globeEl = useRef();
    const [globeData, setGlobeData] = useState({
        countries: { features: [] },
        points: { features: [] }
    });

    const [ setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const highlightCountriesSet = useMemo(() => 
        new Set(highlightCountries), []
    );

    const [projects, setProjects] = useState(0);
    const [expansion, setExpansion] = useState(0);
    const [Partners, setPartners] = useState(0);
    const [clients, setClients] = useState(0);

    const countersRef = useRef(null);
    const hasStarted = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted.current) {
                    hasStarted.current = true;
                    const startCounter = (end, setter) => {
                        let count = 0;
                        const interval = setInterval(() => {
                            count++;
                            setter(count);
                            if (count === end) clearInterval(interval);
                        }, 30);
                    };
                    startCounter(100, setProjects);
                    startCounter(20, setExpansion);
                    startCounter(22, setPartners);
                    startCounter(25, setClients);

                }
            },
            { threshold: 0.4 }
        );
        if (countersRef.current) observer.observe(countersRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                fetch("./correctedData.json")
                    .then(res => res.json())
                    .then(data => {
                        const sortedData = data.sort((a,b) => a.countryName.localeCompare(b.countryName));
                        setData(sortedData);
                    });

                fetch("https://raw.githubusercontent.com/iamanas20/geojson/main/map11.geojson")
                    .then(res => res.json())
                    .then(res => {
                        setGlobeData({ countries: res[0], points: res[1] });
                    });
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (globeEl.current !== undefined) {
            const scene = globeEl.current.scene();
            if (scene.children.length === 4) {
                scene.children[1].intensity = 1.5;
                scene.children[2].visible = false;
            }
            scene.background = null;
            const renderer = globeEl.current.renderer();
            renderer.setClearColor(0x000000, 0);
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.5;
            globeEl.current.controls().enableZoom = false;
        }
    }, [globeData]);

    const globeMaterial = new THREE.MeshPhongMaterial({
        color: '#1E7FE6',
        emissive: '#0a3d7a',
        emissiveIntensity: 3,
        shininess: 0.8,
        opacity: 0.8
    });

    const getPolygonColor = (countryName) => {
        if (highlightCountriesSet.has(countryName)) {
            return "#54b3f3ff";
        }
        
        return "#ffffff"; 
    };

    return (
        

        <section id="Map" className="section map-section">
          <div className="section-header">
        <h2 className="section-title">{t('map.sub-title')}</h2>
      </div>
        <div className="globe-counters-wrapper ">
            
            <div className="globe-counters-inner">

                
                <div className="counters-sidebar side-left" ref={countersRef}>
                    <div className="counter-box">
                        <h3 className="counter-number">+{projects}</h3>
                        <p className="counter-title">{t('map.projects')}</p>
                    </div>
                        <div className="counter-box">
                        <h3 className="counter-number">+{clients}</h3>
                        <p className="counter-title">{t('map.clients')}</p>
                    </div>
                </div>

                <div className="globe-container">
                    {loading && <div className="loading-text">Loading...</div>}
                    {!loading && (
                        <Globe
                            ref={globeEl}
                            backgroundColor="rgba(0,0,0,0)"
                            globeImageUrl={null}
                            atmosphereColor="#3a9ad9"
                            atmosphereDaylightAlpha={0.3}
                            showAtmosphere={false}
                            showGlobe={true}
                            globeMaterial={globeMaterial}
                            polygonsData={globeData.countries.features}
                            polygonStrokeColor={() => "#d3c2c2ff"} 
                            polygonSideColor={() => "#d3c2c2ff"} 
                            polygonStrokeWidth={0.5} 
                            onPolygonHover={setHoverD}
                            polygonCapColor={({ properties: d }) => getPolygonColor(d.ADMIN)}
polygonLabel={({ properties: d }) => `
        <div style="
            padding: 8px 12px;
            background: white;
            color: #1E7FE6;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
        ">
            ${d.ADMIN}
        </div>
    `}

                        />
                    )}
                </div>

                <div className="counters-sidebar side-right">
                    <div className="counter-box">
                        <h3 className="counter-number">+{expansion}</h3>
                        <p className="counter-title">{t('map.expansion')}</p>
                    </div>
                    <div className="counter-box">
                        <h3 className="counter-number">+{Partners}</h3>
                        <p className="counter-title">{t('map.partners')}</p>
                    </div>
                </div>

            </div>
        </div>
        </section>
    );
}