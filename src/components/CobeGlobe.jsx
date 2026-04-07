"use client";
import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

const CobeGlobe = ({ className = '', size = 'full' }) => {
  const canvasRef = useRef();
  const globeRef = useRef();

  useEffect(() => {
    let phi = 0;

    if (canvasRef.current) {
      // Clean up any existing globe
      if (globeRef.current) {
        globeRef.current.destroy();
      }

      // Create the globe
      globeRef.current = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: canvasRef.current.offsetWidth * 2,
        height: canvasRef.current.offsetHeight * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 1.2,
        baseColor: [0.1, 0.3, 0.5], // Deep blue base
        markerColor: [1, 0.84, 0], // Gold markers for study destinations
        glowColor: [0.1, 0.6, 0.5], // Teal glow
        markers: [
          // Major study destinations
          { location: [51.5074, -0.1278], size: 0.08 }, // London, UK
          { location: [40.7128, -74.0060], size: 0.08 }, // New York, USA
          { location: [43.6532, -79.3832], size: 0.08 }, // Toronto, Canada
          { location: [-33.8688, 151.2093], size: 0.08 }, // Sydney, Australia
          { location: [52.3676, 4.9041], size: 0.06 }, // Amsterdam, Netherlands
          { location: [59.3293, 18.0686], size: 0.06 }, // Stockholm, Sweden
          { location: [53.3498, -6.2603], size: 0.06 }, // Dublin, Ireland
          { location: [52.5200, 13.4050], size: 0.06 }, // Berlin, Germany
          { location: [48.8566, 2.3522], size: 0.06 }, // Paris, France
          { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo, Japan
          { location: [1.3521, 103.8198], size: 0.06 }, // Singapore
          { location: [37.5665, 126.9780], size: 0.06 }, // Seoul, South Korea
        ],
        onRender: (state) => {
          // Smooth rotation
          state.phi = phi;
          phi += 0.003;

          // Resize canvas if container size changed
          const canvas = canvasRef.current;
          if (canvas) {
            const { offsetWidth, offsetHeight } = canvas;
            if (state.width !== offsetWidth * 2 || state.height !== offsetHeight * 2) {
              state.width = offsetWidth * 2;
              state.height = offsetHeight * 2;
            }
          }
        },
      });
    }

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current && globeRef.current) {
        const canvas = canvasRef.current;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (globeRef.current) {
        globeRef.current.destroy();
      }
    };
  }, []);

  const sizeClasses = {
    full: 'w-full h-full',
    large: 'w-[800px] h-[800px]',
    medium: 'w-[600px] h-[600px]',
    small: 'w-[400px] h-[400px]'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-0 animate-fadeIn"
        style={{
          animation: 'fadeIn 1s ease-in-out 0.5s forwards',
        }}
      />

      {/* Custom CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out 0.5s forwards;
        }
      `}</style>
    </div>
  );
};

export default CobeGlobe;
