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
        return 'bg-[#9333ea] hover:bg-[#7e22ce] text-white shadow-[#a855f7]/25';
      case 'twitter':
      case 'linkedin':
        return 'bg-[#06b6d4] hover:bg-[#0891b2] text-white shadow-[#06b6d4]/25';
      case 'instagram':
      case 'gmail':
        return 'bg-[#ff3b9a] hover:bg-[#e11d74] text-white shadow-[#ff3b9a]/25';
      default:
        return 'bg-[#1a1026] text-white shadow-[#1a1026]/20';
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
