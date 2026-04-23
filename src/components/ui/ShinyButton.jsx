'use client';

import React from 'react';

export const ShinyButton = ({ children, className = '', as: Tag = 'button', ...props }) => {
  return (
    <Tag
      {...props}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 ${className}`}
    >
      <span
        aria-hidden
        className="shiny-btn absolute inset-0"
        style={{ '--shiny-base': '#1e3a8a' }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Tag>
  );
};

export default ShinyButton;
