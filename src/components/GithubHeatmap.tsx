import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useLanguage } from '../context/useLanguage';
import { motion, AnimatePresence } from 'motion/react';
import { GitHubIcon } from './Icons';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  total: {
    [key: string]: number;
  };
  contributions: ContributionDay[];
}

const CACHE_KEY = 'github_contributions_Vannnd1';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

function getInitialCache(): ApiResponse | null {
  if (typeof window === 'undefined') return null;
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const parsed = JSON.parse(cached);
    if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.data) {
      return parsed.data;
    }
  } catch {
    return null;
  }
  return null;
}

function groupIntoWeeks(allDays: ContributionDay[]): ContributionDay[][] {
  const weekCols: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  allDays.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weekCols.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    weekCols.push(currentWeek);
  }
  return weekCols;
}

export const GithubHeatmap: React.FC = () => {
  const { language, t } = useLanguage();
  
  const [weeks, setWeeks] = useState<ContributionDay[][]>(() => {
    const cached = getInitialCache();
    if (cached?.contributions && cached.contributions.length > 0) {
      return groupIntoWeeks(cached.contributions);
    }
    return [];
  });

  const [totalContributions, setTotalContributions] = useState<number | null>(() => {
    const cached = getInitialCache();
    if (cached?.total) {
      return cached.total?.lastYear ?? Object.values(cached.total)[0] ?? 0;
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(() => !getInitialCache());
  const [hasError, setHasError] = useState<boolean>(false);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const fetchContributions = async () => {
      try {
        setHasError(false);

        const res = await fetch('https://github-contributions-api.jogruber.de/v4/Vannnd1?y=last', {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Failed to fetch contributions');
        const data: ApiResponse = await res.json();

        if (!data || !data.total || !Array.isArray(data.contributions)) {
          throw new Error('Malformed API response');
        }

        const total = data.total?.lastYear ?? Object.values(data.total)[0] ?? 0;
        setTotalContributions(total);

        const allDays = data.contributions;
        if (allDays.length === 0) {
          setWeeks([]);
          setIsLoading(false);
          return;
        }

        const weekCols = groupIntoWeeks(allDays);
        setWeeks(weekCols);
        setIsLoading(false);

        // Cache valid response
        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), data })
          );
        } catch {
          // Ignore storage quota errors
        }

        // Auto-scroll to the right so recent commits are prominently visible
        scrollTimeout = setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
          }
        }, 150);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setIsLoading(false);
        setHasError(true);
      }
    };

    fetchContributions();

    return () => {
      controller.abort();
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  // Map each week column index to its month label when a month starts
  // Avoid overlapping if two month transitions are closer than 3 weeks
  const monthMap = useMemo(() => {
    const map = new Map<number, string>();
    if (weeks.length === 0) return map;

    let lastMonth = '';
    let lastColIdx = -10;

    weeks.forEach((col, idx) => {
      if (!col[0]?.date) return;
      const firstDayDate = new Date(col[0].date);
      const monthName = firstDayDate.toLocaleString(language === 'id' ? 'id-ID' : 'en-US', {
        month: 'short',
      });
      if (monthName !== lastMonth) {
        // Only place label if there is sufficient space from the previous month
        if (idx - lastColIdx >= 3 || lastColIdx === -10) {
          map.set(idx, monthName);
          lastColIdx = idx;
        }
        lastMonth = monthName;
      }
    });

    return map;
  }, [weeks, language]);

  // Unified color palette for dots & legend (Harmonized with signature #fd4aa6)
  const getColor = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-[#db2777] shadow-[0_0_8px_rgba(219,39,119,0.4)]'; // rich deep magenta
      case 3:
        return 'bg-[#fd4aa6] shadow-[0_0_6px_rgba(253,74,166,0.35)]'; // signature electric hot pink
      case 2:
        return 'bg-[#f472b6]'; // medium vibrant pink
      case 1:
        return 'bg-[#fbcfe8]'; // soft blush pink
      default:
        return 'bg-[#f1f3f5] hover:bg-[#e9ecef] border border-black/[0.03]'; // crisp light neutral
    }
  };

  // Day label mapping: Row 1 = Mon, Row 3 = Wed, Row 5 = Fri
  const dayRowMap: Record<number, string> = {
    1: t.heatmap.days[0], // Mon / Sen
    3: t.heatmap.days[1], // Wed / Rab
    5: t.heatmap.days[2], // Fri / Jum
  };

  return (
    <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs hover:shadow-sm transition-all duration-300">
      {/* ── CARD HEADER: Live Status, Identity & Tooltip Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-2 border-b border-[#F3F4F6]">
        {/* User Identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
            <GitHubIcon className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-semibold text-xs sm:text-sm text-[#111318] tracking-tight">
              Vannnd1
            </span>
            <span className="text-[10px] text-[#9CA3AF] font-sans">
              GitHub Contribution Graph
            </span>
          </div>
        </div>

        {/* Dynamic Tooltip / Active Day Indicator */}
        <div className="h-6 text-[11px] font-sans text-center sm:text-right text-[#6B7280] flex items-center sm:justify-end overflow-hidden">
          <AnimatePresence mode="wait">
            {hoveredDay ? (
              <motion.div
                key={hoveredDay.date}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-50 border border-neutral-200/60 text-[#111318] font-medium text-xs"
              >
                <strong className="text-[#fd4aa6] font-semibold">{hoveredDay.count}</strong>{' '}
                <span>
                  {hoveredDay.count === 1 ? t.heatmap.contribution : t.heatmap.contributions}{' '}
                  {t.heatmap.on}{' '}
                  {new Date(hoveredDay.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </motion.div>
            ) : (
              <motion.span
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-[#9CA3AF] text-[11px]"
              >
                {t.heatmap.tooltipHover}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── GRID VIEWPORT: Days Header + Column-Locked Dots ── */}
      <div className="flex items-start gap-2 pt-1 relative">
        {/* Day Labels on left: Perfectly row-aligned with 7 dot rows */}
        <div className="flex flex-col text-[10px] font-sans text-[#9CA3AF] select-none shrink-0">
          {/* Header spacer to match month row height: h-5 (20px) + mb-1.5 (6px) = 26px */}
          <div className="h-[26px]" aria-hidden="true" />
          
          {/* 7 Day slots matching rows 0 to 6 */}
          <div className="flex flex-col gap-[3.5px] sm:gap-1">
            {[0, 1, 2, 3, 4, 5, 6].map((rowIdx) => (
              <div
                key={rowIdx}
                className="w-6 h-2.5 sm:h-[11px] flex items-center justify-end pr-1.5"
              >
                {dayRowMap[rowIdx] && (
                  <span className="leading-none text-[9px] sm:text-[10px]">
                    {dayRowMap[rowIdx]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Matrix with Column-Locked Month Labels */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto scrollbar-none pb-1 relative"
        >
          {isLoading ? (
            /* Skeleton loading matching exact 53 columns x 7 rows */
            <div className="flex gap-[3.5px] sm:gap-1 min-w-max py-0.5">
              {Array.from({ length: 53 }).map((_, colIdx) => (
                <div key={colIdx} className="flex flex-col items-center">
                  <div className="h-5 w-full mb-1.5" />
                  <div className="flex flex-col gap-[3.5px] sm:gap-1">
                    {Array.from({ length: 7 }).map((_, rowIdx) => (
                      <div
                        key={rowIdx}
                        className="w-2.5 h-2.5 sm:w-[11px] sm:h-[11px] rounded-full bg-[#E5E7EB] animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : hasError ? (
            <div className="py-8 text-center w-full text-xs font-mono text-[#888]">
              {language === 'id'
                ? 'Gagal memuat visualisasi kontribusi. Kunjungi GitHub untuk melihat aktivitas terbaru.'
                : 'Failed to load contribution activity. Visit GitHub to inspect recent activity.'}
            </div>
          ) : weeks.length === 0 ? (
            <div className="py-8 text-center w-full text-xs font-mono text-[#888]">
              {language === 'id'
                ? 'Tidak ada riwayat kontribusi untuk periode ini.'
                : 'No contribution activity found for this period.'}
            </div>
          ) : (
            /* Main Contribution Grid */
            <div className="flex gap-[3.5px] sm:gap-1 min-w-max py-0.5">
              {weeks.map((week, colIdx) => {
                const monthLabel = monthMap.get(colIdx);
                return (
                  <div key={colIdx} className="flex flex-col items-center">
                    {/* Month Label Header Slot: Locked to this exact column */}
                    <div className="h-5 w-full relative mb-1.5">
                      {monthLabel && (
                        <span className="absolute left-0 top-0 text-[10px] sm:text-[11px] font-sans font-medium text-[#9CA3AF] whitespace-nowrap pointer-events-none select-none">
                          {monthLabel}
                        </span>
                      )}
                    </div>

                    {/* Week Column Dots */}
                    <div className="flex flex-col gap-[3.5px] sm:gap-1">
                      {week.map((day, rowIdx) => {
                        const formattedDate = new Date(day.date).toLocaleDateString(
                          language === 'id' ? 'id-ID' : 'en-US',
                          { month: 'short', day: 'numeric', year: 'numeric' }
                        );
                        const label = `${day.count} ${
                          day.count === 1 ? t.heatmap.contribution : t.heatmap.contributions
                        } ${t.heatmap.on} ${formattedDate}`;

                        return (
                          <div
                            key={rowIdx}
                            tabIndex={0}
                            role="button"
                            aria-label={label}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            onFocus={() => setHoveredDay(day)}
                            onBlur={() => setHoveredDay(null)}
                            className={`w-2.5 h-2.5 sm:w-[11px] sm:h-[11px] rounded-full transition-all duration-150 hover:scale-130 focus:scale-130 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#fd4aa6] focus-visible:ring-offset-1 ${getColor(
                              day.level
                            )}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER: Summary Link & Consistent Legend ── */}
      <div className="pt-3 mt-2 border-t border-[#F3F4F6] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#9CA3AF] font-sans select-none">
        <a
          href="https://github.com/Vannnd1"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[#4B5563] hover:text-[#fd4aa6] transition-colors inline-flex items-center gap-1.5 group"
        >
          <span>
            {isLoading
              ? (language === 'id' ? 'Memuat kontribusi...' : 'Loading contributions...')
              : hasError
                ? (language === 'id' ? 'Lihat profil GitHub @Vannnd1' : 'View GitHub profile @Vannnd1')
                : t.heatmap.yearSummary(totalContributions ?? 0)}
          </span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>

        {/* Synchronized Legend with Exact Same Color Tokens */}
        <div className="flex items-center gap-1.5 text-[10px] self-end sm:self-auto">
          <span>{t.heatmap.less}</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#f1f3f5] border border-black/[0.03]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#fbcfe8]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f472b6]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#fd4aa6]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#db2777]" />
          <span>{t.heatmap.more}</span>
        </div>
      </div>
    </div>
  );
};
