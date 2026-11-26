import type { Language } from './translations';

export type TechFishId =
  | 'react'
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'nodejs'
  | 'express'
  | 'postgresql'
  | 'tailwindcss'
  | 'supabase'
  | 'vite'
  | 'vitest'
  | 'gemini'
  | 'scikit-learn'
  | 'git';

export interface TechFishItem {
  id: TechFishId;
  name: string;
  accentColor: string;
  category: Record<Language, string>;
  usedIn: Record<Language, string>;
}

export const TECH_POND_ITEMS: TechFishItem[] = [
  {
    id: 'react',
    name: 'React',
    accentColor: '#38bdf8',
    category: { id: 'Frontend UI', en: 'Frontend UI' },
    usedIn: {
      id: 'Digunakan di MOM/MES Enterprise, RetailInsight AI, Capstone Program Asah, dan portofolio ini.',
      en: 'Used across Enterprise MOM/MES, RetailInsight AI, Asah Capstone, and this portfolio.',
    },
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    accentColor: '#3178c6',
    category: { id: 'Bahasa Pemrograman', en: 'Language' },
    usedIn: {
      id: 'Digunakan pada arsitektur full-stack MOM/MES (React 19 + Express) dan kode portofolio ini.',
      en: 'Powers the MOM/MES full-stack monorepo (React 19 + Express) and this portfolio.',
    },
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    accentColor: '#eab308',
    category: { id: 'Bahasa Pemrograman', en: 'Language' },
    usedIn: {
      id: 'Digunakan untuk engine cross-filtering RetailInsight AI serta aplikasi edukasi Sahabat Dunia.',
      en: 'Used in RetailInsight AI in-memory cross-filtering and Sahabat Dunia web app.',
    },
  },
  {
    id: 'python',
    name: 'Python',
    accentColor: '#3776ab',
    category: { id: 'Riset & AI', en: 'Research & AI' },
    usedIn: {
      id: 'Engine utama Skripsi Kriptografi Citra Medis (Numba JIT 18 ms) & pipeline NLP Sentimen YouTube.',
      en: 'Core engine for Medical Image Cryptography Thesis (18 ms Numba JIT) & YouTube Sentiment NLP.',
    },
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    accentColor: '#22c55e',
    category: { id: 'Backend & ETL', en: 'Backend & ETL' },
    usedIn: {
      id: 'Backend API MOM/MES, skrip ETL pemrosesan 541.909 transaksi retail, dan backend Capstone Asah.',
      en: 'Powers MOM/MES backend APIs, 541,909-row retail ETL preprocessing, and Asah Capstone backend.',
    },
  },
  {
    id: 'express',
    name: 'Express',
    accentColor: '#64748b',
    category: { id: 'Backend REST API', en: 'Backend REST API' },
    usedIn: {
      id: 'REST API server dengan RBAC & Segregation of Duties di MOM/MES serta layanan backend Capstone Asah.',
      en: 'REST API layer enforcing RBAC & Segregation of Duties in MOM/MES and Asah Capstone.',
    },
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    accentColor: '#336791',
    category: { id: 'Basis Data', en: 'Database' },
    usedIn: {
      id: 'Ledger inventaris ACID dengan row-level locking di MOM/MES serta persistensi cloud Adaptive Learning Insight.',
      en: 'ACID inventory ledger with row-level locking in MOM/MES and cloud persistence in Asah Capstone.',
    },
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    accentColor: '#06b6d4',
    category: { id: 'Styling & UI', en: 'Styling & UI' },
    usedIn: {
      id: 'Sistem desain responsif di MOM/MES, RetailInsight AI, Adaptive Learning Insight, dan portofolio ini.',
      en: 'Responsive design system in MOM/MES, RetailInsight AI, Asah Capstone, and this portfolio.',
    },
  },
  {
    id: 'supabase',
    name: 'Supabase',
    accentColor: '#3ecf8e',
    category: { id: 'Cloud Database', en: 'Cloud Database' },
    usedIn: {
      id: 'Basis data cloud PostgreSQL untuk melacak progres belajar & metrik kuis di Capstone Program Asah.',
      en: 'Cloud PostgreSQL backend tracking student velocity & quiz mastery in the Asah Capstone.',
    },
  },
  {
    id: 'vite',
    name: 'Vite',
    accentColor: '#6366f1',
    category: { id: 'Build Tool', en: 'Build Tool' },
    usedIn: {
      id: 'Bundler frontend ultra-cepat (1,39 detik di MOM/MES), RetailInsight AI, dan portofolio pribadi.',
      en: 'High-speed frontend build toolchain (1.39s production bundle in MOM/MES) and RetailInsight AI.',
    },
  },
  {
    id: 'vitest',
    name: 'Vitest',
    accentColor: '#84cc16',
    category: { id: 'Automated Testing', en: 'Automated Testing' },
    usedIn: {
      id: 'Menjalankan 252 automated tests (96.6% core logic coverage) pada MOM/MES & test suite portofolio ini.',
      en: 'Runs 252 automated tests (96.6% core logic coverage) in MOM/MES and this portfolio test suite.',
    },
  },
  {
    id: 'gemini',
    name: 'Gemini AI',
    accentColor: '#a855f7',
    category: { id: 'Generative AI', en: 'Generative AI' },
    usedIn: {
      id: 'Asisten AI Analyst sadar-konteks filter dengan failover cascade 4-model di proyek RetailInsight AI.',
      en: 'Context-aware AI Analyst with 4-model failover cascade inside RetailInsight AI.',
    },
  },
  {
    id: 'scikit-learn',
    name: 'Scikit-Learn',
    accentColor: '#f97316',
    category: { id: 'Machine Learning', en: 'Machine Learning' },
    usedIn: {
      id: 'Klasifikasi sentimen TF-IDF & Linear SVM berbobot seimbang (akurasi uji 86%) pada analisis Film Jumbo.',
      en: 'TF-IDF & class-weighted Linear SVM classifier (86% test accuracy) for YouTube Sentiment NLP.',
    },
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    accentColor: '#f05032',
    category: { id: 'Version Control', en: 'Version Control' },
    usedIn: {
      id: 'Alur feature-branch, code review PR tim 5 orang, dan manajemen seluruh repositori proyek.',
      en: 'Feature-branch workflows, 5-member team PR code reviews, and all project repositories.',
    },
  },
];
