import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Users, Award, Globe, Heart, TrendingUp, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout';
import FeatureCard from '../components/FeatureCard';
import FeaturesCarousel from '../components/FeaturesCarousel';
import TestimonialCarousel from '../components/TestimonialCarousel';
import TeamCard from '../components/TeamCard';
import TeamGlobeCarousel from '../components/TeamGlobeCarousel';
import AnimatedSection from '../components/AnimatedSection';
import LocomotiveAnimatedSection from '../components/LocomotiveAnimatedSection';
import MagneticButton from '../components/MagneticButton';
import TextReveal from '../components/TextReveal';

import AnimatedCounter from '../components/AnimatedCounter';
import LeadCaptureModal from '../components/LeadCaptureModal';
import InstagramSuccessStories from '../components/InstagramSuccessStories';
import YouTubeShorts from '../components/YouTubeShorts';
import HemisphereGlobe from '../components/HemisphereGlobe';
import CobeGlobe from '../components/CobeGlobe';
import RealisticGlobe from '../components/RealisticGlobe';
import { StartJourneyCTA } from '../components/CTAButton';
import { SocialMediaCTA } from '../components/SocialMediaButtons';
import { useLeadCapture } from '../hooks/useLeadCapture';
import { features, testimonials, teamMembers } from '../data/siteData';
import { stockImages } from '../data/stockImages';
import { assets } from '../assets/exweb/index.js';
import logoLight from '../assets/1yellow svg logoaxelis.svg';

