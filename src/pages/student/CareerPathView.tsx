import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  CheckCircle2,
  Clock,
  Circle,
  ArrowRight,
  Code2,
  BookOpen,
  ShieldCheck,
  Briefcase,
  Layers,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { LearnerProfile, CareerPathModel } from '../../types';
import {
  careerPathsByRole,
  getCareerPathForRole,
  jobRolesList,
  scoreForLearner,
  requirementsForRole,
} from '../../data/platformData';

interface CareerPathViewProps {
  learner: LearnerProfile;
  onNavigate: (page: string, filter?: string) => void;
  onUpdateTargetRole?: (newRole: string) => void;
}

export const CareerPathView: React.FC<CareerPathViewProps> = ({
  learner,
  onNavigate,
  onUpdateTargetRole,
}) => {
  const [selectedRole, setSelectedRole] = useState<string>(learner.targetRole || 'Data Scientist');
  const [activeStageStep, setActiveStageStep] = useState<number>(2);

  const careerModel: CareerPathModel = getCareerPathForRole(selectedRole, learner);
  const targetJobRole = requirementsForRole(selectedRole);
  const fitScore = scoreForLearner(learner, targetJobRole);

  const allRoles = [
    'Data Scientist',
    'ML Engineer',
    'AI Engineer',
    'Software Engineer',
    'Data Analyst',
    'Full Stack Developer',
    'Cloud Engineer',
    'Cybersecurity Analyst',
  ];

  const handleRoleChange = (roleName: string) => {
    setSelectedRole(roleName);
    if (onUpdateTargetRole) {
      onUpdateTargetRole(roleName);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                Workforce Readiness Pathway
              </span>
              <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-600">
                8 Target Career Tracks
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              AI Career Path Generator
            </h1>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
              Step-by-step verified roadmap translating current academic competencies into full-time placement readiness across 8 standardized enterprise roles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] px-4 py-2 text-center">
              <span className="text-[10px] uppercase font-bold text-stone-500">Current Role Fit</span>
              <p className="text-xl font-extrabold text-slate-900">{fitScore}%</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] px-4 py-2 text-center">
              <span className="text-[10px] uppercase font-bold text-stone-500">Estimated Timeline</span>
              <p className="text-xl font-extrabold text-sky-700">{careerModel.timelineWeeks} wks</p>
            </div>
          </div>
        </div>

        {/* 8-Role Pill Selector */}
        <div className="mt-5">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
            Select Target Career Role:
          </label>
          <div className="flex flex-wrap gap-2">
            {allRoles.map((roleName) => (
              <button
                key={roleName}
                type="button"
                onClick={() => handleRoleChange(roleName)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                  selectedRole === roleName
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {roleName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Timeline Architecture: Current State -> Target Role -> Roadmap */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <Compass className="size-4 text-sky-600" />
            <h3 className="text-base font-bold text-slate-900">
              {careerModel.roleName} Progression Timeline
            </h3>
            <span className="text-xs text-stone-500">({careerModel.industry})</span>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Click any step to inspect milestones and bridge artifacts
          </span>
        </div>

        {/* Horizontal Visual Timeline Bar */}
        <div className="mt-6 relative overflow-x-auto pb-6 pt-2">
          {/* Connecting Track */}
          <div className="absolute left-6 right-6 top-7 h-1 bg-stone-200 rounded-full hidden md:block">
            <div
              className="h-full bg-linear-to-r from-emerald-500 via-sky-500 to-stone-200 rounded-full transition-all duration-700"
              style={{ width: `${(activeStageStep / 8) * 100}%` }}
            />
          </div>

          <div className="flex min-w-[800px] items-start justify-between gap-3 relative z-10 px-2">
            {careerModel.stages.map((stage) => {
              const isActive = stage.step === activeStageStep;
              const isCompleted = stage.status === 'Completed';

              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveStageStep(stage.step)}
                  className={`flex flex-col items-center text-center cursor-pointer transition ${
                    isActive ? 'scale-105' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl text-xs font-bold transition shadow-xs ${
                      isActive
                        ? 'bg-sky-600 text-white ring-4 ring-sky-100'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-stone-300 text-stone-600'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="size-5" /> : stage.step}
                  </div>
                  <span className="mt-2 text-xs font-bold text-slate-800 whitespace-nowrap max-w-[95px] truncate">
                    {stage.stageType}
                  </span>
                  <span className="text-[10px] text-stone-500 max-w-[95px] truncate">
                    Step {stage.step}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Breakdown Card */}
        {(() => {
          const currentStage = careerModel.stages.find((s) => s.step === activeStageStep) || careerModel.stages[0];

          return (
            <motion.div
              key={currentStage.step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 rounded-xl border border-sky-100 bg-[#FAF8F5] p-5 space-y-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-200/70 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-sm bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800 uppercase">
                      Stage {currentStage.step} of 8: {currentStage.stageType}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        currentStage.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {currentStage.status}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mt-1">
                    {currentStage.title}
                  </h4>
                </div>

                {/* Direct Action Link */}
                <div className="flex items-center gap-2">
                  {currentStage.stageType === 'Project' ? (
                    <button
                      type="button"
                      onClick={() => onNavigate('projects')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
                    >
                      <Code2 className="size-3.5" />
                      <span>Start Project Blueprint</span>
                    </button>
                  ) : currentStage.stageType === 'Verification' ? (
                    <button
                      type="button"
                      onClick={() => onNavigate('verification')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
                    >
                      <ShieldCheck className="size-3.5" />
                      <span>View Verified Evidence</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNavigate('hub')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
                    >
                      <BookOpen className="size-3.5" />
                      <span>Study Stage Modules</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Milestones Checklist */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  Required Competency Milestones:
                </span>
                <div className="grid gap-2 sm:grid-cols-3">
                  {currentStage.milestones.map((milestone, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 rounded-lg bg-white p-3 border border-stone-200 shadow-2xs text-xs text-slate-800"
                    >
                      <CheckCircle2 className="size-4 text-sky-600 mt-0.5 shrink-0" />
                      <span>{milestone}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Addressed in this stage */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-200/60">
                <span className="text-xs font-semibold text-stone-500">Skills Addressed:</span>
                {currentStage.skillsAddressed.map((sk) => (
                  <span
                    key={sk}
                    className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-slate-800 border border-stone-200"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })()}
      </div>
    </div>
  );
};
