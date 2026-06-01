"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const RAZORPAY_URL = 'https://rzp.io/rzp/c5K4pKY';

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
      { code: 'BL-103', label: '1-on-1 Crash', sessions: '12 sessions', price: '₹6,000', per: 'per student', highlight: true, razorpayUrl: 'https://rzp.io/rzp/c5K4pKY' },
      { code: 'BL-101', label: 'Couple Batch', sessions: '15 sessions', price: '₹5,300', per: 'per student', razorpayUrl: 'https://rzp.io/rzp/VsE7bw5' },
      { code: 'BL-102', label: 'Batch of 3', sessions: '20 sessions', price: '₹6,000', per: 'per student', razorpayUrl: 'https://rzp.io/rzp/igwSnc1w' },
    ],
  },
  {
    id: 'pte',
    name: 'PTE Academic',
    logo: '/logos/exams/pte.png',
    headline: 'Includes Alpha PTE subscription (worth ₹1,299)',
    note: 'Speaking + writing fluency drills, integrated-skills strategy, full-length mocks.',
    packs: [
      { code: 'BL-106', label: '1-on-1 Crash', sessions: '9 sessions', price: '₹5,300', per: 'per student', highlight: true, razorpayUrl: 'https://rzp.io/rzp/OnS615Im' },
      { code: 'BL-104', label: 'Couple Batch', sessions: '15 sessions', price: '₹4,600', per: 'per student', razorpayUrl: 'https://rzp.io/rzp/8StNsmXo' },
      { code: 'BL-105', label: 'Batch of 3', sessions: '15 sessions', price: '₹5,300', per: 'per student', razorpayUrl: 'https://rzp.io/rzp/lbjyo9re' },
    ],
  },
  {
    id: 'toefl',
    name: 'TOEFL · DET · CELPIP · Other Certs',
    logo: '/logos/exams/toefl.svg',
    headline: 'Per-session pricing, flexible length',
    note: 'Same per-session rate covers TOEFL iBT, Duolingo English Test, CELPIP and other language certs. Practice portal cost is separate. Pick a session count after the diagnostic call.',
    packs: [
      { code: 'BL-110', label: '1-on-1 Sessions', sessions: 'Per session', price: '₹625', per: 'per session', highlight: true, footnote: '+ practice portal extra', razorpayUrl: 'https://rzp.io/rzp/IdUkpgfn' },
    ],
  },
  {
    id: 'sat',
    name: 'SAT',
    logo: '/logos/exams/sat.svg',
    headline: 'College Board · Digital SAT',
    note: 'Reading & Writing modules and the adaptive Math sections, full Bluebook mock cycle.',
    packs: [
      { code: 'BL-201', label: '1-on-1', sessions: 'Min 16 sessions', price: '₹760', per: 'per session', total: 'from ₹12,160', highlight: true, razorpayUrl: 'https://rzp.io/rzp/KlhRqQHE' },
      { code: 'BL-202', label: 'Batch of 2', sessions: 'Min 20 sessions', price: '₹1,175', per: 'per session', total: 'from ₹23,500', razorpayUrl: 'https://rzp.io/rzp/sYj1gru' },
      { code: 'BL-203', label: 'Batch of 3', sessions: 'Min 30 sessions', price: '₹1,600', per: 'per session', total: 'from ₹48,000', razorpayUrl: 'https://rzp.io/rzp/nMt9pWxg' },
    ],
  },
  {
    id: 'spoken-english',
    name: 'Spoken English & Communication',
    logo: '/logos/exams/speak-english.avif',
    headline: 'Fluency, confidence, interview-ready',
    note: 'For students prepping for visa interviews, university interviews, or workplace English.',
    packs: [
      { code: 'BL-109', label: '1-on-1', sessions: 'Min 3 sessions', price: '₹460', per: 'per session', total: 'from ₹1,380', highlight: true, razorpayUrl: 'https://rzp.io/rzp/OIySj9Gs' },
      { code: 'BL-108', label: 'Batch of 2', sessions: 'Min 5 sessions', price: '₹620', per: 'per session', total: 'from ₹3,100', razorpayUrl: 'https://rzp.io/rzp/RCFl8GH1' },
      { code: 'BL-107', label: 'Batch of 3', sessions: 'Min 10 sessions', price: '₹920', per: 'per session', total: 'from ₹9,200', razorpayUrl: 'https://rzp.io/rzp/C93UP6rr' },
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
    accent: 'from-blue-600 via-white to-rose-500',
    accentText: 'text-[var(--storm-deep)]',
    headline: 'A1 and A2 levels — France Éducation International',
    note: 'Built for French university admissions and Schengen visa language thresholds. Same tutor for grammar, oral and the official DELF format.',
    packs: [
      { code: 'FR-1', label: '1-on-1', sessions: 'Per session', price: '₹900', per: 'per session', highlight: true, razorpayUrl: 'https://rzp.io/rzp/rA7oMF8' },
      { code: 'FR-2', label: 'Batch of 2', sessions: 'Per session', price: '₹1,300', per: 'per session', razorpayUrl: 'https://rzp.io/rzp/LyWT0x0N' },
      { code: 'FR-3', label: 'Batch of 3', sessions: 'Per session', price: '₹1,725', per: 'per session', razorpayUrl: 'https://rzp.io/rzp/OHMe0KQS' },
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
    accentText: 'text-white',
    headline: 'A1 and A2 levels — Goethe-Zertifikat format',
    note: 'Required for German student-visa applicants and Ausbildung tracks. Native-speaker-style fluency drills aligned to the Goethe exam pattern.',
    packs: [
      { code: 'DE-1', label: '1-on-1', sessions: 'Per session', price: '₹900', per: 'per session', highlight: true, razorpayUrl: 'https://rzp.io/rzp/GWQpBiR' },
      { code: 'DE-2', label: 'Batch of 2', sessions: 'Per session', price: '₹1,300', per: 'per session', razorpayUrl: 'https://rzp.io/rzp/8YGN6cFA' },
      { code: 'DE-3', label: 'Batch of 3', sessions: 'Per session', price: '₹1,725', per: 'per session', razorpayUrl: 'https://rzp.io/rzp/8x0EDfj' },
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
    a: 'Enrol securely via Razorpay at rzp.io/rzp/c5K4pKY. You will receive a tax invoice the same day, your diagnostic call is scheduled within 24 hours, and your first 1-on-1 session is booked within the week.',
  },
  {
    q: 'Where is Axelis Overseas based and do you teach students outside India?',
    a: 'Axelis Overseas Education Private Limited is incorporated in Bengaluru, Karnataka, India. All test prep sessions are delivered live online, which means students based anywhere in India and abroad can attend at a time that suits their timezone.',
  },
];

function LogoTile({ logo, alt, code, accent }) {
  if (logo) {
    return (
      <div className="w-full aspect-[2/1] rounded-xl flex items-center justify-center bg-white p-4 mb-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]">
        <img src={logo} alt={alt} className="max-h-full max-w-full object-contain" />
      </div>
    );
  }
  return (
    <div className={`w-full aspect-[2/1] rounded-xl flex items-center justify-center bg-gradient-to-br ${accent || 'from-emerald-400 to-green-600'} mb-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]`}>
      <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--storm-deep)]">
        {code}
      </span>
    </div>
  );
}

