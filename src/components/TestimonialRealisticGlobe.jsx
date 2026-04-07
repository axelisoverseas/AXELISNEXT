import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { Star } from 'lucide-react';

const TestimonialRealisticGlobe = React.forwardRef(({ testimonials = [], className = '', onCountryFocus }, ref) => {
  const containerRef = useRef();
  const globeRef = useRef();
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [isAutoRotating, setIsAutoRotating] = useState(false);

  // Country coordinates for testimonial markers
  const countryCoordinates = {
    'USA': { lat: 39.8283, lng: -98.5795, flag: '🇺🇸' },
    'UK': { lat: 55.3781, lng: -3.4360, flag: '🇬🇧' },
    'Canada': { lat: 56.1304, lng: -106.3468, flag: '🇨🇦' },
    'Australia': { lat: -25.2744, lng: 133.7751, flag: '🇦🇺' },
    'Germany': { lat: 51.1657, lng: 10.4515, flag: '🇩🇪' },
    'France': { lat: 46.2276, lng: 2.2137, flag: '🇫🇷' },
    'Netherlands': { lat: 52.1326, lng: 5.2913, flag: '🇳🇱' },
    'Sweden': { lat: 60.1282, lng: 18.6435, flag: '🇸🇪' },
    'Norway': { lat: 60.4720, lng: 8.4689, flag: '🇳🇴' },
    'Ireland': { lat: 53.4129, lng: -8.2439, flag: '🇮🇪' },
  };

  // Get testimonial countries for highlighting
  const getTestimonialCountries = () => {
    const countries = testimonials.map(t => t.country).filter(Boolean);
    return [...new Set(countries)]; // Remove duplicates
  };

  // Function to focus on a country
  const focusOnCountry = (country) => {
    if (!globeRef.current) return;

    const coords = countryCoordinates[country];
    if (!coords) return;

    setSelectedTestimonial(country);

    // Smooth transition to country with proper altitude
    globeRef.current.pointOfView({
      lat: coords.lat,
      lng: coords.lng,
      altitude: 2.2
    }, 600); // Reduced for snappier response

    if (onCountryFocus) {
      onCountryFocus(country);
    }
  };

  // Function to clear country focus
  const clearCountryFocus = () => {
    setSelectedTestimonial(null);
    setHoveredCountry(null);

    if (globeRef.current) {
      // Return to default view smoothly
      globeRef.current.pointOfView({
        lat: 0,
        lng: 0,
        altitude: 2.5
      }, 600); // Reduced for snappier response
    }
  };

  // Expose functions to parent component
  React.useImperativeHandle(ref, () => ({
    focusOnCountry,
    clearCountryFocus
  }));

  // Expose start control
  const startAutoRotation = () => setIsAutoRotating(true);

  // Initialize Globe.gl
  useEffect(() => {
    if (!containerRef.current) return;

    // Create marker data from testimonials
    const testimonialCountries = getTestimonialCountries();
    const markerData = testimonialCountries.map(country => {
      const coords = countryCoordinates[country];
      const countryTestimonials = testimonials.filter(t => t.country === country);

      if (!coords) return null;

      return {
        country,
        lat: coords.lat,
        lng: coords.lng,
        flag: coords.flag,
        testimonialCount: countryTestimonials.length,
        testimonials: countryTestimonials,
        isSelected: selectedTestimonial === country,
        isHovered: hoveredCountry === country
      };
    }).filter(Boolean);

    const globe = new Globe(containerRef.current)
      .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg')
      .backgroundImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
      .width(containerRef.current.clientWidth)
      .height(containerRef.current.clientHeight)
      .enablePointerInteraction(true)
      .showAtmosphere(true)
      .atmosphereColor('#4f46e5')
      .atmosphereAltitude(0.15)
      .htmlElementsData(markerData)
      .htmlElement(d => {
        const el = document.createElement('div');
        el.innerHTML = `
          <div style="
            position: relative;
            width: ${d.isSelected ? '40px' : d.isHovered ? '35px' : '30px'};
            height: ${d.isSelected ? '40px' : d.isHovered ? '35px' : '30px'};
            transition: all 0.15s ease-out;
          ">
            <div style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: ${d.isSelected ? '#ff6b35' : d.isHovered ? '#ff8c42' : '#4f46e5'};
              border-radius: 50%;
              box-shadow: 0 0 ${d.isSelected ? '20px' : d.isHovered ? '15px' : '10px'} rgba(79, 70, 229, 0.6);
            "></div>
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: ${d.isSelected ? '18px' : d.isHovered ? '16px' : '14px'};
              color: white;
              font-weight: bold;
              text-shadow: 0 1px 2px rgba(0,0,0,0.8);
            ">${d.flag}</div>
            <div style="
              position: absolute;
              top: -5px;
              right: -5px;
              background: #ef4444;
              color: white;
              border-radius: 50%;
              width: ${d.isSelected ? '18px' : '16px'};
              height: ${d.isSelected ? '18px' : '16px'};
              font-size: ${d.isSelected ? '10px' : '9px'};
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ">${d.testimonialCount}</div>
          </div>
        `;

        el.style.pointerEvents = 'auto';
        el.style.cursor = 'pointer';
        el.style.transition = 'transform 100ms ease-out'; // Lighter transition

        // Add optimized hover effects
        let hoverTimeout;
        el.onmouseenter = () => {
          clearTimeout(hoverTimeout);
          setHoveredCountry(d.country);
        };

        el.onmouseleave = () => {
          clearTimeout(hoverTimeout);
          hoverTimeout = setTimeout(() => {
            setHoveredCountry(null);
          }, 100); // Reduced timeout for better responsiveness
        };

        // Add click handler to open testimonial
        el.onclick = () => {
          console.log('Globe pin clicked for country:', d.country);

          // Focus on country directly without calling the callback
          setSelectedTestimonial(d.country);
          if (globeRef.current) {
            // Use the coordinates from the marker data
            globeRef.current.pointOfView({
              lat: d.lat,
              lng: d.lng,
              altitude: 2.2
            }, 600);
          }

          // Find and scroll to the first testimonial from this country
          const countryTestimonials = testimonials.filter(t => t.country === d.country);
          console.log('Found testimonials for country:', countryTestimonials);

          if (countryTestimonials.length > 0) {
            console.log('Dispatching testimonialSelect event for:', countryTestimonials[0]);

            // Create a custom event to notify parent component
            const event = new CustomEvent('testimonialSelect', {
              detail: {
                country: d.country,
                testimonial: countryTestimonials[0],
                testimonials: countryTestimonials
              }
            });
            window.dispatchEvent(event);
          } else {
            console.log('No testimonials found for country:', d.country);
          }
        };

        // Add tooltip
        el.title = `${d.country} - ${d.testimonialCount} testimonial${d.testimonialCount > 1 ? 's' : ''}`;

        return el;
      });

    globeRef.current = globe;

    // Set initial view with proper controls
    globe.pointOfView({ lat: 0, lng: 0, altitude: 2.5 });

    // Enable smooth but performant controls
    globe.controls().enableDamping = true;
    globe.controls().dampingFactor = 0.05;
    globe.controls().rotateSpeed = 1.0;
    globe.controls().zoomSpeed = 1.0;
    globe.controls().minDistance = 200;
    globe.controls().maxDistance = 800;

    // Optimize rendering performance
    globe.renderer().setPixelRatio(Math.min(window.devicePixelRatio, 2));
    globe.renderer().antialias = false;

    return () => {
      if (globeRef.current) {
        globeRef.current = null;
      }
    };
  }, [testimonials]);

  // Update markers when hover or selection state changes (optimized)
  useEffect(() => {
    if (!globeRef.current) return;

    // Throttle updates to reduce lag
    const updateMarkers = () => {
      const testimonialCountries = getTestimonialCountries();

      const markerData = testimonialCountries.map(country => {
        const coords = countryCoordinates[country];
        if (!coords) return null;

        const countryTestimonials = testimonials.filter(t => t.country === country);

        return {
          country,
          lat: coords.lat,
          lng: coords.lng,
          flag: coords.flag,
          testimonialCount: countryTestimonials.length,
          testimonials: countryTestimonials,
          isSelected: selectedTestimonial === country,
          isHovered: hoveredCountry === country
        };
      }).filter(Boolean);

      // Only update if data actually changed
      globeRef.current.htmlElementsData(markerData);
    };

    // Use requestAnimationFrame for smooth updates
    const rafId = requestAnimationFrame(updateMarkers);

    return () => cancelAnimationFrame(rafId);
  }, [testimonials, selectedTestimonial, hoveredCountry]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="w-full h-[500px] rounded-2xl overflow-hidden"
        style={{
          minHeight: '500px',
          maxHeight: '500px',
          background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 30%, #0f0f23 70%, #000000 100%)'
        }}
      />

      {/* Floating UI Elements */}
      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30 animate-pulse">
        <div className="flex items-center text-white text-sm">
          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-ping"></div>
          <span>Live Globe</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
        <div className="flex items-center text-white text-sm">
          <Star className="w-4 h-4 mr-2 text-cyan-400" />
          <span>Success Stories</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
        <div className="flex items-center text-white text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          <span>{getTestimonialCountries().length} Countries</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-blue-500/30">
        <div className="flex items-center text-white text-sm">
          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
          <span>NASA Earth</span>
        </div>
      </div>
    </div>
  );
});

export default TestimonialRealisticGlobe;
