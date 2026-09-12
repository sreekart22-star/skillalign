import React from 'react';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Code2,
  Layers,
  Sparkles,
} from 'lucide-react';
import { AssessmentEvaluationSummary } from '../../types';

interface AssessmentResultViewProps {
  summary: AssessmentEvaluationSummary;
  onProceedToProfile: () => void;
}

export const AssessmentResultView: React.FC<AssessmentResultViewProps> = ({
  summary,
  onProceedToProfile,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
          <ShieldCheck className="size-3.5" />
          <span>Stage 2 Complete • Objective Technical Verification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
          TECHNICAL SKILL VERIFICATION
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
          Diagnostic coding performance calculated across 10 problem suites and 50 automated test vectors.
        </p>
      </div>

      {/* Main Score Metrics Grid (Section 14) */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-stone-100">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
              Composite Technical Readiness
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Overall Coding Score
            </h2>
            <p className="text-xs text-stone-500">
              Synthesized from test-case pass percentage and algorithmic correctness.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] px-8 py-4 text-center">
            <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 font-mono">
              {summary.codingScore !== undefined ? summary.codingScore : summary.overallScore}
            </span>
            <span className="text-lg font-bold text-stone-400 font-mono"> / 100</span>
            <span className="block text-[10px] font-bold text-emerald-700 uppercase tracking-wider mt-1">
              Verified Coding Marks
            </span>
          </div>
        </div>

        {/* 4 Execution Breakdown Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
              Problems Attempted
            </span>
            <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
              {summary.attemptedCount} <span className="text-xs text-stone-400 font-normal">/ 10</span>
            </span>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Fully Executed
            </span>
            <span className="text-2xl font-black text-emerald-700 font-mono mt-1 block">
              {summary.fullyExecutedCount}
            </span>
            <span className="text-[9px] text-emerald-600 block">5/5 Test Cases</span>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
              Partially Executed
            </span>
            <span className="text-2xl font-black text-amber-700 font-mono mt-1 block">
              {summary.partiallyExecutedCount}
            </span>
            <span className="text-[9px] text-amber-600 block">Partial Cases Passed</span>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block">
              Problems Failed
            </span>
            <span className="text-2xl font-black text-rose-700 font-mono mt-1 block">
              {summary.failedCount}
            </span>
            <span className="text-[9px] text-rose-500 block">0 Cases or Unattempted</span>
          </div>
        </div>

        {/* Skill-wise Performance Breakdown (Section 14) */}
        <div className="pt-4 border-t border-stone-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <BarChart3 className="size-4 text-sky-600" />
              <span>Skill-Wise Assessment Performance</span>
            </h3>
            <span className="text-[11px] font-mono text-stone-500">
              Calculated from Real Executed Test Vectors
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(summary.skillScores).map(([skill, val]) => {
              const score = Number(val) || 0;
              const isHigh = score >= 75;
              const isMed = score >= 50 && score < 75;

              return (
                <div
                  key={skill}
                  className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{skill}</span>
                    <span className="text-xs font-mono font-bold text-slate-900">{score}%</span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHigh
                          ? 'bg-emerald-600'
                          : isMed
                          ? 'bg-sky-600'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
                    <span>Performance Band:</span>
                    <span className={`font-bold ${isHigh ? 'text-emerald-700' : isMed ? 'text-sky-700' : 'text-amber-700'}`}>
                      {isHigh ? 'VERIFIED PROFICIENT' : isMed ? 'INTERMEDIATE' : 'NEEDS PRACTICE'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Step Action */}
        <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600 text-center sm:text-left">
            These verification test outcomes will now calibrate your <strong>Verified Skills Profile</strong>,
            highlighting real gaps and generating your customized career roadmap.
          </p>

          <button
            type="button"
            onClick={onProceedToProfile}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 shadow-sm transition cursor-pointer shrink-0"
          >
            <span>Generate Verified Skill Profile & Gap Analysis</span>
            <ArrowRight className="size-4 text-sky-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
