import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { RotateCcw, Sparkles, Waves, X } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import { TECH_POND_ITEMS, type TechFishId, type TechFishItem } from '../../data/techPond';
import { TechBrandIcon } from '../TechBrandIcon';

interface FishPhysics {
  id: TechFishId;
  x: number;
  y: number;
  vx: number;
  vy: number;
  wanderAngle: number;
  baseSpeed: number;
  glidePhase: number;
  glideFreq: number;
  turnBias: number;
  nextBiasAt: number;
  facingRight: boolean;
  hovered: boolean;
}

interface RippleEffect {
  id: number;
  x: number;
  y: number;
  variant: 'water' | 'catch';
  color?: string;
}

const DEFAULT_WIDTH = 760;
const DEFAULT_HEIGHT = 330;
const FISH_SIZE_DESKTOP = 52;
const FISH_SIZE_MOBILE = 44;
const POND_PAD_X = 18;
const POND_PAD_TOP = 18;
const POND_PAD_BOTTOM = 18;

function getFishSize(width: number): number {
  return width < 540 ? FISH_SIZE_MOBILE : FISH_SIZE_DESKTOP;
}

function createInitialFishState(width: number, height: number): FishPhysics[] {
  const size = getFishSize(width);
  const usableW = Math.max(120, width - POND_PAD_X * 2 - size);
  const usableH = Math.max(120, height - POND_PAD_TOP - POND_PAD_BOTTOM - size);
  const cols = width < 540 ? 4 : 5;
  const rows = Math.ceil(TECH_POND_ITEMS.length / cols);

  return TECH_POND_ITEMS.map((item, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const cellW = usableW / Math.max(1, cols - 1);
    const cellH = usableH / Math.max(1, rows - 1);
    const jitterX = ((idx * 37) % 21) - 10;
    const jitterY = ((idx * 29) % 19) - 9;

    const x = Math.min(
      POND_PAD_X + usableW,
      Math.max(POND_PAD_X, POND_PAD_X + col * cellW + jitterX)
    );
    const y = Math.min(
      POND_PAD_TOP + usableH,
      Math.max(POND_PAD_TOP, POND_PAD_TOP + row * cellH + jitterY)
    );

    const baseSpeed = 30 + (idx % 5) * 5;
    const angle = (idx * 1.37) % (Math.PI * 2);

    return {
      id: item.id,
      x,
      y,
      vx: Math.cos(angle) * baseSpeed,
      vy: Math.sin(angle) * baseSpeed,
      wanderAngle: angle,
      baseSpeed,
      glidePhase: idx * 0.85,
      glideFreq: 1.35 + (idx % 4) * 0.25,
      turnBias: (idx % 2 === 0 ? 1 : -1) * 0.22,
      nextBiasAt: 2.2 + (idx % 4),
      facingRight: Math.cos(angle) >= 0,
      hovered: false,
    };
  });
}

function respawnFishInPond(fish: FishPhysics, width: number, height: number): void {
  const size = getFishSize(width);
  const spreadX = Math.max(40, width - POND_PAD_X * 2 - size);
  const spreadY = Math.max(40, height - POND_PAD_TOP - POND_PAD_BOTTOM - size);
  const angle = Math.random() * Math.PI * 2;
  fish.x = POND_PAD_X + Math.random() * spreadX;
  fish.y = POND_PAD_TOP + Math.random() * spreadY;
  fish.wanderAngle = angle;
  fish.vx = Math.cos(angle) * fish.baseSpeed * 0.85;
  fish.vy = Math.sin(angle) * fish.baseSpeed * 0.85;
  fish.facingRight = Math.cos(angle) >= 0;
  fish.hovered = false;
}

