import React from 'react';

interface SocialPillProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
  variant: 'github' | 'linkedin' | 'gmail' | 'twitter' | 'instagram';
  tilt?: number;
}

export const SocialPill: React.FC<SocialPillProps> = ({ href, icon, label, variant, tilt = 0 }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'github':
        return 'bg-[#cf2ee3] hover:bg-[#b51fc9] text-white'; // vibrant magenta / purple
      case 'twitter':
      case 'linkedin':
        return 'bg-[#46b8ff] hover:bg-[#209ded] text-white'; // sky blue
      case 'instagram':
      case 'gmail':
        return 'bg-[#f0258d] hover:bg-[#d61778] text-white'; // hot pink
      default:
        return 'bg-[#101010] text-white';
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ transform: `rotate(${tilt}deg)` }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] font-space text-lg font-medium transition-transform duration-150 active:scale-95 shadow-xs align-baseline mx-1 select-none text-white no-underline hover:scale-105 ${getVariantStyles()}`}
    >
      {icon && <span className="w-4 h-4 shrink-0 flex items-center justify-center">{icon}</span>}
      <span className="leading-none">{label}</span>
    </a>
  );
};
