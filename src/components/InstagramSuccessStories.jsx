"use client";
import React, { useState, useEffect } from 'react';
import { Play, ExternalLink, Instagram, Heart, MessageCircle, Share2, Eye, X } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { StartJourneyCTA } from './CTAButton';
import { SocialMediaInline } from './SocialMediaButtons';
import { getUniqueVideoShuffle, simpleVideoShuffle } from '../utils/videoShuffler';

// Import actual video reels - Mix of original and new contextual videos using public path
const reel1 = '/reels/ardnav_success_story.mp4';
const reel2 = '/reels/rajat_dublin_success.mp4';
const reel3 = '/reels/netherlands_part_time_work.mp4';
const reel4 = '/reels/dutch_education_future.mp4';
const reel5 = '/reels/education_loan_no_collateral.mp4';
const reel6 = '/reels/netherlands_top_destination.mp4';
const reel7 = '/reels/study_abroad_timing.mp4';
const reel8 = '/reels/axelis_journey_timing.mp4';
const reel9 = '/reels/netherlands_visa_work_opportunities.mp4';
const reel10 = '/reels/Blink-52856e8e-73eb-4b68-b410-8a448a2ab881-Edited-1.mp4';
const reel11 = '/reels/whatsapp_video1.mp4';
const reel12 = '/reels/reel_copy.mp4';

// Actual Axelis Overseas reels data with contextual content
const instagramReels = [
  {
    id: '1',
    videoSrc: reel1,
    videoUrl: 'https://www.instagram.com/reel/C-4Z8_T/axelis_overseas/',
    caption: '🎉 Hear from Ardnav as he shares his journey with Axelis Overseas and how our expert services helped him achieve his study abroad dreams! Real student, real success! 🌟 #AxelisSuccess #StudentTestimonial',
    studentName: 'Ardnav',
    university: 'International University',
    country: 'Abroad',
    likes: 342,
    comments: 28,
    views: '4.2K',
    duration: '0:58'
  },
  {
    id: '2',
    videoSrc: reel2,
    videoUrl: 'https://www.instagram.com/reel/D-8B4_R/axelis_overseas/',
    caption: '🎓 Rajat Limaye - MSc Mechanical Engineering at Dublin City University! Another success story from Axelis Overseas. Your dreams are next! 🇮🇪✨ #DublinUniversity #MechanicalEngineering #AxelisSuccess',
    studentName: 'Rajat Limaye',
    university: 'Dublin City University',
    country: 'Ireland',
    likes: 289,
    comments: 22,
    views: '3.1K',
    duration: '0:52'
  },
  {
    id: '3',
    videoSrc: reel3,
    videoUrl: 'https://www.instagram.com/reel/E-2X2_P/axelis_overseas/',
    caption: '💶 Earn While You Learn: €9-€12/Hour in the Netherlands! 🇳🇱 Explore how part-time work can enhance your study experience and support your finances! #NetherlandsStudy #PartTimeWork #AxelisOverseas',
    studentName: 'Netherlands Guide',
    university: 'Dutch Universities',
    country: 'Netherlands',
    likes: 456,
    comments: 34,
    views: '5.2K',
    duration: '0:48'
  },
  {
    id: '4',
    videoSrc: reel4,
    videoUrl: 'https://www.instagram.com/reel/F-1Y5_K/axelis_overseas/',
    caption: '🇳🇱✨ Unlock Your Future with a Dutch Education! Thinking of studying in the Netherlands? Discover why it\'s the perfect choice for your academic journey! #DutchEducation #StudyInNetherlands #AxelisOverseas',
    studentName: 'Netherlands Info',
    university: 'Dutch Universities',
    country: 'Netherlands',
    likes: 378,
    comments: 29,
    views: '4.1K',
    duration: '0:55'
  },
  {
    id: '5',
    videoSrc: reel5,
    videoUrl: 'https://www.instagram.com/reel/G-7W1_M/axelis_overseas/',
    caption: '💸 Get your Education Loan – No Collateral, up to ₹1 CR, from 27+ Banks in just 7 Days! ✈️📚 Dreaming of studying abroad but worried about finances? We\'ve got you covered! #EducationLoan #StudyAbroad #AxelisOverseas',
    studentName: 'Loan Solutions',
    university: 'Financial Support',
    country: 'India',
    likes: 523,
    comments: 67,
    views: '8.1K',
    duration: '0:59'
  },
  {
    id: '6',
    videoSrc: reel6,
    videoUrl: 'https://www.instagram.com/reel/H-3Q9_L/axelis_overseas/',
    caption: '🌍 WHY the Netherlands is the #1 Study Abroad Destination for Indian Students in 2025! 🇳🇱✨ Looking for the perfect study destination? Here\'s why Netherlands tops the list! #Netherlands #StudyAbroad #AxelisOverseas',
    studentName: 'Netherlands Guide',
    university: 'Top Destination',
    country: 'Netherlands',
    likes: 612,
    comments: 45,
    views: '7.8K',
    duration: '0:52'
  },
  {
    id: '7',
    videoSrc: reel7,
    videoUrl: 'https://www.instagram.com/reel/J-5H2_T/axelis_overseas/',
    caption: '🎓✨ Dreaming of studying abroad? Timing is everything! 🌍 When should you start preparing? Get expert advice on the perfect timeline for your study abroad journey! #StudyAbroadTiming #AxelisOverseas',
    studentName: 'Study Planning',
    university: 'Expert Guidance',
    country: 'Global',
    likes: 389,
    comments: 31,
    views: '4.7K',
    duration: '0:48'
  },
  {
    id: '8',
    videoSrc: reel8,
    videoUrl: 'https://www.instagram.com/reel/K-9B5_V/axelis_overseas/',
    caption: '🎓🌍 When to Start Your Study Abroad Journey with Axelis Overseas? 🇳🇱✨ Thinking about studying abroad? Let us guide you on the perfect timing and preparation strategy! #AxelisJourney #StudyAbroad',
    studentName: 'Axelis Guidance',
    university: 'Expert Planning',
    country: 'Netherlands',
    likes: 267,
    comments: 19,
    views: '3.4K',
    duration: '0:44'
  },
  {
    id: '9',
    videoSrc: reel9,
    videoUrl: 'https://www.instagram.com/reel/L-1C8_W/axelis_overseas/',
    caption: '🇳🇱✨ Unlock Your Future: Visa & Post-Study Work Opportunities in the Netherlands! Curious about career prospects after graduation? Discover amazing opportunities! #NetherlandsVisa #PostStudyWork #AxelisOverseas',
    studentName: 'Career Opportunities',
    university: 'Netherlands Unis',
    country: 'Netherlands',
    likes: 445,
    comments: 38,
    views: '5.9K',
    duration: '0:56'
  },
  {
    id: '10',
    videoSrc: reel10,
    videoUrl: 'https://www.instagram.com/reel/M-7X3_B/axelis_overseas/',
    caption: '🌟 Blink and you might miss it! Huge scholarship opportunities waiting for you this application cycle. Learn how our experts secure top funding for Indian students! #StudyAbroadScholarship #StudentVisa',
    studentName: 'Scholarship Alert',
    university: 'Global Universities',
    country: 'Worldwide',
    likes: 832,
    comments: 94,
    views: '12.4K',
    duration: '0:42'
  },
  {
    id: '11',
    videoSrc: reel11,
    videoUrl: 'https://www.instagram.com/reel/N-2Y4_A/axelis_overseas/',
    caption: '📱 Your study abroad dreams are just one WhatsApp message away! See how we instantly connect with students and solve their queries in real-time. #StudentSupport #AxelisOverseas',
    studentName: 'Instant Support',
    university: 'Counselling Team',
    country: 'India / Global',
    likes: 310,
    comments: 42,
    views: '4.8K',
    duration: '0:35'
  },
  {
    id: '12',
    videoSrc: reel12,
    videoUrl: 'https://www.instagram.com/reel/P-5Z1_C/axelis_overseas/',
    caption: '🎯 Target accepted! Another amazing intake season. Join the Axelis family and let us navigate your university applications together! #UniversityAdmissions #StudyAbroad2025',
    studentName: 'Admissions Strategy',
    university: 'Top Ranked Unis',
    country: 'Multiple Destinations',
    likes: 567,
    comments: 61,
    views: '7.2K',
    duration: '0:49'
  }
];

