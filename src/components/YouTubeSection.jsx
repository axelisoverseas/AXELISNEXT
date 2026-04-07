import React, { useState, useEffect } from 'react';
import { Play, X, Youtube, ExternalLink } from 'lucide-react';
import { getFeaturedVideos, channelInfo, preloadThumbnails } from '../services/youtubeService';
import YouTubeThumbnail from './YouTubeThumbnail';

const YouTubeSection = ({ limit = 4, showChannelInfo = true }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Get featured videos from the service
  const videos = getFeaturedVideos(limit);

  // Preload thumbnails for better performance
  useEffect(() => {
    preloadThumbnails(videos);
  }, [videos]);

  // Handle ESC key to close video modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && selectedVideo) {
        closeVideoModal();
      }
    };

    if (selectedVideo) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedVideo]);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Youtube className="text-blue-600 mr-3" size={32} />
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Latest from Our YouTube Channel
              </h2>
            </div>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Stay updated with our latest videos on study abroad tips, university guides, and student success stories
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group border border-neutral-200"
                onClick={() => openVideoModal(video)}
              >
                {/* Thumbnail */}
                <YouTubeThumbnail
                  videoId={video.videoId}
                  title={video.title}
                  duration={video.duration}
                  category={video.category}
                  className="h-48"
                  showPlayButton={true}
                  showDuration={true}
                  showCategory={false}
                  index={index + 1}
                />

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-neutral-600">
                    <span>{video.views} views</span>
                    <span>{video.publishedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Channel Info & CTA */}
          {showChannelInfo && (
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8 max-w-2xl mx-auto border border-neutral-200">
                <div className="flex items-center justify-center mb-4">
                  <Youtube className="text-blue-600 mr-3" size={32} />
                  <div>
                    <h3 className="text-xl font-bold text-black">{channelInfo.name}</h3>
                    <p className="text-neutral-600">{channelInfo.handle}</p>
                  </div>
                </div>
                <p className="text-neutral-600 mb-4">{channelInfo.description}</p>
                <div className="flex justify-center gap-6 text-sm text-neutral-500 mb-4">
                  <span>{channelInfo.subscribers} subscribers</span>
                  <span>{channelInfo.totalVideos} videos</span>
                </div>
              </div>

              <a
                href={channelInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-blue-500/20 hover:border-cyan-400/40"
                style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}
              >
                <Youtube className="mr-2 text-blue-200" size={20} />
                Subscribe to Our Channel
                <ExternalLink className="ml-2" size={16} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 modal-backdrop"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-300"
            >
              <X size={20} />
            </button>

            {/* Video Player */}
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                title={selectedVideo.title}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-black mb-2">
                {selectedVideo.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <span>{selectedVideo.views} views</span>
                <span>{selectedVideo.publishedAt}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YouTubeSection;
