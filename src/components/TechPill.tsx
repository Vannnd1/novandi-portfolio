import React from 'react';

interface TechPillProps {
  name: string;
  size?: 'sm' | 'base';
  className?: string;
}

export const TechPill: React.FC<TechPillProps> = ({ name, size = 'base', className = '' }) => {
  const normalized = name.toLowerCase();

  const getBadgeClass = (tech: string) => {
    if (tech === 'next.js' || tech.includes('typescript') || tech.includes('fastapi') || tech.includes('express')) {
      return 'bg-white dark:bg-[#1e1333] text-[#1a1026] dark:text-[#fdf7ff] border-[#dfc4d8] dark:border-[#3e2963]';
    }
    if (tech === 'react.js' || tech.includes('react') || tech.includes('golang') || tech.includes('frontend')) {
      return 'bg-[#8be9fd] text-[#0b0614] border-[#22d3ee]';
    }
    if (tech === 'supabase' || tech.includes('sql') || tech.includes('mongo') || tech.includes('node')) {
      return 'bg-[#3ecf8e] text-[#0b0614] border-[#1f9d68]';
    }
    if (tech === 'python' || tech.includes('javascript')) {
      return 'bg-[#ffb84d] text-[#0b0614] border-[#e08b1b]';
    }
    if (tech === 'xgboost' || tech.includes('numba') || tech.includes('crypto')) {
      return 'bg-[#f472ff] text-[#0b0614] border-[#c026d3]';
    }
    if (tech === 'nest.js' || tech.includes('tensorflow') || tech.includes('huggingface') || tech.includes('opencv') || tech.includes('nist')) {
      return 'bg-[#ff5f8f] text-[#0b0614] border-[#e11d74]';
    }
    return 'bg-white dark:bg-[#1e1333] text-[#1a1026] dark:text-[#fdf7ff] border-[#dfc4d8] dark:border-[#3e2963]';
  };

  const sizeClasses = size === 'sm' ? 'text-xs sm:text-sm px-2.5 py-1' : 'text-base px-3 py-1.5';

  return (
    <span
      className={`inline-flex items-center font-space font-medium rounded-full border transition-transform duration-150 hover:scale-105 select-none leading-none ${sizeClasses} ${getBadgeClass(
        normalized
      )} ${className}`}
    >
      {name}
    </span>
  );
};
