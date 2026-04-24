"use client";
import dynamic from 'next/dynamic';

const LightningCanvas = dynamic(() => import('./lightning-canvas'), { ssr: false });
const RainParticles = dynamic(() => import('./rain-particles'), { ssr: false });

const PHASE_CLASS = {
  storm: 'bg-storm-top',
  transition: 'bg-transition-sky',
  dawn: 'bg-dawn-bottom',
};

const PHASE_BLOB_COLORS = {
  storm: { a: 'rgba(124, 200, 255, 0.10)', b: 'rgba(37, 99, 235, 0.12)' },
  transition: { a: 'rgba(124, 200, 255, 0.08)', b: 'rgba(245, 184, 119, 0.08)' },
  dawn: { a: 'rgba(245, 184, 119, 0.14)', b: 'rgba(124, 200, 255, 0.08)' },
};

export default function StormBackdrop({
  phase = 'storm',
  intensity = 'normal',
  showRain = false,
  showLightning = true,
  showBlobs = true,
  className = '',
}) {
  const lightningIntensity = intensity === 'dim' ? 0.28 : 0.55;
  const lightningSize = intensity === 'dim' ? 1.6 : 2;
  const blobs = PHASE_BLOB_COLORS[phase];

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${PHASE_CLASS[phase]} ${className}`}
    >
      {showBlobs && (
        <>
          <div
            className="absolute -top-32 -left-20 w-[60%] h-[60%] rounded-full blur-3xl animate-bg-first"
            style={{ background: blobs.a }}
          />
          <div
            className="absolute -bottom-32 -right-20 w-[55%] h-[55%] rounded-full blur-3xl animate-bg-third"
            style={{ background: blobs.b }}
          />
        </>
      )}

      {showLightning && phase !== 'dawn' && (
        <div className="absolute inset-0 opacity-80">
          <LightningCanvas
            hue={phase === 'storm' ? 220 : 228}
            intensity={lightningIntensity}
            size={lightningSize}
            speed={phase === 'storm' ? 1.4 : 0.9}
          />
        </div>
      )}

      {showRain && (
        <div className="absolute inset-0">
          <RainParticles density={phase === 'storm' ? 0.7 : 0.35} angle={-14} opacity={0.28} />
        </div>
      )}

      {phase !== 'storm' && (
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background:
              'linear-gradient(0deg, var(--dawn-mist) 0%, transparent 100%)',
          }}
        />
      )}
    </div>
  );
}
