"use client";
import React, { Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CheckCircle, Award, Globe2, BadgeCheck, ShieldCheck, ArrowRight,
  FileText, Phone, Plane, GraduationCap,
} from 'lucide-react';
import { TextEffect } from '../../components/ui/TextEffect';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const howItWorks = [
  {
    Icon: Phone,
    title: 'Free first call',
    body: 'Tell us where you want to study and what you can spend. We tell you which plan actually fits, or that neither does.',
  },
  {
    Icon: FileText,
    title: 'Sign + pay via Razorpay',
    body: 'Single onboarding fee, refundable. No hidden agency markup later. Receipt arrives in your inbox the same day.',
  },
  {
    Icon: GraduationCap,
    title: 'Applications + offers',
    body: 'University shortlist, SOP/LOR, applications. We don&rsquo;t guess; every shortlist is built around your profile and budget.',
  },
  {
    Icon: Plane,
    title: 'Visa + landing',
    body: 'End-to-end visa file, mock interview, accommodation handover, and a counsellor on call until you&rsquo;ve started classes.',
  },
];

function ProductsContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect === 'zcf') {
      window.location.href = 'https://pages.razorpay.com/pl_Rk1qpiuEJifDx1/view';
    } else if (redirect === 'ztf') {
      window.location.href = 'https://pages.razorpay.com/pl_Rk1J9M0s2qvgUz/view';
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen text-slate-100">
      {/* HERO */}
      <section className="relative pt-28 lg:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2400&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)] via-[var(--storm-deep)]/60 to-[var(--storm-deep)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(5,7,15,0.7)_0%,transparent_75%)]" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--storm-electric)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--dawn-glow)]/10 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
            <TextEffect as="span" per="word" preset="blur">Pick the plan that matches</TextEffect>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">where you want to study.</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl mb-10 text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
            Global Admissions Charter (GAC) for global private universities. Europe Public Charter (EPC) for tuition-free public Europe. Both come with a 100% refundable deposit and a dedicated counsellor.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="#plans"
              className="inline-flex justify-center items-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
            >
              Compare both plans
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/bookings"
              className="inline-flex justify-center items-center px-8 py-4 glass-storm text-white font-bold rounded-xl transition-all hover:text-[var(--storm-electric)]"
            >
              Free first call
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { Icon: CheckCircle, label: '5,000+ students' },
              { Icon: Globe2, label: '29+ countries' },
              { Icon: Award, label: '₹3 Cr+ scholarships' },
              { Icon: ShieldCheck, label: '100% refundable' },
            ].map(({ Icon, label }) => (
              <div key={label} className="glass-storm py-3 px-3 flex items-center justify-center gap-2 text-slate-200 text-sm font-semibold">
                <Icon size={16} className="text-[var(--storm-electric)] shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* TRUST BAND — DPIIT / British Council / AIRC */}
      <section className="relative py-10 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">
              Certified by independent bodies
            </p>
            <Link href="/certifications" className="flex flex-wrap items-center gap-8 opacity-80 hover:opacity-100 transition-opacity group">
              <img src="/logos/dppit logo.png" alt="DPIIT Startup India" className="h-7 object-contain" />
              <img src="/trust-badges/british-council-logo.webp" alt="British Council" className="h-5 object-contain" />
              <img src="/logos/Airc-logo-full-color-centered-LG.jpg" alt="AIRC" className="h-7 rounded-sm object-contain" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--storm-electric)] group-hover:underline">View certificates &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PLANS — two charters: GAC and EPC */}
      <section id="plans" className="relative py-20 scroll-mt-24">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--storm-electric)]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--dawn-glow)]/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Two charters. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">One destination &mdash; yours.</span>
            </h2>
            <p className="text-slate-300/85 text-lg">
              Pick the route that matches where you want to study. Both come with refundable deposits and a dedicated counsellor.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* GAC — Global Admissions Charter */}
            <article
              className="relative p-8 md:p-10 flex flex-col h-full overflow-hidden group rounded-[2rem] border-2 border-[var(--storm-electric)]/30 shadow-[0_30px_80px_-20px_rgba(5,7,15,0.9)] bg-[#0c1428]"
              aria-labelledby="plan-gac-title"
            >
              {/* Top brand-band — pure CSS, no image */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--storm-electric)] to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[var(--storm-electric)]/10 blur-3xl pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[var(--storm-electric)]/5 blur-3xl pointer-events-none"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--storm-electric)]/10 border border-[var(--storm-electric)]/30 text-[var(--storm-electric)] text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
                  Most popular
                </span>
                <h3 id="plan-gac-title" className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                  Global Admissions Charter <span className="text-base font-semibold text-sky-200/70">(GAC)</span>
                </h3>
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-6">Internal code: ZCF</p>

                <p className="text-slate-300/90 mb-4 leading-relaxed">
                  For students applying to <strong className="text-white">paid-tuition universities</strong> in the UK, USA, Canada, Australia, Ireland, New Zealand, and more.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Countries covered under Global Admissions Charter">
                  {[
                    { f: '🇬🇧', n: 'UK' },
                    { f: '🇺🇸', n: 'USA' },
                    { f: '🇨🇦', n: 'Canada' },
                    { f: '🇦🇺', n: 'Australia' },
                    { f: '🇮🇪', n: 'Ireland' },
                    { f: '🇳🇿', n: 'NZ' },
                    { f: '🇸🇬', n: 'Singapore' },
                    { f: '🇨🇭', n: 'Switzerland' },
                    { f: '🇦🇪', n: 'UAE' },
                    { f: '🇲🇾', n: 'Malaysia' },
                    { f: '🇯🇵', n: 'Japan' },
                    { f: '🇰🇷', n: 'Korea' },
                    { f: '🇭🇰', n: 'HK' },
                    { f: '🇲🇹', n: 'Malta' },
                  ].map((c) => (
                    <span
                      key={c.n}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--storm-electric)]/10 border border-[var(--storm-electric)]/25 text-white text-[11px] font-semibold"
                    >
                      <span aria-hidden="true">{c.f}</span>
                      <span>{c.n}</span>
                    </span>
                  ))}
                </div>

                <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-5 mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-slate-500 line-through text-base">₹19,999</span>
                    <span className="px-2 py-0.5 rounded-md bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-bold tracking-wider">50% OFF</span>
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">₹9,999</div>
                  <p className="text-sky-200/85 text-sm font-medium">Onboarding deposit &mdash; <span className="text-emerald-300 font-semibold">100% refundable</span></p>
                  <p className="text-slate-400 text-xs mt-1">Refunded once your student visa is approved, or if you receive zero offers.</p>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  {[
                    'Expert university shortlisting + live status tracker',
                    'SOP, LOR & Europass CV done with you',
                    'Application submission across 70+ partner universities',
                    'Scholarship hunt: we apply for every relevant grant',
                    'Visa file build + mock interview',
                    'Accommodation & pre-departure support',
                  ].map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <CheckCircle size={16} className="text-[var(--storm-electric)] shrink-0 mt-0.5" />
                      <span className="text-slate-200">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/products?redirect=zcf"
                  className="mt-auto inline-flex w-full items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dawn-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)]"
                  aria-label="Enrol in the Global Admissions Charter (GAC) plan for nine thousand nine hundred and ninety nine rupees"
                >
                  Enrol in Global Admissions Charter (GAC) &mdash; ₹9,999
                  <ArrowRight size={20} />
                </Link>
                <p className="text-xs text-slate-500 mt-3 text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck size={12} /> Secure via Razorpay &middot; refund terms in writing
                </p>
              </div>
            </article>

            {/* EPC — Europe Public Charter */}
            <article
              className="relative p-8 md:p-10 flex flex-col h-full overflow-hidden group rounded-[2rem] border-2 border-[var(--dawn-glow)]/30 shadow-[0_30px_80px_-20px_rgba(5,7,15,0.9)] bg-[#0c1428]"
              aria-labelledby="plan-epc-title"
            >
              {/* Top brand-band — pure CSS, no image */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--dawn-glow)] to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[var(--dawn-glow)]/10 blur-3xl pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[var(--dawn-glow)]/5 blur-3xl pointer-events-none"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--dawn-glow)]/10 border border-[var(--dawn-glow)]/30 text-[var(--dawn-glow)] text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
                  Tuition-free Europe
                </span>
                <h3 id="plan-epc-title" className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                  Europe Public Charter <span className="text-base font-semibold text-sky-200/70">(EPC)</span>
                </h3>
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-6">Internal code: ZTF</p>

                <p className="text-slate-300/90 mb-4 leading-relaxed">
                  For students who want <strong className="text-white">zero tuition</strong> at public universities in Germany, France, Norway, Sweden, Finland, Italy, Spain, Poland and more.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Countries covered under Europe Public Charter">
                  {[
                    { f: '🇩🇪', n: 'Germany' },
                    { f: '🇫🇷', n: 'France' },
                    { f: '🇳🇴', n: 'Norway' },
                    { f: '🇸🇪', n: 'Sweden' },
                    { f: '🇫🇮', n: 'Finland' },
                    { f: '🇩🇰', n: 'Denmark' },
                    { f: '🇳🇱', n: 'Netherlands' },
                    { f: '🇮🇹', n: 'Italy' },
                    { f: '🇪🇸', n: 'Spain' },
                    { f: '🇵🇱', n: 'Poland' },
                    { f: '🇦🇹', n: 'Austria' },
                    { f: '🇧🇪', n: 'Belgium' },
                    { f: '🇨🇿', n: 'Czechia' },
                    { f: '🇭🇺', n: 'Hungary' },
                    { f: '🇵🇹', n: 'Portugal' },
                  ].map((c) => (
                    <span
                      key={c.n}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--dawn-glow)]/10 border border-[var(--dawn-glow)]/25 text-white text-[11px] font-semibold"
                    >
                      <span aria-hidden="true">{c.f}</span>
                      <span>{c.n}</span>
                    </span>
                  ))}
                </div>

                <div className="bg-white/[0.04] rounded-2xl border border-white/10 p-5 mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-slate-500 line-through text-base">₹39,998</span>
                    <span className="px-2 py-0.5 rounded-md bg-[var(--dawn-glow)]/20 border border-[var(--dawn-glow)]/30 text-[var(--dawn-glow)] text-[10px] font-bold tracking-wider">50% OFF</span>
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">₹19,999</div>
                  <p className="text-sky-200/85 text-sm font-medium">Service fee &mdash; <span className="text-emerald-300 font-semibold">refundable</span> if zero offers received.</p>
                  <p className="text-slate-400 text-xs mt-1">Once you receive any offer, the fee covers the full end-to-end service.</p>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  {[
                    'Targeted shortlist of tuition-free public universities',
                    'Language certification advisory (DELF, Goethe, IELTS)',
                    'Direct application submission to chosen universities',
                    'Visa file build + financial documentation',
                    'Accommodation help & part-time work guidance',
                    'On-the-ground support until first day of class',
                  ].map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <CheckCircle size={16} className="text-[var(--dawn-glow)] shrink-0 mt-0.5" />
                      <span className="text-slate-200">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/products?redirect=ztf"
                  className="mt-auto inline-flex w-full items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-electric)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)]"
                  aria-label="Enrol in the Europe Public Charter (EPC) plan for nineteen thousand nine hundred and ninety nine rupees"
                >
                  Enrol in Europe Public Charter (EPC) &mdash; ₹19,999
                  <ArrowRight size={20} />
                </Link>
                <p className="text-xs text-slate-500 mt-3 text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck size={12} /> Secure via Razorpay &middot; refund terms in writing
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE — GAC vs EPC */}
      <section id="comparison" className="relative py-16 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Global Admissions Charter (GAC) vs Europe Public Charter (EPC) <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">at a glance</span>
            </h2>
            <p className="text-slate-300/85">
              Same human team, same honest counselling &mdash; built for two different student profiles.
            </p>
          </div>

          <div className="bg-[#0c1428] border-2 border-white/15 rounded-2xl shadow-[0_20px_60px_-20px_rgba(5,7,15,0.9)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.06]">
                  <th scope="col" className="text-left p-4 md:p-5 text-slate-400 font-semibold uppercase text-[10px] tracking-[0.2em]">Compare</th>
                  <th scope="col" className="text-left p-4 md:p-5 text-[var(--storm-electric)] font-bold">Global Admissions Charter <span className="text-slate-400 font-normal text-xs">(GAC · ZCF)</span></th>
                  <th scope="col" className="text-left p-4 md:p-5 text-[var(--dawn-glow)] font-bold">Europe Public Charter <span className="text-slate-400 font-normal text-xs">(EPC · ZTF)</span></th>
                </tr>
              </thead>
              <tbody className="text-slate-200">
                {[
                  ['Best for', 'Paid global universities', 'Tuition-free public Europe'],
                  ['Countries covered', '29+ incl. UK, USA, Canada, Australia, Ireland, NZ', 'Germany, France, Norway, Sweden, Finland, Italy, Spain, Poland & more'],
                  ['Tuition cost', 'University-set fees (₹8–35L/year typical)', 'Free or near-free at public universities'],
                  ['Cost of living', 'Higher (UK/US/AU metros)', 'Moderate (most European cities)'],
                  ['Language requirement', 'IELTS / TOEFL / PTE', 'IELTS + local language (DELF / Goethe A1–A2)'],
                  ['Axelis fee', '₹9,999 onboarding', '₹19,999 service fee'],
                  ['Refund policy', '100% refund on visa approval or zero offers', 'Full refund if zero offers received'],
                  ['Application timeline', 'Rolling intakes, plan 6–9 months ahead', 'Strict deadlines, plan 9–12 months ahead'],
                  ['Post-study work visa', 'UK 2yr, USA 1–3yr OPT, Canada up to 3yr, AU 2–4yr', 'Germany 18mo job seeker, Norway 1yr, Finland 1yr'],
                  ['Scholarship support', 'Yes, every relevant grant applied for', 'Yes: DAAD, Erasmus+, country-specific'],
                ].map(([label, gac, epc]) => (
                  <tr key={label} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
                    <th scope="row" className="text-left p-4 md:p-5 text-slate-400 font-medium align-top">{label}</th>
                    <td className="p-4 md:p-5 align-top">{gac}</td>
                    <td className="p-4 md:p-5 align-top">{epc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-slate-500 mt-6 max-w-2xl mx-auto">
            Still unsure which charter fits? The <Link href="/bookings" className="text-[var(--storm-electric)] hover:underline">free first call</Link> ends with a clear recommendation &mdash; sometimes it&apos;s &ldquo;neither, here&apos;s why.&rdquo;
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              How it works &mdash; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">four steps, zero surprises.</span>
            </h2>
            <p className="text-slate-300/85 text-lg max-w-2xl mx-auto">
              Same process for both plans. Same counsellor through every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((step, i) => (
              <div key={step.title} className="glass-storm p-6 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--storm-accent)] to-[var(--dawn-glow)] text-[var(--storm-deep)] flex items-center justify-center font-extrabold text-sm shadow-[0_0_18px_var(--storm-accent-glow)]">
                  {i + 1}
                </div>
                <step.Icon size={28} className="text-[var(--storm-electric)] mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p
                  className="text-slate-300/85 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: step.body }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL PROOF GALLERY — payments + declarations + visas (PII redacted) */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              The receipts &mdash; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">real students, real declarations, real visas.</span>
            </h2>
            <p className="text-slate-300/85 text-lg max-w-3xl mx-auto leading-relaxed">
              Every plan flows through Razorpay. Every ZTF student signs a Zero Tuition Fee declaration before we process anything. Every visa we claim is a real stamp in a real passport. Personal info is blacked out below; the rest is exactly what we have on file.
            </p>
          </div>

          {/* Razorpay payments */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-[var(--storm-electric)]/30 flex-1" />
              <h3 className="text-[var(--storm-electric)] text-xs font-bold uppercase tracking-[0.25em] whitespace-nowrap">
                Razorpay payments
              </h3>
              <div className="h-px bg-[var(--storm-electric)]/30 flex-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[
                { src: '/proof/razorpay-prepay.jpeg', cap: 'ZTF Razorpay page', tone: 'sky' },
                { src: '/proof/razorpay-receipt-1.jpeg', cap: '₹10,000 paid', tone: 'emerald' },
                { src: '/proof/razorpay-receipt-2.jpeg', cap: '14 May 2025', tone: 'emerald' },
                { src: '/proof/razorpay-receipt-3.jpeg', cap: '14 May 2025', tone: 'emerald' },
              ].map((item, i) => (
                <div key={i} className="glass-storm p-2.5 group hover:scale-[1.02] transition-transform">
                  <div className="relative rounded-lg overflow-hidden bg-white aspect-[4/5]">
                    <img
                      src={item.src}
                      alt={`Razorpay payment proof ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className={`mt-2 text-center text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${item.tone === 'emerald' ? 'text-emerald-300' : 'text-sky-300'}`}>
                    <BadgeCheck className="w-3 h-3" />
                    {item.cap}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ZTF declarations */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-[var(--dawn-glow)]/30 flex-1" />
              <h3 className="text-[var(--dawn-glow)] text-xs font-bold uppercase tracking-[0.25em] whitespace-nowrap">
                Zero Tuition Fee declarations
              </h3>
              <div className="h-px bg-[var(--dawn-glow)]/30 flex-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[
                { src: '/proof/esign-zft-1.jpeg', cap: 'Sai Krishna P' },
                { src: '/proof/esign-zft-2.jpeg', cap: 'Karthik Hegde' },
                { src: '/proof/esign-zft-3.jpeg', cap: 'Hrashikesh Hegde' },
                { src: '/proof/esign-zft-4.jpeg', cap: 'Monika Nataraj' },
              ].map((item, i) => (
                <div key={i} className="glass-storm p-2.5 group hover:scale-[1.02] transition-transform">
                  <div className="relative rounded-lg overflow-hidden bg-white aspect-[16/9] sm:aspect-[5/4]">
                    <img
                      src={item.src}
                      alt={`Zero Tuition Fee declaration sent to ${item.cap}`}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-wider text-[var(--dawn-glow)] flex items-center justify-center gap-1.5">
                    <BadgeCheck className="w-3 h-3" />
                    {item.cap}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visa + UPI featured */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-emerald-400/30 flex-1" />
              <h3 className="text-emerald-300 text-xs font-bold uppercase tracking-[0.25em] whitespace-nowrap">
                Visa + bank transfer proofs
              </h3>
              <div className="h-px bg-emerald-400/30 flex-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="glass-storm p-3">
                <div className="relative rounded-xl overflow-hidden bg-white aspect-[3/4]">
                  <img
                    src="/proof/visa-poland-raghav.jpeg"
                    alt="Polish student visa stamp issued to Raghav Verma"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="pt-3 px-2 text-center">
                  <p className="text-white font-bold">Raghav Verma &middot; Polish student visa</p>
                  <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mt-1 inline-flex items-center gap-1.5">
                    <BadgeCheck className="w-3 h-3" />
                    Issued by the Embassy of Poland, New Delhi
                  </p>
                </div>
              </div>

              <div className="glass-storm p-3">
                <div className="relative rounded-xl overflow-hidden bg-black aspect-[3/4]">
                  <img
                    src="/proof/upi-transaction-monika.jpeg"
                    alt="UPI transfer of ₹65,000 from Monika Nataraj to Axelis Overseas Education Private Limited"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="pt-3 px-2 text-center">
                  <p className="text-white font-bold">Monika Nataraj &middot; ZTF service fee</p>
                  <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mt-1 inline-flex items-center gap-1.5">
                    <BadgeCheck className="w-3 h-3" />
                    ₹65,000 via HDFC Bank UPI &middot; 30 Sept 2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-slate-400 text-xs max-w-2xl mx-auto">
            Personal contact details, account numbers, and government identifiers are blacked out. Anything you want to verify is available on a call &mdash; with the student&apos;s consent.
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-[var(--storm-electric)] font-bold hover:text-white transition-colors"
            >
              See real student stories &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Still on the fence?
            </h2>
            <p className="text-lg text-slate-300/90 mb-10 max-w-2xl mx-auto">
              Book the free first call. We&apos;ll either tell you exactly which plan fits, or save you the money entirely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/bookings"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
              >
                Book a free call
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center px-8 py-4 glass-storm text-white font-bold rounded-xl transition-all hover:text-[var(--storm-electric)]"
              >
                Read the FAQ first
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[var(--storm-electric)]/30 border-t-[var(--storm-electric)]" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
