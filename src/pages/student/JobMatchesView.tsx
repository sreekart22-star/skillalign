import React, { useState } from 'react';
import { BriefcaseBusiness, Building2, CheckCircle2, AlertTriangle, ArrowRight, ChevronLeft, Sparkles } from 'lucide-react';
import { LearnerProfile, JobRole } from '../../types';
import { jobRolesList, scoreForLearner, gapsForLearner, requirementsForRole } from '../../data/platformData';

interface JobMatchesViewProps {
  learner: LearnerProfile;
  onOpenSkillHub: (skill: string) => void;
  reassessmentCompleted?: boolean;
}

export const JobMatchesView: React.FC<JobMatchesViewProps> = ({
  learner,
  onOpenSkillHub,
  reassessmentCompleted,
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [trainingSimulated, setTrainingSimulated] = useState<boolean>(Boolean(reassessmentCompleted));

  const roleMatches = jobRolesList
    .map((role) => {
      const baseScore = scoreForLearner(learner, role);
      const score = trainingSimulated && role.id === 'cloud-engineer' ? Math.max(84, baseScore + 23) : baseScore;
      return {
        role,
        score,
        gaps: gapsForLearner(learner, role),
      };
    })
    .sort((a, b) => b.score - a.score);

  const activeMatch = roleMatches.find((m) => m.role.id === selectedRoleId);

  if (activeMatch) {
    const { role, score, gaps } = activeMatch;
    const matchingSkills = role.requirements.filter((r) => !gaps.some((g) => g.skill === r.skill)).map((r) => r.skill);
    const missingSkills = gaps.map((g) => g.skill);
    const criticalSkills = role.requirements.filter((r) => r.importance === 'Critical').map((r) => r.skill);

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              <BriefcaseBusiness className="size-3.5" />
              <span>Explainable Matching Engine</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {role.name} Role Fit Breakdown
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {role.industry} • {role.location} • Required: {role.education}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSelectedRoleId(null)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition"
          >
            <ChevronLeft className="size-3.5" />
            <span>Back to All Matches</span>
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 shadow-xs space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Calculated Match Score</span>
            <p className="text-5xl font-extrabold text-slate-900">{score}%</p>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                score >= 75
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-indigo-100 text-indigo-800'
              }`}
            >
              {score >= 75 ? 'Strong Placement Candidate' : 'Development Pathway Available'}
            </span>
            <p className="text-xs text-slate-600 leading-relaxed pt-2">
              Based on {matchingSkills.length} satisfied competency requirements out of {role.requirements.length}.
            </p>

            {role.id === 'cloud-engineer' && (
              <div className="pt-2 border-t border-indigo-100">
                <button
                  type="button"
                  onClick={() => setTrainingSimulated(!trainingSimulated)}
                  className="w-full rounded-lg bg-indigo-600 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs transition"
                >
                  {trainingSimulated ? 'Reset to Pre-Training (61%)' : 'Simulate Post-Training Gain (84%)'}
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Role Fit Evidence & Requirements
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div>
                <span className="font-bold text-slate-800 block mb-1">Satisfied Skills ({matchingSkills.length}):</span>
                <div className="flex flex-wrap gap-1.5">
                  {matchingSkills.length > 0 ? (
                    matchingSkills.map((s) => (
                      <span key={s} className="rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 font-semibold">
                        ✓ {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400">Foundational build needed</span>
                  )}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Priority Missing Gaps ({missingSkills.length}):</span>
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onOpenSkillHub(s)}
                      className="rounded-md bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 font-semibold hover:bg-rose-100"
                    >
                      {s} (Action Plan →)
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Critical Core Competencies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {criticalSkills.map((s) => (
                    <span key={s} className="rounded-md bg-slate-100 text-slate-700 px-2 py-0.5 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Preferred Bonus Technologies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {role.preferred.map((s) => (
                    <span key={s} className="rounded-md bg-indigo-50 text-indigo-700 px-2 py-0.5 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-4 border border-slate-200 text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900 block mb-1">Hiring Partner Note (Nimbus Technologies):</strong>
              Your profile has strong core algorithmic proof. Demonstrating containerization and automated
              deployment through a portfolio project will position you into the top 10th percentile for interview shortlisting.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <BriefcaseBusiness className="size-3.5" />
            <span>Candidate Placement Intelligence</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Role Matches & Company Opportunities
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Every match is objectively calculated from your verified profile and employer requirement profiles.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {roleMatches.map(({ role, score, gaps }) => {
          const matchingSkills = role.requirements
            .filter((r) => !gaps.some((g) => g.skill === r.skill))
            .map((r) => r.skill);

          return (
            <div
              key={role.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-indigo-300 transition"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-indigo-600">{role.industry}</span>
                  <span>{role.location}</span>
                </div>
                <h2 className="mt-2 text-lg font-bold text-slate-900">{role.name}</h2>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">{score}%</span>
                  <span className="text-xs text-slate-500 font-medium">skill match</span>
                </div>

                <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${score >= 70 ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                    style={{ width: `${score}%` }}
                  />
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <p>
                    <strong className="text-slate-800">Matched:</strong>{' '}
                    {matchingSkills.slice(0, 3).join(', ') || 'Foundational'}
                  </p>
                  <p>
                    <strong className="text-slate-800">Top Gap:</strong>{' '}
                    {gaps[0]?.skill ? `${gaps[0]?.skill} (${gaps[0]?.importance})` : 'None — Role Ready!'}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedRoleId(role.id)}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition"
                >
                  <span>View Role Fit Evidence</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
