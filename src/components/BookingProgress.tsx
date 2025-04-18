
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

interface BookingProgressProps {
  currentStep: number;
  steps: string[];
}

const BookingProgress = ({ currentStep, steps }: BookingProgressProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-center">
        <div className="hidden sm:flex items-center w-full max-w-2xl justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              {/* Step circle with number or check */}
              <motion.div 
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full z-10",
                  "transition-colors duration-500 shadow-sm",
                  index < currentStep 
                    ? "bg-gradient-to-r from-wellness-teal to-wellness-sage text-white" 
                    : index === currentStep 
                      ? "bg-white border-2 border-wellness-teal text-wellness-teal"
                      : "bg-white border border-gray-200 text-gray-400"
                )}
                initial={false}
                animate={{ 
                  scale: index === currentStep ? 1.1 : 1,
                  boxShadow: index <= currentStep ? '0 4px 12px rgba(77, 182, 172, 0.15)' : 'none'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : index === currentStep ? (
                  <motion.div
                    initial={false}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 2,
                    }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
                
                {/* Step label below the circle */}
                <motion.span 
                  className={cn(
                    "absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium",
                    index <= currentStep ? "text-wellness-teal" : "text-gray-400"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 * index }}
                >
                  {step}
                </motion.span>
              </motion.div>
              
              {/* Connecting line between circles */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 relative h-px">
                  <motion.div 
                    className={cn(
                      "absolute inset-0 h-0.5 rounded transition-colors duration-500",
                      index < currentStep 
                        ? "bg-gradient-to-r from-wellness-teal to-wellness-sage" 
                        : "bg-gray-200"
                    )}
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: index < currentStep ? 1 : 0,
                      transition: { duration: 0.5, delay: 0.2 }
                    }}
                    style={{ transformOrigin: 'left' }}
                  />
                  <div className="absolute inset-0 h-0.5 rounded bg-gray-200" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Mobile version - just show current step name with more style */}
        <div className="sm:hidden text-center">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Step {currentStep + 1} of {steps.length}</p>
          <p className="font-medium text-lg text-wellness-teal">{steps[currentStep]}</p>
          <div className="mt-2 flex justify-center items-center space-x-1">
            {steps.map((_, index) => (
              <motion.div 
                key={index}
                className={cn(
                  "h-1.5 rounded-full",
                  index === currentStep 
                    ? "w-6 bg-wellness-teal" 
                    : index < currentStep 
                      ? "w-4 bg-wellness-teal/70" 
                      : "w-4 bg-gray-200"
                )}
                initial={false}
                animate={{ scale: index === currentStep ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingProgress;
