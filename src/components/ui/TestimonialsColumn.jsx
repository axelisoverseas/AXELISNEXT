'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const TestimonialsColumn = ({ className = '', testimonials, duration = 15 }) => {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, loop) => (
          <React.Fragment key={loop}>
            {testimonials.map((t, i) => (
              <div
                key={`${loop}-${i}`}
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm shadow-blue-900/5 max-w-xs w-full"
              >
                <p className="text-sm text-slate-700 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 mt-4">
                  {t.image ? (
                    <img
                      width={40}
                      height={40}
                      src={t.image}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
                      {t.name?.[0]}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <div className="font-semibold tracking-tight text-sm text-slate-900 leading-5">{t.name}</div>
                    <div className="leading-5 text-xs text-slate-500 tracking-tight">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialsColumn;
