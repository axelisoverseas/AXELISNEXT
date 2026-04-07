import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

const HemisphereGlobe = ({ className = "" }) => {
  const globeRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

  // Country coordinates for major study destinations
  const countryCoordinates = {
    'USA': { lat: 39.8283, lng: -98.5795, flag: '🇺🇸' },
    'UK': { lat: 55.3781, lng: -3.4360, flag: '🇬🇧' },
    'Canada': { lat: 56.1304, lng: -106.3468, flag: '🇨🇦' },
    'Australia': { lat: -25.2744, lng: 133.7751, flag: '🇦🇺' },
    'Germany': { lat: 51.1657, lng: 10.4515, flag: '🇩🇪' },
    'France': { lat: 46.2276, lng: 2.2137, flag: '🇫🇷' },
    'Netherlands': { lat: 52.1326, lng: 5.2913, flag: '🇳🇱' },
    'Ireland': { lat: 53.4129, lng: -8.2439, flag: '🇮🇪' },
    'New Zealand': { lat: -40.9006, lng: 174.8860, flag: '🇳🇿' },
    'Switzerland': { lat: 46.8182, lng: 8.2275, flag: '🇨🇭' },
    'Japan': { lat: 36.2048, lng: 138.2529, flag: '🇯🇵' },
    'Singapore': { lat: 1.3521, lng: 103.8198, flag: '🇸🇬' }
  };

  // No points data - clean globe like testimonials
  const pointsData = [];

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      const container = globeRef.current?.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        setDimensions({
          width: Math.min(rect.width, 1000), // Larger size for main attraction
          height: Math.min(rect.height, 1000)
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (globeRef.current) {
      // Set initial position to show hemisphere
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 2.5 });
      
      // Start auto-rotation
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false;
      controls.enablePan = false;
    }
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Globe Container with Hemisphere Mask - Upside down, peeking from bottom */}
      <div className="relative overflow-hidden" style={{
        width: dimensions.width,
        height: dimensions.height / 2, // Half height for hemisphere
        borderRadius: `0 0 ${dimensions.width}px ${dimensions.width}px`, // Rounded bottom only
        background: 'transparent'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, // Position full globe so only top half shows (upside down effect)
          left: 0,
          width: dimensions.width,
          height: dimensions.height,
          transform: 'rotateX(180deg)' // Flip the globe upside down
        }}>
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

            // Points configuration
            pointsData={pointsData}
            pointAltitude={0.01}
            pointColor="color"
            pointRadius="size"
            pointResolution={8}

            // Enhanced Atmosphere for main attraction
            atmosphereColor="#4F46E5"
            atmosphereAltitude={0.25}

            // Animation settings
            animateIn={true}
          />
        </div>

        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(220, 38, 38, 0.1) 100%)'
          }}
        />
      </div>
      
      {/* Floating elements around the hemisphere */}
      <div className="absolute -top-4 -right-4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/4 -left-6 w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 -right-8 w-4 h-4 bg-cyan-300/60 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-400/20 via-transparent to-transparent blur-xl -z-10"></div>
    </div>
  );
};

export default HemisphereGlobe;
