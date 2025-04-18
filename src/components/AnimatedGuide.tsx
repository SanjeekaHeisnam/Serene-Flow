
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Stars, HelpCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface AnimatedGuideProps {
  currentStep: number;
  selectedService: string | null;
  isConfirmed: boolean;
}

const AnimatedGuide = ({ currentStep, selectedService, isConfirmed }: AnimatedGuideProps) => {
  const { themeMode, themeColors } = useTheme();
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  
  // Generate guide messages based on current step and selections
  useEffect(() => {
    if (isConfirmed) {
      setMessage("Your journey awaits! I'll be your guide to wellness.");
      return;
    }
    
    switch (currentStep) {
      case 0:
        setMessage("Choose your path to wellness...");
        break;
      case 1:
        if (selectedService === 'spa') {
          setMessage("Spa treatments help your body relax and rejuvenate!");
        } else if (selectedService === 'yoga') {
          setMessage("Yoga brings balance to both body and mind.");
        } else if (selectedService === 'therapy') {
          setMessage("A journey of healing begins with a single step.");
        } else if (selectedService === 'meditation') {
          setMessage("Meditation brings clarity and inner peace.");
        }
        break;
      case 2:
        setMessage("Pick a guide for your journey!");
        break;
      case 3:
        setMessage("Almost there! Review your magical journey.");
        break;
      default:
        setMessage("I'm here to guide you!");
    }
  }, [currentStep, selectedService, isConfirmed]);
  
  // Random guide movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setIsMoving(true);
      
      // Calculate new position within constraints
      const newX = Math.random() * 100 - 50; // -50 to 50
      const newY = Math.random() * 60 - 30;  // -30 to 30
      
      setPosition({ x: newX, y: newY });
      
      // Reset moving after animation completes
      setTimeout(() => setIsMoving(false), 3000);
    }, 5000);
    
    return () => clearInterval(moveInterval);
  }, []);
  
  // Guide appearance based on theme
  const getGuideColor = () => {
    if (themeMode === 'calm') return 'from-wellness-teal to-wellness-lightBlue';
    if (themeMode === 'sunset') return 'from-[#FF7043] to-[#FFCCBC]';
    return 'from-wellness-sage to-[#C8E6C9]';
  };
  
  const getGuideIcon = () => {
    if (selectedService === 'meditation' || selectedService === 'yoga') {
      return <Stars className="h-5 w-5 text-white" />;
    } else if (selectedService === 'spa') {
      return <Heart className="h-5 w-5 text-white" />;
    } else if (selectedService === 'therapy') {
      return <HelpCircle className="h-5 w-5 text-white" />;
    }
    return <Sparkles className="h-5 w-5 text-white" />;
  };

  return (
    <motion.div 
      className="fixed right-[10%] bottom-[15%] z-40 flex items-center"
      initial={{ x: 0, y: 0 }}
      animate={{ 
        x: position.x,
        y: position.y,
        transition: { 
          type: "spring",
          stiffness: 50,
          damping: 10,
          duration: 3
        }
      }}
    >
      {/* The guide bubble */}
      <motion.div
        className={`rounded-full w-14 h-14 flex items-center justify-center 
          bg-gradient-to-r ${getGuideColor()} shadow-lg relative overflow-hidden`}
        animate={{ 
          scale: isMoving ? [1, 1.1, 0.9, 1] : [1, 1.1, 1],
          rotate: isMoving ? [-5, 5, -5, 0] : 0,
        }}
        transition={{ 
          scale: { 
            repeat: Infinity, 
            duration: isMoving ? 3 : 2,
            ease: "easeInOut" 
          },
          rotate: { 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut" 
          }
        }}
      >
        {getGuideIcon()}
        
        {/* Ambient glow */}
        <motion.div 
          className="absolute inset-0 opacity-70 rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${themeColors.primary}50 0%, transparent 70%)`
          }}
          animate={{ 
            scale: [1, 1.2, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut" 
          }}
        />
        
        {/* Sparkle effects */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              top: `${50 + (Math.random() - 0.5) * 50}%`, 
              left: `${50 + (Math.random() - 0.5) * 50}%`,
              opacity: 0 
            }}
            animate={{ 
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1 + Math.random(),
              delay: Math.random() * 2
            }}
          />
        ))}
      </motion.div>
      
      {/* Message bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            className="absolute right-16 w-48 p-3 bg-white rounded-lg rounded-br-none shadow-md border border-gray-100"
          >
            <p className="text-xs text-gray-700">{message}</p>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-white transform translate-x-1/2 rotate-45 border-r border-b border-gray-100" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimatedGuide;
