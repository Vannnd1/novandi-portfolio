import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from 'motion/react';

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  size?: number;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(253, 74, 166, 0.08)',
  size = 650,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // High-performance MotionValues: Update DOM directly without triggering React re-renders
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const opacity = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 65%)`;

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Disable pointer tracking on touch devices / coarse pointers
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Constrain coordinates within container bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseX.set(x);
        mouseY.set(y);
        opacity.set(1);
      } else {
        opacity.set(0);
      }
    };

    const handleMouseEnter = () => {
      opacity.set(1);
    };

    const handleMouseLeave = () => {
      opacity.set(0);
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, opacity, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {!shouldReduceMotion && (
        <motion.div
          style={{ background, opacity }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
