import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SocialPillProps {
  href: string;
  icon?: React.ReactNode;
  label: string;
  variant: 'github' | 'linkedin' | 'gmail' | 'twitter' | 'instagram';
  tilt?: number;
}

export const SocialPill: React.FC<SocialPillProps> = ({ href, icon, label, variant, tilt = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  const getVariantStyles = () => {
    switch (variant) {
      case 'github':
        return 'bg-[#cf2ee3] hover:bg-[#b51fc9] text-white shadow-[#cf2ee3]/20';
      case 'twitter':
      case 'linkedin':
        return 'bg-[#46b8ff] hover:bg-[#209ded] text-white shadow-[#46b8ff]/20';
      case 'instagram':
      case 'gmail':
        return 'bg-[#f0258d] hover:bg-[#d61778] text-white shadow-[#f0258d]/20';
      default:
        return 'bg-[#101010] text-white shadow-black/20';
    }
  };

  const isMailto = href.startsWith('mailto:');

  if (shouldReduceMotion) {
    return (
      <a
        href={href}
        target={isMailto ? undefined : '_blank'}
        rel={isMailto ? undefined : 'noreferrer'}
        style={{ transform: `rotate(${tilt}deg)` }}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] font-space text-lg font-medium shadow-xs align-baseline mx-1 select-none text-white no-underline ${getVariantStyles()}`}
      >
        {icon && <span className="w-4 h-4 shrink-0 flex items-center justify-center">{icon}</span>}
        <span className="leading-none">{label}</span>
      </a>
    );
  }

  return (
    <motion.a
      href={href}
      target={isMailto ? undefined : '_blank'}
      rel={isMailto ? undefined : 'noreferrer'}
      initial={{ rotate: tilt }}
      whileHover={{
        scale: 1.07,
        rotate: tilt !== 0 ? tilt * 1.35 : 1,
        y: -1.5,
        transition: { type: 'spring', stiffness: 450, damping: 20 },
      }}
      whileTap={{ scale: 0.94 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] font-space text-lg font-medium shadow-xs hover:shadow-md align-baseline mx-1 select-none text-white no-underline transition-colors duration-150 cursor-pointer ${getVariantStyles()}`}
    >
      {icon && <span className="w-4 h-4 shrink-0 flex items-center justify-center">{icon}</span>}
      <span className="leading-none">{label}</span>
    </motion.a>
  );
};
