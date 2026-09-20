import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight, ArrowLeft, Award, CheckCircle, Clock, CreditCard,
  ShieldCheck, Users, Layers, BadgeCheck,
} from 'lucide-react';
import {
  programs, allPrograms, getProgram, isUnlisted, TIERS, monthlyEmi, emiTenure,
  formatINR, financing, BAJAJ_EMI_LIVE, accentFor, refundPolicy,
} from '../../../data/certificationPrograms';
import CertificationEnquiryForm from '../../../components/CertificationEnquiryForm';
import PaymentPartnersStrip from '../../../components/PaymentPartnersStrip';
import FinancingBlock from '../../../components/FinancingBlock';
import TrustBand from '../../../components/TrustBand';
import CancellationRefundBlock from '../../../components/CancellationRefundBlock';
import { GST_NOTE } from '../../../data/cashfreeLinks';

export function generateStaticParams() {
  // Unlisted programmes are built too. Withholding them from the listings is
  // the point; letting their live URLs 404 is not.
  return allPrograms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: 'Programme not found' };

  const url = `https://overseeducation.com/certifications/${program.slug}`;
  const title = `${program.title} — ${formatINR(program.price)} | Axelis Certification`;
  // Foundation tickets carry no EMI, so the claim is only appended where true.
  const emi = monthlyEmi(program);
  const emiLine = emi ? ` EMI from ${formatINR(emi)} a month.` : '';

  return {
    title,
    description: `${program.summary} ${program.duration}, ${program.format}.${emiLine}`,
    alternates: { canonical: url },
    // Unlisted programmes are reachable but not indexable: they are out of the
    // sitemap, so leaving them crawlable would advertise a catalogue we no
    // longer sell.
    ...(isUnlisted(program.slug)
      ? { robots: { index: false, follow: true } }
      : {}),
    openGraph: {
      title,
      description: program.summary,
      url,
      siteName: 'Axelis Overseas Education',
      locale: 'en_IN',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: program.summary,
    },
  };
}

