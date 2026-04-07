import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Users, Award, Globe, Heart, Play, CheckCircle, TrendingUp } from 'lucide-react';
import Layout from '../components/Layout';
import FAQAccordion from '../components/FAQAccordion';
import InstagramSuccessStories from '../components/InstagramSuccessStories';
import AnimatedCounter from '../components/AnimatedCounter';
import AnimatedSection from '../components/AnimatedSection';
import { faqData } from '../data/siteData';
import { stockImages } from '../data/stockImages';
import { assets } from '../assets/exweb/index.js';
import logoLight from '../assets/1yellow svg logoaxelis.svg';

const About = () => {
  return (
    <Layout
      title="About Us"
      description="Welcome to Axelis Overseas! Learn about our mission, vision, and commitment to helping students achieve their study abroad dreams."
      keywords="about axelis overseas, study abroad consultancy, education consulting, student services"
    >
      {/* Hero Section - Space Theme */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white py-20 relative overflow-hidden">
        {/* Gradient Overlays - Space Theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-600/70 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-blue-600/40"></div>

        {/* Cosmic Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        {/* Floating cosmic elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <img
                src={logoLight}
                alt="Axelis Overseas"
                className="h-24 md:h-32 lg:h-36 w-auto mx-auto mb-4 filter drop-shadow-2xl"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              About Axelis Overseas
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto drop-shadow-md">
              Your trusted partner in making study abroad dreams come true
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Welcome to Axelis Overseas!
              </h2>
              <div className="space-y-6 text-neutral-700 leading-relaxed">
                <p>
                  At Axelis Overseas, we believe that education is the key to unlocking limitless possibilities. 
                  With a passion for empowering students to achieve their academic dreams, we have established 
                  ourselves as a leading study abroad consultancy.
                </p>
                <p>
                  Our comprehensive services span across 29+ countries, offering students access to world-class 
                  education opportunities. From the prestigious universities of the UK and USA to the innovative 
                  institutions in Canada, Ireland, and Finland, we open doors to global education.
                </p>
                <p>
                  What sets us apart is our commitment to providing completely free services. We believe that 
                  financial constraints should never be a barrier to quality education consulting. Our end-to-end 
                  support ensures that every student receives personalized guidance throughout their journey.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-neutral-50 p-6 rounded-xl text-center border border-neutral-200">
                <Globe className="mx-auto mb-4 text-primary-600" size={48} />
                <div className="text-2xl font-bold text-black mb-2">29+</div>
                <div className="text-neutral-600">Countries</div>
              </div>
              <div className="bg-neutral-50 p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300 border border-neutral-200">
                <Award className="mx-auto mb-4 text-primary-600" size={48} />
                <div className="text-2xl font-bold text-black mb-2">2000+</div>
                <div className="text-neutral-600">Scholarships</div>
              </div>
              <div className="bg-neutral-50 p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300 border border-neutral-200">
                <Users className="mx-auto mb-4 text-primary-600" size={48} />
                <div className="text-2xl font-bold text-black mb-2">2000+</div>
                <div className="text-neutral-600">Students Sent</div>
              </div>
              <div className="bg-neutral-50 p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300 border border-neutral-200">
                <Heart className="mx-auto mb-4 text-primary-600" size={48} />
                <div className="text-2xl font-bold text-black mb-2">100%</div>
                <div className="text-neutral-600">Free Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
              <div className="flex items-center mb-6">
                <Target className="text-primary-600 mr-4" size={32} />
                <h3 className="text-2xl font-bold text-black">Our Mission</h3>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                To democratize access to quality international education by providing comprehensive,
                free consulting services that guide students through every step of their study abroad journey.
                We are committed to breaking down barriers and making global education accessible to all.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-200">
              <div className="flex items-center mb-6">
                <Eye className="text-primary-600 mr-4" size={32} />
                <h3 className="text-2xl font-bold text-black">Our Vision</h3>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                To become the world's most trusted study abroad consultancy, known for our integrity,
                expertise, and unwavering commitment to student success. We envision a world where
                every student has the opportunity to pursue their educational dreams globally.
              </p>
            </div>
          </div>
          
          {/* Video Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-black mb-6">
              Discover Our Success Stories
            </h3>
            <Link
              to="/blog"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-slate-800 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-blue-500/20 hover:border-cyan-400/40"
              style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}
            >
              <Play className="mr-2 text-blue-200" size={20} />
              Watch Our Podcast
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <InstagramSuccessStories />

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-neutral-600">
              Get answers to the most common questions about our services
            </p>
          </div>

          <FAQAccordion faqs={faqData} />
        </div>
      </section>

      {/* CTA Section - Space Theme */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-black text-white relative overflow-hidden">
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
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl mb-8 text-gray-100 drop-shadow-md">
            Let us help you turn your study abroad dreams into reality with our expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/axelisoverseas/counsellingsession"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-yellow-700 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Schedule FREE Consultation
            </a>
            <Link
              to="/testimonials"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-400/25"
            >
              Read Success Stories
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
