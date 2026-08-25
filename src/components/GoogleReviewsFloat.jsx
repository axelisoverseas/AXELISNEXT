'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star, X, ExternalLink } from 'lucide-react';
import { googleReviewsMeta, reviews, getGoogleMapsHref } from '../data/googleReviews';

// Google "G" logomark — inline SVG so it renders without an external asset.
function GoogleG({ size = 18 }) {
    return (
        <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
    );
}

function Stars({ rating, size = 12 }) {
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

/**
 * Floating Google-Reviews badge. Pill on the bottom-right; click expands to a
 * card with 3-5 recent reviews and a "See all on Google" CTA.
 *
 * Position defaults to bottom-right; pass `position="bottom-left"` to move it
 * (useful when a page already has a floating widget in the right corner).
 */
export default function GoogleReviewsFloat({ position = 'bottom-right' }) {
    const [open, setOpen] = useState(false);
    const panelRef = useRef(null);

    // Close on Escape + click-outside
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        const onClick = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClick);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onClick);
        };
    }, [open]);

    const positionClass = position === 'bottom-left'
        ? 'left-4 md:left-6'
        : 'right-4 md:right-6';

    const href = getGoogleMapsHref();
    const displayReviews = reviews.slice(0, 5);

    return (
        <div className={`fixed bottom-4 md:bottom-6 ${positionClass} z-40`} ref={panelRef}>
            {/* Expanded panel */}
            {open && (
                <div
                    role="dialog"
                    aria-label="Google Reviews for Axelis Overseas Bilaspur"
                    className="mb-3 w-[92vw] max-w-sm bg-[#0c1428] border-2 border-white/15 rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 motion-reduce:animate-none"
                >
                    <header className="flex items-start justify-between gap-3 p-4 border-b border-white/10 bg-white/[0.03]">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                                <GoogleG size={18} />
                            </div>
                            <div className="min-w-0">
                                <div className="text-white text-sm font-bold leading-tight truncate">{googleReviewsMeta.businessName}</div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-white font-bold text-sm">{googleReviewsMeta.rating.toFixed(1)}</span>
                                    <Stars rating={googleReviewsMeta.rating} size={11} />
                                    <span className="text-slate-400 text-xs">({googleReviewsMeta.totalReviews})</span>
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Close reviews"
                            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)]"
                        >
                            <X size={16} />
                        </button>
                    </header>

                    <ul className="max-h-[60vh] overflow-y-auto divide-y divide-white/5">
                        {displayReviews.map((r, i) => (
                            <li key={i} className="p-4">
                                <div className="flex items-center gap-2.5 mb-1.5">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--storm-electric)]/40 to-[var(--dawn-glow)]/40 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                                        {r.avatarInitials}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="text-white text-xs font-semibold truncate">{r.name}</div>
                                        <div className="flex items-center gap-1.5">
                                            <Stars rating={r.rating} size={10} />
                                            <span className="text-slate-500 text-[10px]">· {r.relativeDate}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-300/85 text-xs leading-relaxed">{r.text}</p>
                            </li>
                        ))}
                    </ul>

                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 p-3 border-t border-white/10 bg-white/[0.03] text-[var(--storm-electric)] hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)]"
                    >
                        See all reviews on Google <ExternalLink size={12} />
                    </a>
                </div>
            )}

            {/* Compact pill */}
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={`Google reviews: ${googleReviewsMeta.rating} out of 5 stars, ${googleReviewsMeta.totalReviews} reviews. Click to expand.`}
                className="group inline-flex items-center gap-2.5 pl-2 pr-3.5 py-2 min-h-[44px] bg-white text-slate-900 rounded-full shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--storm-electric)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--storm-deep)]"
            >
                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center ring-1 ring-slate-200 shrink-0">
                    <GoogleG size={16} />
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="font-bold text-sm">{googleReviewsMeta.rating.toFixed(1)}</span>
                    <Stars rating={googleReviewsMeta.rating} size={12} />
                </span>
                <span className="hidden sm:inline text-xs text-slate-600 font-semibold">
                    · {googleReviewsMeta.totalReviews} reviews
                </span>
            </button>
        </div>
    );
}
