'use client';

import React from 'react';
import { Printer } from 'lucide-react';

// The policy page is a server component; printing needs a client handler.
export default function PrintButton({ label = 'Print or save as PDF' }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn btn-secondary text-[var(--color-navy)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <Printer size={15} /> {label}
    </button>
  );
}
