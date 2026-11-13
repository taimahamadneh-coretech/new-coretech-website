import React, { useRef, useEffect } from 'react';
import './CanvasBackground.css';
 
// Network animation on/off. false = only the background colour is shown
// (the network code below is kept; set back to true to bring it back).
const SHOW_NETWORK = true;

const CanvasBackground = () => {
  const canvasRef = useRef(null);
 
  useEffect(() => {
    if (!SHOW_NETWORK) {
      // Wipe anything already drawn (e.g. a frame left over after hot reload)
      const c = canvasRef.current;
      if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
 
    const mouse = { x: null, y: null };
 
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
 
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
 
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
 
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
 
    const NET = '30, 127, 230'; // blue-deep — keep in sync with --network-rgb

    const colorTheme = {
      starColors: [
        [30, 127, 230],
        [11, 60, 138],
        [63, 169, 245],
      ],
      connectionColor: `rgba(${NET}, 0.15)`,
      connectionDistance: 160,
      glowColor: `rgba(${NET}, 0)`,
      dataFlowColor: `rgba(${NET}, 0.25)`,
    };
 
    const nodeCount = 90; // was 150 — fewer dots, calmer
    const nodes = [];
 
    for (let i = 0; i < nodeCount; i++) {
      const [r, g, b] = colorTheme.starColors[
        Math.floor(Math.random() * colorTheme.starColors.length)
      ];
 
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8, // was * 3 — slower
        vy: (Math.random() - 0.5) * 0.8, // was * 3 — slower
        radius: Math.random() * 1.8 + 1,
        opacity: Math.random() * 0.25 + 0.2, // was * 0.4 + 0.3 — softer dots
        baseColor: [r, g, b],
        get color() {
          return `rgba(${this.baseColor.join(', ')}, ${this.opacity})`;
        },
      });
    }
 
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
 
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
 
          if (distance < colorTheme.connectionDistance) {
            const alpha = 0.12 * (1 - distance / colorTheme.connectionDistance); // was 0.22 — fainter lines
            ctx.strokeStyle = `rgba(${NET}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
 
        if (mouse.x !== null && mouse.y !== null) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
 
          if (distance < colorTheme.connectionDistance) {
            const alpha = 0.35 * (1 - distance / colorTheme.connectionDistance); // was 1 — softer lines to the mouse
            ctx.strokeStyle = `rgba(${NET}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
 
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
 
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
 
        ctx.beginPath();
        ctx.fillStyle = node.color;
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
 
        const glow = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 4
        );
        glow.addColorStop(0, `rgba(${NET}, ${node.opacity * 0.3})`);
        glow.addColorStop(0.5, `rgba(${NET}, ${node.opacity * 0.1})`);
        glow.addColorStop(1, colorTheme.glowColor);
 
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fill();
      });
 
      // drawDataFlow();  // off: it drew random dashed lines every frame (flicker)
 
      animationFrameId = requestAnimationFrame(animate);
    };
 
    const drawDataFlow = () => {
      ctx.strokeStyle = colorTheme.dataFlowColor;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 16]);
      ctx.lineCap = 'round';
 
      for (let i = 0; i < 4; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        const endX = startX + Math.random() * 300 - 150;
        const endY = startY + Math.random() * 300 - 150;
 
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
 
      ctx.setLineDash([]);
    };
 
    animate();
 
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
 
  return <canvas ref={canvasRef} className="canvas-background" />;
};
 
export default React.memo(CanvasBackground);