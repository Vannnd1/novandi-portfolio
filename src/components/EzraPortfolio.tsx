import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { GithubHeatmap } from './GithubHeatmap';
import { SocialPill } from './SocialPill';
import { TechPill } from './TechPill';
import { ProjectMockup } from './ProjectMockup';
import { StickerCard } from './StickerCard';
import { CaseStudyModal } from './CaseStudyModal';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from './Icons';
import { BookOpen } from 'lucide-react';

type TabType = 'experience' | 'education' | 'works';

export const EzraPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('experience');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const activeProject = projectsData.find((p) => p.id === selectedProjectId) ?? null;

  return (
    <div className="min-h-screen bg-white text-[#101010] selection:bg-[#ffd3e5] selection:text-[#fd4aa6]">
      
      {/* 1. Sticky Header with Ezra's exact brand logo */}
      <header className="sticky top-0 z-50 backdrop-blur-[18px] bg-white/80 border-b border-[#101010]/10">
        <nav className="max-w-[760px] mx-auto px-5 sm:px-6 h-[70px] flex items-center justify-center select-none">
          <a
            href="/"
            className="font-hegarty text-[32px] text-[#101010] stroke-title no-underline hover:opacity-90 transition-opacity"
            aria-label="novandi.dev home"
          >
            novandi.dev
          </a>
        </nav>
      </header>

      {/* 2. Main Page Shell (Max Width ~760px matching Ezra's central column) */}
      <main className="max-w-[760px] mx-auto px-5 sm:px-6 pt-10 sm:pt-14 pb-20 space-y-16">
        
        {/* GitHub Calendar Heatmap Section */}
        <section aria-label="GitHub contribution calendar" className="w-full">
          <GithubHeatmap />
        </section>

        {/* Intro Hero Section matching Ezra's exact HTML layout */}
        <section className="space-y-4 pt-2">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <p className="font-hegarty text-4xl sm:text-[42px] text-[#101010] stroke-title m-0">
              hello, i'm
            </p>
            <h1 className="font-hegarty text-4xl sm:text-[42px] text-[#101010] stroke-title m-0">
              novandi ramdhan
            </h1>
          </div>

          <p className="font-space text-lg sm:text-[20px] text-[#101010] font-medium leading-[1.8] pt-1">
            an informatics engineer focus mainly on software systems & applied cryptography.{' '}
            <span className="text-[#929292]">
              i'm also curious about what happens behind the screen, from mathematical chaotic cryptosystems to scalable enterprise architectures and data intelligence.
            </span>{' '}
            i share my journey on{' '}
            <SocialPill
              href="https://linkedin.com"
              icon={<LinkedInIcon className="w-3.5 h-3.5" />}
              label="linkedin"
              variant="linkedin"
              tilt={-1.2}
            />{' '}
            and{' '}
            <SocialPill
              href={profileData.instagramUrl}
              icon={<InstagramIcon className="w-3.5 h-3.5" />}
              label="instagram"
              variant="instagram"
              tilt={2.1}
            />
            , and keep everything i build on{' '}
            <SocialPill
              href={profileData.githubUrl}
              icon={<GitHubIcon className="w-3.5 h-3.5" />}
              label="github"
              variant="github"
              tilt={0.3}
            />
            .
          </p>
        </section>

        {/* Portfolio Tabs Navigation */}
        <section className="pt-4 space-y-12">
          <div className="flex items-end gap-9 border-b border-[#d8d8d8] overflow-x-auto select-none">
            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`font-hegarty text-2xl pb-3.5 border-b-[3px] transition-colors cursor-pointer leading-none ${
                activeTab === 'experience'
                  ? 'text-black border-b-[#fd4aa6]'
                  : 'text-[#767676] border-b-transparent hover:text-black'
              }`}
            >
              experience
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`font-hegarty text-2xl pb-3.5 border-b-[3px] transition-colors cursor-pointer leading-none ${
                activeTab === 'education'
                  ? 'text-black border-b-[#fd4aa6]'
                  : 'text-[#767676] border-b-transparent hover:text-black'
              }`}
            >
              education
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('works')}
              className={`font-hegarty text-2xl pb-3.5 border-b-[3px] transition-colors cursor-pointer leading-none ${
                activeTab === 'works'
                  ? 'text-black border-b-[#fd4aa6]'
                  : 'text-[#767676] border-b-transparent hover:text-black'
              }`}
            >
              works
            </button>
          </div>

          {/* Dynamic Tab Panel */}
          <div className="pt-2">
            
            {/* TAB 1: EXPERIENCE */}
            {activeTab === 'experience' && (
              <div className="flex flex-col gap-14 animate-in fade-in duration-300">
                {/* Item 1 */}
                <article className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 items-start relative">
                  <div>
                    <h3 className="font-hegarty text-3xl sm:text-[40px] text-black leading-[1.05] m-0">
                      Discrete MOM / MES
                    </h3>
                    <p className="font-geist text-lg sm:text-[20px] text-[#767676] font-semibold mt-2.5 mb-0 leading-[1.35]">
                      Lead Full-Stack Systems Engineer (Independent & Coursework)
                    </p>
                  </div>
                  <time className="font-dm-sans italic font-bold text-3xl sm:text-[44px] text-[#3d3d3d] text-right leading-none shrink-0">
                    2024-2025
                  </time>
                  <p className="font-space font-medium text-base text-[#777] leading-[1.6] col-span-2 mt-3 m-0">
                    Engineered an enterprise-grade Discrete Manufacturing Operations Management (MOM/MES) platform from scratch using React 19, Node.js, Express, and PostgreSQL. Implemented Segregation of Duties (SoD) with Role-Based Access Control (RBAC), and maintained 252 automated unit and integration tests passing with 89.9% Jest code coverage.
                  </p>
                </article>

                {/* Item 2 */}
                <article className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 items-start relative">
                  <div>
                    <h3 className="font-hegarty text-3xl sm:text-[40px] text-black leading-[1.05] m-0">
                      Program Asah Dicoding
                    </h3>
                    <p className="font-geist text-lg sm:text-[20px] text-[#767676] font-semibold mt-2.5 mb-0 leading-[1.35]">
                      Cohort Developer — Cloud & Full-Stack Web
                    </p>
                  </div>
                  <time className="font-dm-sans italic font-bold text-3xl sm:text-[44px] text-[#3d3d3d] text-right leading-none shrink-0">
                    2025
                  </time>
                  <p className="font-space font-medium text-base text-[#777] leading-[1.6] col-span-2 mt-3 m-0">
                    Intensive technical cohort by Dicoding Indonesia covering cloud infrastructure, fullstack web services with React and Node.js, and Generative AI fundamentals with AWS. Collaborated in an agile team on the capstone project Adaptive Learning Insight to analyze educational workflows.
                  </p>
                </article>

                {/* Item 3 */}
                <article className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 items-start relative">
                  <div>
                    <h3 className="font-hegarty text-3xl sm:text-[40px] text-black leading-[1.05] m-0">
                      Gunadarma Cryptography Lab
                    </h3>
                    <p className="font-geist text-lg sm:text-[20px] text-[#767676] font-semibold mt-2.5 mb-0 leading-[1.35]">
                      Undergraduate Cryptography Researcher
                    </p>
                  </div>
                  <time className="font-dm-sans italic font-bold text-3xl sm:text-[44px] text-[#3d3d3d] text-right leading-none shrink-0">
                    2025-2026
                  </time>
                  <p className="font-space font-medium text-base text-[#777] leading-[1.6] col-span-2 mt-3 m-0">
                    Formulated, simulated, and benchmarked 5 chaotic map algorithms (Gauss-MS and MS-Gauss Map) using Python and Numba JIT acceleration. Conducted comprehensive empirical validation with NIST SP 800-22 randomness suites, Shannon Entropy, NPCR/UACI differential tests, and Lyapunov exponents.
                  </p>
                </article>
              </div>
            )}

            {/* TAB 2: EDUCATION */}
            {activeTab === 'education' && (
              <div className="flex flex-col gap-14 animate-in fade-in duration-300">
                {/* Edu 1 */}
                <article className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 items-start relative">
                  <div>
                    <h3 className="font-hegarty text-3xl sm:text-[40px] text-black leading-[1.05] m-0">
                      Universitas Gunadarma
                    </h3>
                    <p className="font-geist text-lg sm:text-[20px] text-[#767676] font-semibold mt-2.5 mb-0 leading-[1.35]">
                      S1 Informatika (Bachelor of Computer Science) · IPK 3.64 / 4.00
                    </p>
                  </div>
                  <time className="font-dm-sans italic font-bold text-3xl sm:text-[44px] text-[#3d3d3d] text-right leading-none shrink-0">
                    2022-2026
                  </time>
                  <p className="font-space font-medium text-base text-[#777] leading-[1.6] col-span-2 mt-3 m-0">
                    Undergraduate curriculum in Computer Science focusing on software engineering, database modeling, network security, and machine learning. Final thesis project concentrated on chaotic medical image cryptography validated with NIST SP 800-22 standards.
                  </p>
                </article>

                {/* Edu 2 */}
                <article className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 items-start relative">
                  <div>
                    <h3 className="font-hegarty text-3xl sm:text-[40px] text-black leading-[1.05] m-0">
                      SMKN 1 Cibinong
                    </h3>
                    <p className="font-geist text-lg sm:text-[20px] text-[#767676] font-semibold mt-2.5 mb-0 leading-[1.35]">
                      Multimedia Specialization
                    </p>
                  </div>
                  <time className="font-dm-sans italic font-bold text-3xl sm:text-[44px] text-[#3d3d3d] text-right leading-none shrink-0">
                    2019-2022
                  </time>
                  <p className="font-space font-medium text-base text-[#777] leading-[1.6] col-span-2 mt-3 m-0">
                    Studies in interactive digital media, user interface design principles, graphic assets, audio-visual editing, and frontend foundations.
                  </p>
                </article>
              </div>
            )}

            {/* TAB 3: WORKS (PROJECTS WITH EXACT EZRA PREVIEW & BADGES) */}
            {activeTab === 'works' && (
              <div className="flex flex-col gap-14 animate-in fade-in duration-300">
                {projectsData.map((project) => (
                  <article key={project.id} className="relative group">
                    {/* Title with Case Study trigger */}
                    <div className="flex items-start justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className="text-left group cursor-pointer"
                      >
                        <h3 className="font-hegarty text-3xl sm:text-[40px] text-black leading-[1.05] m-0 group-hover:text-[#fd4aa6] transition-colors">
                          {project.title}
                        </h3>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedProjectId(project.id)}
                        className="p-1.5 rounded-full text-[#9CA3AF] hover:text-[#fd4aa6] hover:bg-[#F3F4F6] transition-colors cursor-pointer shrink-0"
                        title="View Full Case Study"
                      >
                        <BookOpen className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="font-space font-medium text-base text-[#777] leading-[1.6] mt-3 mb-0">
                      {project.summary}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label="Tech stack">
                      {project.techStack.map((tech) => (
                        <TechPill key={tech} name={tech} />
                      ))}
                    </div>

                    {/* Desktop Floating Mockup Preview on Hover (Exact Ezra Screenshot 3) */}
                    <div className="hidden lg:block opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out absolute top-1/2 left-[calc(100%+28px)] -translate-y-1/2 z-30 pointer-events-none rounded-xl border-4 border-white shadow-[0_18px_30px_rgba(0,0,0,0.2)] overflow-hidden">
                      <ProjectMockup projectId={project.id} />
                    </div>

                    {/* Mobile/Tablet inline mockup */}
                    <div className="lg:hidden mt-4 pt-2">
                      <ProjectMockup projectId={project.id} />
                    </div>
                  </article>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Lime Green CTA Card (Exact Ezra CTA) */}
        <section aria-label="Call to Action" className="pt-16">
          <StickerCard />
        </section>

        {/* Giant Brand Wordmark Footer (Exact Ezra Footer Typography) */}
        <section className="pt-24 pb-6 overflow-hidden select-none">
          <p className="font-hegarty text-[clamp(90px,18vw,260px)] text-[#202020] text-center leading-[0.9] tracking-[-0.04em] whitespace-nowrap m-0 opacity-95">
            novandi.dev
          </p>
        </section>

      </main>

      {/* Dark Footer Bar matching Ezra's exact bottom bar */}
      <footer className="w-full bg-[#202020] text-white h-[110px] sm:h-[135px] px-6 sm:px-20 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
        <p className="font-hegarty text-sm sm:text-[0.95rem] text-white flex items-center gap-4 m-0">
          <span>@novandi ramdhan</span>
          <span aria-hidden="true">•</span>
          <span>all right reserved</span>
        </p>

        <nav className="flex items-center gap-6 font-hegarty text-base sm:text-[1.15rem]" aria-label="Footer navigation">
          <a
            href={profileData.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#cf2ee3] hover:underline no-underline"
          >
            github
          </a>
          <a
            href={profileData.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#f0258d] hover:underline no-underline"
          >
            instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-[#46b8ff] hover:underline no-underline"
          >
            linkedin
          </a>
        </nav>
      </footer>

      {/* Modal Case Study for Deep Engineering Verification */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setSelectedProjectId(null)}
      />
    </div>
  );
};
