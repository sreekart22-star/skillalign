import React from 'react';
import { motion } from 'motion/react';
import {
  Target,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  FileSearch,
  Code2,
  ShieldCheck,
  Compass,
  Layers,
  Award,
} from 'lucide-react';
import { LearnerProfile, JobRole } from '../../types';
import {
  scoreForLearner,
  gapsForLearner,
  requirementsForRole,
  calculateDetailedAlignmentScore,
  opportunityIntelligenceList,
} from '../../data/platformData';
import { SkillAlignmentPipeline } from '../../components/SkillAlignmentPipeline';
import { SkillAlignmentRadialScore } from '../../components/SkillAlignmentRadialScore';

interface StudentDashboardProps {
  learner: LearnerProfile;
  onNavigate: (page: string, extraSkill?: string) => void;
  learningStatuses: Record<string, string>;
  onOpenResumeUpload: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  learner,
  onNavigate,
  learningStatuses,
  onOpenResumeUpload,
}) => {
  const targetRole = requirementsForRole(learner.targetRole);
  const gaps = gapsForLearner(learner, targetRole);
  const criticalGaps = gaps.filter((g) => g.importance === 'Critical');
  const completedCount = Object.values(learningStatuses).filter((s) => s === 'Completed').length;

  // Compute 7-vector transparent alignment score
  const alignmentBreakdown = calculateDetailedAlignmentScore(learner, targetRole);

  const verifiedSkillsCount = Object.keys(learner.skills).length;
  const topRecommendedOpportunities = opportunityIntelligenceList.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Welcome & Target Role Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700 border border-sky-200">
                <Sparkles className="size-3" />
                Workforce Readiness Portal
              </span>
              <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-600">
                {learner.branch} ({learner.graduation})
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
              Candidate Command Center: {learner.name}
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Current Target Role: <strong className="text-slate-900">{targetRole.name}</strong> • Institution:{' '}
              <span className="text-slate-700 font-medium">B.Tech Academic Track</span>
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenResumeUpload}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-stone-50 shadow-xs transition cursor-pointer"
            >
              <FileSearch className="size-4 text-sky-600" />
              <span>{learner.sourceFile ? 'Re-analyze Resume' : 'Ingest Resume'}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('job-scanner')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700 shadow-xs transition cursor-pointer"
            >
              <FileSearch className="size-4" />
              <span>Paste Job Description</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('career-path')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 shadow-xs transition cursor-pointer"
            >
              <Compass className="size-4" />
              <span>AI Career Path</span>
            </button>
          </div>
        </div>

        {/* Dynamic Quick Stat Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span>
              <strong className="text-slate-900">{verifiedSkillsCount}</strong> Verified Profile Skills
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="size-4 text-rose-600" />
            <span>
              <strong className="text-rose-700">{gaps.length}</strong> Target Role Gaps Identified
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="size-4 text-sky-600" />
            <span>
              <strong className="text-slate-900">{completedCount}</strong> Learning Interventions Completed
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="size-4 text-amber-600" />
            <span>
              <strong className="text-slate-900">3</strong> Verifiable Capstones & Commits
            </span>
          </div>
        </div>
      </div>

      {/* 1. VISUAL DIFFERENTIATOR: The Skill Alignment Engine Pipeline */}
      <SkillAlignmentPipeline
        currentStageId="skill-gap"
        onNavigateNode={(page) => onNavigate(page)}
      />

      {/* 2. THE RADIAL SKILL ALIGNMENT SCORE & DECOMPOSITION */}
      <SkillAlignmentRadialScore
        breakdown={alignmentBreakdown}
        roleName={targetRole.name}
        onExploreGaps={() => onNavigate('hub', gaps[0]?.skill)}
      />

      {/* 3. NEXT BEST ACTION HERO CARRIER */}
      <div className="rounded-2xl border border-sky-200 bg-sky-50/40 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-200/70 pb-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-sky-600 p-1.5 text-white">
              <Sparkles className="size-4" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
                Recommended Next Best Action
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                High-Impact Gap Intervention
              </h2>
            </div>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-sky-800 border border-sky-200">
            Max Score Lift: +{alignmentBreakdown.missingSkillPenalty + 4} pts
          </span>
        </div>

        <div className="mt-4 grid gap-5 lg:grid-cols-12 items-center">
          <div className="lg:col-span-8 space-y-2">
            {gaps.length > 0 ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-800">
                    Priority Skill Gap: {gaps[0].skill}
                  </span>
                  <span className="text-xs text-stone-500">
                    Target Requirement: <strong>{gaps[0].level}</strong>
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed max-w-2xl">
                  {gaps[0].skill} carries an essential weight for {targetRole.name} roles. Building a verified capstone artifact or completing the diagnostic sandbox will close this deficiency and increase your readiness to <strong>{Math.min(98, alignmentBreakdown.overall + 14)}%</strong>.
                </p>
              </>
            ) : (
              <p className="text-xs text-slate-700">
                You meet all critical skill requirements for {targetRole.name}. You are in the top 10% of candidates for verified placement matching.
              </p>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-wrap gap-2 justify-end">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs cursor-pointer"
            >
              <Code2 className="size-4" />
              <span>Build Recommended Project</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('hub', gaps[0]?.skill)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-stone-300 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-stone-50 transition cursor-pointer"
            >
              <span>View Learning Modules</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. SKILLS AUDIT: VERIFIED VS MISSING & LIVE OPPORTUNITY MATCHES */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Skills Verified vs Missing Quick Matrix */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Skills Verified vs Role Deficit
              </h3>
              <p className="text-xs text-stone-500">Comparing profile against {targetRole.name} catalog</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('analysis')}
              className="text-xs font-bold text-sky-700 hover:text-sky-800 transition"
            >
              Full Analysis →
            </button>
          </div>

          {/* Verified Skills */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-2">
              Verified Competencies ({verifiedSkillsCount}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(learner.skills).map(([skill, level]) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-800"
                >
                  <CheckCircle2 className="size-3 text-emerald-600" />
                  {skill} ({level})
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          {gaps.length > 0 && (
            <div className="pt-2 border-t border-stone-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 block mb-2">
                Identified Skill Gaps ({gaps.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {gaps.map((g) => (
                  <button
                    key={g.skill}
                    type="button"
                    onClick={() => onNavigate('hub', g.skill)}
                    className="inline-flex items-center gap-1 rounded-md bg-rose-50 border border-rose-200 px-2.5 py-1 text-xs font-semibold text-rose-800 hover:bg-rose-100 transition cursor-pointer"
                  >
                    <AlertTriangle className="size-3 text-rose-600" />
                    {g.skill} ({g.importance})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Curated Live Opportunity Matches */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Curated Opportunity Alignment
              </h3>
              <p className="text-xs text-stone-500">Industry internships and graduate hiring tracks</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('jobs')}
              className="text-xs font-bold text-sky-700 hover:text-sky-800 transition"
            >
              All Matches →
            </button>
          </div>

          <div className="space-y-3">
            {topRecommendedOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 flex flex-wrap items-center justify-between gap-3 hover:border-sky-300 transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      {opp.studentMatchScore || opp.alignmentMatchScore || 85}% Alignment
                    </span>
                    <span className="text-xs text-stone-500">{opp.type}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{opp.title}</h4>
                  <p className="text-xs text-stone-600">{opp.company} • {opp.location}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('jobs')}
                  className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Verified employers recruit directly through SkillAlign</span>
            <span className="font-semibold text-slate-800">100% Zero-Ghosting Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
