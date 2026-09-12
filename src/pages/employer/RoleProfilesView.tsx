import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { jobRolesList } from '../../data/platformData';
import { JobRole, Requirement, Level } from '../../types';

export const RoleProfilesView: React.FC = () => {
  const [roles, setRoles] = useState<JobRole[]>(jobRolesList);
  const [selectedRoleId, setSelectedRoleId] = useState<string>(jobRolesList[0].id);
  const [newSkillName, setNewSkillName] = useState<string>('');
  const [newSkillLevel, setNewSkillLevel] = useState<Level>('Intermediate');
  const [newSkillImportance, setNewSkillImportance] = useState<'Critical' | 'Important'>('Critical');

  const activeRole = roles.find((r) => r.id === selectedRoleId) || roles[0];

  const handleAddRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newReq: Requirement = {
      skill: newSkillName.trim(),
      level: newSkillLevel,
      importance: newSkillImportance,
      weight: newSkillImportance === 'Critical' ? 1.5 : 1.0,
    };

    setRoles((prev) =>
      prev.map((r) => (r.id === activeRole.id ? { ...r, requirements: [...r.requirements, newReq] } : r))
    );

    setNewSkillName('');
  };

  const handleRemoveRequirement = (skillToRemove: string) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === activeRole.id
          ? { ...r, requirements: r.requirements.filter((req) => req.skill !== skillToRemove) }
          : r
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <Briefcase className="size-3.5" />
            <span>Position Benchmarks & Weighted Scoring</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Employer Role Profiles & Skill Weights
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Define exact technical competencies, weight multipliers, and minimum proficiency levels for candidate scoring.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Role List Selector - 1 Col */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Position Tracks</span>
          <div className="space-y-2">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRoleId(r.id)}
                className={`w-full text-left rounded-xl p-4 text-xs transition border ${
                  selectedRoleId === r.id
                    ? 'border-indigo-600 bg-indigo-50/70 font-bold text-slate-900 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{r.name}</span>
                  <span className="text-[11px] font-semibold text-indigo-600">{r.industry}</span>
                </div>
                <p className="text-slate-500 mt-1">{r.location} • {r.requirements.length} requirements</p>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Role Editor - 2 Cols */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                Active Benchmark Configuration
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">{activeRole.name}</h2>
              <p className="text-xs text-slate-500">
                {activeRole.industry} • Required Degree: {activeRole.education}
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {activeRole.requirements.length} Requirements Mapped
            </span>
          </div>

          {/* Current Requirements List */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">Required Competencies</h3>
            <div className="space-y-2">
              {activeRole.requirements.map((req) => (
                <div
                  key={req.skill}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{req.skill}</span>
                    <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                      Min: {req.level}
                    </span>
                    <span
                      className={`rounded-sm px-2 py-0.5 text-[10px] font-bold ${
                        req.importance === 'Critical'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {req.importance} ({req.weight}x)
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(req.skill)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Remove requirement"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Requirement Form */}
          <form
            onSubmit={handleAddRequirement}
            className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs space-y-3"
          >
            <span className="font-bold text-slate-900 block">Add Required Competency</span>
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                type="text"
                placeholder="Competency name (e.g. Redis, Rust)"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
              />
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <select
                value={newSkillImportance}
                onChange={(e) => setNewSkillImportance(e.target.value as 'Critical' | 'Important')}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden"
              >
                <option value="Critical">Critical (1.5x weight)</option>
                <option value="Important">Important (1.0x weight)</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={!newSkillName.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-40 transition shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Add to Role Benchmark</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
