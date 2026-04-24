"use client";
import { motion } from 'framer-motion';

export default function LightningBolt({
  size = 24,
  color = 'var(--storm-accent)',
  glow = true,
  flash = false,
  pulse = false,
  className = '',
}) {
  const path = 'M13 2 L4 14 H11 L10 22 L20 10 H13 Z';

  const bolt = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      style={glow ? { filter: `drop-shadow(0 0 6px var(--storm-accent-glow))` } : undefined}
    >
      <path
        d={path}
        fill={color}
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (flash) {
    return (
      <motion.span
        className={`inline-flex ${pulse ? 'animate-bolt-pulse' : ''}`}
        animate={{
          opacity: [1, 0.25, 1, 1, 0.6, 1],
          scale: [1, 1.1, 1, 1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          times: [0, 0.03, 0.06, 0.5, 0.53, 0.6],
          ease: 'easeOut',
        }}
      >
        {bolt}
      </motion.span>
    );
  }

  return <span className={`inline-flex ${pulse ? 'animate-bolt-pulse' : ''}`}>{bolt}</span>;
}
