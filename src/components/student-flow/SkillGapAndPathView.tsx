import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  Briefcase,
  Compass,
  FolderGit2,
  GraduationCap,
  Clock,
  ShieldCheck,
  Building2,
  Terminal,
  Play,
  Check,
  X,
} from 'lucide-react';
import { LearnerProfile, AssessmentEvaluationSummary } from '../../types';
import { WhatIfSimulator } from './WhatIfSimulator';
import { StudentSkillGraph } from './StudentSkillGraph';

interface SkillGapAndPathViewProps {
  profile: LearnerProfile;
  assessmentSummary?: AssessmentEvaluationSummary;
  onOpenDashboard: () => void;
  onSelectProject?: (title: string) => void;
}

interface TargetRoleConfig {
  id: string;
  title: string;
  industry: string;
  baseRoleFit: number;
  skillFit: number;
  assessmentFit: number;
  projectEvidence: string;
  relevance: string;
  matchedSkills: string[];
  skills: Array<{ name: string; status: 'verified' | 'partial' | 'missing'; category: string }>;
  criticalGaps: string[];
  importantGaps: string[];
  optionalGaps: string[];
  recommendedProject: {
    title: string;
    description: string;
    whyThisProject: string;
    skillsDeveloped: string[];
    techStack: string[];
    difficulty: string;
    estimatedEffort: string;
    industryRelevance: string;
    evidenceCreated: string;
  };
}

