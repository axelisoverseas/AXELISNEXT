import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, X, FileText, Scale, Undo2 } from 'lucide-react';

import { PLANS, YOUR_PART, LEGAL, CHARTER_DOCS } from '@/data/charterPromises';

/**
 * Every promise in the two student charters, on one page.
 *
 * Students asked for a clear picture of what they are agreeing to. The charters
 * were PDFs linked from payment pages, which is the one place nobody reads
 * before paying. This page states the same terms in plain language, plan by
 * plan, with the money-back conditions and the no-refund conditions given
 * equal weight: a page that only lists the good half is a sales page, not a
 * statement of terms.
 *
 * Source and the two unresolved disagreements are documented in
 * src/data/charterPromises.js.
 */

const CANONICAL = 'https://www.overseeducation.com/charters';

export const metadata = {
  title: 'Our Promises, in Writing',
  description:
    'Every promise in the Global Admissions Charter and the Europe Public Charter: what we do, what you pay and when, exactly when you get your money back, and when you do not.',
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
};

function SectionHead({ label, title, children }) {
  return (
    <div className="max-w-3xl mb-10">
      <p className="label">{label}</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-navy)] sm:text-3xl text-balance">
        {title}
      </h2>
      {children && <p className="mt-3 leading-relaxed text-[var(--color-dim)] measure">{children}</p>}
    </div>
  );
}

function PlanTag({ plan }) {
  return (
    <div className="flex items-baseline justify-between gap-3 pb-4 mb-5 border-b border-[var(--color-rule)]">
      <h3 className="text-lg font-bold text-[var(--color-navy)]">
        {plan.name} <span className="text-[var(--color-dim)] font-semibold">({plan.short})</span>
      </h3>
      <span className="text-xs text-[var(--color-dim)] whitespace-nowrap">formerly {plan.formerly}</span>
    </div>
  );
}

