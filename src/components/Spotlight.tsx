import React, { useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';

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
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || shouldReduceMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {!shouldReduceMotion && (
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(${size}px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 65%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
