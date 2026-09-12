import React from 'react';
import {
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Sparkles,
  BarChart2,
  CheckCircle2,
  MinusCircle,
  PlusCircle,
  RefreshCw,
} from 'lucide-react';
import { marketSkillsList, curriculumCoursesList, jobRolesList } from '../../data/platformData';

export const ObsolescenceAnalyticsView: React.FC = () => {
  // Compute analytics
  const totalCourses = curriculumCoursesList.length;
  const taughtSkills = new Set(curriculumCoursesList.map((c) => c.skill));
  const missingCritical = marketSkillsList.filter((m) => m.demand >= 80 && !taughtSkills.has(m.skill));

  // Declining / Outdated topics (e.g. Legacy SOAP, Turbo C, Assembly without systems context)
  const legacyTopics = [
    { name: 'Legacy SOAP Web Services', course: 'CS402 Web Technologies', reason: 'Industry migrated to REST & gRPC', replacement: 'FastAPI / RESTful microservices' },
    { name: 'Turbo C++ IDE & Non-Standard Borland C', course: 'CS101 Programming Lab', reason: 'Deprecated compiler semantics', replacement: 'Modern C++20 / Clang tooling' },
    { name: 'Flash / ActionScript Media Architecture', course: 'IT204 Multimedia Systems', reason: 'End-of-life protocol', replacement: 'WebAssembly & Canvas API' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider">
            <AlertTriangle className="size-3.5" />
            <span>Curriculum Life-Cycle Intelligence</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Obsolescence & Gap Analysis
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Identifies syllabus modules misaligned with current hiring requirements and emerging tech stacks.
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
          Academic Year 2025–2026 Audit
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Curriculum Obsolescence Risk</span>
          <p className="mt-2 text-3xl font-bold text-rose-600">18.4%</p>
          <p className="mt-1 text-xs text-slate-500">3 syllabus modules contain deprecated stacks</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Composite Alignment Index</span>
          <p className="mt-2 text-3xl font-bold text-indigo-600">76 / 100</p>
          <p className="mt-1 text-xs text-emerald-600 font-semibold">Good Alignment (Target: 85+)</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Critical Uncovered Stacks</span>
          <p className="mt-2 text-3xl font-bold text-slate-900">{missingCritical.length}</p>
          <p className="mt-1 text-xs text-rose-600 font-semibold">Includes Docker & Cloud Native</p>
        </div>
      </div>

      {/* Critical Missing Skills Bar List */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">High-Demand Industry Skills Missing from Catalog</h2>
            <p className="text-xs text-slate-500">
              Ranked by observed employer job requirement frequencies across active tech partners.
            </p>
          </div>
          <span className="rounded-sm bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800 uppercase">
            Action: Add to syllabus
          </span>
        </div>

        <div className="space-y-3">
          {missingCritical.map((item) => (
            <div key={item.skill} className="rounded-lg border border-slate-200 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{item.skill}</span>
                <span className="font-semibold text-rose-600">Hiring Demand: {item.demand}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${item.demand}%` }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Observed 12-mo Growth: {item.trend}</span>
                <span className="text-indigo-600 font-medium">Recommended: Integrate into Cloud Computing track</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deprecated Topics Alert */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <TrendingDown className="size-4 text-amber-700" />
          <h2 className="text-sm font-bold text-amber-950 uppercase tracking-wider">
            Outdated Curriculum Elements Flagged for Sunset
          </h2>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          These modules teach technologies that no longer meet active employer hiring standards. Sunsetting or replacing
          them with modern equivalents will recover approximately 36 instructional credit hours.
        </p>

        <div className="grid gap-3 sm:grid-cols-3 pt-1">
          {legacyTopics.map((topic) => (
            <div key={topic.name} className="rounded-lg border border-amber-200 bg-white p-4 text-xs space-y-2">
              <span className="font-bold text-slate-900 block">{topic.name}</span>
              <p className="text-[11px] text-slate-500 font-mono">{topic.course}</p>
              <div className="pt-2 border-t border-slate-100 text-[11px]">
                <strong className="text-rose-700 block mb-0.5">Defect:</strong> {topic.reason}
                <strong className="text-emerald-700 block mt-1.5 mb-0.5">Recommended Replacement:</strong>
                {topic.replacement}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curricular Recommendation Action Matrix */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Recommended Curricular Actions (Academic Senate Review)
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <PlusCircle className="size-4 text-emerald-600" />
              <span>ADD TO SYLLABUS</span>
            </div>
            <ul className="space-y-1.5 text-slate-700 pt-1">
              <li>• Docker & Containerization (CS304)</li>
              <li>• Cloud Native Architecture & AWS (CS401)</li>
              <li>• Applied GenAI & LLM Fine-Tuning (CS408)</li>
            </ul>
          </div>

          <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-indigo-900">
              <RefreshCw className="size-4 text-indigo-600" />
              <span>UPDATE & MODERNIZE</span>
            </div>
            <ul className="space-y-1.5 text-slate-700 pt-1">
              <li>• Shift DBMS to include NoSQL & Vector DBs</li>
              <li>• Update Web Tech to React 18+ and TypeScript</li>
              <li>• Introduce automated CI/CD to Software Eng.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-rose-900">
              <MinusCircle className="size-4 text-rose-600" />
              <span>REDUCE / RETIRE</span>
            </div>
            <ul className="space-y-1.5 text-slate-700 pt-1">
              <li>• Sunset Turbo C++ compiler dependencies</li>
              <li>• Reduce theoretical XML parsing coursework</li>
              <li>• Replace legacy SOAP tutorials with OpenAPI</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
