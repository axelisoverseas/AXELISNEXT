import { useEffect, useRef } from 'react';
import { createScope } from 'animejs';

/**
 * Custom hook for managing Anime.js animations in React components
 * Provides a scoped animation environment with automatic cleanup
 */
export const useAnimations = (animationCallback, dependencies = []) => {
  const rootRef = useRef(null);
  const scopeRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    // Create a scoped animation environment
    scopeRef.current = createScope({ 
      root: rootRef.current 
    }).add((self) => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        // Skip animations if user prefers reduced motion
        return;
      }

      // Execute the animation callback with the scope context
      if (typeof animationCallback === 'function') {
        animationCallback(self);
      }
    });

    // Cleanup function to properly dispose of animations
    return () => {
      if (scopeRef.current) {
        scopeRef.current.revert();
      }
    };
  }, dependencies);

  return {
    rootRef,
    scope: scopeRef.current,
    // Helper method to trigger scoped animations
    trigger: (methodName, ...args) => {
      if (scopeRef.current && scopeRef.current.methods[methodName]) {
        scopeRef.current.methods[methodName](...args);
      }
    }
  };
};

/**
 * Hook for scroll-triggered animations
 * Automatically handles intersection observer for performance
 */
export const useScrollAnimation = (animationCallback, options = {}) => {
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (!prefersReducedMotion && typeof animationCallback === 'function') {
              animationCallback(entry.target);
              hasAnimated.current = true;
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [animationCallback]);

  return elementRef;
};

/**
 * Hook for managing page transition animations
 */
export const usePageTransition = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    // Add entrance animation class
    pageRef.current.style.opacity = '0';
    pageRef.current.style.transform = 'translateY(20px)';
    
    // Trigger entrance animation
    const timer = setTimeout(() => {
      if (pageRef.current) {
        pageRef.current.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        pageRef.current.style.opacity = '1';
        pageRef.current.style.transform = 'translateY(0)';
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return pageRef;
};
