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
import { HeroSection as HeroOdyssey } from '../components/ui/hero-odyssey';

import { BorderBeam } from '../components/ui/BorderBeam';
import { RevealText } from '../components/ui/RevealText';
import { TextEffect, TextEffectInView } from '../components/ui/TextEffect';

const SpiralIntro = dynamic(() => import('../components/ui/SpiralIntro'), { ssr: false });

import { teamMembers, faqData } from '../data/siteData';

const renderMarkdown = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-[var(--storm-electric)]">{part.slice(2, -2)}</strong>;
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
    <div className="min-h-screen bg-storm-to-dawn overflow-hidden">
      {/* Session-gated spiral intro overlay — dismissed by Enter button */}
      <SpiralIntro />

      {/* Premium Hero Section — Odyssey lightning + planet backdrop */}
      <section className="relative w-full overflow-hidden">
        <HeroOdyssey />
      </section>


      {/* Unified Impact Stats — storm phase */}
      <section className="py-24 text-white relative overflow-hidden">
        {/* Electric + amber ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--storm-electric)]/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--storm-accent)]/10 rounded-full blur-[120px] translate-y-1/2 pointer-events-none"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          {/* Section Heading */}
          <motion.div variants={fadeInUp} className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--storm-electric)]/10 border border-[var(--storm-electric)]/20 text-[var(--storm-electric)] text-xs font-semibold mb-4 uppercase tracking-wider">
              Our Impact
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Numbers that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] via-white to-[var(--dawn-glow)]">speak for themselves</span>
            </h2>
            <p className="text-slate-300 mt-4">
              Six years of relentless focus on one outcome — placing students at the world&apos;s best universities with zero upfront consultation fees.
            </p>
          </motion.div>

          {/* 4-stat grid — storm-glass cards, bolt icons on scholarships + countries */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Globe, value: '29+', label: 'Countries', bolt: true },
              { icon: Users, value: '2000+', label: 'Students Placed', bolt: false },
              { icon: Award, value: '₹3+ Cr', label: 'Scholarships Won', bolt: true, gradient: true },
              { icon: CheckCircle, value: '100%', label: 'Success Rate', bolt: false },
            ].map((stat, i) => {
              const Icon = stat.icon;
              const iconTone = stat.bolt
                ? 'bg-[var(--storm-accent)]/10 border-[var(--storm-accent)]/25 text-[var(--storm-accent)] group-hover:bg-[var(--storm-accent)]/20'
                : 'bg-[var(--storm-electric)]/10 border-[var(--storm-electric)]/20 text-[var(--storm-electric)] group-hover:bg-[var(--storm-electric)]/20';
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="group relative glass-storm rounded-2xl p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 ${iconTone}`}
                       style={stat.bolt ? { animation: 'bolt-pulse 4s ease-in-out infinite' } : undefined}>
                    <Icon size={32} strokeWidth={1.75} />
                  </div>
                  <span className={`text-4xl md:text-5xl font-bold mb-2 tracking-tight ${
                    stat.gradient
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] via-white to-[var(--dawn-glow)]'
                      : 'text-white'
                  }`}>
                    {stat.value}
                  </span>
                  <span className="text-slate-300 font-medium tracking-wide uppercase text-xs md:text-sm">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* University Portfolio — 100+ universities across 29 countries */}
      <UniversityLogosSection />

      {/* Student Plans — transition phase */}
      <section id="student-plans" className="relative">
        <div className="pt-16 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--storm-electric)]/10 border border-[var(--storm-electric)]/20 text-[var(--storm-electric)] text-xs font-bold tracking-wide uppercase mb-5">
              Student Plans
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              <TextEffectInView as="span" per="word" preset="blur">Our two</TextEffectInView>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">
                <TextEffectInView as="span" per="char" preset="blur" delay={0.25}>Student Charters.</TextEffectInView>
              </span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg">
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

      {/* Educational Guides */}
      <StudyAbroadGuides />

      {/* Quick FAQ Section — dawn phase */}
      <section className="py-24 relative overflow-hidden">
        {/* Dawn ambient */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-40 right-20 w-80 h-80 bg-[var(--dawn-glow)] rounded-full blur-3xl translate-x-1/2"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-[var(--storm-electric)] rounded-full blur-3xl -translate-x-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <TextEffectInView as="h2" per="word" preset="blur" className="text-3xl md:text-5xl font-bold text-white mb-6">Common Questions</TextEffectInView>
            <p className="text-slate-300 text-lg">Clear up your doubts instantly. For full details, visit our <Link href="/faq" className="text-[var(--dawn-glow)] hover:underline">FAQ Help Center</Link>.</p>
          </div>

          <div className="space-y-4">
            {faqData.slice(0, 5).map((faq, index) => (
              <motion.details
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group glass-dawn rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="text-lg font-bold text-white group-hover:text-[var(--dawn-glow)] transition-colors">{faq.question}</span>
                  <div className="w-8 h-8 rounded-full bg-[var(--dawn-horizon)] flex items-center justify-center text-[var(--dawn-glow)] group-open:rotate-180 transition-transform duration-300">
                    <ChevronDown size={18} />
                  </div>
                </summary>
                <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                  <div className="whitespace-pre-wrap">{renderMarkdown(faq.answer)}</div>
                </div>
              </motion.details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center text-[var(--dawn-glow)] font-bold hover:text-white transition-colors group"
            >
              <span>View All 30+ Questions</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="py-32 bg-dawn-glow relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 relative z-10"
        >
          <div className="bg-[var(--dawn-horizon)] rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-20px_var(--storm-accent-glow)] border border-[var(--dawn-glow)]/20 flex flex-col md:flex-row">
            {/* Image Pane */}
            <div className="md:w-5/12 h-64 md:h-auto relative">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" alt="Graduation Joy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--dawn-horizon)] md:bg-gradient-to-l opacity-80 md:opacity-40"></div>
            </div>
            
            {/* Content Pane */}
            <div className="md:w-7/12 p-12 md:p-20 relative z-10 text-center md:text-left flex flex-col justify-center items-center md:items-start">
              <TextEffectInView as="h2" per="word" preset="blur" className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">Ready to Start Your Journey?</TextEffectInView>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl relative z-10 leading-relaxed md:text-left">Connect with our expert counselors today and take the first step towards your global education with zero hidden fees.</p>
              <Link
                href="/bookings"
                className="relative overflow-hidden inline-flex justify-center items-center px-10 py-5 bg-gradient-to-r from-[var(--storm-accent)] via-[#FFB347] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_40px_-10px_var(--storm-accent-glow)] hover:shadow-[0_0_60px_-15px_var(--storm-accent-glow)] text-lg hover:-translate-y-1 z-10 group"
              >
                <span className="relative z-10 inline-flex items-center">
                  Apply Now - Start Journey
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
                </span>
                <BorderBeam size={160} duration={9} colorFrom="#F5B877" colorTo="#7CC8FF" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
