import React, { useState, useEffect } from 'react';
import { Play, AlertCircle } from 'lucide-react';
import { getYouTubeThumbnailOptions, getAxelisFallbackThumbnail } from '../services/youtubeService';

const YouTubeThumbnail = ({
  videoId,
  title,
  duration,
  category,
  className = '',
  showPlayButton = true,
  showDuration = true,
  showCategory = false,
  onClick,
  index = 1,
  aspectRatio = '16/9',
  size = 'medium' // 'small', 'medium', 'large'
}) => {
  const [currentThumbnail, setCurrentThumbnail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  const thumbnailOptions = getYouTubeThumbnailOptions(videoId);
  const thumbnailUrls = Object.values(thumbnailOptions);

  useEffect(() => {
    console.log(`Loading thumbnail for video ID: ${videoId}`);

    // Reset states
    setIsLoading(true);
    setHasError(false);
    setThumbnailIndex(0);

    // Start with hqdefault as it's more reliable than maxresdefault
    const initialThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    console.log(`Initial thumbnail URL: ${initialThumbnailUrl}`);

    setCurrentThumbnail(initialThumbnailUrl);
  }, [videoId]);

  const handleImageLoad = () => {
    console.log(`Thumbnail loaded successfully for ${videoId}`);
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = (e) => {
    console.error(`Thumbnail failed for ${videoId}:`, e);
    console.log(`Current thumbnail URL: ${currentThumbnail}`);
    console.log(`Current thumbnail index: ${thumbnailIndex}`);

    // Try next thumbnail quality
    if (thumbnailIndex < thumbnailUrls.length - 1) {
      const nextIndex = thumbnailIndex + 1;
      const nextUrl = thumbnailUrls[nextIndex];
      console.log(`🔄 Trying next thumbnail (${nextIndex + 1}/${thumbnailUrls.length}): ${nextUrl}`);

      setThumbnailIndex(nextIndex);
      setCurrentThumbnail(nextUrl);
      setHasError(false);
    } else {
      console.log(`💥 All thumbnail URLs failed, showing fallback for ${videoId}`);
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const getPlayButtonSize = () => {
    switch (size) {
      case 'small':
        return { buttonPadding: 'p-2', iconSize: 12 };
      case 'large':
        return { buttonPadding: 'p-5', iconSize: 28 };
      default:
        return { buttonPadding: 'p-3 md:p-4', iconSize: 20 };
    }
  };

  const { buttonPadding, iconSize } = getPlayButtonSize();

  return (
    <div
      className={`youtube-thumbnail-container relative cursor-pointer ${className}`}
      style={{ aspectRatio }}
      onClick={handleClick}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 z-10 rounded-t-xl">
          <div className="flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="text-xs text-neutral-600">Loading video...</span>
          </div>
        </div>
      )}

      {/* Show fallback image when error occurs */}
      {hasError && !isLoading && (
        <img
          src={getAxelisFallbackThumbnail(index)}
          alt={title}
          className="w-full h-full object-cover rounded-t-xl"
          onError={() => console.log('Fallback image also failed')}
        />
      )}

      {/* Thumbnail Image */}
      <img
        src={currentThumbnail}
        alt={title}
        className={`youtube-thumbnail w-full h-full object-cover rounded-t-xl ${
          isLoading ? 'loading opacity-0' : 'loaded opacity-100'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ transition: 'opacity 0.3s ease-in-out' }}
      />

      {/* Play Button Overlay */}
      {showPlayButton && !isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center hover:bg-opacity-60 transition-all duration-300 rounded-t-xl">
          <div className={`bg-blue-600 rounded-full ${buttonPadding} transform hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <Play className="text-white ml-0.5" size={iconSize} fill="currentColor" />
          </div>
        </div>
      )}

      {/* Duration Badge */}
      {showDuration && duration && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded font-medium">
          {duration}
        </div>
      )}

      {/* Category Badge */}
      {showCategory && category && (
        <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded font-medium">
          {category}
        </div>
      )}

      {/* Error State Indicator */}
      {hasError && (
        <div className="absolute top-2 right-2 bg-warning-500 text-white text-xs px-2 py-1 rounded">
          Preview
        </div>
      )}
    </div>
  );
};

export default YouTubeThumbnail;
