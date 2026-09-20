'use client';

import React from 'react';

/**
 * Renders text.
 *
 * It used to split the string into one motion span per letter, each starting
 * at scale 0 and opacity 0 and springing in on a per-letter delay. This is on
 * the home hero headline, so the single most important line on the site began
 * life invisible and stayed that way if the springs did not run. It also meant
 * a headline was dozens of nested spans rather than a string.
 *
 * Props are still accepted so the call site does not change.
 */
export default function RevealText({
  text,
  className = '',
  letterClassName = '',
  letterDelay, // eslint-disable-line no-unused-vars
}) {
  return (
    <span className={`inline-flex ${className}`}>
      <span className={letterClassName}>{text}</span>
    </span>
  );
}
