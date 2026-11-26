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
  className?: string;
}

const CARD_ORB_SPECS: AmbientOrbSpec[] = [
  {
    id: 'card-pink',
    sizeClass: 'w-60 h-60 sm:w-76 sm:h-76 blur-3xl',
    colorClass: 'bg-[#ff3b9a]/18 dark:bg-[#ff3b9a]/26',
    initXRatio: 0.22,
    initYRatio: 0.3,
    speed: 125,
    freq: 1.65,
    phase: 0.6,
    attractWeight: 0.96,
    attractEase: 5.4,
    hoverOffsetRadius: 12,
  },
  {
    id: 'card-cyan',
    sizeClass: 'w-64 h-64 sm:w-80 sm:h-80 blur-3xl',
    colorClass: 'bg-[#00d9ff]/18 dark:bg-[#00d9ff]/22',
    initXRatio: 0.78,
    initYRatio: 0.72,
    speed: 105,
    freq: 1.35,
    phase: 2.7,
    attractWeight: 0.62,
    attractEase: 3.6,
    hoverOffsetRadius: 68,
  },
  {
    id: 'card-coral',
    sizeClass: 'w-52 h-52 sm:w-68 sm:h-68 blur-3xl',
    colorClass: 'bg-[#ff8a4c]/16 dark:bg-[#8b3dff]/22',
    initXRatio: 0.55,
    initYRatio: 0.25,
    speed: 92,
    freq: 1.15,
    phase: 4.1,
    attractWeight: 0.36,
    attractEase: 2.5,
    hoverOffsetRadius: 105,
  },
];

function createInitialOrbs(width: number, height: number): AmbientOrbPhysics[] {
  return CARD_ORB_SPECS.map((spec, idx) => {
    const angle = (idx * 2.1 + 0.7) % (Math.PI * 2);
    return {
      ...spec,
      x: width * spec.initXRatio,
      y: height * spec.initYRatio,
      vx: Math.cos(angle) * spec.speed * 0.6,
      vy: Math.sin(angle) * spec.speed * 0.6,
      wanderAngle: angle,
      turnBias: (idx % 2 === 0 ? 1 : -1) * 0.65,
      nextBiasAt: 0.9 + idx * 0.6,
    };
  });
}

function randomTurnBias(): number {
  return (Math.random() - 0.5) * 2.4;
}

function randomBiasDelay(elapsed: number): number {
  return elapsed + 0.9 + Math.random() * 1.4;
}

export const ViceAmbientBackdrop: React.FC<ViceAmbientBackdropProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    const parentTarget = wrapperEl?.parentElement;
    if (!wrapperEl || !parentTarget) return;

    const getSize = () => ({
      width: parentTarget.clientWidth || 760,
      height: parentTarget.clientHeight || 400,
    });

    let { width, height } = getSize();
    const orbs = createInitialOrbs(width, height);

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
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(handleResize);
      observer.observe(parentTarget);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parentTarget.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };

    const handleMouseLeave = () => {
      pointer.active = false;
    };

    if (!isCoarsePointer) {
      parentTarget.addEventListener('mousemove', handleMouseMove, { passive: true });
      parentTarget.addEventListener('mouseleave', handleMouseLeave);
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

        orb.wanderAngle += (Math.sin(elapsed * orb.freq + orb.phase) * 0.8 + orb.turnBias) * dt;

        let targetVx = Math.cos(orb.wanderAngle) * orb.speed;
        let targetVy = Math.sin(orb.wanderAngle) * orb.speed;

        // Soft inward drift near edges so fast orbs curve back inside the card
        if (orb.x < padX) targetVx += ((padX - orb.x) / padX) * 190;
        else if (orb.x > width - padX) targetVx -= ((orb.x - (width - padX)) / padX) * 190;

        if (orb.y < padY) targetVy += ((padY - orb.y) / padY) * 190;
        else if (orb.y > height - padY) targetVy -= ((orb.y - (height - padY)) / padY) * 190;

        if (pointer.active) {
          const breathX = Math.cos(elapsed * 1.6 + orb.phase) * orb.hoverOffsetRadius;
          const breathY = Math.sin(elapsed * 1.35 + orb.phase) * orb.hoverOffsetRadius;
          const goalX = pointer.x + breathX;
          const goalY = pointer.y + breathY;

          const pullVx = (goalX - orb.x) * orb.attractEase;
          const pullVy = (goalY - orb.y) * orb.attractEase;

          targetVx = targetVx * (1 - orb.attractWeight) + pullVx * orb.attractWeight;
          targetVy = targetVy * (1 - orb.attractWeight) + pullVy * orb.attractWeight;
        }

        const blend = Math.min(1, dt * (pointer.active ? 6.5 : 3.6));
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
      parentTarget.removeEventListener('mousemove', handleMouseMove);
      parentTarget.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {CARD_ORB_SPECS.map((spec, idx) => (
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
