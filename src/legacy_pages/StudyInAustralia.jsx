import React from 'react';
import Layout from '../components/Layout';
import AIOptimizedContent from '../components/AIOptimizedContent';

const StudyInAustralia = () => {
  const pageData = {
    title: "Study in Australia 2025 - Complete Guide | Axelis Overseas",
    description: "Comprehensive guide to studying in Australia. Top universities, admission requirements, visa process, scholarships, and cost of living. Free consultation with Australia education experts.",
    keywords: "study in Australia, Australia universities, Australia student visa, Australia scholarships, study abroad Australia, Australia education consultancy, IELTS Australia, Australia admission requirements",
    
    keyPoints: [
      "100+ Australia universities partnerships with guaranteed admissions",
      "Free Australia student visa assistance with 96% success rate",
      "AUD $5000+ scholarships available for Indian students",
      "Post-Study Work Visa for 2-4 years depending on qualification",
      "Pathway to Australian Permanent Residence"
    ],
    
    statistics: [
      { value: "100+", label: "Australia Universities" },
      { value: "AUD $25,000", label: "Average Tuition" },
      { value: "2-4 Years", label: "Post-Study Work" },
      { value: "96%", label: "Visa Success Rate" }
    ],
    
    faqData: [
      {
        question: "What are the requirements to study in Australia?",
        answer: "To study in Australia, you need: Academic transcripts (65%+ for undergraduate, 70%+ for postgraduate), English proficiency (IELTS 6.0-7.0 or equivalent), Statement of Purpose, Letters of Recommendation, and financial proof showing AUD $30,000-45,000 per year."
      },
      {
        question: "How much does it cost to study in Australia?",
        answer: "Australia study costs: Tuition fees range from AUD $20,000-45,000 per year, living expenses AUD $15,000-25,000 per year. Total annual cost: AUD $35,000-70,000. Scholarships can reduce costs by AUD $5,000-20,000."
      },
      {
        question: "Can I work while studying in Australia?",
        answer: "Yes, student visa allows 48 hours/fortnight part-time work during studies and full-time during holidays. After graduation, you can apply for Temporary Graduate Visa (subclass 485) for 2-4 years of work experience."
      },
      {
        question: "How can I get Permanent Residence in Australia after studies?",
        answer: "Australia offers multiple PR pathways: SkillSelect (General Skilled Migration), State Nomination Programs, and Regional Sponsored Migration. Having Australian qualifications and work experience significantly improves your points score."
      }
    ],
    
    relatedTopics: [
      "Australia Student Visa", "Australia Universities", "Australia Scholarships", "IELTS Preparation", 
      "Australia Cost of Living", "Australia Work Visa", "Australia PR Process"
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Complete Guide to Study in Australia 2025",
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
      "@id": "https://overseeducation.com/study-in-australia"
    }
  };

  const content = `
    <h2>Why Study in Australia?</h2>
    <p>Australia has become one of the world's top study destinations, offering excellent education quality, diverse cultural experiences, and outstanding post-graduation opportunities. With its relaxed lifestyle, beautiful landscapes, and strong economy, Australia provides an ideal environment for international students.</p>
    
    <h3>Top Benefits of Studying in Australia:</h3>
    <ul>
      <li><strong>World-Class Universities:</strong> Home to University of Melbourne, ANU, University of Sydney, and other globally ranked institutions</li>
      <li><strong>Research Excellence:</strong> Leading research opportunities in various fields</li>
      <li><strong>Post-Study Work Rights:</strong> 2-4 years of work authorization after graduation</li>
      <li><strong>Quality of Life:</strong> High standard of living with excellent healthcare and safety</li>
      <li><strong>Multicultural Society:</strong> Welcoming environment for international students</li>
    </ul>

    <h2>Australia University Application Process</h2>
    <p>Applying to Australian universities is streamlined with proper guidance. Our process includes:</p>
    
    <ol>
      <li><strong>University Selection:</strong> Choose from Group of Eight and other top-ranked universities</li>
      <li><strong>Course Selection:</strong> Select from diverse programs across all disciplines</li>
      <li><strong>Document Preparation:</strong> Academic transcripts, English test scores, SOP, and references</li>
      <li><strong>Application Submission:</strong> Apply directly to universities or through authorized agents</li>
      <li><strong>Student Visa Application:</strong> Apply for Australian student visa (subclass 500)</li>
    </ol>

    <h2>Australia Student Visa (Subclass 500) Requirements</h2>
    <p>The Australia Student Visa allows you to study at registered Australian institutions. Requirements include:</p>
    
    <ul>
      <li>Confirmation of Enrolment (CoE) from Australian institution</li>
      <li>Financial capacity: AUD $30,000-45,000 per year (tuition + living expenses)</li>
      <li>English language proficiency (IELTS, TOEFL, or PTE)</li>
      <li>Academic qualifications and transcripts</li>
      <li>Health insurance (OSHC) for duration of studies</li>
      <li>Health examination and character requirements</li>
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
            title="Study in Australia 2025 - Complete Guide for Indian Students"
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

export default StudyInAustralia;
