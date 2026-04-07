import React, { useState } from 'react';
import { Play, Globe, BookOpen, ExternalLink, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const guides = [
  {
    id: 'I7EzLc62Y6c',
    title: 'Zero Tuition Fee Universities',
    country: 'Global / Europe',
    description: 'Learn how to study in top European countries like Germany and Finland without paying tuition fees.',
    category: 'Finance'
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'Study in USA 2025 Guide',
    country: 'USA',
    description: 'Comprehensive guide on applications, STEM OPT, and scholarships for American universities.',
    category: 'Country Guide'
  },
  {
    id: 'M7lc1UVf-VE',
    title: 'Canada Study Permit Process',
    country: 'Canada',
    description: 'Official steps and requirements for obtaining a Canadian study permit in 2025.',
    category: 'Visa'
  },
  {
    id: '9bZkp7q19f0',
    title: 'Education Loans Explained',
    country: 'Finance',
    description: 'Everything about securing collateral-free loans for your international education.',
    category: 'Finance'
  },
  {
    id: 'astISOttCQ0',
    title: 'MBA Abroad: High ROI Degrees',
    country: 'MBA',
    description: 'Why pursuing an MBA abroad is the best decision for your career growth.',
    category: 'Course Guide'
  }
];

const StudyAbroadGuides = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
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
            Watch our comprehensive guides to understand the application process, visa requirements, and scholarship secrets for various countries.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-300 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.2)]"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img 
                  src={`https://img.youtube.com/vi/${guide.id}/maxresdefault.jpg`}
                  alt={guide.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                
                {/* Play Button Overlay */}
                <button 
                  onClick={() => setActiveVideo(guide.id)}
                  className="absolute inset-0 flex items-center justify-center group/btn"
                >
                  <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover/btn:bg-blue-600 group-hover/btn:scale-110 transition-all duration-300 shadow-xl border border-white/40">
                    <Play className="text-white fill-current ml-1" size={24} />
                  </div>
                </button>

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-[10px] font-bold rounded-lg shadow-sm uppercase tracking-wider">
                    {guide.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-3 text-slate-500">
                  <Globe size={14} />
                  <span className="text-xs font-semibold tracking-wide uppercase">{guide.country}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-slate-600 mb-6 line-clamp-2">
                  {guide.description}
                </p>
                <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                  <button 
                    onClick={() => setActiveVideo(guide.id)}
                    className="text-blue-600 font-bold text-sm flex items-center group/link hover:underline"
                  >
                    Watch Now
                    <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                  <a 
                    href={`https://www.youtube.com/watch?v=${guide.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
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

      {/* Video Modal Overlay */}
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
              onClick={e => e.stopPropagation()}
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
