'use client';

import React from 'react';
import { Printer } from 'lucide-react';

// The policy page is a server component; printing needs a client handler.
export default function PrintButton({ label = 'Print or save as PDF' }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-xl bg-[var(--color-tint)] hover:bg-[var(--color-tint)] border border-[var(--color-rule)] text-[var(--color-navy)] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <Printer size={15} /> {label}
    </button>
  );
}
