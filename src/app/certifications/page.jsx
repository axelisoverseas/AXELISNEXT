'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, Award, CheckCircle, Clock, CreditCard, Layers,
  ShieldCheck, Users, Sparkles,
} from 'lucide-react';
import {
  TIERS, programs, programsByTier, catalogueStats,
  monthlyEmi, formatINR, financing, BAJAJ_EMI_LIVE, accentFor,
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

function ProgramCard({ program }) {
  const emi = monthlyEmi(program);
  const isConcierge = program.tier === 'concierge';
  const accent = accentFor(program.tier);

  return (
    <Link
      href={`/certifications/${program.slug}`}
      className={`group relative flex flex-col bg-[#141210] border-2 rounded-2xl p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] transition-all hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)] ${
        isConcierge
          ? 'border-[var(--dawn-glow)]/35 hover:border-[var(--dawn-glow)]/70 focus-visible:ring-[var(--dawn-glow)]'
          : 'border-white/10 hover:border-[var(--storm-electric)]/50 focus-visible:ring-[var(--storm-electric)]'
      }`}
    >
      {program.flagship && (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] text-[var(--storm-deep)] text-xs font-bold">
          <Sparkles size={12} /> Flagship
        </span>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={`text-xs font-semibold ${accent.text}`}>
          {TIERS.find((t) => t.id === program.tier)?.name}
        </span>
        <span className="text-xs text-slate-500 text-right shrink-0">
          {program.duration}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white leading-snug mb-2">{program.title}</h3>
      <p className="text-slate-300/80 text-sm leading-relaxed mb-5 flex-1">{program.summary}</p>

      <div className="pt-4 border-t border-white/10">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <span className="text-2xl font-extrabold text-white">{formatINR(program.price)}</span>
          <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${accent.text} group-hover:gap-2.5 transition-all`}>
            Details <ArrowRight size={14} />
          </span>
        </div>
        {emi && (
          <p className="text-xs text-slate-400">
            EMI from <span className="text-slate-200 font-semibold">{formatINR(emi)}/month</span>
          </p>
        )}
      </div>
    </Link>
  );
}

export default function CertificationsPage() {
  const [activeTier, setActiveTier] = useState('all');

  const shown = activeTier === 'all' ? programs : programsByTier(activeTier);
  const concierge = programsByTier('concierge');

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
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)] via-[var(--storm-deep)]/35 to-[var(--storm-deep)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(0,0,0,0.7)_0%,transparent_75%)]" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--storm-electric)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--dawn-glow)]/10 rounded-full blur-[120px]" />
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

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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

          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { Icon: Award, label: '16 programmes' },
              { Icon: Layers, label: '4 tiers' },
              { Icon: ShieldCheck, label: 'Verifiable certificate' },
              { Icon: CreditCard, label: 'EMI available' },
            ].map(({ Icon, label }) => (
              <div key={label} className="glass-storm py-3 px-3 flex items-center justify-center gap-2 text-slate-200 text-sm font-semibold">
                <Icon size={16} className="text-[var(--storm-electric)] shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ------------------------------------------------- PROGRAMMES + TIERS */}
      <section id="programmes" className="relative py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Four tiers. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">Pick your depth.</span>
            </h2>
            <p className="text-slate-300/85">
              Foundation programmes run two to four weeks. Concierge runs twelve to fifteen months with one counsellor throughout.
            </p>
          </div>

          {/* Tier switcher */}
          <div className="flex flex-wrap justify-center gap-2 mb-4" role="tablist" aria-label="Filter programmes by tier">
            {[{ id: 'all', name: 'All 16' }, ...TIERS].map((tier) => {
              const isActive = activeTier === tier.id;
              const count = tier.id === 'all' ? programs.length : programsByTier(tier.id).length;
              return (
                <button
                  key={tier.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTier(tier.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full text-sm font-bold transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)] ${
                    isActive
                      ? 'bg-[var(--storm-electric)] border-[var(--storm-electric)] text-[var(--storm-deep)]'
                      : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-white/25'
                  }`}
                >
                  {tier.name}
                  <span className={isActive ? 'text-[var(--storm-deep)]/70' : 'text-slate-500'}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Active tier description */}
          {activeTier !== 'all' && (
            <p className="text-center text-slate-300/85 text-sm max-w-2xl mx-auto mb-8">
              {TIERS.find((t) => t.id === activeTier)?.description}
            </p>
          )}
          {activeTier === 'all' && <div className="mb-8" />}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {shown.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------- CONCIERGE SPOTLIGHT */}
      <section className="relative py-20 border-y border-white/5 bg-[var(--storm-deep)]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--dawn-glow)]/10 border border-[var(--dawn-glow)]/30 text-[var(--dawn-glow)] text-sm font-semibold mb-5">
              Concierge tier
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              End-to-end, with a written outcome guarantee
            </h2>
            <p className="text-slate-300/85 text-base md:text-lg leading-relaxed">
              Our flagship Concierge programmes run {formatINR(200000)} to {formatINR(300000)} and cover application, language,
              visa and first-90-days-abroad support in a single engagement. EMI available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {concierge.map((program) => {
              const emi = monthlyEmi(program);
              return (
                <Link
                  key={program.slug}
                  href={`/certifications/${program.slug}`}
                  className="group relative bg-[#141210] border-2 border-[var(--dawn-glow)]/30 hover:border-[var(--dawn-glow)]/70 rounded-2xl p-7 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] transition-all hover:-translate-y-1 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dawn-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)]"
                >
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-[var(--dawn-glow)] to-transparent" />

                  <h3 className="text-xl font-extrabold text-white mb-2">{program.title}</h3>
                  <p className="text-slate-300/85 text-sm leading-relaxed mb-5 flex-1">{program.summary}</p>

                  <ul className="space-y-2 mb-6">
                    {program.outcomes.slice(0, 3).map((o) => (
                      <li key={o} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle size={13} className="text-[var(--dawn-glow)] shrink-0 mt-0.5" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/10 flex items-end justify-between gap-3">
                    <div>
                      <div className="text-2xl font-extrabold text-white">{formatINR(program.price)}</div>
                      {emi && <div className="text-xs text-slate-400">EMI from {formatINR(emi)}/month</div>}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[var(--dawn-glow)] font-semibold text-sm group-hover:gap-2.5 transition-all">
                      Details <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
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
                { label: 'Concierge tier', value: '12-month tenure' },
                { label: 'Core & Advanced', value: '6-month tenure' },
                { label: 'Worked example', value: `${formatINR(200000)} = ${formatINR(16667)}/mo × 12` },
              ].map((row) => (
                <div key={row.label} className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
                  <div className="text-xs text-slate-400 mb-1">{row.label}</div>
                  <div className="text-white font-semibold text-sm">{row.value}</div>
                </div>
              ))}
            </div>

            {!BAJAJ_EMI_LIVE && (
              <p className="text-xs text-slate-400 leading-relaxed border-t border-white/10 pt-4">
                {financing.bajajPendingCopy} We will update this page the day it goes live.
              </p>
            )}
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
