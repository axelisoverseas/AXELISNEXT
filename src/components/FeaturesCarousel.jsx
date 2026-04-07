import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturesCarousel = ({ features = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Early return if no features
  if (!features || features.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No features available</p>
      </div>
    );
  }

  // Auto-advance carousel every 5 seconds (slowed for better UX)
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === features.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Slowed to 5 seconds for better UX

    return () => clearInterval(interval);
  }, [features.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // removed automatic resume; user must click Start to resume
    // setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? features.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    // removed automatic resume; user must click Start to resume
    // setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === features.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    // removed automatic resume; user must click Start to resume
    // setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const startAutoPlay = () => setIsAutoPlaying(true);

  // Show 3 cards on desktop, 2 on tablet, 1 on mobile
  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 3; // Default for SSR
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;

    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const [visibleCards, setVisibleCards] = useState(3); // Default to 3

  useEffect(() => {
    // Set initial value after component mounts
    setVisibleCards(getVisibleCards());

    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getVisibleFeatures = () => {
    if (!features || features.length === 0) return [];

    const visible = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % features.length;
      if (features[index]) {
        visible.push(features[index]);
      }
    }
    return visible;
  };

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500 ease-in-out will-change-transform">
          {getVisibleFeatures().map((feature, index) => (
            <div
              key={`${feature.id}-${currentIndex}-${index}`}
              className={`flex-shrink-0 px-4 ${visibleCards === 1 ? 'w-full' :
                  visibleCards === 2 ? 'w-1/2' : 'w-1/3'
                }`}
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 hover:border-blue-500 group hover:transform hover:scale-105 hover:-translate-y-2 h-full">
                <div className="text-center">
                  <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
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
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous feature"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next feature"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'bg-blue-600 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
              }`}
            aria-label={`Go to feature ${index + 1}`}
          />
        ))}
      </div>

      {/* FeaturesCarousel Bottom */}
    </div>
  );
};

export default FeaturesCarousel;
