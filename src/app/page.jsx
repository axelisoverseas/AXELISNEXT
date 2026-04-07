"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Award, Users, CheckCircle, ChevronDown } from 'lucide-react';

const CobeGlobe = dynamic(() => import('../components/CobeGlobe'), { ssr: false });
const InstagramSuccessStories = dynamic(() => import('../components/InstagramSuccessStories'), { ssr: false });
const YouTubeShorts = dynamic(() => import('../components/YouTubeShorts'), { ssr: false });
const TeamGlobeCarousel = dynamic(() => import('../components/TeamGlobeCarousel'), { ssr: false });
const StudyAbroadGuides = dynamic(() => import('../components/StudyAbroadGuides'), { ssr: false });

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
      {/* Premium Hero Section */}
      <section className="relative w-full pt-24 pb-32 bg-slate-900 border-b border-slate-800">
        {/* Subtle Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop" alt="Campus Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        {/* Original Cyan Cobe Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none mt-20"
        >
          <CobeGlobe size="large" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
        >

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 max-w-4xl">
            Your Gateway to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Global Education</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
            Expert guidance for your study abroad endeavours across <strong className="text-slate-200">29+ Countries</strong> including the UK, USA, Canada, Ireland, and Finland. Zero fees, end-to-end.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/products?redirect=zcf"
              className="inline-flex justify-center items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.6)]"
            >
              Apply Now - Start Journey
            </Link>
            <Link
              href="/products"
              className="inline-flex justify-center items-center px-8 py-4 bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-xl transition-all"
            >
              View Student Plans
            </Link>
          </motion.div>

          {/* Clean Trust Indicators */}
          <motion.div variants={fadeInUp} className="mt-20 pt-10 border-t border-slate-800/80 flex flex-wrap justify-center gap-8 md:gap-16 w-full max-w-4xl">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white tracking-tight">2000+</span>
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Students Placed</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-slate-800"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">₹3+ Cr</span>
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Scholarships</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-slate-800"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white tracking-tight">100%</span>
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Success Rate</span>
            </div>
          </motion.div>
        </motion.div>
      </section>


      {/* Clean Stats Grid */}
      <section className="py-24 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <motion.div variants={fadeInUp} className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:border-blue-500/50 group-hover:text-blue-300 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)]">
                <Globe size={40} />
              </div>
              <span className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">29+</span>
              <span className="text-slate-400 font-medium tracking-wide uppercase text-sm">Countries</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.3)]">
                <Award size={40} />
              </div>
              <span className="text-4xl md:text-5xl font-bold mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">2000+</span>
              <span className="text-slate-400 font-medium tracking-wide uppercase text-sm">Scholarships</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:border-blue-500/50 group-hover:text-blue-300 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)]">
                <Users size={40} />
              </div>
              <span className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">2000+</span>
              <span className="text-slate-400 font-medium tracking-wide uppercase text-sm">Students Sent</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl flex items-center justify-center mb-6 text-green-400 group-hover:border-green-500/50 group-hover:text-green-300 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.3)]">
                <CheckCircle size={40} />
              </div>
              <span className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">100%</span>
              <span className="text-slate-400 font-medium tracking-wide uppercase text-sm">Success Rate</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <TeamGlobeCarousel teamMembers={teamMembers} />

      {/* Social Proof Videos */}
      <InstagramSuccessStories />
      <YouTubeShorts />
      
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Common Questions</h2>
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight relative z-10">Ready to Start Your Journey?</h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl relative z-10 leading-relaxed md:text-left">Connect with our expert counselors today and take the first step towards your global education with zero hidden fees.</p>
              <Link
                href="/products?redirect=zcf"
                className="inline-flex justify-center items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_-15px_rgba(6,182,212,0.7)] text-lg hover:-translate-y-1 relative z-10 group"
              >
                Apply Now - Start Journey
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
