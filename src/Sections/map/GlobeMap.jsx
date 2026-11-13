/* eslint-disable */
// Globe — adapted from the Originkit component for CoreTech.
// Changes from the original: plain JS, light theme, map bundled in the project
// (world-atlas, no runtime download), our markets highlighted with stronger
// dots + a marker on each, starts facing the Middle East, touch drag,
// reduced-motion support, and onError() so the old flat map can take over.
import React, { useEffect, useRef } from "react";
import {
  Scene, PerspectiveCamera, WebGLRenderer, SphereGeometry, MeshBasicMaterial,
  Color, Mesh, Group, InstancedMesh, Matrix4, Raycaster, Vector2,
  TubeGeometry, CatmullRomCurve3, Vector3,
} from "three";
import { geoEquirectangular, geoPath, geoContains } from "d3-geo";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";

// Countries we work in (names as in world-atlas)
export const MARKETS = [
  "Palestine", "Egypt", "China", "United Arab Emirates", "Turkey", "Greece",
  "Italy", "Spain", "Portugal", "Latvia", "Estonia", "Lithuania",
  "Saudi Arabia", "Jordan", "South Africa", "Qatar",
];

// Arabic names for the hover label
const AR_NAMES = {
  "Palestine": "فلسطين", "Egypt": "مصر", "China": "الصين",
  "United Arab Emirates": "الإمارات العربية المتحدة", "Turkey": "تركيا",
  "Greece": "اليونان", "Italy": "إيطاليا", "Spain": "إسبانيا",
  "Portugal": "البرتغال", "Latvia": "لاتفيا", "Estonia": "إستونيا",
  "Lithuania": "ليتوانيا", "Saudi Arabia": "السعودية", "Jordan": "الأردن",
  "South Africa": "جنوب أفريقيا", "Qatar": "قطر",
};

const THEME = {
  ocean: "#FAFCFF",     // near-white so the globe stands out on the mist background
  grid: "#C9DCF2",
  land: "#9DBFE8",      // other countries' dots
  market: "#1E7FE6",    // our markets' dots
};

function latLngToPosition(lat, lng) {
  const la = (lat * Math.PI) / 180;
  const lo = (lng * Math.PI) / 180;
  return { x: Math.cos(la) * Math.sin(lo), y: Math.sin(la), z: Math.cos(la) * Math.cos(lo) };
}

function tubeFromPoints(points, radius, material) {
  const curve = new CatmullRomCurve3(points);
  return new Mesh(new TubeGeometry(curve, points.length * 2, radius, 6, false), material);
}

