import Link from 'next/link';
import { refundPolicy, programs, formatINR } from '../../data/certificationPrograms';
import { policyMeta } from '../../data/cancellationRefundPolicy';

// DRAFT: needs legal review before it is relied on.
//
// Deliberately does NOT restate any protected number. The cooling-off window,
// the administrative fee, the guarantee percentages and the response SLAs all
// live in `refundPolicy` and in the Cancellation & Refund Policy; this page
// links to that document rather than paraphrasing it, so the two can never
// drift apart. The only figures rendered here are read from the catalogue.
export const metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for Axelis Overseas Education Pvt Ltd: enrolment, fees and EMI, what we undertake, what the student undertakes, outcome guarantees, and limits of liability.',
  alternates: { canonical: 'https://overseeducation.com/terms-conditions' },
  robots: { index: true, follow: true },
};

function Section({ number, title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-[var(--color-navy)] tracking-tight mb-3 text-balance">
        <span className="text-[var(--color-dim)] font-mono text-base mr-2">{number}.</span>
        {title}
      </h2>
      <div className="space-y-3 text-[var(--color-navy)]/90 leading-relaxed">{children}</div>
    </section>
  );
}

export default function TermsConditionsPage() {
  const floor = formatINR(Math.min(...programs.map((p) => p.price)));
  const ceiling = formatINR(Math.max(...programs.map((p) => p.price)));

  return (
    <main className="min-h-screen text-[var(--color-navy)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <p className="text-sm text-[var(--color-dim)] mb-3">{policyMeta.company}</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-navy)] tracking-tight mb-4 text-balance">
          Terms of Service
        </h1>
        <p className="text-sm text-[var(--color-dim)] mb-10">
          Version {policyMeta.version} &middot; Effective {refundPolicy.effectiveFrom}
        </p>

        <p className="text-lg text-[var(--color-navy)]/90 leading-relaxed mb-12">
          These terms govern your use of overseeducation.com and your enrolment in any Axelis
          certification programme. Enrolling means you accept them. Read them alongside the{' '}
          <Link href={refundPolicy.href} className="text-[var(--color-navy)] underline underline-offset-4">
            Cancellation &amp; Refund Policy
          </Link>{' '}
          and the{' '}
          <Link href="/delivery-policy" className="text-[var(--color-navy)] underline underline-offset-4">
            Delivery Policy
          </Link>
          , which form part of this agreement.
        </p>

        <Section number={1} title="Who we are">
          <p>
            {policyMeta.company} is a company registered in India. {policyMeta.registration}.
            Our corporate office is in Bengaluru, Karnataka; our registered office is in
            Bilaspur, Chhattisgarh. In these terms &ldquo;Axelis&rdquo;, &ldquo;we&rdquo; and
            &ldquo;us&rdquo; mean that company, and &ldquo;you&rdquo; means the person enrolling
            or using the site.
          </p>
        </Section>

        <Section number={2} title="What we sell, and what we do not">
          <p>
            We sell certification programmes: currently{' '}
            {programs.map((p) => p.title).join(', ')}: priced from {floor} to {ceiling}.
            Each programme delivers coaching, review and a verifiable certificate, as set out on
            its own page.
          </p>
          <p>
            We are an education services company. We are not a university, not a licensed
            immigration adviser and not a lender. Admission decisions are made by universities,
            visa decisions by governments, and credit decisions by financing partners. Nothing
            we do binds any of them, and no Axelis employee may promise an admission, a visa or
            a loan approval on their behalf. Any such promise made to you is void.
          </p>
        </Section>

        <Section number={3} title="Enrolment">
          <p>
            An enrolment is formed when we confirm it in writing and payment (or financing) is
            confirmed: not when a form is submitted or an enquiry made. We may decline an
            enrolment, and will say so and return any amount collected in full where we do.
          </p>
          <p>
            You must be 18 or over to enrol. If you are under 18, a parent or legal guardian must
            enrol on your behalf and is the party to these terms.
          </p>
          <p>
            Information you give us at enrolment must be accurate. Programmes are placed against
            your stated academic record and budget, and a material inaccuracy may make a
            programme unsuitable: a cost we cannot absorb on your behalf.
          </p>
        </Section>

        <Section number={4} title="Fees, payment and EMI">
          <p>
            Fees are stated in Indian Rupees on each programme page, inclusive of applicable
            taxes unless stated otherwise. The fee shown at the time of your enrolment is the
            fee that applies to it; later price changes are not applied retrospectively, in
            either direction.
          </p>
          <p>
            EMI is offered through our financing partners, who set their own eligibility rules,
            interest and tenure. Your EMI contract is with that partner, not with Axelis, and its
            terms bind you independently of these. Where an enrolment is EMI-financed, refunds
            are routed to the financing partner rather than to you, the mechanics are in
            the{' '}
            <Link href={refundPolicy.href} className="text-[var(--color-navy)] underline underline-offset-4">
              Cancellation &amp; Refund Policy
            </Link>
            .
          </p>
          <p>
            Third-party costs: exam registrations, embassy and visa fees, university
            application fees: are not included in any programme fee unless the programme
            page says so.
          </p>
        </Section>

        <Section number={5} title="Cancellation and refunds">
          <p>
            Cancellations and refunds are governed entirely by the{' '}
            <Link href={refundPolicy.href} className="text-[var(--color-navy)] underline underline-offset-4">
              Cancellation &amp; Refund Policy
            </Link>
            , which sets the cooling-off window, the tiered refund schedule, non-refundable
            items, EMI refund routing and our response timelines. That document controls; these
            terms deliberately do not restate its figures. Where the two differ, it prevails.
          </p>
        </Section>

        <Section number={6} title="Outcome guarantees">
          <p>
            Some programmes carry a written outcome guarantee, published on that programme&rsquo;s
            page and in Section 7 of the{' '}
            <Link href={refundPolicy.href} className="text-[var(--color-navy)] underline underline-offset-4">
              Cancellation &amp; Refund Policy
            </Link>
            . A guarantee is a specific, conditional commitment, and its stated conditions are
            part of it. It is not a general promise of admission, a visa, employment or a salary,
            and it does not survive a failure to meet the participation obligations in Section 7
            below.
          </p>
        </Section>

        <Section number={7} title="What you undertake">
          <p>Programmes are delivered to you but not performed for you. You agree to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>attend scheduled sessions and submit work by the deadlines your counsellor sets;</li>
            <li>
              provide documents, drafts and decisions when asked, university and visa
              deadlines are external and we cannot extend them;
            </li>
            <li>
              give us accurate information, and tell us promptly when something material changes;
            </li>
            <li>
              submit your own work. Fabricated documents or plagiarised submissions end the
              enrolment without refund and, where a university or authority requires it, will be
              disclosed to them.
            </li>
          </ul>
        </Section>

        <Section number={8} title="What we undertake">
          <p>
            To deliver each programme as described on its page, to assign a named counsellor, to
            mark and return submitted work, to issue a verifiable certificate on completion, and
            to handle your data as set out in our{' '}
            <Link href="/privacy-policy" className="text-[var(--color-navy)] underline underline-offset-4">
              Privacy Policy
            </Link>
            . Where we must change a schedule, cohort or programme lead, we will tell you and,
            where the change is material and you do not accept it, treat it under the
            Cancellation &amp; Refund Policy.
          </p>
        </Section>

        <Section number={9} title="Intellectual property">
          <p>
            Course materials, recordings, frameworks and templates remain ours and are licensed
            to you personally for the duration of your programme. You may not record, copy,
            resell, publish or share them, including with other students. Work you write
            your essays, statements and applications, remains yours.
          </p>
        </Section>

        <Section number={10} title="Certificates">
          <p>
            A certificate records completion of an Axelis programme. It is not a degree, a
            diploma awarded under any national qualifications framework, or a qualification
            conferred by a university. Each carries a unique ID that can be verified with us. We
            may revoke a certificate obtained through misrepresentation.
          </p>
        </Section>

        <Section number={11} title="Limits of liability">
          <p>
            We are liable for failing to deliver what we undertook to deliver. We are not liable
            for admission, visa, financing or employment outcomes decided by third parties, nor
            for indirect or consequential loss. Except where Indian law does not permit a limit,
            our total liability arising out of an enrolment is capped at the fee you paid for
            that programme.
          </p>
          <p>
            Nothing in these terms limits any right you have under the Consumer Protection Act,
            2019 or any other law that cannot be contracted out of.
          </p>
        </Section>

        <Section number={12} title="Suspension and termination">
          <p>
            We may suspend or end an enrolment for abuse of staff or other students, for
            fabrication or plagiarism, for sharing paid materials, or for non-payment of an
            instalment that remains unpaid after written notice. Where we end an enrolment for
            one of these reasons, the refund consequences are those in the{' '}
            <Link href={refundPolicy.href} className="text-[var(--color-navy)] underline underline-offset-4">
              Cancellation &amp; Refund Policy
            </Link>
            . You may cancel at any time under that same policy.
          </p>
        </Section>

        <Section number={13} title="Changes to these terms">
          <p>
            We may update these terms. The version in force for your enrolment is the version
            published on the date we confirmed it, and it is the version we will apply to you.
            Changes are not applied retrospectively to a confirmed enrolment.
          </p>
        </Section>

        <Section number={14} title="Complaints, governing law and jurisdiction">
          <p>
            Raise anything first with{' '}
            <a
              href={`mailto:${refundPolicy.supportEmail}`}
              className="text-[var(--color-navy)] underline underline-offset-4"
            >
              {refundPolicy.supportEmail}
            </a>{' '}
            or{' '}
            <a
              href={`tel:${refundPolicy.supportPhone.replace(/\s/g, '')}`}
              className="text-[var(--color-navy)] underline underline-offset-4"
            >
              {refundPolicy.supportPhone}
            </a>
            . Most issues are resolved this way, and doing so first costs you nothing.
          </p>
          <p>
            These terms are governed by the laws of India. Subject to any consumer-forum right
            you have to bring a claim where you reside, the courts at Bilaspur, Chhattisgarh
the seat of our registered office have jurisdiction.
          </p>
        </Section>

        <div className="mt-12 pt-8 border-t border-[var(--color-rule)]">
          <p className="text-xs text-[var(--color-dim)] leading-relaxed">
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
