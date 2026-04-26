// Ambient space-pad music — sustained organ-like chords with a slow progression,
// stacked octave/fifth partials, and a long feedback-delay reverb tail.
// Inspired by Hans Zimmer's Interstellar pad textures.
//
// Returns a handle: { resume(), stop({ fadeOut }) }.
// AudioContext must be resumed from a user gesture; call resume() from a click/key/touch handler.

const CHORDS = [
  // Dm   (D3, F3, A3)  + D2 root
  [73.42, 146.83, 174.61, 220.00],
  // Bbmaj  (Bb2, D3, F3) + Bb1 root  — bVI in D minor
  [58.27, 116.54, 146.83, 174.61],
  // Fmaj   (F2, A2, C3, F3) — bIII
  [87.31, 110.00, 130.81, 174.61],
  // Cmaj   (C2, E3, G3, C4)  — bVII
  [65.41, 164.81, 196.00, 261.63],
];

export function playSpaceMusic({ volume = 0.18 } = {}) {
  if (typeof window === 'undefined') return { resume: () => {}, stop: () => {} };
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return { resume: () => {}, stop: () => {} };
    }
  } catch {}

  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return { resume: () => {}, stop: () => {} };

  const ctx = new Ctx();

  // ===== Master =====
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // ===== Long feedback-delay "space" reverb =====
  // Two delay taps fed back through a low-pass filter — gives a wide, warm tail.
  const sendIn = ctx.createGain();
  sendIn.gain.value = 0.55;
  const reverbLP = ctx.createBiquadFilter();
  reverbLP.type = 'lowpass';
  reverbLP.frequency.value = 2200;
  const d1 = ctx.createDelay(2.0);
  d1.delayTime.value = 0.62;
  const d2 = ctx.createDelay(2.0);
  d2.delayTime.value = 1.07;
  const fb = ctx.createGain();
  fb.gain.value = 0.58;
  sendIn.connect(reverbLP);
  reverbLP.connect(d1);
  d1.connect(d2);
  d2.connect(fb);
  fb.connect(d1);
  d1.connect(master);
  d2.connect(master);

  const CHORD_DUR = 8.0; // seconds per chord
  const FADE_IN = 1.2;   // master swell-in (short so it's audible immediately on resume)
  const ATTACK = 1.4;    // per-note attack
  const RELEASE = 2.0;   // per-note release

  // Per-note voice = 4 stacked partials for organ-pad timbre.
  function spawnVoice(freq, when, duration) {
    const partials = [
      { type: 'sine',     mult: 1.0, gain: 1.00, detune: 0   },
      { type: 'sine',     mult: 1.0, gain: 0.55, detune: -8  }, // detune lower
      { type: 'sine',     mult: 1.0, gain: 0.55, detune: +8  }, // detune higher
      { type: 'triangle', mult: 2.0, gain: 0.22, detune: 0   }, // octave shimmer
      { type: 'sine',     mult: 3.0, gain: 0.10, detune: 0   }, // fifth above octave (perfect 12th)
    ];
    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      osc.type = p.type;
      osc.frequency.value = freq * p.mult;
      osc.detune.value = p.detune;
      const g = ctx.createGain();
      const peak = p.gain * 0.10;
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(peak, when + ATTACK);
      g.gain.setValueAtTime(peak, when + duration - RELEASE);
      g.gain.exponentialRampToValueAtTime(0.0001, when + duration);
      osc.connect(g);
      g.connect(master);
      g.connect(sendIn);
      osc.start(when);
      osc.stop(when + duration + 0.1);
    });
  }

  function spawnChord(notes, when) {
    notes.forEach((f) => spawnVoice(f, when, CHORD_DUR + 1.0)); // 1s overlap into next chord
  }

  // Look-ahead scheduler so chords keep flowing.
  let nextTime = 0;
  let cycle = 0;
  let schedulerId = null;
  let started = false;
  let stopped = false;

  function scheduleAhead() {
    if (stopped) return;
    while (nextTime - ctx.currentTime < 14) {
      const chord = CHORDS[cycle % CHORDS.length];
      spawnChord(chord, nextTime);
      nextTime += CHORD_DUR;
      cycle++;
    }
  }

  function start() {
    if (started || stopped) return;
    started = true;
    nextTime = ctx.currentTime + 0.05;
    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + FADE_IN);
    scheduleAhead();
    schedulerId = setInterval(scheduleAhead, 4000);
  }

  function resume() {
    if (stopped) return;
    if (ctx.state === 'suspended') {
      ctx.resume().then(start).catch(() => {});
    } else {
      start();
    }
  }

  function stop({ fadeOut = 1.6 } = {}) {
    if (stopped) return;
    stopped = true;
    if (schedulerId) clearInterval(schedulerId);
    // Critical: do NOT cancelScheduledValues. The fade-in was scheduled while
    // the ctx was suspended (ctx-time 0 → FADE_IN). If the user pressed Enter
    // before the ctx ever resumed (very common — Enter is often the first
    // gesture), cancelling here would lock master at 0.0001 and the music
    // would never become audible. Instead, let the fade-in run, then ramp out.
    const fadeOutStart = Math.max(ctx.currentTime + 0.05, FADE_IN);
    const fadeOutEnd = fadeOutStart + fadeOut;
    try {
      master.gain.setValueAtTime(volume, fadeOutStart);
      master.gain.exponentialRampToValueAtTime(0.0001, fadeOutEnd);
    } catch {}
    const closeDelayMs = Math.max(0, (fadeOutEnd - ctx.currentTime) * 1000) + 400;
    setTimeout(() => {
      try { ctx.close(); } catch {}
    }, closeDelayMs);
  }

  // Schedule chords + ramp immediately on a suspended context. WebAudio events
  // are timestamped against ctx.currentTime, which is frozen while suspended and
  // resumes counting where it left off — so when resume() lands, music plays
  // from the top with no perceptible delay.
  start();
  if (ctx.state === 'running') {
    /* already audible */
  }

  return { resume, stop };
}
