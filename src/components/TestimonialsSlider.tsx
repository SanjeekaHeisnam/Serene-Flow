
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuoteIcon } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  service: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jessica M.",
    service: "Spa Treatment",
    text: "The spa treatment was absolutely divine. I felt years of stress melt away with each moment. The staff was attentive and professional."
  },
  {
    id: 2,
    name: "Robert L.",
    service: "Yoga Session",
    text: "I've tried many yoga studios, but none compare to the peaceful atmosphere and expert guidance I received here. I'll definitely be back!"
  },
  {
    id: 3,
    name: "Angela T.",
    service: "Therapy",
    text: "My therapy sessions have been transformative. I've gained new perspectives and tools to manage my stress and anxiety in a healthy way."
  },
  {
    id: 4,
    name: "Daniel K.",
    service: "Meditation",
    text: "The guided meditation was exactly what I needed. The peaceful environment and expert instruction helped me achieve a level of calm I hadn't experienced before."
  }
];

const TestimonialsSlider = () => {
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-wellness-lightBlue/10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-gray-800 mb-3"
          >
            What Our Clients Say
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-wellness-teal to-wellness-sage rounded-full mx-auto"
          />
        </div>
        
        <div className="relative h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg border border-wellness-teal/10 text-center max-w-2xl relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-wellness-teal/10 rounded-full p-2">
                  <QuoteIcon className="h-6 w-6 text-wellness-teal" />
                </div>
                <p className="text-gray-600 italic mb-6">{testimonials[current].text}</p>
                <div>
                  <p className="font-medium text-wellness-teal">{testimonials[current].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[current].service}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === current ? 'w-6 bg-wellness-teal' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
