'use client';

import React from 'react';
import { Printer } from 'lucide-react';

// The policy page is a server component; printing needs a client handler.
export default function PrintButton({ label = 'Print or save as PDF' }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-xl bg-white/8 hover:bg-white/12 border border-white/15 text-white text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <Printer size={15} /> {label}
    </button>
  );
}
