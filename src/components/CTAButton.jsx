import React from 'react';
import { ArrowRight, Phone, Mail, MessageCircle, Calendar } from 'lucide-react';
import { openCalendlyScheduling } from '../services/calendlyService';

const CTAButton = ({
  variant = 'primary',
  size = 'medium',
  text = 'Start Your Journey',
  showModal = true,
  className = '',
  icon = 'arrow',
  onModalOpen = null,
  directCalendly = false,
  actionType = 'modal' // 'modal', 'calendly', 'apply'
}) => {

  const getIcon = () => {
    switch (icon) {
      case 'phone':
        return <Phone size={size === 'large' ? 24 : 20} />;
      case 'mail':
        return <Mail size={size === 'large' ? 24 : 20} />;
      case 'message':
        return <MessageCircle size={size === 'large' ? 24 : 20} />;
      case 'calendar':
        return <Calendar size={size === 'large' ? 24 : 20} />;
      default:
        return <ArrowRight size={size === 'large' ? 24 : 20} />;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'btn btn-primary';
      case 'secondary':
        return 'btn btn-secondary';
      case 'outline':
        return 'btn btn-secondary';
      case 'outline-dark':
        return 'btn btn-secondary';
      case 'gradient':
        return 'btn btn-electric';
      case 'success':
        return 'btn bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25';
      case 'warning':
        return 'btn bg-cyan-400 text-slate-900 border hover:bg-cyan-300 border-cyan-500 shadow-[0_0_15px_rgba(250,204,21,0.5)]';
      case 'primary':
        return 'btn bg-blue-600 text-white hover:bg-blue-500 border border-blue-600 shadow-md';
      case 'light':
        return 'btn bg-white text-slate-900 border-2 border-white hover:bg-gray-50 hover:border-gray-50 shadow-xl hover:shadow-2xl hover:shadow-white/25';
      case 'electric':
        return 'btn btn-electric';
      case 'nebula':
        return 'btn btn-nebula';
      case 'plasma':
        return 'btn btn-plasma';
      case 'space':
        return 'btn btn-space';
      default:
        return 'btn btn-primary';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm';
      case 'large':
        return 'px-8 py-4 text-lg';
      case 'xl':
        return 'px-10 py-5 text-xl';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const handleClick = async () => {
    console.log('CTA Button clicked:', { text, variant, showModal, directCalendly });

    // If directCalendly is true, go straight to Calendly with direct URL
    if (directCalendly) {
      try {
        console.log('📅 Opening Calendly scheduling directly...');
        // Use direct Calendly URL - more reliable than API
        window.open('https://calendly.com/axelisoverseas/counsellingsession', '_blank', 'noopener,noreferrer');
        console.log('✅ Calendly scheduling opened successfully');
      } catch (calendlyError) {
        console.error('❌ Failed to open Calendly scheduling:', calendlyError);
        // Fallback to contact page
        window.location.href = '/contact';
      }
      return;
    }

    if (actionType === 'apply') {
      console.log('🚀 Redirecting to Student Plans for auto-checkout...');
      window.location.href = '/products?redirect=zcf';
      return;
    }

    if (showModal || actionType === 'modal') {
      if (onModalOpen) {
        onModalOpen('cta');
        console.log('Lead modal should open');
      } else {
        // Fallback: redirect to contact page if no modal handler is provided
        window.location.href = '/contact';
      }
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`
          group relative inline-flex items-center justify-center font-bold rounded-xl overflow-hidden
          transition-all duration-500 transform hover:scale-110 hover:-translate-y-2
          focus:outline-none focus:ring-4 focus:ring-blue-300/50
          active:scale-95 active:translate-y-0
          ${getVariantClasses()} ${getSizeClasses()} ${className}
        `}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        <span className="relative z-10">{text}</span>
        <span className="relative z-10 ml-2 group-hover:translate-x-1 transition-transform duration-300">{getIcon()}</span>
      </button>
    </>
  );
};

// Predefined CTA variants for common use cases
export const StartJourneyCTA = (props) => (
  <CTAButton
    text="Apply Now - Start Journey"
    variant="warning"
    size="large"
    icon="arrow"
    actionType="apply"
    {...props}
  />
);

export const BookConsultationCTA = (props) => (
  <CTAButton
    text="Enroll in Student Plan"
    variant="secondary"
    size="large"
    icon="calendar"
    actionType="apply"
    {...props}
  />
);

export const ScheduleCallCTA = (props) => (
  <CTAButton
    text="Schedule a Call"
    variant="primary"
    size="large"
    icon="calendar"
    showModal={false}
    directCalendly={true}
    {...props}
  />
);

export const BookDirectCTA = (props) => (
  <CTAButton
    text="Book Consultation Now"
    variant="warning"
    size="large"
    icon="calendar"
    showModal={false}
    directCalendly={true}
    {...props}
  />
);

export const CallNowCTA = (props) => (
  <CTAButton
    text="Call Now"
    variant="success"
    size="medium"
    icon="phone"
    showModal={false}
    {...props}
  />
);

export const GetQuoteCTA = (props) => (
  <CTAButton
    text="Get Free Quote"
    variant="outline"
    size="medium"
    icon="message"
    showModal={true}
    directCalendly={false}
    {...props}
  />
);

export default CTAButton;
