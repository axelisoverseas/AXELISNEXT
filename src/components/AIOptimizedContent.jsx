import React from 'react';

const AIOptimizedContent = ({ 
  title, 
  content, 
  faqData = [], 
  keyPoints = [], 
  statistics = [],
  relatedTopics = []
}) => {
  
  const generateFAQSchema = () => ({
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
  });

  const generateHowToSchema = (steps) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": content,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.description
    }))
  });

  return (
    <article className="max-w-4xl mx-auto">
      {/* AI-Optimized Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        
        {/* Key Points for AI Understanding */}
        {keyPoints.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">Key Highlights</h2>
            <ul className="space-y-2">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span className="text-blue-800">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Main Content with Semantic HTML */}
      <section className="prose prose-lg max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </section>

      {/* Statistics Section */}
      {statistics.length > 0 && (
        <section className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Statistics</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section with Schema */}
      {faqData.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <details key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <summary className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600">
                  {faq.question}
                </summary>
                <div className="mt-3 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
          
          {/* FAQ Schema */}
          <script type="application/ld+json">
            {JSON.stringify(generateFAQSchema())}
          </script>
        </section>
      )}

      {/* Related Topics for AI Context */}
      {relatedTopics.length > 0 && (
        <section className="bg-cyan-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-cyan-900 mb-3">Related Topics</h3>
          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((topic, index) => (
              <span key={index} className="bg-cyan-200 text-cyan-800 px-3 py-1 rounded-full text-sm">
                {topic}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default AIOptimizedContent;