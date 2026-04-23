'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function RevealText({
  text = '',
  className = '',
  letterClassName = '',
  letterDelay = 0.06,
}) {
  return (
    <span className={`inline-flex ${className}`} aria-label={text}>
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          className={`inline-block ${letterClassName}`}
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            delay: index * letterDelay,
            type: 'spring',
            damping: 10,
            stiffness: 180,
            mass: 0.7,
          }}
          aria-hidden="true"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  );
}

export default RevealText;
