import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Building2,
  Users,
  ShieldCheck,
  FileSearch,
  Award,
  LogOut,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Database,
  UserCheck,
} from 'lucide-react';
import { Role, UserProfile } from '../../types';
import { saveUserWorkspace } from '../../lib/authService';

interface WorkspaceSelectionScreenProps {
  userEmail: string;
  userProfile: UserProfile | null;
  onSelectWorkspace: (role: Role) => void;
  onOpenJudgeMode: () => void;
  onLogout: () => void;
}

export const WorkspaceSelectionScreen: React.FC<WorkspaceSelectionScreenProps> = ({
  userEmail,
  userProfile,
  onSelectWorkspace,
  onOpenJudgeMode,
  onLogout,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showStudentWelcome, setShowStudentWelcome] = useState<boolean>(false);

  const workspaces: Array<{
    role: Role;
    title: string;
    emoji: string;
    badge: string;
    description: string;
    highlights: string[];
    accentColor: string;
    borderColor: string;
  }> = [
    {
      role: 'Student',
      title: 'Student Workspace',
      emoji: '🎓',
      badge: 'Skill Intelligence Loop',
      description: 'Build your verified skill profile, complete unassisted coding diagnostics, and bridge real-time industry gaps.',
      highlights: [
        'Resume vector ingestion & extraction',
        'Personalized 10-problem coding assessment',
        'Role fit analysis & single next best action',
      ],
      accentColor: 'bg-sky-50 text-sky-800',
      borderColor: 'hover:border-sky-500',
    },
    {
      role: 'Institution',
      title: 'Institution Analytics',
      emoji: '🏫',
      badge: 'Curriculum & Accreditation',
      description: 'Audit university syllabi against market postings, track batch obsolescence, and draft Board of Studies revisions.',
      highlights: [
        '68% Curriculum Alignment Index',
        'Top cohort gaps: Docker & Cloud pipelines',
        'Continuous market vector benchmarking',
      ],
      accentColor: 'bg-amber-50 text-amber-800',
      borderColor: 'hover:border-amber-500',
    },
    {
      role: 'Faculty',
      title: 'Faculty Workspace',
      emoji: '👨‍🏫',
      badge: 'Course Instruction & Labs',
      description: 'Monitor class readiness, detect exam vs practical code gaps, and deploy targeted hands-on lab experiments.',
      highlights: [
        'Batch skill heatmap & grade analytics',
        'Assignment theoretical gap detection',
        'Recommended practical lab injections',
      ],
      accentColor: 'bg-purple-50 text-purple-800',
      borderColor: 'hover:border-purple-500',
    },
    {
      role: 'Employer',
      title: 'Employer Portal',
      emoji: '🏢',
      badge: 'Verified Talent Matching',
      description: 'Access pre-verified candidates with authenticated code benchmark scores, project proof, and zero CV hallucination.',
      highlights: [
        'Verified skill proof dockets',
        'Filter by unassisted code percentiles',
        '-68% reduction in screening duration',
      ],
      accentColor: 'bg-emerald-50 text-emerald-800',
      borderColor: 'hover:border-emerald-500',
    },
    {
      role: 'Admin',
      title: 'System Admin',
      emoji: '🛡️',
      badge: 'Governance & Infrastructure',
      description: 'Manage platform telemetry, AI model pipelines, university tenant configurations, and security audit logs.',
      highlights: [
        'Real-time system telemetry',
        'API throughput & latency metrics',
        'Model audit & verification controls',
      ],
      accentColor: 'bg-slate-100 text-slate-800',
      borderColor: 'hover:border-slate-600',
    },
  ];

  const handleChoose = async (role: Role) => {
    setSelectedRole(role);
    setIsSaving(true);

    if (userProfile?.id) {
      await saveUserWorkspace(userProfile.id, role);
    }

    if (role === 'Student') {
      setShowStudentWelcome(true);
      setTimeout(() => {
        onSelectWorkspace('Student');
      }, 1400);
    } else {
      setTimeout(() => {
        onSelectWorkspace(role);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* Top Navbar */}
      <header className="border-b border-stone-200 bg-white/95 backdrop-blur px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-slate-900 text-white shadow-xs">
            <ShieldCheck className="size-5 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black tracking-tight text-slate-900 text-sm">SKILLALIGN</span>
              <span className="rounded-md bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 text-[9px] font-bold text-emerald-800 font-mono">
                AUTHENTICATED
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-mono">{userEmail}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenJudgeMode}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50/80 px-3 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-100 transition shadow-2xs cursor-pointer"
          >
            <Award className="size-3.5 text-amber-600" />
            <span>SIH Judge Mode</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-[#FAF8F5] px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-50 hover:border-rose-200 transition shadow-2xs cursor-pointer"
          >
            <LogOut className="size-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-center space-y-8">
        <AnimatePresence mode="wait">
          {showStudentWelcome ? (
            <motion.div
              key="student-welcome"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto text-center p-8 rounded-3xl border border-sky-200 bg-white shadow-xl space-y-4"
            >
              <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200 mx-auto">
                <Sparkles className="size-7" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                WELCOME TO SKILLALIGN
              </h2>
              <p className="text-sm font-semibold text-sky-900">
                "Let's build your verified skill profile."
              </p>
              <p className="text-xs text-stone-500">
                Opening resume intake and unassisted coding calibration...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="workspace-grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Header Title */}
              <div className="text-center space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-800">
                  WORKSPACE ACCESS SELECTION
                </span>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 font-sans">
                  CHOOSE YOUR SKILLALIGN WORKSPACE
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
                  Select your role to access role-tailored intelligence loops, automated analytics, and curriculum alignment engines.
                </p>
              </div>

              {/* 5 Workspaces Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {workspaces.map((ws) => (
                  <motion.div
                    key={ws.role}
                    whileHover={{ y: -3 }}
                    className={`rounded-3xl border border-stone-200 bg-white p-6 shadow-xs transition-all duration-200 flex flex-col justify-between space-y-4 hover:shadow-lg ${ws.borderColor}`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{ws.emoji}</span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border border-current/20 ${ws.accentColor}`}>
                          {ws.badge}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-900">{ws.title}</h3>
                        <p className="text-xs text-stone-600 leading-relaxed">{ws.description}</p>
                      </div>

                      <ul className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-700">
                        {ws.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="size-3.5 text-emerald-600 mt-0.5 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleChoose(ws.role)}
                      disabled={isSaving}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition active:scale-[0.99] shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      <span>Launch {ws.role} Workspace</span>
                      <ArrowRight className="size-3.5 text-sky-400" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-4 px-4 text-center text-[11px] text-stone-500">
        SkillAlign • Connected Academia–Industry Skill Intelligence Platform
      </footer>
    </div>
  );
};
