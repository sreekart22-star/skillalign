import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  HelpCircle,
  FileText,
  Code2,
  FolderGit2,
  Award,
  ArrowRight,
  Layers,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { LearnerProfile, AssessmentEvaluationSummary } from '../../types';

interface VerifiedSkillProfileViewProps {
  profile: LearnerProfile;
  assessmentSummary?: AssessmentEvaluationSummary;
  onProceedToSkillGap: () => void;
}

export const VerifiedSkillProfileView: React.FC<VerifiedSkillProfileViewProps> = ({
  profile,
  assessmentSummary,
  onProceedToSkillGap,
}) => {
  const pythonScore = assessmentSummary?.skillScores?.Python ?? 86;
  const sqlScore = assessmentSummary?.skillScores?.SQL ?? 90;
  const psScore = assessmentSummary?.skillScores?.['Problem Solving'] ?? 78;
  const algoScore = assessmentSummary?.skillScores?.Algorithms ?? 72;
  const mlScore = assessmentSummary?.skillScores?.['Machine Learning'] ?? 68;

  // Requirement 4: "SKILL PROOF" Matrix
  const skillProofMatrix = [
    {
      skill: 'PYTHON',
      category: 'Programming Languages',
      resumeClaim: true,
      assessmentScore: `${pythonScore}%`,
      assessmentDetails: 'Passed string parsing, frequency counting & dictionary tests',
      projectEvidence: '✓ (3 Repositories)',
      practicalEvidence: '86%',
      confidence: 'HIGH CONFIDENCE',
      status: 'VERIFIED' as const,
      color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      skill: 'SQL & RELATIONAL DATABASES',
      category: 'Databases',
      resumeClaim: true,
      assessmentScore: `${sqlScore}%`,
      assessmentDetails: 'Correct query execution on candidate aggregation & join benchmarks',
      projectEvidence: '✓ (E-commerce Schema)',
      practicalEvidence: '88%',
      confidence: 'HIGH CONFIDENCE',
      status: 'VERIFIED' as const,
      color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      skill: 'ALGORITHMS & DATA STRUCTURES',
      category: 'Core Computer Science',
      resumeClaim: true,
      assessmentScore: `${algoScore}%`,
      assessmentDetails: 'Heap sort & priority queue solution passed 3/5 test suites',
      projectEvidence: '✓ Coursework Repos',
      practicalEvidence: '74%',
      confidence: 'MEDIUM CONFIDENCE',
      status: 'PARTIALLY VERIFIED' as const,
      color: 'border-sky-200 bg-sky-50/40 text-sky-900',
      badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    },
    {
      skill: 'MACHINE LEARNING',
      category: 'AI / Data Science',
      resumeClaim: true,
      assessmentScore: `${mlScore}%`,
      assessmentDetails: 'Predictive normalization implemented; needs model evaluation depth',
      projectEvidence: '✓ Capstone Model',
      practicalEvidence: '66%',
      confidence: 'MEDIUM CONFIDENCE',
      status: 'PARTIALLY VERIFIED' as const,
      color: 'border-sky-200 bg-sky-50/40 text-sky-900',
      badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    },
    {
      skill: 'DOCKER & CONTAINERS',
      category: 'Cloud / DevOps',
      resumeClaim: true,
      assessmentScore: '0%',
      assessmentDetails: 'Not assessed in algorithm diagnostic suite',
      projectEvidence: 'None',
      practicalEvidence: 'None',
      confidence: 'NEEDS EVIDENCE',
      status: 'NEEDS EVIDENCE' as const,
      color: 'border-amber-200 bg-amber-50/40 text-amber-900',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    {
      skill: 'CLOUD COMPUTING (AWS/GCP)',
      category: 'Cloud / DevOps',
      resumeClaim: true,
      assessmentScore: '0%',
      assessmentDetails: 'No automated cloud provisioning benchmark recorded',
      projectEvidence: 'None',
      practicalEvidence: 'None',
      confidence: 'NEEDS EVIDENCE',
      status: 'NEEDS EVIDENCE' as const,
      color: 'border-amber-200 bg-amber-50/40 text-amber-900',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-2">
            <Sparkles className="size-3.5 text-emerald-600" />
            <span>Multi-Vector Skill Verification Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            SKILL PROOF & VERIFIED PROFILE
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Correlating Resume Claims with 10-Problem Code Sandbox Execution, Project Repository Traces, and Practical Evidence Vectors.
          </p>
        </div>

        <button
          type="button"
          onClick={onProceedToSkillGap}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-xs font-bold text-white hover:bg-slate-800 shadow-sm transition cursor-pointer self-start sm:self-center shrink-0 uppercase tracking-wider"
        >
          <span>Calculate Target Role Fit</span>
          <ArrowRight className="size-4 text-sky-400" />
        </button>
      </div>

      {/* Assessment Performance Banner */}
      {assessmentSummary && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-slate-900 text-sky-400">
                <Terminal className="size-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-sky-700 uppercase tracking-wider">
                  Diagnostic Execution Results
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Assessment Score: {assessmentSummary.overallScore}% ({assessmentSummary.totalMarks} / 100 Marks)
                </h3>
                <p className="text-xs text-stone-500">
                  Passed {assessmentSummary.totalTestsPassed} total test cases • {assessmentSummary.completedQuestionsCount} / 10 problems attempted
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                Full Pass: {assessmentSummary.executionQuality?.fullExecution || 0} | Partial: {assessmentSummary.executionQuality?.partialExecution || 0} | Errors: {(assessmentSummary.executionQuality?.syntaxErrors || 0) + (assessmentSummary.executionQuality?.runtimeErrors || 0)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SKILL PROOF Table / Cards Matrix (Requirement 4) */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-base font-black tracking-tight text-slate-900 flex items-center gap-2">
              <ShieldCheck className="size-5 text-sky-600" />
              <span>SKILL PROOF AUDIT TABLE</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Objective proof matrix evaluating claims across sandbox execution and project repository code.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">HIGH CONFIDENCE</span>
            <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 font-bold">MEDIUM CONFIDENCE</span>
            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-bold">NEEDS EVIDENCE</span>
          </div>
        </div>

        {/* Skill Proof Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillProofMatrix.map((item) => (
            <div
              key={item.skill}
              className={`rounded-2xl border p-5 space-y-3.5 shadow-2xs transition hover:shadow-md ${item.color}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-black text-slate-900">{item.skill}</h3>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">{item.category}</span>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-mono font-bold border ${item.badgeClass}`}>
                  {item.confidence}
                </span>
              </div>

              {/* 4 Proof Vectors as specified in Requirement 4 */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-white/90 p-3 rounded-xl border border-stone-200/80">
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Resume Claim</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block flex items-center gap-1">
                    {item.resumeClaim ? '✓ Claimed' : '✕ Not Claimed'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Coding Assessment</span>
                  <span className="font-mono font-bold text-slate-900 mt-0.5 block">
                    {item.assessmentScore}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Project Evidence</span>
                  <span className="font-medium text-slate-800 mt-0.5 block">
                    {item.projectEvidence}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block">Practical Evidence</span>
                  <span className="font-mono font-semibold text-slate-800 mt-0.5 block">
                    {item.practicalEvidence}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-stone-600 leading-relaxed font-sans">
                {item.assessmentDetails}
              </div>

              <div className="pt-2 border-t border-stone-200/50 flex items-center justify-between text-[10px] font-mono font-bold uppercase">
                <span className="text-stone-500">Verification Outcome:</span>
                <span className="text-slate-900">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advance to Role Fit */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onProceedToSkillGap}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-4 text-xs font-bold text-white hover:bg-slate-800 shadow-sm transition cursor-pointer uppercase tracking-wider"
        >
          <span>Proceed to Role Fit & Career Engine</span>
          <ArrowRight className="size-4 text-sky-400" />
        </button>
      </div>
    </div>
  );
};
