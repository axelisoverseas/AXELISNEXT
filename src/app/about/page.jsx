'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Eye, Users, Award, Globe, Heart, Play } from 'lucide-react';
import { BorderBeam } from '@/components/ui/BorderBeam';
import { TextEffect, TextEffectInView } from '@/components/ui/TextEffect';

// Static Data specific to this page can be imported or mock-provided for Next.js 
// We simplify it here to reduce file boilerplate, but keeping true to Axelis narrative
const stats = [
    { icon: <Globe size={32} />, value: '29+', label: 'Countries' },
    { icon: <Award size={32} />, value: '2000+', label: 'Scholarships' },
    { icon: <Users size={32} />, value: '500+', label: 'Students Sent' },
    { icon: <Heart size={32} />, value: '100%', label: 'Free Service' }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-storm-to-dawn">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 bg-slate-900 overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Minimal Logo Integration */}
                    <div className="mb-10 flex justify-center">
                        <Image
                            src="/1yellow svg logoaxelis.svg"
                            alt="Axelis Overseas Logo"
                            width={180}
                            height={60}
                            className="brightness-0 invert opacity-90"
                        />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                        <TextEffect as="span" per="word" preset="blur">About</TextEffect>{' '}
                        <span className="text-blue-400">
                            <TextEffect as="span" per="char" preset="blur" delay={0.25}>Axelis Overseas</TextEffect>
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Your trusted partner in making study abroad dreams come true.
                    </p>
                </div>
            </section>

            {/* Welcome & Stats Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Narrative Content */}
                        <div className="space-y-8">
                            <div>
                                <TextEffectInView as="h2" per="word" preset="blur" className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                                    About Axelis Overseas
                                </TextEffectInView>
                                <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                                    <p>
                                        We are a study abroad consultancy run by counsellors who studied abroad themselves.
                                        Our day job is matching Indian students with universities they can actually get into and afford.
                                    </p>
                                    <p>
                                        We work across 29+ countries &mdash; UK, USA, Canada, Ireland, Finland, Germany, France, Australia and more.
                                        Public tuition-free options are flagged where they exist, and full scholarships are searched first
                                        before any out-of-pocket plan is recommended.
                                    </p>
                                    <p>
                                        The first call is free. Plan fees and refund terms are listed openly on the Student Plans page.
                                        No hidden charges, no upsell scripts.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Minimal Grid Stats Moved Under Text */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 px-4 py-8 text-center hover:bg-white hover:border-blue-200 transition-colors shadow-sm hover:shadow-md">
                                        <div className="mx-auto mb-3 text-blue-600 flex justify-center">
                                            {stat.icon}
                                        </div>
                                        <div className="text-2xl font-extrabold text-slate-900 mb-1">{stat.value}</div>
                                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image Content Right Side */}
                        <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" alt="Students walking on campus" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                            {/* Overlay Badge */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
                                <p className="text-slate-800 font-bold text-lg mb-1">Global Education</p>
                                <p className="text-slate-600 text-sm">First counselling call is free. Always.</p>
                            </div>
                        </div>



                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        {/* Mission Card */}
                        <div className="bg-white p-10 md:p-12 rounded-3xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl p-3 shrink-0">
                                    <Target size={28} />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Our Mission</h3>
                            </div>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Make a real, debt-free study abroad route the default option for Indian students &mdash;
                                not a luxury reserved for those who can pay agency markups on top of tuition.
                            </p>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-white p-10 md:p-12 rounded-3xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl p-3 shrink-0">
                                    <Eye size={28} />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Our Vision</h3>
                            </div>
                            <p className="text-slate-600 text-lg leading-relaxed">
                                Be the consultancy where the counsellor on the other end has actually lived through what the student is about to do.
                                If we can&apos;t honestly help, we say so &mdash; and we say so first, not last.
                            </p>
                        </div>
                    </div>

                    {/* Podcast CTA */}
                    <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl mt-12 flex flex-col md:flex-row relative">
                        <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Hear The Untold Stories
                            </h3>
                            <p className="text-slate-300 mb-10 text-lg">
                                Discover the real-world experiences, strategies, and successes from students who have navigated the path before you.
                            </p>
                            <a
                                href="https://www.youtube.com/@axelisoverseas"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl transition-all shadow-lg text-lg group self-start"
                            >
                                <Play className="mr-3 text-cyan-400 group-hover:scale-110 transition-transform" size={24} fill="currentColor" />
                                Watch Our YouTube Podcast
                            </a>
                        </div>
                        <div className="md:w-1/2 min-h-[300px] relative">
                            <img src="https://images.unsplash.com/photo-1581368135153-a506cf13b1e1?q=80&w=1000&auto=format&fit=crop" alt="Podcast Recording" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r md:from-slate-900 md:to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Clean Final CTA */}
            <section className="py-32 bg-slate-900 text-center border-t border-slate-800">
                <div className="max-w-3xl mx-auto px-4">
                    <TextEffectInView as="h2" per="word" preset="blur" className="text-4xl font-extrabold text-white mb-6 tracking-tight">Ready to Transform Your Future?</TextEffectInView>
                    <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Let us help you turn your study abroad dreams into reality with our expert guidance.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="https://calendly.com/axelisoverseas/counsellingsession"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative overflow-hidden inline-flex justify-center items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg"
                        >
                            <span className="relative z-10">Book Your Counselling Call Today</span>
                            <BorderBeam size={140} duration={9} colorFrom="#22d3ee" colorTo="#ffffff" />
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}
