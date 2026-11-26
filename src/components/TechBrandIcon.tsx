import React from 'react';
import type { TechFishId } from '../data/techPond';

interface TechBrandIconProps {
  id: TechFishId;
  className?: string;
}

export const TechBrandIcon: React.FC<TechBrandIconProps> = ({ id, className = 'w-6 h-6' }) => {
  switch (id) {
    case 'react':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="2.1" fill="#00D8FF" />
          <g stroke="#00D8FF" strokeWidth="1.35">
            <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
            <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
          </g>
        </svg>
      );

    case 'typescript':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6" />
          <path
            d="M6.5 11.2h5.2v1.6H10v5.7H8.2v-5.7H6.5v-1.6zm6.7 5.7c.5.3 1.2.5 1.9.5.8 0 1.2-.3 1.2-.7 0-.5-.4-.7-1.3-1-1.3-.4-2.1-1.1-2.1-2.2 0-1.3 1-2.2 2.7-2.2.8 0 1.5.2 1.9.4l-.4 1.5c-.4-.2-.9-.4-1.5-.4-.7 0-1 .3-1 .6 0 .5.4.7 1.4 1 1.4.5 2 1.2 2 2.3 0 1.3-1 2.3-2.9 2.3-.9 0-1.8-.2-2.2-.5l.3-1.6z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#F7DF1E" />
          <path
            d="M11.1 16.4c0 1.6-.9 2.4-2.4 2.4-.9 0-1.5-.3-1.9-.8l1.2-1c.2.3.5.5.8.5.4 0 .6-.2.6-.8v-5.1h1.7v4.8zm2.2.3c.5.4 1.2.6 1.9.6.8 0 1.2-.3 1.2-.7 0-.5-.4-.7-1.3-1-1.3-.4-2.1-1.1-2.1-2.2 0-1.3 1-2.2 2.7-2.2.8 0 1.5.2 2 .5l-.5 1.4c-.4-.2-.9-.4-1.5-.4-.7 0-1 .3-1 .6 0 .4.4.6 1.4 1 1.4.5 2.1 1.2 2.1 2.3 0 1.4-1.1 2.3-2.9 2.3-.9 0-1.8-.2-2.3-.6l.3-1.6z"
            fill="#18181B"
          />
        </svg>
      );

    case 'python':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            d="M11.9 2.5c-4.5 0-4.2 1.9-4.2 1.9v2h4.3v.6H6.1S3.2 6.7 3.2 11.2c0 4.5 2.5 4.3 2.5 4.3h1.5v-2.1s-.1-2.5 2.5-2.5h4.2s2.4 0 2.4-2.3V4.8s.4-2.3-4.4-2.3zm-2.3 1.4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z"
            fill="#3776AB"
          />
          <path
            d="M12.1 21.5c4.5 0 4.2-1.9 4.2-1.9v-2h-4.3v-.6h5.9s2.9.3 2.9-4.2c0-4.5-2.5-4.3-2.5-4.3h-1.5v2.1s.1 2.5-2.5 2.5h-4.2s-2.4 0-2.4 2.3v3.8s-.4 2.3 4.4 2.3zm2.3-1.4a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z"
            fill="#FFD43B"
          />
        </svg>
      );

    case 'nodejs':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            d="M12 2.2l8.5 4.9v9.8L12 21.8l-8.5-4.9V7.1L12 2.2z"
            fill="#339933"
          />
          <path
            d="M12 6.8l4.7 2.7v5.4L12 17.6l-4.7-2.7V9.5L12 6.8z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="1.8" fill="#FFFFFF" />
        </svg>
      );

    case 'express':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="4" fill="#18181B" />
          <text
            x="12"
            y="15.2"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="monospace"
          >
            ex
          </text>
        </svg>
      );

    case 'postgresql':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M16.8 5.2c-1.5-.8-3.4-.5-4.8.5-1.4-1-3.3-1.3-4.8-.5-2.2 1.2-3 4.3-2 7.5.7 2.2 2 3.8 3.6 4.4.5 1.8 1.2 3.3 2.5 3.6 1 .2 1.7-.4 1.8-1.3.1-.7-.1-1.6-.4-2.2.7-.1 1.4-.4 2-.9.6 1.5 1.5 2.5 2.7 2.3 1.4-.2 1.6-2 1-3.6 1.2-1.7 1.8-4.2 1.1-6.5-.4-1.5-1.4-2.6-2.7-3.3z"
            fill="#336791"
          />
          <circle cx="9.6" cy="9.7" r="1" fill="#FFFFFF" />
          <circle cx="14.4" cy="9.7" r="1" fill="#FFFFFF" />
          <path
            d="M12 12v5.4"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'tailwindcss':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            d="M12 5.5c-2.9 0-4.8 1.5-5.6 4.4 1.1-1.5 2.5-2 4-1.6.9.2 1.5.9 2.2 1.6 1.1 1.1 2.4 2.4 5.2 2.4 2.9 0 4.8-1.5 5.6-4.4-1.1 1.5-2.5 2-4 1.6-.9-.2-1.5-.9-2.2-1.6C16.1 6.8 14.8 5.5 12 5.5zM6.4 12.1c-2.9 0-4.8 1.5-5.6 4.4 1.1-1.5 2.5-2 4-1.6.9.2 1.5.9 2.2 1.6 1.1 1.1 2.4 2.4 5.2 2.4 2.9 0 4.8-1.5 5.6-4.4-1.1 1.5-2.5 2-4 1.6-.9-.2-1.5-.9-2.2-1.6-1.1-1.1-2.4-2.4-5.2-2.4z"
            fill="#06B6D4"
          />
        </svg>
      );

    case 'supabase':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            d="M13.6 21.1c-.5.7-1.6.3-1.6-.5V13h7.1c1 0 1.6 1.2 1 2l-6.5 6.1z"
            fill="#3ECF8E"
          />
          <path
            d="M10.4 2.9c.5-.7 1.6-.3 1.6.5V11H4.9c-1 0-1.6-1.2-1-2l6.5-6.1z"
            fill="#249361"
          />
        </svg>
      );

    case 'vite':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            d="M20.9 5.3L12.5 20.4c-.2.4-.8.4-1 0L3.1 5.3c-.3-.5.2-1.1.7-.9l8.2 2.9c.2.1.4.1.6 0l8.1-2.9c.5-.2 1 .4.2.9z"
            fill="#646CFF"
          />
          <path
            d="M15.8 3.2L10.3 4.3c-.2 0-.3.2-.3.4l-.4 6.1c0 .3.2.5.5.4l1.6-.4c.3-.1.6.2.5.5l-.5 2.5c-.1.3.2.6.5.5l1-.3c.3-.1.6.2.5.5l-.8 3.8c-.1.4.4.6.6.2l5-9.5c.2-.3-.1-.7-.5-.6l-1.7.3c-.3.1-.6-.2-.5-.5l1.1-3.9c.1-.3-.2-.6-.6-.5z"
            fill="#FFCA28"
          />
        </svg>
      );

    case 'vitest':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            d="M3.5 6.5l8.5 14 8.5-14-4.2-2.2-4.3 7.5-4.3-7.5-4.2 2.2z"
            fill="#729B1B"
          />
          <path
            d="M12 11.8l3.5-6.2 2.8 1.5-6.3 10.6L5.7 7.1l2.8-1.5 3.5 6.2z"
            fill="#FCC72B"
          />
        </svg>
      );

    case 'gemini':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="geminiGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="55%" stopColor="#9B72CB" />
              <stop offset="100%" stopColor="#D96570" />
            </linearGradient>
          </defs>
          <path
            d="M12 2c.6 5.2 4.8 9.4 10 10-5.2.6-9.4 4.8-10 10-.6-5.2-4.8-9.4-10-10 5.2-.6 9.4-4.8 10-10z"
            fill="url(#geminiGrad)"
          />
        </svg>
      );

    case 'scikit-learn':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle cx="10.2" cy="12" r="7" fill="#F7931E" opacity="0.92" />
          <circle cx="15.2" cy="13.2" r="5.5" fill="#3499CD" opacity="0.92" />
          <circle cx="11.2" cy="12.5" r="2.1" fill="#FFFFFF" />
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect
            x="4.5"
            y="4.5"
            width="15"
            height="15"
            rx="2.5"
            transform="rotate(45 12 12)"
            fill="#F05032"
          />
          <circle cx="9.6" cy="9.6" r="1.4" fill="#FFFFFF" />
          <circle cx="14.4" cy="12" r="1.4" fill="#FFFFFF" />
          <circle cx="9.6" cy="14.6" r="1.4" fill="#FFFFFF" />
          <path
            d="M9.6 7.5v7.1M9.6 9.6l4.8 2.4"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};
