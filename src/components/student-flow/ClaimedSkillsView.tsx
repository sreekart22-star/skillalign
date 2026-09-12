import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Layers,
  Award,
  Code2,
  Database,
  Cloud,
  Cpu,
  FolderGit2,
  Trophy,
} from 'lucide-react';
import { LearnerProfile } from '../../types';

interface ClaimedSkillsViewProps {
  profile: LearnerProfile;
  onStartVerification: () => void;
}

export interface ExtractedSkillItem {
  skill: string;
  source: string;
  evidenceStrength: string;
  confidence: 'High' | 'Moderate' | 'Needs Evidence' | 'Unverified';
  category: 'Programming Languages' | 'Frameworks' | 'Databases' | 'Cloud' | 'AI/ML' | 'Core CS';
  status: 'VERIFIED' | 'PARTIALLY VERIFIED' | 'NEEDS EVIDENCE' | 'UNVERIFIED';
  details: string;
}

export const comprehensiveExtractedSkills: ExtractedSkillItem[] = [
  {
    skill: 'Python',
    source: 'Resume',
    evidenceStrength: '3 projects, 4 repositories',
    confidence: 'High',
    category: 'Programming Languages',
    status: 'PARTIALLY VERIFIED',
    details: 'Extensive codebase evidence detected in customer churn and algorithmic repos.',
  },
  {
    skill: 'SQL',
    source: 'Resume',
    evidenceStrength: '2 projects, coursework',
    confidence: 'High',
    category: 'Databases',
    status: 'PARTIALLY VERIFIED',
    details: 'Complex relational schemas and PostgreSQL query joins identified in e-commerce project.',
  },
  {
    skill: 'Machine Learning',
    source: 'Resume',
    evidenceStrength: '1 capstone project',
    confidence: 'Moderate',
    category: 'AI/ML',
    status: 'PARTIALLY VERIFIED',
    details: 'Predictive modeling with Scikit-learn; pending production serving and MLOps evidence.',
  },
  {
    skill: 'FastAPI',
    source: 'Resume',
    evidenceStrength: '1 project',
    confidence: 'Moderate',
    category: 'Frameworks',
    status: 'PARTIALLY VERIFIED',
    details: 'REST API endpoints created for model inference, needs live benchmark testing.',
  },
  {
    skill: 'Docker',
    source: 'Resume',
    evidenceStrength: 'None',
    confidence: 'Needs Evidence',
    category: 'Cloud',
    status: 'NEEDS EVIDENCE',
    details: 'Claimed as a bullet skill, but no containerization configs or Dockerfile traces found.',
  },
  {
    skill: 'Cloud Computing (AWS/GCP)',
    source: 'Resume',
    evidenceStrength: 'None',
    confidence: 'Needs Evidence',
    category: 'Cloud',
    status: 'NEEDS EVIDENCE',
    details: 'Mentioned under tools; requires cloud architectural artifact or deployment proof.',
  },
  {
    skill: 'PyTorch / Deep Learning',
    source: 'Resume',
    evidenceStrength: 'Coursework only',
    confidence: 'Needs Evidence',
    category: 'AI/ML',
    status: 'NEEDS EVIDENCE',
    details: 'Mentioned in neural networks lab; lack of standalone deep learning project repository.',
  },
  {
    skill: 'Data Structures & Algorithms',
    source: 'Transcript & Resume',
    evidenceStrength: 'Academic Coursework (Grade: A)',
    confidence: 'High',
    category: 'Core CS',
    status: 'PARTIALLY VERIFIED',
    details: 'Demonstrated theoretical proficiency; scheduled for diagnostic coding benchmark.',
  },
];

