import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Database,
  UserCheck,
  Eye,
  Lock,
  Globe,
  Baby,
  RefreshCw,
  Link2,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { siteInfo } from '../../data/siteData';

const LAST_UPDATED = 'July 21, 2026';
const LEGAL_NAME = 'Axelis Overseas Education Pvt Ltd';

export const metadata = {
  title: 'Privacy Policy | Axelis Overseas',
  description:
    'How Axelis Overseas collects, uses, and protects your personal information — data we collect, how it is used and shared, your rights, and how to reach us.',
  keywords:
    'privacy policy, data protection, personal information, DPDP Act, GDPR, data security, Axelis Overseas',
  alternates: { canonical: '/privacy-policy' },
};

const sections = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    icon: Database,
    blocks: [
      {
        text: 'We collect personal information that you voluntarily provide when you register for our services, request information about studying abroad, participate in activities on our website, or contact us. We also collect certain information automatically when you use our website.',
      },
      {
        subtitle: 'Information you provide includes',
        list: [
          'Name and contact details (email address, phone number, mailing address)',
          'Educational background and academic records',
          'Passport, visa, and immigration information',
          'Financial information required for scholarship and education-loan applications',
          'Communication and marketing preferences',
        ],
      },
      {
        subtitle: 'Information collected automatically',
        list: [
          'Device and browser information (IP address, browser type, operating system)',
          'Usage data such as pages visited and time spent on our website',
          'Information collected through cookies and similar technologies',
        ],
      },
    ],
  },
  {
    id: 'how-we-use-your-information',
    title: 'How We Use Your Information',
    icon: UserCheck,
    blocks: [
      { text: 'We use the information we collect to:' },
      {
        list: [
          'Provide, operate, and maintain our educational consultancy services',
          'Process your applications for study-abroad programs, scholarships, and loans',
          'Communicate with you, including customer service and support',
          'Send you marketing and promotional communications, where you have consented',
          'Improve our website and services based on your feedback and usage',
          'Comply with legal obligations and protect our legal rights',
        ],
      },
    ],
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing and Disclosure',
    icon: Eye,
    blocks: [
      { text: 'We may share your personal information in the following situations:' },
      {
        list: [
          'With educational institutions and universities to process your applications',
          'With government agencies and embassies for visa and immigration purposes',
          'With banks and lending partners to facilitate education loans, with your consent',
          'With third-party service providers who help us operate our business',
          'With your explicit consent for specific purposes',
          'To comply with legal obligations or protect our rights and safety',
        ],
      },
      {
        subtitle: 'We do not',
        list: [
          'Sell your personal information to third parties',
          'Share your information for marketing purposes without your consent',
          'Disclose sensitive information without proper authorization',
        ],
      },
    ],
  },
  {
    id: 'data-security',
    title: 'Data Security',
    icon: Lock,
    blocks: [
      {
        text: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. While no method of transmission or storage is completely secure, we work to protect your information using measures that include:',
      },
      {
        list: [
          'Encryption of sensitive data in transit and at rest',
          'Regular security assessments and updates',
          'Access controls and authentication procedures',
          'Staff training on data protection and privacy',
          'Secure data storage and backup procedures',
        ],
      },
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    icon: Database,
    blocks: [
      {
        text: 'We retain your personal information only for as long as necessary to fulfil the purposes described in this policy, unless a longer retention period is required or permitted by law.',
      },
      {
        subtitle: 'Indicative retention periods',
        list: [
          'Application data: up to 7 years after completion or withdrawal',
          'Communication records: up to 3 years from last contact',
          'Marketing data: until you withdraw consent',
          'Legal-compliance data: as required by applicable laws',
        ],
      },
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Privacy Rights',
    icon: Shield,
    blocks: [
      {
        text: 'Depending on your location and applicable law (including the Digital Personal Data Protection Act, 2023 in India and the GDPR where relevant), you may have the following rights regarding your personal information:',
      },
      {
        list: [
          'The right to access your personal information',
          'The right to correct inaccurate or incomplete information',
          'The right to request deletion of your personal information',
          'The right to restrict or object to certain processing',
          'The right to data portability',
          'The right to withdraw consent for marketing communications at any time',
        ],
      },
      {
        subtitle: 'How to exercise your rights',
        text: 'Contact us using the details below. We will respond to your request within 30 days.',
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and Tracking Technologies',
    icon: Eye,
    blocks: [
      {
        text: 'We use cookies and similar tracking technologies to enhance your experience on our website.',
      },
      {
        subtitle: 'Types of cookies we use',
        list: [
          'Essential cookies: required for core website functionality',
          'Analytics cookies: help us understand how our website is used',
          'Marketing cookies: used to deliver relevant advertisements',
          'Preference cookies: remember your settings and preferences',
        ],
      },
      {
        text: 'You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.',
      },
    ],
  },
  {
    id: 'third-party-links',
    title: 'Third-Party Links',
    icon: Link2,
    blocks: [
      {
        text: 'Our website may contain links to third-party websites, including university, accommodation, and lending-partner sites. We are not responsible for the privacy practices or content of these external sites, and we encourage you to review their privacy policies before providing any information.',
      },
    ],
  },
  {
    id: 'international-transfers',
    title: 'International Data Transfers',
    icon: Globe,
    blocks: [
      {
        text: 'As part of our study-abroad services, your personal information may be transferred to and processed in countries other than your country of residence, including where universities, embassies, and partners are located. We take steps to ensure that appropriate safeguards are in place to protect your information during such transfers.',
      },
    ],
  },
  {
    id: 'childrens-privacy',
    title: "Children's Privacy",
    icon: Baby,
    blocks: [
      {
        text: 'Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected such information, we will take steps to delete it. Where a student is a minor, we expect a parent or legal guardian to provide and manage their information.',
      },
    ],
  },
  {
    id: 'policy-updates',
    title: 'Updates to This Policy',
    icon: RefreshCw,
    blocks: [
      {
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will post the updated policy on this page and revise the “Last Updated” date above. We encourage you to review this policy periodically.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-storm-to-dawn">
      {/* Hero */}
      <section className="relative pt-28 pb-16 bg-slate-900 overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/15 border border-blue-500/30 mb-6">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            At Axelis Overseas, we are committed to protecting your privacy and safeguarding the
            personal information you entrust to us.
          </p>
          <p className="text-sm text-slate-500 mt-6">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            {LEGAL_NAME} (&ldquo;Axelis Overseas&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or
            &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website or use our educational consultancy services.
          </p>
          <p className="text-slate-700 leading-relaxed">
            By using our services, you agree to the collection and use of information in accordance
            with this policy. If you do not agree with our policies and practices, please do not use
            our services.
          </p>
        </div>

        {/* Sections */}
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <section
              key={section.id}
              id={section.id}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 scroll-mt-24"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-50 rounded-xl mr-4 shrink-0">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
              </div>

              {section.blocks.map((block, i) => (
                <div key={i} className="mb-5 last:mb-0">
                  {block.subtitle && (
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">{block.subtitle}</h3>
                  )}
                  {block.text && (
                    <p className="text-slate-700 leading-relaxed mb-3 last:mb-0">{block.text}</p>
                  )}
                  {block.list && (
                    <ul className="space-y-2 text-slate-700">
                      {block.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          );
        })}

        {/* Contact */}
        <section className="bg-[var(--storm-deep)] text-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-3 text-center">Contact Us</h2>
          <p className="text-slate-300 text-center mb-8 max-w-2xl mx-auto">
            If you have any questions about this Privacy Policy or how we handle your data, please
            reach out to us:
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-[var(--storm-electric)]" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <div className="flex flex-col gap-1">
                {siteInfo.contact.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="text-slate-300 hover:text-[var(--storm-electric)] transition-colors break-words"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Phone className="w-6 h-6 text-[var(--storm-electric)]" />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <div className="flex flex-col gap-1">
                {siteInfo.contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="text-slate-300 hover:text-[var(--storm-electric)] transition-colors"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6 text-[var(--storm-electric)]" />
              </div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{siteInfo.contact.address}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
