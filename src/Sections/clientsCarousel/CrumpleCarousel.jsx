/* eslint-disable */
// Crumple Paper Carousel — adapted from the Originkit component for CoreTech.
// Changes from the original: plain JS (no TypeScript/Framer), light theme,
// logos drawn whole ("contain") on white paper with the client name,
// no mouse-wheel capture (the page always scrolls), responsive sizing,
// click the centre card to open the client's website, and an
// onUnsupported() callback when WebGL2 is not available.
import React, { useEffect, useRef, useState } from "react";

const SETTINGS = {
  stepMs: 1270,
  restMs: 1600, // pause between automatic steps
  resumeMs: 2500,
  easeX1: 23, easeY1: 8, easeX2: 28, easeY2: 85,
  flatZone: 20,
  ballSize: 75,
  edgeBallSize: 50,
  foldWrap: 140,
  creaseDepth: 15,
  facetJitter: 7,
  foldScale: 3,
  gridX: 12,
  gridY: 16,
  tiltRange: 8,
  tumble: 10,
  depthStep: 450,
  perspective: 2400,
  lightAngle: 135,
  ambient: 35,
  shadeContrast: 100,
  highlight: 60,
  paperColor: "#FFFFFF",
  seed: 7,
  offsetY: 0,
  hover: 50,
  crumple: 70,
  speed: 52,
  itemWidth: 294,
  itemHeight: 344,
};

const TW = 480;
const TH = 632;

const VS = `#version 300 es
precision highp float;
in vec2 aUV;
uniform vec2 uRes;
uniform vec2 uSize;
uniform vec2 uCenter;
uniform float uBaseZ;
uniform float uC;
uniform float uR;
uniform float uSeed;
uniform float uPhase;
uniform float uRot;
uniform vec2 uTilt;
uniform float uWrap;
uniform float uCrease;
uniform float uJitter;
uniform float uFold;
uniform float uPersp;
uniform vec2 uGrid;
out vec2 vUV;
out vec3 vPos;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7)) + uSeed * 17.13) * 43758.5453); }
float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
void main() {
    vUV = aUV;
    vec2 q = aUV - 0.5;
    vec3 flat3 = vec3(q * uSize, 0.0);
    vec2 g = floor(aUV * uGrid + 0.5);
    vec3 rnd = vec3(hash(g), hash(g + 17.3), hash(g + 41.9)) * 2.0 - 1.0;
    vec2 np = aUV * uFold + vec2(uPhase * 0.7, uSeed * 3.1);
    float ridge = 0.0;
    float amp = 1.0;
    float fr = 1.0;
    for (int i = 0; i < 3; i++) {
        ridge += amp * (0.5 - abs(vnoise(np * fr) * 2.0 - 1.0));
        amp *= 0.5;
        fr *= 2.1;
    }
    float aspect = uSize.x / max(uSize.y, 1.0);
    float a = q.x * 2.0 * uWrap * aspect;
    float bRaw = q.y * 2.0 * uWrap * 0.9;
    float bx = clamp(bRaw / 1.45, -4.0, 4.0);
    float b = 1.45 * bx / pow(1.0 + pow(abs(bx), 4.0), 0.25);
    float rowGap = pow(1.0 + pow(abs(bx), 4.0), -1.25);
    float poleRing = smoothstep(0.0, 0.5, cos(b)) * smoothstep(0.0, 0.6, rowGap);
    float fold = smoothstep(1.0, 1.6, abs(bx));
    float rr = uR * (1.0 + 0.22 * (vnoise(np * 0.8 + 5.0) - 0.5) * 2.0 * poleRing) * (1.0 - 0.12 * fold);
    vec3 sph = vec3(sin(a) * cos(b), sin(b), cos(a) * cos(b));
    vec2 cells = min(aUV, 1.0 - aUV) * uGrid;
    float rim = clamp(min(cells.x, cells.y), 0.0, 1.0);
    float tuck = 1.0 - 0.06 * (1.0 - clamp(min(cells.x, cells.y) * 0.5, 0.0, 1.0));
    vec3 ball = sph * rr * tuck * 1.14 - vec3(0.0, 0.0, uR * 0.5);
    float c = uC;
    float m = smoothstep(0.0, 1.0, c);
    vec3 p = mix(flat3, ball, m);
    vec3 n = normalize(mix(vec3(0.0, 0.0, 1.0), sph, m));
    float pole = mix(1.0, poleRing, m);
    float sil = smoothstep(0.5, 0.9, m * length(sph.xy));
    float jn = mix(rnd.x, -abs(rnd.x), sil);
    vec2 outward = sph.xy / max(length(sph.xy), 1e-4);
    vec2 jt = rnd.yz - outward * max(dot(rnd.yz, outward), 0.0) * sil;
    p += n * (ridge * uCrease + jn * uJitter * rim) * uSize.y * c * pole;
    p.xy += jt * uJitter * 0.6 * uSize.y * c * rim * pole;
    float wav = c * (1.0 - c) * 4.0;
    float edge = max(abs(q.x), abs(q.y)) * 2.0;
    p.z += sin(q.y * 9.0 + q.x * 3.0 + uPhase * 4.0 + uSeed) * uSize.y * 0.05 * wav * edge;
    p.x += sin(q.y * 7.0 + uPhase * 3.0 + uSeed) * uSize.x * 0.02 * wav * abs(q.x) * 2.0;
    float cz = cos(uRot);
    float sz = sin(uRot);
    p.xy = vec2(cz * p.x - sz * p.y, sz * p.x + cz * p.y);
    float cy = cos(uTilt.y);
    float sy = sin(uTilt.y);
    p.xz = vec2(cy * p.x + sy * p.z, -sy * p.x + cy * p.z);
    float cx = cos(uTilt.x);
    float sx = sin(uTilt.x);
    p.yz = vec2(cx * p.y - sx * p.z, sx * p.y + cx * p.z);
    vPos = p;
    float s = uPersp / max(uPersp - p.z, 1.0);
    vec2 scr = uCenter + p.xy * s;
    gl_Position = vec4(scr / (uRes * 0.5), -(uBaseZ + p.z) / 6000.0, 1.0);
}`;

