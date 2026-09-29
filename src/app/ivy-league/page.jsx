import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, X, FileText, GraduationCap } from 'lucide-react';
import s from '../sessions/sessions.module.css';
import VideoFacade from '@/components/sessions/VideoFacade';
import CheckoutButton from '@/components/CheckoutButton';
import { PLANS, CHARTER_DOCS, ILC_US_UNIVERSITIES, ILC_LIST, ILC_LIST_COUNT } from '@/data/charterPromises';
import { getSession, formatDuration } from '@/data/sessions';

/**
 * The Ivy League Charter (ILC), launched 29 Sep 2026: EPC's pricing model and
 * amounts, for Master's and MBA applications to the ILC list (Ivy League,
 * Ivy Plus, Public Ivies, Little Ivies; v1.1) and the eight Ivy League
 * universities. Terms live in src/data/charterPromises.js (the same source as
 * /charters) and in the ILC charter PDF; this page only presents them.
 */

const ILC = PLANS.find((p) => p.key === 'ilc');
const SESSION = getSession('us-ivy-league-universities');
const URL = 'https://www.overseeducation.com/ivy-league';

const STATES = { AL: 'Alabama', AZ: 'Arizona', CA: 'California', CO: 'Colorado', DC: 'Washington, DC', FL: 'Florida', IL: 'Illinois', KY: 'Kentucky', MA: 'Massachusetts', MD: 'Maryland', MO: 'Missouri', NH: 'New Hampshire', NJ: 'New Jersey', NV: 'Nevada', NY: 'New York', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', SC: 'South Carolina', TN: 'Tennessee', TX: 'Texas', WA: 'Washington', WV: 'West Virginia', WY: 'Wyoming' };
const BY_STATE = Object.entries(
  ILC_US_UNIVERSITIES.reduce((m, u) => {
    const k = u.state ? STATES[u.state] || u.state : 'Several campuses';
    (m[k] = m[k] || []).push(u);
    return m;
  }, {}),
).sort(([a], [b]) => a.localeCompare(b));

const FAQ = [
  { q: 'Does this guarantee an Ivy League admission?',
    a: 'No. Nobody can, and anyone who says otherwise is selling you something. What the charter does guarantee is the money: if no university on your preference list makes you an offer, the ₹19,999 comes back, and the ₹1,80,000 is only ever due if you accept an offer from a university on the ILC list.' },
  { q: 'Why does my list need other US universities on it?',
    a: 'Because a list of only the most selective universities is a lottery ticket, not a strategy. The charter asks for at least five universities, at least two of them from the ILC list. The others are US universities that fit your profile, applied to with the same care, and an offer from any of them carries no success fee.' },
  { q: 'Which universities carry the success fee?',
    a: 'The 49 on the ILC list: the eight Ivy League universities; the Ivy Plus (Chicago, Duke, MIT, Stanford); the 30 Public Ivies named by Greene and Greene; and the seven Little Ivies that take graduate students. Main campuses only. The full list is Annex A of the charter.' },
  { q: "Is it for Master's, MBA or Bachelor's?",
    a: "Master's and MBA programmes. Undergraduate applications to US universities run on a different system and are not part of this charter." },
  { q: 'What is not included?',
    a: 'Test fees (GRE, GMAT, TOEFL, IELTS, Duolingo), each university’s application fee, the SEVIS fee and the visa fee. You pay those directly. Test preparation is available separately on our Test Prep page.' },
  { q: 'When should I start?',
    a: 'Most graduate programmes at these universities admit once a year, for the autumn intake, and their deadlines commonly fall between December and February. Starting nine to twelve months ahead leaves time for tests, essays and recommendations.' },
  { q: 'Are you connected to the Ivy League?',
    a: 'No. Axelis is not affiliated with, endorsed by or acting for the Ivy League or any university named on this page. Their names describe where we help you apply.' },
];

export const metadata = {
  title: 'Ivy League Charter: Apply to the Ivy League, Pay Only If You Get In',
  description:
    "Master's and MBA applications to the Ivy League, Ivy Plus, Public Ivies and Little Ivies. ₹19,999 + GST to start, refunded if no offer comes; ₹1,80,000 + GST only when you accept an offer from one of the 49 universities on the ILC list.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Ivy League Charter | Axelis Overseas',
    description: '₹19,999 + GST to start, refunded if no offer comes. ₹1,80,000 + GST only when you accept an offer from the Ivy League, Ivy Plus, a Public Ivy or a Little Ivy.',
    url: URL,
    images: [{ url: SESSION?.poster || '/photos/photo-1485871981521-5b1fd3805eee-1200.jpg', width: 1280, height: 720 }],
  },
};

