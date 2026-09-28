'use client';

import React, { useRef } from 'react';
import s from './scroll.module.css';
import { useScrollKit, pinned, DESKTOP, PHONE } from './useScrollKit';

const fmt = (st, v) => `${st.pre || ''}${Math.round(v).toLocaleString('en-IN')}${st.suf || ''}`;

/**
 * Pinned count-ups. Each figure counts in turn while its photo wipes open
 * beside it. Figures render at their final values, so without JavaScript or
 * with reduced motion the real numbers are what you see.
 */
export default function CountUpProof({ id, eyebrow, title, stats, extra = [], length = 400 }) {
  const ref = useRef(null);

  useScrollKit(ref, ({ gsap, reduced, all, mm }) => {
    if (reduced) return;
    mm.add(DESKTOP, () => {
      const tl = gsap.timeline({ scrollTrigger: pinned(ref.current) });
      all('[data-stat]').forEach((row, i) => {
        const st = stats[i], n = row.querySelector('[data-n]'), o = { v: 0 };
        n.textContent = fmt(st, 0);
        tl.to(o, { v: st.to, ease: 'none', duration: 1, onUpdate: () => { n.textContent = fmt(st, o.v); } }, i)
          .fromTo(row.querySelector('i'), { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, i)
          .fromTo(row, { opacity: 0.25 }, { opacity: 1, duration: 0.3 }, i)
          .fromTo(all('[data-statimg]')[i], { clipPath: i ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 }, i)
          .fromTo(all('[data-statimg] img')[i], { scale: 1.25 }, { scale: 1, ease: 'none', duration: 1 }, i);
      });
    });
    mm.add(PHONE, () => {
      all('[data-stat]').forEach((row, i) => {
        const st = stats[i], n = row.querySelector('[data-n]'), o = { v: 0 };
        n.textContent = fmt(st, 0);
        gsap.to(o, { v: st.to, ease: 'none', onUpdate: () => { n.textContent = fmt(st, o.v); },
          scrollTrigger: { trigger: row, start: 'top 85%', end: 'top 40%', scrub: 1 } });
      });
    });
  });

  return (
    <section id={id} ref={ref} className={`${s.kit} ${s.tall}`} style={{ height: `${length}vh` }}>
      <div className={s.stick}>
        <div className={`${s.wrap} ${s.proofGrid}`}>
          <div>
            {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
            <h2 className={s.h2}>{title}</h2>
            <div className={s.stats}>
              {stats.map((st) => (
                <div key={st.label} data-stat>
                  <div className={s.n} data-n>{fmt(st, st.to)}</div>
                  <div className={s.l}>{st.label}</div>
                  <div className={s.bar}><i /></div>
                </div>
              ))}
            </div>
            {extra.length > 0 && (
              <p className={s.extra}>
                {extra.map((x) => <span key={x.label}><b>{x.value}</b>{x.label}</span>)}
              </p>
            )}
          </div>
          <div className={s.statStack} aria-hidden="true">
            {stats.map((st) => (
              <div key={st.label} className={s.statImg} data-statimg>
                <img src={st.img} alt="" width="1200" height="900" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
