'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LogoColumn } from './ui/LogoColumn';
import { TextEffectInView } from './ui/TextEffect';
import { universityLogos } from '../data/universityLogos';

// Split evenly into four columns so the marquee density feels consistent.
const splitInto = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (_, i) => arr.slice(i * size, i * size + size));
};

const [col1, col2, col3, col4] = splitInto(universityLogos, 4);

export default function UniversityLogosSection() {
  return (
    <section className="bg-slate-50 py-24 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-4 uppercase tracking-wider">
            Our Portfolio
          </div>
          <TextEffectInView
            as="h2"
            per="word"
            preset="blur"
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900"
          >
            100+ top universities. 29 countries.
          </TextEffectInView>
          <p className="text-slate-600 mt-4">
            A snapshot of the institutions Axelis students have been placed at — from Oxford and
            MIT to ETH Zürich, NUS and beyond.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[720px] overflow-hidden">
          <LogoColumn logos={col1} duration={26} />
          <LogoColumn logos={col2} className="hidden md:block" duration={32} />
          <LogoColumn logos={col3} className="hidden lg:block" duration={29} />
          <LogoColumn logos={col4} className="hidden xl:block" duration={35} />
        </div>
      </div>
    </section>
  );
}
