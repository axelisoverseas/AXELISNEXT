import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const Professional3DGlobe = ({ testimonials = [] }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const globeRef = useRef();
  const intervalRef = useRef(null);

  // Early return if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="flex items-center justify-center h-[800px] bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="text-center">
          <div className="text-2xl mb-4">🌍</div>
          <div className="text-lg text-gray-600">Loading testimonials...</div>
        </div>
      </div>
    );
  }

  // Country coordinates for major study destinations
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
      }, 8000); // 8 seconds per testimonial
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoRotating, testimonials.length]);

  // Update globe auto-rotation
  useEffect(() => {
    if (globeRef.current && globeRef.current.controls()) {
      globeRef.current.controls().autoRotate = isAutoRotating;
      globeRef.current.controls().autoRotateSpeed = 0.3;
    }
  }, [isAutoRotating]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial dimensions
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);





  return (

    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0B1426 0%, #1B2951 30%, #2E4A99 60%, #4A6FA5 100%)',
        backgroundImage: `
          radial-gradient(2px 2px at 20px 30px, #fff, transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
          radial-gradient(1px 1px at 90px 40px, #fff, transparent),
          radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
          radial-gradient(2px 2px at 160px 30px, #fff, transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 100px'
      }}
    >
        {/* Subtle Starfield Background */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animation: `twinkle ${Math.random() * 3 + 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Professional 3D Globe */}
        <div className="absolute inset-0">
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              showAtmosphere={true}
              atmosphereColor="#87CEEB"
              atmosphereAltitude={0.15}
              enablePointerInteraction={true}
              onGlobeReady={() => {
                if (globeRef.current && globeRef.current.controls()) {
                  globeRef.current.controls().autoRotate = isAutoRotating;
                  globeRef.current.controls().autoRotateSpeed = 0.3;
                  globeRef.current.controls().enableZoom = true;
                  globeRef.current.controls().minDistance = 200;
                  globeRef.current.controls().maxDistance = 800;
                }
              }}


            />
        </div>



        {/* Bottom instruction */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl px-8 py-3 border border-white/10">
            <div className="text-white/90 text-lg font-semibold mb-1">
              🌍 Global Student Success Stories
            </div>
            <div className="text-white/70 text-sm">
              Explore testimonials from students worldwide • Click pins for details
            </div>
          </div>
        </div>

        {/* Current testimonial indicator */}
        <div className="absolute bottom-6 right-6">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
            <div className="text-white/80 text-xs">
              {currentTestimonial + 1} of {testimonials.length}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Professional3DGlobe;
