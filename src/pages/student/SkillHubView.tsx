import React, { useState } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  ClipboardCheck,
  BookOpen,
  Calendar,
  Layers,
} from 'lucide-react';
import { LearnerProfile, Level, LearningStatus, ProjectStatus } from '../../types';
import { curatedResourcesList, requirementsForRole, scoreForLearner, technicalSkillsList } from '../../data/platformData';

interface SkillHubViewProps {
  learner: LearnerProfile;
  initialSkill?: string;
  learningStatuses: Record<string, LearningStatus>;
  onUpdateLearning: (skill: string, status: LearningStatus) => void;
  practiceStatuses: Record<string, LearningStatus>;
  onUpdatePractice: (task: string, status: LearningStatus) => void;
  planStatuses: Record<string, LearningStatus>;
  onUpdatePlan: (task: string, status: LearningStatus) => void;
  assessmentSkills: string[];
  onRecordAssessment: (skill: string) => void;
  onStartProject: (skill: string) => void;
  projectStarted: boolean;
  onBack: () => void;
}

type PlanDuration = '7 Days' | '14 Days' | '30 Days';

export const SkillHubView: React.FC<SkillHubViewProps> = ({
  learner,
  initialSkill = 'Machine Learning',
  learningStatuses,
  onUpdateLearning,
  practiceStatuses,
  onUpdatePractice,
  planStatuses,
  onUpdatePlan,
  assessmentSkills,
  onRecordAssessment,
  onStartProject,
  projectStarted,
  onBack,
}) => {
  const [activeSkill, setActiveSkill] = useState<string>(initialSkill || 'Machine Learning');
  const [planLength, setPlanLength] = useState<PlanDuration>('7 Days');
  const [externalMessage, setExternalMessage] = useState<string>('');
  const [assessmentStep, setAssessmentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [assessmentCompleted, setAssessmentCompleted] = useState<boolean>(assessmentSkills.includes(activeSkill));

  const role = requirementsForRole(learner.targetRole);
  const requirement =
    role.requirements.find((r) => r.skill === activeSkill) || {
      skill: activeSkill,
      importance: 'Important' as const,
      weight: 1.0,
      level: 'Intermediate' as Level,
    };

  const currentLevel = learner.skills[activeSkill] || 'Not added';
  const beforeScore = scoreForLearner(learner, role);
  const hypotheticalLearner = {
    ...learner,
    skills: {
      ...learner.skills,
      [activeSkill]: requirement.level,
    },
  };
  const projectedScore = scoreForLearner(hypotheticalLearner, role);

  const practiceTasks = [
    `Complete guided fundamentals and syntax for ${activeSkill}`,
    `Run hands-on benchmark pipeline with sample dataset`,
    `Build an applied mini-module demonstrating ${activeSkill}`,
    `Document error-handling and write test specifications`,
  ];

  const getPlanItems = (skill: string, duration: PlanDuration) => {
    const base = [
      `Day 1-2: Core foundations & environment setup for ${skill}`,
      `Day 3-4: Applied exercise with guided test cases`,
      `Day 5: Real-world mini-task implementation`,
      `Day 6: Code review & edge-case testing`,
      `Day 7: Milestone assessment & documentation`,
    ];
    if (duration === '7 Days') return base;
    if (duration === '14 Days') {
      return [
        ...base,
        `Day 8-9: Multi-module integration & data pipeline`,
        `Day 10-11: Performance profiling & caching optimization`,
        `Day 12-13: Production deployment & container configuration`,
        `Day 14: Portfolio case study & peer review`,
      ];
    }
    return [
      ...base,
      `Week 2: Advanced architectural patterns & scalability`,
      `Week 3: End-to-end industry project build`,
      `Week 4: Final verification assessment & employer portfolio packaging`,
    ];
  };

  const planTasks = getPlanItems(activeSkill, planLength);
  const practiceCompletedCount = practiceTasks.filter((t) => practiceStatuses[t] === 'Completed').length;
  const planCompletedCount = planTasks.filter((t) => planStatuses[t] === 'Completed').length;

  const resources = curatedResourcesList[activeSkill] || curatedResourcesList['Machine Learning'];

  const handleOpenLink = (url: string) => {
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
      setExternalMessage(`Opened trusted resource in a new tab: ${url}`);
      setTimeout(() => setExternalMessage(''), 4000);
    } catch {
      setExternalMessage('Could not open external link.');
    }
  };

  // 5 interactive assessment questions for the skill
  const quizQuestions = [
    {
      q: `What is the primary evaluation objective when deploying ${activeSkill} in a production environment?`,
      options: [
        'Ensuring reproducibility, low latency, and validation on unseen data',
        'Minimizing code readability in favor of compressed execution',
        'Overfitting to training samples for 100% historical accuracy',
        'Bypassing unit tests to maximize deployment frequency',
      ],
      correct: 0,
    },
    {
      q: 'Which technique best prevents data leakage during model or pipeline training?',
      options: [
        'Fitting feature scalers and transformers exclusively on the training split',
        'Calculating mean and variance over the full combined dataset before split',
        'Evaluating model metrics on the training partition only',
        'Increasing batch size until variance reaches zero',
      ],
      correct: 0,
    },
    {
      q: 'When scaling a technical workflow, what provides the most predictable modularity?',
      options: [
        'Clear interface abstractions, containerized dependencies, and automated testing',
        'Hardcoding network credentials and file paths inside functions',
        'Running all computational steps in a single unstructured file',
        'Ignoring resource utilization metrics during peak traffic',
      ],
      correct: 0,
    },
    {
      q: 'How does cross-validation help assess generalization capability?',
      options: [
        'By testing performance across multiple independent partition folds',
        'By caching weights to prevent runtime recalculation',
        'By discarding outlier rows automatically without inspection',
        'By encrypting data payloads during inference requests',
      ],
      correct: 0,
    },
    {
      q: 'What is the most critical artifact for proving practical capability to hiring employers?',
      options: [
        'A documented, runnable portfolio repository with tests, architecture docs, and clear outcomes',
        'A list of courses watched without practical code repositories',
        'A screenshot of high benchmark numbers without verifiable source code',
        'A generic declaration of expert proficiency on a resume',
      ],
      correct: 0,
    },
  ];

  const handleSelectQuizAnswer = (qIndex: number, optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [qIndex]: optionIndex });
  };

  const handleFinishQuiz = () => {
    onRecordAssessment(activeSkill);
    setAssessmentCompleted(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            <BookOpen className="size-3.5" />
            <span>Personalized Action Plan</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            AI Skill Improvement Hub
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            A practical pathway to build verified proficiency in <strong className="text-slate-800">{activeSkill}</strong> for{' '}
            {role.name}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Skill Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600">Select Skill:</label>
            <select
              value={activeSkill}
              onChange={(e) => {
                setActiveSkill(e.target.value);
                setAssessmentCompleted(assessmentSkills.includes(e.target.value));
                setAssessmentStep(0);
                setSelectedAnswers({});
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-xs focus:border-indigo-500 focus:outline-hidden"
            >
              {technicalSkillsList.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Analysis</span>
          </button>
        </div>
      </div>

      {externalMessage && (
        <div className="rounded-lg border border-indigo-200 bg-indigo-50/70 p-3 text-xs text-indigo-800 font-medium">
          {externalMessage}
        </div>
      )}

      {/* 4 Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Target Skill</span>
          <p className="mt-1 text-xl font-bold text-slate-900">{activeSkill}</p>
          <span className="text-[11px] text-indigo-600 font-semibold mt-0.5 block">{role.name} Track</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Current Level</span>
          <p className="mt-1 text-xl font-bold text-slate-900">{currentLevel}</p>
          <span className="text-[11px] text-slate-500 block">From verified profile</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Required Role Level</span>
          <p className="mt-1 text-xl font-bold text-indigo-700">{requirement.level}</p>
          <span className="text-[11px] text-slate-500 block">{requirement.importance} ({requirement.weight}x)</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Readiness Gain</span>
          <p className="mt-1 text-xl font-bold text-emerald-600">
            +{Math.max(0, projectedScore - beforeScore)} pts
          </p>
          <span className="text-[11px] text-slate-500 block">Upon full milestone completion</span>
        </div>
      </div>

      {/* Why Skill Matters & Readiness Projection */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Why this skill matters</h2>
            <p className="text-xs text-slate-500">
              Connected to your saved role target: <strong className="text-slate-800">{role.name}</strong>
            </p>
          </div>
          <p className="text-xs leading-relaxed text-slate-600">
            <strong className="text-slate-900">{activeSkill}</strong> is evaluated as a{' '}
            <strong className="text-slate-900">{requirement.importance.toLowerCase()} capability</strong> for{' '}
            {role.name}. Your verified profile is currently at the <strong>{currentLevel}</strong> tier. Adding this
            competency to your active learning path allows progress to be tracked and proven to employers.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onUpdateLearning(activeSkill, learningStatuses[activeSkill] ? 'Completed' : 'In Progress')}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 shadow-xs transition"
            >
              <GraduationCap className="size-4" />
              <span>
                {learningStatuses[activeSkill] === 'Completed'
                  ? 'Completed in Learning Path'
                  : learningStatuses[activeSkill]
                  ? 'In Progress in Learning Path'
                  : 'Add to Learning Path'}
              </span>
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-6 shadow-xs space-y-4">
          <div className="border-b border-indigo-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Readiness Projection</h2>
            <p className="text-xs text-slate-500">Objective simulation of completed capability</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-500 font-medium">Before Training</span>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{beforeScore}%</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">If Completed</span>
              <p className="text-3xl font-extrabold text-indigo-700 mt-1">{projectedScore}%</p>
            </div>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden mt-3">
            <div className="h-full rounded-full bg-indigo-600" style={{ width: `${projectedScore}%` }} />
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Projection uses the official weighted formula. Evidence and hands-on validation remain required for employer verification.
          </p>
        </div>
      </div>

      {/* Verified Live External Resources */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Curated Free & Verified Resources</h2>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
              Verified Links
            </span>
          </div>
          <span className="text-xs text-slate-500">Official developer courses & documentation</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((res) => (
            <div
              key={res.title}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-indigo-300 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                    {res.type}
                  </span>
                  <span className="text-[11px] text-slate-400">{res.duration}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-2.5">{res.title}</h3>
                <p className="text-[11px] font-medium text-indigo-600 mt-0.5">{res.provider} • {res.difficulty}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{res.description}</p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenLink(res.url)}
                className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition"
              >
                <span>{res.button}</span>
                <ExternalLink className="size-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Tasks & Portfolio Project Planner */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Practice Tasks */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Hands-on Practice Checklist</h2>
              <p className="text-xs text-slate-500">
                {practiceCompletedCount} of {practiceTasks.length} milestones complete
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              Guided Tasks
            </span>
          </div>

          <div className="space-y-3">
            {practiceTasks.map((task, index) => {
              const status = practiceStatuses[task] || 'Not Started';
              return (
                <div
                  key={task}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-6 place-items-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-700">
                      {index + 1}
                    </span>
                    <span className="font-medium text-slate-800">{task}</span>
                  </div>
                  <select
                    value={status}
                    onChange={(e) => onUpdatePractice(task, e.target.value as LearningStatus)}
                    className={`rounded-md border px-2 py-1 text-[11px] font-semibold focus:outline-hidden ${
                      status === 'Completed'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : status === 'In Progress'
                        ? 'border-indigo-200 bg-indigo-50 text-indigo-800'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              );
            })}
          </div>
        </div>

        {/* Portfolio Project */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Build Applied Portfolio Proof</h2>
              <p className="text-xs text-slate-500">Turn learning into verifiable recruiter evidence</p>
            </div>
            <Lightbulb className="size-5 text-amber-500" />
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
            <div>
              <span className="rounded-sm bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800 uppercase tracking-wider">
                Recommended Artifact
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                {activeSkill === 'Machine Learning'
                  ? 'Student Churn & Placement Prediction System'
                  : `${activeSkill} Production Portfolio Project`}
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Demonstrate applied competence with clean architecture, data transformation pipelines, automated test
              suites, and structured documentation on GitHub.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                Tech: {activeSkill}, Python, Git
              </span>
              <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                Duration: 3 weeks
              </span>
              <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                Evidence: Recruiter-Grade
              </span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onStartProject(activeSkill)}
                className={`w-full rounded-lg py-2 text-xs font-bold transition ${
                  projectStarted
                    ? 'border border-emerald-300 bg-emerald-50 text-emerald-800'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {projectStarted ? '✓ Project Active in Portfolio' : 'Start Portfolio Project'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Day-by-Day Plan */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Personalized Improvement Timeline</h2>
            <p className="text-xs text-slate-500">
              {planCompletedCount} of {planTasks.length} milestones complete
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
            {(['7 Days', '14 Days', '30 Days'] as PlanDuration[]).map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={() => setPlanLength(dur)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  planLength === dur ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {dur}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          {planTasks.map((task, idx) => {
            const status = planStatuses[task] || 'Not Started';
            return (
              <div
                key={task}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-700">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-slate-800">{task}</span>
                </div>
                <select
                  value={status}
                  onChange={(e) => onUpdatePlan(task, e.target.value as LearningStatus)}
                  className={`rounded-md border px-2 py-1 text-[11px] font-semibold focus:outline-hidden ${
                    status === 'Completed'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : status === 'In Progress'
                      ? 'border-indigo-200 bg-indigo-50 text-indigo-800'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5-Question Interactive Skill Assessment */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="size-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">5-Question Capability Assessment</h2>
          </div>
          <span className="text-xs text-slate-500">Self-paced technical evaluation</span>
        </div>

        {assessmentCompleted ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 text-xs text-emerald-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="size-5 text-emerald-600" />
              <span>Assessment Completed & Verified</span>
            </div>
            <p>
              Your competency score for <strong>{activeSkill}</strong> has been logged in your candidate profile.
              Assessment evidence has been updated and factored into employer candidate search.
            </p>
            <button
              type="button"
              onClick={() => {
                setAssessmentCompleted(false);
                setAssessmentStep(0);
                setSelectedAnswers({});
              }}
              className="mt-2 text-xs font-semibold text-emerald-800 underline"
            >
              Retake Assessment
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>
                Question {assessmentStep + 1} of {quizQuestions.length}
              </span>
              <span>
                Answered: {Object.keys(selectedAnswers).length} / {quizQuestions.length}
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <p className="text-sm font-bold text-slate-900 mb-3">
                {quizQuestions[assessmentStep].q}
              </p>
              <div className="space-y-2">
                {quizQuestions[assessmentStep].options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[assessmentStep] === optIdx;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSelectQuizAnswer(assessmentStep, optIdx)}
                      className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left text-xs transition ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className={`size-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <span className="size-1.5 rounded-full bg-white" />}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                disabled={assessmentStep === 0}
                onClick={() => setAssessmentStep((s) => s - 1)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-40"
              >
                Previous Question
              </button>

              {assessmentStep < quizQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setAssessmentStep((s) => s + 1)}
                  className="rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  Next Question
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinishQuiz}
                  className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
                >
                  Submit & Log Evidence
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
