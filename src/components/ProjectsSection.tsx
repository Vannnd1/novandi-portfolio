import React, { useState } from 'react';
import { projectsData } from '../data/projects';
import { FlagshipThesis } from './FlagshipThesis';
import { ProjectCard } from './ProjectCard';
import { CaseStudyModal } from './CaseStudyModal';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'systems' | 'data-ai' | 'academic'>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const thesisProject = projectsData.find((p) => p.id === 'chaotic-image-encryption');
  const secondaryProjects = projectsData.filter((p) => p.id !== 'chaotic-image-encryption');
  const activeCaseStudyProject = projectsData.find((p) => p.id === selectedProjectId) ?? null;

  const filteredProjects = secondaryProjects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'systems') return p.category === 'flagship-systems';
    if (filter === 'data-ai') return p.category === 'data-ai';
    if (filter === 'academic') return p.category === 'academic-coursework' || p.category === 'interactive';
    return true;
  });

  return (
    <section className="py-16 md:py-24 max-w-5xl mx-auto px-5 sm:px-8 space-y-16">
      
      {/* 1. Flagship Research Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono-tech text-xs text-[#2563EB] uppercase font-semibold">
          <span className="w-2 h-0.5 bg-[#2563EB]" />
          <span>01 · Flagship Thesis Research</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111318]">
          Applied Cryptography & Mathematical Image Security
        </h2>
        <p className="font-sans-body text-sm sm:text-base text-[#575B66] max-w-2xl leading-relaxed">
          Culminating undergraduate research project at Universitas Gunadarma, demonstrating mathematical formulation, JIT compilation performance, and empirical NIST statistical validation.
        </p>
      </div>

      {/* Flagship Thesis Dedicated Component */}
      {thesisProject && (
        <FlagshipThesis
          project={thesisProject}
          onOpenCaseStudy={setSelectedProjectId}
        />
      )}

      {/* 2. Secondary Verified Projects Section */}
      <div id="systems" className="pt-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pb-4 border-b border-[#E4E4E1]">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#2563EB] uppercase font-semibold">
              <span className="w-2 h-0.5 bg-[#2563EB]" />
              <span>02 · Systems, Intelligence & Interactive Works</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111318] mt-1">
              Selected Engineering Codebases
            </h2>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F4F4F2] rounded-md font-mono-tech text-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded transition-colors ${
                filter === 'all'
                  ? 'bg-white text-[#111318] shadow-xs font-semibold'
                  : 'text-[#575B66] hover:text-[#111318]'
              }`}
            >
              All ({secondaryProjects.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('systems')}
              className={`px-3 py-1.5 rounded transition-colors ${
                filter === 'systems'
                  ? 'bg-white text-[#111318] shadow-xs font-semibold'
                  : 'text-[#575B66] hover:text-[#111318]'
              }`}
            >
              Systems
            </button>
            <button
              type="button"
              onClick={() => setFilter('data-ai')}
              className={`px-3 py-1.5 rounded transition-colors ${
                filter === 'data-ai'
                  ? 'bg-white text-[#111318] shadow-xs font-semibold'
                  : 'text-[#575B66] hover:text-[#111318]'
              }`}
            >
              Data & AI
            </button>
            <button
              type="button"
              onClick={() => setFilter('academic')}
              className={`px-3 py-1.5 rounded transition-colors ${
                filter === 'academic'
                  ? 'bg-white text-[#111318] shadow-xs font-semibold'
                  : 'text-[#575B66] hover:text-[#111318]'
              }`}
            >
              Cohort & Academic
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div id="ai" className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={setSelectedProjectId}
            />
          ))}
        </div>
      </div>

      {/* Expandable Case Study Modal */}
      <CaseStudyModal
        project={activeCaseStudyProject}
        onClose={() => setSelectedProjectId(null)}
      />

    </section>
  );
};
