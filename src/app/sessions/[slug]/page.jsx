import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Clock, PlayCircle } from 'lucide-react';
import s from '../sessions.module.css';
import VideoFacade, { SeekButton } from '@/components/sessions/VideoFacade';
import { SESSIONS, SESSION_SLUGS, getSession, nextSession, formatDuration, isoDuration } from '@/data/sessions';

/**
 * One landing page per published counselling session: the YouTube episode is
 * the page. Everything around it (numbers, quotes, chapters) is taken from the
 * published cut, with the timestamp where it is said, so a visitor can check
 * any line by pressing it. Built after Ambitio's page rhythm, in our colours.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return SESSION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ep = getSession(slug);
  if (!ep) return {};
  const url = `https://www.overseeducation.com/sessions/${slug}`;
  return {
    title: ep.title,
    description: ep.hook,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${ep.title} | Axelis Overseas`,
      description: ep.hook,
      url,
      type: 'video.other',
      images: [{ url: ep.poster, width: 1280, height: 720, alt: ep.title }],
      videos: [{ url: `https://www.youtube.com/watch?v=${ep.yt}` }],
    },
  };
}

function Headline({ lead, accent }) {
  return (
    <>
      {lead}{' '}
      <span className={s.accent}>{accent}</span>
    </>
  );
}

export default async function SessionPage({ params }) {
  const { slug } = await params;
  const ep = getSession(slug);
  if (!ep) notFound();
  const next = nextSession(slug);

  const videoLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: ep.title,
    description: ep.hook,
    thumbnailUrl: [`https://www.overseeducation.com${ep.poster}`, `https://i.ytimg.com/vi/${ep.yt}/maxresdefault.jpg`],
    uploadDate: ep.uploadDate,
    duration: isoDuration(ep.seconds),
    embedUrl: `https://www.youtube.com/embed/${ep.yt}`,
    contentUrl: `https://www.youtube.com/watch?v=${ep.yt}`,
    publisher: { '@type': 'Organization', name: 'Axelis Overseas Education Pvt Ltd', url: 'https://www.overseeducation.com' },
    hasPart: ep.chapters.map((c, i) => {
      const toSec = (t) => t.split(':').map(Number).reduce((a, n) => a * 60 + n, 0);
      const start = toSec(c.t);
      const end = i + 1 < ep.chapters.length ? toSec(ep.chapters[i + 1].t) : ep.seconds;
      return { '@type': 'Clip', name: c.label, startOffset: start, endOffset: end, url: `https://www.youtube.com/watch?v=${ep.yt}&t=${start}s` };
    }),
  };

  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }} />

      {/* ---------- Hero: the episode, front and centre ---------- */}
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden="true"><img src={ep.backdrop} alt="" width="1600" height="1067" /></div>
        <div className={`${s.wrap} ${s.center}`}>
          <span className={s.pillLabel}>Real counselling session</span>
          <h1 className={s.h1}><Headline lead={ep.h1.lead} accent={ep.h1.accent} /></h1>
          <p className={s.sub}>{ep.hook}</p>
          <VideoFacade yt={ep.yt} title={ep.title} poster={ep.poster} duration={formatDuration(ep.seconds)} />
          {ep.chapters.length > 0 && (
            <nav className={s.chapters} aria-label="Chapters">
              {ep.chapters.map((c) => (
                <SeekButton key={c.t} at={c.t} className={s.chip}><b>{c.t}</b>{c.label}</SeekButton>
              ))}
            </nav>
          )}
          {ep.corrections?.length > 0 && (
            <aside className={s.corrections} aria-label="Corrections to this recording">
              <b>Corrections to this recording</b>
              <ul>{ep.corrections.map((c) => <li key={c}>{c}</li>)}</ul>
            </aside>
          )}
          <div className={s.ctaRow}>
            <Link href="/bookings" className={s.pillBtn}>Book your own free session <ArrowRight size={17} aria-hidden="true" /></Link>
            <a href={`https://www.youtube.com/watch?v=${ep.yt}`} target="_blank" rel="noopener noreferrer" className={s.pillGhost}>
              <PlayCircle size={17} aria-hidden="true" /> Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ---------- The student, and the numbers said on the record ---------- */}
      <section className={s.sec}>
        <div className={s.wrap}>
          <div className={s.secHead}>
            <span className={s.pillLabel}>The student</span>
            <h2 className={s.h2}>{ep.profileHead.lead} <span className={s.accent}>{ep.profileHead.accent}</span></h2>
          </div>
          <div className={s.profileGrid}>
            <div className={`${s.card} ${s.profile}`}>
              <div className={s.who}>
                {ep.face ? <img src={ep.face} alt={ep.student} width="64" height="64" /> : <span className={s.initials} aria-hidden="true">{ep.initials}</span>}
                <div><b>{ep.student}</b><span>{ep.level}{ep.destination !== 'Abroad' ? ` · ${ep.destination}` : ''}</span></div>
              </div>
              <ul className={s.facts}>{ep.profile.map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
            {ep.numbers.length > 0 && (
              <div className={s.numbers}>
                {ep.numbers.map((n) => (
                  <div key={n.value + n.label} className={`${s.card} ${s.number}`}>
                    <span className={s.numVal}>{n.value}</span>
                    <span className={s.numLabel}>{n.label}</span>
                    {n.ts && <SeekButton at={n.ts} className={s.seek}><Clock size={13} aria-hidden="true" /> Hear it at {n.ts}</SeekButton>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- In their words ---------- */}
      {ep.quotes.length > 0 && (
        <section className={s.sec} style={{ paddingTop: 0 }}>
          <div className={s.wrap}>
            <div className={s.secHead}>
              <span className={s.pillLabel}>From the session</span>
              <h2 className={s.h2}>Don&rsquo;t take our word for it. <span className={s.accent}>Hear it said.</span></h2>
              <p className={s.sub}>Every line below is verbatim from the published episode. Press the time to play it.</p>
            </div>
            <div className={s.quotes}>
              {ep.quotes.map((q) => (
                <figure key={q.ts + q.text.slice(0, 12)} className={`${s.card} ${s.quote}`}>
                  <p>{q.text}</p>
                  <figcaption className={s.quoteFoot}>
                    <b>{q.who}</b>
                    <SeekButton at={q.ts} className={s.seek}><Clock size={13} aria-hidden="true" /> {q.ts}</SeekButton>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- What you take away ---------- */}
      {ep.takeaways.length > 0 && (
        <section className={s.sec} style={{ paddingTop: 0 }}>
          <div className={s.wrap}>
            <div className={s.secHead}>
              <span className={s.pillLabel}>What to take from it</span>
              <h2 className={s.h2}>Three things, <span className={s.accent}>whatever your profile.</span></h2>
            </div>
            <div className={s.takeaways}>
              {ep.takeaways.map((t, i) => (
                <div key={t} className={`${s.card} ${s.take}`}>
                  <span className={s.takeNum}>0{i + 1}.</span>
                  <p>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- The plan this route runs on ---------- */}
      {ep.plan && (
        <section className={s.sec} style={{ paddingTop: 0 }}>
          <div className={s.wrap}>
            <div className={`${s.card} ${s.plan}`}>
              <div className={s.planBody}>
                <span className={s.pillLabel} style={{ alignSelf: 'flex-start' }}>{ep.plan.tag}</span>
                <h2 className={s.h2}>{ep.plan.name}</h2>
                <p className={s.planPrice}>{ep.plan.price} <small>{ep.plan.small}</small></p>
                <p>{ep.plan.body}</p>
                <div className={s.links}>
                  <Link href="/bookings" className={s.pillBtn}>Book a free call <ArrowRight size={17} aria-hidden="true" /></Link>
                  <Link href={`/charters#${ep.plan.key}`} className={s.pillGhost}>Every term, in writing</Link>
                </div>
              </div>
              <div className={s.planImg}><img src={ep.plan.img} alt={ep.plan.alt} width="1200" height="800" loading="lazy" /></div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- Up next: one video at a time ---------- */}
      {next && (
        <section className={s.sec} style={{ paddingTop: 0 }}>
          <div className={s.wrap}>
            <div className={s.secHead}><span className={s.pillLabel}>Up next</span></div>
            <Link href={`/sessions/${next.slug}`} className={`${s.card} ${s.next}`}>
              <div className={s.nextThumb}>
                <img src={next.poster} alt="" width="1280" height="720" loading="lazy" />
                <span className={s.duration}>{formatDuration(next.seconds)}</span>
              </div>
              <div className={s.nextText}>
                <span className={`${s.tag} ${s.tagBlue}`}>{next.level}{next.destination !== 'Abroad' ? ` · ${next.destination}` : ''}</span>
                <h2 className={s.h2}>{next.title}</h2>
                <p>{next.hook}</p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ---------- Close ---------- */}
      <section className={s.close}>
        <div className={s.wrap}>
          <span className={s.pillLabel}>Your turn</span>
          <h2 className={s.h2} style={{ marginTop: '1rem' }}>Ready to plan <span className={s.accent}>your study abroad journey?</span></h2>
          <p className={s.sub}>The same free session {ep.student} had. One counsellor, your marks, your budget, a straight answer.</p>
          <div className={s.ctaRow}>
            <Link href="/bookings" className={s.pillBtn}>Book a free call <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link href="/sessions" className={s.pillGhost}>More real sessions</Link>
          </div>
          <div className={s.wordmark} aria-hidden="true">axelis</div>
        </div>
      </section>
    </div>
  );
}
