'use client';

import React, { useState } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { cashfreeLinks, withGst, GST_RATE, MAX_UNITS } from '../data/cashfreeLinks';
import CheckoutButton from './CheckoutButton';

// The pay control on /services.
//
// Three shapes, because the three kinds of service genuinely differ and
// pretending otherwise is how someone gets charged the wrong amount:
//
//  1. FIXED PRICE with a hosted form  -> straight to Cashfree.
//  2. PER DOCUMENT                    -> count first, then pay that exact
//     total. A hosted form carries one fixed figure and cannot serve both a
//     candidate with one document and one with eight, so these go through the
//     order API instead, which mints an order for the counted amount. The
//     count is re-validated server side; the browser does not set the price.
//  3. NOT YET MINTED (url is null)    -> ask, rather than show a dead button.
//
// Services included in a charter pass no payKey at all and render nothing,
// because there is no Axelis fee to collect.


const INR = (n) => `₹${n.toLocaleString('en-IN')}`;

const CTA =
  'inline-flex justify-center items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-white font-bold text-sm transition-[filter] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dawn-glow)]';

const GHOST =
  'inline-flex justify-center items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-white/[0.06] hover:bg-white/[0.11] border border-white/15 text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)]';

export default function ServiceCheckout({ payKey, payHref, name }) {
  const item = payKey ? cashfreeLinks[payKey] : null;
  const [units, setUnits] = useState(1);

  // Language services: the packs and their live links already live on the
  // Test Prep page. Sending someone there beats duplicating a price ladder.
  if (payHref) {
    return (
      <div className="mt-5 pt-5 border-t border-white/10">
        <a href={payHref} className={GHOST}>
          See packs and pay <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    );
  }

  if (!item) return null;

  // ---- Per document -------------------------------------------------------
  if (item.perUnit) {
    const { net, gst, gross } = withGst(item.amount * units);

    return (
      <div className="mt-5 pt-5 border-t border-white/10">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1">
            <span id={`qty-label-${payKey}`} className="sr-only">
              Number of {item.unit}s for {name}
            </span>
            <button
              type="button"
              onClick={() => setUnits((n) => Math.max(1, n - 1))}
              disabled={units <= 1}
              aria-label={`One fewer ${item.unit}`}
              className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.09] disabled:opacity-35 disabled:hover:bg-white/[0.04]"
            >
              <Minus size={14} aria-hidden="true" />
            </button>
            <output
              aria-labelledby={`qty-label-${payKey}`}
              className="w-12 text-center text-base font-bold tabular-nums text-white"
            >
              {units}
            </output>
            <button
              type="button"
              onClick={() => setUnits((n) => Math.min(MAX_UNITS, n + 1))}
              disabled={units >= MAX_UNITS}
              aria-label={`One more ${item.unit}`}
              className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.09] disabled:opacity-35 disabled:hover:bg-white/[0.04]"
            >
              <Plus size={14} aria-hidden="true" />
            </button>
            <span className="ml-2 text-xs text-slate-400">
              {item.unit}
              {units > 1 ? 's' : ''}
            </span>
          </div>

          <p className="text-sm text-slate-300">
            Total{' '}
            <span className="text-lg font-bold tabular-nums text-white">{INR(gross)}</span>{' '}
            <span className="text-xs text-slate-500">
              ({INR(net)} + {INR(gst)} GST)
            </span>
          </p>
        </div>

        <div className="mt-4">
          <CheckoutButton
            product={payKey}
            quantity={units}
            label={`Pay ${INR(gross)}`}
            className={CTA}
          />
        </div>

        <p className="mt-2.5 text-xs text-slate-500 leading-relaxed">
          You are charged for the documents you count here and nothing else. If the count turns out
          to be wrong once we have seen them, we adjust it before any work starts.
        </p>
      </div>
    );
  }

  // ---- Fixed price --------------------------------------------------------
  if (item.url) {
    return (
      <div className="mt-5 pt-5 border-t border-white/10">
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={CTA}>
          Pay {INR(withGst(item.amount).gross)} <ArrowRight size={15} aria-hidden="true" />
        </a>
        <p className="mt-2.5 text-xs text-slate-500">
          {INR(item.amount)} + {INR(withGst(item.amount).gst)} GST. Processed by Cashfree, which
          shows the full terms and takes your agreement before any payment.
        </p>
      </div>
    );
  }

  // ---- Priced, no hosted form ---------------------------------------------
  // Not every service needs a minted form. The order API creates one for the
  // catalogue amount on demand, so a price on the page is always payable.
  return (
    <div className="mt-5 pt-5 border-t border-white/10">
      <CheckoutButton
        product={payKey}
        label={`Pay ${INR(withGst(item.amount).gross)}`}
        className={CTA}
      />
      <p className="mt-2.5 text-xs text-slate-500">
        {INR(item.amount)} + {INR(withGst(item.amount).gst)} GST. Card details are entered on
        Cashfree's page, never here.
      </p>
    </div>
  );
}
