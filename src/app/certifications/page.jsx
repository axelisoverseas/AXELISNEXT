'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, Clock, CreditCard, ShieldCheck, Users, Sparkles,
} from 'lucide-react';
import {
  TIERS, programsByTier, populatedTiers, catalogueStats,
  monthlyEmi, formatINR, financing,
} from '../../data/certificationPrograms';
import CertificationEnquiryForm from '../../components/CertificationEnquiryForm';
import PaymentPartnersStrip from '../../components/PaymentPartnersStrip';
import TrustBand from '../../components/TrustBand';
import { GST_NOTE } from '../../data/cashfreeLinks';

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
 * the old tier-filter chrome is gone, scrolling shows the same structure the
 * filter used to describe.
 */
function ConciergeRow({ program }) {
  const emi = monthlyEmi(program);
  return (
    <Link
      href={`/certifications/${program.slug}`}
      className="group relative grid grid-cols-1 md:grid-cols-5 gap-0 overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-white hover:border-[var(--color-axelis)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
    >
      <div className="md:col-span-2 relative h-48 md:h-auto min-h-[200px] overflow-hidden">
        <img
          src={program.image}
          alt={program.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#16265C] md:to-[#16265C]" />
      </div>

      <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
        {program.flagship && (
          <span className="inline-flex items-center gap-1.5 text-[var(--color-axelis)] text-sm font-semibold mb-2">
            <Sparkles aria-hidden="true" size={13} /> Our flagship programme
          </span>
        )}
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-2.5">{program.title}</h3>
        <p className="text-[var(--color-navy)]/85 leading-relaxed mb-5 max-w-xl">{program.summary}</p>

        <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
          <div>
            <div className="text-3xl font-bold text-[var(--color-navy)]">{formatINR(program.price)}</div>
            <div className="text-xs text-[var(--color-dim)]">{GST_NOTE}</div>
            {emi && <div className="text-sm text-[var(--color-dim)]">or {formatINR(emi)} a month</div>}
          </div>
          <div className="text-sm text-[var(--color-dim)]">
            {program.duration} &middot; {program.cohortSize}
          </div>
          <span className="inline-flex items-center gap-1.5 text-[var(--color-axelis)] font-semibold text-sm ml-auto group-hover:gap-2.5 transition-all">
            Details <ArrowRight aria-hidden="true" size={15} />
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
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-white hover:border-[var(--color-rule)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={program.image}
          alt={program.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16265C] via-[#16265C]/30 to-transparent" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2">{program.title}</h3>
        <p className="text-[var(--color-navy)]/80 text-sm leading-relaxed mb-5 flex-1">{program.summary}</p>
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-xl font-bold text-[var(--color-navy)]">{formatINR(program.price)}</div>
            <div className="text-[11px] text-[var(--color-dim)]">{GST_NOTE}</div>
            {emi && <div className="text-xs text-[var(--color-dim)]">or {formatINR(emi)} a month</div>}
          </div>
          <span className="text-sm text-[var(--color-dim)]">{program.duration}</span>
        </div>
      </div>
    </Link>
  );
}

function TierHeading({ tier, count }) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-5 pb-3 border-b border-[var(--color-rule)]">
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-[var(--color-navy)]">{tier.name}</h3>
        <p className="text-[var(--color-dim)] text-sm mt-1">{tier.tagline}</p>
      </div>
      <span className="text-sm text-[var(--color-dim)] shrink-0">
        {count} {count === 1 ? 'programme' : 'programmes'}
      </span>
    </div>
  );
}

export default function CertificationsPage() {
  // Only tiers that still hold something. Foundation, Core and Advanced are
  // empty under [RULING 12], and a TierHeading over an empty grid reads as a
  // broken page rather than a deliberate one.
  const tiers = populatedTiers();

  return (
    <div className="min-h-screen text-[var(--color-navy)]">
      {/* ---------------------------------------------------------------- HERO */}
 <section className="relative pt-28 lg:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/photos/photo-1524178232363-1fb2b075b655-1600.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)]/90 via-[var(--storm-deep)]/75 to-[var(--storm-deep)]" />
        </div>

        <motion.div
          initial={false}
          animate="visible"
          variants={stagger}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto"
          >
            Earn a credential on the way to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--accent-on-dark)]">
              your offer letter.
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            End-to-end concierge programmes, {formatINR(catalogueStats.priceFloor)} to {formatINR(catalogueStats.priceCeiling)},
            each carrying a written outcome guarantee. One counsellor, start to finish.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#programmes"
              className="btn btn-primary btn-lg"
            >
              Browse the programmes
              <ArrowRight aria-hidden="true" className="ml-2" size={20} />
            </a>
            <Link
              href="/bookings"
              className="inline-flex justify-center items-center px-8 py-4 glass-storm text-[var(--color-navy)] font-bold rounded-xl transition-colors hover:text-[var(--color-axelis)]"
            >
              Book a discovery call
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ------------------------------------------------------- PROGRAMMES */}
 <section id="programmes" className="relative sec scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* One block per populated tier. Concierge runs full-width rows;
              anything relisted later falls back to the half-width card. */}
          {tiers.map((tier) => {
            const inTier = programsByTier(tier.id);
            const isConcierge = tier.id === 'concierge';

            return (
              <div key={tier.id} className="mb-16 last:mb-0">
                <TierHeading tier={tier} count={inTier.length} />
                <div className={isConcierge ? 'space-y-5' : 'grid grid-cols-1 sm:grid-cols-2 gap-5'}>
                  {inTier.map((p) =>
                    isConcierge
                      ? <ConciergeRow key={p.slug} program={p} />
                      : <AdvancedCard key={p.slug} program={p} />,
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------- FINANCING */}
 <section id="financing" className="relative sec-sm scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-[var(--color-rule)] rounded-2xl p-7 md:p-9 shadow-e-3">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--storm-accent)] to-[var(--dawn-glow)] flex items-center justify-center text-white shrink-0">
                <CreditCard aria-hidden="true" size={22} strokeWidth={2.3} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-1">Financing</h2>
                <p className="text-[var(--color-navy)]/85 text-sm">{financing.strip}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Eligibility', value: `Programmes from ${formatINR(10000)}` },
                { label: 'Tenures', value: '6, 9, 12, 18 or 24 months' },
                { label: 'Worked example', value: `${formatINR(200000)} = ${formatINR(33333)}/mo × 6, or ${formatINR(8333)}/mo × 24` },
              ].map((row) => (
                <div key={row.label} className="bg-[var(--color-tint)] border border-[var(--color-rule)] rounded-xl p-4">
                  <div className="text-xs text-[var(--color-dim)] mb-1">{row.label}</div>
                  <div className="text-[var(--color-navy)] font-semibold text-sm">{row.value}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- ENQUIRY FORM */}
 <section id="enquire" className="relative sec scroll-mt-24 border-t border-[var(--color-rule)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] tracking-tight mb-4 text-balance">
                Not sure which one fits?
              </h2>
              <p className="text-[var(--color-navy)]/85 leading-relaxed mb-6">
                Tell us where you are in the process. A counsellor will come back with the one or two programmes that
                actually match, and say so if none of them do.
              </p>
              <ul className="space-y-3">
                {[
                  { Icon: Clock, text: 'Reply within one working day' },
                  { Icon: Users, text: 'One named counsellor, start to finish' },
                  { Icon: ShieldCheck, text: 'No obligation to enrol' },
                ].map(({ Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-[var(--color-navy)]">
                    <Icon size={16} className="text-[var(--color-axelis)] shrink-0" />
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
