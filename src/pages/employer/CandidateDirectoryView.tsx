import React, { useState } from 'react';
import {
  Users,
  Search,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  X,
  Mail,
  Github,
  Award,
  Sparkles,
  Code2,
  Filter,
} from 'lucide-react';
import { studentCohortList, jobRolesList } from '../../data/platformData';
import { StudentCohortMember } from '../../types';

interface CandidateDirectoryViewProps {
  reassessmentCompleted?: boolean;
}

export const CandidateDirectoryView: React.FC<CandidateDirectoryViewProps> = ({
  reassessmentCompleted = false,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [minMatchFilter, setMinMatchFilter] = useState<number>(60);
  const [inspectCandidate, setInspectCandidate] = useState<StudentCohortMember | null>(null);
  const [invitedMap, setInvitedMap] = useState<Record<number, boolean>>({});

  // Augment Aarav's score if reassessmentCompleted
  const candidatePool: StudentCohortMember[] = studentCohortList.map((s) => {
    if (s.name.includes('Aarav') && reassessmentCompleted) {
      return {
        ...s,
        alignment: 88,
        readiness: 90,
        employability: 92,
      };
    }
    return s;
  });

  const filtered = candidatePool.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.career.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.skills && c.skills.some((sk) => sk.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (c.gaps && c.gaps.some((g) => g.skill.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchRole = roleFilter === 'All' || c.career === roleFilter;
    const matchScore = c.alignment >= minMatchFilter;
    return matchSearch && matchRole && matchScore;
  });

  const handleInvite = (id: number) => {
    setInvitedMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                Direct Candidate Sourcing
              </span>
              <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-600">
                Zero-Ghosting Network
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Verified Candidate Talent Pool
            </h1>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
              Recruit engineering graduates based on audited code artifacts, proctored test percentiles, and verified skill dockets — never resume keyword claims.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search verified skills (e.g. Docker, Python)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-xl border border-stone-200 pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-stone-400 focus:outline-none focus:border-sky-500 bg-[#FAF8F5] min-w-[220px]"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Role Tracks</option>
              {jobRolesList.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>

            <select
              value={minMatchFilter}
              onChange={(e) => setMinMatchFilter(Number(e.target.value))}
              className="rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value={50}>Min 50% Match</option>
              <option value={70}>Min 70% Match</option>
              <option value={80}>Min 80% Match</option>
            </select>
          </div>
        </div>

        {/* Employer Zero Ghosting Policy Banner */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#FAF8F5] p-3.5 border border-stone-200 text-xs">
          <div className="flex items-center gap-2 text-slate-800 font-medium">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span>
              <strong>100% Zero-Ghosting Commitment:</strong> All candidate invitations guarantee an automated or human interview feedback response within 7 business days.
            </span>
          </div>
          <span className="font-mono text-stone-500 text-[11px]">{filtered.length} Verified Candidates</span>
        </div>
      </div>

      {/* Candidate Table */}
      <div className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-stone-200 bg-[#FAF8F5] text-stone-600">
              <tr>
                <th className="p-3.5 font-semibold">Candidate Name</th>
                <th className="p-3.5 font-semibold">Institution & Degree</th>
                <th className="p-3.5 font-semibold">Target Career Track</th>
                <th className="p-3.5 font-semibold">Requirement Match</th>
                <th className="p-3.5 font-semibold">Verified Proof</th>
                <th className="p-3.5 font-semibold text-right">Interview Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((c) => {
                const isInvited = invitedMap[c.id];
                return (
                  <tr key={c.id} className="hover:bg-stone-50 transition">
                    <td className="p-3.5 font-bold text-slate-900">
                      {c.name}
                      <span className="block text-[10px] text-stone-500 font-normal">Class of {c.batch}</span>
                    </td>
                    <td className="p-3.5 text-stone-600">{c.department}</td>
                    <td className="p-3.5 font-semibold text-sky-800">{c.career}</td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900">{c.alignment}%</span>
                        <div className="w-14 h-1.5 rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              c.alignment >= 75 ? 'bg-emerald-600' : 'bg-sky-600'
                            }`}
                            style={{ width: `${c.alignment}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold">
                        <ShieldCheck className="size-3 text-emerald-600" />
                        <span>Audit Docket Verified</span>
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => setInspectCandidate(c)}
                        className="rounded-lg border border-stone-300 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-stone-50 cursor-pointer"
                      >
                        Inspect Docket
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInvite(c.id)}
                        disabled={isInvited}
                        className={`rounded-lg px-3 py-1 text-xs font-bold text-white transition cursor-pointer ${
                          isInvited ? 'bg-emerald-600' : 'bg-slate-900 hover:bg-slate-800'
                        }`}
                      >
                        {isInvited ? 'Invited ✓' : 'Invite'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Inspector Modal */}
      {inspectCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-xl rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                  Candidate Verification Docket
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{inspectCandidate.name}</h3>
                <p className="text-xs text-stone-500">
                  {inspectCandidate.department} • Target Role: {inspectCandidate.career}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInspectCandidate(null)}
                className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-3.5 space-y-1">
                <span className="text-stone-500">Role Requirement Match</span>
                <p className="text-2xl font-bold text-slate-900">{inspectCandidate.alignment}%</p>
                <p className="text-[11px] text-emerald-700 font-semibold">Exceeds 70% company hiring bar</p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-3.5 space-y-1">
                <span className="text-stone-500">Evidence Integrity Score</span>
                <p className="text-2xl font-bold text-emerald-700">94%</p>
                <p className="text-[11px] text-stone-500">Triangulated code + academic signals</p>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 p-4 text-xs space-y-2.5">
              <span className="font-bold text-slate-900 block">Verified Artifact Proofs</span>
              <div className="flex items-center gap-2 text-stone-700">
                <Github className="size-4 text-slate-900" />
                <span>8 Public Repositories (Python, FastAPI, Docker containers)</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <Award className="size-4 text-amber-600" />
                <span>Proctored Diagnostic Assessment: 92% (Top 8th Percentile)</span>
              </div>
              <div className="flex items-center gap-2 text-stone-700">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>Coursework Certified by Academic Department</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setInspectCandidate(null)}
                className="flex-1 rounded-xl border border-stone-200 bg-white py-2 text-xs font-bold text-stone-700 hover:bg-stone-50"
              >
                Close Docket
              </button>
              <button
                type="button"
                onClick={() => {
                  handleInvite(inspectCandidate.id);
                  setInspectCandidate(null);
                }}
                className="flex-1 rounded-xl bg-slate-900 py-2 text-xs font-bold text-white hover:bg-slate-800 shadow-xs transition"
              >
                Send Direct Interview Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
