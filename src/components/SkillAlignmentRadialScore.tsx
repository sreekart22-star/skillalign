import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  PlusCircle,
  MinusCircle,
  CheckCircle,
} from 'lucide-react';
import { AlignmentScoreBreakdown } from '../types';

interface SkillAlignmentRadialScoreProps {
  breakdown: AlignmentScoreBreakdown;
  roleName: string;
  onExploreGaps?: () => void;
}

export const SkillAlignmentRadialScore: React.FC<SkillAlignmentRadialScoreProps> = ({
  breakdown,
  roleName,
  onExploreGaps,
}) => {
  const {
    overall,
    technicalPoints,
    roleReqPoints,
    projectPoints,
    experiencePoints,
    certPoints,
    emergingPoints,
    assessmentPoints,
    missingSkillPenalty,
    assessmentGapPenalty,
    explanation,
  } = breakdown;

  // SVG circular arc math
  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overall / 100) * circumference;

  const scoreTier =
    overall >= 80 ? 'High Market Alignment' : overall >= 65 ? 'Moderate Alignment' : 'Developing Alignment';
  const tierColor =
    overall >= 80 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : overall >= 65 ? 'text-sky-700 bg-sky-50 border-sky-200' : 'text-amber-700 bg-amber-50 border-amber-200';

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
      {/* Top Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
              Transparent Readiness Model
            </span>
            <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold text-stone-600">
              Explainable AI
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            SkillAlign Alignment Score
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
            This is an AI-generated readiness indicator based on the available profile data, continuously weighted against real-time industry role expectations.
          </p>
        </div>

        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${tierColor}`}>
          <ShieldCheck className="size-3.5" />
          {scoreTier}
        </span>
      </div>

      {/* Main Body: Radial Ring + Breakdown Columns */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12 items-center">
        {/* Radial Visualization Column */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-[#FAF8F5] rounded-xl border border-stone-200/80">
          <div className="relative flex size-44 items-center justify-center">
            <svg className="size-full -rotate-90" viewBox="0 0 160 160">
              {/* Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#E7E5E4"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Animated Value Arc */}
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                stroke={overall >= 80 ? '#059669' : overall >= 65 ? '#0284C7' : '#D97706'}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              />
            </svg>

            {/* Inner Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl font-extrabold tracking-tight text-slate-900"
              >
                {overall}%
              </motion.span>
              <span className="text-[11px] font-medium text-stone-500 mt-0.5">
                Target: {roleName}
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
            <HelpCircle className="size-3.5 text-stone-400" />
            <span>Never an absolute cutoff; acts as guidance</span>
          </div>
        </div>

        {/* Breakdown Vector Grid */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Factor Decomposition & Weighting
            </h4>
            <span className="text-[11px] text-stone-500">7 Verifiable Dimensions</span>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {/* Positive Drivers */}
            <div className="rounded-lg border border-emerald-100 bg-emerald-50/40 p-3 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <PlusCircle className="size-3.5 text-emerald-600" />
                <span>Value Contributors</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Technical Skills Match</span>
                  <span className="font-bold text-emerald-700">+{technicalPoints} pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Role Requirements Met</span>
                  <span className="font-bold text-emerald-700">+{roleReqPoints} pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Demonstrated Projects</span>
                  <span className="font-bold text-emerald-700">+{projectPoints} pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Industry Certifications</span>
                  <span className="font-bold text-emerald-700">+{certPoints} pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Emerging Skills & Lab Tests</span>
                  <span className="font-bold text-emerald-700">+{emergingPoints + assessmentPoints} pts</span>
                </div>
              </div>
            </div>

            {/* Deductions / Gaps */}
            <div className="rounded-lg border border-rose-100 bg-rose-50/40 p-3 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                <MinusCircle className="size-3.5 text-rose-600" />
                <span>Actionable Gaps (Deductions)</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Missing Critical Industry Skills</span>
                  <span className="font-bold text-rose-700">
                    {missingSkillPenalty > 0 ? `-${missingSkillPenalty} pts` : '0 pts (Met)'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Assessment Benchmark Gap</span>
                  <span className="font-bold text-rose-700">
                    {assessmentGapPenalty > 0 ? `-${assessmentGapPenalty} pts` : '0 pts (Met)'}
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-rose-200/60 text-[11px] text-stone-600">
                  <span>Closing these gaps can lift your score to <strong>+{missingSkillPenalty + assessmentGapPenalty} points</strong>.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation Footer */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-stone-50 p-3 border border-stone-200/70 text-xs text-slate-700">
            <p className="max-w-xl text-stone-600">{explanation}</p>
            {onExploreGaps && (
              <button
                type="button"
                onClick={onExploreGaps}
                className="font-bold text-sky-700 hover:text-sky-800 transition underline underline-offset-2"
              >
                Inspect Skill Gaps →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
