import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Plus,
  FileCheck,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Terminal,
  FileSpreadsheet,
} from 'lucide-react';

interface FacultyWorkspaceProps {
  onOpenInterventionModal?: () => void;
}

export const FacultyWorkspace: React.FC<FacultyWorkspaceProps> = () => {
  const [selectedCohort, setSelectedCohort] = useState<string>('CSE 2025 - Batch A');

  // 1. Batch Skill Heatmap data
  const batchHeatmap = [
    { skill: 'Python (Syntax & OOP)', classAvg: 88, practicalTest: 86, gapRisk: 'Low', status: 'Proficient' },
    { skill: 'SQL & Joins', classAvg: 84, practicalTest: 82, gapRisk: 'Low', status: 'Proficient' },
    { skill: 'Data Structures (Trees/Graphs)', classAvg: 76, practicalTest: 58, gapRisk: 'High', status: 'Needs Lab Focus' },
    { skill: 'Machine Learning (Scikit-learn)', classAvg: 72, practicalTest: 52, gapRisk: 'High', status: 'Theoretical Only' },
    { skill: 'Docker Containerization', classAvg: 34, practicalTest: 18, gapRisk: 'Critical', status: 'Severe Gap' },
    { skill: 'FastAPI / REST Deployment', classAvg: 42, practicalTest: 24, gapRisk: 'Critical', status: 'Severe Gap' },
  ];

  // 2. Assignment Gap Detection
  const assignmentGaps = [
    {
      assignment: 'Assignment 3: Relational Normalization & SQL Queries',
      submittedCount: '138 / 142',
      writtenScore: '86% average',
      detectedGap: 'Students wrote correct SQL on paper, but 44% failed sandbox execution due to syntax and unindexed subqueries.',
      severity: 'Medium',
    },
    {
      assignment: 'Assignment 5: Customer Churn Classification Model',
      submittedCount: '129 / 142',
      writtenScore: '82% average',
      detectedGap: 'Submissions relied on copy-pasted Jupyter notebooks; zero submissions containerized or exposed an inference endpoint.',
      severity: 'High',
    },
  ];

  // 3. Exam vs Practical Skill Gap comparison
  const examVsPractical = [
    { domain: 'Algorithms (Graph Traversal)', examScore: 84, practicalScore: 56, delta: -28 },
    { domain: 'Database Systems (Transactions & Indexing)', examScore: 88, practicalScore: 68, delta: -20 },
    { domain: 'Applied ML (Model Deployment)', examScore: 78, practicalScore: 38, delta: -40 },
    { domain: 'Object Oriented Programming', examScore: 82, practicalScore: 78, delta: -4 },
  ];

  // 4. Recommended Lab Exercises
  const recommendedLabs = [
    {
      title: 'Lab 7 Upgrade: Dockerized FastAPI ML Inference Sandbox',
      targetGap: 'Docker Containerization & REST Endpoints',
      duration: '2 Lab Hours',
      impact: '+34% improvement in cohort Cloud/ML placement readiness',
      action: 'Inject Starter Template into LMS',
    },
    {
      title: 'Lab 4 Upgrade: Live PostgreSQL Index Benchmarking Challenge',
      targetGap: 'Query Execution Optimization & EXPLAIN ANALYZE',
      duration: '1.5 Lab Hours',
      impact: '+22% practical query performance pass rate',
      action: 'Publish Benchmark Sandbox',
    },
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Workspace Header */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-800">
              <Users className="size-3.5" />
              <span>FACULTY INTELLIGENCE WORKSPACE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Department Faculty Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              Computer Science & Engineering • Cohort Analytics, Assignment Audits & Practical Gap Mitigation
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="rounded-xl border border-stone-200 bg-[#FAF8F5] px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-hidden"
            >
              <option value="CSE 2025 - Batch A">CSE 2025 - Batch A (142 Students)</option>
              <option value="CSE 2025 - Batch B">CSE 2025 - Batch B (136 Students)</option>
              <option value="AI/ML Specialization">AI/ML Specialization (98 Students)</option>
            </select>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-100">
          <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Class Skill Readiness</span>
            <span className="text-2xl font-black text-slate-900 font-mono mt-0.5 block">75.0%</span>
            <span className="text-[10px] text-emerald-700 font-semibold">+4.2% from diagnostic</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Students Evaluated</span>
            <span className="text-2xl font-black text-slate-900 font-mono mt-0.5 block">142</span>
            <span className="text-[10px] text-stone-500">Active cohort enrolled</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Exam vs Code Gap</span>
            <span className="text-2xl font-black text-rose-700 font-mono mt-0.5 block">-26%</span>
            <span className="text-[10px] text-rose-600">Practical deficit identified</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Lab Action Triggers</span>
            <span className="text-2xl font-black text-sky-700 font-mono mt-0.5 block">2 Labs</span>
            <span className="text-[10px] text-sky-700 font-semibold">Recommended revisions</span>
          </div>
        </div>
      </div>

      {/* 1. BATCH SKILL HEATMAP (Requirement 8) */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Flame className="size-4 text-amber-600" />
              <span>BATCH SKILL HEATMAP</span>
            </h2>
            <p className="text-xs text-stone-500">
              Aggregated skill competency levels across written coursework vs live sandbox execution tests.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase text-[10px] font-bold">
                <th className="py-2.5 px-3">Skill Competency</th>
                <th className="py-2.5 px-3">Curriculum Average</th>
                <th className="py-2.5 px-3">Practical Execution Score</th>
                <th className="py-2.5 px-3">Gap Delta</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {batchHeatmap.map((row) => (
                <tr key={row.skill} className="hover:bg-stone-50/60">
                  <td className="py-3 px-3 font-bold text-slate-900">{row.skill}</td>
                  <td className="py-3 px-3 font-mono text-stone-600">{row.classAvg}%</td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{row.practicalTest}%</td>
                  <td className="py-3 px-3">
                    <span className={`font-mono text-xs font-bold ${
                      row.gapRisk === 'Critical' ? 'text-rose-700' : row.gapRisk === 'High' ? 'text-amber-700' : 'text-emerald-700'
                    }`}>
                      {row.practicalTest - row.classAvg}%
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      row.gapRisk === 'Critical'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : row.gapRisk === 'High'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. ASSIGNMENT GAP DETECTION (Requirement 8) */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <FileCheck className="size-4 text-sky-600" />
              <span>ASSIGNMENT GAP DETECTION</span>
            </h2>
            <p className="text-xs text-stone-500">
              Automated audit flagging assignments where theoretical submissions mask practical deficits.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignmentGaps.map((item) => (
            <div key={item.assignment} className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs font-bold text-slate-900">{item.assignment}</h3>
                <span className="rounded-md bg-amber-100 border border-amber-300 text-amber-900 px-2 py-0.5 text-[10px] font-mono font-bold">
                  {item.severity} Gap
                </span>
              </div>
              <div className="text-[11px] text-stone-500 flex items-center justify-between border-y border-stone-200/60 py-1">
                <span>Submissions: {item.submittedCount}</span>
                <span>Written Average: {item.writtenScore}</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                {item.detectedGap}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. EXAM VS PRACTICAL SKILL GAP (Requirement 8) */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <BarChart3 className="size-4 text-purple-600" />
              <span>EXAM VS PRACTICAL SKILL GAP</span>
            </h2>
            <p className="text-xs text-stone-500">
              Direct comparison between written semester examinations and unassisted coding execution.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {examVsPractical.map((item) => (
            <div key={item.domain} className="p-4 rounded-2xl border border-stone-200 bg-[#FAF8F5] space-y-2">
              <span className="text-xs font-black text-slate-900 block">{item.domain}</span>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Written Exam: <strong className="text-slate-900">{item.examScore}%</strong></span>
                <span className="text-stone-500">Sandbox Code: <strong className="text-slate-900">{item.practicalScore}%</strong></span>
                <span className="rounded bg-rose-50 border border-rose-200 px-2 py-0.5 font-mono text-rose-800 font-bold text-[11px]">
                  {item.delta}% Gap
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. RECOMMENDED LAB EXERCISES (Requirement 8) */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Terminal className="size-4 text-emerald-600" />
              <span>RECOMMENDED LAB EXERCISES</span>
            </h2>
            <p className="text-xs text-stone-500">
              Intervention experiments to bridge practical execution deficits within the semester timetable.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {recommendedLabs.map((lab) => (
            <div key={lab.title} className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-black text-slate-900 block">{lab.title}</span>
                <span className="text-[11px] text-stone-600 block">
                  Target: <strong className="text-slate-800">{lab.targetGap}</strong> • {lab.duration}
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 block">{lab.impact}</span>
              </div>

              <button
                type="button"
                onClick={() => alert(`Lab exercise "${lab.title}" deployed to Department LMS.`)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer shrink-0"
              >
                <span>{lab.action}</span>
                <ArrowRight className="size-3.5 text-sky-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
