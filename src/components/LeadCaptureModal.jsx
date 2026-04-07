import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Globe, GraduationCap, Phone, Mail, Calendar, CheckCircle, MessageCircle } from 'lucide-react';
import { sendWhatsAppNotification, openWhatsAppChat } from '../services/whatsappService';
import { storeLead } from '../services/leadService';
import { openCalendlyScheduling } from '../services/calendlyService';

const LeadCaptureModal = ({ isOpen, onClose, trigger = 'timed' }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    country: '',
    service: '',
    fullName: '',
    email: '',
    phone: '',
    preferredTime: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const countries = [
    'United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 
    'Ireland', 'Netherlands', 'Finland', 'Sweden', 'Norway', 'Denmark',
    'New Zealand', 'France', 'Italy', 'Spain', 'Other'
  ];

  const services = [
    'University Selection & Application',
    'Scholarship Assistance',
    'Visa Guidance',
    'Education Loans',
    'Accommodation Support',
    'Complete Study Abroad Package'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      console.log('🚀 Processing lead submission:', formData);

      const leadData = {
        ...formData,
        source: trigger,
        trigger: trigger,
        timestamp: new Date().toISOString()
      };

      // Step 1: Store lead in database
      console.log('📤 Attempting to store lead:', leadData);
      const storageResult = await storeLead(leadData);

      console.log('📥 Storage result:', storageResult);

      if (storageResult.success) {
        console.log('✅ Lead stored with ID:', storageResult.leadId);
        leadData.leadId = storageResult.leadId;

        // Verify storage by checking localStorage
        const verifyStorage = localStorage.getItem('axelis_leads_db');
        if (verifyStorage) {
          const parsedStorage = JSON.parse(verifyStorage);
          console.log('🔍 Verification: Storage now has', parsedStorage.length, 'leads');
          const newLead = parsedStorage.find(l => l.id === storageResult.leadId);
          if (newLead) {
            console.log('✅ Lead verified in storage:', newLead.full_name);
          } else {
            console.log('⚠️ Lead not found in storage after save');
          }
        }

        console.log('✅ Lead saved successfully! ID: ' + storageResult.leadId);
      } else {
        console.log('⚠️ Lead storage failed:', storageResult.error);
      }

      // Step 2: Lead stored successfully, prepare for choice
      console.log('📋 Lead stored, preparing choice options...');

      // Step 3: Backup to localStorage
      const existingLeads = JSON.parse(localStorage.getItem('axelis_leads') || '[]');
      existingLeads.push({
        ...leadData,
        localStorageId: Date.now(),
        status: 'pending_choice'
      });
      localStorage.setItem('axelis_leads', JSON.stringify(existingLeads));

      // Step 4: Show choice modal (WhatsApp or Calendly)
      setStep(5); // Move to choice step instead of closing

    } catch (error) {
      console.error('❌ Error submitting form:', error);

      // Emergency backup - still save the lead
      const emergencyLead = {
        ...formData,
        timestamp: new Date().toISOString(),
        trigger: trigger,
        whatsappStatus: 'error',
        error: error.message
      };

      const existingLeads = JSON.parse(localStorage.getItem('axelis_leads') || '[]');
      existingLeads.push(emergencyLead);
      localStorage.setItem('axelis_leads', JSON.stringify(existingLeads));

      // Still proceed to choice step even on error
      setStep(5);

    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      country: '',
      service: '',
      fullName: '',
      email: '',
      phone: '',
      preferredTime: ''
    });
    setErrors({});
    setIsSubmitting(false);
  };

  // Handle WhatsApp choice
  const handleWhatsAppChoice = async () => {
    try {
      console.log('📱 User chose WhatsApp option');

      // Open WhatsApp chat for the user with pre-filled message
      const whatsappResult = openWhatsAppChat(formData);

      if (whatsappResult.success) {
        console.log('✅ WhatsApp chat opened successfully');
      } else {
        console.log('⚠️ WhatsApp had issues, but fallback was used');
      }

      // Also send notification to us (optional - runs in background)
      try {
        await sendWhatsAppNotification(formData);
        console.log('✅ Internal WhatsApp notification sent');
      } catch (notificationError) {
        console.log('⚠️ Internal notification failed, but user WhatsApp still opened');
      }

      // Close modal and reset
      resetForm();
      onClose();

    } catch (error) {
      console.error('❌ WhatsApp choice error:', error);
      // Still close the modal
      resetForm();
      onClose();
    }
  };

  // Handle Calendly choice
  const handleCalendlyChoice = async () => {
    try {
      console.log('📅 User chose Calendly option');

      // Close modal first
      resetForm();
      onClose();

      // Open Calendly with lead data
      const calendlyResult = await openCalendlyScheduling(formData, 'consultation');

      if (calendlyResult.success) {
        console.log('✅ Calendly scheduling opened successfully');
      } else {
        console.log('⚠️ Calendly scheduling had issues, but fallback was used');
      }

    } catch (error) {
      console.error('❌ Calendly choice error:', error);
      // Emergency fallback
      window.open('https://calendly.com/axelisoverseas/counsellingsession', '_blank');
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    resetForm();
    onClose();
  };

  const getTriggerTitle = () => {
    switch (trigger) {
      case 'exit':
        return 'Wait! Don\'t Miss Out on Your Dream University';
      case 'timed':
        return 'Ready to Start Your Study Abroad Journey?';
      default:
        return 'Get Free Consultation';
    }
  };

  const getTriggerSubtitle = () => {
    switch (trigger) {
      case 'exit':
        return 'Get free expert guidance before you leave. It only takes 2 minutes!';
      case 'timed':
        return 'Join 2000+ students who have successfully started their international education with us.';
      default:
        return 'Let our experts guide you to your dream university.';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Blurred transparent background overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-lg transition-all duration-500 modal-backdrop"
        onClick={handleClose}
        style={{
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          animation: 'backdropEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      ></div>

      {/* Space-themed floating background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-cyan-400/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div
        className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full max-h-[90vh] sm:max-h-[85vh] overflow-hidden border border-blue-500/30 backdrop-blur-xl transform transition-all duration-500 animate-in fade-in zoom-in-95 slide-in-from-bottom-4"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          animation: 'modalEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Space-themed Header */}
        <div className="relative bg-gradient-to-r from-slate-900 via-blue-600 to-blue-600 text-white p-3 sm:p-4 rounded-t-2xl sm:rounded-t-3xl overflow-hidden">
          {/* Header background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-blue-600/95 to-blue-600/90"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            ></div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-3 right-3 p-2 text-white hover:text-cyan-300 transition-all duration-300 hover:scale-110 hover:rotate-90 z-50 hover:bg-white/10 rounded-lg cursor-pointer"
            type="button"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="relative z-10 flex items-center">
            {/* Logo */}
            <div className="mr-2 sm:mr-3">
              <img
                src="/1logo.png"
                alt="Axelis Overseas"
                className="h-6 sm:h-8 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-base sm:text-lg font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">{getTriggerTitle()}</h2>
              <p className="text-gray-200 text-xs hidden sm:block">{getTriggerSubtitle()}</p>
            </div>
          </div>
        </div>

        {/* Space-themed Progress Bar */}
        <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border-y border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 rounded-full text-xs font-bold transition-all duration-500 ${
                  step >= num
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900 shadow-lg shadow-cyan-400/25'
                    : 'bg-slate-700 text-gray-400 border border-slate-600'
                }`}
              >
                {step > num ? <CheckCircle size={14} className="text-slate-900" /> : num}
              </div>
            ))}
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5 shadow-inner border border-slate-600">
            <div
              className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-1.5 rounded-full transition-all duration-700 shadow-sm shadow-cyan-400/50"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Space-themed Form Content */}
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 bg-gradient-to-b from-slate-800/30 to-slate-900/50">
          {step === 1 && (
            <div>
              <div className="flex items-center mb-3 sm:mb-4 pt-3 sm:pt-4">
                <div className="p-1 sm:p-1.5 bg-gradient-to-r from-cyan-400/20 to-cyan-500/20 rounded-lg mr-2">
                  <Globe className="text-cyan-400" size={20} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Which country interests you?
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {countries.map((country) => (
                  <button
                    key={country}
                    onClick={() => {
                      handleInputChange('country', country);
                      handleNext();
                    }}
                    className={`p-2 sm:p-3 text-left rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm ${
                      formData.country === country
                        ? 'border-cyan-400 bg-gradient-to-r from-cyan-400/20 to-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-400/25'
                        : 'border-slate-600 bg-slate-700/50 text-gray-300 hover:border-cyan-400/50 hover:bg-cyan-400/10'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold">
                      {country}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center mb-4">
                <div className="p-1.5 bg-gradient-to-r from-cyan-400/20 to-cyan-500/20 rounded-lg mr-2">
                  <GraduationCap className="text-cyan-400" size={20} />
                </div>
                <h3 className="text-base font-bold text-white">
                  What service do you need?
                </h3>
              </div>
              <div className="space-y-2">
                {services.map((service) => (
                  <button
                    key={service}
                    onClick={() => {
                      handleInputChange('service', service);
                      handleNext();
                    }}
                    className={`w-full p-3 text-left rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm ${
                      formData.service === service
                        ? 'border-cyan-400 bg-gradient-to-r from-cyan-400/20 to-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-400/25'
                        : 'border-slate-600 bg-slate-700/50 text-gray-300 hover:border-cyan-400/50 hover:bg-cyan-400/10'
                    }`}
                  >
                    <span className="text-sm font-semibold">
                      {service}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-r from-cyan-400/20 to-cyan-500/20 rounded-lg mr-3">
                  <Phone className="text-cyan-400" size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Your contact information
                </h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-slate-700/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base ${
                      errors.fullName ? 'border-cyan-400 bg-cyan-400/10' : 'border-slate-600 hover:border-cyan-400/50'
                    }`}
                    required
                  />
                  {errors.fullName && (
                    <p className="text-cyan-400 text-sm mt-2 font-medium">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-slate-700/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 ${
                      errors.email ? 'border-cyan-400 bg-cyan-400/10' : 'border-slate-600 hover:border-cyan-400/50'
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-cyan-400 text-sm mt-2 font-medium">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 bg-slate-700/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 ${
                      errors.phone ? 'border-cyan-400 bg-cyan-400/10' : 'border-slate-600 hover:border-cyan-400/50'
                    }`}
                    required
                  />
                  {errors.phone && (
                    <p className="text-cyan-400 text-sm mt-2 font-medium">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                <button
                  onClick={handleBack}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border-2 border-slate-600 text-gray-300 bg-slate-700/50 rounded-lg sm:rounded-xl hover:bg-slate-600 hover:border-slate-500 transition-all duration-300 font-semibold backdrop-blur-sm text-sm sm:text-base"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!formData.fullName || !formData.email || !formData.phone}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-900 rounded-lg sm:rounded-xl hover:from-cyan-500 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-lg shadow-cyan-400/25 hover:shadow-xl hover:scale-105 text-sm sm:text-base"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-r from-cyan-400/20 to-cyan-500/20 rounded-lg mr-3">
                  <Calendar className="text-cyan-400" size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">
                  When should we call you?
                </h3>
              </div>
              <div className="space-y-3 mb-6">
                {['Morning (9 AM - 12 PM)', 'Afternoon (12 PM - 5 PM)', 'Evening (5 PM - 8 PM)'].map((time) => (
                  <button
                    key={time}
                    onClick={() => handleInputChange('preferredTime', time)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm ${
                      formData.preferredTime === time
                        ? 'border-cyan-400 bg-gradient-to-r from-cyan-400/20 to-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-400/25'
                        : 'border-slate-600 bg-slate-700/50 text-gray-300 hover:border-cyan-400/50 hover:bg-cyan-400/10'
                    }`}
                  >
                    <span className="text-sm font-semibold">
                      {time}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 border-2 border-slate-600 text-gray-300 bg-slate-700/50 rounded-xl hover:bg-slate-600 hover:border-slate-500 transition-all duration-300 font-semibold backdrop-blur-sm"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.preferredTime || isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-slate-900 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 inline-flex items-center justify-center font-bold shadow-lg shadow-cyan-400/25 hover:shadow-xl hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900 mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Schedule FREE Call
                      <ArrowRight className="ml-2" size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="flex items-center mb-4">
                <div className="p-1.5 bg-gradient-to-r from-green-400/20 to-green-500/20 rounded-lg mr-2">
                  <CheckCircle className="text-green-400" size={20} />
                </div>
                <h3 className="text-base font-bold text-white">
                  Thank you! How would you like to proceed?
                </h3>
              </div>

              <p className="text-gray-300 mb-4 text-center text-sm">
                Your information has been saved. Choose your preferred next step:
              </p>

              <div className="space-y-2 sm:space-y-3">
                <button
                  onClick={handleWhatsAppChoice}
                  className="w-full p-3 sm:p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg shadow-green-500/25 group"
                >
                  <div className="flex items-center justify-center">
                    <MessageCircle className="mr-2 sm:mr-3 group-hover:scale-110 transition-transform" size={18} />
                    <div className="text-left">
                      <div className="font-bold text-sm sm:text-base">Send WhatsApp Message</div>
                      <div className="text-green-100 text-xs hidden sm:block">Get instant response from our counselors</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={handleCalendlyChoice}
                  className="w-full p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg shadow-blue-500/25 group"
                >
                  <div className="flex items-center justify-center">
                    <Calendar className="mr-2 sm:mr-3 group-hover:scale-110 transition-transform" size={18} />
                    <div className="text-left">
                      <div className="font-bold text-sm sm:text-base">Schedule Video Call</div>
                      <div className="text-blue-100 text-xs hidden sm:block">Book a convenient time for detailed consultation</div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="text-gray-400 hover:text-white transition-colors text-xs"
                >
                  I'll decide later
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
