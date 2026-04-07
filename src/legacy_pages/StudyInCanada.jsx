import React from 'react';
import Layout from '../components/Layout';
import AIOptimizedContent from '../components/AIOptimizedContent';

const StudyInCanada = () => {
  const pageData = {
    title: "Study in Canada 2025 - Complete Guide | Axelis Overseas",
    description: "Comprehensive guide to studying in Canada. Top universities, admission requirements, visa process, scholarships, and cost of living. Free consultation with Canada education experts.",
    keywords: "study in Canada, Canada universities, Canada student visa, Canada scholarships, study abroad Canada, Canada education consultancy, IELTS Canada, Canada admission requirements",

    keyPoints: [
      "200+ Canada universities partnerships with guaranteed admissions",
      "Free Canada student visa assistance with 97% success rate",
      "CAD $3000+ scholarships available for Indian students",
      "Post-Graduation Work Permit (PGWP) for up to 3 years",
      "Pathway to Canadian Permanent Residence"
    ],

    statistics: [
      { value: "200+", label: "Canada Universities" },
      { value: "CAD $20,000", label: "Average Tuition" },
      { value: "Up to 3 Years", label: "PGWP Duration" },
      { value: "97%", label: "Visa Success Rate" }
    ],

    faqData: [
      {
        question: "What are the requirements to study in Canada?",
        answer: "To study in Canada, you need: Academic transcripts (70%+ for undergraduate, 75%+ for postgraduate), English proficiency (IELTS 6.0-7.0 or equivalent), Statement of Purpose, Letters of Recommendation, and financial proof showing CAD $25,000-35,000 per year."
      },
      {
        question: "How much does it cost to study in Canada?",
        answer: "Canada study costs: Tuition fees range from CAD $15,000-35,000 per year, living expenses CAD $12,000-18,000 per year. Total annual cost: CAD $27,000-53,000. Scholarships can reduce costs by CAD $3,000-15,000."
      },
      {
        question: "Can I work while studying in Canada?",
        answer: "Yes, study permit allows 20 hours/week part-time work during studies and full-time during breaks. After graduation, you can apply for PGWP (up to 3 years) to work full-time in Canada."
      },
      {
        question: "How can I get Permanent Residence in Canada after studies?",
        answer: "Canada offers multiple PR pathways for international graduates: Canadian Experience Class (CEC), Provincial Nominee Program (PNP), and Express Entry system. Having Canadian education and work experience significantly improves your chances."
      }
    ],

    relatedTopics: [
      "Canada Student Visa", "Canada Universities", "Canada Scholarships", "IELTS Preparation",
      "Canada Cost of Living", "PGWP Canada", "Canada PR Process"
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Complete Guide to Study in Canada 2025",
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
      "@id": "https://overseeducation.com/study-in-canada"
    }
  };

  const content = `
    <h2>Why Study in Canada?</h2>
    <p>Canada has emerged as one of the most preferred destinations for international students, offering world-class education, multicultural environment, and excellent post-graduation opportunities. With its welcoming immigration policies and high quality of life, Canada provides an ideal setting for academic and personal growth.</p>

    <h3>Top Benefits of Studying in Canada:</h3>
    <ul>
      <li><strong>High-Quality Education:</strong> Home to University of Toronto, McGill, UBC, and other globally ranked institutions</li>
      <li><strong>Affordable Education:</strong> Lower tuition fees compared to USA and UK</li>
      <li><strong>Post-Graduation Work Permit:</strong> Up to 3 years of work authorization after graduation</li>
      <li><strong>Pathway to PR:</strong> Multiple immigration pathways for international graduates</li>
      <li><strong>Safe and Multicultural:</strong> Welcoming environment with diverse communities</li>
    </ul>

    <h2>Canada University Application Process</h2>
    <p>Applying to Canadian universities is straightforward with proper guidance. Our process includes:</p>

    <ol>
      <li><strong>University Selection:</strong> Choose from 200+ universities and colleges across 10 provinces</li>
      <li><strong>Document Preparation:</strong> Academic transcripts, English test scores, SOP, and references</li>
      <li><strong>Application Submission:</strong> Apply directly to universities or through centralized systems</li>
      <li><strong>Scholarship Applications:</strong> Apply for merit-based and need-based scholarships</li>
      <li><strong>Study Permit Application:</strong> Apply for Canadian study permit with our guidance</li>
    </ol>

    <h2>Canada Study Permit Requirements</h2>
    <p>The Canada Study Permit allows you to study at Designated Learning Institutions (DLI). Requirements include:</p>

    <ul>
      <li>Letter of acceptance from a Canadian DLI</li>
      <li>Financial proof: CAD $25,000-35,000 per year (tuition + living expenses)</li>
      <li>English language proficiency (IELTS, TOEFL, or PTE)</li>
      <li>Academic qualifications and transcripts</li>
      <li>Medical examination (if required)</li>
      <li>Statement of Purpose explaining study plans</li>
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
            title="Study in Canada 2025 - Complete Guide for Indian Students"
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

export default StudyInCanada;