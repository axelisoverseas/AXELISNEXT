'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import s from './receipts.module.css';
import { useScrollKit, useSmoothScroll } from '@/components/scroll/useScrollKit';
import PhotoHero from '@/components/scroll/PhotoHero';
import CountUpProof from '@/components/scroll/CountUpProof';
import StoryDeck from '@/components/scroll/StoryDeck';
import PhotoRail from '@/components/scroll/PhotoRail';
import VideoPhone from '@/components/scroll/VideoPhone';
import PhotoWipe from '@/components/scroll/PhotoWipe';
import { STUDENT_STORIES, IMPACT_STATS, HERO_PHOTO, HERO_FLOATS, ANJALI_VIDEO } from '@/data/studentStories';

const SECTIONS = ['hero', 'proof', 'promise', 'stories', 'charters', 'countries', 'video', 'close'];

const CHARTERS = [
  { k: 'gac', tag: 'GAC', name: 'Global Admissions Charter', price: '₹9,999', small: '+ GST, refundable', img: '/photos/photo-1513635269975-59663e0ac1ad-1200.jpg', alt: 'London', from: 'left',
    body: 'Paid-tuition universities: the UK, USA, Canada, Ireland, Australia and more. The deposit comes back once you are placed, or if no university on your list makes you an offer.' },
  { k: 'epc', tag: 'EPC', name: 'Europe Public Charter', price: '₹19,999', small: '+ GST now', img: '/photos/photo-1527866959252-deab85ef7d1b-1200.jpg', alt: 'Germany', from: 'right',
    body: 'Tuition-free public universities in Germany, France, Italy, the Netherlands and more. Refunded if no university on your list makes an offer. Private universities included free.' },
  { k: 'ilc', tag: 'ILC · New', name: 'Ivy League Charter', price: '₹19,999', small: '+ GST now', img: '/photos/photo-1485871981521-5b1fd3805eee-1200.jpg', alt: 'New York', from: 'left', href: '/ivy-league',
    body: "Master's and MBA applications to the eight Ivy League universities. Refunded if no university on your list makes an offer. ₹1,80,000 only if you accept an Ivy League offer." },
];

export default function ReceiptsClient({ total, destinations, rail }) {
  const root = useRef(null);
  const [receipts, setReceipts] = useState(0);
  const [dark, setDark] = useState(false);

  useSmoothScroll();

  // The receipts rail: one unlocks per section reached, and locks again on the way back up.
  useScrollKit(root, ({ gsap, ScrollTrigger, reduced, all, el }) => {
    SECTIONS.forEach((id) =>
      ScrollTrigger.create({
        trigger: `#r-${id}`, start: 'top 62%',
        onEnter: () => setReceipts((n) => n + 1),
        onLeaveBack: () => setReceipts((n) => n - 1),
      }));
    ['#r-charters', '#r-video'].forEach((id) =>
      ScrollTrigger.create({ trigger: id, start: 'top 50%', end: 'bottom 50%', onToggle: (st) => setDark(st.isActive) }));
    if (reduced) return;
    gsap.fromTo(all('[data-line]'), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.15, ease: 'none',
      scrollTrigger: { trigger: '#r-promise', start: 'top 75%', end: 'center 55%', scrub: 1 } });
    gsap.fromTo(el('[data-closeh]'), { scale: 0.82, opacity: 0.2 }, { scale: 1, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: '#r-close', start: 'top 85%', end: 'top 30%', scrub: 1 } });
  });

  return (
    <div ref={root} className={s.page}>
      <div className={`${s.rail} ${dark ? s.railDark : ''}`} aria-hidden="true">
        receipts <b>{receipts}/{SECTIONS.length}</b>
      </div>

      <PhotoHero
        id="r-hero"
        eyebrow={`For students across India · ${destinations} destinations`}
        title="Study abroad, without guessing at the cost."
        lede="One counsellor from shortlist to arrival, and every fee published before you pay."
        meta={['4.9 on Google · 75 reviews', `${total.toLocaleString('en-IN')} universities in our finder`, 'CIN U85500CT2023PTC014913']}
        photo={HERO_PHOTO}
        floats={HERO_FLOATS}
      />

      <CountUpProof id="r-proof" eyebrow="Receipt 2 · The numbers" title="The numbers we publish, and will keep publishing." stats={IMPACT_STATS} />

      <section id="r-promise" className={s.promise}>
        <div className={s.wrap}>
          <p className={s.eyebrow}>Receipt 3 · The promise</p>
          <h2 className={s.mega}>
            {['Every fee', 'on the page', 'before you pay', 'a rupee.'].map((l) => (
              <span key={l} className={s.lineMask}><span data-line>{l}</span></span>
            ))}
          </h2>
          <p className={s.lede}>
            No consultation fee. Refund conditions written down, and the no-refund conditions
            written down just as clearly. 18% GST shown on the receipt, never added later.
          </p>
        </div>
      </section>

      <StoryDeck id="r-stories" eyebrow="Receipt 4 · The students" stories={STUDENT_STORIES} />

      <section id="r-charters" className={s.charters}>
        <div className={s.wrap}>
          <p className={s.eyebrow} style={{ color: '#8fb0ff' }}>Receipt 5 · Three charters</p>
          <h2 className={s.h2}>Three charters. Pick your path.</h2>
          <div className={s.cards}>
            {CHARTERS.map((c) => (
              <div key={c.k} className={s.card}>
                <PhotoWipe src={c.img} alt={c.alt} from={c.from} className={s.cardImg} />
                <div className={s.cardBody}>
                  <p className={s.tag}>{c.tag}</p>
                  <h3 className={s.h3}>{c.name}</h3>
                  <p className={s.price}>{c.price} <small>{c.small}</small></p>
                  <p>{c.body}</p>
                  <Link href={c.href || `/charters#${c.k}`} className={s.cardLink}>Read every {c.tag.split(' ')[0]} term</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PhotoRail id="r-countries" eyebrow="Receipt 6 · Where" title={`${destinations} destinations. Eight of them here.`} items={rail} />

      <VideoPhone id="r-video" eyebrow="Receipt 7 · In her words" video={ANJALI_VIDEO} />

      <section id="r-close" className={s.close}>
        <div className={s.wrap}>
          <p className={s.eyebrow}>Receipt 8 · Next step</p>
          <h2 className={s.mega} data-closeh>See the fees before you commit.</h2>
          <div className={s.ctaRow}>
            <Link href="/bookings" className="btn btn-primary btn-lg">
              Book a free counselling call <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/charters" className="btn btn-secondary btn-lg">Read all three charters</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
