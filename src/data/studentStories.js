import { testimonials } from './siteData';

/**
 * Published student stories, shaped for the scroll components.
 *
 * Only students whose photo is already live on /testimonials. The quote is the
 * first sentence of their own words, unedited. Photos are 600x750 web copies
 * in public/students (the originals in public/assets/testimonials run to 6 MB).
 */
const firstSentence = (t) => (t.match(/^.*?[.!?](\s|$)/)?.[0] || t).trim();
const slug = (name) => name.toLowerCase().replace(/\s+/g, '-');

export const STUDENT_STORIES = testimonials
  .filter((t) => t.image && t.image.startsWith('/assets/'))
  .map((t) => ({
    name: t.name,
    university: t.university,
    country: t.country,
    quote: firstSentence(t.content || t.review || ''),
    img: `/students/${slug(t.name)}.jpg`,
  }));

/* The four headline figures the homepage has always published. Each carries
   an Axelis-owned photograph: three placed students (all already published
   with consent on /testimonials) and a real Polish study visa, redacted, from
   the proof gallery. Stock images (a library, a map, a coin jar) are gone. */
export const IMPACT_STATS = [
  { to: 5000, suf: '+', label: 'Students placed', img: '/students/hd/shivangi-sen.jpg', caption: 'Shivangi Sen · University of Toronto' },
  { to: 4500, suf: '+', label: 'Visas approved', img: '/students/hd/visa-poland.jpg', caption: 'A real study visa, Poland (details redacted)' },
  { to: 90, suf: '%', label: 'Visa success rate', img: '/students/hd/siddhant-babar.jpg', caption: 'Siddhant Babar · Cardiff University' },
  { to: 30, pre: '₹', suf: '+ Cr', label: 'Education loans facilitated', img: '/students/hd/arnab-chakravorty.jpg', caption: 'Arnab Chakravorty · University of Nottingham' },
];

// An owned photo of a real placement, not the stock cap-throwing shot every
// consultancy uses: Palak Shah (University of Westminster) in London.
export const HERO_PHOTO = { src: '/students/hd/palak-shah-hero-wide.jpg', alt: 'Palak Shah, placed at the University of Westminster, in London', width: 2000, height: 1250, position: '50% 50%' };

// Five placed students shown above the fold, all published with consent on /testimonials.
export const HERO_FACES = ['Arnab Chakravorty', 'Palak Shah', 'Shivangi Sen', 'Siddhant Babar', 'Diksha Babbar']
  .map((n) => STUDENT_STORIES.find((t) => t.name === n))
  .filter(Boolean);

export const HERO_FLOATS = [
  { src: '/photos/photo-1543832923-44667a44c804-800.jpg', alt: 'London' },
  { src: '/photos/photo-1502602898657-3e91760cbb34-1200.jpg', alt: 'Paris' },
  { src: '/photos/photo-1590089415225-401ed6f9db8e-1200.jpg', alt: 'Ireland' },
  { src: '/photos/photo-1527866959252-deab85ef7d1b-1200.jpg', alt: 'Germany' },
];

export const ANJALI_VIDEO = {
  src: '/videos/anjali_sangwan_poland_compressed.mp4',
  poster: '/videos/anjali_sangwan_poster.jpg',
  width: 404,
  height: 720,
  quote: 'I am finally here in Poland.',
  caption: 'Anjali Sangwan · BA Economics, Vistula University',
};
