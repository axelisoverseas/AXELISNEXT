'use client';

import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * The lead form on every landing page.
 *
 * One component for all three pages, with `source` naming which headline the
 * visitor arrived on. That is the only thing worth knowing afterwards: which
 * argument brought them, not which form they filled.
 *
 * Posts to /api/lead, which returns 200 and logs even when HubSpot is
 * unreachable, so a form submission is never silently dropped. The failure
 * state below is for a genuine network failure, not a CRM outage.
 */

const DESTINATIONS = [
  'Not decided yet', 'Germany', 'UK', 'USA', 'Canada', 'Australia',
  'Ireland', 'France', 'Netherlands', 'Other Europe', 'Other',
];

export default function LandingLeadForm({ source, heading, blurb }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '' });
  const [state, setState] = useState('idle'); // idle | busy | done | error
  const [error, setError] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setState('busy');
    setError(null);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'We could not send that. Please try again.');
        setState('error');
        return;
      }
      setState('done');
    } catch {
      setError('That did not reach us. Check your connection and try again.');
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-white p-8 text-center shadow-e-2">
        <CheckCircle2 size={28} className="mx-auto text-[var(--color-axelis)]" aria-hidden="true" />
        <h3 className="mt-3 text-xl font-bold text-[var(--color-navy)]">We have your details.</h3>
        <p className="mt-2 text-sm text-[var(--color-dim)] measure mx-auto">
          A counsellor will call you within one working day. If you would rather not wait,
          the number is +91 9098522711.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-white p-6 sm:p-8 shadow-e-2">
      <h3 className="text-xl font-bold text-[var(--color-navy)]">{heading}</h3>
      {blurb && <p className="mt-2 text-sm text-[var(--color-dim)]">{blurb}</p>}

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold text-[var(--color-navy)]">Name</span>
          <input
            required
            value={form.name}
            onChange={set('name')}
            autoComplete="name"
            className="mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--color-rule)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--color-axelis)]"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-[var(--color-navy)]">Phone</span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            autoComplete="tel"
            className="mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--color-rule)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--color-axelis)]"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold text-[var(--color-navy)]">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={set('email')}
            autoComplete="email"
            className="mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--color-rule)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--color-axelis)]"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold text-[var(--color-navy)]">Where are you thinking of?</span>
          <select
            value={form.destination}
            onChange={set('destination')}
            className="mt-1.5 w-full rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-white px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--color-axelis)]"
          >
            <option value="">Select one</option>
            {DESTINATIONS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>

        {state === 'error' && (
          <p className="sm:col-span-2 flex items-start gap-2 text-sm text-[var(--color-navy)]">
            <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}

        <div className="sm:col-span-2">
          <button type="submit" disabled={state === 'busy'} className="btn btn-primary w-full sm:w-auto">
            {state === 'busy' ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                Sending
              </>
            ) : (
              <>
                Request a call back
                <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
          <p className="mt-3 text-xs text-[var(--color-dim)]">
            We call once. If it is not a fit we will say so on that call rather than add you to a list.
          </p>
        </div>
      </form>
    </div>
  );
}
