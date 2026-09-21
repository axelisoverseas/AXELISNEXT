import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Clock, Users, GraduationCap, FileCheck } from 'lucide-react';
import {
  SKILL_PROGRAMMES,
  EMPANELMENT_CHECKLIST,
  CREDENTIAL_ROADMAP,
  LENDER_FACTS,
  gstBreakdown,
} from '@/data/skillProgrammes';

const inr = (n) => `\u20b9${n.toLocaleString('en-IN')}`;

/**
 * The skill-programme catalogue, structured for lender empanelment.
 *
 * Separate from /certifications, which is untouched. That page sells to
 * students. This one has to satisfy a credit team as well, because Bajaj
 * Finserv has said study-abroad courses are not on their approved list.
 *
 * The argument the page makes: a lender finances a course and declines a
 * service retainer. A course has a syllabus, countable contact hours, an
 * assessment against published criteria, and a verifiable credential. Every
 * programme below is presented on exactly those attributes.
 *
 * It does not claim accreditation Axelis does not hold. The roadmap section
 * states each step's real status, because a plan a credit team can diligence
 * is worth more than a claim it can disprove.
 */

const CANONICAL = 'https://www.overseeducation.com/programmes';

export const metadata = {
  title: 'Skill Programmes',
  description:
    'Structured skill programmes with published curricula, contact hours, assessment and verifiable certificates. Language training to CEFR B1, application craft, research proposals and executive applications.',
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
};

export default function ProgrammesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="sec-lg border-b border-[var(--color-rule)] bg-gradient-to-b from-[var(--color-tint)] to-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <img
            src="/brand/axelis-mark-navy.svg"
            alt="Axelis Overseas"
            width={48}
            height={48}
            className="mx-auto mb-6 h-12 w-auto"
          />
          <p className="label">Skill programmes</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.06] tracking-tight text-[var(--color-navy)] sm:text-5xl lg:text-6xl">
            Taught programmes, assessed and certified.
          </h1>
          <p className="measure mx-auto mt-5 text-lg leading-relaxed text-[var(--color-dim)]">
            Five programmes with a published curriculum, countable contact hours, an
            assessment against stated criteria, and a certificate with an ID anyone can
            check. Fees and refund terms are published before you pay.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#programmes" className="btn btn-primary btn-lg">
              See the five programmes
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="#empanelment" className="btn btn-secondary btn-lg">
              Information for lenders
            </Link>
          </div>
        </div>
      </section>

      {/* What makes these financeable */}
      <section className="sec">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="label">How these are built</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-navy)] sm:text-3xl">
              A course, not a retainer.
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--color-dim)] measure">
              Every programme here is defined by four things: how long it runs, what is
              taught, how the work is marked, and what credential results. Those are the
              attributes that make a programme assessable, by a student deciding whether
              to enrol and by a lender deciding whether to finance it.
            </p>
          </div>

          <ul className="mt-10 grid list-none grid-cols-1 gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: Clock, title: 'Fixed duration', body: 'Weeks and contact hours stated per programme, not open-ended engagement.' },
              { Icon: GraduationCap, title: 'Published curriculum', body: 'Module-level syllabus, visible before enrolment.' },
              { Icon: FileCheck, title: 'Assessed work', body: 'A graded submission marked against published criteria.' },
              { Icon: Users, title: 'Capped cohorts', body: 'Named programme lead, cohort size stated up front.' },
            ].map(({ Icon, title, body }) => (
              <li key={title}>
                <span aria-hidden="true" className="block h-0.5 w-8 rounded-full bg-[var(--color-axelis)]" />
                <Icon size={20} className="mt-4 text-[var(--color-axelis)]" aria-hidden="true" />
                <h3 className="mt-3 text-base font-bold text-[var(--color-navy)]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-dim)]">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The five programmes */}
      <section id="programmes" className="sec border-y border-[var(--color-rule)] bg-[var(--color-tint)] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="label">The catalogue</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--color-navy)] sm:text-4xl">
              Five programmes.
            </h2>
          </div>

          <div className="mt-10 space-y-5">
            {SKILL_PROGRAMMES.map((p) => (
              <article
                key={p.slug}
                className="rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-white p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-axelis)]">
                      {p.family}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-[var(--color-navy)] sm:text-2xl">{p.title}</h3>
                    <p className="mt-2 text-[var(--color-navy)]">{p.strapline}</p>
                  </div>
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--color-rule)] pt-5 text-sm md:grid-cols-5">
                  {[
                    ['Duration', `${p.weeks} weeks`],
                    ['Contact hours', `${p.contactHours}`],
                    ['Level', p.level],
                    ['Cohort', p.cohortSize],
                    ['Fee', `${inr(p.fee)} incl. GST`],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[var(--color-dim)]">{k}</dt>
                      <dd className="mt-0.5 font-semibold text-[var(--color-navy)]">{v}</dd>
                    </div>
                  ))}
                </dl>

                {(() => {
                  const g = gstBreakdown(p.fee);
                  return (
                    <p className="mt-4 text-xs leading-relaxed text-[var(--color-dim)]">
                      {inr(p.fee)} inclusive of GST at 18% (SAC 9992). Taxable value{' '}
                      {inr(g.base)}, CGST {inr(g.cgst)}, SGST {inr(g.sgst)}.
                    </p>
                  );
                })()}

                <div className="mt-5 grid gap-5 border-t border-[var(--color-rule)] pt-5 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-dim)]">How it is taught</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-navy)]">{p.mode}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[var(--color-dim)]">How it is assessed</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-navy)]">{p.assessment}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-dim)]">What you leave with</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-navy)]">{p.outcome}</p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[var(--color-dim)]">Credential</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-navy)]">{p.credential}</p>
                    {p.external && (
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-dim)]">{p.external}</p>
                    )}
                  </div>
                </div>
              </article>
            ))}
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
              Everything below is either already true or marked as outstanding. Nothing is
              stated as held that is not held.
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

      {/* Close */}
      <section className="sec border-t border-[var(--color-rule)]">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-navy)] sm:text-3xl">
            Every certificate is checkable.
          </h2>
          <p className="measure mx-auto mt-3 text-[var(--color-dim)]">
            Issued certificates carry a unique ID that resolves in a public register. A
            revoked certificate reports as revoked rather than as missing, so a revocation
            can never be mistaken for a typing error.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={LENDER_FACTS.verifyHref} className="btn btn-primary btn-lg">
              Verify a certificate
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href={LENDER_FACTS.refundPolicyHref} className="btn btn-secondary btn-lg">
              Read the refund policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
