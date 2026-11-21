import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/useTheme';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer select-none bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#18181b] dark:hover:bg-[#27272a] border border-[#e4e4e7] dark:border-[#27272a] text-[#404040] dark:text-[#f4f4f5] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#fd4aa6] active:scale-95 shadow-xs ${className}`}
      title={isDark ? 'Aktifkan Mode Terang (Light Mode)' : 'Aktifkan Mode Gelap (Dark Mode)'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={theme}
        initial={{ scale: 0.5, rotate: isDark ? -90 : 90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.5, rotate: isDark ? 90 : -90, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as const }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-[#fbbf24] hover:text-[#f59e0b] transition-colors" />
        ) : (
          <Moon className="w-4 h-4 text-[#52525b] hover:text-black transition-colors" />
        )}
      </motion.div>
    </button>
  );
};
