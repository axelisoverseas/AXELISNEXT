'use client';

import React, { useState } from 'react';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { cashfreeLinks, withGst, GST_RATE } from '../data/cashfreeLinks';
import { formatINR, refundPolicy } from '../data/certificationPrograms';

// Opens Cashfree's hosted checkout for one catalogue product.
//
// Cashfree requires a customer phone on the order, so we collect the minimum
// to create one and nothing more. Card details are entered on Cashfree's page,
// never here: this component never sees them.
//
// The SDK is loaded on demand rather than in the document head: most visitors
// never press this, and a payment SDK on every page view is a cost they don't
// owe us.
const SDK_SRC = 'https://sdk.cashfree.com/js/v3/cashfree.js';

let sdkPromise = null;
function loadSdk() {
  if (typeof window === 'undefined') return Promise.reject(new Error('ssr'));
  if (window.Cashfree) return Promise.resolve(window.Cashfree);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SDK_SRC;
    s.onload = () => (window.Cashfree ? resolve(window.Cashfree) : reject(new Error('sdk')));
    s.onerror = () => {
      sdkPromise = null; // let a later attempt retry rather than fail forever
      reject(new Error('sdk'));
    };
    document.head.appendChild(s);
  });
  return sdkPromise;
}

// Shared styling, so the hosted-form link and the API-backed button are the
// same control to a visitor. Only the mechanism behind them differs.
const CTA_CLASS =
  'inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-white font-bold rounded-xl transition-[filter] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

