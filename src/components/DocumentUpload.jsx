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
      <div className="mt-5 pt-5 border-t border-[var(--color-rule)]">
        <div className="rounded-xl border border-emerald-400/35 bg-emerald-400/10 px-4 py-3.5">
          <p className="flex items-center gap-2 text-sm font-bold text-emerald-200">
            <Check size={15} aria-hidden="true" />
            {done} document{done === 1 ? '' : 's'} received
          </p>
          <p className="mt-1.5 text-xs text-[var(--color-navy)] leading-relaxed">
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
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-axelis)] hover:text-[var(--color-navy)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)] rounded"
        >
          <Upload size={15} aria-hidden="true" />
          Upload your documents for this service
        </button>
      </div>
    );
  }

  const fieldClass =
    'w-full rounded-lg border border-[var(--color-dim)] bg-white px-3 py-2.5 text-sm text-[var(--color-navy)] placeholder:text-[var(--color-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]';

  return (
    <form onSubmit={onSubmit} className="mt-4 rounded-xl border border-[var(--color-rule)] bg-[var(--color-tint)] p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h4 className="text-base font-bold text-[var(--color-navy)]">Send your documents</h4>
          <p className="mt-1 text-xs text-[var(--color-dim)] leading-relaxed">{req.intro}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close the upload form"
          className="shrink-0 rounded-lg p-1.5 text-[var(--color-dim)] hover:bg-white hover:text-[var(--color-navy)] transition-colors"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* What we need */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-dim)] mb-2">
            Required
          </p>
          <ul className="space-y-1.5">
            {req.required.map((r) => (
              <li key={r} className="flex gap-2 text-xs text-[var(--color-navy)] leading-relaxed">
                <FileText size={12} aria-hidden="true" className="shrink-0 mt-0.5 text-[var(--color-axelis)]" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
        {req.conditional?.length > 0 && (
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-dim)] mb-2">
              If it applies to you
            </p>
            <ul className="space-y-1.5">
              {req.conditional.map((r) => (
                <li key={r} className="flex gap-2 text-xs text-[var(--color-dim)] leading-relaxed">
                  <FileText size={12} aria-hidden="true" className="shrink-0 mt-0.5 text-[var(--color-dim)]" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {req.note && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-[var(--color-axelis)]/30 bg-[var(--dawn-glow)]/10 px-3 py-2.5">
          <Info size={13} aria-hidden="true" className="shrink-0 mt-0.5 text-[var(--color-axelis)]" />
          <p className="text-xs text-[var(--color-navy)] leading-relaxed">{req.note}</p>
        </div>
      )}

      {/* How to scan: above the picker, so it is read before files are chosen */}
      <details className="mb-4 rounded-lg border border-[var(--color-rule)] bg-white">
        <summary className="cursor-pointer px-3 py-2.5 text-xs font-semibold text-[var(--color-navy)] marker:text-[var(--color-dim)]">
          How to scan so nothing gets sent back
        </summary>
        <ul className="px-3 pb-3 space-y-1.5">
          {uploadGuidance.map((g) => (
            <li key={g} className="flex gap-2 text-xs text-[var(--color-dim)] leading-relaxed">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-dim)]" />
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
        className="rounded-xl border-2 border-dashed border-[var(--color-dim)] bg-white px-4 py-6 text-center"
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
          className="btn btn-on-dark cursor-pointer text-sm text-[var(--color-navy)]"
        >
          <Upload size={15} aria-hidden="true" />
          Choose files
        </label>
        <p className="mt-2.5 text-xs text-[var(--color-dim)]">
          or drag them here · {UPLOAD_LIMITS.acceptLabel} · up to {MAX_MB} MB in total
        </p>
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-rule)] bg-white px-3 py-2"
            >
              <span className="flex min-w-0 items-center gap-2">
                <FileText size={13} aria-hidden="true" className="shrink-0 text-[var(--color-dim)]" />
                <span className="truncate text-xs text-[var(--color-navy)]">{f.name}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="text-[11px] tabular-nums text-[var(--color-dim)]">{MB(f.size)}</span>
                <button
                  type="button"
                  onClick={() => setFiles(files.filter((_, j) => j !== i))}
                  aria-label={`Remove ${f.name}`}
                  className="rounded p-1 text-[var(--color-dim)] transition-colors hover:bg-white hover:text-[var(--color-navy)]"
                >
                  <X size={13} aria-hidden="true" />
                </button>
              </span>
            </li>
          ))}
          <li className={`pt-1 text-[11px] tabular-nums ${overLimit ? 'text-red-300' : 'text-[var(--color-dim)]'}`}>
            {files.length} file{files.length === 1 ? '' : 's'} · {MB(total)} of {MAX_MB} MB
          </li>
        </ul>
      )}

      {/* Who these belong to */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <label htmlFor={`nm-${serviceKey}`} className="mb-1 block text-xs text-[var(--color-dim)]">
            Full name, as printed on the documents <span className="text-[var(--color-axelis)]">*</span>
          </label>
          <input id={`nm-${serviceKey}`} required autoComplete="name" value={form.name} onChange={set('name')} className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`ph-${serviceKey}`} className="mb-1 block text-xs text-[var(--color-dim)]">
            Mobile number <span className="text-[var(--color-axelis)]">*</span>
          </label>
          <input id={`ph-${serviceKey}`} required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`em-${serviceKey}`} className="mb-1 block text-xs text-[var(--color-dim)]">
            Email <span className="text-[var(--color-axelis)]">*</span>
          </label>
          <input id={`em-${serviceKey}`} required type="email" autoComplete="email" spellCheck={false} value={form.email} onChange={set('email')} className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`rf-${serviceKey}`} className="mb-1 block text-xs text-[var(--color-dim)]">
            Payment reference, from your Cashfree receipt
          </label>
          <input
            id={`rf-${serviceKey}`}
            value={form.reference}
            onChange={set('reference')}
            placeholder="Order ID or transaction ID"
            className={fieldClass}
          />
          <p className="mt-1 text-[11px] text-[var(--color-dim)]">
            This is how we match your documents to your payment. If you have not paid yet, leave it
            blank and send it later.
          </p>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`nt-${serviceKey}`} className="mb-1 block text-xs text-[var(--color-dim)]">
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
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--color-dim)] bg-white accent-[var(--storm-accent)]"
        />
        <span className="text-xs leading-relaxed text-[var(--color-navy)]">
          I have completed payment for this service. I confirm these documents are mine and that
          Axelis may use them to deliver the service, on the{' '}
          <a
            href="/policies/payment-terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--color-navy)]"
          >
            Payment Terms
          </a>
          .
        </span>
      </label>

      {error && (
        <div role="alert" className="mt-4 flex items-start gap-2 rounded-lg border border-red-400/35 bg-red-400/10 px-3 py-2.5">
          <AlertCircle size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-red-300" />
          <p className="text-xs leading-relaxed text-[var(--color-navy)]">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={busy || overLimit}
        className="btn btn-primary mt-4 w-full text-sm text-[var(--color-navy)] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-axelis)]"
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

      <p className="mt-2.5 text-[11px] leading-relaxed text-[var(--color-dim)]">
        Your files go straight to your counsellor. We do not store them on the website, and we never
        share them outside Axelis and the authority the service is for.
      </p>
    </form>
  );
}
