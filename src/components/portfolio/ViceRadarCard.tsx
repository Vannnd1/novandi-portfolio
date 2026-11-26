import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Crosshair, Radar, RotateCcw, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { TECH_POND_ITEMS, type TechFishId, type TechFishItem } from '../../data/techPond';
import { TechBrandIcon } from '../TechBrandIcon';

interface RadarBlipPhysics {
  id: TechFishId;
  x: number;
  y: number;
  vx: number;
  vy: number;
  wanderAngle: number;
  baseSpeed: number;
  phase: number;
  turnBias: number;
  nextBiasAt: number;
  ping: number;
  hovered: boolean;
}

interface RadarPulse {
  id: number;
  x: number;
  y: number;
  variant: 'sonar' | 'lock';
  color?: string;
}

const DEFAULT_DIAMETER = 360;
const BLIP_SIZE_DESKTOP = 44;
const BLIP_SIZE_MOBILE = 38;
const RING_INSET = 16;

function getBlipSize(diameter: number): number {
  return diameter < 330 ? BLIP_SIZE_MOBILE : BLIP_SIZE_DESKTOP;
}

function createInitialBlipState(diameter: number): RadarBlipPhysics[] {
  const size = getBlipSize(diameter);
  const center = diameter / 2;
  const maxRadius = Math.max(60, center - size / 2 - RING_INSET);

  return TECH_POND_ITEMS.map((item, idx) => {
    // Distribute across inner, middle, and outer radar rings via golden-angle spiral
    const frac = (idx + 0.65) / TECH_POND_ITEMS.length;
    const radius = Math.min(maxRadius, Math.max(28, Math.sqrt(frac) * maxRadius * 0.92));
    const polarAngle = idx * 2.3999632; // Golden angle for natural radar dispersion
    const cx = center + Math.cos(polarAngle) * radius;
    const cy = center + Math.sin(polarAngle) * radius;
    const baseSpeed = 16 + (idx % 4) * 4;
    const heading = polarAngle + Math.PI / 2;

    return {
      id: item.id,
      x: cx - size / 2,
      y: cy - size / 2,
      vx: Math.cos(heading) * baseSpeed,
      vy: Math.sin(heading) * baseSpeed,
      wanderAngle: heading,
      baseSpeed,
      phase: idx * 0.75,
      turnBias: (idx % 2 === 0 ? 1 : -1) * 0.18,
      nextBiasAt: 2.5 + (idx % 4),
      ping: 0,
      hovered: false,
    };
  });
}

function respawnBlipOnRadar(blip: RadarBlipPhysics, diameter: number): void {
  const size = getBlipSize(diameter);
  const center = diameter / 2;
  const maxRadius = Math.max(60, center - size / 2 - RING_INSET);
  const radius = 28 + Math.random() * (maxRadius - 28);
  const polarAngle = Math.random() * Math.PI * 2;
  const heading = polarAngle + Math.PI / 2;

  blip.x = center + Math.cos(polarAngle) * radius - size / 2;
  blip.y = center + Math.sin(polarAngle) * radius - size / 2;
  blip.wanderAngle = heading;
  blip.vx = Math.cos(heading) * blip.baseSpeed;
  blip.vy = Math.sin(heading) * blip.baseSpeed;
  blip.ping = 1;
  blip.hovered = false;
}

