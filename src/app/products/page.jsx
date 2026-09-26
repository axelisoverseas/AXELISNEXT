"use client";
import React, { Suspense, useEffect } from 'react';
import Link from 'next/link';
import CheckoutButton from '../../components/CheckoutButton';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CheckCircle, ShieldCheck, ArrowRight,
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
    title: 'Sign + pay online',
    body: 'Refundable deposit to start. Every fee that can ever apply is stated on the plan card before you pay, no hidden agency markup later. Receipt arrives in your inbox the same day.',
  },
  {
    Icon: GraduationCap,
    title: 'Applications + offers',
    body: 'University shortlist, SOP/LOR, applications. We do not guess; every shortlist is built around your profile and budget.',
  },
  {
    Icon: Plane,
    title: 'Visa + landing',
    body: 'End-to-end visa file, mock interview, accommodation handover, and a counsellor on call until you have started classes.',
  },
];

// Isolated in its own Suspense boundary: useSearchParams in the page body made
// Next skip server rendering for the whole page, so crawlers saw a spinner
// and 50 words instead of the plans and prices.
function LegacyPaymentRedirect() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // LEGACY: these two Razorpay payment pages are still live and still
    // take money. The on-page CTA is Cashfree now, but old links in ads and
    // email still land here, so the redirect stays until Cashfree has taken
    // a real payment. Remove both branches then, not before.
    const redirect = searchParams.get('redirect');
    if (redirect === 'zcf') {
      window.location.href = 'https://pages.razorpay.com/pl_Rk1qpiuEJifDx1/view';
    } else if (redirect === 'ztf') {
      window.location.href = 'https://pages.razorpay.com/pl_Rk1J9M0s2qvgUz/view';
    }
  }, [searchParams]);

  return null;
}

