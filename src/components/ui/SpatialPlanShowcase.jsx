'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  FileText,
  Award,
  Shield,
  Sliders,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  Home,
  Plane,
  Briefcase,
  Trophy,
} from 'lucide-react';
import RazorpayEmbed from '../RazorpayEmbed';
import { allCountries, europeanCountries } from '../../data/siteData';
import { TextEffectInView } from './TextEffect';

const PLAN_CONFIG = {
  zcf: {
    eyebrow: 'ZCF Student Plan',
    badge: 'Most Popular',
    headline: 'Two pillars. One',
    accent: 'flat deposit.',
    subline:
      'Everything covered by the Zero Consultation Fee plan, organized around what actually decides your admit: expert application craft and scholarship funding.',
    layoutId: 'zcf-island',
    icon: GraduationCap,
    pricing: {
      label: 'Zero Consultation Fee',
      description:
        'Best for private universities, business schools, and premium programmes across all 29 destinations.',
      original: '₹19,999',
      final: '₹9,999',
      discount: '50% OFF',
      feeLabel: 'Onboarding Fee',
      refundTitle: '100% Refundable Deposit',
      refundBody:
        'Fully refunded once your student visa is approved, or if you receive no offer.',
      razorpayUrl: 'https://pages.razorpay.com/pl_Rk1qpiuEJifDx1/view',
      ctaText: 'Enroll Now — ₹9,999',
      secureNote: 'Secure payment via Razorpay · 100% Refundable',
      countries: allCountries,
      features: [
        'Expert University Shortlisting & Status Tracker',
        'SOP, LOR & Europass CV Assistance',
        'Comprehensive Visa Guidance & Scholarships',
      ],
    },
    facets: {
      application: {
        id: 'application',
        label: 'Application',
        eyebrow: 'Pillar 01',
        title: 'Expert Guidance',
        description:
          'University shortlisting, SOP, LOR, Europass CV and visa paperwork — handled end to end by dedicated counsellors across 29+ destinations.',
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
        colors: {
          gradient: 'from-blue-600 to-indigo-900',
          glow: 'bg-blue-500',
          bar: 'bg-blue-500',
          accent: 'text-blue-300',
        },
        stats: { status: 'Active Dossier', headline: '2,000+ Students Placed' },
        features: [
          { label: 'Shortlisting Precision', value: 96, icon: Target },
          { label: 'SOP & LOR Quality', value: 98, icon: FileText },
        ],
      },
      funding: {
        id: 'funding',
        label: 'Funding',
        eyebrow: 'Pillar 02',
        title: 'Scholarship Access',
        description:
          'Unlock 2,000+ scholarships, exclusive agent discounts, and a refundable deposit — students have secured over ₹3 crores in guaranteed aid.',
        image:
          'https://images.unsplash.com/photo-1627556704302-624286467c65?q=80&w=1200&auto=format&fit=crop',
        colors: {
          gradient: 'from-cyan-500 to-sky-900',
          glow: 'bg-cyan-400',
          bar: 'bg-cyan-400',
          accent: 'text-cyan-300',
        },
        stats: { status: 'Secured', headline: '₹3+ Cr Scholarships' },
        features: [
          { label: 'Scholarship Hit Rate', value: 94, icon: Award },
          { label: 'Refund Guarantee', value: 100, icon: Shield },
        ],
      },
    },
  },
  ztf: {
    eyebrow: 'ZTF Student Plan',
    badge: 'Premium Focus',
    headline: 'Tuition-free Europe.',
    accent: 'End-to-end relocation.',
    subline:
      'Admission to public universities in Germany, France, Finland, Italy and Austria — paired with the housing, visa and part-time work support that actually gets you there.',
    layoutId: 'ztf-island',
    icon: Trophy,
    pricing: {
      label: 'Zero Tuition Fee',
      description:
        'Exclusively for tuition-free public universities across Germany, France, Finland, Italy, Austria and more.',
      original: '₹39,998',
      final: '₹19,999',
      discount: '50% OFF',
      feeLabel: 'Service Fee',
      refundTitle: 'Conditional Refund',
      refundBody: '₹19,999 fee is fully refundable if no offers are received.',
      razorpayUrl: 'https://pages.razorpay.com/pl_Rk1J9M0s2qvgUz/view',
      ctaText: 'Enroll Now — ₹19,999',
      secureNote: 'Secure payment via Razorpay · Conditional Refund',
      countries: europeanCountries,
      features: [
        'Admission to Tuition-Free Public Universities',
        'End-to-End Admission & Visa Support',
        'Housing & Part-time Job Guidance',
      ],
    },
    facets: {
      admission: {
        id: 'admission',
        label: 'Admission',
        eyebrow: 'Pillar 01',
        title: 'Public Universities',
        description:
          'Curated shortlists of tuition-free public institutions across 11+ European countries, with complete application management until your offer letter lands.',
        image:
          'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop',
        colors: {
          gradient: 'from-cyan-500 to-sky-900',
          glow: 'bg-cyan-400',
          bar: 'bg-cyan-400',
          accent: 'text-cyan-300',
        },
        stats: { status: 'Application Track', headline: '100% Tuition-Free Placements' },
        features: [
          { label: 'Admission Success', value: 92, icon: GraduationCap },
          { label: 'Public Uni Coverage', value: 100, icon: Target },
        ],
      },
      relocation: {
        id: 'relocation',
        label: 'Relocation',
        eyebrow: 'Pillar 02',
        title: 'Living Support',
        description:
          'Student housing, block-account setup, visa interview prep, and part-time job orientation — everything you need once the offer letter is in.',
        image:
          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop',
        colors: {
          gradient: 'from-blue-600 to-indigo-900',
          glow: 'bg-blue-500',
          bar: 'bg-blue-500',
          accent: 'text-blue-300',
        },
        stats: { status: 'Relocation Kit', headline: 'Housing · Visa · Part-time' },
        features: [
          { label: 'Visa Approval', value: 98, icon: Plane },
          { label: 'Housing Placement', value: 96, icon: Home },
          { label: 'Job Readiness', value: 90, icon: Briefcase },
        ],
      },
    },
  },
};

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  image: (isLeft) => ({
    initial: {
      opacity: 0,
      scale: 1.4,
      filter: 'blur(14px)',
      rotate: isLeft ? -20 : 20,
      x: isLeft ? -60 : 60,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotate: 0,
      x: 0,
      transition: { type: 'spring', stiffness: 220, damping: 22 },
    },
    exit: { opacity: 0, scale: 0.7, filter: 'blur(16px)', transition: { duration: 0.25 } },
  }),
};

