import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  Code2,
  FolderGit2,
  CheckCircle2,
  Terminal,
  Compass,
  ArrowRight,
  TrendingUp,
  X,
  FileCheck2,
  Cpu,
} from 'lucide-react';

interface StudentSkillGraphProps {
  studentName: string;
  targetRole: string;
}

interface SkillNode {
  id: string;
  name: string;
  type: 'skill' | 'project' | 'assessment' | 'evidence' | 'role' | 'demand';
  category: string;
  status: 'VERIFIED' | 'PARTIALLY VERIFIED' | 'NEEDS EVIDENCE';
  score?: number;
  evidenceText: string;
  connectedProjects: string[];
  connectedAssessments: string[];
  roleRelevance: string;
  industryGrowth: string;
}

export const graphSkills: SkillNode[] = [
  {
    id: 'python',
    name: 'Python',
    type: 'skill',
    category: 'Programming',
    status: 'VERIFIED',
    score: 86,
    evidenceText: '3 project repositories, 10-problem diagnostic test passed (86%), coursework certified.',
    connectedProjects: ['Customer Churn Prediction Engine', 'Real-time Model Inference Service'],
    connectedAssessments: ['Skill Token Frequency Counter', 'Top K In-Demand Skills Heap'],
    roleRelevance: 'Core prerequisite for Data Scientist, ML Engineer & Python Developer (100% weight)',
    industryGrowth: '+28% Annual Industry Demand Growth',
  },
  {
    id: 'sql',
    name: 'SQL & Relational DB',
    type: 'skill',
    category: 'Databases',
    status: 'VERIFIED',
    score: 90,
    evidenceText: '3NF PostgreSQL schema design repository, diagnostic query joins benchmark passed (90%).',
    connectedProjects: ['Distributed E-Commerce Database Schema'],
    connectedAssessments: ['Candidate Aggregation Query Benchmark'],
    roleRelevance: 'Critical foundation for Data Analyst, Data Scientist & Data Engineer (95% weight)',
    industryGrowth: '+22% Annual Industry Demand Growth',
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    type: 'skill',
    category: 'AI / Data',
    status: 'PARTIALLY VERIFIED',
    score: 68,
    evidenceText: 'Scikit-learn model repository with cross-validation; partial execution in normalization test.',
    connectedProjects: ['Customer Churn Prediction Engine'],
    connectedAssessments: ['Normalized Feature Scaler'],
    roleRelevance: 'Primary differentiator for ML Engineer & Data Scientist (90% weight)',
    industryGrowth: '+42% High-Growth Emerging Trend',
  },
  {
    id: 'docker',
    name: 'Docker & Containers',
    type: 'skill',
    category: 'Cloud / DevOps',
    status: 'NEEDS EVIDENCE',
    score: 0,
    evidenceText: 'Claimed on resume header without containerization files, Dockerfile, or deployment trace.',
    connectedProjects: ['No active container repository'],
    connectedAssessments: ['Pending Containerization Mission'],
    roleRelevance: 'Top critical gap across 84% of Cloud & Production ML roles (80% weight)',
    industryGrowth: '+36% Rapid Adoption in Modern Tech Stacks',
  },
  {
    id: 'fastapi',
    name: 'FastAPI & REST APIs',
    type: 'skill',
    category: 'Backend Frameworks',
    status: 'PARTIALLY VERIFIED',
    score: 65,
    evidenceText: 'REST microservice endpoints created for model inference, awaiting live performance test.',
    connectedProjects: ['Real-time Model Inference Service'],
    connectedAssessments: ['Endpoint Contract Testing'],
    roleRelevance: 'Crucial for ML Deployment & Full Stack Python roles (75% weight)',
    industryGrowth: '+31% Fast-growing Python backend framework',
  },
  {
    id: 'algorithms',
    name: 'Algorithms & Complexity',
    type: 'skill',
    category: 'Core Computer Science',
    status: 'PARTIALLY VERIFIED',
    score: 72,
    evidenceText: 'Coursework transcript grade A; 3 of 5 test vectors passed on Heap/Sorting diagnostic.',
    connectedProjects: ['Algorithm Repository Exercises'],
    connectedAssessments: ['Top K Skills Priority Queue'],
    roleRelevance: 'Baseline for all Software Engineer & Systems Architect interviews (100% weight)',
    industryGrowth: 'Foundational Evergreen Competency',
  },
];

