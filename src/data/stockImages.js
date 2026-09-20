// High-quality stock images from Unsplash for education and consulting themes
// All images are free to use under Unsplash License

export const stockImages = {
  // Hero backgrounds
  hero: {
    education: '/photos/photo-1523240795612-9a054b0db644-1600.jpg',
    students: '/photos/photo-1541339907198-e08756dedf3f-1600.jpg',
    graduation: '/photos/photo-1523240795612-9a054b0db644-1600.jpg',
    consulting: '/photos/photo-1560472354-b33ff0c44a43-1600.jpg'
  },

  // About page images
  about: {
    team: '/photos/photo-1522071820081-009f0129c71c-1600.jpg',
    office: '/photos/photo-1497366216548-37526070297c-1600.jpg',
    mission: '/photos/photo-1517245386807-bb43f82c33c4-1600.jpg'
  },

  // Education themes
  education: {
    library: '/photos/photo-1481627834876-b7833e8f5570-1600.jpg',
    classroom: '/photos/photo-1562774053-701939374585-1600.jpg',
    university: '/photos/photo-1607013251379-e6eecfffe234-1600.jpg',
    books: '/photos/photo-1507003211169-0a1dd7228f2d-1600.jpg'
  },

  // International/Global themes
  global: {
    world: '/photos/photo-1451187580459-43490279c0fa-1600.jpg',
    passport: '/photos/photo-1488646953014-85cb44e25828-1600.jpg',
    airplane: '/photos/photo-1436491865332-7a61a109cc05-1600.jpg',
    flags: '/photos/photo-1557804506-669a67965ba0-1600.jpg'
  },

  // Professional/Business themes
  business: {
    meeting: '/photos/photo-1552664730-d307ca884978-1600.jpg',
    handshake: '/photos/photo-1521791136064-7986c2920216-1600.jpg',
    consultation: '/photos/photo-1573496359142-b8d87734a5a2-1600.jpg',
    planning: '/photos/photo-1454165804606-c3d57bc86b40-1600.jpg'
  },

  // Success/Achievement themes
  success: {
    celebration: '/photos/photo-1523240795612-9a054b0db644-1600.jpg',
    achievement: '/photos/photo-1571019613454-1cb2f99b2d8b-1600.jpg',
    diploma: '/photos/photo-1434030216411-0b793f4b4173-1600.jpg'
  },

  // Technology/Modern themes
  technology: {
    laptop: '/photos/photo-1484807352052-23338990c6c6-1600.jpg',
    online: '/photos/photo-1516321318423-f06f85e504b3-1600.jpg',
    digital: '/photos/photo-1551288049-bebda4e38f71-1600.jpg'
  }
};

// Helper function to get optimized image URL with specific dimensions
export const getOptimizedImageUrl = (imageUrl, width = 1920, height = 1080, quality = 80) => {
  if (imageUrl.includes('unsplash.com')) {
    return `${imageUrl}&w=${width}&h=${height}&q=${quality}&fit=crop`;
  }
  return imageUrl;
};

// Helper function to get responsive image URLs for different screen sizes
export const getResponsiveImageUrls = (imageUrl) => {
  if (imageUrl.includes('unsplash.com')) {
    return {
      mobile: `${imageUrl}&w=768&h=432&q=80&fit=crop`,
      tablet: `${imageUrl}&w=1024&h=576&q=80&fit=crop`,
      desktop: `${imageUrl}&w=1920&h=1080&q=80&fit=crop`,
      large: `${imageUrl}&w=2560&h=1440&q=80&fit=crop`
    };
  }
  return {
    mobile: imageUrl,
    tablet: imageUrl,
    desktop: imageUrl,
    large: imageUrl
  };
};

export default stockImages;
