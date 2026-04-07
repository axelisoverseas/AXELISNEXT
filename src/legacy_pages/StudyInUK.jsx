import React from 'react';
import Layout from '../components/Layout';
import AIOptimizedContent from '../components/AIOptimizedContent';

const StudyInUK = () => {
  const pageData = {
    title: "Study in UK 2025 - Complete Guide | Axelis Overseas",
    description: "Comprehensive guide to studying in UK. Top universities, admission requirements, visa process, scholarships, and cost of living. Free consultation with UK education experts.",
    keywords: "study in UK, UK universities, UK student visa, UK scholarships, study abroad UK, UK education consultancy, IELTS UK, UK admission requirements",
    
    keyPoints: [
      "29+ UK universities partnerships with guaranteed admissions",
      "Free UK student visa assistance with 98% success rate",
      "£2000+ scholarships available for Indian students",
      "Post-study work visa (PSW) for 2-3 years",
      "No IELTS required for selected universities"
    ],
    
    statistics: [
      { value: "150+", label: "UK Universities" },
      { value: "£15,000", label: "Average Tuition" },
      { value: "2-3 Years", label: "Post-Study Work" },
      { value: "98%", label: "Visa Success Rate" }
    ],
    
    faqData: [
      {
        question: "What are the requirements to study in UK?",
        answer: "To study in UK, you need: Academic transcripts (60%+ for undergraduate, 65%+ for postgraduate), English proficiency (IELTS 6.0-7.0 or equivalent), Statement of Purpose, Letters of Recommendation, and financial proof showing £15,000-25,000 per year."
      },
      {
        question: "How much does it cost to study in UK?",
        answer: "UK study costs vary: Tuition fees range from £12,000-35,000 per year, living expenses £12,000-15,000 per year. Total annual cost: £24,000-50,000. Scholarships can reduce costs by £2,000-10,000."
      },
      {
        question: "Can I work while studying in UK?",
        answer: "Yes, UK student visa allows 20 hours/week part-time work during studies and full-time during holidays. After graduation, you can apply for Graduate Route visa (2-3 years) to work full-time in UK."
      },
      {
        question: "Which UK universities don't require IELTS?",
        answer: "Several UK universities accept alternative English tests or waive IELTS for students from English-medium schools. Universities like Northumbria, Portsmouth, and Greenwich offer conditional admissions without IELTS."
      }
    ],
    
    relatedTopics: [
      "UK Student Visa", "UK Universities", "UK Scholarships", "IELTS Preparation", 
      "UK Cost of Living", "Post-Study Work UK", "UK Admission Requirements"
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Complete Guide to Study in UK 2025",
    "description": pageData.description,
    "author": {
      "@type": "Organization",
      "name": "Axelis Overseas"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Axelis Overseas",
      "logo": {
        "@type": "ImageObject",
        "url": "https://overseeducation.com/logo.png"
      }
    },
    "datePublished": "2025-01-13",
    "dateModified": "2025-01-13",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://overseeducation.com/study-in-uk"
    }
  };

  const content = `
    <h2>Why Study in UK?</h2>
    <p>The United Kingdom remains one of the world's top destinations for international students, offering world-class education, rich cultural heritage, and excellent career opportunities. With over 150 universities and a tradition of academic excellence spanning centuries, UK provides an unparalleled educational experience.</p>
    
    <h3>Top Benefits of Studying in UK:</h3>
    <ul>
      <li><strong>World-Renowned Universities:</strong> Home to Oxford, Cambridge, Imperial College, and many other top-ranked institutions</li>
      <li><strong>Shorter Course Duration:</strong> 3-year bachelor's and 1-year master's programs save time and money</li>
      <li><strong>Post-Study Work Opportunities:</strong> Graduate Route visa allows 2-3 years of work experience</li>
      <li><strong>Cultural Diversity:</strong> Study alongside students from 200+ countries</li>
      <li><strong>English Language Advantage:</strong> Improve English skills in native-speaking environment</li>
    </ul>

    <h2>UK University Application Process</h2>
    <p>Applying to UK universities involves several steps, and our experts guide you through each one:</p>
    
    <ol>
      <li><strong>University Selection:</strong> Choose from 150+ universities based on your profile and preferences</li>
      <li><strong>Document Preparation:</strong> Academic transcripts, English test scores, SOP, and recommendations</li>
      <li><strong>Application Submission:</strong> Apply through UCAS for undergraduate or directly for postgraduate</li>
      <li><strong>Offer Acceptance:</strong> Accept conditional or unconditional offers from universities</li>
      <li><strong>Visa Application:</strong> Apply for UK Student Visa (Tier 4) with our expert assistance</li>
    </ol>

    <h2>UK Student Visa Requirements</h2>
    <p>The UK Student Visa (formerly Tier 4) allows you to study at a licensed UK institution. Key requirements include:</p>
    
    <ul>
      <li>Confirmation of Acceptance for Studies (CAS) from UK university</li>
      <li>Financial proof: £1,334/month for London, £1,023/month for outside London</li>
      <li>English language proficiency (IELTS, TOEFL, or PTE)</li>
      <li>Academic qualifications and transcripts</li>
      <li>Tuberculosis test results (if applicable)</li>
    </ul>
  `;

  return (
    <Layout
      title={pageData.title}
      description={pageData.description}
      keywords={pageData.keywords}
      structuredData={structuredData}
      aiOptimized={true}
    >
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <AIOptimizedContent
            title="Study in UK 2025 - Complete Guide for Indian Students"
            content={content}
            keyPoints={pageData.keyPoints}
            statistics={pageData.statistics}
            faqData={pageData.faqData}
            relatedTopics={pageData.relatedTopics}
          />
        </div>
      </div>
    </Layout>
  );
};

export default StudyInUK;