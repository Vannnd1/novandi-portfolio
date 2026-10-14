import React from 'react';

interface TechPillProps {
  name: string;
}

export const TechPill: React.FC<TechPillProps> = ({ name }) => {
  const normalized = name.toLowerCase();

  const getBadgeClass = (tech: string) => {
    if (tech === 'next.js' || tech.includes('typescript') || tech.includes('fastapi') || tech.includes('express')) {
      return 'bg-white text-black border-black';
    }
    if (tech === 'react.js' || tech.includes('react') || tech.includes('golang') || tech.includes('frontend')) {
      return 'bg-[#96d7ff] text-black border-[#5ca9d6]';
    }
    if (tech === 'supabase' || tech.includes('sql') || tech.includes('mongo') || tech.includes('node')) {
      return 'bg-[#3ecf8e] text-black border-[#24966b]';
    }
    if (tech === 'python' || tech.includes('javascript')) {
      return 'bg-[#ffbb00] text-black border-[#c28a00]';
    }
    if (tech === 'xgboost' || tech.includes('numba') || tech.includes('crypto')) {
      return 'bg-[#e54afd] text-black border-[#a430b8]';
    }
    if (tech === 'nest.js' || tech.includes('tensorflow') || tech.includes('huggingface') || tech.includes('opencv') || tech.includes('nist')) {
      return 'bg-[#ff4040] text-black border-[#c82e2e]';
    }
    return 'bg-white text-black border-black';
  };

  return (
    <button
      type="button"
      className={`font-space text-base font-medium px-3 py-1.5 rounded-full border transition-transform hover:scale-105 active:scale-95 cursor-pointer leading-none select-none ${getBadgeClass(
        normalized
      )}`}
    >
      {name}
    </button>
  );
};