export default function IvyLeaguePage() {
  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'Service', name: 'Ivy League Charter', serviceType: 'Study abroad admissions counselling',
      provider: { '@type': 'Organization', name: 'Axelis Overseas Education Pvt Ltd', url: 'https://www.overseeducation.com' },
      areaServed: { '@type': 'Country', name: 'India' }, url: URL,
      offers: { '@type': 'Offer', price: '19999', priceCurrency: 'INR', description: 'Service fee, plus 18% GST. Refunded if no university on the preference list makes an offer.' },
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
  ];

  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      {/* ---------- Hero ---------- */}
      <section className={s.hero}>
        <div className={s.heroBg} aria-hidden="true"><img src="/photos/photo-1485871981521-5b1fd3805eee-1200.jpg" alt="" width="1600" height="1067" /></div>
        <div className={`${s.wrap} ${s.center}`}>
          <span className={s.pillLabel}>New · Ivy League Charter</span>
          <h1 className={s.h1}>Apply to the Ivy League. <span className={s.accent}>Pay the big fee only if you get in.</span></h1>
          <p className={s.sub}>
            {ILC.headline} + GST to start, refunded if no university on your list makes you an offer.
            ₹1,80,000 + GST only when you accept an offer from the Ivy League, the Ivy Plus, a Public Ivy or a
            Little Ivy. Every other US university on your list, from Northeastern to Johns Hopkins, is included free.
          </p>
          <div className={s.ctaRow}>
            <Link href="/bookings" className={s.pillBtn}>Book a free profile call <ArrowRight size={17} aria-hidden="true" /></Link>
            <a href="#enrol" className={s.pillGhost}>Enrol for ₹19,999 + GST</a>
          </div>
          <p className={s.sub} style={{ fontSize: 13 }}>For Master&rsquo;s and MBA applicants. No admission, scholarship or visa is guaranteed.</p>
        </div>
      </section>

      {/* ---------- The ILC list: where the success fee applies ---------- */}
      <section className={s.sec} style={{ paddingTop: 0 }}>
        <div className={s.wrap}>
          <div className={s.secHead}>
            <span className={s.pillLabel}>The ILC list</span>
            <h2 className={s.h2}>{ILC_LIST_COUNT} universities. <span className={s.accent}>One strategy for all of them.</span></h2>
            <p className={s.sub}>
              The Ivy League, the Ivy Plus, the Public Ivies and the Little Ivies that take graduate students. The success fee
              applies only when you accept an offer from one of these. Main campuses only, as named.
            </p>
          </div>
          {ILC_LIST.map((g) => (
            <div key={g.key} className={s.groupBlock}>
              <div className={s.groupHead}>
                <b>{g.label}</b>
                <span>{g.members.length}</span>
              </div>
              {g.key === 'ivy' || g.key === 'plus' ? (
                <div className={s.ivyGrid}>
                  {g.members.map((u) => (
                    <div key={u.name} className={`${s.card} ${s.ivy}`}>
                      <GraduationCap size={20} aria-hidden="true" />
                      <b>{u.name}</b>
                      <span>{u.city}, {u.state}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className={s.chipList}>
                  {g.members.map((u) => (
                    <li key={u.name}>{u.name}{u.limited && <span className={s.pgTag}>few Master&rsquo;s</span>}</li>
                  ))}
                </ul>
              )}
              {g.undergradOnly?.length > 0 && (
                <p className={s.fine}>
                  Not covered, because they take undergraduates only: {g.undergradOnly.join(', ')}.
                </p>
              )}
            </div>
          ))}
          <p className={s.sub} style={{ textAlign: 'center', fontSize: 13 }}>
            Ivy Plus as defined by Chetty, Deming and Friedman (NBER, 2023); Public Ivies as named by Greene and Greene (2001);
            Little Ivies as listed by Bloomberg Businessweek (2016). Axelis is not affiliated with, endorsed by or acting for
            the Ivy League or any university named here.
          </p>
        </div>
      </section>

      {/* ---------- The rest of the list ---------- */}
      <section className={s.sec} style={{ paddingTop: 0 }}>
        <div className={s.wrap}>
          <div className={s.secHead}>
            <span className={s.pillLabel}>And the rest of your list</span>
            <h2 className={s.h2}>{ILC_US_UNIVERSITIES.length} more US universities, <span className={s.accent}>no success fee on any of them.</span></h2>
            <p className={s.sub}>
              A strong Ivy application sits on a balanced list. These are the US universities we apply to for Master&rsquo;s
              and MBA students; an offer from any of them counts for your refund, and accepting one costs nothing more.
            </p>
          </div>
          <div className={s.stateGrid}>
            {BY_STATE.map(([state, list]) => (
              <div key={state} className={s.stateCol}>
                <b>{state}</b>
                <ul>
                  {list.map((u) => (
                    <li key={u.name}>{u.name}{u.pgOnly && <span className={s.pgTag}>PG</span>}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={s.sub} style={{ textAlign: 'center', fontSize: 13 }}>
            Programmes and intakes vary by university and are confirmed at shortlisting. PG = graduate programmes only.
            Want a US university that is not here? Ask on your first call.
          </p>
        </div>
      </section>

      {/* ---------- A real session ---------- */}
      {SESSION && (
        <section className={s.sec} style={{ paddingTop: 0 }}>
          <div className={`${s.wrap} ${s.center}`}>
            <div className={s.secHead} style={{ marginBottom: 0 }}>
              <span className={s.pillLabel}>Watch before you pay</span>
              <h2 className={s.h2}>A real US session, <span className={s.accent}>start to finish.</span></h2>
              <p className={s.sub}>{SESSION.hook}</p>
            </div>
            <VideoFacade yt={SESSION.yt} title={SESSION.title} poster={SESSION.poster} duration={formatDuration(SESSION.seconds)} />
            {SESSION.corrections?.length > 0 && (
              <aside className={s.corrections} aria-label="Corrections to this recording">
                <b>Corrections to this recording</b>
                <ul>{SESSION.corrections.map((c) => <li key={c}>{c}</li>)}</ul>
              </aside>
            )}
            <div className={s.ctaRow}>
              <Link href={`/sessions/${SESSION.slug}`} className={s.pillGhost}>Chapters, quotes and numbers from this session</Link>
            </div>
          </div>
        </section>
      )}

      {/* ---------- What we do ---------- */}
      <section className={s.sec} style={{ paddingTop: 0 }}>
        <div className={s.wrap}>
          <div className={s.secHead}>
            <span className={s.pillLabel}>What we do</span>
            <h2 className={s.h2}>Everything an Ivy application needs, <span className={s.accent}>from shortlist to landing.</span></h2>
          </div>
          <div className={s.takeaways} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
            {ILC.scope.map((t, i) => (
              <div key={t} className={`${s.card} ${s.take}`} style={{ minHeight: 0 }}>
                <span className={s.takeNum}>{String(i + 1).padStart(2, '0')}.</span>
                <p style={{ fontWeight: 600, fontSize: 16 }}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- What you pay ---------- */}
      <section className={s.sec} style={{ paddingTop: 0 }} id="enrol">
        <div className={s.wrap}>
          <div className={s.secHead}>
            <span className={s.pillLabel}>What you pay</span>
            <h2 className={s.h2}>Two fees, <span className={s.accent}>and the big one waits for the offer.</span></h2>
          </div>
          <div className={s.priceGrid}>
            <div className={`${s.card} ${s.priceCard}`}>
              {ILC.pay.map((row) => (
                <div key={row.what} className={s.priceRow}>
                  <div><b>{row.what}</b><span>{row.when}</span><small>{row.note}</small></div>
                  <div className={s.priceAmt}>{row.amount}<small>{row.gst}</small></div>
                </div>
              ))}
              <div className={`${s.priceRow} ${s.priceTotal}`}>
                <b>The most you ever pay</b>
                <div className={s.priceAmt}>₹2,35,999<small>incl. GST, only if you accept an offer from the ILC list</small></div>
              </div>
              <p className={s.fine}>{ILC.notIncluded}</p>
            </div>
            <div className={`${s.card} ${s.enrol}`}>
              <b>Start your Ivy League Charter</b>
              <p>Read the disclosure, then pay the service fee on Cashfree. Your counsellor calls you within one working day.</p>
              <CheckoutButton product="ivy-league-charter" label="Enrol for ₹23,599 (incl. GST)" className={`${s.pillBtn} ${s.full}`} />
              <a href={CHARTER_DOCS.ilc} target="_blank" rel="noopener noreferrer" className={s.pillGhost} style={{ justifyContent: 'center' }}>
                <FileText size={16} aria-hidden="true" /> Read the charter v1.1 (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Refunds ---------- */}
      <section className={s.sec} style={{ paddingTop: 0 }}>
        <div className={s.wrap}>
          <div className={s.secHead}>
            <span className={s.pillLabel}>Refunds</span>
            <h2 className={s.h2}>When your money comes back, <span className={s.accent}>and when it does not.</span></h2>
          </div>
          <div className={s.refundGrid}>
            <div className={`${s.card} ${s.refund}`}>
              <p className={s.refundYes}><Check size={16} aria-hidden="true" /> You get it back</p>
              {ILC.refundYes.map((r) => (
                <div key={r.title} className={s.refundItem}>
                  <b>{r.title}</b><p>{r.body}</p>{r.note && <small>{r.note}</small>}
                </div>
              ))}
              <p className={s.fine}>{ILC.timeline}</p>
            </div>
            <div className={`${s.card} ${s.refund}`}>
              <p className={s.refundNo}><X size={16} aria-hidden="true" /> No refund if</p>
              <ul>{ILC.refundNo.map((r) => <li key={r}>{r}</li>)}</ul>
              <Link href="/charters#ilc" className={s.inlineLink}>Every term, on one page <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className={s.sec} style={{ paddingTop: 0 }}>
        <div className={`${s.wrap} ${s.narrow}`}>
          <div className={s.secHead}>
            <span className={s.pillLabel}>Questions</span>
            <h2 className={s.h2}>Asked before <span className={s.accent}>every Ivy application.</span></h2>
          </div>
          <div className={s.faq}>
            {FAQ.map((f) => (
              <details key={f.q} className={s.card}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Close ---------- */}
      <section className={s.close}>
        <div className={s.wrap}>
          <span className={s.pillLabel}>Your turn</span>
          <h2 className={s.h2} style={{ marginTop: '1rem' }}>Ready to aim <span className={s.accent}>for the Ivy League?</span></h2>
          <p className={s.sub}>A free first call: your profile, your list, and a straight answer on your chances.</p>
          <div className={s.ctaRow}>
            <Link href="/bookings" className={s.pillBtn}>Book a free call <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link href="/products" className={s.pillGhost}>Compare all three charters</Link>
          </div>
          <div className={s.wordmark} aria-hidden="true">axelis</div>
        </div>
      </section>
    </div>
  );
}
