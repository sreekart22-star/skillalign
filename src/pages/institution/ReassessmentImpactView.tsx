import React, { useState } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BriefcaseBusiness,
  RotateCcw,
  Target,
} from 'lucide-react';
import { ImpactMetrics } from '../../types';

interface ReassessmentImpactViewProps {
  onSimulateReassessment?: () => void;
  reassessmentCompleted?: boolean;
}

export const ReassessmentImpactView: React.FC<ReassessmentImpactViewProps> = ({
  onSimulateReassessment,
  reassessmentCompleted = false,
}) => {
  const [isSimulated, setIsSimulated] = useState<boolean>(reassessmentCompleted);

  const metrics: ImpactMetrics = isSimulated
    ? {
        preScore: 23,
        postScore: 68,
        jump: 45,
        alignmentBefore: 61,
        alignmentAfter: 76,
        employabilityBefore: 68,
        employabilityAfter: 80,
        futureBefore: 55,
        futureAfter: 70,
        employerMatchBefore: 61,
        employerMatchAfter: 84,
      }
    : {
        preScore: 23,
        postScore: 23,
        jump: 0,
        alignmentBefore: 61,
        alignmentAfter: 61,
        employabilityBefore: 68,
        employabilityAfter: 68,
        futureBefore: 55,
        futureAfter: 55,
        employerMatchBefore: 61,
        employerMatchAfter: 61,
      };

  const handleToggle = () => {
    const nextState = !isSimulated;
    setIsSimulated(nextState);
    if (onSimulateReassessment) {
      onSimulateReassessment();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <TrendingUp className="size-3.5" />
            <span>Closed-Loop Impact Measurement</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Post-Training Reassessment & ROI
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Compare student baseline assessments before and after completing targeted skills training.
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs transition"
        >
          {isSimulated ? (
            <>
              <RotateCcw className="size-3.5" />
              <span>Reset to Pre-Training State</span>
            </>
          ) : (
            <>
              <Sparkles className="size-3.5" />
              <span>Simulate Reassessment Completion</span>
            </>
          )}
        </button>
      </div>

      {/* Main Stat Callout Card */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/70 via-white to-indigo-50/40 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-block rounded-full bg-indigo-100 text-indigo-800 px-3 py-1 text-xs font-bold">
              Cohort Target: Cloud Fundamentals (412 Enrolled)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {isSimulated ? 'Demonstrated Competency Growth (+45 Pts)' : 'Awaiting Cohort Assessment Submission'}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isSimulated
                ? 'Students completed guided cloud infrastructure labs, containerized microservices deployments, and automated testing benchmarks.'
                : 'Click "Simulate Reassessment Completion" to evaluate how targeted training elevates institutional alignment and candidate placement.'}
            </p>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
              <span className="text-xs text-slate-400 font-medium">Pre-Training</span>
              <p className="text-3xl font-extrabold text-slate-500 mt-1">{metrics.preScore}</p>
            </div>
            <ArrowRight className="size-5 text-indigo-600 shrink-0" />
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-xs">
              <span className="text-xs text-emerald-700 font-bold">Post-Training</span>
              <p className="text-3xl font-extrabold text-emerald-600 mt-1">{metrics.postScore}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Impact Dimensions */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Metric 1 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Cohort Industry Alignment</span>
            <Target className="size-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-bold text-slate-900">
              {metrics.alignmentBefore}% → {metrics.alignmentAfter}%
            </span>
            {isSimulated && (
              <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-bold">
                +{metrics.alignmentAfter - metrics.alignmentBefore}%
              </span>
            )}
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${metrics.alignmentAfter}%` }} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Overall Employability</span>
            <BriefcaseBusiness className="size-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-bold text-slate-900">
              {metrics.employabilityBefore}% → {metrics.employabilityAfter}%
            </span>
            {isSimulated && (
              <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-bold">
                +{metrics.employabilityAfter - metrics.employabilityBefore}%
              </span>
            )}
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${metrics.employabilityAfter}%` }} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Future Market Readiness</span>
            <Sparkles className="size-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-bold text-slate-900">
              {metrics.futureBefore}% → {metrics.futureAfter}%
            </span>
            {isSimulated && (
              <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-bold">
                +{metrics.futureAfter - metrics.futureBefore}%
              </span>
            )}
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden mt-2">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${metrics.futureAfter}%` }} />
          </div>
        </div>

        {/* Metric 4: Direct Employer Partner Outcome */}
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-indigo-900 font-bold">
            <span>Nimbus Cloud Engineer Fit</span>
            <CheckCircle2 className="size-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-bold text-slate-900">
              {metrics.employerMatchBefore}% → {metrics.employerMatchAfter}%
            </span>
            {isSimulated && (
              <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-bold">
                +{metrics.employerMatchAfter - metrics.employerMatchBefore}%
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            Elevates candidate into top shortlisting tier for verified partner hiring.
          </p>
        </div>
      </div>
    </div>
  );
};
