// Testimonial Images - Real uploaded photos
import arnabImage from './Arnab Chakravortytestimonial.jpg';
import palakImage from './Palak Shahtestimonial.JPG';
import vasundharaImage from './Mvasundhara raotestimonial.png';
import shivangiImage from './Shivangi SEntestimonial.JPG';
import neeteshImage from './Neetesh Jaintestimonial.jpg';
import siddhantImage from './Siddhant babartestimonial.jpeg';
import dikshaImage from './Diksha Babbartestimonial.jpeg';
import anshImage from './Ansh Sonchhatratestimonial.jpeg';

// Placeholder function to generate avatar URLs as fallback
const generateAvatarUrl = (name) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=300&background=random&color=fff&bold=true`;
};

// Export testimonial images object with real uploaded images
export const testimonialImages = {
  'Arnab Chakravorty': arnabImage,
  'Palak Shah': palakImage,
  'M Vasundhara Rao': vasundharaImage,
  'Shivangi Sen': shivangiImage,
  'Neetesh Jain': neeteshImage,
  'Siddhant Babar': siddhantImage,
  'Diksha Babbar': dikshaImage,
  'Ansh Sonchhatra': anshImage,
};

// Fallback function for any missing images
export const getTestimonialImage = (name) => {
  return testimonialImages[name] || generateAvatarUrl(name);
};

export default testimonialImages;
