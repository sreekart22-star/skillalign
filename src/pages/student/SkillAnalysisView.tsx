import React, { useState } from 'react';
import { Target, ChevronRight, BookOpen, GraduationCap, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { LearnerProfile, Requirement, JobRole } from '../../types';
import { jobRolesList, levelValueMap, scoreForLearner, gapsForLearner, requirementsForRole } from '../../data/platformData';

interface SkillAnalysisViewProps {
  learner: LearnerProfile;
  onOpenHub: (skill: string) => void;
  onAddLearning: (skill: string) => void;
  learningStatuses: Record<string, string>;
  onNavigateToJobs: () => void;
}

export const SkillAnalysisView: React.FC<SkillAnalysisViewProps> = ({
  learner,
  onOpenHub,
  onAddLearning,
  learningStatuses,
  onNavigateToJobs,
}) => {
  const [selectedRoleName, setSelectedRoleName] = useState<string>(learner.targetRole);
  const activeRole: JobRole = requirementsForRole(selectedRoleName);
  const score = scoreForLearner(learner, activeRole);
  const gaps = gapsForLearner(learner, activeRole);
  const [selectedReq, setSelectedReq] = useState<Requirement | null>(
    activeRole.requirements.find((r) => gaps.some((g) => g.skill === r.skill)) || activeRole.requirements[0]
  );

  return (
    <div className="space-y-6">
      {/* Header with Role Selector */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <Target className="size-3.5" />
            <span>Explainable Intelligence</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Skill Gap Analysis
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Transparent comparison of your verified competencies against industry role specifications.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">Target Role:</label>
          <select
            value={selectedRoleName}
            onChange={(e) => {
              setSelectedRoleName(e.target.value);
              const newRole = requirementsForRole(e.target.value);
              setSelectedReq(newRole.requirements[0]);
            }}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-xs focus:border-indigo-500 focus:outline-hidden"
          >
            {jobRolesList.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Breakdown Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Requirements List & Weighted Formula */}
        <div className="lg:col-span-2 space-y-5">
          {/* Formula Callout */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Composite Skill Match: {score}%</h2>
                <p className="text-xs text-slate-500">
                  Calculated using transparent weighting: Critical (1.5x) • Important (1.0x) • Optional (0.5x)
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  score >= 75
                    ? 'bg-emerald-100 text-emerald-800'
                    : score >= 55
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {score >= 75 ? 'Placement Ready' : score >= 55 ? 'Targeted Training Needed' : 'Foundational Gap'}
              </span>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  score >= 75 ? 'bg-emerald-600' : score >= 55 ? 'bg-indigo-600' : 'bg-amber-500'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="mt-2.5 text-[11px] text-slate-500">
              You satisfy {activeRole.requirements.length - gaps.length} of {activeRole.requirements.length} required
              proficiency thresholds for this role.
            </p>
          </div>

          {/* Requirements List */}
          <div className="space-y-3">
            {activeRole.requirements.map((req) => {
              const userLevel = learner.skills[req.skill];
              const isMatched = userLevel && levelValueMap[userLevel] >= levelValueMap[req.level];
              const isSelected = selectedReq?.skill === req.skill;

              return (
                <div
                  key={req.skill}
                  onClick={() => setSelectedReq(req)}
                  className={`cursor-pointer rounded-xl border p-4 transition ${
                    isSelected
                      ? 'border-indigo-400 bg-indigo-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`grid size-8 place-items-center rounded-lg ${
                          isMatched ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {isMatched ? <CheckCircle2 className="size-4" /> : <AlertTriangle className="size-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{req.skill}</span>
                          <span
                            className={`rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              req.importance === 'Critical'
                                ? 'bg-rose-100 text-rose-800'
                                : req.importance === 'Important'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {req.importance} ({req.weight}x)
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-500">
                          Target requirement: <strong className="text-slate-700">{req.level}</strong> • Your current:{' '}
                          <strong className={isMatched ? 'text-emerald-700' : 'text-rose-700'}>
                            {userLevel || 'Not listed'}
                          </strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          isMatched
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {isMatched ? 'Satisfied' : 'Gap to Target'}
                      </span>
                    </div>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isMatched ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{
                        width: isMatched ? '100%' : userLevel ? `${(levelValueMap[userLevel] / levelValueMap[req.level]) * 100}%` : '10%',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Explainable Detail & Next Action */}
        <div className="space-y-5">
          {selectedReq && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Skill Focus & Impact
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedReq.skill}</h3>
                <p className="text-xs text-slate-500">
                  Role priority: {selectedReq.importance} ({selectedReq.weight}x weighted points)
                </p>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                <p>
                  <strong className="text-slate-800">Why it matters for {activeRole.name}:</strong>{' '}
                  This skill is a {selectedReq.importance.toLowerCase()} pillar for {activeRole.industry} roles.
                  Employers evaluate production proficiency at the {selectedReq.level} tier during technical rounds.
                </p>
                <p>
                  <strong className="text-slate-800">Expected Score Impact:</strong>{' '}
                  Closing this gap contributes approximately{' '}
                  <strong>+{Math.round(selectedReq.weight * 14)} points</strong> toward total placement readiness.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenHub(selectedReq.skill)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs transition"
                >
                  <BookOpen className="size-4" />
                  <span>Open Skill Improvement Hub</span>
                </button>

                <button
                  type="button"
                  onClick={() => onAddLearning(selectedReq.skill)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition"
                >
                  <GraduationCap className="size-4 text-indigo-600" />
                  <span>
                    {learningStatuses[selectedReq.skill] ? 'In Learning Path' : 'Add to Learning Path'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Role Fit Links Card */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900">Next Step in your Career Journey</h4>
            <p className="mt-1 text-xs text-slate-500">
              See which verified companies are currently shortlisting candidates matching your profile.
            </p>
            <button
              type="button"
              onClick={onNavigateToJobs}
              className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
            >
              <span>Explore Role Matches</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
