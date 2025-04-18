
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const { themeMode } = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showFinalState, setShowFinalState] = useState(false);
  const taglineWords = ["Your", "journey", "to", "calm", "begins", "here"];
  
  // Background style based on theme
  const getBackgroundStyle = () => {
    if (themeMode === 'calm') {
      return 'from-wellness-lightBlue/20 via-wellness-sage/10 to-wellness-lavender/30';
    } else if (themeMode === 'sunset') {
      return 'from-[#FFCCBC]/20 via-wellness-sand/10 to-[#FFB74D]/20';
    } else {
      return 'from-wellness-sage/20 via-[#C8E6C9]/10 to-wellness-lightBlue/20';
    }
  };
  
  useEffect(() => {
    if (currentWordIndex < taglineWords.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Animation complete - show final state
      const timer = setTimeout(() => {
        setShowFinalState(true);
      }, 1000);
      
      // Complete after zoom animation
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 2000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(completeTimer);
      };
    }
  }, [currentWordIndex, onComplete]);

  return (
    <motion.div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br ${getBackgroundStyle()} backdrop-blur-md`}
      initial={{ opacity: 0 }}
      animate={showFinalState ? { opacity: 1, scale: 1.5 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: showFinalState ? 1.5 : 0.8 }}
    >
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-light mb-6 tracking-wider"
          style={{ color: themeMode === 'calm' ? '#4DB6AC' : 
                         themeMode === 'sunset' ? '#FF7043' : '#66BB6A' }}
          animate={{ 
            textShadow: ["0 0 5px rgba(77, 182, 172, 0)", "0 0 15px rgba(77, 182, 172, 0.5)", "0 0 5px rgba(77, 182, 172, 0)"] 
          }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          <span className="font-medium">Serenity</span>Flow
        </motion.h1>
        
        {/* Shimmer effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ width: "50%" }}
        />
      </motion.div>
      
      <div className="flex flex-wrap justify-center mt-4 h-8">
        {taglineWords.map((word, index) => (
          <AnimatePresence key={index} mode="wait">
            {index <= currentWordIndex && (
              <motion.span
                className="mx-1 text-lg text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3,
                  delay: 0.1
                }}
              >
                {word}
              </motion.span>
            )}
          </AnimatePresence>
        ))}
      </div>
      
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center"
          style={{ color: themeMode === 'calm' ? 'rgba(77, 182, 172, 0.8)' : 
                         themeMode === 'sunset' ? 'rgba(255, 112, 67, 0.8)' : 'rgba(102, 187, 106, 0.8)' }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Sparkles className="h-5 w-5 mr-2" />
          <span className="text-sm">Touch anywhere to begin</span>
        </motion.div>
      </motion.div>
      
      {/* Animated floating elements specific to each theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              width: `${Math.random() * 80 + 50}px`,
              height: `${Math.random() * 80 + 50}px`,
              backgroundColor: themeMode === 'calm' ? 'rgba(77, 182, 172, 0.3)' : 
                              themeMode === 'sunset' ? 'rgba(255, 112, 67, 0.3)' : 'rgba(102, 187, 106, 0.3)',
              scale: 0.8,
            }}
            animate={{ 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse",
              duration: Math.random() * 10 + 10,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            style={{
              filter: 'blur(8px)'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default IntroAnimation;
