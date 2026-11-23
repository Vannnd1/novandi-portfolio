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
      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer select-none bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#18181b] dark:hover:bg-[#27272a] border border-[#e4e4e7] dark:border-[#27272a] text-[#404040] dark:text-[#f4f4f5] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#fd4aa6] shadow-xs overflow-hidden ${className}`}
      title={isDark ? 'Aktifkan Mode Terang (Light Mode)' : 'Aktifkan Mode Gelap (Dark Mode)'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -14, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 14, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-[#fbbf24] hover:text-[#f59e0b] transition-colors" />
          ) : (
            <Moon className="w-4 h-4 text-[#52525b] hover:text-black transition-colors" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};
