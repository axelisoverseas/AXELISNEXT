import React from 'react';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle, Clock, Wallet, ShieldCheck, Info, Users,
} from 'lucide-react';
import {
  vocationalPrograms, vocationalFees, thirdPartyCosts, programCaps,
} from '../../data/vocationalPrograms';
import { formatINR, refundPolicy } from '../../data/certificationPrograms';
import TrustBand from '../../components/TrustBand';

export const metadata = {
  title: 'Vocational Skill Programmes | Ausbildung & Chancenkarte Germany',
  description:
    'Ausbildung and Chancenkarte for Germany, with every cost published before you pay. Axelis fee, language training, exams, APS, visa and blocked account set out in full.',
  alternates: { canonical: 'https://overseeducation.com/vocational' },
  robots: { index: true, follow: true },
};

function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative py-16 scroll-mt-24 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export default function VocationalPage() {
  const required = thirdPartyCosts.filter((c) => c.required && !c.isDeposit);
  const optional = thirdPartyCosts.filter((c) => !c.required || c.isDeposit);

  return (
    <main className="min-h-screen text-slate-100">
      {/* HERO */}
      <section className="relative pt-28 lg:pt-32 pb-16 overflow-hidden border-b border-white/5">
        <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1587330979470-3595ac045ab0?q=80&w=2400&auto=format&fit=crop"
            alt=""
            width={2400}
            height={1600}
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)]/92 via-[var(--storm-deep)]/80 to-[var(--storm-deep)]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--dawn-glow)] mb-4">
            Vocational Skill Programmes
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight text-balance mb-6 max-w-4xl">
            Work and train in Germany, without tuition.
          </h1>
          <p className="text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-3xl mb-8">
            Two routes into Germany that do not depend on paying university fees. Ausbildung puts
            you in a paid training contract with a German employer. Chancenkarte gets you into the
            country on points so you can find skilled work on the ground.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#programmes"
              className="inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-white font-bold rounded-xl transition-[filter]"
            >
              See both routes <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              href="#costs"
              className="inline-flex justify-center items-center gap-2 px-7 py-3.5 glass-storm text-white font-bold rounded-xl transition-colors hover:text-[var(--storm-electric)]"
            >
              What it costs, in full
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAMMES */}
      <Section id="programmes">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-balance mb-3">
          Two routes. Pick the one your profile fits.
        </h2>
        <p className="text-slate-300/85 max-w-3xl mb-10">
          Both are run end to end by Axelis, and both settle the main fee only once your visa is
          granted. Not on an invitation letter, not on an offer.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vocationalPrograms.map((p) => {
            const cap = programCaps[p.cap];
            return (
              <article
                key={p.slug}
                className="rounded-2xl border-2 border-white/10 bg-[#141210] overflow-hidden flex flex-col"
              >
                {p.image && (
                  <div className="relative h-44 sm:h-52 overflow-hidden">
                    <img
                      src={`${p.image}?w=1200&q=75&auto=format&fit=crop`}
                      alt={p.imageAlt}
                      width={1200}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/35 to-transparent" />
                  </div>
                )}
                <div className="p-7 md:p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-white tracking-tight mb-2">{p.name}</h3>
                <p className="text-[var(--dawn-glow)] text-sm font-semibold mb-4">{p.tagline}</p>
                <p className="text-slate-300/85 leading-relaxed mb-6">{p.summary}</p>

                {p.earnWhileTraining && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 mb-6">
                    <Wallet size={16} aria-hidden="true" className="text-emerald-300 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-200">
                      <span className="font-semibold text-emerald-300">You are paid while you train.</span>{' '}
                      {p.earnWhileTraining}
                    </p>
                  </div>
                )}

                <h4 className="text-sm font-semibold text-white mb-2.5">Who this is for</h4>
                <ul className="space-y-1.5 mb-6">
                  {p.whoFor.map((w) => (
                    <li key={w} className="flex gap-2.5 text-sm text-slate-300/85">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--storm-electric)]" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-sm font-semibold text-white mb-2.5">What you need</h4>
                <ul className="space-y-1.5 mb-6">
                  {p.requires.map((r) => (
                    <li key={r} className="flex gap-2.5 text-sm text-slate-300/85">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-600" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-sm font-semibold text-white mb-2.5">What Axelis does</h4>
                <ul className="space-y-1.5 mb-6">
                  {p.axelisDoes.map((a) => (
                    <li key={a} className="flex gap-2.5 text-sm text-slate-300/85">
                      <CheckCircle size={14} aria-hidden="true" className="shrink-0 mt-0.5 text-[var(--storm-electric)]" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto space-y-3 pt-5 border-t border-white/10">
                  <div className="flex items-start gap-2.5">
                    <Users size={15} aria-hidden="true" className="shrink-0 mt-0.5 text-[var(--dawn-glow)]" />
                    <div>
                      <p className="text-sm font-semibold text-white">{cap.label}</p>
                      <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{cap.detail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock size={15} aria-hidden="true" className="shrink-0 mt-0.5 text-[var(--dawn-glow)]" />
                    <p className="text-sm text-slate-300/85">{p.duration}</p>
                  </div>
                </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* COSTS */}
      <Section id="costs" className="border-y border-white/5">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-balance mb-3">
          What it costs. All of it.
        </h2>
        <p className="text-slate-300/85 max-w-3xl mb-10">
          Below is every cost this journey involves, whether it is paid to us or to someone else.
          You should be able to add this up before you pay Axelis anything.
        </p>

        {/* Axelis fee */}
        <div className="rounded-2xl border-2 border-[var(--dawn-glow)]/30 bg-[#17140F] p-6 md:p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-1">What you pay Axelis</h3>
          <p className="text-sm text-slate-400 mb-6">
            The same for Ausbildung and for Chancenkarte.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm tabular-nums">
              <thead>
                <tr className="border-b border-white/15">
                  <th scope="col" className="text-left pb-3 font-semibold text-slate-400">Fee</th>
                  <th scope="col" className="text-right pb-3 font-semibold text-slate-400">Amount</th>
                  <th scope="col" className="text-left pb-3 pl-6 font-semibold text-slate-400">When</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/8">
                  <td className="py-3.5 text-slate-200">Onboarding fee</td>
                  <td className="py-3.5 text-right text-white font-bold">{formatINR(vocationalFees.d2c.upfront)}</td>
                  <td className="py-3.5 pl-6 text-slate-400">On enrolment</td>
                </tr>
                <tr className="border-b border-white/8">
                  <td className="py-3.5 text-slate-200">Success fee</td>
                  <td className="py-3.5 text-right text-white font-bold">{formatINR(vocationalFees.d2c.success)}</td>
                  <td className="py-3.5 pl-6 text-slate-400">On visa completion only</td>
                </tr>
                <tr>
                  <td className="py-3.5 text-white font-semibold">Total to Axelis</td>
                  <td className="py-3.5 text-right text-[var(--dawn-glow)] font-extrabold text-lg">
                    {formatINR(vocationalFees.d2c.total)}
                  </td>
                  <td className="py-3.5 pl-6 text-slate-400">No other Axelis fee applies</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <ShieldCheck size={15} aria-hidden="true" className="text-[var(--dawn-glow)] shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300/90 leading-relaxed">
              {vocationalFees.d2c.successTrigger} If you never receive a visa, the success fee never
              becomes payable. Refund terms are in the{' '}
              <Link href={refundPolicy.href} className="text-white underline underline-offset-2">
                Cancellation &amp; Refund Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Third party */}
        <div className="rounded-2xl border-2 border-white/10 bg-[#141210] p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-1">What you pay other people</h3>
          <p className="text-sm text-slate-400 mb-6">
            These are not Axelis fees and Axelis does not take a margin on them. We list them so
            that nothing here is a surprise later.
          </p>

          <div className="space-y-3">
            {required.map((c) => (
              <div key={c.item} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1.5">
                  <p className="font-semibold text-white">{c.item}</p>
                  <p className="text-[var(--storm-electric)] font-bold tabular-nums">{c.amount}</p>
                </div>
                <p className="text-xs text-slate-500 mb-1.5">Payable to {c.payableTo}</p>
                <p className="text-sm text-slate-300/80 leading-relaxed">{c.note}</p>
              </div>
            ))}
          </div>

          <h4 className="text-sm font-semibold text-white mt-8 mb-3">
            Held funds and variable costs
          </h4>
          <div className="space-y-3">
            {optional.map((c) => (
              <div key={c.item} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1.5">
                  <p className="font-semibold text-white">
                    {c.item}
                    {c.isDeposit && (
                      <span className="ml-2 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
                        Your money
                      </span>
                    )}
                  </p>
                  <p className="text-[var(--storm-electric)] font-bold tabular-nums">{c.amount}</p>
                </div>
                <p className="text-xs text-slate-500 mb-1.5">Payable to {c.payableTo}</p>
                <p className="text-sm text-slate-300/80 leading-relaxed">{c.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-[var(--dawn-glow)]/30 bg-[var(--dawn-glow)]/10 px-4 py-3.5">
            <Info size={15} aria-hidden="true" className="text-[var(--dawn-glow)] shrink-0 mt-0.5" />
            <p className="text-sm text-slate-200 leading-relaxed">
              <span className="font-semibold">Language training is not bundled into the Axelis fee.</span>{' '}
              You choose your school and pay them directly. Axelis teaches German A1 and A2 in house
              at the rates published on our{' '}
              <Link href="/test-prep" className="text-white underline underline-offset-2">
                Test Prep page
              </Link>
              , and will help you arrange B1 and B2. Bundling it would mean charging you a margin on
              teaching, and we would rather you see the real price.
            </p>
          </div>
        </div>
      </Section>

      <TrustBand />

      {/* CTA */}
      <Section>
        <div className="rounded-2xl border-2 border-white/10 bg-[#141210] p-7 md:p-9 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-balance mb-3">
            Find out whether you qualify, before you pay anything.
          </h2>
          <p className="text-slate-300/85 max-w-2xl mx-auto mb-7 leading-relaxed">
            The first call is free and it is an honest assessment. If your profile does not clear
            the Chancenkarte points threshold, or if your trade is not one German employers hire
            into from India, we will tell you on that call rather than after you have paid.
          </p>
          <Link
            href="/bookings"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-white font-bold rounded-xl transition-[filter]"
          >
            Book a free assessment call <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </Section>
    </main>
  );
}
