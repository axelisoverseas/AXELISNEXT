'use client';

import React from 'react';
import { motion } from 'framer-motion';

const initials = (name = '') =>
  name
    .split(' ')
    .filter((w) => /[A-Za-z]/.test(w[0] || ''))
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

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
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm shadow-blue-900/5 max-w-xs w-full flex items-center gap-4"
              >
                <div className="h-14 w-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={u.image}
                    alt={u.name}
                    className="max-h-10 max-w-10 object-contain logo-img"
                    onError={(e) => {
                      // Hide broken logo, show initials fallback sibling.
                      e.currentTarget.style.display = 'none';
                      const fb = e.currentTarget.nextElementSibling;
                      if (fb) fb.style.display = 'flex';
                    }}
                  />
                  <div
                    className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold text-xs items-center justify-center"
                    style={{ display: 'none' }}
                  >
                    {initials(u.name)}
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="font-semibold tracking-tight text-sm text-slate-900 leading-5 truncate">
                    {u.name}
                  </div>
                  <div className="leading-5 text-xs text-slate-500 tracking-tight">{u.country}</div>
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
