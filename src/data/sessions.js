import EPISODES from './sessions.json';

/**
 * The published counselling-session episodes, one landing page each
 * (/sessions/<slug>).
 *
 * sessions.json is compiled from the published cut of each episode: the YouTube
 * kit (title, chapters), the .srt of the final export (quotes and numbers, each
 * with the timestamp where it is said) and the consent register. Every student
 * here is consent tier A. Posters are rendered with the axelis-thumbnails skill
 * and live in public/sessions/<slug>/.
 */

// The destination photo behind each hero: the same library the homepage uses.
const BACKDROPS = {
  Germany: '/photos/photo-1527866959252-deab85ef7d1b-1200.jpg',
  Italy: '/photos/photo-1525874684015-58379d421a52-800.jpg',
  USA: '/photos/photo-1485871981521-5b1fd3805eee-1200.jpg',
  'United States': '/photos/photo-1485871981521-5b1fd3805eee-1200.jpg',
  UK: '/photos/photo-1513635269975-59663e0ac1ad-1200.jpg',
  'United Kingdom': '/photos/photo-1513635269975-59663e0ac1ad-1200.jpg',
  Ireland: '/photos/photo-1590089415225-401ed6f9db8e-1200.jpg',
  Canada: '/photos/photo-1517935706615-2717063c2225-1200.jpg',
  Netherlands: '/photos/photo-1512470876302-972faa2aa9a4-1200.jpg',
  France: '/photos/photo-1502602898657-3e91760cbb34-1200.jpg',
  Australia: '/photos/photo-1506973035872-a4ec16b8e8d9-1200.jpg',
};
const DEFAULT_BACKDROP = '/photos/photo-1541339907198-e08756dedf3f-1600.jpg';

const PLANS = {
  ILC: {
    key: 'ilc', tag: 'The plan for this route', name: 'Ivy League Charter',
    price: '₹19,999', small: '+ GST now',
    body: "For Master's and MBA applications to the eight Ivy League universities. Refunded if no university on your preference list makes you an offer; ₹1,80,000 + GST only if you accept an Ivy League offer. Other US universities on your list carry no success fee.",
    img: '/photos/photo-1485871981521-5b1fd3805eee-1200.jpg', alt: 'New York',
  },
  GAC: {
    key: 'gac', tag: 'The plan for this route', name: 'Global Admissions Charter',
    price: '₹9,999', small: '+ GST, refundable',
    body: 'For paid-tuition universities: the UK, USA, Canada, Ireland, Australia and more. The deposit comes back once you are placed, or if no university on your preference list makes you an offer.',
    img: '/photos/photo-1513635269975-59663e0ac1ad-1200.jpg', alt: 'London',
  },
  EPC: {
    key: 'epc', tag: 'The plan for this route', name: 'Europe Public Charter',
    price: '₹19,999', small: '+ GST now',
    body: 'For tuition-free public universities in Germany, France, Italy, the Netherlands and more. Refunded if no university on your preference list makes you an offer. Private universities included free.',
    img: '/photos/photo-1527866959252-deab85ef7d1b-1200.jpg', alt: 'Germany',
  },
};

export const SESSIONS = EPISODES.map((e) => ({
  ...e,
  poster: `/sessions/${e.slug}/poster.jpg`,
  // Only when the student was on camera; otherwise the page shows their initials.
  face: e.student_on_camera ? `/sessions/${e.slug}/face.jpg` : null,
  initials: e.student.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
  backdrop: BACKDROPS[e.destination] || DEFAULT_BACKDROP,
  plan: e.route ? PLANS[e.route] : null,
  numbers: e.numbers || [],
  quotes: e.quotes || [],
  takeaways: e.takeaways || [],
  chapters: e.chapters || [],
  profile: e.profile || [],
}));

export const SESSION_SLUGS = SESSIONS.map((e) => e.slug);

export const getSession = (slug) => SESSIONS.find((e) => e.slug === slug);

/** One video at a time: each page hands on to the next episode, and the last to the first. */
export const nextSession = (slug) => {
  const i = SESSIONS.findIndex((e) => e.slug === slug);
  return i < 0 || SESSIONS.length < 2 ? null : SESSIONS[(i + 1) % SESSIONS.length];
};

export const formatDuration = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
export const isoDuration = (sec) => `PT${Math.floor(sec / 60)}M${sec % 60}S`;
