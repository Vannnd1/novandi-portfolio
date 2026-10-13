import React from 'react';
import { ShieldCheck, GitBranch, ArrowUpRight, CheckCircle2, Cpu, BarChart2 } from 'lucide-react';
import type { ProjectItem } from '../data/projects';

interface FlagshipThesisProps {
  project: ProjectItem;
}

export const FlagshipThesis: React.FC<FlagshipThesisProps> = ({ project }) => {
  return (
    <article
      id="research"
      className="bg-white border-2 border-[#111318] rounded-xl p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden"
    >
      {/* Eyebrow and Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E4E4E1]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#059669]/10 border border-[#059669]/25 font-mono-tech text-xs font-semibold text-[#059669]">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>UNDERGRADUATE THESIS (SKRIPSI 2026)</span>
          </span>
          <span className="font-mono-tech text-xs text-[#858A96] hidden sm:inline-block">
            {project.academicContext}
          </span>
        </div>
        <span className="font-mono-tech text-xs text-[#575B66]">Domain: Cryptography & Security</span>
      </div>

      {/* Main Title and Overview */}
      <div className="mt-6 space-y-3">
        <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#111318] tracking-tight leading-[1.1]">
          {project.title}
        </h2>
        <p className="font-sans-body text-base sm:text-lg text-[#575B66] leading-relaxed max-w-3xl">
          {project.summary}
        </p>
      </div>

      {/* Core Cryptographic Metric Highlights */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="p-3.5 rounded bg-[#FAFAF9] border border-[#E4E4E1]">
            <div className="font-mono-tech text-[11px] text-[#575B66] uppercase tracking-wider">
              {metric.label}
            </div>
            <div className="font-mono-tech text-sm sm:text-base font-bold text-[#111318] mt-1">
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Deep-Dive Grid: Theory / Math Kernel & Execution Pipeline */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Mathematical Formulation & Composition (6 cols) */}
        <div className="lg:col-span-6 bg-[#FAFAF9] border border-[#E4E4E1] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-xs font-semibold text-[#111318] flex items-center gap-1.5 uppercase">
              <Cpu className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
              <span>Chaotic Mathematical Kernels</span>
            </span>
            <span className="font-mono-tech text-[11px] text-[#059669] font-medium">Numba JIT Accelerated</span>
          </div>

          <p className="text-xs text-[#575B66] leading-relaxed">
            The core cryptosystem evaluates five chaotic map algorithms, anchored by the composite{' '}
            <strong className="text-[#111318] font-medium">Gauss-MS Map (GoF)</strong> and{' '}
            <strong className="text-[#111318] font-medium">MS-Gauss Map (FoG)</strong>:
          </p>

          <div className="bg-[#111318] text-[#FAFAF9] rounded p-3.5 font-mono-tech text-xs space-y-2 overflow-x-auto">
            <div className="text-[#858A96] text-[11px]"># Gauss-MS Composite Function (GoF)</div>
            <div className="text-[#93C5FD]">
              GoF(x) = [ exp(-α · (f(x))²) + β ] mod 1
            </div>
            <div className="text-[#858A96] text-[11px] pt-1"># Modified Sine Map (MS Map) Inner Kernel</div>
            <div className="text-[#FAFAF9]">
              f(x) = [ (r · λ · x) / (1 + λ · (1 - x)²) ] mod 1
            </div>
            <div className="text-[#858A96] text-[10px] pt-1 border-t border-[#2E303A]">
              Parameters: α=5.8, β=2.5, r=3.5, λ=3.5, X₀=0.3, skip=200
            </div>
          </div>

          <div className="text-xs text-[#575B66] space-y-1.5 pt-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
              <span>8-bit uniform keystream: <code className="font-mono-tech text-[11px] text-[#111318]">K_k = ⌊X_k × 10⁶⌋ mod 256</code></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
              <span>Symmetric XOR diffusion with 100% loss-free reversibility</span>
            </div>
          </div>
        </div>

        {/* Right: Security & Validation Pipeline (6 cols) */}
        <div className="lg:col-span-6 bg-[#FAFAF9] border border-[#E4E4E1] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono-tech text-xs font-semibold text-[#111318] flex items-center gap-1.5 uppercase">
              <BarChart2 className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
              <span>Security Evaluation & Test Pipeline</span>
            </span>
            <span className="font-mono-tech text-[11px] text-[#2563EB] font-medium">Empirical Evidence</span>
          </div>

          <ul className="space-y-2 text-xs text-[#575B66]">
            {project.architectureDetails?.slice(0, 4).map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#2563EB] font-bold font-mono-tech mt-0.5">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 border-t border-[#E4E4E1] flex flex-wrap items-center gap-2">
            <span className="font-mono-tech text-[11px] text-[#575B66]">Validated With:</span>
            <span className="font-mono-tech text-[11px] bg-white border border-[#E4E4E1] px-2 py-0.5 rounded text-[#111318]">
              NIST SP 800-22 (Runs, FFT, Entropy)
            </span>
            <span className="font-mono-tech text-[11px] bg-white border border-[#E4E4E1] px-2 py-0.5 rounded text-[#111318]">
              Lyapunov Exponent (LLE)
            </span>
            <span className="font-mono-tech text-[11px] bg-white border border-[#E4E4E1] px-2 py-0.5 rounded text-[#111318]">
              Bifurcation Analysis
            </span>
          </div>
        </div>

      </div>

      {/* Tech Stack Pills & Direct Repository Link */}
      <div className="mt-8 pt-5 border-t border-[#E4E4E1] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono-tech text-xs text-[#858A96] mr-2">Core Stack:</span>
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono-tech text-xs px-2.5 py-1 rounded bg-[#F4F4F2] border border-[#E4E4E1] text-[#111318]"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#111318] hover:bg-[#2563EB] text-white font-mono-tech text-xs font-medium rounded transition-colors focus-visible:outline-2 focus-visible:outline-[#2563EB]"
          >
            <GitBranch className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Inspect Thesis Repository</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
};
