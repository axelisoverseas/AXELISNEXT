import React from 'react';
import Link from 'next/link';
import {
  ArrowRight, Clock, Users, GraduationCap, FileCheck,
  Timer, Languages, PenLine, Briefcase, Microscope, Plane,
} from 'lucide-react';

/* Lucide only, per BRAND_DECISIONS section 9: one icon family, 1.5px stroke,
   currentColor. Each programme carries its own mark so the six are told apart
   at a glance rather than by reading the heading. */
const ICONS = { Timer, Languages, PenLine, Briefcase, Microscope, Plane };

/* Four card treatments built from the locked palette. No new colour is
   introduced: navy, the accent blue, the two tints and the dark-surface token
   are all already in the system. Variation comes from weight and ground,
   which is what actually makes a row of cards scannable. */
const TREATMENTS = {
  featured: {
    card: 'on-dark bg-[var(--color-navy)] ring-1 ring-[var(--dark-rule)] md:col-span-2',
    kicker: 'text-[var(--dark-accent)]',
    title: 'text-white',
    body: 'text-white/90',
    label: 'text-white/60',
    value: 'text-white',
    rule: 'border-white/20',
    chip: 'bg-white/10 text-white ring-1 ring-white/25',
    iconWrap: 'bg-white/10 text-[var(--dark-accent)] ring-1 ring-white/20',
  },
  solid: {
    card: 'on-dark bg-[var(--dark-surface)] ring-1 ring-[var(--dark-rule)] md:col-span-2',
    kicker: 'text-[var(--dark-accent)]',
    title: 'text-white',
    body: 'text-white/90',
    label: 'text-white/60',
    value: 'text-white',
    rule: 'border-white/20',
    chip: 'bg-white/10 text-white ring-1 ring-white/25',
    iconWrap: 'bg-white/10 text-[var(--dark-accent)] ring-1 ring-white/20',
  },
  tinted: {
    card: 'bg-[var(--color-tint-2)] ring-1 ring-[var(--color-rule)]',
    kicker: 'text-[var(--color-axelis)]',
    title: 'text-[var(--color-navy)]',
    body: 'text-[var(--color-navy)]',
    label: 'text-[var(--color-dim)]',
    value: 'text-[var(--color-navy)]',
    rule: 'border-[var(--color-rule)]',
    chip: 'bg-white text-[var(--color-navy)] ring-1 ring-[var(--color-rule)]',
    iconWrap: 'bg-white text-[var(--color-axelis)] ring-1 ring-[var(--color-rule)]',
  },
  outline: {
    card: 'bg-white ring-1 ring-[var(--color-rule)]',
    kicker: 'text-[var(--color-axelis)]',
    title: 'text-[var(--color-navy)]',
    body: 'text-[var(--color-navy)]',
    label: 'text-[var(--color-dim)]',
    value: 'text-[var(--color-navy)]',
    rule: 'border-[var(--color-rule)]',
    chip: 'bg-[var(--color-tint)] text-[var(--color-navy)] ring-1 ring-[var(--color-rule)]',
    iconWrap: 'bg-[var(--color-tint)] text-[var(--color-axelis)] ring-1 ring-[var(--color-rule)]',
  },
};
import {
  SKILL_PROGRAMMES,
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
            {SKILL_PROGRAMMES.length} programmes with a published curriculum, countable contact hours,
            an assessment against stated criteria, and a certificate with an ID anyone can
            check. Fees and refund terms are published before you pay.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#programmes" className="btn btn-primary btn-lg">
              See all {SKILL_PROGRAMMES.length} programmes
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/for-lenders" className="btn btn-secondary btn-lg">
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
              Built like a course, because that is what it is.
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
              {SKILL_PROGRAMMES.length} programmes.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {SKILL_PROGRAMMES.map((p) => {
              const T = TREATMENTS[p.treatment] ?? TREATMENTS.outline;
              const Icon = ICONS[p.icon] ?? GraduationCap;
              const g = gstBreakdown(p.fee);
              return (
                <article
                  key={p.slug}
                  className={`flex flex-col rounded-[var(--radius-xl)] p-6 sm:p-8 ${T.card}`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] ${T.iconWrap}`}>
                      <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <span className={`text-[11px] font-bold uppercase tracking-[0.14em] ${T.kicker}`}>
                        {p.family}
                      </span>
                      <h3 className={`mt-1.5 text-xl font-bold leading-snug ${T.title}`}>{p.title}</h3>
                    </div>
                  </div>

                  <p className={`mt-4 leading-relaxed ${T.body}`}>{p.strapline}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[`${p.weeks} weeks`, `${p.contactHours} contact hours`, p.cohortSize].map((chip) => (
                      <span key={chip} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${T.chip}`}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  <p className={`mt-5 text-3xl font-extrabold tracking-tight tabular-nums ${T.value}`}>
                    {inr(p.fee)}
                  </p>
                  <p className={`mt-1 text-xs leading-relaxed ${T.label}`}>
                    Inclusive of GST at 18%. Taxable {inr(g.base)}, CGST {inr(g.cgst)}, SGST {inr(g.sgst)}.
                  </p>

                  <dl className={`mt-5 space-y-3 border-t pt-5 text-sm ${T.rule}`}>
                    {[
                      ['Level', p.level],
                      ['Taught', p.mode],
                      ['Assessed', p.assessment],
                      ['You leave with', p.outcome],
                      ['Credential', p.credential],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className={`text-xs font-bold uppercase tracking-wider ${T.label}`}>{k}</dt>
                        <dd className={`mt-0.5 leading-relaxed ${T.body}`}>{v}</dd>
                      </div>
                    ))}
                  </dl>

                  {p.external && (
                    <p className={`mt-4 border-t pt-4 text-xs leading-relaxed ${T.rule} ${T.label}`}>
                      {p.external}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
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
          <p className="mt-6 text-sm text-[var(--color-dim)]">
            Assessing us as a financing partner?{' '}
            <Link href="/for-lenders" className="underline underline-offset-4 hover:text-[var(--color-axelis)]">
              Entity, GST and credentialing detail
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
