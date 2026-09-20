import React from 'react';
import Link from 'next/link';
import CertificateLookup from './CertificateLookup';
import SpecimenCertificate from '../../components/SpecimenCertificate';
import { refundPolicy } from '../../data/certificationPrograms';
import { registerStats } from '../../data/certificateRegister';

export const metadata = {
  title: 'Verify a Certificate',
  description:
    'Check any Axelis certificate against our register by its certificate ID, and see a specimen of what an Axelis certificate looks like.',
  alternates: { canonical: 'https://overseeducation.com/verify' },
  robots: { index: true, follow: true },
};

export default function VerifyPage() {
  return (
    <main className="min-h-screen text-[var(--color-navy)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-navy)] tracking-tight text-balance mb-5">
          Verify a Certificate
        </h1>
        <p className="text-lg text-[var(--color-navy)]/90 leading-relaxed mb-10">
          Every Axelis certificate carries a unique ID. Enter it below and we will tell you
          whether it is ours, which programme it is for, and whether it is still valid.
        </p>

        <section className="rounded-2xl border-2 border-[var(--color-rule)] bg-white p-6 sm:p-8 mb-14 shadow-e-3">
          <CertificateLookup />
        </section>

        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-navy)] tracking-tight text-balance mb-3">
            What an Axelis certificate looks like
          </h2>
          <p className="text-[var(--color-navy)]/85 leading-relaxed mb-7">
            This is a specimen. It carries no student name, its ID resolves in our register as a
            specimen rather than a credential, and it is marked accordingly so it cannot be
            passed off as an issued certificate.
          </p>
          <SpecimenCertificate />
        </section>

        <section className="rounded-xl border border-[var(--color-rule)] bg-[var(--color-tint)] p-6">
          <h2 className="text-lg font-bold text-[var(--color-navy)] mb-3">About the register</h2>
          <div className="space-y-3 text-sm text-[var(--color-navy)]/85 leading-relaxed">
            <p>
              {registerStats.issuedCount === 0 ? (
                <>
                  No certificates have been issued yet, the first Axelis cohorts are still
                  running. The register is live now so that every certificate is checkable from
                  the day it is issued, rather than the claim outrunning the capability.
                </>
              ) : (
                <>
                  The register currently holds {registerStats.issuedCount} issued{' '}
                  {registerStats.issuedCount === 1 ? 'certificate' : 'certificates'}.
                </>
              )}
            </p>
            <p>
              A certificate records completion of an Axelis programme. As set out in our{' '}
              <Link href="/terms-conditions" className="text-[var(--color-navy)] underline underline-offset-4">
                Terms of Service
              </Link>
              , it is not a degree, a diploma under any national qualifications framework, or a
              qualification conferred by a university.
            </p>
            <p>
              Revoked certificates are reported as revoked rather than as missing, so a
              revocation can never be mistaken for a typing error. If a lookup does not match
              what is printed on a certificate you hold, write to{' '}
              <a
                href={`mailto:${refundPolicy.supportEmail}`}
                className="text-[var(--color-navy)] underline underline-offset-4"
              >
                {refundPolicy.supportEmail}
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