// Exactly the 8 roles required in Requirement 5:
const eightRolesList: TargetRoleConfig[] = [
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    industry: 'Enterprise AI / Tech',
    baseRoleFit: 84,
    skillFit: 88,
    assessmentFit: 86,
    projectEvidence: '3 Repositories (Customer Churn, Scikit)',
    relevance: 'B.Tech CS (AI/ML) Coursework directly aligned',
    matchedSkills: ['Python', 'SQL', 'Pandas', 'Scikit-learn', 'Statistics'],
    skills: [
      { name: 'Python', status: 'verified', category: 'Core Language' },
      { name: 'SQL', status: 'verified', category: 'Data Querying' },
      { name: 'Pandas & Data Wrangling', status: 'verified', category: 'Data Processing' },
      { name: 'Machine Learning', status: 'partial', category: 'Modeling' },
      { name: 'Statistics & Math', status: 'partial', category: 'Theory' },
      { name: 'Docker Containerization', status: 'missing', category: 'DevOps' },
      { name: 'FastAPI Serving', status: 'missing', category: 'Backend' },
      { name: 'MLOps Pipeline', status: 'missing', category: 'Production' },
    ],
    criticalGaps: ['Docker Containerization', 'FastAPI Model Serving', 'MLOps Pipeline'],
    importantGaps: ['Model Quantization', 'Statistical Hypothesis Testing'],
    optionalGaps: ['Kubernetes Orchestration', 'Apache Spark'],
    recommendedProject: {
      title: 'Production ML Inference API & Automated Pipeline',
      description: 'Containerized FastAPI inference service serving a trained churn prediction model with Docker, structured logging, and unit testing.',
      whyThisProject: 'Docker is a critical gap for your selected role.',
      skillsDeveloped: ['Docker', 'FastAPI', 'REST API', 'ML Deployment'],
      techStack: ['Python 3.11', 'FastAPI', 'Docker', 'Scikit-learn', 'GitHub Actions'],
      difficulty: 'Intermediate–Advanced',
      estimatedEffort: '2.5 Weeks (18–20 hours)',
      industryRelevance: 'Rated 94/100 alignment for junior/associate ML & Data Science openings at top tech employers.',
      evidenceCreated: 'Generates an immutable GitHub repository with automated tests and Docker Hub container image ready for technical recruiter audit.',
    },
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    industry: 'Analytics & Business Intelligence',
    baseRoleFit: 89,
    skillFit: 92,
    assessmentFit: 90,
    projectEvidence: '2 Projects (SQL Schema, Churn Metrics)',
    relevance: 'B.Tech Coursework in DBMS and Statistics',
    matchedSkills: ['SQL', 'Python', 'Pandas', 'Data Cleaning', 'Aggregation'],
    skills: [
      { name: 'SQL & Query Optimization', status: 'verified', category: 'Core' },
      { name: 'Python for Analytics', status: 'verified', category: 'Language' },
      { name: 'Relational Schemas', status: 'verified', category: 'Databases' },
      { name: 'Tableau / PowerBI', status: 'partial', category: 'BI' },
      { name: 'A/B Testing Frameworks', status: 'missing', category: 'Analytics' },
    ],
    criticalGaps: ['Business Intelligence Tool (Tableau/PowerBI)', 'A/B Experimentation Design'],
    importantGaps: ['Window Analytic Functions', 'Executive Dashboarding'],
    optionalGaps: ['dbt Core', 'Snowflake'],
    recommendedProject: {
      title: 'Automated E-Commerce Metrics & BI Reporting Suite',
      description: 'Build interactive dashboards aggregating churn, customer LTV, and retention cohorts with automated daily SQL refresh.',
      whyThisProject: 'Demonstrates enterprise BI dashboarding and cohort analytics.',
      skillsDeveloped: ['SQL Window Functions', 'Tableau / PowerBI', 'Cohort Analysis'],
      techStack: ['PostgreSQL', 'Python', 'PowerBI/Tableau', 'Docker'],
      difficulty: 'Intermediate',
      estimatedEffort: '2 Weeks (14 hours)',
      industryRelevance: 'High demand across e-commerce analytics teams.',
      evidenceCreated: 'Interactive dashboard link and SQL audit scripts.',
    },
  },
  {
    id: 'python-developer',
    title: 'Python Developer',
    industry: 'Software Development',
    baseRoleFit: 86,
    skillFit: 90,
    assessmentFit: 86,
    projectEvidence: '4 Repositories (Algorithm & Backend)',
    relevance: 'Core CSE Programming Track',
    matchedSkills: ['Python', 'Data Structures', 'FastAPI', 'SQL', 'Algorithms'],
    skills: [
      { name: 'Python (OOP & Typing)', status: 'verified', category: 'Language' },
      { name: 'Data Structures & Algorithms', status: 'verified', category: 'Core' },
      { name: 'REST API Design', status: 'partial', category: 'Backend' },
      { name: 'Asynchronous I/O (AsyncIO)', status: 'partial', category: 'Concurrency' },
      { name: 'Docker & Docker Compose', status: 'missing', category: 'DevOps' },
    ],
    criticalGaps: ['Docker Packaging', 'AsyncIO Concurrency', 'PyTest Test Suites'],
    importantGaps: ['Redis Caching', 'SQLAlchemy ORM Tuning'],
    optionalGaps: ['Celery Workers', 'GraphQL'],
    recommendedProject: {
      title: 'High-Throughput Asynchronous Task Dispatcher',
      description: 'Async Python backend microservice using FastAPI, Celery, and Redis for background job execution and telemetry.',
      whyThisProject: 'Demonstrates concurrency and asynchronous Python design.',
      skillsDeveloped: ['Python AsyncIO', 'FastAPI', 'Docker', 'Redis'],
      techStack: ['Python 3.12', 'FastAPI', 'Docker', 'Redis', 'PyTest'],
      difficulty: 'Intermediate',
      estimatedEffort: '2 Weeks (16 hours)',
      industryRelevance: 'Standard architecture in modern Python backend positions.',
      evidenceCreated: 'Clean Git history with 95%+ test coverage docket.',
    },
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    industry: 'Enterprise Software & Systems',
    baseRoleFit: 81,
    skillFit: 84,
    assessmentFit: 82,
    projectEvidence: '3 Repositories (Systems & Web)',
    relevance: 'Accredited B.Tech CS Degree Track',
    matchedSkills: ['Python', 'SQL', 'Algorithms', 'Git', 'Data Structures'],
    skills: [
      { name: 'Algorithms & Problem Solving', status: 'verified', category: 'Core CS' },
      { name: 'Data Structures', status: 'verified', category: 'Core CS' },
      { name: 'Relational Databases', status: 'verified', category: 'Databases' },
      { name: 'System Design & Scalability', status: 'missing', category: 'Architecture' },
      { name: 'CI/CD Automation', status: 'missing', category: 'DevOps' },
    ],
    criticalGaps: ['Distributed Systems Basics', 'CI/CD Pipeline Automation', 'Docker Containers'],
    importantGaps: ['Caching & Microservices', 'Integration Testing'],
    optionalGaps: ['Go / Rust', 'Kubernetes'],
    recommendedProject: {
      title: 'Scalable URL Shortener with Sharding & Redis',
      description: 'Distributed backend service with hashing, database sharding, caching, and rate limiting.',
      whyThisProject: 'Directly mirrors standard engineering interview architectural challenges.',
      skillsDeveloped: ['System Design', 'Caching', 'Docker', 'Unit Testing'],
      techStack: ['Python/Node', 'PostgreSQL', 'Redis', 'Docker Compose'],
      difficulty: 'Intermediate–Advanced',
      estimatedEffort: '2 Weeks (18 hours)',
      industryRelevance: 'Standard evaluation pattern across Tier-1 software companies.',
      evidenceCreated: 'Benchmark performance report and load testing logs.',
    },
  },
  {
    id: 'ml-engineer',
    title: 'ML Engineer',
    industry: 'Artificial Intelligence & Machine Learning',
    baseRoleFit: 78,
    skillFit: 82,
    assessmentFit: 80,
    projectEvidence: '2 Repositories (ML Models)',
    relevance: 'Specialized Machine Learning Coursework',
    matchedSkills: ['Python', 'Scikit-learn', 'Algorithms', 'SQL', 'Pandas'],
    skills: [
      { name: 'Python & Scientific Stack', status: 'verified', category: 'Language' },
      { name: 'Feature Engineering', status: 'verified', category: 'Data' },
      { name: 'ML Algorithms', status: 'partial', category: 'Modeling' },
      { name: 'Model Serving & Docker', status: 'missing', category: 'Production' },
      { name: 'Feature Store & MLOps', status: 'missing', category: 'MLOps' },
    ],
    criticalGaps: ['Model Serving (FastAPI/Triton)', 'Docker Packaging', 'MLflow Tracking'],
    importantGaps: ['Data Drift Detection', 'Quantization'],
    optionalGaps: ['Kubeflow', 'Ray Cluster'],
    recommendedProject: {
      title: 'End-to-End MLOps Pipeline with Drift Detection',
      description: 'Train, track with MLflow, containerize with Docker, and deploy a real-time drift-monitoring API.',
      whyThisProject: 'Bridges theoretical ML into production engineering.',
      skillsDeveloped: ['MLflow', 'Docker', 'FastAPI', 'MLOps'],
      techStack: ['Python', 'Scikit-learn', 'Docker', 'MLflow', 'FastAPI'],
      difficulty: 'Advanced',
      estimatedEffort: '3 Weeks (22 hours)',
      industryRelevance: 'Highly sought skill combination for ML platform roles.',
      evidenceCreated: 'Live MLflow run logs and Docker deployment scripts.',
    },
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    industry: 'Generative AI & Agentic Systems',
    baseRoleFit: 74,
    skillFit: 76,
    assessmentFit: 78,
    projectEvidence: '1 Prototype Repository',
    relevance: 'AI/ML Electives and Neural Networks',
    matchedSkills: ['Python', 'Machine Learning', 'Linear Algebra', 'API Integration'],
    skills: [
      { name: 'Python Core', status: 'verified', category: 'Language' },
      { name: 'Machine Learning Basics', status: 'verified', category: 'Core' },
      { name: 'LLM Prompt Engineering', status: 'partial', category: 'GenAI' },
      { name: 'RAG & Vector Databases', status: 'missing', category: 'GenAI' },
      { name: 'Agentic Workflows (LangChain/LlamaIndex)', status: 'missing', category: 'Agents' },
    ],
    criticalGaps: ['Vector Databases (Qdrant/Pinecone)', 'RAG Architecture', 'Agent Orchestration'],
    importantGaps: ['Evaluation Frameworks (Ragas)', 'Fine-tuning (LoRA)'],
    optionalGaps: ['Multimodal Pipelines', 'vLLM Serving'],
    recommendedProject: {
      title: 'RAG Knowledge Assistant with Hybrid Search & Citations',
      description: 'Build an enterprise document question-answering system using vector embeddings, hybrid BM25 search, and hallucination guardrails.',
      whyThisProject: 'The #1 requested project pattern for modern GenAI roles.',
      skillsDeveloped: ['Vector Databases', 'RAG', 'Python', 'FastAPI'],
      techStack: ['Python 3.11', 'LangChain', 'ChromaDB/Qdrant', 'FastAPI'],
      difficulty: 'Advanced',
      estimatedEffort: '3 Weeks (24 hours)',
      industryRelevance: 'Directly applicable to enterprise AI engineering teams.',
      evidenceCreated: 'Document search benchmark and citation accuracy report.',
    },
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    industry: 'Big Data & Cloud Data Platforms',
    baseRoleFit: 79,
    skillFit: 83,
    assessmentFit: 88,
    projectEvidence: '2 Database Repositories',
    relevance: 'Database Management Systems & SQL Track',
    matchedSkills: ['SQL', 'Python', 'Relational Normalization', 'Data Cleaning'],
    skills: [
      { name: 'Advanced SQL', status: 'verified', category: 'Querying' },
      { name: 'Python Data Pipelines', status: 'verified', category: 'Ingestion' },
      { name: 'Data Modeling (3NF/Star Schema)', status: 'partial', category: 'Warehousing' },
      { name: 'Apache Spark / PySpark', status: 'missing', category: 'Big Data' },
      { name: 'Orchestration (Airflow/Dagster)', status: 'missing', category: 'Orchestration' },
    ],
    criticalGaps: ['Apache Spark / PySpark', 'Airflow Orchestration', 'Cloud Data Warehouse (Snowflake/BigQuery)'],
    importantGaps: ['Data Lake Architecture (Parquet/Delta)', 'dbt Modeling'],
    optionalGaps: ['Kafka Streaming', 'Iceberg'],
    recommendedProject: {
      title: 'Automated ELT Pipeline with dbt, Airflow & DuckDB',
      description: 'Build an idempotent batch data ingestion pipeline orchestrating raw data normalization into analytics star-schemas.',
      whyThisProject: 'Validates modern data engineering stack proficiency.',
      skillsDeveloped: ['Airflow', 'dbt', 'SQL Modeling', 'Docker'],
      techStack: ['Python', 'DuckDB', 'dbt-core', 'Apache Airflow', 'Docker'],
      difficulty: 'Intermediate–Advanced',
      estimatedEffort: '2.5 Weeks (20 hours)',
      industryRelevance: 'Core baseline for junior data platform engineers.',
      evidenceCreated: 'dbt documentation lineage graph and pipeline DAG logs.',
    },
  },
  {
    id: 'cloud-devops',
    title: 'Cloud / DevOps Engineer',
    industry: 'Cloud Infrastructure & SRE',
    baseRoleFit: 68,
    skillFit: 70,
    assessmentFit: 72,
    projectEvidence: '1 Shell Script Repository',
    relevance: 'Operating Systems & Computer Networks',
    matchedSkills: ['Python', 'Linux Basics', 'Git', 'Networking Fundamentals'],
    skills: [
      { name: 'Linux Command Line & Scripting', status: 'verified', category: 'OS' },
      { name: 'Python Automation', status: 'verified', category: 'Scripting' },
      { name: 'Networking (TCP/IP, DNS, HTTP)', status: 'partial', category: 'Networks' },
      { name: 'Docker & Container Security', status: 'missing', category: 'Containers' },
      { name: 'Infrastructure as Code (Terraform)', status: 'missing', category: 'IaC' },
    ],
    criticalGaps: ['Docker & Container Security', 'Terraform (IaC)', 'CI/CD Pipelines (GitHub Actions)'],
    importantGaps: ['Kubernetes Manifests', 'Prometheus Monitoring'],
    optionalGaps: ['Ansible', 'AWS IAM Architecture'],
    recommendedProject: {
      title: 'Automated Multi-Stage CI/CD Pipeline with Terraform & Docker',
      description: 'Deploy a containerized microservice onto cloud infrastructure defined purely in Terraform with automated lint, test, and deploy stages.',
      whyThisProject: 'Demonstrates modern declarative Infrastructure-as-Code and CI/CD.',
      skillsDeveloped: ['Terraform', 'Docker', 'GitHub Actions', 'Cloud Architecture'],
      techStack: ['Terraform', 'Docker', 'AWS/GCP', 'GitHub Actions'],
      difficulty: 'Advanced',
      estimatedEffort: '3 Weeks (24 hours)',
      industryRelevance: 'Required foundation for junior SRE and DevOps openings.',
      evidenceCreated: 'Immutable Terraform plan and green GitHub Actions runs.',
    },
  },
];

