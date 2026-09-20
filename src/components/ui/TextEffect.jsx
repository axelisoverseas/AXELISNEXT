'use client';

import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Renders text. That is the whole component now.
 *
 * It used to split the string into per-character or per-word motion spans and
 * reveal them through AnimatePresence with `hidden`/`visible` variants. Every
 * heading that used it therefore depended on JavaScript finishing before its
 * own words became visible, and when the stagger stalled the heading was not
 * "late" — it was gone. The /faq H1 shipped that way: correct colour, correct
 * position, opacity 0.
 *
 * A headline is the one thing on a page that must never wait on a runtime. The
 * props are all still accepted so no call site has to change; the animation
 * ones are simply ignored.
 */
export function TextEffect({
  children,
  as = 'p',
  className,
  segmentWrapperClassName,
  // Accepted and ignored — kept so the 16 existing call sites keep compiling.
  per, variants, preset, delay, trigger, onAnimationComplete, // eslint-disable-line no-unused-vars
  ...rest
}) {
  const Tag = as || 'p';
  return (
    <Tag className={cn('whitespace-pre-wrap', className)} {...rest}>
      {children}
    </Tag>
  );
}

/** Same thing. The in-view variant never reliably fired; see above. */
export function TextEffectInView({ margin, once, ...props }) { // eslint-disable-line no-unused-vars
  return <TextEffect {...props} />;
}

export default TextEffect;
