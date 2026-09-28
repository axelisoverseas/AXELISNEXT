'use client';

import React, { useEffect, useRef } from 'react';
import s from './scroll.module.css';
import { useScrollKit, pinned, DESKTOP, prefersReducedMotion } from './useScrollKit';

/**
 * A portrait video testimonial that swings in and grows inside a phone frame
 * over a blurred backdrop. The video plays muted only while it is on screen.
 */
export default function VideoPhone({ id, video, eyebrow, length = 260 }) {
  const ref = useRef(null);

  useScrollKit(ref, ({ gsap, reduced, el, all, mm }) => {
    if (reduced) return;
    mm.add(DESKTOP, () => {
      const tl = gsap.timeline({ scrollTrigger: pinned(ref.current) });
      tl.fromTo(el('[data-vid]'), { scale: 0.55, rotate: -6, xPercent: 60 }, { scale: 1, rotate: 0, xPercent: 0, ease: 'none', duration: 1 }, 0)
        .fromTo(el('[data-vidback]'), { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1.1, ease: 'none', duration: 1 }, 0)
        .fromTo(all('[data-vidcap]'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }, 0.3);
    });
  });

  useEffect(() => {
    const v = ref.current?.querySelector('video');
    if (!v || prefersReducedMotion()) return undefined;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`${s.kit} ${s.video} ${s.tall}`} style={{ height: `${length}vh` }}>
      <div className={s.stick}>
        <div className={s.vidBack} data-vidback style={{ backgroundImage: `url(${video.poster})` }} />
        <div className={`${s.wrap} ${s.vidGrid}`}>
          <div className={s.phone} data-vid style={{ aspectRatio: `${video.width} / ${video.height}` }}>
            <video src={video.src} poster={video.poster} muted loop playsInline preload="metadata"
              width={video.width} height={video.height} aria-label={`${video.caption}, video testimonial`} />
          </div>
          <div className={s.vidCaps}>
            {eyebrow && <p className={s.eyebrow} data-vidcap>{eyebrow}</p>}
            <h2 className={s.h2} data-vidcap>“{video.quote}”</h2>
            <p className={s.lede} data-vidcap>{video.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
