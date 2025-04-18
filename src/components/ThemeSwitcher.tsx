
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Droplets, Sunset, Leaf } from 'lucide-react';

const ThemeSwitcher = () => {
  const { themeMode, setThemeMode } = useTheme();

  const themes = [
    { id: 'calm', name: 'Calm Blue', icon: <Droplets size={16} /> },
    { id: 'sunset', name: 'Sunset Peach', icon: <Sunset size={16} /> },
    { id: 'forest', name: 'Forest Green', icon: <Leaf size={16} /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-4 right-4 z-40"
    >
      <div className="bg-white/80 backdrop-blur-md rounded-full shadow-md border border-gray-100 overflow-hidden flex">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setThemeMode(theme.id as any)}
            className={`px-3 py-2 flex items-center text-xs transition-colors ${
              themeMode === theme.id 
                ? 'bg-gradient-to-r ' + 
                  (theme.id === 'calm' ? 'from-wellness-teal/90 to-wellness-teal/70' : 
                   theme.id === 'sunset' ? 'from-[#FF7043]/90 to-[#FF7043]/70' : 
                   'from-[#66BB6A]/90 to-[#66BB6A]/70') + 
                  ' text-white' 
                : 'hover:bg-gray-50 text-gray-600'
            }`}
          >
            <span className="mr-1.5">{theme.icon}</span>
            <span className="hidden sm:inline">{theme.name}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default ThemeSwitcher;