export const StudentSkillGraph: React.FC<StudentSkillGraphProps> = ({
  studentName,
  targetRole,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(graphSkills[0]);

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800 mb-1">
            <Layers className="size-3.5 text-sky-600" />
            <span>Interactive Multi-Layer Skill Knowledge Graph</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">
            STUDENT SKILL GRAPH
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Hierarchical alignment loop: Student → Skills → Projects → Assessments → Evidence → Roles → Industry Demand.
          </p>
        </div>

        <span className="rounded-xl border border-stone-200 bg-[#FAF8F5] px-3.5 py-1.5 text-xs font-mono font-bold text-slate-800 self-start sm:self-center">
          Click any skill to inspect verified evidence
        </span>
      </div>

      {/* Graph Visual Pipeline Stream */}
      <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 text-center overflow-x-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-stone-600 min-w-max">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-white shadow-2xs">
            Student: {studentName}
          </span>
          <span className="text-sky-600">→</span>
          <span className="px-3 py-1.5 rounded-xl bg-sky-100 text-sky-900 border border-sky-300">
            Claimed Skills
          </span>
          <span className="text-sky-600">→</span>
          <span className="px-3 py-1.5 rounded-xl bg-purple-100 text-purple-900 border border-purple-300">
            Projects
          </span>
          <span className="text-sky-600">→</span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300">
            10-Problem Code Test
          </span>
          <span className="text-sky-600">→</span>
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
            Evidence Docket
          </span>
          <span className="text-sky-600">→</span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-sky-300">
            Role: {targetRole}
          </span>
          <span className="text-sky-600">→</span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-mono">
            Industry Demand
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Nodes on Left, Evidence Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Skill Nodes (2 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
            Select Node to Inspect Evidence & Industry Flow:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {graphSkills.map((node) => {
              const isSelected = selectedSkill.id === node.id;
              const isVerified = node.status === 'VERIFIED';
              const isPartial = node.status === 'PARTIALLY VERIFIED';

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedSkill(node)}
                  className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'border-slate-900 bg-white ring-2 ring-slate-900/10 shadow-sm'
                      : 'border-stone-200 bg-[#FAF8F5] hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-black text-slate-900">{node.name}</h3>
                      <span className="text-[10px] font-mono text-stone-500">{node.category}</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                        isVerified
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : isPartial
                          ? 'bg-sky-50 text-sky-800 border-sky-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      {node.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-stone-200/60">
                    <span className="text-stone-500">Diagnostic Score:</span>
                    <span className="font-bold text-slate-900">
                      {node.score !== undefined && node.score > 0 ? `${node.score}%` : 'Pending'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Evidence Inspector Drawer / Card (1 Col) */}
        <div className="rounded-2xl border-2 border-slate-900 bg-white p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold text-sky-700 uppercase tracking-wider block">
                Evidence Inspector
              </span>
              <h3 className="text-base font-black text-slate-900 mt-0.5">
                {selectedSkill.name}
              </h3>
            </div>
            <span className="rounded-lg bg-stone-100 px-2 py-0.5 text-[10px] font-mono font-bold text-stone-700">
              {selectedSkill.category}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="rounded-xl bg-[#FAF8F5] border border-stone-200 p-3 space-y-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Audit Trail & Evidence
              </span>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {selectedSkill.evidenceText}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAF8F5] border border-stone-200 p-3 space-y-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Connected Repositories
              </span>
              <ul className="space-y-1">
                {selectedSkill.connectedProjects.map((p) => (
                  <li key={p} className="flex items-center gap-1.5 text-[11px] text-slate-800">
                    <FolderGit2 className="size-3 text-purple-600 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-[#FAF8F5] border border-stone-200 p-3 space-y-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                Target Role Relevance
              </span>
              <p className="text-[11px] text-slate-700 leading-snug">
                {selectedSkill.roleRelevance}
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-3 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                Industry Demand Signal
              </span>
              <p className="text-[11px] font-bold text-emerald-900">
                {selectedSkill.industryGrowth}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
