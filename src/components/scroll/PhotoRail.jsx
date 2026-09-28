'use client';

import React, { useRef } from 'react';
import s from './scroll.module.css';
import { useScrollKit, pinned, DESKTOP } from './useScrollKit';

/** Full-photo cards on a sideways rail driven by vertical scroll; a swipe row on phones. */
export default function PhotoRail({ id, eyebrow, title, items, length = 360 }) {
  const ref = useRef(null);

  useScrollKit(ref, ({ gsap, reduced, el, all, mm }) => {
    if (reduced) return;
    mm.add(DESKTOP, () => {
      const track = el('[data-track]');
      const tl = gsap.timeline({ scrollTrigger: pinned(ref.current, { invalidateOnRefresh: true }) });
      tl.to(track, { x: () => -(track.scrollWidth - window.innerWidth + 48), ease: 'none' }, 0);
      all('[data-track] img').forEach((img) => tl.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: 'none' }, 0));
    });
  });

  return (
    <section id={id} ref={ref} className={`${s.kit} ${s.tall}`} style={{ height: `${length}vh` }}>
      <div className={s.stick}>
        <div className={s.wrap} style={{ marginBottom: '2rem' }}>
          {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
          <h2 className={s.h2}>{title}</h2>
        </div>
        <div className={s.track} data-track>
          {items.map((c) => (
            <div key={c.name} className={s.ct}>
              <img src={c.img} alt={c.name} width="1200" height="800" loading="lazy" />
              <div className={s.ctText}>
                {c.code && <p className={s.code}>{c.code}{c.route ? ` · ${c.route}` : ''}</p>}
                <h3 className={s.h3}>{c.name}</h3>
                {c.note && <p className={s.ctn}>{c.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
