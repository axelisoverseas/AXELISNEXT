import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Globe, Users, Award, MapPin, GraduationCap } from 'lucide-react';
import Layout from '../components/Layout';
import TestimonialRealisticGlobe from '../components/TestimonialRealisticGlobe';
import { testimonials } from '../data/siteData';

// Enhanced Testimonial Card Component with Animations
const TestimonialCard = ({ testimonial, index, onCountryFocus }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  // Staggered animation entrance
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100); // Stagger by 100ms per card

    return () => clearTimeout(timer);
  }, [index]);

  // Cleanup hover timeout on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  // Get country flag
  const countryFlags = {
    'USA': '🇺🇸', 'UK': '🇬🇧', 'Canada': '🇨🇦', 'Australia': '🇦🇺',
    'Germany': '🇩🇪', 'France': '🇫🇷', 'Netherlands': '🇳🇱', 'Sweden': '🇸🇪',
    'Norway': '🇳🇴', 'Ireland': '🇮🇪', 'Denmark': '🇩🇰', 'Finland': '🇫🇮',
    'Switzerland': '🇨🇭', 'Italy': '🇮🇹', 'Spain': '🇪🇸', 'Japan': '🇯🇵'
  };

  return (
    <div
      data-testimonial-id={testimonial.id}
      className={`group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 shadow-2xl hover:border-cyan-400/50 transition-all duration-200 hover:scale-[1.02] cursor-pointer transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
        }`}
      onMouseEnter={() => {
        // Clear any existing timeout
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
          setHoverTimeout(null);
        }

        setIsExpanded(true);
        // Focus globe on this testimonial's country with immediate response
        if (onCountryFocus) {
          onCountryFocus(testimonial.country);
        }
      }}
      onMouseLeave={() => {
        // Clear any existing timeout
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
        }

        // Delay collapse slightly to prevent flickering
        const timeout = setTimeout(() => {
          setIsExpanded(false);
          // Clear country highlighting when mouse leaves
          if (onCountryFocus) {
            onCountryFocus(null);
          }
        }, 150);

        setHoverTimeout(timeout);
      }}
      onClick={() => {
        // Also focus on click for mobile users
        if (onCountryFocus) {
          onCountryFocus(testimonial.country);
        }
      }}
      style={{
        transitionDelay: `${index * 50}ms`,
        background: isExpanded ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Animated Background Glow */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-200 ${isExpanded ? 'bg-gradient-to-r from-cyan-400/20 to-blue-400/20' : 'bg-transparent'
        }`} />

      {/* Floating Country Flag */}
      <div className={`absolute -top-2 -right-2 text-2xl transition-all duration-150 ${isExpanded ? 'scale-125 rotate-12' : 'scale-100'
        }`}>
        {countryFlags[testimonial.country] || '🌍'}
      </div>

      <div className="relative flex items-start space-x-4">
        {/* Student Photo with Animation */}
        {testimonial.image && (
          <div className="flex-shrink-0 relative">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/40 to-blue-400/40 transition-all duration-200 ${isExpanded ? 'scale-110 blur-sm' : 'scale-100 blur-none opacity-0'
              }`} />
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className={`relative w-16 h-16 rounded-full border-2 border-cyan-400/50 object-cover transition-all duration-200 ${isExpanded ? 'border-cyan-400 shadow-lg shadow-cyan-400/30' : ''
                }`}
            />
            {/* Success Badge */}
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center transition-all duration-200 ${isExpanded ? 'scale-110' : 'scale-100'
              }`}>
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
        )}

        {/* Content with Enhanced Animations */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-1">
              <h3 className={`text-lg font-bold text-cyan-400 mb-1 transition-all duration-200 ${isExpanded ? 'text-cyan-300 scale-105' : ''
                }`}>
                {testimonial.name}
              </h3>
              <div className="flex items-center text-blue-300 text-sm mb-1">
                <GraduationCap className={`w-4 h-4 mr-1 transition-all duration-200 ${isExpanded ? 'text-cyan-400 scale-110' : ''
                  }`} />
                <span className={`transition-all duration-200 ${isExpanded ? 'text-white' : ''
                  }`}>
                  {testimonial.course}
                </span>
              </div>
              <div className={`text-white/80 text-sm transition-all duration-200 ${isExpanded ? 'text-white/90' : ''
                }`}>
                {testimonial.university}
              </div>
              <div className="flex items-center text-white/60 text-sm mt-1">
                <MapPin className={`w-3 h-3 mr-1 transition-all duration-200 ${isExpanded ? 'text-blue-300 scale-110' : ''
                  }`} />
                <span className={`transition-all duration-200 ${isExpanded ? 'text-white/80' : ''
                  }`}>
                  {testimonial.country}
                </span>
              </div>
            </div>

            {/* Animated Rating */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 text-cyan-400 fill-current transition-all duration-200 ${isExpanded ? 'scale-110 animate-pulse' : ''
                    }`}
                  style={{
                    animationDelay: `${i * 100}ms`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Testimonial Text with Smooth Expansion */}
          <div className={`text-white/90 text-sm leading-relaxed transition-all duration-250 ${isExpanded ? 'max-h-96 text-white' : 'max-h-16 overflow-hidden'
            }`}>
            <span className="font-medium text-cyan-400/80">"</span>
            {testimonial.content}
            <span className="font-medium text-cyan-400/80">"</span>
          </div>

          {/* Expand Indicator with Animation */}
          {!isExpanded && testimonial.content.length > 100 && (
            <div className="text-blue-300 text-xs mt-2 opacity-70 animate-pulse">
              Hover to read more...
            </div>
          )}

          {/* Success Metrics (shown on expand) */}
          {isExpanded && (
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs animate-fadeIn">
              <div className="flex items-center text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Successfully Placed
              </div>
              <div className="text-white/60">
                Rating: {testimonial.rating}/5 ⭐
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const globeRef = React.useRef();
  const [selectedTestimonial, setSelectedTestimonial] = React.useState(null);

  // Handle country focus from testimonial cards with optimized performance
  const handleCountryFocus = React.useCallback((country) => {
    if (globeRef.current) {
      if (country) {
        globeRef.current.focusOnCountry(country);
      } else {
        globeRef.current.clearCountryFocus();
      }
    }
  }, []);

  // Handle testimonial selection from globe pins
  React.useEffect(() => {
    const handleTestimonialSelect = (event) => {
      console.log('Testimonial select event received:', event.detail);
      const { country, testimonial, testimonials } = event.detail;

      // Set the selected testimonial
      setSelectedTestimonial(testimonial);

      // Find the testimonial card and scroll to it
      setTimeout(() => {
        console.log('Looking for testimonial element with id:', testimonial.id);
        const testimonialElement = document.querySelector(`[data-testimonial-id="${testimonial.id}"]`);
        console.log('Found testimonial element:', testimonialElement);

        if (testimonialElement) {
          // Find the scrollable container
          const scrollContainer = testimonialElement.closest('.overflow-y-auto');
          console.log('Found scroll container:', scrollContainer);

          if (scrollContainer) {
            // Calculate the position to scroll to within the container
            const containerRect = scrollContainer.getBoundingClientRect();
            const elementRect = testimonialElement.getBoundingClientRect();
            const scrollTop = scrollContainer.scrollTop;
            const targetScrollTop = scrollTop + (elementRect.top - containerRect.top) - (containerRect.height / 2) + (elementRect.height / 2);

            console.log('Scrolling container to position:', targetScrollTop);
            scrollContainer.scrollTo({
              top: targetScrollTop,
              behavior: 'smooth'
            });
          } else {
            // Fallback to regular scrollIntoView
            console.log('Using fallback scrollIntoView');
            testimonialElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }

          // Add highlight effect
          console.log('Adding highlight effect');
          testimonialElement.classList.add('ring-4', 'ring-cyan-400', 'ring-opacity-75');
          setTimeout(() => {
            console.log('Removing highlight effect');
            testimonialElement.classList.remove('ring-4', 'ring-cyan-400', 'ring-opacity-75');
          }, 3000);
        } else {
          console.log('Testimonial element not found!');
        }
      }, 100);
    };

    console.log('Adding testimonialSelect event listener');
    window.addEventListener('testimonialSelect', handleTestimonialSelect);

    return () => {
      console.log('Removing testimonialSelect event listener');
      window.removeEventListener('testimonialSelect', handleTestimonialSelect);
    };
  }, []);

  return (
    <Layout
      title="Testimonials"
      description="Read success stories from our students who achieved their study abroad dreams with Axelis Overseas. See what our candidates have to say!"
      keywords="student testimonials, success stories, study abroad reviews, axelis overseas reviews"
    >
      {/* Hero Section - Space Theme */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white py-20 lg:py-32 overflow-hidden">
        {/* Cosmic Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Floating Cosmic Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-blue-300/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-cyan-300/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 text-sm font-bold rounded-full border border-blue-500/30">
                <Globe className="inline w-4 h-4 mr-2" />
                Global Success Stories
              </span>
            </div>
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-cyan-400 fill-current" size={32} />
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Students Around The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Globe</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
              Real stories from students across 20+ countries who achieved their study abroad dreams with our guidance
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Certification Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-black border-y border-white/10 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl transform -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl transform -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-3xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Certified</span> Excellence
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Our commitment to quality international education is officially recognized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
            {/* British Council Certificate */}
            <div className="relative group p-2 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-500 w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 blur-lg rounded-2xl group-hover:opacity-40 transition-opacity duration-500"></div>
              <img
                src="/trust-badges/british-council.png"
                alt="British Council Certificate of Completion - UK Agent and Counsellor Training"
                className="relative w-full h-auto rounded-xl shadow-2xl object-cover border border-white/5 bg-white"
              />
            </div>

            {/* AIRC Certificate */}
            <div className="relative group p-2 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-500 w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 blur-lg rounded-2xl group-hover:opacity-40 transition-opacity duration-500"></div>
              <img
                src="/trust-badges/airc-certificate.png"
                alt="AIRC Certificate"
                className="relative w-full h-auto rounded-xl shadow-2xl object-cover border border-white/5 bg-white"
              />
            </div>

            {/* DPIIT Certificate */}
            <div className="relative group p-2 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-500 w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 blur-lg rounded-2xl group-hover:opacity-40 transition-opacity duration-500"></div>
              <img
                src="/trust-badges/dpiit-certificate.png"
                alt="DPIIT Startup India Certificate"
                className="relative w-full h-auto rounded-xl shadow-2xl object-cover border border-white/5 bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Space Theme */}
      <section className="py-16 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 shadow-2xl hover:border-cyan-400/30 transition-all duration-300">
              <div className="text-blue-300 mb-4">
                <Users className="w-12 h-12 mx-auto" />
              </div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">2000+</div>
              <div className="text-blue-200">Students Successfully Placed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 shadow-2xl hover:border-cyan-400/30 transition-all duration-300">
              <div className="text-blue-300 mb-4">
                <MapPin className="w-12 h-12 mx-auto" />
              </div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">29+</div>
              <div className="text-blue-200">Countries Covered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 shadow-2xl hover:border-cyan-400/30 transition-all duration-300">
              <div className="text-blue-300 mb-4">
                <Award className="w-12 h-12 mx-auto" />
              </div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">100%</div>
              <div className="text-blue-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Globe + Vertical Carousel Layout */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden">
        {/* Cosmic Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Floating Cosmic Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-blue-300/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-cyan-300/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>

        {/* Section Header */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 text-sm font-bold rounded-full border border-blue-500/30">
                <Globe className="inline w-4 h-4 mr-2" />
                Interactive Experience
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explore Success Stories <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Worldwide</span>
            </h2>
            <p className="text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
              Navigate through our interactive globe and browse detailed testimonials from students across the world
            </p>
          </div>
        </div>

        {/* Main Content: Globe Left + Carousel Right */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Left Side: Realistic NASA Globe */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-lg">
                <TestimonialRealisticGlobe
                  ref={globeRef}
                  testimonials={testimonials}
                  onCountryFocus={handleCountryFocus}
                />
              </div>
            </div>

            {/* Right Side: Enhanced Vertical Testimonials Carousel */}
            <div className="relative">
              {/* Carousel Header */}
              <div className="mb-6 text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 text-sm font-bold rounded-full border border-blue-500/30 mb-3">
                  <Users className="w-4 h-4 mr-2" />
                  Success Stories
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Real Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Experiences</span>
                </h3>
                <p className="text-blue-200 text-sm">
                  Hover over each story to rotate the globe and read the full testimonial
                </p>
              </div>

              {/* Scrollable Testimonials */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent pr-2">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={index}
                    onCountryFocus={handleCountryFocus}
                  />
                ))}
              </div>

              {/* Gradient Fade at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />

              {/* Stats Footer */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-cyan-400">{testimonials.length}</div>
                    <div className="text-blue-200 text-xs">Success Stories</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-cyan-400">
                      {[...new Set(testimonials.map(t => t.country))].length}
                    </div>
                    <div className="text-blue-200 text-xs">Countries</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section - Space Theme */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 text-sm font-bold rounded-full border border-blue-500/30">
              <Star className="inline w-4 h-4 mr-2" />
              Join Our Success Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Write Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Success Story?</span>
          </h2>
          <p className="text-xl mb-8 text-blue-200">
            Join hundreds of students who have achieved their study abroad dreams with Axelis Overseas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-900 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Start Your Journey
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 text-white hover:bg-white/20 hover:border-cyan-400/50 font-bold rounded-xl transition-all duration-300 hover:scale-105"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
