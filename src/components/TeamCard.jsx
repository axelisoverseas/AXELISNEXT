import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { Linkedin, User } from 'lucide-react';

const TeamCard = ({ member, className = "", style = {} }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      perspective={1000}
      scale={1.02}
      transitionSpeed={1000}
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="#ffffff"
      glarePosition="bottom"
      glareBorderRadius="16px"
      className="h-full block"
    >
      <div
        className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-blue-100 group hover:border-cyan-400/50 h-80 flex flex-col ${className}`}
        style={style}
      >
        <div className="text-center flex-1 flex flex-col">
          <div className="relative w-24 h-24 mx-auto mb-4 group-hover:scale-105 transition-transform duration-300 drop-shadow-md">
            {/* Try to load actual image first */}
            {member.image && !imageError && (
              <img
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                className={`w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-lg transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}

            {/* Loading state */}
            {imageLoading && member.image && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}

            {/* Fallback avatar with initials */}
            {(!member.image || imageError) && (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {getInitials(member.name)}
              </div>
            )}

            {/* Alumni Logo Badge */}
            {member.almaMater && member.almaMater.logo && (
              <div
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-blue-100 p-1 group-hover:scale-110 transition-transform duration-300"
                title={`Alumnus of ${member.almaMater.name}`}
              >
                <img
                  src={member.almaMater.logo}
                  alt={member.almaMater.name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
            {member.name}
          </h3>

          <p className="text-blue-600 font-semibold mb-3">
            {member.role}
          </p>

          {member.description && (
            <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">
              {member.description}
            </p>
          )}

          <div className="mt-auto">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl transform relative z-10"
                aria-label={`${member.name} LinkedIn Profile`}
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default TeamCard;
