import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '../data/siteData';
import { testimonialImages } from '../assets/exweb/index.js';

const VisualTestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];
  const studentImage = testimonialImages[currentTestimonial.name] || 
    `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&size=300&background=145da0&color=fff&bold=true`;

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-red-900 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-cyan-500/20"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Success Stories from Our Students
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from students who achieved their study abroad dreams with Axelis
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Student Image */}
              <div className="relative">
                <div className="relative w-80 h-80 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-red-500 rounded-full blur-lg opacity-30"></div>
                  <img
                    src={studentImage}
                    alt={currentTestimonial.name}
                    className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&size=300&background=145da0&color=fff&bold=true`;
                    }}
                  />
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-400 rounded-full animate-pulse delay-1000"></div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="text-center lg:text-left">
                <Quote className="text-cyan-400 mb-4 mx-auto lg:mx-0" size={48} />
                
                <blockquote className="text-lg md:text-xl text-white mb-6 leading-relaxed">
                  "{currentTestimonial.content}"
                </blockquote>

                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-cyan-400 font-semibold mb-2">
                    {currentTestimonial.university}
                  </p>
                  <p className="text-gray-300">
                    {currentTestimonial.course}
                  </p>
                </div>

                {/* Star Rating */}
                <div className="flex justify-center lg:justify-start gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-cyan-400 fill-current"
                      size={20}
                    />
                  ))}
                </div>

                {/* Achievement Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  <Star size={16} />
                  Success Story
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-cyan-400 scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Mini Testimonials Preview */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {testimonials.slice(0, 4).map((testimonial, index) => {
            const image = testimonialImages[testimonial.name] || 
              `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&size=100&background=145da0&color=fff&bold=true`;
            
            return (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  index === currentIndex
                    ? 'bg-white/20 border-2 border-cyan-400'
                    : 'bg-white/10 border border-white/20 hover:bg-white/15'
                }`}
              >
                <img
                  src={image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-white/30"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&size=100&background=145da0&color=fff&bold=true`;
                  }}
                />
                <p className="text-white text-sm font-medium truncate">
                  {testimonial.name}
                </p>
                <p className="text-gray-300 text-xs truncate">
                  {testimonial.university}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VisualTestimonialCarousel;
