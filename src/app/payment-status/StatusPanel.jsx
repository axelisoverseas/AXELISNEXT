'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

// The status shown here comes from our server asking Cashfree, never from the
// query string. A payer who edits ?order_id= can only ask about a different
// order; they cannot manufacture a "paid" verdict.
export default function StatusPanel() {
  const params = useSearchParams();
  const orderId = params.get('order_id');
  const [state, setState] = useState({ kind: 'loading' });

  useEffect(() => {
    if (!orderId) {
      setState({ kind: 'missing' });
      return;
    }
    let cancelled = false;

    fetch(`/api/cashfree/status?order_id=${encodeURIComponent(orderId)}`)
      .then((r) => r.json().then((d) => ({ ok: r.ok, d })))
      .then(({ ok, d }) => {
        if (cancelled) return;
        setState(ok ? { kind: d.status, order: d } : { kind: 'error' });
      })
      .catch(() => !cancelled && setState({ kind: 'error' }));

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  const ref = orderId ? (
    <p className="mt-3 text-sm text-[var(--color-dim)]">
      Order reference: <span className="font-mono text-[var(--color-navy)]">{orderId}</span>
    </p>
  ) : null;

  if (state.kind === 'loading') {
    return (
      <div aria-live="polite">
        <h1 className="text-3xl font-bold text-[var(--color-navy)] tracking-tight text-balance">
          Checking your payment&hellip;
        </h1>
        <p className="mt-3 text-[var(--color-dim)]">One moment. Do not close this page.</p>
      </div>
    );
  }

  const shells = {
    PAID: {
      Icon: CheckCircle,
      tone: 'text-emerald-300',
      title: 'Payment received',
      body: 'Thank you. A receipt is on its way to the email address you gave, and a counsellor will be in touch within one working day to start your programme.',
    },
    ACTIVE: {
      Icon: Clock,
      tone: 'text-[var(--color-axelis)]',
      title: 'Payment not completed',
      body: 'We have not received this payment. Nothing has been charged. You can try again, and no amount is taken until a payment succeeds.',
    },
    EXPIRED: {
      Icon: Clock,
      tone: 'text-[var(--color-axelis)]',
      title: 'This payment request expired',
      body: 'Nothing was charged. Start again from the programme page, or call us and we will send a fresh request.',
    },
    error: {
      Icon: AlertCircle,
      tone: 'text-[var(--color-axelis)]',
      title: 'We could not confirm this payment',
      body: 'This does not mean it failed. Do not pay again. Call us with the order reference below and we will confirm what happened before anything else is taken.',
    },
    missing: {
      Icon: AlertCircle,
      tone: 'text-[var(--color-axelis)]',
      title: 'No order reference',
      body: 'This page needs an order reference to check a payment. If you have just paid, use the link in your confirmation email.',
    },
  };

  const s = shells[state.kind] || shells.error;
  const { Icon } = s;

  return (
    <div aria-live="polite">
      <Icon size={34} aria-hidden="true" className={`${s.tone} mb-4`} />
      <h1 className="text-3xl font-bold text-[var(--color-navy)] tracking-tight text-balance">{s.title}</h1>
      <p className="mt-3 text-[var(--color-navy)]/90 leading-relaxed">{s.body}</p>
      {ref}

      {state.kind !== 'PAID' && (
        <Link
          href="/certifications"
          className="btn btn-secondary mt-6 text-[var(--color-navy)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
        >
          Back to programmes
        </Link>
      )}
    </div>
  );
}
