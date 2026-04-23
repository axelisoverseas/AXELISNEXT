'use client';

import React, { useRef, useState } from 'react';

export const Tilt3DCard = ({ children, className = '', max = 10, scale = 1.02 }) => {
  const ref = useRef(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg) scale(1)');

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * max;
    const rotateX = -((y - cy) / cy) * max;
    setTransform(`rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`);
  };

  const reset = () => setTransform('rotateX(0deg) rotateY(0deg) scale(1)');

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        transition: 'transform 200ms ease-out',
        perspective: '1000px',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default Tilt3DCard;
