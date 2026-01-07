import React, { useRef, useEffect } from 'react';
import './CanvasBackground.css';
 
const CanvasBackground = () => {
  const canvasRef = useRef(null);
 
  useEffect(() => {
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
 
    const colorTheme = {
      starColors: [
        [255, 255, 255],
        [250, 250, 255],
        [255, 250, 250],
        [250, 255, 250],
      ],
      connectionColor: 'rgba(255, 255, 255, 0.15)',
      connectionDistance: 160,
      glowColor: 'rgba(255, 255, 255, 0)',
      dataFlowColor: 'rgba(255, 255, 255, 0.25)',
    };
 
    const nodeCount = 150;
    const nodes = [];
 
    for (let i = 0; i < nodeCount; i++) {
      const [r, g, b] = colorTheme.starColors[
        Math.floor(Math.random() * colorTheme.starColors.length)
      ];
 
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        radius: Math.random() * 1.8 + 1,
        opacity: Math.random() * 0.4 + 0.3,
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
            const alpha = 0.15 * (1 - distance / colorTheme.connectionDistance);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
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
            const alpha = 1 * (1 - distance / colorTheme.connectionDistance);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
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
        glow.addColorStop(0, `rgba(255, 255, 255, ${node.opacity * 0.5})`);
        glow.addColorStop(0.5, `rgba(255, 255, 255, ${node.opacity * 0.2})`);
        glow.addColorStop(1, colorTheme.glowColor);
 
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fill();
      });
 
      drawDataFlow();
 
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