// Requirement 6: Employer / Company Profiles
interface EmployerProfile {
  company: string;
  badge: string;
  alignment: number;
  typicalTechStack: string[];
  associatedRole: string;
  notes: string;
}

const employerProfilesList: EmployerProfile[] = [
  {
    company: 'Microsoft',
    badge: 'Enterprise Cloud & AI',
    alignment: 88,
    typicalTechStack: ['Python', 'SQL', 'FastAPI', 'Docker', 'Azure AI'],
    associatedRole: 'Data Scientist / ML Engineer',
    notes: 'Prioritizes clean algorithmic code execution, Python typing, and modular Docker packaging.',
  },
  {
    company: 'Google',
    badge: 'AI Research & Platform',
    alignment: 84,
    typicalTechStack: ['Python', 'C++', 'TensorFlow/JAX', 'Distributed Systems', 'SQL'],
    associatedRole: 'Software Engineer / ML Engineer',
    notes: 'Emphasizes deep algorithm foundations (Heap, DP) and rigorous unit testing pass rates.',
  },
  {
    company: 'Amazon (AWS)',
    badge: 'Cloud & High Scale',
    alignment: 86,
    typicalTechStack: ['Python', 'Java', 'SQL', 'Docker', 'AWS Lambda/ECS'],
    associatedRole: 'Data Engineer / Cloud Systems',
    notes: 'Values system reliability, database normalization, and containerized deployment pipelines.',
  },
  {
    company: 'Snowflake / Databricks',
    badge: 'Modern Data Cloud',
    alignment: 89,
    typicalTechStack: ['SQL', 'Python', 'Apache Spark', 'Delta Lake', 'dbt'],
    associatedRole: 'Data Analyst / Data Engineer',
    notes: 'Focuses heavily on analytical SQL query optimization, star-schema modeling, and data pipelines.',
  },
];

