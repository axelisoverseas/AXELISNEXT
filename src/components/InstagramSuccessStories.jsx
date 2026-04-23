'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, Instagram, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { StartJourneyCTA } from './CTAButton';
import { TextEffectInView } from './ui/TextEffect';

// 4 curated reels — one sliding carousel, unified blue/cyan/slate palette.
const reels = [
  {
    id: 'ardnav',
    videoSrc: '/reels/ardnav_success_story.mp4',
    studentName: 'Ardnav',
    university: 'International University',
    country: 'Germany',
    tag: 'Success Story',
    caption:
      'From application to offer letter — how Ardnav secured his admit to a top European university with Axelis.',
  },
  {
    id: 'rajat',
    videoSrc: '/reels/rajat_dublin_success.mp4',
    studentName: 'Rajat Limaye',
    university: 'Dublin City University',
    country: 'Ireland',
    tag: 'MSc Mechanical',
    caption:
      'Rajat\'s MSc Mechanical Engineering journey to Dublin — offer, visa and housing handled end-to-end.',
  },
  {
    id: 'loan',
    videoSrc: '/reels/education_loan_no_collateral.mp4',
    studentName: 'Loan Support',
    university: 'Collateral-Free Financing',
    country: 'India → Global',
    tag: 'Finance',
    caption:
      'Education loans up to ₹1 Cr with no collateral, across 27+ partner banks — structured in 7 days.',
  },
  {
    id: 'netherlands',
    videoSrc: '/reels/netherlands_top_destination.mp4',
    studentName: 'Netherlands Track',
    university: 'Top Dutch Universities',
    country: 'Netherlands',
    tag: 'Destination',
    caption:
      'Why the Netherlands is our most-recommended 2025 destination — intake calendar, costs, and work rights.',
  },
];

const ReelCard = ({ reel, isActive, onOpen }) => {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.currentTime = 1.5;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isActive]);

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative shrink-0 w-[78vw] sm:w-[320px] md:w-[360px] aspect-[9/16] rounded-3xl overflow-hidden border transition-all duration-500 snap-center text-left ${
        isActive
          ? 'border-cyan-400/60 shadow-[0_30px_80px_-30px_rgba(34,211,238,0.55)] scale-100'
          : 'border-slate-200/70 shadow-md scale-[0.94] opacity-80 hover:opacity-100'
      }`}
      aria-label={`Play reel — ${reel.studentName}`}
    >
      <video
        ref={videoRef}
        src={reel.videoSrc}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {!loaded && <div className="absolute inset-0 bg-slate-800 animate-pulse" />}

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/10 to-slate-900/30" />

      {/* Top row */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-blue-700">
          <Instagram size={12} /> {reel.tag}
        </span>
        <span className="px-2 py-1 rounded-md bg-slate-900/70 text-white text-[10px] font-semibold backdrop-blur">
          {reel.country}
        </span>
      </div>

      {/* Play pulse — only when inactive */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/40 flex items-center justify-center">
            <Play size={26} className="text-white fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="text-lg font-bold mb-1">{reel.studentName}</h3>
        <p className="text-xs text-cyan-200/90 font-semibold mb-2">{reel.university}</p>
        <p className="text-xs text-slate-200/90 line-clamp-2 leading-snug">{reel.caption}</p>
      </div>
    </button>
  );
};

const InstagramSuccessStories = () => {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const trackRef = useRef(null);

  // Scrolls only the horizontal carousel track — never the page viewport.
  const scrollTrackTo = (idx) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children?.[idx];
    if (!child) return;
    const targetLeft = child.offsetLeft - (track.clientWidth - child.clientWidth) / 2;
    track.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
  };

  const go = (nextIndex) => {
    const clamped = Math.max(0, Math.min(reels.length - 1, nextIndex));
    setActive(clamped);
    scrollTrackTo(clamped);
  };

  const prev = () => go(active - 1);
  const next = () => go((active + 1) % reels.length);

  // Autoplay advance every 7s, pause on modal/hover handled via setInterval reset
  useEffect(() => {
    if (selected) return undefined;
    const id = setInterval(() => {
      setActive((i) => {
        const nxt = (i + 1) % reels.length;
        scrollTrackTo(nxt);
        return nxt;
      });
    }, 7000);
    return () => clearInterval(id);
  }, [selected]);

  // ESC to close modal
  useEffect(() => {
    if (!selected) return undefined;
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [selected]);

  return (
    <AnimatedSection className="py-24 bg-gradient-to-b from-white via-slate-50 to-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-5">
            <Instagram size={14} /> Student Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            <TextEffectInView as="span" per="word" preset="blur">Real journeys from</TextEffectInView>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              our students
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
            Four short reels — straight from the counselling floor. Tap any card to play.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Prev / Next buttons — hidden on small screens, visible md+ */}
          <button
            onClick={prev}
            aria-label="Previous reel"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            aria-label="Next reel"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
          >
            <ChevronRight size={22} />
          </button>

          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 px-4 sm:px-8 md:justify-center [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {reels.map((reel, idx) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                isActive={idx === active}
                onOpen={() => setSelected(reel)}
              />
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {reels.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => go(idx)}
                aria-label={`Go to reel ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === active ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-10 md:p-12 text-center text-white relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
              Ready to be our next success story?
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto mb-7 text-sm md:text-base">
              Book a free counselling call and we'll map your admit, scholarship and visa plan — end to end.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <StartJourneyCTA text="Start Your Journey" variant="light" />
              <a
                href="https://www.instagram.com/axelis_overseas/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-all text-sm font-semibold"
              >
                <Instagram size={18} />
                <span>Follow on Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <video
                key={selected.id}
                src={selected.videoSrc}
                autoPlay
                controls
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                onClick={() => setSelected(null)}
                aria-label="Close reel"
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center text-white hover:bg-white/25"
              >
                <X size={18} />
              </button>
              <div className="absolute left-4 right-4 bottom-4 text-white">
                <h3 className="font-bold text-lg leading-tight">{selected.studentName}</h3>
                <p className="text-xs text-cyan-200 font-semibold mb-1">{selected.university}</p>
                <p className="text-xs text-slate-200/90 line-clamp-3">{selected.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
};

export default InstagramSuccessStories;
