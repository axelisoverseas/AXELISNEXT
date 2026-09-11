import React from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { refundPolicy, formatINR } from '../data/certificationPrograms';

/**
 * Cancellation & Refund block for every programme page.
 *
 * Wording is the handover's, verbatim (MASTER_WEBSITE_HANDOVER_v3 §C.2 item 2).
 * The numbers are read from `refundPolicy` so this block, the policy page and
 * the schema can never drift from each other.
 */
export default function CancellationRefundBlock() {
  return (
    <section id="cancellation-refund" className="relative py-14 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141210] border-2 border-white/12 rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/8 border border-white/12 flex items-center justify-center shrink-0">
              <RotateCcw size={20} className="text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold text-white tracking-tight mb-4">Cancellation &amp; Refund</h2>
              <ul className="space-y-2 text-slate-300/90 leading-relaxed mb-6">
                <li>
                  {refundPolicy.coolingOffBusinessDays}-business-day cooling-off from enrolment: full refund minus{' '}
                  {formatINR(refundPolicy.adminFee)} admin fee.
                </li>
                <li>Tiered refund thereafter based on time and consumption.</li>
                <li>EMI enrolments: refund is routed to the financing partner.</li>
              </ul>
              <Link
                href={refundPolicy.href}
                className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-white/8 hover:bg-white/12 border border-white/15 text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Read the full Cancellation &amp; Refund Policy <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
