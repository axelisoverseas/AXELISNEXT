"use client";
import React, { useState, useEffect } from 'react';
import { Play, ExternalLink, Youtube, Heart, MessageCircle, Share2, Eye, X } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { StartJourneyCTA } from './CTAButton';
import { getYouTubeShorts } from '../services/youtubeShortsService';
import { SocialMediaInline } from './SocialMediaButtons';
import { getUniqueVideoShuffle, simpleVideoShuffle } from '../utils/videoShuffler';

// Import actual YouTube Shorts videos (only existing files)
// Note: Some video imports are commented out to prevent 502 errors
// Using working video files directly from public directory
const netherlandsWork = '/reels/netherlands_part_time_work.mp4';
const ardnavStory = '/reels/ardnav_success_story.mp4';
const rajatSuccess = '/reels/rajat_dublin_success.mp4';
const dutchEducation = '/reels/dutch_education_future.mp4';
const netherlandsVisa = '/reels/netherlands_visa_work_opportunities.mp4';
const netherlandsTop = '/reels/netherlands_top_destination.mp4';
const studyTiming = '/reels/study_abroad_timing.mp4';
const axelisTiming = '/reels/axelis_journey_timing.mp4';
const educationLoan = '/reels/education_loan_no_collateral.mp4';
const originalReel2 = '/reels/Blink-52856e8e-73eb-4b68-b410-8a448a2ab881-Edited-1.mp4';
const reel3 = '/reels/reel3.mp4';
const reel4 = '/reels/reel4.mp4';

// Actual YouTube Shorts data from Axelis Overseas channel
const youtubeShorts = [
  {
    id: '1',
    videoSrc: ardnavStory,
    title: "🌟 Student Success Story - Ardnav's Journey with Axelis",
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '31.2K',
    likes: '3.4K',
    comments: 234,
    duration: '0:52',
    publishedAt: '1 week ago',
    description: 'Hear from Ardnav as he shares his journey with Axelis Overseas and how our expert services helped him achieve his dreams!'
  },
  {
    id: '2',
    videoSrc: netherlandsWork,
    title: 'Earn While You Learn: €9-€12/Hour in Netherlands! 💶🇳🇱',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '18.7K',
    likes: '1.9K',
    comments: 89,
    duration: '0:45',
    publishedAt: '5 days ago',
    description: 'Earn While You Learn: €9-€12/Hour in the Netherlands! Explore how part-time work can enhance your study experience!'
  },
  {
    id: '3',
    videoSrc: rajatSuccess,
    title: '🎓 Rajat Limaye - MSc Mechanical Engineering Success!',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '22.5K',
    likes: '2.3K',
    comments: 127,
    duration: '0:59',
    publishedAt: '1 week ago',
    description: 'Rajat Limaye - MSc Mechanical Engineering - Dublin City University - Sept 2024. Another success story!'
  },
  {
    id: '4',
    videoSrc: educationLoan,
    title: '💸 Education Loan - No Collateral, Up to ₹1 CR!',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '38.7K',
    likes: '4.2K',
    comments: 267,
    duration: '0:59',
    publishedAt: '1 month ago',
    description: 'Get your Education Loan – No Collateral, up to ₹1 CR, from 27+ Banks in just 7 Days! Dreaming of studying abroad?'
  },
  {
    id: '5',
    videoSrc: dutchEducation,
    title: '🇳🇱✨ Unlock Your Future with Dutch Education!',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '16.8K',
    likes: '1.7K',
    comments: 98,
    duration: '0:48',
    publishedAt: '2 weeks ago',
    description: 'Unlock Your Future with a Dutch Education! Thinking of studying in the Netherlands? Discover why it\'s perfect!'
  },
  {
    id: '6',
    videoSrc: netherlandsVisa,
    title: '🇳🇱 Netherlands Visa & Post-Study Work Opportunities!',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '28.4K',
    likes: '2.9K',
    comments: 187,
    duration: '0:56',
    publishedAt: '2 weeks ago',
    description: 'Unlock Your Future: Visa & Post-Study Work Opportunities in the Netherlands! Curious about career prospects?'
  },
  {
    id: '7',
    videoSrc: netherlandsTop,
    title: '🌍 WHY Netherlands is #1 Study Destination for Indians!',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '42.1K',
    likes: '4.3K',
    comments: 298,
    duration: '0:52',
    publishedAt: '3 weeks ago',
    description: 'WHY the Netherlands is the #1 Study Abroad Destination for Indian Students in 2025! Looking for perfect destination?'
  },
  {
    id: '8',
    videoSrc: studyTiming,
    title: '🎓✨ Study Abroad Timing - When to Start Preparing?',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '19.6K',
    likes: '2.1K',
    comments: 134,
    duration: '0:48',
    publishedAt: '3 weeks ago',
    description: 'Dreaming of studying abroad? Timing is everything! When should you start preparing? Expert advice inside!'
  },
  {
    id: '9',
    videoSrc: axelisTiming,
    title: '🎓🌍 When to Start Your Study Abroad Journey with Axelis?',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '15.3K',
    likes: '1.6K',
    comments: 89,
    duration: '0:44',
    publishedAt: '1 month ago',
    description: 'When to Start Your Study Abroad Journey with Axelis Overseas? Thinking about studying abroad? Perfect timing guide!'
  },
  {
    id: '10',
    videoSrc: reel3, // Using working video instead of problematic one
    title: '🌟 Axelis Success Stories - Student Journey',
    videoUrl: 'https://www.youtube.com/@axelisoverseas',
    views: '12.4K',
    likes: '1.3K',
    comments: 67,
    duration: '0:45',
    publishedAt: '1 month ago',
    description: 'Watch how Axelis Overseas transforms student dreams into reality. Your success story could be next!'
  }
];

