
import React from 'react';
import { motion } from 'framer-motion';

const quotes = [
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha"
  },
  {
    text: "The greatest weapon against stress is our ability to choose one thought over another.",
    author: "William James"
  },
  {
    text: "In the midst of movement and chaos, keep stillness inside of you.",
    author: "Deepak Chopra"
  }
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

const QuoteSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-wellness-sage/5 z-0" />
      
      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-wellness-teal/5"
          initial={{ 
            x: Math.random() * 100 - 50 + i * 100, 
            y: Math.random() * 100, 
            scale: Math.random() * 0.8 + 0.2,
            opacity: 0.4 
          }}
          animate={{ 
            y: [null, Math.random() * 50 + 25],
            opacity: [null, 0.2, 0.4]
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "mirror",
            duration: Math.random() * 10 + 10,
            ease: "easeInOut" 
          }}
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
          }}
        />
      ))}
      
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <blockquote className="text-2xl md:text-3xl font-serif text-gray-700 italic mb-6">
            "{randomQuote.text}"
          </blockquote>
          <cite className="text-wellness-teal font-medium not-italic">— {randomQuote.author}</cite>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            viewport={{ once: true }}
            className="h-0.5 bg-wellness-teal/30 mx-auto mt-10"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSection;
