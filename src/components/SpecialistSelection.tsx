
import React from 'react';
import { User, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpecialistSelectionProps {
  selectedSpecialist: string | null;
  onSpecialistSelect: (specialistId: string) => void;
}

interface Specialist {
  id: string;
  name: string;
  title: string;
  rating: number;
  experience: string;
  specialties: string[];
  imageUrl: string;
}

const specialists: Specialist[] = [
  {
    id: 'emma',
    name: 'Emma Johnson',
    title: 'Wellness Expert',
    rating: 4.9,
    experience: '8 years',
    specialties: ['Massage Therapy', 'Aromatherapy'],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 'michael',
    name: 'Michael Chen',
    title: 'Yoga Instructor',
    rating: 4.8,
    experience: '10 years',
    specialties: ['Hatha Yoga', 'Meditation'],
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 'sarah',
    name: 'Sarah Williams',
    title: 'Therapist',
    rating: 5.0,
    experience: '6 years',
    specialties: ['Cognitive Therapy', 'Stress Management'],
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 'david',
    name: 'David Patel',
    title: 'Meditation Guide',
    rating: 4.7,
    experience: '12 years',
    specialties: ['Mindfulness', 'Sound Healing'],
    imageUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
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

const SpecialistSelection = ({ selectedSpecialist, onSpecialistSelect }: SpecialistSelectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <div className="text-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-light text-gray-800 mb-3 tracking-wide"
        >
          Choose Your Specialist
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-600 max-w-lg mx-auto"
        >
          Our team of certified professionals are here to guide you on your wellness journey
        </motion.p>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {specialists.map((specialist) => (
          <motion.div key={specialist.id} variants={fadeInUp}>
            <div
              className={cn(
                "p-6 rounded-xl cursor-pointer transition-all duration-300 h-full",
                "backdrop-blur-sm border border-gray-100 flex flex-col",
                selectedSpecialist === specialist.id 
                  ? "bg-gradient-to-br from-wellness-teal/10 to-wellness-teal/5 border-wellness-teal/50 shadow-md shadow-wellness-teal/10" 
                  : "bg-gradient-to-br from-white to-gray-50/80 hover:from-wellness-lightBlue/10 hover:to-wellness-sage/10 shadow-sm hover:shadow-md"
              )}
              onClick={() => onSpecialistSelect(specialist.id)}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="relative mb-4">
                  <motion.div 
                    className={cn(
                      "w-20 h-20 rounded-full overflow-hidden border-2",
                      selectedSpecialist === specialist.id 
                        ? "border-wellness-teal" 
                        : "border-gray-200"
                    )}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={specialist.imageUrl} 
                      alt={specialist.name} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  {selectedSpecialist === specialist.id && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-2 -right-2 bg-wellness-teal text-white p-1 rounded-full"
                    >
                      <Heart className="h-4 w-4" />
                    </motion.div>
                  )}
                </div>
                
                <h3 className={cn(
                  "text-lg font-medium mb-1 transition-colors",
                  selectedSpecialist === specialist.id ? "text-wellness-teal" : "text-gray-800"
                )}>
                  {specialist.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-2">{specialist.title}</p>
                
                <div className="flex items-center mb-3">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-700">{specialist.rating}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{specialist.experience}</span>
                </div>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap justify-center gap-1">
                    {specialist.specialties.map((specialty, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                {selectedSpecialist === specialist.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 bg-wellness-teal text-white text-xs px-3 py-1 rounded-full"
                  >
                    Selected
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SpecialistSelection;
