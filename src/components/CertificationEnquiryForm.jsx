'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { programs } from '../data/certificationPrograms';

// Next 12 months, as "September 2026" style values for the intake dropdown.
function upcomingIntakes(count = 12) {
  const out = [];
  const now = new Date();
  for (let i = 0; i < count; i += 1) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    out.push(d.toLocaleString('en-IN', { month: 'long', year: 'numeric' }));
  }
  return out;
}

const FINANCING_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'tell-me-more', label: 'Tell me more' },
];

const REFERRAL_SOURCES = [
  'Google search',
  'Instagram',
  'YouTube',
  'Referred by a friend or family',
  'Referred by a school or college',
  'Axelis counsellor',
  'Other',
];

const FIELD =
  'w-full px-4 py-3 min-h-[44px] rounded-xl bg-[var(--color-tint)] border border-[var(--color-rule)] text-[var(--color-navy)] placeholder:text-[var(--color-dim)] text-sm transition-colors focus:outline-none focus:border-[var(--color-rule)] focus:ring-2 focus:ring-[var(--color-axelis)]/40';
const LABEL = 'block text-sm font-medium text-[var(--color-navy)] mb-1.5';

/**
 * Certification enquiry form. Posts to /api/certification-enquiry, which
 * creates the HubSpot contact and deal on the Certifications pipeline.
 *
 * `presetProgram` pre-fills and locks the programme when rendered from a
 * programme page, per the handover.
 */
export default function CertificationEnquiryForm({ presetProgram = null }) {
  const intakes = upcomingIntakes();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    program: presetProgram?.slug || '',
    intake: '',
    financing: '',
    referral: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/certification-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          programTitle:
            presetProgram?.title ||
            programs.find((p) => p.slug === form.program)?.title ||
            'Not specified',
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');

      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="bg-white border-2 border-emerald-500/40 rounded-2xl p-8 text-center shadow-e-3"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={28} className="text-emerald-300" />
        </div>
        <h3 className="text-xl font-bold text-[var(--color-navy)] mb-2">Enquiry received</h3>
        <p className="text-[var(--color-navy)]/85 text-sm leading-relaxed">
          A counsellor will call you on {form.phone || 'the number you gave us'} within one working day.
          If you would rather pick a slot yourself, book a discovery call and it goes straight into the diary.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border-2 border-[var(--color-rule)] rounded-2xl p-6 md:p-7 shadow-e-3"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={LABEL} htmlFor="cert-name">Name</label>
          <input
            id="cert-name" type="text" required autoComplete="name"
            value={form.name} onChange={set('name')}
            placeholder="Your full name" className={FIELD}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="cert-phone">Phone</label>
          <input
            id="cert-phone" type="tel" required autoComplete="tel" inputMode="tel"
            value={form.phone} onChange={set('phone')}
            placeholder="+91 " className={FIELD}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className={LABEL} htmlFor="cert-email">Email</label>
        <input
          id="cert-email" type="email" required autoComplete="email" spellCheck={false}
          value={form.email} onChange={set('email')}
          placeholder="you@example.com" className={FIELD}
        />
      </div>

      <div className="mb-4">
        <label className={LABEL} htmlFor="cert-program">Target programme</label>
        {presetProgram ? (
          <div className="flex items-center gap-2 px-4 py-3 min-h-[44px] rounded-xl bg-[var(--color-tint)] border border-[var(--color-rule)]/30 text-[var(--color-navy)] text-sm font-semibold">
            <CheckCircle size={15} className="text-[var(--color-axelis)] shrink-0" />
            {presetProgram.title}
          </div>
        ) : (
          <select id="cert-program" required value={form.program} onChange={set('program')} className={FIELD}>
            <option value="">Select a programme</option>
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>{p.title}</option>
            ))}
            <option value="not-sure">Not sure yet — advise me</option>
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={LABEL} htmlFor="cert-intake">Target intake</label>
          <select id="cert-intake" required value={form.intake} onChange={set('intake')} className={FIELD}>
            <option value="">Select a month</option>
            {intakes.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="cert-referral">How did you hear about us?</label>
          <select id="cert-referral" required value={form.referral} onChange={set('referral')} className={FIELD}>
            <option value="">Select one</option>
            {REFERRAL_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <fieldset className="mb-6">
        <legend className={LABEL}>Interested in EMI?</legend>
        <div className="flex flex-wrap gap-2">
          {FINANCING_OPTIONS.map((opt) => {
            const active = form.financing === opt.value;
            return (
              <label
                key={opt.value}
                className={`inline-flex items-center px-4 py-2.5 min-h-[44px] rounded-xl border text-sm font-semibold cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[var(--color-axelis)] ${
                  active
                    ? 'bg-[var(--storm-electric)] border-[var(--color-rule)] text-[var(--color-navy)]'
                    : 'bg-[var(--color-tint)] border-[var(--color-rule)] text-[var(--color-navy)] hover:bg-[var(--color-tint)]'
                }`}
              >
                <input
                  type="radio" name="financing" value={opt.value}
                  checked={active} onChange={set('financing')} required
                  className="sr-only"
                />
                {opt.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      {status === 'error' && (
        <div role="alert" className="flex items-start gap-2.5 mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 min-h-[44px] bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-e-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        {status === 'sending'
          ? <><Loader2 size={18} className="animate-spin" /> Sending</>
          : <>Send enquiry <Send size={16} /></>}
      </button>

      <p className="text-[11px] text-[var(--color-dim)] text-center mt-3 leading-relaxed">
        We use your details to respond to this enquiry. No spam, and we do not sell your data.
      </p>
    </form>
  );
}
