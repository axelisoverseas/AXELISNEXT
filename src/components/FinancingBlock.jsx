import React from 'react';
import Link from 'next/link';
import { CreditCard, ShieldCheck } from 'lucide-react';
import {
  emiSchedule, formatINR, monthlyEmi, emiTenure,
  BAJAJ_EMI_LIVE, financing,
} from '../data/certificationPrograms';

/**
 * Fee + financing block.
 *
 * Format follows what Indian EdTech actually ships (Simplilearn, Great
 * Learning, upGrad): total fee and monthly EMI side by side at equal weight,
 * a partner sentence, named financing partners, then fine print.
 *
 * One deliberate departure — those sites all publish a monthly figure and
 * then hide the tenure maths behind a lead form (upGrad's "sliders" ship with
 * an empty plan array). We publish the full tenure table, because our numbers
 * are simple division and we can stand behind them.
 *
 * The published monthly is the fee split across the tenure, i.e. principal
 * only. Card EMI carries the issuing bank's rate, so it is presented as a
 * floor ("from"), never as a quoted instalment.
 */
export default function FinancingBlock({ program }) {
  const schedule = emiSchedule(program);
  if (schedule.length === 0) return null;

  const headline = monthlyEmi(program);
  const headlineTenure = emiTenure(program);

  return (
    <section id="financing" className="relative py-16 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
          Programme fee and financing
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          The fee for this programme is {formatINR(program.price)}, inclusive of taxes.
        </p>

        <div className="bg-[#141210] border-2 border-white/12 rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Total */}
            <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10">
              <div className="text-sm font-medium text-slate-400 mb-2">Total programme fee</div>
              <div className="text-4xl font-bold text-white mb-1">{formatINR(program.price)}</div>
              <div className="text-sm text-slate-500">Inclusive of taxes</div>
            </div>

            {/* EMI — equal visual weight to the total */}
            <div className="p-6 md:p-8">
              <div className="text-sm font-medium text-slate-400 mb-2">Pay in instalments, as low as</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-white">{formatINR(headline)}</span>
                <span className="text-xl font-medium text-slate-300">/month</span>
              </div>
              <div className="text-sm text-slate-500">
                over {headlineTenure} months{BAJAJ_EMI_LIVE ? ' on no-cost EMI' : ', before your bank\u2019s interest'}
              </div>
            </div>
          </div>

          {/* Tenure table */}
          <div className="border-t border-white/10 p-6 md:p-8">
            <div className="text-sm font-medium text-slate-300 mb-4">
              {financing.scheduleHeading}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[380px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th scope="col" className="text-left pb-2.5 text-xs font-medium text-slate-500">Tenure</th>
                    <th scope="col" className="text-right pb-2.5 text-xs font-medium text-slate-500">Monthly</th>
                    {BAJAJ_EMI_LIVE && (
                      <th scope="col" className="text-right pb-2.5 text-xs font-medium text-slate-500">Total payable</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.months} className="border-b border-white/5 last:border-0">
                      <td className="py-3 text-slate-200">{row.months} months</td>
                      <td className="py-3 text-right text-white font-semibold">{formatINR(row.monthly)}</td>
                      {BAJAJ_EMI_LIVE && (
                        <td className="py-3 text-right text-slate-400">{formatINR(program.price)}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              {financing.scheduleNote}
            </p>
          </div>

          {/* Partners */}
          <div className="border-t border-white/10 p-6 md:p-8">
            <div className="text-sm font-medium text-slate-300 mb-3">Financing partners</div>
            <div className="flex flex-wrap gap-2.5 mb-4">
              {financing.partners.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border bg-white/5 border-white/12 text-white text-sm font-semibold"
                >
                  {name}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#enquire"
                className="inline-flex justify-center items-center px-6 py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold text-sm transition-all"
              >
                Apply now
              </a>
              <Link
                href="/bookings"
                className="inline-flex justify-center items-center px-6 py-3 min-h-[44px] rounded-xl bg-white/8 hover:bg-white/12 border border-white/15 text-white font-semibold text-sm transition-colors"
              >
                Check your eligibility
              </Link>
            </div>
          </div>

          {/* Fine print */}
          <div className="border-t border-white/10 px-6 md:px-8 py-5 bg-white/[0.02]">
            <p className="text-xs text-slate-500 leading-relaxed">
              <ShieldCheck size={12} className="inline mr-1.5 -mt-0.5" />
              {financing.strip} Monthly amounts shown are the programme fee divided across the tenure;
              your card issuer sets the rate, so the final instalment and total are fixed by your bank.
              Approval sits with the financing provider and is subject to eligibility. A processing fee may
              apply depending on the payment method. Terms and conditions apply.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
