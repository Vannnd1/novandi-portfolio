import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface AmbientOrbSpec {
  id: string;
  sizeClass: string;
  colorClass: string;
  initXRatio: number;
  initYRatio: number;
  speed: number;
  freq: number;
  phase: number;
  attractWeight: number;
  attractEase: number;
  hoverOffsetRadius: number;
}

interface AmbientOrbPhysics extends AmbientOrbSpec {
  x: number;
  y: number;
  vx: number;
  vy: number;
  wanderAngle: number;
  turnBias: number;
  nextBiasAt: number;
}

interface ViceAmbientBackdropProps {
  scope: 'viewport' | 'container';
  className?: string;
}

const VIEWPORT_ORB_SPECS: AmbientOrbSpec[] = [
  {
    id: 'vice-pink',
    sizeClass: 'w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] blur-[110px]',
    colorClass: 'bg-[#ff3b9a]/14 dark:bg-[#ff3b9a]/20',
    initXRatio: 0.28,
    initYRatio: 0.24,
    speed: 44,
    freq: 0.85,
    phase: 0.4,
    attractWeight: 0.92,
    attractEase: 2.3,
    hoverOffsetRadius: 18,
  },
  {
    id: 'vice-sunset',
    sizeClass: 'w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] blur-[120px]',
    colorClass: 'bg-[#ff8a4c]/13 dark:bg-[#8b3dff]/18',
    initXRatio: 0.72,
    initYRatio: 0.34,
    speed: 38,
    freq: 0.7,
    phase: 2.1,
    attractWeight: 0.56,
    attractEase: 1.45,
    hoverOffsetRadius: 95,
  },
  {
    id: 'vice-cyan',
    sizeClass: 'w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] blur-[120px]',
    colorClass: 'bg-[#00d9ff]/12 dark:bg-[#00d9ff]/15',
    initXRatio: 0.52,
    initYRatio: 0.72,
    speed: 34,
    freq: 0.62,
    phase: 4.3,
    attractWeight: 0.28,
    attractEase: 1.05,
    hoverOffsetRadius: 155,
  },
];

const CONTAINER_ORB_SPECS: AmbientOrbSpec[] = [
  {
    id: 'card-pink',
    sizeClass: 'w-60 h-60 sm:w-76 sm:h-76 blur-3xl',
    colorClass: 'bg-[#ff3b9a]/14 dark:bg-[#ff3b9a]/20',
    initXRatio: 0.22,
    initYRatio: 0.3,
    speed: 36,
    freq: 0.95,
    phase: 0.6,
    attractWeight: 0.94,
    attractEase: 2.7,
    hoverOffsetRadius: 14,
  },
  {
    id: 'card-cyan',
    sizeClass: 'w-64 h-64 sm:w-80 sm:h-80 blur-3xl',
    colorClass: 'bg-[#00d9ff]/14 dark:bg-[#00d9ff]/16',
    initXRatio: 0.78,
    initYRatio: 0.72,
    speed: 32,
    freq: 0.78,
    phase: 2.7,
    attractWeight: 0.52,
    attractEase: 1.6,
    hoverOffsetRadius: 72,
  },
  {
    id: 'card-coral',
    sizeClass: 'w-52 h-52 sm:w-68 sm:h-68 blur-3xl',
    colorClass: 'bg-[#ff8a4c]/12 dark:bg-[#8b3dff]/16',
    initXRatio: 0.55,
    initYRatio: 0.25,
    speed: 28,
    freq: 0.65,
    phase: 4.1,
    attractWeight: 0.26,
    attractEase: 1.15,
    hoverOffsetRadius: 110,
  },
];

function createInitialOrbs(
  specs: AmbientOrbSpec[],
  width: number,
  height: number
): AmbientOrbPhysics[] {
  return specs.map((spec, idx) => {
    const angle = (idx * 2.1 + 0.7) % (Math.PI * 2);
    return {
      ...spec,
      x: width * spec.initXRatio,
      y: height * spec.initYRatio,
      vx: Math.cos(angle) * spec.speed * 0.5,
      vy: Math.sin(angle) * spec.speed * 0.5,
      wanderAngle: angle,
      turnBias: (idx % 2 === 0 ? 1 : -1) * 0.35,
      nextBiasAt: 1.5 + idx * 1.1,
    };
  });
}

function randomTurnBias(): number {
  return (Math.random() - 0.5) * 1.25;
}

function randomBiasDelay(elapsed: number): number {
  return elapsed + 1.8 + Math.random() * 2.8;
}

