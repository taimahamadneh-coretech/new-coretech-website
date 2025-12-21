import React, { useRef, useEffect } from 'react';
import './CanvasBackground.css';

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodeCount = 55;
    const connectionDistance = 160;

    const starColors = [
      [160, 210, 255],
      [130, 185, 245],
      [200, 230, 255],
    ];

    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      const [r, g, b] =
        starColors[Math.floor(Math.random() * starColors.length)];

      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 1,
        color: `rgba(${r}, ${g}, ${b}, ${Math.random() * 0.35 + 0.25})`,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(160, 210, 255, 0.08)';
      ctx.lineWidth = 0.6;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(node => {
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
        glow.addColorStop(0, node.color.replace(/[\d.]+\)$/g, '0.18)'));
        glow.addColorStop(1, 'rgba(110, 193, 255, 0)');

        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      drawDataFlow();

      animationFrameId = requestAnimationFrame(animate);
    };

    const drawDataFlow = () => {
      ctx.strokeStyle = 'rgba(110, 193, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 14]);

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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-background" />;
};

export default React.memo(CanvasBackground);


