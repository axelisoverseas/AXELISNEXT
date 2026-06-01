"use client";
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Award, Users, CheckCircle, ChevronDown, Zap, ShieldCheck } from 'lucide-react';

const InstagramSuccessStories = dynamic(() => import('../components/InstagramSuccessStories'), { ssr: false });
const TeamGlobeCarousel = dynamic(() => import('../components/TeamGlobeCarousel'), { ssr: false });
const StudyAbroadGuides = dynamic(() => import('../components/StudyAbroadGuides'), { ssr: false });
const UniversityLogosSection = dynamic(() => import('../components/UniversityLogosSection'), { ssr: false });

import { BorderBeam } from '../components/ui/BorderBeam';
import { RevealText } from '../components/ui/RevealText';
import { TextEffect, TextEffectInView } from '../components/ui/TextEffect';

import { teamMembers, faqData } from '../data/siteData';

const renderMarkdown = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-[var(--storm-electric)]">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const INCORP_DATE = new Date('2023-07-18T00:00:00+05:30');

const ordinal = (n) => {
  const suffix = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
};

const wordYears = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

const useTimeSinceIncorp = () => {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const start = INCORP_DATE.getTime();
  const diff = Math.max(0, now - start);
  const totalYears = diff / (365.2425 * 24 * 60 * 60 * 1000);
  const wholeYears = Math.floor(totalYears);
  const headlineYears = wordYears[Math.min(wordYears.length - 1, Math.round(totalYears))] || `${Math.round(totalYears)}`;

  // Calendar-accurate y/m/d/h/m/s breakdown.
  const a = INCORP_DATE;
  const b = new Date(now);
  let years = b.getFullYear() - a.getFullYear();
  let months = b.getMonth() - a.getMonth();
  let days = b.getDate() - a.getDate();
  if (days < 0) {
    months -= 1;
    const prev = new Date(b.getFullYear(), b.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const hours = b.getHours() - a.getHours();
  const minutes = b.getMinutes() - a.getMinutes();
  const seconds = b.getSeconds() - a.getSeconds();
  const norm = (n, mod) => ((n % mod) + mod) % mod;

  return {
    headlineYears,
    wholeYears,
    detail: `${years}y ${norm(months, 12)}m ${norm(days, 31)}d ${norm(hours, 24)}h ${norm(minutes, 60)}m ${norm(seconds, 60)}s`,
  };
};

export default function Home() {
  const { headlineYears, detail } = useTimeSinceIncorp();
  return (
    <div className="min-h-screen overflow-hidden">
      {/* HERO — clean, no lightning, no audio. Subtle study-abroad photo backdrop. */}
      <section className="relative pt-28 lg:pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Background photo — Unsplash student-on-campus, heavily darkened */}
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2400&q=80&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Top/bottom fades only — middle stays clear so the photo is fully visible behind the text */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)] via-[var(--storm-deep)]/35 to-[var(--storm-deep)]" />
          {/* Subtle radial vignette behind the H1 region only — keeps headline contrast without flattening the photo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(5,7,15,0.65)_0%,transparent_75%)]" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--storm-electric)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--dawn-glow)]/10 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-5xl mx-auto"
          >
            Your gateway to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">
              global education.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-300/90 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            End-to-end study abroad guidance across <strong className="text-white">29+ countries</strong> including the UK, USA, Canada, Ireland and Finland. Honest counselling, transparent fees, real placements.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/bookings"
              className="inline-flex justify-center items-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
            >
              Book a free consultation
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/testimonials"
              className="inline-flex justify-center items-center px-8 py-4 glass-storm text-white font-bold rounded-xl transition-all hover:text-[var(--storm-electric)]"
            >
              See student stories
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-12"
          >
            {[
              { Icon: Users, label: '500+ students' },
              { Icon: Globe, label: '29+ countries' },
              { Icon: Award, label: '₹3 Cr+ scholarships' },
              { Icon: ShieldCheck, label: '100% visa honesty' },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="glass-storm py-3 px-3 flex items-center justify-center gap-2 text-slate-200 text-sm font-semibold"
              >
                <Icon size={16} className="text-[var(--storm-electric)] shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Country chips strip — 29 countries demonstrated inline */}
          <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--storm-electric)] font-bold mb-3 text-center">
              Twenty-nine countries &middot; one trusted team
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-4" aria-label="Some of the 29 countries Axelis Overseas serves">
              {['🇬🇧 UK', '🇺🇸 USA', '🇨🇦 Canada', '🇮🇪 Ireland', '🇩🇪 Germany', '🇫🇷 France', '🇫🇮 Finland', '🇵🇱 Poland', '🇦🇺 Australia', '🇳🇱 Netherlands', '🇸🇪 Sweden', '🇳🇴 Norway'].map((label) => (
                <span
                  key={label}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/8 backdrop-blur border border-white/15 text-white font-semibold"
                >
                  {label}
                </span>
              ))}
              <Link
                href="/testimonials"
                className="text-xs px-3 py-1.5 rounded-full bg-[var(--storm-electric)]/15 border border-[var(--storm-electric)]/40 text-[var(--storm-electric)] font-bold hover:bg-[var(--storm-electric)]/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)]"
              >
                + 17 more &rarr;
              </Link>
            </div>
            <p className="text-white text-sm md:text-base text-center">
              <span className="text-[var(--dawn-glow)] font-bold">500+ students</span> placed and on-ground.
            </p>
          </motion.div>
        </motion.div>
      </section>


      {/* Unified Impact Stats — storm phase */}
      <section className="py-24 text-white relative overflow-hidden">
        {/* Electric + amber ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--storm-electric)]/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--storm-accent)]/10 rounded-full blur-[120px] translate-y-1/2 pointer-events-none"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              {headlineYears} years of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] via-white to-[var(--dawn-glow)]">real impact</span>
            </h2>
            <p className="text-slate-300 mt-4">
              One focus &mdash; placing students at universities they can actually get into and afford. Free first call, no upsell.
            </p>
            <p
              className="mt-3 text-xs font-mono uppercase tracking-[0.18em] text-slate-400"
              suppressHydrationWarning
            >
              Incorporated 18 July 2023 &middot;{' '}
              <span className="text-[var(--storm-electric)]">{detail}</span> and counting.
            </p>
          </motion.div>

          {/* 4-stat grid — storm-glass cards with unified icon treatment.
              Every icon: gradient halo + circular ring + dark inner disc + amber bolt accent. */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Globe, value: '29+', label: 'Countries' },
              { icon: Users, value: '500+', label: 'Students Placed' },
              { icon: Award, value: '₹3+ Cr', label: 'Scholarships Won', gradient: true },
              { icon: CheckCircle, value: '100%', label: 'Success Rate' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="group relative glass-storm rounded-2xl p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Unified icon: halo → ring → disc → bolt accent */}
                  <div className="relative w-20 h-20 mb-6">
                    {/* Soft gradient halo behind the disc */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--storm-electric)] via-white/40 to-[var(--dawn-glow)] opacity-30 blur-lg group-hover:opacity-70 transition-opacity duration-500" />
                    {/* Crisp gradient ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--storm-electric)] via-white/70 to-[var(--dawn-glow)] p-[1.5px] group-hover:p-[2px] transition-all duration-500">
                      <div className="w-full h-full rounded-full bg-[var(--storm-deep)]" />
                    </div>
                    {/* Inner disc with the icon */}
                    <div className="absolute inset-[1.5px] rounded-full bg-[var(--storm-deep)]/95 backdrop-blur-md flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <Icon size={34} strokeWidth={1.6} className="text-white drop-shadow-[0_0_10px_rgba(124,200,255,0.4)]" />
                    </div>
                    {/* Amber lightning-bolt accent (universal — same on every card) */}
                    <div
                      className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-[var(--storm-accent)] to-[var(--dawn-glow)] flex items-center justify-center shadow-[0_0_18px_rgba(245,158,11,0.55)] ring-2 ring-[var(--storm-deep)]"
                      style={{ animation: 'bolt-pulse 3.5s ease-in-out infinite' }}
                    >
                      <Zap size={13} strokeWidth={3} className="text-[var(--storm-deep)]" fill="currentColor" />
                    </div>
                  </div>
                  <span className={`text-4xl md:text-5xl font-bold mb-2 tracking-tight ${
                    stat.gradient
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] via-white to-[var(--dawn-glow)]'
                      : 'text-white'
                  }`}>
                    {stat.value}
                  </span>
                  <span className="text-slate-300 font-medium tracking-wide uppercase text-xs md:text-sm">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Plans preview — GAC + EPC teaser, links to /products */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[420px] h-[420px] bg-[var(--storm-electric)]/8 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-[420px] h-[420px] bg-[var(--dawn-glow)]/8 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">
              Two charters. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">Pick your path.</span>
            </h2>
            <p className="text-slate-300/85 text-base md:text-lg">
              Global Admissions Charter (GAC) for paid global universities. Europe Public Charter (EPC) for tuition-free public Europe. Both refundable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link
              href="/products#plans"
              className="group bg-[#0c1428] border-2 border-[var(--storm-electric)]/30 rounded-2xl shadow-[0_20px_60px_-20px_rgba(5,7,15,0.9)] p-6 md:p-7 flex flex-col gap-3 hover:-translate-y-1 hover:border-[var(--storm-electric)]/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)]"
              aria-label="Global Admissions Charter (GAC), nine thousand nine hundred ninety nine rupees — view details"
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--storm-electric)] font-bold">Most popular</span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">Global Admissions Charter <span className="text-sm font-semibold text-sky-200/80">(GAC)</span></h3>
                </div>
                <span className="text-3xl font-extrabold text-white">₹9,999</span>
              </div>
              <p className="text-slate-200 text-sm">
                Paid-tuition universities. <span className="text-emerald-300 font-semibold">100% refundable</span> on visa or no-offer.
              </p>
              <div className="flex flex-wrap gap-1.5" aria-label="Countries covered under Global Admissions Charter">
                {['🇬🇧 UK', '🇺🇸 USA', '🇨🇦 Canada', '🇦🇺 Australia', '🇮🇪 Ireland', '🇳🇿 NZ', '🇸🇬 Singapore', '🇨🇭 Switzerland', '🇦🇪 UAE', '+5'].map((c) => (
                  <span key={c} className="px-2 py-1 rounded-full bg-[var(--storm-electric)]/10 border border-[var(--storm-electric)]/25 text-white text-[11px] font-semibold">
                    {c}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-[var(--storm-electric)] font-semibold text-sm mt-1 group-hover:underline">
                See what&apos;s included
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/products#plans"
              className="group bg-[#0c1428] border-2 border-[var(--dawn-glow)]/30 rounded-2xl shadow-[0_20px_60px_-20px_rgba(5,7,15,0.9)] p-6 md:p-7 flex flex-col gap-3 hover:-translate-y-1 hover:border-[var(--dawn-glow)]/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dawn-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)]"
              aria-label="Europe Public Charter (EPC), nineteen thousand nine hundred ninety nine rupees — view details"
            >
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--dawn-glow)] font-bold">Tuition-free Europe</span>
                  <h3 className="text-2xl font-extrabold text-white mt-1">Europe Public Charter <span className="text-sm font-semibold text-sky-200/80">(EPC)</span></h3>
                </div>
                <span className="text-3xl font-extrabold text-white">₹19,999</span>
              </div>
              <p className="text-slate-200 text-sm">
                Public tuition-free Europe. <span className="text-emerald-300 font-semibold">Refundable</span> if zero offers.
              </p>
              <div className="flex flex-wrap gap-1.5" aria-label="Countries covered under Europe Public Charter">
                {['🇩🇪 Germany', '🇫🇷 France', '🇳🇴 Norway', '🇸🇪 Sweden', '🇫🇮 Finland', '🇩🇰 Denmark', '🇳🇱 Netherlands', '🇮🇹 Italy', '🇪🇸 Spain', '+6'].map((c) => (
                  <span key={c} className="px-2 py-1 rounded-full bg-[var(--dawn-glow)]/10 border border-[var(--dawn-glow)]/25 text-white text-[11px] font-semibold">
                    {c}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-[var(--dawn-glow)] font-semibold text-sm mt-1 group-hover:underline">
                See what&apos;s included
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/products#comparison"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm font-semibold underline-offset-4 hover:underline transition-colors"
            >
              Compare Global Admissions Charter vs Europe Public Charter side by side
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations grid — 9 feature countries + 20 compact tiles. All 29 photographed. */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">
              Twenty-nine countries. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">Twenty-nine photos.</span>
            </h2>
            <p className="text-slate-300/85 text-base md:text-lg">
              Every destination we place students into &mdash; pictured. The first nine carry the bulk of our volume; the remaining twenty run on the same plans.
            </p>
          </div>

          {/* Feature tier — 9 large cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-10">
            {[
              { name: 'United Kingdom', flag: '🇬🇧', plan: 'GAC', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80&auto=format&fit=crop' },
              { name: 'United States', flag: '🇺🇸', plan: 'GAC', img: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=1200&q=80&auto=format&fit=crop' },
              { name: 'Canada', flag: '🇨🇦', plan: 'GAC', img: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=80&auto=format&fit=crop' },
              { name: 'Ireland', flag: '🇮🇪', plan: 'GAC', img: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=1200&q=80&auto=format&fit=crop' },
              { name: 'Germany', flag: '🇩🇪', plan: 'EPC', img: 'https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?w=1200&q=80&auto=format&fit=crop' },
              { name: 'Finland', flag: '🇫🇮', plan: 'EPC', img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80&auto=format&fit=crop' },
              { name: 'Australia', flag: '🇦🇺', plan: 'GAC', img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80&auto=format&fit=crop' },
              { name: 'France', flag: '🇫🇷', plan: 'EPC', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80&auto=format&fit=crop' },
              { name: 'Netherlands', flag: '🇳🇱', plan: 'EPC', img: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1200&q=80&auto=format&fit=crop' },
            ].map((d) => (
              <article
                key={d.name}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 hover:border-[var(--storm-electric)]/40 transition-colors"
              >
                <img
                  src={d.img}
                  alt={`Iconic skyline of ${d.name}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--storm-deep)] via-[var(--storm-deep)]/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex items-end justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
                      <span className={d.plan === 'GAC' ? 'text-[var(--storm-electric)]' : 'text-[var(--dawn-glow)]'}>{d.plan}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-300">Plan</span>
                    </div>
                    <h3 className="text-white text-base md:text-lg font-bold leading-tight">
                      {d.name} <span aria-hidden="true">{d.flag}</span>
                    </h3>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Compact tier — remaining 20 countries */}
          <div className="flex items-center gap-4 mb-5">
            <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--storm-electric)] font-bold">
              Plus twenty more on the same plans
            </span>
            <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {[
              { name: 'New Zealand', flag: '🇳🇿', plan: 'GAC', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80&auto=format&fit=crop' },
              { name: 'Singapore', flag: '🇸🇬', plan: 'GAC', img: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80&auto=format&fit=crop' },
              { name: 'Italy', flag: '🇮🇹', plan: 'EPC', img: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&q=80&auto=format&fit=crop' },
              { name: 'Spain', flag: '🇪🇸', plan: 'EPC', img: 'https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=800&q=80&auto=format&fit=crop' },
              { name: 'Sweden', flag: '🇸🇪', plan: 'EPC', img: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&q=80&auto=format&fit=crop' },
              { name: 'Norway', flag: '🇳🇴', plan: 'EPC', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80&auto=format&fit=crop' },
              { name: 'Denmark', flag: '🇩🇰', plan: 'EPC', img: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&q=80&auto=format&fit=crop' },
              { name: 'Poland', flag: '🇵🇱', plan: 'EPC', img: 'https://images.unsplash.com/photo-1607427293702-036933bbf746?w=800&q=80&auto=format&fit=crop' },
              { name: 'Switzerland', flag: '🇨🇭', plan: 'GAC', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80&auto=format&fit=crop' },
              { name: 'Austria', flag: '🇦🇹', plan: 'EPC', img: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80&auto=format&fit=crop' },
              { name: 'Belgium', flag: '🇧🇪', plan: 'EPC', img: 'https://images.unsplash.com/photo-1559113202-c916b8e44373?w=800&q=80&auto=format&fit=crop' },
              { name: 'Czech Republic', flag: '🇨🇿', plan: 'EPC', img: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80&auto=format&fit=crop' },
              { name: 'Hungary', flag: '🇭🇺', plan: 'EPC', img: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80&auto=format&fit=crop' },
              { name: 'Portugal', flag: '🇵🇹', plan: 'EPC', img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80&auto=format&fit=crop' },
              { name: 'Malta', flag: '🇲🇹', plan: 'GAC', img: 'https://images.unsplash.com/photo-1551801841-ecad875a5142?w=800&q=80&auto=format&fit=crop' },
              { name: 'UAE', flag: '🇦🇪', plan: 'GAC', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format&fit=crop' },
              { name: 'Malaysia', flag: '🇲🇾', plan: 'GAC', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80&auto=format&fit=crop' },
              { name: 'South Korea', flag: '🇰🇷', plan: 'GAC', img: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80&auto=format&fit=crop' },
              { name: 'Japan', flag: '🇯🇵', plan: 'GAC', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80&auto=format&fit=crop' },
              { name: 'Hong Kong', flag: '🇭🇰', plan: 'GAC', img: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&q=80&auto=format&fit=crop' },
            ].map((d) => (
              <article
                key={d.name}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 hover:border-[var(--storm-electric)]/40 transition-colors"
              >
                <img
                  src={d.img}
                  alt={`Skyline of ${d.name}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--storm-deep)] via-[var(--storm-deep)]/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2.5 md:p-3">
                  <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-bold mb-0.5">
                    <span className={d.plan === 'GAC' ? 'text-[var(--storm-electric)]' : 'text-[var(--dawn-glow)]'}>{d.plan}</span>
                  </div>
                  <h3 className="text-white text-xs md:text-sm font-bold leading-tight">
                    {d.name} <span aria-hidden="true">{d.flag}</span>
                  </h3>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products#plans"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white text-sm font-semibold underline-offset-4 hover:underline transition-colors"
            >
              See plans &amp; pricing across all 29 countries
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* University Portfolio — 100+ universities across 29 countries */}
      <UniversityLogosSection />

      {/* Team Section */}
      <TeamGlobeCarousel teamMembers={teamMembers} />

      {/* Social Proof Videos */}
      <InstagramSuccessStories />

      {/* Educational Guides */}
      <StudyAbroadGuides />

      {/* Quick FAQ Section — dawn phase */}
      <section className="py-24 relative overflow-hidden">
        {/* Dawn ambient */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-40 right-20 w-80 h-80 bg-[var(--dawn-glow)] rounded-full blur-3xl translate-x-1/2"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-[var(--storm-electric)] rounded-full blur-3xl -translate-x-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <TextEffectInView as="h2" per="word" preset="blur" className="text-3xl md:text-5xl font-bold text-white mb-6">Common Questions</TextEffectInView>
            <p className="text-slate-300 text-lg">Clear up your doubts instantly. For full details, visit our <Link href="/faq" className="text-[var(--dawn-glow)] hover:underline">FAQ Help Center</Link>.</p>
          </div>

          <div className="space-y-4">
            {faqData.slice(0, 5).map((faq, index) => (
              <motion.details
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group glass-dawn rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="text-lg font-bold text-white group-hover:text-[var(--dawn-glow)] transition-colors">{faq.question}</span>
                  <div className="w-8 h-8 rounded-full bg-[var(--dawn-horizon)] flex items-center justify-center text-[var(--dawn-glow)] group-open:rotate-180 transition-transform duration-300">
                    <ChevronDown size={18} />
                  </div>
                </summary>
                <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                  <div className="whitespace-pre-wrap">{renderMarkdown(faq.answer)}</div>
                </div>
              </motion.details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center text-[var(--dawn-glow)] font-bold hover:text-white transition-colors group"
            >
              <span>View All 30+ Questions</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="py-32 bg-dawn-glow relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 relative z-10"
        >
          <div className="bg-[var(--dawn-horizon)] rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-20px_var(--storm-accent-glow)] border border-[var(--dawn-glow)]/20 flex flex-col md:flex-row">
            {/* Image Pane */}
            <div className="md:w-5/12 h-64 md:h-auto relative">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" alt="Graduation Joy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--dawn-horizon)] md:bg-gradient-to-l opacity-80 md:opacity-40"></div>
            </div>
            
            {/* Content Pane */}
            <div className="md:w-7/12 p-12 md:p-20 relative z-10 text-center md:text-left flex flex-col justify-center items-center md:items-start">
              <TextEffectInView as="h2" per="word" preset="blur" className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">Ready when you are.</TextEffectInView>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl relative z-10 leading-relaxed md:text-left">Tell us where you want to study. We&apos;ll tell you what it actually takes &mdash; honest, transparent, no upsell.</p>
              <Link
                href="/bookings"
                className="relative overflow-hidden inline-flex justify-center items-center px-10 py-5 bg-gradient-to-r from-[var(--storm-accent)] via-[#FFB347] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_40px_-10px_var(--storm-accent-glow)] hover:shadow-[0_0_60px_-15px_var(--storm-accent-glow)] text-lg hover:-translate-y-1 z-10 group"
              >
                <span className="relative z-10 inline-flex items-center">
                  Apply Now - Start Journey
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
                </span>
                <BorderBeam size={160} duration={9} colorFrom="#F5B877" colorTo="#7CC8FF" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
