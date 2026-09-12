import React from 'react';
import { BriefcaseBusiness, Users, CheckCircle2, ShieldCheck, ArrowRight, Building2 } from 'lucide-react';
import { jobRolesList } from '../../data/platformData';

interface EmployerOverviewProps {
  onNavigate: (page: string) => void;
}

export const EmployerOverview: React.FC<EmployerOverviewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <Building2 className="size-3.5" />
            <span>Employer Talent Sourcing & Placement</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Employer Talent Intelligence
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Source verified candidates matched objectively against your exact competency and system specifications.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('candidates')}
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 shadow-xs transition"
        >
          <span>Browse Candidate Pool</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      {/* 4 Employer KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Qualified Pipeline</span>
          <p className="mt-2 text-3xl font-bold text-slate-900">124</p>
          <div className="mt-1 text-xs text-slate-500">&gt;75% match threshold</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Average Candidate Match</span>
          <p className="mt-2 text-3xl font-bold text-indigo-600">76%</p>
          <div className="mt-1 text-xs text-emerald-600 font-semibold">+8% after training cycle</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Evidence Verification Rate</span>
          <p className="mt-2 text-3xl font-bold text-emerald-600">91%</p>
          <div className="mt-1 text-xs text-slate-500">Supported by code artifacts</div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Active Position Profiles</span>
          <p className="mt-2 text-3xl font-bold text-slate-900">{jobRolesList.length}</p>
          <div className="mt-1 text-xs text-slate-500">Across cloud, AI, data, SWE</div>
        </div>
      </div>

      {/* Requisitions List */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Active Talent Requisitions</h2>
            <p className="text-xs text-slate-500">
              Profiles actively consuming institutional graduate pipelines.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('roles')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Configure Job Requirements →
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {jobRolesList.map((role) => (
            <div
              key={role.id}
              className="rounded-xl border border-slate-200 p-4 space-y-3 hover:border-indigo-300 transition"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-indigo-600">{role.industry}</span>
                <span className="text-slate-500">{role.location}</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{role.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Required Education: {role.education}</p>
              </div>

              <div className="text-xs space-y-1">
                <span className="text-slate-700 font-medium">Core Required:</span>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {role.requirements.map((r) => (
                    <span
                      key={r.skill}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                    >
                      {r.skill} ({r.importance})
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold">18 Matched Candidates</span>
                <button
                  type="button"
                  onClick={() => onNavigate('candidates')}
                  className="text-xs font-bold text-slate-900 hover:text-indigo-600"
                >
                  View Candidates →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
