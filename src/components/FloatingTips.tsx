
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const mindfulnessTips = [
  "Take a deep breath... inhale... exhale...",
  "Pause and notice how you're feeling right now",
  "Relax your shoulders and unclench your jaw",
  "Stay present in this moment",
  "Remember to hydrate your body",
  "Your well-being matters",
  "Choose what feels right for you today"
];

const FloatingTips = () => {
  const [visible, setVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [idleTime, setIdleTime] = useState(0);
  
  // Show tip after 5 seconds of inactivity
  useEffect(() => {
    const idleTimer = setInterval(() => {
      setIdleTime(prev => prev + 1);
      if (idleTime >= 5 && !visible) {
        setVisible(true);
      }
    }, 1000);
    
    const resetIdleTime = () => {
      setIdleTime(0);
      if (visible) setVisible(false);
    };
    
    window.addEventListener('mousemove', resetIdleTime);
    window.addEventListener('click', resetIdleTime);
    window.addEventListener('keypress', resetIdleTime);
    
    return () => {
      clearInterval(idleTimer);
      window.removeEventListener('mousemove', resetIdleTime);
      window.removeEventListener('click', resetIdleTime);
      window.removeEventListener('keypress', resetIdleTime);
    };
  }, [idleTime, visible]);
  
  // Rotate through tips
  useEffect(() => {
    if (visible) {
      const tipRotation = setInterval(() => {
        setCurrentTip(prev => (prev + 1) % mindfulnessTips.length);
      }, 6000);
      
      return () => clearInterval(tipRotation);
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40 max-w-xs w-full"
        >
          <div className="bg-white/80 backdrop-blur-md px-5 py-4 rounded-2xl shadow-lg border border-wellness-teal/20 flex items-center">
            <motion.div 
              className="mr-3 text-wellness-teal"
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Sparkles size={20} />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.p 
                key={currentTip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-gray-700 italic"
              >
                {mindfulnessTips[currentTip]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingTips;
