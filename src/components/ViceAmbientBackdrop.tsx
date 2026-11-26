import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface ViceAmbientBackdropProps {
  className?: string;
}

// Half of the blob's rendered size at the sm breakpoint (400×320).
// Used to offset the position layer so the blob's visual center sits at (blob.x, blob.y).
const BLOB_HW = 200;
const BLOB_HH = 160;

function randomTurnBias(): number {
  return (Math.random() - 0.5) * 2.4;
}

function randomBiasDelay(elapsed: number): number {
  return elapsed + 0.9 + Math.random() * 1.4;
}

function randomScaleBias(): number {
  return 0.86 + Math.random() * 0.42;
}

function randomScaleDelay(elapsed: number): number {
  return elapsed + 1.0 + Math.random() * 1.6;
}

export const ViceAmbientBackdrop: React.FC<ViceAmbientBackdropProps> = ({ className = '' }) => {
  const shouldReduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  // posRef handles translate only — keeps the blob center exactly at (blob.x, blob.y).
  const posRef = useRef<HTMLDivElement>(null);
  // rotRef handles rotate + scale only — rotates around the blob's own center.
  const rotRef = useRef<HTMLDivElement>(null);

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
      const pos = posRef.current;
      const rot = rotRef.current;
      if (pos) {
        // Position layer: move the blob's CENTER to (blob.x, blob.y).
        // Subtract half-sizes so the top-left of pos lands at (blob.x - BLOB_HW, blob.y - BLOB_HH),
        // making the center exactly at (blob.x, blob.y) with no rotation interaction.
        pos.style.transform = `translate3d(${(blob.x - BLOB_HW).toFixed(1)}px, ${(blob.y - BLOB_HH).toFixed(1)}px, 0)`;
      }
      if (rot) {
        // Rotation layer: rotate and scale around the blob element's own center (transform-origin: center is set in JSX).
        rot.style.transform = `rotate(${blob.rotDeg.toFixed(1)}deg) scale(${blob.scaleX.toFixed(3)}, ${blob.scaleY.toFixed(3)})`;
      }
    };

    applyBlobTransform();

    if (shouldReduceMotion) {
      return;
    }

    const pointer = {
      active: false,
      locked: false,
      x: width / 2,
      y: height / 2,
      clientX: 0,
      clientY: 0,
      hasClient: false,
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
      pointer.clientX = e.clientX;
      pointer.clientY = e.clientY;
      pointer.hasClient = true;
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      if (pointer.locked) {
        blob.x = pointer.x;
        blob.y = pointer.y;
        applyBlobTransform();
      }
    };

    const handleMouseLeave = () => {
      pointer.active = false;
      pointer.locked = false;
    };

    const handleScroll = () => {
      if (!pointer.active || !pointer.hasClient) return;
      const rect = parentTarget.getBoundingClientRect();
      const x = pointer.clientX - rect.left;
      const y = pointer.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pointer.x = x;
        pointer.y = y;
        if (pointer.locked) {
          blob.x = x;
          blob.y = y;
          applyBlobTransform();
        }
      } else {
        pointer.active = false;
        pointer.locked = false;
      }
    };

    if (!isCoarsePointer) {
      parentTarget.addEventListener('mousemove', handleMouseMove, { passive: true });
      parentTarget.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('scroll', handleScroll, { passive: true });
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
        const prevX = blob.x;
        const prevY = blob.y;
        const dist = Math.hypot(pointer.x - blob.x, pointer.y - blob.y);

        if (pointer.locked || dist < 4) {
          pointer.locked = true;
          blob.x = pointer.x;
          blob.y = pointer.y;
        } else {
          const glideAlpha = 1 - Math.exp(-20 * dt);
          blob.x += (pointer.x - blob.x) * glideAlpha;
          blob.y += (pointer.y - blob.y) * glideAlpha;
        }

        if (dt > 0) {
          blob.vx = (blob.x - prevX) / dt;
          blob.vy = (blob.y - prevY) / dt;
        }
      } else {
        blob.wanderAngle += (Math.sin(elapsed * 1.45) * 0.8 + blob.turnBias) * dt;

        const baseSpeed = 128;
        let targetVx = Math.cos(blob.wanderAngle) * baseSpeed;
        let targetVy = Math.sin(blob.wanderAngle) * baseSpeed;

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

      blob.rotDeg = (blob.rotDeg + 16 * dt) % 360;
      const desiredBase = blob.targetScaleBias + Math.sin(elapsed * 1.35) * 0.15;
      const wobble = Math.sin(elapsed * 1.9) * 0.08;
      const desiredScaleX = desiredBase + wobble;
      const desiredScaleY = desiredBase - wobble;
      const scaleBlend = Math.min(1, dt * 3.2);
      blob.scaleX += (Math.max(0.78, Math.min(1.42, desiredScaleX)) - blob.scaleX) * scaleBlend;
      blob.scaleY += (Math.max(0.78, Math.min(1.42, desiredScaleY)) - blob.scaleY) * scaleBlend;

      applyBlobTransform();
      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
      parentTarget.removeEventListener('mousemove', handleMouseMove);
      parentTarget.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {/* posRef: translate only — moves blob center to (blob.x, blob.y) */}
      <div ref={posRef} className="absolute top-0 left-0" style={{ willChange: 'transform' }}>
        {/* rotRef: rotate + scale only — pivots around blob's own center */}
        <div
          ref={rotRef}
          style={{ transformOrigin: 'center', willChange: 'transform' }}
          className="w-[280px] h-[230px] sm:w-[400px] sm:h-[320px]"
        >
          <span className="block w-full h-full blur-[46px] sm:blur-[56px] animate-vice-blob vice-tricolor-blob" />
        </div>
      </div>
    </div>
  );
};
