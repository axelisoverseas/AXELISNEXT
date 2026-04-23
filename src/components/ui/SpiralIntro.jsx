'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SpiralAnimation } from './SpiralAnimation';

const SESSION_KEY = 'axelis_intro_seen_v1';

/**
 * Full-screen spiral intro overlay.
 * - Shows once per browser session (sessionStorage gate).
 * - Locks scroll while visible.
 * - Enter button fades in after ~1.8s; click / Enter / Esc / Space dismisses with a fade-out.
 * - Add ?intro=force to the URL to replay during the same session.
 */
export default function SpiralIntro() {
  const [mounted, setMounted] = useState(false);
  const [showEnter, setShowEnter] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const prevOverflowRef = useRef('');

  const handleEnter = useCallback(() => {
    setDismissing(true);
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {}
    setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = prevOverflowRef.current;
    }, 900);
  }, []);

  // Decide on mount whether to show the overlay.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let forced = false;
    try {
      forced = new URL(window.location.href).searchParams.get('intro') === 'force';
    } catch {}

    try {
      if (!forced && sessionStorage.getItem(SESSION_KEY)) return;
    } catch {}

    setMounted(true);
    prevOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflowRef.current;
    };
  }, []);

  // Fade in the Enter button + keyboard dismiss, only once visible.
  useEffect(() => {
    if (!mounted) return;
    const enterTimer = setTimeout(() => setShowEnter(true), 1800);
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(enterTimer);
      window.removeEventListener('keydown', onKey);
    };
  }, [mounted, handleEnter]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] w-full h-full overflow-hidden bg-black transition-opacity duration-[900ms] ease-out ${
        dismissing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={dismissing}
    >
      {/* Spiral canvas */}
      <div className="absolute inset-0">
        <SpiralAnimation />
      </div>

      {/* Brand wordmark (top) */}
      <div
        className={`absolute top-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-1000 ${
          showEnter && !dismissing ? 'opacity-60' : 'opacity-0'
        }`}
      >
        <span className="text-white text-xs tracking-[0.5em] uppercase font-light">
          Axelis Overseas
        </span>
      </div>

      {/* Enter button (center) */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-1000 ease-out ${
          showEnter && !dismissing
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          type="button"
          onClick={handleEnter}
          className="text-white text-2xl tracking-[0.2em] uppercase font-extralight transition-all duration-700 hover:tracking-[0.3em] animate-pulse focus:outline-none focus:ring-2 focus:ring-white/40 focus:rounded-sm px-4 py-2"
        >
          Enter
        </button>
      </div>

      {/* Tagline (bottom) */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-1000 delay-300 ${
          showEnter && !dismissing ? 'opacity-40' : 'opacity-0'
        }`}
      >
        <span className="text-white text-[10px] tracking-[0.35em] uppercase font-light">
          Gateway to Global Education
        </span>
      </div>
    </div>
  );
}
