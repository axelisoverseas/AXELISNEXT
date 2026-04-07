'use client';

import React from 'react';

const RazorpayEmbed = ({ url, text = 'Pay Now' }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center px-8 py-4 font-bold text-white rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95"
        style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)' }}
      >
        {text}
      </a>
    </div>
  );
};

export default RazorpayEmbed;
