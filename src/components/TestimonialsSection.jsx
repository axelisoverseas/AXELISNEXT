'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialsColumn } from './ui/TestimonialsColumn';
import { TextEffectInView } from './ui/TextEffect';
import { testimonials as siteTestimonials } from '../data/siteData';

const normalized = siteTestimonials.map((t) => ({
  text: t.content || t.review,
  image: t.image,
  name: t.name,
  role: `${t.course} · ${t.university}`,
}));

const firstColumn = normalized.slice(0, 4);
const secondColumn = normalized.slice(4, 8);
const thirdColumn = normalized.slice(8, 12);

export default function TestimonialsSection() {
  return (
    <section className="bg-slate-50 py-24 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-4 uppercase tracking-wider">
            Testimonials
          </div>
          <TextEffectInView as="h2" per="word" preset="blur" className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            What our students say
          </TextEffectInView>
          <p className="text-slate-600 mt-4">
            Real stories from students placed across 29+ countries — UK, USA, Canada, Ireland,
            Germany and more.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[720px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={22} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={28} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={25} />
        </div>
      </div>
    </section>
  );
}
