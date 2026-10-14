import React from 'react';

export const GithubHeatmap: React.FC = () => {
  // Generate realistic GitHub contribution matrix (7 rows x ~24 columns for compact centered view)
  const days = ['Mon', 'Wed', 'Fri'];
  const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

  // Seeded pseudo-random activity map to create realistic pink activity pattern matching Ezra's site
  const generateGrid = () => {
    const cols = 28;
    const grid: number[][] = [];

    // Pre-calculated density pattern (0 = empty, 1 = low, 2 = medium, 3 = high)
    for (let c = 0; c < cols; c++) {
      const colData: number[] = [];
      for (let r = 0; r < 7; r++) {
        const seed = (c * 7 + r * 13) % 100;
        if (seed > 85) colData.push(3); // hot pink
        else if (seed > 70) colData.push(2); // medium pink
        else if (seed > 50) colData.push(1); // light pink
        else colData.push(0); // empty light gray
      }
      grid.push(colData);
    }
    return grid;
  };

  const grid = generateGrid();

  const getColor = (level: number) => {
    switch (level) {
      case 3:
        return 'bg-[#ec4899] shadow-xs'; // vibrant hot pink
      case 2:
        return 'bg-[#f472b6]';
      case 1:
        return 'bg-[#fbcfe8]';
      default:
        return 'bg-[#E5E7EB] hover:bg-[#D1D5DB]'; // light gray
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 shadow-xs">
      {/* Months Header */}
      <div className="flex justify-between pl-8 pr-2 pb-2 text-[11px] font-sans font-medium text-[#9CA3AF]">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      {/* Grid with Day Labels */}
      <div className="flex items-center gap-2">
        {/* Days on left */}
        <div className="flex flex-col justify-between h-[84px] text-[10px] font-sans text-[#9CA3AF] py-0.5 select-none">
          {days.map((d) => (
            <span key={d} className="leading-none">{d}</span>
          ))}
        </div>

        {/* Dots Matrix */}
        <div className="flex-1 flex justify-between gap-[3px] sm:gap-1 overflow-x-auto py-1 scrollbar-none">
          {grid.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-[3px] sm:gap-1 shrink-0">
              {col.map((cell, rowIdx) => (
                <div
                  key={rowIdx}
                  title={`Activity level ${cell}`}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors cursor-pointer ${getColor(
                    cell
                  )}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Subtitle / Footer of Heatmap */}
      <div className="pt-3 mt-2 border-t border-[#F3F4F6] flex items-center justify-between text-[11px] text-[#9CA3AF] font-sans">
        <span className="font-medium text-[#6B7280]">contributions in the last year</span>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span>Less</span>
          <span className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
          <span className="w-2 h-2 rounded-full bg-[#fbcfe8]" />
          <span className="w-2 h-2 rounded-full bg-[#f472b6]" />
          <span className="w-2 h-2 rounded-full bg-[#ec4899]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
