import { refundPolicy } from '../../../data/certificationPrograms';

// Meta per MASTER_WEBSITE_HANDOVER_v3 Section D.
export const metadata = {
  title: 'Cancellation & Refund Policy — Axelis Overseas',
  description:
    'Axelis Overseas cancellation and refund policy for certification programmes. 7-business-day cooling-off, tiered refunds thereafter, EMI-friendly routing, Concierge outcome guarantees.',
  alternates: { canonical: 'https://overseeducation.com/policies/cancellation-refund' },
  openGraph: {
    title: 'Cancellation & Refund Policy — Axelis Overseas',
    description:
      '7-business-day cooling-off, tiered refunds thereafter, EMI-friendly routing, Concierge outcome guarantees.',
    url: 'https://overseeducation.com/policies/cancellation-refund',
    siteName: 'Axelis Overseas Education',
    locale: 'en_IN',
    type: 'website',
  },
};

// The handover asks for "RefundPolicy" schema; schema.org's actual type for
// this is MerchantReturnPolicy, which validates and carries the same fields.
const returnPolicyLd = {
  '@context': 'https://schema.org',
  '@type': 'MerchantReturnPolicy',
  name: 'Axelis Overseas Cancellation & Refund Policy',
  url: 'https://overseeducation.com/policies/cancellation-refund',
  applicableCountry: 'IN',
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: refundPolicy.coolingOffBusinessDays,
  returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
  restockingFee: {
    '@type': 'MonetaryAmount',
    currency: 'INR',
    value: refundPolicy.adminFee,
  },
  refundType: 'https://schema.org/FullRefund',
  returnMethod: 'https://schema.org/ReturnByMail',
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://overseeducation.com' },
    { '@type': 'ListItem', position: 2, name: 'Cancellation & Refund Policy', item: 'https://overseeducation.com/policies/cancellation-refund' },
  ],
};

export default function PolicyLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(returnPolicyLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {children}
    </>
  );
}
