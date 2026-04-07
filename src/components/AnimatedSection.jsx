import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ children, className = '', animationType = 'fadeInUp', delay = 0, ...props }) => {
  // Define 3D variants for different entrance animations
  const variants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 60, rotateX: -15, scale: 0.95 },
      visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: 'spring', damping: 20, stiffness: 100, delay: delay / 1000 } }
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -60, rotateY: 15, scale: 0.95 },
      visible: { opacity: 1, x: 0, rotateY: 0, scale: 1, transition: { type: 'spring', damping: 20, stiffness: 100, delay: delay / 1000 } }
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 60, rotateY: -15, scale: 0.95 },
      visible: { opacity: 1, x: 0, rotateY: 0, scale: 1, transition: { type: 'spring', damping: 20, stiffness: 100, delay: delay / 1000 } }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8, rotateX: -20 },
      visible: { opacity: 1, scale: 1, rotateX: 0, transition: { type: 'spring', damping: 15, stiffness: 100, delay: delay / 1000 } }
    },
    tiltIn: {
      hidden: { opacity: 0, y: 100, rotateZ: -5 },
      visible: { opacity: 1, y: 0, rotateZ: 0, transition: { type: 'spring', damping: 20, stiffness: 100, delay: delay / 1000 } }
    }
  };

  const selectedVariant = variants[animationType] || variants.fadeInUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={selectedVariant}
      className={className}
      style={{ perspective: 1000 }} // Enable 3D perspective
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
