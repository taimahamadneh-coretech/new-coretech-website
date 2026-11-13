/* eslint-disable */
// Coverflow Carousel — adapted from the Originkit component for CoreTech.
// Changes from the original: plain JS (no TypeScript/Framer), light theme,
// logo cards (logo never cropped, client name on the active card),
// responsive sizes, autoplay pauses on hover, click any card to bring it
// to the centre (click the centre card to open the client's website),
// swipe on touch screens, and keyboard arrows when hovered or focused.
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

const RENDER_RANGE = 6; // max slats each side

// Card sizes per screen width
function sizingFor(width) {
  if (width < 600) {
    const aw = Math.min(Math.round(width * 0.72), 320);
    return { key: "sm", activeWidth: aw, activeHeight: Math.round(aw * 0.68), restWidth: 64, restHeight: 150, gap: 10 };
  }
  if (width < 900) {
    return { key: "md", activeWidth: 420, activeHeight: 280, restWidth: 120, restHeight: 190, gap: 18 };
  }
  return { key: "lg", activeWidth: 540, activeHeight: 350, restWidth: 170, restHeight: 240, gap: 24 };
}

// Card index's signed distance from centre at position `pos`, wrapped into
// (-count/2, count/2] so the loop is seamless.
function relOf(index, pos, count) {
  let rel = (((index - pos) % count) + count) % count;
  if (rel > count / 2) rel -= count;
  return rel;
}

function xForRel(rel, s) {
  const ar = Math.abs(rel);
  const c1 = s.activeWidth / 2 + s.gap + s.restWidth / 2;
  const pitch = s.restWidth + s.gap;
  const mag = ar <= 1 ? ar * c1 : c1 + (ar - 1) * pitch;
  return (rel < 0 ? -1 : 1) * mag;
}

const blendForRel = (rel) => Math.min(Math.abs(rel), 1);

function Card({ item, index, pos, count, R, sizing, radius, onSelect,variant }) {
  const x = useTransform(pos, (p) => xForRel(relOf(index, p, count), sizing));
  const opacity = useTransform(pos, (p) => {
    const ar = Math.abs(relOf(index, p, count));
    return ar <= R ? 1 : ar >= R + 1 ? 0 : 1 - (ar - R);
  });
  const zIndex = useTransform(pos, (p) => Math.round(1000 - Math.abs(relOf(index, p, count)) * 100));
  const width = useTransform(pos, (p) => {
    const a = blendForRel(relOf(index, p, count));
    return sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a;
  });
  const height = useTransform(pos, (p) => {
    const a = blendForRel(relOf(index, p, count));
    return sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a;
  });
  const borderRadius = useTransform(pos, (p) => {
    const a = blendForRel(relOf(index, p, count));
    const w = sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a;
    const h = sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a;
    return Math.min(radius, Math.min(w, h) / 2);
  });
  const boxShadow = useTransform(pos, (p) =>
    Math.abs(relOf(index, p, count)) < 0.5
      ? "0 24px 60px rgba(11, 60, 138, 0.18)"
      : "0 10px 28px rgba(11, 60, 138, 0.10)"
  );
  // Logo area and name: name only shows on the active card
  const nameOpacity = useTransform(pos, (p) => 1 - Math.min(Math.abs(relOf(index, p, count)) * 2, 1));
  const logoPad = useTransform(pos, (p) => {
    const a = blendForRel(relOf(index, p, count));
    return `${Math.round(22 - 12 * a)}%`;
  });

  return (
    <motion.div
      onClick={() => onSelect(index)}
      style={{ position: "absolute", left: "50%", top: "50%", x, zIndex, opacity, cursor: "pointer" }}
    >
       <motion.div
        className={`cf-card ${variant === "image" ? "cf-card--image" : ""}`}
        style={{ x: "-50%", y: "-50%", width, height, borderRadius, boxShadow }}
      >
        {variant === "image" ? (
          <img className="cf-photo" src={item.src} alt={item.alt || ""} draggable={false} loading="lazy" />
        ) : (
          <>
            <motion.div className="cf-logo" style={{ paddingLeft: logoPad, paddingRight: logoPad }}>
              <img src={item.logo} alt={item.name} draggable={false} />
            </motion.div>
            <motion.div className="cf-name" style={{ opacity: nameOpacity }}>
              {item.name}
            </motion.div>
      </>
      )
}
</motion.div>
    </motion.div>
  );
}

