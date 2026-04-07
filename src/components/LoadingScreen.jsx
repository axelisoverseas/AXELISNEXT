import React from 'react';
import logoLight from '../assets/1yellow svg logoaxelis.svg';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <img
            src={logoLight}
            alt="Axelis Overseas"
            className="h-20 w-auto mx-auto animate-pulse"
            style={{
              filter: 'brightness(0) saturate(100%) invert(13%) sepia(15%) saturate(2000%) hue-rotate(200deg) brightness(95%) contrast(95%)',
              // Convert yellow logo to navy blue for better contrast on white background
            }}
          />
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        <p className="mt-4 text-neutral-600 text-sm">
          Loading your study abroad journey...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
