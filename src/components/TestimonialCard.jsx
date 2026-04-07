import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial, className = "", style = {} }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 border border-neutral-200 hover:shadow-xl hover:border-primary-600 transition-all duration-300 hover:transform hover:scale-105 ${className}`}
      style={style}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <Quote className="text-primary-600 mb-4" size={24} />
          <p className="text-black mb-6 leading-relaxed italic">
            "{testimonial.review}"
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Profile Image */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary-200 shadow-lg">
            {testimonial.image ? (
              <>
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name} - ${testimonial.course} student`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full hidden items-center justify-center text-white font-bold text-sm"
                >
                  {testimonial.name.charAt(0)}
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-black">
              {testimonial.name}
            </h4>
            <p className="text-sm text-neutral-600">
              {testimonial.course}
            </p>
            <p className="text-sm text-neutral-500 font-medium">
              {testimonial.university}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
