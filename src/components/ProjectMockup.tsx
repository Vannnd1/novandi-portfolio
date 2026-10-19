import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ProjectMockupProps {
  projectId: string;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ projectId }) => {
  const [imgLoaded, setImgLoaded] = useState<boolean | null>(null);

  // If a real screenshot exists in /projects/{projectId}.png, display it!
  const customImgSrc = `/projects/${projectId}.png`;

  const renderSimulatedUI = () => {
    switch (projectId) {
      case 'chaotic-image-encryption':
        return (
          <div className="w-[320px] sm:w-[360px] bg-[#0c0e14] text-white p-3.5 space-y-2.5 font-mono text-[11px] select-none">
            {/* Top Window Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-[#1f2430]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="font-space font-medium text-[11px] text-[#9ca3af] ml-1.5">MedCrypt GUI v2.4</span>
              </div>
              <span className="text-[9px] font-space px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                NIST SP 800-22
              </span>
            </div>

            {/* Visual Comparison: MRI Scan vs Chaotic Ciphertext */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#141824] rounded-lg p-2 border border-[#23293d] space-y-1.5 text-center">
                <div className="text-[9px] text-[#9ca3af] font-space font-semibold">Brain MRI Plaintext</div>
                <div className="h-20 rounded bg-gradient-to-b from-[#1a2030] to-[#0a0d14] flex items-center justify-center border border-[#2d354d] relative overflow-hidden">
                  <svg viewBox="0 0 60 60" className="w-12 h-12 text-[#94a3b8] opacity-75">
                    <ellipse cx="30" cy="30" rx="20" ry="24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 1" />
                    <path d="M22 22 Q30 16 38 22 Q42 30 38 38 Q30 44 22 38 Q18 30 22 22 Z" fill="currentColor" opacity="0.4" />
                    <path d="M30 18 L30 42" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                  </svg>
                </div>
                <div className="text-[9px] text-[#9ca3af]">Entropy: <span className="text-white font-bold">4.12</span></div>
              </div>

              <div className="bg-[#141824] rounded-lg p-2 border border-[#23293d] space-y-1.5 text-center">
                <div className="text-[9px] text-[#9ca3af] font-space font-semibold">Gauss-MS Ciphertext</div>
                <div className="h-20 rounded bg-[#0a0d14] flex items-center justify-center border border-pink-500/30 relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-80"
                    style={{
                      backgroundImage: 'radial-gradient(#fd4aa6 0.75px, transparent 0.75px), radial-gradient(#38bdf8 0.75px, #0a0d14 0.75px)',
                      backgroundSize: '6px 6px',
                      backgroundPosition: '0 0, 3px 3px',
                    }}
                  />
                  <span className="relative z-10 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/75 text-pink-400 border border-pink-500/40">
                    ENCRYPTED
                  </span>
                </div>
                <div className="text-[9px] text-[#9ca3af]">Entropy: <span className="text-emerald-400 font-bold">7.9994</span></div>
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-3 gap-1.5 text-[9px] pt-0.5 font-space">
              <div className="bg-[#141824] p-1.5 rounded border border-[#23293d] text-center">
                <div className="text-[#858a96]">NPCR</div>
                <div className="text-emerald-400 font-bold">99.62%</div>
              </div>
              <div className="bg-[#141824] p-1.5 rounded border border-[#23293d] text-center">
                <div className="text-[#858a96]">UACI</div>
                <div className="text-blue-400 font-bold">33.48%</div>
              </div>
              <div className="bg-[#141824] p-1.5 rounded border border-[#23293d] text-center">
                <div className="text-[#858a96]">Speed</div>
                <div className="text-pink-400 font-bold">0.018s</div>
              </div>
            </div>
          </div>
        );

      case 'manufacturing-digital-operations':
        return (
          <div className="w-[320px] sm:w-[360px] bg-[#0c0e14] text-white p-3.5 space-y-2.5 font-mono text-[11px] select-none">
            {/* Top Window Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-[#1f2430]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="font-space font-medium text-[11px] text-[#9ca3af] ml-1.5">OpsCentral MOM / MES</span>
              </div>
              <span className="text-[9px] font-space px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SHOP FLOOR LIVE
              </span>
            </div>

            {/* Real-time Machine Status Table */}
            <div className="space-y-1.5 font-space text-[10px]">
              <div className="flex items-center justify-between p-2 rounded bg-[#141824] border border-[#23293d]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-white">CNC Milling #01</span>
                </div>
                <div className="flex items-center gap-2 text-[9px]">
                  <span className="text-[#858a96]">OEE: 94.2%</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400 font-bold">RUNNING</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#141824] border border-[#23293d]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="font-semibold text-white">Auto Press #04</span>
                </div>
                <div className="flex items-center gap-2 text-[9px]">
                  <span className="text-[#858a96]">Hydraulic Check</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 font-bold">TICKET</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#141824] border border-[#23293d]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-white">Robotic Sorter #02</span>
                </div>
                <div className="flex items-center gap-2 text-[9px]">
                  <span className="text-[#858a96]">OEE: 91.8%</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400 font-bold">OPTIMAL</span>
                </div>
              </div>
            </div>

            {/* Bottom Quality & Test Band */}
            <div className="flex items-center justify-between p-2 rounded bg-[#121622] border border-[#1f2430] text-[9px] font-space">
              <span className="text-[#9ca3af]">Jest Automated Test Suites</span>
              <span className="text-emerald-400 font-bold">252/252 Tests Passing (90% Line Cov)</span>
            </div>
          </div>
        );

      case 'retailinsight-ai':
        return (
          <div className="w-[320px] sm:w-[360px] bg-[#0c0e14] text-white p-3.5 space-y-2.5 font-mono text-[11px] select-none">
            {/* Top Window Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-[#1f2430]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="font-space font-medium text-[11px] text-[#9ca3af] ml-1.5">RetailInsight AI Studio</span>
              </div>
              <span className="text-[9px] font-space px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                Gemini Flash 1.5
              </span>
            </div>

            {/* Metrics & Bar Chart Simulation */}
            <div className="bg-[#141824] p-2.5 rounded-lg border border-[#23293d] space-y-2 font-space">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[9px] text-[#858a96]">Q3 Revenue Velocity</div>
                  <div className="text-sm font-bold text-white">
                    $428,950 <span className="text-emerald-400 text-[10px]">+18.4%</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-[#858a96]">Churn Probability</div>
                  <div className="text-sm font-bold text-emerald-400">2.1% (Low)</div>
                </div>
              </div>

              {/* Mini Chart Bars */}
              <div className="flex items-end gap-1.5 h-12 pt-2 border-t border-[#1e2333]">
                {[35, 50, 42, 65, 58, 80, 75, 90, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t opacity-85"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* AI Recommendation Snippet */}
            <div className="bg-[#11141f] p-2 rounded border border-blue-500/25 flex items-start gap-2 text-[9px] font-space">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-[#cbd5e1] leading-tight">
                <strong className="text-cyan-300">AI Analyst:</strong> High reorder frequency in Tier-1 cluster. Auto-replenishment triggered.
              </span>
            </div>
          </div>
        );

      case 'adaptive-learning-insight':
        return (
          <div className="w-[320px] sm:w-[360px] bg-[#0c0e14] text-white p-3.5 space-y-2.5 font-mono text-[11px] select-none">
            {/* Top Window Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-[#1f2430]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="font-space font-medium text-[11px] text-[#9ca3af] ml-1.5">Adaptive Learning AI</span>
              </div>
              <span className="text-[9px] font-space px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-semibold">
                Dicoding Capstone
              </span>
            </div>

            {/* Progress Rings & Mastery */}
            <div className="bg-[#141824] p-2.5 rounded-lg border border-[#23293d] space-y-2 font-space">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#9ca3af]">Cohort Mastery</span>
                <span className="text-yellow-400 font-bold">88.5% Average</span>
              </div>

              <div className="space-y-1.5 text-[9px]">
                <div>
                  <div className="flex justify-between text-[#858a96] mb-0.5">
                    <span>Full-Stack Web (React & Node.js)</span>
                    <span className="text-white font-bold">94%</span>
                  </div>
                  <div className="h-1.5 bg-[#1f2538] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 w-[94%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#858a96] mb-0.5">
                    <span>Cloud Architecture (AWS GenAI)</span>
                    <span className="text-white font-bold">82%</span>
                  </div>
                  <div className="h-1.5 bg-[#1f2538] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[82%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Adaptive Recommendation */}
            <div className="p-2 rounded bg-[#11141f] border border-[#23293d] flex items-center justify-between text-[9px] font-space">
              <span className="text-[#9ca3af]">1,240 Students Tracked</span>
              <span className="text-emerald-400 font-bold">Personalized Paths Active</span>
            </div>
          </div>
        );

      case 'youtube-sentiment-jumbo':
        return (
          <div className="w-[320px] sm:w-[360px] bg-[#0c0e14] text-white p-3.5 space-y-2.5 font-mono text-[11px] select-none">
            {/* Top Window Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-[#1f2430]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="font-space font-medium text-[11px] text-[#9ca3af] ml-1.5">Film Jumbo Sentiment NLP</span>
              </div>
              <span className="text-[9px] font-space px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold">
                SVM + InSet
              </span>
            </div>

            {/* Sentiment Distribution Visual */}
            <div className="bg-[#141824] p-2.5 rounded-lg border border-[#23293d] space-y-2 font-space">
              <div className="text-[10px] text-[#9ca3af] flex justify-between">
                <span>Sentiment Breakdown</span>
                <span className="text-white font-bold">N=12,500 Comments</span>
              </div>

              {/* Combined sentiment bar */}
              <div className="h-3 bg-[#1f2538] rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-400 w-[74%]" title="Positive 74.2%" />
                <div className="h-full bg-amber-400 w-[17%]" title="Neutral 16.8%" />
                <div className="h-full bg-rose-500 w-[9%]" title="Negative 9.0%" />
              </div>

              <div className="flex justify-between text-[9px] text-[#858a96] pt-0.5">
                <span className="text-emerald-400 font-bold">● Positif 74.2%</span>
                <span className="text-amber-400 font-bold">● Netral 16.8%</span>
                <span className="text-rose-400 font-bold">● Negatif 9.0%</span>
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-2 gap-1.5 text-[9px] font-space">
              <div className="bg-[#141824] p-1.5 rounded border border-[#23293d] text-center">
                <div className="text-[#858a96]">SVM F1-Score</div>
                <div className="text-emerald-400 font-bold">92.4% Verified</div>
              </div>
              <div className="bg-[#141824] p-1.5 rounded border border-[#23293d] text-center">
                <div className="text-[#858a96]">Preprocessing</div>
                <div className="text-purple-400 font-bold">InSet Stemming</div>
              </div>
            </div>
          </div>
        );

      case 'sahabat-dunia':
        return (
          <div className="w-[320px] sm:w-[360px] bg-[#0c0e14] text-white p-3.5 space-y-2.5 font-mono text-[11px] select-none">
            {/* Top Window Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-[#1f2430]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="font-space font-medium text-[11px] text-[#9ca3af] ml-1.5">SahabatDunia Portal</span>
              </div>
              <span className="text-[9px] font-space px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 font-semibold">
                Community Hub
              </span>
            </div>

            {/* Event Cards */}
            <div className="space-y-1.5 font-space text-[10px]">
              <div className="p-2 rounded bg-[#141824] border border-[#23293d] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Mobile Legends Volunteer Cup</div>
                  <div className="text-[9px] text-[#858a96]">Tournament Operations & Stream</div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 font-bold text-[9px]">EVENT 2026</span>
              </div>

              <div className="p-2 rounded bg-[#141824] border border-[#23293d] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Karang Taruna Social Drive</div>
                  <div className="text-[9px] text-[#858a96]">Youth Development & Logistics</div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[9px]">ACTIVE</span>
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="flex justify-between items-center p-2 rounded bg-[#11141f] border border-[#23293d] text-[9px] font-space">
              <span className="text-[#9ca3af]">340+ Registered Volunteers</span>
              <span className="text-pink-400 font-bold">18 Events Executed</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-[320px] sm:w-[360px] bg-[#0c0e14] text-white p-3.5 space-y-2.5 font-mono text-[11px] select-none">
            <div className="flex items-center justify-between pb-2 border-b border-[#1f2430]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="font-space font-medium text-[11px] text-[#9ca3af] ml-1.5">Project Visualizer</span>
              </div>
              <span className="text-[9px] font-space px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                ACTIVE
              </span>
            </div>
            <div className="p-4 rounded bg-[#141824] border border-[#23293d] text-center text-[#858a96] font-space text-[10px]">
              Full-Stack Architecture & Security Verification
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {/* If real image is present and loaded, show it */}
      {imgLoaded === true && (
        <img
          src={customImgSrc}
          alt={`Project preview ${projectId}`}
          className="w-[320px] sm:w-[360px] h-auto rounded-xl object-cover"
        />
      )}

      {/* Hidden tester image to check if a screenshot was dropped in /public/projects/ */}
      {imgLoaded === null && (
        <img
          src={customImgSrc}
          alt=""
          className="hidden"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(false)}
        />
      )}

      {/* If no real image exists, display simulated interactive dashboard */}
      {imgLoaded !== true && renderSimulatedUI()}
    </div>
  );
};
