'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LogoColumn } from './ui/LogoColumn';
import { universityLogos } from '../data/universityLogos';

// Split evenly into four columns so the marquee density feels consistent.
const splitInto = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (_, i) => arr.slice(i * size, i * size + size));
};

const [col1, col2, col3, col4] = splitInto(universityLogos, 4);

export default function UniversityLogosSection() {
  return (
    <section className="bg-transition-sky py-24 relative overflow-hidden">
      {/* Hero-sized heading, full-bleed centered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="px-4 sm:px-6 lg:px-8 text-center mb-16 relative z-10"
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white">
          30k+ universities.
        </h2>
        <p className="text-slate-300 mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          A snapshot of the institutions Axelis students have been placed at — from Oxford and
          MIT to ETH Zürich, NUS and beyond.
        </p>
      </motion.div>

      {/* Marquee — full-width. Column count climbs with breakpoint so the row
          never overflows the viewport (which would clip cards on both sides). */}
      <div className="w-full flex justify-center gap-6 px-4 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[720px] overflow-hidden">
        <LogoColumn logos={col1} duration={26} />
        <LogoColumn logos={col2} className="hidden md:block" duration={32} />
        <LogoColumn logos={col3} className="hidden xl:block" duration={29} />
        <LogoColumn logos={col4} className="hidden 2xl:block" duration={35} />
      </div>
    </section>
  );
}