const InstagramReelCard = ({ reel, index, onVideoClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = React.useRef(null);

  // Set different preview times for each video
  const previewTime = React.useMemo(() => {
    const times = [2, 5, 8, 3, 6, 4, 7, 9, 1, 10, 12, 15];
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
    if (videoRef.current && reel.videoSrc && !videoError) {
      videoRef.current.currentTime = previewTime;
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions
        console.log('Autoplay prevented');
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && reel.videoSrc) {
      videoRef.current.pause();
      videoRef.current.currentTime = previewTime;
      setProgress(0);
    }
  };

  const handleReelClick = () => {
    // Only open modal for videos with local source, don't open external windows
    if (reel.videoSrc) {
      onVideoClick(reel);
    }
  };

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group ${index % 2 === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'
        }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleReelClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Video Preview with Play Overlay */}
      <div className="relative aspect-[9/16] overflow-hidden">
        {reel.videoSrc && !videoError ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            onLoadedData={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = previewTime;
              }
            }}
          >
            <source src={reel.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
            <div className="text-center">
              <Play size={48} className="text-red-600 mx-auto mb-2" />
              <p className="text-red-700 font-semibold">Video Preview</p>
            </div>
          </div>
        )}

        {/* Themed Progress Bar */}
        {reel.videoSrc && !videoError && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-pink-400 to-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full bg-gradient-to-r from-blue-300 via-pink-300 to-blue-400 opacity-80"></div>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>

        {/* Play Button - Hide when playing */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered && !isPlaying ? 'bg-black/20' : 'bg-transparent'
          } ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
          <div className={`bg-gradient-to-r from-blue-500 via-pink-500 to-blue-600 rounded-full p-4 transform transition-all duration-300 shadow-lg ${isHovered ? 'scale-110 from-blue-400 via-pink-400 to-blue-500' : 'scale-100'
            }`}>
            <Play size={32} className="text-white ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-lg text-sm font-medium">
          {reel.duration}
        </div>

        {/* Instagram Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white p-2 rounded-lg">
          <Instagram size={20} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Student Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{reel.studentName}</h3>
          <p className="text-blue-600 font-semibold">{reel.university}</p>
          <p className="text-gray-600 text-sm">{reel.country}</p>
        </div>

        {/* Caption */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{reel.caption}</p>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Heart size={16} className="text-pink-500" />
              <span>{reel.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle size={16} />
              <span>{reel.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={16} />
              <span>{reel.views}</span>
            </div>
          </div>
          <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className={`absolute inset-0 border-2 border-red-500 rounded-2xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
    </div>
  );
};

const InstagramSuccessStories = () => {
  // Use global shuffle coordinator to ensure unique first 3 videos
  const [reels, setReels] = useState(() => {
    try {
      console.log('Original instagramReels:', instagramReels.length, 'items');
      console.log('First few items:', instagramReels.slice(0, 3).map(r => r?.id));

      // Try the unique shuffle first
      let shuffled = getUniqueVideoShuffle(instagramReels, 'instagram-reels');

      // If that fails, use simple shuffle
      if (!shuffled || shuffled.length === 0) {
        console.log('Falling back to simple shuffle for Instagram reels');
        shuffled = simpleVideoShuffle(instagramReels);
      }

      console.log('Final shuffled result:', shuffled.length, 'items');
      console.log('Final shuffled first few:', shuffled.slice(0, 3).map(r => r?.id));

      return shuffled.length > 0 ? shuffled : instagramReels;
    } catch (error) {
      console.error('Error shuffling Instagram reels:', error);
      // Last resort: use original array
      return instagramReels;
    }
  });
  const [visibleReels, setVisibleReels] = useState(6);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const loadMoreReels = () => {
    const validReelsCount = reels.filter(reel => reel && reel.id).length;
    setVisibleReels(prev => Math.min(prev + 3, validReelsCount));
  };

  // Reshuffle function for manual randomization
  const reshuffleReels = () => {
    try {
      const shuffled = getUniqueVideoShuffle(instagramReels, `instagram-reels-reshuffle-${Date.now()}`);
      setReels(shuffled.length > 0 ? shuffled : instagramReels);
      setVisibleReels(6); // Reset to initial count
    } catch (error) {
      console.error('Error reshuffling Instagram reels:', error);
      setReels(instagramReels);
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

  const openVideoModal = (reel) => {
    setSelectedVideo(reel);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <AnimatedSection className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/10 to-pink-500/10 text-blue-600 text-sm font-bold rounded-full border border-purple-200">
              <Instagram className="inline w-4 h-4 mr-2" />
              Instagram Success Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Success Stories from{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">
              Instagram
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Watch real student journeys unfold! From application to acceptance, see how our students
            achieved their study abroad dreams through our Instagram reels.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <Share2 size={20} />
              <span>Follow @axelis_overseas for more success stories</span>
            </div>
            <SocialMediaInline />
          </div>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reels
            .slice(0, visibleReels)
            .filter(reel => reel && reel.id)
            .map((reel, index) => (
              <InstagramReelCard key={`${reel.id}-${index}`} reel={reel} index={index} onVideoClick={openVideoModal} />
            ))}
        </div>

        {/* Load More Button */}
        {visibleReels < reels.filter(reel => reel && reel.id).length && (
          <div className="text-center mb-12">
            <button
              onClick={loadMoreReels}
              className="bg-gradient-to-r from-blue-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Load More Stories
            </button>
          </div>
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
          <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Your Own Success Story?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of students who have achieved their study abroad dreams with Axelis Overseas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <StartJourneyCTA
                text="Start Your Journey"
                variant="light"
              />
              <a
                href="https://www.instagram.com/axelis_overseas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
              >
                <Instagram size={20} />
                <span>Follow on Instagram</span>
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
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors z-10"
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
                  {selectedVideo.studentName} - {selectedVideo.university}
                </h3>
                <p className="text-gray-300 text-sm">
                  {selectedVideo.caption}
                </p>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span>{selectedVideo.views} views</span>
                    <span>{selectedVideo.likes} likes</span>
                    <span>{selectedVideo.comments} comments</span>
                  </div>
                  <span>{selectedVideo.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatedSection>
  );
};

export default InstagramSuccessStories;
