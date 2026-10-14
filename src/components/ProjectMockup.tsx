import React from 'react';
import { ShieldCheck, Activity, Database, Server, GitFork } from 'lucide-react';

interface ProjectMockupProps {
  projectId: string;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ projectId }) => {
  switch (projectId) {
    case 'chaotic-image-encryption':
      return (
        <div className="w-full sm:w-[260px] md:w-[280px] shrink-0 bg-[#0F1117] border border-[#232733] rounded-xl p-3.5 shadow-lg text-white font-mono text-[10px] space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E2230]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NIST SP 800-22</span>
            </div>
            <span className="text-[#9CA3AF] text-[9px]">P-Value &gt; 0.01</span>
          </div>
          <div className="bg-[#171B26] p-2 rounded border border-[#252C3D] space-y-1">
            <div className="text-[#9CA3AF] text-[9px]">Composite Keystream</div>
            <div className="text-pink-400 font-bold">GoF(x) = exp(-α·f(x)²) mod 1</div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[9px]">
            <div className="bg-[#171B26] p-1.5 rounded">
              <div className="text-[#9CA3AF]">Entropy</div>
              <div className="text-emerald-400 font-bold">7.9994 / 8.0</div>
            </div>
            <div className="bg-[#171B26] p-1.5 rounded">
              <div className="text-[#9CA3AF]">NPCR</div>
              <div className="text-blue-400 font-bold">99.62%</div>
            </div>
          </div>
        </div>
      );

    case 'discrete-mom-mes':
      return (
        <div className="w-full sm:w-[260px] md:w-[280px] shrink-0 bg-[#0F1117] border border-[#232733] rounded-xl p-3.5 shadow-lg text-white font-mono text-[10px] space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E2230]">
            <div className="flex items-center gap-1.5 text-blue-400 font-bold">
              <Database className="w-3.5 h-3.5" />
              <span>Discrete MOM / MES</span>
            </div>
            <span className="text-emerald-400 text-[9px]">252 Tests Passing</span>
          </div>
          <div className="space-y-1.5 text-[9px]">
            <div className="flex justify-between p-1.5 bg-[#171B26] rounded">
              <span className="text-[#9CA3AF]">Coverage</span>
              <span className="text-emerald-400 font-bold">89.9% Jest</span>
            </div>
            <div className="flex justify-between p-1.5 bg-[#171B26] rounded">
              <span className="text-[#9CA3AF]">PostgreSQL Engine</span>
              <span className="text-purple-400 font-bold">ACID Compliant</span>
            </div>
          </div>
        </div>
      );

    case 'ecommerce-churn-analysis':
      return (
        <div className="w-full sm:w-[260px] md:w-[280px] shrink-0 bg-[#0F1117] border border-[#232733] rounded-xl p-3.5 shadow-lg text-white font-mono text-[10px] space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E2230]">
            <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
              <Activity className="w-3.5 h-3.5" />
              <span>Churn Classifier</span>
            </div>
            <span className="text-emerald-400 text-[9px]">ROC-AUC 0.912</span>
          </div>
          <div className="space-y-1 text-[9px] bg-[#171B26] p-2 rounded">
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Dataset Scale</span>
              <span className="text-white font-semibold">100K Records</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Model</span>
              <span className="text-amber-400 font-semibold">RandomForest / SMOTE</span>
            </div>
          </div>
        </div>
      );

    case 'microservice-task-manager':
      return (
        <div className="w-full sm:w-[260px] md:w-[280px] shrink-0 bg-[#0F1117] border border-[#232733] rounded-xl p-3.5 shadow-lg text-white font-mono text-[10px] space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E2230]">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Server className="w-3.5 h-3.5" />
              <span>Service Mesh</span>
            </div>
            <span className="text-emerald-400 text-[9px]">4 Containers UP</span>
          </div>
          <div className="space-y-1 text-[9px] bg-[#171B26] p-2 rounded">
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">Redis Cache</span>
              <span className="text-emerald-400 font-bold">&lt; 2ms latency</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9CA3AF]">JWT Middleware</span>
              <span className="text-blue-400 font-bold">RBAC Verified</span>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full sm:w-[260px] md:w-[280px] shrink-0 bg-[#0F1117] border border-[#232733] rounded-xl p-3.5 shadow-lg text-white font-mono text-[10px] space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#1E2230]">
            <div className="flex items-center gap-1.5 text-purple-400 font-bold">
              <GitFork className="w-3.5 h-3.5" />
              <span>Algorithm Canvas</span>
            </div>
            <span className="text-emerald-400 text-[9px]">60 FPS</span>
          </div>
          <div className="bg-[#171B26] p-2 rounded text-[9px] text-[#9CA3AF]">
            Dijkstra · A* · BFS · DFS Real-time Graph Pathfinding
          </div>
        </div>
      );
  }
};
