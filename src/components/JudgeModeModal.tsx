import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Compass,
  BarChart3,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { judgePresentationSteps } from '../data/platformData';
import { JudgeStep, Role } from '../types';

interface JudgeModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToModule: (role: Role, page: string) => void;
  onResetDemo?: () => void;
}

export const JudgeModeModal: React.FC<JudgeModeModalProps> = ({
  isOpen,
  onClose,
  onJumpToModule,
  onResetDemo,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentStep: JudgeStep = judgePresentationSteps[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === judgePresentationSteps.length - 1;

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return AlertTriangle;
      case 1:
        return Compass;
      case 2:
        return Sparkles;
      case 3:
        return BarChart3;
      case 4:
        return ShieldCheck;
      case 5:
        return TrendingUp;
      default:
        return Award;
    }
  };

  const StepIcon = getStepIcon(currentStepIndex);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-slate-900 text-amber-400 shadow-xs">
              <Award className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                  Smart India Hackathon Walkthrough
                </span>
                <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
                  Judge Mode Active
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                SkillAlign Evaluation Journey
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Step Progress Pills */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 bg-[#FAF8F5] p-2 rounded-xl border border-stone-200">
          {judgePresentationSteps.map((step, idx) => (
            <button
              key={step.stepNumber}
              type="button"
              onClick={() => setCurrentStepIndex(idx)}
              className={`flex flex-col items-center py-2 px-1 rounded-lg text-center transition cursor-pointer ${
                currentStepIndex === idx
                  ? 'bg-slate-900 text-white shadow-xs'
                  : idx < currentStepIndex
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-stone-500 hover:bg-stone-100'
              }`}
            >
              <span className="text-[10px] font-bold font-mono">#{step.stepNumber}</span>
              <span className="text-[9px] truncate max-w-[70px] hidden sm:block">
                {step.title.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Step Content Presentation Body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.stepNumber}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                  Step {currentStep.stepNumber} of {judgePresentationSteps.length}: {currentStep.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-900">{currentStep.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                  {currentStep.problemDescription || currentStep.problemStatement}
                </p>
              </div>

              <div className="p-3 bg-sky-50 text-sky-700 rounded-xl border border-sky-200">
                <StepIcon className="size-6" />
              </div>
            </div>

            {/* Solution Highlights */}
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Platform Innovation & Engineering Solution:
              </span>
              <ul className="grid gap-2 sm:grid-cols-2 text-xs text-slate-700">
                {(currentStep.highlights || [
                  currentStep.solutionImpact,
                  'Real-time multi-vector alignment engine with zero hallucination',
                  'Actionable next step with concrete project and verification path',
                ]).map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Metrics Row */}
            <div className="grid gap-3 sm:grid-cols-2">
              {currentStep.metrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-stone-200 bg-white p-4 flex items-center justify-between shadow-2xs"
                >
                  <span className="text-xs font-medium text-stone-600">{m.label}</span>
                  <span className="text-sm font-bold text-slate-900">{m.value}</span>
                </div>
              ))}
            </div>

            {/* Action Bar: Interactive Test Jump */}
            {(currentStep.interactiveDemoTarget || currentStep.demoJumpRoute) && (
              <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-sky-900">
                  <span className="font-bold">Live Prototype Validation:</span>{' '}
                  <span>Test this step directly inside the active platform module.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    const role = currentStep.interactiveDemoTarget?.role || currentStep.demoJumpRole || 'Student';
                    const page = currentStep.interactiveDemoTarget?.page || currentStep.demoJumpRoute || 'dashboard';
                    onJumpToModule(role, page);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition cursor-pointer"
                >
                  <span>Open Live Module</span>
                  <ExternalLink className="size-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isFirst}
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-stone-50 disabled:opacity-40 transition cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
              <span>Previous</span>
            </button>
            {onResetDemo && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset demo state and restart evaluation journey?')) {
                    onResetDemo();
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 transition cursor-pointer"
              >
                <span>Reset Demo</span>
              </button>
            )}
          </div>

          <span className="text-xs text-stone-500 font-medium">
            Step {currentStepIndex + 1} of {judgePresentationSteps.length}
          </span>

          <button
            type="button"
            disabled={isLast}
            onClick={() => setCurrentStepIndex((prev) => Math.min(judgePresentationSteps.length - 1, prev + 1))}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
          >
            <span>Next Step</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
