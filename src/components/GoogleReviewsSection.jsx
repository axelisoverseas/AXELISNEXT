'use client';

import React from 'react';
import { Star, ExternalLink, MapPin } from 'lucide-react';
import { googleReviewsMeta, reviews, getGoogleMapsHref } from '../data/googleReviews';

function GoogleG({ size = 22 }) {
    return (
        <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
    );
}

function Stars({ rating, size = 14 }) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    return (
        <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => {
                const filled = i < full || (i === full && half);
                return (
                    <Star
                        key={i}
                        size={size}
                        className={filled ? 'text-[#FBBC05] fill-[#FBBC05]' : 'text-slate-500/60'}
                    />
                );
            })}
        </span>
    );
}

export default function GoogleReviewsSection({ compact = false }) {
    const href = getGoogleMapsHref();
    const shown = reviews.slice(0, compact ? 3 : 6);

    return (
        <section className={`relative ${compact ? 'py-14' : 'py-20'} border-t border-white/5`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header — Google-branded */}
                <div className="text-center mb-10 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white text-slate-900 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] mb-6">
                        <GoogleG size={26} />
                        <div className="text-left">
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-extrabold leading-none">{googleReviewsMeta.rating.toFixed(1)}</span>
                                <Stars rating={googleReviewsMeta.rating} size={16} />
                            </div>
                            <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 mt-0.5">
                                {googleReviewsMeta.totalReviews} Google reviews
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                        What our clients say <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">on Google</span>
                    </h2>
                    <p className="text-slate-300/85 text-sm md:text-base flex items-center justify-center gap-2">
                        <MapPin size={14} className="text-[var(--storm-electric)]" />
                        Verified reviews from our Bilaspur branch
                    </p>
                </div>

                {/* Review cards */}
                <div className={`grid gap-4 md:gap-5 ${compact ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                    {shown.map((r, i) => (
                        <article
                            key={i}
                            className="relative bg-[#0c1428] border-2 border-white/10 hover:border-white/20 rounded-2xl p-5 md:p-6 shadow-[0_20px_60px_-20px_rgba(5,7,15,0.9)] transition-colors flex flex-col"
                        >
                            {/* Google G watermark top-right */}
                            <div className="absolute top-4 right-4 opacity-70">
                                <GoogleG size={20} />
                            </div>

                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--storm-electric)]/40 to-[var(--dawn-glow)]/40 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                    {r.avatarInitials}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-white font-bold text-sm truncate">{r.name}</div>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <Stars rating={r.rating} size={12} />
                                        <span className="text-slate-500 text-[10px]">· {r.relativeDate}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-300/85 text-sm leading-relaxed flex-1">
                                {r.text}
                            </p>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-10">
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-colors shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)]"
                    >
                        <GoogleG size={18} />
                        Read all {googleReviewsMeta.totalReviews} reviews on Google
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </section>
    );
}
