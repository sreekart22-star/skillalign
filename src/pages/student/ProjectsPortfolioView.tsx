import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FolderGit2,
  Sparkles,
  CheckCircle2,
  Play,
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  Code2,
  Clock,
  Briefcase,
  Layers,
  Award,
  PlusCircle,
} from 'lucide-react';
import { PortfolioProject, ProjectStatus, LearnerProfile, ProjectRecommendation } from '../../types';
import {
  requirementsForRole,
  gapsForLearner,
  generateProjectRecommendationsFromGaps,
} from '../../data/platformData';

interface ProjectsPortfolioViewProps {
  learner: LearnerProfile;
  projects: PortfolioProject[];
  onUpdateProjects: (projects: PortfolioProject[]) => void;
  onNavigate?: (page: string, filter?: string) => void;
}

export const ProjectsPortfolioView: React.FC<ProjectsPortfolioViewProps> = ({
  learner,
  projects,
  onUpdateProjects,
  onNavigate,
}) => {
  const role = requirementsForRole(learner.targetRole);
  const gaps = gapsForLearner(learner, role);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Dynamic recommendations generated from the student's actual gaps
  const aiRecommendedProjects = generateProjectRecommendationsFromGaps(learner, role);

  const defaultProjects: PortfolioProject[] = [
    {
      id: 'proj-ml-churn',
      title: 'Customer Churn & Retention Machine Learning Pipeline',
      skill: 'Machine Learning',
      importance: 'Critical',
      difficulty: 'Intermediate',
      duration: '3 weeks',
      cover: ['Machine Learning', 'Python', 'Pandas', 'Scikit-learn', 'Git'],
      outcome: 'A production-grade classifier with cross-validation, feature importance charts, and containerized REST inference API.',
      status: 'In Progress',
    },
    {
      id: 'proj-cloud-infra',
      title: 'Multi-Tier Containerized Microservices on AWS',
      skill: 'Cloud Computing',
      importance: 'Critical',
      difficulty: 'Intermediate',
      duration: '3 weeks',
      cover: ['Cloud Computing', 'AWS', 'Docker', 'Linux', 'Git'],
      outcome: 'Automated infrastructure-as-code template deploying stateless containers behind an Application Load Balancer.',
      status: 'Planned',
    },
    {
      id: 'proj-analytics-dash',
      title: 'Executive Financial Intelligence & Storytelling Dashboard',
      skill: 'Data Visualization',
      importance: 'Important',
      difficulty: 'Beginner',
      duration: '2 weeks',
      cover: ['Power BI', 'SQL', 'Data Visualization', 'Statistics'],
      outcome: 'Interactive dashboard analyzing quarterly performance indicators and automated cohort retention trends.',
      status: 'Completed',
    },
  ];

  const currentList = projects.length > 0 ? projects : defaultProjects;
  const activeProject = currentList.find((p) => p.id === selectedProjectId);

  const handleUpdateStatus = (id: string, status: ProjectStatus) => {
    const updated = currentList.map((p) => (p.id === id ? { ...p, status } : p));
    onUpdateProjects(updated);
  };

  const handleStartAiProject = (rec: ProjectRecommendation) => {
    const newProj: PortfolioProject = {
      id: rec.id,
      title: rec.title,
      skill: rec.missingSkillsBridged[0] || 'Technical Capstone',
      importance: 'Critical',
      difficulty: rec.difficulty,
      duration: rec.estimatedTime,
      cover: rec.skillsBuilt,
      outcome: rec.expectedOutput,
      status: 'In Progress',
    };

    if (!currentList.some((p) => p.id === rec.id)) {
      onUpdateProjects([newProj, ...currentList]);
    }
    setSelectedProjectId(rec.id);
  };

  if (activeProject) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider">
              <FolderGit2 className="size-3.5" />
              <span>Portfolio Capstone Artifact</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{activeProject.title}</h1>
            <p className="mt-1 text-xs text-stone-500">
              Targets: <strong className="text-slate-800">{activeProject.skill}</strong> • {activeProject.duration}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSelectedProjectId(null)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 shadow-xs transition"
          >
            <ChevronLeft className="size-3.5" />
            <span>Back to All Projects</span>
          </button>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-sky-50 border border-sky-200 px-2.5 py-1 text-xs font-bold text-sky-800">
              {activeProject.difficulty}
            </span>
            <span className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700">
              Effort: {activeProject.duration}
            </span>
            <span className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700">
              Priority: {activeProject.importance}
            </span>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">Expected Deliverable Output</h3>
            <p className="mt-1.5 text-xs text-slate-700 leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-stone-200">
              {activeProject.outcome}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">Skills Built & Verified</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {activeProject.cover.map((s) => (
                <span key={s} className="rounded-lg bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-semibold text-sky-900">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-stone-100 pt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500">Current Status:</span>
              <span className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
                {activeProject.status}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {activeProject.status !== 'Completed' ? (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(activeProject.id, 'Completed')}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
                >
                  Mark as Completed & Verify
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(activeProject.id, 'In Progress')}
                  className="rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50"
                >
                  Move Back to In Progress
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                Evidence-Based Portfolio
              </span>
              <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-600">
                Gap-Driven Blueprint
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              AI Project Recommendation Engine
            </h1>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
              We do not recommend generic toys. Every project is algorithmically synthesized from your real-time skill gaps to maximize enterprise portfolio credibility.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="rounded-xl border border-stone-200 bg-[#FAF8F5] px-3.5 py-2 text-slate-800">
              {currentList.filter((p) => p.status === 'Completed').length} Completed
            </span>
            <span className="rounded-xl border border-sky-200 bg-sky-50 px-3.5 py-2 text-sky-800">
              {currentList.filter((p) => p.status === 'In Progress').length} In Progress
            </span>
          </div>
        </div>
      </div>

      {/* AI Gap-Generated Project Recommendations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="size-4 text-sky-600" />
              <span>Recommended Projects Derived from Your Skill Gaps</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Targeting: <strong className="text-slate-800">{role.name}</strong> • Identified Gaps:{' '}
              <span className="text-rose-700 font-semibold">{gaps.map((g) => g.skill).join(', ') || 'None'}</span>
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {aiRecommendedProjects.map((rec) => (
            <div
              key={rec.id}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:border-sky-300 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] font-bold text-rose-800 uppercase">
                    Bridges: {rec.missingSkillsBridged.join(', ')}
                  </span>
                  <span className="text-[11px] font-semibold text-stone-500">{rec.difficulty}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {rec.title}
                </h3>

                {/* WHY THIS PROJECT */}
                <div className="rounded-lg bg-[#FAF8F5] p-3 border border-stone-200/70 text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block">
                    WHY THIS PROJECT
                  </span>
                  <p className="text-stone-700 leading-relaxed">{rec.whyThisProject}</p>
                </div>

                {/* Details Breakdown */}
                <div className="space-y-1.5 text-xs text-stone-600">
                  <div>
                    <span className="font-semibold text-slate-800">Tech Stack:</span>{' '}
                    <span className="font-mono text-stone-700">{rec.techStack.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Portfolio Value:</span>{' '}
                    <span>{rec.portfolioValue}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Industry Relevance:</span>{' '}
                    <span>{rec.industryRelevance}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-500 pt-1">
                    <Clock className="size-3.5 text-stone-400" />
                    <span>Est. Time: {rec.estimatedTime}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleStartAiProject(rec)}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs cursor-pointer"
                >
                  <Play className="size-3.5" />
                  <span>START PROJECT</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Candidate Portfolio Section */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">
            Active Student Portfolio & Tracked Projects
          </h3>
          <span className="text-xs text-stone-500">{currentList.length} items logged</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {currentList.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className="rounded-xl border border-stone-200 p-4 hover:border-sky-300 hover:shadow-xs cursor-pointer transition flex flex-col justify-between bg-[#FAF8F5]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      p.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : p.status === 'In Progress'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {p.status}
                  </span>
                  <span className="text-[11px] text-stone-500">{p.duration}</span>
                </div>
                <h4 className="mt-2 text-sm font-bold text-slate-900 leading-snug">{p.title}</h4>
                <p className="mt-1 text-xs text-stone-600 line-clamp-2">{p.outcome}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold text-sky-700">
                <span>View Details & Rubric</span>
                <ArrowRight className="size-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
