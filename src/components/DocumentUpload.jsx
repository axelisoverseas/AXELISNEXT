'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, Check, AlertCircle, Loader2, FileText, Info } from 'lucide-react';
import {
  documentRequirements,
  uploadGuidance,
  UPLOAD_LIMITS,
} from '../data/documentRequirements';

// The candidate-facing uploader.
//
// It opens collapsed. A checklist of eight documents sitting permanently under
// a service card buries the price and the pay button, and most visitors are
// reading, not submitting. Opening it is one click for the people who need it.
//
// The guidance sits ABOVE the file picker, not below it. Advice a candidate
// reads after choosing files is advice they will not act on.

const MB = (b) => `${(b / (1024 * 1024)).toFixed(1)} MB`;
const MAX_MB = Math.floor(UPLOAD_LIMITS.maxTotalBytes / (1024 * 1024));

export default function DocumentUpload({ serviceKey, amount = null, documentCount = null }) {
  const req = documentRequirements[serviceKey];
  const inputRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', email: '', reference: '', notes: '' });
  const [paid, setPaid] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);

  if (!req) return null;

  const total = files.reduce((n, f) => n + f.size, 0);
  const overLimit = total > UPLOAD_LIMITS.maxTotalBytes;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function addFiles(list) {
    setError(null);
    const incoming = Array.from(list || []);
    const next = [...files];
    for (const f of incoming) {
      if (next.length >= UPLOAD_LIMITS.maxFiles) {
        setError(`You can attach up to ${UPLOAD_LIMITS.maxFiles} files in one submission.`);
        break;
      }
      if (f.size > UPLOAD_LIMITS.maxFileBytes) {
        setError(`"${f.name}" is ${MB(f.size)}. Each file must be under ${MB(UPLOAD_LIMITS.maxFileBytes)}.`);
        continue;
      }
      if (next.some((x) => x.name === f.name && x.size === f.size)) continue;
      next.push(f);
    }
    setFiles(next);
    if (inputRef.current) inputRef.current.value = '';
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!files.length) return setError('Please attach at least one document.');
    if (overLimit) {
      return setError(
        `Those files come to ${MB(total)}. Keep each submission under ${MAX_MB} MB, or send them in two goes using the same payment reference.`,
      );
    }

    setBusy(true);
    const body = new FormData();
    body.set('serviceKey', serviceKey);
    body.set('name', form.name);
    body.set('phone', form.phone);
    body.set('email', form.email);
    body.set('reference', form.reference);
    body.set('notes', form.notes);
    body.set('paid', String(paid));
    body.set('source', 'overseeducation.com');
    if (amount) body.set('amount', String(amount));
    if (documentCount) body.set('documentCount', String(documentCount));
    files.forEach((f) => body.append('files', f));

    try {
      const res = await fetch('/api/documents/submit', { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || 'We could not send those documents. Please try again.');
        setBusy(false);
        return;
      }
      setDone(data.fileCount ?? files.length);
    } catch {
      setError(
        'We could not reach our servers. Please try again, or email the documents to axelisoverseas@overseeducation.com.',
      );
      setBusy(false);
    }
  }

  if (done !== null) {
    return (
      <div className="mt-5 pt-5 border-t border-white/10">
        <div className="rounded-xl border border-emerald-400/35 bg-emerald-400/10 px-4 py-3.5">
          <p className="flex items-center gap-2 text-sm font-bold text-emerald-200">
            <Check size={15} aria-hidden="true" />
            {done} document{done === 1 ? '' : 's'} received
          </p>
          <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
            Your counsellor has them and will confirm by email within one working day. If anything
            is unreadable we will tell you which file and why, rather than sending the whole set
            back.
          </p>
        </div>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="mt-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--storm-electric)] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)] rounded"
        >
          <Upload size={15} aria-hidden="true" />
          Upload your documents for this service
        </button>
      </div>
    );
  }

  const fieldClass =
    'w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)]';

  return (
    <form onSubmit={onSubmit} className="mt-4 rounded-xl border border-white/12 bg-black/25 p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h4 className="text-base font-bold text-white">Send your documents</h4>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">{req.intro}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close the upload form"
          className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* What we need */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Required
          </p>
          <ul className="space-y-1.5">
            {req.required.map((r) => (
              <li key={r} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                <FileText size={12} aria-hidden="true" className="shrink-0 mt-0.5 text-[var(--storm-electric)]" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
        {req.conditional?.length > 0 && (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              If it applies to you
            </p>
            <ul className="space-y-1.5">
              {req.conditional.map((r) => (
                <li key={r} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                  <FileText size={12} aria-hidden="true" className="shrink-0 mt-0.5 text-slate-600" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {req.note && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-[var(--dawn-glow)]/30 bg-[var(--dawn-glow)]/10 px-3 py-2.5">
          <Info size={13} aria-hidden="true" className="shrink-0 mt-0.5 text-[var(--dawn-glow)]" />
          <p className="text-xs text-slate-200 leading-relaxed">{req.note}</p>
        </div>
      )}

      {/* How to scan — above the picker, so it is read before files are chosen */}
      <details className="mb-4 rounded-lg border border-white/10 bg-white/[0.03]">
        <summary className="cursor-pointer px-3 py-2.5 text-xs font-semibold text-slate-300 marker:text-slate-600">
          How to scan so nothing gets sent back
        </summary>
        <ul className="px-3 pb-3 space-y-1.5">
          {uploadGuidance.map((g) => (
            <li key={g} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-600" />
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </details>

      {/* Files */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        className="rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] px-4 py-6 text-center"
      >
        <input
          ref={inputRef}
          id={`files-${serviceKey}`}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.heic"
          onChange={(e) => addFiles(e.target.files)}
          className="sr-only"
        />
        <label
          htmlFor={`files-${serviceKey}`}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white/[0.08] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.14]"
        >
          <Upload size={15} aria-hidden="true" />
          Choose files
        </label>
        <p className="mt-2.5 text-xs text-slate-500">
          or drag them here · {UPLOAD_LIMITS.acceptLabel} · up to {MAX_MB} MB in total
        </p>
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2"
            >
              <span className="flex min-w-0 items-center gap-2">
                <FileText size={13} aria-hidden="true" className="shrink-0 text-slate-500" />
                <span className="truncate text-xs text-slate-200">{f.name}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="text-[11px] tabular-nums text-slate-500">{MB(f.size)}</span>
                <button
                  type="button"
                  onClick={() => setFiles(files.filter((_, j) => j !== i))}
                  aria-label={`Remove ${f.name}`}
                  className="rounded p-1 text-slate-500 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={13} aria-hidden="true" />
                </button>
              </span>
            </li>
          ))}
          <li className={`pt-1 text-[11px] tabular-nums ${overLimit ? 'text-red-300' : 'text-slate-500'}`}>
            {files.length} file{files.length === 1 ? '' : 's'} · {MB(total)} of {MAX_MB} MB
          </li>
        </ul>
      )}

      {/* Who these belong to */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label htmlFor={`nm-${serviceKey}`} className="mb-1 block text-xs text-slate-400">
            Full name, as printed on the documents <span className="text-[var(--dawn-glow)]">*</span>
          </label>
          <input id={`nm-${serviceKey}`} required autoComplete="name" value={form.name} onChange={set('name')} className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`ph-${serviceKey}`} className="mb-1 block text-xs text-slate-400">
            Mobile number <span className="text-[var(--dawn-glow)]">*</span>
          </label>
          <input id={`ph-${serviceKey}`} required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`em-${serviceKey}`} className="mb-1 block text-xs text-slate-400">
            Email <span className="text-[var(--dawn-glow)]">*</span>
          </label>
          <input id={`em-${serviceKey}`} required type="email" autoComplete="email" spellCheck={false} value={form.email} onChange={set('email')} className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`rf-${serviceKey}`} className="mb-1 block text-xs text-slate-400">
            Payment reference, from your Cashfree receipt
          </label>
          <input
            id={`rf-${serviceKey}`}
            value={form.reference}
            onChange={set('reference')}
            placeholder="Order ID or transaction ID"
            className={fieldClass}
          />
          <p className="mt-1 text-[11px] text-slate-500">
            This is how we match your documents to your payment. If you have not paid yet, leave it
            blank and send it later.
          </p>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`nt-${serviceKey}`} className="mb-1 block text-xs text-slate-400">
            Anything we should know
          </label>
          <textarea id={`nt-${serviceKey}`} rows={2} value={form.notes} onChange={set('notes')} className={fieldClass} />
        </div>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={paid}
          onChange={(e) => setPaid(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/25 bg-white/10 accent-[var(--storm-accent)]"
        />
        <span className="text-xs leading-relaxed text-slate-300">
          I have completed payment for this service. I confirm these documents are mine and that
          Axelis may use them to deliver the service, on the{' '}
          <a
            href="/policies/payment-terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white"
          >
            Payment Terms
          </a>
          .
        </span>
      </label>

      {error && (
        <div role="alert" className="mt-4 flex items-start gap-2 rounded-lg border border-red-400/35 bg-red-400/10 px-3 py-2.5">
          <AlertCircle size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-red-300" />
          <p className="text-xs leading-relaxed text-slate-200">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={busy || overLimit}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] px-6 py-3 text-sm font-bold text-white transition-[filter] hover:brightness-110 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dawn-glow)]"
      >
        {busy ? (
          <>
            <Loader2 size={15} aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
            Sending your documents…
          </>
        ) : (
          <>
            <Upload size={15} aria-hidden="true" />
            Send documents
          </>
        )}
      </button>

      <p className="mt-2.5 text-[11px] leading-relaxed text-slate-500">
        Your files go straight to your counsellor. We do not store them on the website, and we never
        share them outside Axelis and the authority the service is for.
      </p>
    </form>
  );
}
