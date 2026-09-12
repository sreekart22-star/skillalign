import React from 'react';
import { BarChart3, TrendingUp, Sparkles, PieChart as PieIcon } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { jobRolesList, marketSkillsList } from '../../data/platformData';

export const AdvancedChartsView: React.FC = () => {
  // Chart 1: Alignment status breakdown
  const alignmentBreakdownData = [
    { category: 'Programming', matched: 85, partial: 10, missing: 5 },
    { category: 'AI & ML', matched: 60, partial: 25, missing: 15 },
    { category: 'Databases', matched: 75, partial: 20, missing: 5 },
    { category: 'Cloud Infra', matched: 35, partial: 20, missing: 45 },
    { category: 'DevOps & Tools', matched: 40, partial: 15, missing: 45 },
    { category: 'Cybersecurity', matched: 50, partial: 30, missing: 20 },
  ];

  // Chart 2: Average Cohort Match per Target Role
  const roleMatchDistributionData = [
    { role: 'Software Engineer', avgScore: 82, placementReady: 78 },
    { role: 'Data Analyst', avgScore: 79, placementReady: 74 },
    { role: 'AI Engineer', avgScore: 71, placementReady: 63 },
    { role: 'Cloud Engineer', avgScore: 64, placementReady: 52 },
    { role: 'DevOps Engineer', avgScore: 61, placementReady: 48 },
  ];

  // Chart 3: Top Cohort Skill Gaps (Points deficit from industry baseline)
  const topGapsData = [
    { skill: 'Docker & Containers', deficit: 54 },
    { skill: 'AWS Cloud Services', deficit: 52 },
    { skill: 'MLOps Pipelines', deficit: 46 },
    { skill: 'Distributed System Design', deficit: 38 },
    { skill: 'Automated CI/CD', deficit: 35 },
    { skill: 'Data Visualization', deficit: 22 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <BarChart3 className="size-3.5" />
            <span>Institutional Workforce Analytics</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Advanced Analytics & Insights
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Multi-dimensional data distributions tracking cohort competencies, domain maturity, and deficit trends.
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
          Cohort Statistical Sample N=2,450
        </span>
      </div>

      {/* Grid of 2 Large Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Chart 1: Domain Coverage Breakdown */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Curriculum Domain Coverage Distribution</h2>
            <p className="text-xs text-slate-500">
              Matched (Industry Standard) vs Partial (Theory Only) vs Missing
            </p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alignmentBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="matched" name="Matched %" stackId="a" fill="#10B981" />
                <Bar dataKey="partial" name="Partial %" stackId="a" fill="#6366F1" />
                <Bar dataKey="missing" name="Missing %" stackId="a" fill="#F43F5E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Role Placement Readiness */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Cohort Average Match Score by Target Track</h2>
            <p className="text-xs text-slate-500">
              Average Match Score vs Overall Placement Ready Percentage
            </p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roleMatchDistributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="role" tick={{ fontSize: 10, fill: '#64748B' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="avgScore" name="Avg Match Score" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="placementReady" name="Placement Ready %" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart 3: Top Cohort Deficits */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Highest Cohort Capability Deficits (Points below baseline)</h2>
          <p className="text-xs text-slate-500">
            Calculated across all student assessments and verified evidence submissions.
          </p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topGapsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
              <XAxis type="number" domain={[0, 60]} tick={{ fontSize: 10, fill: '#64748B' }} />
              <YAxis dataKey="skill" type="category" width={170} tick={{ fontSize: 11, fill: '#334155' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#1E293B',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="deficit" name="Deficit Points" fill="#F43F5E" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
