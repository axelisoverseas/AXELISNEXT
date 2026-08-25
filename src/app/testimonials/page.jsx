"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, Star, MapPin, GraduationCap, Play, BadgeCheck } from 'lucide-react';
import { testimonials as allTestimonials } from '../../data/siteData';

// Show only testimonials with a real student photo. Entries that fall back to
// auto-generated initials avatars (ui-avatars.com) are placeholders, not real
// students, and are filtered out.
const testimonials = allTestimonials.filter(
  (t) => t.image && !t.image.includes('ui-avatars.com')
);

// Video testimonials — students who recorded a review on camera.
// `youtubeId` for embedded YouTube Shorts, `src` for self-hosted mp4.
const videoTestimonials = [
  {
    id: 'anjali-video',
    name: 'Anjali Sangwan',
    university: 'Vistula University',
    course: 'BA Economics',
    country: 'Poland',
    src: '/videos/anjali_sangwan_poland_compressed.mp4',
    poster: '/videos/anjali_sangwan_poster.jpg',
  },
  {
    id: 'raghav-video',
    name: 'Raghav Verma',
    university: 'Warsaw University of Technology',
    course: 'BSc Computer Science',
    country: 'Poland',
    youtubeId: 'J0W5a7lYbRk',
  },
];

// Students with confirmed visa + placement, but no full written quote yet.
// Shown as a clean "Recent Placements" grid below the main carousel.
const recentPlacements = [
  { name: 'Jitesh Jha', university: 'Technological University Dublin', course: 'MSc Technology and Innovation Management', country: 'Ireland', plan: 'ZCF', flag: '🇮🇪' },
  { name: 'Swapnil Arya', university: 'University of Glasgow', course: 'MSc Mechanical Engineering and Management', country: 'UK', plan: 'ZCF', flag: '🇬🇧' },
  { name: 'Samridhi Singh', university: 'University of Liverpool', course: 'MSc Sustainable Business', country: 'UK', plan: 'ZCF', flag: '🇬🇧' },
  { name: 'Ashmita Bhatt', university: "Queen's University Belfast", course: 'MBA', country: 'UK', plan: 'ZCF', flag: '🇬🇧' },
  { name: 'Monika Nataraj', university: 'Humboldt University of Berlin', course: 'LLM in International Dispute Resolution', country: 'Germany', plan: 'ZTF', flag: '🇩🇪' },
  { name: 'Sai Krishna Penugonda', university: 'Karlsruhe Institute of Technology', course: 'MSc Productions and Operations Management', country: 'Germany', plan: 'ZTF', flag: '🇩🇪' },
];

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
          <img
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=2400&q=80&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--storm-deep)] via-[var(--storm-deep)]/55 to-[var(--storm-deep)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_55%,rgba(5,7,15,0.65)_0%,transparent_75%)]" />
          <div className="absolute top-10 left-10 w-72 h-72 bg-[var(--storm-electric)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[var(--dawn-glow)]/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="text-[var(--dawn-glow)] fill-current" size={26} />
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Students around the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">globe.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Real placements across 29+ countries. Named students, signed declarations, verifiable visas.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="glass-storm py-4">
              <div className="text-2xl md:text-3xl font-bold text-[var(--storm-electric)]">500+</div>
              <div className="text-sky-200/85 text-[10px] md:text-xs uppercase tracking-wider mt-1">Students placed</div>
            </div>
            <div className="glass-storm py-4">
              <div className="text-2xl md:text-3xl font-bold text-[var(--storm-electric)]">29+</div>
              <div className="text-sky-200/85 text-[10px] md:text-xs uppercase tracking-wider mt-1">Countries</div>
            </div>
            <div className="glass-storm py-4">
              <div className="text-2xl md:text-3xl font-bold text-[var(--dawn-glow)]">100%</div>
              <div className="text-sky-200/85 text-[10px] md:text-xs uppercase tracking-wider mt-1">Visa success</div>
            </div>
          </div>
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
                  <div className="text-sky-200/80 text-xs">Featured stories</div>
                </div>
                <div className="glass-storm py-3">
                  <div className="text-2xl font-bold text-[var(--storm-electric)]">{uniqueCountries}</div>
                  <div className="text-sky-200/80 text-xs">On this page</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video reviews — students who filmed a thank-you on camera */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 inline-flex items-center gap-3">
              <Play className="w-7 h-7 text-[var(--storm-electric)]" />
              Watch them <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">tell it on camera.</span>
            </h2>
            <p className="text-slate-300/85 text-base md:text-lg max-w-2xl mx-auto">
              Real students, in their own words, after their visa cleared.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {videoTestimonials.map((v) => (
              <div key={v.id} className="glass-storm p-5 group">
                <div className="relative aspect-[9/16] sm:aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
                  {v.youtubeId ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${v.youtubeId}?rel=0&modestbranding=1`}
                      title={`${v.name} review`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={v.src}
                      poster={v.poster}
                      controls
                      preload="metadata"
                      playsInline
                    />
                  )}
                </div>
                <div className="pt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-white font-bold text-lg">{v.name}</h3>
                    <p className="text-sky-200/85 text-sm">{v.course}</p>
                    <p className="text-white/70 text-sm">{v.university}</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold whitespace-nowrap">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    {v.country}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent placements — visa-received students without a written quote yet */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 inline-flex items-center gap-3">
              <BadgeCheck className="w-7 h-7 text-emerald-300" />
              Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">placements with visa in hand.</span>
            </h2>
            <p className="text-slate-300/85 text-base md:text-lg max-w-2xl mx-auto">
              Fall 2025 cohort. Classes started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {recentPlacements.map((p) => (
              <div key={p.name} className="glass-storm p-5 flex items-start gap-4">
                <div className="text-3xl mt-0.5" aria-hidden>{p.flag}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-white font-bold text-base truncate">{p.name}</h3>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider bg-[var(--storm-electric)]/15 border border-[var(--storm-electric)]/30 text-[var(--storm-electric)] uppercase whitespace-nowrap">
                      {p.plan}
                    </span>
                  </div>
                  <p className="text-sky-200/85 text-sm mb-1 leading-snug">{p.course}</p>
                  <p className="text-white/70 text-xs mb-2 leading-snug">{p.university}</p>
                  <div className="inline-flex items-center gap-1.5 text-emerald-300 text-xs font-semibold">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Visa received &middot; {p.country}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof gallery — payments, declarations, visas, transfers (PII redacted) */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              The receipts &mdash; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--storm-electric)] to-[var(--dawn-glow)]">real payments, real declarations, real visas.</span>
            </h2>
            <p className="text-slate-300/85 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Every plan flows through Razorpay. Every ZTF student signs a Zero Tuition Fee declaration before we process anything. Every visa we claim is a real stamp in a real passport. Personal info is blacked out below; the rest is exactly what we have on file.
            </p>
          </div>

          {/* Group 1: Razorpay payments */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-[var(--storm-electric)]/30 flex-1" />
              <h3 className="text-[var(--storm-electric)] text-xs font-bold uppercase tracking-[0.25em] whitespace-nowrap">
                Razorpay payments
              </h3>
              <div className="h-px bg-[var(--storm-electric)]/30 flex-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[
                { src: '/proof/razorpay-prepay.jpeg', cap: 'ZTF Razorpay page', tone: 'sky' },
                { src: '/proof/razorpay-receipt-1.jpeg', cap: '₹10,000 paid', tone: 'emerald' },
                { src: '/proof/razorpay-receipt-2.jpeg', cap: '14 May 2025', tone: 'emerald' },
                { src: '/proof/razorpay-receipt-3.jpeg', cap: '14 May 2025', tone: 'emerald' },
              ].map((item, i) => (
                <div key={i} className="glass-storm p-2.5 group hover:scale-[1.02] transition-transform">
                  <div className="relative rounded-lg overflow-hidden bg-white aspect-[4/5]">
                    <img
                      src={item.src}
                      alt={`Razorpay payment proof ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className={`mt-2 text-center text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${item.tone === 'emerald' ? 'text-emerald-300' : 'text-sky-300'}`}>
                    <BadgeCheck className="w-3 h-3" />
                    {item.cap}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: ZTF declarations */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-[var(--dawn-glow)]/30 flex-1" />
              <h3 className="text-[var(--dawn-glow)] text-xs font-bold uppercase tracking-[0.25em] whitespace-nowrap">
                Zero Tuition Fee declarations
              </h3>
              <div className="h-px bg-[var(--dawn-glow)]/30 flex-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {[
                { src: '/proof/esign-zft-1.jpeg', cap: 'Sai Krishna P' },
                { src: '/proof/esign-zft-2.jpeg', cap: 'Karthik Hegde' },
                { src: '/proof/esign-zft-3.jpeg', cap: 'Hrashikesh Hegde' },
                { src: '/proof/esign-zft-4.jpeg', cap: 'Monika Nataraj' },
              ].map((item, i) => (
                <div key={i} className="glass-storm p-2.5 group hover:scale-[1.02] transition-transform">
                  <div className="relative rounded-lg overflow-hidden bg-white aspect-[16/9] sm:aspect-[5/4]">
                    <img
                      src={item.src}
                      alt={`Zero Tuition Fee declaration sent to ${item.cap}`}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-wider text-[var(--dawn-glow)] flex items-center justify-center gap-1.5">
                    <BadgeCheck className="w-3 h-3" />
                    {item.cap}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Group 3: Visas + UPI — featured 2-up */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-emerald-400/30 flex-1" />
              <h3 className="text-emerald-300 text-xs font-bold uppercase tracking-[0.25em] whitespace-nowrap">
                Visa + bank transfer proofs
              </h3>
              <div className="h-px bg-emerald-400/30 flex-1" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="glass-storm p-3">
                <div className="relative rounded-xl overflow-hidden bg-white aspect-[3/4]">
                  <img
                    src="/proof/visa-poland-raghav.jpeg"
                    alt="Polish student visa stamp issued to Raghav Verma"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="pt-3 px-2 text-center">
                  <p className="text-white font-bold">Raghav Verma &middot; Polish student visa</p>
                  <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mt-1 inline-flex items-center gap-1.5">
                    <BadgeCheck className="w-3 h-3" />
                    Issued by the Embassy of Poland, New Delhi
                  </p>
                </div>
              </div>

              <div className="glass-storm p-3">
                <div className="relative rounded-xl overflow-hidden bg-black aspect-[3/4]">
                  <img
                    src="/proof/upi-transaction-monika.jpeg"
                    alt="UPI transfer of ₹65,000 from Monika Nataraj to Axelis Overseas Education Private Limited"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="pt-3 px-2 text-center">
                  <p className="text-white font-bold">Monika Nataraj &middot; ZTF service fee</p>
                  <p className="text-emerald-300 text-xs font-bold uppercase tracking-wider mt-1 inline-flex items-center gap-1.5">
                    <BadgeCheck className="w-3 h-3" />
                    ₹65,000 via HDFC Bank UPI &middot; 30 Sept 2025
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-slate-400 text-xs max-w-2xl mx-auto">
            Names are shown only for students whose stories already feature publicly on this site. Personal contact details, account numbers, and government identifiers are blacked out. Anything you want to verify is available on a call &mdash; with the student&apos;s consent.
          </p>
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