export const TechPondCard: React.FC = () => {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [caughtIds, setCaughtIds] = useState<TechFishId[]>([]);
  const [activeCaughtId, setActiveCaughtId] = useState<TechFishId | null>(null);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);

  const pondRef = useRef<HTMLDivElement>(null);
  const fishNodeRefs = useRef<Partial<Record<TechFishId, HTMLDivElement | null>>>({});
  const fishTailRefs = useRef<Partial<Record<TechFishId, HTMLSpanElement | null>>>({});
  const fishStateRef = useRef<FishPhysics[]>(createInitialFishState(DEFAULT_WIDTH, DEFAULT_HEIGHT));
  const caughtSetRef = useRef<Set<TechFishId>>(new Set());
  const boundsRef = useRef<{ width: number; height: number }>({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  });
  const rippleCounterRef = useRef(0);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    caughtSetRef.current = new Set(caughtIds);
    fishStateRef.current.forEach((fish) => {
      if (caughtSetRef.current.has(fish.id)) return;
      const node = fishNodeRefs.current[fish.id];
      if (node) {
        node.style.transform = `translate3d(${fish.x.toFixed(1)}px, ${fish.y.toFixed(1)}px, 0)`;
      }
    });
  }, [caughtIds]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  const spawnRipple = (
    x: number,
    y: number,
    variant: 'water' | 'catch' = 'water',
    color?: string
  ) => {
    const id = ++rippleCounterRef.current;
    setRipples((prev) => [...prev.slice(-7), { id, x, y, variant, color }]);
    const timeoutId = window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 950);
    timersRef.current.push(timeoutId);
  };

  // Smooth velocity-based fluid swimming loop (zero rigid wall snaps)
  useEffect(() => {
    const pondEl = pondRef.current;
    if (!pondEl) return;

    const updateBounds = () => {
      const w = pondEl.clientWidth || DEFAULT_WIDTH;
      const h = pondEl.clientHeight || DEFAULT_HEIGHT;
      const wasDefault =
        boundsRef.current.width === DEFAULT_WIDTH && boundsRef.current.height === DEFAULT_HEIGHT;
      boundsRef.current = { width: w, height: h };

      if (wasDefault && w !== DEFAULT_WIDTH) {
        fishStateRef.current = createInitialFishState(w, h);
      } else {
        const size = getFishSize(w);
        const maxX = Math.max(POND_PAD_X, w - POND_PAD_X - size);
        const maxY = Math.max(POND_PAD_TOP, h - POND_PAD_BOTTOM - size);
        fishStateRef.current.forEach((fish) => {
          fish.x = Math.min(maxX, Math.max(POND_PAD_X, fish.x));
          fish.y = Math.min(maxY, Math.max(POND_PAD_TOP, fish.y));
        });
      }
    };

    updateBounds();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateBounds);
      observer.observe(pondEl);
    }

    if (shouldReduceMotion) {
      const { width, height } = boundsRef.current;
      fishStateRef.current = createInitialFishState(width, height);
      fishStateRef.current.forEach((fish) => {
        const node = fishNodeRefs.current[fish.id];
        if (node) {
          node.style.transform = `translate3d(${fish.x.toFixed(1)}px, ${fish.y.toFixed(1)}px, 0)`;
        }
      });
      return () => observer?.disconnect();
    }

    let rafId = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += dt;

      const { width, height } = boundsRef.current;
      const size = getFishSize(width);
      const minX = POND_PAD_X;
      const maxX = Math.max(minX + 10, width - POND_PAD_X - size);
      const minY = POND_PAD_TOP;
      const maxY = Math.max(minY + 10, height - POND_PAD_BOTTOM - size);
      const fishes = fishStateRef.current;
      const softMargin = 64;

      for (let i = 0; i < fishes.length; i++) {
        const fish = fishes[i];
        if (caughtSetRef.current.has(fish.id)) continue;

        if (elapsed >= fish.nextBiasAt) {
          fish.turnBias = (Math.random() - 0.5) * 0.7;
          fish.nextBiasAt = elapsed + 2.2 + Math.random() * 2.8;
        }

        // Gentle glide-and-coast cadence like a real fish
        const glideWave = 0.78 + 0.32 * Math.sin(elapsed * fish.glideFreq + fish.glidePhase);
        const desiredSpeed = fish.hovered ? 5 : fish.baseSpeed * glideWave;

        // Smooth wander angle drift
        const meander = Math.sin(elapsed * 0.9 + fish.glidePhase) * 0.45 + fish.turnBias;
        fish.wanderAngle += meander * dt;

        // Desired velocity vector
        let targetVx = Math.cos(fish.wanderAngle) * desiredSpeed;
        let targetVy = Math.sin(fish.wanderAngle) * desiredSpeed;

        // Soft quadratic inward current near pond margins so fish bank gracefully instead of bouncing
        if (fish.x < minX + softMargin) {
          const tEdge = 1 - Math.max(0, fish.x - minX) / softMargin;
          targetVx += tEdge * tEdge * 85;
        } else if (fish.x > maxX - softMargin) {
          const tEdge = 1 - Math.max(0, maxX - fish.x) / softMargin;
          targetVx -= tEdge * tEdge * 85;
        }

        if (fish.y < minY + softMargin) {
          const tEdge = 1 - Math.max(0, fish.y - minY) / softMargin;
          targetVy += tEdge * tEdge * 85;
        } else if (fish.y > maxY - softMargin) {
          const tEdge = 1 - Math.max(0, maxY - fish.y) / softMargin;
          targetVy -= tEdge * tEdge * 85;
        }

        // Smooth velocity damping/steering (inertial glide)
        const steerBlend = Math.min(1, dt * (fish.hovered ? 6.5 : 2.2));
        fish.vx += (targetVx - fish.vx) * steerBlend;
        fish.vy += (targetVy - fish.vy) * steerBlend;

        // Keep wanderAngle aligned with curved trajectory after banking near edges
        if (!fish.hovered && (Math.abs(fish.vx) > 2 || Math.abs(fish.vy) > 2)) {
          fish.wanderAngle = Math.atan2(fish.vy, fish.vx);
        }

        fish.x += fish.vx * dt;
        fish.y += fish.vy * dt;

        // Gentle containment clamp without jarring direction snap
        if (fish.x < minX) {
          fish.x = minX;
          fish.vx = Math.abs(fish.vx) * 0.4;
        } else if (fish.x > maxX) {
          fish.x = maxX;
          fish.vx = -Math.abs(fish.vx) * 0.4;
        }
        if (fish.y < minY) {
          fish.y = minY;
          fish.vy = Math.abs(fish.vy) * 0.4;
        } else if (fish.y > maxY) {
          fish.y = maxY;
          fish.vy = -Math.abs(fish.vy) * 0.4;
        }

        // Hysteresis prevents rapid tail-flipping when gliding nearly vertically
        if (fish.vx > 6) fish.facingRight = true;
        else if (fish.vx < -6) fish.facingRight = false;
      }

      // Smooth school separation force (adds to velocity & soft position offset)
      const minSpacing = size + 14;
      for (let i = 0; i < fishes.length; i++) {
        const a = fishes[i];
        if (caughtSetRef.current.has(a.id)) continue;
        for (let j = i + 1; j < fishes.length; j++) {
          const b = fishes[j];
          if (caughtSetRef.current.has(b.id)) continue;

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > 0.01 && distSq < minSpacing * minSpacing) {
            const dist = Math.sqrt(distSq);
            const strength = (minSpacing - dist) / minSpacing;
            const nx = dx / dist;
            const ny = dy / dist;
            const repelVel = strength * 26 * dt;
            const nudgePos = strength * 14 * dt;

            a.vx -= nx * repelVel;
            a.vy -= ny * repelVel;
            b.vx += nx * repelVel;
            b.vy += ny * repelVel;

            a.x = Math.min(maxX, Math.max(minX, a.x - nx * nudgePos));
            a.y = Math.min(maxY, Math.max(minY, a.y - ny * nudgePos));
            b.x = Math.min(maxX, Math.max(minX, b.x + nx * nudgePos));
            b.y = Math.min(maxY, Math.max(minY, b.y + ny * nudgePos));
          }
        }
      }

      // Apply silky GPU transforms directly
      for (let i = 0; i < fishes.length; i++) {
        const fish = fishes[i];
        if (caughtSetRef.current.has(fish.id)) continue;
        const node = fishNodeRefs.current[fish.id];
        if (!node) continue;

        const bankDeg = Math.max(-9, Math.min(9, fish.vy * 0.14 * (fish.facingRight ? 1 : -1)));
        const gentleSway = Math.sin(elapsed * 2.2 + fish.glidePhase) * 2.4;
        const tiltDeg = bankDeg + gentleSway;
        node.style.transform = `translate3d(${fish.x.toFixed(1)}px, ${fish.y.toFixed(1)}px, 0) rotate(${tiltDeg.toFixed(1)}deg)`;

        const tail = fishTailRefs.current[fish.id];
        if (tail) {
          tail.style.transform = fish.facingRight
            ? 'translateX(-100%) scaleX(1)'
            : 'translateX(100%) scaleX(-1)';
          tail.style.left = fish.facingRight ? '4px' : 'auto';
          tail.style.right = fish.facingRight ? 'auto' : '4px';
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

  const handlePondClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const pondEl = pondRef.current;
    if (!pondEl) return;
    const rect = pondEl.getBoundingClientRect();
    spawnRipple(e.clientX - rect.left, e.clientY - rect.top, 'water');
  };

  const handleCatchFish = (item: TechFishItem, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const pondEl = pondRef.current;
    const fishState = fishStateRef.current.find((f) => f.id === item.id);
    const size = getFishSize(boundsRef.current.width);

    if (pondEl && e.clientX > 0 && e.clientY > 0) {
      const rect = pondEl.getBoundingClientRect();
      spawnRipple(e.clientX - rect.left, e.clientY - rect.top, 'catch', item.accentColor);
    } else if (fishState) {
      spawnRipple(fishState.x + size / 2, fishState.y + size / 2, 'catch', item.accentColor);
    }

    setCaughtIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
    setActiveCaughtId(item.id);
  };

  const handleReleaseOne = (id: TechFishId) => {
    const { width, height } = boundsRef.current;
    const fishState = fishStateRef.current.find((f) => f.id === id);
    const item = TECH_POND_ITEMS.find((entry) => entry.id === id);

    if (fishState) {
      respawnFishInPond(fishState, width, height);
      const size = getFishSize(width);
      spawnRipple(fishState.x + size / 2, fishState.y + size / 2, 'water', item?.accentColor);
    }

    setCaughtIds((prev) => {
      const next = prev.filter((itemId) => itemId !== id);
      if (activeCaughtId === id) {
        setActiveCaughtId(next.length > 0 ? next[next.length - 1] : null);
      }
      return next;
    });
  };

  const handleReleaseAll = () => {
    const { width, height } = boundsRef.current;
    fishStateRef.current = createInitialFishState(width, height);
    setCaughtIds([]);
    setActiveCaughtId(null);
    spawnRipple(width / 2, height / 2, 'water');
  };

  const setFishHovered = (id: TechFishId, hovered: boolean) => {
    const fish = fishStateRef.current.find((f) => f.id === id);
    if (fish) fish.hovered = hovered;
  };

  const caughtItems = caughtIds
    .map((id) => TECH_POND_ITEMS.find((item) => item.id === id))
    .filter((item): item is TechFishItem => Boolean(item));

  const activeItem =
    (activeCaughtId && TECH_POND_ITEMS.find((item) => item.id === activeCaughtId)) ||
    (caughtItems.length > 0 ? caughtItems[caughtItems.length - 1] : null);

  const swimmingItems = TECH_POND_ITEMS.filter((item) => !caughtIds.includes(item.id));
  const allCaught = caughtIds.length === TECH_POND_ITEMS.length;

  return (
    <div
      id="tech-pond"
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#f0d8e6] dark:border-[#2f1f4d] bg-gradient-to-br from-[#fff5fa] via-[#e4f9ff] to-[#fff1f8] dark:from-[#140d22] dark:via-[#0d1838] dark:to-[#130c26] shadow-[0_12px_36px_rgba(168,85,247,0.08)] dark:shadow-[0_16px_42px_rgba(0,0,0,0.48)] select-none transition-colors duration-300"
    >
      {/* Drifting Water Caustic Reflections (blends smoothly without harsh inner box) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-16 w-80 h-80 rounded-full bg-[#ff3b9a]/12 dark:bg-[#ff3b9a]/16 blur-3xl animate-pond-caustic"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-12 w-96 h-96 rounded-full bg-[#00d9ff]/18 dark:bg-[#00d9ff]/16 blur-3xl animate-pond-caustic"
        style={{ animationDelay: '-6s' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-48 rounded-full bg-[#ff8a4c]/10 dark:bg-[#8b3dff]/14 blur-3xl"
      />

      {/* Floating Header Controls (sits softly in the upper water) */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-5 sm:px-7 pt-4 sm:pt-5 pointer-events-none">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/75 dark:bg-[#140d26]/75 border border-[#ff3b9a]/20 dark:border-cyan-400/20 font-space text-[11px] sm:text-xs font-bold text-[#1a1026] dark:text-cyan-200 uppercase tracking-wider shadow-2xs backdrop-blur-md">
            <Waves className="w-3.5 h-3.5 text-[#0891b2] dark:text-[#00d9ff]" />
            <span>{t.techPond.badge}</span>
          </span>
          <span className="hidden md:inline-block font-space text-xs text-[#523e63]/85 dark:text-cyan-100/70 font-medium">
            {t.techPond.hint}
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-[#140d26]/75 border border-[#ff3b9a]/20 dark:border-[#ff3b9a]/30 font-space text-xs font-bold text-[#1a1026] dark:text-[#fdf7ff] shadow-2xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#ff3b9a]" />
            <span>
              {caughtIds.length} / {TECH_POND_ITEMS.length} {t.techPond.caughtLabel}
            </span>
          </span>

          {caughtIds.length > 0 && (
            <button
              type="button"
              onClick={handleReleaseAll}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#ff3b9a] to-[#ff8a4c] hover:brightness-110 text-white font-space text-xs font-bold transition-all duration-150 cursor-pointer shadow-xs active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a]"
              title={t.techPond.releaseAll}
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.techPond.releaseAll}</span>
            </button>
          )}
        </div>
      </div>

      {/* Seamless Swimming Pond Stage */}
      <div
        ref={pondRef}
        onClick={handlePondClick}
        className="relative w-full h-[300px] sm:h-[340px] cursor-crosshair overflow-hidden"
        role="region"
        aria-label={t.techPond.ariaLabel}
      >
        {/* Soft gradient feather at top & bottom of swim stage */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white/55 dark:from-[#0e081c]/70 to-transparent z-0"
        />

        {/* Dual-Ring Water & Catch Ripples */}
        {ripples.map((ripple) => (
          <React.Fragment key={ripple.id}>
            <span
              aria-hidden="true"
              style={{
                left: ripple.x,
                top: ripple.y,
                borderColor: ripple.variant === 'catch' ? (ripple.color ?? '#ff3b9a') : undefined,
              }}
              className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 animate-pond-ripple ${
                ripple.variant === 'catch'
                  ? 'w-20 h-20 opacity-90'
                  : 'w-14 h-14 border-cyan-500/45 dark:border-cyan-300/50'
              }`}
            />
            <span
              aria-hidden="true"
              style={{
                left: ripple.x,
                top: ripple.y,
                borderColor: ripple.variant === 'catch' ? (ripple.color ?? '#ff3b9a') : undefined,
              }}
              className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border animate-pond-ripple-outer ${
                ripple.variant === 'catch'
                  ? 'w-24 h-24 opacity-60'
                  : 'w-16 h-16 border-white/60 dark:border-[#ff3b9a]/35'
              }`}
            />
          </React.Fragment>
        ))}

        {/* All Caught Celebration Inside Pond */}
        <AnimatePresence>
          {allCaught && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 dark:bg-[#140d26]/90 border border-[#ff3b9a]/35 text-[#ff3b9a] font-space text-xs font-bold uppercase tracking-wider shadow-sm mb-2 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.techPond.allCaughtTitle}</span>
              </div>
              <p className="font-space text-sm sm:text-base font-medium text-[#1a1026] dark:text-cyan-100 max-w-md m-0">
                {t.techPond.allCaughtSub}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Swimming Tech Stack Fish */}
        {swimmingItems.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              fishNodeRefs.current[item.id] = el;
            }}
            style={{ willChange: 'transform' }}
            className="absolute top-0 left-0 z-10"
          >
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              onClick={(e) => handleCatchFish(item, e)}
              onMouseEnter={() => setFishHovered(item.id, true)}
              onMouseLeave={() => setFishHovered(item.id, false)}
              onFocus={() => setFishHovered(item.id, true)}
              onBlur={() => setFishHovered(item.id, false)}
              aria-label={`${t.techPond.catchAction} ${item.name}`}
              title={`${item.name} — ${t.techPond.catchAction}`}
              className="group/fish relative w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-full bg-white/75 dark:bg-[#181030]/75 backdrop-blur-md ring-1 ring-white/80 dark:ring-cyan-300/20 shadow-[0_8px_22px_rgba(14,116,144,0.12)] dark:shadow-[0_8px_22px_rgba(0,0,0,0.45)] hover:ring-2 hover:ring-[#ff3b9a] dark:hover:ring-[#ff3b9a] hover:shadow-[0_0_24px_rgba(255,59,154,0.38)] flex items-center justify-center cursor-pointer transition-[box-shadow] duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a]"
            >
              {/* Soft underwater ambient halo matching brand accent */}
              <span
                aria-hidden="true"
                style={{ backgroundColor: item.accentColor }}
                className="pointer-events-none absolute inset-1 rounded-full opacity-10 group-hover/fish:opacity-25 blur-sm transition-opacity"
              />

              {/* Organic wagging translucent fish tail fin */}
              <span
                ref={(el) => {
                  fishTailRefs.current[item.id] = el;
                }}
                aria-hidden="true"
                style={{ left: '4px', transform: 'translateX(-100%) scaleX(1)' }}
                className="pointer-events-none absolute top-1/2 -mt-2.5 w-3.5 h-5 opacity-60 group-hover/fish:opacity-95 transition-opacity"
              >
                <svg
                  viewBox="0 0 14 20"
                  fill="none"
                  className="w-full h-full origin-right animate-pond-tail"
                  style={{ animationDelay: `${(idx % 5) * -0.25}s` }}
                >
                  <path
                    d="M13 10C9.5 8 5.2 4.2 1.2 2C3.5 6.8 3.5 13.2 1.2 18C5.2 15.8 9.5 12 13 10Z"
                    fill={item.accentColor}
                    fillOpacity="0.65"
                  />
                </svg>
              </span>

              {/* Crisp Tech Logo */}
              <span className="relative z-10 transition-transform duration-150 group-hover/fish:scale-110">
                <TechBrandIcon id={item.id} className="w-6 h-6 sm:w-7 sm:h-7" />
              </span>

              {/* Hover Name Tag */}
              <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#1a1026] dark:bg-white text-white dark:text-[#0b0614] font-space text-[10px] font-bold whitespace-nowrap opacity-0 group-hover/fish:opacity-100 group-focus-visible/fish:opacity-100 transition-opacity shadow-sm">
                {item.name}
              </span>
            </motion.button>
          </div>
        ))}
      </div>

      {/* Frosted Floating Collector Dock (seamless bottom transition, no hard border wall) */}
      <div className="relative z-20 mx-3 sm:mx-5 mb-3 sm:mb-5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white/75 dark:bg-[#120b24]/75 backdrop-blur-md border border-white/70 dark:border-[#362259]/70 shadow-xs transition-colors">
        {caughtItems.length === 0 ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="font-space text-xs sm:text-sm text-[#523e63] dark:text-cyan-100/85 font-medium m-0">
              {t.techPond.emptyTray}
            </p>
            <span className="font-space text-[11px] text-[#7b648f] dark:text-[#ff78bc]/85 font-semibold uppercase tracking-wider">
              14 {t.techPond.stackCountLabel}
            </span>
          </div>
        ) : (
          <div className="space-y-2.5">
            {/* Caught Tech Chips */}
            <div className="flex flex-wrap items-center gap-2" role="list" aria-label={t.techPond.caughtListAria}>
              {caughtItems.map((item) => {
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
                      onClick={() => setActiveCaughtId(item.id)}
                      className="inline-flex items-center gap-1.5 cursor-pointer focus:outline-hidden"
                    >
                      <TechBrandIcon id={item.id} className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReleaseOne(item.id)}
                      aria-label={`${t.techPond.releaseOne} ${item.name}`}
                      title={`${t.techPond.releaseOne} ${item.name}`}
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

            {/* Active Caught Tech Detail Strip */}
            {activeItem && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-2 border-t border-[#ff3b9a]/12 dark:border-white/10">
                <div className="inline-flex items-center gap-2 shrink-0">
                  <TechBrandIcon id={activeItem.id} className="w-5 h-5" />
                  <span className="font-hegarty text-sm sm:text-base text-[#1a1026] dark:text-[#fdf7ff]">
                    {activeItem.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ff3b9a]/12 dark:bg-[#00d9ff]/15 text-[#d61f7a] dark:text-[#67e8f9] font-space text-[10px] font-bold uppercase tracking-wider">
                    {activeItem.category[language]}
                  </span>
                </div>
                <p className="font-space text-xs sm:text-[13px] text-[#523e63] dark:text-[#d6c7e8] m-0 leading-relaxed">
                  {activeItem.usedIn[language]}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