export default function GlobeMap({
  markets = MARKETS,
  speed = 0.25,            // rotation per frame step (0 = still)
  initialLatitude = 22,    // tilt so the Middle East faces the viewer
  initialLongitude = -35,
  dotSpacing = 0.9,        // degrees between dots
  lang = "en",
  onError,
}) {
  const containerRef = useRef(null);
  const langRef = useRef(lang);
  langRef.current = lang;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      onError && onError();
      return;
    }

    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rotationSpeed = reduced ? 0 : -speed;

    const w0 = container.clientWidth || 800;
    const h0 = container.clientHeight || 560;
    const scene = new Scene();
    const camera = new PerspectiveCamera(50, w0 / h0, 0.1, 1000);
    const R = 1;
    // Camera distance that keeps the whole globe inside the frame (with a margin)
    const camDist = () => {
      const w = container.clientWidth || 800, h = container.clientHeight || 560;
      const vHalf = (50 / 2) * (Math.PI / 180);
      const hHalf = Math.atan(Math.tan(vHalf) * (w / h));
      const fit = Math.min(vHalf, hHalf) * 0.86;
      return R / Math.sin(fit);
    };
    camera.position.set(0, 0, camDist());
    camera.lookAt(0, 0, 0);

    renderer.setSize(w0, h0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = "srgb";
    const canvas = renderer.domElement;
    canvas.className = "globe-canvas";
    container.appendChild(canvas);

    const globeGroup = new Group();
    scene.add(globeGroup);

    // Ocean
    const oceanMesh = new Mesh(
      new SphereGeometry(R, 64, 64),
      new MeshBasicMaterial({ color: new Color(THEME.ocean) })
    );
    globeGroup.add(oceanMesh);

    // Grid
    const gridMat = new MeshBasicMaterial({ color: new Color(THEME.grid) });
    const gridR = 0.0012;
    for (let lat = -75; lat <= 75; lat += 15) {
      const pts = [];
      for (let i = 0; i <= 64; i++) {
        const p = latLngToPosition(lat, (i / 64) * 360 - 180);
        pts.push(new Vector3(p.x * R, p.y * R, p.z * R));
      }
      globeGroup.add(tubeFromPoints(pts, gridR, gridMat));
    }
    for (let lng = -180; lng < 180; lng += 15) {
      const pts = [];
      for (let i = 0; i <= 64; i++) {
        const p = latLngToPosition((i / 64) * 180 - 90, lng);
        pts.push(new Vector3(p.x * R, p.y * R, p.z * R));
      }
      globeGroup.add(tubeFromPoints(pts, gridR, gridMat));
    }

    // Country data → bitmap: land = white, our markets = red
    const countries = feature(worldData, worldData.objects.countries).features;
    const marketSet = new Set(markets);
    const BW = 2048, BH = 1024;
    const off = document.createElement("canvas");
    off.width = BW;
    off.height = BH;
    const ctx = off.getContext("2d", { willReadFrequently: true });
    const projection = geoEquirectangular().fitSize([BW, BH], { type: "Sphere" });
    const path = geoPath().projection(projection).context(ctx);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, BW, BH);
    countries.forEach((f) => {
      ctx.beginPath();
      path(f);
      ctx.fillStyle = marketSet.has(f.properties.name) ? "#ff0000" : "#ffffff";
      ctx.fill();
    });
    const px = ctx.getImageData(0, 0, BW, BH).data;
    const sample = (lng, lat) => {
      const x = Math.round(((lng + 180) / 360) * BW) % BW;
      const y = Math.max(0, Math.min(BH - 1, Math.round(((90 - lat) / 180) * BH)));
      const i = (y * BW + x) * 4;
      if (px[i] < 128) return 0;          // ocean
      return px[i + 1] < 100 ? 2 : 1;      // 2 = market, 1 = other land
    };

    // Dots
    const landPts = [], marketPts = [];
    for (let lat = -88; lat <= 88; lat += dotSpacing) {
      const cosLat = Math.cos((Math.abs(lat) * Math.PI) / 180);
      const lngStep = cosLat > 0.01 ? dotSpacing / Math.max(0.3, cosLat) : 360;
      for (let lng = -180; lng < 180; lng += lngStep) {
        const s = sample(lng, lat);
        if (s === 1) landPts.push([lng, lat]);
        else if (s === 2) marketPts.push([lng, lat]);
      }
    }
    const disposables = [];
    const addDots = (pts, color, size) => {
      if (!pts.length) return;
      const geo = new SphereGeometry(size, 5, 5);
      const mat = new MeshBasicMaterial({ color: new Color(color) });
      const inst = new InstancedMesh(geo, mat, pts.length);
      const m = new Matrix4();
      pts.forEach(([lng, lat], i) => {
        const p = latLngToPosition(lat, lng);
        m.makeTranslation(p.x * R * 1.002, p.y * R * 1.002, p.z * R * 1.002);
        inst.setMatrixAt(i, m);
      });
      inst.instanceMatrix.needsUpdate = true;
      globeGroup.add(inst);
      disposables.push(geo, mat);
    };
    addDots(landPts, THEME.land, 0.0042);
    addDots(marketPts, THEME.market, 0.0055);

    // Market shapes for the hover label
    const marketFeatures = countries.filter((f) => marketSet.has(f.properties.name));

    // Hover label
    const tip = document.createElement("div");
    tip.className = "globe-tooltip";
    tip.setAttribute("role", "tooltip");
    container.appendChild(tip);

    // Rotation / interaction
    const toRad = (d) => (d * Math.PI) / 180;
    const rotation = { x: toRad(initialLongitude), y: toRad(initialLatitude) };
    const target = { ...rotation };
    const velocity = { x: 0, y: 0 };
    let dragging = false, hovering = false, lastX = 0, lastY = 0, raf = null, visible = true;
    const lerp = 0.08, decay = 0.92, sens = 0.006;
    const clampLat = (v) => Math.max(-Math.PI / 2, Math.min(Math.PI / 2, v));
    globeGroup.rotation.set(rotation.y, rotation.x, 0);

    const animate = () => {
      raf = null;
      if (!visible) return;
      if (!dragging && rotationSpeed !== 0 && !hovering) target.x += rotationSpeed * 0.01;
      if (!dragging && (Math.abs(velocity.x) > 0.0005 || Math.abs(velocity.y) > 0.0005)) {
        target.x += velocity.x;
        target.y = clampLat(target.y + velocity.y);
        velocity.x *= decay;
        velocity.y *= decay;
      }
      rotation.x += (target.x - rotation.x) * lerp;
      rotation.y = clampLat(rotation.y + (target.y - rotation.y) * lerp);
      globeGroup.rotation.y = rotation.x;
      globeGroup.rotation.x = rotation.y;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    const start = () => { if (raf == null) raf = requestAnimationFrame(animate); };

    const onDown = (e) => {
      dragging = true;
      velocity.x = velocity.y = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (dragging) {
        const dx = e.clientX - lastX, dy = e.clientY - lastY;
        target.x += dx * sens;
        target.y = clampLat(target.y + dy * sens);
        velocity.x = dx * sens * 0.3;
        velocity.y = dy * sens * 0.3;
        lastX = e.clientX;
        lastY = e.clientY;
      } else if (e.pointerType === "mouse") {
        const r = canvas.getBoundingClientRect();
        const v = new Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        raycaster.setFromCamera(v, camera);
        const hits = raycaster.intersectObject(oceanMesh);
        hovering = hits.length > 0;
        // Which market (if any) is under the mouse?
        let name = null;
        if (hovering) {
          const pt = globeGroup.worldToLocal(hits[0].point.clone()).normalize();
          const lat = (Math.asin(pt.y) * 180) / Math.PI;
          const lng = (Math.atan2(pt.x, pt.z) * 180) / Math.PI;
          const f = marketFeatures.find((ft) => geoContains(ft, [lng, lat]));
          if (f) name = f.properties.name;
        }
        if (name) {
          tip.textContent = langRef.current.startsWith("ar") ? AR_NAMES[name] || name : name;
          tip.style.left = `${e.clientX - r.left}px`;
          tip.style.top = `${e.clientY - r.top}px`;
          tip.classList.add("is-visible");
          canvas.style.cursor = "pointer";
        } else {
          tip.classList.remove("is-visible");
          canvas.style.cursor = "";
        }
      }
    };
    const onUp = () => { dragging = false; };
    const onLeave = () => {
      hovering = false;
      tip.classList.remove("is-visible");
      canvas.style.cursor = "";
    };
    const raycaster = new Raycaster();
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(() => {
      const w = container.clientWidth || 800, h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.position.set(0, 0, camDist());
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    });
    ro.observe(container);

    // Pause when off screen
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible) start();
    });
    io.observe(container);
    start();

    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
      disposables.forEach((d) => d.dispose && d.dispose());
      gridMat.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) container.removeChild(canvas);
      if (tip.parentNode === container) container.removeChild(tip);
    };
  }, [markets, speed, initialLatitude, initialLongitude, dotSpacing]);

  return <div ref={containerRef} className="globe-container" />;
}
