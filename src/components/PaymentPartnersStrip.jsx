import React from 'react';
import { CreditCard } from 'lucide-react';
import { BAJAJ_EMI_LIVE, financing } from '../data/certificationPrograms';

// Typographic wordmarks rather than logo files. We do not hold redistribution
// rights to the partner brand assets, and the handover asks for the Bajaj slot
// to be reserved rather than filled until merchant onboarding closes.
const GATEWAYS = [
  { name: 'Razorpay', note: 'Live' },
  { name: 'Cashfree', note: 'Live' },
];

const CARD_NETWORKS = ['Visa', 'Mastercard', 'Amex', 'RuPay'];

export default function PaymentPartnersStrip() {
  return (
    <section className="relative py-14 border-t border-white/5" aria-labelledby="payment-partners-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="payment-partners-heading"
          className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-bold text-center mb-8"
        >
          Payment &amp; financing partners
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
          {GATEWAYS.map((g) => (
            <div
              key={g.name}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10"
            >
              <span className="text-white font-bold tracking-tight">{g.name}</span>
              <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                {g.note}
              </span>
            </div>
          ))}

          {/* Bajaj slot — DOM space reserved per the handover. The logo goes in
              once merchant onboarding closes and BAJAJ_EMI_LIVE flips true. */}
          <div
            className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border ${
              BAJAJ_EMI_LIVE
                ? 'bg-white/[0.04] border-white/10'
                : 'bg-white/[0.02] border-dashed border-white/15'
            }`}
          >
            <span className={BAJAJ_EMI_LIVE ? 'text-white font-bold tracking-tight' : 'text-slate-500 font-bold tracking-tight'}>
              Bajaj Finserv EMI Network
            </span>
            <span
              className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border ${
                BAJAJ_EMI_LIVE
                  ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
                  : 'bg-white/5 border-white/15 text-slate-500'
              }`}
            >
              {BAJAJ_EMI_LIVE ? 'Live' : 'Onboarding'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {CARD_NETWORKS.map((c) => (
            <span
              key={c}
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-slate-400 text-xs font-semibold"
            >
              {c}
            </span>
          ))}
        </div>

        <p className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center max-w-2xl mx-auto">
          <CreditCard size={13} className="shrink-0" />
          {financing.strip}
        </p>
      </div>
    </section>
  );
}
