
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Check, Star, MapPin } from 'lucide-react';

interface GameProgressTrackerProps {
  steps: string[];
  currentStep: number;
  isConfirmed: boolean;
}

const GameProgressTracker = ({ steps, currentStep, isConfirmed }: GameProgressTrackerProps) => {
  const { themeColors } = useTheme();

  return (
    <motion.div 
      className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-3xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="relative px-4">
        {/* Progress path line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full transform -translate-y-1/2 overflow-hidden">
          <motion.div 
            className="h-full rounded-full"
            style={{ background: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})` }}
            initial={{ width: '0%' }}
            animate={{ width: `${isConfirmed ? 100 : (currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        
        {/* Steps */}
        <div className="flex justify-between relative">
          {steps.map((step, index) => {
            const isActive = index <= currentStep;
            const isCompleted = index < currentStep || isConfirmed;
            
            return (
              <div key={index} className="flex flex-col items-center">
                <motion.div 
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 
                    ${isActive ? 'border-' + themeColors.primary : 'border-gray-300'}`}
                  style={{ 
                    background: isActive 
                      ? `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})` 
                      : 'white' 
                  }}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ 
                    scale: isActive ? 1 : 0.8, 
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <Check className="h-6 w-6 text-white" />
                    </motion.div>
                  ) : index === currentStep ? (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2
                      }}
                    >
                      <Star className="h-6 w-6 text-white" />
                    </motion.div>
                  ) : (
                    <MapPin className="h-5 w-5 text-gray-400" />
                  )}
                  
                  {/* Sparkles around active step */}
                  {index === currentStep && !isCompleted && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          initial={{ 
                            x: 0, 
                            y: 0,
                            opacity: 0 
                          }}
                          animate={{ 
                            x: [0, (Math.random() - 0.5) * 30],
                            y: [0, (Math.random() - 0.5) * 30],
                            opacity: [0, 1, 0] 
                          }}
                          transition={{ 
                            repeat: Infinity,
                            duration: 1.5 + Math.random(),
                            delay: Math.random() * 2,
                            repeatDelay: Math.random()
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
                
                <motion.span 
                  className={`mt-2 text-xs font-medium sm:text-sm whitespace-nowrap px-2 ${
                    isActive ? 'text-gray-800' : 'text-gray-400'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {step}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default GameProgressTracker;
