import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  ArrowRight,
  ShieldAlert,
  Compass,
} from 'lucide-react';

interface WhatIfSimulatorProps {
  currentRoleName: string;
  baseRoleFit: number;
}

interface LearnableSkill {
  name: string;
  category: string;
  boost: number;
  weeksToLearn: number;
  why: string;
}

const availableSkillsToLearn: LearnableSkill[] = [
  {
    name: 'Docker & Containerization',
    category: 'DevOps / Cloud',
    boost: 7,
    weeksToLearn: 2,
    why: 'Resolves critical deployment gap required by 86% of target roles.',
  },
  {
    name: 'Cloud Infrastructure (AWS/GCP)',
    category: 'Cloud Architecture',
    boost: 6,
    weeksToLearn: 3,
    why: 'Enables scalable cloud data pipelines and model hosting.',
  },
  {
    name: 'FastAPI Production Serving',
    category: 'Backend Frameworks',
    boost: 4,
    weeksToLearn: 1,
    why: 'Converts offline models into production-ready microservice endpoints.',
  },
  {
    name: 'PyTorch Deep Learning',
    category: 'AI / Neural Nets',
    boost: 5,
    weeksToLearn: 3,
    why: 'Extends statistical ML into neural computer vision and NLP models.',
  },
  {
    name: 'Kubernetes Orchestration',
    category: 'DevOps',
    boost: 4,
    weeksToLearn: 2,
    why: 'Demonstrates multi-node container orchestration readiness.',
  },
  {
    name: 'Apache Spark / Big Data',
    category: 'Data Engineering',
    boost: 5,
    weeksToLearn: 2,
    why: 'Bridges data science with terabyte-scale distributed data processing.',
  },
];

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  currentRoleName,
  baseRoleFit,
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Docker & Containerization']);

  const toggleSkill = (skillName: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillName) ? prev.filter((s) => s !== skillName) : [...prev, skillName]
    );
  };

  const totalBoost = selectedSkills.reduce((acc, skillName) => {
    const found = availableSkillsToLearn.find((s) => s.name === skillName);
    return acc + (found ? found.boost : 0);
  }, 0);

  const projectedFit = Math.min(98, baseRoleFit + totalBoost);

  const totalWeeks = selectedSkills.reduce((acc, skillName) => {
    const found = availableSkillsToLearn.find((s) => s.name === skillName);
    return acc + (found ? found.weeksToLearn : 0);
  }, 0);

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800 mb-1">
            <Sparkles className="size-3.5 text-sky-600" />
            <span>Interactive Trajectory Modeler</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>WHAT IF? CAREER SIMULATOR</span>
          </h2>
          <p className="text-xs text-stone-500">
            Simulate how acquiring specific high-impact skills will mathematically increase your role alignment.
          </p>
        </div>

        {/* Mandatory Requirement 10 Disclaimer Badge */}
        <div className="rounded-xl border border-amber-300 bg-amber-50/80 px-3.5 py-2 text-right self-start sm:self-center">
          <span className="text-[10px] font-mono font-black text-amber-900 tracking-wider uppercase block">
            AI PROJECTION • NOT A HIRING GUARANTEE
          </span>
          <span className="text-[10px] text-amber-800">
            Simulated fit based on employer technical benchmark weights
          </span>
        </div>
      </div>

      {/* Comparison Projection Scoreboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
            Current Verified Fit
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">{baseRoleFit}%</span>
            <span className="text-xs font-bold text-stone-500 font-sans">for {currentRoleName}</span>
          </div>
          <span className="text-[10px] text-stone-500 block">Based on verified test + projects</span>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block">
            Projected Fit (+{totalBoost}%)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-sky-900 font-mono">{projectedFit}%</span>
            <span className="text-xs font-bold text-sky-700 font-sans">Target Benchmark</span>
          </div>
          <span className="text-[10px] text-sky-800 block">
            {selectedSkills.length} skill(s) simulated in learning path
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
            Estimated Sprint Time
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">{totalWeeks}</span>
            <span className="text-xs font-bold text-stone-600 font-sans">Weeks of Effort</span>
          </div>
          <span className="text-[10px] text-stone-500 block">At 10 hrs/week hands-on build</span>
        </div>
      </div>

      {/* Selectable Skill Chips */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Select Skills to Simulate Adding:
          </span>
          <span className="text-[11px] font-mono text-stone-500">
            Click to toggle skills in simulation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableSkillsToLearn.map((skill) => {
            const isSelected = selectedSkills.includes(skill.name);
            return (
              <button
                key={skill.name}
                type="button"
                onClick={() => toggleSkill(skill.name)}
                className={`text-left p-3.5 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'border-slate-900 bg-white ring-2 ring-slate-900/10 shadow-xs'
                    : 'border-stone-200 bg-[#FAF8F5] hover:border-stone-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">{skill.name}</span>
                    <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[9px] font-mono font-bold text-stone-600">
                      {skill.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug">{skill.why}</p>
                  <span className="text-[10px] font-mono text-stone-500 block pt-0.5">
                    ~{skill.weeksToLearn} weeks to build evidence docket
                  </span>
                </div>

                <div className="shrink-0 text-right">
                  <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-mono font-bold ${
                    isSelected ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {isSelected ? '✓ Selected' : `+${skill.boost}%`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
