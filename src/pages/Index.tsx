import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import ServiceSelection from '@/components/ServiceSelection';
import DateSelection from '@/components/DateSelection';
import TimeSelection from '@/components/TimeSelection';
import SpecialistSelection from '@/components/SpecialistSelection';
import BookingSummary from '@/components/BookingSummary';
import ConfirmationView from '@/components/ConfirmationView';
import GameProgressTracker from '@/components/GameProgressTracker';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import QuoteSection from '@/components/QuoteSection';
import AnimatedFooter from '@/components/AnimatedFooter';
import FloatingAssistant from '@/components/FloatingAssistant';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import AnimatedGuide from '@/components/AnimatedGuide';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

const pageVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.8,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { type: 'spring', stiffness: 500, damping: 30 }
    }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.8,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 }
    }
  })
};

const Index = () => {
  const { toast } = useToast();
  const { themeColors } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [direction, setDirection] = useState(0);

  // Shorter step names that won't overlap
  const steps = ['Path', 'Date', 'Guide', 'Review'];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setDirection(1);
    setCurrentStep(1);
    
    // Show playful animation toast based on service
    let toastMessage = "";
    let toastTitle = "";
    
    switch(serviceId) {
      case 'spa':
        toastTitle = "✨ Spa Magic Selected";
        toastMessage = "You've chosen a relaxing spa journey. Bubbles of tranquility await!";
        break;
      case 'yoga':
        toastTitle = "🧘 Yoga Path Selected";
        toastMessage = "The yoga journey will bring balance to your energy. Breathe deeply!";
        break;
      case 'therapy':
        toastTitle = "💫 Therapy Quest Selected";
        toastMessage = "You've chosen the path of inner healing. Your guide awaits!";
        break;
      case 'meditation':
        toastTitle = "🌟 Meditation Circle Selected";
        toastMessage = "The meditation journey will calm your mind. Peace surrounds you!";
        break;
    }
    
    toast({
      title: toastTitle,
      description: toastMessage,
      duration: 3000,
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setDirection(1);
      setCurrentStep(2);
      toast({
        title: "🗓️ Date Chosen!",
        description: "You've selected a magical day for your journey.",
        duration: 2000,
      });
    }
  };

  const handleSpecialistSelect = (specialistId: string) => {
    setSelectedSpecialist(specialistId);
    setDirection(1);
    setCurrentStep(3);
    toast({
      title: "👤 Guide Selected!",
      description: "Your personal wellness guide is ready for your journey.",
      duration: 2000,
    });
  };

  const handleConfirmBooking = () => {
    // In a real app, this would call an API to create the booking
    setIsConfirmed(true);
    
    // Create celebration effect with toast
    toast({
      title: "🎉 Journey Confirmed!",
      description: "Your wellness quest has been scheduled. Get ready for transformation!",
      duration: 4000,
    });
  };

  const handleEdit = () => {
    setDirection(-1);
    setCurrentStep(0);
  };

  const handleBookAnother = () => {
    setSelectedService(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setSelectedSpecialist(null);
    setIsConfirmed(false);
    setDirection(-1);
    setCurrentStep(0);
  };

  const renderStepContent = () => {
    if (isConfirmed) {
      return (
        <ConfirmationView
          service={selectedService}
          date={selectedDate}
          time={selectedTime}
          onBookAnother={handleBookAnother}
        />
      );
    }

    switch (currentStep) {
      case 0:
        return (
          <ServiceSelection
            selectedService={selectedService}
            onServiceSelect={handleServiceSelect}
          />
        );
      case 1:
        return (
          <DateSelection
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        );
      case 2:
        return (
          <SpecialistSelection
            selectedSpecialist={selectedSpecialist}
            onSpecialistSelect={handleSpecialistSelect}
          />
        );
      case 3:
        return (
          <BookingSummary
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
            specialist={selectedSpecialist}
            onConfirm={handleConfirmBooking}
            onEdit={handleEdit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeColors.background}`}>
      <Header />
      <ThemeSwitcher />
      
      {/* Game-style progress tracker */}
      {!isConfirmed && (
        <GameProgressTracker 
          currentStep={currentStep} 
          steps={steps}
          isConfirmed={isConfirmed}
        />
      )}
      
      {/* Animated avatar guide */}
      <AnimatedGuide 
        currentStep={currentStep}
        selectedService={selectedService}
        isConfirmed={isConfirmed}
      />
      
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="py-16 relative overflow-hidden"
        >
          {/* Playful sparkle effects on page transition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-0"
          >
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-white"
                initial={{ 
                  x: '50%',
                  y: '50%',
                  opacity: 0
                }}
                animate={{ 
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: [0, 0.8, 0]
                }}
                transition={{ 
                  duration: 0.8 + Math.random(),
                  delay: Math.random() * 0.3,
                  ease: "easeOut"
                }}
                style={{
                  boxShadow: `0 0 10px rgba(255, 255, 255, 0.8)`
                }}
              />
            ))}
          </motion.div>
          
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>
      
      {/* Show testimonials and quotes only on confirmed booking or initial service selection */}
      {(isConfirmed || currentStep === 0) && (
        <>
          <TestimonialsSlider />
          <QuoteSection />
        </>
      )}
      
      <FloatingAssistant />
      
      <AnimatedFooter />
    </div>
  );
};

export default Index;
