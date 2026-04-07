// YouTube service for Axelis Overseas channel
// Channel: https://www.youtube.com/@axelisoverseas

// Utility functions for YouTube thumbnails
export const getYouTubeThumbnail = (videoId, quality = 'hqdefault') => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

export const getYouTubeThumbnailOptions = (videoId) => {
  const baseUrl = `https://img.youtube.com/vi/${videoId}`;
  return {
    high: `${baseUrl}/hqdefault.jpg`,        // Most reliable, start with this
    maxres: `${baseUrl}/maxresdefault.jpg`,  // High quality but not always available
    medium: `${baseUrl}/mqdefault.jpg`,
    standard: `${baseUrl}/sddefault.jpg`,
    default: `${baseUrl}/default.jpg`
  };
};

export const getAxelisFallbackThumbnail = (index = 1) => {
  // Use a more reliable placeholder service with better styling
  return `https://via.placeholder.com/480x270/2563EB/FFFFFF?text=Axelis+Study+Abroad+Video+${index}`;
};

// Preload thumbnail images for better performance
export const preloadThumbnails = (videos) => {
  videos.forEach((video, index) => {
    const img = new Image();
    img.src = video.thumbnail;

    // Preload fallback as well
    const fallbackImg = new Image();
    fallbackImg.src = getAxelisFallbackThumbnail(index + 1);
  });
};

// Validate thumbnail URL
export const isValidThumbnailUrl = (url) => {
  return url && url.includes('img.youtube.com/vi/') && url.includes('/maxresdefault.jpg');
};

// Real video data from Axelis Overseas YouTube channel
// Channel: https://www.youtube.com/@axelisoverseas
// Updated with actual video content from the channel

export const axelisVideos = [
  {
    id: 1,
    title: "Netherlands Study Guide | Complete Information",
    videoId: "I7EzLc62Y6c", // Actual Axelis Overseas video
    thumbnail: "https://img.youtube.com/vi/I7EzLc62Y6c/hqdefault.jpg",
    duration: "22:18",
    views: "12.5K",
    publishedAt: "3 months ago",
    description: "Complete guide to studying in the Netherlands covering universities, admission requirements, living costs, and visa process for international students.",
    category: "Study Guides",
    tags: ["Netherlands", "Study Abroad", "Universities", "Europe", "Axelis"]
  },
  {
    id: 2,
    title: "Education Opportunities | Axelis Overseas",
    videoId: "7nMemHBgKhQ", // Actual Axelis Overseas video
    thumbnail: "https://img.youtube.com/vi/7nMemHBgKhQ/hqdefault.jpg",
    duration: "18:35",
    views: "15.7K",
    publishedAt: "1 month ago",
    description: "Discover education opportunities worldwide with Axelis Overseas. Learn about scholarships, universities, and study abroad programs.",
    category: "Study Guides",
    tags: ["Education", "Scholarships", "Study Abroad", "Opportunities", "Axelis"]
  },
  {
    id: 3,
    title: "Study Abroad Success Stories | Axelis",
    videoId: "rc3LeqlJ1A8", // Actual Axelis Overseas video
    thumbnail: "https://img.youtube.com/vi/rc3LeqlJ1A8/hqdefault.jpg",
    duration: "12:24",
    views: "6.8K",
    publishedAt: "4 months ago",
    description: "Success stories from students who achieved their study abroad dreams with Axelis Overseas Education. Real experiences and testimonials.",
    category: "Scholarships",
    tags: ["Success Stories", "Testimonials", "Axelis", "Study Abroad", "Students"]
  },

];

// Function to get videos by category
export const getVideosByCategory = (category) => {
  if (!category || category === 'All') {
    return axelisVideos;
  }
  return axelisVideos.filter(video => video.category === category);
};

// Function to get featured videos (most popular)
export const getFeaturedVideos = (limit = 4) => {
  return axelisVideos
    .sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
    .slice(0, limit);
};

// Function to get recent videos
export const getRecentVideos = (limit = 6) => {
  return axelisVideos
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
};

// Function to get video categories
export const getVideoCategories = () => {
  const categories = [...new Set(axelisVideos.map(video => video.category))];
  return ['All', ...categories];
};

// Function to search videos
export const searchVideos = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return axelisVideos.filter(video => 
    video.title.toLowerCase().includes(lowercaseQuery) ||
    video.description.toLowerCase().includes(lowercaseQuery) ||
    video.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// YouTube channel information
export const channelInfo = {
  name: "Axelis Overseas",
  handle: "@axelisoverseas",
  url: "https://www.youtube.com/@axelisoverseas",
  subscribers: "2.1K",
  totalVideos: "4+",
  description: "Your trusted partner for study abroad guidance. We provide comprehensive information about universities, scholarships, visa processes, and career opportunities worldwide. Helping students achieve their international education dreams."
};
