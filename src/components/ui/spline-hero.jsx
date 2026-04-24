"use client";
import { Suspense, lazy, useEffect, useRef, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

function PlanetFallback({ className = '' }) {
  return (
    <div
      aria-hidden
      className={`backdrop-blur-3xl rounded-full ${className}`}
      style={{
        background:
          'radial-gradient(circle at 25% 90%, #1e386b 15%, #000000de 70%, #000000ed 100%)',
      }}
    />
  );
}

export default function SplineHero({
  sceneUrl = process.env.NEXT_PUBLIC_SPLINE_HERO_URL || '',
  className = '',
  fallbackClassName = '',
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!sceneUrl) return;
    if (!ref.current || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [sceneUrl]);

  if (!sceneUrl) {
    return <PlanetFallback className={`${className} ${fallbackClassName}`} />;
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {inView ? (
        <Suspense fallback={<PlanetFallback className={`absolute inset-0 ${fallbackClassName}`} />}>
          <Spline scene={sceneUrl} style={{ width: '100%', height: '100%' }} />
        </Suspense>
      ) : (
        <PlanetFallback className={`absolute inset-0 ${fallbackClassName}`} />
      )}
    </div>
  );
}

export { PlanetFallback };
