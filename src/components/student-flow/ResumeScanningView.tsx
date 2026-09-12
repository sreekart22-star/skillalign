import React, { useEffect, useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowRight,
  FileText,
  Cpu,
  Database,
  Layers,
  Code2,
  TrendingUp,
} from 'lucide-react';

interface ResumeScanningViewProps {
  fileName: string;
  onScanningComplete: () => void;
}

// Exactly 9 Staged Transitions as specified in Requirement 2:
const analysisStages = [
  { id: 1, label: 'Uploading Resume', detail: 'Validating PDF/DOCX structure & verifying payload integrity' },
  { id: 2, label: 'Reading Resume', detail: 'Parsing document layout, raw token streams & section boundaries' },
  { id: 3, label: 'Extracting Education', detail: 'Detecting degree, institution, GPA, and foundational coursework' },
  { id: 4, label: 'Extracting Skills', detail: 'Extracting programming languages, frameworks, libraries & tools' },
  { id: 5, label: 'Extracting Projects', detail: 'Indexing project architecture, technologies used & repository links' },
  { id: 6, label: 'Mapping Skill Evidence', detail: 'Correlating claimed technical skills with project and coursework traces' },
  { id: 7, label: 'Identifying Target Roles', detail: 'Benchmarking competencies against 8 standardized industry profiles' },
  { id: 8, label: 'Calculating Initial Skill Gaps', detail: 'Evaluating delta between claimed evidence and market prerequisites' },
  { id: 9, label: 'Preparing Personalized Assessment', detail: 'Synthesizing diagnostic 10-problem coding suite with hidden test cases' },
];

export const ResumeScanningView: React.FC<ResumeScanningViewProps> = ({
  fileName,
  onScanningComplete,
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    // Realistic staged progression
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < analysisStages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsDone(true);
          return prev;
        }
      });
    }, 550);

    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.round(((currentStageIndex + 1) / analysisStages.length) * 100);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8 font-sans">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="size-16 rounded-2xl bg-slate-900 text-white grid place-items-center mx-auto shadow-md relative overflow-hidden">
          <ShieldCheck className="size-8 text-sky-400" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-400/20 to-transparent animate-pulse" />
        </div>

        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            SKILLALIGN • RESUME INTELLIGENCE ENGINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {isDone ? 'AI Resume Analysis Complete' : 'Analyzing Student Profile...'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Analyzing document: <span className="font-mono font-semibold text-slate-800">{fileName}</span>
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900 flex items-center gap-1.5">
            {!isDone && <Loader2 className="size-3.5 text-sky-600 animate-spin" />}
            {isDone ? 'Stage 9 of 9 Complete' : analysisStages[currentStageIndex].label}
          </span>
          <span className="font-mono font-bold text-sky-800">{progressPercent}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
          <div
            className="h-full bg-slate-900 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 9 Staged Transitions Checklist */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs text-left space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Extraction & Calibration Pipeline
            </h3>
            <p className="text-xs text-stone-500">
              Staged verification sequence according to National Skill Intelligence Standards
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
            {currentStageIndex + 1} / {analysisStages.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {analysisStages.map((stage, idx) => {
            const isCompleted = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex && !isDone;

            return (
              <div
                key={stage.id}
                className={`p-3 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-[#FAF8F5] border-stone-200 text-slate-900'
                    : 'bg-stone-50/50 border-stone-100 text-stone-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                      ) : (
                        <div className="size-4 rounded-full border border-stone-300" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-stone-400 font-bold">
                          0{stage.id}
                        </span>
                        <span className={`text-xs font-bold ${isCompleted ? 'text-slate-900' : 'text-stone-400'}`}>
                          {stage.label}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">
                        {stage.detail}
                      </p>
                    </div>
                  </div>

                  {isCurrent && (
                    <Loader2 className="size-3.5 text-sky-600 animate-spin shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button once finished */}
        {isDone && (
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-600 font-medium">
              Extracted 16 skills, 3 projects, and mapped 8 role alignments.
            </span>
            <button
              type="button"
              onClick={onScanningComplete}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 shadow-sm transition cursor-pointer shrink-0"
            >
              <span>View Extracted Resume Intelligence</span>
              <ArrowRight className="size-4 text-sky-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
