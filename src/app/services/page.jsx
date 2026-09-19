import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Info } from 'lucide-react';
import { serviceGroups, servicesPromise } from '../../data/studentServices';
import { refundPolicy } from '../../data/certificationPrograms';
import TrustBand from '../../components/TrustBand';
import ServiceCheckout from '../../components/ServiceCheckout';

export const metadata = {
  title: 'Student Services | Apostille, Translation, Visa Filing & Language Training',
  description:
    'Axelis student services sold on their own: MEA apostille, sworn translation, APS and ZAB support, visa filing, blocked account setup, and German, French, IELTS and PTE training. Every price stated in full.',
  alternates: { canonical: 'https://overseeducation.com/services' },
  robots: { index: true, follow: true },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen text-slate-100">
      {/* HERO */}
      <section className="relative pt-28 lg:pt-32 pb-14 overflow-hidden border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--dawn-glow)] mb-4">
            Student Services
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight text-balance mb-6 max-w-4xl">
            The pieces, without the whole programme.
          </h1>
          <p className="text-lg md:text-xl text-slate-300/90 leading-relaxed max-w-3xl">
            Everything here runs inside our charters, and every one of them can be bought on its
            own. If you only need documents apostilled, or only need German to A2, you do not have
            to enrol in anything.
          </p>
        </div>
      </section>

      {/* PROMISE */}
      <section className="relative py-10 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {servicesPromise.map((p) => (
              <li key={p} className="flex gap-2.5 text-sm text-slate-300/90">
                <CheckCircle size={15} aria-hidden="true" className="shrink-0 mt-0.5 text-[var(--storm-electric)]" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GROUPS */}
      {serviceGroups.map((g) => (
        <section key={g.id} id={g.id} className="relative py-14 scroll-mt-24 border-b border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-balance mb-2">
              {g.title}
            </h2>
            <p className="text-slate-300/85 max-w-3xl mb-8">{g.intro}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {g.services.map((s) => (
                <div
                  key={s.name}
                  className="rounded-2xl border-2 border-white/10 bg-[#141210] p-6 flex flex-col"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
                    <h3 className="text-lg font-bold text-white">{s.name}</h3>
                    <p className="text-[var(--dawn-glow)] font-bold tabular-nums whitespace-nowrap">
                      {s.price}
                      {s.per && (
                        <span className="ml-1.5 text-xs font-semibold text-slate-400">{s.per}</span>
                      )}
                    </p>
                  </div>
                  <p className="text-sm text-slate-300/85 leading-relaxed">{s.body}</p>
                  {s.thirdParty && (
                    <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
                      <Info size={13} aria-hidden="true" className="shrink-0 mt-0.5 text-slate-400" />
                      <p className="text-xs text-slate-400 leading-relaxed">{s.thirdParty}</p>
                    </div>
                  )}
                  <div className="mt-auto">
                    <ServiceCheckout payKey={s.payKey} payHref={s.payHref} name={s.name} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <TrustBand />

      {/* CTA */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-white/10 bg-[#141210] p-7 md:p-9">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-balance mb-3">
              Not sure which of these you actually need?
            </h2>
            <p className="text-slate-300/85 max-w-2xl mb-7 leading-relaxed">
              Tell us where you are in the process and we will tell you what is worth paying for and
              what is not. Buying an apostille you do not need helps nobody.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/bookings"
                className="inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-[filter]"
              >
                Book a free call <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/test-prep"
                className="inline-flex justify-center items-center gap-2 px-7 py-3.5 glass-storm text-white font-bold rounded-xl transition-colors hover:text-[var(--storm-electric)]"
              >
                See all Test Prep packs
              </Link>
            </div>
            <p className="mt-6 text-xs text-slate-500 leading-relaxed">
              Refunds on any service purchased on its own are governed by the{' '}
              <Link href={refundPolicy.href} className="text-slate-300 underline underline-offset-2">
                Cancellation &amp; Refund Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
