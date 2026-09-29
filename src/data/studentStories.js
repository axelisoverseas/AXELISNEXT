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
  }))
  .concat([
    // From his video testimonial on /testimonials (YouTube J0W5a7lYbRk). The
    // quote is his spoken sentence with the filler words taken out; the photo
    // is a frame from the same video.
    {
      name: 'Raghav Verma',
      university: 'Warsaw University of Technology',
      country: 'Poland',
      quote: 'They helped me out in each and every aspect of the admission process.',
      img: '/students/raghav-verma.jpg',
    },
  ]);

/* The four headline figures the homepage has always published, each beside
   a photograph of the Bengaluru office (WorkFlo, KR Puram), the same premises
   photographed for lender verification. No student faces here, so nobody
   repeats from the story deck below. */
export const IMPACT_STATS = [
  { to: 5000, suf: '+', label: 'Students placed', img: '/office/office-reception.jpg', caption: 'Bengaluru office · WorkFlo, KR Puram' },
  { to: 4500, suf: '+', label: 'Visas approved', img: '/office/office-meeting.jpg', caption: 'Bengaluru office · meeting room' },
  { to: 90, suf: '%', label: 'Visa success rate', img: '/office/office-growth.jpg', caption: 'Bengaluru office · boardroom' },
  { to: 30, pre: '₹', suf: '+ Cr', label: 'Education loans facilitated', img: '/office/office-lounge.jpg', caption: 'Bengaluru office · lounge' },
];

// Graduates leaving McEwan Hall behind a piper, University of Edinburgh.
// CC BY 2.0, "This is Edinburgh" on Flickr via Wikimedia Commons; the licence
// needs the credit shown, which PhotoHero prints inside the photo window.
export const HERO_PHOTO = {
  src: '/hero/edinburgh-graduates.jpg',
  alt: 'Graduates in gowns walking out of McEwan Hall, University of Edinburgh, led by a piper',
  width: 2000, height: 1091, position: '62% 50%',
  credit: 'Photo: This is Edinburgh (edinburgh.org), CC BY 2.0',
  creditHref: 'https://commons.wikimedia.org/wiki/File:Edinburgh_Graduates_Leaving_Graduation_Hall_(21304053780).jpg',
};

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
