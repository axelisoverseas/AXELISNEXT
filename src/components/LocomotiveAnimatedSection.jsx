import React, { useEffect, useRef } from 'react';

const LocomotiveAnimatedSection = ({ 
  children, 
  className = '', 
  animationType = 'fadeInUp', 
  delay = 0,
  speed = 0,
  ...props 
}) => {
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const element = sectionRef.current;
    
    // Add Locomotive Scroll attributes
    element.setAttribute('data-scroll', '');
    element.setAttribute('data-scroll-section', '');
    
    if (speed !== 0) {
      element.setAttribute('data-scroll-speed', speed.toString());
    }

    // Set initial animation state
    const setInitialState = () => {
      switch (animationType) {
        case 'fadeInUp':
          element.style.opacity = '0';
          element.style.transform = 'translateY(50px)';
          break;
        case 'fadeInLeft':
          element.style.opacity = '0';
          element.style.transform = 'translateX(-50px)';
          break;
        case 'fadeInRight':
          element.style.opacity = '0';
          element.style.transform = 'translateX(50px)';
          break;
        case 'scaleIn':
          element.style.opacity = '0';
          element.style.transform = 'scale(0.8)';
          break;
        default:
          element.style.opacity = '0';
      }
    };

    // Animate in function
    const animateIn = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      element.style.transition = `all 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      element.style.transitionDelay = `${delay}ms`;
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'none';
      }, 50);
    };

    // Check if element is in viewport
    const checkInViewport = () => {
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      
      if (isInViewport && !hasAnimated.current) {
        animateIn();
      }
    };

    // Set initial state
    setInitialState();

    // Check immediately if in viewport
    setTimeout(checkInViewport, 100);

    // Listen for Locomotive Scroll events
    const handleLocomotiveScroll = () => {
      checkInViewport();
    };

    // Listen for scroll events (fallback)
    const handleScroll = () => {
      checkInViewport();
    };

    // Add event listeners
    window.addEventListener('locomotiveScroll', handleLocomotiveScroll);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('locomotiveScroll', handleLocomotiveScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animationType, delay, speed]);

  return (
    <div 
      ref={sectionRef}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export default LocomotiveAnimatedSection;
