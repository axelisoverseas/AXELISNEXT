import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ExternalLink, Globe, Award, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Layout from '../components/Layout';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCounter from '../components/AnimatedCounter';
import { SocialMediaCTA } from '../components/SocialMediaButtons';
import { ScheduleCallCTA, BookDirectCTA } from '../components/CTAButton';
import { siteInfo } from '../data/siteData';
import { storeLead } from '../services/leadService';
import { sendWhatsAppNotification } from '../services/whatsappService';
import { openCalendlyScheduling } from '../services/calendlyService';
// Note: Locomotive Scroll handles scroll-to-top automatically

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const structuredData = {
    "@type": "LocalBusiness",
    "name": "Axelis Overseas Education Pvt Ltd",
    "description": "Leading study abroad consultancy helping students achieve their international education dreams with free services, scholarships, and comprehensive support.",
    "url": "https://overseeducation.com/contact",
    "telephone": "+91-8970224250",
    "email": "axelisoverseas@overseeducation.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "WorkFlo Ranka Junction, PROPERTY NO. 224, 3RD FLOOR, #80/3, VIJINAPUR VILLAGE OLD MADRAS ROAD KR PURAM HOBLI",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560016",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "priceRange": "Free",
    "image": "https://overseeducation.com/logo.png"
  };

  // Note: Locomotive Scroll handles scroll-to-top automatically on route change // 'success', 'error', or null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('📝 Contact form submitted:', formData);

      // Prepare lead data for the lead management system
      const leadData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.mobile,
        country: 'Not specified', // Contact form doesn't have country field
        service: formData.subject || 'General Inquiry',
        preferredTime: 'Not specified',
        message: formData.message,
        source: 'contact_form',
        trigger: 'contact_form_submission'
      };

      // Store lead in the lead management system
      console.log('💾 Storing contact form lead:', leadData);
      const storageResult = await storeLead(leadData);

      if (storageResult.success) {
        console.log('✅ Contact form lead stored successfully:', storageResult.leadId);

        // Send WhatsApp notification
        try {
          const whatsappResult = await sendWhatsAppNotification(leadData);
          if (whatsappResult.success) {
            console.log('✅ WhatsApp notification sent for contact form');
          } else {
            console.log('⚠️ WhatsApp notification failed for contact form:', whatsappResult);
          }
        } catch (whatsappError) {
          console.error('⚠️ WhatsApp notification error:', whatsappError);
        }

        // Show success message
        setSubmitStatus('success');

        // Reset form
        setFormData({
          fullName: '',
          email: '',
          mobile: '',
          subject: '',
          message: ''
        });

      } else {
        console.error('❌ Failed to store contact form lead:', storageResult.error);
        setSubmitStatus('error');
      }

    } catch (error) {
      console.error('❌ Contact form submission error:', error);
      setSubmitStatus('error');

      // Emergency backup - save to localStorage
      const emergencyLead = {
        ...formData,
        timestamp: new Date().toISOString(),
        source: 'contact_form_emergency',
        error: error.message
      };

      const existingLeads = JSON.parse(localStorage.getItem('axelis_leads') || '[]');
      existingLeads.push(emergencyLead);
      localStorage.setItem('axelis_leads', JSON.stringify(existingLeads));
      console.log('🚨 Contact form lead saved to emergency backup');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <Layout
      title="Contact Us"
      description="Get in touch with Axelis Overseas for free study abroad consultation. Contact our expert counselors for personalized guidance on your educational journey."
      keywords="contact axelis overseas, study abroad consultation, education counseling, student support"
      structuredData={structuredData}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl"></div>
        </div>



        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AnimatedSection animationType="fadeInUp">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Our Experts
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto mb-6">
                Take the first step toward unparalleled study abroad consulting!
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Phone className="text-cyan-400" size={16} />
                  <span className="text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Globe className="text-cyan-400" size={16} />
                  <span className="text-sm">
                    <AnimatedCounter end={29} suffix="+" goldAccent /> Countries
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Award className="text-cyan-400" size={16} />
                  <span className="text-sm">Expert Counselors</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Quick Booking Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animationType="fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Book a free consultation with our expert counselors and take the first step toward your study abroad dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookDirectCTA />
              <ScheduleCallCTA />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter the subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your message"
                  />
                </div>



                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          ✅ Thank you! Your message has been sent successfully. We'll get back to you soon!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">
                          ❌ There was an error sending your message. Please try again or contact us directly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Office Address</h3>
                      <p className="text-gray-600 dark:text-gray-300">{siteInfo.contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone Numbers</h3>
                      {siteInfo.contact.phones.map((phone, index) => (
                        <p key={index} className="text-gray-600 dark:text-gray-300">
                          <a href={`tel:${phone}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {phone}
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email Addresses</h3>
                      {siteInfo.contact.emails.map((email, index) => (
                        <p key={index} className="text-gray-800 dark:text-gray-200">
                          <a href={`mailto:${email}`} className="hover:text-black dark:hover:text-white transition-colors">
                            {email}
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Office Hours</h3>
                      <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600 dark:text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-600 dark:text-gray-300">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-600 text-white p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
                <p className="mb-6 text-blue-100">
                  Our counselors are available to help you with any urgent queries about your study abroad journey.
                </p>
                <div className="space-y-3">
                  <a
                    href={`tel:${siteInfo.contact.phones[0]}`}
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-900 font-semibold rounded-lg transition-colors"
                  >
                    Call Now: {siteInfo.contact.phones[0]}
                  </a>
                  <a
                    href={`mailto:${siteInfo.contact.emails[0]}`}
                    className="block w-full text-center px-6 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 font-semibold rounded-lg transition-colors"
                  >
                    Send Email
                  </a>
                  <a
                    href="https://calendly.com/axelisoverseas/counsellingsession"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Schedule Consultation
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Connect With Us</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Follow us on social media for the latest updates, success stories, and study abroad tips.
                </p>
                <div className="grid grid-cols-4 gap-4">
                  <a
                    href={siteInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors group"
                  >
                    <Facebook className="text-blue-600 group-hover:text-blue-700 mb-2" size={24} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Facebook</span>
                  </a>
                  <a
                    href={siteInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900 transition-colors group"
                  >
                    <Instagram className="text-pink-600 group-hover:text-pink-700 mb-2" size={24} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Instagram</span>
                  </a>
                  <a
                    href={siteInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors group"
                  >
                    <Linkedin className="text-blue-700 group-hover:text-blue-800 mb-2" size={24} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">LinkedIn</span>
                  </a>
                  <a
                    href={siteInfo.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors group"
                  >
                    <Youtube className="text-red-600 group-hover:text-red-700 mb-2" size={24} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SocialMediaCTA />
        </div>
      </AnimatedSection>
    </Layout>
  );
};

export default Contact;
