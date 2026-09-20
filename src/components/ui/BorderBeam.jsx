'use client';

import React from 'react';

export const BorderBeam = ({
  className = '',
  duration = 6,
  borderWidth = 2,
  colorFrom = '#509EE3',
  colorTo = '#1C6BB0',
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
