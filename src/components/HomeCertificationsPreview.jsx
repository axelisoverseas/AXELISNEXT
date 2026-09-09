import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  TIERS, programs, programsByTier, catalogueStats,
  monthlyEmi, formatINR, accentFor,
} from '../data/certificationPrograms';

// The homepage hero promises sixteen programmes, so the page has to show them.
// One flagship, one per remaining tier, then through to the full catalogue.
const featured = [
  programs.find((p) => p.flagship),
  programsByTier('core').find((p) => p.slug === 'application-coaching-postgraduate'),
  programsByTier('advanced').find((p) => p.slug === 'german-b1-intensive'),
  programsByTier('foundation').find((p) => p.slug === 'sop-and-personal-statement'),
].filter(Boolean);

export default function HomeCertificationsPreview() {
  return (
    <section className="relative py-20 overflow-hidden border-y border-white/5">
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[420px] h-[420px] bg-[var(--storm-electric)]/8 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[420px] h-[420px] bg-[var(--dawn-glow)]/8 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Sixteen programmes.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">
              Four tiers.
            </span>
          </h2>
          <p className="text-slate-300/85 text-base md:text-lg">
            {formatINR(catalogueStats.priceFloor)} to {formatINR(catalogueStats.priceCeiling)}. Enrol standalone,
            or bundled with the ZTF Charter.
          </p>
        </div>

        {/* Tier ladder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-4xl mx-auto">
          {TIERS.map((tier) => {
            const inTier = programsByTier(tier.id);
            const from = Math.min(...inTier.map((p) => p.price));
            return (
              <Link
                key={tier.id}
                href="/certifications#programmes"
                className="group bg-[#141210] border border-white/10 hover:border-[var(--storm-electric)]/45 rounded-xl p-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)]"
              >
                <div className="text-sm font-semibold text-white mb-1.5">
                  {tier.name}
                </div>
                <div className="text-white font-extrabold text-lg leading-none mb-1">
                  {inTier.length}
                </div>
                <div className="text-[11px] text-slate-400">from {formatINR(from)}</div>
              </Link>
            );
          })}
        </div>

        {/* Featured programmes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {featured.map((program) => {
            const emi = monthlyEmi(program);
            const accent = accentFor(program.tier);
            return (
              <Link
                key={program.slug}
                href={`/certifications/${program.slug}`}
                className="group relative flex flex-col bg-[#141210] border-2 border-white/10 hover:border-[var(--storm-electric)]/50 rounded-2xl p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] transition-all hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)]"
              >
                {program.flagship && (
                  <span className="absolute -top-3 left-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] text-[var(--storm-deep)] text-[11px] font-bold">
                    <Sparkles size={11} /> Flagship
                  </span>
                )}

                <span className={`text-xs font-semibold mb-2 ${accent.text}`}>
                  {TIERS.find((t) => t.id === program.tier)?.name}
                </span>

                <h3 className="text-white font-bold leading-snug mb-2">{program.title}</h3>
                <p className="text-slate-300/75 text-xs leading-relaxed mb-4 flex-1">{program.summary}</p>

                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xl font-extrabold text-white">{formatINR(program.price)}</span>
                    <ArrowRight size={14} className="text-[var(--storm-electric)] group-hover:translate-x-1 transition-transform" />
                  </div>
                  {emi && (
                    <p className="text-[11px] text-slate-400 mt-0.5">EMI from {formatINR(emi)}/month</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
          >
            See all 16 programmes
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
