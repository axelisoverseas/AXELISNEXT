import React, { useState } from 'react';
import { Youtube } from 'lucide-react';
import { getVideosByCategory } from '../services/youtubeService';

// Axelis content thumbnail component using real images
const ThumbnailImage = ({ videoId, title, index, duration }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const urls = [
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, // Start with hqdefault (more reliable)
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/default.jpg`
  ];

  const currentThumbnailSrc = urls[currentUrlIndex];

  const handleImageLoad = () => {
    console.log(`✅ YouTube thumbnail loaded: ${currentThumbnailSrc}`);
    setImageLoaded(true);
    setHasError(false);
  };

  const handleImageError = (e) => {
    console.log(`❌ YouTube thumbnail failed: ${currentThumbnailSrc} (attempt ${currentUrlIndex + 1})`);

    // Try next URL
    if (currentUrlIndex < urls.length - 1) {
      console.log(`🔄 Trying next URL (${currentUrlIndex + 2}/${urls.length})...`);
      setCurrentUrlIndex(prev => prev + 1);
      setImageLoaded(false);
      setHasError(false);
    } else {
      console.log(`💥 All YouTube URLs failed, using SVG fallback`);
      setHasError(true);
      setImageLoaded(true);
    }
  };

  // Create fallback SVG
  const fallbackSvg = `data:image/svg+xml;base64,${btoa(`
    <svg width="320" height="180" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2563EB;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1E40AF;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#grad1)"/>
      <text x="160" y="70" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">AXELIS</text>
      <text x="160" y="95" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle" opacity="0.9">Study Abroad</text>
      <text x="160" y="115" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle" opacity="0.7">Video Guide</text>
      <circle cx="160" cy="135" r="15" fill="rgba(239, 68, 68, 0.9)"/>
      <polygon points="155,130 155,140 165,135" fill="white"/>
    </svg>
  `)}`;

  return (
    <div className="w-full h-full relative">
      <img
        src={hasError ? fallbackSvg : currentThumbnailSrc}
        alt={title}
        className="w-full h-full object-cover"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-500 text-xs">Loading...</div>
        </div>
      )}

      {/* Duration Badge */}
      {duration && (
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded font-medium">
          {duration}
        </div>
      )}
    </div>
  );
};

const VideoWidget = ({ category = 'All', title = 'Related Videos', limit = 2 }) => {
  const videos = getVideosByCategory(category).slice(0, limit);

  const openVideoOnYouTube = (video) => {
    console.log('🎬 Opening video on YouTube:', video.title);
    console.log('🎬 Video ID:', video.videoId);
    const youtubeUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
    window.open(youtubeUrl, '_blank');
  };



  if (videos.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <Youtube className="text-blue-600 mr-2" size={20} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        
        <div className="space-y-4">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="flex gap-3 cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
              onClick={() => {
                console.log('🖱️ Video clicked:', video.title);
                openVideoOnYouTube(video);
              }}
            >
              {/* Thumbnail - 10% bigger */}
              <div className="flex-shrink-0 relative">
                <div className="w-22 h-14 rounded overflow-hidden relative"
                     style={{ width: '88px', height: '52.8px' }}>
                  {/* Axelis content thumbnail */}
                  <ThumbnailImage
                    videoId={video.videoId}
                    title={video.title}
                    index={index}
                    duration={video.duration}
                  />

                  {/* Play Button Overlay - TEMPORARILY REMOVED FOR TESTING */}
                  {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-50 transition-all duration-300 rounded">
                    <div className="bg-red-600 rounded-full p-1.5 transform hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play className="text-white" size={10} fill="currentColor" />
                    </div>
                  </div> */}
                </div>
              </div>
              
              {/* Video Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {video.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{video.publishedAt}</span>
                </div>
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    openVideoOnYouTube(video);
                  }}
                >
                  WATCH ON YOUTUBE
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default VideoWidget;
