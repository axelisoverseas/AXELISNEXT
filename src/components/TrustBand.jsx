import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, RotateCcw, FileCheck } from 'lucide-react';
import { SHOW_RAZORPAY } from '../data/cashfreeLinks';

/**
 * Credibility band.
 *
 * Every claim here is checkable: the three accreditations have certificate
 * scans on /accreditations, the CIN is on the MCA register, and the refund
 * terms are written into the engagement letter. Nothing is decorative.
 */

const ACCREDITATIONS = [
  { src: '/logos/dppit logo.png', alt: 'DPIIT Startup India', label: 'DPIIT recognised', ref: 'DIPP158553' },
  { src: '/trust-badges/british-council-logo.webp', alt: 'British Council', label: 'British Council trained', ref: 'UK Agent & Counsellor' },
  { src: '/logos/Airc-logo-full-color-centered-LG.jpg', alt: 'AIRC', label: 'AIRC certified', ref: 'US recruitment standard' },
];

const ASSURANCES = [
  { Icon: RotateCcw, title: 'Written refund terms', body: 'Refund conditions are set out in your engagement letter before you pay, not after.' },
  // Named gateways, so the claim stays true as the Razorpay rail is retired.
  { Icon: Lock, title: SHOW_RAZORPAY ? 'Payments via Cashfree & Razorpay' : 'Payments via Cashfree', body: 'PCI-DSS compliant gateways. We never see or store your card details.' },
  { Icon: FileCheck, title: 'Verifiable certificates', body: 'Every certificate carries a unique ID that anyone can check against our register at overseeducation.com/verify.' },
];

export default function TrustBand() {
  return (
 <section className="relative sec-sm border-t border-[var(--color-rule)]" aria-labelledby="trust-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="trust-heading" className="text-2xl md:text-3xl font-bold text-[var(--color-navy)] tracking-tight mb-2">
          Why you can check us
        </h2>
        <p className="text-[var(--color-dim)] mb-10 max-w-2xl">
          Three independent bodies have assessed how we work. The certificates are on file and a counsellor
          will show you the references on the call.
        </p>

        {/* Accreditations — logo, what it means, and the reference to verify */}
        <Link
          href="/accreditations"
          className="group grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10 focus-visible:outline-none"
        >
          {ACCREDITATIONS.map((a) => (
            <div
              key={a.label}
              className="flex items-center gap-4 bg-white border border-[var(--color-rule)] group-hover:border-[var(--color-rule)] rounded-xl p-5 transition-colors"
            >
              <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shrink-0 p-2">
                <img src={a.src} alt={a.alt} className="max-w-full max-h-full object-contain" loading="lazy" />
              </div>
              <div className="min-w-0">
                <div className="text-[var(--color-navy)] font-semibold text-sm leading-tight">{a.label}</div>
                <div className="text-[var(--color-dim)] text-xs mt-0.5 truncate">{a.ref}</div>
              </div>
            </div>
          ))}
        </Link>

        {/* Assurances */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ASSURANCES.map(({ Icon, title, body }) => (
            <div key={title} className="flex gap-3.5">
              <Icon size={18} className="text-[var(--color-navy)]/70 shrink-0 mt-0.5" />
              <div>
                <div className="text-[var(--color-navy)] font-semibold text-sm mb-1">{title}</div>
                <p className="text-[var(--color-dim)] text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-[var(--color-dim)] mt-10 pt-6 border-t border-[var(--color-rule)]">
          <ShieldCheck size={12} className="inline mr-1.5 -mt-0.5" />
          Axelis Overseas Education Pvt Ltd, incorporated 18 July 2023. CIN U85500CT2023PTC014913,
          on the Ministry of Corporate Affairs register. Corporate office Bengaluru, registered office Bilaspur.
        </p>
      </div>
    </section>
  );
}
