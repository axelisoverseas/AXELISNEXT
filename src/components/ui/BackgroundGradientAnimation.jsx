'use client';

import React from 'react';

export const BackgroundGradientAnimation = ({
  className = '',
  containerClassName = '',
  blendingValue = 'hard-light',
  colors = {
    first: '18, 113, 255',
    second: '34, 211, 238',
    third: '37, 99, 235',
    fourth: '10, 17, 40',
    fifth: '59, 130, 246',
  },
  size = '80%',
}) => {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${containerClassName}`}
    >
      <svg className="hidden">
        <defs>
          <filter id="axelis-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 20 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className={`absolute inset-0 ${className}`}
        style={{
          filter: 'url(#axelis-goo) blur(40px)',
        }}
      >
        <div
          className="absolute animate-bg-first rounded-full opacity-60"
          style={{
            background: `radial-gradient(circle at center, rgba(${colors.first}, 0.8) 0%, transparent 70%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            top: `calc(50% - ${size} / 2)`,
            left: `calc(50% - ${size} / 2)`,
          }}
        />
        <div
          className="absolute animate-bg-second rounded-full opacity-50"
          style={{
            background: `radial-gradient(circle at center, rgba(${colors.second}, 0.8) 0%, transparent 70%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            top: `calc(50% - ${size} / 2 - 20%)`,
            left: `calc(50% - ${size} / 2 + 20%)`,
          }}
        />
        <div
          className="absolute animate-bg-third rounded-full opacity-55"
          style={{
            background: `radial-gradient(circle at center, rgba(${colors.third}, 0.8) 0%, transparent 70%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            top: `calc(50% - ${size} / 2 + 20%)`,
            left: `calc(50% - ${size} / 2 - 20%)`,
          }}
        />
        <div
          className="absolute animate-bg-fourth rounded-full opacity-40"
          style={{
            background: `radial-gradient(circle at center, rgba(${colors.fourth}, 0.8) 0%, transparent 70%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            top: `calc(50% - ${size} / 2 + 10%)`,
            left: `calc(50% - ${size} / 2 + 10%)`,
          }}
        />
        <div
          className="absolute animate-bg-fifth rounded-full opacity-50"
          style={{
            background: `radial-gradient(circle at center, rgba(${colors.fifth}, 0.8) 0%, transparent 70%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            top: `calc(50% - ${size} / 2 - 10%)`,
            left: `calc(50% - ${size} / 2 - 10%)`,
          }}
        />
      </div>
    </div>
  );
};

export default BackgroundGradientAnimation;
