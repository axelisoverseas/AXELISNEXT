"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import PayRail from '../../components/PayRail';
import { cashfreeTestPrepForms, GST_NOTE } from '../../data/cashfreeLinks';

// Top-of-page exam recognition strip. White rounded tiles, real brand assets.
const examLogos = [
  { code: 'IELTS', src: '/logos/exams/ielts.svg', alt: 'IELTS', sub: 'Academic & General Training' },
  { code: 'TOEFL', src: '/logos/exams/toefl.svg', alt: 'TOEFL iBT (ETS)', sub: 'iBT · ETS' },
  { code: 'PTE', src: '/logos/exams/pte.png', alt: 'Pearson PTE Academic', sub: 'Academic · Pearson' },
  { code: 'SAT', src: '/logos/exams/sat.svg', alt: 'SAT (College Board)', sub: 'College Board' },
  { code: 'DET', src: '/logos/exams/det.png', alt: 'Duolingo English Test', sub: 'At-home certified' },
  { code: 'SPOKEN', src: '/logos/exams/speak-english.avif', alt: 'Spoken English & Communication', sub: 'Fluency · Confidence' },
];

// Pricing matrix. Every B2B figure from the rate card × 1.379 (₹6,000 ÷ ₹4,350 anchor),
// rounded to clean ₹50/₹100 retail tiers.
const tracks = [
  {
    id: 'ielts',
    name: 'IELTS',
    logo: '/logos/exams/ielts.svg',
    headline: 'Academic + General Training',
    note: 'Score-targeted, full mock cycle, line-by-line writing and speaking review.',
    packs: [
      { code: 'BL-103', label: '1-on-1 Crash', sessions: '12 sessions', price: '₹6,000', per: 'per student', highlight: true },
      { code: 'BL-101', label: 'Couple Batch', sessions: '15 sessions', price: '₹5,300', per: 'per student' },
      { code: 'BL-102', label: 'Batch of 3', sessions: '20 sessions', price: '₹6,000', per: 'per student' },
    ],
  },
  {
    id: 'pte',
    name: 'PTE Academic',
    logo: '/logos/exams/pte.png',
    headline: 'Includes Alpha PTE subscription (worth ₹1,299)',
    note: 'Speaking + writing fluency drills, integrated-skills strategy, full-length mocks.',
    packs: [
      { code: 'BL-106', label: '1-on-1 Crash', sessions: '9 sessions', price: '₹5,300', per: 'per student', highlight: true },
      { code: 'BL-104', label: 'Couple Batch', sessions: '15 sessions', price: '₹4,600', per: 'per student' },
      { code: 'BL-105', label: 'Batch of 3', sessions: '15 sessions', price: '₹5,300', per: 'per student' },
    ],
  },
  {
    id: 'toefl',
    name: 'TOEFL · DET · CELPIP · Other Certs',
    logo: '/logos/exams/toefl.svg',
    headline: 'Per-session pricing, flexible length',
    note: 'Same per-session rate covers TOEFL iBT, Duolingo English Test, CELPIP and other language certs. Practice portal cost is separate. Pick a session count after the diagnostic call.',
    packs: [
      { code: 'BL-110', label: '1-on-1 Sessions', sessions: 'Per session', price: '₹625', per: 'per session', highlight: true, footnote: '+ practice portal extra' },
    ],
  },
  {
    id: 'sat',
    name: 'SAT',
    logo: '/logos/exams/sat.svg',
    headline: 'College Board · Digital SAT',
    note: 'Reading & Writing modules and the adaptive Math sections, full Bluebook mock cycle.',
    packs: [
      { code: 'BL-201', label: '1-on-1', sessions: 'Min 16 sessions', price: '₹760', per: 'per session', total: 'from ₹12,160', highlight: true },
      { code: 'BL-202', label: 'Batch of 2', sessions: 'Min 20 sessions', price: '₹1,175', per: 'per session', total: 'from ₹23,500' },
      { code: 'BL-203', label: 'Batch of 3', sessions: 'Min 30 sessions', price: '₹1,600', per: 'per session', total: 'from ₹48,000' },
    ],
  },
  {
    id: 'spoken-english',
    name: 'Spoken English & Communication',
    logo: '/logos/exams/speak-english.avif',
    headline: 'Fluency, confidence, interview-ready',
    note: 'For students prepping for visa interviews, university interviews, or workplace English.',
    packs: [
      { code: 'BL-109', label: '1-on-1', sessions: 'Min 3 sessions', price: '₹460', per: 'per session', total: 'from ₹1,380', highlight: true },
      { code: 'BL-108', label: 'Batch of 2', sessions: 'Min 5 sessions', price: '₹620', per: 'per session', total: 'from ₹3,100' },
      { code: 'BL-107', label: 'Batch of 3', sessions: 'Min 10 sessions', price: '₹920', per: 'per session', total: 'from ₹9,200' },
    ],
  },
  {
    id: 'french-delf',
    name: 'French (DELF · A1 / A2)',
    flag: '/logos/exams/flag-fr.svg',
    flagAlt: 'France',
    // `logo` resolves to /logos/exams/delf.png once a file is dropped there;
    // until then, the LogoTile fallback renders a clean DELF wordmark tile.
    logo: null,
    logoText: 'DELF · DALF',
    logoSub: 'France Éducation International',
    accent: 'from-stone-900 via-white to-rose-500',
    accentText: 'text-[var(--color-navy)]',
    headline: 'A1 and A2 levels — France Éducation International',
    note: 'Built for French university admissions and Schengen visa language thresholds. Same tutor for grammar, oral and the official DELF format.',
    packs: [
      { code: 'FR-1', label: '1-on-1', sessions: 'Per session', price: '₹900', per: 'per session', highlight: true },
      { code: 'FR-2', label: 'Batch of 2', sessions: 'Per session', price: '₹1,300', per: 'per session' },
      { code: 'FR-3', label: 'Batch of 3', sessions: 'Per session', price: '₹1,725', per: 'per session' },
    ],
  },
  {
    id: 'german-goethe',
    name: 'German (Goethe · A1 / A2)',
    flag: '/logos/exams/flag-de.svg',
    flagAlt: 'Germany',
    logo: null,
    logoText: 'Goethe-Institut',
    logoSub: 'Goethe-Zertifikat A1 / A2',
    accent: 'from-emerald-600 to-emerald-800',
    accentText: 'text-[var(--color-navy)]',
    headline: 'A1 and A2 levels — Goethe-Zertifikat format',
    note: 'Required for German student-visa applicants and Ausbildung tracks. Native-speaker-style fluency drills aligned to the Goethe exam pattern.',
    packs: [
      { code: 'DE-1', label: '1-on-1', sessions: 'Per session', price: '₹900', per: 'per session', highlight: true },
      { code: 'DE-2', label: 'Batch of 2', sessions: 'Per session', price: '₹1,300', per: 'per session' },
      { code: 'DE-3', label: 'Batch of 3', sessions: 'Per session', price: '₹1,725', per: 'per session' },
    ],
  },
];