export const ClaimedSkillsView: React.FC<ClaimedSkillsViewProps> = ({
  profile,
  onStartVerification,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'skills' | 'projects' | 'education' | 'experience'>('all');

  const getStatusBadge = (status: ExtractedSkillItem['status']) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'PARTIALLY VERIFIED':
        return 'bg-sky-50 text-sky-800 border-sky-300';
      case 'NEEDS EVIDENCE':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'UNVERIFIED':
        return 'bg-stone-100 text-stone-700 border-stone-300';
    }
  };

  const categories = [
    'Programming Languages',
    'Frameworks',
    'Databases',
    'Cloud',
    'AI/ML',
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800 mb-2">
            <Sparkles className="size-3.5" />
            <span>AI Resume Intelligence Dossier</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Extracted Skill & Evidence Analysis
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Synthesized from your uploaded resume. Every skill has been mapped to contextual evidence, confidence ratings, and initial status badges.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartVerification}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-xs font-bold text-white hover:bg-slate-800 shadow-sm transition cursor-pointer shrink-0 uppercase tracking-wider"
        >
          <span>Start Technical Assessment</span>
          <ArrowRight className="size-4 text-sky-400" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
        {[
          { id: 'all', label: 'Complete Dossier' },
          { id: 'skills', label: 'Technical Skills Matrix' },
          { id: 'projects', label: 'Extracted Projects' },
          { id: 'education', label: 'Education & Academics' },
          { id: 'experience', label: 'Experience & Achievements' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Education & Core Profile Card */}
      {(activeTab === 'all' || activeTab === 'education') && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <GraduationCap className="size-4 text-sky-600" />
              <span>EDUCATION & ACADEMIC CREDENTIALS</span>
            </h2>
            <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-mono text-stone-600 font-bold">
              Parsed from Document
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Candidate</span>
              <p className="text-xs font-bold text-slate-900 mt-0.5">{profile.name}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Degree & Major</span>
              <p className="text-xs font-bold text-slate-900 mt-0.5">{profile.branch || 'B.Tech in Computer Science & Engineering'}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Institution</span>
              <p className="text-xs font-bold text-slate-900 mt-0.5">{profile.college || 'National Institute of Technology'}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/60">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Graduation & CGPA</span>
              <p className="text-xs font-bold text-slate-900 mt-0.5">{profile.graduation || '2025'} • 8.64 / 10.0</p>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 text-xs space-y-1.5">
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
              Audited Coursework
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Data Structures & Algorithms', 'Database Systems', 'Operating Systems', 'Machine Learning', 'Linear Algebra', 'Computer Networks'].map((course) => (
                <span key={course} className="rounded-lg bg-white border border-stone-200 px-2.5 py-1 text-[11px] font-medium text-stone-700">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Technical Skills Categorized Matrix */}
      {(activeTab === 'all' || activeTab === 'skills') && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Code2 className="size-4 text-sky-600" />
                <span>TECHNICAL SKILLS MATRIX (BY CATEGORY)</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Each skill is classified with Source, Evidence Strength, and Verification Status.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">VERIFIED</span>
              <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200 font-bold">PARTIALLY VERIFIED</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-bold">NEEDS EVIDENCE</span>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {comprehensiveExtractedSkills.map((item) => (
              <div
                key={item.skill}
                className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 flex flex-col justify-between gap-3 hover:border-stone-300 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{item.skill}</h3>
                      <span className="text-[10px] font-mono text-stone-500 bg-white border border-stone-200 px-1.5 py-0.5 rounded">
                        Source: {item.source}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-stone-500 block mt-0.5">
                      {item.category}
                    </span>
                  </div>

                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold border ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <div className="text-xs text-stone-600 bg-white p-3 rounded-xl border border-stone-200/70 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-800">Evidence Strength:</span>
                    <span className="font-mono text-stone-600">{item.evidenceStrength}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed pt-1 border-t border-stone-100">
                    {item.details}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 pt-1">
                  <span>Confidence: <strong className="text-slate-900">{item.confidence}</strong></span>
                  <span className="text-sky-700 font-semibold">Diagnostic Test Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {(activeTab === 'all' || activeTab === 'projects') && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <FolderGit2 className="size-4 text-purple-600" />
              <span>DETECTED TECHNICAL PROJECTS (EVIDENCE AUDIT)</span>
            </h2>
            <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-mono text-stone-600 font-bold">
              3 Repositories Parsed
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Customer Churn Prediction Engine</span>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  Evidence: Strong
                </span>
              </div>
              <p className="text-stone-600 text-xs">
                Engineered an end-to-end churn model utilizing Random Forest & XGBoost on 100K telecom customer records. Evaluated cross-validation metrics.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'Matplotlib'].map((t) => (
                  <span key={t} className="rounded-md bg-white border border-stone-200 px-2 py-0.5 text-[10px] font-mono text-stone-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Distributed E-Commerce Database Schema</span>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  Evidence: Strong
                </span>
              </div>
              <p className="text-stone-600 text-xs">
                Designed 3NF normalized PostgreSQL schema with 14 tables, compound indexing, transactional isolation, and materialized analytical reporting views.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {['SQL', 'PostgreSQL', 'Database Design', 'Indexing'].map((t) => (
                  <span key={t} className="rounded-md bg-white border border-stone-200 px-2 py-0.5 text-[10px] font-mono text-stone-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Real-time Model Inference Service</span>
                <span className="text-[10px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                  Evidence: Moderate (Missing Dockerfile)
                </span>
              </div>
              <p className="text-stone-600 text-xs">
                Built lightweight FastAPI endpoints exposing model predictions. Implemented input validation with Pydantic; lacked Docker packaging.
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {['FastAPI', 'Python', 'REST API', 'Pydantic'].map((t) => (
                  <span key={t} className="rounded-md bg-white border border-stone-200 px-2 py-0.5 text-[10px] font-mono text-stone-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience & Certifications */}
      {(activeTab === 'all' || activeTab === 'experience') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Briefcase className="size-4 text-sky-600" />
              <span>Work & Internship Experience</span>
            </h3>
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Data Science Intern</span>
                <span className="text-[10px] font-mono text-stone-500">Summer 2024 (3 mos)</span>
              </div>
              <p className="text-stone-600 text-[11px]">
                Built automated data ingestion pipelines in Python, aggregated weekly operational metrics into SQL dashboards.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Trophy className="size-4 text-amber-600" />
              <span>Certifications & Achievements</span>
            </h3>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[11px] font-medium text-slate-800">
                ✓ DeepLearning.AI Machine Learning Specialization
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-[11px] font-medium text-slate-800">
                ✓ National Finalist: State Inter-College Hackathon 2024
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Launch Callout */}
      <div className="rounded-3xl border-2 border-slate-900 bg-white p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 uppercase tracking-wider">
            <ShieldCheck className="size-4" />
            <span>Next Step: Practical Verification Engine</span>
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Verify Your Claimed Skills in the Code Sandbox
          </h3>
          <p className="text-xs text-stone-600 max-w-xl leading-relaxed">
            Take the diagnostic 10-problem assessment testing Python, SQL, Algorithms, and ML pipelines. Evaluated with 5 test vectors per question (2 sample, 3 hidden).
          </p>
        </div>

        <button
          type="button"
          onClick={onStartVerification}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-4 text-xs font-bold text-white hover:bg-slate-800 shadow-sm transition cursor-pointer shrink-0 uppercase tracking-wider"
        >
          <span>Start 10-Problem Assessment</span>
          <ArrowRight className="size-4 text-sky-400" />
        </button>
      </div>
    </div>
  );
};
