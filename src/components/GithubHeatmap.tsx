import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useLanguage } from '../context/useLanguage';
import { motion, AnimatePresence } from 'motion/react';

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

export const GithubHeatmap: React.FC = () => {
  const { language, t } = useLanguage();
  const [weeks, setWeeks] = useState<ContributionDay[][]>([]);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const fetchContributions = async () => {
      try {
        setIsLoading(true);
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
          setIsLoading(false);
          return;
        }

        // Group into weeks of 7 days
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

        setWeeks(weekCols);
        setIsLoading(false);

        // Auto-scroll to the right so recent commits are in view
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

  // Compute month labels reactively without re-fetching API data on language toggle
  const monthLabels = useMemo(() => {
    if (weeks.length === 0) return [];
    const months: { label: string; colIndex: number }[] = [];
    let lastMonth = '';

    weeks.forEach((col, idx) => {
      if (!col[0]?.date) return;
      const firstDayDate = new Date(col[0].date);
      const monthName = firstDayDate.toLocaleString(language === 'id' ? 'id-ID' : 'en-US', { month: 'short' });
      if (monthName !== lastMonth) {
        months.push({ label: monthName, colIndex: idx });
        lastMonth = monthName;
      }
    });

    return months;
  }, [weeks, language]);

  const getColor = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-[#e54afd]'; // deep purple/magenta
      case 3:
        return 'bg-[#fd4aa6]'; // hot pink
      case 2:
        return 'bg-[#ff9ac4]'; // medium pink
      case 1:
        return 'bg-[#ffd3e5]'; // soft pink
      default:
        return 'bg-[#f1f1f1] hover:bg-[#e2e2e2]'; // light gray
    }
  };

  return (
    <div className="w-full bg-white border border-[#E5E7EB] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs transition-shadow hover:shadow-sm">
      {/* Tooltip / Active Day Indicator */}
      <div className="h-5 text-[11px] font-sans text-center mb-1 text-[#6B7280] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {hoveredDay ? (
            <motion.span
              key={hoveredDay.date}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.15 }}
              className="text-[#111318] font-medium"
            >
              <strong className="text-[#ec4899]">{hoveredDay.count}</strong>{' '}
              {hoveredDay.count === 1 ? t.heatmap.contribution : t.heatmap.contributions}{' '}
              {t.heatmap.on}{' '}
              {new Date(hoveredDay.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-[#9CA3AF] text-[10px]"
            >
              {t.heatmap.tooltipHover}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Grid Viewport */}
      <div className="flex items-start gap-2 pt-1">
        {/* Days on left */}
        <div className="flex flex-col justify-between h-[84px] text-[10px] font-sans text-[#9CA3AF] pt-5 select-none shrink-0">
          {t.heatmap.days.map((d) => (
            <span key={d} className="leading-none">{d}</span>
          ))}
        </div>

        {/* Scrollable Dots Matrix with Month Labels */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto scrollbar-none pb-1"
        >
          {/* Months Header Row */}
          <div className="flex text-[11px] font-sans font-medium text-[#9CA3AF] pb-1.5 select-none min-w-max">
            {weeks.length > 0 ? (
              monthLabels.map((m, i) => (
                <span
                  key={i}
                  style={{
                    marginLeft: i === 0 ? '0px' : '28px',
                  }}
                >
                  {m.label}
                </span>
              ))
            ) : (
              <div className="flex justify-between w-full pr-2">
                <span>{language === 'id' ? 'Nov' : 'Nov'}</span>
                <span>{language === 'id' ? 'Jan' : 'Jan'}</span>
                <span>{language === 'id' ? 'Mar' : 'Mar'}</span>
                <span>{language === 'id' ? 'Mei' : 'May'}</span>
                <span>{language === 'id' ? 'Jul' : 'Jul'}</span>
                <span>{language === 'id' ? 'Okt' : 'Oct'}</span>
              </div>
            )}
          </div>

          {/* Matrix Columns */}
          <div className="flex gap-[3.5px] sm:gap-1 min-w-max py-0.5">
            {isLoading ? (
              // Initial placeholder skeleton while loading
              <div className="flex gap-1 py-1">
                {Array.from({ length: 28 }).map((_, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, rowIdx) => (
                      <div key={rowIdx} className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] animate-pulse" />
                    ))}
                  </div>
                ))}
              </div>
            ) : hasError ? (
              <div className="py-6 text-center w-full text-xs font-mono text-[#888]">
                {language === 'id'
                  ? 'Gagal memuat visualisasi kontribusi. Kunjungi GitHub untuk melihat aktivitas terbaru.'
                  : 'Failed to load contribution activity. Visit GitHub to inspect recent activity.'}
              </div>
            ) : weeks.length === 0 ? (
              <div className="py-6 text-center w-full text-xs font-mono text-[#888]">
                {language === 'id'
                  ? 'Tidak ada riwayat kontribusi untuk periode ini.'
                  : 'No contribution activity found for this period.'}
              </div>
            ) : (
              weeks.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3.5px] sm:gap-1">
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
                        className={`w-2.5 h-2.5 rounded-full transition-transform duration-150 hover:scale-130 focus:scale-130 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#fd4aa6] focus-visible:ring-offset-1 ${getColor(
                          day.level
                        )}`}
                      />
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Subtitle / Footer of Heatmap */}
      <div className="pt-3 mt-2 border-t border-[#F3F4F6] flex items-center justify-between text-[11px] text-[#9CA3AF] font-sans select-none">
        <a
          href="https://github.com/Vannnd1"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[#4B5563] hover:text-[#ec4899] transition-colors inline-flex items-center gap-1"
        >
          <span>
            {isLoading
              ? (language === 'id' ? 'Memuat kontribusi...' : 'Loading contributions...')
              : hasError
                ? (language === 'id' ? 'Lihat profil GitHub @Vannnd1' : 'View GitHub profile @Vannnd1')
                : t.heatmap.yearSummary(totalContributions ?? 0)}
          </span>
          <span>→</span>
        </a>

        <div className="flex items-center gap-1.5 text-[10px]">
          <span>{t.heatmap.less}</span>
          <span className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
          <span className="w-2 h-2 rounded-full bg-[#fbcfe8]" />
          <span className="w-2 h-2 rounded-full bg-[#f472b6]" />
          <span className="w-2 h-2 rounded-full bg-[#ec4899]" />
          <span className="w-2 h-2 rounded-full bg-[#db2777]" />
          <span>{t.heatmap.more}</span>
        </div>
      </div>
    </div>
  );
};
