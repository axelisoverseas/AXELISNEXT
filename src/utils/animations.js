import { animate, createTimeline, stagger, onScroll } from 'animejs';

/**
 * Animation utility functions and configurations for Axelis website
 * Provides reusable animation patterns optimized for educational consultancy branding
 */

// Common easing functions for consistent feel
export const easings = {
  smooth: 'inOut(3)',
  bounce: 'out(4)',
  elastic: 'inOut(2)',
  gentle: 'out(2)',
  sharp: 'in(3)'
};

// Animation durations for consistency
export const durations = {
  fast: 300,
  normal: 600,
  slow: 900,
  verySlow: 1200
};

/**
 * Hero section text reveal animation
 * Creates a professional, engaging entrance for main headlines
 */
export const animateHeroText = (selector, options = {}) => {
  const defaultOptions = {
    duration: durations.slow,
    ease: easings.smooth,
    delay: stagger(100),
    ...options
  };

  return animate(selector, {
    opacity: [0, 1],
    translateY: [30, 0],
    ...defaultOptions
  });
};

/**
 * Feature cards stagger animation
 * Perfect for showcasing services and benefits
 */
export const animateFeatureCards = (selector, options = {}) => {
  const defaultOptions = {
    duration: durations.normal,
    ease: easings.gentle,
    delay: stagger(150, { from: 'center' }),
    ...options
  };

  return animate(selector, {
    opacity: [0, 1],
    translateY: [40, 0],
    scale: [0.9, 1],
    ...defaultOptions
  });
};

/**
 * Testimonial card animation
 * Gentle, trustworthy animation for social proof
 */
export const animateTestimonials = (selector, options = {}) => {
  const defaultOptions = {
    duration: durations.normal,
    ease: easings.smooth,
    delay: stagger(200),
    ...options
  };

  return animate(selector, {
    opacity: [0, 1],
    translateX: [-20, 0],
    ...defaultOptions
  });
};

/**
 * Statistics counter animation
 * Engaging number count-up effect
 */
export const animateCounters = (selector, targetNumbers, options = {}) => {
  const defaultOptions = {
    duration: durations.slow,
    ease: easings.gentle,
    ...options
  };

  const elements = document.querySelectorAll(selector);
  
  elements.forEach((element, index) => {
    const targetNumber = targetNumbers[index] || 0;
    const counter = { value: 0 };
    
    animate(counter, {
      value: targetNumber,
      duration: defaultOptions.duration,
      ease: defaultOptions.ease,
      onUpdate: () => {
        element.textContent = Math.round(counter.value);
      },
      ...options
    });
  });
};

/**
 * Button hover animation
 * Subtle, professional interaction feedback
 */
export const createButtonHover = (selector) => {
  const buttons = document.querySelectorAll(selector);
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      animate(button, {
        scale: 1.05,
        duration: durations.fast,
        ease: easings.gentle
      });
    });
    
    button.addEventListener('mouseleave', () => {
      animate(button, {
        scale: 1,
        duration: durations.fast,
        ease: easings.gentle
      });
    });
  });
};

/**
 * Scroll-triggered reveal animation
 * Reveals content as user scrolls down the page
 */
export const createScrollReveal = (selector, options = {}) => {
  const defaultOptions = {
    duration: durations.normal,
    ease: easings.smooth,
    ...options
  };

  return animate(selector, {
    opacity: [0, 1],
    translateY: [50, 0],
    autoplay: onScroll({
      sync: true,
      ...defaultOptions
    }),
    ...defaultOptions
  });
};

/**
 * Team member card animation
 * Professional reveal for team showcase
 */
export const animateTeamCards = (selector, options = {}) => {
  const defaultOptions = {
    duration: durations.normal,
    ease: easings.smooth,
    delay: stagger(100, { grid: [2, 2], from: 'center' }),
    ...options
  };

  return animate(selector, {
    opacity: [0, 1],
    translateY: [30, 0],
    rotate: [2, 0],
    ...defaultOptions
  });
};

/**
 * Navigation menu animation
 * Smooth mobile menu transitions
 */
export const animateNavMenu = (selector, isOpen) => {
  const menuItems = `${selector} li`;
  
  if (isOpen) {
    return createTimeline()
      .add(selector, {
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: durations.fast,
        ease: easings.gentle
      })
      .add(menuItems, {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: durations.fast,
        ease: easings.gentle,
        delay: stagger(50)
      }, '-=200');
  } else {
    return animate(selector, {
      opacity: [1, 0],
      scale: [1, 0.95],
      duration: durations.fast,
      ease: easings.gentle
    });
  }
};

/**
 * Form input focus animation
 * Enhances user interaction with forms
 */
export const createInputFocus = (selector) => {
  const inputs = document.querySelectorAll(selector);
  
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      animate(input, {
        scale: 1.02,
        duration: durations.fast,
        ease: easings.gentle
      });
    });
    
    input.addEventListener('blur', () => {
      animate(input, {
        scale: 1,
        duration: durations.fast,
        ease: easings.gentle
      });
    });
  });
};

/**
 * Loading animation
 * Subtle loading state for better UX
 */
export const createLoadingAnimation = (selector) => {
  return animate(selector, {
    opacity: [0.5, 1, 0.5],
    duration: durations.slow,
    ease: easings.smooth,
    loop: true
  });
};

/**
 * Page transition timeline
 * Orchestrates multiple animations for page changes
 */
export const createPageTransition = (elements) => {
  return createTimeline()
    .add(elements.hero, {
      opacity: [0, 1],
      translateY: [50, 0],
      duration: durations.normal,
      ease: easings.smooth
    })
    .add(elements.content, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: durations.normal,
      ease: easings.gentle,
      delay: stagger(100)
    }, '-=400');
};
