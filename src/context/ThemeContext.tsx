import React, { useState, useEffect, useCallback } from 'react';
import { ThemeContext } from './ThemeContextInstance';
import type { Theme, ThemeContextType } from './types';

const STORAGE_KEY = 'theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    return 'light';
  }
  return 'light';
}

function applyThemeToDOM(theme: Theme, isViewTransition = false) {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;

  if (!isViewTransition) {
    root.classList.add('theme-transitioning');
  }

  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Update mobile browser chrome status bar color
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'dark' ? '#09090b' : '#ffffff');
  }

  if (!isViewTransition) {
    window.setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 400);
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore localStorage errors (e.g. private browsing restrictions)
    }
    applyThemeToDOM(newTheme, false);
  }, []);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

      // Check if View Transition API is supported and motion is allowed
      const isMotionReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const hasViewTransition =
        typeof document !== 'undefined' &&
        'startViewTransition' in document &&
        typeof document.startViewTransition === 'function';

      if (!hasViewTransition || isMotionReduced) {
        setTheme(nextTheme);
        return;
      }

      const x = origin?.x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
      const y = origin?.y ?? (typeof window !== 'undefined' ? 36 : 0);
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      try {
        const transition = document.startViewTransition(() => {
          setThemeState(nextTheme);
          try {
            localStorage.setItem(STORAGE_KEY, nextTheme);
          } catch {
            // Ignore
          }
          applyThemeToDOM(nextTheme, true);
        });

        transition.ready
          .then(() => {
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 480,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                pseudoElement: '::view-transition-new(root)',
              }
            );
          })
          .catch(() => {
            // Fallback gracefully if ready fails
          });
      } catch {
        setTheme(nextTheme);
      }
    },
    [theme, setTheme]
  );

  // Synchronize on mount and listen to system preference changes
  useEffect(() => {
    applyThemeToDOM(theme, false);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        // Only react to system preference changes if the user hasn't explicitly chosen a theme
        if (!saved) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      } catch {
        // Fallback
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme, setTheme]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
