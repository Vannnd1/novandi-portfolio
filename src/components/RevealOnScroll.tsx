import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'none';
  distance?: number;
  duration?: number;
  as?: React.ElementType;
  once?: boolean;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  distance = 24,
  duration = 600,
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: direction === 'up' ? distance : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -50px 0px' }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
