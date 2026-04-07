import { useEffect } from 'react';

export const useLenis = () => {
  const scrollTo = (target, options = {}) => {
    if (window.lenis) {
      window.lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    } else {
      // Fallback for when Lenis is not available
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const scrollToTop = (options = {}) => {
    scrollTo(0, options);
  };

  const scrollToElement = (selector, options = {}) => {
    scrollTo(selector, options);
  };

  return {
    scrollTo,
    scrollToTop,
    scrollToElement,
  };
};

export default useLenis;