export default function CheckoutButton({ product, label, className = '', quantity = 1 }) {
  const item = cashfreeLinks[product];
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  // A product that isn't in the catalogue must not render a pay button at all.
  if (!item) return null;

  // A minted Cashfree Payment Form is a hosted page that already collects the
  // payer's name, phone and email and shows the amount as a fixed, read-only
  // line. Re-collecting those fields here and then calling the order API would
  // ask for the same three things twice, and would fail for want of gateway
  // keys where the hosted form needs none. So when a form exists, we send the
  // visitor to it and get out of the way.
  //
  // A product carrying a `disclosure` keeps the two-step flow: the disclosure
  // has to be read on our side, because Cashfree's page cannot show it.
  if (item.url && !item.disclosure) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className || CTA_CLASS}
      >
        {label || `Pay ${formatINR(withGst(item.amount * quantity).gross)}`}
        <ArrowRight size={18} aria-hidden="true" />
      </a>
    );
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await fetch('/api/cashfree/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, customer: form, quantity }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(
          data.error === 'unconfigured'
            ? `Online payment isn't switched on yet. Call ${refundPolicy.supportPhone} and we'll take it from there.`
            : data.message || 'We could not start the payment. Please try again.',
        );
        setBusy(false);
        return;
      }

      const Cashfree = await loadSdk();
      const cf = Cashfree({ mode: 'production' });
      await cf.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: '_self',
      });
    } catch {
      setError('We could not reach the payment page. Please try again.');
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className || CTA_CLASS}
      >
        {label || `Pay ${formatINR(withGst(item.amount * quantity).gross)}`}
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    );
  }

  // A disclosure product that also has a hosted form: show the disclosure here,
  // then hand over to Cashfree, which collects name, phone and email itself.
  if (item.url) {
    return (
      <div className="rounded-2xl border border-[var(--color-rule)] bg-white p-5 max-w-md shadow-e-2">
        <p className="text-[var(--color-navy)] font-bold mb-1">{item.label}</p>
        <p className="text-2xl font-extrabold text-[var(--color-navy)] mb-1 tabular-nums">
          {formatINR(withGst(item.amount * quantity).gross)}
        </p>
        <p className="text-xs text-[var(--color-dim)] mb-3">
          {formatINR(item.amount * quantity)} + {formatINR(withGst(item.amount * quantity).gst)} GST at {GST_RATE}%
        </p>
        <div className="mb-4 rounded-lg border border-[var(--color-axelis)]/35 bg-[var(--color-tint)] px-3.5 py-3">
          <p className="text-xs leading-relaxed text-[var(--color-navy)]">{item.disclosure}</p>
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
        >
          I have read this. Continue to payment <ArrowRight size={17} aria-hidden="true" />
        </a>
        <p className="mt-3 text-xs text-[var(--color-dim)] leading-relaxed">
          Payment is processed by Cashfree. Full terms:{' '}
          <a href="/charters" target="_blank" rel="noopener noreferrer" className="text-[var(--color-axelis)] underline underline-offset-2">
            Our Promises, in Writing
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-[var(--color-rule)] bg-white p-5 max-w-md shadow-e-2">
      <p className="text-[var(--color-navy)] font-bold mb-1">{item.label}</p>
      <p className="text-2xl font-extrabold text-[var(--color-navy)] mb-1 tabular-nums">
        {formatINR(withGst(item.amount * quantity).gross)}
      </p>
      <p className="text-xs text-[var(--color-dim)] mb-3">
        {formatINR(item.amount * quantity)} + {formatINR(withGst(item.amount * quantity).gst)} GST at {GST_RATE}%
      </p>

      {/* Shown before payment, not after. A fee a payer only learns about
          once they have paid is the thing that turns a refund into a claim. */}
      {item.disclosure && (
        <div className="mb-4 rounded-lg border border-[var(--color-axelis)]/35 bg-[var(--color-tint)] px-3.5 py-3">
          <p className="text-xs leading-relaxed text-[var(--color-navy)]">{item.disclosure}</p>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label htmlFor={`cf-name-${product}`} className="block text-xs text-[var(--color-dim)] mb-1">
            Full name
          </label>
          <input
            id={`cf-name-${product}`}
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={set('name')}
            className="w-full rounded-lg border border-[var(--color-dim)] bg-white px-3 py-2.5 text-[var(--color-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
          />
        </div>
        <div>
          <label htmlFor={`cf-phone-${product}`} className="block text-xs text-[var(--color-dim)] mb-1">
            Mobile number <span className="text-[var(--color-axelis)]">*</span>
          </label>
          <input
            id={`cf-phone-${product}`}
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            placeholder="10-digit mobile…"
            value={form.phone}
            onChange={set('phone')}
            className="w-full rounded-lg border border-[var(--color-dim)] bg-white px-3 py-2.5 text-[var(--color-navy)] placeholder:text-[var(--color-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
          />
        </div>
        <div>
          <label htmlFor={`cf-email-${product}`} className="block text-xs text-[var(--color-dim)] mb-1">
            Email
          </label>
          <input
            id={`cf-email-${product}`}
            type="email"
            autoComplete="email"
            spellCheck={false}
            value={form.email}
            onChange={set('email')}
            className="w-full rounded-lg border border-[var(--color-dim)] bg-white px-3 py-2.5 text-[var(--color-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
          />
        </div>
      </div>

      {error && (
        <div role="alert" className="mt-4 flex items-start gap-2 rounded-lg border border-red-600/40 bg-red-50 px-3 py-2.5">
          <AlertCircle size={16} aria-hidden="true" className="shrink-0 mt-0.5 text-red-700" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="btn btn-primary btn-lg mt-5 w-full disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
      >
        {busy ? (
          <>
            <Loader2 size={17} aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
            Opening secure checkout…
          </>
        ) : (
          <>Continue to payment <ArrowRight size={17} aria-hidden="true" /></>
        )}
      </button>

      <p className="mt-3 text-xs text-[var(--color-dim)] leading-relaxed">
        Payment is processed by Cashfree. Axelis never sees or stores your card details. By
        continuing you accept the{' '}
        <a href={refundPolicy.href} target="_blank" rel="noopener noreferrer" className="text-[var(--color-axelis)] underline underline-offset-2">
          Cancellation &amp; Refund Policy
        </a>{' '}
        and the{' '}
        <a href="/terms-conditions" target="_blank" rel="noopener noreferrer" className="text-[var(--color-axelis)] underline underline-offset-2">
          Terms of Service
        </a>
        . For EMI-financed enrolments, refunds are routed to your financing partner.
      </p>
    </form>
  );
}
