import React, { useState } from 'react';
import { BookOpen, Users, Clock, ArrowRight, CheckCircle2, Play, Sparkles } from 'lucide-react';
import { trainingProgramsList } from '../../data/platformData';
import { TrainingProgram } from '../../types';

interface TrainingInterventionsViewProps {
  onNavigateToReassessment: () => void;
}

export const TrainingInterventionsView: React.FC<TrainingInterventionsViewProps> = ({
  onNavigateToReassessment,
}) => {
  const [activePrograms, setActivePrograms] = useState<string[]>(['prog-1']);

  const toggleProgramActive = (id: string) => {
    setActivePrograms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <BookOpen className="size-3.5" />
            <span>Targeted Cohort Interventions</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Skills Training & Remediation Catalog
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Structured short-burst curricula engineered to close identified workforce capability deficits.
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToReassessment}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs transition"
        >
          <span>Simulate Post-Intervention Impact</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      {/* Program Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {trainingProgramsList.map((prog) => {
          const isActive = activePrograms.includes(prog.id);
          return (
            <div
              key={prog.id}
              className={`flex flex-col justify-between rounded-xl border p-5 shadow-xs transition ${
                isActive ? 'border-indigo-300 bg-white ring-2 ring-indigo-500/20' : 'border-slate-200 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-600">{prog.skill}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isActive ? 'Cohort Active' : 'Planned'}
                  </span>
                </div>

                <h2 className="mt-2.5 text-base font-bold text-slate-900">{prog.name}</h2>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Targeted remediation focusing on core industry benchmarks, containerized labs, and capstone review.
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Duration</span>
                    <strong className="text-slate-800">{prog.duration}</strong>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Cohort Size</span>
                    <strong className="text-slate-800">{prog.affected}</strong>
                  </div>
                  <div className="rounded-lg bg-emerald-50/70 p-2 border border-emerald-100">
                    <span className="text-[10px] text-emerald-600 block font-medium">Expected Gain</span>
                    <strong className="text-emerald-700 font-bold">+{prog.improvement} pts</strong>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => toggleProgramActive(prog.id)}
                  className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
                    isActive
                      ? 'border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isActive ? 'Pause Intervention' : 'Enroll Students'}
                </button>

                <button
                  type="button"
                  onClick={onNavigateToReassessment}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                  title="View simulated impact"
                >
                  <Sparkles className="size-4 text-indigo-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
