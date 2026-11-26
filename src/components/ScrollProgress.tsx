import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ff3b9a] via-[#ff8a4c] to-[#00d9ff] origin-left z-60 pointer-events-none shadow-[0_0_10px_rgba(255,59,154,0.45)]"
    />
  );
};
