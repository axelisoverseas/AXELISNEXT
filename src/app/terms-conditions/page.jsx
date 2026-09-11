import Link from 'next/link';

// Shell page. The footer has linked here for months while nothing existed;
// Bajaj's reviewer will click it, so it must resolve. Full terms are P1.
export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Axelis Overseas Education Pvt Ltd. Currently under revision.',
  alternates: { canonical: 'https://overseeducation.com/terms-conditions' },
  robots: { index: false, follow: true },
};

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen text-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <p className="text-sm text-slate-400 mb-3">Axelis Overseas Education Pvt Ltd</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">Terms of Service</h1>
        <p className="text-lg text-slate-300/90 leading-relaxed mb-4">
          Terms of Service &mdash; under revision. Contact{' '}
          <a href="mailto:axelisoverseas@overseeducation.com" className="text-white underline underline-offset-4">
            axelisoverseas@overseeducation.com
          </a>{' '}
          for the current version.
        </p>
        <p className="text-slate-400 leading-relaxed mb-10">
          Cancellation and refund terms for all certification programmes are published separately and apply now:{' '}
          <Link href="/policies/cancellation-refund" className="text-white underline underline-offset-4">
            Cancellation &amp; Refund Policy
          </Link>.
        </p>
        <p className="text-xs text-slate-500">
          CIN U85500CT2023PTC014913 &middot; MCC 8299 (Educational Services) &middot; Corporate office Bengaluru &middot; Registered office Bilaspur
        </p>
      </div>
    </main>
  );
}
