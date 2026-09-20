'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Eye, Play } from 'lucide-react';
import { BorderBeam } from '@/components/ui/BorderBeam';
import { TextEffect, TextEffectInView } from '@/components/ui/TextEffect';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-storm-to-dawn">
            {/* Hero Section */}
 <section className="relative pt-24 pb-16 bg-[var(--color-tint)] overflow-hidden border-b border-[var(--color-rule)]">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-axelis)]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Minimal Logo Integration */}
                    <div className="mb-10 flex justify-center">
                        <Image
                            src="/1navy svg logoaxelis.svg"
                            alt="Axelis Overseas Logo"
                            width={180}
                            height={60}
                            className="opacity-90"
                        />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-navy)] mb-6 tracking-tight text-balance">
                        <TextEffect as="span" per="word" preset="blur">About</TextEffect>{' '}
                        <span className="text-[var(--color-navy)]">
                            <TextEffect as="span" per="char" preset="blur" delay={0.25}>Axelis Overseas</TextEffect>
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-[var(--color-dim)] max-w-3xl mx-auto leading-relaxed font-light">
                        Your trusted partner in making study abroad dreams come true.
                    </p>
                </div>
            </section>

            {/* Welcome & Stats Section */}
 <section className="sec bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Narrative Content */}
                        <div className="space-y-8">
                            <div>
                                <TextEffectInView as="h2" per="word" preset="blur" className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                                    About Axelis Overseas
                                </TextEffectInView>
                                <div className="space-y-6 text-[var(--color-dim)] text-lg leading-relaxed">
                                    <p>
                                        We are a study abroad consultancy run by counsellors who studied abroad themselves.
                                        Our day job is matching Indian students with universities they can actually get into and afford.
                                    </p>
                                    <p>
                                        We work across 29+ countries: UK, USA, Canada, Ireland, Finland, Germany, France, Australia and more.
                                        Public tuition-free options are flagged where they exist, and full scholarships are searched first
                                        before any out-of-pocket plan is recommended.
                                    </p>
                                    <p>
                                        The first call is free. Plan fees and refund terms are listed openly on the Student Plans page.
                                        No hidden charges, no upsell scripts.
                                    </p>
                                </div>
                            </div>
                            
                            {/* The headline numbers live on the home page. */}
                            <p className="text-[var(--color-dim)]">
                                <Link href="/" className="text-[var(--color-axelis)] underline underline-offset-2">
                                    See the numbers behind that
                                </Link>{' '}
                                &mdash; students placed, countries, scholarships won.
                            </p>
                        </div>

                        {/* Image Content Right Side */}
                        <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden shadow-e-3">
                            <img src="/photos/photo-1523240795612-9a054b0db644-1000.jpg" alt="Students walking on campus" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                            {/* Overlay Badge */}
                            <div className="absolute bottom-6 left-6 right-6 bg-[var(--color-tint)] backdrop-blur-md rounded-2xl p-6 shadow-e-2 border border-[var(--color-rule)]">
                                <p className="text-slate-800 font-bold text-lg mb-1">Global Education</p>
                                <p className="text-[var(--color-dim)] text-sm">First counselling call is free. Always.</p>
                            </div>
                        </div>



                    </div>
                </div>
            </section>

            {/* Scale & Scope */}
 <section className="sec bg-white border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-5 text-balance">
                        Scale and scope
                    </h2>
                    <p className="text-lg text-[var(--color-dim)] leading-relaxed">
                        Axelis operates from a Bengaluru corporate office (WorkFlo, KR Puram Hobli) with a registered
                        office in Bilaspur, and runs its certification programmes across 29 study-abroad destination
                        markets, with an in-house language and application coaching faculty.
                    </p>
                </div>
            </section>

            {/* Mission & Vision Section */}
 <section className="sec bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        {/* Mission Card */}
                        <div className="bg-white p-10 md:p-12 rounded-3xl shadow-e-1 border border-slate-200">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-stone-50 text-stone-900 flex items-center justify-center rounded-xl p-3 shrink-0">
                                    <Target size={28} />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Our Mission</h3>
                            </div>
                            <p className="text-[var(--color-dim)] text-lg leading-relaxed">
                                Make a real, debt-free study abroad route the default option for Indian students
                                not a luxury reserved for those who can pay agency markups on top of tuition.
                            </p>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-white p-10 md:p-12 rounded-3xl shadow-e-1 border border-slate-200">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-stone-50 text-stone-900 flex items-center justify-center rounded-xl p-3 shrink-0">
                                    <Eye size={28} />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Our Vision</h3>
                            </div>
                            <p className="text-[var(--color-dim)] text-lg leading-relaxed">
                                Be the consultancy where the counsellor on the other end has actually lived through what the student is about to do.
                                If we can&apos;t honestly help, we say so, and we say so first, not last.
                            </p>
                        </div>
                    </div>

                    {/* Podcast CTA */}
                    <div className="bg-[var(--color-tint)] rounded-[2.5rem] overflow-hidden shadow-e-3 mt-12 flex flex-col md:flex-row relative">
                        <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-navy)] mb-6">
                                Hear The Untold Stories
                            </h3>
                            <p className="text-[var(--color-navy)] mb-10 text-lg">
                                Discover the real-world experiences, strategies, and successes from students who have navigated the path before you.
                            </p>
                            <a
                                href="https://www.youtube.com/@axelisoverseas"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl transition-all shadow-e-2 text-lg group self-start"
                            >
                                <Play className="mr-3 text-[var(--color-navy)] group-hover:scale-110 transition-transform" size={24} fill="currentColor" />
                                Watch Our YouTube Podcast
                            </a>
                        </div>
                        <div className="md:w-1/2 min-h-[300px] relative">
                            <img src="/photos/photo-1581368135153-a506cf13b1e1-1000.jpg" alt="Podcast Recording" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r md:from-slate-900 md:to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Clean Final CTA */}
 <section className="sec-lg bg-[var(--color-tint)] text-center border-t border-[var(--color-rule)]" data-section="cta">
                <div className="max-w-3xl mx-auto px-4">
                    <TextEffectInView as="h2" per="word" preset="blur" className="text-4xl font-extrabold text-[var(--color-navy)] mb-6 tracking-tight">Ready to Transform Your Future?</TextEffectInView>
                    <p className="text-lg text-[var(--color-dim)] mb-10 leading-relaxed max-w-2xl mx-auto">
                        Let us help you turn your study abroad dreams into reality with our expert guidance.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="https://calendly.com/axelisoverseas/counsellingsession"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-lg relative overflow-hidden"
                        >
                            <span className="relative z-10">Book Your Counselling Call Today</span>
                            <BorderBeam size={140} duration={9} colorFrom="#4F80F0" colorTo="#ffffff" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Legal / corporate strip */}
 <section className="py-8 bg-slate-950 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-xs text-[var(--color-dim-dark)] text-center leading-relaxed">
                        Axelis Overseas Education Pvt Ltd. CIN U85500CT2023PTC014913 
                        MCC 8299 (Educational Services). Registered under the Companies Act 2013
                        in the Republic of India.
                    </p>
                </div>
            </section>

        </div>
    );
}
