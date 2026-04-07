import React from 'react';
import { Youtube, Instagram, Linkedin, Facebook, ExternalLink } from 'lucide-react';

const SocialMediaButtons = ({ 
  variant = 'default', 
  size = 'medium', 
  showLabels = true, 
  className = '',
  orientation = 'horizontal' 
}) => {
  const socialLinks = {
    facebook: {
      url: 'https://www.facebook.com/profile.php?id=61552129672233',
      icon: Facebook,
      label: 'Follow on Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    instagram: {
      url: 'https://www.instagram.com/axelis_overseas/',
      icon: Instagram,
      label: 'Follow on Instagram',
      color: 'bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600',
      textColor: 'text-white'
    },
    linkedin: {
      url: 'https://www.linkedin.com/company/axelis-overseas/',
      icon: Linkedin,
      label: 'Follow on LinkedIn',
      color: 'bg-blue-700 hover:bg-blue-800',
      textColor: 'text-white'
    },
    youtube: {
      url: 'https://www.youtube.com/@axelisoverseas',
      icon: Youtube,
      label: 'Subscribe on YouTube',
      color: 'bg-red-600 hover:bg-red-700',
      textColor: 'text-white'
    }
  };

  const sizeClasses = {
    small: {
      button: 'px-3 py-2 text-sm',
      icon: 16,
      gap: 'gap-2'
    },
    medium: {
      button: 'px-4 py-3 text-base',
      icon: 20,
      gap: 'gap-3'
    },
    large: {
      button: 'px-6 py-4 text-lg',
      icon: 24,
      gap: 'gap-4'
    }
  };

  const currentSize = sizeClasses[size];

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderButton = (key, social) => {
    const Icon = social.icon;
    
    if (variant === 'minimal') {
      return (
        <button
          key={key}
          onClick={() => handleSocialClick(social.url)}
          className={`
            p-3 rounded-full ${social.color} ${social.textColor}
            transition-all duration-300 transform hover:scale-110 shadow-lg
            flex items-center justify-center
          `}
          aria-label={social.label}
        >
          <Icon size={currentSize.icon} />
        </button>
      );
    }

    return (
      <button
        key={key}
        onClick={() => handleSocialClick(social.url)}
        className={`
          ${currentSize.button} ${social.color} ${social.textColor}
          rounded-xl font-semibold transition-all duration-300 transform hover:scale-105
          flex items-center ${currentSize.gap} shadow-lg hover:shadow-xl
          ${!showLabels ? 'justify-center' : ''}
        `}
        aria-label={social.label}
      >
        <Icon size={currentSize.icon} />
        {showLabels && <span>{social.label}</span>}
        {showLabels && <ExternalLink size={14} className="opacity-70" />}
      </button>
    );
  };

  const containerClasses = orientation === 'horizontal' 
    ? `flex flex-wrap ${currentSize.gap} justify-center items-center`
    : `flex flex-col ${currentSize.gap} items-center`;

  return (
    <div className={`${containerClasses} ${className}`}>
      {Object.entries(socialLinks).map(([key, social]) => 
        renderButton(key, social)
      )}
    </div>
  );
};

// Specialized components for different use cases
export const SocialMediaCTA = ({ className = '' }) => (
  <div className={`text-center ${className}`}>
    <h3 className="text-2xl font-bold text-slate-900 mb-4">
      Stay Connected with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Axelis Overseas</span>
    </h3>
    <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
      Follow us for the latest updates on study abroad opportunities, student success stories, and expert guidance
    </p>
    <SocialMediaButtons size="large" />
  </div>
);

export const SocialMediaFooter = ({ className = '' }) => (
  <div className={`${className}`}>
    <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
    <SocialMediaButtons 
      variant="minimal" 
      size="medium" 
      showLabels={false}
      className="justify-start"
    />
  </div>
);

export const SocialMediaInline = ({ className = '' }) => (
  <SocialMediaButtons 
    size="small" 
    showLabels={false}
    className={className}
  />
);

export default SocialMediaButtons;
