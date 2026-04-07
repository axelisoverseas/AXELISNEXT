// Team Member Images - Real uploaded photos from exweb directory
// Files have been renamed to remove spaces for better Vite compatibility
import rishabhImage from './rishabh-agrawal.png';
import harjyotImage from './harjyot-kaur.png';
import johnImage from './john-daniel.jpg';


// Additional assets
import axelisLogoBlack from './axelis overseas black logo full.png';
import axelisRicketLogo from './axelis ricket logo.png';
import scholarshipBanner from './3 cr worth scholarships banner.jpg';
import globeImage from './globe multiple coutnries image.jpg';
import graduationCapIcon from './graduation cap icon.png';
import graduationCapBooks from './graduuation cap with books.png';
import noFeeIcon from './no fee.png';
import partTimeJobIcon from './part time job.png';
import houseIcon from './house.png';
import manSittingDesk from './man siitting on a desk .png';
import mapImage from './map1.png';
import universityLogosUK from './university names and logo uk.webp';
import squareBanner from './square banner.png';
import bannerLinkedin from './banner linkedin.png';
import aoStoriesCreative from './ao stories creative.png';

// Testimonial student images
import anshImage from './ansh sonchhatra.jpeg';
import arnabImage from './arnab chakravorty.png';
import dikshaImage from './diksha babbar.jpeg';
import vasundharaImage from './m vasundhara rao.png';
import neeteshImage from './neetesh jain.jpg';
import palakImage from './palak shah.jpg';
import shivangiImage from './shivangi sen.jpg';
import siddhantImage from './siddhant babar.jpeg';

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
  'Shristi Agrawal': '/1725395896723shristi.jpeg',
  'Shubham Murkunde': '/1706721617257shubham.jpeg',
  'Shubhangi Pandey': '/shubhangi pandey pm.jpeg',
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
