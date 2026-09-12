import React from 'react';
import {
  Users,
  Sparkles,
  Building2,
  ShieldCheck,
  GraduationCap,
  Menu,
  FileSearch,
  LogOut,
  LayoutGrid,
  Search,
  Bell,
  User,
} from 'lucide-react';
import { Role, MainView } from '../../types';

interface HeaderProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  mainView: MainView;
  onMainViewChange: (view: MainView) => void;
  onOpenUpload: () => void;
  onToggleSidebar?: () => void;
  onOpenLanding?: () => void;
  activeResumeName?: string;
  isDemoStudentActive?: boolean;
  onToggleDemoStudent?: () => void;
  userEmail?: string;
  onLogout?: () => void;
  onOpenWorkspaceSelection?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  mainView,
  onMainViewChange,
  onOpenUpload,
  onToggleSidebar,
  onOpenLanding,
  activeResumeName,
  isDemoStudentActive,
  onToggleDemoStudent,
  userEmail,
  onLogout,
  onOpenWorkspaceSelection,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo & Wordmark */}
        <div className="flex items-center gap-6">
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden rounded-lg p-2 text-stone-600 hover:bg-stone-100"
            >
              <Menu className="size-5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onMainViewChange('home')}
            className="group flex items-center gap-2.5 text-left focus:outline-hidden cursor-pointer"
          >
            <div className="grid size-9 place-items-center rounded-xl bg-slate-900 text-white shadow-xs transition group-hover:bg-slate-800">
              <ShieldCheck className="size-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black tracking-tight text-slate-900 text-base">SKILLALIGN</span>
              </div>
              <p className="text-[10px] font-semibold tracking-wide text-sky-800 uppercase">Workforce & Education Intelligence</p>
            </div>
          </button>

          {/* Center: SaaS Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-stone-600">
            <button
              type="button"
              onClick={() => onMainViewChange('home')}
              className={`rounded-lg px-3 py-2 transition cursor-pointer ${
                mainView === 'home'
                  ? 'bg-stone-100 text-slate-900 font-bold'
                  : 'hover:bg-stone-50 hover:text-slate-900'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onMainViewChange('platform')}
              className={`rounded-lg px-3 py-2 transition cursor-pointer ${
                mainView === 'platform'
                  ? 'bg-stone-100 text-slate-900 font-bold'
                  : 'hover:bg-stone-50 hover:text-slate-900'
              }`}
            >
              Platform
            </button>
            <button
              type="button"
              onClick={() => onMainViewChange('landing')}
              className={`rounded-lg px-3 py-2 transition cursor-pointer ${
                mainView === 'landing'
                  ? 'bg-stone-100 text-slate-900 font-bold'
                  : 'hover:bg-stone-50 hover:text-slate-900'
              }`}
            >
              Solutions
            </button>
            <button
              type="button"
              onClick={() => onMainViewChange('platform')}
              className="rounded-lg px-3 py-2 hover:bg-stone-50 hover:text-slate-900 transition cursor-pointer"
            >
              Insights
            </button>
            <button
              type="button"
              onClick={() => onMainViewChange('landing')}
              className="rounded-lg px-3 py-2 hover:bg-stone-50 hover:text-slate-900 transition cursor-pointer"
            >
              Resources
            </button>
          </nav>
        </div>

        {/* Right: Actions, Search, Notifications & Profile */}
        <div className="flex items-center gap-3">
          {/* Search & Notifications */}
          <div className="hidden sm:flex items-center gap-1 text-stone-500">
            <button
              type="button"
              title="Search Intelligence"
              className="size-9 rounded-xl hover:bg-stone-100 flex items-center justify-center transition cursor-pointer"
            >
              <Search className="size-4" />
            </button>
            <button
              type="button"
              title="Notifications"
              className="size-9 rounded-xl hover:bg-stone-100 flex items-center justify-center transition relative cursor-pointer"
            >
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-2 rounded-full bg-sky-600" />
            </button>
          </div>

          {/* Role Switcher Dropdown / Pills */}
          <div className="hidden md:flex items-center gap-1 rounded-xl border border-stone-200 bg-[#FAF8F5] p-1">
            {(['Student', 'Institution', 'Faculty', 'Employer', 'Admin'] as Role[]).map((role) => {
              const isActive = currentRole === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    onRoleChange(role);
                    if (mainView !== 'platform') {
                      onMainViewChange('platform');
                    }
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-slate-900 hover:bg-stone-200/50'
                  }`}
                >
                  {role}
                </button>
              );
            })}
          </div>

          {/* Workspaces / Profile */}
          {onOpenWorkspaceSelection && (
            <button
              type="button"
              onClick={onOpenWorkspaceSelection}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs cursor-pointer"
            >
              <LayoutGrid className="size-3.5 text-sky-400" />
              <span className="hidden sm:inline">Workspaces</span>
            </button>
          )}

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              title="Logout"
              className="size-9 rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 flex items-center justify-center transition shadow-2xs cursor-pointer"
            >
              <LogOut className="size-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
