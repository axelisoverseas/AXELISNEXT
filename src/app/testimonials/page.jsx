"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, Star, MapPin, GraduationCap } from 'lucide-react';
import { testimonials } from '../../data/siteData';

const TestimonialRealisticGlobe = dynamic(
  () => import('../../components/TestimonialRealisticGlobe'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] rounded-2xl glass-storm flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-2 border-[var(--storm-electric)]/40 border-t-[var(--storm-electric)] rounded-full" />
      </div>
    ),
  }
);

const countryFlags = {
  USA: '🇺🇸', UK: '🇬🇧', Canada: '🇨🇦', Australia: '🇦🇺',
  Germany: '🇩🇪', France: '🇫🇷', Netherlands: '🇳🇱', Sweden: '🇸🇪',
  Norway: '🇳🇴', Ireland: '🇮🇪', Denmark: '🇩🇰', Finland: '🇫🇮',
  Switzerland: '🇨🇭', Italy: '🇮🇹', Spain: '🇪🇸', Japan: '🇯🇵',
};

function TestimonialCard({ testimonial, index, onCountryFocus }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  }, []);

  return (
    <div
      data-testimonial-id={testimonial.id}
      className="group relative glass-storm p-6 cursor-pointer transition-all duration-200 hover:scale-[1.015]"
      onMouseEnter={() => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setIsExpanded(true);
        if (onCountryFocus) onCountryFocus(testimonial.country);
      }}
      onMouseLeave={() => {
        hoverTimeoutRef.current = setTimeout(() => {
          setIsExpanded(false);
          if (onCountryFocus) onCountryFocus(null);
        }, 150);
      }}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className={`absolute -top-2 -right-2 text-2xl transition-transform duration-150 ${isExpanded ? 'scale-125 rotate-12' : ''}`}>
        {countryFlags[testimonial.country] || '🌍'}
      </div>

      <div className="relative flex items-start space-x-4">
        {testimonial.image && (
          <div className="flex-shrink-0">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className={`w-16 h-16 rounded-full border-2 object-cover transition-all duration-200 ${isExpanded ? 'border-[var(--storm-electric)] shadow-lg shadow-[var(--storm-electric)]/30' : 'border-white/20'}`}
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-1">
              <h3 className={`text-lg font-bold mb-1 transition-colors ${isExpanded ? 'text-white' : 'text-[var(--storm-electric)]'}`}>
                {testimonial.name}
              </h3>
              <div className="flex items-center text-sky-200/85 text-sm mb-1">
                <GraduationCap className="w-4 h-4 mr-1.5" />
                <span>{testimonial.course}</span>
              </div>
              <div className="text-white/85 text-sm">{testimonial.university}</div>
              <div className="flex items-center text-white/55 text-sm mt-1">
                <MapPin className="w-3 h-3 mr-1.5" />
                <span>{testimonial.country}</span>
              </div>
            </div>

            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[var(--dawn-glow)] fill-current" />
              ))}
            </div>
          </div>

          <div className={`text-white/85 text-sm leading-relaxed transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-16 overflow-hidden'}`}>
            <span className="text-[var(--storm-electric)]/80 font-medium">&ldquo;</span>
            {testimonial.content}
            <span className="text-[var(--storm-electric)]/80 font-medium">&rdquo;</span>
          </div>

          {!isExpanded && testimonial.content.length > 100 && (
            <div className="text-sky-300/70 text-xs mt-2">Hover to read more</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const globeRef = useRef(null);

  const handleCountryFocus = useCallback((country) => {
    if (!globeRef.current) return;
    if (country) globeRef.current.focusOnCountry(country);
    else globeRef.current.clearCountryFocus();
  }, []);

  useEffect(() => {
    const handler = (event) => {
      const { testimonial } = event.detail || {};
      if (!testimonial) return;
      const el = document.querySelector(`[data-testimonial-id="${testimonial.id}"]`);
      if (!el) return;
      const scrollContainer = el.closest('.testimonial-scroller');
      if (scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const elementRect = el.getBoundingClientRect();
        const targetScrollTop = scrollContainer.scrollTop + (elementRect.top - containerRect.top) - (containerRect.height / 2) + (elementRect.height / 2);
        scrollContainer.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      el.classList.add('ring-2', 'ring-[var(--storm-electric)]', 'ring-opacity-80');
      setTimeout(() => el.classList.remove('ring-2', 'ring-[var(--storm-electric)]', 'ring-opacity-80'), 2200);
    };
    window.addEventListener('testimonialSelect', handler);
    return () => window.removeEventListener('testimonialSelect', handler);
  }, []);

  const uniqueCountries = [...new Set(testimonials.map((t) => t.country))].length;

  return (
    <div className="min-h-screen text-slate-100">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[var(--storm-electric)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[var(--dawn-glow)]/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--storm-electric)]/10 border border-[var(--storm-electric)]/20 text-[var(--storm-electric)] text-xs font-bold tracking-wide uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--storm-electric)]" />
            Real placements, named students
          </span>
          <div className="flex justify-center mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="text-[var(--dawn-glow)] fill-current" size={26} />
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Students around the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">globe</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed">
            Real placements across {uniqueCountries}+ countries. Hover any story and the globe flies to where they actually ended up.
          </p>
        </div>
      </section>

      <section className="relative pb-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="lg:sticky lg:top-28">
              <TestimonialRealisticGlobe
                ref={globeRef}
                testimonials={testimonials}
                onCountryFocus={handleCountryFocus}
              />
            </div>

            <div className="relative">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Real student <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">experiences</span>
                </h2>
                <p className="text-sky-200/80 text-sm">Hover a card to rotate the globe to that country.</p>
              </div>

              <div className="testimonial-scroller space-y-4 max-h-[640px] overflow-y-auto pr-2 scrollbar-thin">
                {testimonials.map((t, i) => (
                  <TestimonialCard
                    key={t.id}
                    testimonial={t}
                    index={i}
                    onCountryFocus={handleCountryFocus}
                  />
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
                <div className="glass-storm py-3">
                  <div className="text-2xl font-bold text-[var(--storm-electric)]">{testimonials.length}</div>
                  <div className="text-sky-200/80 text-xs">Stories</div>
                </div>
                <div className="glass-storm py-3">
                  <div className="text-2xl font-bold text-[var(--storm-electric)]">{uniqueCountries}</div>
                  <div className="text-sky-200/80 text-xs">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to write <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">yours?</span>
          </h2>
          <p className="text-lg text-slate-300/85 mb-8 max-w-2xl mx-auto">
            Talk to a counsellor who has actually done it. Free first call, no commitment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bookings"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--storm-accent)] to-[var(--dawn-glow)] hover:brightness-110 text-[var(--storm-deep)] font-bold rounded-xl transition-all shadow-[0_0_50px_-12px_var(--storm-accent-glow)]"
            >
              Book a free call
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 glass-storm text-white font-bold rounded-xl transition-all hover:text-[var(--storm-electric)]"
            >
              View Student Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
