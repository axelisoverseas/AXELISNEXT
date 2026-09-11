import React from 'react';
import Link from 'next/link';
import PrintButton from '../../../components/PrintButton';
import { policyMeta, policySections } from '../../../data/cancellationRefundPolicy';

// Print rules live with the page so they apply only when this document is
// printed. Bajaj may pull the policy as an A4 PDF for their file, so the
// site chrome and floating widgets are hidden and the text goes black on white.
const PRINT_CSS = `
@media print {
  @page { size: A4; margin: 18mm 16mm; }
  header, footer, nav, [data-print-hide], .fixed, .site-wallpaper { display: none !important; }
  .legal-doc header, .legal-doc footer { display: block !important; }
  html, body, main { background: #fff !important; color: #000 !important; }
  .legal-doc { max-width: none !important; padding: 0 !important; }
  .legal-doc, .legal-doc * { color: #000 !important; background: transparent !important; box-shadow: none !important; }
  .legal-doc a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 0.85em; }
  .legal-doc section { break-inside: avoid; page-break-inside: avoid; }
  .legal-doc h2 { break-after: avoid; page-break-after: avoid; }
  .legal-doc table { border-collapse: collapse; width: 100%; }
  .legal-doc th, .legal-doc td { border: 1px solid #000 !important; padding: 6px 8px; }
  .legal-doc .toc { display: none; }
}
`;

function Block({ block }) {
  if (block.p) return <p className="text-slate-300/90 leading-relaxed mb-4">{block.p}</p>;
  if (block.list) {
    return (
      <ul className="list-disc pl-6 space-y-2 text-slate-300/90 leading-relaxed mb-4">
        {block.list.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }
  if (block.ordered) {
    return (
      <ol className="list-decimal pl-6 space-y-2 text-slate-300/90 leading-relaxed mb-4">
        {block.ordered.map((item) => <li key={item}>{item}</li>)}
      </ol>
    );
  }
  if (block.table) {
    return (
      <div className="overflow-x-auto mb-5">
        <table className="w-full text-sm border border-white/15 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-white/[0.05]">
              {block.table.head.map((h) => (
                <th key={h} scope="col" className="text-left p-3 font-semibold text-white border-b border-white/15">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row) => (
              <tr key={row[0]} className="border-b border-white/8 last:border-0">
                {row.map((cell, i) => (
                  <td key={i} className={`p-3 align-top ${i === 0 ? 'text-slate-200' : 'text-slate-300/90'}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

export default function CancellationRefundPolicyPage() {
  return (
    <main className="min-h-screen text-slate-100">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      <article className="legal-doc max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <header className="mb-10 pb-8 border-b border-white/10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">{policyMeta.title}</h1>
          <p className="text-white font-semibold">{policyMeta.company}</p>
          <p className="text-sm text-slate-400">{policyMeta.registration}</p>
          <p className="text-sm text-slate-400">Effective from {policyMeta.effectiveFrom} · Version {policyMeta.version}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3" data-print-hide>
            <PrintButton />
            <Link href="/certifications" className="text-sm text-slate-400 hover:text-white underline underline-offset-4">
              Back to certifications
            </Link>
          </div>
        </header>

        {/* Section index — hidden in print, where the numbered headings suffice */}
        <nav aria-label="Policy sections" className="toc mb-10 p-5 rounded-2xl bg-[#141210] border border-white/10" data-print-hide>
          <p className="text-sm font-semibold text-white mb-3">In this policy</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
            {policySections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-slate-300 hover:text-white underline-offset-4 hover:underline">
                  {s.number}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {policySections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-28 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              {s.number}. {s.title}
            </h2>
            {s.blocks.map((b, i) => <Block key={i} block={b} />)}
          </section>
        ))}

        <footer className="mt-12 pt-6 border-t border-white/10 text-xs text-slate-500">
          {policyMeta.company} · {policyMeta.registration} · Effective from {policyMeta.effectiveFrom} · Version {policyMeta.version}
        </footer>
      </article>
    </main>
  );
}