export default function TestPrepPage() {
  return (
    <div className="min-h-screen text-slate-100">
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
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)] via-[var(--storm-deep)]/35 to-[var(--storm-deep)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(5,7,15,0.65)_0%,transparent_75%)]" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--storm-electric)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--dawn-glow)]/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6"
          >
            Crack IELTS, TOEFL, PTE, SAT and more
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">
              with tutors who&rsquo;ve actually done it.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Premium 1-on-1 classes with trainers who have eight-plus years of teaching behind them. No batches you didn&apos;t choose. No filler hours. Just your target score, your tutor, your timeline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#tracks"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
            >
              See plans &amp; pricing
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/bookings"
              className="inline-flex items-center justify-center px-8 py-4 glass-storm text-white font-bold rounded-xl transition-all hover:text-[var(--storm-electric)]"
            >
              Book a free demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* EXAM STRIP */}
      <section className="relative py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Every test you need, under one roof.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {examLogos.map((e) => (
              <div key={e.code} className="glass-storm p-4 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                <LogoTile logo={e.src} alt={e.alt} code={e.code} />
                <p className="text-sky-200/85 text-[10px] uppercase tracking-wider leading-snug">{e.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKS + PRICING */}
      <section id="tracks" className="relative py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Plans &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">pricing</span>
            </h2>
            <p className="text-slate-300/85 text-lg">
              Pick a track, pick a pack. Every Enrol button is a real Razorpay payment link.
            </p>
          </div>

          <div className="space-y-12">
            {tracks.map((t) => (
              <div key={t.id} className="glass-panel p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-5">
                    {t.logo ? (
                      <div className="h-12 md:h-14 w-auto rounded-lg bg-white px-3 py-2 flex items-center justify-center shrink-0">
                        <img src={t.logo} alt={t.name} className="h-full max-h-10 w-auto object-contain" />
                      </div>
                    ) : t.logoText ? (
                      <div className={`h-12 md:h-14 px-4 rounded-lg bg-gradient-to-br ${t.accent || 'from-slate-500 to-slate-700'} flex flex-col items-center justify-center shrink-0 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]`}>
                        <span className={`text-sm md:text-base font-extrabold tracking-tight leading-none ${t.accentText || 'text-white'}`}>{t.logoText}</span>
                        {t.logoSub && (
                          <span className={`text-[8px] md:text-[9px] uppercase tracking-[0.18em] mt-0.5 leading-none ${t.accentText || 'text-white'} opacity-80`}>{t.logoSub}</span>
                        )}
                      </div>
                    ) : null}
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl md:text-2xl font-bold text-white">{t.name}</h3>
                        {t.flag && (
                          <img
                            src={t.flag}
                            alt={t.flagAlt || 'Country flag'}
                            className="h-5 md:h-6 w-auto rounded-sm shadow-[0_2px_6px_-2px_rgba(0,0,0,0.6)] border border-white/10"
                          />
                        )}
                      </div>
                      <p className="text-sky-200/85 text-sm mt-1">{t.headline}</p>
                    </div>
                  </div>
                  <p className="text-slate-300/80 text-sm md:text-right md:max-w-sm leading-snug">{t.note}</p>
                </div>

                <div className={`grid grid-cols-1 ${t.packs.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-3'} gap-4`}>
                  {t.packs.map((p) => (
                    <div
                      key={p.code}
                      className={`relative rounded-2xl p-6 border transition-all ${
                        p.highlight
                          ? 'bg-gradient-to-br from-[var(--storm-electric)]/12 to-[var(--dawn-glow)]/10 border-[var(--storm-electric)]/40 shadow-[0_0_30px_-10px_var(--storm-electric)]/40'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {p.highlight && (
                        <span className="absolute -top-2 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] text-[10px] font-bold uppercase tracking-wider text-[var(--storm-deep)] shadow-[0_0_18px_var(--storm-accent-glow)]">
                          Popular
                        </span>
                      )}
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-bold mb-2">{p.code}</p>
                      <h4 className="text-lg font-bold text-white mb-1">{p.label}</h4>
                      <p className="text-sky-200/75 text-xs mb-5">{p.sessions}</p>

                      <div className="mb-1 flex items-baseline gap-2">
                        <span className="text-3xl md:text-4xl font-extrabold text-white">{p.price}</span>
                        <span className="text-xs text-slate-400">{p.per}</span>
                      </div>
                      {p.total && (
                        <p className="text-xs text-[var(--dawn-glow)] font-semibold mb-4">{p.total}</p>
                      )}
                      {p.footnote && (
                        <p className="text-[11px] text-slate-400 mb-4">{p.footnote}</p>
                      )}

                      <a
                        href={p.razorpayUrl || RAZORPAY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-3 inline-flex w-full items-center justify-center px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                          p.highlight
                            ? 'bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] shadow-[0_0_30px_-10px_var(--storm-accent-glow)]'
                            : 'bg-white/8 hover:bg-white/15 text-white border border-white/15'
                        }`}
                      >
                        Enrol via Razorpay
                        <ArrowRight className="ml-1.5" size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 mt-8 max-w-3xl mx-auto">
            All prices in INR, inclusive of tutor fee. GST applicable as per Indian tax law. Payment opens on{' '}
            <span className="text-slate-200">rzp.io</span>{' '}
            and is secured by Razorpay. Tax invoice issued the same day.
          </p>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              The premium 1-on-1, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">end to end.</span>
            </h2>
            <p className="text-slate-300/85 text-lg">
              Built in-house by tutors who teach test prep full-time, not on the side.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {offerings.map((o) => (
              <div key={o.title} className="glass-storm p-7">
                <h3 className="text-white font-bold text-lg mb-2">{o.title}</h3>
                <p className="text-slate-300/85 text-sm leading-relaxed">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              From diagnostic to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">score day.</span>
            </h2>
            <p className="text-slate-300/85 text-lg">Four steps. Same trainer through all of them.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((step, i) => (
              <div key={step.title} className="glass-storm p-6 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--storm-accent)] to-[var(--dawn-glow)] text-[var(--storm-deep)] flex items-center justify-center font-extrabold text-sm shadow-[0_0_18px_var(--storm-accent-glow)]">
                  {i + 1}
                </div>
                <h3 className="text-white font-bold text-lg mb-2 mt-1">{step.title}</h3>
                <p className="text-slate-300/85 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Questions, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">answered.</span>
            </h2>
            <p className="text-slate-300/85 text-lg">
              Six things students ask before they enrol.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details key={item.q} className="group glass-storm overflow-hidden" open={i === 0}>
                <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none">
                  <span className="text-base md:text-lg font-bold text-white group-hover:text-[var(--storm-electric)] transition-colors pr-4">
                    {item.q}
                  </span>
                  <div className="w-8 h-8 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-open:rotate-180 transition-transform duration-300">
                    <ChevronDown size={18} />
                  </div>
                </summary>
                <div className="px-5 md:px-6 pb-6 text-slate-300/85 leading-relaxed border-t border-white/10 pt-4 text-sm md:text-base">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Not sure which exam to take?
          </h2>
          <p className="text-lg text-slate-300/85 max-w-2xl mx-auto mb-8">
            Book the free demo. We&apos;ll look at your target university, your timeline, and tell you whether IELTS, TOEFL, PTE, SAT or DET is the right play &mdash; before you spend a rupee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bookings"
              className="inline-flex items-center justify-center px-8 py-4 glass-storm text-white font-bold rounded-xl transition-all hover:text-[var(--storm-electric)]"
            >
              Book a free demo
            </Link>
            <a
              href={RAZORPAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
            >
              Enrol now
              <ArrowRight className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
