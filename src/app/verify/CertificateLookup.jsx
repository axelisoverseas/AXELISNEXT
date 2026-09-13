'use client';

import React, { useState } from 'react';
import { CheckCircle, AlertCircle, XCircle, Search } from 'lucide-react';
import { lookupCertificate, isWellFormedId, SPECIMEN_ID } from '../../data/certificateRegister';

// Lookup runs against the register bundled with the page — no network call, so
// there is nothing to rate-limit and nothing to leak. The register holds no
// personal data beyond what a holder already has on their own certificate.
export default function CertificateLookup() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    const id = value.trim();
    if (!id) {
      setResult({ kind: 'empty' });
      return;
    }
    const hit = lookupCertificate(id);
    if (hit) {
      setResult({ kind: hit.status, cert: hit });
    } else {
      setResult({ kind: isWellFormedId(id) ? 'not-found' : 'malformed', id });
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="mb-6">
        <label
          htmlFor="cert-id"
          className="block text-sm font-semibold text-slate-300 mb-2"
        >
          Certificate ID
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="cert-id"
            name="certificateId"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="AXL-SPEC-0000-DEMO…"
            autoComplete="off"
            spellCheck={false}
            aria-describedby="cert-id-hint"
            className="flex-1 min-w-0 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white font-mono placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)]"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 shrink-0 rounded-xl bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] px-6 py-3 font-bold text-[var(--storm-deep)] hover:brightness-110 transition-[filter] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dawn-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)]"
          >
            <Search size={17} aria-hidden="true" /> Verify Certificate
          </button>
        </div>
        <p id="cert-id-hint" className="mt-2 text-xs text-slate-500">
          The ID is printed on the certificate. Try{' '}
          <button
            type="button"
            onClick={() => setValue(SPECIMEN_ID)}
            className="font-mono text-[var(--storm-electric)] underline underline-offset-2 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)] rounded"
          >
            {SPECIMEN_ID}
          </button>{' '}
          to see how it works.
        </p>
      </form>

      {/* Results announce themselves — the lookup is async to a screen reader
          even though it resolves locally. */}
      <div aria-live="polite" role="status">
        {result?.kind === 'specimen' && (
          <Panel tone="amber" Icon={AlertCircle} title="This is a specimen, not an issued certificate">
            <p>
              <span className="font-mono text-slate-200">{result.cert.id}</span> is the sample
              published on this page to show what an Axelis certificate looks like. It is not a
              record of any student and confers nothing.
            </p>
          </Panel>
        )}

        {result?.kind === 'valid' && (
          <Panel tone="emerald" Icon={CheckCircle} title="Valid certificate">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <Field label="Holder" value={result.cert.holder} />
              <Field label="Programme" value={result.cert.programme} />
              <Field label="Credential" value={result.cert.certificate} />
              <Field label="Issued" value={result.cert.issued || '—'} />
            </dl>
          </Panel>
        )}

        {result?.kind === 'revoked' && (
          <Panel tone="red" Icon={XCircle} title="This certificate has been revoked">
            <p>
              <span className="font-mono text-slate-200">{result.cert.id}</span> is no longer
              valid. {result.cert.note || ''} Contact us if you believe this is an error.
            </p>
          </Panel>
        )}

        {result?.kind === 'not-found' && (
          <Panel tone="red" Icon={XCircle} title="No certificate with that ID">
            <p>
              <span className="font-mono text-slate-200">{result.id}</span> is not in our
              register. Check the ID against the certificate — if it matches, write to us and we
              will look into it.
            </p>
          </Panel>
        )}

        {result?.kind === 'malformed' && (
          <Panel tone="amber" Icon={AlertCircle} title="That does not look like an Axelis ID">
            <p>
              Axelis certificate IDs look like{' '}
              <span className="font-mono text-slate-200">AXL-SPEC-0000-DEMO</span>. Check the ID
              printed on the certificate and try again.
            </p>
          </Panel>
        )}

        {result?.kind === 'empty' && (
          <Panel tone="amber" Icon={AlertCircle} title="Enter a certificate ID">
            <p>Type the ID printed on the certificate, then select Verify Certificate.</p>
          </Panel>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] uppercase tracking-wider text-slate-500 mb-0.5">{label}</dt>
      <dd className="text-sm font-semibold text-white break-words">{value}</dd>
    </div>
  );
}

const TONES = {
  emerald: 'border-emerald-400/35 bg-emerald-400/10 text-emerald-300',
  amber: 'border-[var(--dawn-glow)]/35 bg-[var(--dawn-glow)]/10 text-[var(--dawn-glow)]',
  red: 'border-red-400/35 bg-red-400/10 text-red-300',
};

function Panel({ tone, Icon, title, children }) {
  return (
    <div className={`rounded-xl border px-5 py-4 ${TONES[tone]}`}>
      <div className="flex items-start gap-3">
        <Icon size={18} aria-hidden="true" className="shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="font-bold mb-1">{title}</p>
          <div className="text-sm text-slate-300/90 leading-relaxed space-y-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
