"use client";
import React, { Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CheckCircle, Award, Globe2, BadgeCheck, ShieldCheck, ArrowRight,
  FileText, Phone, Plane, GraduationCap,
} from 'lucide-react';
import PlanComparison from '../../components/PlanComparison';
import SpatialPlanShowcase from '../../components/ui/SpatialPlanShowcase';
import { TextEffect } from '../../components/ui/TextEffect';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const howItWorks = [
  {
    Icon: Phone,
    title: 'Free first call',
    body: 'Tell us where you want to study and what you can spend. We tell you which plan actually fits — or that neither does.',
  },
  {
    Icon: FileText,
    title: 'Sign + pay via Razorpay',
    body: 'Single onboarding fee, refundable. No hidden agency markup later. Receipt arrives in your inbox the same day.',
  },
  {
    Icon: GraduationCap,
    title: 'Applications + offers',
    body: 'University shortlist, SOP/LOR, applications. We don&rsquo;t guess — every shortlist is built around your profile and budget.',
  },
  {
    Icon: Plane,
    title: 'Visa + landing',
    body: 'End-to-end visa file, mock interview, accommodation handover, and a counsellor on call until you&rsquo;ve started classes.',
  },
];

function ProductsContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect === 'zcf') {
      window.location.href = 'https://pages.razorpay.com/pl_Rk1qpiuEJifDx1/view';
    } else if (redirect === 'ztf') {
      window.location.href = 'https://pages.razorpay.com/pl_Rk1J9M0s2qvgUz/view';
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen text-slate-100">
      {/* HERO */}
      <section className="relative pt-28 lg:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--storm-electric)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--dawn-glow)]/10 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
            <TextEffect as="span" per="word" preset="blur">Pick the plan that matches</TextEffect>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">where you want to study.</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl mb-10 text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
            ZCF for global private universities. ZTF for tuition-free public Europe. Both come with a 100% refundable deposit and a real human counsellor &mdash; not a chatbot.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="#plans"
              className="inline-flex justify-center items-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
            >
              Compare both plans
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/bookings"
              className="inline-flex justify-center items-center px-8 py-4 glass-storm text-white font-bold rounded-xl transition-all hover:text-[var(--storm-electric)]"
            >
              Free first call
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { Icon: CheckCircle, label: '2000+ students' },
              { Icon: Globe2, label: '29+ countries' },
              { Icon: Award, label: '₹3 Cr+ scholarships' },
              { Icon: ShieldCheck, label: '100% refundable' },
            ].map(({ Icon, label }) => (
              <div key={label} className="glass-storm py-3 px-3 flex items-center justify-center gap-2 text-slate-200 text-sm font-semibold">
                <Icon size={16} className="text-[var(--storm-electric)] shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* TRUST BAND — DPIIT / British Council / AIRC */}
      <section className="relative py-10 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">
              Certified by independent bodies
            </p>
            <Link href="/certifications" className="flex flex-wrap items-center gap-8 opacity-80 hover:opacity-100 transition-opacity group">
              <img src="/logos/dppit logo.png" alt="DPIIT Startup India" className="h-7 object-contain" />
              <img src="/trust-badges/british-council-logo.webp" alt="British Council" className="h-5 object-contain" />
              <img src="/logos/Airc-logo-full-color-centered-LG.jpg" alt="AIRC" className="h-7 rounded-sm object-contain" />
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--storm-electric)] group-hover:underline">View certificates &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PLANS — Spatial showcases + comparison */}
      <div id="plans">
        <SpatialPlanShowcase plan="zcf" />
        <SpatialPlanShowcase plan="ztf" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          id="student-plan-comparison"
        >
          <PlanComparison />
        </motion.div>
      </div>

      {/* HOW IT WORKS */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              How it works &mdash; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">four steps, zero surprises.</span>
            </h2>
            <p className="text-slate-300/85 text-lg max-w-2xl mx-auto">
              Same process for both plans. Same counsellor through every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((step, i) => (
              <div key={step.title} className="glass-storm p-6 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--storm-accent)] to-[var(--dawn-glow)] text-[var(--storm-deep)] flex items-center justify-center font-extrabold text-sm shadow-[0_0_18px_var(--storm-accent-glow)]">
                  {i + 1}
                </div>
                <step.Icon size={28} className="text-[var(--storm-electric)] mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p
                  className="text-slate-300/85 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: step.body }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL PROOF GALLERY — payments + declarations + visas (PII redacted) */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              The receipts &mdash; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">real students, real declarations, real visas.</span>
            </h2>
            <p className="text-slate-300/85 text-lg max-w-3xl mx-auto leading-relaxed">
              Every plan flows through Razorpay. Every ZTF student signs a Zero Tuition Fee declaration before we process anything. Every visa we claim is a real stamp in a real passport. Personal info is blacked out below; the rest is exactly what we have on file.
            </p>
          </div>

          {/* Razorpay payments */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-[var(--storm-electric)]/30 flex-1" />
              <h3 className="text-[var(--storm-electric)] text-xs font-bold uppercase tracking-[0.25em] whitespace-nowrap">
                Razorpay payments
              </h3>
              <div className="h-px bg-[var(--storm-electric)]/30 flex-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[
                { src: '/proof/razorpay-prepay.jpeg', cap: 'ZTF Razorpay page', tone: 'sky' },
                { src: '/proof/razorpay-receipt-1.jpeg', cap: '₹10,000 paid', tone: 'emerald' },
                { src: '/proof/razorpay-receipt-2.jpeg', cap: '14 May 2025', tone: 'emerald' },
                { src: '/proof/razorpay-receipt-3.jpeg', cap: '14 May 2025', tone: 'emerald' },
              ].map((item, i) => (
                <div key={i} className="glass-storm p-2.5 group hover:scale-[1.02] transition-transform">
                  <div className="relative rounded-lg overflow-hidden bg-white aspect-[4/5]">
                    <img
                      src={item.src}
                      alt={`Razorpay payment proof ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className={`mt-2 text-center text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${item.tone === 'emerald' ? 'text-emerald-300' : 'text-sky-300'}`}>
                    <BadgeCheck className="w-3 h-3" />
                    {item.cap}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ZTF declarations */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-[var(--dawn-glow)]/30 flex-1" />
              <h3 className="text-[var(--dawn-glow)] text-xs font-bold uppercase tracking-[0.25em] whitespace-nowrap">
                Zero Tuition Fee declarations
              </h3>
              <div className="h-px bg-[var(--dawn-glow)]/30 flex-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[
                { src: '/proof/esign-zft-1.jpeg', cap: 'Sai Krishna P' },
                { src: '/proof/esign-zft-2.jpeg', cap: 'Karthik Hegde' },
                { src: '/proof/esign-zft-3.jpeg', cap: 'Hrashikesh Hegde' },
                { src: '/proof/esign-zft-4.jpeg', cap: 'Monika Nataraj' },
              ].map((item, i) => (
                <div key={i} className="glass-storm p-2.5 group hover:scale-[1.02] transition-transform">
                  <div className="relative rounded-lg overflow-hidden bg-white aspect-[16/9] sm:aspect-[5/4]">
                    <img
                      src={item.src}
                      alt={`Zero Tuition Fee declaration sent to ${item.cap}`}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-wider text-[var(--dawn-glow)] flex items-center justify-center gap-1.5">
                    <BadgeCheck className="w-3 h-3" />
                    {item.cap}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visa + UPI featured */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-emerald-400/30 flex-1" />
              <h3 className="text-emerald-300 text-xs font-bold uppercase tracking-[0.25em] whitespace-nowrap">
                Visa + bank transfer proofs
              </h3>
              <div className="h-px bg-emerald-400/30 flex-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="glass-storm p-3">
                <div className="relative rounded-xl overflow-hidden bg-white aspect-[3/4]">
                  <img
                    src="/proof/visa-poland-raghav.jpeg"
                    alt="Polish student visa stamp issued to Raghav Verma"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="pt-3 px-2 text-center">
                  <p className="text-white font-bold">Raghav Verma &middot; Polish student visa</p>
                  <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mt-1 inline-flex items-center gap-1.5">
                    <BadgeCheck className="w-3 h-3" />
                    Issued by the Embassy of Poland, New Delhi
                  </p>
                </div>
              </div>

              <div className="glass-storm p-3">
                <div className="relative rounded-xl overflow-hidden bg-black aspect-[3/4]">
                  <img
                    src="/proof/upi-transaction-monika.jpeg"
                    alt="UPI transfer of ₹65,000 from Monika Nataraj to Axelis Overseas Education Private Limited"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="pt-3 px-2 text-center">
                  <p className="text-white font-bold">Monika Nataraj &middot; ZTF service fee</p>
                  <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mt-1 inline-flex items-center gap-1.5">
                    <BadgeCheck className="w-3 h-3" />
                    ₹65,000 via HDFC Bank UPI &middot; 30 Sept 2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-slate-400 text-xs max-w-2xl mx-auto">
            Personal contact details, account numbers, and government identifiers are blacked out. Anything you want to verify is available on a call &mdash; with the student&apos;s consent.
          </p>

          <div className="mt-8 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-[var(--storm-electric)] font-bold hover:text-white transition-colors"
            >
              See real student stories &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Still on the fence?
            </h2>
            <p className="text-lg text-slate-300/90 mb-10 max-w-2xl mx-auto">
              Book the free first call. We&apos;ll either tell you exactly which plan fits, or save you the money entirely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/bookings"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
              >
                Book a free call
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center px-8 py-4 glass-storm text-white font-bold rounded-xl transition-all hover:text-[var(--storm-electric)]"
              >
                Read the FAQ first
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[var(--storm-electric)]/30 border-t-[var(--storm-electric)]" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
