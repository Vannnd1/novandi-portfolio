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
  angle: number;
  speed: number;
  baseSpeed: number;
  wobblePhase: number;
  wobbleFreq: number;
  turnBias: number;
  nextBiasAt: number;
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
const DEFAULT_HEIGHT = 320;
const FISH_SIZE_DESKTOP = 54;
const FISH_SIZE_MOBILE = 46;
const POND_PAD_X = 24;
const POND_PAD_TOP = 64;
const POND_PAD_BOTTOM = 22;

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
    const jitterX = ((idx * 37) % 19) - 9;
    const jitterY = ((idx * 29) % 17) - 8;

    const x = Math.min(
      POND_PAD_X + usableW,
      Math.max(POND_PAD_X, POND_PAD_X + col * cellW + jitterX)
    );
    const y = Math.min(
      POND_PAD_TOP + usableH,
      Math.max(POND_PAD_TOP, POND_PAD_TOP + row * cellH + jitterY)
    );
    const baseSpeed = 34 + (idx % 5) * 6;

    return {
      id: item.id,
      x,
      y,
      angle: ((idx * 1.37) % (Math.PI * 2)),
      speed: baseSpeed,
      baseSpeed,
      wobblePhase: idx * 0.9,
      wobbleFreq: 2.1 + (idx % 4) * 0.35,
      turnBias: (idx % 2 === 0 ? 1 : -1) * 0.25,
      nextBiasAt: 2 + (idx % 4),
      hovered: false,
    };
  });
}

