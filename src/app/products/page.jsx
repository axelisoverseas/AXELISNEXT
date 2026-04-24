"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { CheckCircle, Award, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PlanComparison from '../../components/PlanComparison';
import SpatialPlanShowcase from '../../components/ui/SpatialPlanShowcase';
import TestimonialsSection from '../../components/TestimonialsSection';
import { TextEffect } from '../../components/ui/TextEffect';

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
        <div className="min-h-screen bg-storm-to-dawn">
            {/* Clean Hero Section */}
            <section className="relative pt-32 pb-24 bg-[var(--storm-deep)] overflow-hidden border-b border-[var(--storm-electric)]/10">
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
                        <TextEffect as="span" per="word" preset="blur">Choose Your</TextEffect>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Student Plan</span>
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

            {/* ZCF Spatial Showcase */}
            <SpatialPlanShowcase plan="zcf" />

            {/* ZTF Spatial Showcase */}
            <SpatialPlanShowcase plan="ztf" />

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

            {/* What our students say */}
            <TestimonialsSection />

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
