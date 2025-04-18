
import React from 'react';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-r from-wellness-lightBlue/20 via-white to-wellness-sage/20 text-center relative overflow-hidden"
    >
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-wellness-teal/10"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * 300,
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0.3 
          }}
          animate={{ 
            y: [null, Math.random() * -100 - 50],
            opacity: [null, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: Math.random() * 10 + 10,
            ease: "linear",
            delay: Math.random() * 5 
          }}
          style={{
            width: `${Math.random() * 80 + 20}px`,
            height: `${Math.random() * 80 + 20}px`,
          }}
        />
      ))}
      
      <motion.div 
        className="flex items-center mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <div className="bg-wellness-teal/10 p-2 rounded-full mr-3">
          <Leaf className="h-8 w-8 text-wellness-teal" />
        </div>
        <h1 className="text-4xl font-light tracking-wide text-gray-800 font-serif">
          <span className="text-wellness-teal">Serene</span> Wellness
        </h1>
      </motion.div>
      <motion.p 
        className="text-gray-600 max-w-md leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Begin your wellness journey with us. Select from our premium services designed to help you relax, rejuvenate, and restore your balance.
      </motion.p>
      
      <motion.div 
        className="w-16 h-1 bg-gradient-to-r from-wellness-teal to-wellness-sage rounded-full mt-6"
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      />
      
      {/* Shimmering CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8"
      >
        <Button
          className="relative overflow-hidden bg-gradient-to-r from-wellness-teal to-wellness-sage text-white rounded-full px-8 py-2 group"
        >
          <span className="relative z-10">Begin Your Journey</span>
          <motion.div 
            className="absolute inset-0 bg-white opacity-20"
            animate={{ 
              x: ["0%", "100%"],
              skew: ["-20deg", "-20deg"]
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "mirror", 
              duration: 1.5,
              ease: "easeInOut" 
            }}
            style={{ width: "50%" }}
          />
        </Button>
      </motion.div>
    </motion.header>
  );
};

export default Header;
