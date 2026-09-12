import React, { useState } from 'react';
import { FileText, Printer, Download, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';
import { curriculumCoursesList, jobRolesList, marketSkillsList, studentCohortList } from '../../data/platformData';

export const InstitutionReportsView: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>('institutional-alignment');

  const reportsList = [
    { id: 'institutional-alignment', title: 'Institutional Alignment Report', subtitle: 'Overall cohort compliance with active industry standards' },
    { id: 'student-skill-gap', title: 'Cohort Skill Gap Audit', subtitle: 'Identified proficiency deficits across engineering departments' },
    { id: 'curriculum-alignment', title: 'Curriculum & Syllabus Modernization', subtitle: 'Course-by-course alignment and recommended syllabus additions' },
    { id: 'training-effectiveness', title: 'Training Effectiveness & ROI', subtitle: 'Pre vs post intervention performance and score jumps' },
    { id: 'employer-matching', title: 'Employer Partner Placement Report', subtitle: 'Candidate pipeline readiness and matching distribution' },
    { id: 'future-readiness', title: 'Emerging Skills & Future Horizon', subtitle: 'Coverage of fast-growing technologies (GenAI, Cloud, MLOps)' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <FileText className="size-3.5" />
            <span>Governance & Accreditation Deliverables</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Institutional Reports & Audits
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Generate formal documentation for academic senates, accreditation bodies, and placement offices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition"
          >
            <Printer className="size-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Report Selector - 1 Col */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Audit Type</span>
          <div className="space-y-1.5">
            {reportsList.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedReport(r.id)}
                className={`w-full text-left rounded-xl p-3 text-xs transition border ${
                  selectedReport === r.id
                    ? 'border-indigo-600 bg-indigo-50/70 font-bold text-indigo-950 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{r.title}</span>
                  {selectedReport === r.id && <ChevronRight className="size-3.5 text-indigo-600" />}
                </div>
                <p className="text-[11px] font-normal text-slate-500 mt-1">{r.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Report Preview - 3 Cols */}
        <div className="lg:col-span-3 rounded-xl border border-slate-200 bg-white p-8 shadow-xs space-y-6">
          {/* Document Header */}
          <div className="border-b border-slate-200 pb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Official Document • CONFIDENTIAL
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {reportsList.find((r) => r.id === selectedReport)?.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluation Window: Academic Term 2025–2026 • Verified via SkillAlign Engine
              </p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p className="font-semibold text-slate-800">Apex Institute of Technology</p>
              <p>Generated: September 11, 2026</p>
            </div>
          </div>

          {/* Executive Summary Paragraph */}
          <div className="text-xs text-slate-700 leading-relaxed space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <strong className="text-slate-900 block font-semibold">Executive Audit Synopsis:</strong>
            <p>
              This evaluation examines student proficiency data across 2,450 enrolled students against 6 verified
              hiring partner role benchmarks. The composite institutional alignment index is calculated at 76%, reflecting
              robust theoretical foundation in computer systems and algorithms, alongside notable deficits in cloud
              infrastructure containerization and distributed messaging.
            </p>
          </div>

          {/* Statistical Highlights Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Primary Performance Metrics</h3>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-lg border border-slate-200 p-3">
                <span className="text-slate-500">Industry Role Fit</span>
                <p className="text-2xl font-bold text-indigo-700 mt-1">78%</p>
                <span className="text-[10px] text-emerald-600 font-semibold">+5% YoY</span>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <span className="text-slate-500">Curriculum Coverage</span>
                <p className="text-2xl font-bold text-slate-900 mt-1">76%</p>
                <span className="text-[10px] text-slate-500">8 Modules Aligned</span>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <span className="text-slate-500">Placement Readiness</span>
                <p className="text-2xl font-bold text-emerald-600 mt-1">81%</p>
                <span className="text-[10px] text-slate-500">842 Qualified</span>
              </div>
            </div>
          </div>

          {/* Detailed Course Audit Extract */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Sample Curricular Audit Extract</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <tr>
                    <th className="p-2.5 font-semibold">Course Code</th>
                    <th className="p-2.5 font-semibold">Title</th>
                    <th className="p-2.5 font-semibold">Alignment</th>
                    <th className="p-2.5 font-semibold">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {curriculumCoursesList.slice(0, 4).map((c) => (
                    <tr key={c.course}>
                      <td className="p-2.5 font-mono text-indigo-600 font-bold">{c.department || 'CSE-301'}</td>
                      <td className="p-2.5 font-medium text-slate-900">{c.course}</td>
                      <td className="p-2.5 font-semibold">{c.alignmentStatus || 'Aligned'}</td>
                      <td className="p-2.5 text-slate-600">{c.duration} ({c.level})</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Signoff Footer */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              <p className="font-semibold text-slate-800">Academic Review Board</p>
              <p>Certified by SkillAlign Engine v2.5</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[11px]">VERIFY-HASH: 8F7A-92B1-4E02-CA61</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
