import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileSearch,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  Code2,
  BookOpen,
  Briefcase,
  Layers,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import { LearnerProfile, JobDescriptionScanResult } from '../../types';
import {
  sampleJobDescriptions,
  scanJobDescriptionText,
} from '../../data/platformData';

interface JobScannerViewProps {
  learner: LearnerProfile;
  onNavigate: (page: string, filter?: string) => void;
}

export const JobScannerView: React.FC<JobScannerViewProps> = ({
  learner,
  onNavigate,
}) => {
  const [jobText, setJobText] = useState<string>(sampleJobDescriptions[0].text);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<JobDescriptionScanResult | null>(
    () => scanJobDescriptionText(sampleJobDescriptions[0].text, learner, learner.targetRole)
  );
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);

  const handleSelectSample = (index: number) => {
    setSelectedSampleIndex(index);
    const sample = sampleJobDescriptions[index];
    setJobText(sample.text);
    handleScan(sample.text);
  };

  const handleScan = async (textToScan?: string) => {
    const text = textToScan || jobText;
    if (!text || text.trim().length < 20) return;

    setIsScanning(true);

    try {
      // Attempt server-side Gemini scanner
      const response = await fetch('/api/ai/scan-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobText: text,
          candidateSkills: learner.skills,
          targetRole: learner.targetRole,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (!data.fallback && data.requiredSkills) {
          // Compute client matching against extracted requirements
          const candidateSkillsList = Object.keys(learner.skills);
          const reqs: string[] = data.requiredSkills || [];
          const matching = reqs.filter((s) =>
            candidateSkillsList.some((cs) => cs.toLowerCase().includes(s.toLowerCase()))
          );
          const missing = reqs.filter((s) => !matching.includes(s));

          setScanResult({
            ...data,
            matchScore: Math.round((matching.length / Math.max(1, reqs.length)) * 100),
            matchingSkills: matching,
            partialMatchSkills: [],
            missingSkills: missing,
            recommendedProjects: data.recommendedProjects || [],
            learningResources: data.learningResources || [],
          });
          setIsScanning(false);
          return;
        }
      }
    } catch (err) {
      console.warn('API job scan fallback to client engine:', err);
    }

    // High fidelity client-side heuristic engine
    const result = scanJobDescriptionText(text, learner, learner.targetRole);
    setScanResult(result);
    setIsScanning(false);
  };

  return (
    <div className="space-y-6">
      {/* Visual Pipeline Navigation Banner */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
              Immediate Market Alignment
            </span>
            <h1 className="text-xl font-bold text-slate-900 mt-0.5">
              Job Description Intelligence Scanner
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Paste any live job specification to decompose role requirements, evaluate profile fit, and generate an instant project blueprint.
            </p>
          </div>

          {/* Pipeline Flow Indicator */}
          <div className="hidden lg:flex items-center gap-1 text-[11px] font-semibold text-stone-500">
            <span className="rounded-md bg-stone-100 px-2 py-1 text-slate-700">JOB REQS</span>
            <span>→</span>
            <span className="rounded-md bg-stone-100 px-2 py-1 text-slate-700">YOUR PROFILE</span>
            <span>→</span>
            <span className="rounded-md bg-sky-100 px-2 py-1 text-sky-800">MATCH ENGINE</span>
            <span>→</span>
            <span className="rounded-md bg-rose-100 px-2 py-1 text-rose-800">SKILL GAPS</span>
            <span>→</span>
            <span className="rounded-md bg-emerald-100 px-2 py-1 text-emerald-800">ACTION PLAN</span>
          </div>
        </div>

        {/* Sample Selectors */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-stone-500 mr-1">Preloaded Market Roles:</span>
          {sampleJobDescriptions.map((sample, idx) => (
            <button
              key={sample.title}
              type="button"
              onClick={() => handleSelectSample(idx)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                selectedSampleIndex === idx
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* Input Section & Action Bar */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="job-description-input" className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <FileSearch className="size-4 text-sky-600" />
            <span>Paste Job Description or Specifications</span>
          </label>
          <span className="text-xs text-stone-500">Supports text copied from LinkedIn, Naukri, or Careers Portals</span>
        </div>

        <textarea
          id="job-description-input"
          rows={6}
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          placeholder="Paste raw job description here (responsibilities, required qualifications, tech stack, experience)..."
          className="w-full rounded-xl border border-stone-300 p-3.5 text-xs font-mono text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100 leading-relaxed bg-[#FAF8F5]"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-slate-700">Evaluating against:</span>
            <span className="rounded-md bg-stone-100 px-2 py-0.5 font-medium text-slate-800">
              {learner.name} ({learner.targetRole})
            </span>
          </div>

          <button
            type="button"
            disabled={isScanning || !jobText.trim()}
            onClick={() => handleScan()}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-700 disabled:opacity-50 transition shadow-xs cursor-pointer"
          >
            {isScanning ? (
              <>
                <RefreshCw className="size-4 animate-spin" />
                <span>Decomposing & Aligning...</span>
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                <span>Scan & Compute Alignment</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {scanResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Top Alignment Overview Card */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-medium text-stone-500">Role Fit Alignment</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">{scanResult.matchScore}%</span>
                <span
                  className={`text-xs font-bold ${
                    scanResult.matchScore >= 75
                      ? 'text-emerald-700'
                      : scanResult.matchScore >= 50
                      ? 'text-amber-700'
                      : 'text-rose-700'
                  }`}
                >
                  {scanResult.matchScore >= 75 ? 'Strong Match' : scanResult.matchScore >= 50 ? 'Moderate Fit' : 'Substantial Gap'}
                </span>
              </div>
              <div className="mt-3 h-1.5 w-full rounded-full bg-stone-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    scanResult.matchScore >= 75 ? 'bg-emerald-600' : scanResult.matchScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${scanResult.matchScore}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-medium text-stone-500">Company & Target</span>
              <p className="mt-2 text-lg font-bold text-slate-900 truncate">{scanResult.jobTitle}</p>
              <p className="text-xs text-stone-600 mt-0.5">{scanResult.company}</p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-medium text-stone-500">Requirements Breakdown</span>
              <div className="mt-2 flex items-center gap-3 text-xs font-bold">
                <span className="text-emerald-700">{scanResult.matchingSkills.length} Matched</span>
                <span className="text-amber-700">{scanResult.partialMatchSkills.length} Partial</span>
                <span className="text-rose-700">{scanResult.missingSkills.length} Missing</span>
              </div>
              <p className="text-[11px] text-stone-500 mt-1">Based on verifiable catalog skills</p>
            </div>
          </div>

          {/* Three Column Match Status Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* 1. MATCH */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-xs">
              <div className="flex items-center gap-2 border-b border-emerald-200 pb-3">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-emerald-900">
                  MATCH ({scanResult.matchingSkills.length})
                </h3>
              </div>
              <p className="text-xs text-emerald-800 mt-2">
                Skills you already possess at required proficiency:
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {scanResult.matchingSkills.map((sk) => (
                  <span
                    key={sk}
                    className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200 shadow-2xs"
                  >
                    <CheckCircle2 className="size-3 text-emerald-600" />
                    {sk} ({learner.skills[sk] || 'Intermediate'})
                  </span>
                ))}
                {scanResult.matchingSkills.length === 0 && (
                  <span className="text-xs text-stone-500 italic">No direct matches identified.</span>
                )}
              </div>
            </div>

            {/* 2. PARTIAL MATCH */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 shadow-xs">
              <div className="flex items-center gap-2 border-b border-amber-200 pb-3">
                <AlertTriangle className="size-4 text-amber-600" />
                <h3 className="text-sm font-bold text-amber-900">
                  PARTIAL MATCH ({scanResult.partialMatchSkills.length})
                </h3>
              </div>
              <p className="text-xs text-amber-800 mt-2">
                Skills present but need upgrade to intermediate/advanced:
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {scanResult.partialMatchSkills.map((sk) => (
                  <span
                    key={sk}
                    className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-amber-800 border border-amber-200 shadow-2xs"
                  >
                    <AlertTriangle className="size-3 text-amber-600" />
                    {sk} (Current: {learner.skills[sk]})
                  </span>
                ))}
                {scanResult.partialMatchSkills.length === 0 && (
                  <span className="text-xs text-stone-500 italic">No partial gaps found.</span>
                )}
              </div>
            </div>

            {/* 3. MISSING */}
            <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-5 shadow-xs">
              <div className="flex items-center gap-2 border-b border-rose-200 pb-3">
                <XCircle className="size-4 text-rose-600" />
                <h3 className="text-sm font-bold text-rose-900">
                  MISSING ({scanResult.missingSkills.length})
                </h3>
              </div>
              <p className="text-xs text-rose-800 mt-2">
                Critical role requirements absent from profile:
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {scanResult.missingSkills.map((sk) => (
                  <span
                    key={sk}
                    className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-rose-800 border border-rose-200 shadow-2xs"
                  >
                    <XCircle className="size-3 text-rose-600" />
                    {sk}
                  </span>
                ))}
                {scanResult.missingSkills.length === 0 && (
                  <span className="text-xs text-emerald-700 font-semibold">
                    Zero missing skills! 100% requirements coverage.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* AI Gap Bridging Action Plan & Recommended Project */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                  Targeted Action Plan
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Bespoke Project Artifact to Bridge This Gap
                </h3>
              </div>
              <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800 border border-sky-200">
                Direct Portfolio Proof
              </span>
            </div>

            {scanResult.recommendedProjects && scanResult.recommendedProjects.length > 0 ? (
              <div className="space-y-4">
                {scanResult.recommendedProjects.map((proj, i) => (
                  <div key={i} className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="rounded-sm bg-sky-100 px-2 py-0.5 text-[10px] font-bold text-sky-800 uppercase">
                          Recommended Artifact
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1">
                          {proj.title}
                        </h4>
                        <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-2xl">
                          {proj.reason}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onNavigate('projects')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
                      >
                        <Code2 className="size-3.5" />
                        <span>Start This Project</span>
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-600 border-t border-stone-200/60 pt-3">
                      <div>
                        <span className="font-semibold text-slate-700">Tech Stack:</span>{' '}
                        {proj.techStack.join(', ')}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Difficulty:</span>{' '}
                        {proj.difficulty}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Estimated Effort:</span>{' '}
                        {proj.estimatedHours} hours
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Learning & Assessment Recommendations */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <BookOpen className="size-4 text-sky-600" />
                  <span>Immediate Learning Resource</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Focus on mastering {scanResult.missingSkills[0] || 'the primary gap skill'} through official documentation and sandbox tutorials.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('hub', scanResult.missingSkills[0])}
                  className="mt-3 text-xs font-bold text-sky-700 hover:text-sky-800 transition inline-flex items-center gap-1"
                >
                  <span>Open Guided Hub Module</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Cpu className="size-4 text-emerald-600" />
                  <span>Suggested Proctored Diagnostic</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {scanResult.suggestedAssessment || 'SkillAlign Core Technical Assessment'}
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('assessment')}
                  className="mt-3 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition inline-flex items-center gap-1"
                >
                  <span>Take Diagnostic Exam</span>
                  <ArrowRight className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
