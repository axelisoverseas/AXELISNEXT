import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, Mail, Phone, MapPin } from 'lucide-react';
import Layout from '../components/Layout';
import AnimatedSection from '../components/AnimatedSection';

const PrivacyPolicy = () => {
  const lastUpdated = "January 1, 2025";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: <Database className="w-6 h-6" />,
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect personal information that you voluntarily provide to us when you register for our services, express interest in obtaining information about us or our services, participate in activities on our website, or contact us."
        },
        {
          subtitle: "Information Collected Includes:",
          list: [
            "Name and contact information (email address, phone number, mailing address)",
            "Educational background and academic records",
            "Passport and visa information",
            "Financial information for scholarship and loan applications",
            "Communication preferences and marketing preferences"
          ]
        }
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: <UserCheck className="w-6 h-6" />,
      content: [
        {
          text: "We use the information we collect or receive to:"
        },
        {
          list: [
            "Provide, operate, and maintain our educational consultancy services",
            "Process your applications for study abroad programs",
            "Communicate with you about our services, including customer service and support",
            "Send you marketing and promotional communications (with your consent)",
            "Improve our website and services based on your feedback",
            "Comply with legal obligations and protect our legal rights"
          ]
        }
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: <Eye className="w-6 h-6" />,
      content: [
        {
          text: "We may share your personal information in the following situations:"
        },
        {
          list: [
            "With educational institutions and universities for application processing",
            "With government agencies for visa and immigration purposes",
            "With third-party service providers who assist us in operating our business",
            "With your explicit consent for specific purposes",
            "To comply with legal obligations or protect our rights and safety"
          ]
        },
        {
          subtitle: "We Do Not:",
          list: [
            "Sell your personal information to third parties",
            "Share your information for marketing purposes without consent",
            "Disclose sensitive information without proper authorization"
          ]
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: <Lock className="w-6 h-6" />,
      content: [
        {
          text: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          subtitle: "Security Measures Include:",
          list: [
            "Encryption of sensitive data in transit and at rest",
            "Regular security assessments and updates",
            "Access controls and authentication procedures",
            "Staff training on data protection and privacy",
            "Secure data storage and backup procedures"
          ]
        }
      ]
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: <Database className="w-6 h-6" />,
      content: [
        {
          text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law."
        },
        {
          subtitle: "Retention Periods:",
          list: [
            "Application data: 7 years after completion or withdrawal",
            "Communication records: 3 years from last contact",
            "Marketing data: Until you withdraw consent",
            "Legal compliance data: As required by applicable laws"
          ]
        }
      ]
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          text: "Depending on your location, you may have the following rights regarding your personal information:"
        },
        {
          list: [
            "Right to access your personal information",
            "Right to correct inaccurate or incomplete information",
            "Right to delete your personal information",
            "Right to restrict processing of your information",
            "Right to data portability",
            "Right to withdraw consent for marketing communications"
          ]
        },
        {
          subtitle: "To Exercise Your Rights:",
          text: "Contact us using the information provided below. We will respond to your request within 30 days."
        }
      ]
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      icon: <Eye className="w-6 h-6" />,
      content: [
        {
          text: "We use cookies and similar tracking technologies to enhance your experience on our website."
        },
        {
          subtitle: "Types of Cookies We Use:",
          list: [
            "Essential cookies: Required for website functionality",
            "Analytics cookies: Help us understand how you use our website",
            "Marketing cookies: Used to deliver relevant advertisements",
            "Preference cookies: Remember your settings and preferences"
          ]
        },
        {
          text: "You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality."
        }
      ]
    },
    {
      id: "third-party-links",
      title: "Third-Party Links",
      icon: <Eye className="w-6 h-6" />,
      content: [
        {
          text: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit."
        }
      ]
    },
    {
      id: "children-privacy",
      title: "Children's Privacy",
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          text: "Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we will take steps to delete such information."
        }
      ]
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      icon: <Database className="w-6 h-6" />,
      content: [
        {
          text: "As part of our study abroad services, your personal information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information during such transfers."
        }
      ]
    },
    {
      id: "policy-updates",
      title: "Updates to This Policy",
      icon: <UserCheck className="w-6 h-6" />,
      content: [
        {
          text: "We may update this privacy policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the 'Last Updated' date."
        }
      ]
    }
  ];

  return (
    <Layout
      title="Privacy Policy"
      description="Learn how Axelis Overseas protects your personal information and privacy. Our comprehensive privacy policy outlines data collection, usage, and your rights."
      keywords="privacy policy, data protection, personal information, GDPR, data security, Axelis Overseas"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <AnimatedSection className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-12 h-12 text-blue-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At Axelis Overseas, we are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last Updated: {lastUpdated}
            </p>
          </AnimatedSection>

          {/* Introduction */}
          <AnimatedSection className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Axelis Overseas Education Pvt Ltd ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our educational consultancy services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </AnimatedSection>

          {/* Privacy Policy Sections */}
          {sections.map((section, index) => (
            <AnimatedSection key={section.id} className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>
              
              {section.content.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-6 last:mb-0">
                  {item.subtitle && (
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{item.subtitle}</h3>
                  )}
                  {item.text && (
                    <p className="text-gray-700 leading-relaxed mb-4">{item.text}</p>
                  )}
                  {item.list && (
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                      {item.list.map((listItem, listIndex) => (
                        <li key={listIndex}>{listItem}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </AnimatedSection>
          ))}

          {/* Contact Information */}
          <AnimatedSection className="bg-blue-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
            <p className="text-blue-100 text-center mb-8">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Mail className="w-6 h-6 text-blue-200" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-blue-100">info@axelisoverseas.com</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Phone className="w-6 h-6 text-blue-200" />
                </div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-blue-100">+91-8970224250</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <MapPin className="w-6 h-6 text-blue-200" />
                </div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-blue-100">WorkFlo Ranka Junction, PROPERTY NO. 224, 3RD FLOOR, #80/3, VIJINAPUR VILLAGE OLD MADRAS ROAD KR PURAM HOBLI, BENGALURU (KN) BANGALORE, KAR 560016</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
