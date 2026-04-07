import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import Globe from 'react-globe.gl';

const TestimonialGlobeCarousel = ({ testimonials }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [globeRotation, setGlobeRotation] = useState({ x: 0, y: 0 });
  const intervalRef = useRef(null);
  const globeRef = useRef();

  // Country coordinates (latitude, longitude) for major study destinations
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
    'Denmark': { lat: 56.2639, lng: 9.5018, flag: '🇩🇰' },
    'Finland': { lat: 61.9241, lng: 25.7482, flag: '🇫🇮' },
    'Ireland': { lat: 53.4129, lng: -8.2439, flag: '🇮🇪' },
    'New Zealand': { lat: -40.9006, lng: 174.8860, flag: '🇳🇿' },
    'Switzerland': { lat: 46.8182, lng: 8.2275, flag: '🇨🇭' },
    'Italy': { lat: 41.8719, lng: 12.5674, flag: '🇮🇹' },
    'Spain': { lat: 40.4637, lng: -3.7492, flag: '🇪🇸' },
    'Japan': { lat: 36.2048, lng: 138.2529, flag: '🇯🇵' },
    'South Korea': { lat: 35.9078, lng: 127.7669, flag: '🇰🇷' },
    'Singapore': { lat: 1.3521, lng: 103.8198, flag: '🇸🇬' },
    'India': { lat: 20.5937, lng: 78.9629, flag: '🇮🇳' }
  };

  // Auto-rotation effect for testimonials
  useEffect(() => {
    if (isAutoRotating) {
      intervalRef.current = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000); // 6 seconds per testimonial
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoRotating, testimonials.length]);

  // Update globe rotation based on current testimonial's country
  useEffect(() => {
    const testimonial = testimonials[currentTestimonial];
    const country = testimonial?.country || 'USA';
    const coords = countryCoordinates[country];
    
    if (coords) {
      setGlobeRotation({
        x: -coords.lat,
        y: -coords.lng
      });
    }
  }, [currentTestimonial, testimonials]);

  const handlePrevious = () => {
    setIsAutoRotating(false);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoRotating(false);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  // Allow user to explicitly start auto-rotation
  const startAutoRotation = () => setIsAutoRotating(true);

  const getCardPosition = (index) => {
    const totalCards = testimonials.length;
    const angle = (360 / totalCards) * index;
    const currentAngle = angle - (360 / totalCards) * currentTestimonial;
    
    // Calculate 3D position for testimonial cards
    const radius = 320;
    const x = Math.sin((currentAngle * Math.PI) / 180) * radius;
    const z = Math.cos((currentAngle * Math.PI) / 180) * radius;
    const y = Math.sin((currentAngle * Math.PI) / 180) * 40;
    
    const scale = (z + radius) / (radius * 2) * 0.7 + 0.3;
    const opacity = (z + radius) / (radius * 2) * 0.8 + 0.2;
    
    return {
      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
      opacity: opacity,
      zIndex: Math.round(z + radius),
    };
  };

  const renderGlobePin = (country, coords, isActive) => {
    // Convert lat/lng to 3D sphere coordinates
    const phi = (90 - coords.lat) * (Math.PI / 180);
    const theta = (coords.lng + 180) * (Math.PI / 180);

    const globeRadius = 150;
    const x = -(globeRadius * Math.sin(phi) * Math.cos(theta));
    const y = -(globeRadius * Math.cos(phi));
    const z = globeRadius * Math.sin(phi) * Math.sin(theta);

    // Apply globe rotation
    const rotX = globeRotation.x * Math.PI / 180;
    const rotY = globeRotation.y * Math.PI / 180;

    // Rotate around Y axis (longitude)
    const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
    const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);

    // Rotate around X axis (latitude)
    const y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
    const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);

    // Only show pins on the visible side of the globe
    if (z2 < 0) return null;

    const scale = Math.max(0.3, (z2 + globeRadius) / (globeRadius * 2));
    const opacity = Math.max(0.4, scale);

    return (
      <div
        key={country}
        className={`absolute transition-all duration-1000 ${isActive ? 'z-30' : 'z-20'}`}
        style={{
          transform: `translate3d(${x1}px, ${y1}px, ${z2}px) scale(${scale})`,
          opacity: opacity,
          left: '50%',
          top: '50%',
        }}
      >
        <div className="relative transition-all duration-500">
          {/* Pin with Photo */}
          <div className={`relative transition-all duration-500 ${
            isActive ? 'scale-125' : 'scale-100'
          }`}>
            {/* Pin Base */}
            <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
              isActive
                ? 'bg-cyan-400'
                : 'bg-blue-400 hover:bg-blue-300'
            }`} style={{
              animation: isActive ? 'pinPulse 2s ease-in-out infinite' : 'none'
            }}></div>

            {/* Student Photo on Pin */}
            {testimonials.find(t => t.country === country)?.image && (
              <img
                src={testimonials.find(t => t.country === country).image}
                alt={testimonials.find(t => t.country === country).name}
                className="pin-photo absolute -top-8 left-1/2 transform -translate-x-1/2"
              />
            )}

            {/* Country Flag */}
            <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 text-sm transition-all duration-500 ${
              isActive ? 'scale-110' : 'scale-100'
            }`}>
              {coords.flag}
            </div>
          </div>

          {/* Callout for Active Pin */}
          {isActive && testimonials.find(t => t.country === country) && (
            <div className="absolute -bottom-20 left-1/2 pin-callout z-50">
              <div className="text-white text-xs">
                <div className="font-semibold mb-1">
                  {testimonials.find(t => t.country === country).name}
                </div>
                <div className="text-blue-300 mb-1">
                  {testimonials.find(t => t.country === country).course}
                </div>
                <div className="text-white/70">
                  {testimonials.find(t => t.country === country).university}
                </div>
                <div className="text-white/60 mt-1">
                  {country}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <style jsx>{`
        @keyframes globeRotate {
          0% { transform: rotateY(0deg) rotateX(-15deg); }
          100% { transform: rotateY(360deg) rotateX(-15deg); }
        }

        @keyframes subtleTwinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @keyframes testimonialFade {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0px); }
        }

        @keyframes gentleCloudDrift {
          0% { transform: translateX(0px); }
          100% { transform: translateX(20px); }
        }

        @keyframes pinPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .globe-auto-rotate {
          animation: globeRotate 30s linear infinite;
        }



        .globe-auto-rotate:hover {
          animation-play-state: paused;
        }

        .pin-callout {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 12px;
          min-width: 200px;
          transform: translateX(-50%);
        }

        .pin-photo {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
          object-fit: cover;
        }

        .space-background {
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
        }

        .earth-sphere {
          background:
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(0,0,0,0.6) 0%, transparent 70%),
            linear-gradient(45deg, #1e40af 0%, #0f766e 25%, #1e3a8a 50%, #0c4a6e 75%, #1e40af 100%);
          box-shadow:
            inset -40px -40px 80px rgba(0,0,0,0.7),
            inset 20px 20px 40px rgba(255,255,255,0.05),
            0 0 80px rgba(135, 206, 250, 0.3);
        }

        .atmospheric-glow {
          background: radial-gradient(circle, rgba(135, 206, 250, 0.2) 0%, rgba(135, 206, 250, 0.1) 60%, transparent 100%);
        }

        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }

        .city-lights {
          background:
            radial-gradient(circle at 15% 60%, rgba(255, 215, 0, 0.6) 0%, transparent 2%),
            radial-gradient(circle at 25% 45%, rgba(255, 255, 255, 0.4) 0%, transparent 1%),
            radial-gradient(circle at 35% 70%, rgba(255, 165, 0, 0.5) 0%, transparent 1.5%),
            radial-gradient(circle at 45% 55%, rgba(255, 255, 255, 0.3) 0%, transparent 1%),
            radial-gradient(circle at 55% 65%, rgba(255, 215, 0, 0.4) 0%, transparent 1.5%),
            radial-gradient(circle at 65% 50%, rgba(255, 255, 255, 0.5) 0%, transparent 1%),
            radial-gradient(circle at 75% 75%, rgba(255, 165, 0, 0.3) 0%, transparent 2%);
        }

        .atmospheric-glow {
          background: radial-gradient(circle, rgba(135, 206, 250, 0.3) 0%, rgba(135, 206, 250, 0.1) 70%, transparent 100%);
        }
      `}</style>

      <div className="relative w-full h-[700px] overflow-hidden space-background">
        {/* Subtle Starfield Background */}
        <div className="absolute inset-0">
          {/* Minimal star field */}
          {[...Array(50)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animation: `subtleTwinkle ${Math.random() * 3 + 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}


        </div>

      <div className="flex h-full items-center justify-center">
        {/* Full Width Globe Section */}
        <div className="flex items-center justify-center relative">
          <div
            className="relative w-[500px] h-[500px] cursor-pointer"
            style={{
              perspective: '1500px',
              transformStyle: 'preserve-3d'
            }}
            onClick={() => setIsAutoRotating(!isAutoRotating)}
          >
            {/* Globe Container */}
            <div
              className={`absolute inset-0 transition-transform duration-1000 ${isAutoRotating ? 'globe-auto-rotate' : ''}`}
              style={{
                transform: `rotateX(-15deg) rotateY(${globeRotation.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Subtle Atmospheric Glow */}
              <div className="absolute -inset-8 rounded-full atmospheric-glow opacity-50"></div>

              {/* Main Earth Sphere */}
              <div className="absolute inset-0 rounded-full earth-sphere shadow-2xl">
                {/* Realistic Continental Outlines */}
                <div className="absolute inset-0 rounded-full overflow-hidden opacity-70">
                  {/* North America */}
                  <div className="absolute w-14 h-18 bg-green-700/50 rounded-lg"
                    style={{ top: '25%', left: '15%', transform: 'rotate(-15deg)' }}></div>
                  {/* Europe */}
                  <div className="absolute w-10 h-6 bg-green-600/50 rounded-lg"
                    style={{ top: '30%', left: '45%', transform: 'rotate(10deg)' }}></div>
                  {/* Asia */}
                  <div className="absolute w-18 h-14 bg-green-600/50 rounded-lg"
                    style={{ top: '25%', left: '55%', transform: 'rotate(20deg)' }}></div>
                  {/* Australia */}
                  <div className="absolute w-6 h-4 bg-orange-600/50 rounded-lg"
                    style={{ top: '65%', left: '70%', transform: 'rotate(-10deg)' }}></div>
                  {/* Africa */}
                  <div className="absolute w-8 h-16 bg-cyan-600/50 rounded-lg"
                    style={{ top: '40%', left: '48%', transform: 'rotate(5deg)' }}></div>
                  {/* South America */}
                  <div className="absolute w-6 h-14 bg-green-700/50 rounded-lg"
                    style={{ top: '50%', left: '25%', transform: 'rotate(-20deg)' }}></div>
                </div>

                {/* Subtle City Lights on Night Side */}
                <div className="absolute inset-0 rounded-full">
                  <div className="absolute w-1 h-1 bg-cyan-300/60 rounded-full" style={{ top: '35%', left: '20%' }}></div>
                  <div className="absolute w-1 h-1 bg-cyan-300/60 rounded-full" style={{ top: '45%', left: '25%' }}></div>
                  <div className="absolute w-1 h-1 bg-cyan-300/60 rounded-full" style={{ top: '55%', left: '15%' }}></div>
                  <div className="absolute w-1 h-1 bg-cyan-300/60 rounded-full" style={{ top: '40%', left: '50%' }}></div>
                  <div className="absolute w-1 h-1 bg-cyan-300/60 rounded-full" style={{ top: '30%', left: '60%' }}></div>
                </div>

                {/* Subtle Cloud Layer */}
                <div className="absolute inset-0 rounded-full pointer-events-none">
                  <div
                    className="absolute w-20 h-6 bg-white/8 rounded-full blur-sm"
                    style={{
                      top: '30%',
                      left: '20%',
                      animation: 'gentleCloudDrift 40s linear infinite'
                    }}
                  ></div>
                  <div
                    className="absolute w-16 h-5 bg-white/10 rounded-full blur-sm"
                    style={{
                      top: '50%',
                      left: '60%',
                      animation: 'gentleCloudDrift 45s linear infinite reverse'
                    }}
                  ></div>
                  <div
                    className="absolute w-12 h-4 bg-white/6 rounded-full blur-sm"
                    style={{
                      top: '70%',
                      left: '40%',
                      animation: 'gentleCloudDrift 35s linear infinite'
                    }}
                  ></div>
                </div>



                {/* Subtle Surface Details */}
                <div className="absolute inset-0 rounded-full pointer-events-none">
                  {/* Ocean currents and weather patterns */}
                  <div className="absolute w-32 h-2 bg-blue-400/10 rounded-full blur-sm" style={{ top: '35%', left: '10%', transform: 'rotate(15deg)' }}></div>
                  <div className="absolute w-28 h-2 bg-blue-300/8 rounded-full blur-sm" style={{ top: '55%', left: '40%', transform: 'rotate(-10deg)' }}></div>
                  <div className="absolute w-24 h-2 bg-blue-400/10 rounded-full blur-sm" style={{ top: '75%', left: '20%', transform: 'rotate(25deg)' }}></div>
                </div>

                {/* Atmospheric glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300/20 via-transparent to-blue-800/20"></div>
              </div>
            </div>

            {/* Country Pins */}
            <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
              {Object.entries(countryCoordinates).map(([country, coords]) => {
                const isActive = testimonials[currentTestimonial]?.country === country;
                return renderGlobePin(country, coords, isActive);
              })}
            </div>

            {/* Globe Reflection */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)'
              }}
            ></div>
          </div>
        </div>

      </div>



      {/* Navigation Arrows */}
      <div className="absolute top-2 right-2">
        <button onClick={startAutoRotation} className="px-3 py-1 bg-white/90 rounded-md shadow">Start Rotation</button>
      </div>

      {/* Bottom instruction */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-black/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/10">
          <div className="text-white/80 text-sm font-medium">
            🌍 Student Stories from Around the World
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TestimonialGlobeCarousel;
