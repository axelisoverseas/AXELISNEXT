// Testimonial Images - Using public directory paths
const arnabImage = '/assets/testimonials/Arnab Chakravortytestimonial.jpg';
const palakImage = '/assets/testimonials/Palak Shahtestimonial.JPG';
const vasundharaImage = '/assets/testimonials/Mvasundhara raotestimonial.png';
const shivangiImage = '/assets/testimonials/Shivangi SEntestimonial.JPG';
const neeteshImage = '/assets/testimonials/Neetesh Jaintestimonial.jpg';
const siddhantImage = '/assets/testimonials/Siddhant babartestimonial.jpeg';
const dikshaImage = '/assets/testimonials/Diksha Babbartestimonial.jpeg';
const anshImage = '/assets/testimonials/Ansh Sonchhatratestimonial.jpeg';

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