export const ViceRadarCard: React.FC = () => {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [lockedIds, setLockedIds] = useState<TechFishId[]>([]);
  const [activeLockedId, setActiveLockedId] = useState<TechFishId | null>(null);
  const [pulses, setPulses] = useState<RadarPulse[]>([]);

  const radarRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const blipNodeRefs = useRef<Partial<Record<TechFishId, HTMLDivElement | null>>>({});
  const blipPingRefs = useRef<Partial<Record<TechFishId, HTMLSpanElement | null>>>({});
  const blipStateRef = useRef<RadarBlipPhysics[]>(createInitialBlipState(DEFAULT_DIAMETER));
  const lockedSetRef = useRef<Set<TechFishId>>(new Set());
  const diameterRef = useRef<number>(DEFAULT_DIAMETER);
  const pulseCounterRef = useRef(0);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    lockedSetRef.current = new Set(lockedIds);
    blipStateRef.current.forEach((blip) => {
      if (lockedSetRef.current.has(blip.id)) return;
      const node = blipNodeRefs.current[blip.id];
      if (node) {
        node.style.transform = `translate3d(${blip.x.toFixed(1)}px, ${blip.y.toFixed(1)}px, 0)`;
      }
    });
  }, [lockedIds]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  const spawnPulse = (
    x: number,
    y: number,
    variant: 'sonar' | 'lock' = 'sonar',
    color?: string
  ) => {
    const id = ++pulseCounterRef.current;
    setPulses((prev) => [...prev.slice(-6), { id, x, y, variant, color }]);
    const timeoutId = window.setTimeout(() => {
      setPulses((prev) => prev.filter((p) => p.id !== id));
    }, 950);
    timersRef.current.push(timeoutId);
  };

  // 60fps radar sonar sweep + smooth circular patrolling blips
  useEffect(() => {
    const radarEl = radarRef.current;
    if (!radarEl) return;

    const updateBounds = () => {
      const d = radarEl.clientWidth || DEFAULT_DIAMETER;
      const wasDefault = diameterRef.current === DEFAULT_DIAMETER;
      diameterRef.current = d;

      if (wasDefault && d !== DEFAULT_DIAMETER) {
        blipStateRef.current = createInitialBlipState(d);
      } else {
        const size = getBlipSize(d);
        const center = d / 2;
        const maxR = Math.max(50, center - size / 2 - RING_INSET);
        blipStateRef.current.forEach((blip) => {
          const bx = blip.x + size / 2 - center;
          const by = blip.y + size / 2 - center;
          const dist = Math.hypot(bx, by);
          if (dist > maxR && dist > 0) {
            const scale = maxR / dist;
            blip.x = center + bx * scale - size / 2;
            blip.y = center + by * scale - size / 2;
          }
        });
      }
    };

    updateBounds();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateBounds);
      observer.observe(radarEl);
    }

    if (shouldReduceMotion) {
      const d = diameterRef.current;
      blipStateRef.current = createInitialBlipState(d);
      blipStateRef.current.forEach((blip) => {
        const node = blipNodeRefs.current[blip.id];
        if (node) {
          node.style.transform = `translate3d(${blip.x.toFixed(1)}px, ${blip.y.toFixed(1)}px, 0)`;
        }
      });
      return () => observer?.disconnect();
    }

    let rafId = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    let sweepRad = 0;

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += dt;

      // Rotate radar sweep smoothly clockwise (~7.4s per full revolution)
      sweepRad = (sweepRad + 0.85 * dt) % (Math.PI * 2);
      if (sweepRef.current) {
        const deg = (sweepRad * 180) / Math.PI;
        sweepRef.current.style.transform = `rotate(${deg.toFixed(2)}deg)`;
      }

      const diameter = diameterRef.current;
      const size = getBlipSize(diameter);
      const center = diameter / 2;
      const maxR = Math.max(50, center - size / 2 - RING_INSET);
      const softMargin = 34;
      const blips = blipStateRef.current;

      for (let i = 0; i < blips.length; i++) {
        const blip = blips[i];
        if (lockedSetRef.current.has(blip.id)) continue;

        if (elapsed >= blip.nextBiasAt) {
          blip.turnBias = (Math.random() - 0.5) * 0.55;
          blip.nextBiasAt = elapsed + 2.4 + Math.random() * 2.5;
        }

        const desiredSpeed = blip.hovered ? 3 : blip.baseSpeed;
        blip.wanderAngle += (Math.sin(elapsed * 0.75 + blip.phase) * 0.35 + blip.turnBias) * dt;

        let targetVx = Math.cos(blip.wanderAngle) * desiredSpeed;
        let targetVy = Math.sin(blip.wanderAngle) * desiredSpeed;

        // Smooth circular boundary steering inside the radar dish
        const cx = blip.x + size / 2;
        const cy = blip.y + size / 2;
        const dxCenter = cx - center;
        const dyCenter = cy - center;
        const distFromCenter = Math.hypot(dxCenter, dyCenter);

        if (distFromCenter > maxR - softMargin && distFromCenter > 0.01) {
          const edgeRatio = Math.min(1, (distFromCenter - (maxR - softMargin)) / softMargin);
          const inwardStrength = edgeRatio * edgeRatio * 55;
          targetVx -= (dxCenter / distFromCenter) * inwardStrength;
          targetVy -= (dyCenter / distFromCenter) * inwardStrength;
        }

        // Keep blips outside the central cross-hair origin dot
        if (distFromCenter < 22 && distFromCenter > 0.01) {
          targetVx += (dxCenter / distFromCenter) * 24;
          targetVy += (dyCenter / distFromCenter) * 24;
        }

        const steerBlend = Math.min(1, dt * (blip.hovered ? 6.5 : 2.1));
        blip.vx += (targetVx - blip.vx) * steerBlend;
        blip.vy += (targetVy - blip.vy) * steerBlend;

        if (!blip.hovered && (Math.abs(blip.vx) > 1.5 || Math.abs(blip.vy) > 1.5)) {
          blip.wanderAngle = Math.atan2(blip.vy, blip.vx);
        }

        blip.x += blip.vx * dt;
        blip.y += blip.vy * dt;

        // Hard circular clamp fallback
        const nextCx = blip.x + size / 2;
        const nextCy = blip.y + size / 2;
        const nextDx = nextCx - center;
        const nextDy = nextCy - center;
        const nextDist = Math.hypot(nextDx, nextDy);
        if (nextDist > maxR && nextDist > 0) {
          const clampScale = maxR / nextDist;
          blip.x = center + nextDx * clampScale - size / 2;
          blip.y = center + nextDy * clampScale - size / 2;
        }

        // Trigger sonar ping when leading beam edge sweeps past blip clockwise from 12 o'clock
        const clockAngle = (Math.atan2(nextDx, -nextDy) + Math.PI * 2) % (Math.PI * 2);
        const angleDiff = (sweepRad - clockAngle + Math.PI * 2) % (Math.PI * 2);
        if (angleDiff < 0.24) {
          blip.ping = 1;
        } else {
          blip.ping *= Math.exp(-2.1 * dt);
        }
      }

      // Soft separation between nearby blips
      const minSpacing = size + 10;
      for (let i = 0; i < blips.length; i++) {
        const a = blips[i];
        if (lockedSetRef.current.has(a.id)) continue;
        for (let j = i + 1; j < blips.length; j++) {
          const b = blips[j];
          if (lockedSetRef.current.has(b.id)) continue;

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > 0.01 && distSq < minSpacing * minSpacing) {
            const dist = Math.sqrt(distSq);
            const strength = (minSpacing - dist) / minSpacing;
            const nx = dx / dist;
            const ny = dy / dist;
            const repel = strength * 18 * dt;
            a.vx -= nx * repel;
            a.vy -= ny * repel;
            b.vx += nx * repel;
            b.vy += ny * repel;
          }
        }
      }

      // Write GPU transforms & sonar ping intensity directly to DOM
      for (let i = 0; i < blips.length; i++) {
        const blip = blips[i];
        if (lockedSetRef.current.has(blip.id)) continue;

        const node = blipNodeRefs.current[blip.id];
        if (node) {
          node.style.transform = `translate3d(${blip.x.toFixed(1)}px, ${blip.y.toFixed(1)}px, 0)`;
        }

        const pingRing = blipPingRefs.current[blip.id];
        if (pingRing) {
          const ringScale = 1 + (1 - blip.ping) * 0.45;
          pingRing.style.opacity = (blip.ping * 0.85).toFixed(2);
          pingRing.style.transform = `scale(${ringScale.toFixed(2)})`;
        }
      }

      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [shouldReduceMotion]);

  const handleRadarSurfaceClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const radarEl = radarRef.current;
    if (!radarEl) return;
    const rect = radarEl.getBoundingClientRect();
    spawnPulse(e.clientX - rect.left, e.clientY - rect.top, 'sonar');
  };

  const handleLockBlip = (item: TechFishItem, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const radarEl = radarRef.current;
    const blip = blipStateRef.current.find((b) => b.id === item.id);
    const size = getBlipSize(diameterRef.current);

    if (radarEl && e.clientX > 0 && e.clientY > 0) {
      const rect = radarEl.getBoundingClientRect();
      spawnPulse(e.clientX - rect.left, e.clientY - rect.top, 'lock', item.accentColor);
    } else if (blip) {
      spawnPulse(blip.x + size / 2, blip.y + size / 2, 'lock', item.accentColor);
    }

    setLockedIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
    setActiveLockedId(item.id);
  };

  const handleReleaseOne = (id: TechFishId) => {
    const diameter = diameterRef.current;
    const blip = blipStateRef.current.find((b) => b.id === id);
    const item = TECH_POND_ITEMS.find((entry) => entry.id === id);

    if (blip) {
      respawnBlipOnRadar(blip, diameter);
      const size = getBlipSize(diameter);
      spawnPulse(blip.x + size / 2, blip.y + size / 2, 'sonar', item?.accentColor);
    }

    setLockedIds((prev) => {
      const next = prev.filter((itemId) => itemId !== id);
      if (activeLockedId === id) {
        setActiveLockedId(next.length > 0 ? next[next.length - 1] : null);
      }
      return next;
    });
  };

  const handleResetRadar = () => {
    const diameter = diameterRef.current;
    blipStateRef.current = createInitialBlipState(diameter);
    setLockedIds([]);
    setActiveLockedId(null);
    spawnPulse(diameter / 2, diameter / 2, 'sonar');
  };

  const setBlipHovered = (id: TechFishId, hovered: boolean) => {
    const blip = blipStateRef.current.find((b) => b.id === id);
    if (blip) blip.hovered = hovered;
  };

  const lockedItems = lockedIds
    .map((id) => TECH_POND_ITEMS.find((item) => item.id === id))
    .filter((item): item is TechFishItem => Boolean(item));

  const activeItem =
    (activeLockedId && TECH_POND_ITEMS.find((item) => item.id === activeLockedId)) ||
    (lockedItems.length > 0 ? lockedItems[lockedItems.length - 1] : null);

  const patrollingItems = TECH_POND_ITEMS.filter((item) => !lockedIds.includes(item.id));
  const allLocked = lockedIds.length === TECH_POND_ITEMS.length;

  return (
    <div
      id="tech-radar"
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#f0d8e6] dark:border-[#2f1f4d] bg-gradient-to-br from-[#fff5fa] via-[#fcf2ff] to-[#f2f8ff] dark:from-[#140d22] dark:via-[#110b29] dark:to-[#091329] shadow-[0_12px_36px_rgba(168,85,247,0.08)] dark:shadow-[0_16px_42px_rgba(0,0,0,0.48)] select-none transition-colors duration-300"
    >
      {/* Subtle Vice Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#ff3b9a]/10 dark:bg-[#ff3b9a]/14 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-16 w-96 h-96 rounded-full bg-[#00d9ff]/14 dark:bg-[#00d9ff]/12 blur-3xl"
      />

      {/* Top Radar Header Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-5 sm:px-7 pt-4 sm:pt-5 pb-2">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-[#18102e]/85 border border-[#ff3b9a]/25 dark:border-[#00d9ff]/25 font-space text-[11px] sm:text-xs font-bold text-[#1a1026] dark:text-[#67e8f9] uppercase tracking-wider shadow-2xs backdrop-blur-md">
            <Radar className="w-3.5 h-3.5 text-[#ff3b9a] dark:text-[#00d9ff]" />
            <span>{t.techRadar.badge}</span>
          </span>
          <span className="hidden md:inline-block font-space text-xs text-[#523e63] dark:text-[#b4a0ce] font-medium">
            {t.techRadar.hint}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 dark:bg-[#18102e]/85 border border-[#ff3b9a]/25 dark:border-[#ff3b9a]/35 font-space text-xs font-bold text-[#1a1026] dark:text-[#fdf7ff] shadow-2xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#ff3b9a] animate-pulse" />
            <span>
              {lockedIds.length} / {TECH_POND_ITEMS.length} {t.techRadar.lockedLabel}
            </span>
          </span>

          {lockedIds.length > 0 && (
            <button
              type="button"
              onClick={handleResetRadar}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#ff3b9a] to-[#ff8a4c] hover:brightness-110 text-white font-space text-xs font-bold transition-all duration-150 cursor-pointer shadow-xs active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a]"
              title={t.techRadar.resetAll}
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.techRadar.resetAll}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Split Tactical HUD: Radar Dish (Left) + Target Dossier & Tray (Right) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center px-5 sm:px-7 py-4 sm:py-6">
        {/* Left: Circular GTA Vice City Sonar Radar */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <div
            ref={radarRef}
            onClick={handleRadarSurfaceClick}
            role="region"
            aria-label={t.techRadar.ariaLabel}
            className="relative w-full max-w-[320px] sm:max-w-[380px] aspect-square rounded-full cursor-crosshair overflow-hidden border border-[#ff3b9a]/25 dark:border-[#00d9ff]/30 bg-gradient-to-b from-[#fff2fa] via-[#f6f4ff] to-[#e9f7ff] dark:from-[#160f30] dark:via-[#0d1433] dark:to-[#07162b] shadow-[inset_0_0_40px_rgba(255,59,154,0.08),0_10px_30px_rgba(139,61,255,0.12)] dark:shadow-[inset_0_0_50px_rgba(0,217,255,0.12),0_12px_36px_rgba(0,0,0,0.55)]"
          >
            {/* Faint Vice City Arterial Grid & Radar Rings SVG */}
            <svg
              viewBox="0 0 360 360"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full"
            >
              {/* Leonida / Vice City stylized street grid & coastal curve */}
              <g className="stroke-[#a855f7]/12 dark:stroke-[#00d9ff]/10" strokeWidth="1" fill="none">
                <path d="M 35 125 L 325 125 M 35 235 L 325 235 M 125 35 L 125 325 M 235 35 L 235 325" />
                <path d="M 215 18 C 245 75, 232 145, 275 198 C 306 236, 286 298, 250 344" strokeDasharray="4 4" />
                <path d="M 55 72 L 168 185 L 118 302" />
              </g>

              {/* Concentric Range Circles */}
              <g className="stroke-[#ff3b9a]/20 dark:stroke-[#00d9ff]/20" strokeWidth="1" fill="none">
                <circle cx="180" cy="180" r="168" />
                <circle cx="180" cy="180" r="126" strokeDasharray="3 5" />
                <circle cx="180" cy="180" r="84" />
                <circle cx="180" cy="180" r="42" strokeDasharray="2 4" />
                <line x1="180" y1="8" x2="180" y2="352" opacity="0.45" />
                <line x1="8" y1="180" x2="352" y2="180" opacity="0.45" />
              </g>
            </svg>

            {/* Rotating Conic Sonar Beam */}
            <div
              ref={sweepRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 292deg, rgba(255, 59, 154, 0.08) 328deg, rgba(0, 217, 255, 0.28) 358deg, rgba(255, 59, 154, 0.45) 360deg)',
                transform: 'rotate(24deg)',
              }}
            />

            {/* Cardinal Compass Badges */}
            <span aria-hidden="true" className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold text-[#ff3b9a] dark:text-[#00d9ff]">
              N
            </span>
            <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold text-[#7b648f]/70 dark:text-cyan-300/60">
              S
            </span>
            <span aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-[9px] font-bold text-[#7b648f]/70 dark:text-cyan-300/60">
              W
            </span>
            <span aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[9px] font-bold text-[#7b648f]/70 dark:text-cyan-300/60">
              E
            </span>

            {/* Center Origin Beacon */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#ff3b9a] shadow-[0_0_12px_rgba(255,59,154,0.8)] ring-4 ring-[#ff3b9a]/20 z-10"
            />

            {/* Sonar Click & Target Lock Pulses */}
            {pulses.map((pulse) => (
              <React.Fragment key={pulse.id}>
                <span
                  aria-hidden="true"
                  style={{
                    left: pulse.x,
                    top: pulse.y,
                    borderColor: pulse.variant === 'lock' ? (pulse.color ?? '#ff3b9a') : undefined,
                  }}
                  className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 animate-radar-ripple ${
                    pulse.variant === 'lock'
                      ? 'w-16 h-16 opacity-90'
                      : 'w-14 h-14 border-[#ff3b9a]/55 dark:border-[#00d9ff]/60'
                  }`}
                />
                <span
                  aria-hidden="true"
                  style={{
                    left: pulse.x,
                    top: pulse.y,
                    borderColor: pulse.variant === 'lock' ? (pulse.color ?? '#ff3b9a') : undefined,
                  }}
                  className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border animate-radar-ripple-outer ${
                    pulse.variant === 'lock'
                      ? 'w-20 h-20 opacity-60'
                      : 'w-16 h-16 border-[#00d9ff]/40 dark:border-[#ff3b9a]/40'
                  }`}
                />
              </React.Fragment>
            ))}

            {/* All Targets Locked Celebration Overlay */}
            <AnimatePresence>
              {allLocked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8 pointer-events-none bg-white/40 dark:bg-[#0b0614]/55 backdrop-blur-xs"
                >
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-[#18102e]/95 border border-[#ff3b9a]/40 text-[#ff3b9a] font-space text-xs font-bold uppercase tracking-wider shadow-sm mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.techRadar.allLockedTitle}</span>
                  </div>
                  <p className="font-space text-xs sm:text-sm font-medium text-[#1a1026] dark:text-cyan-100 m-0">
                    {t.techRadar.allLockedSub}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Patrolling Tech Blips */}
            {patrollingItems.map((item) => (
              <div
                key={item.id}
                ref={(el) => {
                  blipNodeRefs.current[item.id] = el;
                }}
                style={{ willChange: 'transform' }}
                className="absolute top-0 left-0 z-10"
              >
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.65 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.16 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                  onClick={(e) => handleLockBlip(item, e)}
                  onMouseEnter={() => setBlipHovered(item.id, true)}
                  onMouseLeave={() => setBlipHovered(item.id, false)}
                  onFocus={() => setBlipHovered(item.id, true)}
                  onBlur={() => setBlipHovered(item.id, false)}
                  aria-label={`${t.techRadar.lockAction} ${item.name}`}
                  title={`${item.name} — ${t.techRadar.lockAction}`}
                  className="group/blip relative w-[38px] h-[38px] sm:w-[44px] sm:h-[44px] rounded-full bg-white/85 dark:bg-[#171133]/88 backdrop-blur-md ring-1 ring-[#ff3b9a]/25 dark:ring-[#00d9ff]/30 shadow-[0_4px_14px_rgba(139,61,255,0.16)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.5)] hover:ring-2 hover:ring-[#ff3b9a] dark:hover:ring-[#ff3b9a] hover:shadow-[0_0_20px_rgba(255,59,154,0.5)] flex items-center justify-center cursor-pointer transition-[box-shadow] duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a]"
                >
                  {/* Dynamic Sonar Sweep Ping Ring */}
                  <span
                    ref={(el) => {
                      blipPingRefs.current[item.id] = el;
                    }}
                    aria-hidden="true"
                    style={{ borderColor: item.accentColor, opacity: 0 }}
                    className="pointer-events-none absolute -inset-1.5 rounded-full border-2"
                  />

                  {/* Crisp Tech Logo */}
                  <TechBrandIcon id={item.id} className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />

                  {/* Hover Target Tag */}
                  <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#1a1026] dark:bg-white text-white dark:text-[#0b0614] font-space text-[10px] font-bold whitespace-nowrap opacity-0 group-hover/blip:opacity-100 group-focus-visible/blip:opacity-100 transition-opacity shadow-sm z-20">
                    {item.name}
                  </span>
                </motion.button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Tactical Target Dossier & Locked Stack Tray */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          {/* Active Target Dossier Panel */}
          <div className="rounded-2xl p-4 sm:p-5 bg-white/80 dark:bg-[#120b24]/80 backdrop-blur-md border border-white/80 dark:border-[#362259]/80 shadow-xs min-h-[146px] flex flex-col justify-center transition-colors">
            {activeItem ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#fff4fa] dark:bg-[#1c1336] border border-[#f0d8e6] dark:border-[#3a275e] flex items-center justify-center shrink-0">
                      <TechBrandIcon id={activeItem.id} className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-hegarty text-lg sm:text-xl text-[#1a1026] dark:text-[#fdf7ff] leading-tight">
                        {activeItem.name}
                      </div>
                      <span className="inline-block font-space text-[10px] font-bold uppercase tracking-wider text-[#d61f7a] dark:text-[#67e8f9]">
                        {activeItem.category[language]}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ff3b9a]/12 text-[#ff3b9a] font-mono text-[10px] font-bold uppercase">
                    <Crosshair className="w-3 h-3" />
                    <span>{t.techRadar.targetLockedTag}</span>
                  </span>
                </div>

                <p className="font-space text-xs sm:text-sm text-[#523e63] dark:text-[#d6c7e8] m-0 leading-relaxed">
                  {activeItem.usedIn[language]}
                </p>
              </div>
            ) : (
              <div className="space-y-2 text-left">
                <div className="inline-flex items-center gap-1.5 font-space text-xs font-bold uppercase tracking-wider text-[#ff3b9a]">
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>{t.techRadar.standbyTitle}</span>
                </div>
                <p className="font-space text-xs sm:text-sm text-[#523e63] dark:text-[#b4a0ce] m-0 leading-relaxed">
                  {t.techRadar.emptyTray}
                </p>
                <span className="inline-block font-space text-[11px] font-semibold text-[#7b648f] dark:text-[#00d9ff]/80 uppercase tracking-wider pt-1">
                  14 {t.techRadar.stackCountLabel}
                </span>
              </div>
            )}
          </div>

          {/* Locked Targets Collector Chips */}
          <div className="rounded-2xl p-4 bg-white/65 dark:bg-[#120b24]/65 backdrop-blur-md border border-white/70 dark:border-[#2f1f4d]/80 min-h-[112px] flex flex-col justify-between gap-2.5 transition-colors">
            <div className="flex items-center justify-between text-[11px] font-space font-bold uppercase tracking-wider text-[#7b648f] dark:text-[#b4a0ce]">
              <span>{t.techRadar.trayTitle}</span>
              <span>
                {lockedItems.length}/{TECH_POND_ITEMS.length}
              </span>
            </div>

            {lockedItems.length === 0 ? (
              <p className="font-space text-xs text-[#8d74a3] dark:text-[#8f7cb0] m-0">
                {t.techRadar.trayPlaceholder}
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-2" role="list" aria-label={t.techRadar.lockedListAria}>
                {lockedItems.map((item) => {
                  const isActive = activeItem?.id === item.id;
                  return (
                    <motion.div
                      layout={!shouldReduceMotion}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                      key={item.id}
                      role="listitem"
                      className={`inline-flex items-center gap-1.5 pl-2 pr-1.5 py-1 rounded-full border font-space text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-[#ff3b9a] to-[#ff8a4c] text-white border-transparent shadow-xs'
                          : 'bg-white/90 dark:bg-[#1b1232]/90 text-[#1a1026] dark:text-[#fdf7ff] border-[#eed4e4] dark:border-[#39265c] hover:border-[#ff3b9a]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveLockedId(item.id)}
                        className="inline-flex items-center gap-1.5 cursor-pointer focus:outline-hidden"
                      >
                        <TechBrandIcon id={item.id} className="w-4 h-4 shrink-0" />
                        <span>{item.name}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReleaseOne(item.id)}
                        aria-label={`${t.techRadar.releaseOne} ${item.name}`}
                        title={`${t.techRadar.releaseOne} ${item.name}`}
                        className={`p-0.5 rounded-full transition-colors cursor-pointer ${
                          isActive
                            ? 'hover:bg-white/20 text-white/90'
                            : 'hover:bg-black/10 dark:hover:bg-white/10 text-[#7b648f] dark:text-[#b4a0ce]'
                        }`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
