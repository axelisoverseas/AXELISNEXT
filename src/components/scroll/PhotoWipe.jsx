'use client';

import React, { useRef } from 'react';
import s from './scroll.module.css';
import { useScrollKit } from './useScrollKit';

/** A photo that wipes open from one side and settles its zoom as it scrolls into view. Reversible. */
export default function PhotoWipe({ src, alt = '', from = 'left', className = '', width = 1200, height = 800 }) {
  const ref = useRef(null);

  useScrollKit(ref, ({ gsap, reduced, el }) => {
    if (reduced) return;
    const start = from === 'right' ? 'inset(0% 0% 0% 100%)' : from === 'bottom' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)';
    gsap.fromTo(ref.current, { clipPath: start }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'top 40%', scrub: 1 } });
    gsap.fromTo(el('img'), { scale: 1.3 }, { scale: 1, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'bottom top', scrub: 1 } });
  });

  return (
    <div ref={ref} className={`${s.wipe} ${className}`}>
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
    </div>
  );
}
