import React, { useState } from 'react';
import {
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Filter,
  Search,
  ArrowUpRight,
  TrendingUp,
  FileSpreadsheet,
  Layers,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { curriculumHeatmapData } from '../../data/platformData';
import { CurriculumHeatmapCell } from '../../types';

interface NormalizedCourse extends CurriculumHeatmapCell {
  courseName: string;
  courseCode: string;
  currentCoverage: number;
  industryDemand: number;
  obsolescenceScore: number;
  alignmentTier: string;
  suggestedNewTopics: string[];
  recommendedUpdate: string;
  potentialEmployabilityBoost: string;
}

const normalizedHeatmapData: NormalizedCourse[] = curriculumHeatmapData.map((item) => {
  const courseName = item.courseName || item.subject;
  const courseCode = item.courseCode || item.code;
  const overallAlignment = item.overallAlignment || 60;
  const obsolescenceScore = item.obsolescenceScore ?? (100 - overallAlignment);
  const currentCoverage = item.currentCoverage ?? Math.round(overallAlignment * 0.9);
  const industryDemand = item.industryDemand ?? Math.min(96, Math.round(obsolescenceScore * 1.1 + 30));
  const alignmentTier =
    item.alignmentTier ||
    (overallAlignment >= 65 ? 'High Alignment' : overallAlignment >= 50 ? 'Moderate Alignment' : 'High Obsolescence Risk');
  const suggestedNewTopics = item.suggestedNewTopics || item.missingIndustrySkills || [];
  const recommendedUpdate =
    item.recommendedUpdate ||
    `Inject modern lab modules for ${(item.missingIndustrySkills || []).slice(0, 2).join(' and ') || 'emerging technologies'} to align with contemporary tech stack benchmarks.`;
  const potentialEmployabilityBoost =
    item.potentialEmployabilityBoost || `+${Math.round(obsolescenceScore * 0.25)}% placement readiness for cohort graduates`;

  return {
    ...item,
    courseName,
    courseCode,
    overallAlignment,
    obsolescenceScore,
    currentCoverage,
    industryDemand,
    alignmentTier,
    suggestedNewTopics,
    recommendedUpdate,
    potentialEmployabilityBoost,
  };
});

export const CurriculumAlignmentView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<NormalizedCourse | null>(normalizedHeatmapData[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered = normalizedHeatmapData.filter((c) => {
    const matchSearch =
      c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.suggestedNewTopics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchRisk = riskFilter === 'All' || c.alignmentTier === riskFilter;
    return matchSearch && matchRisk;
  });

  const highRiskCount = normalizedHeatmapData.filter((c) => c.alignmentTier === 'High Obsolescence Risk').length;
  const moderateCount = normalizedHeatmapData.filter((c) => c.alignmentTier === 'Moderate Alignment').length;
  const alignedCount = normalizedHeatmapData.filter((c) => c.alignmentTier === 'High Alignment').length;

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'High Alignment':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'Moderate Alignment':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'High Obsolescence Risk':
        return 'bg-rose-50 text-rose-800 border-rose-300';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  const getRiskBadge = (score: number) => {
    if (score >= 60) return 'text-rose-700 bg-rose-50 border-rose-200';
    if (score >= 30) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  };

  const handleDraftProposal = (course: NormalizedCourse) => {
    setToastMessage(`Syllabus revision proposal drafted for ${course.courseCode}: ${course.courseName}. Routed to Board of Studies.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-900 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
          <button type="button" onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900 font-bold">
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-sky-50 border border-sky-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-800">
                INSTITUTION INTELLIGENCE
              </span>
              <span className="text-xs text-stone-500">Academic Year 2025–26</span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 mt-1">
              Curriculum Alignment & Obsolescence Audit
            </h1>
            <p className="text-xs text-stone-600 mt-0.5">
              Continuous multi-vector audit comparing accredited university syllabi with real-time industry job requisitions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setToastMessage('Running live multi-vector audit against 14,200 active market postings... Completed in 1.4s.');
                setTimeout(() => setToastMessage(null), 3500);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-[#FAF8F5] px-3.5 py-2 text-xs font-bold text-slate-900 hover:bg-stone-100 transition shadow-2xs cursor-pointer"
            >
              <RefreshCw className="size-3.5 text-stone-500" />
              <span>Refresh Industry Vectors</span>
            </button>
          </div>
        </div>

        {/* Executive Audit Summary Banner (Requirement 7) */}
        <div className="rounded-2xl border-2 border-slate-900 bg-[#FAF8F5] p-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-black text-sky-700 tracking-wider uppercase">
                EXECUTIVE AUDIT SUMMARY
              </span>
              <h2 className="text-lg font-black text-slate-900">
                INSTITUTION CURRICULUM AUDIT
              </h2>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-slate-900 font-mono">68%</span>
                <span className="text-xs font-bold text-stone-600">Curriculum Alignment Index</span>
                <span className="text-xs font-mono text-amber-700 font-semibold">(Batch Skill Gap: 32%)</span>
              </div>
            </div>

            <div className="space-y-1.5 lg:border-l lg:border-stone-200 lg:pl-6">
              <span className="text-[10px] font-mono font-bold text-rose-800 uppercase tracking-wider block">
                Top Gaps Across Enrolled Cohorts:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Docker', 'ML Deployment', 'Cloud Data Pipelines', 'Kubernetes', 'MLOps'].map((gap) => (
                  <span key={gap} className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-300 text-xs font-mono font-bold text-rose-800">
                    ✕ {gap}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-stone-500 pt-1">
                Industry Benchmark Comparison: Peer Tier-1 Institutions average 74% alignment (+6% gap).
              </p>
            </div>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-900">High Obsolescence Risk</span>
              <AlertTriangle className="size-4 text-rose-600" />
            </div>
            <p className="text-2xl font-black text-rose-900 mt-1">{highRiskCount} Courses</p>
            <p className="text-[11px] text-rose-700 mt-0.5">Coverage gap &gt; 50% vs market demand</p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900">Moderate Alignment</span>
              <Layers className="size-4 text-amber-600" />
            </div>
            <p className="text-2xl font-black text-amber-900 mt-1">{moderateCount} Courses</p>
            <p className="text-[11px] text-amber-700 mt-0.5">Requires modern topic modular injection</p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900">High Alignment</span>
              <CheckCircle2 className="size-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-emerald-900 mt-1">{alignedCount} Courses</p>
            <p className="text-[11px] text-emerald-700 mt-0.5">Syllabus matches contemporary stack benchmarks</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between rounded-xl border border-stone-200 bg-white p-3.5">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 size-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by course code, name, or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-stone-200 bg-[#FAF8F5] pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-stone-400 focus:outline-hidden focus:border-slate-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="size-4 text-stone-400" />
          <div className="flex rounded-lg border border-stone-200 bg-[#FAF8F5] p-0.5 text-xs font-semibold">
            {['All', 'High Obsolescence Risk', 'Moderate Alignment', 'High Alignment'].map((risk) => (
              <button
                key={risk}
                type="button"
                onClick={() => setRiskFilter(risk)}
                className={`rounded-md px-2.5 py-1 transition cursor-pointer text-xs ${
                  riskFilter === risk
                    ? 'bg-slate-900 text-white shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-slate-900'
                }`}
              >
                {risk === 'High Obsolescence Risk' ? 'High Risk' : risk === 'Moderate Alignment' ? 'Moderate' : risk === 'High Alignment' ? 'Aligned' : 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Heatmap Matrix (8 cols) + Inspector (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Course Heatmap Table - 8 cols */}
        <div className="lg:col-span-8 rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xs">
          <div className="border-b border-stone-200 bg-[#FAF8F5] p-3.5 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Syllabus Audit Matrix ({filtered.length} courses)</span>
            <span className="text-[11px] text-stone-500">Click any course to inspect revision recommendations</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-200 bg-[#FAF8F5] text-stone-600">
                <tr>
                  <th className="p-3 font-semibold">Course Code & Title</th>
                  <th className="p-3 font-semibold">Curriculum Coverage</th>
                  <th className="p-3 font-semibold">Industry Demand</th>
                  <th className="p-3 font-semibold">Obsolescence Risk</th>
                  <th className="p-3 font-semibold">Alignment Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((item) => {
                  const isSelected = selectedCourse?.courseCode === item.courseCode;
                  return (
                    <tr
                      key={item.courseCode}
                      onClick={() => setSelectedCourse(item)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-sky-50/60 font-semibold' : 'hover:bg-stone-50'
                      }`}
                    >
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block">{item.courseName}</span>
                        <span className="text-[10px] font-mono text-stone-500">{item.courseCode} • {item.department}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-slate-800">{item.currentCoverage}%</span>
                        <div className="w-16 h-1.5 rounded-full bg-stone-100 mt-1 overflow-hidden">
                          <div className="h-full bg-slate-600" style={{ width: `${item.currentCoverage}%` }} />
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-slate-800">{item.industryDemand}%</span>
                        <div className="w-16 h-1.5 rounded-full bg-stone-100 mt-1 overflow-hidden">
                          <div className="h-full bg-sky-600" style={{ width: `${item.industryDemand}%` }} />
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold border ${getRiskBadge(item.obsolescenceScore)}`}>
                          {item.obsolescenceScore}% Risk
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${getTierColor(item.alignmentTier)}`}>
                          {item.alignmentTier}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Course Action Inspector - 4 cols */}
        <div className="lg:col-span-4 space-y-4">
          {selectedCourse ? (
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <span className="text-[10px] font-mono text-stone-500">{selectedCourse.courseCode} • {selectedCourse.department}</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{selectedCourse.courseName}</h3>
                <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${getTierColor(selectedCourse.alignmentTier)}`}>
                  {selectedCourse.alignmentTier}
                </span>
              </div>

              {/* Recommended Syllabus Update */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-700 block">
                  Recommended Syllabus Update:
                </span>
                <p className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200 text-stone-700 leading-relaxed">
                  {selectedCourse.recommendedUpdate}
                </p>
              </div>

              {/* Suggested New Topics */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                  Suggested Modern Topics to Inject:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCourse.suggestedNewTopics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-md bg-sky-50 border border-sky-200 px-2 py-0.5 text-xs font-semibold text-sky-800"
                    >
                      + {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Employability Boost */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <TrendingUp className="size-4 text-emerald-600" />
                  <span>Projected Cohort Impact</span>
                </div>
                <p className="text-xs text-emerald-800 font-semibold">
                  {selectedCourse.potentialEmployabilityBoost}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleDraftProposal(selectedCourse)}
                className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs cursor-pointer"
              >
                Draft Syllabus Revision Proposal
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center text-xs text-stone-500">
              Select a course in the heatmap to inspect curriculum upgrade recommendations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
