"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, Globe2 } from 'lucide-react';

const certifications = [
  {
    id: 'dpiit',
    name: 'DPIIT Startup India',
    issuer: 'Department for Promotion of Industry and Internal Trade, Govt. of India',
    blurb: 'Officially recognised startup under DPIIT (registration ref. DIPP158553). Government acknowledgement of genuine business activity in education.',
    image: '/trust-badges/dpiit-certificate.png',
    Icon: ShieldCheck,
    accent: 'from-amber-300 to-orange-500',
  },
  {
    id: 'british-council',
    name: 'British Council',
    issuer: 'UK Agent and Counsellor Training',
    blurb: 'Counsellors completed the British Council UK Agent & Counsellor Training course and qualifying exam — the standard reference for ethical UK student placement.',
    image: '/trust-badges/british-council.png',
    Icon: Globe2,
    accent: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'airc',
    name: 'AIRC',
    issuer: 'American International Recruitment Council',
    blurb: 'AIRC certified for U.S. student recruitment — a peer-reviewed standard that holds agencies to ethical and quality benchmarks for placing students in American universities.',
    image: '/trust-badges/airc-certificate.png',
    Icon: Award,
    accent: 'from-cyan-300 to-sky-500',
  },
];

export default function CertificationsPage() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen text-slate-100">
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=2400&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)] via-[var(--storm-deep)]/35 to-[var(--storm-deep)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(5,7,15,0.65)_0%,transparent_75%)]" />
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-[var(--storm-electric)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[var(--dawn-glow)]/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Independently certified by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">DPIIT, British Council and AIRC</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300/90 leading-relaxed">
            Three independent recognitions, three different reasons to trust the work. Hover any certificate for the full preview.
          </p>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group relative"
                onMouseEnter={() => setHovered(cert.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${cert.accent} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500`} />
                <div className="relative glass-storm p-6 h-full flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border border-white/10 bg-gradient-to-br ${cert.accent} text-[var(--storm-deep)]`}>
                    <cert.Icon size={26} strokeWidth={2.4} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{cert.name}</h3>
                  <p className="text-xs uppercase tracking-wider text-sky-300/80 mb-5">
                    {cert.issuer}
                  </p>
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-white">
                    <img
                      src={cert.image}
                      alt={`${cert.name} certificate`}
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.2em] text-white/85 bg-slate-900/70 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      Hover to enlarge
                    </span>
                  </div>
                  <p className="mt-5 text-sm text-slate-300/85 leading-relaxed">{cert.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className={`fixed inset-0 z-[60] flex items-center justify-center pointer-events-none transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[var(--storm-deep)]/85 backdrop-blur-sm" />
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className={`relative max-w-3xl w-[90%] transition-all duration-500 ${hovered === cert.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute'}`}
          >
            <div className={`absolute -inset-2 rounded-3xl bg-gradient-to-br ${cert.accent} opacity-30 blur-3xl`} />
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src={cert.image}
                alt={`${cert.name} certificate full preview`}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="text-center mt-4 text-slate-200 text-sm uppercase tracking-[0.3em]">
              {cert.name} Certificate
            </div>
          </div>
        ))}
      </div>

      <section className="py-20 relative">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Want to verify any of these?
          </h2>
          <p className="text-lg text-slate-300/85 mb-8 max-w-2xl mx-auto">
            Ask a counsellor for the certificate references. We&apos;ll share them on the call &mdash; nothing is hidden.
          </p>
          <Link
            href="/bookings"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
          >
            Talk to a counsellor
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