function ArrowButton({ side, onClick }) {
  const isLeft = side === "left";
  return (
    <button
      type="button"
      className={`cf-arrow cf-arrow--${side}`}
      aria-label={isLeft ? "Previous client" : "Next client"}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {isLeft ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

export default function CoverflowCarousel({
  items = [],
  variant = "logo",
  autoplay = true,
  autoplayDirection = "rightToLeft",
  moveDuration = 0.35, // seconds per step
  dwell = 1.6,          // seconds each card stays in the centre
  radius = 20,
  showArrows = true,
  ariaLabel,
}) {
  const prefersReducedMotion = useReducedMotion();
  const count = Math.max(1, items.length);
  const R = Math.max(1, Math.min(RENDER_RANGE, Math.floor(count / 2) - 1));

  // Responsive sizing (cards remount only when the breakpoint changes)
  const rootRef = useRef(null);
  const [sizing, setSizing] = useState(() =>
    sizingFor(typeof window !== "undefined" ? window.innerWidth : 1200)
  );
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const next = sizingFor(el.offsetWidth);
      setSizing((prev) =>
        prev.key === next.key && prev.activeWidth === next.activeWidth ? prev : next
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ---- Single rAF driver ----
  const pos = useMotionValue(0);
  const targetRef = useRef(0);
  const rafRef = useRef(null);
  const lastTRef = useRef(null);
  const autoplayingRef = useRef(false);
  const pausedRef = useRef(false);
  const dirRef = useRef(1);
  const dwellAccRef = useRef(0);
  const reducedRef = useRef(prefersReducedMotion);
  reducedRef.current = prefersReducedMotion;

  const tick = useCallback(
    (t) => {
      const last = lastTRef.current ?? t;
      const dt = Math.min((t - last) / 1000, 1 / 30);
      lastTRef.current = t;
      const cur = pos.get();
      const diff = targetRef.current - cur;
      const step = (1 / Math.max(0.08, moveDuration)) * dt;
      const arriving = reducedRef.current || Math.abs(diff) <= step;

      if (arriving) {
        pos.set(targetRef.current);
        if (autoplayingRef.current) {
          if (!pausedRef.current) {
            dwellAccRef.current += dt;
            if (dwellAccRef.current >= dwell) {
              dwellAccRef.current = 0;
              targetRef.current += dirRef.current;
            }
          }
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        rafRef.current = null;
        lastTRef.current = null;
        return;
      }
      pos.set(cur + Math.sign(diff) * step);
      rafRef.current = requestAnimationFrame(tick);
    },
    [pos, moveDuration, dwell]
  );

  const ensureRunning = useCallback(() => {
    if (rafRef.current == null) {
      lastTRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  const goNext = useCallback(() => { targetRef.current += 1; dwellAccRef.current = 0; ensureRunning(); }, [ensureRunning]);
  const goPrev = useCallback(() => { targetRef.current -= 1; dwellAccRef.current = 0; ensureRunning(); }, [ensureRunning]);

  // Click: side card → centre; centre card → open website
  const onSelect = useCallback(
    (index) => {
      const cur = Math.round(targetRef.current);
      let d = ((index - cur) % count + count) % count;
      if (d > count / 2) d -= count;
      if (d === 0) {
        const it = items[index];
        if (it && it.url) window.open(it.url, "_blank", "noopener,noreferrer");
        return;
      }
      targetRef.current = cur + d;
      dwellAccRef.current = 0;
      ensureRunning();
    },
    [count, items, ensureRunning]
  );

  useEffect(() => () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  // Autoplay
  useEffect(() => {
    const on = autoplay && count > 1 && !prefersReducedMotion;
    autoplayingRef.current = on;
    if (on) {
      dirRef.current = autoplayDirection === "leftToRight" ? -1 : 1;
      dwellAccRef.current = 0;
      ensureRunning();
    }
    return () => { autoplayingRef.current = false; };
  }, [autoplay, autoplayDirection, count, prefersReducedMotion, ensureRunning]);

  // Keyboard arrows while hovered / focused
  const activeRef = useRef(false);
  useEffect(() => {
    const onKey = (e) => {
      if (!activeRef.current) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  // Swipe on touch / drag with mouse
  const downX = useRef(null);
  const swiped = useRef(false);
  const onPointerDown = (e) => { downX.current = e.clientX; swiped.current = false; };
  const onPointerUp = (e) => {
    if (downX.current == null) return;
    const dx = e.clientX - downX.current;
    downX.current = null;
    if (Math.abs(dx) > 40) {
      swiped.current = true;
      dx < 0 ? goNext() : goPrev();
    }
  };
  const guardedSelect = useCallback(
    (i) => {
      if (swiped.current) { swiped.current = false; return; }
      onSelect(i);
    },
    [onSelect]
  );

  const stageHeight = sizing.activeHeight + 60;

  return (
    <div
      ref={rootRef}
      className="cf-root"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      style={{ height: stageHeight }}
      dir="ltr"
      onMouseEnter={() => { activeRef.current = true; pausedRef.current = true; }}
      onMouseLeave={() => { activeRef.current = false; pausedRef.current = false; downX.current = null; }}
      onFocus={() => { activeRef.current = true; }}
      onBlur={() => { activeRef.current = false; }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="cf-stage" key={sizing.key + sizing.activeWidth}>
        {items.map((item, i) => (
          <Card
            key={item.name}
            variant={variant}
            item={item}
            index={i}
            pos={pos}
            count={count}
            R={R}
            sizing={sizing}
            radius={radius}
            onSelect={guardedSelect}
          />
        ))}
      </div>
      {showArrows && count > 1 && (
        <>
          <ArrowButton side="left" onClick={goPrev} />
          <ArrowButton side="right" onClick={goNext} />
        </>
      )}
    </div>
  );
}
