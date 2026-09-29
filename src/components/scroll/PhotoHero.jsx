'use client';

import React, { useEffect, useRef, useState } from 'react';
import s from './scroll.module.css';
import { useScrollKit, pinned, DESKTOP, prefersReducedMotion } from './useScrollKit';

/**
 * Hero with a photo window on the right that opens to full bleed as you
 * scroll, while up to four photos fly apart and the headline turns white.
 * The headline types itself once; without motion it is simply there.
 */
export default function PhotoHero({ id, eyebrow, title, lede, meta = [], photo, floats = [], faces = [], length = 220, children }) {
  const ref = useRef(null);
  const [typed, setTyped] = useState(title);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let i = 0, t;
    setTyped('');
    const step = () => { setTyped(title.slice(0, ++i)); if (i < title.length) t = setTimeout(step, 34); };
    t = setTimeout(step, 250);
    return () => clearTimeout(t);
  }, [title]);

  useScrollKit(ref, ({ gsap, reduced, el, all, mm }) => {
    if (reduced) return;
    gsap.to(el('[data-grid]'), { y: 120, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1 } });
    mm.add(DESKTOP, () => {
      const tl = gsap.timeline({ scrollTrigger: pinned(ref.current) });
      tl.fromTo(el('[data-window]'), { clipPath: 'inset(10% 5% 10% 52% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power1.inOut', duration: 1 }, 0)
        .fromTo(el('[data-window] img'), { scale: 1.3 }, { scale: 1, ease: 'none', duration: 1 }, 0)
        .fromTo(el('[data-shade]'), { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.3 }, 0.3)
        .to(el('[data-herotext]'), { color: '#fff', ease: 'none', duration: 0.12 }, 0.36)
        .to(el('[data-herotext]'), { y: -40, ease: 'none', duration: 1 }, 0)
        .to({}, { duration: 0.35 }); // hold the full-bleed frame before the next section
      all('[data-float]').forEach((node, i) => {
        const dir = i % 2 ? 1 : -1, d = [1.4, 0.8, 1.1, 0.6][i] || 1;
        tl.to(node, { xPercent: dir * 120 * d, yPercent: -60 * d, rotate: dir * 8, opacity: 0, ease: 'none', duration: 1 }, 0);
      });
    });
  });

  return (
    <section id={id} ref={ref} className={`${s.kit} ${s.hero} ${s.tall}`} style={{ height: `${length}vh` }}>
      <div className={s.stick}>
        <div className={s.grid} data-grid />
        <div className={s.window} data-window>
          <img src={photo.src} alt={photo.alt} width={photo.width || 1600} height={photo.height || 1067} fetchPriority="high" style={photo.position ? { objectPosition: photo.position } : undefined} />
          <div className={s.shade} data-shade />
        </div>
        {floats.slice(0, 4).map((f, i) => (
          <div key={f.alt} className={`${s.float} ${s[`f${i}`]}`} data-float>
            <img src={f.src} alt={f.alt} width="400" height="500" />
            <span>{f.alt}</span>
          </div>
        ))}
        <div className={`${s.wrap} ${s.heroText}`} data-herotext>
          {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
          <h1 className={s.h1} aria-label={title}>
            <span className={typed.length < title.length ? s.caret : ''} aria-hidden="true">{typed}</span>
          </h1>
          {lede && <p className={s.lede}>{lede}</p>}
          {children && <div className={s.actions}>{children}</div>}
          {faces.length > 0 && (
            <div className={s.faceStrip}>
              <span className={s.faceRow} aria-hidden="true">
                {faces.map((f) => <img key={f.name} src={f.img} alt="" width="44" height="44" />)}
              </span>
              <span className={s.faceText}>
                <b>{faces.map((f) => f.name.split(' ')[0]).join(', ')}</b> and 5,000+ more, placed by Axelis
              </span>
            </div>
          )}
          {meta.length > 0 && <div className={s.meta}>{meta.map((m) => <span key={m}>{m}</span>)}</div>}
        </div>
        <p className={s.cue} aria-hidden="true">Scroll</p>
      </div>
    </section>
  );
}
