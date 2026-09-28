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
  { to: 5000, suf: '+', label: 'Students placed', img: '/photos/photo-1523240795612-9a054b0db644-1600.jpg' },
  { to: 4500, suf: '+', label: 'Visas approved', img: '/photos/photo-1436491865332-7a61a109cc05-1600.jpg' },
  { to: 90, suf: '%', label: 'Visa success rate', img: '/photos/photo-1488646953014-85cb44e25828-1600.jpg' },
  { to: 30, pre: '₹', suf: '+ Cr', label: 'Education loans facilitated', img: '/photos/photo-1579621970795-87facc2f976d-1200.jpg' },
];

const HERO_IMG = '/photos/photo-1541339907198-e08756dedf3f-1600.jpg';
const FLOATS = [
  { img: '/photos/photo-1513635269975-59663e0ac1ad-800.jpg', alt: 'London', pos: s.f1, depth: 1.4 },
  { img: '/photos/photo-1502602898657-3e91760cbb34-1200.jpg', alt: 'Paris', pos: s.f2, depth: 0.8 },
  { img: '/photos/photo-1590089415225-401ed6f9db8e-1200.jpg', alt: 'Dublin', pos: s.f3, depth: 1.1 },
  { img: '/photos/photo-1527866959252-deab85ef7d1b-1200.jpg', alt: 'Germany', pos: s.f4, depth: 0.6 },
];

const SECTIONS = ['hero', 'proof', 'promise', 'stories', 'charters', 'countries', 'video', 'close'];
const fmt = (st, v) => `${st.pre || ''}${Math.round(v).toLocaleString('en-IN')}${st.suf || ''}`;

