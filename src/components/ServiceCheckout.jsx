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

// The pay button was navy text on a "gradient" whose two stops both resolve
// to #A51C30 since the palette was locked, so it was flat blue carrying navy
// text at 2.14:1. WCAG 1.4.3 wants 4.5:1, and this is the button that takes
// money. .btn-primary is the site's own primary control, white on the same
// blue at 6.70:1, and it stays correct if the blue is ever changed again.
const CTA = 'btn btn-primary text-sm';

const GHOST =
  'inline-flex justify-center items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-white hover:bg-[var(--color-tint)] border border-[var(--color-dim)] text-[var(--color-navy)] font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]';

export default function ServiceCheckout({ payKey, payHref, name }) {
  const item = payKey ? cashfreeLinks[payKey] : null;
  const [units, setUnits] = useState(1);

  // Language services: the packs and their live links already live on the
  // Test Prep page. Sending someone there beats duplicating a price ladder.
  if (payHref) {
    return (
      <div className="mt-5 pt-5 border-t border-[var(--color-rule)]">
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
      <div className="mt-5 pt-5 border-t border-[var(--color-rule)]">
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
              className="h-11 w-11 inline-flex items-center justify-center rounded-lg border border-[var(--color-dim)] bg-white text-[var(--color-navy)] transition-colors hover:bg-[var(--color-tint)] disabled:opacity-35 disabled:hover:bg-white"
            >
              <Minus size={14} aria-hidden="true" />
            </button>
            <output
              aria-labelledby={`qty-label-${payKey}`}
              className="w-12 text-center text-base font-bold tabular-nums text-[var(--color-navy)]"
            >
              {units}
            </output>
            <button
              type="button"
              onClick={() => setUnits((n) => Math.min(MAX_UNITS, n + 1))}
              disabled={units >= MAX_UNITS}
              aria-label={`One more ${item.unit}`}
              className="h-11 w-11 inline-flex items-center justify-center rounded-lg border border-[var(--color-dim)] bg-white text-[var(--color-navy)] transition-colors hover:bg-[var(--color-tint)] disabled:opacity-35 disabled:hover:bg-white"
            >
              <Plus size={14} aria-hidden="true" />
            </button>
            <span className="ml-2 text-xs text-[var(--color-dim)]">
              {item.unit}
              {units > 1 ? 's' : ''}
            </span>
          </div>

          <p className="text-sm text-[var(--color-navy)]">
            Total{' '}
            <span className="text-lg font-bold tabular-nums text-[var(--color-navy)]">{INR(gross)}</span>{' '}
            <span className="text-xs text-[var(--color-dim)]">
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

        <p className="mt-2.5 text-xs text-[var(--color-dim)] leading-relaxed">
          You are charged for the documents you count here and nothing else. If the count turns out
          to be wrong once we have seen them, we adjust it before any work starts.
        </p>
      </div>
    );
  }

  // ---- Fixed price --------------------------------------------------------
  if (item.url) {
    return (
      <div className="mt-5 pt-5 border-t border-[var(--color-rule)]">
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={CTA}>
          Pay {INR(withGst(item.amount).gross)} <ArrowRight size={15} aria-hidden="true" />
        </a>
        <p className="mt-2.5 text-xs text-[var(--color-dim)]">
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
    <div className="mt-5 pt-5 border-t border-[var(--color-rule)]">
      <CheckoutButton
        product={payKey}
        label={`Pay ${INR(withGst(item.amount).gross)}`}
        className={CTA}
      />
      <p className="mt-2.5 text-xs text-[var(--color-dim)]">
        {INR(item.amount)} + {INR(withGst(item.amount).gst)} GST. Card details are entered on
        Cashfree&rsquo;s page, never here.
      </p>
    </div>
  );
}
