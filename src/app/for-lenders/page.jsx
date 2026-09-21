import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

import {
  EMPANELMENT_CHECKLIST,
  CREDENTIAL_ROADMAP,
  LENDER_FACTS,
} from '@/data/skillProgrammes';

/**
 * The lender-facing page.
 *
 * This used to sit at the bottom of /programmes, where it was aimed at the
 * wrong reader. A student comparing six programmes does not need our CIN, and
 * a page that argues its own financeability to a student reads as anxious.
 * A credit officer, who does need all of it, now has a URL to be sent.
 *
 * Nothing here claims accreditation Axelis does not hold. Each roadmap step
 * carries its real status, because a plan a credit team can diligence is worth
 * more than a claim it can disprove in an afternoon.
 */

const CANONICAL = 'https://www.overseeducation.com/for-lenders';

export const metadata = {
  title: 'For Lending Partners',
  description:
    'Entity, GST, merchant category, published fees, refund policy, contact hours, assessment and verifiable credentials. What a credit team needs to assess Axelis Overseas, with outstanding items marked outstanding.',
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
};

export default function ForLendersPage() {
  return (
    <div className="bg-white">
      <section className="sec-lg border-b border-[var(--color-rule)] bg-gradient-to-b from-[var(--color-tint)] to-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="label">For lending partners</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-navy)] sm:text-4xl">
            What a credit team needs, in one place.
          </h1>
          <p className="mt-5 leading-relaxed text-[var(--color-dim)] measure">
            Everything below is either already true, or marked outstanding. Where a thing is
            outstanding it says so, including the two that would block a subvented
            arrangement today.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/programmes" className="btn btn-primary btn-lg">
              See the programmes
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href={LENDER_FACTS.refundPolicyHref} className="btn btn-secondary btn-lg">
              Read the refund policy
            </Link>
          </div>
        </div>
      </section>

      {/* Lender section */}
      <section id="empanelment" className="sec scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="label">For lending partners</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-navy)] sm:text-3xl">
              What a credit team needs, in one place.
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--color-dim)] measure">
              Everything below is either already true, or marked outstanding. Where a
              thing is outstanding it says so.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-rule)]">
            <table className="w-full text-sm">
              <caption className="sr-only">Lender empanelment checklist</caption>
              <tbody>
                {EMPANELMENT_CHECKLIST.map((row) => (
                  <tr key={row.item} className="border-b border-[var(--color-rule)] last:border-0">
                    <th scope="row" className="w-[34%] p-4 text-left align-top font-semibold text-[var(--color-navy)]">
                      {row.item}
                    </th>
                    <td className="p-4 align-top text-[var(--color-dim)]">{row.value}</td>
                    <td className="w-24 p-4 align-top">
                      {row.ready ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                          <Check size={14} aria-hidden="true" /> In place
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-[var(--color-axelis)]">Outstanding</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm md:grid-cols-4">
            {[
              ['Entity', LENDER_FACTS.entity],
              ['CIN', LENDER_FACTS.cin],
              ['GSTIN', LENDER_FACTS.gstin],
              ['Merchant category', LENDER_FACTS.mcc],
              ['Gateway', LENDER_FACTS.gateway],
              ['EMI tenures', `${LENDER_FACTS.emiTenures.join(', ')} months`],
              ['Refund policy in force', LENDER_FACTS.refundEffective],
              ['Offices', LENDER_FACTS.offices],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[var(--color-dim)]">{k}</dt>
                <dd className="mt-0.5 font-semibold text-[var(--color-navy)]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Credential roadmap */}
      <section className="sec border-t border-[var(--color-rule)] bg-[var(--color-tint)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="label">Credentialing</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-navy)] sm:text-3xl">
            Where the certificate stands, and where it is going.
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--color-dim)] measure">
            An Axelis certificate is issued by Axelis. It is not a degree, not a
            qualification under any national framework, and not accredited by DPIIT, the
            British Council or AIRC, each of which recognises the company rather than the
            credential. That is printed on the certificate and it is printed here.
          </p>
          <p className="mt-4 leading-relaxed text-[var(--color-dim)] measure">
            The steps below would change that. None is complete. Each is listed with its
            real status, because a plan a credit team can verify is worth more than a
            claim it can disprove in an afternoon.
          </p>

          <ol className="mt-10 space-y-6 list-none p-0">
            {CREDENTIAL_ROADMAP.map((s, i) => (
              <li key={s.step} className="rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-white p-6">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-[var(--color-navy)]">{s.step}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-dim)]">{s.what}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-navy)]">
                      <span className="font-semibold">Why it matters. </span>{s.why}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-dim)]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-axelis)]">Status. </span>
                      {s.status}
                    </p>
                    {s.caveat && (
                      <p className="mt-2 rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-tint)] p-3 text-sm leading-relaxed text-[var(--color-navy)]">
                        <span className="font-bold">Read this carefully. </span>{s.caveat}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  );
}
