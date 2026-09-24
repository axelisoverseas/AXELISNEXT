import React from 'react';
import Link from 'next/link';
import { ArrowRight, CreditCard, Landmark, GraduationCap, ShieldCheck, Info } from 'lucide-react';
import {
  financing, EMI_TENURES, EMI_MIN_TICKET, BAJAJ_EMI_LIVE, formatINR, refundPolicy,
} from '../../data/certificationPrograms';
import TrustBand from '../../components/TrustBand';
import EmiChart from '../../components/EmiChart';

export const metadata = {
  title: 'Card EMI, Merchant EMI and Study Loans',
  description:
    'Three ways to fund an Axelis programme: card EMI through Cashfree, merchant EMI where a lender is onboarded, and study loans through specialist NBFCs for offshore tuition.',
  alternates: { canonical: 'https://www.overseeducation.com/financing' },
  robots: { index: true, follow: true },
};

// Three columns, kept deliberately separate. Card and merchant EMI fund the
// Axelis programme fee, which is delivered in India. Study loans fund offshore
// tuition and living costs, which Axelis does not charge for and does not lend
// against. Conflating them is how a lender ends up underwriting the wrong risk.
const ROUTES = [
  {
    id: 'card-emi',
    Icon: CreditCard,
    label: 'Live now',
    labelTone: 'emerald',
    title: 'Card EMI',
    sub: 'For the Axelis programme fee',
    body:
      'Convert your programme fee into monthly instalments on your existing credit card at checkout. Nothing to apply for and no new credit line.',
    points: [
      `Available on programmes priced ${formatINR(EMI_MIN_TICKET)} and above`,
      `Tenures of ${EMI_TENURES.join(', ')} months where your card issuer supports them`,
      'Processed by Cashfree, PCI-DSS compliant',
      'Your bank sets the interest rate, so the final instalment is fixed by your card issuer',
    ],
    cta: { label: 'See programmes', href: '/certifications' },
  },
  {
    id: 'merchant-emi',
    Icon: Landmark,
    label: 'In progress',
    labelTone: 'amber',
    title: 'Merchant EMI',
    sub: 'For the Axelis programme fee',
    body:
      'A lender funds your programme fee directly and you repay them monthly. No credit card needed, and eligibility is assessed by the lender rather than by your card limit.',
    points: [
      'We are onboarding with multiple NBFC lenders for this',
      'Eligibility, rate and tenure are set by the lender, not by Axelis',
      'Approval is theirs alone and Axelis has no influence over the decision',
      'We will publish each partner here once they are genuinely live',
    ],
    cta: { label: 'Ask us where this stands', href: '/contact' },
  },
  {
    id: 'study-loans',
    Icon: GraduationCap,
    label: 'Via partners',
    labelTone: 'slate',
    title: 'Study loans',
    sub: 'For university tuition and living costs abroad',
    body:
      'A separate product entirely. These fund what you pay your university and what you live on, not the Axelis fee. We introduce you to specialist education lenders and help you compare offers.',
    points: [
      'Specialist education NBFCs and international lenders',
      'Secured and unsecured options depending on your profile and collateral',
      'We help you assemble the file and compare the offers you receive',
      'Axelis receives no part of your loan and does not lend',
    ],
    cta: { label: 'Talk to a counsellor', href: '/bookings' },
  },
];

const TONE = {
  emerald: 'border-emerald-400/35 bg-emerald-400/10 text-emerald-300',
  amber: 'border-[var(--color-axelis)]/35 bg-[var(--dawn-glow)]/10 text-[var(--color-axelis)]',
  slate: 'border-[var(--color-rule)] bg-[var(--color-tint)] text-[var(--color-navy)]',
};

export default function FinancingPage() {
  return (
    <main className="min-h-screen text-[var(--color-navy)]">
 <section className="relative pt-28 lg:pt-32 pb-14 overflow-hidden border-b border-[var(--color-rule)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-axelis)] mb-4">
            Financing
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-navy)] tracking-tight text-balance mb-6 max-w-4xl">
            Three ways to pay, kept separate on purpose.
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-navy)]/90 leading-relaxed max-w-3xl">
            Two of these fund your Axelis programme fee. The third funds your tuition and living
            costs abroad. They are different products from different providers, and we do not mix
            them.
          </p>
        </div>
      </section>

 <section className="relative sec-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {ROUTES.map((r) => {
              const { Icon } = r;
              return (
                <article
                  key={r.id}
                  className="rounded-2xl border-2 border-[var(--color-rule)] bg-white p-6 md:p-7 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <Icon size={22} aria-hidden="true" className="text-[var(--color-axelis)]" />
                    <span className={`rounded-md border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${TONE[r.labelTone]}`}>
                      {r.label}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[var(--color-navy)] tracking-tight">{r.title}</h2>
                  <p className="text-xs font-semibold text-[var(--color-axelis)] uppercase tracking-wide mt-1 mb-3">
                    {r.sub}
                  </p>
                  <p className="text-sm text-[var(--color-navy)]/85 leading-relaxed mb-5">{r.body}</p>
                  <ul className="space-y-2 mb-6">
                    {r.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-sm text-[var(--color-navy)]/85">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--storm-electric)]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={r.cta.href}
                    className="btn btn-secondary mt-auto text-[var(--color-navy)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
                  >
                    {r.cta.label} <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* What we will not say */}
 <section className="relative sec-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmiChart />
        </div>
      </section>

      <section className="relative py-10 border-y border-[var(--color-rule)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[var(--color-rule)] bg-[var(--color-tint)] p-6 md:p-7">
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} aria-hidden="true" className="text-[var(--color-axelis)] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-bold text-[var(--color-navy)] mb-3">What we will not tell you</h2>
                <ul className="space-y-2.5 text-sm text-[var(--color-navy)]/85 leading-relaxed">
                  <li>
                    <span className="text-[var(--color-navy)] font-semibold">That any of this is no-cost.</span>{' '}
                    Where interest applies, it applies. If a genuine no-cost offer ever exists here,
                    it will name the lender funding the subvention.
                  </li>
                  <li>
                    <span className="text-[var(--color-navy)] font-semibold">That approval is assured.</span>{' '}
                    Credit decisions belong to the lender or your card issuer. Axelis has no
                    influence over them and no Axelis employee may suggest otherwise.
                  </li>
                  <li>
                    <span className="text-[var(--color-navy)] font-semibold">That a loan is part of our fee.</span>{' '}
                    Study loans fund your university, not us. We receive no part of your loan and
                    take no commission that changes what you repay.
                  </li>
                </ul>
                <p className="mt-4 text-xs text-[var(--color-dim)] leading-relaxed">
                  {financing.strip}{' '}
                  {!BAJAJ_EMI_LIVE && 'Lender partners are named here only once they are live, not while onboarding is in progress.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refund routing */}
 <section className="relative sec-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 rounded-2xl border border-[var(--color-rule)] bg-white p-6">
            <Info size={17} aria-hidden="true" className="text-[var(--color-axelis)] shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--color-navy)]/85 leading-relaxed">
              <span className="text-[var(--color-navy)] font-semibold">If you cancel an EMI-financed enrolment,</span>{' '}
              your refund is routed to the financing partner rather than to you, because they paid
              us on your behalf. Your obligation to them continues under their agreement until they
              apply the credit. This is set out in full in the{' '}
              <Link href={refundPolicy.href} className="text-[var(--color-navy)] underline underline-offset-2">
                Cancellation &amp; Refund Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <TrustBand />
    </main>
  );
}
