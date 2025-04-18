
import React from 'react';
import { Flower, Leaf, BookOpen, HeartHandshake } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { motion } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits?: string[];
  color: string;
}

interface ServiceSelectionProps {
  selectedService: string | null;
  onServiceSelect: (serviceId: string) => void;
}

const services: Service[] = [
  {
    id: 'spa',
    title: 'Spa Treatment',
    description: 'Relax with our therapeutic spa treatments designed to calm your mind and body.',
    icon: <Flower className="h-6 w-6" />,
    benefits: ['Stress reduction', 'Improved circulation', 'Skin rejuvenation'],
    color: 'from-wellness-teal/20 to-wellness-lightBlue/20',
  },
  {
    id: 'yoga',
    title: 'Yoga Session',
    description: 'Stretch, strengthen, and find your inner balance with our yoga classes.',
    icon: <Leaf className="h-6 w-6" />,
    benefits: ['Increased flexibility', 'Mental clarity', 'Reduced anxiety'],
    color: 'from-wellness-sage/20 to-wellness-teal/10',
  },
  {
    id: 'therapy',
    title: 'Therapy',
    description: 'Professional mental wellness therapy sessions to support your emotional health.',
    icon: <BookOpen className="h-6 w-6" />,
    benefits: ['Personal growth', 'Emotional support', 'Better coping skills'],
    color: 'from-wellness-lavender/20 to-wellness-lightBlue/10',
  },
  {
    id: 'meditation',
    title: 'Meditation',
    description: 'Guided meditation sessions to help reduce stress and increase mindfulness.',
    icon: <HeartHandshake className="h-6 w-6" />,
    benefits: ['Improved focus', 'Emotional balance', 'Deeper relaxation'],
    color: 'from-wellness-sand/30 to-wellness-sage/20',
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
};

// New ambient particles component
const AmbientParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10 opacity-30">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-wellness-teal/30"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{ 
            y: [null, Math.random() * -100 - 50 + "%"],
            opacity: [0.2, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: Math.random() * 15 + 15,
            ease: "easeInOut",
            delay: Math.random() * 5 
          }}
          style={{
            width: `${Math.random() * 60 + 20}px`,
            height: `${Math.random() * 60 + 20}px`,
          }}
        />
      ))}
    </div>
  );
};

const ServiceSelection = ({ selectedService, onServiceSelect }: ServiceSelectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto px-4 relative"
    >
      <AmbientParticles />
      
      <motion.div 
        className="w-full h-1 bg-gradient-to-r from-wellness-teal/50 via-wellness-sage/50 to-wellness-lightBlue/50 rounded-full mb-10"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.2 }}
      />

      <div className="text-center mb-10 relative">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-light text-gray-800 mb-3 tracking-wide relative inline-block"
        >
          <span className="relative z-10">Select Your Wellness Experience</span>
          <motion.div 
            className="absolute -bottom-2 left-0 h-1 bg-wellness-teal/30 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-600 max-w-lg mx-auto"
        >
          Choose a service to begin your journey to relaxation and rejuvenation
        </motion.p>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {services.map((service) => (
          <motion.div key={service.id} variants={fadeInUp}>
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="relative group">
                  <motion.div 
                    className="absolute -inset-1 rounded-xl bg-gradient-to-r from-wellness-teal/20 to-wellness-sage/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"
                    initial={false}
                    animate={{ scale: selectedService === service.id ? 1 : 0.97 }}
                    whileHover={{ scale: 1.01 }}
                  />
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    selected={selectedService === service.id}
                    onClick={() => onServiceSelect(service.id)}
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 backdrop-blur-md bg-white/80 border-wellness-teal/20 shadow-xl shadow-wellness-teal/5">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-wellness-teal flex items-center">
                    <motion.div 
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 5, repeatType: "loop" }}
                      className="mr-2"
                    >
                      {service.icon}
                    </motion.div>
                    {service.title} Benefits
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-2 pt-2">
                    {service.benefits?.map((benefit, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.span 
                          className="h-2 w-2 rounded-full bg-gradient-to-r from-wellness-teal to-wellness-sage mr-2"
                          animate={{ 
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2,
                            delay: index * 0.2
                          }}
                        />
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <motion.div 
                  className="mt-4 h-0.5 w-full bg-gradient-to-r from-wellness-teal/30 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </HoverCardContent>
            </HoverCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ServiceSelection;
