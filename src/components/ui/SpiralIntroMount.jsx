'use client';

import dynamic from 'next/dynamic';

const SpiralIntro = dynamic(() => import('./SpiralIntro'), { ssr: false });

export default function SpiralIntroMount() {
  return <SpiralIntro />;
}
