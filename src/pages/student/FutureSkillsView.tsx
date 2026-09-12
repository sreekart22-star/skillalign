import React, { useState, useMemo } from 'react';
import { Sparkles, AlertTriangle, TrendingUp, Search, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FutureSkillRow, LearnerProfile, Role } from '../../types';
import { marketSkillsList, curriculumCoursesList, jobRolesList } from '../../data/platformData';

interface FutureSkillsViewProps {
  audience?: Role;
  learner?: LearnerProfile;
}

const skillCategoryMap: Record<string, string> = {
  'Generative AI': 'AI/ML',
  MLOps: 'AI/ML',
  'Machine Learning': 'AI/ML',
  'Cloud Computing': 'Cloud',
  AWS: 'Cloud',
  Cybersecurity: 'Cybersecurity',
  'Data Engineering': 'Data',
  Docker: 'DevOps',
  Python: 'Programming',
  SQL: 'Databases',
};

export const FutureSkillsView: React.FC<FutureSkillsViewProps> = ({
  audience = 'Student',
  learner,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const taughtSkillSet = useMemo(
    () => new Set(curriculumCoursesList.map((c) => c.skill)),
    []
  );

  const fullRows = useMemo<FutureSkillRow[]>(() => {
    return marketSkillsList.map((item) => {
      const growthNum = Number(item.trend.replace(/[+%]/g, '')) || 0;
      const coverage = taughtSkillSet.has(item.skill) ? 100 : 0;
      const roleCount = jobRolesList.filter(
        (r) => r.requirements.some((req) => req.skill === item.skill) || r.preferred.includes(item.skill)
      ).length;
      const gap = 100 - coverage;
      const status: FutureSkillRow['status'] =
        growthNum >= 25 ? 'EMERGING' : growthNum >= 15 ? 'HIGH-GROWTH' : growthNum >= 0 ? 'STABLE' : 'DECLINING';

      // Transparent Future Priority Formula:
      // Priority = round(demand * 0.55 + min(growth * 2, 30) * 0.25 + gap * 0.20)
      const priority = Math.round(item.demand * 0.55 + Math.min(growthNum * 2, 30) * 0.25 + gap * 0.2);
      const action: FutureSkillRow['action'] =
        gap === 100 && priority >= 70 ? 'ADD' : gap === 100 ? 'UPDATE' : priority >= 70 ? 'RETAIN' : 'MONITOR';

      return {
        skill: item.skill,
        category: skillCategoryMap[item.skill] || 'Other',
        current: item.demand,
        growth: growthNum,
        roles: roleCount,
        coverage,
        gap,
        status,
        priority,
        action,
      };
    }).sort((a, b) => b.priority - a.priority);
  }, [taughtSkillSet]);

  const filteredRows = fullRows.filter((r) => {
    const matchSearch = r.skill.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter === 'All' || r.category === categoryFilter;
    const matchStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const emergingCount = fullRows.filter((r) => r.status === 'EMERGING').length;
  const highGrowthCount = fullRows.filter((r) => r.status === 'HIGH-GROWTH').length;
  const criticalFutureGaps = fullRows.filter((r) => r.action === 'ADD');
  const fastestSkill = [...fullRows].sort((a, b) => b.growth - a.growth)[0];

  const targetRoleSkillRows = useMemo(() => {
    if (!learner) return [];
    const target = jobRolesList.find((r) => r.name === learner.targetRole);
    if (!target) return [];
    return fullRows.filter(
      (r) => target.requirements.some((req) => req.skill === r.skill) || target.preferred.includes(r.skill)
    );
  }, [learner, fullRows]);

  const categories = ['All', ...Array.from(new Set(fullRows.map((r) => r.category)))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <Sparkles className="size-3.5" />
            <span>Directional Workforce Signals</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Future Emerging Skills Intelligence
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Priority index calculated from industry demand velocity, curriculum coverage gap, and target role relevance.
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
          Sample Market Signal 2026
        </span>
      </div>

      {/* 4 KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Emerging Skills</span>
          <p className="mt-2 text-3xl font-bold text-indigo-600">{emergingCount}</p>
          <div className="mt-1 text-xs text-slate-500">Growth rate +25%+</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">High-Growth Skills</span>
          <p className="mt-2 text-3xl font-bold text-blue-600">{highGrowthCount}</p>
          <div className="mt-1 text-xs text-slate-500">Growth rate 15% - 24%</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Critical Curriculum Gaps</span>
          <p className="mt-2 text-3xl font-bold text-rose-500">{criticalFutureGaps.length}</p>
          <div className="mt-1 text-xs text-slate-500">High priority & no coverage</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Fastest Growing Competency</span>
          <p className="mt-2 text-xl font-bold text-slate-900">{fastestSkill?.skill || 'Generative AI'}</p>
          <div className="mt-1 text-xs text-emerald-600 font-semibold">+{fastestSkill?.growth}% observed trend</div>
        </div>
      </div>

      {/* If Student: Role-Specific Priorities */}
      {audience === 'Student' && learner && targetRoleSkillRows.length > 0 && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
            <h2 className="text-sm font-bold text-slate-900">
              Future Priorities for Your Career Goal ({learner.targetRole})
            </h2>
            <span className="text-xs font-semibold text-indigo-700">
              {targetRoleSkillRows.length} mapped future skills
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 pt-1">
            {targetRoleSkillRows.map((r) => (
              <div key={r.skill} className="rounded-lg border border-indigo-200/80 bg-white p-3.5 text-xs space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{r.skill}</span>
                  <span className="rounded-sm bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-800 uppercase">
                    {r.action}
                  </span>
                </div>
                <p className="text-slate-600">
                  Demand: <strong>{r.current}/100</strong> • Velocity:{' '}
                  <strong className="text-emerald-700">+{r.growth}%</strong>
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Priority Index: {r.priority}/100</span>
                  <span className="font-semibold text-indigo-600">{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Demand Bar Chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">Current Industry Demand Signals</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredRows}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="skill" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#1E293B',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="current" name="Observed Demand (0-100)" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Priority Matrix Table with Filters */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Emerging Skills Priority Matrix</h2>
            <p className="text-xs text-slate-500">
              Future Priority = 55% Current Demand + 25% Growth Trend + 20% Curriculum Gap
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search competency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Statuses</option>
              <option value="EMERGING">Emerging (25%+)</option>
              <option value="HIGH-GROWTH">High-Growth (15-24%)</option>
              <option value="STABLE">Stable (0-14%)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/70 text-slate-600">
              <tr>
                <th className="p-3 font-semibold">Skill</th>
                <th className="p-3 font-semibold">Category</th>
                <th className="p-3 font-semibold">Observed Demand</th>
                <th className="p-3 font-semibold">Growth Trend</th>
                <th className="p-3 font-semibold">Role Count</th>
                <th className="p-3 font-semibold">Curriculum Coverage</th>
                <th className="p-3 font-semibold">Future Priority</th>
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((item) => (
                <tr key={item.skill} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-slate-900">
                    {item.skill}
                    <span className="block text-[10px] text-slate-400 font-normal">{item.status}</span>
                  </td>
                  <td className="p-3 text-slate-600">{item.category}</td>
                  <td className="p-3 font-semibold text-slate-800">{item.current} / 100</td>
                  <td className="p-3 text-emerald-600 font-bold">+{item.growth}%</td>
                  <td className="p-3 text-slate-600">{item.roles} roles</td>
                  <td className="p-3 text-slate-600">{item.coverage}%</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{item.priority}</span>
                      <div className="w-12 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-indigo-600" style={{ width: `${item.priority}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                        item.action === 'ADD'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : item.action === 'UPDATE'
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {item.action}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
