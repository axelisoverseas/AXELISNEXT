import React, { useRef, useState, useCallback } from 'react';

const MagneticButton = ({ children, className = '', strength = 0.3, radius = 200 }) => {
    const btnRef = useRef(null);
    const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });

    const handleMouseMove = useCallback((e) => {
        const btn = btnRef.current;
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < radius) {
            const pull = (1 - dist / radius) * strength;
            setTransform({
                x: distX * pull,
                y: distY * pull,
                scale: 1 + pull * 0.08,
            });
        }
    }, [strength, radius]);

    const handleMouseLeave = useCallback(() => {
        setTransform({ x: 0, y: 0, scale: 1 });
    }, []);

    return (
        <div
            ref={btnRef}
            className={`inline-block ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                transition: transform.x === 0 ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
                willChange: 'transform',
            }}
        >
            {children}
        </div>
    );
};

export default MagneticButton;
