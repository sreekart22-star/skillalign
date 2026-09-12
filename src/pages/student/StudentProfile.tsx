import React, { useState } from 'react';
import { UserCheck, Check, Sparkles, Upload, Save, ArrowRight } from 'lucide-react';
import { LearnerProfile, Level } from '../../types';
import { technicalSkillsList, jobRolesList, levelValueMap, scoreForLearner, requirementsForRole } from '../../data/platformData';

interface StudentProfileProps {
  learner: LearnerProfile;
  onUpdateLearner: (updated: LearnerProfile) => void;
  onOpenResumeUpload: () => void;
  onNavigateToAnalysis: () => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({
  learner,
  onUpdateLearner,
  onOpenResumeUpload,
  onNavigateToAnalysis,
}) => {
  const [draft, setDraft] = useState<LearnerProfile>({ ...learner });
  const [savedNotice, setSavedNotice] = useState(false);

  const activeRole = requirementsForRole(draft.targetRole);
  const liveScore = scoreForLearner(draft, activeRole);

  const toggleSkill = (skill: string) => {
    const existing = draft.skills[skill];
    const newSkills = { ...draft.skills };
    if (existing) {
      delete newSkills[skill];
    } else {
      newSkills[skill] = 'Intermediate';
    }
    setDraft({ ...draft, skills: newSkills });
    setSavedNotice(false);
  };

  const changeLevel = (skill: string, level: Level) => {
    setDraft({
      ...draft,
      skills: {
        ...draft.skills,
        [skill]: level,
      },
    });
    setSavedNotice(false);
  };

  const handleSave = () => {
    onUpdateLearner(draft);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <UserCheck className="size-3.5" />
            <span>Profile & Competencies</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            My Learner Profile
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your career target, education background, and proficiency levels across 24 industry skills.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenResumeUpload}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition"
          >
            <Upload className="size-3.5 text-indigo-600" />
            <span>Import from Resume</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 shadow-xs transition"
          >
            <Save className="size-3.5" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs font-semibold text-emerald-800 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Check className="size-4 text-emerald-600" />
            <span>Profile saved successfully! Role match scores and gap intelligence have been recomputed.</span>
          </div>
          <button
            type="button"
            onClick={onNavigateToAnalysis}
            className="inline-flex items-center gap-1 text-emerald-900 underline font-bold"
          >
            Inspect Skill Analysis →
          </button>
        </div>
      )}

      {/* Profile Form & Live Score Header */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Candidate Background
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Degree & Major</label>
                <input
                  type="text"
                  value={`${draft.education} in ${draft.branch}`}
                  onChange={(e) => setDraft({ ...draft, branch: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Year</label>
                <input
                  type="text"
                  value={draft.graduation}
                  onChange={(e) => setDraft({ ...draft, graduation: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={draft.location}
                  onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Career Role</label>
                <select
                  value={draft.targetRole}
                  onChange={(e) => setDraft({ ...draft, targetRole: e.target.value })}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-hidden"
                >
                  {jobRolesList.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name} ({r.industry})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Skills Matrix */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Technical Skills & Proficiency</h2>
                <p className="text-xs text-slate-500">
                  Select your current skills and specify your proficiency level. Click a card to toggle.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                {Object.keys(draft.skills).length} Active Skills
              </span>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3 max-h-[460px] overflow-y-auto pr-1">
              {technicalSkillsList.map((skill) => {
                const isSelected = Boolean(draft.skills[skill]);
                const level = draft.skills[skill] || 'Intermediate';
                return (
                  <div
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`cursor-pointer rounded-lg border p-3 text-xs transition ${
                      isSelected
                        ? 'border-indigo-300 bg-indigo-50/40 text-indigo-950 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-semibold">
                        <div
                          className={`size-3.5 rounded-sm border flex items-center justify-center ${
                            isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="size-2.5" />}
                        </div>
                        <span className="truncate">{skill}</span>
                      </div>

                      {isSelected && (
                        <select
                          value={level}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => changeLevel(skill, e.target.value as Level)}
                          className="rounded-md border border-indigo-200 bg-white px-2 py-0.5 text-[11px] font-medium text-indigo-700 focus:outline-hidden"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live Role Fit Preview */}
        <div className="space-y-6">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">Live Role Fit</span>
              <Sparkles className="size-4 text-indigo-600" />
            </div>
            <p className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">{liveScore}%</p>
            <p className="mt-1 text-xs text-slate-600">
              Computed for <strong>{activeRole.name}</strong> based on {Object.keys(draft.skills).length} active
              skills.
            </p>
            <div className="mt-4 h-2 w-full rounded-full bg-indigo-200/60 overflow-hidden">
              <div className="h-full rounded-full bg-indigo-600" style={{ width: `${liveScore}%` }} />
            </div>

            <div className="mt-6 space-y-2 border-t border-indigo-100 pt-4 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">Target Role Requirements ({activeRole.requirements.length}):</p>
              {activeRole.requirements.map((req) => {
                const userLevel = draft.skills[req.skill];
                const isMet = userLevel && levelValueMap[userLevel] >= levelValueMap[req.level];
                return (
                  <div key={req.skill} className="flex items-center justify-between py-1 border-b border-indigo-100/50">
                    <span className="truncate">{req.skill} ({req.level})</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isMet ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isMet ? 'Met' : userLevel || 'Missing'}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                handleSave();
                onNavigateToAnalysis();
              }}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs transition"
            >
              <span>Save & Analyze Gaps</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
