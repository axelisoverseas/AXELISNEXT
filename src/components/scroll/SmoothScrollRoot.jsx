'use client';

import { useSmoothScroll } from './useScrollKit';

/**
 * Starts Lenis + GSAP for a page whose root is a SERVER component.
 *
 * useSmoothScroll() has to run once per page from a client root. HomeClient,
 * ReceiptsClient and /testimonials each call it directly because they are
 * client components. The city pages are server components, so without this
 * nothing initialises: the pinned sections still reserve their scroll runway
 * but never pin, which renders as a tall blank gap. Caught by the scroll QC
 * pass reporting gsap=False, not by reading the code.
 *
 * Renders nothing.
 */
export default function SmoothScrollRoot() {
  useSmoothScroll();
  return null;
}
