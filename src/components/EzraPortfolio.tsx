import React, { useState } from 'react';
import { GitBranch, BookOpen } from 'lucide-react';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { GithubHeatmap } from './GithubHeatmap';
import { SocialPill } from './SocialPill';
import { TechPill } from './TechPill';
import { ProjectMockup } from './ProjectMockup';
import { StickerCard } from './StickerCard';
import { CaseStudyModal } from './CaseStudyModal';
import { GitHubIcon } from './Icons';

type TabType = 'experience' | 'education' | 'works';

export const EzraPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('experience');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const activeProject = projectsData.find((p) => p.id === selectedProjectId) ?? null;

  return (
    <div className="min-h-screen bg-white text-[#111318] selection:bg-pink-100 selection:text-[#ec4899] flex flex-col justify-between">
      {/* Centered Main Editorial Column (Max-width ~680px matching Ezra's site) */}
      <div className="w-full max-w-2xl mx-auto px-5 sm:px-6 pt-12 sm:pt-16 pb-20 space-y-12">
        
        {/* 1. Top Minimalist Logo */}
        <header className="flex justify-center select-none">
          <a
            href="/"
            className="font-display font-black text-2xl tracking-tighter text-[#111318] hover:text-[#ec4899] transition-colors"
          >
            novandi.dev
          </a>
        </header>

        {/* 2. GitHub Contribution Calendar Heatmap */}
        <section aria-label="GitHub Activity" className="pt-2">
          <GithubHeatmap />
        </section>

        {/* 3. Hero Introduction */}
        <section className="space-y-4 pt-2">
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-[42px] tracking-tight text-[#111318] leading-[1.05]">
            hello. i'm novandi ramdhan
          </h1>

          <div className="space-y-3 font-sans text-base sm:text-lg text-[#374151] leading-relaxed">
            <p className="font-medium text-[#111318]">
              an informatics engineer focus mainly on software systems & applied cryptography.
            </p>
            <p className="text-[#4B5563]">
              i'm also curious about what happens behind the screen, from mathematical chaotic cryptosystems to scalable enterprise architectures and data intelligence.
            </p>
            <div className="text-[#4B5563] pt-1">
              <span>i share my journey on </span>
              <SocialPill
                href={profileData.githubUrl}
                icon={<GitHubIcon className="w-3 h-3" />}
                label="github"
                variant="github"
              />
              <span> and </span>
              <SocialPill
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.email}`}
                label="gmail"
                variant="gmail"
              />
              <span>, and connect via </span>
              <SocialPill
                href="https://linkedin.com"
                label="linkedin"
                variant="linkedin"
              />
              <span>.</span>
            </div>
          </div>
        </section>

        {/* 4. Tab Switcher Navigation */}
        <nav className="pt-6 border-b border-[#F3F4F6] flex items-center gap-8 select-none">
          <button
            type="button"
            onClick={() => setActiveTab('experience')}
            className={`font-display font-black text-base sm:text-lg pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'experience'
                ? 'text-[#111318]'
                : 'text-[#9CA3AF] hover:text-[#111318]'
            }`}
          >
            experience
            {activeTab === 'experience' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ec4899] rounded-full animate-in fade-in duration-200" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('education')}
            className={`font-display font-black text-base sm:text-lg pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'education'
                ? 'text-[#111318]'
                : 'text-[#9CA3AF] hover:text-[#111318]'
            }`}
          >
            education
            {activeTab === 'education' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ec4899] rounded-full animate-in fade-in duration-200" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('works')}
            className={`font-display font-black text-base sm:text-lg pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'works'
                ? 'text-[#111318]'
                : 'text-[#9CA3AF] hover:text-[#111318]'
            }`}
          >
            works
            {activeTab === 'works' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ec4899] rounded-full animate-in fade-in duration-200" />
            )}
          </button>
        </nav>

        {/* 5. Dynamic Tab Content */}
        <main className="space-y-12">
          {/* TAB 1: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              {/* Item 1 */}
              <article className="space-y-2">
                <div className="flex justify-between items-baseline gap-4">
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-[#111318] tracking-tight">
                    Discrete MOM / MES
                  </h2>
                  <span className="font-serif italic text-base sm:text-lg text-[#6B7280] shrink-0">
                    2024–2025
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold font-sans text-[#4B5563]">
                  Lead Full-Stack Systems Engineer (Independent & Coursework)
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed pt-1">
                  Engineered an enterprise-grade Discrete Manufacturing Operations Management (MOM/MES) platform from scratch using React 19, Node.js, Express, and PostgreSQL. Implemented Segregation of Duties (SoD) with Role-Based Access Control (RBAC), and maintained 252 automated unit and integration tests passing with 89.9% Jest code coverage.
                </p>
              </article>

              {/* Item 2 */}
              <article className="space-y-2">
                <div className="flex justify-between items-baseline gap-4">
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-[#111318] tracking-tight">
                    Program Asah Dicoding
                  </h2>
                  <span className="font-serif italic text-base sm:text-lg text-[#6B7280] shrink-0">
                    2025
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold font-sans text-[#4B5563]">
                  Cohort Developer — Cloud & Full-Stack Web
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed pt-1">
                  Intensive technical cohort by Dicoding Indonesia covering cloud infrastructure, fullstack web services with React and Node.js, and Generative AI fundamentals with AWS. Collaborated in an agile team on the capstone project Adaptive Learning Insight.
                </p>
              </article>

              {/* Item 3 */}
              <article className="space-y-2">
                <div className="flex justify-between items-baseline gap-4">
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-[#111318] tracking-tight">
                    Gunadarma Cryptography Lab
                  </h2>
                  <span className="font-serif italic text-base sm:text-lg text-[#6B7280] shrink-0">
                    2025–2026
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold font-sans text-[#4B5563]">
                  Undergraduate Cryptography Researcher
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed pt-1">
                  Formulated, simulated, and benchmarked 5 chaotic map kernels (Gauss-MS and MS-Gauss Map) using Python and Numba JIT acceleration. Conducted comprehensive empirical validation with NIST SP 800-22 randomness suites, Shannon Entropy, NPCR/UACI differential tests, and Lyapunov exponents.
                </p>
              </article>
            </div>
          )}

          {/* TAB 2: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-10 animate-in fade-in duration-300">
              {/* Item 1 */}
              <article className="space-y-2">
                <div className="flex justify-between items-baseline gap-4">
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-[#111318] tracking-tight">
                    Universitas Gunadarma
                  </h2>
                  <span className="font-serif italic text-base sm:text-lg text-[#6B7280] shrink-0">
                    2022–2026
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold font-sans text-[#4B5563]">
                  S1 Informatika (Bachelor of Computer Science) · IPK 3.64 / 4.00
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed pt-1">
                  Undergraduate degree in Informatics with focus on software engineering, algorithms, database systems, computer security, and machine learning. Culminating in undergraduate thesis research on medical image encryption using composite chaotic maps evaluated with NIST SP 800-22 standards.
                </p>
              </article>

              {/* Item 2 */}
              <article className="space-y-2">
                <div className="flex justify-between items-baseline gap-4">
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-[#111318] tracking-tight">
                    SMKN 1 Cibinong
                  </h2>
                  <span className="font-serif italic text-base sm:text-lg text-[#6B7280] shrink-0">
                    2019–2022
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold font-sans text-[#4B5563]">
                  Multimedia Specialization
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed pt-1">
                  Foundational education in interactive digital media, user interface principles, visual assets, graphic design, and front-end web technologies.
                </p>
              </article>
            </div>
          )}

          {/* TAB 3: WORKS (PROJECTS) */}
          {activeTab === 'works' && (
            <div className="space-y-14 animate-in fade-in duration-300">
              {projectsData.map((project) => (
                <article key={project.id} className="space-y-4">
                  {/* Title & Actions */}
                  <div className="flex items-start justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedProjectId(project.id)}
                      className="text-left group cursor-pointer"
                    >
                      <h2 className="font-display font-black text-2xl sm:text-[28px] text-[#111318] group-hover:text-[#ec4899] transition-colors tracking-tight leading-snug">
                        {project.title}
                      </h2>
                    </button>

                    <div className="flex items-center gap-2 pt-1 shrink-0">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded text-[#9CA3AF] hover:text-[#111318] hover:bg-[#F3F4F6] transition-colors"
                          title="View GitHub Repository"
                        >
                          <GitBranch className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className="p-1.5 rounded text-[#9CA3AF] hover:text-[#ec4899] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
                        title="Open Case Study"
                      >
                        <BookOpen className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Body: Narrative on Left, Visual Mockup on Right */}
                  <div className="flex flex-col sm:flex-row items-start gap-5">
                    <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed flex-1">
                      {project.summary}
                    </p>
                    <ProjectMockup projectId={project.id} />
                  </div>

                  {/* Colorful Tech Stack Pills (Ezra Style) */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <TechPill key={tech} name={tech} />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>

        {/* 6. Iconic Lime Green Sticker Card */}
        <section aria-label="Call to Action" className="pt-4">
          <StickerCard />
        </section>

        {/* 7. Giant Brand Wordmark Footer */}
        <section className="pt-8 pb-4 select-none">
          <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter text-[#111318] text-center opacity-95">
            novandi.dev
          </div>
        </section>

      </div>

      {/* 8. Bottom Dark Bar */}
      <footer className="w-full bg-[#18181b] text-white py-4 px-6 border-t border-black select-none">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-sans">
          <div className="text-[#9CA3AF]">
            novandi ahmad ramdhan • all right reserved
          </div>
          <div className="flex items-center gap-4 font-bold">
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#ec4899] hover:underline"
            >
              github
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.email}`}
              target="_blank"
              rel="noreferrer"
              className="text-[#38bdf8] hover:underline"
            >
              gmail
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#a855f7] hover:underline"
            >
              linkedin
            </a>
          </div>
        </div>
      </footer>

      {/* Detailed Technical Case Study Modal (Preserved for deep inspection) */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setSelectedProjectId(null)}
      />
    </div>
  );
};
