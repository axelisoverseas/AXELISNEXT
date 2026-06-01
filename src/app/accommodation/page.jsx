'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowRight, CheckCircle, Home, MapPin, Shield, Clock, ExternalLink, Search } from 'lucide-react';
import { TextEffect, TextEffectInView } from '../../components/ui/TextEffect';

// Top student cities the amber widget supports as location strings.
// (Amber's location parameter accepts city names verbatim, e.g. "london", "sydney".)
const cities = [
    { label: 'London',     loc: 'london',      country: 'United Kingdom', flag: '🇬🇧', from: '£280/wk',  img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80&auto=format&fit=crop' },
    { label: 'Manchester', loc: 'manchester',  country: 'United Kingdom', flag: '🇬🇧', from: '£165/wk',  img: 'https://images.unsplash.com/photo-1543832923-44667a44c804?w=800&q=80&auto=format&fit=crop' },
    { label: 'Birmingham', loc: 'birmingham',  country: 'United Kingdom', flag: '🇬🇧', from: '£145/wk',  img: 'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?w=800&q=80&auto=format&fit=crop' },
    { label: 'Dublin',     loc: 'dublin',      country: 'Ireland',        flag: '🇮🇪', from: '€220/wk',  img: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?w=800&q=80&auto=format&fit=crop' },
    { label: 'Sydney',     loc: 'sydney',      country: 'Australia',      flag: '🇦🇺', from: 'A$320/wk', img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80&auto=format&fit=crop' },
    { label: 'New York',   loc: 'new york',    country: 'United States',  flag: '🇺🇸', from: '$2,100/mo',img: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&q=80&auto=format&fit=crop' },
];

// Amber widget configuration — real partner ID issued to Axelis Overseas
// (sourced from the unique identifier in our amber sharing link).
const AMBER_PARTNER_ID = '1721030776';
const AMBER_WIDGET_SRC = 'https://d341zbz41jo7w1.cloudfront.net/widget/list/3.1.0.js';
// Canonical Axelis × amber partner profile — all outbound links go here so
// bookings made via direct click-through are attributed to our partnership.
const AMBER_PARTNER_URL = 'https://amberstudent.com/partners/axelis-overseas-1721030776';

export default function AccommodationPage() {
    const [activeLoc, setActiveLoc] = useState('london');
    const [widgetReady, setWidgetReady] = useState(false);

    const initWidget = useCallback((location) => {
        if (typeof window === 'undefined' || typeof window._aw !== 'function') return;
        const el = document.getElementById('amber-widget');
        if (!el) return;
        el.innerHTML = ''; // clear any previous render before re-init
        window._aw('init', {
            element: el,
            location,
            partnerId: AMBER_PARTNER_ID,
            fontFamily: 'Inter',
            sort: 'Recommended',
            numListings: 6,
        });
    }, []);

    // Set up the global _aw queue exactly as Amber's docs require, BEFORE the script loads.
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!window._aw) {
            window._aw = function () {
                (window._aw.q = window._aw.q || []).push(arguments);
            };
        }
    }, []);

    // Once the script is loaded, init the widget for the current city.
    useEffect(() => {
        if (widgetReady) initWidget(activeLoc);
    }, [widgetReady, activeLoc, initWidget]);

    return (
        <div className="min-h-screen bg-storm-to-dawn text-slate-100">
            {/* Amber widget script — loaded via next/script with afterInteractive so it
                runs after hydration but before the user scrolls to the widget. */}
            <Script
                id="amber-widget-script"
                src={AMBER_WIDGET_SRC}
                strategy="afterInteractive"
                onLoad={() => setWidgetReady(true)}
            />

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 overflow-hidden border-b border-[var(--storm-electric)]/10">
                <img
                    src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80&auto=format&fit=crop"
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    fetchPriority="high"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)] via-[var(--storm-deep)]/35 to-[var(--storm-deep)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(5,7,15,0.65)_0%,transparent_75%)]" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* In partnership with — amber's wordmark, lowercase per their brand rules */}
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/8 backdrop-blur border border-white/15 mb-8">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-slate-300 font-bold">In partnership with</span>
                        <a
                            href={AMBER_PARTNER_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="amber student accommodation — Axelis Overseas partner profile (opens in new tab)"
                            className="inline-flex items-center"
                        >
                            <img
                                src="https://prod-static-assets.amberstudent.com/images/amber.svg"
                                alt="amber"
                                className="h-5 w-auto [filter:brightness(0)_invert(1)]"
                            />
                        </a>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
                        <TextEffect as="span" per="word" preset="blur">Find your perfect</TextEffect>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">
                            student home
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl mb-10 text-slate-300/85 max-w-3xl mx-auto leading-relaxed">
                        Live, learn and thrive &mdash; book bills-inclusive student accommodation across <strong className="text-white">29+ countries</strong> through our partnership with <strong className="text-white">amber</strong>, the world&apos;s largest student housing marketplace.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link
                            href="#listings"
                            className="inline-flex justify-center items-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
                        >
                            Browse live listings
                            <ArrowRight className="ml-2" size={18} />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex justify-center items-center px-8 py-4 glass-storm text-white font-bold rounded-xl transition-all hover:text-[var(--storm-electric)]"
                        >
                            Get free housing assistance
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Quick View */}
            <section className="py-12 bg-[var(--storm-deep)]/40 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                        <div className="px-4">
                            <Home className="mx-auto mb-3 text-[var(--storm-electric)]" size={32} />
                            <div className="text-3xl font-bold text-white">1M+</div>
                            <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Rooms on amber</div>
                        </div>
                        <div className="px-4">
                            <MapPin className="mx-auto mb-3 text-[var(--storm-electric)]" size={32} />
                            <div className="text-3xl font-bold text-white">250+</div>
                            <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Student Cities</div>
                        </div>
                        <div className="px-4">
                            <Shield className="mx-auto mb-3 text-[var(--storm-electric)]" size={32} />
                            <div className="text-3xl font-bold text-white">100%</div>
                            <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Verified Properties</div>
                        </div>
                        <div className="px-4">
                            <Clock className="mx-auto mb-3 text-[var(--storm-electric)]" size={32} />
                            <div className="text-3xl font-bold text-white">24/7</div>
                            <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Support Available</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Amber widget embed — official integration per Amber's docs */}
            <section id="listings" className="py-20 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 max-w-2xl mx-auto">
                        <TextEffectInView as="h2" per="word" preset="blur" className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                            Live student housing &mdash; book in minutes
                        </TextEffectInView>
                        <p className="text-slate-300/85">
                            Real inventory streamed from amber. Switch the city below to retarget the listings.
                        </p>
                    </div>

                    {/* City switcher — re-inits widget with the selected location */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Select a city">
                        {cities.map((c) => {
                            const isActive = activeLoc === c.loc;
                            return (
                                <button
                                    key={c.loc}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActiveLoc(c.loc)}
                                    className={`inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full text-sm font-semibold transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)] ${
                                        isActive
                                            ? 'bg-[var(--storm-electric)] border-[var(--storm-electric)] text-[var(--storm-deep)]'
                                            : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-white/25'
                                    }`}
                                >
                                    <span aria-hidden="true">{c.flag}</span>
                                    <span>{c.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Widget container — required ID per amber's docs */}
                    <div className="w-full bg-[#0c1428] rounded-2xl border-2 border-white/10 shadow-[0_20px_60px_-20px_rgba(5,7,15,0.9)] overflow-hidden p-4 sm:p-6 min-h-[520px]">
                        <div id="amber-widget" className="w-full min-h-[480px]" />
                        <div className="amber-link" style={{ textAlign: 'center', padding: '10px 0' }} />

                        {/* Lightweight fallback shown until the widget paints — also acts as a noscript surface */}
                        {!widgetReady && (
                            <div className="flex flex-col items-center justify-center py-16 text-center" aria-hidden="true">
                                <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-[var(--storm-electric)] animate-spin mb-4" />
                                <p className="text-slate-300 text-sm">Loading live amber listings for {cities.find((c) => c.loc === activeLoc)?.label}&hellip;</p>
                                <p className="text-slate-500 text-xs mt-2">
                                    Or open our{' '}
                                    <a
                                        href={AMBER_PARTNER_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline hover:text-[var(--storm-electric)]"
                                    >
                                        amber partner page
                                    </a>{' '}
                                    directly.
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-center text-xs text-slate-400 mt-6">
                        Listings powered by{' '}
                        <a
                            href={AMBER_PARTNER_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--storm-electric)] hover:underline font-semibold inline-flex items-center gap-1"
                        >
                            amber &times; Axelis Overseas <ExternalLink size={11} />
                        </a>
                        . Prices and availability shown live from amber.
                    </p>
                </div>
            </section>

            {/* Popular Cities photo grid — visual destination teasers */}
            <section className="py-20 bg-[var(--storm-deep)]/40 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                            Where our students live
                        </h2>
                        <p className="text-slate-300/85">
                            Click any city to pull live amber inventory above.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                        {cities.map((c) => (
                            <button
                                key={c.loc}
                                type="button"
                                onClick={() => {
                                    setActiveLoc(c.loc);
                                    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 hover:border-[var(--storm-electric)]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)] text-left"
                                aria-label={`Load amber listings for ${c.label}, ${c.country}`}
                            >
                                <img
                                    src={c.img}
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    decoding="async"
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--storm-deep)] via-[var(--storm-deep)]/45 to-transparent" />

                                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-[var(--storm-deep)]/80 backdrop-blur border border-white/15 text-[10px] font-bold uppercase tracking-wider text-[var(--dawn-glow)]">
                                    from {c.from}
                                </div>

                                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span aria-hidden="true" className="text-base">{c.flag}</span>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300 font-bold">{c.country}</span>
                                    </div>
                                    <h3 className="text-white text-lg md:text-xl font-bold leading-tight flex items-center gap-2">
                                        {c.label}
                                        <Search size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--storm-electric)]" />
                                    </h3>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Types of Accommodation */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <TextEffectInView as="h2" per="word" preset="blur" className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                            Accommodation options
                        </TextEffectInView>
                        <p className="text-lg text-slate-300/85 max-w-2xl mx-auto">
                            Two main routes &mdash; both legitimate, both supported by our team for contract review and arrival logistics.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* PBSA */}
                        <div className="bg-[#0c1428] border-2 border-white/10 rounded-2xl p-8 overflow-hidden shadow-[0_20px_60px_-20px_rgba(5,7,15,0.9)]">
                            <div className="-mx-8 -mt-8 mb-6 h-40 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80&auto=format&fit=crop"
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-[var(--storm-electric)] to-blue-500 rounded-2xl flex items-center justify-center text-[var(--storm-deep)] text-3xl" aria-hidden="true">🏢</div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Purpose Built (PBSA)</h3>
                                    <span className="text-sm font-semibold text-[var(--storm-electric)] bg-[var(--storm-electric)]/10 px-3 py-1 rounded-full border border-[var(--storm-electric)]/30 inline-block mt-1">£150 &ndash; £350 / week</span>
                                </div>
                            </div>
                            <p className="text-slate-300/85 mb-6">Modern buildings designed specifically for students, with facilities and a vibrant social life baked in.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--storm-electric)] shrink-0" /><span className="text-slate-200">All bills included (Wi-Fi, water, electricity)</span></li>
                                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--storm-electric)] shrink-0" /><span className="text-slate-200">On-site gym, cinema and study rooms</span></li>
                                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--storm-electric)] shrink-0" /><span className="text-slate-200">24/7 security and maintenance</span></li>
                            </ul>
                        </div>

                        {/* Private Apartments */}
                        <div className="bg-[#0c1428] border-2 border-white/10 rounded-2xl p-8 overflow-hidden shadow-[0_20px_60px_-20px_rgba(5,7,15,0.9)]">
                            <div className="-mx-8 -mt-8 mb-6 h-40 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80&auto=format&fit=crop"
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-[var(--dawn-glow)] to-amber-500 rounded-2xl flex items-center justify-center text-[var(--storm-deep)] text-3xl" aria-hidden="true">🏠</div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Private Apartments</h3>
                                    <span className="text-sm font-semibold text-[var(--dawn-glow)] bg-[var(--dawn-glow)]/10 px-3 py-1 rounded-full border border-[var(--dawn-glow)]/30 inline-block mt-1">£180 &ndash; £400+ / week</span>
                                </div>
                            </div>
                            <p className="text-slate-300/85 mb-6">Independent living &mdash; full apartments or houses for students who want privacy or a flatmate setup with friends.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--dawn-glow)] shrink-0" /><span className="text-slate-200">More privacy and independence</span></li>
                                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--dawn-glow)] shrink-0" /><span className="text-slate-200">Choose your own location and flatmates</span></li>
                                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-[var(--dawn-glow)] shrink-0" /><span className="text-slate-200">Flexible lease terms available</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 border-t border-white/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">Not sure where to start?</h2>
                    <p className="text-lg text-slate-300/85 mb-8 max-w-2xl mx-auto">
                        Send us your offer letter and city &mdash; a counsellor will shortlist three amber options, contract-checked and budget-fit, within 48 hours. Free.
                    </p>
                    <Link
                        href="/bookings"
                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
                    >
                        Talk to a housing counsellor
                        <ArrowRight className="ml-2" size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
