import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface ViceAmbientBackdropProps {
  className?: string;
}

function randomTurnBias(): number {
  return (Math.random() - 0.5) * 2.4;
}

function randomBiasDelay(elapsed: number): number {
  return elapsed + 0.9 + Math.random() * 1.4;
}

function randomScaleBias(): number {
  return 0.78 + Math.random() * 0.58; // 0.78x to 1.36x organic grow/shrink
}

function randomScaleDelay(elapsed: number): number {
  return elapsed + 1.0 + Math.random() * 1.6;
}

export const ViceAmbientBackdrop: React.FC<ViceAmbientBackdropProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    const parentTarget = wrapperEl?.parentElement;
    if (!wrapperEl || !parentTarget) return;

    const getSize = () => ({
      width: parentTarget.clientWidth || 760,
      height: parentTarget.clientHeight || 400,
    });

    let { width, height } = getSize();

    const blob = {
      x: width * 0.52,
      y: height * 0.48,
      vx: 72,
      vy: 42,
      wanderAngle: 0.65,
      turnBias: 0.55,
      nextBiasAt: 1.0,
      rotDeg: 18,
      scaleX: 1,
      scaleY: 1,
      targetScaleBias: 1,
      nextScaleAt: 1.2,
    };

    const applyBlobTransform = () => {
      const node = blobRef.current;
      if (node) {
        node.style.transform = `translate3d(${blob.x.toFixed(1)}px, ${blob.y.toFixed(1)}px, 0) rotate(${blob.rotDeg.toFixed(1)}deg) scale(${blob.scaleX.toFixed(3)}, ${blob.scaleY.toFixed(3)})`;
      }
    };

    applyBlobTransform();

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
      blob.x = Math.min(width, Math.max(0, blob.x));
      blob.y = Math.min(height, Math.max(0, blob.y));
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

      if (elapsed >= blob.nextBiasAt) {
        blob.turnBias = randomTurnBias();
        blob.nextBiasAt = randomBiasDelay(elapsed);
      }

      if (elapsed >= blob.nextScaleAt) {
        blob.targetScaleBias = randomScaleBias();
        blob.nextScaleAt = randomScaleDelay(elapsed);
      }

      if (pointer.active) {
        // Direct smooth convergence straight to exact pointer coordinates (no offset/lag)
        const followAlpha = 1 - Math.exp(-14 * dt);
        const prevX = blob.x;
        const prevY = blob.y;
        blob.x += (pointer.x - blob.x) * followAlpha;
        blob.y += (pointer.y - blob.y) * followAlpha;
        if (dt > 0) {
          blob.vx = (blob.x - prevX) / dt;
          blob.vy = (blob.y - prevY) / dt;
        }
      } else {
        blob.wanderAngle += (Math.sin(elapsed * 1.45) * 0.8 + blob.turnBias) * dt;

        const baseSpeed = 128;
        let targetVx = Math.cos(blob.wanderAngle) * baseSpeed;
        let targetVy = Math.sin(blob.wanderAngle) * baseSpeed;

        // Soft inward curve near edges so the large aura stays inside the card
        const padX = Math.max(48, width * 0.18);
        const padY = Math.max(48, height * 0.18);

        if (blob.x < padX) targetVx += ((padX - blob.x) / padX) * 200;
        else if (blob.x > width - padX) targetVx -= ((blob.x - (width - padX)) / padX) * 200;

        if (blob.y < padY) targetVy += ((padY - blob.y) / padY) * 200;
        else if (blob.y > height - padY) targetVy -= ((blob.y - (height - padY)) / padY) * 200;

        const blend = Math.min(1, dt * 3.6);
        blob.vx += (targetVx - blob.vx) * blend;
        blob.vy += (targetVy - blob.vy) * blend;

        blob.x += blob.vx * dt;
        blob.y += blob.vy * dt;
      }

      // Continuous organic tumbling & independent X/Y grow-and-shrink
      blob.rotDeg = (blob.rotDeg + 18 * dt) % 360;
      const hoverBloom = pointer.active ? 0.1 : 0;
      const desiredScaleX = blob.targetScaleBias + hoverBloom + Math.sin(elapsed * 1.25) * 0.22;
      const desiredScaleY = blob.targetScaleBias + hoverBloom + Math.cos(elapsed * 0.96 + 0.9) * 0.22;
      const scaleBlend = Math.min(1, dt * 2.4);
      blob.scaleX += (Math.max(0.72, Math.min(1.5, desiredScaleX)) - blob.scaleX) * scaleBlend;
      blob.scaleY += (Math.max(0.72, Math.min(1.5, desiredScaleY)) - blob.scaleY) * scaleBlend;

      applyBlobTransform();
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
      <div
        ref={blobRef}
        style={{ willChange: 'transform' }}
        className="absolute top-0 left-0"
      >
        <span className="block -translate-x-1/2 -translate-y-1/2 w-[380px] h-[260px] sm:w-[620px] sm:h-[400px] blur-[56px] sm:blur-[68px] animate-vice-blob vice-tricolor-blob" />
      </div>
    </div>
  );
};
