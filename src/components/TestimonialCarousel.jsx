import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialCarousel = ({ testimonials, autoPlay = true, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  // Filter testimonials to only show those with images
  const testimonialsWithImages = testimonials.filter(testimonial => testimonial.image);

  useEffect(() => {
    if (!isAutoPlaying || testimonialsWithImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonialsWithImages.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonialsWithImages.length, autoPlayInterval]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonialsWithImages.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonialsWithImages.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (testimonialsWithImages.length === 0) {
    return <div>No testimonials with images available.</div>;
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-secondary-200">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonialsWithImages.map((testimonial, index) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Testimonial Image */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-neutral-300 shadow-lg">
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.name} - ${testimonial.course} student at ${testimonial.university}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div
                        className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 rounded-full hidden items-center justify-center text-white font-bold text-2xl"
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex-1 text-center md:text-left">
                    <Quote className="text-primary-600 mb-4 mx-auto md:mx-0" size={32} />
                    <blockquote className="text-lg md:text-xl text-neutral-800 mb-6 leading-relaxed italic">
                      "{testimonial.review}"
                    </blockquote>

                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-black">
                        {testimonial.name}
                      </h4>
                      <p className="text-neutral-700 font-semibold">
                        {testimonial.course}
                      </p>
                      <p className="text-neutral-600">
                        {testimonial.university}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {testimonialsWithImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-neutral-800 p-2 rounded-full shadow-lg hover:bg-neutral-50 hover:shadow-xl transition-all duration-300 hover:scale-110 z-10 border border-neutral-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-neutral-800 p-2 rounded-full shadow-lg hover:bg-neutral-50 hover:shadow-xl transition-all duration-300 hover:scale-110 z-10 border border-neutral-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Dot Indicators */}
      {testimonialsWithImages.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {testimonialsWithImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
                index === currentIndex
                  ? 'bg-primary-600 scale-125'
                  : 'bg-neutral-400 hover:bg-neutral-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Testimonial Counter */}
      {testimonialsWithImages.length > 1 && (
        <div className="text-center mt-4 text-sm text-neutral-600">
          {currentIndex + 1} of {testimonialsWithImages.length}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
