import React, { Suspense } from 'react';
import Link from 'next/link';
import { refundPolicy } from '../../data/certificationPrograms';
import StatusPanel from './StatusPanel';

export const metadata = {
  title: 'Payment status',
  robots: { index: false, follow: false },
};

// Where Cashfree returns the payer after checkout. The order id in the query
// string is untrusted: it says which order to ask about, nothing more. The
// verdict is read from Cashfree server-side, never from the URL.
export default function PaymentStatusPage() {
  return (
    <main className="min-h-screen text-[var(--color-navy)]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <Suspense
          fallback={<p className="text-[var(--color-dim)]">Checking your payment&hellip;</p>}
        >
          <StatusPanel />
        </Suspense>

        <div className="mt-10 pt-8 border-t border-[var(--color-rule)] text-sm text-[var(--color-dim)] leading-relaxed">
          <p>
            Any question about a payment. Write to{' '}
            <a href={`mailto:${refundPolicy.supportEmail}`} className="text-[var(--color-navy)] underline underline-offset-4">
              {refundPolicy.supportEmail}
            </a>{' '}
            or call{' '}
            <a href={`tel:${refundPolicy.supportPhone.replace(/\s/g, '')}`} className="text-[var(--color-navy)] underline underline-offset-4">
              {refundPolicy.supportPhone}
            </a>
            , quoting your order reference.
          </p>
          <p className="mt-3">
            <Link href={refundPolicy.href} className="text-[var(--color-navy)] underline underline-offset-4">
              Cancellation &amp; Refund Policy
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
