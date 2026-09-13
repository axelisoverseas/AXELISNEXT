import Link from 'next/link';
import { refundPolicy, programs } from '../../data/certificationPrograms';
import { policyMeta } from '../../data/cancellationRefundPolicy';

// Delivery is digital end to end. Every figure on this page is either read
// from `refundPolicy` / the catalogue, or is a plain statement of how
// delivery works — nothing here restates a number the Cancellation & Refund
// Policy owns, because a second copy of those numbers is a second source of
// truth that will drift. Where this page touches refunds it links out.
export const metadata = {
  title: 'Delivery Policy',
  description:
    'How Axelis Overseas delivers its certification programmes: online access from enrolment, a named counsellor, and a verifiable digital certificate on completion. No physical shipment.',
  alternates: { canonical: 'https://overseeducation.com/delivery-policy' },
  robots: { index: true, follow: true },
};

function Section({ number, title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
        <span className="text-slate-500 font-mono text-base mr-2">{number}.</span>
        {title}
      </h2>
      <div className="space-y-3 text-slate-300/90 leading-relaxed">{children}</div>
    </section>
  );
}

export default function DeliveryPolicyPage() {
  return (
    <main className="min-h-screen text-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <p className="text-sm text-slate-400 mb-3">{policyMeta.company}</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Delivery Policy
        </h1>
        <p className="text-sm text-slate-400 mb-10">
          Version {policyMeta.version} &middot; Effective {refundPolicy.effectiveFrom}
        </p>

        <p className="text-lg text-slate-300/90 leading-relaxed mb-12">
          Every Axelis certification programme is delivered online. Nothing is shipped, so
          there is no dispatch window, no courier and no delivery address to confirm. What
          follows is what you receive, when you receive it, and what to do if you do not.
        </p>

        <Section number={1} title="What is delivered">
          <p>
            This policy covers the certification programmes published at{' '}
            <Link href="/certifications" className="text-white underline underline-offset-4">
              overseeducation.com/certifications
            </Link>
            {' '}&mdash; currently {programs.map((p) => p.title).join(', ')}. Each enrolment includes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-white font-semibold">Programme access</span> &mdash; live
              sessions, recordings, written materials and submission review, delivered through
              the channels named on the programme page.
            </li>
            <li>
              <span className="text-white font-semibold">A named counsellor</span> &mdash;
              assigned on confirmation and your point of contact for the duration of the
              programme.
            </li>
            <li>
              <span className="text-white font-semibold">A digital certificate</span> &mdash;
              issued as a PDF on completion, carrying a unique certificate ID that can be
              checked against our register.
            </li>
          </ul>
        </Section>

        <Section number={2} title="When it is delivered">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-white font-semibold">Access</span> is opened once payment
              is confirmed and your intake is allocated. For EMI-financed enrolments, access
              opens on confirmation of the financing, not on your first instalment.
            </li>
            <li>
              <span className="text-white font-semibold">Programme start</span> follows the
              intake schedule agreed with your counsellor. Programmes run to the duration
              stated on the programme page.
            </li>
            <li>
              <span className="text-white font-semibold">The certificate</span> is issued after
              the final assessed submission has been marked.
            </li>
          </ul>
        </Section>

        <Section number={3} title="How it is delivered">
          <p>
            Delivery is to the email address and phone number given at enrolment. Keeping those
            current is the student&rsquo;s responsibility; we cannot deliver access or a
            certificate to a mailbox we do not have. Sessions are delivered online and require
            a working internet connection, which is not provided by Axelis.
          </p>
        </Section>

        <Section number={4} title="No physical shipment">
          <p>
            Axelis does not ship physical books, hardware or printed materials for any programme
            currently offered, and no shipping or handling charge is levied. Should a future
            programme include a physical component, it will be stated on that programme&rsquo;s
            page before enrolment, and Section 9 of the{' '}
            <Link href={refundPolicy.href} className="text-white underline underline-offset-4">
              Cancellation &amp; Refund Policy
            </Link>{' '}
            governs whether it is refundable.
          </p>
        </Section>

        <Section number={5} title="If delivery fails">
          <p>
            If access has not reached you, a session has not run as scheduled, or a certificate
            has not been issued after your final submission was marked, write to{' '}
            <a
              href={`mailto:${refundPolicy.supportEmail}`}
              className="text-white underline underline-offset-4"
            >
              {refundPolicy.supportEmail}
            </a>{' '}
            or call{' '}
            <a
              href={`tel:${refundPolicy.supportPhone.replace(/\s/g, '')}`}
              className="text-white underline underline-offset-4"
            >
              {refundPolicy.supportPhone}
            </a>
            . We acknowledge delivery complaints on the same clock as refund requests &mdash;
            the acknowledgement and resolution timelines are set out in the{' '}
            <Link href={refundPolicy.href} className="text-white underline underline-offset-4">
              Cancellation &amp; Refund Policy
            </Link>
            , which is the controlling document for anything involving money.
          </p>
          <p>
            A failure of delivery caused by Axelis does not start a new cooling-off window, but
            it does not consume your existing one either: any period during which we failed to
            deliver is excluded from the consumption calculation in that policy.
          </p>
        </Section>

        <Section number={6} title="Cancellations and refunds">
          <p>
            This page does not set refund terms. Cancellations, refunds, the cooling-off window,
            the tiered refund table and EMI refund routing are governed entirely by the{' '}
            <Link href={refundPolicy.href} className="text-white underline underline-offset-4">
              Cancellation &amp; Refund Policy
            </Link>
            . Where the two documents appear to differ, that policy prevails.
          </p>
        </Section>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-slate-500 leading-relaxed">
            {policyMeta.company} &middot; {policyMeta.registration}
            <br />
            Corporate office: Bengaluru &middot; Registered office: Bilaspur, Chhattisgarh
            <br />
            Contact: {refundPolicy.supportEmail} &middot; {refundPolicy.supportPhone}
          </p>
        </div>
      </div>
    </main>
  );
}
