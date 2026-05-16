"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const RAZORPAY_URL = 'https://rzp.io/rzp/c5K4pKY';

// Original wordmark badges — brand-inspired colour treatment for clear
// identification of each exam, not a reproduction of any official logo.
const exams = [
  {
    code: 'IELTS',
    full: 'International English Language Testing System',
    accent: 'from-rose-500 to-red-600',
    text: 'text-white',
    sub: 'Academic & General Training',
  },
  {
    code: 'TOEFL',
    full: 'Test of English as a Foreign Language (iBT)',
    accent: 'from-sky-500 to-blue-700',
    text: 'text-white',
    sub: 'iBT · ETS',
  },
  {
    code: 'PTE',
    full: 'Pearson Test of English Academic',
    accent: 'from-amber-400 to-orange-600',
    text: 'text-[var(--storm-deep)]',
    sub: 'Academic · Pearson',
  },
  {
    code: 'DET',
    full: 'Duolingo English Test',
    accent: 'from-emerald-400 to-green-600',
    text: 'text-[var(--storm-deep)]',
    sub: 'At-home certified',
  },
];

const offerings = [
  {
    title: '1-on-1 sessions',
    body: 'No batches, no recorded lectures pretending to be live. Every class is built around what you got wrong in the last one.',
  },
  {
    title: 'Tutors with 8+ years of teaching',
    body: 'Every trainer has prepped hundreds of students across IELTS, TOEFL, PTE and DET. We share their score histories on request.',
  },
  {
    title: 'Score-targeted plan',
    body: 'You tell us the band you need. We reverse-engineer the syllabus, the mocks, and the pacing to get there.',
  },
  {
    title: 'Real mocks, real reviews',
    body: 'Full-length mock tests under exam conditions, with line-by-line writing and speaking reviews from your tutor &mdash; not an algorithm.',
  },
  {
    title: 'Flexible scheduling',
    body: 'Evening, weekend, or before your 9 a.m. lecture. Reschedule up to 6 hours before without losing a session.',
  },
  {
    title: 'No drag, no upsell',
    body: 'A clear endpoint per pack. If you hit your target score early, the remaining hours roll into application support &mdash; never wasted.',
  },
];

// Mirrors the FAQPage JSON-LD in test-prep/layout.js so search engines and
// SGE crawlers see matching on-page content.
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

const howItWorks = [
  {
    title: 'Diagnostic',
    body: 'Free 30-minute conversation + a short timed sample. We pinpoint exactly what is keeping you below your target band.',
  },
  {
    title: 'Tailored plan',
    body: 'Your tutor maps a session-by-session plan to your target score, your exam date, and your weakest sections.',
  },
  {
    title: 'Live classes + mocks',
    body: 'Weekly 1-on-1 sessions with homework, full-length weekend mocks, and same-week feedback on every writing and speaking attempt.',
  },
  {
    title: 'Score day',
    body: 'Last-mile drills, exam-day strategy, and a counsellor on call. If you miss your band, we keep teaching &mdash; same fee.',
  },
];

export default function TestPrepPage() {
  return (
    <div className="min-h-screen text-slate-100">
      {/* HERO */}
      <section className="relative pt-28 lg:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
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
            Crack IELTS, TOEFL, PTE and DET
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
            Premium 1-on-1 classes with trainers who have eight-plus years of teaching behind them. No batches. No filler hours. Just your target band, your tutor, your timeline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={RAZORPAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
            >
              Enrol via Razorpay
              <ArrowRight className="ml-2" size={20} />
            </a>
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
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            We prep you for all four.
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {exams.map((e) => (
              <div
                key={e.code}
                className="glass-storm p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-transform"
              >
                <div
                  className={`w-full aspect-[2/1] rounded-xl flex items-center justify-center bg-gradient-to-br ${e.accent} mb-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]`}
                >
                  <span
                    className={`text-3xl md:text-4xl font-extrabold tracking-tight ${e.text}`}
                    style={{ letterSpacing: e.code === 'IELTS' ? '0.02em' : '0.04em' }}
                  >
                    {e.code}
                  </span>
                </div>
                <p className="text-white font-semibold text-sm mb-1">{e.full}</p>
                <p className="text-sky-200/85 text-xs uppercase tracking-wider">{e.sub}</p>
              </div>
            ))}
          </div>
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
                <p
                  className="text-slate-300/85 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: o.body }}
                />
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

      {/* PRICING / ENROLL */}
      <section className="relative py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-10 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[var(--dawn-glow)]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[var(--storm-electric)]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--dawn-glow)] font-bold mb-4">
                Axelis Premium 1-on-1
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                One enrolment. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">All four exams covered.</span>
              </h2>
              <p className="text-slate-300/85 mb-8 max-w-xl mx-auto">
                Sign up, get your diagnostic call within 24 hours, and your first 1-on-1 within the week. Pay securely on Razorpay &mdash; the same payment rail that runs every Axelis plan.
              </p>

              <ul className="text-left space-y-2.5 max-w-md mx-auto mb-10 text-sm text-slate-200">
                {[
                  'In-house tutors, 8+ years average teaching experience',
                  'Live 1-on-1 sessions — no recorded batches',
                  'Full-length mock tests with line-by-line review',
                  'Reschedule up to 6 hours before, no penalty',
                  'Miss your target band? We keep teaching, same fee.',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--storm-electric)] shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <a
                href={RAZORPAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)] text-lg"
              >
                Enrol via Razorpay
                <ArrowRight className="ml-3" size={22} />
              </a>
              <p className="text-xs text-slate-400 mt-4">
                Payment opens on <span className="text-slate-200">rzp.io</span> &middot; secured by Razorpay
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — matches FAQPage JSON-LD in layout.js */}
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
              <details
                key={item.q}
                className="group glass-storm overflow-hidden"
                open={i === 0}
              >
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
            Book the free demo. We&apos;ll look at your target university, your timeline, and tell you whether IELTS, TOEFL, PTE or DET is the right play &mdash; before you spend a rupee.
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
