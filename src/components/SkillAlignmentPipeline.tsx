import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  BookOpen,
  UserCheck,
  FileText,
  Briefcase,
  Compass,
  TrendingUp,
  Code2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Info,
} from 'lucide-react';

interface PipelineNode {
  id: string;
  label: string;
  subLabel: string;
  icon: React.ElementType;
  status: 'completed' | 'active' | 'upcoming';
  description: string;
  metric: string;
  targetPage?: string;
}

interface SkillAlignmentPipelineProps {
  currentStageId?: string;
  onNavigateNode?: (targetPage: string) => void;
  compact?: boolean;
}

export const SkillAlignmentPipeline: React.FC<SkillAlignmentPipelineProps> = ({
  currentStageId = 'skill-gap',
  onNavigateNode,
  compact = false,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(currentStageId);

  const pipelineNodes: PipelineNode[] = [
    {
      id: 'academia',
      label: 'Academia',
      subLabel: 'Institutional Framework',
      icon: GraduationCap,
      status: 'completed',
      description: 'Accredited university programs, academic semesters, and foundational coursework.',
      metric: 'B.Tech CSE (Year 4)',
      targetPage: 'profile',
    },
    {
      id: 'curriculum',
      label: 'Curriculum',
      subLabel: 'Academic Syllabus',
      icon: BookOpen,
      status: 'completed',
      description: 'Formal course catalog covering DBMS, DSA, Networks, and Operating Systems.',
      metric: '32 Credits Mapped',
      targetPage: 'analysis',
    },
    {
      id: 'student-skills',
      label: 'Student Skills',
      subLabel: 'Candidate Baseline',
      icon: UserCheck,
      status: 'completed',
      description: 'Skills declared, evaluated, and demonstrated across academic projects and repos.',
      metric: '12 Skills Profiled',
      targetPage: 'profile',
    },
    {
      id: 'resume-assessment',
      label: 'Resume / Test',
      subLabel: 'Verified Signals',
      icon: FileText,
      status: 'completed',
      description: 'AI resume extraction + proctored coding assessments quantifying real competency.',
      metric: '82% Diagnostic Score',
      targetPage: 'resume-ai',
    },
    {
      id: 'industry-demand',
      label: 'Industry Demand',
      subLabel: 'Live Market Signals',
      icon: Briefcase,
      status: 'completed',
      description: 'Aggregated real-time skill demand across thousands of active tech job postings.',
      metric: '38,000+ Postings Analyzed',
      targetPage: 'future-skills',
    },
    {
      id: 'skill-gap',
      label: 'Skill Gap',
      subLabel: 'Delta Intelligence',
      icon: Compass,
      status: 'active',
      description: 'Precise disparity between current candidate competencies and target role criteria.',
      metric: '2 Critical Gaps',
      targetPage: 'hub',
    },
    {
      id: 'learning-path',
      label: 'Learning Path',
      subLabel: 'Micro-Interventions',
      icon: TrendingUp,
      status: 'upcoming',
      description: 'Targeted high-yield learning modules, official docs, and practice sandboxes.',
      metric: '3 Milestones Queued',
      targetPage: 'learning',
    },
    {
      id: 'project-artifact',
      label: 'Project Proof',
      subLabel: 'Commercial Artifact',
      icon: Code2,
      status: 'upcoming',
      description: 'Production-grade project addressing specific gap (e.g. FastAPI + Docker microservice).',
      metric: '1 Planned Project',
      targetPage: 'projects',
    },
    {
      id: 'verification',
      label: 'Verification',
      subLabel: 'SkillAlign Evidence',
      icon: ShieldCheck,
      status: 'upcoming',
      description: 'Multi-evidence docket with code audit, benchmark tests, and verified credential badge.',
      metric: '3 Badges Pending',
      targetPage: 'verification',
    },
    {
      id: 'readiness',
      label: 'Placement',
      subLabel: 'Career Alignment',
      icon: CheckCircle2,
      status: 'upcoming',
      description: 'Direct candidate introduction to verified employer partners with guaranteed role match.',
      metric: 'Top 10% Cohort Readiness',
      targetPage: 'jobs',
    },
  ];

  const selectedNode = pipelineNodes.find((n) => n.id === selectedNodeId) || pipelineNodes[5];

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700 border border-sky-200">
              <span className="size-1.5 rounded-full bg-sky-500 animate-ping" />
              Continuous Intelligence Engine
            </span>
            <span className="text-xs text-stone-400 font-mono">v3.2</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            The Skill Alignment Engine
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time pipeline translating academic fundamentals and student capability into industry-verified workforce readiness.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-emerald-500" /> Completed
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-sky-500" /> Active Stage
          </span>
          <span className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-stone-300" /> Next Sequence
          </span>
        </div>
      </div>

      {/* Horizontal Pipeline Visualization */}
      <div className="relative mt-5 overflow-x-auto pb-4 pt-2">
        {/* Background Connecting Rail */}
        <div className="absolute left-6 right-6 top-8 h-1 -translate-y-1/2 bg-stone-200 rounded-full hidden sm:block">
          {/* Active Flow Line */}
          <div
            className="h-full bg-linear-to-r from-emerald-500 via-sky-500 to-stone-200 rounded-full transition-all duration-700"
            style={{ width: '58%' }}
          />
        </div>

        {/* Node Grid */}
        <div className="flex min-w-[760px] items-start justify-between gap-2 px-2 relative z-10">
          {pipelineNodes.map((node, index) => {
            const Icon = node.icon;
            const isSelected = node.id === selectedNodeId;
            const isCompleted = node.status === 'completed';
            const isActive = node.status === 'active';

            return (
              <motion.button
                key={node.id}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedNodeId(node.id)}
                className={`group flex flex-col items-center text-center cursor-pointer transition-all ${
                  isSelected ? 'scale-105' : 'opacity-85 hover:opacity-100'
                }`}
              >
                {/* Node Circle */}
                <div
                  className={`relative flex size-12 items-center justify-center rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 ring-4 ring-sky-100 glow-active-node'
                      : isCompleted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-500 border border-stone-200'
                  } ${isSelected ? 'ring-2 ring-slate-900' : ''}`}
                >
                  <Icon className="size-5" />
                  {/* Step sequence badge */}
                  <span
                    className={`absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full text-[9px] font-bold ${
                      isCompleted
                        ? 'bg-emerald-700 text-white'
                        : isActive
                        ? 'bg-sky-800 text-white'
                        : 'bg-stone-300 text-stone-700'
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>

                {/* Node Title & Metric */}
                <span className="mt-2 text-xs font-bold text-slate-800 tracking-tight whitespace-nowrap">
                  {node.label}
                </span>
                <span className="text-[10px] text-stone-500 leading-tight max-w-[80px] truncate">
                  {node.subLabel}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Drawer for Selected Node */}
      {!compact && (
        <div className="mt-3 rounded-xl border border-sky-100 bg-[#FAF8F5] p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-sky-100 p-2.5 text-sky-700 mt-0.5">
              <Info className="size-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">
                  Node Stage: {selectedNode.label} ({selectedNode.subLabel})
                </h4>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                    selectedNode.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedNode.status === 'active'
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {selectedNode.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed">
                {selectedNode.description}
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs font-semibold text-slate-700">
                <span>Signal: <span className="font-mono text-sky-700">{selectedNode.metric}</span></span>
              </div>
            </div>
          </div>

          {selectedNode.targetPage && onNavigateNode && (
            <button
              type="button"
              onClick={() => onNavigateNode(selectedNode.targetPage!)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
            >
              <span>Explore {selectedNode.label}</span>
              <ArrowRight className="size-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
