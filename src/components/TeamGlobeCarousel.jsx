import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Linkedin, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';

const TeamGlobeCarousel = ({ teamMembers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotating && teamMembers?.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
      }, 4000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoRotating, teamMembers?.length]);

  const handlePrevious = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleNext = () => {
    setIsAutoRotating(false);
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handleDotClick = (index) => {
    setIsAutoRotating(false);
    setCurrentIndex(index);
  };

  // Touch swipe handlers
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipe = 50;
    if (Math.abs(diff) > minSwipe) {
      if (diff > 0) handleNext();
      else handlePrevious();
    }
  }, []);

  const getCardPosition = (index) => {
    if (!teamMembers?.length) return {};

    const totalCards = teamMembers.length;
    const angle = (360 / totalCards) * index;
    const currentAngle = angle - (360 / totalCards) * currentIndex;

    const radius = isMobile ? 160 : 280;
    const x = Math.sin((currentAngle * Math.PI) / 180) * radius;
    const z = Math.cos((currentAngle * Math.PI) / 180) * radius;
    const y = Math.sin((currentAngle * Math.PI) / 180) * (isMobile ? 15 : 30);

    const scale = (z + radius) / (radius * 2) * 0.6 + 0.4;
    const opacity = (z + radius) / (radius * 2) * 0.7 + 0.3;

    return {
      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
      opacity: opacity,
      zIndex: Math.round(z + radius),
    };
  };

  const getInitials = (name) => {
    if (!name) return 'TM';
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-b from-transparent via-red-50/30 to-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
          <p className="text-gray-500">Loading team members...</p>
        </div>
      </div>
    );
  }

  // Card dimensions
  const cardWidth = isMobile ? 'w-48 sm:w-52' : 'w-64';
  const cardHeight = isMobile ? 'min-h-[280px]' : 'min-h-[320px]';
  const photoSize = isMobile ? 'w-16 h-16' : 'w-20 h-20';

  return (
    <div
      className="relative w-full h-[480px] md:h-[600px] overflow-hidden bg-gradient-to-b from-transparent via-red-50/30 to-transparent"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-red-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* 3D Carousel Container */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Team Member Cards */}
        {teamMembers.map((member, index) => {
          const position = getCardPosition(index);
          const isActive = index === currentIndex;

          return (
            <div
              key={member.id || index}
              className={`absolute transition-all duration-1000 ease-in-out ${isActive ? 'cursor-default' : 'cursor-pointer hover:scale-110'
                }`}
              style={position}
              onClick={() => !isActive && handleDotClick(index)}
            >
              <div className={`bg-white rounded-2xl shadow-2xl p-4 md:p-6 border-2 transition-all duration-500 ${isActive
                  ? 'border-cyan-400 shadow-cyan-400/30 shadow-2xl'
                  : 'border-gray-200 hover:border-red-400'
                } ${cardWidth} ${cardHeight} flex flex-col`}>

                {/* Member Photo */}
                <div className={`relative ${photoSize} mx-auto mb-3`}>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full rounded-full object-cover border-4 border-red-600 shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}

                  {/* Fallback initials */}
                  <div className={`w-full h-full bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg ${member.image ? 'hidden' : 'flex'}`}>
                    {getInitials(member.name)}
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></div>
                    </div>
                  )}
                </div>

                {/* Alumni Badge */}
                {member.almaMater && (
                  <div className="flex items-center justify-center gap-1.5 mb-2 px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200/60 mx-auto max-w-full">
                    <img
                      src={member.almaMater.logo}
                      alt={member.almaMater.name}
                      className="w-4 h-4 md:w-5 md:h-5 object-contain flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span className="text-[10px] md:text-xs text-blue-700 font-semibold truncate">
                      {member.almaMater.name}
                    </span>
                  </div>
                )}

                {/* Member Info */}
                <div className="text-center flex-1 flex flex-col">
                  <h3 className={`text-base md:text-lg font-bold mb-1 transition-colors ${isActive ? 'text-red-600' : 'text-gray-900'
                    }`}>
                    {member.name || 'Team Member'}
                  </h3>

                  <p className="text-red-600 font-semibold mb-2 text-xs md:text-sm">
                    {member.role || 'Team Member'}
                  </p>

                  {member.description && (
                    <p className="text-gray-600 text-[11px] md:text-xs leading-relaxed mb-3 line-clamp-3 flex-grow">
                      {member.description}
                    </p>
                  )}

                  {/* LinkedIn Button */}
                  <div className="mt-auto">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-300 shadow-lg hover:scale-110 transform ${isActive
                            ? 'bg-cyan-500 hover:bg-cyan-600 text-black'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin size={isMobile ? 14 : 16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 md:gap-4">
        <button
          onClick={handlePrevious}
          className="w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Previous team member"
        >
          <ChevronLeft className="text-red-600 group-hover:scale-110 transition-transform" size={isMobile ? 18 : 20} />
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-1.5 md:gap-2">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'bg-cyan-400 scale-125'
                  : 'bg-white/60 hover:bg-white/80'
                }`}
              aria-label={`Go to team member ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Next team member"
        >
          <ChevronRight className="text-red-600 group-hover:scale-110 transition-transform" size={isMobile ? 18 : 20} />
        </button>
      </div>

      {/* Swipe hint for mobile */}
      {isMobile && (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
          Swipe to navigate
        </div>
      )}
    </div>
  );
};

export default TeamGlobeCarousel;