const FS = `#version 300 es
precision highp float;
in vec2 vUV;
in vec3 vPos;
uniform sampler2D uTex;
uniform vec3 uBack;
uniform vec3 uLight;
uniform float uAmbient;
uniform float uContrast;
uniform float uHigh;
uniform float uPass;
out vec4 outColor;
void main() {
    vec3 N = normalize(cross(dFdx(vPos), dFdy(vPos)));
    if (N.z < 0.0) N = -N;
    vec3 base = gl_FrontFacing ? texture(uTex, vUV).rgb : uBack;
    float d = max(dot(N, uLight), 0.0);
    float ref = uAmbient + (1.0 - uAmbient) * max(uLight.z, 0.05);
    float sh = (uAmbient + (1.0 - uAmbient) * d) / max(ref, 0.001);
    sh = mix(1.0, sh, uContrast);
    vec3 col = base * min(sh, 1.0) + vec3(max(sh - 1.0, 0.0) * uHigh);
    vec2 e = min(vUV, 1.0 - vUV);
    vec2 g = vec2(length(vec2(dFdx(vUV.x), dFdy(vUV.x))), length(vec2(dFdx(vUV.y), dFdy(vUV.y))));
    float cover = clamp(min(e.x / max(g.x, 1e-6), e.y / max(g.y, 1e-6)) / 1.25, 0.0, 1.0);
    if (uPass < 0.5 ? cover < 1.0 : (cover >= 1.0 || cover <= 0.0)) discard;
    outColor = vec4(clamp(col, 0.0, 1.0) * cover, cover);
}`;

function parseColor(c, fb = [1, 1, 1]) {
  if (typeof c !== "string" || c[0] !== "#") return fb;
  let h = c.slice(1);
  if (h.length === 3) h = h.split("").map((x) => x + x).join("");
  const n = parseInt(h.slice(0, 6), 16);
  if (isNaN(n)) return fb;
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function hash1(n) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / Math.max(b - a, 1e-4)));
  return t * t * (3 - 2 * t);
}

function bezier(x1, y1, x2, y2, t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  let u = t;
  for (let i = 0; i < 8; i++) {
    const x = ((ax * u + bx) * u + cx) * u - t;
    const d = (3 * ax * u + 2 * bx) * u + cx;
    if (Math.abs(x) < 1e-5 || Math.abs(d) < 1e-6) break;
    u -= x / d;
  }
  u = Math.min(1, Math.max(0, u));
  return ((ay * u + by) * u + cy) * u;
}

function makeCanvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function createProgram(gl, vs, fs) {
  const sh = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader");
    return s;
  };
  const p = gl.createProgram();
  const v = sh(gl.VERTEX_SHADER, vs);
  const f = sh(gl.FRAGMENT_SHADER, fs);
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.bindAttribLocation(p, 0, "aUV");
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || "link");
  gl.deleteShader(v);
  gl.deleteShader(f);
  return p;
}

function buildGrid(gl, gx, gy) {
  const verts = new Float32Array((gx + 1) * (gy + 1) * 2);
  let k = 0;
  for (let j = 0; j <= gy; j++)
    for (let i = 0; i <= gx; i++) {
      verts[k++] = i / gx;
      verts[k++] = j / gy;
    }
  const idx = [];
  for (let j = 0; j < gy; j++)
    for (let i = 0; i < gx; i++) {
      const a = j * (gx + 1) + i, b = a + 1, d = a + gx + 1, c = d + 1;
      if ((i + j) % 2 === 0) idx.push(a, b, c, a, c, d);
      else idx.push(a, b, d, b, c, d);
    }
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const ibo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);
  gl.bindVertexArray(null);
  return { vao, vbo, ibo, count: idx.length, gx, gy };
}

function makeTexture(gl, src, t = gl.createTexture()) {
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return t;
}

// Paper card: white sheet, logo centred and never cropped, client name underneath.
function paintCard(ctx, img, name) {
  ctx.fillStyle = SETTINGS.paperColor;
  ctx.fillRect(0, 0, TW, TH);
  const boxW = TW * 0.76;
  const boxH = TH * 0.5;
  const iw = img.naturalWidth || boxW;
  const ih = img.naturalHeight || boxH;
  const s = Math.min(boxW / iw, boxH / ih);
  const w = iw * s, h = ih * s;
  ctx.drawImage(img, (TW - w) / 2, TH * 0.4 - h / 2, w, h);
  if (name) {
    ctx.fillStyle = "#0B3C8A";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let size = 34;
    ctx.font = `600 ${size}px Inter, Arial, sans-serif`;
    while (ctx.measureText(name).width > TW * 0.84 && size > 18) {
      size -= 2;
      ctx.font = `600 ${size}px Inter, Arial, sans-serif`;
    }
    ctx.fillText(name, TW / 2, TH * 0.82);
    ctx.fillStyle = "rgba(30,127,230,0.35)";
    ctx.fillRect(TW / 2 - 30, TH * 0.82 + size * 0.9, 60, 4);
  }
}