const Home = () => {
  // Performance monitoring
  React.useEffect(() => {
    console.log('🏠 Homepage component mounted');
  }, []);

  // Framer Motion Scroll Effects for Hero Layering in 3D
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax values for Hero content
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroTextScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Get all team members for home page
  const featuredTeam = teamMembers;

  // Lead capture hooks
  const {
    showTimedModal,
    showExitModal,
    showCTAModal,
    closeTimedModal,
    closeExitModal,
    closeCTAModal,
    openCTAModal
  } = useLeadCapture();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Axelis Overseas",
    "url": "https://overseeducation.com",
    "description": "Leading study abroad consultancy helping students achieve their international education dreams with free services, scholarships, and comprehensive support.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://overseeducation.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Layout
      title="Study Abroad Consultancy in Bangalore - Free Services & Guaranteed Results"
      description="Best study abroad consultancy in Bengaluru with 29+ countries, 2000+ scholarships, and 2000+ successful placements. Free consultation, visa assistance, education loans, and comprehensive support from our Bangalore office."
      keywords="study abroad consultants in Bangalore, best study abroad consultancy Bengaluru, overseas education consultants Bangalore, free study abroad consultation Bangalore, student visa, scholarships abroad, UK USA Canada Australia study from Bangalore"
      structuredData={structuredData}
    >
      {/* Hero Section with Rotating Globe Background and 3D Parallax Text */}
      <section ref={heroRef} className="hero-section relative w-full h-screen overflow-hidden" style={{ perspective: '1000px' }}>
        {/* Realistic NASA Globe Background */}
        <div id="hero-globe" className="absolute inset-0 z-0">
          <RealisticGlobe />
        </div>

        {/* Hero Overlay for readability */}
        <div className="hero-overlay absolute inset-0 z-10" style={{
          background: 'linear-gradient(180deg, rgba(7,9,11,0.35), rgba(7,9,11,0.6))'
        }}></div>

        {/* Hero Content - Centered over Globe with 3D Parallax */}
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6"
          style={{
            y: heroTextY,
            opacity: heroTextOpacity,
            scale: heroTextScale,
            transformStyle: 'preserve-3d'
          }}
        >
          <AnimatedSection animationType="fadeInUp" delay={100}>
            <span className="inline-block bg-cyan-500 text-black font-semibold px-6 py-2 rounded-full mb-6 shadow-xl hover:scale-105 transition-all duration-300">
              Study Abroad Experts
            </span>
          </AnimatedSection>

          <AnimatedSection animationType="fadeInUp" delay={200}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-2xl">
              Your Gateway to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 filter drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                Global Education
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animationType="fadeInUp" delay={300}>
            <p className="mt-4 text-white/95 max-w-3xl text-lg md:text-xl leading-relaxed mb-8 drop-shadow-md">
              We have a wide portfolio of{' '}
              <strong className="text-cyan-400 font-bold">29+ Countries</strong>{' '}
              for your study abroad endeavours including the UK, USA, Canada, Ireland, Finland, and more.
            </p>
          </AnimatedSection>

          <AnimatedSection animationType="fadeInUp" delay={400}>
            <div className="mt-6 flex justify-center hover:scale-110 transition-transform duration-300">
              <StartJourneyCTA onModalOpen={openCTAModal} />
            </div>
          </AnimatedSection>

          <AnimatedSection animationType="fadeInUp" delay={500}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/90 backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 border-2 border-slate-900 flex items-center justify-center text-slate-900 font-black text-sm shadow-md"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="font-bold text-white text-lg drop-shadow-sm">2000+ Students</div>
                  <div className="text-sm text-cyan-300 font-medium">Successfully Placed</div>
                </div>
              </div>

              <div className="hidden sm:block h-12 w-px bg-white/30"></div>

              <div className="text-left">
                <div className="font-bold text-cyan-400 text-2xl drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]">₹3+ Crores</div>
                <div className="text-sm text-white/90 font-medium">Scholarships Secured</div>
              </div>
            </div>
          </AnimatedSection>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        {/* Animated Gradient Mesh Background */}

        {/* Floating Elements - Space Theme */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 text-sm font-bold rounded-full mb-6 border border-blue-200">
              Our Excellence
            </span>
            <TextReveal className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Axelis Overseas?</span>
            </TextReveal>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide comprehensive support for your study abroad journey with zero fees and end-to-end assistance
            </p>
          </div>

          {/* Fast Features Carousel */}
          <FeaturesCarousel features={features} />
        </div>
      </section>

      {/* Instagram Success Stories Section - Moved up */}
      <InstagramSuccessStories />

      {/* Team Section - Moved up */}
      <AnimatedSection animationType="fadeInRight" className="relative py-24 bg-gradient-to-br from-gray-100 via-gray-50 to-white overflow-hidden">
        {/* Background Pattern - Space Theme */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.08'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-16 right-16 w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-16 left-16 w-28 h-28 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <AnimatedSection animationType="fadeInUp" delay={100}>
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 text-sm font-bold rounded-full mb-6 border border-blue-200">
                Our Team
              </span>
            </AnimatedSection>
            <TextReveal className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Maestros</span> Behind Axelis
            </TextReveal>
            <AnimatedSection animationType="fadeInUp" delay={300}>
              <p className="text-xl text-gray-600 leading-relaxed">
                Introduce Our Life Coaches
              </p>
            </AnimatedSection>
          </div>

          {/* Team Globe Carousel */}
          <TeamGlobeCarousel teamMembers={featuredTeam} />

          <div className="text-center mt-16">
            <AnimatedSection animationType="fadeInUp" delay={600}>
              <Link
                to="/team"
                className="btn btn-primary group inline-flex items-center px-10 py-4 font-bold rounded-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl"
              >
                Meet Our Full Team
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection animationType="scaleIn" className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 text-white relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-blue-700/95 to-slate-900/90"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        {/* Floating Decorative Elements - Simplified */}

        {/* Glowing Orbs */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group transform transition-all duration-500 hover:scale-110 hover-lift">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <Globe className="relative mx-auto text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" size={56} />
              </div>
              <div className="text-4xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={29} suffix="+" className="text-cyan-400" />
              </div>
              <div className="text-gray-200 font-medium group-hover:text-white transition-colors duration-300">Countries</div>
            </div>
            <div className="group transform transition-all duration-500 hover:scale-110 hover-lift">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <Award className="relative mx-auto text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" size={56} />
              </div>
              <div className="text-4xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={2000} suffix="+" className="text-cyan-400" />
              </div>
              <div className="text-gray-200 font-medium group-hover:text-white transition-colors duration-300">Scholarships</div>
            </div>
            <div className="group transform transition-all duration-500 hover:scale-110 hover-lift">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <Users className="relative mx-auto text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" size={56} />
              </div>
              <div className="text-4xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={2000} suffix="+" className="text-cyan-400" />
              </div>
              <div className="text-gray-200 font-medium group-hover:text-white transition-colors duration-300">Students Sent</div>
            </div>
            <div className="group transform transition-all duration-500 hover:scale-110 hover-lift">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <CheckCircle className="relative mx-auto text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" size={56} />
              </div>
              <div className="text-4xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={100} suffix="%" className="text-cyan-400" />
              </div>
              <div className="text-gray-200 font-medium group-hover:text-white transition-colors duration-300">Success Rate</div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection animationType="fadeInLeft" className="relative py-24 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <AnimatedSection animationType="fadeInUp" delay={100}>
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-blue-600 text-sm font-bold rounded-full mb-6 border border-blue-200">
                Student Success
              </span>
            </AnimatedSection>
            <TextReveal className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Success Stories</span>
            </TextReveal>
            <AnimatedSection animationType="fadeInUp" delay={300}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                See what our candidates have to say about Axelis!
              </p>
            </AnimatedSection>
          </div>

          <TestimonialCarousel testimonials={testimonials} />

          <div className="text-center mt-16 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="group">
                <StartJourneyCTA onModalOpen={openCTAModal} />
              </div>
              <Link
                to="/testimonials"
                className="btn btn-secondary group inline-flex items-center px-8 py-4 font-bold rounded-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
              >
                View All Testimonials
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* YouTube Shorts Section */}
      <YouTubeShorts />

      {/* Social Media CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SocialMediaCTA />
        </div>
      </AnimatedSection>

      {/* CTA Section - Space Theme */}
      <section
        className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
      >
        {/* Interactive Particle Field Background */}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/40 to-slate-900/60 z-[1]"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-[2]">
          <AnimatedSection animationType="fadeInUp" delay={100}>
            <TextReveal className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">Study Abroad Journey?</span>
            </TextReveal>
          </AnimatedSection>
          <AnimatedSection animationType="fadeInUp" delay={200}>
            <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed font-light">
              Take the first step toward unparalleled study abroad consulting!
            </p>
          </AnimatedSection>
          <AnimatedSection animationType="fadeInUp" delay={300}>
            <MagneticButton>
              <Link
                to="/contact"
                className="group inline-flex items-center px-12 py-5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-black hover:from-cyan-600 hover:to-yellow-700 font-black rounded-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-2xl hover:shadow-3xl hover:shadow-cyan-500/25 text-xl"
              >
                Contact Us Now
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={28} />
              </Link>
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>

      {/* Lead Capture Modals */}
      <LeadCaptureModal
        isOpen={showTimedModal}
        onClose={closeTimedModal}
        trigger="timed"
      />
      <LeadCaptureModal
        isOpen={showExitModal}
        onClose={closeExitModal}
        trigger="exit"
      />
      <LeadCaptureModal
        isOpen={showCTAModal}
        onClose={closeCTAModal}
        trigger="cta"
      />
    </Layout>
  );
};

export default Home;
