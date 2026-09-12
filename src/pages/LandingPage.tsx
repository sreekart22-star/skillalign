import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Building2,
  Users,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  BarChart3,
  Code2,
  BriefcaseBusiness,
  Compass,
  FileSearch,
  Award,
  Layers,
  ChevronRight,
  Landmark,
} from 'lucide-react';
import { Role } from '../types';
import { SkillAlignmentPipeline } from '../components/SkillAlignmentPipeline';

interface LandingPageProps {
  onEnterPlatform: (role: Role, page?: string) => void;
  onEnterJudgeMode?: () => void;
  onLoadDemoStudent?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterPlatform,
  onEnterJudgeMode,
  onLoadDemoStudent,
}) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col justify-between">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-slate-900 text-white shadow-xs">
              <ShieldCheck className="size-5 text-sky-400" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900">SkillAlign</span>
              <span className="hidden sm:inline-block ml-2 rounded-full bg-sky-50 border border-sky-200 px-2 py-0.5 text-[10px] font-bold text-sky-800">
                Academia–Industry Intelligence Platform
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-medium text-stone-500">Enterprise Edition</span>

            <button
              type="button"
              onClick={() => onEnterPlatform('Student', 'dashboard')}
              className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 shadow-xs transition cursor-pointer"
            >
              Launch Live App →
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-12">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
            <Sparkles className="size-3.5" />
            <span>Problem Statement Solution • National Workforce Readiness</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Bridging the Gap Between Academia and Industry Through Intelligent Skill Alignment
          </h1>

          <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
            A real-time intelligence platform solving challenges in aligning engineering curricula with rapidly evolving employer requirements. Triangulates student skills, predicts curriculum obsolescence, recommends bespoke gap projects, and issues auditable verification dockets.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                if (onLoadDemoStudent) onLoadDemoStudent();
                onEnterPlatform('Student', 'dashboard');
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-xs font-bold text-white hover:bg-sky-700 shadow-xs transition cursor-pointer"
            >
              <span>Explore as Candidate (Demo Profile)</span>
              <ArrowRight className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => onEnterPlatform('Institution', 'overview')}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-xs font-bold text-slate-800 hover:bg-stone-50 shadow-2xs transition cursor-pointer"
            >
              <span>Explore as Academic Institution</span>
            </button>

            <button
              type="button"
              onClick={() => onEnterPlatform('Employer', 'matching')}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white hover:bg-slate-800 shadow-xs transition cursor-pointer"
            >
              <span>Explore Employer Intelligence</span>
            </button>
          </div>
        </div>

        {/* HERO DIFFERENTIATOR: Live Interactive Skill Alignment Engine Pipeline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              The Skill Alignment Engine Architecture
            </span>
            <span className="text-xs text-sky-700 font-semibold">
              Live Pipeline Simulation
            </span>
          </div>
          <SkillAlignmentPipeline
            currentStageId="skill-gap"
            onNavigateNode={(page) => onEnterPlatform('Student', page)}
          />
        </div>

        {/* Problem Statement Callout: Academic Curricula vs Real-World Demands */}
        <div className="rounded-2xl border border-rose-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
                Core Problem Diagnosed
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                The 3.8-Year Curriculum-To-Industry Latency Gap
              </h3>
            </div>
            <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-800 border border-rose-200">
              National Education Challenge
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 text-xs text-slate-700">
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
              <span className="font-bold text-slate-900 block">1. Traditional Syllabi</span>
              <p className="text-slate-600 leading-relaxed">
                Academic universities require 2-4 years to update formal curricula, leading to obsolete legacy coursework (e.g. outdated C++ or PHP 5).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
              <span className="font-bold text-slate-900 block">2. Rapid Market Evolution</span>
              <p className="text-slate-600 leading-relaxed">
                Industry demand shifts in 6-12 month cycles (e.g. Vector DBs, Kubernetes, GenAI API orchestration, Cloud Microservices).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
              <span className="font-bold text-slate-900 block">3. The SkillAlign Solution</span>
              <p className="text-slate-600 leading-relaxed">
                SkillAlign provides real-time delta intelligence, generating gap-bridging projects and verified dockets to guarantee student readiness.
              </p>
            </div>
          </div>
        </div>

        {/* The 4 Stakeholder Portals */}
        <div className="space-y-4">
          <div className="border-b border-stone-200 pb-3">
            <h2 className="text-lg font-bold text-slate-900">4 Unified Stakeholder Portals</h2>
            <p className="text-xs text-slate-500">Each persona interacts with a tailored workspace powered by the central intelligence model.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {/* Student */}
            <div
              onClick={() => onEnterPlatform('Student', 'dashboard')}
              className="cursor-pointer flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:border-sky-400 transition"
            >
              <div className="space-y-3">
                <div className="grid size-10 place-items-center rounded-xl bg-sky-50 text-sky-700">
                  <GraduationCap className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Student & Candidate</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Analyze skill gaps, scan job descriptions, build gap-derived capstones, and earn multi-signal verification dockets.
                </p>
              </div>
              <div className="pt-5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-sky-700">
                <span>Enter Student Portal</span>
                <ArrowRight className="size-3.5" />
              </div>
            </div>

            {/* Institution */}
            <div
              onClick={() => onEnterPlatform('Institution', 'overview')}
              className="cursor-pointer flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:border-sky-400 transition"
            >
              <div className="space-y-3">
                <div className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                  <BarChart3 className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Academic Institution</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Curriculum Heatmap & Obsolescence Index, cohort skill deficits, intervention tracking, and accreditation reports.
                </p>
              </div>
              <div className="pt-5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Enter Institutional Portal</span>
                <ArrowRight className="size-3.5" />
              </div>
            </div>

            {/* Employer */}
            <div
              onClick={() => onEnterPlatform('Employer', 'overview')}
              className="cursor-pointer flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:border-sky-400 transition"
            >
              <div className="space-y-3">
                <div className="grid size-10 place-items-center rounded-xl bg-amber-50 text-amber-700">
                  <Building2 className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Industry Employer</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Source verified candidates with code artifacts and test scores. Zero resume inflation, zero ghosting.
                </p>
              </div>
              <div className="pt-5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>Enter Industry Portal</span>
                <ArrowRight className="size-3.5" />
              </div>
            </div>

            {/* Admin */}
            <div
              onClick={() => onEnterPlatform('Admin', 'system')}
              className="cursor-pointer flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:border-sky-400 transition"
            >
              <div className="space-y-3">
                <div className="grid size-10 place-items-center rounded-xl bg-stone-100 text-slate-800">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">System Admin & Governance</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scoring weight parameters, curriculum standard ontologies, audit telemetry, and national workforce analytics.
                </p>
              </div>
              <div className="pt-5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Enter System Control</span>
                <ArrowRight className="size-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Demonstrated Prototype Impact</h3>
            <p className="text-xs text-stone-500">Benchmark telemetry across pilot engineering colleges</p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 text-center">
              <span className="text-3xl font-extrabold text-slate-900">18,400+</span>
              <p className="text-xs font-medium text-stone-600 mt-1">Students Profiled</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 text-center">
              <span className="text-3xl font-extrabold text-emerald-700">84</span>
              <p className="text-xs font-medium text-stone-600 mt-1">Colleges & Departments</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 text-center">
              <span className="text-3xl font-extrabold text-sky-700">+42%</span>
              <p className="text-xs font-medium text-stone-600 mt-1">Faster Role Readiness</p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 text-center">
              <span className="text-3xl font-extrabold text-amber-700">92.4%</span>
              <p className="text-xs font-medium text-stone-600 mt-1">Employer Verification Trust</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 SkillAlign • National Workforce Readiness & Skill Intelligence</p>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-800">Unified Architecture</span>
            <span>•</span>
            <span>Enterprise Workforce Intelligence</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
