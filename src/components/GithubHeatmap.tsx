import React, { useEffect, useState, useRef } from 'react';

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
  const [weeks, setWeeks] = useState<ContributionDay[][]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(112);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [monthLabels, setMonthLabels] = useState<{ label: string; colIndex: number }[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const daysLabel = ['Mon', 'Wed', 'Fri'];

  useEffect(() => {
    let isMounted = true;

    const fetchContributions = async () => {
      try {
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/Vannnd1?y=last');
        if (!res.ok) throw new Error('Failed to fetch contributions');
        const data: ApiResponse = await res.json();

        if (!isMounted) return;

        const total = data.total?.lastYear ?? Object.values(data.total)[0] ?? 112;
        setTotalContributions(total);

        const allDays = data.contributions;
        if (!allDays || allDays.length === 0) return;

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

        // Calculate month labels at column intervals
        const months: { label: string; colIndex: number }[] = [];
        let lastMonth = '';

        weekCols.forEach((col, idx) => {
          const firstDayDate = new Date(col[0].date);
          const monthName = firstDayDate.toLocaleString('en-US', { month: 'short' });
          if (monthName !== lastMonth) {
            months.push({ label: monthName, colIndex: idx });
            lastMonth = monthName;
          }
        });

        setWeeks(weekCols);
        setMonthLabels(months);

        // Auto-scroll to the right so recent commits are in view
        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
          }
        }, 150);
      } catch {
        // Fallback gracefully to default state if offline
      }
    };

    fetchContributions();

    return () => {
      isMounted = false;
    };
  }, []);

  const getColor = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-[#db2777] shadow-xs'; // deep vibrant magenta
      case 3:
        return 'bg-[#ec4899] shadow-xs'; // hot pink
      case 2:
        return 'bg-[#f472b6]'; // medium pink
      case 1:
        return 'bg-[#fbcfe8]'; // soft pink
      default:
        return 'bg-[#E5E7EB] hover:bg-[#D1D5DB]'; // light gray
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-xs transition-shadow hover:shadow-sm">
      {/* Tooltip / Active Day Indicator */}
      <div className="h-4 text-[11px] font-sans text-center mb-1 text-[#6B7280]">
        {hoveredDay ? (
          <span className="text-[#111318] font-medium">
            <strong className="text-[#ec4899]">{hoveredDay.count}</strong> contribution{hoveredDay.count === 1 ? '' : 's'} on{' '}
            {new Date(hoveredDay.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        ) : (
          <span className="text-[#9CA3AF] text-[10px]">hover on any block to see live contributions</span>
        )}
      </div>

      {/* Grid Viewport */}
      <div className="flex items-start gap-2 pt-1">
        {/* Days on left: Mon, Wed, Fri (index 1, 3, 5) */}
        <div className="flex flex-col justify-between h-[84px] text-[10px] font-sans text-[#9CA3AF] pt-5 select-none shrink-0">
          {daysLabel.map((d) => (
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
                <span>Nov</span>
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Oct</span>
              </div>
            )}
          </div>

          {/* Matrix Columns */}
          <div className="flex gap-[3.5px] sm:gap-1 min-w-max py-0.5">
            {weeks.length > 0 ? (
              weeks.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3.5px] sm:gap-1">
                  {week.map((day, rowIdx) => (
                    <div
                      key={rowIdx}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-2.5 h-2.5 rounded-full transition-transform hover:scale-125 cursor-pointer ${getColor(
                        day.level
                      )}`}
                    />
                  ))}
                </div>
              ))
            ) : (
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
          <span>{totalContributions} contributions in the last year</span>
          <span>→</span>
        </a>

        <div className="flex items-center gap-1.5 text-[10px]">
          <span>Less</span>
          <span className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
          <span className="w-2 h-2 rounded-full bg-[#fbcfe8]" />
          <span className="w-2 h-2 rounded-full bg-[#f472b6]" />
          <span className="w-2 h-2 rounded-full bg-[#ec4899]" />
          <span className="w-2 h-2 rounded-full bg-[#db2777]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
