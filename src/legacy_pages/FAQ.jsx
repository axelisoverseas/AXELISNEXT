import React from 'react';
import { HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';
import Layout from '../components/Layout';
import EnhancedFAQ from '../components/EnhancedFAQ';
import AnimatedSection from '../components/AnimatedSection';
import VideoWidget from '../components/VideoWidget';
import { faqData, siteInfo } from '../data/siteData';

const FAQ = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Layout
      title="Frequently Asked Questions"
      description="Find answers to common questions about studying abroad, our services, visa processes, scholarships, and more. Get expert guidance from Axelis Overseas."
      keywords="study abroad FAQ, visa questions, scholarship queries, education consultancy help, student visa process, university admission questions"
      structuredData={structuredData}
    >
      {/* Hero Section - Enhanced Design */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 lg:py-32 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <HelpCircle size={40} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Frequently Asked{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Questions</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-200 max-w-4xl mx-auto leading-relaxed">
              Get instant answers to your study abroad questions. From visa processes to scholarships, we've got comprehensive answers to help you make informed decisions.
            </p>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/20">
                <div className="text-2xl font-bold text-cyan-400">21+</div>
                <div className="text-blue-200 text-sm">Detailed FAQs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/20">
                <div className="text-2xl font-bold text-cyan-400">12+</div>
                <div className="text-blue-200 text-sm">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/20">
                <div className="text-2xl font-bold text-cyan-400">29+</div>
                <div className="text-blue-200 text-sm">Countries Covered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/20">
                <div className="text-2xl font-bold text-cyan-400">24/7</div>
                <div className="text-blue-200 text-sm">Expert Support</div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#faq-search"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-900 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                <HelpCircle className="mr-2" size={20} />
                Browse FAQs
              </a>
              <a
                href="https://calendly.com/axelisoverseas/counsellingsession"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 text-white hover:bg-white/20 hover:border-cyan-400/50 font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="mr-2" size={20} />
                Ask Our Experts
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Quick Navigation
            </h2>
            <p className="text-slate-600">
              Jump to the most popular FAQ categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['General', 'UK', 'USA', 'Canada', 'Australia', 'Germany', 'Visa', 'Scholarships', 'Finance', 'Requirements', 'Process', 'Support'].map((category) => (
              <a
                key={category}
                href={`#category-${category.toLowerCase()}`}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-100 hover:border-cyan-400/50 group"
              >
                <div className="text-2xl mb-2">
                  {category === 'General' && '🌍'}
                  {category === 'UK' && '🇬🇧'}
                  {category === 'USA' && '🇺🇸'}
                  {category === 'Canada' && '🇨🇦'}
                  {category === 'Australia' && '🇦🇺'}
                  {category === 'Germany' && '🇩🇪'}
                  {category === 'Visa' && '📋'}
                  {category === 'Scholarships' && '🎓'}
                  {category === 'Finance' && '💰'}
                  {category === 'Requirements' && '📝'}
                  {category === 'Process' && '⚡'}
                  {category === 'Support' && '🤝'}
                </div>
                <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {category}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced */}
      <AnimatedSection className="py-20" id="faq-search">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 text-sm font-bold rounded-full border border-blue-200">
                <HelpCircle className="inline w-4 h-4 mr-2" />
                Comprehensive Answers
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Know</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Browse through our comprehensive FAQ section organized by categories. Use the search function to quickly find specific information about studying abroad.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <EnhancedFAQ faqs={faqData} />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Popular Topics */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                    <MessageCircle className="mr-2 text-blue-600" size={20} />
                    Popular Topics
                  </h3>
                  <div className="space-y-3">
                    {[
                      { topic: 'Visa Requirements', count: '8 FAQs' },
                      { topic: 'Scholarship Opportunities', count: '5 FAQs' },
                      { topic: 'Living Costs', count: '6 FAQs' },
                      { topic: 'Application Process', count: '7 FAQs' },
                      { topic: 'Work Opportunities', count: '4 FAQs' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                        <span className="text-slate-700 text-sm">{item.topic}</span>
                        <span className="text-blue-600 text-xs font-medium">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Resources */}
                <VideoWidget
                  category="Study Guides"
                  title="Study Abroad Guides"
                  limit={3}
                />
                <VideoWidget
                  category="Scholarships"
                  title="Scholarship Videos"
                  limit={2}
                />

                {/* Quick Contact */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-600 text-white rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold mb-3">Still Have Questions?</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Our expert counselors are here to help with personalized guidance.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all duration-300 text-sm"
                  >
                    <Phone className="mr-2" size={16} />
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Quick Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">29+</div>
              <div className="text-gray-600 dark:text-gray-300">Countries Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2000+</div>
              <div className="text-gray-600 dark:text-gray-300">Students Placed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2000+</div>
              <div className="text-gray-600 dark:text-gray-300">Scholarships Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">25+</div>
              <div className="text-gray-600 dark:text-gray-300">Loan Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Need More Help?
          </h2>
          <p className="text-xl text-black dark:text-black mb-8 leading-relaxed font-medium">
            Our expert counselors are available to provide personalized guidance for your study abroad journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <Phone className="text-blue-600 dark:text-blue-400 mx-auto mb-4" size={32} />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">Call Us</h3>
              <p className="text-black dark:text-white mb-3 text-center font-medium">Speak directly with our counselors</p>
              <a
                href={`tel:${siteInfo.contact.phones[0]}`}
                className="inline-block text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors"
              >
                {siteInfo.contact.phones[0]}
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <Mail className="text-blue-600 dark:text-blue-400 mx-auto mb-4" size={32} />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">Email Us</h3>
              <p className="text-black dark:text-white mb-3 text-center font-medium">Get detailed responses to your queries</p>
              <a
                href={`mailto:${siteInfo.contact.emails[0]}`}
                className="inline-block text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors break-all"
              >
                {siteInfo.contact.emails[0]}
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <MessageCircle className="text-blue-600 dark:text-blue-400 mx-auto mb-4" size={32} />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">Visit Office</h3>
              <p className="text-black dark:text-white mb-3 text-center font-medium">Meet us in person for consultation</p>
              <p className="text-sm text-black dark:text-white text-center leading-relaxed font-medium">
                {siteInfo.contact.address}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
