'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import s from './scroll.module.css';
import { useScrollKit, pinned, DESKTOP } from './useScrollKit';

/**
 * Real students, dealt one card at a time. The quote, name and university
 * beside the deck follow the card on top.
 */
export default function StoryDeck({ id, eyebrow, stories, moreHref = '/testimonials', moreLabel = 'Every story, in full', perCard = 70 }) {
  const ref = useRef(null);
  const [story, setStory] = useState(0);

  useScrollKit(ref, ({ gsap, reduced, all, mm }) => {
    if (reduced) return;
    mm.add(DESKTOP, () => {
      const cards = all('[data-card]');
      const tl = gsap.timeline({ scrollTrigger: pinned(ref.current, {
        onUpdate: (st) => setStory(Math.min(cards.length - 1, Math.floor(st.progress * (cards.length - 1) + 0.5))),
      }) });
      cards.forEach((c, i) => {
        if (i === 0) return;
        const rot = ((i % 3) - 1) * 6;
        tl.fromTo(c, { yPercent: 130, rotate: rot * 2.2, opacity: 0 }, { yPercent: 0, rotate: rot, opacity: 1, ease: 'power2.out', duration: 1 }, i - 1)
          .fromTo(cards[i - 1], { scale: 1, filter: 'brightness(1)' }, { scale: 0.92, filter: 'brightness(0.72)', duration: 1 }, i - 1);
      });
    });
  });

  const current = stories[story] || stories[0];

  return (
    <section id={id} ref={ref} className={`${s.kit} ${s.tall}`} style={{ height: `${stories.length * perCard}vh` }}>
      <div className={s.stick}>
        <div className={`${s.wrap} ${s.storyGrid}`}>
          <div>
            {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
            <p className={s.storyCount}>
              <b>{String(story + 1).padStart(2, '0')}</b> / {String(stories.length).padStart(2, '0')}
            </p>
            <blockquote className={s.quote} key={current.name}>“{current.quote}”</blockquote>
            <p className={s.who}><b>{current.name}</b><br />{current.university}, {current.country}</p>
            {moreHref && <Link href={moreHref} className={s.inline}>{moreLabel} <ArrowRight size={16} aria-hidden="true" /></Link>}
          </div>
          <div className={s.deck}>
            {stories.map((t, i) => (
              <figure key={t.name} className={s.storyCard} data-card style={{ zIndex: i + 1 }}>
                <img src={t.img} alt={t.name} width="600" height="750" loading="eager" />
                <figcaption><b>{t.name}</b><span>{t.university}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