const SectionBackdrop = ({ isLeft, leftColor, rightColor }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      animate={{
        background: isLeft
          ? `radial-gradient(circle at 10% 50%, ${leftColor}, transparent 55%)`
          : `radial-gradient(circle at 90% 50%, ${rightColor}, transparent 55%)`,
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
  </div>
);

const FacetVisual = ({ data, isLeft }) => (
  <motion.div layout="position" className="relative shrink-0">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-[-10%] rounded-full border border-dashed border-white/10"
    />
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.colors.gradient} blur-3xl opacity-40`}
    />
    <div className="relative h-72 w-72 md:h-[400px] md:w-[400px] rounded-full border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden bg-slate-950/60 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.img
          key={data.id}
          src={data.image}
          alt={data.title}
          variants={ANIMATIONS.image(isLeft)}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full object-cover"
          draggable={false}
          onError={(e) => {
            // Graceful fallback if the remote asset 404s: swap to a locally-hosted team photo.
            if (!e.currentTarget.dataset.fallback) {
              e.currentTarget.dataset.fallback = '1';
              e.currentTarget.src = '/og-image.jpg';
            }
          }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
    </div>
    <motion.div
      layout="position"
      className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-300 bg-slate-950/80 px-4 py-2 rounded-full border border-white/10 backdrop-blur">
        <span className={`h-1.5 w-1.5 rounded-full ${data.colors.glow} animate-pulse`} />
        {data.stats.status}
      </div>
    </motion.div>
  </motion.div>
);

const FacetDetails = ({ data, isLeft, cta, ctaLabel }) => {
  const alignClass = isLeft ? 'items-start text-left' : 'items-end text-right';
  const flexDirClass = isLeft ? 'flex-row' : 'flex-row-reverse';
  const barSideClass = isLeft ? 'left-0' : 'right-0';

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${alignClass}`}
    >
      <motion.span
        variants={ANIMATIONS.item}
        className={`text-xs font-bold uppercase tracking-[0.3em] ${data.colors.accent} mb-3`}
      >
        {data.eyebrow} · {data.label}
      </motion.span>
      <motion.h3
        variants={ANIMATIONS.item}
        className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500"
      >
        {data.title}
      </motion.h3>
      <motion.p
        variants={ANIMATIONS.item}
        className={`text-slate-400 mb-8 max-w-sm leading-relaxed ${isLeft ? 'mr-auto' : 'ml-auto'}`}
      >
        {data.description}
      </motion.p>

      <motion.div
        variants={ANIMATIONS.item}
        className="w-full space-y-6 bg-slate-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm"
      >
        {data.features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div key={feature.label}>
              <div className={`flex items-center justify-between mb-3 text-sm ${flexDirClass}`}>
                <div className="flex items-center gap-2 text-slate-200">
                  <Icon size={16} />
                  <span>{feature.label}</span>
                </div>
                <span className="font-mono text-xs text-slate-400">{feature.value}%</span>
              </div>
              <div className="relative h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${feature.value}%` }}
                  transition={{ duration: 1, delay: 0.3 + idx * 0.12 }}
                  className={`absolute top-0 bottom-0 ${barSideClass} ${data.colors.bar} opacity-90`}
                />
              </div>
            </div>
          );
        })}
        <div className={`pt-2 flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
          <a
            href={cta}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white transition-colors group"
          >
            <Sliders size={14} /> {ctaLabel}
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>

      <motion.div
        variants={ANIMATIONS.item}
        className={`mt-6 flex items-center gap-3 text-slate-400 ${flexDirClass}`}
      >
        <CheckCircle2 size={16} className={data.colors.accent} />
        <span className="text-sm font-medium">{data.stats.headline}</span>
      </motion.div>
    </motion.div>
  );
};

const Switcher = ({ activeId, onToggle, options, layoutId }) => (
  <div className="relative mt-16 flex justify-center">
    <motion.div
      layout
      className="flex items-center gap-1 p-1.5 rounded-full bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/5"
    >
      {options.map((opt) => (
        <motion.button
          key={opt.id}
          onClick={() => onToggle(opt.id)}
          whileTap={{ scale: 0.96 }}
          type="button"
          className="relative w-28 h-11 rounded-full flex items-center justify-center text-sm font-medium focus:outline-none"
        >
          {activeId === opt.id && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-white/5 shadow-inner"
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            />
          )}
          <span
            className={`relative z-10 transition-colors duration-300 ${
              activeId === opt.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {opt.label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  </div>
);

const PricingBlock = ({ pricing, plan, badge, icon: Icon }) => {
  const accent = plan === 'ztf' ? 'cyan' : 'blue';

  const flagPillClass =
    plan === 'ztf'
      ? 'bg-cyan-500/10 text-cyan-100 border-cyan-400/20 hover:bg-cyan-500/15'
      : 'bg-blue-500/10 text-blue-100 border-blue-400/20 hover:bg-blue-500/15';

  const discountPillClass =
    plan === 'ztf'
      ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30'
      : 'bg-rose-500/15 text-rose-200 border-rose-400/30';

  const badgePillClass =
    plan === 'ztf'
      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
      : 'bg-blue-500/15 text-blue-200 border border-blue-400/30';

  const featureDotClass =
    plan === 'ztf' ? 'bg-cyan-400/20 text-cyan-300' : 'bg-blue-500/20 text-blue-300';

  const shortCode = (name) =>
    name === 'United Kingdom' ? 'UK' : name === 'United States' ? 'USA' : name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="relative mt-24 rounded-[2rem] bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden"
    >
      <div
        aria-hidden
        className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${
          plan === 'ztf' ? 'from-blue-500 to-cyan-400' : 'from-blue-600 to-cyan-500'
        }`}
      />
      <div className={`absolute top-0 right-0 px-5 py-2.5 rounded-bl-2xl font-bold text-sm tracking-wide shadow-lg ${badgePillClass}`}>
        {badge}
      </div>

      <div className="grid lg:grid-cols-5 gap-8 p-8 md:p-12">
        {/* Left column: icon, label, price, refund */}
        <div className="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className={`w-16 h-16 bg-slate-800/80 border border-white/10 rounded-2xl flex items-center justify-center mb-5 shadow-inner text-${accent}-300`}>
            {Icon ? <Icon size={28} strokeWidth={1.75} /> : null}
          </div>
          <p className={`text-xs font-semibold uppercase tracking-[0.25em] text-${accent}-300 mb-2`}>
            {pricing.label}
          </p>
          <p className="text-sm text-slate-400 mb-8 max-w-sm leading-relaxed">
            {pricing.description}
          </p>

          <div className="mb-6">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-slate-500 line-through text-lg font-medium">
                {pricing.original}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide border ${discountPillClass}`}
              >
                {pricing.discount}
              </span>
            </div>
            <div className="text-5xl font-extrabold text-white tracking-tight mb-1">
              {pricing.final}
            </div>
            <p className="text-slate-400 font-medium text-xs uppercase tracking-wider">
              {pricing.feeLabel}
            </p>
          </div>

          <div className="w-full bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/5">
            <p className="font-bold text-slate-100 mb-1 text-sm">{pricing.refundTitle}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{pricing.refundBody}</p>
          </div>
        </div>

        {/* Middle column: country flags */}
        <div className="lg:col-span-3 flex flex-col">
          <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs border-b border-white/10 pb-3">
            {plan === 'ztf'
              ? `Coverage · ${pricing.countries.length} European destinations`
              : `Coverage · ${pricing.countries.length}+ destinations worldwide`}
          </h4>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {pricing.countries.map((country) => (
              <div
                key={country.code}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-bold uppercase tracking-tight transition-colors ${flagPillClass}`}
              >
                <span className="text-sm leading-none">{country.flag}</span>
                <span>{shortCode(country.name)}</span>
              </div>
            ))}
          </div>

          <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs border-b border-white/10 pb-3">
            What&apos;s included
          </h4>
          <ul className="space-y-3 mb-8 flex-grow">
            {pricing.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span
                  className={`flex-none w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${featureDotClass}`}
                >
                  <CheckCircle2 size={14} strokeWidth={2.5} />
                </span>
                <span className="text-slate-200 font-medium text-sm">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <RazorpayEmbed url={pricing.razorpayUrl} text={pricing.ctaText} />
            <p className="text-xs text-slate-500 font-medium text-center mt-4 flex items-center justify-center gap-2">
              <Shield size={12} />
              {pricing.secureNote}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function SpatialPlanShowcase({ plan = 'zcf' }) {
  const config = PLAN_CONFIG[plan] ?? PLAN_CONFIG.zcf;
  const facetKeys = Object.keys(config.facets);
  const [activeFacet, setActiveFacet] = useState(facetKeys[0]);
  const data = config.facets[activeFacet];
  const isLeft = activeFacet === facetKeys[0];

  const leftColor = plan === 'ztf' ? 'rgba(34,211,238,0.18)' : 'rgba(59,130,246,0.18)';
  const rightColor = plan === 'ztf' ? 'rgba(59,130,246,0.18)' : 'rgba(34,211,238,0.18)';

  const accentGradient =
    plan === 'ztf' ? 'from-cyan-300 to-blue-400' : 'from-blue-400 to-cyan-300';

  const eyebrowClass =
    plan === 'ztf'
      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
      : 'bg-blue-500/10 text-blue-300 border-blue-500/20';

  const options = facetKeys.map((k) => ({ id: k, label: config.facets[k].label }));

  return (
    <section className="relative w-full bg-slate-950 text-slate-100 overflow-hidden border-y border-slate-900">
      <SectionBackdrop isLeft={isLeft} leftColor={leftColor} rightColor={rightColor} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span
            className={`inline-block px-3 py-1 font-semibold text-xs tracking-widest uppercase rounded-full border mb-4 ${eyebrowClass}`}
          >
            {config.eyebrow}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            <TextEffectInView as="span" per="word" preset="blur">{config.headline}</TextEffectInView>{' '}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accentGradient}`}>
              {config.accent}
            </span>
          </h2>
          <p className="text-slate-400 leading-relaxed">{config.subline}</p>
        </div>

        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.9 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 lg:gap-28 w-full ${
            isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          <FacetVisual data={data} isLeft={isLeft} />
          <motion.div layout="position" className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <FacetDetails
                key={activeFacet}
                data={data}
                isLeft={isLeft}
                cta={config.pricing.razorpayUrl}
                ctaLabel={plan === 'ztf' ? 'Enroll in ZTF' : 'Enroll in ZCF'}
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <Switcher
          activeId={activeFacet}
          onToggle={setActiveFacet}
          options={options}
          layoutId={config.layoutId}
        />

        <PricingBlock
          pricing={config.pricing}
          plan={plan}
          badge={config.badge}
          icon={config.icon}
        />
      </div>
    </section>
  );
}
