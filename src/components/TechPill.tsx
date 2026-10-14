import React from 'react';

interface TechPillProps {
  name: string;
}

export const TechPill: React.FC<TechPillProps> = ({ name }) => {
  const normalized = name.toLowerCase();

  const getPillColor = (tech: string) => {
    if (tech.includes('next') || tech.includes('typescript')) {
      return 'bg-white text-black border-black/80 shadow-2xs';
    }
    if (tech.includes('react') || tech.includes('vite') || tech.includes('frontend')) {
      return 'bg-[#7dd3fc] text-black border-black/20'; // light blue
    }
    if (tech.includes('python') || tech.includes('javascript') || tech.includes('eda')) {
      return 'bg-[#facc15] text-black border-black/20'; // vibrant yellow
    }
    if (tech.includes('supabase') || tech.includes('mongo') || tech.includes('scikit') || tech.includes('node')) {
      return 'bg-[#6ee7b7] text-black border-black/20'; // mint green
    }
    if (tech.includes('xgboost') || tech.includes('numba') || tech.includes('crypto') || tech.includes('math')) {
      return 'bg-[#f0abfc] text-black border-black/20'; // magenta / fuchsia
    }
    if (tech.includes('nest') || tech.includes('express') || tech.includes('opencv') || tech.includes('nist')) {
      return 'bg-[#fda4af] text-black border-black/20'; // coral red / pink
    }
    if (tech.includes('postgres') || tech.includes('docker') || tech.includes('redis') || tech.includes('jwt')) {
      return 'bg-[#c7d2fe] text-black border-black/20'; // soft indigo / purple
    }
    if (tech.includes('tailwind') || tech.includes('fastapi') || tech.includes('css')) {
      return 'bg-[#99f6e4] text-black border-black/20'; // teal / cyan
    }
    return 'bg-[#f3f4f6] text-black border-black/15'; // neutral light
  };

  return (
    <span
      className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold font-sans tracking-tight border transition-transform hover:scale-105 select-none ${getPillColor(
        normalized
      )}`}
    >
      {name.toLowerCase()}
    </span>
  );
};
