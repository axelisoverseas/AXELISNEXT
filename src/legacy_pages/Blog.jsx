import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, BookOpen, TrendingUp, Users, Award, Globe } from 'lucide-react';
import Layout from '../components/Layout';
import { blogPosts } from '../data/siteData';



const BlogCard = ({ post }) => {
  const isFeatured = post.featured;
  const isCountryGuide = post.category === 'Country Guide';
  const isCourseGuide = post.category === 'Course Guide';

  return (
    <article className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border group hover:scale-105 ${
      isFeatured
        ? 'border-cyan-400/50 hover:border-cyan-500 bg-gradient-to-br from-yellow-50/50 to-white'
        : 'border-blue-100 hover:border-blue-400/50'
    }`}>
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          ⭐ FEATURED
        </div>
      )}

      <div className="p-6">
        {/* Header with Flag and Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {post.flag && (
              <span className="text-3xl mr-3">{post.flag}</span>
            )}
            <div>
              <div className="flex items-center text-sm text-slate-500 mb-1">
                <Calendar size={14} className="mr-2" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              {post.category && (
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  isCountryGuide
                    ? 'bg-blue-100 text-blue-800'
                    : isCourseGuide
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {post.category}
                </span>
              )}
            </div>
          </div>


        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 mb-4 leading-relaxed">
          {post.description}
        </p>

        {/* Statistics Infographic (for featured posts) */}
        {post.stats && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <TrendingUp size={16} className="mr-2 text-blue-600" />
              Key Statistics
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(post.stats).map(([key, value], index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold text-blue-600">{value}</div>
                  <div className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {post.highlights && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Award size={16} className="mr-2 text-cyan-600" />
              Key Highlights
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {post.highlights.slice(0, 3).map((highlight, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            to={post.link}
            className={`flex-1 inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg transition-all duration-300 hover:scale-105 ${
              isFeatured
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-yellow-700 text-white'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
            }`}
          >
            {isCountryGuide || isCourseGuide ? 'Explore Guide' : 'Read More'}
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>


        </div>
      </div>
    </article>
  );
};

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', 'Country Guide', 'Course Guide', 'Scholarships', 'Student Life', 'Finance'];
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <Layout
      title="Study Abroad Blog & Guides"
      description="Comprehensive study abroad guides with country-specific information, course details, scholarships, and expert insights. Get free consultation and personalized guidance."
      keywords="study abroad blog, country guides, course guides, education articles, scholarship tips, student guides, international education, study abroad guidance"
    >
      {/* Hero Section - Space Theme */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Resources</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
              Stay updated with the latest insights, tips, and guides for studying abroad
            </p>
          </div>
        </div>
      </section>



      {/* Featured Guides Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-orange-500/20 text-cyan-600 text-sm font-bold rounded-full border border-cyan-200">
                <Award className="inline w-4 h-4 mr-2" />
                Featured Guides
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              🌟 Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-orange-500">Study Guides</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive country and course guides with exclusive video content and expert insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter & All Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-600 text-sm font-bold rounded-full border border-blue-200">
                <BookOpen className="inline w-4 h-4 mr-2" />
                All Articles
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">All Articles</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Filter by category to find exactly what you're looking for
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>



      {/* Free Consultation CTA Section - Space Theme */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/20 to-orange-500/20 text-cyan-300 text-sm font-bold rounded-full border border-cyan-500/30">
                <Users className="inline w-4 h-4 mr-2" />
                Free Consultation
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400">Study Abroad Journey?</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-200 max-w-4xl mx-auto">
              Get personalized guidance from our experts and turn your study abroad dreams into reality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Free Consultation */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Consultation</h3>
              <p className="text-blue-200 mb-4">Get personalized guidance from our education experts</p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105"
              >
                Book Now
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>



            {/* Explore Guides */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Explore Country Guides</h3>
              <p className="text-blue-200 mb-4">Comprehensive guides for studying in your dream destination</p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105"
              >
                Explore
                <Globe size={16} className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Main CTA */}
          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 text-white text-xl font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              🚀 Start Your Journey Today - FREE Consultation
              <ArrowRight size={24} className="ml-3" />
            </Link>
            <p className="text-blue-200 mt-4 text-sm">
              ✅ No hidden fees • ✅ Expert guidance • ✅ 500+ successful placements
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-100">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Journey?</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Don't just read about success stories – create your own with our expert guidance
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              Get Free Consultation
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