export default function CrumpleCarousel({ items = [], autoplay = true, arrows = true, dots = true, onUnsupported, ariaLabel }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const live = useRef(null);
  const stepRef = useRef(null);
  const gotoRef = useRef(null);
  const [active, setActive] = useState(0);
  const navCount = items.length;
  live.current = { items, autoplay, navCount };

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || !items.length) return;
    const gl = canvas.getContext("webgl2", { antialias: true, alpha: true, premultipliedAlpha: true });
    if (!gl) {
      onUnsupported && onUnsupported();
      return;
    }
    const reduced = !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let prog;
    try {
      prog = createProgram(gl, VS, FS);
    } catch (err) {
      onUnsupported && onUnsupported();
      return;
    }
    const U = (n) => gl.getUniformLocation(prog, n);
    const loc = {};
    ["uRes", "uSize", "uCenter", "uBaseZ", "uC", "uR", "uSeed", "uPhase", "uRot", "uTilt", "uWrap",
      "uCrease", "uJitter", "uFold", "uPersp", "uGrid", "uTex", "uBack", "uLight", "uAmbient",
      "uContrast", "uHigh", "uPass"].forEach((n) => (loc[n] = U(n)));

    // Blank paper shown while a logo loads
    const blankC = makeCanvas(TW, TH);
    const bx = blankC.getContext("2d");
    bx.fillStyle = SETTINGS.paperColor;
    bx.fillRect(0, 0, TW, TH);
    const blankTex = makeTexture(gl, blankC);

    const bakeC = makeCanvas(TW, TH);
    const textures = items.map(() => null);
    let disposed = false;
    items.forEach((it, i) => {
      const img = new Image();
      img.onload = () => {
        if (disposed) return;
        try {
          paintCard(bakeC.getContext("2d"), img, it.name);
          textures[i] = makeTexture(gl, bakeC);
        } catch (e) { /* keep blank paper */ }
      };
      img.src = it.logo;
    });

    const grid = buildGrid(gl, SETTINGS.gridX, SETTINGS.gridY);
    let W = 0, H = 0;

    const st = {
      pos: reduced ? 0 : -0.4, from: -0.4, to: 0, t0: 0, dur: 0.53,
      tweening: !reduced, firstRest: true, nextAuto: 1e9, lastUser: -99, clock: 0,
      px: 0, py: 0, tpx: 0, tpy: 0, over: 0, tover: 0, press: 0, tpress: 0,
      dragging: false, downX: 0, downPos: 0, moved: 0, vel: 0, lastX: 0, lastT: 0, easeOut: false,
    };
    if (!st.tweening) st.to = st.pos;

    const sf = SETTINGS.speed / 50;
    const step = (dir, user) => {
      const base = st.tweening ? st.to : Math.round(st.pos);
      const next = base + dir;
      if (Math.abs(next - Math.round(st.pos)) > 3) return;
      st.from = st.pos;
      st.to = next;
      st.t0 = st.clock;
      st.dur = Math.max(0.05, SETTINGS.stepMs / 1000 / sf);
      st.easeOut = false;
      if (reduced) { st.pos = st.to; st.tweening = false; } else st.tweening = true;
      if (user) st.lastUser = st.clock;
    };
    stepRef.current = (dir) => step(dir, true);

    const glideTo = (target) => {
      st.from = st.pos;
      st.to = target;
      st.t0 = st.clock;
      st.dur = Math.max(0.18, Math.min(0.75, 0.3 + Math.abs(target - st.pos) * 0.16)) / sf;
      st.easeOut = true;
      if (reduced) { st.pos = target; st.tweening = false; } else st.tweening = true;
      st.lastUser = st.clock;
    };

    const wrap = (v, n) => ((v % n) + n) % n;
    gotoRef.current = (i) => {
      const n = live.current.navCount;
      const cur = Math.round(st.tweening ? st.to : st.pos);
      let d = wrap(i - cur, n);
      if (d > n / 2) d -= n;
      glideTo(cur + d);
    };
    let shown = -1;
    const report = () => {
      const i = wrap(Math.round(st.pos), live.current.navCount);
      if (i !== shown) { shown = i; setActive(i); }
    };

    const layout = () => {
      const narrow = W < 700;
      const k = Math.min(W / (narrow ? 520 : 1200), H / 620);
      const pitch = (narrow ? 0.62 : 0.3) * W;
      return { k, pitch };
    };

    const draw = () => {
      if (!W || !H) return;
      const a = SETTINGS;
      const n = live.current.items.length;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.disable(gl.CULL_FACE);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(prog);
      gl.bindVertexArray(grid.vao);
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(loc.uTex, 0);

      const { k, pitch } = layout();
      const sw = a.itemWidth * k;
      const shh = a.itemHeight * k;
      const h = a.hover / 50;
      const la = (a.lightAngle * Math.PI) / 180;
      const lv = [Math.cos(la) * 0.6, Math.sin(la) * 0.6, 0.8];
      const ll = Math.hypot(lv[0], lv[1], lv[2]);
      const back = parseColor("#E9EEF5");
      const navH = arrows ? 44 : dots ? 8 : 0;
      const navSpace = navH ? navH + 0.05 * H : 0;
      const cy = navSpace / 2; // keep cards centred above the nav row

      gl.uniform2f(loc.uRes, W, H);
      gl.uniform2f(loc.uSize, sw, shh);
      gl.uniform1f(loc.uWrap, (a.foldWrap * Math.PI) / 180);
      gl.uniform1f(loc.uJitter, a.facetJitter / 100);
      gl.uniform1f(loc.uFold, a.foldScale);
      gl.uniform1f(loc.uPersp, Math.max(300, a.perspective * k));
      gl.uniform2f(loc.uGrid, grid.gx, grid.gy);
      gl.uniform3f(loc.uBack, back[0], back[1], back[2]);
      gl.uniform3f(loc.uLight, lv[0] / ll, lv[1] / ll, lv[2] / ll);
      gl.uniform1f(loc.uAmbient, a.ambient / 100);
      gl.uniform1f(loc.uContrast, a.shadeContrast / 100);
      gl.uniform1f(loc.uHigh, a.highlight / 100);

      const N = n * Math.ceil(7 / n);
      const cm = a.crumple / 70;
      const pxc = (st.px * W) / 2;
      const base = Math.floor(st.pos);
      const slots = [];
      for (let s = base - 3; s <= base + 4; s++) slots.push(s);
      slots.sort((p, q) => Math.abs(q - st.pos) - Math.abs(p - st.pos));

      for (const kk of slots) {
        const o = kk - st.pos;
        const x = o * pitch;
        if (Math.abs(x) - sw > W / 2) continue;
        const ao = Math.abs(o);
        let c = smoothstep(a.flatZone / 100, 1, ao);
        const prox = Math.exp(-Math.pow((x - pxc) / Math.max(pitch * 0.55, 1), 2)) * st.over;
        c *= Math.max(0, 1 - 0.45 * h * prox);
        c += st.press * h * 0.12 * (1 - Math.min(ao, 1));
        const uC = Math.min(1, Math.max(0, c * Math.min(cm, 1)));
        const bs = ao <= 1 ? a.ballSize : a.ballSize + (a.edgeBallSize - a.ballSize) * Math.min(ao - 1, 1);
        const idx = ((kk % N) + N) % N;
        const seedV = hash1(idx * 7.13 + a.seed) * 10;
        const tiltDeg = (hash1(idx * 3.7 + a.seed * 1.3) * 2 - 1) * a.tiltRange;
        const rot = ((tiltDeg - o * a.tumble * uC) * Math.PI) / 180;
        const tiltAmt = h * st.over;
        gl.bindTexture(gl.TEXTURE_2D, textures[idx % n] || blankTex);
        gl.uniform1f(loc.uC, uC);
        gl.uniform1f(loc.uR, (shh * bs) / 200);
        gl.uniform1f(loc.uCrease, (a.creaseDepth / 100) * Math.max(cm, 1));
        gl.uniform1f(loc.uSeed, seedV);
        gl.uniform1f(loc.uPhase, o);
        gl.uniform1f(loc.uRot, rot);
        gl.uniform2f(loc.uTilt, ((st.py * 8 * Math.PI) / 180) * tiltAmt, ((st.px * 12 * Math.PI) / 180) * tiltAmt);
        gl.uniform2f(loc.uCenter, x, cy + a.offsetY * k);
        gl.uniform1f(loc.uBaseZ, -ao * a.depthStep * k);
        gl.uniform1f(loc.uPass, 0);
        gl.drawElements(gl.TRIANGLES, grid.count, gl.UNSIGNED_SHORT, 0);
        gl.uniform1f(loc.uPass, 1);
        gl.depthMask(false);
        gl.drawElements(gl.TRIANGLES, grid.count, gl.UNSIGNED_SHORT, 0);
        gl.depthMask(true);
      }
      gl.bindVertexArray(null);
      report();
    };

    const size = () => {
      W = root.offsetWidth;
      H = root.offsetHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
    };
    const ro = new ResizeObserver(size);
    ro.observe(root);
    size();

    // Pointer: hover tilt, drag to move, click to centre (or open the centre card's site)
    const onMove = (e) => {
      if (!W || !H) return;
      const r = root.getBoundingClientRect();
      st.tpx = ((e.clientX - r.left) / W) * 2 - 1;
      st.tpy = -(((e.clientY - r.top) / H) * 2 - 1);
      st.tover = 1;
    };
    const onLeave = () => { st.tover = 0; };
    const pitchPx = () => Math.max(1, layout().pitch);
    const onDown = (e) => {
      if (e.target && e.target.closest && e.target.closest("[data-carousel-nav]")) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      st.dragging = true;
      st.tweening = false;
      st.easeOut = false;
      st.downX = st.lastX = e.clientX;
      st.downPos = st.pos;
      st.moved = 0;
      st.vel = 0;
      st.lastT = performance.now();
      st.tpress = 1;
      st.lastUser = st.clock;
    };
    const onWinMove = (e) => {
      if (!st.dragging) return;
      const dx = e.clientX - st.downX;
      st.moved = Math.max(st.moved, Math.abs(dx));
      const dir = document.documentElement.dir === "rtl" ? -1 : 1;
      const np = st.downPos - (dx * dir) / pitchPx();
      const now = performance.now();
      const v = (np - st.pos) / Math.max(0.001, (now - st.lastT) / 1000);
      st.vel = st.vel * 0.4 + v * 0.6;
      st.pos = np;
      st.lastT = now;
      st.lastUser = st.clock;
    };
    const onUp = (e) => {
      if (!st.dragging) return;
      st.dragging = false;
      st.tpress = 0;
      if (e.type === "pointerup" && st.moved < 5) {
        const r = root.getBoundingClientRect();
        const off = (e.clientX - (r.left + r.width / 2)) / pitchPx();
        if (Math.abs(off) < 0.5) {
          const n = live.current.items.length;
          const it = live.current.items[wrap(Math.round(st.pos), n)];
          if (it && it.url) window.open(it.url, "_blank", "noopener,noreferrer");
          glideTo(Math.round(st.pos));
        } else {
          glideTo(Math.round(st.pos + off));
        }
        return;
      }
      if (performance.now() - st.lastT > 100) st.vel = 0;
      const v = Math.max(-12, Math.min(12, st.vel));
      const land = Math.round(st.pos + v * 0.16);
      glideTo(Math.max(Math.round(st.downPos) - 4, Math.min(Math.round(st.downPos) + 4, land)));
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onWinMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    let raf = 0;
    let last = null;
    let visible = true;
    const frame = (now) => {
      if (!visible) { raf = 0; return; }
      const dt = last == null ? 0 : Math.min(0.05, (now - last) / 1000);
      last = now;
      st.clock += dt;
      const a = SETTINGS;
      const kp = 1 - Math.exp(-dt * 6);
      st.px += (st.tpx - st.px) * kp;
      st.py += (st.tpy - st.py) * kp;
      st.over += (st.tover - st.over) * kp;
      st.press += (st.tpress - st.press) * (1 - Math.exp(-dt * 10));
      if (st.tweening) {
        const u = (st.clock - st.t0) / Math.max(st.dur, 1e-3);
        if (st.dragging) st.tweening = false;
        else if (u >= 1) {
          st.pos = st.to;
          st.tweening = false;
          st.easeOut = false;
          st.nextAuto = st.clock + (st.firstRest ? 0.47 : a.restMs / 1000) / sf;
          st.firstRest = false;
        } else {
          const e = st.easeOut ? 1 - Math.pow(1 - u, 3) : bezier(a.easeX1 / 100, a.easeY1 / 100, a.easeX2 / 100, a.easeY2 / 100, u);
          st.pos = st.from + (st.to - st.from) * e;
        }
      } else if (st.nextAuto > 1e8) {
        st.nextAuto = st.clock + a.restMs / 1000 / sf;
      }
      if (!st.tweening && !st.dragging && live.current.autoplay && !reduced &&
          st.clock >= st.nextAuto && st.clock - st.lastUser > a.resumeMs / 1000 && st.over < 0.5) {
        step(1, false);
      }
      draw();
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) { last = null; raf = requestAnimationFrame(frame); }
    });
    io.observe(root);
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      stepRef.current = null;
      gotoRef.current = null;
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onWinMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      textures.forEach((t) => t && gl.deleteTexture(t));
      gl.deleteTexture(blankTex);
      gl.deleteVertexArray(grid.vao);
      gl.deleteBuffer(grid.vbo);
      gl.deleteBuffer(grid.ibo);
      gl.deleteProgram(prog);
    };
  }, [items]);

  const chevron = (dir) => (
    <svg width={18} height={18} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={dir < 0 ? "M10 3 L5 8 L10 13" : "M6 3 L11 8 L6 13"} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div ref={rootRef} className="cc-root" role="region" aria-roledescription="carousel" aria-label={ariaLabel}>
      <canvas ref={canvasRef} className="cc-canvas" />
      {(arrows || dots) && navCount > 1 && (
        <div className="cc-nav" data-carousel-nav dir="ltr">
          {arrows && (
            <button type="button" className="cc-arrow" aria-label="Previous client" onClick={() => stepRef.current && stepRef.current(-1)}>
              {chevron(-1)}
            </button>
          )}
          {dots && (
            <div className="cc-dots">
              {Array.from({ length: navCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`cc-dot ${i === active ? "is-active" : ""}`}
                  aria-label={`Go to ${items[i] ? items[i].name : i + 1}`}
                  aria-current={i === active || undefined}
                  onClick={() => gotoRef.current && gotoRef.current(i)}
                />
              ))}
            </div>
          )}
          {arrows && (
            <button type="button" className="cc-arrow" aria-label="Next client" onClick={() => stepRef.current && stepRef.current(1)}>
              {chevron(1)}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
