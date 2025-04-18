
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

// Floating elements for the landscape
const FloatingElement = ({ 
  size, 
  initialPosition, 
  duration, 
  delay, 
  type,
  themeMode 
}: {
  size: number;
  initialPosition: { x: string; y: string };
  duration: number;
  delay: number;
  type: 'petal' | 'bubble' | 'leaf' | 'sparkle';
  themeMode: string;
}) => {
  // Theme-specific colors
  const getColor = () => {
    if (type === 'bubble' && themeMode === 'calm') return 'rgba(179, 229, 252, 0.5)';
    if (type === 'bubble' && themeMode === 'sunset') return 'rgba(255, 204, 188, 0.5)';
    if (type === 'bubble' && themeMode === 'forest') return 'rgba(200, 230, 201, 0.5)';
    
    if (type === 'petal' && themeMode === 'calm') return 'rgba(226, 226, 250, 0.6)';
    if (type === 'petal' && themeMode === 'sunset') return 'rgba(255, 183, 77, 0.4)';
    if (type === 'petal' && themeMode === 'forest') return 'rgba(129, 199, 132, 0.4)';
    
    if (type === 'leaf') return 'rgba(168, 208, 182, 0.5)';
    
    return 'rgba(255, 255, 255, 0.6)'; // Default for sparkles
  };

  const getShape = () => {
    if (type === 'bubble') return 'rounded-full';
    if (type === 'petal') return 'rounded-full';
    if (type === 'leaf') return 'rounded-tl-full rounded-tr-none rounded-bl-none rounded-br-full';
    return 'rounded-full'; // Default for sparkles
  };

  return (
    <motion.div
      className={`absolute ${getShape()} backdrop-blur-sm`}
      style={{
        width: `${size}px`,
        height: type === 'leaf' ? `${size * 1.5}px` : `${size}px`,
        background: getColor(),
        filter: type === 'sparkle' ? 'blur(1px)' : 'none',
        boxShadow: type === 'sparkle' ? '0 0 5px rgba(255, 255, 255, 0.8)' : 'none',
      }}
      initial={{ 
        x: initialPosition.x,
        y: initialPosition.y,
        rotate: type === 'leaf' ? -45 : 0,
        scale: 0.8,
        opacity: 0.4
      }}
      animate={{ 
        y: [`${initialPosition.y}`, `${parseInt(initialPosition.y) - 200}px`],
        x: [
          `${initialPosition.x}`, 
          `${parseInt(initialPosition.x) + Math.sin(delay) * 50}px`,
          `${parseInt(initialPosition.x) - Math.sin(delay) * 50}px`,
          `${initialPosition.x}`
        ],
        rotate: type === 'leaf' ? [-45, 0, -90, -45] : [0, 180, 360, 0],
        scale: [0.8, 1, 0.9, 0.8],
        opacity: [0.4, 0.7, 0.5, 0.3]
      }}
      transition={{ 
        repeat: Infinity,
        duration: duration,
        delay: delay,
        ease: "easeInOut",
        times: [0, 0.33, 0.66, 1]
      }}
    />
  );
};

const LandscapeBackground = () => {
  const { themeMode } = useTheme();
  const [elements, setElements] = useState<React.ReactNode[]>([]);
  
  // Generate landscape elements based on theme
  useEffect(() => {
    const generateElements = () => {
      const items: React.ReactNode[] = [];
      const elementCount = 25; // Total number of floating elements
      
      // Create each element type based on theme
      for (let i = 0; i < elementCount; i++) {
        const size = Math.random() * 30 + 10;
        const xPos = `${Math.random() * 100}%`;
        const yPos = `${Math.random() * 100 + 100}%`; // Start below the viewport
        const duration = Math.random() * 20 + 30;
        const delay = Math.random() * 10;
        
        let type: 'petal' | 'bubble' | 'leaf' | 'sparkle';
        
        // Theme-specific element distribution
        if (themeMode === 'calm') {
          type = Math.random() > 0.6 ? 'bubble' : 'sparkle';
        } else if (themeMode === 'sunset') {
          type = Math.random() > 0.6 ? 'petal' : 'sparkle';
        } else {
          type = Math.random() > 0.6 ? 'leaf' : 'sparkle';
        }
        
        items.push(
          <FloatingElement
            key={i}
            size={size}
            initialPosition={{ x: xPos, y: yPos }}
            duration={duration}
            delay={delay}
            type={type}
            themeMode={themeMode}
          />
        );
      }
      
      setElements(items);
    };
    
    generateElements();
  }, [themeMode]);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements}
      
      {/* Landscape base elements */}
      <div className={`absolute bottom-0 left-0 right-0 h-[30vh] ${
        themeMode === 'calm' ? 'bg-gradient-to-t from-wellness-teal/5 to-transparent' :
        themeMode === 'sunset' ? 'bg-gradient-to-t from-[#FFCCBC]/10 to-transparent' :
        'bg-gradient-to-t from-wellness-sage/10 to-transparent'
      }`} />
    </div>
  );
};

export default LandscapeBackground;
