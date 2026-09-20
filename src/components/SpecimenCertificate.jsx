import React from 'react';
import { SPECIMEN_ID } from '../data/certificateRegister';

// The sample certificate Bajaj's checklist asks to see.
//
// Three things it must NOT do, all deliberate:
//   1. Read as a real certificate. It carries a SPECIMEN watermark, no student
//      name, and an id that resolves in the register as a specimen. A clean
//      certificate with a plausible id is a forgeable template.
//   2. Carry the DPIIT / British Council / AIRC marks. Those accredit the
//      agency, not the credential. Putting them here would imply the
//      credential is accredited by them, which would contradict Section 10 of
//      our own Terms of Service.
//   3. Claim to be a degree or a nationally-framed qualification. The footer
//      text says so explicitly.
//
// Design is not signed off by the founder yet. See TODO_FROM_FOUNDER.md.
export default function SpecimenCertificate({ programmeTitle = 'Global Career Launch' }) {
  return (
    <div
      role="img"
      aria-label={`Specimen Axelis certificate for ${programmeTitle}. Marked specimen; not issued to a student.`}
      className="relative overflow-hidden rounded-2xl border-2 border-[var(--color-axelis)]/30 bg-gradient-to-br from-[#16265C] to-[#101B45] p-6 sm:p-10 md:p-14 shadow-e-lift"
    >
      {/* Watermark. aria-hidden because the label above already says it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="text-[13vw] sm:text-[5.5rem] md:text-[7rem] font-extrabold tracking-[0.15em] text-white/[0.06] rotate-[-16deg] whitespace-nowrap max-w-full">
          SPECIMEN
        </span>
      </div>

      <div className="relative">
        {/* Rule + wordmark */}
        <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-5 mb-8">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--accent-on-dark)] font-semibold">
              Axelis Overseas Education
            </div>
            <div className="text-[11px] text-[var(--color-dim-dark)] mt-1">Bengaluru &middot; Bilaspur</div>
          </div>
          <span className="shrink-0 rounded-full border border-[var(--accent-on-dark)]/45 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--accent-on-dark)]">
            Specimen
          </span>
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-dim-dark)] mb-3">
          Certificate of Completion
        </p>

        <p className="text-[var(--color-dim-dark)] text-sm mb-2">This certifies that</p>
        {/* Deliberately a ruled blank, not a plausible name. */}
        <div className="mb-6 max-w-md border-b border-dashed border-white/30 pb-2">
          <span className="text-[var(--color-dim-dark)] text-lg italic">Student name</span>
        </div>

        <p className="text-[var(--color-dim-dark)] text-sm mb-2">has completed the Axelis certification programme</p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight text-balance mb-8">
          {programmeTitle}
        </h3>

        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 border-t border-white/20 pt-6">
          <div className="min-w-0">
            <dt className="text-[11px] uppercase tracking-wider text-[var(--color-dim-dark)] mb-1">Certificate ID</dt>
            <dd className="text-sm font-mono font-semibold text-[var(--accent-on-dark)] break-words tabular-nums">
              {SPECIMEN_ID}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-[11px] uppercase tracking-wider text-[var(--color-dim-dark)] mb-1">Date of issue</dt>
            <dd className="text-sm font-semibold text-white">&mdash;</dd>
          </div>
          <div className="min-w-0 col-span-2 sm:col-span-1">
            <dt className="text-[11px] uppercase tracking-wider text-[var(--color-dim-dark)] mb-1">Verify at</dt>
            <dd className="text-xs sm:text-[13px] font-semibold text-white whitespace-nowrap">
              overseeducation.com/verify
            </dd>
          </div>
        </dl>

        <p className="mt-8 pt-5 border-t border-white/20 text-[11px] leading-relaxed text-[var(--color-dim-dark)]">
          Issued by Axelis Overseas Education Pvt Ltd &middot; CIN U85500CT2023PTC014913. This
          certificate records completion of an Axelis programme. It is not a degree, a diploma
          under any national qualifications framework, or a qualification conferred by a
          university, and it is not accredited by any third party whose marks appear elsewhere
          on this site.
        </p>
      </div>
    </div>
  );
}
