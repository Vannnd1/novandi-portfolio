import React from 'react';
import {
  AlertTriangle,
  ShoppingCart,
  Target,
  ShieldAlert,
  Activity,
  TrendingUp,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/useLanguage';

interface ProjectMockupProps {
  projectId: string;
}

const CryptoProjectHoverShowcase: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-900 select-none">
      <img
        src="/projects/crypto-main-menu.png"
        alt={language === 'id' ? 'Halaman Utama Enkripsi Citra Digital Berbasis Chaos (.exe)' : 'Main Menu Chaos Image Encryption (.exe)'}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Floating hint overlay at bottom */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[8.5px] font-mono text-slate-300 shadow-sm pointer-events-none">
        <span>🖥️ Windows .exe</span>
        <span className="text-white/90">
          {language === 'id' ? 'Hover card untuk lihat 3 layar alur ↓' : 'Hover card to view 3-screen workflow ↓'}
        </span>
      </div>
    </div>
  );
};

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ projectId }) => {
  switch (projectId) {
    /* ──────────────────────────────────────────────────────────────────────────
     * 1. Chaotic Medical Image Encryption System
     * Direct replica of tkinter GUI and wireframe in Skripsi documentation
     * ────────────────────────────────────────────────────────────────────────── */
    case 'chaotic-image-encryption':
      return <CryptoProjectHoverShowcase />;

    /* ──────────────────────────────────────────────────────────────────────────
     * 2. Manufacturing Digital Operations System (MOM / MES)
     * Direct replica of Dashboard component in manufacturing-digital-operations
     * ────────────────────────────────────────────────────────────────────────── */
    case 'manufacturing-digital-operations':
      return (
        <div className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-3.5 space-y-2.5 font-sans text-[10px] select-none transition-colors">
          {/* Operational Command Center Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-white">Operational Command Center</div>
              <div className="text-[8.5px] text-slate-500 dark:text-slate-400">Real-time manufacturing operations & quality gate events</div>
            </div>
            <span className="px-2 py-0.5 rounded text-[8.5px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              v1.0 MES
            </span>
          </div>

          {/* 4 KPI Cards (Direct match with summary.inventory / procurement / production / quality) */}
          <div className="grid grid-cols-4 gap-1.5">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 rounded flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold uppercase">Deficit</span>
                <AlertTriangle className="w-3 h-3 text-amber-500" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">14</div>
              <div className="text-[7.5px] text-slate-400">SKUs Low Stock</div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 rounded flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold uppercase">Req (PR)</span>
                <ShoppingCart className="w-3 h-3 text-blue-500" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">8</div>
              <div className="text-[7.5px] text-slate-400">Pending Auth</div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 rounded flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold uppercase">Prod Order</span>
                <Target className="w-3 h-3 text-purple-500" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">6</div>
              <div className="text-[7.5px] text-slate-400">In Progress</div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 rounded flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold uppercase">Defect Gate</span>
                <ShieldAlert className="w-3 h-3 text-rose-500" />
              </div>
              <div className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-1">2</div>
              <div className="text-[7.5px] text-slate-400">Failed QC</div>
            </div>
          </div>

          {/* Data Table: Production Status & Active Work Orders */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded overflow-hidden">
            <div className="px-2 py-1 bg-slate-100 dark:bg-slate-700/60 border-b border-slate-200 dark:border-slate-700 text-[8.5px] font-bold text-slate-700 dark:text-slate-200">
              Active Production Work Orders
            </div>
            <table className="w-full text-left text-[8.5px]">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-1 px-2">Order ID</th>
                  <th className="p-1">SKU / Item</th>
                  <th className="p-1">Target</th>
                  <th className="p-1 pr-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                <tr>
                  <td className="p-1 px-2 font-mono font-medium text-slate-800 dark:text-slate-200">WO-2026-004</td>
                  <td className="p-1 text-slate-600 dark:text-slate-400">FG-PRECISION-SHAFT</td>
                  <td className="p-1 font-bold text-slate-700 dark:text-slate-300">1,500 pcs</td>
                  <td className="p-1 pr-2 text-right">
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 text-[8px] font-bold">
                      IN PROGRESS
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-1 px-2 font-mono font-medium text-slate-800 dark:text-slate-200">WO-2026-005</td>
                  <td className="p-1 text-slate-600 dark:text-slate-400">FG-HOUSING-ALUM</td>
                  <td className="p-1 font-bold text-slate-700 dark:text-slate-300">800 pcs</td>
                  <td className="p-1 pr-2 text-right">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-[8px] font-bold">
                      READY
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer Tests Strip */}
          <div className="flex items-center justify-between text-[8px] text-slate-500 dark:text-slate-400 pt-0.5">
            <span>Enterprise Ledger · PostgreSQL ACID Engine</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 252 Automated Jest Tests Passing</span>
          </div>
        </div>
      );

    /* ──────────────────────────────────────────────────────────────────────────
     * 3. RetailInsight AI
     * Sales intelligence & Churn Prediction Studio
     * ────────────────────────────────────────────────────────────────────────── */
    case 'retailinsight-ai':
      return (
        <div className="w-full bg-slate-900 text-white p-3.5 space-y-2.5 font-sans text-[10px] select-none">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <div>
              <div className="font-bold text-xs text-white">RetailInsight AI · Analytics Studio</div>
              <div className="text-[8.5px] text-slate-400">Sales Velocity, RFM Clusters & Churn Predictor</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded text-[8px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30">
                Gemini 1.5
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-800/80 p-2 rounded border border-slate-700">
              <div className="text-[8.5px] text-slate-400">Quarterly Revenue</div>
              <div className="text-sm font-bold text-white mt-0.5">$428,950</div>
              <div className="text-[8px] text-emerald-400 font-semibold">+18.4% vs last period</div>
            </div>
            <div className="bg-slate-800/80 p-2 rounded border border-slate-700">
              <div className="text-[8.5px] text-slate-400">Customer Churn Rate</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">2.1%</div>
              <div className="text-[8px] text-slate-400">Low Risk Tier 1</div>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="bg-slate-800/80 p-2 rounded border border-slate-700 space-y-1.5">
            <div className="flex justify-between text-[8px] text-slate-400">
              <span>Sales Velocity (Monthly Recharts)</span>
              <span>12 Months</span>
            </div>
            <div className="flex items-end gap-1.5 h-12 pt-1">
              {[35, 52, 45, 68, 60, 85, 78, 92, 88, 95, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-cyan-600 to-blue-400 rounded-t opacity-90"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="bg-slate-800 p-2 rounded border border-cyan-500/30 flex items-start gap-1.5 text-[8.5px]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span className="text-slate-300">
              <strong className="text-cyan-300">Gemini AI Insight:</strong> High-value retention cluster detected in online retail dataset. Auto-replenishment triggered.
            </span>
          </div>
        </div>
      );

    /* ──────────────────────────────────────────────────────────────────────────
     * 4. Adaptive Learning Insight
     * Direct replica of Dashboard in ai-learning-insight-capstone
     * ────────────────────────────────────────────────────────────────────────── */
    case 'adaptive-learning-insight':
      return (
        <div className="w-full bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 p-3.5 space-y-2.5 font-sans text-[10px] select-none transition-colors">
          {/* Header matching Dashboard.jsx */}
          <div className="flex items-center justify-between pb-1.5 border-b border-gray-100 dark:border-slate-800">
            <div>
              <div className="font-bold text-xs text-gray-900 dark:text-white">Halo, Novan! 👋</div>
              <div className="text-[8.5px] text-gray-500 dark:text-slate-400">Program Asah 2025 · Dicoding × Accenture · React & Back-End with AI</div>
            </div>
            <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
              React + AI Cohort
            </span>
          </div>

          {/* 3 Statistic Cards matching Dashboard.jsx */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-gray-200 dark:border-slate-700 shadow-xs flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 rounded-lg">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[7.5px] text-gray-400 font-bold uppercase">TARGET</p>
                <p className="text-[9px] font-bold text-gray-900 dark:text-white">Web Dev</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-gray-200 dark:border-slate-700 shadow-xs flex items-center gap-2">
              <div className="p-1.5 bg-green-50 dark:bg-green-950/80 text-green-600 dark:text-green-400 rounded-lg">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[7.5px] text-gray-400 font-bold uppercase">NILAI UJIAN</p>
                <p className="text-[9px] font-bold text-gray-900 dark:text-white">88.5 <span className="text-[7.5px] font-normal text-gray-400">/ 100</span></p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-gray-200 dark:border-slate-700 shadow-xs flex items-center gap-2">
              <div className="p-1.5 bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 rounded-lg">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[7.5px] text-gray-400 font-bold uppercase">WAKTU</p>
                <p className="text-[9px] font-bold text-gray-900 dark:text-white">42 Jam</p>
              </div>
            </div>
          </div>

          {/* Aktivitas Chart header matching Dashboard.jsx */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-2 shadow-xs space-y-1">
            <div className="flex justify-between items-center text-[8.5px]">
              <span className="font-bold text-gray-800 dark:text-slate-200 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400" /> Aktivitas Belajar (Okt 2026)
              </span>
              <div className="flex bg-gray-100 dark:bg-slate-700/60 p-0.5 rounded text-[8px]">
                <span className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold shadow-xs">Harian</span>
                <span className="px-1.5 py-0.5 text-gray-500 dark:text-slate-400">Mingguan</span>
              </div>
            </div>
            {/* Progress line curve */}
            <div className="h-9 flex items-end gap-1 pt-1">
              {[40, 65, 55, 80, 70, 90, 85, 95, 90, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-500 dark:bg-blue-400 rounded-t" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* AI Recommendation Banner matching Dashboard.jsx */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-2 text-white shadow-xs">
            <div className="font-bold text-[9px] flex items-center gap-1">
              <span>🚀</span> Rekomendasi AI!
            </div>
            <div className="text-[8px] text-blue-100 mt-0.5 leading-snug">
              "Konsistensi adalah kunci. Setiap modul yang kamu selesaikan membawamu lebih dekat ke target."
            </div>
          </div>
        </div>
      );

    /* ──────────────────────────────────────────────────────────────────────────
     * 5. YouTube Sentiment Analysis — Film Jumbo
     * Direct replica of Streamlit app & ML pipeline in:
     * https://github.com/Vannnd1/jumbo-movie-sentiment-analysis
     * https://jumbo-movie-sentiment.streamlit.app/
     * ────────────────────────────────────────────────────────────────────────── */
    case 'youtube-sentiment-jumbo':
      return (
        <div className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-3.5 space-y-2.5 font-sans text-[10px] select-none transition-colors">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-white">YouTube Comment Sentiment Classifier</div>
              <div className="text-[8.5px] text-slate-500 dark:text-slate-400">Film Jumbo · Support Vector Machine & InSet Lexicon</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded text-[8px] font-mono text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60">
                SVM 86%
              </span>
            </div>
          </div>

          {/* Sentiment Distribution Bar */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1.5">
            <div className="flex justify-between text-[8.5px] text-slate-600 dark:text-slate-300">
              <span className="font-bold">Distribusi Sentimen Ulasan (236 Data Uji)</span>
              <span className="text-slate-400 font-mono">Biner (InSet Lexicon)</span>
            </div>
            <div className="h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-500 w-[74.2%]" />
              <div className="h-full bg-rose-500 w-[25.8%]" />
            </div>
            <div className="flex justify-between text-[8.5px] font-medium pt-0.5">
              <span className="text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-xs bg-emerald-500 inline-block" /> Positif 74.2% (175 data)
              </span>
              <span className="text-rose-700 dark:text-rose-300 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-xs bg-rose-500 inline-block" /> Negatif 25.8% (61 data)
              </span>
            </div>
          </div>

          {/* Model Evaluation Metrics */}
          <div className="grid grid-cols-4 gap-1 text-center text-[8.5px]">
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-1.5 rounded">
              <div className="text-slate-400">Akurasi Uji</div>
              <div className="font-bold text-slate-900 dark:text-white text-[10px]">86.0%</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-1.5 rounded">
              <div className="text-slate-400">F1 Positif</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 text-[10px]">0.90</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-1.5 rounded">
              <div className="text-slate-400">Recall Negatif</div>
              <div className="font-bold text-purple-600 dark:text-purple-400 text-[10px]">77.0%</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-1.5 rounded">
              <div className="text-slate-400">Normalisasi</div>
              <div className="font-bold text-slate-700 dark:text-slate-200 text-[10px]">15K Alay</div>
            </div>
          </div>

          {/* Live Analyzed Comment Stream Preview */}
          <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[8px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Sample Inference</span>
              <span className="text-[8px] text-slate-400 font-mono">TF-IDF + Linear SVM</span>
            </div>

            {/* Comment 1: Positive */}
            <div className="p-2 rounded bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-slate-500 dark:text-slate-400 font-mono">@user_indonesia · YouTube</span>
                <span className="px-1.5 py-0.2 rounded text-[7.5px] font-bold bg-emerald-500 text-white shadow-2xs">
                  POSITIF (Conf: 94.2%)
                </span>
              </div>
              <p className="text-[8.5px] text-slate-800 dark:text-slate-200 font-medium m-0 leading-tight">
                "Kualitas animasinya gila keren bgt, bangga bgt sama animator lokal! 🔥🇮🇩"
              </p>
              <div className="text-[7.5px] text-emerald-700 dark:text-emerald-300 font-mono">
                Tokens: [animasi, kualitas, keren, bangga, animator, lokal] ➔ Score: +3.8
              </div>
            </div>

            {/* Comment 2: Negative/Criticism */}
            <div className="p-2 rounded bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/60 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-slate-500 dark:text-slate-400 font-mono">@movie_enthusiast · YouTube</span>
                <span className="px-1.5 py-0.2 rounded text-[7.5px] font-bold bg-rose-500 text-white shadow-2xs">
                  NEGATIF (Conf: 81.5%)
                </span>
              </div>
              <p className="text-[8.5px] text-slate-800 dark:text-slate-200 font-medium m-0 leading-tight">
                "Promosinya kurang gencar, padahal ceritanya bagus tapi jadwal tayang minim."
              </p>
              <div className="text-[7.5px] text-rose-700 dark:text-rose-300 font-mono">
                Negation: [kurang_gencar, minim] ➔ Inverted Polarity: -2.1
              </div>
            </div>
          </div>
        </div>
      );

    /* ──────────────────────────────────────────────────────────────────────────
     * 6. Sahabat Dunia — Belajar Hewan
     * Direct replica of interactive web in SahabatDunia
     * using real card assets from asset/CardMenu
     * ────────────────────────────────────────────────────────────────────────── */
    case 'sahabat-dunia':
      return (
        <div className="w-full bg-gradient-to-b from-[#87CEEB] to-[#E0F6FF] text-[#1E3A8A] p-3.5 space-y-2.5 font-sans text-[10px] select-none">
          {/* Top Bar with Sound Control Widget */}
          <div className="flex items-center justify-between pb-1 border-b border-sky-200/60">
            <div className="flex items-center gap-1.5">
              <img
                src="/projects/logoSahabatDunia.png"
                alt="Logo Sahabat Dunia"
                className="h-6 w-auto"
              />
              <span className="font-bold text-xs text-sky-950">Sahabat Dunia — Belajar Hewan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded text-[8px] font-mono text-sky-700 bg-white/80 border border-sky-200">
                Web Audio API
              </span>
            </div>
          </div>

          {/* 3 Interactive Cards matching CardMenu/CardUdara, CardDarat, CardLaut */}
          <div className="grid grid-cols-3 gap-2 pt-0.5">
            <div className="bg-white rounded-lg p-1.5 shadow-sm border border-sky-100 flex flex-col items-center hover:scale-105 transition-transform">
              <img
                src="/projects/CardUdara.png"
                alt="Hewan Udara"
                className="w-full h-16 object-contain rounded"
              />
              <span className="font-bold text-[9px] text-sky-900 mt-1">Hewan Udara</span>
            </div>

            <div className="bg-white rounded-lg p-1.5 shadow-sm border border-sky-100 flex flex-col items-center hover:scale-105 transition-transform">
              <img
                src="/projects/CardDarat.png"
                alt="Hewan Darat"
                className="w-full h-16 object-contain rounded"
              />
              <span className="font-bold text-[9px] text-sky-900 mt-1">Hewan Darat</span>
            </div>

            <div className="bg-white rounded-lg p-1.5 shadow-sm border border-sky-100 flex flex-col items-center hover:scale-105 transition-transform">
              <img
                src="/projects/CardLaut.png"
                alt="Hewan Laut"
                className="w-full h-16 object-contain rounded"
              />
              <span className="font-bold text-[9px] text-sky-900 mt-1">Hewan Laut</span>
            </div>
          </div>

          {/* Button: TEKAN UNTUK MULAI matching index.html */}
          <div className="bg-[#FF9900] text-white font-extrabold text-[10px] py-1.5 rounded-full text-center shadow-md tracking-wider border-2 border-white">
            TEKAN UNTUK MULAI 🐾
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full bg-slate-900 text-white p-3.5 space-y-2 text-[10px]">
          <div className="font-bold text-xs">Project Architecture Verification</div>
          <div className="text-slate-400">Source code validated and indexed.</div>
        </div>
      );
  }
};