const offerings = [
  {
    title: '1-on-1 by default',
    body: 'Every premium session is one tutor, one student. Live. No recorded lectures pretending to be classes.',
  },
  {
    title: 'Tutors with 8+ years of teaching',
    body: 'In-house only. Every trainer has prepped hundreds of students across IELTS, TOEFL, PTE, SAT and DET.',
  },
  {
    title: 'Score-targeted',
    body: 'You name the band. We reverse-engineer the syllabus, the mocks, and the pacing to get there.',
  },
  {
    title: 'Real mock reviews',
    body: 'Full-length exam-condition mocks, with line-by-line writing and speaking feedback from a human, not an algorithm.',
  },
  {
    title: 'Flexible scheduling',
    body: 'Evening, weekend, or before your 9 a.m. lecture. Reschedule up to 6 hours before with no penalty.',
  },
  {
    title: 'No drag, no upsell',
    body: 'Miss your target band? We keep teaching at the same fee until you hit it.',
  },
];

const howItWorks = [
  {
    title: 'Diagnostic',
    body: 'Free 30-minute conversation and a short timed sample. We pinpoint what is keeping you below your target.',
  },
  {
    title: 'Tailored plan',
    body: 'Your tutor maps a session-by-session plan to your target score, exam date, and weakest sections.',
  },
  {
    title: 'Live classes + mocks',
    body: 'Weekly 1-on-1 sessions, full-length weekend mocks, and same-week feedback on every attempt.',
  },
  {
    title: 'Score day',
    body: 'Last-mile drills, exam-day strategy, counsellor on call. Miss the band? We keep teaching, same fee.',
  },
];

