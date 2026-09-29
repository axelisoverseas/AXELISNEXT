import React from 'react';
import WORDMARKS from '@/data/wordmarks.json';

/**
 * A university's official wordmark, drawn in one colour (navy by default)
 * through a CSS mask, so every logo on a wall reads as one set rather than a
 * heraldry lesson. Files and sources: public/logos/wordmarks, src/data/wordmarks.json.
 * Returns the plain name when no wordmark is on file.
 */
export const hasWordmark = (name) => Boolean(WORDMARKS[name]);

export default function Wordmark({ name, height = 28, maxWidth = 180, color = 'var(--color-navy)', className = '', style }) {
  const w = WORDMARKS[name];
  if (!w) return <span className={className} style={{ fontWeight: 800, color, ...style }}>{name}</span>;
  const width = Math.min(Math.round(height * (w.ar || 3)), maxWidth);
  const url = `url("${w.file}")`;
  return (
    <span
      role="img"
      aria-label={name}
      className={className}
      style={{
        display: 'inline-block', flex: 'none', width, height, backgroundColor: color,
        WebkitMaskImage: url, maskImage: url,
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center', maskPosition: 'center',
        WebkitMaskSize: 'contain', maskSize: 'contain',
        ...style,
      }}
    />
  );
}
