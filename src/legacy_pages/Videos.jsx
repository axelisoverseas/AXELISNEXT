import React from 'react';
import { Youtube } from 'lucide-react';
import Layout from '../components/Layout';
import AnimatedSection from '../components/AnimatedSection';
import InstagramSuccessStories from '../components/InstagramSuccessStories';
import YouTubeShorts from '../components/YouTubeShorts';
import { SocialMediaCTA } from '../components/SocialMediaButtons';

const Videos = () => {

  return (
    <Layout
      title="Educational Videos"
      description="Watch our comprehensive collection of study abroad videos covering university guides, scholarship tips, visa processes, and student success stories."
      keywords="study abroad videos, education videos, university guides, scholarship tips, visa guidance, student testimonials"
    >
      {/* Hero Section - Space Theme */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 lg:py-32 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AnimatedSection animationType="scaleIn">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                  <Youtube size={32} className="text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Educational{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Videos</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-200 max-w-3xl mx-auto">
                Comprehensive study abroad guidance through our expert video content covering universities, scholarships, visas, and more.
              </p>

              {/* Channel Stats */}
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30">
                  <Youtube size={16} className="text-red-400" />
                  <span>15K+ Subscribers</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30">
                  <span>🎬</span>
                  <span>100+ Success Stories</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30">
                  <span>🌍</span>
                  <span>29+ Countries Covered</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Instagram Success Stories Section */}
      <InstagramSuccessStories />

      {/* YouTube Shorts Section */}
      <YouTubeShorts />

      {/* Social Media CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SocialMediaCTA />
        </div>
      </AnimatedSection>
    </Layout>
  );
};

export default Videos;
