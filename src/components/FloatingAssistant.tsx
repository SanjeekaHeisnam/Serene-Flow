
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircleHeart, X, ChevronRight, Sparkles } from 'lucide-react';

const tips = [
  "Take your time exploring our services - each is designed to nurture a different aspect of wellness.",
  "Our specialists are certified professionals with years of experience in their fields.",
  "Not sure what you need? Try our spa treatment for overall relaxation and rejuvenation.",
  "Booking multiple sessions? We offer package discounts for regular clients.",
  "Remember to arrive 15 minutes before your scheduled appointment time."
];

const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    if (!hasBeenSeen) {
      setHasBeenSeen(true);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="mb-4 p-4 bg-white backdrop-blur-sm bg-opacity-90 rounded-lg shadow-lg border border-wellness-teal/20 w-64"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-wellness-teal font-medium flex items-center">
                <Sparkles className="h-4 w-4 mr-1" />
                Wellness Guide
              </h3>
              <button onClick={toggleAssistant} className="text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={tipIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-gray-600 mb-3">
                  {tips[tipIndex]}
                </p>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Need help? I'm here for you!
              </p>
              <button 
                onClick={() => setTipIndex((prevIndex) => (prevIndex + 1) % tips.length)}
                className="text-wellness-teal hover:text-wellness-teal/80 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleAssistant}
        className="bg-gradient-to-r from-wellness-teal to-wellness-sage text-white p-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none relative overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={!hasBeenSeen && !isOpen ? { y: [0, -10, 0], scale: [1, 1.1, 1] } : {}}
        transition={!hasBeenSeen && !isOpen ? { 
          repeat: Infinity, 
          repeatType: "reverse", 
          duration: 2,
          repeatDelay: 3
        } : {}}
      >
        <MessageCircleHeart size={24} />
        
        {/* Shimmering effect */}
        <motion.div 
          className="absolute inset-0 bg-white opacity-20"
          animate={{ 
            x: ["-100%", "100%"],
            skew: ["-20deg", "-20deg"]
          }}
          transition={{ 
            repeat: Infinity, 
            repeatDelay: 3,
            duration: 1,
            ease: "easeInOut" 
          }}
          style={{ width: "50%" }}
        />
      </motion.button>
    </div>
  );
};

export default FloatingAssistant;
