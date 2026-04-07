import React, { useRef, useEffect } from 'react';

const GradientMesh = ({ className = '', colors = ['#3b82f6', '#eab308', '#8b5cf6'], speed = 0.002, opacity = 0.15 }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let time = 0;

        // Blob definitions
        const blobs = colors.map((color, i) => ({
            color,
            x: 0.3 + i * 0.2,
            y: 0.3 + (i % 2) * 0.4,
            radius: 0.25 + i * 0.05,
            speedX: speed * (1 + i * 0.5) * (i % 2 === 0 ? 1 : -1),
            speedY: speed * (0.8 + i * 0.3) * (i % 2 === 0 ? -1 : 1),
            phase: i * Math.PI * 0.667,
        }));

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            time += 1;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            blobs.forEach((blob) => {
                const cx = canvas.width * (blob.x + Math.sin(time * blob.speedX + blob.phase) * 0.15);
                const cy = canvas.height * (blob.y + Math.cos(time * blob.speedY + blob.phase) * 0.15);
                const r = Math.min(canvas.width, canvas.height) * blob.radius;

                const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                gradient.addColorStop(0, blob.color + Math.round(opacity * 255).toString(16).padStart(2, '0'));
                gradient.addColorStop(0.5, blob.color + Math.round(opacity * 0.5 * 255).toString(16).padStart(2, '0'));
                gradient.addColorStop(1, blob.color + '00');

                ctx.beginPath();
                ctx.fillStyle = gradient;

                // Organic blob shape using bezier curves
                const points = 8;
                const angleStep = (Math.PI * 2) / points;

                for (let i = 0; i <= points; i++) {
                    const angle = i * angleStep;
                    const wobble = 1 + Math.sin(time * speed * 3 + angle * 2 + blob.phase) * 0.2;
                    const px = cx + Math.cos(angle) * r * wobble;
                    const py = cy + Math.sin(angle) * r * wobble;

                    if (i === 0) {
                        ctx.moveTo(px, py);
                    } else {
                        const prevAngle = (i - 0.5) * angleStep;
                        const cpWobble = 1 + Math.sin(time * speed * 3 + prevAngle * 2 + blob.phase) * 0.2;
                        const cpx = cx + Math.cos(prevAngle) * r * 1.1 * cpWobble;
                        const cpy = cy + Math.sin(prevAngle) * r * 1.1 * cpWobble;
                        ctx.quadraticCurveTo(cpx, cpy, px, py);
                    }
                }

                ctx.closePath();
                ctx.fill();
            });
        };
        draw();

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [colors, speed, opacity]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ zIndex: 0, filter: 'blur(60px)' }}
        />
    );
};

export default GradientMesh;