function normalizeAngle(rad: number): number {
  let a = rad;
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function respawnFishInPond(fish: FishPhysics, width: number, height: number): void {
  const size = getFishSize(width);
  const spreadX = Math.max(40, width - POND_PAD_X * 2 - size);
  const spreadY = Math.max(40, height - POND_PAD_TOP - POND_PAD_BOTTOM - size);
  fish.x = POND_PAD_X + Math.random() * spreadX;
  fish.y = POND_PAD_TOP + Math.random() * spreadY;
  fish.angle = Math.random() * Math.PI * 2;
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
    // Sync positions onto newly re-mounted nodes (e.g. after releasing a caught fish)
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
    setRipples((prev) => [...prev.slice(-6), { id, x, y, variant, color }]);
    const timeoutId = window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 750);
    timersRef.current.push(timeoutId);
  };

  // Sync pond dimensions & run 60fps organic fish swimming loop
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
      // Position fish neatly without continuous movement when reduced motion is preferred
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
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;
      const fishes = fishStateRef.current;

      // 1. Update steering, soft wall turn, and movement
      for (let i = 0; i < fishes.length; i++) {
        const fish = fishes[i];
        if (caughtSetRef.current.has(fish.id)) continue;

        if (elapsed >= fish.nextBiasAt) {
          fish.turnBias = (Math.random() - 0.5) * 0.9;
          fish.nextBiasAt = elapsed + 1.8 + Math.random() * 2.6;
        }

        const targetSpeed = fish.hovered ? 12 : fish.baseSpeed;
        fish.speed += (targetSpeed - fish.speed) * Math.min(1, dt * 6);

        // Organic tail-swim oscillation
        const swimCurve = Math.sin(elapsed * fish.wobbleFreq + fish.wobblePhase) * 0.65;
        fish.angle = normalizeAngle(fish.angle + (fish.turnBias + swimCurve) * dt);

        // Soft steering away from pond walls
        const edgeMargin = 42;
        if (
          fish.x < minX + edgeMargin ||
          fish.x > maxX - edgeMargin ||
          fish.y < minY + edgeMargin ||
          fish.y > maxY - edgeMargin
        ) {
          const toCenter = Math.atan2(centerY - fish.y, centerX - fish.x);
          const diff = normalizeAngle(toCenter - fish.angle);
          fish.angle = normalizeAngle(fish.angle + diff * Math.min(1, dt * 3.4));
        }

        fish.x += Math.cos(fish.angle) * fish.speed * dt;
        fish.y += Math.sin(fish.angle) * fish.speed * dt;

        // Hard clamp inside safe pond water
        if (fish.x < minX) {
          fish.x = minX;
          fish.angle = Math.PI - fish.angle;
        } else if (fish.x > maxX) {
          fish.x = maxX;
          fish.angle = Math.PI - fish.angle;
        }
        if (fish.y < minY) {
          fish.y = minY;
          fish.angle = -fish.angle;
        } else if (fish.y > maxY) {
          fish.y = maxY;
          fish.angle = -fish.angle;
        }
      }

      // 2. Soft separation so swimming logos glide past each other instead of overlapping
      const minSpacing = size + 10;
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
            const push = ((minSpacing - dist) / minSpacing) * 28 * dt;
            const nx = dx / dist;
            const ny = dy / dist;
            a.x = Math.min(maxX, Math.max(minX, a.x - nx * push));
            a.y = Math.min(maxY, Math.max(minY, a.y - ny * push));
            b.x = Math.min(maxX, Math.max(minX, b.x + nx * push));
            b.y = Math.min(maxY, Math.max(minY, b.y + ny * push));
          }
        }
      }

      // 3. Apply GPU transforms directly to DOM nodes
      for (let i = 0; i < fishes.length; i++) {
        const fish = fishes[i];
        if (caughtSetRef.current.has(fish.id)) continue;
        const node = fishNodeRefs.current[fish.id];
        if (!node) continue;

        const tiltDeg = Math.sin(elapsed * fish.wobbleFreq * 1.4 + fish.wobblePhase) * (fish.hovered ? 5 : 3.5);
        node.style.transform = `translate3d(${fish.x.toFixed(1)}px, ${fish.y.toFixed(1)}px, 0) rotate(${tiltDeg.toFixed(1)}deg)`;

        const tail = fishTailRefs.current[fish.id];
        if (tail) {
          const facingRight = Math.cos(fish.angle) >= 0;
          tail.style.transform = facingRight ? 'translateX(-100%) scaleX(1)' : 'translateX(100%) scaleX(-1)';
          tail.style.left = facingRight ? '4px' : 'auto';
          tail.style.right = facingRight ? 'auto' : '4px';
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

    if (fishState) {
      respawnFishInPond(fishState, width, height);
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
      className="relative w-full rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 bg-[#f2fafc] dark:bg-[#09121e] border border-[#c7e6ed] dark:border-[#1c3554] shadow-[0_12px_32px_rgba(14,116,144,0.08)] dark:shadow-[0_14px_36px_rgba(0,0,0,0.45)] overflow-hidden select-none transition-colors duration-300"
    >
      {/* Inner Water Pond Container */}
      <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-cyan-500/20 dark:border-sky-400/15 bg-gradient-to-br from-[#e3f8fc] via-[#c7eff8] to-[#aae2f2] dark:from-[#0c2238] dark:via-[#0a1a2e] dark:to-[#071321] shadow-inner transition-colors duration-300">
        {/* Ambient Water Caustics & Subtle Depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-45"
          style={{
            backgroundImage:
              'radial-gradient(circle at 18% 28%, rgba(255,255,255,0.65) 0%, transparent 38%), radial-gradient(circle at 82% 70%, rgba(56,189,248,0.28) 0%, transparent 45%), radial-gradient(circle at 52% 15%, rgba(253,74,166,0.08) 0%, transparent 35%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.08] bg-tech-grid"
        />

        {/* Top Pond Header Bar */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 pt-3.5 sm:pt-4 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-[#0e263f]/90 border border-cyan-600/20 dark:border-cyan-400/20 font-space text-[11px] sm:text-xs font-bold text-[#0e4b5f] dark:text-cyan-200 uppercase tracking-wider shadow-2xs backdrop-blur-xs">
              <Waves className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>{t.techPond.badge}</span>
            </span>
            <span className="hidden md:inline-block font-space text-xs text-[#155e75]/80 dark:text-cyan-100/70 font-medium">
              {t.techPond.hint}
            </span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 dark:bg-[#0e263f]/90 border border-cyan-600/20 dark:border-cyan-400/20 font-space text-xs font-bold text-[#0f172a] dark:text-white shadow-2xs backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#fd4aa6]" />
              <span>
                {caughtIds.length} / {TECH_POND_ITEMS.length} {t.techPond.caughtLabel}
              </span>
            </span>

            {caughtIds.length > 0 && (
              <button
                type="button"
                onClick={handleReleaseAll}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f172a] dark:bg-white hover:bg-[#fd4aa6] hover:dark:bg-[#fd4aa6] text-white dark:text-[#09090b] hover:dark:text-white font-space text-xs font-bold transition-colors duration-150 cursor-pointer shadow-xs active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#fd4aa6]"
                title={t.techPond.releaseAll}
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.techPond.releaseAll}</span>
              </button>
            )}
          </div>
        </div>

        {/* Swimming Pond Stage */}
        <div
          ref={pondRef}
          onClick={handlePondClick}
          className="relative w-full h-[300px] sm:h-[340px] cursor-crosshair overflow-hidden"
          role="region"
          aria-label={t.techPond.ariaLabel}
        >
          {/* Water & Catch Ripples */}
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              aria-hidden="true"
              style={{
                left: ripple.x,
                top: ripple.y,
                borderColor: ripple.variant === 'catch' ? (ripple.color ?? '#fd4aa6') : undefined,
              }}
              className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 animate-pond-ripple ${
                ripple.variant === 'catch'
                  ? 'w-20 h-20 opacity-90'
                  : 'w-14 h-14 border-white/75 dark:border-cyan-300/60'
              }`}
            />
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
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-[#0e263f]/95 border border-[#fd4aa6]/35 text-[#fd4aa6] font-space text-xs font-bold uppercase tracking-wider shadow-sm mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.techPond.allCaughtTitle}</span>
                </div>
                <p className="font-space text-sm sm:text-base font-medium text-[#0e4b5f] dark:text-cyan-100 max-w-md m-0">
                  {t.techPond.allCaughtSub}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Swimming Tech Stack Fish */}
          {swimmingItems.map((item) => (
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
                onClick={(e) => handleCatchFish(item, e)}
                onMouseEnter={() => setFishHovered(item.id, true)}
                onMouseLeave={() => setFishHovered(item.id, false)}
                onFocus={() => setFishHovered(item.id, true)}
                onBlur={() => setFishHovered(item.id, false)}
                aria-label={`${t.techPond.catchAction} ${item.name}`}
                title={`${item.name} — ${t.techPond.catchAction}`}
                className="group/fish relative w-[46px] h-[46px] sm:w-[54px] sm:h-[54px] rounded-full bg-white/90 dark:bg-[#102944]/90 backdrop-blur-xs border border-white/95 dark:border-cyan-300/25 shadow-[0_6px_18px_rgba(14,116,144,0.18)] dark:shadow-[0_6px_18px_rgba(0,0,0,0.45)] hover:border-[#fd4aa6] dark:hover:border-[#fd4aa6] hover:shadow-[0_0_20px_rgba(253,74,166,0.35)] flex items-center justify-center cursor-pointer transition-[border-color,box-shadow] duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#fd4aa6]"
              >
                {/* Translucent directional fish tail fin */}
                <span
                  ref={(el) => {
                    fishTailRefs.current[item.id] = el;
                  }}
                  aria-hidden="true"
                  style={{ left: '4px', transform: 'translateX(-100%) scaleX(1)' }}
                  className="pointer-events-none absolute top-1/2 -mt-2 w-3 h-4 opacity-55 group-hover/fish:opacity-90 transition-opacity"
                >
                  <svg viewBox="0 0 12 16" fill="none" className="w-full h-full">
                    <path
                      d="M11 8L1 2.2C2.8 5.8 2.8 10.2 1 13.8L11 8Z"
                      fill={item.accentColor}
                      fillOpacity="0.65"
                    />
                  </svg>
                </span>

                {/* Crisp Tech Logo */}
                <span className="relative z-10 transition-transform duration-150 group-hover/fish:scale-115">
                  <TechBrandIcon id={item.id} className="w-6 h-6 sm:w-7 sm:h-7" />
                </span>

                {/* Hover Name Tag */}
                <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#0f172a] dark:bg-white text-white dark:text-[#09090b] font-space text-[10px] font-bold whitespace-nowrap opacity-0 group-hover/fish:opacity-100 group-focus-visible/fish:opacity-100 transition-opacity shadow-sm">
                  {item.name}
                </span>
              </motion.button>
            </div>
          ))}
        </div>

        {/* Bottom Collector Dock */}
        <div className="relative z-20 px-4 sm:px-6 py-3.5 sm:py-4 bg-white/80 dark:bg-[#081626]/90 backdrop-blur-md border-t border-cyan-900/10 dark:border-cyan-300/15 transition-colors">
          {caughtItems.length === 0 ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="font-space text-xs sm:text-sm text-[#155e75] dark:text-cyan-100/80 font-medium m-0">
                {t.techPond.emptyTray}
              </p>
              <span className="font-space text-[11px] text-[#0e7490]/80 dark:text-cyan-300/60 font-semibold uppercase tracking-wider">
                14 {t.techPond.stackCountLabel}
              </span>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Caught Tech Chips */}
              <div className="flex flex-wrap items-center gap-2" role="list" aria-label={t.techPond.caughtListAria}>
                {caughtItems.map((item) => {
                  const isActive = activeItem?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      role="listitem"
                      className={`inline-flex items-center gap-1.5 pl-2 pr-1.5 py-1 rounded-full border font-space text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#0f172a] dark:bg-white text-white dark:text-[#09090b] border-[#0f172a] dark:border-white shadow-xs'
                          : 'bg-white/95 dark:bg-[#0f263f] text-[#0f172a] dark:text-cyan-50 border-cyan-900/15 dark:border-cyan-400/20 hover:border-[#fd4aa6]'
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
                            ? 'hover:bg-white/20 dark:hover:bg-black/15 text-white/80 dark:text-black/70'
                            : 'hover:bg-black/10 dark:hover:bg-white/10 text-[#64748b] dark:text-cyan-200/70'
                        }`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Active Caught Tech Detail Strip */}
              {activeItem && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-2.5 border-t border-cyan-900/10 dark:border-cyan-300/10">
                  <div className="inline-flex items-center gap-2 shrink-0">
                    <TechBrandIcon id={activeItem.id} className="w-5 h-5" />
                    <span className="font-hegarty text-sm sm:text-base text-[#0f172a] dark:text-white">
                      {activeItem.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 dark:bg-cyan-400/15 text-[#0e7490] dark:text-cyan-300 font-space text-[10px] font-bold uppercase tracking-wider">
                      {activeItem.category[language]}
                    </span>
                  </div>
                  <p className="font-space text-xs sm:text-[13px] text-[#334155] dark:text-cyan-100/85 m-0 leading-relaxed">
                    {activeItem.usedIn[language]}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
