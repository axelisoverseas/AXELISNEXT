import React from 'react';
import { CreditCard } from 'lucide-react';
import { financing } from '../data/certificationPrograms';

// Typographic wordmarks rather than logo files: we do not hold redistribution
// rights to the partner brand assets. Only gateways that are actually live
// appear here — a partner is listed when the integration is real, not before.
const GATEWAYS = [
  { name: 'Cashfree', note: 'Live' },
];

const CARD_NETWORKS = ['Visa', 'Mastercard', 'Amex', 'RuPay'];

export default function PaymentPartnersStrip() {
  return (
 <section className="relative sec-sm border-t border-[var(--color-rule)]" aria-labelledby="payment-partners-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="payment-partners-heading"
          className="text-sm text-[var(--color-dim)] text-center mb-8"
        >
          Payment &amp; financing partners
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-8">
          {GATEWAYS.map((g) => (
            <div
              key={g.name}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[var(--color-tint)] border border-[var(--color-rule)]"
            >
              <span className="text-[var(--color-navy)] font-bold tracking-tight">{g.name}</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                {g.note}
              </span>
            </div>
          ))}

        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {CARD_NETWORKS.map((c) => (
            <span
              key={c}
              className="px-3 py-1.5 rounded-lg bg-[var(--color-tint)] border border-[var(--color-rule)] text-[var(--color-dim)] text-xs font-semibold"
            >
              {c}
            </span>
          ))}
        </div>

        <p className="flex items-center justify-center gap-2 text-xs text-[var(--color-dim)] text-center max-w-2xl mx-auto">
          <CreditCard size={13} className="shrink-0" />
          {financing.strip}
        </p>
      </div>
    </section>
  );
}
