'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Home, MapPin, Shield, Clock, ExternalLink } from 'lucide-react';

export default function AccommodationPage() {

    // Load Amber Student Widget safely on client
    useEffect(() => {
        const scriptId = 'amber-widget-script';

        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://d341zbz41jo7w1.cloudfront.net/widget/list/3.1.0.js';
            script.async = true;
            script.onload = () => {
                if (window._aw) {
                    window._aw('init', {
                        element: document.getElementById('amber-widget'),
                        location: 'london', // Default location
                        partnerId: 'test',
                        fontFamily: 'Inter',
                        sort: 'Recommended',
                        numListings: 6,
                    });
                }
            };
            document.body.appendChild(script);
        } else if (window._aw) {
            window._aw('init', {
                element: document.getElementById('amber-widget'),
                location: 'london',
                partnerId: 'test',
                fontFamily: 'Inter',
                sort: 'Recommended',
                numListings: 6,
            });
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative pt-24 pb-20 bg-slate-900 overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
                        Find Your Perfect <span className="text-blue-400">Student Home</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-10 text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Secure comfortable and affordable student accommodation with our trusted housing partners including <strong>University Living</strong>, <strong>Amber</strong>, and <strong>Casita</strong>.
                    </p>

                    <Link
                        href="/contact"
                        className="inline-flex justify-center items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20"
                    >
                        Get Free Housing Assistance
                        <ArrowRight className="ml-2" size={18} />
                    </Link>
                </div>
            </section>

            {/* Stats Quick View */}
            <section className="py-12 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
                        <div className="px-4">
                            <Home className="mx-auto mb-3 text-blue-500" size={32} />
                            <div className="text-3xl font-bold text-slate-900">3</div>
                            <div className="text-sm font-medium text-slate-500 uppercase">Trusted Partners</div>
                        </div>
                        <div className="px-4">
                            <MapPin className="mx-auto mb-3 text-blue-500" size={32} />
                            <div className="text-3xl font-bold text-slate-900">29+</div>
                            <div className="text-sm font-medium text-slate-500 uppercase">Countries Covered</div>
                        </div>
                        <div className="px-4">
                            <Shield className="mx-auto mb-3 text-blue-500" size={32} />
                            <div className="text-3xl font-bold text-slate-900">100%</div>
                            <div className="text-sm font-medium text-slate-500 uppercase">Verified Properties</div>
                        </div>
                        <div className="px-4">
                            <Clock className="mx-auto mb-3 text-blue-500" size={32} />
                            <div className="text-3xl font-bold text-slate-900">24/7</div>
                            <div className="text-sm font-medium text-slate-500 uppercase">Support Available</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Amber Student Widget Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            Explore Popular Student Housing
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Find and book your perfect student accommodation directly through our partner network.
                        </p>
                    </div>

                    <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden min-h-[500px] border border-slate-200 p-4 sm:p-6">
                        <div id="amber-widget" className="w-full"></div>
                        <div className="amber-link" style={{ textAlign: "center", padding: "10px 0" }}></div>
                    </div>
                </div>
            </section>

            {/* Types of Accommodation */}
            <section className="py-24 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Accommodation Options</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Explore different housing options to find what suits your lifestyle and budget.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* PBSA */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-3xl">🏢</div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">Purpose Built (PBSA)</h3>
                                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">£150 - £350 / week</span>
                                </div>
                            </div>
                            <p className="text-slate-600 mb-6">Modern buildings designed specifically for students, offering great facilities and a vibrant social life.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-blue-500" /><span className="text-slate-700">All bills included (WIFI, Water, Electricity)</span></li>
                                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-blue-500" /><span className="text-slate-700">On-site gym, cinema, and study rooms</span></li>
                                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-blue-500" /><span className="text-slate-700">24/7 Security and maintenance</span></li>
                            </ul>
                        </div>

                        {/* Private Apartments */}
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-3xl">🏠</div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">Private Apartments</h3>
                                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">£180 - £400+ / week</span>
                                </div>
                            </div>
                            <p className="text-slate-600 mb-6">Independent living in private apartments or houses, perfect for those wanting more privacy or living with friends.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-blue-500" /><span className="text-slate-700">More privacy and independence</span></li>
                                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-blue-500" /><span className="text-slate-700">Choose your own location and flatmates</span></li>
                                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-blue-500" /><span className="text-slate-700">Flexible lease terms available</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
