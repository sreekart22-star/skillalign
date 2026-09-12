import React, { useState } from 'react';
import { Users, Search, Filter, ChevronRight, CheckCircle2, AlertTriangle, Eye, X } from 'lucide-react';
import { studentCohortList } from '../../data/platformData';
import { StudentCohortMember } from '../../types';

export const CohortDirectoryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [inspectStudent, setInspectStudent] = useState<StudentCohortMember | null>(null);

  // Extended synthetic cohort
  const extendedCohort: StudentCohortMember[] = [
    ...studentCohortList,
    { id: 9, name: 'Kavya Menon', department: 'Computer Science', batch: '2026', career: 'Software Engineer', alignment: 80, employability: 84, readiness: 76, gaps: [] },
    { id: 10, name: 'Aditya Joshi', department: 'Information Technology', batch: '2025', career: 'Data Analyst', alignment: 69, employability: 73, readiness: 65, gaps: [] },
    { id: 11, name: 'Sneha Das', department: 'Computer Science', batch: '2026', career: 'AI Engineer', alignment: 75, employability: 78, readiness: 72, gaps: [] },
    { id: 12, name: 'Reyansh Kapoor', department: 'Electronics', batch: '2026', career: 'Cloud Engineer', alignment: 62, employability: 67, readiness: 58, gaps: [] },
    { id: 13, name: 'Aditi Jain', department: 'Computer Science', batch: '2025', career: 'Data Scientist', alignment: 83, employability: 88, readiness: 80, gaps: [] },
    { id: 14, name: 'Vedant Kulkarni', department: 'Information Technology', batch: '2026', career: 'Software Engineer', alignment: 77, employability: 80, readiness: 74, gaps: [] },
  ];

  const filtered = extendedCohort.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.career.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDept === 'All' || s.department === selectedDept;
    return matchSearch && matchDept;
  });

  const departments = ['All', 'Computer Science', 'Information Technology', 'Electronics'];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <Users className="size-3.5" />
            <span>Cohort Roster & Readiness Index</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Student Cohort Intelligence
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor student alignment, employability metrics, and capability gaps across departments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
            />
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Departments' : d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cohort Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/70 text-slate-600">
              <tr>
                <th className="p-3.5 font-semibold">Student Name</th>
                <th className="p-3.5 font-semibold">Department</th>
                <th className="p-3.5 font-semibold">Batch</th>
                <th className="p-3.5 font-semibold">Target Career</th>
                <th className="p-3.5 font-semibold">Alignment</th>
                <th className="p-3.5 font-semibold">Readiness Status</th>
                <th className="p-3.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition">
                  <td className="p-3.5 font-bold text-slate-900">{s.name}</td>
                  <td className="p-3.5 text-slate-600">{s.department}</td>
                  <td className="p-3.5 text-slate-500">{s.batch}</td>
                  <td className="p-3.5 font-medium text-indigo-700">{s.career}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{s.alignment}%</span>
                      <div className="w-12 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600"
                          style={{ width: `${s.alignment}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        s.readiness >= 75
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : s.readiness >= 65
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {s.readiness}% Ready
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => setInspectStudent(s)}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      <Eye className="size-3" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Inspection Modal */}
      {inspectStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Student Profile Audit
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{inspectStudent.name}</h3>
                <p className="text-xs text-slate-500">
                  {inspectStudent.department} • Class of {inspectStudent.batch} • Target: {inspectStudent.career}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInspectStudent(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <span className="text-[11px] text-slate-500 font-medium">Alignment</span>
                <p className="text-2xl font-bold text-slate-900 mt-1">{inspectStudent.alignment}%</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <span className="text-[11px] text-slate-500 font-medium">Employability</span>
                <p className="text-2xl font-bold text-indigo-700 mt-1">{inspectStudent.employability}%</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <span className="text-[11px] text-slate-500 font-medium">Readiness</span>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{inspectStudent.readiness}%</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Identified Capability Gaps</h4>
              {inspectStudent.gaps && inspectStudent.gaps.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {inspectStudent.gaps.map((g) => (
                    <div key={g.skill} className="rounded-lg border border-slate-200 p-3 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900">{g.skill}</span>
                        <span className="block text-[11px] text-slate-500">
                          Current: {g.current}% / Target: {g.target}% • Assigned: {g.training}
                        </span>
                      </div>
                      <span className="rounded-sm bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                        Impact: {g.impact}/100
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  No critical gaps identified. Student satisfies core role requirement thresholds.
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setInspectStudent(null)}
                className="w-full rounded-lg bg-slate-900 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