function QuickFact({ Icon, label, value, highlight = false }) {
  return (
    <div className={`flex items-start gap-3 py-3.5 ${highlight ? '' : 'border-b border-[var(--color-rule)]'}`}>
      <Icon size={16} className={`shrink-0 mt-0.5 ${highlight ? 'text-[var(--color-axelis)]' : 'text-[var(--color-axelis)]'}`} />
      <div className="min-w-0">
        <div className="text-xs text-[var(--color-dim)] mb-0.5">{label}</div>
        <div className={`text-sm leading-snug ${highlight ? 'text-[var(--color-axelis)] font-bold' : 'text-[var(--color-navy)] font-semibold'}`}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default async function ProgramPage({ params }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const tier = TIERS.find((t) => t.id === program.tier);
  const emi = monthlyEmi(program);
  const tenure = emiTenure(program);
  const isConcierge = program.tier === 'concierge';
  // Withdrawn from the catalogue under [RULING 12]. The page stays up so an
  // existing link resolves, but it must not read as an open offer: no enquiry
  // form, no EMI, and no refund block promising cover under a policy whose
  // Section 1 now lists the Concierge programmes only.
  const withdrawn = isUnlisted(program.slug);
  const accent = accentFor(program.tier);

  // Always drawn from the listed catalogue, so no page — listed or unlisted —
  // ever recommends a withdrawn programme.
  const related = programs
    .filter((p) => p.slug !== program.slug && (p.tier === program.tier || p.family === program.family))
    .slice(0, 3);

  const courseLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.title,
    description: program.description,
    url: `https://overseeducation.com/certifications/${program.slug}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Axelis Overseas Education Pvt Ltd',
      url: 'https://overseeducation.com',
    },
    educationalCredentialAwarded: program.certificate,
    inLanguage: 'en',
    offers: {
      '@type': 'Offer',
      price: program.price,
      priceCurrency: 'INR',
      category: 'Paid',
      availability: 'https://schema.org/InStock',
      url: `https://overseeducation.com/certifications/${program.slug}`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: program.duration,
    },
    syllabusSections: program.syllabus.map((s, i) => ({
      '@type': 'Syllabus',
      position: i + 1,
      name: s.title,
      description: s.detail,
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://overseeducation.com' },
      { '@type': 'ListItem', position: 2, name: 'Certifications', item: 'https://overseeducation.com/certifications' },
      { '@type': 'ListItem', position: 3, name: program.title, item: `https://overseeducation.com/certifications/${program.slug}` },
    ],
  };

  return (
    <div className="min-h-screen text-[var(--color-navy)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ---------------------------------------------------------- HERO */}
      <section className="relative pt-28 lg:pt-32 pb-16 overflow-hidden border-b border-[var(--color-rule)]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={program.image}
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Editorial treatment: opaque behind the copy on the left, clearing
              to the right so the photograph is actually visible. */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--storm-deep)] via-[var(--storm-deep)]/88 to-[var(--storm-deep)]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--storm-deep)] via-transparent to-[var(--storm-deep)]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-dim)] hover:text-[var(--color-navy)] transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)] rounded"
          >
            <ArrowLeft aria-hidden="true" size={15} /> All certifications
          </Link>

          {/* Said before anything else, so nobody reads the page as a live
              offer and then finds out at the bottom. */}
          {withdrawn && (
            <div className="flex items-start gap-3 mb-8 rounded-xl border border-[var(--color-axelis)]/35 bg-[var(--dawn-glow)]/10 px-5 py-4">
              <ShieldCheck size={18} aria-hidden="true" className="text-[var(--color-axelis)] shrink-0 mt-0.5" />
              <p className="text-sm text-[var(--color-navy)] leading-relaxed">
                <span className="font-bold text-[var(--color-axelis)]">
                  Withdrawn from the catalogue.
                </span>{' '}
                This programme is no longer open for new enrolment and the fee below is the
                fee when it was last offered. Existing enrolments are unaffected.{' '}
                <Link href="/certifications" className="font-semibold text-[var(--color-navy)] hover:underline">
                  See our current programmes
                </Link>
                .
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left — headline + description */}
            <div className="lg:col-span-2">
              <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[var(--color-dim)] mb-5">
                <span className="text-[var(--color-navy)] font-semibold">{tier?.name}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{program.family}</span>
                {program.flagship && (
                  <>
                    <span aria-hidden="true">&middot;</span>
                    <span className="text-[var(--color-axelis)] font-semibold">Our flagship programme</span>
                  </>
                )}
              </p>

              <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-navy)] tracking-tight mb-5 text-balance">
                {program.title}
              </h1>

              <p className="text-lg md:text-xl text-[var(--color-navy)]/90 leading-relaxed mb-6">
                {program.summary}
              </p>

              <p className="text-[var(--color-navy)]/80 leading-relaxed mb-8 max-w-2xl">
                {program.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={withdrawn ? '/certifications' : '#enquire'}
                  className="inline-flex justify-center items-center px-7 py-3.5 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-white font-bold rounded-xl transition-[filter] shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
                >
                  {withdrawn ? 'See our current programmes' : 'Enquire about this programme'}
                  <ArrowRight aria-hidden="true" className="ml-2" size={18} />
                </Link>
                <Link
                  href="/bookings"
                  className="inline-flex justify-center items-center px-7 py-3.5 glass-storm text-[var(--color-navy)] font-bold rounded-xl transition-colors hover:text-[var(--color-axelis)]"
                >
                  Book a discovery call
                </Link>
              </div>
            </div>

            {/* Right rail — quick facts */}
            <aside className="lg:col-span-1 lg:sticky lg:top-24">
              <div className="bg-white border-2 border-[var(--color-rule)] rounded-2xl p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]">
                <div className="pb-4 mb-2 border-b border-[var(--color-rule)]">
                  <div className="text-xs text-[var(--color-dim)] mb-1">
                    {withdrawn ? 'Fee when last offered' : 'Programme fee'}
                  </div>
                  <div className="text-4xl font-extrabold text-[var(--color-navy)]">{formatINR(program.price)}</div>
                  <div className="text-xs text-[var(--color-dim)] mt-0.5">{GST_NOTE}</div>
                </div>

                <QuickFact Icon={Clock} label="Duration" value={program.duration} />
                <QuickFact Icon={Layers} label="Format" value={program.format} />
                <QuickFact Icon={Users} label="Cohort size" value={program.cohortSize} />
                {emi && !withdrawn && (
                  <QuickFact
                    Icon={CreditCard}
                    label="EMI available"
                    value={`From ${formatINR(emi)}/month over ${tenure} months`}
                    highlight
                  />
                )}
                <QuickFact Icon={Award} label="Certificate" value={program.certificate} highlight={!emi} />

                <Link
                  href={withdrawn ? '/certifications' : '#enquire'}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 min-h-[44px] rounded-xl bg-[var(--color-tint)] hover:bg-[var(--color-tint)] border border-[var(--color-rule)] text-[var(--color-navy)] font-bold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  {withdrawn ? 'Current programmes' : 'Enquire now'} <ArrowRight aria-hidden="true" size={15} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ OUTCOMES + SYLLABUS */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-navy)] tracking-tight mb-6 text-balance">
                What you leave with
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-14">
                {program.outcomes.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-3 bg-white border border-[var(--color-rule)] rounded-xl p-4"
                  >
                    <CheckCircle aria-hidden="true" size={17} className={`${accent.text} shrink-0 mt-0.5`} />
                    <span className="text-[var(--color-navy)] text-sm leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-navy)] tracking-tight mb-6 text-balance">
                Syllabus
              </h2>
              <ol className="space-y-3">
                {program.syllabus.map((mod, i) => (
                  <li
                    key={mod.title}
                    className="flex items-start gap-4 bg-white border border-[var(--color-rule)] rounded-xl p-5"
                  >
                    <span className={`shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-sm ${accent.step}`}>
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[var(--color-navy)] font-bold text-base mb-1">{mod.title}</h3>
                      <p className="text-[var(--color-navy)]/80 text-sm leading-relaxed">{mod.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {program.relatedNote && (
                <p className="mt-6 text-sm text-[var(--color-dim)]">
                  {program.relatedNote}{' '}
                  <Link href={program.relatedHref} className="text-[var(--color-axelis)] font-semibold hover:underline">
                    See Test Prep pricing
                  </Link>
                </p>
              )}
            </div>

            {/* Certificate + guarantee rail */}
            <aside className="lg:col-span-1 space-y-5">
              <div className="bg-white border-2 border-[var(--color-rule)] rounded-2xl p-6">
                <BadgeCheck aria-hidden="true" size={26} className={`${accent.text} mb-3`} />
                <h3 className="text-[var(--color-navy)] font-bold text-base mb-2">Verifiable certificate</h3>
                <p className="text-[var(--color-navy)]/80 text-sm leading-relaxed">
                  You receive <span className="text-[var(--color-navy)] font-semibold">{program.certificate}</span> on completion,
                  with a unique certificate ID that anyone can check against our register.
                </p>
              </div>

              {program.guarantee && (
                <div className="bg-white border-2 border-[var(--color-axelis)]/30 rounded-2xl p-6">
                  <ShieldCheck aria-hidden="true" size={26} className="text-[var(--color-axelis)] mb-3" />
                  <h3 className="text-[var(--color-navy)] font-bold text-base mb-2">Outcome guarantee</h3>
                  <p className="text-[var(--color-navy)] font-semibold text-sm leading-relaxed mb-2">{program.guarantee.promise}</p>
                  <p className="text-[var(--color-dim)] text-xs leading-relaxed mb-3">
                    If the guarantee is not met, the {program.guarantee.pct}% refund is issued regardless of how far into
                    the programme you are.
                  </p>
                  <Link href="/policies/cancellation-refund#refund-tiers" className="text-sm text-[var(--color-axelis)] font-semibold hover:underline underline-offset-4">
                    Guarantee terms live in the Cancellation &amp; Refund Policy &rarr;
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Fee + financing, in the format Indian EdTech actually ships.
          Both are suppressed on a withdrawn programme: there is nothing to
          finance, and the published policy no longer covers it. */}
      {!withdrawn && <FinancingBlock program={program} />}
      {!withdrawn && <CancellationRefundBlock />}

      {/* ------------------------------------------------------ ENQUIRY FORM */}
      {withdrawn ? (
        <section className="relative py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border-2 border-[var(--color-rule)] rounded-2xl p-7 md:p-9 text-center">
              <h2 className="text-2xl font-bold text-[var(--color-navy)] tracking-tight mb-3 text-balance">
                This programme is no longer open for new enrolment
              </h2>
              <p className="text-[var(--color-navy)]/85 leading-relaxed mb-7">
                {program.title} has been withdrawn from the Axelis catalogue and is not
                accepting new students. This page is kept so existing links resolve. If you
                are already enrolled, nothing changes &mdash; your programme runs as agreed
                and your counsellor remains your point of contact. Reach us at{' '}
                <a
                  href={`mailto:${refundPolicy.supportEmail}`}
                  className="text-[var(--color-axelis)] font-semibold hover:underline"
                >
                  {refundPolicy.supportEmail}
                </a>{' '}
                with any question about an existing enrolment.
              </p>
              <Link
                href="/certifications"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-white font-bold rounded-xl transition-[filter]"
              >
                See our current programmes <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
        </section>
      ) : (
      <section id="enquire" className="relative py-20 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-[var(--color-navy)] tracking-tight mb-4 text-balance">
                Enquire about {program.title}
              </h2>
              <p className="text-[var(--color-navy)]/85 leading-relaxed mb-6">
                A counsellor will call you within one working day to check the programme fits before you commit to anything.
              </p>
              <ul className="space-y-3">
                {[
                  { Icon: Clock, text: 'Reply within one working day' },
                  { Icon: Users, text: 'A counsellor, not a chatbot' },
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
              <CertificationEnquiryForm presetProgram={program} />
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ---------------------------------------------------------- RELATED */}
      {related.length > 0 && (
        <section className="relative py-16 border-t border-[var(--color-rule)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[var(--color-navy)] tracking-tight mb-6 text-balance">Related programmes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/certifications/${p.slug}`}
                  className="group bg-white border-2 border-[var(--color-rule)] hover:border-[var(--color-rule)]/50 rounded-2xl p-5 transition-[transform,color,background-color,border-color] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <div className="text-xs text-[var(--color-dim)] mb-2">
                    {TIERS.find((t) => t.id === p.tier)?.name}
                  </div>
                  <h3 className="text-[var(--color-navy)] font-bold mb-2 leading-snug">{p.title}</h3>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-lg font-extrabold text-[var(--color-navy)]">{formatINR(p.price)}</span>
                    <ArrowRight aria-hidden="true" size={15} className="text-[var(--color-axelis)] group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <TrustBand />

      <PaymentPartnersStrip />
    </div>
  );
}
