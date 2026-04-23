"use client";
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Award, Users, CheckCircle, ChevronDown } from 'lucide-react';

const InstagramSuccessStories = dynamic(() => import('../components/InstagramSuccessStories'), { ssr: false });
const TeamGlobeCarousel = dynamic(() => import('../components/TeamGlobeCarousel'), { ssr: false });
const StudyAbroadGuides = dynamic(() => import('../components/StudyAbroadGuides'), { ssr: false });
const UniversityLogosSection = dynamic(() => import('../components/UniversityLogosSection'), { ssr: false });
const SpatialPlanShowcase = dynamic(() => import('../components/ui/SpatialPlanShowcase'), { ssr: false });
const PlanComparison = dynamic(() => import('../components/PlanComparison'), { ssr: false });

import { BorderBeam } from '../components/ui/BorderBeam';
import { RevealText } from '../components/ui/RevealText';
import { BackgroundGradientAnimation } from '../components/ui/BackgroundGradientAnimation';
import { TextEffect, TextEffectInView } from '../components/ui/TextEffect';

const SpiralIntro = dynamic(() => import('../components/ui/SpiralIntro'), { ssr: false });

import { teamMembers, faqData } from '../data/siteData';

const renderMarkdown = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-blue-400">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Session-gated spiral intro overlay — dismissed by Enter button */}
      <SpiralIntro />

      {/* Premium Hero Section */}
      <section className="relative w-full pt-24 pb-32 bg-slate-900 border-b border-slate-800 overflow-hidden">
        {/* Animated gradient backdrop */}
        <BackgroundGradientAnimation />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30 pointer-events-none" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
        >

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 max-w-4xl leading-tight">
            Your Gateway to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Global Education
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
            Expert guidance for your study abroad endeavours across <strong className="text-slate-200">29+ Countries</strong> including the UK, USA, Canada, Ireland, and Finland. Zero fees, end-to-end.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/bookings"
              className="relative inline-flex justify-center items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.6)] overflow-hidden"
            >
              <span className="relative z-10">Apply Now - Start Journey</span>
              <BorderBeam size={120} duration={8} colorFrom="#22d3ee" colorTo="#0b5cff" />
            </Link>
            <Link
              href="/products"
              className="inline-flex justify-center items-center px-8 py-4 bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-xl transition-all"
            >
              View Student Plans
            </Link>
          </motion.div>

        </motion.div>
      </section>


      {/* Unified Impact Stats — single authoritative section, replaces the old hero trust row + 4-card grid */}
      <section className="py-24 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] translate-y-1/2 pointer-events-none"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          {/* Section Heading */}
          <motion.div variants={fadeInUp} className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold mb-4 uppercase tracking-wider">
              Our Impact
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Numbers that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">speak for themselves</span>
            </h2>
            <p className="text-slate-400 mt-4">
              Six years of relentless focus on one outcome — placing students at the world&apos;s best universities with zero upfront consultation fees.
            </p>
          </motion.div>

          {/* 4-stat grid — deduplicated from the previous two sections */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Globe, value: '29+', label: 'Countries', tint: 'blue' },
              { icon: Users, value: '2000+', label: 'Students Placed', tint: 'cyan' },
              { icon: Award, value: '₹3+ Cr', label: 'Scholarships Won', tint: 'blue', gradient: true },
              { icon: CheckCircle, value: '100%', label: 'Success Rate', tint: 'cyan' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              const isBlue = stat.tint === 'blue';
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="group relative bg-slate-800/40 backdrop-blur border border-slate-700/70 rounded-2xl p-8 flex flex-col items-center text-center hover:border-blue-500/40 hover:bg-slate-800/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.35)]"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 ${
                    isBlue
                      ? 'bg-blue-500/10 border-blue-500/20 text-blue-300 group-hover:bg-blue-500/20 group-hover:text-blue-200'
                      : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300 group-hover:bg-cyan-500/20 group-hover:text-cyan-200'
                  }`}>
                    <Icon size={32} strokeWidth={1.75} />
                  </div>
                  <span className={`text-4xl md:text-5xl font-bold mb-2 tracking-tight ${
                    stat.gradient
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300'
                      : 'text-white'
                  }`}>
                    {stat.value}
                  </span>
                  <span className="text-slate-400 font-medium tracking-wide uppercase text-xs md:text-sm">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Student Plans — same showcase as /products, unified across the site */}
      <section id="student-plans" className="relative">
        <div className="bg-slate-50 border-t border-slate-200/80 pt-16 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-5">
              Student Plans
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              <TextEffectInView as="span" per="word" preset="blur">Two plans. One</TextEffectInView>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">flat deposit.</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
              Pick the route that matches your destination — ZCF for global private universities, ZTF for tuition-free Europe.
            </p>
          </div>
        </div>
        <SpatialPlanShowcase plan="zcf" />
        <SpatialPlanShowcase plan="ztf" />
        <PlanComparison />
      </section>

      {/* Team Section */}
      <TeamGlobeCarousel teamMembers={teamMembers} />

      {/* Social Proof Videos */}
      <InstagramSuccessStories />

      {/* University Portfolio — 100+ universities across 29 countries */}
      <UniversityLogosSection />

      {/* Educational Guides */}
      <StudyAbroadGuides />

      {/* Quick FAQ Section for Homepage */}
      <section className="py-24 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl translate-x-1/2"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-cyan-500 rounded-full blur-3xl -translate-x-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <TextEffectInView as="h2" per="word" preset="blur" className="text-3xl md:text-5xl font-bold text-white mb-6">Common Questions</TextEffectInView>
            <p className="text-slate-400 text-lg">Clear up your doubts instantly. For full details, visit our <Link href="/faq" className="text-blue-400 hover:underline">FAQ Help Center</Link>.</p>
          </div>

          <div className="space-y-4">
            {faqData.slice(0, 5).map((faq, index) => (
              <motion.details 
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-sm"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{faq.question}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 group-open:rotate-180 transition-transform duration-300">
                    <ChevronDown size={18} />
                  </div>
                </summary>
                <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-slate-700/50 pt-4">
                  <div className="whitespace-pre-wrap">{renderMarkdown(faq.answer)}</div>
                </div>
              </motion.details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/faq"
              className="inline-flex items-center text-blue-400 font-bold hover:text-blue-300 transition-colors group"
            >
              <span>View All 30+ Questions</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 relative z-10"
        >
          <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-800 flex flex-col md:flex-row">
            {/* Image Pane */}
            <div className="md:w-5/12 h-64 md:h-auto relative">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" alt="Graduation Joy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900 md:bg-gradient-to-l opacity-80 md:opacity-40"></div>
            </div>
            
            {/* Content Pane */}
            <div className="md:w-7/12 p-12 md:p-20 relative z-10 text-center md:text-left flex flex-col justify-center items-center md:items-start">
              <TextEffectInView as="h2" per="word" preset="blur" className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">Ready to Start Your Journey?</TextEffectInView>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl relative z-10 leading-relaxed md:text-left">Connect with our expert counselors today and take the first step towards your global education with zero hidden fees.</p>
              <Link
                href="/bookings"
                className="relative overflow-hidden inline-flex justify-center items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_-15px_rgba(6,182,212,0.7)] text-lg hover:-translate-y-1 z-10 group"
              >
                <span className="relative z-10 inline-flex items-center">
                  Apply Now - Start Journey
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
                </span>
                <BorderBeam size={160} duration={9} colorFrom="#ffffff" colorTo="#22d3ee" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
