'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import s from './receipts.module.css';

const LINE = 'Study abroad, without guessing at the cost.';

// Figures the site already publishes (HomeClient stats band). Rendered at their
// final values, so a reader without JavaScript or with reduced motion sees the
// real numbers; the count-up only starts from zero once motion is allowed.
const STATS = [
  { to: 5000, suf: '+', label: 'Students placed' },
  { to: 4500, suf: '+', label: 'Visas approved' },
  { to: 90, suf: '%', label: 'Visa success rate' },
  { to: 30, pre: '₹', suf: '+ Cr', label: 'Education loans facilitated' },
];

const SECTIONS = ['hero', 'proof', 'promise', 'charters', 'countries', 'close'];
const fmt = (st, v) => `${st.pre || ''}${Math.round(v).toLocaleString('en-IN')}${st.suf || ''}`;
const CODES = { 'United Kingdom': 'UK', Germany: 'DE', USA: 'US', France: 'FR', Canada: 'CA', Italy: 'IT', Australia: 'AU', Netherlands: 'NL', Ireland: 'IE', Finland: 'FI' };
const code = (name) => CODES[name] || name.slice(0, 2).toUpperCase();

export default function ReceiptsClient({ total, destinations, rail }) {
  const root = useRef(null);
  const [receipts, setReceipts] = useState(0);
  const [dark, setDark] = useState(false);
  const [typed, setTyped] = useState(LINE);

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ctx, lenis, tick, alive = true, timer;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (!alive) return;
      gsap.registerPlugin(ScrollTrigger);
      const q = (sel) => root.current.querySelectorAll(sel);

      if (!reduced) {
        const { default: Lenis } = await import('lenis');
        if (!alive) return;
        lenis = new Lenis({ autoRaf: false, duration: 1.1 });
        window.lenis = lenis; // useLenis() looks for this
        lenis.on('scroll', ScrollTrigger.update);
        tick = (t) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        let i = 0;
        setTyped('');
        const step = () => { setTyped(LINE.slice(0, ++i)); if (i < LINE.length) timer = setTimeout(step, 34); };
        timer = setTimeout(step, 250);
      }

      ctx = gsap.context(() => {
        // Receipts unlock as each section is reached, and lock again on the way back up.
        SECTIONS.forEach((id) =>
          ScrollTrigger.create({
            trigger: `#r-${id}`, start: 'top 62%',
            onEnter: () => setReceipts((n) => n + 1),
            onLeaveBack: () => setReceipts((n) => n - 1),
          }));
        ScrollTrigger.create({ trigger: '#r-charters', start: 'top 50%', end: 'bottom 50%', onToggle: (st) => setDark(st.isActive) });

        if (reduced) return;

        q('[data-stat]').forEach((el, i) => {
          const st = STATS[i];
          const n = el.querySelector('[data-n]');
          const o = { v: 0 };
          n.textContent = fmt(st, 0);
          const scrub = { trigger: '#r-proof', start: 'top 80px', end: 'bottom bottom', scrub: 1 };
          gsap.to(o, { v: st.to, ease: 'none', scrollTrigger: scrub, onUpdate: () => { n.textContent = fmt(st, o.v); } });
          gsap.to(el.querySelector('i'), { scaleX: 1, ease: 'none', scrollTrigger: { ...scrub } });
          gsap.from(el, { y: 26, opacity: 0, duration: 0.6, delay: i * 0.07, scrollTrigger: { trigger: '#r-proof', start: 'top 80%' } });
        });

        gsap.fromTo(q('[data-rise]'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: '#r-promise', start: 'top 68%' } });

        gsap.from(q('[data-card]'), { y: 30, opacity: 0, duration: 0.7, stagger: 0.13, scrollTrigger: { trigger: '#r-charters', start: 'top 62%' } });

        // Horizontal rail, desktop only. On a phone the track is a native swipe row.
        const mm = gsap.matchMedia();
        mm.add('(min-width: 821px)', () => {
          const track = root.current.querySelector('[data-track]');
          gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth + 40), ease: 'none',
            scrollTrigger: { trigger: '#r-countries', start: 'top 80px', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true },
          });
        });

        gsap.to(q('[data-grid]'), { y: 90, ease: 'none', scrollTrigger: { trigger: '#r-hero', start: 'top top', end: 'bottom top', scrub: 1 } });
      }, root);

      // Correct on a mid-page reload and after the webfont swaps in.
      document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());
    })();

    return () => {
      alive = false;
      clearTimeout(timer);
      ctx?.revert();
      if (lenis) {
        import('gsap').then(({ gsap }) => tick && gsap.ticker.remove(tick));
        lenis.destroy();
        if (window.lenis === lenis) delete window.lenis;
      }
    };
  }, []);

  return (
    <div ref={root} className={s.page}>
      <div className={`${s.rail} ${dark ? s.railDark : ''}`} aria-hidden="true">
        receipts <b>{receipts}/{SECTIONS.length}</b>
      </div>

      <section id="r-hero" className={s.hero}>
        <div className={s.grid} data-grid />
        <div className={s.wrap}>
          <p className={s.eyebrow}>Bengaluru + Bilaspur · {destinations} destinations</p>
          <h1 className={s.h1} aria-label={LINE}>
            <span className={typed.length < LINE.length ? s.caret : ''} aria-hidden="true">{typed}</span>
          </h1>
          <p className={s.lede} style={{ marginTop: '2rem' }}>
            One counsellor from shortlist to arrival, and every fee published before you pay.
          </p>
          <div className={s.meta}>
            <span>4.9 on Google · 75 reviews</span>
            <span>{total.toLocaleString('en-IN')} universities in our finder</span>
            <span>CIN U85500CT2023PTC014913</span>
          </div>
          <p className={s.cue} aria-hidden="true">Scroll ↓</p>
        </div>
      </section>

      <section id="r-proof" className={s.proof}>
        <div className={s.stick}>
          <div className={s.wrap}>
            <p className={s.eyebrow}>Receipt 2 · The numbers</p>
            <h2 className={`${s.h2} ${s.h2sm}`} style={{ marginTop: '1rem' }}>
              The numbers we publish, and will keep publishing.
            </h2>
            <div className={s.stats}>
              {STATS.map((st) => (
                <div key={st.label} data-stat>
                  <div className={s.n} data-n>{fmt(st, st.to)}</div>
                  <div className={s.l}>{st.label}</div>
                  <div className={s.bar}><i /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="r-promise" className={s.promise}>
        <div className={s.wrap}>
          <p className={`${s.eyebrow}`} data-rise>Receipt 3 · The promise</p>
          <h2 className={`${s.h2}`} style={{ marginTop: '1.2rem' }} data-rise>
            Every fee on the page before you pay a rupee.
          </h2>
          <p className={`${s.lede}`} style={{ marginTop: '1.8rem' }} data-rise>
            No consultation fee. Refund conditions written down, and the no-refund conditions
            written down just as clearly. 18% GST shown on the receipt, never added later.
          </p>
        </div>
      </section>

      <section id="r-charters" className={s.charters}>
        <div className={s.wrap}>
          <p className={s.eyebrow} style={{ color: '#8fb0ff' }}>Receipt 4 · Two charters</p>
          <h2 className={s.h2} style={{ marginTop: '1.2rem' }}>Two charters. Pick your path.</h2>
          <div className={s.cards}>
            <div className={s.card} data-card>
              <p className={s.tag}>GAC</p>
              <h3 className={s.h3} style={{ marginTop: '.7rem', fontSize: '1.6rem' }}>Global Admissions Charter</h3>
              <p className={s.price}>₹9,999 <small>+ GST, refundable</small></p>
              <p>
                Paid-tuition universities: the UK, USA, Canada, Ireland, Australia and more. The deposit
                comes back once you are placed, or if no university on your list makes you an offer.
              </p>
              <Link href="/charters#gac" className={s.cardLink}>Read every GAC term</Link>
            </div>
            <div className={s.card} data-card>
              <p className={s.tag}>EPC</p>
              <h3 className={s.h3} style={{ marginTop: '.7rem', fontSize: '1.6rem' }}>Europe Public Charter</h3>
              <p className={s.price}>₹19,999 <small>+ GST now</small></p>
              <p>
                Tuition-free public universities in Germany, France, Italy, the Netherlands and more.
                Refunded if no university on your list makes an offer. Private universities included free.
              </p>
              <Link href="/charters#epc" className={s.cardLink}>Read every EPC term</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="r-countries" className={s.countries}>
        <div className={s.stick}>
          <div className={s.wrap} style={{ marginBottom: '2.6rem' }}>
            <p className={s.eyebrow}>Receipt 5 · Where</p>
            <h2 className={`${s.h2} ${s.h2sm}`} style={{ marginTop: '.8rem' }}>{destinations} destinations. Ten of them here.</h2>
          </div>
          <div className={s.track} data-track>
            {rail.map((c) => (
              <div key={c.name} className={s.ct}>
                <p className={s.code}>{code(c.name)} · {c.route}</p>
                <h3 className={s.h3}>{c.name}</h3>
                <p className={s.ctn}>
                  {c.n ? `${c.n.toLocaleString('en-IN')} institutions in the finder` : 'Shortlisted with your counsellor'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="r-close" className={s.close}>
        <div className={s.wrap}>
          <p className={s.eyebrow}>Receipt 6 · Next step</p>
          <h2 className={s.h2} style={{ marginTop: '1.2rem' }}>See the fees before you commit.</h2>
          <Link href="/bookings" className={`btn btn-primary btn-lg ${s.cta}`}>
            Book a free counselling call <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
