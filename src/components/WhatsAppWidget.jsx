import React, { useState, useEffect } from 'react';
import { X, Send, Phone, Clock, Users } from 'lucide-react';
import { storeLead } from '../services/leadService';

// WhatsApp SVG Icon Component
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState('');
  const [step, setStep] = useState('form'); // 'form' or 'chat'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    degree: 'UG'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for existing lead on open
  useEffect(() => {
    if (isOpen) {
      const savedLead = localStorage.getItem('axelis_whatsapp_lead');
      if (savedLead) {
        setStep('chat');
        const parsed = JSON.parse(savedLead);
        setFormData(parsed);
      } else {
        setStep('form');
      }
    }
  }, [isOpen]);

  // Handle ESC key and click outside to close chat widget
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      // Check if click is outside the WhatsApp widget
      if (isOpen && !event.target.closest('.whatsapp-widget')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const formatPhoneNumber = (number) => {
    if (!number) return null;
    const cleanNumber = number.toString().replace(/\D/g, '');
    if (cleanNumber.length === 10 && cleanNumber.startsWith('9')) {
      return '91' + cleanNumber;
    }
    return cleanNumber.length === 12 ? cleanNumber : '91' + cleanNumber;
  };

  const whatsappNumber = formatPhoneNumber(process.env.NEXT_PUBLIC_WHATSAPP_NOTIFICATION_NUMBER);

  const predefinedMessages = [
    "Hi! I'm interested in studying abroad. Can you help me?",
    "I want to know about university applications for 2025.",
    "What are the requirements for studying in Netherlands?",
    "Can you help me with scholarship opportunities?",
    "I need assistance with visa applications."
  ];

  const handleSendMessage = async (customMessage = null) => {
    const messageToSend = customMessage || message || predefinedMessages[0];

    // Capture lead information for WhatsApp interactions
    try {
      const leadData = {
        fullName: formData.name || 'WhatsApp User',
        email: 'whatsapp@unknown.com',
        phone: formData.phone || 'Unknown',
        country: 'Not specified',
        service: getServiceFromMessage(messageToSend),
        degree: formData.degree,
        preferredTime: 'Not specified',
        message: messageToSend,
        source: 'whatsapp_widget',
        trigger: customMessage ? 'predefined_message' : 'custom_message'
      };

      console.log('📱 Capturing WhatsApp widget interaction:', leadData);
      await storeLead(leadData);
      console.log('✅ WhatsApp widget interaction captured');
    } catch (error) {
      console.error('⚠️ Failed to capture WhatsApp widget interaction:', error);
    }

    const whatsappUrl = `https://wa.me/918970224250?text=Hey%2C%20I%20am%20interested%20in%20studying%20abroad`;
    window.open(whatsappUrl, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.degree) return;

    setIsSubmitting(true);
    try {
      // Store initial lead
      const leadData = {
        fullName: formData.name,
        email: 'whatsapp@unknown.com',
        phone: formData.phone,
        degree: formData.degree,
        country: 'Not specified',
        service: 'WhatsApp Inquiry Initial',
        message: 'Opening WhatsApp Chat Widget',
        source: 'whatsapp_widget_form',
        trigger: 'form_submission'
      };

      await storeLead(leadData);
      localStorage.setItem('axelis_whatsapp_lead', JSON.stringify(formData));
      setStep('chat');
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePredefinedMessage = (msg) => {
    handleSendMessage(msg);
  };

  // Helper function to determine service type from message
  const getServiceFromMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('university') || lowerMessage.includes('application')) {
      return 'University Application';
    } else if (lowerMessage.includes('scholarship')) {
      return 'Scholarship Assistance';
    } else if (lowerMessage.includes('visa')) {
      return 'Visa Guidance';
    } else if (lowerMessage.includes('netherlands') || lowerMessage.includes('germany') || lowerMessage.includes('canada')) {
      return 'Country-specific Guidance';
    } else {
      return 'General Inquiry';
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* WhatsApp Chat Widget */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 whatsapp-widget ${isOpen ? 'w-80' : 'w-auto'}`}>
        
        {/* Chat Window */}
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 mb-4 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <WhatsAppIcon size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Axelis Overseas</h3>
                    <div className="text-green-100 text-xs flex items-center">
                      <div className="w-2 h-2 bg-green-300 rounded-full mr-1 animate-pulse"></div>
                      Online now
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="text-white hover:text-green-200 transition-colors p-1 rounded cursor-pointer"
                  type="button"
                  aria-label="Close WhatsApp chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            <div className="p-4 max-h-[450px] overflow-y-auto">
              {step === 'form' ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-3 text-sm mb-4">
                    <p className="text-gray-800 font-medium">Hi! Let&apos;s get you connected.</p>
                    <p className="text-gray-600 text-xs">Please provide your details to start the chat with our counselor.</p>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-black font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 99999 99999"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-black font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1">Degree Interested In *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, degree: 'UG'})}
                        className={`p-2.5 text-sm font-semibold rounded-xl border transition-all ${
                          formData.degree === 'UG' 
                            ? 'bg-green-600 border-green-600 text-white shadow-md' 
                            : 'bg-white border-gray-200 text-gray-600 hover:border-green-200'
                        }`}
                      >
                        Undergraduate (UG)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, degree: 'PG'})}
                        className={`p-2.5 text-sm font-semibold rounded-xl border transition-all ${
                          formData.degree === 'PG' 
                            ? 'bg-green-600 border-green-600 text-white shadow-md' 
                            : 'bg-white border-gray-200 text-gray-600 hover:border-green-200'
                        }`}
                      >
                        Postgraduate (PG)
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 hover:bg-black text-white py-3 rounded-xl text-sm font-bold shadow-lg transform transition-transform active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <span>Start Chatting</span>
                    <Send size={16} />
                  </button>
                </form>
              ) : (
                <>
                  {/* Welcome Message */}
                  <div className="mb-4">
                    <div className="bg-gray-100 rounded-lg p-3 text-sm">
                      <p className="text-gray-800 mb-2">Hi, {formData.name}!</p>
                      <p className="text-gray-600 text-xs">How can we assist you with your {formData.degree === 'UG' ? 'Undergraduate' : 'Postgraduate'} studies today?</p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wider ml-1">Quick actions:</p>
                    <div className="space-y-2">
                      {predefinedMessages.slice(0, 3).map((msg, index) => (
                        <button
                          key={index}
                          onClick={() => handlePredefinedMessage(msg)}
                          className="w-full text-left p-3 text-[13px] bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition-colors text-black font-semibold"
                        >
                          {msg}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <Phone size={14} className="text-blue-600" />
                      <span className="text-xs font-bold text-blue-900 uppercase tracking-tight">Direct Contact</span>
                    </div>
                    <p className="text-sm font-bold text-blue-700">+91 8970224250</p>
                    <div className="flex items-center space-x-4 mt-2 text-[11px] text-blue-600 font-medium">
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>9 AM - 8 PM</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={12} />
                        <span>Expert Support</span>
                      </div>
                    </div>
                  </div>

                  {/* Custom Message Input */}
                  <div className="space-y-2">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full p-3 text-sm border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-green-500 outline-none text-black"
                      rows="2"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 shadow-md"
                    >
                      <Send size={18} />
                      <span>Message on WhatsApp</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
            isOpen ? 'rotate-180' : ''
          }`}
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            boxShadow: '0 8px 25px rgba(37, 211, 102, 0.3)'
          }}
        >
          {isOpen ? <X size={24} /> : <WhatsAppIcon size={24} />}
        </button>

        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            1
          </div>
        )}
      </div>

      {/* Pulse Animation for First Time */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-2 bg-green-500 rounded-full animate-ping opacity-30 animation-delay-75"></div>
        </div>
      )}
    </>
  );
};

export default WhatsAppWidget;
