import React, { useState } from 'react';
import {
  Sliders,
  Shield,
  Activity,
  Database,
  Cpu,
  RefreshCw,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';

export const AdminSystemControl: React.FC = () => {
  const [demandWeight, setDemandWeight] = useState<number>(55);
  const [growthWeight, setGrowthWeight] = useState<number>(25);
  const [gapWeight, setGapWeight] = useState<number>(20);
  const [verificationThreshold, setVerificationThreshold] = useState<number>(75);
  const [activeModel, setActiveModel] = useState<string>('gemini-2.5-flash');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSaveWeights = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <Sliders className="size-3.5" />
            <span>Platform Governance & Algorithm Controls</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            System Administration & Control
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure scoring weight equations, verification parameters, and backend AI model bindings.
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs font-bold inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>All Services Operational</span>
        </span>
      </div>

      {/* 4 Health Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Scoring Engine Latency</span>
          <p className="mt-2 text-3xl font-bold text-slate-900">38 ms</p>
          <div className="mt-1 text-xs text-slate-500">Deterministic local compute</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">AI Proxy Reliability</span>
          <p className="mt-2 text-3xl font-bold text-indigo-600">99.98%</p>
          <div className="mt-1 text-xs text-emerald-600 font-semibold">Gemini 2.5 Flash operational</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Telemetry Log Volume</span>
          <p className="mt-2 text-3xl font-bold text-slate-900">14,280</p>
          <div className="mt-1 text-xs text-slate-500">Events processed today</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Anomalies Detected</span>
          <p className="mt-2 text-3xl font-bold text-emerald-600">0</p>
          <div className="mt-1 text-xs text-slate-500">No fraudulent claims active</div>
        </div>
      </div>

      {/* Algorithm Tuning Panel */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Future Skill Priority Weight Formula</h2>
            <p className="text-xs text-slate-500">
              Future Priority Index = (Demand × W1) + (Growth × W2) + (Curriculum Gap × W3)
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-600">
            Total Weight: {demandWeight + growthWeight + gapWeight}%
          </span>
        </div>

        <form onSubmit={handleSaveWeights} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 block">
                Market Demand Weight: {demandWeight}%
              </label>
              <input
                type="range"
                min="20"
                max="80"
                value={demandWeight}
                onChange={(e) => setDemandWeight(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 block">
                Growth Trend Weight: {growthWeight}%
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={growthWeight}
                onChange={(e) => setGrowthWeight(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 block">
                Curriculum Gap Weight: {gapWeight}%
              </label>
              <input
                type="range"
                min="10"
                max="40"
                value={gapWeight}
                onChange={(e) => setGapWeight(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Changes propagate to both Student and Institution insight modules immediately.
            </span>
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 shadow-xs transition"
            >
              Update Weights
            </button>
          </div>

          {savedSuccess && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 font-semibold flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600" />
              <span>Scoring formula weights updated successfully across all platform services.</span>
            </div>
          )}
        </form>
      </div>

      {/* Model & Security Audit Settings */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Model Binding */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <Sparkles className="size-4" />
            <span>AI Inference Gateway</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">Configured Foundation Model</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            All resume parsing and career advisory workflows execute server-side through our Express gateway, keeping API keys securely encapsulated.
          </p>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs space-y-2 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Active Alias:</span>
              <span className="font-bold text-indigo-700">gemini-2.5-flash</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Gateway Path:</span>
              <span className="text-slate-800">/api/ai/*</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Deterministic Fallback:</span>
              <span className="text-emerald-700 font-bold">Enabled (Zero-Downtime)</span>
            </div>
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <Lock className="size-4" />
            <span>Privacy & Compliance Audit</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">FERPA & Candidate Consent Compliance</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            All candidate verification evidence is subject to student explicit opt-in before being displayed on hiring
            partner sourcing dockets.
          </p>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Student Opt-in Rate:</span>
              <strong className="text-slate-900">94.2%</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Anonymized Mode:</span>
              <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                Active on External Inquiries
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Audit Checksum:</span>
              <span className="font-mono text-[10px] text-slate-500">SHA-256 Validated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
