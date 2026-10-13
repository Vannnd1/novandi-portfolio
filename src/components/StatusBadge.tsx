import React from 'react';

interface StatusBadgeProps {
  label: string;
  status?: 'verified' | 'passed' | 'neutral';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  status = 'neutral',
  className = '',
}) => {
  const getStyles = () => {
    switch (status) {
      case 'passed':
        return 'bg-[#059669]/10 text-[#059669] border-[#059669]/25';
      case 'verified':
        return 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/25';
      case 'neutral':
      default:
        return 'bg-[#F4F4F2] text-[#575B66] border-[#E4E4E1]';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono-tech border ${getStyles()} ${className}`}
    >
      {status === 'passed' && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" aria-hidden="true" />
      )}
      {status === 'verified' && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
      )}
      {label}
    </span>
  );
};
