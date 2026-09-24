import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, CheckCircle, GraduationCap, Globe2, BookOpen } from 'lucide-react';
import ScholarshipFinder from '@/components/ScholarshipFinder';
import { BorderBeam } from '@/components/ui/BorderBeam';
import { TextEffect, TextEffectInView } from '@/components/ui/TextEffect';

export const metadata = {
    title: 'Scholarships & Financial Aid',
    alternates: { canonical: '/scholarships' },
    description: 'Access over 2000+ scholarship opportunities worldwide. Secure funding for your international education with Axelis Overseas.',
};

export default function ScholarshipsPage() {
    return (
        <div className="min-h-screen bg-storm-to-dawn">
            {/* Hero Section */}
 <section className="relative pt-32 pb-24 bg-[var(--storm-deep)] overflow-hidden border-b border-[var(--storm-accent)]/20">
                <img
                    src="/photos/photo-1454165804606-c3d57bc86b40-1600.jpg"
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    fetchPriority="high"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)] via-[var(--storm-deep)]/75 to-[var(--storm-deep)]"></div>
                <div className="absolute inset-0 bg-[var(--storm-deep)]/45"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-axelis)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        <TextEffect as="span" per="word" preset="blur">Global</TextEffect>{' '}
                        <span className="text-white">
                            <TextEffect as="span" per="char" preset="blur" delay={0.25}>Scholarship</TextEffect>
                        </span>{' '}
                        <TextEffect as="span" per="word" preset="blur" delay={0.55}>Opportunities</TextEffect>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
                        Access over 2000+ scholarship opportunities worldwide. Partnered with top universities to bring you exclusive Agent Scholarships to fund your global education journey.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link href="#finder" className="btn btn-primary btn-lg relative overflow-hidden flex">
                            <span className="relative z-10 flex items-center">
                                Check Your Eligibility <ArrowRight size={18} className="ml-2" />
                            </span>
                            <BorderBeam size={130} duration={9} colorFrom="#4F80F0" colorTo="#ffffff" />
                        </Link>
                        <Link href="#finder" className="btn btn-primary btn-lg flex">
                            Find Applicable Programs
                        </Link>
                    </div>
                </div>
            </section>

            {/* Financial Highlights */}
 <section className="sec bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-stone-200 hover:shadow-e-2 transition-all text-center group">
                            <div className="w-16 h-16 bg-stone-100 text-stone-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Award size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">2000+ Scholarships</h3>
                            <p className="text-[var(--color-dim)]">Access our exclusive database of merit and need-based scholarships worldwide.</p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-stone-200 hover:shadow-e-2 transition-all text-center group">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Globe2 size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">29+ Countries</h3>
                            <p className="text-[var(--color-dim)]">Funding opportunities spanning Europe, North America, Australia, and Asia.</p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-stone-200 hover:shadow-e-2 transition-all text-center group">
                            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <GraduationCap size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">₹3+ Crores Secured</h3>
                            <p className="text-[var(--color-dim)]">Our students have secured over ₹3 crores in scholarships.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Types of Scholarships */}
 <section className="sec bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <TextEffectInView as="h2" per="word" preset="blur" className="text-3xl font-bold text-slate-900 mb-4">Types of Scholarships Available</TextEffectInView>
                        <p className="text-lg text-[var(--color-dim)] max-w-2xl mx-auto">We assist you in procuring various types of financial aid depending on your profile, academic excellence, and destination choice.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white p-8 rounded-2xl shadow-e-1 border border-slate-100 overflow-hidden">
                            <div className="-mx-8 -mt-8 mb-6 h-32 overflow-hidden">
                                <img
                                    src="/photos/photo-1614935151651-0bea6508db6b-1200.jpg"
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-stone-900 mb-4 border-b border-slate-100 pb-2">Merit-Based Scholarships</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle size={20} className="text-stone-700 mr-3 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">Awarded based on academic excellence, test scores, or outstanding achievements.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle size={20} className="text-stone-700 mr-3 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">Can cover partial or full tuition amounts up to 100%.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-e-1 border border-slate-100 overflow-hidden">
                            <div className="-mx-8 -mt-8 mb-6 h-32 overflow-hidden">
                                <img
                                    src="/photos/photo-1579621970795-87facc2f976d-1200.jpg"
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-emerald-900 mb-4 border-b border-slate-100 pb-2">Need-Based Financial Aid</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle size={20} className="text-emerald-500 mr-3 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">Provided to students who demonstrate specific financial circumstances.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle size={20} className="text-emerald-500 mr-3 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">Often includes living stipends and accommodation discounts.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-e-1 border border-slate-100 overflow-hidden">
                            <div className="-mx-8 -mt-8 mb-6 h-32 overflow-hidden">
                                <img
                                    src="/photos/photo-1541339907198-e08756dedf3f-1200.jpg"
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-purple-900 mb-4 border-b border-slate-100 pb-2">University / Agent Scholarships</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle size={20} className="text-purple-500 mr-3 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">Exclusive scholarships provided by our 1000+ university partners solely for Axelis students.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle size={20} className="text-purple-500 mr-3 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">Agent-channel reductions ranging from £2,000 to £10,000 equivalent.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-e-1 border border-slate-100 overflow-hidden">
                            <div className="-mx-8 -mt-8 mb-6 h-32 overflow-hidden">
                                <img
                                    src="/photos/photo-1589998059171-988d887df646-1200.jpg"
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-amber-900 mb-4 border-b border-slate-100 pb-2">Government / National Grants</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle size={20} className="text-amber-500 mr-3 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">Prestigious scholarships like DAAD (Germany), Chevening (UK), and Fulbright (USA).</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle size={20} className="text-amber-500 mr-3 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">Highly competitive, fully-funded schemes requiring extensive SOP assistance.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scholarship Finder */}
            <ScholarshipFinder />

            {/* CTA */}
 <section className="sec bg-white border-t border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-stone-50 rounded-3xl p-12 border border-stone-100">
                    <TextEffectInView as="h2" per="word" preset="blur" className="text-3xl font-bold text-slate-900 mb-6">Let's Secure Your Funding Together</TextEffectInView>
                    <p className="text-lg text-[var(--color-dim)] mb-8 max-w-2xl mx-auto">
                        Don't let financial constraints stop your study abroad dream. Our Zero Consultation Fee Student Plan covers dedicated scholarship and financial aid assistance.
                    </p>
                    <Link href="/products" className="btn btn-primary btn-lg">
                        Explore Our Student Plans <ArrowRight size={20} className="ml-2" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
