import Link from 'next/link';

// Shell page. Delivery is digital, so the substance is short; the full
// policy is P1. It exists now because the footer links here and a payment
// reviewer will follow that link.
export const metadata = {
  title: 'Delivery Policy',
  description: 'How Axelis Overseas delivers certification programmes: online course access and a digital certificate. No physical shipment.',
  alternates: { canonical: 'https://overseeducation.com/delivery-policy' },
  robots: { index: false, follow: true },
};

export default function DeliveryPolicyPage() {
  return (
    <main className="min-h-screen text-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <p className="text-sm text-slate-400 mb-3">Axelis Overseas Education Pvt Ltd</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">Delivery Policy</h1>
        <p className="text-lg text-slate-300/90 leading-relaxed mb-4">
          Every Axelis certification programme is delivered digitally. There is no physical shipment.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-300/90 leading-relaxed mb-6">
          <li><span className="text-white font-semibold">Course access</span> &mdash; live sessions, recordings and materials are provided online after enrolment is confirmed.</li>
          <li><span className="text-white font-semibold">Certificate</span> &mdash; issued as a PDF on completion, carrying a unique certificate ID.</li>
        </ul>
        <p className="text-slate-400 leading-relaxed mb-4">
          The full delivery policy is under revision. For anything not covered here, contact{' '}
          <a href="mailto:axelisoverseas@overseeducation.com" className="text-white underline underline-offset-4">
            axelisoverseas@overseeducation.com
          </a>.
        </p>
        <p className="text-slate-400 leading-relaxed mb-10">
          Cancellations and refunds are governed by the{' '}
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
