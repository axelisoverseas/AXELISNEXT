import React from 'react';
import Link from 'next/link';
import { Check, FileText, Minus } from 'lucide-react';
import {
  promiseMeta,
  consent,
  universalTerms,
  servicePromises,
} from '../../../data/servicePromises';
import { refundPolicy } from '../../../data/certificationPrograms';

// The page every Cashfree payment form links to as its Terms and Conditions,
// and which the payer ticks to accept before paying.
//
// It has to stand on its own: someone arriving here has the payment page open
// in the tab behind and wants to know what they are agreeing to, not to be
// sent on to three more documents. So the scope, the exclusions, the refund
// treatment and the consent are all on this one page, and the full refund
// policy is linked for the detail rather than summarised away.

export const metadata = {
  title: 'Payment Terms | Axelis Overseas Education',
  description:
    'What every Axelis fee covers, what it does not, GST treatment, cancellation and refund terms, and the agreement you accept when you pay.',
  alternates: { canonical: 'https://overseeducation.com/policies/payment-terms' },
  robots: { index: true, follow: true },
};

export default function PaymentTermsPage() {
  return (
    <main className="min-h-screen text-slate-100">
      {/* HERO */}
      <section className="relative pt-28 lg:pt-32 pb-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--dawn-glow)] mb-4">
            Payment Terms
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight text-balance mb-5">
            What you are agreeing to when you pay.
          </h1>
          <p className="text-lg text-slate-300/90 leading-relaxed">
            This page sets out what each Axelis fee buys, what it does not cover, and how
            cancellation and refunds work. It is the Terms and Conditions linked from every Axelis
            payment page.
          </p>
          <dl className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 text-sm">
            {[
              ['Company', promiseMeta.company],
              ['CIN', promiseMeta.cin],
              ['Version', promiseMeta.version],
              ['Effective from', promiseMeta.effectiveFrom],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-slate-500 text-xs uppercase tracking-wide">{k}</dt>
                <dd className="text-slate-200 font-medium mt-0.5">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CONSENT — first, because it is the thing being agreed */}
      <section className="relative py-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-[var(--dawn-glow)]/35 bg-[var(--dawn-glow)]/[0.07] p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-3">{consent.heading}</h2>
            <p className="text-slate-200 leading-relaxed mb-5">{consent.lead}</p>
            <ul className="space-y-3">
              {consent.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <Check
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 mt-1 text-[var(--dawn-glow)]"
                  />
                  <span className="text-slate-200 leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 pt-5 border-t border-white/15 text-sm text-slate-300 leading-relaxed">
              {consent.footer}
            </p>
          </div>
        </div>
      </section>

      {/* UNIVERSAL TERMS */}
      <section className="relative py-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
            Terms that apply to everything
          </h2>
          <p className="text-slate-400 mb-8">
            Stated once here rather than repeated under every service.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {universalTerms.map((t) => (
              <div key={t.title} className="rounded-2xl border-2 border-white/10 bg-[#141210] p-6">
                <h3 className="text-base font-bold text-white mb-2">{t.title}</h3>
                <p className="text-sm text-slate-300/85 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PER SERVICE */}
      <section className="relative py-12 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
            Service by service
          </h2>
          <p className="text-slate-400 mb-8">
            What each fee covers, what it does not, and when it can be refunded.
          </p>

          <div className="space-y-5">
            {servicePromises.map((s) => (
              <article
                key={s.slug}
                id={s.slug}
                className="rounded-2xl border-2 border-white/10 bg-[#141210] p-6 md:p-7 scroll-mt-24"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 mb-3">
                  <h3 className="text-xl font-bold text-white">{s.name}</h3>
                  <p className="text-sm font-semibold text-[var(--dawn-glow)]">{s.fee}</p>
                </div>
                <p className="text-slate-300/90 leading-relaxed mb-6">{s.summary}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      What we do
                    </h4>
                    <ul className="space-y-2">
                      {s.included.map((i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-slate-300/90 leading-relaxed">
                          <Check
                            size={14}
                            aria-hidden="true"
                            className="shrink-0 mt-1 text-[var(--storm-electric)]"
                          />
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Not included
                    </h4>
                    <ul className="space-y-2">
                      {s.notIncluded.map((i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
                          <Minus size={14} aria-hidden="true" className="shrink-0 mt-1 text-slate-600" />
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <dl className="mt-6 pt-5 border-t border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-slate-400 sm:w-32 shrink-0 mb-1 sm:mb-0">
                      You provide
                    </dt>
                    <dd className="text-sm text-slate-300/90">{s.youProvide.join('. ')}.</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-slate-400 sm:w-32 shrink-0 mb-1 sm:mb-0">
                      Turnaround
                    </dt>
                    <dd className="text-sm text-slate-300/90">{s.turnaround}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="text-xs font-bold uppercase tracking-wider text-slate-400 sm:w-32 shrink-0 mb-1 sm:mb-0">
                      Refund
                    </dt>
                    <dd className="text-sm text-slate-300/90">{s.refund}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FULL POLICY + CONTACT */}
      <section className="relative py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-white/10 bg-[#141210] p-7 md:p-8">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-3">
              The full cancellation and refund policy
            </h2>
            <p className="text-slate-300/85 leading-relaxed mb-6">
              The summaries above are the short form. The complete policy sets out the tiered
              refund table, the EMI routing rules, the step-by-step cancellation process and the
              governing law. Where the two differ, the full policy governs.
            </p>
            <Link
              href={refundPolicy.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.11] border border-white/15 text-white font-semibold text-sm transition-colors"
            >
              <FileText size={15} aria-hidden="true" />
              Read the Cancellation &amp; Refund Policy
            </Link>

            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Registered office</p>
                <p className="text-slate-300">{promiseMeta.address}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wide mb-1">Questions before you pay</p>
                <p className="text-slate-300">
                  <a
                    href={`mailto:${promiseMeta.email}`}
                    className="underline underline-offset-2 hover:text-white"
                  >
                    {promiseMeta.email}
                  </a>
                  <br />
                  <a
                    href={`tel:${promiseMeta.phone.replace(/\s/g, '')}`}
                    className="underline underline-offset-2 hover:text-white"
                  >
                    {promiseMeta.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
