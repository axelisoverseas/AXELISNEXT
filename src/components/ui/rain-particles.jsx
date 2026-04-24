"use client";
import { useEffect, useRef } from 'react';

export default function RainParticles({
  density = 0.5,
  angle = -12,
  opacity = 0.35,
  color = '200, 220, 255',
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let drops = [];

    const rad = (angle * Math.PI) / 180;
    const vxBase = Math.sin(rad);
    const vyBase = Math.cos(rad);

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const count = Math.max(30, Math.floor(density * 260 * (canvas.width / 1280)));
      drops = new Array(count).fill(0).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        len: 8 + Math.random() * 14,
        speed: 5 + Math.random() * 8,
        alpha: 0.4 + Math.random() * 0.6,
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = 'round';
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.strokeStyle = `rgba(${color}, ${opacity * d.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + vxBase * d.len, d.y + vyBase * d.len);
        ctx.stroke();
        d.x += vxBase * d.speed;
        d.y += vyBase * d.speed;
        if (d.y > canvas.height + 10 || d.x < -10 || d.x > canvas.width + 10) {
          d.x = Math.random() * canvas.width;
          d.y = -10;
        }
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [density, angle, opacity, color]);

  return <canvas ref={canvasRef} aria-hidden className={`w-full h-full block ${className}`} />;
}