const faqs = [
  {
    q: 'Which English test should I take — IELTS, TOEFL, PTE or DET?',
    a: 'It depends on the country and university you are applying to. UK and most European universities accept all four; the US accepts TOEFL, IELTS and increasingly DET; Canadian and Australian universities accept IELTS, TOEFL and PTE. The free 30-minute Axelis demo includes a diagnostic that picks the test most likely to get you to your target band fastest.',
  },
  {
    q: 'Are the test prep classes really 1-on-1?',
    a: 'Yes. Every Axelis Premium Test Prep session is one student, one tutor, live online. There are no batches, no recorded lectures pretending to be live, and no shared screens with other students.',
  },
  {
    q: 'How experienced are the Axelis test prep tutors?',
    a: 'Every in-house tutor at Axelis Overseas has at least 8 years of full-time English test prep teaching experience across IELTS, TOEFL, PTE and DET. We share tutor profiles and past score histories on request before you enrol.',
  },
  {
    q: 'What happens if I do not hit my target band?',
    a: 'If a student finishes the planned hours and has not reached the target band agreed at the start, Axelis continues coaching until that band is hit. There is no extra fee for the additional sessions.',
  },
  {
    q: 'How do I enrol and pay?',
    a: 'Enrol securely from any pack on this page. You will receive a tax invoice the same day, your diagnostic call is scheduled within 24 hours, and your first 1-on-1 session is booked within the week.',
  },
  {
    q: 'Where is Axelis Overseas based and do you teach students outside India?',
    a: 'Axelis Overseas Education Private Limited is incorporated in Bengaluru, Karnataka, India. All test prep sessions are delivered live online, which means students based anywhere in India and abroad can attend at a time that suits their timezone.',
  },
];

function LogoTile({ logo, alt, code, accent }) {
  if (logo) {
    return (
      <div className="w-full aspect-[2/1] rounded-xl flex items-center justify-center bg-white p-4 mb-5 shadow-e-2">
        <img src={logo} alt={alt} className="max-h-full max-w-full object-contain" />
      </div>
    );
  }
  return (
    <div className={`w-full aspect-[2/1] rounded-xl flex items-center justify-center bg-gradient-to-br ${accent || 'from-emerald-400 to-green-600'} mb-5 shadow-e-2`}>
      <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-navy)]">
        {code}
      </span>
    </div>
  );
}

