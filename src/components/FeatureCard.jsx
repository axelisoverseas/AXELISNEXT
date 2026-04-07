import React, { useRef, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { useScrollAnimation } from '../hooks/useAnimations';
import { animateFeatureCards } from '../utils/animations';

const FeatureCard = ({ feature, className = "", index = 0 }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  // Scroll-triggered animation for the card
  const scrollRef = useScrollAnimation((element) => {
    animateFeatureCards(element, {
      delay: index * 150 // Stagger based on card index
    });
  });

  // Enhanced icon hover animation
  useEffect(() => {
    if (!iconRef.current || !cardRef.current) return;

    const iconElement = iconRef.current;
    const cardElement = cardRef.current;

    const handleMouseEnter = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      iconElement.style.transform = 'scale(1.2) rotate(5deg)';
      iconElement.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    };

    const handleMouseLeave = () => {
      iconElement.style.transform = 'scale(1) rotate(0deg)';
    };

    cardElement.addEventListener('mouseenter', handleMouseEnter);
    cardElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cardElement.removeEventListener('mouseenter', handleMouseEnter);
      cardElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1000}
      scale={1.02}
      transitionSpeed={1000}
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="#ffffff"
      glarePosition="bottom"
      glareBorderRadius="12px"
      className="h-full"
    >
      <div
        ref={(el) => {
          cardRef.current = el;
          scrollRef.current = el;
        }}
        className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 group h-full ${className}`}
        style={{ opacity: 0, transform: 'translateY(40px)' }} // Initial state for animation
      >
        <div className="text-center h-full flex flex-col justify-center">
          <div
            ref={iconRef}
            className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
          >
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors">
            {feature.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            {feature.description}
          </p>
        </div>
      </div>
    </Tilt>
  );
};

export default FeatureCard;