const YouTubeShortCard = ({ short, index, onVideoClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = React.useRef(null);

  // Set different preview times for each video
  const previewTime = React.useMemo(() => {
    const times = [3, 7, 12, 5, 9, 2, 8, 11, 4, 6];
    return times[index % times.length];
  }, [index]);

  React.useEffect(() => {
    if (videoRef.current && !videoError) {
      videoRef.current.currentTime = previewTime;
    }
  }, [previewTime, videoError]);

  // Update progress bar
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        const progressPercent = (video.currentTime / video.duration) * 100;
        setProgress(progressPercent);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && short.videoSrc && !videoError) {
      videoRef.current.currentTime = previewTime;
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions
        console.log('Autoplay prevented');
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && short.videoSrc) {
      videoRef.current.pause();
      videoRef.current.currentTime = previewTime;
      setProgress(0);
    }
  };

  const handleShortClick = () => {
    // Only open modal for videos with local source, don't open external windows
    if (short.videoSrc) {
      onVideoClick(short);
    }
  };

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group ${index % 2 === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleShortClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Video Preview with Play Overlay */}
      <div className="relative aspect-[9/16] overflow-hidden">
        {short.videoSrc && !videoError ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            muted
            loop
            playsInline
            onError={(e) => {
              console.warn('⚠️ Video loading error:', short.title, e);
              setVideoError(true);
            }}
            onLoadedData={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = previewTime;
              }
            }}
            onLoadStart={() => {
              console.log('📹 Loading video:', short.title);
            }}
          >
            <source src={short.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <div className="text-center">
              <Youtube size={48} className="text-blue-600 mx-auto mb-2" />
              <p className="text-slate-700 font-semibold">YouTube Short</p>
            </div>
          </div>
        )}

        {/* Themed Progress Bar */}
        {short.videoSrc && !videoError && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full bg-gradient-to-r from-cyan-300 to-cyan-400 opacity-80"></div>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>

        {/* Play Button - Hide when playing */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered && !isPlaying ? 'bg-black/20' : 'bg-transparent'
          } ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
          <div className={`bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full p-4 transform transition-all duration-300 shadow-lg ${isHovered ? 'scale-110 from-cyan-400 to-cyan-500' : 'scale-100'
            }`}>
            <Play size={32} className="text-black ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-lg text-sm font-medium">
          {short.duration}
        </div>

        {/* YouTube Shorts Badge */}
        <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
          SHORTS
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">{short.title}</h3>
          <div className="flex items-center justify-between text-white/80 text-xs">
            <span>{short.views} views</span>
            <span>{short.publishedAt}</span>
          </div>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="p-4">
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Heart size={16} className="text-red-500" />
              <span>{short.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle size={16} />
              <span>{short.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={16} />
              <span>{short.views}</span>
            </div>
          </div>
          <ExternalLink size={16} className="text-gray-400 group-hover:text-red-600 transition-colors" />
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className={`absolute inset-0 border-2 border-red-500 rounded-2xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
    </div>
  );
};

const YouTubeShorts = () => {
  // Use global shuffle coordinator to ensure unique first 3 videos
  const [shorts, setShorts] = useState(() => {
    try {
      // Try the unique shuffle first
      let shuffled = getUniqueVideoShuffle(youtubeShorts, 'youtube-shorts');

      // If that fails, use simple shuffle
      if (!shuffled || shuffled.length === 0) {
        console.log('Falling back to simple shuffle for YouTube shorts');
        shuffled = simpleVideoShuffle(youtubeShorts);
      }

      return shuffled.length > 0 ? shuffled : youtubeShorts;
    } catch (error) {
      console.error('Error shuffling YouTube shorts:', error);
      // Last resort: use original array
      return youtubeShorts;
    }
  });
  const [visibleShorts, setVisibleShorts] = useState(6);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const loadMoreShorts = () => {
    const validShortsCount = shorts.filter(short => short && short.id).length;
    setVisibleShorts(prev => Math.min(prev + 3, validShortsCount));
  };

  // Reshuffle function for manual randomization
  const reshuffleShorts = () => {
    try {
      const shuffled = getUniqueVideoShuffle(youtubeShorts, `youtube-shorts-reshuffle-${Date.now()}`);
      setShorts(shuffled.length > 0 ? shuffled : youtubeShorts);
      setVisibleShorts(6); // Reset to initial count
    } catch (error) {
      console.error('Error reshuffling YouTube shorts:', error);
      setShorts(youtubeShorts);
    }
  };

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

  const openVideoModal = (short) => {
    setSelectedVideo(short);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <AnimatedSection className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-red-500/10 to-blue-500/10 text-red-600 text-sm font-bold rounded-full border border-red-200">
              <Youtube className="inline w-4 h-4 mr-2" />
              YouTube Shorts
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            YouTube{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
              Shorts
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Quick study abroad tips, university guides, and student success stories in bite-sized videos.
            Get expert advice in under 60 seconds!
          </p>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <Share2 size={20} />
              <span>Subscribe to @axelisoverseas for daily shorts</span>
            </div>
            <SocialMediaInline />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="aspect-[9/16] bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Shorts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {shorts
                .slice(0, visibleShorts)
                .filter(short => short && short.id)
                .map((short, index) => (
                  <YouTubeShortCard key={`${short.id}-${index}`} short={short} index={index} onVideoClick={openVideoModal} />
                ))}
            </div>

            {/* Load More Button */}
            {visibleShorts < shorts.filter(short => short && short.id).length && (
              <div className="text-center mb-12">
                <button
                  onClick={loadMoreShorts}
                  className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Load More Shorts
                </button>
              </div>
            )}
          </>
        )}

        {/* CTA Section - Space Theme */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          {/* Cosmic background effects */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.2'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            ></div>
          </div>
          <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Get Quick Study Abroad Tips Daily!
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to our YouTube channel for daily shorts with expert advice and student success stories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <StartJourneyCTA
                text="Start Your Journey"
                variant="light"
              />
              <a
                href="https://www.youtube.com/@axelisoverseas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 border border-blue-500/20 hover:border-cyan-400/40"
                style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}
              >
                <Youtube size={20} className="text-blue-200" />
                <span>Subscribe on YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 modal-backdrop"
          onClick={closeVideoModal}
        >
          <div
            className="relative max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                closeVideoModal();
              }}
              className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors z-50 p-2 rounded cursor-pointer"
              type="button"
              aria-label="Close video"
            >
              <X size={32} />
            </button>

            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              {selectedVideo.videoSrc ? (
                <video
                  className="w-full max-h-[80vh] object-contain"
                  controls
                  autoPlay
                  playsInline
                >
                  <source src={selectedVideo.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="aspect-[9/16] flex items-center justify-center bg-gray-800">
                  <p className="text-white">Video not available</p>
                </div>
              )}

              {/* Video Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white font-bold text-lg mb-2">
                  {selectedVideo.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {selectedVideo.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span>{selectedVideo.views} views</span>
                    <span>{selectedVideo.likes} likes</span>
                    <span>{selectedVideo.comments} comments</span>
                  </div>
                  <span>{selectedVideo.publishedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatedSection>
  );
};

export default YouTubeShorts;
