'use client';

import React from 'react';

export const BorderBeam = ({
  className = '',
  duration = 6,
  borderWidth = 2,
  colorFrom = '#22d3ee',
  colorTo = '#0b5cff',
  delay = 0,
  // legacy props (size, anchor) accepted but unused
  size,
  anchor,
}) => {
  const style = {
    '--bb-duration': `${duration}s`,
    '--bb-thickness': `${borderWidth}px`,
    '--bb-from': colorFrom,
    '--bb-to': colorTo,
    '--bb-delay': `-${delay}s`,
  };

  return <span aria-hidden className={`bb-ring ${className}`} style={style} />;
};

export default BorderBeam;
