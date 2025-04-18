
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const ServiceCard = ({ title, description, icon, selected, onClick }: ServiceCardProps) => {
  const { themeMode, themeColors } = useTheme();
  
  // Dynamic styles based on theme
  const getThemeStyles = () => {
    if (themeMode === 'calm') {
      return {
        selectedBg: "from-wellness-teal/20 to-wellness-teal/5",
        selectedBorder: "border-wellness-teal/50",
        selectedShadow: "shadow-wellness-teal/10",
        hoverBg: "hover:from-wellness-lightBlue/30 hover:to-wellness-sage/20",
        iconBg: "bg-wellness-teal/20",
        iconText: "text-wellness-teal",
        titleText: "text-wellness-teal",
        accentBg: "from-wellness-teal to-wellness-sage",
        shimmering: "via-wellness-teal/10"
      };
    } else if (themeMode === 'sunset') {
      return {
        selectedBg: "from-[#FF7043]/20 to-[#FF7043]/5",
        selectedBorder: "border-[#FF7043]/50",
        selectedShadow: "shadow-[#FF7043]/10",
        hoverBg: "hover:from-[#FFCCBC]/30 hover:to-wellness-sand/20",
        iconBg: "bg-[#FF7043]/20",
        iconText: "text-[#FF7043]",
        titleText: "text-[#FF7043]",
        accentBg: "from-[#FF7043] to-[#FFB74D]",
        shimmering: "via-[#FF7043]/10"
      };
    } else {
      return {
        selectedBg: "from-[#66BB6A]/20 to-[#66BB6A]/5",
        selectedBorder: "border-[#66BB6A]/50",
        selectedShadow: "shadow-[#66BB6A]/10",
        hoverBg: "hover:from-wellness-sage/30 hover:to-[#C8E6C9]/20",
        iconBg: "bg-[#66BB6A]/20",
        iconText: "text-[#66BB6A]",
        titleText: "text-[#66BB6A]",
        accentBg: "from-[#66BB6A] to-[#81C784]",
        shimmering: "via-[#66BB6A]/10"
      };
    }
  };
  
  const styles = getThemeStyles();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={cn(
        "p-6 rounded-xl cursor-pointer transition-all duration-300 h-full",
        "backdrop-blur-sm border relative overflow-hidden z-10",
        selected 
          ? `bg-gradient-to-br ${styles.selectedBg} ${styles.selectedBorder} shadow-lg ${styles.selectedShadow}` 
          : `bg-gradient-to-br from-white/80 to-gray-50/70 ${styles.hoverBg} border-gray-100/80 shadow-sm`
      )}
      onClick={onClick}
    >
      {/* Shimmering effect */}
      <motion.div 
        className={cn(
          "absolute inset-0 opacity-0",
          selected ? `bg-gradient-to-r from-transparent ${styles.shimmering} to-transparent bg-[length:200%_100%] opacity-100` : ""
        )}
        animate={selected ? { 
          backgroundPosition: ['0% center', '100% center', '0% center'],
        } : {}}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut" 
        }}
      />

      {/* Ambient particle in card (only when selected) */}
      {selected && (
        <motion.div 
          className="absolute w-24 h-24 rounded-full opacity-20 blur-xl"
          initial={{ x: "100%", y: "100%" }}
          animate={{ 
            x: ["100%", "0%", "100%"],
            y: ["100%", "0%", "100%"],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut" 
          }}
          style={{
            background: `radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)`
          }}
        />
      )}

      <div className="flex flex-col items-center text-center h-full relative z-10">
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ 
            scale: 1,
            y: selected ? [0, -5, 0] : 0,
            rotate: selected ? [0, 5, 0, -5, 0] : 0
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 10,
            y: {
              repeat: selected ? Infinity : 0,
              duration: 2,
              repeatType: "mirror"
            },
            rotate: {
              repeat: selected ? Infinity : 0,
              duration: 4,
              repeatType: "mirror"
            }
          }}
          className={cn(
            "rounded-full p-4 mb-5 transition-colors",
            selected 
              ? `${styles.iconBg} ${styles.iconText}` 
              : "bg-gray-100/80 text-gray-600"
          )}
        >
          {icon}
        </motion.div>
        <h3 className={cn(
          "text-lg font-medium mb-3 transition-colors relative",
          selected ? styles.titleText : "text-gray-800"
        )}>
          {title}
          {selected && (
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5 }}
              className={`absolute -bottom-1 left-0 h-0.5 ${styles.iconBg} bg-opacity-30 rounded-full`}
            />
          )}
        </h3>
        <p className="text-gray-500 text-sm">{description}</p>
        
        {selected && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-4 bg-gradient-to-r ${styles.accentBg} text-white text-xs px-4 py-1 rounded-full shadow-sm flex items-center`}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mr-1 block h-1.5 w-1.5 rounded-full bg-white"
            />
            Selected
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceCard;
