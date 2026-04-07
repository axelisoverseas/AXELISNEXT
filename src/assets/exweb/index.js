// Team Member Images - Using public directory paths
const rishabhImage = '/assets/exweb/rishabh-agrawal.png';
const harjyotImage = '/assets/exweb/harjyot-kaur.png';
const johnImage = '/assets/exweb/john-daniel.jpg';

// Additional assets
const axelisLogoBlack = '/assets/exweb/axelis overseas black logo full.png';
const axelisRicketLogo = '/assets/exweb/axelis ricket logo.png';
const scholarshipBanner = '/assets/exweb/3 cr worth scholarships banner.jpg';
const globeImage = '/assets/exweb/globe multiple coutnries image.jpg';
const graduationCapIcon = '/assets/exweb/graduation cap icon.png';
const graduationCapBooks = '/assets/exweb/graduuation cap with books.png';
const noFeeIcon = '/assets/exweb/no fee.png';
const partTimeJobIcon = '/assets/exweb/part time job.png';
const houseIcon = '/assets/exweb/house.png';
const manSittingDesk = '/assets/exweb/man siitting on a desk .png';
const mapImage = '/assets/exweb/map1.png';
const universityLogosUK = '/assets/exweb/university names and logo uk.webp';
const squareBanner = '/assets/exweb/square banner.png';
const bannerLinkedin = '/assets/exweb/banner linkedin.png';
const aoStoriesCreative = '/assets/exweb/ao stories creative.png';

// Testimonial student images
const anshImage = '/assets/exweb/ansh sonchhatra.jpeg';
const arnabImage = '/assets/exweb/arnab chakravorty.png';
const dikshaImage = '/assets/exweb/diksha babbar.jpeg';
const vasundharaImage = '/assets/exweb/m vasundhara rao.png';
const neeteshImage = '/assets/exweb/neetesh jain.jpg';
const palakImage = '/assets/exweb/palak shah.jpg';
const shivangiImage = '/assets/exweb/shivangi sen.jpg';
const siddhantImage = '/assets/exweb/siddhant babar.jpeg';

// Placeholder function to generate avatar URLs as fallback
const generateAvatarUrl = (name) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=300&background=145da0&color=fff&bold=true`;
};

// Export team member images object with real uploaded images
export const teamMemberImages = {
  'Rishabh Agrawal': rishabhImage,
  'Harjyot Kaur': harjyotImage,
  'John Daniel': johnImage,
  'Shristi Agrawal': '/assets/exweb/1725395896723shristi.jpeg',
  'Shubham Murkunde': '/assets/exweb/1706721617257shubham.jpeg',
  'Shubhangi Pandey': '/assets/exweb/shubhangi pandey pm.jpeg',
};

// Fallback function for any missing team member images
export const getTeamMemberImage = (name) => {
  return teamMemberImages[name] || generateAvatarUrl(name);
};

// Export testimonial student images
export const testimonialImages = {
  'Ansh Sonchhatra': anshImage,
  'Arnab Chakravorty': arnabImage,
  'Diksha Babbar': dikshaImage,
  'M Vasundhara Rao': vasundharaImage,
  'Neetesh Jain': neeteshImage,
  'Palak Shah': palakImage,
  'Shivangi Sen': shivangiImage,
  'Siddhant Babar': siddhantImage,
};

// Export additional assets
export const assets = {
  logos: {
    axelisBlack: axelisLogoBlack,
    axelisRicket: axelisRicketLogo,
  },
  banners: {
    scholarship: scholarshipBanner,
    square: squareBanner,
    linkedin: bannerLinkedin,
    aoStories: aoStoriesCreative,
  },
  icons: {
    globe: globeImage,
    graduationCap: graduationCapIcon,
    graduationCapBooks: graduationCapBooks,
    noFee: noFeeIcon,
    partTimeJob: partTimeJobIcon,
    house: houseIcon,
    manSittingDesk: manSittingDesk,
  },
  images: {
    map: mapImage,
    universityLogosUK: universityLogosUK,
  }
};

export default {
  teamMemberImages,
  getTeamMemberImage,
  testimonialImages,
  assets
};
