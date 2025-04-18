
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const FloatingElement = ({ delay, duration, size, rotationSpeed, color }: any) => {
  return (
    <motion.div
      className="absolute rounded-full opacity-20"
      initial={{ 
        x: `${Math.random() * 100}%`, 
        y: `${Math.random() * 100}%`,
        rotate: 0
      }}
      animate={{ 
        y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
        x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
        rotate: [0, 360]
      }}
      transition={{ 
        repeat: Infinity, 
        repeatType: "reverse",
        duration: duration,
        delay: delay,
        ease: "easeInOut",
        rotate: {
          duration: rotationSpeed,
          repeat: Infinity,
          ease: "linear"
        }
      }}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        filter: 'blur(8px)'
      }}
    />
  );
};

const AnimatedBackground = () => {
  const { themeMode } = useTheme();
  
  // Generate color based on theme
  const getColor = () => {
    switch(themeMode) {
      case 'calm':
        return 'rgba(77, 182, 172, 0.3)';
      case 'sunset':
        return 'rgba(255, 112, 67, 0.3)';
      case 'forest':
        return 'rgba(102, 187, 106, 0.3)';
      default:
        return 'rgba(77, 182, 172, 0.3)';
    }
  };

  // Generate 15 floating elements with random properties
  const elements = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: Math.random() * 20 + 20,
    size: `${Math.random() * 120 + 30}px`,
    rotationSpeed: Math.random() * 50 + 20,
    color: getColor()
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((element) => (
        <FloatingElement key={element.id} {...element} />
      ))}
    </div>
  );
};

export default AnimatedBackground;