export const SkillGapAndPathView: React.FC<SkillGapAndPathViewProps> = ({
  profile,
  assessmentSummary,
  onOpenDashboard,
}) => {
  const [selectedRoleTitle, setSelectedRoleTitle] = useState<string>('Data Scientist');
  const [activeTab, setActiveTab] = useState<'fit' | 'gaps' | 'mission' | 'simulator' | 'graph' | 'employers'>('fit');
  const [isMissionModalOpen, setIsMissionModalOpen] = useState<boolean>(false);

  // Dynamic adjustment based on real assessmentSummary
  const currentRole = eightRolesList.find((r) => r.title === selectedRoleTitle) || eightRolesList[0];

  // Adjust score dynamically if test was run
  const dynamicRoleFit = assessmentSummary
    ? Math.min(96, Math.round(currentRole.baseRoleFit * 0.5 + (assessmentSummary.overallScore || 80) * 0.5))
    : currentRole.baseRoleFit;

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800 mb-2">
            <Sparkles className="size-3.5" />
            <span>Role Fit & Workforce Intelligence Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Role Fit & Skill Gap Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Benchmarking verified candidate skills against 8 industry role profiles, detecting critical gaps, and calculating precision learning missions.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenDashboard}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-xs font-bold text-white hover:bg-slate-800 shadow-sm transition cursor-pointer self-start sm:self-center shrink-0 uppercase tracking-wider"
        >
          <span>Open Command Center</span>
          <ArrowRight className="size-4 text-sky-400" />
        </button>
      </div>

      {/* Target Role Selector Ribbon (Requirement 5: 8 Standardized Roles) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Target Role Tracks (8 Standard Industry Profiles):
          </span>
          <span className="text-[11px] font-mono text-stone-500">
            Select role to evaluate dynamic fit
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {eightRolesList.map((r) => {
            const isSelected = r.title === selectedRoleTitle;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRoleTitle(r.title)}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-900 bg-white ring-2 ring-slate-900/10 shadow-xs'
                    : 'border-stone-200 bg-[#FAF8F5] hover:border-stone-300'
                }`}
              >
                <div>
                  <span className="text-xs font-black text-slate-900 block truncate">{r.title}</span>
                  <span className="text-[10px] text-stone-500 block truncate">{r.industry}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-stone-500">Fit:</span>
                  <span className={`text-xs font-mono font-black ${isSelected ? 'text-sky-800' : 'text-slate-800'}`}>
                    {r.title === selectedRoleTitle ? dynamicRoleFit : r.baseRoleFit}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
        {[
          { id: 'fit', label: 'Role Fit Analysis' },
          { id: 'gaps', label: 'Critical Skill Gaps' },
          { id: 'mission', label: 'Next Best Action (Mission)' },
          { id: 'simulator', label: 'What-If Career Simulator' },
          { id: 'graph', label: 'Student Skill Graph' },
          { id: 'employers', label: 'Employer / Company Fit' },
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

      {/* Tab 1: Role Fit Engine Card (Requirement 5) */}
      {activeTab === 'fit' && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                DYNAMIC ROLE FIT BENCHMARK
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1 uppercase">
                {currentRole.title}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Calculated against validated candidate competencies and diagnostic assessment scores.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 text-center sm:text-right">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Overall Role Alignment</span>
              <span className="text-3xl font-black text-slate-900 font-mono mt-0.5 block">
                {dynamicRoleFit}%
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold font-mono">
                High Compatibility
              </span>
            </div>
          </div>

          {/* 4 Vector Metrics Breakdown as specified in Requirement 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Skill Fit</span>
              <span className="text-xl font-black text-slate-900 font-mono block">{currentRole.skillFit}%</span>
              <span className="text-[10px] text-stone-500">Normalized prerequisite coverage</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Assessment Fit</span>
              <span className="text-xl font-black text-slate-900 font-mono block">
                {assessmentSummary ? `${assessmentSummary.overallScore}%` : `${currentRole.assessmentFit}%`}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold">10-Problem execution verified</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Project Evidence</span>
              <span className="text-xs font-bold text-slate-900 block mt-1">{currentRole.projectEvidence}</span>
              <span className="text-[10px] text-stone-500">Audited GitHub repositories</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Education Relevance</span>
              <span className="text-xs font-bold text-slate-900 block mt-1">{currentRole.relevance}</span>
              <span className="text-[10px] text-stone-500">Curriculum syllabus mapping</span>
            </div>
          </div>

          {/* Matched Skills vs Gaps Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-2">
              <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                ✓ Matched Skills ({currentRole.matchedSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentRole.matchedSkills.map((sk) => (
                  <span key={sk} className="rounded-lg bg-white border border-emerald-300 px-2.5 py-1 text-xs font-bold text-emerald-800 shadow-2xs">
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 space-y-2">
              <span className="text-[11px] font-bold text-rose-900 uppercase tracking-wider block">
                ✕ Identified Gaps ({currentRole.criticalGaps.length + currentRole.importantGaps.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentRole.criticalGaps.map((gap) => (
                  <span key={gap} className="rounded-lg bg-white border border-rose-300 px-2.5 py-1 text-xs font-bold text-rose-800 shadow-2xs">
                    ✕ {gap} (Critical)
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Critical Skill Gaps */}
      {activeTab === 'gaps' && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Identified Skill Gaps for {currentRole.title}
              </h2>
              <p className="text-xs text-stone-500">
                Segmented by employer hiring rejection priority: Critical, Important, and Optional.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-2xl border border-rose-200 bg-[#FAF8F5] p-4 space-y-2">
              <span className="text-[11px] font-mono font-bold text-rose-800 uppercase tracking-wider block">
                CRITICAL GAPS (BLOCKING HIRING)
              </span>
              <ul className="space-y-2">
                {currentRole.criticalGaps.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-stone-800 font-medium">
                    <span className="size-2 rounded-full bg-rose-500 mt-1 shrink-0" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-[#FAF8F5] p-4 space-y-2">
              <span className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-wider block">
                IMPORTANT GAPS (COMPETITIVE EDGE)
              </span>
              <ul className="space-y-2">
                {currentRole.importantGaps.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-stone-800 font-medium">
                    <span className="size-2 rounded-full bg-amber-500 mt-1 shrink-0" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 space-y-2">
              <span className="text-[11px] font-mono font-bold text-stone-600 uppercase tracking-wider block">
                OPTIONAL GAPS (LONG-TERM CAREER)
              </span>
              <ul className="space-y-2">
                {currentRole.optionalGaps.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-stone-800 font-medium">
                    <span className="size-2 rounded-full bg-stone-400 mt-1 shrink-0" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: NEXT BEST ACTION (Requirement 9) */}
      {(activeTab === 'mission' || activeTab === 'fit') && (
        <div className="rounded-3xl border-2 border-slate-900 bg-white p-6 sm:p-8 shadow-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                  NEXT BEST ACTION
                </span>
                <span className="text-xs font-mono font-bold text-amber-700">
                  Single Highest-Impact Learning Recommendation
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {currentRole.recommendedProject.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsMissionModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-xs font-bold text-white hover:bg-slate-800 shadow-sm transition cursor-pointer shrink-0 uppercase tracking-wider"
            >
              <span>START MISSION</span>
              <ArrowRight className="size-4 text-sky-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                Why this mission:
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">
                {currentRole.recommendedProject.whyThisProject}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                Industry Relevance:
              </span>
              <p className="text-stone-700 leading-relaxed">
                {currentRole.recommendedProject.industryRelevance}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4 space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 block">
              Skills Developed in Mission:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentRole.recommendedProject.skillsDeveloped.map((sk) => (
                <span key={sk} className="rounded-lg bg-emerald-100 border border-emerald-300 px-2.5 py-1 text-xs font-mono font-bold text-emerald-900">
                  +{sk}
                </span>
              ))}
              {currentRole.recommendedProject.techStack.map((tech) => (
                <span key={tech} className="rounded-lg bg-white border border-stone-300 px-2.5 py-1 text-xs font-mono text-stone-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
            <span>Estimated Sprint: <strong>{currentRole.recommendedProject.estimatedEffort}</strong></span>
            <span>Recruiter Evidence: <strong>{currentRole.recommendedProject.evidenceCreated}</strong></span>
          </div>
        </div>
      )}

      {/* Tab 4: WHAT-IF CAREER SIMULATOR (Requirement 10) */}
      {(activeTab === 'simulator' || activeTab === 'fit') && (
        <WhatIfSimulator
          currentRoleName={currentRole.title}
          baseRoleFit={dynamicRoleFit}
        />
      )}

      {/* Tab 5: STUDENT SKILL GRAPH (Requirement 11) */}
      {activeTab === 'graph' && (
        <StudentSkillGraph
          studentName={profile.name}
          targetRole={currentRole.title}
        />
      )}

      {/* Tab 6: EMPLOYER / COMPANY FIT (Requirement 6) */}
      {(activeTab === 'employers' || activeTab === 'fit') && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800 mb-1">
                <Building2 className="size-3.5 text-sky-600" />
                <span>Market Alignment</span>
              </div>
              <h2 className="text-xl font-black text-slate-900">
                EMPLOYER & COMPANY FIT
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Profiles commonly associated with technical hiring tracks for {currentRole.title}.
              </p>
            </div>

            {/* Mandatory Requirement 6 Disclaimer */}
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] px-3.5 py-2 text-right self-start sm:self-center">
              <span className="text-[10px] font-mono font-bold text-stone-700 block">
                Relevant employer profile • Profile alignment
              </span>
              <span className="text-[9px] text-stone-400">
                Skills commonly associated with this role (Not a hiring guarantee)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {employerProfilesList.map((emp) => (
              <div
                key={emp.company}
                className="p-5 rounded-2xl border border-stone-200 bg-[#FAF8F5] space-y-3 hover:border-stone-300 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl bg-slate-900 text-white grid place-items-center font-bold text-xs">
                      {emp.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900">{emp.company}</h3>
                      <span className="text-[10px] font-mono text-stone-500">{emp.badge}</span>
                    </div>
                  </div>

                  <span className="rounded-xl bg-white border border-stone-200 px-2.5 py-1 text-xs font-mono font-black text-slate-800">
                    {emp.alignment}% Alignment
                  </span>
                </div>

                <div className="text-xs text-stone-600 bg-white p-3 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Typical Associated Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {emp.typicalTechStack.map((tech) => (
                      <span key={tech} className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-stone-500 leading-snug">
                  {emp.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Start Mission Modal */}
      {isMissionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-sky-700 uppercase tracking-wider block">
                  Project Mission Blueprint
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {currentRole.recommendedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMissionModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 transition cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2">
                <span className="font-bold text-slate-900 block">Mission Execution Steps:</span>
                <ol className="space-y-1.5 list-decimal list-inside text-stone-700">
                  <li>Initialize clean Git repository with poetry / pipenv environment.</li>
                  <li>Package the customer churn Scikit-learn model into a FastAPI application.</li>
                  <li>Write Dockerfile with multi-stage build and non-root execution user.</li>
                  <li>Configure GitHub Actions workflow for automated testing on push.</li>
                  <li>Tag and push immutable container image to Docker Hub registry.</li>
                </ol>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1 text-emerald-900">
                <span className="font-bold block">Recruiter Audit Outcome:</span>
                <p>
                  Upon completion, this project converts your &quot;NEEDS EVIDENCE&quot; Docker and Deployment status into verified proof with live URL evidence.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsMissionModalOpen(false)}
                className="rounded-xl border border-stone-200 px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-50 transition cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMissionModalOpen(false);
                  onOpenDashboard();
                }}
                className="rounded-xl bg-slate-900 px-6 py-2 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer"
              >
                Launch Workspace & Track Sprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
