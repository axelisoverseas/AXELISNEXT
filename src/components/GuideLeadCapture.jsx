'use client';

import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * Lead capture beneath the guide library.
 *
 * The guides themselves stay free and ungated. Putting a form in front of
 * them would cost more viewers than it gains contacts, and the guides are on
 * a public YouTube channel anyway, so a gate would be theatre. This asks for
 * a contact after the value has been given, which is the honest version of
 * the same trade.
 *
 * Posts to /api/lead, which accepts the lead even when HubSpot is
 * unreachable, so the form is never a silent drop.
 */

const DESTINATIONS = [
  'Not decided yet', 'UK', 'USA', 'Canada', 'Australia', 'Ireland',
  'Germany', 'France', 'Netherlands', 'Other Europe', 'Other',
];

export default function GuideLeadCapture() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '' });
  const [state, setState] = useState('idle'); // idle | busy | done | error
  const [error, setError] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setState('busy'); setError(null);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'guide-library' }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'We could not send that. Please try again.');
        setState('error');
        return;
      }
      setState('done');
    } catch {
      setError('We could not reach our server. Please try again.');
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-[var(--color-tint)] p-6 sm:p-8 text-center">
        <CheckCircle2 aria-hidden="true" size={26} className="mx-auto text-[var(--color-axelis)]" />
        <h3 className="mt-3 text-lg font-bold text-[var(--color-navy)]">
          Thank you, {form.name.split(' ')[0] || 'we have it'}.
        </h3>
        <p className="mt-2 text-sm text-[var(--color-dim)] measure mx-auto">
          A counsellor will be in touch within one working day. The first call is free and
          there is no obligation after it.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-white shadow-e-2 p-6 sm:p-8">
      <div className="max-w-xl">
        <p className="label">Free, no obligation</p>
        <h3 className="mt-2 text-xl sm:text-2xl font-bold text-[var(--color-navy)]">
          Want the guidance applied to your own file?
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-dim)]">
          The guides stay free and ungated. If you would rather have someone read your
          profile and tell you where you actually stand, leave your details and a
          counsellor will call.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="block text-xs font-semibold text-[var(--color-dim)] mb-1">
            Full name
          </label>
          <input
            id="lead-name" type="text" required autoComplete="name"
            value={form.name} onChange={set('name')}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-dim)] bg-white px-3 py-2.5 text-[var(--color-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="block text-xs font-semibold text-[var(--color-dim)] mb-1">
            Mobile number
          </label>
          <input
            id="lead-phone" type="tel" inputMode="tel" required autoComplete="tel"
            placeholder="10-digit mobile"
            value={form.phone} onChange={set('phone')}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-dim)] bg-white px-3 py-2.5 text-[var(--color-navy)] placeholder:text-[var(--color-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
          />
        </div>
        <div>
          <label htmlFor="lead-email" className="block text-xs font-semibold text-[var(--color-dim)] mb-1">
            Email
          </label>
          <input
            id="lead-email" type="email" required autoComplete="email" spellCheck={false}
            value={form.email} onChange={set('email')}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-dim)] bg-white px-3 py-2.5 text-[var(--color-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
          />
        </div>
        <div>
          <label htmlFor="lead-destination" className="block text-xs font-semibold text-[var(--color-dim)] mb-1">
            Where are you aiming?
          </label>
          <select
            id="lead-destination" value={form.destination} onChange={set('destination')}
            className="w-full rounded-[var(--radius-sm)] border border-[var(--color-dim)] bg-white px-3 py-2.5 text-[var(--color-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
          >
            <option value="">Select a destination</option>
            {DESTINATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {state === 'error' && (
          <div role="alert" className="sm:col-span-2 flex items-start gap-2 rounded-[var(--radius-sm)] border border-red-600/40 bg-red-50 px-3 py-2.5">
            <AlertCircle size={16} aria-hidden="true" className="shrink-0 mt-0.5 text-red-700" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
          <button type="submit" disabled={state === 'busy'} className="btn btn-primary">
            {state === 'busy' ? (
              <><Loader2 size={16} aria-hidden="true" className="animate-spin motion-reduce:animate-none" /> Sending…</>
            ) : (
              <>Request a call back <ArrowRight size={16} aria-hidden="true" /></>
            )}
          </button>
          <p className="text-xs text-[var(--color-dim)]">
            We use this only to call you back. No list, no forwarding.
          </p>
        </div>
      </form>
    </div>
  );
}
