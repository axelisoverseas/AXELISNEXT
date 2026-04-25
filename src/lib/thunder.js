// Synthesized thunder clip — initial crack + 3 rolling rumbles.
// Uses Web Audio API; fires entirely from a user gesture (no asset to load).
// Skips when prefers-reduced-motion is set.

export function playThunder({ volume = 0.6 } = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  } catch {}

  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;

  const ctx = new Ctx();
  // iOS Safari can start the context in 'suspended' state — resume from gesture.
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;

  // Brown noise buffer (richer low end than white noise, like a thunder bed).
  const bufLen = Math.floor(ctx.sampleRate * 1.6);
  const buffer = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufLen; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }

  const master = ctx.createGain();
  master.gain.value = volume;
  master.connect(ctx.destination);

  // 1) Initial crack — bright transient that sweeps quickly down to mid.
  const crack = ctx.createBufferSource();
  crack.buffer = buffer;
  const crackFilter = ctx.createBiquadFilter();
  crackFilter.type = 'lowpass';
  crackFilter.frequency.setValueAtTime(2400, now);
  crackFilter.frequency.exponentialRampToValueAtTime(450, now + 0.45);
  const crackGain = ctx.createGain();
  crackGain.gain.setValueAtTime(0.0001, now);
  crackGain.gain.exponentialRampToValueAtTime(0.95, now + 0.025);
  crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
  crack.connect(crackFilter);
  crackFilter.connect(crackGain);
  crackGain.connect(master);
  crack.start(now);
  crack.stop(now + 0.6);

  // 2) Three overlapping rumble rolls — each a low-pass sweep from its starting freq down to ~70 Hz,
  //    staggered to give the "rolling thunder" feeling.
  const rolls = [
    { delay: 0.18, startFreq: 800, endFreq: 90,  dur: 1.7, peak: 0.55 },
    { delay: 0.65, startFreq: 380, endFreq: 70,  dur: 2.4, peak: 0.75 },
    { delay: 1.50, startFreq: 230, endFreq: 60,  dur: 2.6, peak: 0.5  },
  ];
  rolls.forEach(({ delay, startFreq, endFreq, dur, peak }) => {
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.Q.value = 0.7;
    f.frequency.setValueAtTime(startFreq, now + delay);
    f.frequency.exponentialRampToValueAtTime(endFreq, now + delay + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, now + delay);
    g.gain.exponentialRampToValueAtTime(peak, now + delay + 0.18);
    g.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
    src.connect(f);
    f.connect(g);
    g.connect(master);
    src.start(now + delay);
    src.stop(now + delay + dur + 0.05);
  });

  // Tear down once the longest tail finishes (~4 s).
  setTimeout(() => {
    try { ctx.close(); } catch {}
  }, 4500);
}
