// Synthesized thunder clip — multi-transient crisp crack + sub-bass impact + rolling rumble.
// Real-thunder structure: an initial sharp tear (the strike), a sub-bass body, then ~6 seconds
// of low-pass-swept rolling cloud rumble that fades into distance.
// Uses Web Audio API only — no asset to download. Fires from a user gesture so autoplay
// policies pass. Skips when prefers-reduced-motion is set.

export function playThunder({ volume = 0.7 } = {}) {
  if (typeof window === 'undefined') return;
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  } catch {}

  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;

  const ctx = new Ctx();
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});

  const now = ctx.currentTime;
  const TOTAL = 8.5; // seconds

  // ========= Noise buffers =========
  // White noise — used for the sharp crack (rich highs).
  const whiteLen = Math.floor(ctx.sampleRate * 0.6);
  const whiteBuffer = ctx.createBuffer(1, whiteLen, ctx.sampleRate);
  const whiteData = whiteBuffer.getChannelData(0);
  for (let i = 0; i < whiteLen; i++) whiteData[i] = Math.random() * 2 - 1;

  // Brown noise — used for the deep rumble (rich lows).
  const brownLen = Math.floor(ctx.sampleRate * 4.0);
  const brownBuffer = ctx.createBuffer(1, brownLen, ctx.sampleRate);
  const brownData = brownBuffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < brownLen; i++) {
    const w = Math.random() * 2 - 1;
    last = (last + 0.02 * w) / 1.02;
    brownData[i] = last * 3.5;
  }

  // ========= Master + ambience send (feedback-delay tail = "distance") =========
  const master = ctx.createGain();
  master.gain.value = volume;
  master.connect(ctx.destination);

  const ambience = ctx.createGain();
  ambience.gain.value = 0.30;
  const delay = ctx.createDelay(0.6);
  delay.delayTime.value = 0.16;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.42;
  const ambienceLP = ctx.createBiquadFilter();
  ambienceLP.type = 'lowpass';
  ambienceLP.frequency.value = 900;
  ambience.connect(ambienceLP);
  ambienceLP.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(master);

  // ========= 1) SHARP CRACK — 4 staggered bandpass transients =========
  // Real lightning produces multiple quick discharges (step leader + return strokes).
  // Each transient sweeps from bright to dim, giving the "crackling" texture.
  const cracks = [
    { t: 0.00, hp: 1800, lp: 11000, peak: 1.10, dur: 0.18 }, // brightest tear
    { t: 0.035, hp: 1200, lp: 8000,  peak: 0.95, dur: 0.22 },
    { t: 0.090, hp: 700,  lp: 5000,  peak: 0.80, dur: 0.30 },
    { t: 0.170, hp: 350,  lp: 2800,  peak: 0.65, dur: 0.45 }, // rolloff into rumble
  ];
  cracks.forEach(({ t, hp, lp, peak, dur }) => {
    const src = ctx.createBufferSource();
    src.buffer = whiteBuffer;
    const hpf = ctx.createBiquadFilter();
    hpf.type = 'highpass';
    hpf.frequency.value = hp;
    hpf.Q.value = 0.7;
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.setValueAtTime(lp, now + t);
    lpf.frequency.exponentialRampToValueAtTime(lp * 0.25, now + t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, now + t);
    g.gain.exponentialRampToValueAtTime(peak, now + t + 0.004); // razor-fast attack = crispness
    g.gain.exponentialRampToValueAtTime(0.001, now + t + dur);
    src.connect(hpf);
    hpf.connect(lpf);
    lpf.connect(g);
    g.connect(master);
    g.connect(ambience);
    src.start(now + t);
    src.stop(now + t + dur + 0.05);
  });

  // ========= 2) SUB-BASS IMPACT — the body of the strike you feel in your chest =========
  const thump = ctx.createOscillator();
  thump.type = 'sine';
  thump.frequency.setValueAtTime(85, now);
  thump.frequency.exponentialRampToValueAtTime(32, now + 0.7);
  const thumpGain = ctx.createGain();
  thumpGain.gain.setValueAtTime(0.0001, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.85, now + 0.015);
  thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
  thump.connect(thumpGain);
  thumpGain.connect(master);
  thump.start(now);
  thump.stop(now + 0.95);

  // ========= 3) ROLLING CLOUD RUMBLE — 5 overlapping low-pass-swept brown noise rolls =========
  // Each roll is amplitude-modulated by a slow LFO to mimic the "rolling" character of
  // sound bouncing between cloud layers. Total span ~7s, fading into distance.
  const rolls = [
    { delay: 0.35, startFreq: 700, endFreq: 90, dur: 2.6, peak: 0.55, modRate: 1.4, modDepth: 0.35 },
    { delay: 0.95, startFreq: 360, endFreq: 70, dur: 3.6, peak: 0.75, modRate: 0.95, modDepth: 0.4 },
    { delay: 2.00, startFreq: 220, endFreq: 60, dur: 4.0, peak: 0.70, modRate: 0.7, modDepth: 0.45 },
    { delay: 3.50, startFreq: 170, endFreq: 50, dur: 3.5, peak: 0.55, modRate: 0.55, modDepth: 0.4 },
    { delay: 5.00, startFreq: 120, endFreq: 42, dur: 3.2, peak: 0.40, modRate: 0.42, modDepth: 0.35 },
  ];
  rolls.forEach(({ delay, startFreq, endFreq, dur, peak, modRate, modDepth }) => {
    const src = ctx.createBufferSource();
    src.buffer = brownBuffer;
    src.loop = true;
    src.playbackRate.value = 0.75 + Math.random() * 0.35;

    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.Q.value = 0.85;
    f.frequency.setValueAtTime(startFreq, now + delay);
    f.frequency.exponentialRampToValueAtTime(endFreq, now + delay + dur);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, now + delay);
    g.gain.exponentialRampToValueAtTime(peak, now + delay + 0.30);
    g.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);

    // LFO modulates the gain to create the rolling/pulsing feel.
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = modRate;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = peak * modDepth;
    lfo.connect(lfoGain);
    lfoGain.connect(g.gain);

    src.connect(f);
    f.connect(g);
    g.connect(master);
    g.connect(ambience);
    src.start(now + delay);
    src.stop(now + delay + dur + 0.05);
    lfo.start(now + delay);
    lfo.stop(now + delay + dur + 0.05);
  });

  // Cleanup once the longest tail finishes.
  setTimeout(() => {
    try { ctx.close(); } catch {}
  }, TOTAL * 1000 + 500);
}
