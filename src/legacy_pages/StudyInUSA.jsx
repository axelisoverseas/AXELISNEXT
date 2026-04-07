import React from 'react';
import Layout from '../components/Layout';
import AIOptimizedContent from '../components/AIOptimizedContent';

const StudyInUSA = () => {
  const pageData = {
    title: "Study in USA 2025 - Complete Guide | Axelis Overseas",
    description: "Comprehensive guide to studying in USA. Top universities, admission requirements, visa process, scholarships, and cost of living. Free consultation with USA education experts.",
    keywords: "study in USA, USA universities, USA student visa, USA scholarships, study abroad USA, USA education consultancy, TOEFL USA, USA admission requirements",
    
    keyPoints: [
      "500+ USA universities partnerships with guaranteed admissions",
      "Free USA student visa assistance with 95% success rate",
      "$5000+ scholarships available for Indian students",
      "Optional Practical Training (OPT) for 1-3 years",
      "STEM programs eligible for 3-year OPT extension"
    ],
    
    statistics: [
      { value: "4,000+", label: "USA Universities" },
      { value: "$25,000", label: "Average Tuition" },
      { value: "1-3 Years", label: "OPT Duration" },
      { value: "95%", label: "Visa Success Rate" }
    ],
    
    faqData: [
      {
        question: "What are the requirements to study in USA?",
        answer: "To study in USA, you need: Academic transcripts (GPA 3.0+ for undergraduate, 3.5+ for postgraduate), English proficiency (TOEFL 80+ or IELTS 6.5+), SAT/GRE/GMAT scores, Statement of Purpose, Letters of Recommendation, and financial proof showing $40,000-70,000 per year."
      },
      {
        question: "How much does it cost to study in USA?",
        answer: "USA study costs vary: Tuition fees range from $20,000-60,000 per year, living expenses $15,000-25,000 per year. Total annual cost: $35,000-85,000. Scholarships and assistantships can reduce costs significantly."
      },
      {
        question: "Can I work while studying in USA?",
        answer: "Yes, F-1 visa allows 20 hours/week on-campus work during studies. After graduation, you can apply for OPT (1 year) or STEM OPT extension (additional 2 years) to work full-time in USA."
      },
      {
        question: "Which USA universities offer the best scholarships?",
        answer: "Top scholarship-offering universities include Harvard, Stanford, MIT, Yale, Princeton, and many state universities. Merit-based and need-based scholarships range from $5,000 to full tuition coverage."
      }
    ],
    
    relatedTopics: [
      "USA Student Visa", "USA Universities", "USA Scholarships", "TOEFL Preparation", 
      "USA Cost of Living", "OPT Visa USA", "USA Admission Requirements"
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Complete Guide to Study in USA 2025",
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
      "@id": "https://overseeducation.com/study-in-usa"
    }
  };

  const content = `
    <h2>Why Study in USA?</h2>
    <p>The United States of America is the world's leading destination for international students, offering unparalleled academic excellence, cutting-edge research opportunities, and diverse cultural experiences. With over 4,000 universities and colleges, USA provides endless possibilities for academic and professional growth.</p>
    
    <h3>Top Benefits of Studying in USA:</h3>
    <ul>
      <li><strong>World's Best Universities:</strong> Home to Harvard, MIT, Stanford, and 50+ top-100 global universities</li>
      <li><strong>Research Opportunities:</strong> Access to state-of-the-art facilities and groundbreaking research</li>
      <li><strong>Flexible Education System:</strong> Choose from diverse majors and customize your academic path</li>
      <li><strong>OPT Work Authorization:</strong> 1-3 years of work experience after graduation</li>
      <li><strong>Networking Opportunities:</strong> Connect with industry leaders and global professionals</li>
    </ul>

    <h2>USA University Application Process</h2>
    <p>Applying to USA universities requires careful planning and preparation. Our experts guide you through:</p>
    
    <ol>
      <li><strong>University Selection:</strong> Choose from 4,000+ universities based on your profile and career goals</li>
      <li><strong>Standardized Tests:</strong> Prepare for SAT, GRE, GMAT, TOEFL/IELTS as required</li>
      <li><strong>Application Preparation:</strong> Craft compelling essays, SOPs, and gather recommendations</li>
      <li><strong>Financial Planning:</strong> Explore scholarships, assistantships, and funding options</li>
      <li><strong>Visa Application:</strong> Apply for F-1 Student Visa with our expert guidance</li>
    </ol>

    <h2>USA Student Visa (F-1) Requirements</h2>
    <p>The F-1 Student Visa allows you to study at accredited USA institutions. Key requirements include:</p>
    
    <ul>
      <li>Form I-20 from SEVP-approved USA university</li>
      <li>Financial proof: $40,000-70,000 per year depending on university and location</li>
      <li>English language proficiency (TOEFL 80+ or IELTS 6.5+)</li>
      <li>Academic qualifications and standardized test scores</li>
      <li>Visa interview at US Consulate</li>
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
            title="Study in USA 2025 - Complete Guide for Indian Students"
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

export default StudyInUSA;
