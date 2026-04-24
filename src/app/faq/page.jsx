"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, MessageCircle, Phone, Globe, Award, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import { faqData } from '../../data/siteData';
import { TextEffect, TextEffectInView } from '../../components/ui/TextEffect';

const renderMarkdown = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-extrabold text-blue-600">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState(null);

  const categories = ['All', ...new Set(faqData.map(item => item.category))];

  const filteredFaqs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-storm-to-dawn">
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-24 bg-[var(--storm-deep)] border-b border-[var(--storm-electric)]/10 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold mb-8"
          >
            <HelpCircle size={16} />
            <span>KNOWLEDGE HUB</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight"
          >
            <TextEffect as="span" per="word" preset="blur">Got</TextEffect>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              <TextEffect as="span" per="char" preset="blur" delay={0.25}>Questions?</TextEffect>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Everything you need to know about your study abroad journey. From visa processes and scholarships to living arrangements and loan assistance.
          </motion.p>

          {/* Premium Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto relative group"
          >
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none group-focus-within:text-blue-500 transition-colors">
              <Search size={24} className="text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search for questions (e.g. 'Scholarship', 'Visa', 'UK')"
              className="w-full h-16 pl-16 pr-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-lg shadow-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Navigation */}
            <aside className="lg:w-1/4">
              <div className="sticky top-8 space-y-8">
                {/* Category Filter */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Explore Categories</h3>
                  <div className="flex flex-wrap lg:flex-col gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-3 rounded-xl text-sm font-bold text-left transition-all ${
                          activeCategory === cat 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-slate-900 p-6 rounded-3xl text-white">
                    <Globe className="text-blue-400 mb-4" size={32} />
                    <h4 className="font-bold mb-2">29+ Countries</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">Expert guidance across 4 continents and 29+ study destinations.</p>
                  </div>
                  <div className="bg-blue-600 p-6 rounded-3xl text-white shadow-xl">
                    <ShieldCheck className="text-blue-200 mb-4" size={32} />
                    <h4 className="font-bold mb-2">95% Visa Success</h4>
                    <p className="text-blue-100 text-xs leading-relaxed">Highly specialized visa assistance with guaranteed results.</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* FAQ List Area */}
            <main className="lg:w-3/4">
              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      layout
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`bg-white rounded-3xl border border-slate-200 overflow-hidden transition-all duration-300 ${openId === faq.id ? 'shadow-xl border-blue-200' : 'hover:border-slate-300'}`}
                    >
                      <button 
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full p-8 flex items-center justify-between text-left group"
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${openId === faq.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500'}`}>
                            <span className="text-xs font-bold leading-none">{index + 1}</span>
                          </div>
                          <span className={`text-lg font-bold transition-colors ${openId === faq.id ? 'text-blue-600' : 'text-slate-900'}`}>{faq.question}</span>
                        </div>
                        <div className={`p-2 rounded-full transition-all duration-500 ${openId === faq.id ? 'rotate-180 bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                          <ChevronDown size={20} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {openId === faq.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white border-t border-slate-100"
                          >
                            <div className="p-10 space-y-6">
                              <p className="text-lg text-slate-700 leading-relaxed font-normal whitespace-pre-wrap">
                                {renderMarkdown(faq.answer)}
                              </p>
                              <div className="inline-flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl">
                                <Award className="text-blue-600" size={20} />
                                <span className="text-sm font-bold text-slate-900 tracking-tight">Verified Expert Advice</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-200 border-dashed">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="text-slate-300" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">No results found</h3>
                  <p className="text-slate-500 max-w-md mx-auto">Try adjusting your search terms or choosing a different category.</p>
                  <button 
                    onClick={() => {setSearchTerm(''); setActiveCategory('All');}}
                    className="mt-8 text-blue-600 font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Bottom CTA Card */}
              <div className="mt-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[3rem] p-12 md:p-16 text-white text-center shadow-2xl relative overflow-hidden group">
                <div className="relative z-10 flex flex-col items-center">
                  <TextEffectInView as="h2" per="word" preset="blur" className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">Still looking for answers?</TextEffectInView>
                  <p className="text-xl text-blue-50/80 mb-10 max-w-2xl leading-relaxed">Our expert counselors are available 24/7 to provide personalized guidance for your unique profile.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/contact"
                      className="px-8 py-4 bg-white text-blue-600 text-lg font-bold rounded-2xl hover:bg-slate-50 transition-all hover:-translate-y-1 shadow-xl"
                    >
                      Book Free Consultation
                    </Link>
                    <a 
                      href="https://wa.me/918970224250?text=Hey%2C%20I%20have%20questions%20regarding%20studying%20abroad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-blue-500/20 border border-white/30 backdrop-blur-md text-white text-lg font-bold rounded-2xl hover:bg-blue-500/30 transition-all flex items-center space-x-3"
                    >
                      <MessageCircle size={24} />
                      <span>WhatsApp Experts</span>
                    </a>
                  </div>
                </div>
                
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
