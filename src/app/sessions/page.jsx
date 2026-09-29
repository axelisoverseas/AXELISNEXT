import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import s from './sessions.module.css';
import { SESSIONS, formatDuration } from '@/data/sessions';

export const metadata = {
  title: 'Real Counselling Sessions',
  description:
    'Real Axelis Overseas counselling sessions, published with each student’s consent: low marks, gap years, Germany on a budget, top US universities. One session per page.',
  alternates: { canonical: 'https://www.overseeducation.com/sessions' },
  robots: { index: true, follow: true },
};

export default function SessionsIndex() {
  const hero = SESSIONS[0];
  return (
    <div className={s.page}>
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden="true"><img src={hero.backdrop} alt="" width="1600" height="1067" /></div>
        <div className={`${s.wrap} ${s.center}`}>
          <span className={s.pillLabel}>{SESSIONS.length} real counselling sessions</span>
          <h1 className={s.h1}>Sit in on a real <span className={s.accent}>counselling session.</span></h1>
          <p className={s.sub}>
            No scripts and no actors. Students from across India with their real marks, gaps and budgets, and
            the straight answer each one got. Pick the one that sounds like you.
          </p>
        </div>
      </section>

      <section className={s.sec} style={{ paddingTop: 0 }}>
        <div className={s.wrap}>
          <div className={s.grid}>
            {SESSIONS.map((ep) => (
              <Link key={ep.slug} href={`/sessions/${ep.slug}`} className={`${s.card} ${s.tile}`}>
                <div className={s.tileThumb}>
                  <img src={ep.poster} alt="" width="1280" height="720" loading="lazy" />
                  <span className={s.duration}>{formatDuration(ep.seconds)}</span>
                </div>
                <div className={s.tileBody}>
                  <h2>{ep.title}</h2>
                  <div className={s.tileMeta}>
                    {ep.destination !== 'Abroad' && <span className={`${s.tag} ${s.tagBlue}`}>{ep.destination}</span>}
                    <span className={s.tag}>{ep.level}</span>
                    {ep.route && <span className={s.tag}>{ep.route}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={s.close}>
        <div className={s.wrap}>
          <span className={s.pillLabel}>Your turn</span>
          <h2 className={s.h2} style={{ marginTop: '1rem' }}>Ready to plan <span className={s.accent}>your study abroad journey?</span></h2>
          <div className={s.ctaRow}>
            <Link href="/bookings" className={s.pillBtn}>Book a free call <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className={s.wordmark} aria-hidden="true">axelis</div>
        </div>
      </section>
    </div>
  );
}
