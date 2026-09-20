import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  programs, catalogueStats,
  monthlyEmi, formatINR,
} from '../data/certificationPrograms';

// The catalogue is small enough to show whole: the flagship takes the wide
// slot and every other listed programme sits beside it. This used to name
// three supporting slugs by hand, all of which [RULING 12] withdrew — so it
// derives from the catalogue now and cannot go stale the same way again.
const flagship = programs.find((p) => p.flagship);
const supporting = programs.filter((p) => p !== flagship);

export default function HomeCertificationsPreview() {
  return (
 <section className="relative sec overflow-hidden border-y border-[var(--color-rule)]">
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[420px] h-[420px] bg-[var(--color-tint)] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[420px] h-[420px] bg-[var(--dawn-glow)]/8 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-navy)] tracking-tight mb-3 text-balance">
            End to end.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-navy)] to-[var(--dawn-glow)]">
              Outcome guaranteed.
            </span>
          </h2>
          <p className="text-[var(--color-navy)]/85 text-base md:text-lg">
            {formatINR(catalogueStats.priceFloor)} to {formatINR(catalogueStats.priceCeiling)}, one counsellor from
            application to arrival, and a written guarantee on the result.
          </p>
        </div>

        {/* Flagship gets the wide slot; the rest read as a supporting list */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-8">
          <Link
            href={`/certifications/${flagship.slug}`}
            className="group lg:col-span-3 relative overflow-hidden rounded-2xl border border-[var(--color-rule)] bg-white hover:border-[var(--color-axelis)]/50 transition-colors min-h-[280px] flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
          >
            <img
              src={flagship.image}
              alt={flagship.imageAlt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#12436E] via-[#12436E]/90 to-[#12436E]/30" />
            <div className="relative p-7 md:p-8 flex flex-col justify-end">
              <span className="inline-flex items-center gap-1.5 text-[var(--color-axelis)] text-sm font-semibold mb-2">
                <Sparkles aria-hidden="true" size={13} /> Our flagship programme
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-2">{flagship.title}</h3>
              <p className="text-[var(--color-navy)]/85 text-sm leading-relaxed mb-4 max-w-md">{flagship.summary}</p>
              <div className="flex items-end gap-6">
                <div>
                  <div className="text-2xl font-bold text-[var(--color-navy)]">{formatINR(flagship.price)}</div>
                  <div className="text-xs text-[var(--color-dim)]">or {formatINR(monthlyEmi(flagship))} a month</div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[var(--color-axelis)] font-semibold text-sm group-hover:gap-2.5 transition-all">
                  Details <ArrowRight aria-hidden="true" size={15} />
                </span>
              </div>
            </div>
          </Link>

          <div className="lg:col-span-2 flex flex-col gap-3">
            {supporting.map((program) => {
              const emi = monthlyEmi(program);
              return (
                <Link
                  key={program.slug}
                  href={`/certifications/${program.slug}`}
                  className="group flex items-center gap-4 flex-1 rounded-xl border border-[var(--color-rule)] bg-white hover:border-[var(--color-rule)] p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <img
                    src={program.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[var(--color-dim)] mb-0.5">
                      {program.duration}
                    </div>
                    <h3 className="text-[var(--color-navy)] font-semibold leading-snug truncate">{program.title}</h3>
                    <div className="text-sm text-[var(--color-dim)]">
                      {formatINR(program.price)}{emi ? ` · ${formatINR(emi)}/mo` : ''}
                    </div>
                  </div>
                  <ArrowRight aria-hidden="true" size={16} className="text-[var(--color-dim)] group-hover:text-[var(--color-navy)] transition-colors shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-white font-bold rounded-xl transition-[filter] shadow-e-2"
          >
            See the programmes
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
