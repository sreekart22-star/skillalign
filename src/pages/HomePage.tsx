import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Building2,
  Users,
  Briefcase,
  Award,
  ArrowRight,
  Compass,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { Role } from '../types';

interface HomePageProps {
  onGetStarted: () => void;
  onSelectRole: (role: Role) => void;
  onExplorePlatform: () => void;
  onOpenJudgeMode: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectRole,
  onOpenJudgeMode,
}) => {
  const gatewayRoles = [
    {
      id: 'student' as const,
      role: 'Student' as Role,
      title: 'STUDENT',
      badge: 'Learner & Candidate Track',
      icon: GraduationCap,
      description:
        'Build your verified skill profile, verify technical competencies through a 10-problem diagnostic test, identify critical skill gaps, simulate career paths, and execute portfolio missions.',
      accent: 'border-sky-300 hover:border-sky-500 hover:shadow-sky-100/80',
      iconBg: 'bg-sky-50 text-sky-700 border-sky-200',
      glow: 'group-hover:ring-2 group-hover:ring-sky-400/30',
      tagline: 'Diagnostics • Evidence Proof • Career Path',
      buttonClass: 'bg-slate-900 text-white hover:bg-sky-700',
    },
    {
      id: 'institution' as const,
      role: 'Institution' as Role,
      title: 'INSTITUTION',
      badge: 'Academic Leadership Track',
      icon: Building2,
      description:
        'Audit curriculum alignment against real-time industry demand, monitor cohort skill health, track obsolescence risks, and download NAAC/NIRF accreditation analytics.',
      accent: 'border-emerald-300 hover:border-emerald-500 hover:shadow-emerald-100/80',
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      glow: 'group-hover:ring-2 group-hover:ring-emerald-400/30',
      tagline: 'Curriculum Audit • Industry Heatmap • Accreditation',
      buttonClass: 'bg-slate-900 text-white hover:bg-emerald-700',
    },
    {
      id: 'faculty' as const,
      role: 'Faculty' as Role,
      title: 'FACULTY',
      badge: 'Instruction & Mentorship Track',
      icon: Users,
      description:
        'Supervise student cohorts, monitor at-risk skill areas, identify classroom gaps, and generate automated 4-week actionable intervention plans.',
      accent: 'border-purple-300 hover:border-purple-500 hover:shadow-purple-100/80',
      iconBg: 'bg-purple-50 text-purple-700 border-purple-200',
      glow: 'group-hover:ring-2 group-hover:ring-purple-400/30',
      tagline: 'Cohort Health • At-Risk Radar • 4-Week Intervention',
      buttonClass: 'bg-slate-900 text-white hover:bg-purple-700',
    },
    {
      id: 'employer' as const,
      role: 'Employer' as Role,
      title: 'EMPLOYER',
      badge: 'Talent Acquisition Track',
      icon: Briefcase,
      description:
        'Create job roles with AI-generated skill blueprints, configure skill weighting, and scout talent based on verified assessment execution and project code.',
      accent: 'border-amber-300 hover:border-amber-500 hover:shadow-amber-100/80',
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
      glow: 'group-hover:ring-2 group-hover:ring-amber-400/30',
      tagline: 'Role Blueprint • Weighted Scoring • Verified Talent',
      buttonClass: 'bg-slate-900 text-white hover:bg-amber-700',
    },
    {
      id: 'admin' as const,
      role: 'Admin' as Role,
      title: 'PLATFORM ADMIN',
      badge: 'System Governance & Intelligence',
      icon: ShieldCheck,
      description:
        'Manage platform-wide skill taxonomies, institutional onboarding, employer integrations, and global workforce readiness intelligence metrics.',
      accent: 'border-slate-300 hover:border-slate-500 hover:shadow-slate-100/80',
      iconBg: 'bg-slate-100 text-slate-800 border-slate-300',
      glow: 'group-hover:ring-2 group-hover:ring-slate-400/30',
      tagline: 'System Settings • Taxonomy Management • Global Analytics',
      buttonClass: 'bg-slate-900 text-white hover:bg-slate-800',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col justify-between selection:bg-sky-100 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-slate-900 text-white shadow-xs">
              <ShieldCheck className="size-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black tracking-tight text-slate-900">SKILLALIGN</span>
                <span className="rounded-md bg-sky-50 border border-sky-200 px-1.5 py-0.5 text-[9px] font-bold text-sky-800 tracking-wide uppercase">
                  National Skill Intelligence
                </span>
              </div>
              <p className="text-[10px] text-stone-500 hidden sm:block font-medium">
                Academia–Industry Skill Synchronization Loop
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-stone-500">Enterprise Intelligence Gateway</span>
          </div>
        </div>
      </header>

      {/* Main Role Selection Gateway */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex flex-col justify-center">
        {/* Gateway Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-bold text-slate-800 shadow-2xs">
            <Sparkles className="size-3.5 text-sky-600" />
            <span className="uppercase tracking-wider text-[11px]">Next-Gen Skill Proof Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 uppercase">
            SKILLALIGN
          </h1>

          <div className="text-sm sm:text-base font-bold text-sky-800 tracking-wide">
            &ldquo;Bridging the Gap Between Education, Skills & Industry.&rdquo;
          </div>

          {/* Prompt Quote Requirement */}
          <div className="relative pt-2 pb-1">
            <div className="rounded-2xl border border-stone-200/90 bg-white/90 p-5 sm:p-6 shadow-xs max-w-2xl mx-auto">
              <p className="text-base sm:text-lg font-serif italic text-stone-700 leading-relaxed">
                “Discover what you actually know.<br />
                Identify what you need to learn.<br />
                Align skills with industry.”
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
            Select a specialized gateway to enter your tailored role workspace. Experience real-time skill verification, curriculum intelligence, and candidate matching.
          </p>
        </div>

        {/* Five Gateway Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {gatewayRoles.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.id}
                className={`group relative flex flex-col justify-between rounded-3xl border bg-white p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer ${g.accent} ${g.glow}`}
                onClick={() => {
                  onSelectRole(g.role);
                }}
              >
                {/* Header info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`grid size-12 place-items-center rounded-2xl border shadow-2xs transition-transform group-hover:scale-105 duration-200 ${g.iconBg}`}>
                      <Icon className="size-6" />
                    </div>
                    <span className="rounded-full bg-[#FAF8F5] border border-stone-200 px-2.5 py-1 text-[10px] font-mono font-bold text-stone-700">
                      {g.badge}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-black tracking-tight text-slate-900 group-hover:text-sky-900 transition-colors">
                      {g.title}
                    </h2>
                    <span className="text-[11px] font-mono text-stone-500 block mt-0.5">
                      {g.tagline}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {g.description}
                  </p>
                </div>

                {/* Enter Workspace Action */}
                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500 group-hover:text-slate-900 transition-colors">
                    Access Portal
                  </span>
                  <button
                    type="button"
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-xs cursor-pointer ${g.buttonClass}`}
                  >
                    <span>Enter Workspace</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Architecture Loop Ribbon */}
        <div className="mt-14 rounded-3xl border border-stone-200 bg-white p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-[#FAF8F5] border border-stone-200 text-slate-900">
                <Compass className="size-5 text-sky-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Continuous Skill Intelligence Loop</h3>
                <p className="text-xs text-stone-500">Connecting Student, Academia, Faculty, Employer, and Industry in real-time</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-stone-600">
              <span className="rounded-lg bg-[#FAF8F5] border border-stone-200 px-2 py-1 font-semibold">1. Diagnostic Code Test</span>
              <span>→</span>
              <span className="rounded-lg bg-[#FAF8F5] border border-stone-200 px-2 py-1 font-semibold">2. Verified Proof</span>
              <span>→</span>
              <span className="rounded-lg bg-[#FAF8F5] border border-stone-200 px-2 py-1 font-semibold">3. Curriculum Sync</span>
              <span>→</span>
              <span className="rounded-lg bg-[#FAF8F5] border border-stone-200 px-2 py-1 font-semibold">4. Employer Match</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-sky-600" />
            <span>SkillAlign • Smart India Hackathon Winner-Grade Architecture</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Deterministic Diagnostics</span>
            <span>•</span>
            <span>Zero-Ghosting Network</span>
            <span>•</span>
            <span>NIRF/NAAC Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
