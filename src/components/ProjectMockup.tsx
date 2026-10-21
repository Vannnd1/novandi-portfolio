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

interface ProjectMockupProps {
  projectId: string;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ projectId }) => {
  switch (projectId) {
    /* ──────────────────────────────────────────────────────────────────────────
     * 1. Chaotic Medical Image Encryption System
     * Direct replica of tkinter GUI in:
     * C:\Users\panpe\Downloads\2026_51422256_Novandi Ahmad Ramdhan\Program\windows\encrypt.py
     * and wireframe in file wireframe sk\Enkripsi.jpg
     * ────────────────────────────────────────────────────────────────────────── */
    case 'chaotic-image-encryption':
      return (
        <div className="w-[380px] sm:w-[440px] bg-[#F8FAFC] text-[#0F172A] p-3.5 space-y-2.5 font-sans text-[10px] select-none border border-[#E2E8F0]">
          {/* Windows Title Bar */}
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] bg-white -m-3.5 mb-2.5 p-2.5 px-3">
            <div className="flex items-center gap-1.5">
              <span className="text-blue-600 font-bold text-xs">🔒</span>
              <span className="font-semibold text-[11px] text-[#0F172A]">
                Enkripsi Citra Digital — Algoritma: Gauss MS Map (Komposisi g∘f)
              </span>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-[#64748B]">
              <span className="w-2.5 h-2.5 rounded-sm border border-[#CBD5E1] inline-block text-center leading-[8px]">—</span>
              <span className="w-2.5 h-2.5 rounded-sm border border-[#CBD5E1] inline-block text-center leading-[8px]">□</span>
              <span className="w-2.5 h-2.5 rounded-sm border border-[#EF4444] text-[#EF4444] inline-block text-center leading-[8px]">✕</span>
            </div>
          </div>

          {/* 3-Column Main Layout matching encrypt.py wrapper */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {/* Kolom Kiri — Citra Asli */}
            <div className="bg-white border border-[#E2E8F0] rounded p-2 flex flex-col justify-between">
              <div className="font-bold text-[9px] text-[#0F172A] border-b border-[#E2E8F0] pb-1 flex items-center gap-1">
                <span>📂</span> Citra Asli
              </div>
              <div className="my-1.5 h-24 bg-[#F1F5F9] border border-[#CBD5E1] rounded overflow-hidden flex items-center justify-center relative">
                <img
                  src="/projects/mri-sample.jpg"
                  alt="Citra Asli MRI"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-[#3B82F6] hover:bg-blue-600 text-white text-[9px] font-semibold py-1 rounded text-center">
                📂 Open Image
              </div>
            </div>

            {/* Kolom Tengah — Parameter Chaos */}
            <div className="bg-white border border-[#E2E8F0] rounded p-2 space-y-1">
              <div className="font-bold text-[9px] text-[#0F172A] border-b border-[#E2E8F0] pb-1 flex items-center gap-1">
                <span>⚙️</span> Parameter Chaos
              </div>
              <div className="space-y-0.5 text-[8.5px] text-[#475569]">
                <div className="flex justify-between items-center">
                  <span>X₀ (awal):</span>
                  <span className="bg-[#F1F5F9] border border-[#E2E8F0] px-1 py-0.5 rounded font-mono font-bold">0.3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>r (MS):</span>
                  <span className="bg-[#F1F5F9] border border-[#E2E8F0] px-1 py-0.5 rounded font-mono font-bold">3.5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>α (Gauss):</span>
                  <span className="bg-[#F1F5F9] border border-[#E2E8F0] px-1 py-0.5 rounded font-mono font-bold">5.8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>β (Gauss):</span>
                  <span className="bg-[#F1F5F9] border border-[#E2E8F0] px-1 py-0.5 rounded font-mono font-bold">3.1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Iter (skip):</span>
                  <span className="bg-[#F1F5F9] border border-[#E2E8F0] px-1 py-0.5 rounded font-mono font-bold">200</span>
                </div>
              </div>
              <div className="pt-1">
                <div className="bg-[#3B82F6] text-white text-[8.5px] font-bold py-1 rounded text-center">
                  🔒 Enkripsi Sekarang
                </div>
                <div className="text-[8px] text-[#64748B] text-center mt-0.5 font-mono">
                  Waktu: <strong className="text-emerald-600">18.4 ms</strong>
                </div>
              </div>
            </div>

            {/* Kolom Kanan — Citra Hasil Enkripsi */}
            <div className="bg-white border border-[#E2E8F0] rounded p-2 flex flex-col justify-between">
              <div className="font-bold text-[9px] text-[#0F172A] border-b border-[#E2E8F0] pb-1 flex items-center gap-1">
                <span>🔒</span> Citra Terenkripsi
              </div>
              <div className="my-1.5 h-24 bg-[#0F172A] border border-[#CBD5E1] rounded overflow-hidden relative">
                {/* Static noise texture simulating chaotic cipher */}
                <div
                  className="w-full h-full opacity-85"
                  style={{
                    backgroundImage:
                      'radial-gradient(#fd4aa6 0.75px, transparent 0.75px), radial-gradient(#38bdf8 0.75px, #0F172A 0.75px)',
                    backgroundSize: '4px 4px',
                    backgroundPosition: '0 0, 2px 2px',
                  }}
                />
              </div>
              <div className="bg-[#10B981] hover:bg-emerald-600 text-white text-[9px] font-semibold py-1 rounded text-center">
                💾 Save Image
              </div>
            </div>
          </div>

          {/* Quick Analysis Buttons matching encrypt.py */}
          <div className="grid grid-cols-3 gap-1.5 pt-1 text-[8.5px]">
            <div className="bg-white border border-[#CBD5E1] p-1 rounded text-center font-medium text-[#475569]">
              📉 Uji Correlation
            </div>
            <div className="bg-white border border-[#CBD5E1] p-1 rounded text-center font-medium text-[#475569]">
              📊 Analisis Metrik
            </div>
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-1 rounded text-center font-bold">
              ✓ NIST P-val &gt; 0.01
            </div>
          </div>
        </div>
      );

    /* ──────────────────────────────────────────────────────────────────────────
     * 2. Manufacturing Digital Operations System (MOM / MES)
     * Direct replica of Dashboard.tsx in:
     * c:\Users\panpe\Downloads\manufacturing-digital-operations\apps\frontend\src\pages\Dashboard.tsx
     * ────────────────────────────────────────────────────────────────────────── */
    case 'manufacturing-digital-operations':
      return (
        <div className="w-[380px] sm:w-[440px] bg-slate-50 text-slate-900 p-3.5 space-y-2.5 font-sans text-[10px] select-none border border-slate-200">
          {/* Operational Command Center Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
            <div>
              <div className="font-bold text-xs text-slate-900">Operational Command Center</div>
              <div className="text-[8.5px] text-slate-500">Real-time manufacturing operations & quality gate events</div>
            </div>
            <span className="px-2 py-0.5 rounded text-[8.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live on Vercel</span>
            </span>
          </div>

          {/* 4 KPI Cards (Direct match with summary.inventory / procurement / production / quality) */}
          <div className="grid grid-cols-4 gap-1.5">
            <div className="bg-white border border-slate-200 p-1.5 rounded flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-slate-500 font-bold uppercase">Deficit</span>
                <AlertTriangle className="w-3 h-3 text-amber-500" />
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">14</div>
              <div className="text-[7.5px] text-slate-400">SKUs Low Stock</div>
            </div>

            <div className="bg-white border border-slate-200 p-1.5 rounded flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-slate-500 font-bold uppercase">Req (PR)</span>
                <ShoppingCart className="w-3 h-3 text-blue-500" />
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">8</div>
              <div className="text-[7.5px] text-slate-400">Pending Auth</div>
            </div>

            <div className="bg-white border border-slate-200 p-1.5 rounded flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-slate-500 font-bold uppercase">Prod Order</span>
                <Target className="w-3 h-3 text-purple-500" />
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1">6</div>
              <div className="text-[7.5px] text-slate-400">In Progress</div>
            </div>

            <div className="bg-white border border-slate-200 p-1.5 rounded flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-slate-500 font-bold uppercase">Defect Gate</span>
                <ShieldAlert className="w-3 h-3 text-rose-500" />
              </div>
              <div className="text-xs font-bold text-rose-600 mt-1">2</div>
              <div className="text-[7.5px] text-slate-400">Failed QC</div>
            </div>
          </div>

          {/* Data Table: Production Status & Active Work Orders */}
          <div className="bg-white border border-slate-200 rounded overflow-hidden">
            <div className="px-2 py-1 bg-slate-100 border-b border-slate-200 text-[8.5px] font-bold text-slate-700">
              Active Production Work Orders
            </div>
            <table className="w-full text-left text-[8.5px]">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-1 px-2">Order ID</th>
                  <th className="p-1">SKU / Item</th>
                  <th className="p-1">Target</th>
                  <th className="p-1 pr-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-1 px-2 font-mono font-medium text-slate-800">WO-2026-004</td>
                  <td className="p-1 text-slate-600">FG-PRECISION-SHAFT</td>
                  <td className="p-1 font-bold text-slate-700">1,500 pcs</td>
                  <td className="p-1 pr-2 text-right">
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[8px] font-bold">
                      IN PROGRESS
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-1 px-2 font-mono font-medium text-slate-800">WO-2026-005</td>
                  <td className="p-1 text-slate-600">FG-HOUSING-ALUM</td>
                  <td className="p-1 font-bold text-slate-700">800 pcs</td>
                  <td className="p-1 pr-2 text-right">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[8px] font-bold">
                      READY
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer Tests Strip */}
          <div className="flex items-center justify-between text-[8px] text-slate-500 pt-0.5">
            <span>Enterprise Ledger · PostgreSQL ACID Engine</span>
            <span className="text-emerald-600 font-bold">✓ 252 Automated Jest Tests Passing</span>
          </div>
        </div>
      );

    /* ──────────────────────────────────────────────────────────────────────────
     * 3. RetailInsight AI
     * Sales intelligence & Churn Prediction Studio
     * ────────────────────────────────────────────────────────────────────────── */
    case 'retailinsight-ai':
      return (
        <div className="w-[380px] sm:w-[440px] bg-slate-900 text-white p-3.5 space-y-2.5 font-sans text-[10px] select-none border border-slate-700">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <div>
              <div className="font-bold text-xs text-white">RetailInsight AI · Analytics Studio</div>
              <div className="text-[8.5px] text-slate-400">Sales Velocity, RFM Clusters & Churn Predictor</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-500 text-white shadow-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Live on Vercel</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
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
     * Direct replica of Dashboard.jsx in:
     * c:\Users\panpe\Downloads\ai-learning-insight-capstone\.../Dashboard.jsx
     * ────────────────────────────────────────────────────────────────────────── */
    case 'adaptive-learning-insight':
      return (
        <div className="w-[380px] sm:w-[440px] bg-white text-gray-900 p-3.5 space-y-2.5 font-sans text-[10px] select-none border border-gray-200">
          {/* Header matching Dashboard.jsx */}
          <div className="flex items-center justify-between pb-1.5 border-b border-gray-100">
            <div>
              <div className="font-bold text-xs text-gray-900">Halo, Novan! 👋</div>
              <div className="text-[8.5px] text-gray-500">Program Asah 2025 · Dicoding × Accenture · React & Back-End with AI</div>
            </div>
            <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              React + AI Cohort
            </span>
          </div>

          {/* 3 Statistic Cards matching Dashboard.jsx */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-xs flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[7.5px] text-gray-400 font-bold uppercase">TARGET</p>
                <p className="text-[9px] font-bold text-gray-900">Web Dev</p>
              </div>
            </div>

            <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-xs flex items-center gap-2">
              <div className="p-1.5 bg-green-50 text-green-600 rounded-lg">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[7.5px] text-gray-400 font-bold uppercase">NILAI UJIAN</p>
                <p className="text-[9px] font-bold text-gray-900">88.5 <span className="text-[7.5px] font-normal text-gray-400">/ 100</span></p>
              </div>
            </div>

            <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-xs flex items-center gap-2">
              <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[7.5px] text-gray-400 font-bold uppercase">WAKTU</p>
                <p className="text-[9px] font-bold text-gray-900">42 Jam</p>
              </div>
            </div>
          </div>

          {/* Aktivitas Chart header matching Dashboard.jsx */}
          <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-xs space-y-1">
            <div className="flex justify-between items-center text-[8.5px]">
              <span className="font-bold text-gray-800 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-blue-600" /> Aktivitas Belajar (Okt 2026)
              </span>
              <div className="flex bg-gray-100 p-0.5 rounded text-[8px]">
                <span className="px-1.5 py-0.5 rounded bg-white text-blue-600 font-bold shadow-xs">Harian</span>
                <span className="px-1.5 py-0.5 text-gray-500">Mingguan</span>
              </div>
            </div>
            {/* Progress line curve */}
            <div className="h-9 flex items-end gap-1 pt-1">
              {[40, 65, 55, 80, 70, 90, 85, 95, 90, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${h}%` }} />
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
     * 5. YouTube Sentiment Analysis
     * Direct replica of NLP pipeline in:
     * c:\Users\panpe\Downloads\Analisis Sentimen Mobil Listrik
     * ────────────────────────────────────────────────────────────────────────── */
    case 'youtube-sentiment-jumbo':
      return (
        <div className="w-[380px] sm:w-[440px] bg-white text-slate-900 p-3.5 space-y-2.5 font-sans text-[10px] select-none border border-slate-200">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
            <div>
              <div className="font-bold text-xs text-slate-900">YouTube Comment Sentiment Classifier</div>
              <div className="text-[8.5px] text-slate-500">Support Vector Machine (SVM) · InSet Lexicon</div>
            </div>
            <span className="px-2 py-0.5 rounded text-[8.5px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
              N=12,500 Data
            </span>
          </div>

          {/* Sentiment Distribution Bar */}
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1.5">
            <div className="flex justify-between text-[8.5px] text-slate-600">
              <span className="font-bold">Distribusi Sentimen Ulasan</span>
              <span className="text-slate-400 font-mono">100% Normalized</span>
            </div>
            <div className="h-3.5 bg-slate-200 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-500 w-[74%]" />
              <div className="h-full bg-amber-400 w-[17%]" />
              <div className="h-full bg-rose-500 w-[9%]" />
            </div>
            <div className="flex justify-between text-[8.5px] font-medium pt-0.5">
              <span className="text-emerald-700 font-bold">● Positif 74.2%</span>
              <span className="text-amber-700 font-bold">● Netral 16.8%</span>
              <span className="text-rose-700 font-bold">● Negatif 9.0%</span>
            </div>
          </div>

          {/* Model Evaluation Metrics */}
          <div className="grid grid-cols-3 gap-1.5 text-center text-[8.5px]">
            <div className="bg-slate-50 border border-slate-200 p-1.5 rounded">
              <div className="text-slate-400">Akurasi Model</div>
              <div className="font-bold text-slate-900 text-[10px]">91.8%</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-1.5 rounded">
              <div className="text-slate-400">F1-Score</div>
              <div className="font-bold text-emerald-600 text-[10px]">92.4%</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-1.5 rounded">
              <div className="text-slate-400">Stemming</div>
              <div className="font-bold text-purple-600 text-[10px]">InSet ID</div>
            </div>
          </div>
        </div>
      );

    /* ──────────────────────────────────────────────────────────────────────────
     * 6. Sahabat Dunia — Belajar Hewan
     * Direct replica of interactive web in:
     * c:\Users\panpe\Downloads\SahabatDunia\index.html
     * using real card assets from asset/CardMenu
     * ────────────────────────────────────────────────────────────────────────── */
    case 'sahabat-dunia':
      return (
        <div className="w-[380px] sm:w-[440px] bg-gradient-to-b from-[#87CEEB] to-[#E0F6FF] text-[#1E3A8A] p-3.5 space-y-2.5 font-sans text-[10px] select-none border border-sky-300 rounded-xl">
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
              <span className="flex items-center gap-1 text-[8px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Live on Vercel</span>
              </span>
              <div className="flex items-center gap-1 text-[8.5px] bg-white/80 px-2 py-0.5 rounded-full border border-sky-200 text-sky-800">
                <span>🔊</span>
                <span>Audio: Aktif</span>
              </div>
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
        <div className="w-[380px] bg-slate-900 text-white p-3.5 space-y-2 text-[10px]">
          <div className="font-bold text-xs">Project Architecture Verification</div>
          <div className="text-slate-400">Source code validated and indexed.</div>
        </div>
      );
  }
};
