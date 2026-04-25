'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SpiralAnimation } from './SpiralAnimation';
import { playThunder } from '../../lib/thunder';

const SESSION_KEY = 'axelis_intro_seen_v1';

/**
 * Full-screen spiral intro overlay.
 * - Shows once per browser session (sessionStorage gate).
 * - Locks scroll while visible.
 * - Enter button fades in after ~1.8s; click / Enter / Esc / Space dismisses with a fade-out.
 * - Add ?intro=force to the URL to replay during the same session.
 *
 * To prevent a flash of the real page before this component hydrates, an inline
 * blocking script in <head> (see src/app/layout.js) adds `intro-pending` to
 * <html> when the intro should show, and CSS paints an immediate black cover
 * under this overlay. This component's initial state mirrors that class, so
 * the React overlay renders synchronously on the first paint after hydration.
 */
export default function SpiralIntro() {
  // Initialize from the html class set by the blocking head script — this
  // avoids the one-tick `useState(false)` → `useEffect setMounted(true)` gap
  // that was letting the page flash through. Component is dynamic(..., ssr:false),
  // so `document` is always defined here.
  const [mounted, setMounted] = useState(() => {
    if (typeof document === 'undefined') return false;
    if (document.documentElement.classList.contains('intro-pending')) return true;
    // Fallback: if the inline script didn't run for some reason, re-check.
    try {
      const forced = new URL(window.location.href).searchParams.get('intro') === 'force';
      if (forced || !sessionStorage.getItem(SESSION_KEY)) return true;
    } catch {}
    return false;
  });
  const [showEnter, setShowEnter] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const prevOverflowRef = useRef('');

  const handleEnter = useCallback(() => {
    setDismissing(true);
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {}
    // Thunder roll — fires from the user gesture so browser autoplay policies pass.
    try { playThunder({ volume: 0.7 }); } catch {}
    // Drop the html class immediately so the CSS black cover fades with the overlay,
    // not after it — otherwise there's a visible "pop" when the cover disappears.
    document.documentElement.classList.remove('intro-pending');
    setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = prevOverflowRef.current;
    }, 900);
  }, []);

  // Lock scroll once we know we're showing. (The CSS already locks scroll via
  // html.intro-pending, but we also reset body overflow on unmount for safety.)
  useEffect(() => {
    if (!mounted) return;
    prevOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Make sure the class is set (covers the case where we fell back to
    // state-init without the inline script running).
    document.documentElement.classList.add('intro-pending');
    return () => {
      document.body.style.overflow = prevOverflowRef.current;
      document.documentElement.classList.remove('intro-pending');
    };
  }, [mounted]);

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
      className={`fixed inset-0 z-[1000] w-full h-full overflow-hidden bg-black transition-opacity duration-[900ms] ease-out ${
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
