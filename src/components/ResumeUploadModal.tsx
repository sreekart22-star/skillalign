import React, { useState } from 'react';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  RefreshCw,
  XCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { LearnerProfile } from '../types';
import { parseResumeText, sampleResumeAarav } from '../data/resumeParser';
import { requirementsForRole } from '../data/platformData';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyProfile: (updatedProfile: Partial<LearnerProfile>) => void;
  targetRole?: string;
}

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({
  isOpen,
  onClose,
  onApplyProfile,
  targetRole = 'Data Scientist',
}) => {
  const [resumeText, setResumeText] = useState<string>(sampleResumeAarav);
  const [fileName, setFileName] = useState<string>('aarav_sharma_academic_cv.pdf');
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) setResumeText(content);
      };
      reader.readAsText(file);
    }
  };

  const handleParse = async () => {
    setIsParsing(true);
    try {
      const res = await fetch('/api/ai/parse-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText }),
      });

      if (res.ok) {
        const data = await res.json();
        setParsedData(data);
        setIsParsing(false);
        return;
      }
    } catch (err) {
      console.warn('API error during resume parse, using deterministic parser fallback:', err);
    }

    // Deterministic fallback
    setTimeout(() => {
      const fallbackParsed = parseResumeText(resumeText);
      setParsedData(fallbackParsed);
      setIsParsing(false);
    }, 500);
  };

  const handleApply = () => {
    if (parsedData) {
      onApplyProfile({
        name: parsedData.name || 'Aarav Sharma',
        email: parsedData.email,
        phone: parsedData.phone,
        location: parsedData.location,
        education: parsedData.education || 'B.Tech',
        branch: parsedData.branch || 'Computer Science & Engineering',
        graduation: parsedData.graduation || '2026',
        targetRole: parsedData.targetRole || targetRole,
        skills: parsedData.skills || {},
        projects: parsedData.projects || 3,
        experience: parsedData.experience || 1,
        sourceFile: fileName,
      });
      onClose();
    }
  };

  // Compare parsed skills against the selected target role
  const roleReqs = requirementsForRole(targetRole);
  const requiredSkillNames = roleReqs.requirements ? roleReqs.requirements.map((r) => r.skill) : (roleReqs.required || []);
  const candidateSkills = parsedData ? Object.keys(parsedData.skills || {}) : [];
  const matchedSkills = requiredSkillNames.filter((r) =>
    candidateSkills.some((s) => s.toLowerCase() === r.toLowerCase())
  );
  const missingCritical = requiredSkillNames.filter((r) => !matchedSkills.includes(r));
  const missingPreferred = (roleReqs.preferred || []).filter(
    (p) => !candidateSkills.some((s) => s.toLowerCase() === p.toLowerCase())
  );
  const resumeAlignmentScore = requiredSkillNames.length > 0
    ? Math.round((matchedSkills.length / requiredSkillNames.length) * 100)
    : 75;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="grid size-8 place-items-center rounded-lg bg-sky-50 text-sky-700 border border-sky-200">
              <Upload className="size-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Resume Intelligence & Ingestion Engine
              </h2>
              <p className="text-xs text-stone-500">
                Extract skills, project deliverables, and compare against target role criteria.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Upload File or Preset Selector */}
        <div className="space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="font-semibold text-slate-700">Source Document</label>
            <span className="text-[11px] font-mono text-stone-500">Active File: {fileName}</span>
          </div>

          <div className="rounded-xl border-2 border-dashed border-stone-200 bg-[#FAF8F5] p-4 text-center hover:border-sky-400 transition">
            <Upload className="mx-auto size-6 text-stone-400" />
            <p className="mt-1 text-xs text-slate-700 font-medium">Click to upload or drag & drop</p>
            <p className="text-[10px] text-stone-400">PDF, TXT, or DOCX formatted resumes</p>
            <input
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="mt-2 text-xs file:mr-2 file:rounded-md file:border-0 file:bg-stone-200 file:px-2.5 file:py-1 file:text-xs file:font-semibold"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Raw Resume Text</label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={5}
              className="w-full rounded-xl border border-stone-200 bg-[#FAF8F5] p-3 font-mono text-xs text-slate-800 focus:border-sky-500 focus:outline-none"
              placeholder="Paste resume text..."
            />
          </div>

          <button
            type="button"
            onClick={handleParse}
            disabled={isParsing || !resumeText.trim()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-40 transition shadow-xs cursor-pointer"
          >
            {isParsing ? (
              <>
                <RefreshCw className="size-4 animate-spin" />
                <span>Extracting Entities & Skills...</span>
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                <span>Extract & Align Resume</span>
              </>
            )}
          </button>
        </div>

        {/* Parsed Output Preview with Alignment Scoring */}
        {parsedData && (
          <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-5 text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>Extraction & Alignment Summary</span>
              </div>
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-bold text-emerald-800 border border-emerald-200">
                {resumeAlignmentScore}% Target Role Alignment
              </span>
            </div>

            {/* Candidate Basics */}
            <div className="grid grid-cols-2 gap-2 text-stone-700">
              <p>
                <strong>Candidate:</strong> {parsedData.name}
              </p>
              <p>
                <strong>Target Role:</strong> {targetRole}
              </p>
              <p>
                <strong>Education:</strong> {parsedData.education} ({parsedData.graduation})
              </p>
              <p>
                <strong>Extracted Skills:</strong> {candidateSkills.length} identified
              </p>
            </div>

            {/* Matched vs Missing Breakdown */}
            <div className="space-y-2">
              <div>
                <span className="font-bold text-emerald-800 block mb-1">
                  MATCHED CRITICAL SKILLS ({matchedSkills.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matchedSkills.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-white border border-emerald-200 px-2 py-0.5 text-[11px] font-semibold text-emerald-800"
                    >
                      ✓ {s}
                    </span>
                  ))}
                  {matchedSkills.length === 0 && (
                    <span className="text-stone-500 italic">No direct matches identified.</span>
                  )}
                </div>
              </div>

              {missingCritical.length > 0 && (
                <div>
                  <span className="font-bold text-rose-800 block mb-1">
                    MISSING CRITICAL SKILLS ({missingCritical.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {missingCritical.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-white border border-rose-200 px-2 py-0.5 text-[11px] font-semibold text-rose-800"
                      >
                        ✕ {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {missingPreferred.length > 0 && (
                <div>
                  <span className="font-bold text-amber-800 block mb-1">
                    MISSING PREFERRED SKILLS ({missingPreferred.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {missingPreferred.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-white border border-amber-200 px-2 py-0.5 text-[11px] font-semibold text-amber-800"
                      >
                        ○ {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Plan */}
            <div className="rounded-lg bg-white p-3 border border-stone-200 text-stone-700 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block">
                ACTION PLAN TO ELEVATE RESUME
              </span>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Add a verifiable capstone project covering {missingCritical.slice(0, 2).join(' and ') || 'target role skills'} with a live public GitHub repository and containerized demo URL.
              </p>
            </div>

            <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
              <span className="text-stone-500 text-[11px]">
                Ready to sync with active student dashboard profile.
              </span>
              <button
                type="button"
                onClick={handleApply}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 shadow-xs transition"
              >
                Apply to Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
