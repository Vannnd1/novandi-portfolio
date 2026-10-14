import React from 'react';

interface SocialPillProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
  variant: 'github' | 'linkedin' | 'gmail' | 'twitter' | 'instagram';
}

export const SocialPill: React.FC<SocialPillProps> = ({ href, icon, label, variant }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'github':
        return 'bg-[#d946ef] hover:bg-[#c026d3] text-white'; // vibrant purple / fuchsia
      case 'linkedin':
      case 'twitter':
        return 'bg-[#38bdf8] hover:bg-[#0284c7] text-white'; // sky blue
      case 'gmail':
      case 'instagram':
        return 'bg-[#ec4899] hover:bg-[#db2777] text-white'; // hot pink
      default:
        return 'bg-[#111318] text-white';
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all duration-150 active:scale-95 shadow-xs align-baseline mx-1 ${getVariantStyles()}`}
    >
      {icon && <span className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">{icon}</span>}
      <span className="font-sans lowercase">{label}</span>
    </a>
  );
};
