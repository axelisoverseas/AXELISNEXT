import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Filter, X, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { siteInfo } from '../data/siteData';

const EnhancedFAQ = ({ faqs, showSearch = true, showCategories = true }) => {
  const [openItems, setOpenItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": filteredFAQs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>

      {/* Enhanced Search and Filter Controls */}
      {(showSearch || showCategories) && (
        <div className="mb-8 space-y-6">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search frequently asked questions... (e.g., 'visa requirements', 'scholarships', 'living costs')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}

          {showCategories && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  <Filter className="mr-2 text-blue-600" size={20} />
                  Filter by Category
                </h3>
                <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map(category => {
                  const categoryCount = faqs.filter(faq => category === 'All' || faq.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50 shadow-sm'
                      }`}
                    >
                      {category}
                      <span className={`ml-2 text-xs ${
                        selectedCategory === category ? 'text-blue-100' : 'text-slate-500'
                      }`}>
                        ({categoryCount})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Search Results Summary */}
          {searchTerm && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center">
                <Search className="text-blue-600 mr-2" size={16} />
                <span className="text-blue-800 font-medium">
                  {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} found for "{searchTerm}"
                </span>
                {filteredFAQs.length === 0 && (
                  <span className="ml-2 text-blue-600">- Try different keywords or browse categories</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enhanced FAQ Items */}
      <div className="space-y-6">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No questions found</h3>
            <p className="text-slate-500 mb-4">
              No questions found matching your search criteria. Try different keywords or browse categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredFAQs.map((faq, index) => (
            <div
              key={faq.id}
              id={`category-${faq.category.toLowerCase()}`}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-blue-50/50 transition-all duration-300"
                aria-expanded={openItems.has(faq.id)}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">
                      {faq.category === 'General' && '🌍'}
                      {faq.category === 'UK' && '🇬🇧'}
                      {faq.category === 'USA' && '🇺🇸'}
                      {faq.category === 'Canada' && '🇨🇦'}
                      {faq.category === 'Australia' && '🇦🇺'}
                      {faq.category === 'Germany' && '🇩🇪'}
                      {faq.category === 'Visa' && '📋'}
                      {faq.category === 'Scholarships' && '🎓'}
                      {faq.category === 'Finance' && '💰'}
                      {faq.category === 'Requirements' && '📝'}
                      {faq.category === 'Process' && '⚡'}
                      {faq.category === 'Support' && '🤝'}
                      {faq.category === 'Pricing' && '💳'}
                      {faq.category === 'Accommodation' && '🏠'}
                      {faq.category === 'Employment' && '💼'}
                      {faq.category === 'About Us' && '🏢'}
                      {faq.category === 'Getting Started' && '🚀'}
                    </span>
                    <span className="inline-block px-3 py-1 text-xs font-bold bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 rounded-full border border-blue-200">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openItems.has(faq.id)
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500'
                  }`}>
                    {openItems.has(faq.id) ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </div>
              </button>

              {openItems.has(faq.id) && (
                <div
                  id={`faq-answer-${faq.id}`}
                  className="px-6 pb-6 border-t border-slate-200 bg-gradient-to-br from-blue-50/30 to-yellow-50/30"
                >
                  <div className="pt-6">
                    <div
                      className="text-slate-700 leading-relaxed prose prose-slate max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: faq.answer.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^(.*)$/, '<p>$1</p>')
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Results Count */}
      {(searchTerm || selectedCategory !== 'All') && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredFAQs.length} of {faqs.length} questions
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>
      )}

      {/* Contact CTA */}
      <div className="mt-12 text-center p-6 bg-neutral-50 rounded-xl border border-neutral-200">
        <h3 className="text-xl font-bold text-black mb-2">
          Still have questions?
        </h3>
        <p className="text-neutral-600 mb-4">
          Our expert counselors are here to help you with personalized guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${siteInfo.contact.phones[0]}`}
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Call Us: {siteInfo.contact.phones[0]}
          </a>
          <a
            href={`mailto:${siteInfo.contact.emails[0]}`}
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnhancedFAQ;
