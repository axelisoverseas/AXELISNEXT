'use client';

import React, { useEffect, useState } from 'react';
import { Play, Globe, BookOpen, ExternalLink, ChevronRight, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_GUIDE_TAG = 'Study Abroad';

const StudyAbroadGuides = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'empty' | 'error'

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/youtube-videos', { cache: 'no-store' });
        const data = await res.json();
        if (cancelled) return;
        const list = Array.isArray(data?.videos) ? data.videos.slice(0, 6) : [];
        if (list.length === 0) {
          setStatus('empty');
          return;
        }
        setVideos(list);
        setStatus('ready');
      } catch (err) {
        if (!cancelled) setStatus('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const renderGrid = () => {
    if (status === 'loading') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200"
            >
              <div className="aspect-video bg-slate-200 animate-pulse" />
              <div className="p-8 space-y-3">
                <div className="h-3 bg-slate-200 rounded animate-pulse w-1/3" />
                <div className="h-5 bg-slate-200 rounded animate-pulse w-5/6" />
                <div className="h-3 bg-slate-100 rounded animate-pulse w-full" />
                <div className="h-3 bg-slate-100 rounded animate-pulse w-2/3" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (status === 'empty' || status === 'error') {
      return (
        <div className="text-center py-16 text-slate-500">
          <Youtube className="mx-auto mb-4 text-slate-400" size={32} />
          <p className="text-sm">
            Live videos are currently unavailable.{' '}
            <a
              href="https://www.youtube.com/@axelisoverseas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline"
            >
              Visit our YouTube channel
            </a>{' '}
            to watch every guide.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((guide, index) => {
          const summary =
            guide.description
              ? guide.description.split('\n')[0].slice(0, 160)
              : 'Watch our latest guide on studying abroad.';
          return (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-300 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.2)]"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={guide.thumbnailHigh || guide.thumbnail}
                  onError={(e) => {
                    // maxresdefault can 404 — fall back to hqdefault
                    if (guide.thumbnail && e.currentTarget.src !== guide.thumbnail) {
                      e.currentTarget.src = guide.thumbnail;
                    }
                  }}
                  alt={guide.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />

                <button
                  onClick={() => setActiveVideo(guide.id)}
                  className="absolute inset-0 flex items-center justify-center group/btn"
                  aria-label={`Play ${guide.title}`}
                >
                  <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover/btn:bg-blue-600 group-hover/btn:scale-110 transition-all duration-300 shadow-xl border border-white/40">
                    <Play className="text-white fill-current ml-1" size={24} />
                  </div>
                </button>

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-[10px] font-bold rounded-lg shadow-sm uppercase tracking-wider">
                    {FALLBACK_GUIDE_TAG}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center space-x-2 mb-3 text-slate-500">
                  <Globe size={14} />
                  <span className="text-xs font-semibold tracking-wide uppercase">
                    {guide.author || 'Axelis Overseas'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-sm text-slate-600 mb-6 line-clamp-2">{summary}</p>
                <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                  <button
                    onClick={() => setActiveVideo(guide.id)}
                    className="text-blue-600 font-bold text-sm flex items-center group/link hover:underline"
                  >
                    Watch Now
                    <ChevronRight
                      size={16}
                      className="ml-1 group-hover/link:translate-x-1 transition-transform"
                    />
                  </button>
                  <a
                    href={guide.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                    aria-label="Open on YouTube"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/50 rounded-full blur-3xl -mr-20 -mt-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-bold rounded-full mb-6"
          >
            STUDY ABROAD GUIDES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Expert <span className="text-blue-600">Video Tutorials</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Fresh videos straight from our YouTube channel — application process, visa
            requirements, scholarship playbooks, and country guides.
          </motion.p>
        </div>

        {renderGrid()}

        <div className="mt-20 text-center">
          <a
            href="https://www.youtube.com/@axelisoverseas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors px-10 py-5 bg-slate-100 rounded-2xl hover:bg-slate-200"
          >
            <BookOpen className="text-blue-600" size={24} />
            <span>Access All Guides on YouTube</span>
          </a>
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube Video"
                className="absolute inset-0 w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
              >
                <div className="w-6 h-6 flex items-center justify-center">✕</div>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default StudyAbroadGuides;
