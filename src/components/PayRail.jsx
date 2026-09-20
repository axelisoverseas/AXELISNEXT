import React from 'react';
import { ArrowRight } from 'lucide-react';
import { payRails } from '../data/cashfreeLinks';

// Renders the pay control(s) for one priced item during the Razorpay to
// Cashfree migration.
//
// While both rails are live the buyer sees two buttons and picks one. Once an
// item has a Cashfree form and SHOW_RAZORPAY is off, only Cashfree renders.
// An item that has neither renders nothing rather than a button that goes
// nowhere: a dead pay button is worse than no pay button, because the buyer
// blames themselves and leaves.

const PRIMARY =
  'inline-flex w-full items-center justify-center px-4 py-3 rounded-xl font-bold text-sm transition-all bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-white shadow-[0_0_30px_-10px_var(--storm-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dawn-glow)]';

const SECONDARY =
  'inline-flex w-full items-center justify-center px-4 py-3 rounded-xl font-bold text-sm transition-colors bg-white/8 hover:bg-white/15 text-white border border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)]';

export default function PayRail({ razorpayUrl, cashfreeUrl, highlight = false, label = 'Enrol' }) {
  const { cashfree, razorpay, count } = payRails({ razorpayUrl, cashfreeUrl });

  if (!count) return null;

  // With one rail the button carries the plain label; the processor name is
  // noise to a buyer who has no choice to make. With two it is the only thing
  // telling them apart, so it goes in the label.
  const single = count === 1;

  return (
    <div className="mt-3 space-y-2">
      {cashfree && (
        <a
          href={cashfree}
          target="_blank"
          rel="noopener noreferrer"
          className={highlight || single ? PRIMARY : SECONDARY}
        >
          {single ? label : `${label} via Cashfree`}
          <ArrowRight className="ml-1.5" size={16} aria-hidden="true" />
        </a>
      )}
      {razorpay && (
        <a
          href={razorpay}
          target="_blank"
          rel="noopener noreferrer"
          className={cashfree ? SECONDARY : highlight || single ? PRIMARY : SECONDARY}
        >
          {single ? label : `${label} via Razorpay`}
          <ArrowRight className="ml-1.5" size={16} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
