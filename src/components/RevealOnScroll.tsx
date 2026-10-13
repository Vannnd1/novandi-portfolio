import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
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
  duration = 700,
  as: Component = 'div',
  once = true,
}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        return true;
      }
    }
    return false;
  });

  useEffect(() => {
    if (isVisible && once) return;

    const currentEl = elementRef.current;
    if (!currentEl) return;

    // Trigger reveal when the element enters 60px before the bottom edge of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, once]);

  const translateStyle = direction === 'up' ? `translateY(${distance}px)` : 'translateY(0)';

  return (
    <Component
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : translateStyle,
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
};
