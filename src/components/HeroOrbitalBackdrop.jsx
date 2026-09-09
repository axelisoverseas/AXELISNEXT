'use client';

import React, { useEffect, useRef } from 'react';

// The descent completes over roughly the first screen of scrolling.
const DESCENT_PX = 700;

/**
 * Orbital descent.
 *
 * The hero photograph is Earth from low orbit, so scrolling is given the one
 * meaning the image already carries: you lose altitude. The planet scales up
 * and drifts down while the star layer above it rises, which separates the two
 * planes and reads as descent rather than as a parallax trick.
 *
 * This is the page's single orchestrated motion moment. Everything below the
 * fold stays still on purpose — scattering effects through every section is
 * what makes a site feel generated rather than designed.
 *
 * Driven by a native scroll listener rather than framer's useScroll: this
 * backdrop is absolutely positioned, so it cannot be used as a scroll target,
 * and a spring bound to window scroll did not track reliably here. A single
 * rAF-throttled listener writing transforms directly is cheaper than a spring
 * and behaves the same on every browser.
 *
 * Respects prefers-reduced-motion by never attaching the listener.
 */
export default function HeroOrbitalBackdrop() {
  const earthRef = useRef(null);
  const starsRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return undefined;

    let frame = 0;

    const apply = () => {
      frame = 0;
      const earth = earthRef.current;
      const stars = starsRef.current;
      if (!earth) return;

      // 0 at the top of the page, 1 once the descent is complete.
      const t = Math.min(1, Math.max(0, window.scrollY / DESCENT_PX));

      const scale = 1 + t * 0.35;
      const driftY = t * 14;
      earth.style.transform = `translate3d(0, ${driftY}%, 0) scale(${scale})`;
      // Atmosphere thickens only in the last stretch of the fall.
      earth.style.filter = t > 0.7 ? `blur(${((t - 0.7) / 0.3) * 3}px)` : 'none';

      if (stars) stars.style.transform = `translate3d(0, ${-t * 22}%, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Star field — sits behind the planet and rises as you descend */}
      <div
        ref={starsRef}
        aria-hidden="true"
        className="absolute -inset-y-[18%] inset-x-0 opacity-70 will-change-transform"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(1px 1px at 12% 22%, rgba(255,255,255,0.9) 0, transparent 100%),' +
              'radial-gradient(1px 1px at 68% 12%, rgba(255,255,255,0.75) 0, transparent 100%),' +
              'radial-gradient(1.5px 1.5px at 84% 44%, rgba(255,255,255,0.85) 0, transparent 100%),' +
              'radial-gradient(1px 1px at 33% 61%, rgba(255,255,255,0.7) 0, transparent 100%),' +
              'radial-gradient(1px 1px at 51% 33%, rgba(255,255,255,0.6) 0, transparent 100%),' +
              'radial-gradient(1.5px 1.5px at 22% 78%, rgba(255,255,255,0.8) 0, transparent 100%),' +
              'radial-gradient(1px 1px at 91% 70%, rgba(255,255,255,0.65) 0, transparent 100%),' +
              'radial-gradient(1px 1px at 44% 88%, rgba(255,255,255,0.7) 0, transparent 100%)',
          }}
        />
      </div>

      {/* Earth */}
      <img
        ref={earthRef}
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2400&q=80&auto=format&fit=crop"
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />

      {/* Top and bottom fades — the middle stays clear so the planet reads */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)] via-[var(--storm-deep)]/35 to-[var(--storm-deep)]" />

      {/* Vignette keeps the headline legible over the planet */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 55%, rgba(0,0,0,0.65) 0%, transparent 75%)' }}
      />

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--storm-electric)]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--dawn-glow)]/10 rounded-full blur-[120px]" />
    </div>
  );
}
