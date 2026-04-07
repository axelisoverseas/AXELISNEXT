import React, { useRef, useEffect } from 'react';
import { animateHeroText, createButtonHover } from '../utils/animations';

const AnimatedHero = ({ 
  title, 
  subtitle, 
  description, 
  primaryButton, 
  secondaryButton, 
  backgroundImage,
  className = '' 
}) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Show content immediately if user prefers reduced motion
      if (titleRef.current) titleRef.current.style.opacity = '1';
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
      if (descriptionRef.current) descriptionRef.current.style.opacity = '1';
      if (buttonsRef.current) buttonsRef.current.style.opacity = '1';
      return;
    }

    // Animate hero elements in sequence
    const animateHeroSequence = async () => {
      // Animate title first
      if (titleRef.current) {
        await animateHeroText(titleRef.current, {
          delay: 200
        });
      }

      // Animate subtitle
      if (subtitleRef.current) {
        await animateHeroText(subtitleRef.current, {
          delay: 400
        });
      }

      // Animate description
      if (descriptionRef.current) {
        await animateHeroText(descriptionRef.current, {
          delay: 600
        });
      }

      // Animate buttons
      if (buttonsRef.current) {
        await animateHeroText(buttonsRef.current, {
          delay: 800
        });
      }
    };

    // Start animation after a short delay
    const timer = setTimeout(animateHeroSequence, 100);

    // Setup button hover animations
    const setupButtonAnimations = () => {
      const buttons = heroRef.current?.querySelectorAll('button, .btn');
      if (buttons) {
        createButtonHover(buttons);
      }
    };

    setupButtonAnimations();

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay for better text readability */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      )}
      
      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtitle */}
        {subtitle && (
          <div 
            ref={subtitleRef}
            className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-4"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            {subtitle}
          </div>
        )}

        {/* Main title */}
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p 
            ref={descriptionRef}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            {description}
          </p>
        )}

        {/* Action buttons */}
        {(primaryButton || secondaryButton) && (
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            {primaryButton && (
              <button
                onClick={primaryButton.onClick}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {primaryButton.text}
              </button>
            )}
            
            {secondaryButton && (
              <button
                onClick={secondaryButton.onClick}
                className="px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {secondaryButton.text}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes for visual interest */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-blue-500 bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-16 h-16 bg-blue-500 bg-opacity-10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-green-500 bg-opacity-10 rounded-full animate-pulse delay-2000"></div>
      </div>
    </div>
  );
};

export default AnimatedHero;
