"use client";
import StormBackdrop from './storm-backdrop';

const PADDING = {
  default: 'py-24',
  tight: 'py-16',
  hero: 'pt-32 pb-24',
  none: '',
};

export default function StormSection({
  phase = 'storm',
  id,
  className = '',
  padding = 'default',
  showLightning = false,
  showRain = false,
  showBlobs = true,
  intensity = 'normal',
  children,
}) {
  return (
    <section id={id} className={`relative overflow-hidden ${PADDING[padding] || ''} ${className}`}>
      <StormBackdrop
        phase={phase}
        showLightning={showLightning}
        showRain={showRain}
        showBlobs={showBlobs}
        intensity={intensity}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
