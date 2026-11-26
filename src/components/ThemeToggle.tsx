import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/useTheme';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={() => toggleTheme()}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer select-none bg-[#fff1f8] hover:bg-[#ffe3f1] dark:bg-[#1a102c] dark:hover:bg-[#261840] border border-[#f0d8e6] dark:border-[#372459] text-[#4c2b66] dark:text-[#fdf7ff] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a] shadow-xs overflow-hidden ${className}`}
      title={isDark ? 'Aktifkan Mode Terang (Miami Daylight)' : 'Aktifkan Mode Gelap (Vice Night)'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ scale: 0.45, rotate: isDark ? -90 : 90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.45, rotate: isDark ? 90 : -90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-[#ffb35c] hover:text-[#ffd166] transition-colors" />
          ) : (
            <Moon className="w-4 h-4 text-[#9333ea] hover:text-[#ff3b9a] transition-colors" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};
