'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, Clock, CreditCard, ShieldCheck, Users, Sparkles,
} from 'lucide-react';
import {
  TIERS, programsByTier, catalogueStats,
  monthlyEmi, formatINR, financing,
} from '../../data/certificationPrograms';
import CertificationEnquiryForm from '../../components/CertificationEnquiryForm';
import PaymentPartnersStrip from '../../components/PaymentPartnersStrip';
import TrustBand from '../../components/TrustBand';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

/**
 * Programmes are listed by tier, with the layout itself encoding commitment:
 * Concierge runs as full-width rows with the photograph, Advanced as halves,
 * Foundation and Core as a compact index. Size carries the information, so
 * the old tier-filter chrome is gone — scrolling shows the same structure the
 * filter used to describe.
 */
function ConciergeRow({ program }) {
  const emi = monthlyEmi(program);
  return (
    <Link
      href={`/certifications/${program.slug}`}
      className="group relative grid grid-cols-1 md:grid-cols-5 gap-0 overflow-hidden rounded-2xl border border-white/12 bg-[#141210] hover:border-[var(--dawn-glow)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dawn-glow)]"
    >
      <div className="md:col-span-2 relative h-48 md:h-auto min-h-[200px] overflow-hidden">
        <img
          src={program.image}
          alt={program.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#141210] md:to-[#141210]" />
      </div>

      <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
        {program.flagship && (
          <span className="inline-flex items-center gap-1.5 text-[var(--dawn-glow)] text-sm font-semibold mb-2">
            <Sparkles size={13} /> Our flagship programme
          </span>
        )}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2.5">{program.title}</h3>
        <p className="text-slate-300/85 leading-relaxed mb-5 max-w-xl">{program.summary}</p>

        <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
          <div>
            <div className="text-3xl font-bold text-white">{formatINR(program.price)}</div>
            {emi && <div className="text-sm text-slate-400">or {formatINR(emi)} a month</div>}
          </div>
          <div className="text-sm text-slate-400">
            {program.duration} &middot; {program.cohortSize}
          </div>
          <span className="inline-flex items-center gap-1.5 text-[var(--dawn-glow)] font-semibold text-sm ml-auto group-hover:gap-2.5 transition-all">
            Details <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function AdvancedCard({ program }) {
  const emi = monthlyEmi(program);
  return (
    <Link
      href={`/certifications/${program.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#141210] hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={program.image}
          alt={program.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/30 to-transparent" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-white mb-2">{program.title}</h3>
        <p className="text-slate-300/80 text-sm leading-relaxed mb-5 flex-1">{program.summary}</p>
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-xl font-bold text-white">{formatINR(program.price)}</div>
            {emi && <div className="text-xs text-slate-400">or {formatINR(emi)} a month</div>}
          </div>
          <span className="text-sm text-slate-400">{program.duration}</span>
        </div>
      </div>
    </Link>
  );
}

function IndexRow({ program }) {
  const emi = monthlyEmi(program);
  return (
    <Link
      href={`/certifications/${program.slug}`}
      className="group flex items-center gap-4 py-4 border-b border-white/8 last:border-0 hover:bg-white/[0.03] px-3 -mx-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <img
        src={program.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="w-14 h-14 rounded-lg object-cover shrink-0 ring-1 ring-white/15"
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-white font-semibold leading-snug">{program.title}</h3>
        <p className="text-slate-400 text-sm truncate">{program.duration} &middot; {program.format}</p>
      </div>
      <div className="text-right shrink-0">
        <div className="text-white font-bold">{formatINR(program.price)}</div>
        {emi && <div className="text-xs text-slate-500">{formatINR(emi)}/mo</div>}
      </div>
      <ArrowRight size={16} className="text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
    </Link>
  );
}

function TierHeading({ tier, count }) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-5 pb-3 border-b border-white/10">
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-white">{tier.name}</h3>
        <p className="text-slate-400 text-sm mt-1">{tier.tagline}</p>
      </div>
      <span className="text-sm text-slate-500 shrink-0">
        {count} {count === 1 ? 'programme' : 'programmes'}
      </span>
    </div>
  );
}

export default function CertificationsPage() {
  const byTier = Object.fromEntries(TIERS.map((t) => [t.id, programsByTier(t.id)]));

  return (
    <div className="min-h-screen text-slate-100">
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative pt-28 lg:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2400&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)]/90 via-[var(--storm-deep)]/75 to-[var(--storm-deep)]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto"
          >
            Earn a credential on the way to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">
              your offer letter.
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Sixteen programmes, four tiers, {formatINR(catalogueStats.priceFloor)} to {formatINR(catalogueStats.priceCeiling)}.
            Enrol standalone or bundled with the ZTF Charter.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#programmes"
              className="inline-flex justify-center items-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
            >
              Browse all 16 programmes
              <ArrowRight className="ml-2" size={20} />
            </a>
            <Link
              href="/bookings"
              className="inline-flex justify-center items-center px-8 py-4 glass-storm text-white font-bold rounded-xl transition-all hover:text-[var(--storm-electric)]"
            >
              Book a discovery call
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ------------------------------------------------------- PROGRAMMES */}
      <section id="programmes" className="relative py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Concierge — the largest commitment gets the most room */}
          <div className="mb-16">
            <TierHeading tier={TIERS.find((t) => t.id === 'concierge')} count={byTier.concierge.length} />
            <div className="space-y-5">
              {byTier.concierge.map((p) => <ConciergeRow key={p.slug} program={p} />)}
            </div>
          </div>

          {/* Advanced — half-width */}
          <div className="mb-16">
            <TierHeading tier={TIERS.find((t) => t.id === 'advanced')} count={byTier.advanced.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {byTier.advanced.map((p) => <AdvancedCard key={p.slug} program={p} />)}
            </div>
          </div>

          {/* Core and Foundation — a scannable index, two columns of rows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
            <div>
              <TierHeading tier={TIERS.find((t) => t.id === 'core')} count={byTier.core.length} />
              <div>{byTier.core.map((p) => <IndexRow key={p.slug} program={p} />)}</div>
            </div>
            <div>
              <TierHeading tier={TIERS.find((t) => t.id === 'foundation')} count={byTier.foundation.length} />
              <div>{byTier.foundation.map((p) => <IndexRow key={p.slug} program={p} />)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- FINANCING */}
      <section id="financing" className="relative py-16 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#141210] border-2 border-white/10 rounded-2xl p-7 md:p-9 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--storm-electric)] to-[var(--dawn-glow)] flex items-center justify-center text-[var(--storm-deep)] shrink-0">
                <CreditCard size={22} strokeWidth={2.3} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Financing</h2>
                <p className="text-slate-300/85 text-sm">{financing.strip}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Eligibility', value: `Programmes from ${formatINR(10000)}` },
                { label: 'Tenures', value: '6, 9, 12, 18 or 24 months' },
                { label: 'Worked example', value: `${formatINR(200000)} = ${formatINR(33333)}/mo × 6, or ${formatINR(8333)}/mo × 24` },
              ].map((row) => (
                <div key={row.label} className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
                  <div className="text-xs text-slate-400 mb-1">{row.label}</div>
                  <div className="text-white font-semibold text-sm">{row.value}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- ENQUIRY FORM */}
      <section id="enquire" className="relative py-20 scroll-mt-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Not sure which one fits?
              </h2>
              <p className="text-slate-300/85 leading-relaxed mb-6">
                Tell us where you are in the process. A counsellor will come back with the one or two programmes that
                actually match, and say so if none of them do.
              </p>
              <ul className="space-y-3">
                {[
                  { Icon: Clock, text: 'Reply within one working day' },
                  { Icon: Users, text: 'A counsellor, not a chatbot' },
                  { Icon: ShieldCheck, text: 'No obligation to enrol' },
                ].map(({ Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-slate-200">
                    <Icon size={16} className="text-[var(--storm-electric)] shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <CertificationEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <TrustBand />

      <PaymentPartnersStrip />
    </div>
  );
}
