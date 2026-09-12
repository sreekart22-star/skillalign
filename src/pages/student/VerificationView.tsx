import React, { useState } from 'react';
import {
  ShieldCheck,
  Github,
  Linkedin,
  FileText,
  Upload,
  AlertTriangle,
  Lock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Clock,
  Award,
  Code2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { VerificationEvidence, VerificationStatus } from '../../types';
import { initialVerificationEvidence } from '../../data/platformData';

interface VerificationViewProps {
  onNavigateToCodingAssessment: () => void;
}

export const VerificationView: React.FC<VerificationViewProps> = ({
  onNavigateToCodingAssessment,
}) => {
  const [evidenceList, setEvidenceList] = useState<VerificationEvidence[]>(initialVerificationEvidence);
  const [selectedEvidence, setSelectedEvidence] = useState<VerificationEvidence>(initialVerificationEvidence[0]);
  const [githubConnected, setGithubConnected] = useState<boolean>(true);
  const [linkedinConnected, setLinkedinConnected] = useState<boolean>(true);
  const [resumeConnected, setResumeConnected] = useState<boolean>(true);
  const [shareConsent, setShareConsent] = useState<boolean>(true);

  const averageConfidence = Math.round(
    evidenceList.reduce((acc, curr) => acc + curr.confidence, 0) / evidenceList.length
  );
  const verifiedCount = evidenceList.filter((e) => e.status === 'VERIFIED').length;
  const supportedCount = evidenceList.filter((e) => e.status === 'SUPPORTED').length;

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'SUPPORTED':
        return 'bg-sky-50 text-sky-800 border-sky-300';
      case 'PARTIALLY SUPPORTED':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                Multi-Signal Verification Protocol
              </span>
              <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-600">
                Zero-Trust Credentialing
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Skill Evidence & Verification Dockets
            </h1>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
              Every skill in SkillAlign is tied to an auditable verification docket. We combine practical proctored code evaluations, GitHub commits, coursework artifacts, and accredited credentials.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToCodingAssessment}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 shadow-xs transition cursor-pointer"
          >
            <span>Take Proctored Assessment</span>
            <ChevronRight className="size-3.5" />
          </button>
        </div>

        {/* Top 4 Metrics */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4">
            <span className="text-xs font-medium text-stone-500">Average Confidence</span>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">{averageConfidence}%</p>
            <div className="mt-1 text-[11px] text-stone-500">Empirically audited signals</div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4">
            <span className="text-xs font-medium text-stone-500">Verified Skills</span>
            <p className="mt-1 text-2xl font-extrabold text-emerald-700">{verifiedCount}</p>
            <div className="mt-1 text-[11px] text-stone-500">Triangulated proof</div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4">
            <span className="text-xs font-medium text-stone-500">Supported Skills</span>
            <p className="mt-1 text-2xl font-extrabold text-sky-700">{supportedCount}</p>
            <div className="mt-1 text-[11px] text-stone-500">Single-source validated</div>
          </div>
          <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4">
            <span className="text-xs font-medium text-stone-500">Employer Visibility</span>
            <p className="mt-1 text-sm font-bold text-slate-900">
              {shareConsent ? 'Consented for Matching' : 'Private Only'}
            </p>
            <div className="mt-1 text-[11px] text-stone-500">Controlled by student</div>
          </div>
        </div>
      </div>

      {/* Connected Evidence Feeds */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Connected Ingestion Channels
          </h2>
          <span className="text-xs text-stone-500">3 of 4 active feeds</span>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Github className="size-5 text-slate-900" />
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                Connected
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900">GitHub Commit Engine</p>
            <p className="text-[11px] text-stone-500">Analyzes AST, unit test coverage, and repo PR activity</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Linkedin className="size-5 text-sky-600" />
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                Connected
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900">Professional Records</p>
            <p className="text-[11px] text-stone-500">Endorsements, verified education, internship badges</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Upload className="size-5 text-sky-600" />
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                Parsed
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900">SkillAlign Resume AI</p>
            <p className="text-[11px] text-stone-500">Deep semantic extraction with verifiable entity mapping</p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Award className="size-5 text-amber-600" />
              <span className="rounded-full bg-stone-200 px-2 py-0.5 text-[10px] font-bold text-stone-700">
                Optional
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900">Accredited Credentials</p>
            <p className="text-[11px] text-stone-500">AWS, Google Cloud, and Coursera verifiable certificates</p>
          </div>
        </div>
      </div>

      {/* Evidence Table & Selected Skill Inspector */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Table - 2 Cols */}
        <div className="lg:col-span-2 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Skill Verification Dockets</h2>
              <p className="text-xs text-stone-500">Select any row to inspect complete verifiable audit evidence.</p>
            </div>
            <span className="text-xs font-mono text-stone-500">{evidenceList.length} Dockets</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-200 bg-[#FAF8F5] text-stone-600">
                <tr>
                  <th className="p-3 font-semibold">Skill Name</th>
                  <th className="p-3 font-semibold">Self Claim / Est</th>
                  <th className="p-3 font-semibold">GitHub Commits</th>
                  <th className="p-3 font-semibold">Diagnostic</th>
                  <th className="p-3 font-semibold">Confidence</th>
                  <th className="p-3 font-semibold">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {evidenceList.map((item) => {
                  const isSelected = selectedEvidence.skill === item.skill;
                  return (
                    <tr
                      key={item.skill}
                      onClick={() => setSelectedEvidence(item)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-sky-50/60 font-semibold' : 'hover:bg-stone-50'
                      }`}
                    >
                      <td className="p-3 font-bold text-slate-900">{item.skill}</td>
                      <td className="p-3 text-stone-600">
                        {item.claim} <span className="text-[10px] text-stone-400">/ {item.estimate}</span>
                      </td>
                      <td className="p-3 text-stone-600">{item.github}</td>
                      <td className="p-3 text-stone-600">{item.assessment}%</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{item.confidence}%</span>
                          <div className="w-12 h-1.5 rounded-full bg-stone-100 overflow-hidden">
                            <div className="h-full bg-sky-600" style={{ width: `${item.confidence}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold border ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Skill Verification Docket - 1 Col */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                  VERIFICATION DOCKET
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedEvidence.skill}</h3>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold border ${getStatusBadge(
                  selectedEvidence.status
                )}`}
              >
                {selectedEvidence.status}
              </span>
            </div>

            {/* AUDIT EVIDENCE LOG */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                EVIDENCE LOG
              </span>
              <div className="space-y-2 text-xs text-stone-600 bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Assessment Score:</span>
                  <span className="font-bold text-slate-900">{selectedEvidence.assessment}% Proctored</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">GitHub Repository:</span>
                  <span className="font-mono text-sky-700">{selectedEvidence.github}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Project Deliverable:</span>
                  <span className="font-medium text-slate-800">Verified Capstone</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Certificate ID:</span>
                  <span className="font-mono text-stone-500">SKA-2026-9482</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Audit Date:</span>
                  <span className="text-stone-500">September 2026</span>
                </div>
              </div>
            </div>

            {/* RATIONALE & RECOMMENDATIONS */}
            <div className="space-y-3 text-xs leading-relaxed text-stone-600">
              <div>
                <span className="text-[11px] font-bold text-slate-800 block mb-1">
                  Evaluation Rationale:
                </span>
                <p className="bg-white p-3 rounded-lg border border-stone-200">
                  {selectedEvidence.reason}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-800 block mb-1">
                  ACTIONABLE RECOMMENDATION:
                </span>
                <p className="bg-sky-50 p-3 rounded-lg border border-sky-200 text-sky-950 font-medium">
                  {selectedEvidence.action}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onNavigateToCodingAssessment}
              className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs cursor-pointer"
            >
              Verify via Code Sandbox
            </button>
          </div>

          {/* Anomaly Signal */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-amber-600" />
              <h4 className="text-xs font-bold text-amber-900">Evidence Audit Notice</h4>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>AWS Proficiency Signal:</strong> Advanced claim exceeds current code repo commits. Re-taking the isolated Cloud Assessment will elevate this docket to fully Verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
