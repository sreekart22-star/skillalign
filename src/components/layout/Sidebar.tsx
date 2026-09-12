import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  Target,
  BookOpen,
  ShieldCheck,
  Code2,
  BriefcaseBusiness,
  GraduationCap,
  FolderGit2,
  Sparkles,
  Bot,
  Users,
  AlertTriangle,
  LineChart,
  RefreshCw,
  FileText,
  Building2,
  Layers,
  Sliders,
  FileSearch,
  Compass,
} from 'lucide-react';
import { Role } from '../../types';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface SidebarProps {
  currentRole: Role;
  activePage?: string;
  currentPage?: string;
  onNavigate?: (page: string) => void;
  onPageChange?: (page: string) => void;
  isOpenMobile?: boolean;
  mobileOpen?: boolean;
  onCloseMobile: () => void;
  learnerName?: string;
  hasAnalyzedResume?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activePage,
  currentPage,
  onNavigate,
  onPageChange,
  isOpenMobile,
  mobileOpen,
  onCloseMobile,
  learnerName = 'Aarav Sharma',
  hasAnalyzedResume,
}) => {
  const selectedPage = activePage || currentPage || 'dashboard';
  const handleSelect = (page: string) => {
    if (onNavigate) onNavigate(page);
    if (onPageChange) onPageChange(page);
  };
  const isMobileVisible = isOpenMobile ?? mobileOpen ?? false;

  // Navigation config per Role
  const studentNav: NavItem[] = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'job-scanner', label: 'Job Description Scanner', icon: FileSearch, badge: 'AI' },
    { id: 'career-path', label: 'Career Path Generator', icon: Compass, badge: 'New' },
    { id: 'profile', label: 'Profile & Verified Skills', icon: UserCheck },
    { id: 'analysis', label: 'Skill Gap Breakdown', icon: Target },
    { id: 'hub', label: 'Improvement Hub', icon: BookOpen, badge: 'Live' },
    { id: 'verification', label: 'Zero-Trust Verification', icon: ShieldCheck },
    { id: 'coding', label: 'Diagnostic Assessment', icon: Code2 },
    { id: 'jobs', label: 'Job Matches & Fit', icon: BriefcaseBusiness },
    { id: 'roadmap', label: 'Learning Roadmap', icon: GraduationCap },
    { id: 'projects', label: 'Gap-Derived Projects', icon: FolderGit2 },
    { id: 'future', label: 'Emerging Market Signals', icon: Sparkles },
    { id: 'assistant', label: 'AI Career Advisor', icon: Bot, badge: 'AI' },
  ];

  const institutionNav: NavItem[] = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'curriculum', label: 'Curriculum Heatmap', icon: GraduationCap, badge: 'Audit' },
    { id: 'obsolescence', label: 'Obsolescence Review', icon: AlertTriangle },
    { id: 'students', label: 'Cohort Intelligence', icon: Users },
    { id: 'training', label: 'Training Interventions', icon: BookOpen },
    { id: 'reassessment', label: 'Reassessment Impact', icon: RefreshCw },
    { id: 'advanced-charts', label: 'Multi-Vector Analytics', icon: LineChart },
    { id: 'future', label: 'Curriculum Signals', icon: Sparkles },
    { id: 'reports', label: 'Accreditation Reports', icon: FileText },
  ];

  const facultyNav: NavItem[] = [
    { id: 'overview', label: 'Faculty Intelligence', icon: LayoutDashboard },
    { id: 'courses', label: 'Assigned Courses', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum Alignment', icon: GraduationCap, badge: 'Audit' },
    { id: 'students', label: 'Cohort Analytics', icon: Users },
    { id: 'future', label: 'Emerging Skill Signals', icon: Sparkles },
  ];

  const employerNav: NavItem[] = [
    { id: 'overview', label: 'Employer Command', icon: LayoutDashboard },
    { id: 'candidates', label: 'Verified Talent Pool', icon: Users, badge: 'Zero-Ghost' },
    { id: 'roles', label: 'Role Benchmarks', icon: Layers },
    { id: 'future', label: 'Workforce Signals', icon: Sparkles },
  ];

  const adminNav: NavItem[] = [
    { id: 'system', label: 'System Governance', icon: Sliders },
    { id: 'future', label: 'Skills Analytics', icon: Sparkles },
  ];

  const navItems: NavItem[] =
    currentRole === 'Student'
      ? studentNav
      : currentRole === 'Institution'
      ? institutionNav
      : currentRole === 'Faculty'
      ? facultyNav
      : currentRole === 'Employer'
      ? employerNav
      : adminNav;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileVisible && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-stone-200 bg-white p-4 transition-transform duration-200 lg:static lg:translate-x-0 ${
          isMobileVisible ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        }`}
      >
        {/* Context Card for Active Persona */}
        <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Active Persona
            </span>
            <span className="rounded-md bg-sky-50 border border-sky-200 px-1.5 py-0.5 text-[10px] font-bold text-sky-800">
              {currentRole}
            </span>
          </div>
          <p className="mt-1 text-xs font-bold text-slate-900 truncate">
            {currentRole === 'Student'
              ? learnerName
              : currentRole === 'Institution'
              ? 'Apex Engineering University'
              : currentRole === 'Faculty'
              ? 'Dr. S. K. Mukherjee (Faculty Lead)'
              : currentRole === 'Employer'
              ? 'Apex Cloud Labs'
              : 'Ecosystem Administrator'}
          </p>
          <p className="text-[11px] text-stone-500">
            {currentRole === 'Student'
              ? 'B.Tech CSE • Target: AI Engineer'
              : currentRole === 'Institution'
              ? '84 Depts • NAAC Accredited'
              : currentRole === 'Faculty'
              ? 'Computer Science Dept • 3 Courses'
              : currentRole === 'Employer'
              ? 'Zero-Ghosting Verified Network'
              : 'Workforce Standards'}
          </p>
        </div>

        {/* Navigation List */}
        <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-230px)] pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = selectedPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  handleSelect(item.id);
                  onCloseMobile();
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`size-4 shrink-0 ${isActive ? 'text-sky-300' : 'text-stone-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`ml-2 shrink-0 rounded-md px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-sky-600 text-white'
                        : item.badge === 'Live'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-sky-50 text-sky-700 border border-sky-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Metadata & Freshness Tag */}
        <div className="border-t border-stone-200 pt-3 mt-4 text-[10px] text-stone-400">
          <p className="flex items-center gap-1 font-semibold text-slate-700">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SkillAlign Engine Active
          </p>
          <p className="text-[10px] text-stone-500 mt-0.5">Continuous Academia–Industry Sync</p>
        </div>
      </aside>
    </>
  );
};