export default function ChartersPage() {
  return (
    <div className="bg-white">
      {/* ---------- Hero ---------- */}
      <section className="sec-lg border-b border-[var(--color-rule)] bg-gradient-to-b from-[var(--color-tint)] to-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="label">Student plans</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-navy)] sm:text-4xl text-balance">
            Every promise, in writing, before you pay.
          </h1>
          <p className="mt-5 leading-relaxed text-[var(--color-dim)] measure">
            Two plans. For each one: what we do for you, what you pay and when, exactly when
            your money comes back, and when it does not. This is the same agreement you accept
            at checkout, written so you can read it in five minutes.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PLANS.map((p) => (
              <div
                key={p.key}
                className="rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[var(--color-rule)] shadow-[var(--shadow-e-2)]"
              >
                <p className="text-xs font-bold uppercase tracking-[.12em] text-[var(--color-axelis)]">
                  {p.name}
                </p>
                <p className="mt-3 text-4xl font-black tracking-tight text-[var(--color-navy)] tabular-nums">
                  {p.headline}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--color-navy)]">{p.headlineNote}</p>
                <p className="mt-3 text-sm text-[var(--color-dim)] leading-relaxed">{p.for}</p>
                <a
                  href={`#${p.key}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-axelis)] underline underline-offset-4"
                >
                  Read every term
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- What you pay ---------- */}
      <section className="sec">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHead label="Payment terms" title="What you pay, and exactly when.">
            Nothing is added later. Every amount below is on the checkout form before you pay.
          </SectionHead>

          <div className="grid gap-6 lg:grid-cols-2">
            {PLANS.map((p) => (
              <div key={p.key} id={p.key} className="scroll-mt-28">
                <PlanTag plan={p} />
                <div className="overflow-x-auto rounded-[var(--radius-lg)] ring-1 ring-[var(--color-rule)]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[var(--color-tint)] text-left">
                        <th className="p-3 font-semibold text-[var(--color-dim)] text-xs uppercase tracking-wide">Fee</th>
                        <th className="p-3 font-semibold text-[var(--color-dim)] text-xs uppercase tracking-wide text-right">Amount</th>
                        <th className="p-3 font-semibold text-[var(--color-dim)] text-xs uppercase tracking-wide">When</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.pay.map((row) => (
                        <tr key={row.what} className="border-t border-[var(--color-rule)] align-top">
                          <td className="p-3">
                            <span className="font-semibold text-[var(--color-navy)]">{row.what}</span>
                            <span className="block text-xs text-[var(--color-dim)] mt-0.5">{row.note}</span>
                          </td>
                          <td className="p-3 text-right font-bold text-[var(--color-navy)] tabular-nums whitespace-nowrap">
                            {row.amount}
                          </td>
                          <td className="p-3 text-[var(--color-dim)]">{row.when}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-[var(--color-navy)]">
                        <td className="p-3 font-bold text-[var(--color-navy)]">The most you ever pay</td>
                        <td className="p-3 text-right font-bold text-[var(--color-navy)]" colSpan={2}>
                          {p.total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Money back ---------- */}
      <section className="sec border-t border-[var(--color-rule)] bg-[var(--color-tint)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHead label="Refunds" title="When your money comes back, and when it does not.">
            Both lists matter equally. Read the second one as carefully as the first.
          </SectionHead>

          <div className="grid gap-6 lg:grid-cols-2">
            {PLANS.map((p) => (
              <div key={p.key} className="rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[var(--color-rule)]">
                <PlanTag plan={p} />

                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-emerald-700">
                  <Undo2 size={14} aria-hidden="true" /> You get it back
                </p>
                <ul className="mt-3 space-y-4 list-none p-0">
                  {p.refundYes.map((r) => (
                    <li key={r.title} className="flex gap-3">
                      <Check size={18} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-[var(--color-navy)]">{r.title}</p>
                        <p className="text-sm text-[var(--color-dim)] leading-relaxed mt-0.5">{r.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-[#9A2222]">
                  <X size={14} aria-hidden="true" /> No refund if
                </p>
                <ul className="mt-3 space-y-2.5 list-none p-0">
                  {p.refundNo.map((r) => (
                    <li key={r} className="flex gap-3 text-sm text-[var(--color-dim)] leading-relaxed">
                      <X size={16} className="mt-0.5 shrink-0 text-[#9A2222]" aria-hidden="true" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 pt-4 border-t border-[var(--color-rule)] text-sm text-[var(--color-navy)]">
                  <span className="font-semibold">How fast: </span>
                  {p.timeline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Scope ---------- */}
      <section className="sec border-t border-[var(--color-rule)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHead label="What we do" title="What your plan includes." />
          <div className="grid gap-6 lg:grid-cols-2">
            {PLANS.map((p) => (
              <div key={p.key}>
                <PlanTag plan={p} />
                <ul className="space-y-3 list-none p-0">
                  {p.scope.map((s) => (
                    <li key={s} className="flex gap-3 text-sm text-[var(--color-navy)] leading-relaxed">
                      <Check size={17} className="mt-0.5 shrink-0 text-[var(--color-axelis)]" aria-hidden="true" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Your part ---------- */}
      <section className="sec border-t border-[var(--color-rule)] bg-[var(--color-tint)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHead label="Your part" title="What we ask of you, on both plans." />
          <div className="grid gap-5 md:grid-cols-3">
            {YOUR_PART.map((y) => (
              <div key={y.title} className="rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-[var(--color-rule)]">
                <p className="font-bold text-[var(--color-navy)]">{y.title}</p>
                <p className="mt-2 text-sm text-[var(--color-dim)] leading-relaxed">{y.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Legal ---------- */}
      <section className="sec border-t border-[var(--color-rule)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHead label="The legal part" title="How the agreement works." />
          <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
            {LEGAL.map((l) => (
              <div key={l.k} className="flex gap-3">
                <Scale size={17} className="mt-1 shrink-0 text-[var(--color-dim)]" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-[var(--color-navy)]">{l.k}</dt>
                  <dd className="m-0 mt-1 text-sm text-[var(--color-dim)] leading-relaxed">{l.v}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/products" className="btn btn-primary btn-lg">
              Choose a plan
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href={CHARTER_DOCS.gac} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
              <FileText size={17} aria-hidden="true" /> Full GAC charter
            </a>
            <a href={CHARTER_DOCS.epc} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
              <FileText size={17} aria-hidden="true" /> Full EPC charter
            </a>
          </div>
          <p className="mt-6 text-sm text-[var(--color-dim)]">
            Questions before you pay: <a href="mailto:info@overseeducation.com" className="underline underline-offset-4">info@overseeducation.com</a> or +91 88823 20522.
          </p>
        </div>
      </section>
    </div>
  );
}
