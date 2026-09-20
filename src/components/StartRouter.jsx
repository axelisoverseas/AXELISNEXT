'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * The landing page's working half: one question, then a lead form.
 *
 * The routing question is asked first and answered locally, because the
 * visitor's answer changes which page we send them to and we would rather
 * send them somewhere useful than hold them here. The form is short on
 * purpose: name, mobile, email. Every extra field is a person who leaves.
 *
 * Posts to /api/lead, which accepts the lead even when HubSpot is
 * unreachable, so this is never a silent drop.
 */

const ROUTES = [
  {
    id: 'paid',
    label: 'A university in the UK, USA, Canada or Australia',
    blurb: 'Full-fee destinations, handled end to end.',
    href: '/products',
    cta: 'See the Global Admissions Charter',
  },
  {
    id: 'free',
    label: 'Tuition-free or low-fee public universities in Europe',
    blurb: 'Germany, France, Norway and the rest of the public system.',
    href: '/products',
    cta: 'See the Europe Public Charter',
  },
  {
    id: 'work',
    label: 'Work and train in Germany instead of studying',
    blurb: 'Ausbildung and Chancenkarte, no tuition to pay.',
    href: '/vocational',
    cta: 'See both German routes',
  },
  {
    id: 'unsure',
    label: 'I have not decided yet',
    blurb: 'Most people start here. The first call is free.',
    href: '/bookings',
    cta: 'Book a free discovery call',
  },
];

export default function StartRouter() {
  const [choice, setChoice] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [state, setState] = useState('idle');
  const [error, setError] = useState(null);

  const picked = ROUTES.find((r) => r.id === choice) || null;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setState('busy'); setError(null);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          destination: picked?.label || 'Not specified',
          source: 'landing-start',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || 'We could not send that. Please try again.');
        setState('error'); return;
      }
      setState('done');
    } catch {
      setError('We could not reach our server. Please try again.');
      setState('error');
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
      {/* Step one: where are they trying to go */}
      <div>
        <p className="label">Step 1</p>
        <h2 className="mt-2 text-2xl font-bold text-[var(--color-navy)]">
          What are you actually after?
        </h2>
        <ul className="mt-5 grid gap-3 list-none p-0 m-0">
          {ROUTES.map((r) => {
            const active = choice === r.id;
            return (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => setChoice(r.id)}
                  aria-pressed={active}
                  className={`w-full text-left rounded-[var(--radius-lg)] border p-4 transition-colors ${
                    active
                      ? 'border-[var(--color-axelis)] bg-[var(--color-tint)]'
                      : 'border-[var(--color-rule)] bg-white hover:border-[var(--color-dim)]'
                  }`}
                >
                  <span className="block font-bold text-[var(--color-navy)]">{r.label}</span>
                  <span className="mt-1 block text-sm text-[var(--color-dim)]">{r.blurb}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {picked && (
          <Link href={picked.href} className="btn btn-secondary mt-5">
            {picked.cta} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>

      {/* Step two: or have us call */}
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-white p-6 shadow-e-2 lg:p-8">
        {state === 'done' ? (
          <div className="text-center">
            <CheckCircle2 aria-hidden="true" size={26} className="mx-auto text-[var(--color-axelis)]" />
            <h2 className="mt-3 text-xl font-bold text-[var(--color-navy)]">
              Got it, {form.name.split(' ')[0] || 'thank you'}.
            </h2>
            <p className="mt-2 text-sm text-[var(--color-dim)]">
              A counsellor will call within one working day. Nothing is charged for that call
              and there is no obligation after it.
            </p>
            {picked && (
              <Link href={picked.href} className="btn btn-primary mt-5">
                {picked.cta} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>
        ) : (
          <>
            <p className="label">Step 2</p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--color-navy)]">
              Or have a counsellor call you.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-dim)]">
              The first call is free, and it ends with a straight answer about whether we can
              help. Sometimes that answer is no.
            </p>

            <form onSubmit={onSubmit} className="mt-5 grid gap-4">
              <div>
                <label htmlFor="start-name" className="block text-xs font-semibold text-[var(--color-dim)] mb-1">Full name</label>
                <input id="start-name" type="text" required autoComplete="name" value={form.name} onChange={set('name')}
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--color-dim)] bg-white px-3 py-2.5 text-[var(--color-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]" />
              </div>
              <div>
                <label htmlFor="start-phone" className="block text-xs font-semibold text-[var(--color-dim)] mb-1">Mobile number</label>
                <input id="start-phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="10-digit mobile"
                  value={form.phone} onChange={set('phone')}
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--color-dim)] bg-white px-3 py-2.5 text-[var(--color-navy)] placeholder:text-[var(--color-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]" />
              </div>
              <div>
                <label htmlFor="start-email" className="block text-xs font-semibold text-[var(--color-dim)] mb-1">Email</label>
                <input id="start-email" type="email" required autoComplete="email" spellCheck={false}
                  value={form.email} onChange={set('email')}
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--color-dim)] bg-white px-3 py-2.5 text-[var(--color-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]" />
              </div>

              {state === 'error' && (
                <div role="alert" className="flex items-start gap-2 rounded-[var(--radius-sm)] border border-red-600/40 bg-red-50 px-3 py-2.5">
                  <AlertCircle size={16} aria-hidden="true" className="shrink-0 mt-0.5 text-red-700" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button type="submit" disabled={state === 'busy'} className="btn btn-primary btn-lg w-full">
                {state === 'busy'
                  ? <><Loader2 size={16} aria-hidden="true" className="animate-spin motion-reduce:animate-none" /> Sending…</>
                  : <>Request a free call back <ArrowRight size={16} aria-hidden="true" /></>}
              </button>
              <p className="text-xs text-[var(--color-dim)]">
                We use this only to call you back. No list, no forwarding to third parties.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
