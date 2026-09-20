import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import LandingLeadForm from './LandingLeadForm';

/**
 * The shape every landing page takes.
 *
 * All three pages render through here from src/data/landingPages.js, which is
 * what "same format" means in practice: the sections, their order and their
 * spacing cannot drift apart, because there is only one of each. A fourth
 * headline is a data entry, not a new page.
 *
 * Section order is the standard conversion sequence, which survives because it
 * matches how someone actually reads: the claim, the evidence for it, the
 * argument behind it, the form, then the objections.
 *
 * Styling is the site's own tokens and .btn / .sec classes throughout. Nothing
 * here introduces a colour or a radius that the rest of the site does not
 * already use, so these pages cannot become a separate visual language.
 */
export default function LandingPage({ page }) {
  const {
    label, h1, sub, primaryCta, secondaryCta,
    proofHeading, proof = [], bodyHeading, body = [], faqs = [], source,
  } = page;

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero */}
      <section className="sec-lg border-b border-[var(--color-rule)] bg-gradient-to-b from-[var(--color-tint)] to-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          {/* These pages are entry points from ads and shared links, so a
              visitor can land here having never seen the site. The mark makes
              the page recognisably Axelis above the fold rather than relying
              on the header alone. */}
          <img
            src="/brand/axelis-mark-navy.svg"
            alt="Axelis Overseas"
            width={52}
            height={52}
            className="mx-auto mb-6 h-12 w-auto"
          />
          <p className="label">{label}</p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight text-[var(--color-navy)] sm:text-5xl lg:text-6xl">
            {h1}
          </h1>
          <p className="measure mx-auto mt-5 text-lg leading-relaxed text-[var(--color-dim)]">
            {sub}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={primaryCta.href} className="btn btn-primary btn-lg">
              {primaryCta.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href={secondaryCta.href} className="btn btn-secondary btn-lg">
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Proof */}
      <section className="sec">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {proofHeading && (
            <h2 className="mb-10 text-2xl font-bold tracking-tight text-[var(--color-navy)] sm:text-3xl">
              {proofHeading}
            </h2>
          )}
          <ul className="grid list-none grid-cols-1 gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {proof.map((p) => (
              <li key={p.title}>
                <span aria-hidden="true" className="block h-0.5 w-8 rounded-full bg-[var(--color-axelis)]" />
                <h3 className="mt-4 text-base font-bold text-[var(--color-navy)]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-dim)]">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. The argument */}
      <section className="sec border-y border-[var(--color-rule)] bg-[var(--color-tint)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-navy)] sm:text-3xl">
            {bodyHeading}
          </h2>
          {body.map((para, i) => (
            <p key={i} className="mt-4 leading-relaxed text-[var(--color-dim)]">{para}</p>
          ))}
        </div>
      </section>

      {/* 4. Lead capture */}
      <section id="callback" className="sec">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <LandingLeadForm
            source={source}
            heading="Ask us whether this fits you."
            blurb="Four fields. A counsellor calls you back within one working day, and the call is free."
          />
        </div>
      </section>

      {/* 5. Objections */}
      {faqs.length > 0 && (
        <section className="sec border-t border-[var(--color-rule)]">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-navy)] sm:text-3xl">
              The questions people actually ask.
            </h2>
            <dl className="mt-8 space-y-7">
              {faqs.map((f) => (
                <div key={f.q}>
                  <dt className="flex items-start gap-2.5 font-bold text-[var(--color-navy)]">
                    <Check size={18} className="mt-0.5 shrink-0 text-[var(--color-axelis)]" aria-hidden="true" />
                    {f.q}
                  </dt>
                  <dd className="mt-2 pl-[26px] leading-relaxed text-[var(--color-dim)]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* 6. Close */}
      <section className="sec border-t border-[var(--color-rule)] bg-[var(--color-tint)]">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--color-navy)] sm:text-3xl">
            Find out where you stand, before you spend anything.
          </h2>
          <p className="measure mx-auto mt-3 text-[var(--color-dim)]">
            The first call is free and ends with a recommendation. Sometimes that
            recommendation is that we are not the right fit for you.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/bookings" className="btn btn-primary btn-lg">
              Book a free first call
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/products" className="btn btn-secondary btn-lg">
              See both student plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
