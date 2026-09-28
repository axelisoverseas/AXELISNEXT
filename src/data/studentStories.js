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

/* The four headline figures the homepage has always published, each with a
   photograph from the site's own library. */
export const IMPACT_STATS = [
  { to: 5000, suf: '+', label: 'Students placed', img: '/photos/photo-1523240795612-9a054b0db644-1600.jpg' },
  { to: 4500, suf: '+', label: 'Visas approved', img: '/photos/photo-1436491865332-7a61a109cc05-1600.jpg' },
  { to: 90, suf: '%', label: 'Visa success rate', img: '/photos/photo-1488646953014-85cb44e25828-1600.jpg' },
  { to: 30, pre: '₹', suf: '+ Cr', label: 'Education loans facilitated', img: '/photos/photo-1579621970795-87facc2f976d-1200.jpg' },
];

export const HERO_PHOTO = { src: '/photos/photo-1541339907198-e08756dedf3f-1600.jpg', alt: 'Graduates throwing their caps in the air' };

export const HERO_FLOATS = [
  { src: '/photos/photo-1513635269975-59663e0ac1ad-800.jpg', alt: 'London' },
  { src: '/photos/photo-1502602898657-3e91760cbb34-1200.jpg', alt: 'Paris' },
  { src: '/photos/photo-1590089415225-401ed6f9db8e-1200.jpg', alt: 'Dublin' },
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
