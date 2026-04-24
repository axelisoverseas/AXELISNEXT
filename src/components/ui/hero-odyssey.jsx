"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BorderBeam } from './BorderBeam';
import LightningCanvas from './lightning-canvas';
import SplineHero from './spline-hero';
import { TextEffect } from './TextEffect';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const HeroSection = () => {
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setFlashKey((k) => k + 1), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full bg-[var(--storm-deep)] text-white overflow-hidden">
      {/* One-shot thunder flash — fires after headline settles */}
      <motion.div
        key={flashKey}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.10, 0, 0.06, 0] }}
        transition={{ duration: 0.7, times: [0, 0.1, 0.25, 0.45, 1], ease: 'easeOut' }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 min-h-screen flex flex-col">
        {/* Main hero content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-30 flex flex-col items-center text-center max-w-4xl mx-auto my-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-light tracking-tight mb-4 leading-[1.05]"
          >
            <TextEffect as="span" per="word" preset="blur">Your Gateway to</TextEffect>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl pb-3 font-light bg-gradient-to-r from-[var(--storm-electric)] via-white to-[var(--dawn-glow)] bg-clip-text text-transparent mb-4"
          >
            Global Education
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-slate-300/85 mb-10 max-w-2xl text-base md:text-lg leading-relaxed"
          >
            Expert guidance for your study abroad endeavours across{' '}
            <span className="text-white font-medium">29+ countries</span> including the UK, USA, Canada, Ireland, and Finland.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center"
          >
            <Link
              href="/bookings"
              className="relative inline-flex justify-center items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.6)] hover:shadow-[0_0_60px_-15px_var(--storm-accent-glow)] overflow-hidden group"
            >
              <span className="relative z-10 inline-flex items-center">
                Apply Now - Start Journey
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </span>
              <BorderBeam size={120} duration={8} colorFrom="#7CC8FF" colorTo="#F5B877" />
            </Link>
            <Link
              href="/products"
              className="inline-flex justify-center items-center px-8 py-4 glass-storm text-white font-semibold rounded-xl"
            >
              View Student Plans
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[var(--storm-deep)]/80" />

        {/* Ambient blue → amber dawn halo behind the centerpiece */}
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle at 50% 40%, rgba(124,200,255,0.20) 0%, rgba(30,42,85,0.18) 40%, transparent 70%)' }}
        />

        {/* Lightning shader — full-width vertical beam */}
        <div className="absolute top-0 w-full left-1/2 -translate-x-1/2 h-full">
          <LightningCanvas hue={220} xOffset={0} speed={1.4} intensity={0.55} size={2} />
        </div>

        {/* 3D centerpiece — Spline if configured, else CSS planet */}
        <div className="z-10 absolute top-[60%] left-1/2 -translate-x-1/2 w-[600px] h-[600px]">
          <SplineHero className="w-full h-full" fallbackClassName="w-full h-full" />
        </div>

        {/* Subtle dawn-glow at the very bottom to preview the next phase */}
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, rgba(245,184,119,0.08) 0%, transparent 100%)' }}
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;
