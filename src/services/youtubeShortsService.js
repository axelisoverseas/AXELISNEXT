// YouTube Shorts service for Axelis Overseas channel
// Channel: https://www.youtube.com/@axelisoverseas

// Note: To use real YouTube Data API, you'll need:
// 1. YouTube Data API v3 key from Google Cloud Console
// 2. Channel ID for @axelisoverseas
// 3. Enable CORS or use a backend proxy

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY || '';
const AXELIS_CHANNEL_ID = 'UCYourChannelIdHere'; // Replace with actual channel ID
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Function to get channel ID from channel handle
export const getChannelIdFromHandle = async (handle) => {
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key not found. Using mock data.');
    return null;
  }

  try {
    const response = await fetch(
      `${YOUTUBE_API_BASE_URL}/search?part=snippet&type=channel&q=${handle}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items[0].snippet.channelId;
    }
    return null;
  } catch (error) {
    console.error('Error fetching channel ID:', error);
    return null;
  }
};

// Function to fetch YouTube Shorts from the channel
export const fetchYouTubeShorts = async (channelId = AXELIS_CHANNEL_ID, maxResults = 10) => {
  if (!YOUTUBE_API_KEY) {
    console.warn('YouTube API key not found. Using mock data.');
    return getMockYouTubeShorts();
  }

  try {
    // First, get the channel's uploads playlist ID
    const channelResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`
    );
    const channelData = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found');
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Get recent videos from the uploads playlist
    const videosResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults * 2}&key=${YOUTUBE_API_KEY}`
    );
    const videosData = await videosResponse.json();

    if (!videosData.items) {
      throw new Error('No videos found');
    }

    // Get detailed video information to filter for Shorts (duration < 60 seconds)
    const videoIds = videosData.items.map(item => item.snippet.resourceId.videoId).join(',');
    const detailsResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    const detailsData = await detailsResponse.json();

    // Filter for Shorts (videos under 60 seconds)
    const shorts = detailsData.items
      .filter(video => {
        const duration = video.contentDetails.duration;
        // Parse ISO 8601 duration (PT1M30S format)
        const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
        const minutes = parseInt(match[1] || 0);
        const seconds = parseInt(match[2] || 0);
        const totalSeconds = minutes * 60 + seconds;
        return totalSeconds <= 60; // Shorts are typically 60 seconds or less
      })
      .slice(0, maxResults)
      .map((video, index) => ({
        id: video.id,
        videoId: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high.url,
        videoUrl: `https://www.youtube.com/shorts/${video.id}`,
        views: formatViewCount(video.statistics.viewCount),
        likes: formatViewCount(video.statistics.likeCount),
        comments: parseInt(video.statistics.commentCount || 0),
        duration: formatDuration(video.contentDetails.duration),
        publishedAt: formatPublishedDate(video.snippet.publishedAt),
        description: video.snippet.description
      }));

    return shorts;
  } catch (error) {
    console.error('Error fetching YouTube Shorts:', error);
    return getMockYouTubeShorts();
  }
};

// Helper function to format view count
const formatViewCount = (count) => {
  const num = parseInt(count);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Helper function to format duration from ISO 8601
const formatDuration = (duration) => {
  const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  const minutes = parseInt(match[1] || 0);
  const seconds = parseInt(match[2] || 0);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Helper function to format published date
const formatPublishedDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
};

// Mock data for when API is not available
const getMockYouTubeShorts = () => [
  {
    id: '1',
    videoId: 'dQw4w9WgXcQ',
    title: '🇬🇧 UK Study Visa Process in 60 Seconds! Complete Guide',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '15.2K',
    likes: '1.2K',
    comments: 89,
    duration: '0:58',
    publishedAt: '2 days ago',
    description: 'Quick guide to UK student visa process - everything you need to know! #StudyInUK #StudentVisa #AxelisOverseas'
  },
  {
    id: '2',
    videoId: '9bZkp7q19f0',
    title: '💰 FREE Universities in Germany - No Tuition Fees!',
    thumbnail: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '23.8K',
    likes: '2.1K',
    comments: 156,
    duration: '0:45',
    publishedAt: '5 days ago',
    description: 'Study in Germany for FREE! Top public universities with zero tuition fees. #StudyInGermany #FreeEducation #AxelisOverseas'
  },
  {
    id: '3',
    videoId: 'fJ9rUzIMcZQ',
    title: '🎓 Scholarship Alert: ₹80 Lakh Saved!',
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '31.5K',
    likes: '3.2K',
    comments: 234,
    duration: '0:52',
    publishedAt: '1 week ago',
    description: 'Our student saved ₹80 lakhs with this scholarship! See how we can help you too. #Scholarship #StudyAbroad #AxelisOverseas'
  },
  {
    id: '4',
    videoId: 'y6120QOlsfU',
    title: '🇨🇦 Canada PR After Studies - Complete Process',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '18.7K',
    likes: '1.8K',
    comments: 127,
    duration: '0:59',
    publishedAt: '1 week ago',
    description: 'Get Canada PR after your studies! Step-by-step process explained. #CanadaPR #StudyInCanada #AxelisOverseas'
  },
  {
    id: '5',
    videoId: 'JGwWNGJdvx8',
    title: '⚡ IELTS Score Requirements - Country Wise',
    thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '42.3K',
    likes: '4.1K',
    comments: 312,
    duration: '0:48',
    publishedAt: '2 weeks ago',
    description: 'IELTS requirements for different countries! Save this for your study abroad journey. #IELTS #StudyAbroad #AxelisOverseas'
  },
  {
    id: '6',
    videoId: 'L_jWHffIx5E',
    title: '🏠 Student Accommodation Guide - Save Money!',
    thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '12.9K',
    likes: '987',
    comments: 76,
    duration: '0:55',
    publishedAt: '2 weeks ago',
    description: 'Best ways to find affordable student accommodation abroad! Money-saving tips inside. #StudentLife #Accommodation #AxelisOverseas'
  }
];

// Function to get YouTube Shorts (with fallback to mock data)
export const getYouTubeShorts = async (maxResults = 6) => {
  try {
    // Try to get channel ID first
    const channelId = await getChannelIdFromHandle('axelisoverseas');

    if (channelId) {
      return await fetchYouTubeShorts(channelId, maxResults);
    } else {
      return getMockYouTubeShorts().slice(0, maxResults);
    }
  } catch (error) {
    console.error('Error in getYouTubeShorts:', error);
    return getMockYouTubeShorts().slice(0, maxResults);
  }
};

export default {
  getYouTubeShorts,
  fetchYouTubeShorts,
  getChannelIdFromHandle
};
