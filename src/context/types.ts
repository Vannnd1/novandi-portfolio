import type { Translations, Language } from '../data/translations';
import type { ProfileData } from '../data/profile';
import type { ProjectItem } from '../data/projects';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  profile: ProfileData;
  projects: ProjectItem[];
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: (origin?: { x: number; y: number }) => void;
  isDark: boolean;
}