export default function ReceiptsClient({ total, destinations, rail, stories }) {
  const root = useRef(null);
  const [receipts, setReceipts] = useState(0);
  const [dark, setDark] = useState(false);
  const [typed, setTyped] = useState(LINE);
  const [story, setStory] = useState(0);

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ctx, lenis, tick, io, alive = true, timer;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (!alive) return;
      gsap.registerPlugin(ScrollTrigger);
      const el = (sel) => root.current.querySelector(sel);
      const all = (sel) => root.current.querySelectorAll(sel);

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
        ['#r-charters', '#r-video'].forEach((id) =>
          ScrollTrigger.create({ trigger: id, start: 'top 50%', end: 'bottom 50%', onToggle: (st) => setDark(st.isActive) }));

        if (reduced) return;

        const pin = (id) => ({ trigger: id, start: 'top top', end: 'bottom bottom', scrub: 1 });
        const mm = gsap.matchMedia();

        /* 1 HERO: the photo window opens to full bleed, the city photos fly apart. */
        mm.add('(min-width: 821px)', () => {
          const tl = gsap.timeline({ scrollTrigger: pin('#r-hero') });
          tl.fromTo(el('[data-window]'), { clipPath: 'inset(10% 5% 10% 52% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power1.inOut', duration: 1 }, 0)
            .fromTo(el('[data-window] img'), { scale: 1.3 }, { scale: 1, ease: 'none', duration: 1 }, 0)
            .fromTo(el('[data-shade]'), { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.3 }, 0.3)
            .to(el('[data-herotext]'), { color: '#fff', ease: 'none', duration: 0.12 }, 0.36)
            .to(el('[data-herotext]'), { y: -40, ease: 'none', duration: 1 }, 0)
            .to({}, { duration: 0.35 }); // hold the full-bleed frame before the next section
          all('[data-float]').forEach((node, i) => {
            const dir = i % 2 ? 1 : -1, d = FLOATS[i].depth;
            tl.to(node, { xPercent: dir * 120 * d, yPercent: -60 * d, rotate: dir * 8, opacity: 0, ease: 'none' }, 0);
          });
        });
        gsap.to(el('[data-grid]'), { y: 120, ease: 'none', scrollTrigger: { trigger: '#r-hero', start: 'top top', end: 'bottom top', scrub: 1 } });

        /* 2 PROOF: each number counts while its photo wipes open beside it. */
        mm.add('(min-width: 821px)', () => {
          const tl = gsap.timeline({ scrollTrigger: pin('#r-proof') });
          all('[data-stat]').forEach((row, i) => {
            const st = STATS[i];
            const n = row.querySelector('[data-n]');
            const o = { v: 0 };
            n.textContent = fmt(st, 0);
            tl.to(o, { v: st.to, ease: 'none', duration: 1, onUpdate: () => { n.textContent = fmt(st, o.v); } }, i)
              .fromTo(row.querySelector('i'), { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, i)
              .fromTo(row, { opacity: 0.25 }, { opacity: 1, duration: 0.3 }, i)
              .fromTo(all('[data-statimg]')[i], { clipPath: i ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 }, i)
              .fromTo(all('[data-statimg] img')[i], { scale: 1.25 }, { scale: 1, ease: 'none', duration: 1 }, i);
          });
        });
        mm.add('(max-width: 820px)', () => {
          all('[data-stat]').forEach((row, i) => {
            const st = STATS[i], n = row.querySelector('[data-n]'), o = { v: 0 };
            n.textContent = fmt(st, 0);
            gsap.to(o, { v: st.to, ease: 'none', onUpdate: () => { n.textContent = fmt(st, o.v); },
              scrollTrigger: { trigger: row, start: 'top 85%', end: 'top 40%', scrub: 1 } });
          });
        });

        /* 3 PROMISE: line by line, scrubbed so it rewinds. */
        gsap.fromTo(all('[data-line]'), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.15, ease: 'none',
          scrollTrigger: { trigger: '#r-promise', start: 'top 75%', end: 'center 55%', scrub: 1 } });

        /* 4 STORIES (the signature move): real students, dealt one at a time. */
        mm.add('(min-width: 821px)', () => {
          const cards = all('[data-card-story]');
          const tl = gsap.timeline({ scrollTrigger: { ...pin('#r-stories'),
            onUpdate: (st) => setStory(Math.min(cards.length - 1, Math.floor(st.progress * (cards.length - 1) + 0.5))) } });
          cards.forEach((c, i) => {
            if (i === 0) return;
            const rot = ((i % 3) - 1) * 6;
            tl.fromTo(c, { yPercent: 130, rotate: rot * 2.2, opacity: 0 }, { yPercent: 0, rotate: rot, opacity: 1, ease: 'power2.out', duration: 1 }, i - 1)
              .fromTo(cards[i - 1], { scale: 1, filter: 'brightness(1)' }, { scale: 0.92, filter: 'brightness(0.72)', duration: 1 }, i - 1);
          });
        });

        /* 5 CHARTERS: photos wipe open behind each card. */
        all('[data-charterimg]').forEach((w, i) => {
          gsap.fromTo(w, { clipPath: i ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
            scrollTrigger: { trigger: '#r-charters', start: 'top 70%', end: 'top 10%', scrub: 1 } });
          gsap.fromTo(w.querySelector('img'), { scale: 1.3 }, { scale: 1, ease: 'none',
            scrollTrigger: { trigger: '#r-charters', start: 'top 70%', end: 'bottom top', scrub: 1 } });
        });

        /* 6 COUNTRIES: sideways rail, each photo drifting inside its frame. */
        mm.add('(min-width: 821px)', () => {
          const track = el('[data-track]');
          const tl = gsap.timeline({ scrollTrigger: { ...pin('#r-countries'), invalidateOnRefresh: true } });
          tl.to(track, { x: () => -(track.scrollWidth - window.innerWidth + 48), ease: 'none' }, 0);
          all('[data-track] img').forEach((img) => tl.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: 'none' }, 0));
        });

        /* 7 VIDEO: Anjali's testimonial grows from a phone to the full screen. */
        mm.add('(min-width: 821px)', () => {
          const tl = gsap.timeline({ scrollTrigger: pin('#r-video') });
          tl.fromTo(el('[data-vid]'), { scale: 0.55, rotate: -6, xPercent: 60 }, { scale: 1, rotate: 0, xPercent: 0, ease: 'none', duration: 1 }, 0)
            .fromTo(el('[data-vidback]'), { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1.1, ease: 'none', duration: 1 }, 0)
            .fromTo(all('[data-vidcap]'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }, 0.3);
        });

        /* 8 CLOSE: the headline scales up out of the page. */
        gsap.fromTo(el('[data-closeh]'), { scale: 0.82, opacity: 0.2 }, { scale: 1, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: '#r-close', start: 'top 85%', end: 'top 30%', scrub: 1 } });
      }, root);

      // Play the video only while it is on screen.
      const v = root.current.querySelector('video');
      if (v && !reduced) {
        io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
        io.observe(v);
      }

      // Correct on a mid-page reload and after webfonts and images settle.
      const refresh = () => alive && ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      if (document.readyState === 'complete') refresh();
      else window.addEventListener('load', refresh, { once: true });
    })();

    return () => {
      alive = false;
      clearTimeout(timer);
      io?.disconnect();
      ctx?.revert();
      if (lenis) {
        import('gsap').then(({ gsap }) => tick && gsap.ticker.remove(tick));
        lenis.destroy();
        if (window.lenis === lenis) delete window.lenis;
      }
    };
  }, []);

  const current = stories[story] || stories[0];

  return (
    <div ref={root} className={s.page}>
      <div className={`${s.rail} ${dark ? s.railDark : ''}`} aria-hidden="true">
        receipts <b>{receipts}/{SECTIONS.length}</b>
      </div>

      {/* 1 HERO */}
      <section id="r-hero" className={s.hero}>
        <div className={s.stick}>
          <div className={s.grid} data-grid />
          <div className={s.window} data-window>
            <img src={HERO_IMG} alt="Graduates throwing their caps in the air" width="1600" height="1067" fetchPriority="high" />
            <div className={s.shade} data-shade />
          </div>
          {FLOATS.map((f) => (
            <div key={f.alt} className={`${s.float} ${f.pos}`} data-float>
              <img src={f.img} alt={f.alt} width="400" height="500" />
              <span>{f.alt}</span>
            </div>
          ))}
          <div className={`${s.wrap} ${s.heroText}`} data-herotext>
            <p className={s.eyebrow}>Bengaluru + Bilaspur · {destinations} destinations</p>
            <h1 className={s.h1} aria-label={LINE}>
              <span className={typed.length < LINE.length ? s.caret : ''} aria-hidden="true">{typed}</span>
            </h1>
            <p className={s.lede}>One counsellor from shortlist to arrival, and every fee published before you pay.</p>
            <div className={s.meta}>
              <span>4.9 on Google · 75 reviews</span>
              <span>{total.toLocaleString('en-IN')} universities in our finder</span>
              <span>CIN U85500CT2023PTC014913</span>
            </div>
          </div>
          <p className={s.cue} aria-hidden="true">Scroll</p>
        </div>
      </section>

      {/* 2 PROOF */}
      <section id="r-proof" className={s.proof}>
        <div className={s.stick}>
          <div className={`${s.wrap} ${s.proofGrid}`}>
            <div>
              <p className={s.eyebrow}>Receipt 2 · The numbers</p>
              <h2 className={`${s.h2} ${s.h2sm}`}>The numbers we publish, and will keep publishing.</h2>
              <div className={s.stats}>
                {STATS.map((st) => (
                  <div key={st.label} className={s.stat} data-stat>
                    <div className={s.n} data-n>{fmt(st, st.to)}</div>
                    <div className={s.l}>{st.label}</div>
                    <div className={s.bar}><i /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className={s.statStack} aria-hidden="true">
              {STATS.map((st) => (
                <div key={st.label} className={s.statImg} data-statimg>
                  <img src={st.img} alt="" width="1200" height="900" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 PROMISE */}
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

      {/* 4 STORIES */}
      <section id="r-stories" className={s.stories} style={{ '--count': stories.length }}>
        <div className={s.stick}>
          <div className={`${s.wrap} ${s.storyGrid}`}>
            <div className={s.storyText}>
              <p className={s.eyebrow}>Receipt 4 · The students</p>
              <p className={s.storyCount}>
                <b>{String(story + 1).padStart(2, '0')}</b> / {String(stories.length).padStart(2, '0')}
              </p>
              <blockquote className={s.quote} key={current.name}>“{current.quote}”</blockquote>
              <p className={s.who}><b>{current.name}</b><br />{current.university}, {current.country}</p>
              <Link href="/testimonials" className={s.inline}>Every story, in full <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
            <div className={s.deck}>
              {stories.map((t, i) => (
                <figure key={t.name} className={s.storyCard} data-card-story style={{ zIndex: i + 1 }}>
                  <img src={t.img} alt={t.name} width="600" height="750" loading="eager" />
                  <figcaption><b>{t.name}</b><span>{t.university}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 CHARTERS */}
      <section id="r-charters" className={s.charters}>
        <div className={s.wrap}>
          <p className={s.eyebrow} style={{ color: '#8fb0ff' }}>Receipt 5 · Two charters</p>
          <h2 className={s.h2}>Two charters. Pick your path.</h2>
          <div className={s.cards}>
            {[
              { k: 'gac', tag: 'GAC', name: 'Global Admissions Charter', price: '₹9,999', small: '+ GST, refundable', img: '/photos/photo-1513635269975-59663e0ac1ad-1200.jpg', alt: 'London',
                body: 'Paid-tuition universities: the UK, USA, Canada, Ireland, Australia and more. The deposit comes back once you are placed, or if no university on your list makes you an offer.' },
              { k: 'epc', tag: 'EPC', name: 'Europe Public Charter', price: '₹19,999', small: '+ GST now', img: '/photos/photo-1527866959252-deab85ef7d1b-1200.jpg', alt: 'Germany',
                body: 'Tuition-free public universities in Germany, France, Italy, the Netherlands and more. Refunded if no university on your list makes an offer. Private universities included free.' },
            ].map((c) => (
              <div key={c.k} className={s.card}>
                <div className={s.cardImg} data-charterimg>
                  <img src={c.img} alt={c.alt} width="1200" height="800" loading="lazy" />
                </div>
                <div className={s.cardBody}>
                  <p className={s.tag}>{c.tag}</p>
                  <h3 className={s.h3}>{c.name}</h3>
                  <p className={s.price}>{c.price} <small>{c.small}</small></p>
                  <p>{c.body}</p>
                  <Link href={`/charters#${c.k}`} className={s.cardLink}>Read every {c.tag} term</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 COUNTRIES */}
      <section id="r-countries" className={s.countries}>
        <div className={s.stick}>
          <div className={s.wrap} style={{ marginBottom: '2rem' }}>
            <p className={s.eyebrow}>Receipt 6 · Where</p>
            <h2 className={`${s.h2} ${s.h2sm}`}>{destinations} destinations. Eight of them here.</h2>
          </div>
          <div className={s.track} data-track>
            {rail.map((c) => (
              <div key={c.name} className={s.ct}>
                <img src={c.img} alt={c.name} width="1200" height="800" loading="lazy" />
                <div className={s.ctText}>
                  <p className={s.code}>{c.code} · {c.route}</p>
                  <h3 className={s.h3}>{c.name}</h3>
                  <p className={s.ctn}>
                    {c.n ? `${c.n.toLocaleString('en-IN')} institutions in the finder` : 'Shortlisted with your counsellor'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 VIDEO */}
      <section id="r-video" className={s.video}>
        <div className={s.stick}>
          <div className={s.vidBack} data-vidback style={{ backgroundImage: 'url(/videos/anjali_sangwan_poster.jpg)' }} />
          <div className={`${s.wrap} ${s.vidGrid}`}>
            <div className={s.phone} data-vid>
              <video src="/videos/anjali_sangwan_poland_compressed.mp4" poster="/videos/anjali_sangwan_poster.jpg"
                muted loop playsInline preload="metadata" width="404" height="720" aria-label="Anjali Sangwan's video testimonial" />
            </div>
            <div className={s.vidCaps}>
              <p className={s.eyebrow} data-vidcap style={{ color: '#8fb0ff' }}>Receipt 7 · In her words</p>
              <h2 className={s.h2} data-vidcap>“I am finally here in Poland.”</h2>
              <p className={s.lede} data-vidcap>Anjali Sangwan · BA Economics, Vistula University</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 CLOSE */}
      <section id="r-close" className={s.close}>
        <div className={s.wrap}>
          <p className={s.eyebrow}>Receipt 8 · Next step</p>
          <h2 className={s.mega} data-closeh>See the fees before you commit.</h2>
          <div className={s.ctaRow}>
            <Link href="/bookings" className="btn btn-primary btn-lg">
              Book a free counselling call <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/charters" className="btn btn-secondary btn-lg">Read both charters</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