export default function TestPrepPage() {
  return (
    <div className="min-h-screen text-[var(--color-navy)]">
      {/* HERO */}
 <section className="relative pt-28 lg:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1600&q=80&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)] via-[var(--storm-deep)]/55 to-[var(--storm-deep)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(18,67,110,0.62)_0%,transparent_75%)]" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--dawn-glow)]/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6"
          >
            Crack IELTS, TOEFL, PTE, SAT and more
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--dawn-glow)]">
              with tutors who&rsquo;ve actually done it.
            </span>
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Premium 1-on-1 classes with trainers who have eight-plus years of teaching behind them. No batches you didn&apos;t choose. No filler hours. Just your target score, your tutor, your timeline.
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#tracks"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-white font-bold rounded-xl transition-all shadow-e-2"
            >
              See plans &amp; pricing
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/bookings"
              className="inline-flex items-center justify-center px-8 py-4 glass-storm text-[var(--color-navy)] font-bold rounded-xl transition-all hover:text-[var(--color-axelis)]"
            >
              Book a free demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* EXAM STRIP */}
 <section className="relative sec-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-[var(--color-navy)] tracking-tight mb-10">
            Every test you need, under one roof.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {examLogos.map((e) => (
              <div key={e.code} className="glass-storm p-4 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                <LogoTile logo={e.src} alt={e.alt} code={e.code} />
                <p className="text-[var(--color-navy)]/85 text-[10px] leading-snug">{e.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKS + PRICING */}
 <section id="tracks" className="relative sec scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-navy)] tracking-tight mb-4">
              Plans &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-navy)] to-[var(--dawn-glow)]">pricing</span>
            </h2>
            <p className="text-[var(--color-navy)]/85 text-lg">
              Pick a track, pick a pack. Every Enrol button opens a secure Cashfree payment page.
            </p>
          </div>

          <div className="space-y-12">
            {tracks.map((t) => (
              <div key={t.id} id={t.id} className="glass-panel p-6 md:p-8 scroll-mt-24">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6 pb-6 border-b border-[var(--color-rule)]">
                  <div className="flex items-center gap-5">
                    {t.logo ? (
                      <div className="h-12 md:h-14 w-auto rounded-lg bg-white px-3 py-2 flex items-center justify-center shrink-0">
                        <img src={t.logo} alt={t.name} className="h-full max-h-10 w-auto object-contain" />
                      </div>
                    ) : t.logoText ? (
                      <div className={`h-12 md:h-14 px-4 rounded-lg bg-gradient-to-br ${t.accent || 'from-slate-500 to-slate-700'} flex flex-col items-center justify-center shrink-0 shadow-e-2`}>
                        <span className={`text-sm md:text-base font-extrabold tracking-tight leading-none ${t.accentText || 'text-[var(--color-navy)]'}`}>{t.logoText}</span>
                        {t.logoSub && (
                          <span className={`text-[8px] md:text-[9px] mt-0.5 leading-none ${t.accentText || 'text-[var(--color-navy)]'} opacity-80`}>{t.logoSub}</span>
                        )}
                      </div>
                    ) : null}
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl md:text-2xl font-bold text-[var(--color-navy)]">{t.name}</h3>
                        {t.flag && (
                          <img
                            src={t.flag}
                            alt={t.flagAlt || 'Country flag'}
                            className="h-5 md:h-6 w-auto rounded-sm shadow-e-3 border border-[var(--color-rule)]"
                          />
                        )}
                      </div>
                      <p className="text-[var(--color-navy)]/85 text-sm mt-1">{t.headline}</p>
                    </div>
                  </div>
                  <p className="text-[var(--color-navy)]/80 text-sm md:text-right md:max-w-sm leading-snug">{t.note}</p>
                </div>

                <div className={`grid grid-cols-1 ${t.packs.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-3'} gap-4`}>
                  {t.packs.map((p) => (
                    <div
                      key={p.code}
                      className={`relative rounded-2xl p-6 border transition-all ${
                        p.highlight
                          ? 'bg-gradient-to-br from-[var(--storm-electric)]/12 to-[var(--dawn-glow)]/10 border-[var(--color-rule)]/40 shadow-e-3/40'
                          : 'bg-[var(--color-tint)] border-[var(--color-rule)] hover:border-[var(--color-rule)]'
                      }`}
                    >
                      {p.highlight && (
                        <span className="absolute -top-2 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] text-[10px] font-bold text-white shadow-e-1">
                          Popular
                        </span>
                      )}
                      <p className="text-[10px] text-[var(--color-dim)] font-bold mb-2">{p.code}</p>
                      <h4 className="text-lg font-bold text-[var(--color-navy)] mb-1">{p.label}</h4>
                      <p className="text-[var(--color-navy)]/75 text-xs mb-5">{p.sessions}</p>

                      <div className="mb-1 flex items-baseline gap-2 flex-wrap">
                        <span className="text-3xl md:text-4xl font-extrabold text-[var(--color-navy)]">{p.price}</span>
                        <span className="text-xs text-[var(--color-dim)]">{p.per}</span>
                        <span className="text-xs text-[var(--color-dim)]">{GST_NOTE}</span>
                      </div>
                      {p.total && (
                        <p className="text-xs text-[var(--color-axelis)] font-semibold mb-4">{p.total}</p>
                      )}
                      {p.footnote && (
                        <p className="text-[11px] text-[var(--color-dim)] mb-4">{p.footnote}</p>
                      )}

                      <PayRail
                        cashfreeUrl={cashfreeTestPrepForms[p.code]}
                        highlight={p.highlight}
                        label="Enrol"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[var(--color-dim)] mt-8 max-w-3xl mx-auto">
            All prices in INR and inclusive of tutor fee. 18% GST is added at checkout and
            itemised on your receipt. Payment opens on Cashfree's secure hosted page, which shows
            the full terms and takes your agreement before anything is charged. Tax invoice issued
            the same day.
          </p>
        </div>
      </section>

      {/* OFFERINGS */}
 <section className="relative sec">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-navy)] tracking-tight mb-4">
              The premium 1-on-1, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-navy)] to-[var(--dawn-glow)]">end to end.</span>
            </h2>
            <p className="text-[var(--color-navy)]/85 text-lg">
              Built in-house by tutors who teach test prep full-time, not on the side.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {offerings.map((o) => (
              <div key={o.title} className="glass-storm p-7">
                <h3 className="text-[var(--color-navy)] font-bold text-lg mb-2">{o.title}</h3>
                <p className="text-[var(--color-navy)]/85 text-sm leading-relaxed">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
 <section className="relative sec">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-navy)] tracking-tight mb-4">
              From diagnostic to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-navy)] to-[var(--dawn-glow)]">score day.</span>
            </h2>
            <p className="text-[var(--color-navy)]/85 text-lg">Four steps. Same trainer through all of them.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((step, i) => (
              <div key={step.title} className="glass-storm p-6 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--storm-accent)] to-[var(--dawn-glow)] text-white flex items-center justify-center font-extrabold text-sm shadow-e-1">
                  {i + 1}
                </div>
                <h3 className="text-[var(--color-navy)] font-bold text-lg mb-2 mt-1">{step.title}</h3>
                <p className="text-[var(--color-navy)]/85 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
 <section className="relative sec">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-navy)] tracking-tight mb-4">
              Questions, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-navy)] to-[var(--dawn-glow)]">answered.</span>
            </h2>
            <p className="text-[var(--color-navy)]/85 text-lg">
              Six things students ask before they enrol.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details key={item.q} className="group glass-storm overflow-hidden" open={i === 0}>
                <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none">
                  <span className="text-base md:text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-axelis)] transition-colors pr-4">
                    {item.q}
                  </span>
                  <div className="w-8 h-8 shrink-0 rounded-full bg-[var(--color-tint)] border border-[var(--color-rule)] flex items-center justify-center text-[var(--color-navy)] group-open:rotate-180 transition-transform duration-300">
                    <ChevronDown size={18} />
                  </div>
                </summary>
                <div className="px-5 md:px-6 pb-6 text-[var(--color-navy)]/85 leading-relaxed border-t border-[var(--color-rule)] pt-4 text-sm md:text-base">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
 <section className="relative sec">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] tracking-tight mb-4">
            Not sure which exam to take?
          </h2>
          <p className="text-lg text-[var(--color-navy)]/85 max-w-2xl mx-auto mb-8">
            Book the free demo. We&apos;ll look at your target university, your timeline, and tell you whether IELTS, TOEFL, PTE, SAT or DET is the right play &mdash; before you spend a rupee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bookings"
              className="inline-flex items-center justify-center px-8 py-4 glass-storm text-[var(--color-navy)] font-bold rounded-xl transition-all hover:text-[var(--color-axelis)]"
            >
              Book a free demo
            </Link>
            <a
              href="#tracks"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-white font-bold rounded-xl transition-all shadow-e-2"
            >
              See packs and enrol
              <ArrowRight className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
