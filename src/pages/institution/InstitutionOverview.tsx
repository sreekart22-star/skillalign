import React from 'react';
import {
  Users,
  Target,
  BriefcaseBusiness,
  Sparkles,
  AlertTriangle,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  BrainCircuit,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { trainingProgramsList } from '../../data/platformData';

interface InstitutionOverviewProps {
  onNavigate: (page: string) => void;
}

export const InstitutionOverview: React.FC<InstitutionOverviewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <GraduationCap className="size-3.5" />
            <span>Academic Leadership & Workforce Governance</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Executive Institutional Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            A decision-ready intelligence dashboard connecting academic delivery with industry role specifications.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('training')}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 shadow-xs transition"
        >
          <span>Plan Interventions</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      {/* 8 Executive KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Enrolled Cohort</span>
            <Users className="size-4 text-indigo-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">2,450</p>
          <p className="mt-1 text-xs text-slate-500">Across 4 engineering depts</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Industry Role Alignment</span>
            <Target className="size-4 text-indigo-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-indigo-600">78%</p>
          <p className="mt-1 text-xs text-emerald-600 font-semibold">+5 pts since last cycle</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Employability Index</span>
            <BriefcaseBusiness className="size-4 text-indigo-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">81%</p>
          <p className="mt-1 text-xs text-slate-500">842 students placement-ready</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Future Market Readiness</span>
            <Sparkles className="size-4 text-indigo-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">71%</p>
          <p className="mt-1 text-xs text-slate-500">Emerging signal coverage</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Critical Skill Gaps</span>
            <AlertTriangle className="size-4 text-rose-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-rose-600">12</p>
          <p className="mt-1 text-xs text-rose-600 font-semibold">3 need immediate training</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Training Active Learners</span>
            <BookOpen className="size-4 text-indigo-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">73%</p>
          <p className="mt-1 text-xs text-slate-500">1,148 active in modules</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Curriculum Alignment</span>
            <GraduationCap className="size-4 text-indigo-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">76%</p>
          <p className="mt-1 text-xs text-slate-500">6 recommended course shifts</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Placement Jump Rate</span>
            <CheckCircle2 className="size-4 text-emerald-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-emerald-600">+45 pts</p>
          <p className="mt-1 text-xs text-slate-500">Post-intervention gain</p>
        </div>
      </div>

      {/* Priority Queue & Explainable AI Callout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Priority Intervention Queue - 2 Cols */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Priority Intervention Queue</h2>
              <p className="text-xs text-slate-500">
                Highest-impact capability gaps across the student cohort requiring immediate curricular support.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('training')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              View All 5 Programs →
            </button>
          </div>

          <div className="space-y-3">
            {trainingProgramsList.slice(0, 3).map((prog) => (
              <div
                key={prog.id}
                onClick={() => onNavigate('training')}
                className="cursor-pointer flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-4 transition hover:border-indigo-300 hover:bg-slate-50/70"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{prog.name}</span>
                    <span className="rounded-sm bg-rose-50 border border-rose-200 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 uppercase">
                      Critical
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Addresses: <strong className="text-slate-800">{prog.skill}</strong> • {prog.affected} students
                    impacted • Duration: {prog.duration}
                  </p>
                </div>
                <span className="rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 text-xs font-bold">
                  +{prog.improvement} pts expected
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight Card - 1 Col */}
        <div className="space-y-6">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
              <BrainCircuit className="size-4" />
              <span>AI Strategic Insight</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Prioritize Cloud Fundamentals this quarter
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>Highest hiring demand across 3 target placement tracks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>Largest average proficiency gap (52 pts below industry benchmark)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>412 students impacted in the 2026 graduation cohort</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>Projected cohort readiness boost: <strong>+11 overall pts</strong></span>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => onNavigate('reassessment')}
              className="mt-2 w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs transition"
            >
              <span>Explore Reassessment Simulation</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