function ProductsContent() {
  return (
    <div className="min-h-screen text-[var(--color-navy)]">
      {/* HERO */}
 <section className="relative pt-28 lg:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/photos/photo-1523240795612-9a054b0db644-1600.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)] via-[var(--storm-deep)]/60 to-[var(--storm-deep)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(0,0,0,0.7)_0%,transparent_75%)]" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--dawn-glow)]/10 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={false}
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
            <TextEffect as="span" per="word" preset="blur">Pick the plan that matches</TextEffect>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--accent-on-dark)]">where you want to study.</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Global Admissions Charter (GAC) for global private universities. Europe Public Charter (EPC) for tuition-free public Europe. Both come with a refundable deposit and a dedicated counsellor.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="#plans"
              className="btn btn-primary btn-lg"
            >
              Compare both plans
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/bookings"
              className="inline-flex justify-center items-center px-8 py-4 glass-storm text-[var(--color-navy)] font-bold rounded-xl transition-all hover:text-[var(--color-axelis)]"
            >
              Free first call
            </Link>
          </motion.div>

          {/* Headline numbers live on the home page; credentials on
              /accreditations. This page owns the plans and their pricing. */}
          <motion.p variants={fadeInUp} className="text-sm text-white/85">
            5,000+ students placed across 29+ countries &middot;{' '}
            <Link href="/accreditations" className="text-[var(--accent-on-dark)] font-semibold underline underline-offset-2 hover:no-underline">
              Certified by independent bodies &rarr;
            </Link>
          </motion.p>
        </motion.div>
      </section>

      {/* PLANS: two charters: GAC and EPC */}
      {/* WHICH ONE IS YOURS
          The page previously opened straight onto two long cards and a ten-row
          table, leaving the reader to work out which charter applied to them.
          Ambitio opens each product with a single "For students who..." line,
          and it is the one device this page was missing. Red Hat's variants
          model is the right shape for the rest: these are parallel routes
          chosen by destination, not a good-better-best ladder, so no tier is
          marked superior and each carries its own call to action. */}
      <section className="relative sec-sm border-y border-[var(--color-rule)] bg-[var(--color-tint)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="label">Start here</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight text-[var(--color-navy)]">
              Two routes. One of them is yours.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-dim)] measure">
              These are not a cheaper option and a better one. They are two different ways
              of paying for a degree abroad, and which fits you is decided by where you
              want to study, not by what you can afford.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {ROUTES.map((r) => {
              // The tuition-free route is inverted, because it IS the different
              // one. Two identical white cards made the page argue that these
              // are the same product at two prices, which is the opposite of
              // what it needs to say.
              const dark = r.invert;
              return (
                <div
                  key={r.name}
                  className={`relative overflow-hidden rounded-[var(--radius-xl)] p-7 sm:p-9 flex flex-col ${
                    dark
                      ? 'bg-[var(--color-navy)] text-white'
                      : 'bg-white border border-[var(--color-rule)]'
                  }`}
                >
                  <img
                    src={dark ? '/brand/axelis-mark-white.svg' : '/brand/axelis-mark-navy.svg'}
                    alt=""
                    aria-hidden="true"
                    width={180}
                    height={180}
                    className="pointer-events-none absolute -right-8 -top-8 w-44 opacity-[0.07]"
                  />

                  <div className="relative flex flex-col h-full">
                    <span className={`text-[11px] font-bold uppercase tracking-[0.14em] ${dark ? 'text-[var(--accent-on-dark)]' : 'text-[var(--color-axelis)]'}`}>
                      {r.kicker}
                    </span>
                    <h3 className={`mt-3 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight ${dark ? 'text-white' : 'text-[var(--color-navy)]'}`}>
                      {r.name}
                    </h3>
                    <p className={`mt-3 text-[17px] leading-relaxed ${dark ? 'text-white/90' : 'text-[var(--color-navy)]'}`}>
                      {r.forWho}
                    </p>

                    <p className={`mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums ${dark ? 'text-white' : 'text-[var(--color-navy)]'}`}>
                      {r.price}
                    </p>
                    <p className={`mt-1 text-sm ${dark ? 'text-white/75' : 'text-[var(--color-dim)]'}`}>
                      {r.priceNote}
                    </p>

                    <dl className={`mt-6 divide-y text-sm ${dark ? 'divide-white/15' : 'divide-[var(--color-rule)]'}`}>
                      {r.facts.map((f) => (
                        <div key={f.k} className="flex gap-4 py-2.5">
                          <dt className={`w-28 shrink-0 ${dark ? 'text-white/65' : 'text-[var(--color-dim)]'}`}>{f.k}</dt>
                          <dd className={`font-semibold ${dark ? 'text-white' : 'text-[var(--color-navy)]'}`}>{f.v}</dd>
                        </div>
                      ))}
                    </dl>

                    <p className={`mt-5 text-sm leading-relaxed ${dark ? 'text-white/75' : 'text-[var(--color-dim)]'}`}>
                      <span className={`font-bold ${dark ? 'text-white' : 'text-[var(--color-navy)]'}`}>The trade-off. </span>
                      {r.catch}
                    </p>

                    <a
                      href={r.href}
                      className={`mt-auto pt-7 inline-flex items-center gap-2 font-bold ${
                        dark ? 'text-[var(--accent-on-dark)] hover:text-white' : 'text-[var(--color-axelis)] hover:text-[var(--color-navy)]'
                      }`}
                    >
                      {r.cta}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-[var(--color-dim)]">
            Not sure which describes you?{' '}
            <Link href="/bookings" className="font-semibold text-[var(--color-axelis)] hover:underline">
              The free first call ends with a recommendation
            </Link>
            , and sometimes that recommendation is neither.
          </p>
        </div>
      </section>

 <section id="plans" className="relative sec scroll-mt-24">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--color-tint)] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--dawn-glow)]/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-navy)] tracking-tight mb-4">
              Two charters. One destination, yours.
            </h2>
            <p className="text-[var(--color-navy)]/85 text-lg">
              Pick the route that matches where you want to study. Both come with a refundable deposit and a dedicated counsellor. Fees and refund conditions differ, and are set out in full on each card below.
            </p>
            <p className="mt-3">
              <Link href="/charters" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-axelis)] underline underline-offset-4">
                Every promise on one page: what you pay, when you get it back, when you do not
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* GAC. Global Admissions Charter */}
            <article
              className="relative p-8 md:p-10 flex flex-col h-full overflow-hidden group rounded-[2rem] border-2 border-[var(--color-rule)]/30 shadow-e-lift bg-white"
              aria-labelledby="plan-gac-title"
            >
              {/* Top brand-band: pure CSS, no image */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--storm-electric)] to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[var(--color-tint)] blur-3xl pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[var(--color-tint)] blur-3xl pointer-events-none"
              />
              <div className="relative">
                <span className="btn btn-secondary text-[var(--color-axelis)] text-[10px] mb-5">
                  Most popular
                </span>
                <h3 id="plan-gac-title" className="text-3xl md:text-4xl font-extrabold text-[var(--color-navy)] tracking-tight mb-2">
                  Global Admissions Charter <span className="text-base font-semibold text-[var(--color-navy)]/70">(GAC)</span>
                </h3>

                <p className="text-[var(--color-navy)]/90 mb-4 leading-relaxed">
                  For students applying to <strong className="text-[var(--color-navy)]">paid-tuition universities</strong> in the UK, USA, Canada, Australia, Ireland, New Zealand, and more.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Countries covered under Global Admissions Charter">
                  {[
                    { n: 'UK' },
                    { n: 'USA' },
                    { n: 'Canada' },
                    { n: 'Australia' },
                    { n: 'Ireland' },
                    { n: 'NZ' },
                    { n: 'Singapore' },
                    { n: 'Switzerland' },
                    { n: 'UAE' },
                    { n: 'Malaysia' },
                    { n: 'Japan' },
                    { n: 'Korea' },
                    { n: 'HK' },
                    { n: 'Malta' },
                  ].map((c) => (
                    <span
                      key={c.n}
                      className="btn btn-secondary text-[var(--color-navy)] text-[11px]"
                    >
                      <span>{c.n}</span>
                    </span>
                  ))}
                </div>

                <div className="bg-[var(--color-tint)] rounded-2xl border border-[var(--color-rule)] p-5 mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[var(--color-dim)] line-through text-base">₹19,999</span>
                    <span className="px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold">50% OFF</span>
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-navy)] mb-2">₹9,999</div>
                  <p className="text-[var(--color-navy)]/85 text-sm font-medium">Onboarding deposit, <span className="text-emerald-700 font-semibold">100% refundable</span></p>
                  <p className="text-[var(--color-navy)]/90 text-xs mt-1.5 leading-relaxed">
                    Refunded in full once your visa is granted, you have arrived, and you have paid your
                    university tuition in full, so a placed student pays Axelis nothing. Also refunded
                    if you receive zero offers. Full conditions in the Global Admissions Charter.
                  </p>
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
                      <CheckCircle size={16} className="text-[var(--color-axelis)] shrink-0 mt-0.5" />
                      <span className="text-[var(--color-navy)]">{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <CheckoutButton
                    product="global-admissions-charter"
                    label="Enrol in Global Admissions Charter (GAC), ₹9,999"
                    className="btn btn-primary btn-lg mt-auto w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  />
                </div>
                <p className="text-xs text-[var(--color-dim)] mt-3 text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck size={12} /> Secure via Cashfree &middot; refund terms in writing
                </p>
              </div>
            </article>

            {/* EPC. Europe Public Charter */}
            <article
              className="relative p-8 md:p-10 flex flex-col h-full overflow-hidden group rounded-[2rem] border-2 border-[var(--color-axelis)]/30 shadow-e-lift bg-white"
              aria-labelledby="plan-epc-title"
            >
              {/* Top brand-band: pure CSS, no image */}
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
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--dawn-glow)]/10 border border-[var(--color-axelis)]/30 text-[var(--color-axelis)] text-[10px] font-bold mb-5">
                  Tuition-free Europe
                </span>
                <h3 id="plan-epc-title" className="text-3xl md:text-4xl font-extrabold text-[var(--color-navy)] tracking-tight mb-2">
                  Europe Public Charter <span className="text-base font-semibold text-[var(--color-navy)]/70">(EPC)</span>
                </h3>

                <p className="text-[var(--color-navy)]/90 mb-4 leading-relaxed">
                  For students who want <strong className="text-[var(--color-navy)]">zero tuition</strong> at public universities in Germany, France, Norway, Sweden, Finland, Italy, Spain, Poland and more.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Countries covered under Europe Public Charter">
                  {[
                    { n: 'Germany' },
                    { n: 'France' },
                    { n: 'Norway' },
                    { n: 'Sweden' },
                    { n: 'Finland' },
                    { n: 'Denmark' },
                    { n: 'Netherlands' },
                    { n: 'Italy' },
                    { n: 'Spain' },
                    { n: 'Poland' },
                    { n: 'Austria' },
                    { n: 'Belgium' },
                    { n: 'Czechia' },
                    { n: 'Hungary' },
                    { n: 'Portugal' },
                  ].map((c) => (
                    <span
                      key={c.n}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--dawn-glow)]/10 border border-[var(--color-axelis)]/25 text-[var(--color-navy)] text-[11px] font-semibold"
                    >
                      <span>{c.n}</span>
                    </span>
                  ))}
                </div>

                <div className="bg-[var(--color-tint)] rounded-2xl border border-[var(--color-rule)] p-5 mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[var(--color-dim)] line-through text-base">₹39,998</span>
                    <span className="px-2 py-0.5 rounded-md bg-[var(--dawn-glow)]/20 border border-[var(--color-axelis)]/30 text-[var(--color-axelis)] text-[10px] font-bold">50% OFF</span>
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-navy)] mb-2">₹19,999</div>
                  <p className="text-[var(--color-navy)]/85 text-sm font-medium">Service fee, <span className="text-emerald-700 font-semibold">refundable</span> if zero offers received.</p>
                  <p className="text-[var(--color-navy)]/90 text-xs mt-1.5 leading-relaxed">
                    Plus a <span className="text-[var(--color-axelis)] font-semibold">₹1,80,000 Success Fee</span>, payable only
                    if and when you accept an offer from a tuition-free public university. Total ₹1,99,999.
                    No offer, or an offer you decline, means no Success Fee.
                  </p>
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
                      <CheckCircle size={16} className="text-[var(--color-axelis)] shrink-0 mt-0.5" />
                      <span className="text-[var(--color-navy)]">{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <CheckoutButton
                    product="europe-public-charter"
                    label="Enrol in Europe Public Charter (EPC), ₹19,999"
                    className="btn btn-primary btn-lg mt-auto w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  />
                </div>
                <p className="text-xs text-[var(--color-dim)] mt-3 text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck size={12} /> Secure via Cashfree &middot; refund terms in writing
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE. GAC vs EPC */}
 <section id="comparison" className="relative sec-sm scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-[var(--color-navy)] tracking-tight mb-3">
              Global Admissions Charter vs Europe Public Charter, at a glance
            </h2>
            <p className="text-[var(--color-navy)]/85">
              Same human team, same honest counselling, built for two different student profiles.
            </p>
          </div>

          <div className="bg-white border-2 border-[var(--color-rule)] rounded-2xl shadow-e-3 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-rule)] bg-[var(--color-tint)]">
                  <th scope="col" className="text-left p-4 md:p-5 text-[var(--color-dim)] font-semibold text-[10px]">Compare</th>
                  <th scope="col" className="text-left p-4 md:p-5 text-[var(--color-axelis)] font-bold">Global Admissions Charter <span className="text-[var(--color-dim)] font-normal text-xs">(GAC)</span></th>
                  <th scope="col" className="text-left p-4 md:p-5 text-[var(--color-axelis)] font-bold">Europe Public Charter <span className="text-[var(--color-dim)] font-normal text-xs">(EPC)</span></th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-navy)]">
                {[
                  ['Best for', 'Paid global universities', 'Tuition-free public Europe'],
                  ['Countries covered', '29+ incl. UK, USA, Canada, Australia, Ireland, NZ', 'Germany, France, Norway, Sweden, Finland, Italy, Spain, Poland & more'],
                  ['Tuition cost', 'University-set fees (₹8-35L/year typical)', 'Free or near-free at public universities'],
                  ['Cost of living', 'Higher (UK/US/AU metros)', 'Moderate (most European cities)'],
                  ['Language requirement', 'IELTS / TOEFL / PTE', 'IELTS + local language (DELF / Goethe A1-A2)'],
                  ['Axelis fee', '₹9,999 onboarding', '₹19,999 service fee + ₹1,80,000 success fee on accepting an offer (₹1,99,999 total)'],
                  ['Refund policy', 'Refunded in full once visa granted, arrived and tuition paid in full, or if zero offers', 'Service fee refunded if zero offers; success fee refunded on visa refusal not attributable to you'],
                  ['Application timeline', 'Rolling intakes, plan 6-9 months ahead', 'Strict deadlines, plan 9-12 months ahead'],
                  ['Post-study work visa', 'UK 2yr, USA 1-3yr OPT, Canada up to 3yr, AU 2-4yr', 'Germany 18mo job seeker, Norway 1yr, Finland 1yr'],
                  ['Scholarship support', 'Yes, every relevant grant applied for', 'Yes: DAAD, Erasmus+, country-specific'],
                ].map(([label, gac, epc]) => (
                  <tr key={label} className="border-b border-[var(--color-rule)] last:border-b-0 hover:bg-[var(--color-tint)] transition-colors">
                    <th scope="row" className="text-left p-4 md:p-5 text-[var(--color-dim)] font-medium align-top">{label}</th>
                    <td className="p-4 md:p-5 align-top">{gac}</td>
                    <td className="p-4 md:p-5 align-top">{epc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-[var(--color-dim)] mt-6 max-w-2xl mx-auto">
            Still unsure which charter fits? The <Link href="/bookings" className="text-[var(--color-axelis)] hover:underline">free first call</Link> ends with a clear recommendation, sometimes it&apos;s &ldquo;neither, here&apos;s why.&rdquo;
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
 <section className="relative sec">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-navy)] tracking-tight mb-4">
              How it works: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)]">four steps, zero surprises.</span>
            </h2>
            <p className="text-[var(--color-navy)]/85 text-lg max-w-2xl mx-auto">
              Same process for both plans. Same counsellor through every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((step, i) => (
              <div key={step.title} className="glass-storm p-6 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--storm-accent)] to-[var(--dawn-glow)] text-white flex items-center justify-center font-extrabold text-sm shadow-e-1">
                  {i + 1}
                </div>
                <step.Icon size={28} className="text-[var(--color-axelis)] mb-4" />
                <h3 className="text-[var(--color-navy)] font-bold text-lg mb-2">{step.title}</h3>
                <p
                  className="text-[var(--color-navy)]/85 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: step.body }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF. The full gallery of payments, declarations and visas lives on
          /testimonials, which owns it. This is the pointer, not a second copy. */}
 <section className="relative sec-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-navy)] tracking-tight mb-4">
            The receipts
          </h2>
          <p className="text-[var(--color-navy)]/85 leading-relaxed">
            Every plan flows through a PCI-DSS compliant gateway. Real payments, real declarations
            and real visas are published in full on the student stories page.
          </p>
          <div className="mt-7">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 min-h-[44px] text-[var(--color-axelis)] font-bold hover:text-[var(--color-navy)] transition-colors"
            >
              See real student stories &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
 <section className="relative sec">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-navy)] tracking-tight mb-4">
              Still on the fence?
            </h2>
            <p className="text-lg text-[var(--color-navy)]/90 mb-10 max-w-2xl mx-auto">
              Book the free first call. We&apos;ll either tell you exactly which plan fits, or save you the money entirely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/bookings"
                className="btn btn-primary btn-lg"
              >
                Book a free call
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center px-8 py-4 glass-storm text-[var(--color-navy)] font-bold rounded-xl transition-all hover:text-[var(--color-axelis)]"
              >
                Read the FAQ first
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE WIDER OFFERING, as a bento grid.
          The site sells more than two charters, but /products showed only the
          charters, so the rest of the catalogue was invisible from the page
          people land on to buy. Bento is the right structure here: unequal
          tiles let the two charters dominate while the supporting products
          stay visible, which is the actual hierarchy. */}
      <section className="relative sec border-t border-[var(--color-rule)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="label">The full catalogue</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-navy)]">
              A charter gets you in. These get you through.
            </h2>
            <p className="mt-4 text-lg text-[var(--color-dim)] measure">
              Everything below is priced separately and published. Most of it is already
              included in a charter, and where it is not, you will see the figure before
              you decide.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            {CATALOGUE.map((c) => (
              <Link
                key={c.href + c.title}
                href={c.href}
                className={`group relative flex flex-col justify-between rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-white p-6 transition-colors hover:border-[var(--color-axelis)] ${c.span || ''}`}
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-axelis)]">
                    {c.kicker}
                  </span>
                  <h3 className="mt-2.5 text-lg font-bold leading-snug text-[var(--color-navy)]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-dim)]">{c.body}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-axelis)]">
                  {c.cta}
                  <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>

          {/* Certifications. The design pass flagged their absence from a
              purchase page as an anti-pattern for this product type, and they
              were footer-only until now. */}
          <div className="mt-10 flex flex-col gap-5 rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-[var(--color-tint)] p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-[var(--color-navy)]">
              Independently certified, and you can check each one.
            </p>
            <Link href="/accreditations" className="flex flex-wrap items-center gap-7">
              <img src="/logos/dppit logo.png" width={47} height={32} alt="DPIIT Startup India" className="h-8 w-auto object-contain" />
              <img src="/trust-badges/british-council-logo.webp" width={84} height={24} alt="British Council" className="h-6 w-auto object-contain" />
              <img src="/logos/Airc-logo-full-color-centered-LG.jpg" width={56} height={32} alt="AIRC" className="h-8 w-auto rounded-sm object-contain" />
              <span className="text-xs font-semibold text-[var(--color-axelis)]">View certificates &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* The three landing pages, contextualised.
          Each one argues a different reason to pick Axelis, so rather than
          hide them behind ad spend alone, the plans page routes to whichever
          question the reader still has. */}
      <section className="relative sec border-t border-[var(--color-rule)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="label">Still deciding</p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-navy)]">
              Three reasons people choose us, argued in full.
            </h2>
            <p className="mt-3 text-[var(--color-dim)] measure">
              Whichever one you are weighing, there is a page for it.
            </p>
          </div>

          <ul className="mt-10 grid list-none grid-cols-1 gap-x-8 gap-y-10 p-0 md:grid-cols-3">
            {LANDING_LINKS.map((l) => (
              <li key={l.href}>
                <span aria-hidden="true" className="block h-0.5 w-8 rounded-full bg-[var(--color-axelis)]" />
                <Link
                  href={l.href}
                  className="mt-4 inline-flex items-start gap-1.5 min-h-[44px] text-lg font-bold leading-snug text-[var(--color-navy)] hover:text-[var(--color-axelis)]"
                >
                  {l.title}
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-dim)]">{l.body}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-axelis)]">
                  {l.cta}
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

const ROUTES = [
  {
    kicker: 'You pay tuition',
    name: 'Global Admissions Charter',
    forWho:
      'For students set on the UK, USA, Canada, Australia, Ireland or New Zealand, who accept that tuition will be paid and want the application run properly.',
    price: '\u20b99,999',
    priceNote: 'Refunded in full once you are placed, so a placed student pays Axelis nothing.',
    facts: [
      { k: 'Tuition', v: '\u20b98 to 35 lakh a year, set by the university' },
      { k: 'Destinations', v: 'UK, USA, Canada, Australia, Ireland, NZ and 23 more' },
      { k: 'Plan ahead', v: '6 to 9 months, rolling intakes' },
      { k: 'Afterwards', v: 'UK 2 years, Canada up to 3, USA 1 to 3 on OPT' },
    ],
    catch:
      'These destinations have the strongest post-study work routes and the highest fees, and the fees are not negotiable. You are paying for the job market on the other side.',
    cta: 'See the full charter',
    href: '#plans',
    invert: false,
  },
  {
    kicker: 'You pay no tuition',
    name: 'Europe Public Charter',
    forWho:
      'For students who would rather pay no tuition at all, and are open to Germany, France, the Nordics and the rest of public Europe to get it.',
    price: '\u20b919,999',
    priceNote: 'Then \u20b91,80,000, payable only if and when you accept an offer. Total \u20b91,99,999.',
    facts: [
      { k: 'Tuition', v: 'Nothing. A \u20ac150 to \u20ac350 semester contribution' },
      { k: 'Destinations', v: 'Germany, France, the Nordics, Italy, Spain, Poland and more' },
      { k: 'Plan ahead', v: '9 to 12 months, deadlines do not move' },
      { k: 'Afterwards', v: 'Germany 18-month job seeker visa, Norway and Finland 1 year' },
    ],
    catch:
      'Time and paperwork. Deadlines are fixed, a blocked account and document attestation come before the application rather than after it, and some routes want a local language. Nobody else is steering you here, because an agency paid on your tuition earns nothing when there is none.',
    cta: 'See the full charter',
    href: '#plans',
    invert: true,
  },
];

const CATALOGUE = [
  {
    kicker: 'Certifications',
    title: 'Concierge programmes',
    body: 'Structured programmes with a written refund commitment, for students who want the whole thing run for them rather than advised on.',
    cta: 'See the programmes',
    href: '/certifications',
    span: 'lg:col-span-2 lg:row-span-1',
  },
  {
    kicker: 'Germany',
    title: 'Ausbildung and Chancenkarte',
    body: 'A paid training contract with no tuition, or points-based entry to look for skilled work.',
    cta: 'See the German routes',
    href: '/vocational',
    span: 'lg:row-span-2',
  },
  {
    kicker: 'Money',
    title: 'Loans and scholarships',
    body: '25+ lenders from 8.5%, and 2000+ scholarships matched against your profile.',
    cta: 'See financing',
    href: '/financing',
  },
  {
    kicker: 'Paperwork',
    title: 'Apostille, translation, visa filing',
    body: 'Priced per document, GST shown, and most of it already included in a charter.',
    cta: 'See student services',
    href: '/services',
  },
  {
    kicker: 'Before you apply',
    title: 'Test preparation',
    body: 'IELTS, TOEFL, PTE, SAT and German, with target scores set by the universities on your shortlist.',
    cta: 'See test prep',
    href: '/test-prep',
  },
  {
    kicker: 'After you land',
    title: 'Accommodation',
    body: 'Bills-inclusive rooms in 250+ cities, with the lease read before you sign it.',
    cta: 'See housing',
    href: '/accommodation',
  },
];

const LANDING_LINKS = [
  {
    href: '/lp/tuition-free-europe',
    title: 'Study in Europe tuition-free',
    body: 'Public universities across much of Europe charge international students no tuition at all. What that route costs, and what actually decides it.',
    cta: 'See the Europe route',
  },
  {
    href: '/lp/pay-after-offer',
    title: 'Pay upfront, then only on an offer',
    body: 'Why the order you pay in changes the advice you get, and what happens if no offer ever arrives.',
    cta: 'See how the pricing works',
  },
  {
    href: '/lp/published-fees',
    title: 'Never pay a fee you have not seen',
    body: 'Every fee published before you pay, one counsellor throughout, and a straight answer about how we are paid.',
    cta: 'See how we work',
  },
];

export default function ProductsPage() {
  return (
    <>
      <Suspense fallback={null}>
        <LegacyPaymentRedirect />
      </Suspense>
      <ProductsContent />
    </>
  );
}
