import React from 'react';
import { GraduationCap, CheckCircle2, ChevronRight, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { LearnerProfile, LearningStatus } from '../../types';
import { requirementsForRole, gapsForLearner } from '../../data/platformData';

interface LearningRoadmapViewProps {
  learner: LearnerProfile;
  learningStatuses: Record<string, LearningStatus>;
  onUpdateStatus: (item: string, status: LearningStatus) => void;
  onOpenHub: (skill: string) => void;
}

export const LearningRoadmapView: React.FC<LearningRoadmapViewProps> = ({
  learner,
  learningStatuses,
  onUpdateStatus,
  onOpenHub,
}) => {
  const role = requirementsForRole(learner.targetRole);
  const gaps = gapsForLearner(learner, role);

  const roadmapItems = Array.from(
    new Set([
      ...gaps.map((g) => g.skill),
      ...Object.keys(learningStatuses),
      'System Architecture & APIs',
      'Applied Portfolio Project',
      'Technical Interview Assessment',
    ])
  );

  const completedCount = roadmapItems.filter((item) => learningStatuses[item] === 'Completed').length;
  const progressPercent = Math.round((completedCount / roadmapItems.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <GraduationCap className="size-3.5" />
            <span>Structured Competency Roadmap</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Personalized Learning Path
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Ordered roadmap targeting verified gaps for <strong className="text-slate-800">{role.name}</strong>.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-right shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Roadmap Progress</span>
          <p className="text-xl font-bold text-indigo-700">
            {completedCount} of {roadmapItems.length} complete ({progressPercent}%)
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
        <div className="h-full rounded-full bg-indigo-600 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* List of Milestones */}
      <div className="space-y-3">
        {roadmapItems.map((item, index) => {
          const status = learningStatuses[item] || 'Not Started';
          const gapInfo = gaps.find((g) => g.skill === item);

          return (
            <div
              key={item}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition hover:border-slate-300"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`grid size-8 place-items-center rounded-full text-xs font-bold ${
                    status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : status === 'In Progress'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {status === 'Completed' ? <CheckCircle2 className="size-4" /> : index + 1}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{item}</h3>
                    {gapInfo && (
                      <span
                        className={`rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                          gapInfo.importance === 'Critical'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {gapInfo.importance} Role Gap
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {gapInfo
                      ? `Required: ${gapInfo.level} • Complete guided resources & practice to close gap`
                      : 'Capstone verification milestone'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenHub(item)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                >
                  Open Skill Hub
                </button>

                <select
                  value={status}
                  onChange={(e) => onUpdateStatus(item, e.target.value as LearningStatus)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-bold focus:outline-hidden ${
                    status === 'Completed'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : status === 'In Progress'
                      ? 'border-indigo-200 bg-indigo-50 text-indigo-800'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
