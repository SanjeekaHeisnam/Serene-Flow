
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'calm' | 'sunset' | 'forest';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

const themes = {
  calm: {
    primary: '#4DB6AC', // teal
    secondary: '#B3E5FC', // light blue
    accent: '#E6E6FA', // lavender
    background: 'from-white via-wellness-lightBlue/5 to-wellness-teal/5',
  },
  sunset: {
    primary: '#FF7043', // coral
    secondary: '#FFB74D', // amber
    accent: '#FFCCBC', // peach
    background: 'from-white via-wellness-sand/10 to-[#FFCCBC]/10',
  },
  forest: {
    primary: '#66BB6A', // green
    secondary: '#81C784', // light green
    accent: '#C8E6C9', // pale green
    background: 'from-white via-wellness-sage/10 to-[#C8E6C9]/10',
  },
};

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'calm',
  setThemeMode: () => {},
  themeColors: themes.calm,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('calm');
  const [themeColors, setThemeColors] = useState(themes.calm);

  useEffect(() => {
    setThemeColors(themes[themeMode]);
    
    // Update CSS variables for theme colors
    document.documentElement.style.setProperty('--theme-primary', themes[themeMode].primary);
    document.documentElement.style.setProperty('--theme-secondary', themes[themeMode].secondary);
    document.documentElement.style.setProperty('--theme-accent', themes[themeMode].accent);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