export const ViceAmbientBackdrop: React.FC<ViceAmbientBackdropProps> = ({
  scope,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const specs = scope === 'viewport' ? VIEWPORT_ORB_SPECS : CONTAINER_ORB_SPECS;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    if (!wrapperEl) return;

    const getSize = (): { width: number; height: number } => {
      if (scope === 'viewport') {
        return {
          width: window.innerWidth || 1280,
          height: window.innerHeight || 800,
        };
      }
      const parent = wrapperEl.parentElement;
      return {
        width: parent?.clientWidth || 760,
        height: parent?.clientHeight || 400,
      };
    };

    let { width, height } = getSize();
    const orbs = createInitialOrbs(specs, width, height);

    const applyOrbTransforms = () => {
      for (let i = 0; i < orbs.length; i++) {
        const node = orbRefs.current[i];
        if (node) {
          node.style.transform = `translate3d(${orbs[i].x.toFixed(1)}px, ${orbs[i].y.toFixed(1)}px, 0)`;
        }
      }
    };

    applyOrbTransforms();

    if (shouldReduceMotion) {
      return;
    }

    const pointer = {
      active: false,
      x: width / 2,
      y: height / 2,
    };

    const isCoarsePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: coarse)').matches;

    const handleResize = () => {
      const next = getSize();
      width = next.width;
      height = next.height;
      for (let i = 0; i < orbs.length; i++) {
        orbs[i].x = Math.min(width, Math.max(0, orbs[i].x));
        orbs[i].y = Math.min(height, Math.max(0, orbs[i].y));
      }
    };

    let observer: ResizeObserver | null = null;
    if (scope === 'viewport') {
      window.addEventListener('resize', handleResize);
    } else if (wrapperEl.parentElement && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(handleResize);
      observer.observe(wrapperEl.parentElement);
    }

    const parentTarget = scope === 'container' ? wrapperEl.parentElement : null;

    const handleMouseMove = (e: MouseEvent) => {
      if (scope === 'viewport') {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.active = true;
      } else if (parentTarget) {
        const rect = parentTarget.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
        pointer.active = true;
      }
    };

    const handleMouseLeave = () => {
      pointer.active = false;
    };

    if (!isCoarsePointer) {
      if (scope === 'viewport') {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('blur', handleMouseLeave);
      } else if (parentTarget) {
        parentTarget.addEventListener('mousemove', handleMouseMove, { passive: true });
        parentTarget.addEventListener('mouseleave', handleMouseLeave);
      }
    }

    let rafId = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += dt;

      const padX = Math.max(40, width * 0.12);
      const padY = Math.max(40, height * 0.12);

      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];

        if (elapsed >= orb.nextBiasAt) {
          orb.turnBias = randomTurnBias();
          orb.nextBiasAt = randomBiasDelay(elapsed);
        }

        orb.wanderAngle += (Math.sin(elapsed * orb.freq + orb.phase) * 0.45 + orb.turnBias) * dt;

        let targetVx = Math.cos(orb.wanderAngle) * orb.speed;
        let targetVy = Math.sin(orb.wanderAngle) * orb.speed;

        // Soft boundary drift back inward so orbs roam freely inside canvas
        if (orb.x < padX) targetVx += ((padX - orb.x) / padX) * 90;
        else if (orb.x > width - padX) targetVx -= ((orb.x - (width - padX)) / padX) * 90;

        if (orb.y < padY) targetVy += ((padY - orb.y) / padY) * 90;
        else if (orb.y > height - padY) targetVy -= ((orb.y - (height - padY)) / padY) * 90;

        if (pointer.active) {
          const breathX = Math.cos(elapsed * 0.9 + orb.phase) * orb.hoverOffsetRadius;
          const breathY = Math.sin(elapsed * 0.75 + orb.phase) * orb.hoverOffsetRadius;
          const goalX = pointer.x + breathX;
          const goalY = pointer.y + breathY;

          const pullVx = (goalX - orb.x) * orb.attractEase;
          const pullVy = (goalY - orb.y) * orb.attractEase;

          targetVx = targetVx * (1 - orb.attractWeight) + pullVx * orb.attractWeight;
          targetVy = targetVy * (1 - orb.attractWeight) + pullVy * orb.attractWeight;
        }

        const blend = Math.min(1, dt * (pointer.active ? 3.2 : 1.8));
        orb.vx += (targetVx - orb.vx) * blend;
        orb.vy += (targetVy - orb.vy) * blend;

        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;
      }

      applyOrbTransforms();
      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
      if (scope === 'viewport') {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('blur', handleMouseLeave);
      } else if (parentTarget) {
        parentTarget.removeEventListener('mousemove', handleMouseMove);
        parentTarget.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [scope, specs, shouldReduceMotion]);

  const positionClass =
    scope === 'viewport'
      ? 'fixed inset-0 z-0'
      : 'absolute inset-0 z-0';

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${positionClass} ${className}`}
    >
      {specs.map((spec, idx) => (
        <div
          key={spec.id}
          ref={(el) => {
            orbRefs.current[idx] = el;
          }}
          style={{ willChange: 'transform' }}
          className="absolute top-0 left-0"
        >
          <span
            className={`block -translate-x-1/2 -translate-y-1/2 rounded-full ${spec.sizeClass} ${spec.colorClass}`}
          />
        </div>
      ))}
    </div>
  );
};
