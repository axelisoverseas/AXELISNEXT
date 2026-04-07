"use client";
import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { ArrowRight, CheckCircle, Shield, Award, Globe2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import RazorpayEmbed from '../../components/RazorpayEmbed';
import PlanComparison from '../../components/PlanComparison';
import { allCountries, europeanCountries } from '../../data/siteData';

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

function ProductsContent() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const redirect = searchParams.get('redirect');
        if (redirect === 'zcf') {
            // Log for tracking, then redirect to ZCF Razorpay
            console.log('🚀 Auto-redirecting to ZCF Student Plan checkout...');
            window.location.href = "https://pages.razorpay.com/pl_Rk1qpiuEJifDx1/view";
        } else if (redirect === 'ztf') {
            // Log for tracking, then redirect to ZTF Razorpay
            console.log('🚀 Auto-redirecting to ZTF Student Plan checkout...');
            window.location.href = "https://pages.razorpay.com/pl_Rk1J9M0s2qvgUz/view";
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Clean Hero Section */}
            <section className="relative pt-32 pb-24 bg-slate-900 overflow-hidden border-b border-slate-800">
                {/* Hero Background Image */}
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2000&auto=format&fit=crop" alt="University Campus" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                >
                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Student Plan</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-lg md:text-xl mb-12 text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        No hidden charges, transparent pricing, guaranteed results, and comprehensive support for your international education journey.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-700/50 shadow-lg text-slate-300 transition-all hover:bg-slate-800 hover:border-blue-500/30">
                            <CheckCircle size={18} className="text-blue-400" />
                            <span className="text-sm font-semibold">2000+ Students</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-700/50 shadow-lg text-slate-300 transition-all hover:bg-slate-800 hover:border-blue-500/30">
                            <Globe2 size={18} className="text-blue-400" />
                            <span className="text-sm font-semibold">29+ Countries</span>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-700/50 shadow-lg text-slate-300 transition-all hover:bg-slate-800 hover:border-blue-500/30">
                            <Award size={18} className="text-blue-400" />
                            <span className="text-sm font-semibold">2000+ Scholarships</span>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Pricing Cards Section */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 mb-6 shadow-sm">
                            <Shield className="text-blue-600" size={16} />
                            <span className="text-blue-800 font-semibold text-sm">100% Transparent Pricing</span>
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">Our Student Plans</motion.h2>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
                        {/* ZCF Student Plan */}
                        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200/80 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden group"
                            >
                                <img src="https://images.unsplash.com/photo-1546415821-ed18b2cba723?q=80&w=800&auto=format&fit=crop" alt="Study abroad USA" className="absolute top-0 w-full left-0 h-56 object-cover opacity-5 group-hover:opacity-15 transition-opacity duration-500 z-0 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }} />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>
                                <div className="absolute top-0 right-0 bg-blue-100 text-blue-700 px-5 py-2.5 rounded-bl-2xl rounded-tr-[2rem] font-bold text-sm tracking-wide z-10 shadow-sm border-b border-l border-blue-200/50">
                                    Most Popular
                                </div>
                                <div className="text-center mb-8 pt-6 relative z-10">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                                        <span className="text-3xl block">🎓</span>
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">ZCF Student Plan</h3>
                                    <div className="flex flex-wrap justify-center gap-1.5 mb-6 max-w-lg mx-auto px-2">
                                        {allCountries.map((country) => (
                                            <div key={country.code} className="flex items-center gap-1 px-2 py-0.5 bg-blue-50/50 text-blue-700 rounded-md border border-blue-100/30 text-[9px] font-bold shadow-sm hover:bg-blue-100/50 transition-colors cursor-default uppercase">
                                                <span className="text-xs">{country.flag}</span>
                                                <span className="tracking-tighter whitespace-nowrap">{country.name === "United Kingdom" ? "UK" : country.name === "United States" ? "USA" : country.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 mb-8">
                                        <div className="flex items-center justify-center gap-3 mb-2">
                                            <span className="text-slate-400 line-through text-lg font-medium">₹19,999</span>
                                            <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm border border-rose-200">50% OFF</span>
                                        </div>
                                        <div className="text-5xl font-extrabold text-slate-900 tracking-tight mb-2">₹9,999</div>
                                        <p className="text-slate-500 font-medium text-sm uppercase tracking-wider">Onboarding Fee</p>
                                    </div>

                                    <div className="bg-slate-50/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200 shadow-inner">
                                        <p className="font-bold text-slate-800 mb-1">100% Refundable Deposit</p>
                                        <p className="text-sm text-slate-600 font-medium">Fully refunded once your student visa is approved, or if you receive NO offer.</p>
                                    </div>
                                </div>

                                <div className="flex-grow relative z-10 w-full">
                                    <h4 className="font-bold text-slate-900 mb-5 flex items-center border-b border-slate-100 pb-3 uppercase tracking-wider text-sm">
                                        Key Features
                                    </h4>
                                    <ul className="space-y-4 mb-8">
                                        <li className="flex items-start gap-4">
                                            <div className="bg-blue-100 p-1 rounded-full shrink-0 mt-0.5">
                                                <CheckCircle className="text-blue-600" size={16} strokeWidth={3} />
                                            </div>
                                            <span className="text-slate-700 font-medium">Expert University Shortlisting & Status Tracker</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-blue-100 p-1 rounded-full shrink-0 mt-0.5">
                                                <CheckCircle className="text-blue-600" size={16} strokeWidth={3} />
                                            </div>
                                            <span className="text-slate-700 font-medium">SOP, LOR & Europass CV Assistance</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-blue-100 p-1 rounded-full shrink-0 mt-0.5">
                                                <CheckCircle className="text-blue-600" size={16} strokeWidth={3} />
                                            </div>
                                            <span className="text-slate-700 font-medium">Comprehensive Visa Guidance & Scholarships</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-auto w-full relative z-10 pt-6">
                                    <RazorpayEmbed url="https://pages.razorpay.com/pl_Rk1qpiuEJifDx1/view" text="Enroll Now - ₹9,999" />
                                    <p className="text-xs text-slate-500 font-medium text-center mt-5 flex items-center justify-center gap-2">
                                        <Shield size={12} /> Secure payment via Razorpay • 100% Refundable
                                    </p>
                                </div>
                            </motion.div>
                        </Tilt>

                        {/* ZTF Student Plan */}
                        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative bg-slate-900 rounded-[2rem] p-8 md:p-10 border border-slate-700 shadow-2xl flex flex-col h-full overflow-hidden group"
                            >
                                <img src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop" alt="European studies" className="absolute top-0 w-full left-0 h-56 object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-0 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' }} />
                                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none"></div>
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 z-10"></div>
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-bl-2xl rounded-tr-[2rem] font-bold text-sm tracking-wide z-10 shadow-lg">
                                    Premium Focus
                                </div>
                                <div className="text-center mb-8 pt-6 relative z-10">
                                    <div className="w-16 h-16 bg-blue-900/30 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                                        <span className="text-3xl block">🏆</span>
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">ZTF Student Plan</h3>
                                    <div className="flex flex-wrap justify-center gap-1.5 mb-6 max-w-lg mx-auto px-2">
                                        {europeanCountries.map((country) => (
                                            <div key={country.code} className="flex items-center gap-1 px-2 py-0.5 bg-blue-900/40 text-cyan-300 rounded-md border border-blue-500/10 text-[9px] font-bold shadow-sm hover:bg-blue-800/60 transition-colors cursor-default uppercase">
                                                <span className="text-xs">{country.flag}</span>
                                                <span className="tracking-tighter whitespace-nowrap">{country.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 mb-8">
                                        <div className="flex items-center justify-center gap-3 mb-2">
                                            <span className="text-slate-400 line-through text-lg font-medium">₹39,998</span>
                                            <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm border border-cyan-500/30">50% OFF</span>
                                        </div>
                                        <div className="text-5xl font-extrabold text-white tracking-tight mb-2 drop-shadow-md">₹19,999</div>
                                        <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">Service Fee</p>
                                    </div>

                                    <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-4 border border-slate-700 shadow-inner">
                                        <p className="text-sm text-slate-300 font-medium">₹19,999 fee is refundable if no offers are received.</p>
                                    </div>
                                </div>

                                <div className="flex-grow relative z-10 w-full">
                                    <h4 className="font-bold text-white mb-5 flex items-center border-b border-slate-800 pb-3 uppercase tracking-wider text-sm">
                                        Key Features
                                    </h4>
                                    <ul className="space-y-4 mb-8">
                                        <li className="flex items-start gap-4">
                                            <div className="bg-cyan-500/20 p-1 rounded-full shrink-0 mt-0.5">
                                                <CheckCircle className="text-cyan-400" size={16} strokeWidth={3} />
                                            </div>
                                            <span className="text-slate-200 font-medium">Admission to Tuition-Free Public Universities</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-cyan-500/20 p-1 rounded-full shrink-0 mt-0.5">
                                                <CheckCircle className="text-cyan-400" size={16} strokeWidth={3} />
                                            </div>
                                            <span className="text-slate-200 font-medium">End-to-End Admission & Visa Support</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-cyan-500/20 p-1 rounded-full shrink-0 mt-0.5">
                                                <CheckCircle className="text-cyan-400" size={16} strokeWidth={3} />
                                            </div>
                                            <span className="text-slate-200 font-medium">Housing & Part-time Job Guidance</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-auto w-full relative z-10 pt-6">
                                    <RazorpayEmbed url="https://pages.razorpay.com/pl_Rk1J9M0s2qvgUz/view" text="Enroll Now - ₹19,999" />
                                    <p className="text-xs text-slate-400 font-medium text-center mt-5 flex items-center justify-center gap-2">
                                        <Shield size={12} className="text-slate-500" /> Secure payment via Razorpay • Conditional Refund
                                    </p>
                                </div>
                            </motion.div>
                        </Tilt>
                    </div>
                </div>
            </section>

            {/* Student Plan Comparison Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                id="student-plan-comparison"
            >
                <PlanComparison />
            </motion.div>



        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
