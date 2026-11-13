/* eslint-disable */
// Smooth 3D Slideshow — adapted from the Originkit component for CoreTech.
// Changes: plain JS, light theme, logo cards with client name, responsive
// sizes, autoplay pauses on hover, click a side card to centre it (click the
// centre card to open the client's website), arrows, swipe, keyboard.
import React, { useState, useEffect, useCallback, useRef } from "react";

const PERSPECTIVE = 1600;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2; // cards visible on each side
const DEPTH = 240;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function sizeFor(w) {
  if (w < 600) {
    const cw = Math.min(180, Math.round(w * 0.5));
    return { key: "sm", cardWidth: cw, cardHeight: Math.round(cw * 0.78), spacing: Math.round(cw * 0.5) };
  }
  if (w < 900) return { key: "md", cardWidth: 210, cardHeight: 165, spacing: 130 };
  return { key: "lg", cardWidth: 240, cardHeight: 185, spacing: 165 };
}

export default function Smooth3DCarousel({
  items = [],
  autoplay = true,
  autoplayDirection = "rightToLeft",
  duration = 0.6,   // seconds per move
  delay = 2.5,      // seconds each card stays in the centre
  radius = 20,      // px
  tilt = 12,
  sideTilt = 8,
  dim = 0.55,       // how much side cards fade (0–1)
  ariaLabel,
}) {
  const n = items.length;
  const [active, setActive] = useState(0);

  // Responsive card size
  const rootRef = useRef(null);
  const [size, setSize] = useState(() =>
    sizeFor(typeof window !== "undefined" ? window.innerWidth : 1200)
  );
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const next = sizeFor(el.offsetWidth);
      setSize((p) => (p.key === next.key && p.cardWidth === next.cardWidth ? p : next));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Lock input while a card is moving, so rapid clicks don't stack up
  const lockRef = useRef(false);
  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(() => { lockRef.current = false; }, Math.max(50, duration * 1000));
  }, [duration]);

  const step = useCallback((dir) => {
    if (lockRef.current || n < 2) return;
    lock();
    setActive((a) => (((a + dir) % n) + n) % n);
  }, [n, lock]);

  const handleCardClick = useCallback((i) => {
    if (lockRef.current) return;
    if (i === active) {
      const it = items[i];
      if (it && it.url) window.open(it.url, "_blank", "noopener,noreferrer");
      return;
    }
    lock();
    setActive(i);
  }, [active, items, lock]);

  // Autoplay (pauses while hovered)
  const pausedRef = useRef(false);
  const reduced = typeof window !== "undefined" && window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (!autoplay || n < 2 || reduced) return;
    const dir = autoplayDirection === "leftToRight" ? -1 : 1;
    const id = window.setInterval(() => {
      if (!pausedRef.current) step(dir);
    }, Math.max(0.3, delay) * 1000);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayDirection, delay, n, step, reduced]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  };

  // Swipe / drag
  const downX = useRef(null);
  const swiped = useRef(false);
  const onPointerDown = (e) => { downX.current = e.clientX; swiped.current = false; };
  const onPointerUp = (e) => {
    if (downX.current == null) return;
    const dx = e.clientX - downX.current;
    downX.current = null;
    if (Math.abs(dx) > 40) { swiped.current = true; step(dx < 0 ? 1 : -1); }
  };

  const { cardWidth, cardHeight, spacing } = size;
  const transitionCss = `transform ${duration}s ${EASE}, opacity ${duration}s ${EASE}`;
  const r = Math.min(radius, Math.min(cardWidth, cardHeight) / 2);

  return (
    <div
      ref={rootRef}
      className="s3d-root"
      style={{ perspective: `${PERSPECTIVE}px`, height: cardHeight + 80 }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      dir="ltr"
      onKeyDown={onKeyDown}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; downX.current = null; }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="s3d-stage" style={{ width: cardWidth, height: cardHeight }}>
        {items.map((item, i) => {
          let rel = i - active;
          if (rel > n / 2) rel -= n;
          if (rel < -n / 2) rel += n;
          const ax = Math.abs(rel);
          const visible = ax <= MAX_VISIBLE;
          const isActive = rel === 0;
          const sc = Math.max(0.4, 1 - ax * SCALE_STEP);
          const tx = rel * spacing;
          const tz = -ax * DEPTH;
          const ry = -rel * tilt;
          const rz = rel * sideTilt;

          return (
            <div
              key={item.name}
              className="s3d-card"
              style={{
                width: cardWidth,
                height: cardHeight,
                borderRadius: r,
                transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
                transition: transitionCss,
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? "auto" : "none",
                cursor: "pointer",
              }}
              onClick={() => {
                if (swiped.current) { swiped.current = false; return; }
                handleCardClick(i);
              }}
              aria-hidden={!visible}
              title={isActive && item.url ? `Visit ${item.name}` : item.name}
            >
              <div className="s3d-logo">
                <img src={item.logo} alt={item.name} draggable={false} />
              </div>
              <div className="s3d-name" style={{ opacity: isActive ? 1 : 0 }}>
                {item.name}
              </div>
              {/* light fade on side cards */}
              <div
                className="s3d-dim"
                style={{ opacity: isActive ? 0 : dim, transition: `opacity ${duration}s ${EASE}` }}
              />
            </div>
          );
        })}
      </div>

      {n > 1 && (
        <>
          <button type="button" className="cf-arrow cf-arrow--left" aria-label="Previous client"
            onPointerDown={(e) => e.stopPropagation()} onClick={() => step(-1)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button type="button" className="cf-arrow cf-arrow--right" aria-label="Next client"
            onPointerDown={(e) => e.stopPropagation()} onClick={() => step(1)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </>
      )}
    </div>
  );
}