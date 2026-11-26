import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Layers, RotateCcw, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../../context/useLanguage';
import {
  TECH_POND_ITEMS,
  TECH_ROLE_SECTORS,
  type TechFishId,
  type TechFishItem,
  type TechRoleId,
} from '../../data/techPond';
import { TechBrandIcon } from '../TechBrandIcon';
import { ViceAmbientBackdrop } from '../ViceAmbientBackdrop';

interface OrbitOrbState {
  id: TechFishId;
  role: TechRoleId;
  lane: 0 | 1;
  baseAngle: number;
  angle: number;
  phase: number;
  x: number;
  y: number;
  hovered: boolean;
}

interface SnapPulse {
  id: number;
  x: number;
  y: number;
  color: string;
}

const DEFAULT_DIAMETER = 380;
const ORB_SIZE_DESKTOP = 42;
const ORB_SIZE_MOBILE = 36;

// Geometry for the 4-sector GTA Weapon Wheel in 360x360 SVG coordinates
const WHEEL_SVG_CENTER = 180;
const WHEEL_INNER_R = 44;
const WHEEL_OUTER_R = 92;

interface SectorGeometry {
  id: TechRoleId;
  startDeg: number;
  endDeg: number;
  midDeg: number;
}

const SECTOR_GEOMETRIES: SectorGeometry[] = [
  { id: 'frontend', startDeg: -41, endDeg: 41, midDeg: 0 },
  { id: 'backend', startDeg: 49, endDeg: 131, midDeg: 90 },
  { id: 'ai-data', startDeg: 139, endDeg: 221, midDeg: 180 },
  { id: 'tooling', startDeg: 229, endDeg: 311, midDeg: 270 },
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeSectorPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startDeg: number,
  endDeg: number
): string {
  const outerStart = polarToCartesian(cx, cy, outerR, startDeg);
  const outerEnd = polarToCartesian(cx, cy, outerR, endDeg);
  const innerEnd = polarToCartesian(cx, cy, innerR, endDeg);
  const innerStart = polarToCartesian(cx, cy, innerR, startDeg);
  const largeArc = endDeg - startDeg <= 180 ? '0' : '1';

  return [
    `M ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x.toFixed(2)} ${outerEnd.y.toFixed(2)}`,
    `L ${innerEnd.x.toFixed(2)} ${innerEnd.y.toFixed(2)}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x.toFixed(2)} ${innerStart.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

function getOrbSize(diameter: number): number {
  return diameter < 340 ? ORB_SIZE_MOBILE : ORB_SIZE_DESKTOP;
}

function getOrbitPosition(
  lane: 0 | 1,
  angle: number,
  elapsed: number,
  phase: number,
  diameter: number
): { x: number; y: number } {
  const size = getOrbSize(diameter);
  const center = diameter / 2;
  const baseR = lane === 0 ? diameter * 0.34 : diameter * 0.43;
  const bobR = Math.sin(elapsed * 1.15 + phase) * 3.5;
  const r = baseR + bobR;

  return {
    x: center + Math.cos(angle) * r - size / 2,
    y: center + Math.sin(angle) * r - size / 2,
  };
}

function getActiveSectorAnchor(role: TechRoleId | 'all', diameter: number) {
  if (role === 'all') return null;
  const geom = SECTOR_GEOMETRIES.find((g) => g.id === role);
  if (!geom) return null;
  return polarToCartesian(diameter / 2, diameter / 2, (WHEEL_OUTER_R / 360) * diameter, geom.midDeg);
}

function syncOrbPosition(
  orb: OrbitOrbState,
  diameter: number,
  elapsed: number,
  laneOffsets: readonly [number, number]
) {
  orb.angle = orb.baseAngle + laneOffsets[orb.lane];
  const pos = getOrbitPosition(orb.lane, orb.angle, elapsed, orb.phase, diameter);
  orb.x = pos.x;
  orb.y = pos.y;
}

function syncOrbitAndApplyDom(
  orbs: OrbitOrbState[],
  equippedSet: ReadonlySet<TechFishId>,
  orbNodes: Partial<Record<TechFishId, HTMLDivElement | null>>,
  tetherLines: Partial<Record<TechFishId, SVGLineElement | null>>,
  diameter: number,
  activeRole: TechRoleId | 'all',
  elapsed?: number,
  laneOffsets?: readonly [number, number]
) {
  const size = getOrbSize(diameter);
  const anchorPt = getActiveSectorAnchor(activeRole, diameter);

  for (let i = 0; i < orbs.length; i++) {
    const orb = orbs[i];
    if (elapsed !== undefined && laneOffsets !== undefined) {
      // Keep equipped orbs synced to their live orbital slot so returning them never overlaps neighbors.
      syncOrbPosition(orb, diameter, elapsed, laneOffsets);
    }
    if (equippedSet.has(orb.id)) continue;

    const node = orbNodes[orb.id];
    if (node) {
      node.style.transform = `translate3d(${orb.x.toFixed(1)}px, ${orb.y.toFixed(1)}px, 0)`;
    }
    const line = tetherLines[orb.id];
    if (line && anchorPt && orb.role === activeRole) {
      line.setAttribute('x1', anchorPt.x.toFixed(1));
      line.setAttribute('y1', anchorPt.y.toFixed(1));
      line.setAttribute('x2', (orb.x + size / 2).toFixed(1));
      line.setAttribute('y2', (orb.y + size / 2).toFixed(1));
    }
  }
}

function createInitialOrbs(diameter: number): OrbitOrbState[] {
  const innerCount = Math.ceil(TECH_POND_ITEMS.length / 2);
  const outerCount = TECH_POND_ITEMS.length - innerCount;

  return TECH_POND_ITEMS.map((item, idx) => {
    const lane: 0 | 1 = idx % 2 === 0 ? 0 : 1;
    const laneIdx = Math.floor(idx / 2);
    const laneTotal = lane === 0 ? innerCount : outerCount;
    const baseAngle = (laneIdx / laneTotal) * Math.PI * 2 + (lane === 1 ? Math.PI / laneTotal : 0);
    const phase = idx * 0.85;
    const pos = getOrbitPosition(lane, baseAngle, 0, phase, diameter);

    return {
      id: item.id,
      role: item.role,
      lane,
      baseAngle,
      angle: baseAngle,
      phase,
      x: pos.x,
      y: pos.y,
      hovered: false,
    };
  });
}

export const ViceLoadoutCard: React.FC = () => {
  const { language, t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const [selectedRole, setSelectedRole] = useState<TechRoleId | 'all'>('all');
  const [equippedIds, setEquippedIds] = useState<TechFishId[]>([]);
  const [activeEquippedId, setActiveEquippedId] = useState<TechFishId | null>(null);
  const [pulses, setPulses] = useState<SnapPulse[]>([]);

  const stageRef = useRef<HTMLDivElement>(null);
  const orbNodeRefs = useRef<Partial<Record<TechFishId, HTMLDivElement | null>>>({});
  const tetherLineRefs = useRef<Partial<Record<TechFishId, SVGLineElement | null>>>({});
  const orbStateRef = useRef<OrbitOrbState[]>(createInitialOrbs(DEFAULT_DIAMETER));
  const laneOffsetsRef = useRef<[number, number]>([0, 0]);
  const elapsedRef = useRef<number>(0);
  const equippedSetRef = useRef<Set<TechFishId>>(new Set());
  const selectedRoleRef = useRef<TechRoleId | 'all'>('all');
  const diameterRef = useRef<number>(DEFAULT_DIAMETER);
  const pulseCounterRef = useRef(0);
  const timersRef = useRef<number[]>([]);

  useLayoutEffect(() => {
    equippedSetRef.current = new Set(equippedIds);
    selectedRoleRef.current = selectedRole;
    syncOrbitAndApplyDom(
      orbStateRef.current,
      equippedSetRef.current,
      orbNodeRefs.current,
      tetherLineRefs.current,
      diameterRef.current,
      selectedRole
    );
  }, [equippedIds, selectedRole]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  const spawnPulse = (x: number, y: number, color: string) => {
    const id = ++pulseCounterRef.current;
    setPulses((prev) => [...prev.slice(-5), { id, x, y, color }]);
    const timeoutId = window.setTimeout(() => {
      setPulses((prev) => prev.filter((p) => p.id !== id));
    }, 900);
    timersRef.current.push(timeoutId);
  };

  // Counter-rotating dual orbit simulation + live SVG tether tracking
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const updateBounds = () => {
      const d = stageEl.clientWidth || DEFAULT_DIAMETER;
      diameterRef.current = d;
      syncOrbitAndApplyDom(
        orbStateRef.current,
        equippedSetRef.current,
        orbNodeRefs.current,
        tetherLineRefs.current,
        d,
        selectedRoleRef.current,
        elapsedRef.current,
        laneOffsetsRef.current
      );
    };

    updateBounds();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateBounds);
      observer.observe(stageEl);
    }

    if (shouldReduceMotion) {
      return () => observer?.disconnect();
    }

    let rafId = 0;
    let lastTime = performance.now();
    let lane0Speed = 0.16;
    let lane1Speed = -0.11;

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsedRef.current += dt;

      const d = diameterRef.current;
      const orbs = orbStateRef.current;

      // Gently slow an orbital lane while any active orb in that lane is hovered
      let lane0Hovered = false;
      let lane1Hovered = false;
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        if (equippedSetRef.current.has(orb.id) || !orb.hovered) continue;
        if (orb.lane === 0) lane0Hovered = true;
        else lane1Hovered = true;
      }

      const targetSpeed0 = lane0Hovered ? 0.015 : 0.16;
      const targetSpeed1 = lane1Hovered ? -0.012 : -0.11;
      lane0Speed += (targetSpeed0 - lane0Speed) * Math.min(1, dt * 6);
      lane1Speed += (targetSpeed1 - lane1Speed) * Math.min(1, dt * 6);

      // Advance shared lane angles once per frame so all 7 slots per lane keep exact spacing.
      laneOffsetsRef.current[0] = (laneOffsetsRef.current[0] + lane0Speed * dt) % (Math.PI * 2);
      laneOffsetsRef.current[1] = (laneOffsetsRef.current[1] + lane1Speed * dt) % (Math.PI * 2);

      syncOrbitAndApplyDom(
        orbs,
        equippedSetRef.current,
        orbNodeRefs.current,
        tetherLineRefs.current,
        d,
        selectedRoleRef.current,
        elapsedRef.current,
        laneOffsetsRef.current
      );

      rafId = window.requestAnimationFrame(step);
    };

    rafId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [shouldReduceMotion]);

  const handleEquipOrb = (item: TechFishItem, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const orb = orbStateRef.current.find((o) => o.id === item.id);
    const size = getOrbSize(diameterRef.current);
    if (orb) {
      orb.hovered = false;
      spawnPulse(orb.x + size / 2, orb.y + size / 2, item.accentColor);
    }

    setEquippedIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
    setActiveEquippedId(item.id);
  };

  const handleUnequipOne = (id: TechFishId) => {
    const orb = orbStateRef.current.find((o) => o.id === id);
    const item = TECH_POND_ITEMS.find((entry) => entry.id === id);
    if (orb) {
      orb.hovered = false;
      const size = getOrbSize(diameterRef.current);
      spawnPulse(orb.x + size / 2, orb.y + size / 2, item?.accentColor ?? '#ff3b9a');
    }

    const next = equippedIds.filter((itemId) => itemId !== id);
    setEquippedIds((prev) => prev.filter((itemId) => itemId !== id));
    setActiveEquippedId((prevActive) => {
      if (prevActive !== id) return prevActive;
      return next.length > 0 ? next[next.length - 1] : null;
    });
  };

  const handleResetLoadout = () => {
    const d = diameterRef.current;
    laneOffsetsRef.current = [0, 0];
    elapsedRef.current = 0;
    orbStateRef.current = createInitialOrbs(d);
    const emptySet = new Set<TechFishId>();
    equippedSetRef.current = emptySet;
    syncOrbitAndApplyDom(
      orbStateRef.current,
      emptySet,
      orbNodeRefs.current,
      tetherLineRefs.current,
      d,
      'all'
    );
    setEquippedIds([]);
    setActiveEquippedId(null);
    setSelectedRole('all');
    spawnPulse(d / 2, d / 2, '#ff3b9a');
  };

  const handleToggleSector = (roleId: TechRoleId) => {
    setSelectedRole((prev) => (prev === roleId ? 'all' : roleId));
  };

  const setOrbHovered = (id: TechFishId, hovered: boolean) => {
    const orb = orbStateRef.current.find((o) => o.id === id);
    if (orb) orb.hovered = hovered;
  };

  const equippedItems = equippedIds
    .map((id) => TECH_POND_ITEMS.find((item) => item.id === id))
    .filter((item): item is TechFishItem => Boolean(item));

  const activeItem =
    (activeEquippedId && TECH_POND_ITEMS.find((item) => item.id === activeEquippedId)) ||
    (equippedItems.length > 0 ? equippedItems[equippedItems.length - 1] : null);

  const orbitingItems = TECH_POND_ITEMS.filter((item) => !equippedIds.includes(item.id));
  const activeSector =
    selectedRole === 'all' ? null : TECH_ROLE_SECTORS.find((s) => s.id === selectedRole) ?? null;
  const activeSectorOrbitCount = activeSector
    ? orbitingItems.filter((item) => item.role === activeSector.id).length
    : orbitingItems.length;
  const allEquipped = equippedIds.length === TECH_POND_ITEMS.length;

  return (
    <div
      id="tech-loadout"
      className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#f0d8e6] dark:border-[#2f1f4d] bg-[#fff9fc] dark:bg-[#130b22] shadow-[0_12px_36px_rgba(168,85,247,0.08)] dark:shadow-[0_16px_42px_rgba(0,0,0,0.48)] select-none transition-colors duration-300"
    >
      {/* Interactive Vice Sunset Aura (wanders randomly, approaches pointer on hover) */}
      <ViceAmbientBackdrop />

      {/* Top Loadout Header Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-5 sm:px-7 pt-4 sm:pt-5 pb-2">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-[#18102e]/85 border border-[#ff3b9a]/25 dark:border-[#a855f7]/35 font-space text-[11px] sm:text-xs font-bold text-[#1a1026] dark:text-[#e9d5ff] uppercase tracking-wider shadow-2xs backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-[#ff3b9a]" />
            <span>{t.techLoadout.badge}</span>
          </span>
          <span className="hidden md:inline-block font-space text-xs text-[#523e63] dark:text-[#b4a0ce] font-medium">
            {t.techLoadout.hint}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 dark:bg-[#18102e]/85 border border-[#ff3b9a]/25 dark:border-[#ff3b9a]/35 font-space text-xs font-bold text-[#1a1026] dark:text-[#fdf7ff] shadow-2xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#ff3b9a]" />
            <span>
              {equippedIds.length} / {TECH_POND_ITEMS.length} {t.techLoadout.equippedLabel}
            </span>
          </span>

          {(equippedIds.length > 0 || selectedRole !== 'all') && (
            <button
              type="button"
              onClick={handleResetLoadout}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#ff3b9a] to-[#ff8a4c] hover:brightness-110 text-white font-space text-xs font-bold transition-all duration-150 cursor-pointer shadow-xs active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a]"
              title={t.techLoadout.resetAll}
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.techLoadout.resetAll}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Split HUD: Weapon Wheel + Orbits (Left) & Loadout Dossier (Right) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center px-5 sm:px-7 py-4 sm:py-6">
        {/* Left: GTA Weapon Wheel & Dual Floating Orbits */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <div
            ref={stageRef}
            role="region"
            aria-label={t.techLoadout.ariaLabel}
            className="relative w-full max-w-[330px] sm:max-w-[390px] aspect-square flex items-center justify-center"
          >
            {/* Outer Orbital Guide Rings + Dynamic Tethers */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
            >
              {/* Inner & outer orbit tracks */}
              <circle
                cx="50%"
                cy="50%"
                r="34%"
                fill="none"
                className="stroke-[#ff3b9a]/14 dark:stroke-[#a855f7]/20"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <circle
                cx="50%"
                cy="50%"
                r="43%"
                fill="none"
                className="stroke-[#00d9ff]/18 dark:stroke-[#00d9ff]/18"
                strokeWidth="1"
                strokeDasharray="3 7"
              />

              {/* Live energy tethers connecting active sector to matching orbiting orbs */}
              {activeSector &&
                orbitingItems
                  .filter((item) => item.role === activeSector.id)
                  .map((item) => (
                    <line
                      key={`tether-${item.id}`}
                      ref={(el) => {
                        tetherLineRefs.current[item.id] = el;
                      }}
                      stroke={activeSector.color}
                      strokeWidth="1.5"
                      strokeOpacity="0.45"
                      strokeDasharray="4 4"
                    />
                  ))}
            </svg>

            {/* GTA Weapon Wheel 4-Sector SVG Layer */}
            <svg
              viewBox="0 0 360 360"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 w-full h-full"
            >
              {SECTOR_GEOMETRIES.map((geom) => {
                const sector = TECH_ROLE_SECTORS.find((s) => s.id === geom.id)!;
                const isSelected = selectedRole === geom.id;
                const pathD = describeSectorPath(
                  WHEEL_SVG_CENTER,
                  WHEEL_SVG_CENTER,
                  WHEEL_INNER_R,
                  WHEEL_OUTER_R,
                  geom.startDeg,
                  geom.endDeg
                );

                return (
                  <path
                    key={geom.id}
                    d={pathD}
                    fill={sector.color}
                    fillOpacity={isSelected ? 0.28 : 0.08}
                    stroke={sector.color}
                    strokeWidth={isSelected ? 2 : 1.1}
                    strokeOpacity={isSelected ? 0.95 : 0.35}
                    className="transition-all duration-200"
                  />
                );
              })}
            </svg>

            {/* Accessible Interactive Sector Buttons Positioned on the 4 Quadrants */}
            {SECTOR_GEOMETRIES.map((geom) => {
              const sector = TECH_ROLE_SECTORS.find((s) => s.id === geom.id)!;
              const isSelected = selectedRole === geom.id;
              const midR = (WHEEL_INNER_R + WHEEL_OUTER_R) / 2;
              const posPct = polarToCartesian(50, 50, (midR / 360) * 100, geom.midDeg);
              const countInSector = orbitingItems.filter((item) => item.role === geom.id).length;

              return (
                <button
                  key={geom.id}
                  type="button"
                  onClick={() => handleToggleSector(geom.id)}
                  aria-pressed={isSelected}
                  aria-label={`${t.techLoadout.filterSector} ${sector.label[language]}`}
                  style={{ left: `${posPct.x}%`, top: `${posPct.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 px-2 py-1 rounded-lg font-space text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wide leading-none cursor-pointer transition-all duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a] ${
                    isSelected
                      ? 'text-[#1a1026] dark:text-white scale-105'
                      : 'text-[#523e63] dark:text-[#cbb9e3] hover:text-[#1a1026] dark:hover:text-white'
                  }`}
                >
                  <span className="block whitespace-nowrap">{sector.shortLabel}</span>
                  <span
                    style={{ color: sector.color }}
                    className="block text-[9px] font-mono font-bold mt-0.5"
                  >
                    {countInSector}
                  </span>
                </button>
              );
            })}

            {/* Center Weapon Wheel Hub (Reset Filter / Active Sector Summary) */}
            <button
              type="button"
              onClick={() => setSelectedRole('all')}
              aria-label={t.techLoadout.showAll}
              title={t.techLoadout.showAll}
              className="relative z-20 w-[74px] h-[74px] sm:w-[82px] sm:h-[82px] rounded-full bg-white/95 dark:bg-[#171030]/95 border-2 border-[#ff3b9a]/40 dark:border-[#ff3b9a]/50 shadow-[0_0_24px_rgba(255,59,154,0.22)] flex flex-col items-center justify-center text-center cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a]"
            >
              <span
                style={activeSector ? { color: activeSector.color } : undefined}
                className="font-hegarty text-[10px] sm:text-[11px] uppercase tracking-wider text-[#1a1026] dark:text-[#fdf7ff] leading-tight px-1"
              >
                {activeSector ? activeSector.shortLabel : t.techLoadout.allLabel}
              </span>
              <span className="font-mono text-[10px] font-bold text-[#7b648f] dark:text-[#b4a0ce] mt-0.5">
                {activeSectorOrbitCount} {t.techLoadout.orbitUnit}
              </span>
            </button>

            {/* Snap Pulses on Equip / Unequip */}
            {pulses.map((pulse) => (
              <React.Fragment key={pulse.id}>
                <span
                  aria-hidden="true"
                  style={{ left: pulse.x, top: pulse.y, borderColor: pulse.color }}
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 animate-radar-ripple"
                />
                <span
                  aria-hidden="true"
                  style={{ left: pulse.x, top: pulse.y, borderColor: pulse.color }}
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border animate-radar-ripple-outer"
                />
              </React.Fragment>
            ))}

            {/* All Equipped Overlay */}
            <AnimatePresence>
              {allEquipped && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25 }}
                  className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center p-6"
                >
                  <div className="px-4 py-2 rounded-full bg-white/95 dark:bg-[#18102e]/95 border border-[#ff3b9a]/45 text-[#ff3b9a] font-space text-xs font-bold uppercase tracking-wider shadow-lg inline-flex items-center gap-1.5 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.techLoadout.allEquippedTitle}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Orbiting Tech Orbs */}
            {orbitingItems.map((item) => {
              const isHighlighted = selectedRole === 'all' || item.role === selectedRole;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    orbNodeRefs.current[item.id] = el;
                  }}
                  style={{ willChange: 'transform' }}
                  className="absolute top-0 left-0 z-20"
                >
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.65 }}
                    animate={{
                      opacity: isHighlighted ? 1 : 0.28,
                      scale: isHighlighted && selectedRole !== 'all' ? 1.08 : 1,
                    }}
                    whileHover={{ scale: 1.18, opacity: 1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                    onClick={(e) => handleEquipOrb(item, e)}
                    onMouseEnter={() => setOrbHovered(item.id, true)}
                    onMouseLeave={() => setOrbHovered(item.id, false)}
                    onFocus={() => setOrbHovered(item.id, true)}
                    onBlur={() => setOrbHovered(item.id, false)}
                    aria-label={`${t.techLoadout.equipAction} ${item.name}`}
                    title={`${item.name} — ${t.techLoadout.equipAction}`}
                    className="group/orb relative w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] rounded-full bg-white/90 dark:bg-[#181133]/92 backdrop-blur-md ring-1 ring-[#f0d8e6] dark:ring-[#3a275e] shadow-[0_6px_18px_rgba(139,61,255,0.14)] dark:shadow-[0_6px_18px_rgba(0,0,0,0.48)] hover:ring-2 hover:ring-[#ff3b9a] dark:hover:ring-[#ff3b9a] hover:shadow-[0_0_20px_rgba(255,59,154,0.45)] flex items-center justify-center cursor-pointer transition-[box-shadow] duration-150 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#ff3b9a]"
                  >
                    <TechBrandIcon id={item.id} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />

                    {/* Hover Name Pill */}
                    <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#1a1026] dark:bg-white text-white dark:text-[#0b0614] font-space text-[10px] font-bold whitespace-nowrap opacity-0 group-hover/orb:opacity-100 group-focus-visible/orb:opacity-100 transition-opacity shadow-sm z-30">
                      {item.name}
                    </span>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Vice Loadout Inspector & Equipped Chips Deck */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          {/* Active Tech or Active Sector Inspector */}
          <div className="rounded-2xl p-4 sm:p-5 bg-white/80 dark:bg-[#120b24]/80 backdrop-blur-md border border-white/80 dark:border-[#362259]/80 shadow-xs min-h-[152px] flex flex-col justify-center transition-colors">
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
                    <Layers className="w-3 h-3" />
                    <span>{t.techLoadout.equippedTag}</span>
                  </span>
                </div>

                <p className="font-space text-xs sm:text-sm text-[#523e63] dark:text-[#d6c7e8] m-0 leading-relaxed">
                  {activeItem.usedIn[language]}
                </p>
              </div>
            ) : activeSector ? (
              <div className="space-y-2 text-left">
                <div
                  style={{ color: activeSector.color }}
                  className="inline-flex items-center gap-1.5 font-space text-xs font-bold uppercase tracking-wider"
                >
                  <span
                    style={{ backgroundColor: activeSector.color }}
                    className="w-2 h-2 rounded-full"
                  />
                  <span>{activeSector.label[language]}</span>
                </div>
                <p className="font-space text-xs sm:text-sm text-[#523e63] dark:text-[#d6c7e8] m-0 leading-relaxed">
                  {activeSector.summary[language]}
                </p>
                <span className="inline-block font-space text-[11px] font-semibold text-[#7b648f] dark:text-[#b4a0ce] pt-1">
                  {t.techLoadout.sectorHint}
                </span>
              </div>
            ) : (
              <div className="space-y-2 text-left">
                <div className="inline-flex items-center gap-1.5 font-space text-xs font-bold uppercase tracking-wider text-[#ff3b9a]">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t.techLoadout.standbyTitle}</span>
                </div>
                <p className="font-space text-xs sm:text-sm text-[#523e63] dark:text-[#b4a0ce] m-0 leading-relaxed">
                  {t.techLoadout.emptyTray}
                </p>
                <span className="inline-block font-space text-[11px] font-semibold text-[#7b648f] dark:text-[#00d9ff]/80 uppercase tracking-wider pt-1">
                  14 {t.techLoadout.stackCountLabel}
                </span>
              </div>
            )}
          </div>

          {/* Equipped Loadout Slots / Chips */}
          <div className="rounded-2xl p-4 bg-white/65 dark:bg-[#120b24]/65 backdrop-blur-md border border-white/70 dark:border-[#2f1f4d]/80 min-h-[118px] flex flex-col justify-between gap-2.5 transition-colors">
            <div className="flex items-center justify-between text-[11px] font-space font-bold uppercase tracking-wider text-[#7b648f] dark:text-[#b4a0ce]">
              <span>{t.techLoadout.trayTitle}</span>
              <span>
                {equippedItems.length}/{TECH_POND_ITEMS.length}
              </span>
            </div>

            {equippedItems.length === 0 ? (
              <p className="font-space text-xs text-[#8d74a3] dark:text-[#8f7cb0] m-0">
                {t.techLoadout.trayPlaceholder}
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-2" role="list" aria-label={t.techLoadout.equippedListAria}>
                {equippedItems.map((item) => {
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
                        onClick={() => setActiveEquippedId(item.id)}
                        className="inline-flex items-center gap-1.5 cursor-pointer focus:outline-hidden"
                      >
                        <TechBrandIcon id={item.id} className="w-4 h-4 shrink-0" />
                        <span>{item.name}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUnequipOne(item.id)}
                        aria-label={`${t.techLoadout.releaseOne} ${item.name}`}
                        title={`${t.techLoadout.releaseOne} ${item.name}`}
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
