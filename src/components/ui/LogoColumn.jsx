'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Wordmark from '../Wordmark';

// Official wordmarks in one colour, not coats of arms: crests are illegible at
// this size and are what several universities bar from third-party promotion.
export const LogoColumn = ({ className = '', logos, duration = 22 }) => {
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
            {logos.map((u, i) => (
              <div
                key={`${loop}-${i}`}
                className="px-6 py-5 rounded-2xl border border-slate-200 bg-white shadow-e-1 shadow-stone-900/5 max-w-xs w-full flex flex-col items-center justify-center gap-2 min-h-[104px]"
              >
                <Wordmark name={u.name} height={40} maxWidth={230} />
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-dim)]">
                  {u.kind === 'symbol' ? `${u.name} · ${u.country}` : u.country}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoColumn;
