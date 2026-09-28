'use client';

import { useEffect } from 'react';

/**
 * Shared plumbing for the scroll-story components (see /receipts, the
 * homepage, /testimonials and /products).
 *
 * GSAP and Lenis are loaded on demand, so pages that never scroll-animate do
 * not pay for them. Everything a component creates lives inside one
 * gsap.context and one gsap.matchMedia, and is reverted on unmount.
 */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smooth scroll for a page. Call once per page, in the page's client root. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let lenis, tick, gsapRef, alive = true;
    (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import('gsap'), import('gsap/ScrollTrigger'), import('lenis'),
      ]);
      if (!alive) return;
      gsap.registerPlugin(ScrollTrigger);
      gsapRef = gsap;
      lenis = new Lenis({ autoRaf: false, duration: 1.1 });
      window.lenis = lenis; // useLenis() looks for this
      lenis.on('scroll', ScrollTrigger.update);
      tick = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    })();
    return () => {
      alive = false;
      if (lenis) {
        gsapRef?.ticker.remove(tick);
        lenis.destroy();
        if (window.lenis === lenis) delete window.lenis;
      }
    };
  }, []);
}

/**
 * Run `setup` once GSAP is loaded, scoped to `ref`. `setup` receives
 * { gsap, ScrollTrigger, reduced, el, all, mm } and may return a cleanup.
 * With reduced motion, `setup` still runs (for counters and the like) and
 * is expected to skip its animations.
 */
export function useScrollKit(ref, setup) {
  useEffect(() => {
    let ctx, mm, extra, alive = true;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (!alive || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const root = ref.current;
      mm = gsap.matchMedia();
      ctx = gsap.context(() => {
        extra = setup({
          gsap,
          ScrollTrigger,
          reduced: prefersReducedMotion(),
          el: (s) => root.querySelector(s),
          all: (s) => root.querySelectorAll(s),
          mm,
        });
      }, root);
      // Correct on a mid-page reload and after webfonts and images settle.
      const refresh = () => alive && ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      if (document.readyState === 'complete') requestAnimationFrame(refresh);
      else window.addEventListener('load', refresh, { once: true });
    })();
    return () => {
      alive = false;
      if (typeof extra === 'function') extra();
      mm?.revert();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Scrubbed timeline over a tall section whose inner block is CSS-sticky. */
export const pinned = (trigger, extra = {}) => ({ trigger, start: 'top top', end: 'bottom bottom', scrub: 1, ...extra });

export const DESKTOP = '(min-width: 821px)';
export const PHONE = '(max-width: 820px)';
