import React, { useState, useEffect, useRef } from 'react';
import {
  Code2,
  Timer,
  Play,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Terminal,
  ShieldCheck,
  Cpu,
  Save,
  FileCheck2,
  Lock,
  Eye,
  Check,
  Layers,
} from 'lucide-react';
import { verificationQuestionsList } from '../../data/verificationQuestions';
import { VerificationCodingQuestion, QuestionExecutionResult, AssessmentEvaluationSummary } from '../../types';
import { evaluateQuestionAttempt, calculateAssessmentSummary } from '../../utils/testRunner';

interface VerificationTestViewProps {
  onTestSubmitted: (
    results: Record<number, QuestionExecutionResult>,
    summary: AssessmentEvaluationSummary
  ) => void;
}

const SUPPORTED_LANGUAGES = ['Python', 'SQL', 'JavaScript', 'Java'];

export const VerificationTestView: React.FC<VerificationTestViewProps> = ({
  onTestSubmitted,
}) => {
  // Pre-assessment AI generation animation state (Requirement 26)
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [initStep, setInitStep] = useState<number>(0);

  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedLang, setSelectedLang] = useState<string>('Python');
  const [codePerQuestion, setCodePerQuestion] = useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {};
    verificationQuestionsList.forEach((q) => {
      // Check localStorage for saved draft first
      const saved = localStorage.getItem(`skillalign_code_${q.id}`);
      if (saved) {
        initial[q.id] = saved;
      } else {
        initial[q.id] = q.starterCode.Python || Object.values(q.starterCode)[0] || '';
      }
    });
    return initial;
  });

  const [executionResults, setExecutionResults] = useState<Record<number, QuestionExecutionResult>>({});
  const [isRunningCode, setIsRunningCode] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<'problem' | 'testcases' | 'console'>('problem');

  // Autosave status state
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Real countdown timer: 60 minutes = 3600 seconds (Requirement 10 & 11)
  const [timeLeft, setTimeLeft] = useState<number>(3600);
  const [isTimeExpired, setIsTimeExpired] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Integrity Guard (Tab switch / blur detection) (Requirement 20)
  const [integrityEvents, setIntegrityEvents] = useState<number>(0);
  const [integrityWarning, setIntegrityWarning] = useState<string | null>(null);

  const currentQuestion = verificationQuestionsList[currentQIndex] || verificationQuestionsList[0];
  const activeCode = codePerQuestion[currentQuestion.id] || '';
  const currentResult = executionResults[currentQuestion.id];

  // AI Generation animation sequence on mount
  useEffect(() => {
    const steps = [
      'Analyzing verified claimed skills and technical competency profile...',
      'Synthesizing 10 personalized diagnostic problems across Data Science & Systems...',
      'Calibrating progressive difficulty tiers (Easy → Medium → Hard)...',
      'Configuring 50 test vectors with protected hidden verification suites...',
      'Provisioning isolated sandbox execution container...',
    ];

    const timer = setInterval(() => {
      setInitStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(timer);
  }, []);

  // Integrity Guard listener (Window blur & visibility change)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isTimeExpired && !isInitializing) {
        setIntegrityEvents((prev) => prev + 1);
        setIntegrityWarning('Tab switch detected. Assessment integrity event logged.');
        setTimeout(() => setIntegrityWarning(null), 5000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isTimeExpired, isInitializing]);

  // Timer countdown hook
  useEffect(() => {
    if (isInitializing) return;

    if (timeLeft <= 0) {
      if (!isTimeExpired) {
        setIsTimeExpired(true);
        handleAutoSubmitOnTimeExpire();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeExpired(true);
          handleAutoSubmitOnTimeExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTimeExpired, isInitializing]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    const starter = currentQuestion.starterCode[lang] || currentQuestion.starterCode.Python || '';
    // Only update if student hasn't typed significant custom code
    if (!activeCode || activeCode.trim().endsWith('pass') || activeCode.length < 50) {
      setCodePerQuestion((prev) => ({
        ...prev,
        [currentQuestion.id]: starter,
      }));
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isTimeExpired) return;
    const val = e.target.value;
    setCodePerQuestion((prev) => ({
      ...prev,
      [currentQuestion.id]: val,
    }));

    // Autosave trigger with debounce (Requirement 12)
    setSaveStatus('saving');
    if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
    autosaveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem(`skillalign_code_${currentQuestion.id}`, val);
      setSaveStatus('saved');
    }, 600);
  };

  const handleResetToTemplate = () => {
    const starter = currentQuestion.starterCode[selectedLang] || currentQuestion.starterCode.Python || '';
    setCodePerQuestion((prev) => ({
      ...prev,
      [currentQuestion.id]: starter,
    }));
    localStorage.removeItem(`skillalign_code_${currentQuestion.id}`);
    setSaveStatus('saved');
  };

  // Run Code logic: runs test cases through the transparent sandbox evaluation engine
  const handleRunCode = () => {
    if (isTimeExpired) return;
    setIsRunningCode(true);
    setCurrentTab('console');

    setTimeout(() => {
      const evalResult = evaluateQuestionAttempt(currentQuestion, activeCode, selectedLang);
      setExecutionResults((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          ...evalResult,
          isSubmitted: prev[currentQuestion.id]?.isSubmitted || false,
        },
      }));
      setIsRunningCode(false);
    }, 450);
  };

  // Submit Code for this single question and advance to next
  const handleSubmitSingleQuestion = () => {
    if (isTimeExpired) return;

    // Evaluate current code if not yet evaluated or if updated
    const evalResult = evaluateQuestionAttempt(currentQuestion, activeCode, selectedLang);
    setExecutionResults((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...evalResult,
        isSubmitted: true,
      },
    }));

    // Move to next question or show finish modal
    if (currentQIndex < verificationQuestionsList.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setShowSubmitModal(true);
    }
  };

  const handleAutoSubmitOnTimeExpire = () => {
    // Automatically submit all results when 00:00 is reached
    const finalResults = { ...executionResults };
    verificationQuestionsList.forEach((q) => {
      if (!finalResults[q.id]) {
        const code = codePerQuestion[q.id] || '';
        finalResults[q.id] = evaluateQuestionAttempt(q, code, 'Python');
      }
    });
    const summary = calculateAssessmentSummary(finalResults, verificationQuestionsList);
    onTestSubmitted(finalResults, summary);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    const finalResults = { ...executionResults };
    verificationQuestionsList.forEach((q) => {
      if (!finalResults[q.id]) {
        const code = codePerQuestion[q.id] || '';
        finalResults[q.id] = evaluateQuestionAttempt(q, code, 'Python');
      }
    });
    const summary = calculateAssessmentSummary(finalResults, verificationQuestionsList);
    onTestSubmitted(finalResults, summary);
  };

  // Calculate live total marks earned so far
  const resultsList = Object.values(executionResults) as QuestionExecutionResult[];
  const currentTotalMarks = resultsList.reduce((sum, r) => sum + (r.marks || 0), 0);
  const attemptedCount = resultsList.filter((r) => r.status !== 'not_attempted').length;

  const isUrgentTimer = timeLeft < 300; // < 5 minutes

  // ============================================================================
  // SCREEN 1: AI GENERATION / INITIALIZATION TRANSITION (Requirement 26)
  // ============================================================================
  if (isInitializing) {
    const steps = [
      'Analyzing verified claimed skills and technical competency profile',
      'Synthesizing 10 personalized diagnostic problems across Data Science & Systems',
      'Calibrating progressive difficulty tiers (Easy → Medium → Hard)',
      'Configuring 50 test vectors with protected hidden verification suites',
      'Provisioning isolated sandbox execution container',
    ];

    return (
      <div className="max-w-3xl mx-auto py-12 px-4 animate-in fade-in duration-300">
        <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-lg space-y-8">
          <div className="text-center space-y-3">
            <div className="size-14 rounded-2xl bg-slate-900 text-white grid place-items-center mx-auto shadow-md">
              <Sparkles className="size-7 text-sky-400 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Personalized Coding Assessment
            </h1>
            <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
              SkillAlign is preparing your isolated coding assessment directly calibrated to your claimed resume competencies.
            </p>
          </div>

          <div className="space-y-3.5 bg-stone-50/80 rounded-2xl p-6 border border-stone-200/80 font-mono text-xs">
            {steps.map((text, idx) => {
              const isDone = idx < initStep;
              const isCurrent = idx === initStep;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 transition-opacity duration-300 ${
                    idx > initStep ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  {isDone ? (
                    <div className="size-5 rounded-full bg-emerald-500 text-white grid place-items-center shrink-0">
                      <Check className="size-3.5" />
                    </div>
                  ) : isCurrent ? (
                    <div className="size-5 rounded-full bg-sky-600 text-white grid place-items-center shrink-0 animate-pulse">
                      <span className="size-2 bg-white rounded-full" />
                    </div>
                  ) : (
                    <div className="size-5 rounded-full bg-stone-300 shrink-0" />
                  )}
                  <span
                    className={`${
                      isDone
                        ? 'text-slate-900 font-semibold'
                        : isCurrent
                        ? 'text-sky-700 font-bold'
                        : 'text-stone-500'
                    }`}
                  >
                    {text}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-100 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-600" />
              <span>100 Marks (10 Problems × 10 Marks) • 60 Minutes</span>
            </div>

            <button
              type="button"
              onClick={() => setIsInitializing(false)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 shadow-md transition cursor-pointer"
            >
              <span>{initStep >= steps.length - 1 ? 'Start Assessment' : 'Skip Intro & Enter Sandbox'}</span>
              <ChevronRight className="size-4 text-sky-400" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // SCREEN 2: ACTIVE 10-PROBLEM VERIFICATION SANDBOX
  // ============================================================================
  return (
    <div className="max-w-7xl mx-auto py-3 space-y-4">
      {/* Integrity Warning Alert (if student switched tabs) */}
      {integrityWarning && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 flex items-center justify-between gap-3 text-amber-900 text-xs animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-amber-600 shrink-0" />
            <span className="font-semibold">{integrityWarning}</span>
          </div>
          <span className="font-mono text-[11px] bg-amber-200/70 px-2 py-0.5 rounded-md">
            Events: {integrityEvents}
          </span>
        </div>
      )}

      {/* Top Banner Bar */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-slate-900 text-white grid place-items-center font-black shadow-xs">
            <Code2 className="size-5 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-sm font-bold text-slate-900">
                SKILLALIGN TECHNICAL VERIFICATION ASSESSMENT
              </h1>
              <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-mono text-stone-700 font-bold">
                10 Problems • 100 Marks
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                <Cpu className="size-3" />
                <span>Isolated Sandbox: 512MB RAM • 2.0s</span>
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Diagnostic verification calibrated to claimed competencies. Each question = 10 marks.
            </p>
          </div>
        </div>

        {/* Real Countdown Timer & Finish Button */}
        <div className="flex items-center gap-3">
          {/* Integrity Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 text-[11px] font-mono text-stone-600">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            <span>Integrity: {integrityEvents === 0 ? 'Clean' : `${integrityEvents} Event(s)`}</span>
          </div>

          {/* Countdown Timer */}
          <div
            className={`flex items-center gap-2 rounded-xl px-4 py-2 border transition-all ${
              isUrgentTimer
                ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse font-black'
                : 'bg-stone-50 border-stone-200 text-slate-900 font-bold'
            }`}
          >
            <Timer className={`size-4 ${isUrgentTimer ? 'text-rose-600' : 'text-stone-600'}`} />
            <div className="text-right">
              <span className="block text-[9px] uppercase font-mono tracking-wider opacity-70">
                TIME REMAINING
              </span>
              <span className="text-base font-mono tracking-tight">
                {formatTimer(timeLeft)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowSubmitModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs cursor-pointer"
          >
            <Send className="size-3.5 text-sky-400" />
            <span>Finish Assessment</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Question Nav + Right Code/Problem Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: 10-Question Navigator */}
        <div className="lg:col-span-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-xs space-y-4 h-fit">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Question Navigator
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-900">
              {currentTotalMarks} / 100 Marks
            </span>
          </div>

          {/* 10 Question Pills */}
          <div className="grid grid-cols-5 lg:grid-cols-1 gap-2">
            {verificationQuestionsList.map((q, idx) => {
              const res = executionResults[q.id];
              const isActive = idx === currentQIndex;
              const isFullyExecuted = res?.status === 'fully_executed';
              const isPartiallyExecuted = res?.status === 'partially_executed';
              const isWrong = res?.status === 'wrong_answer' || res?.status === 'syntax_error';
              const isAttempted = !!res && res.status !== 'not_attempted';

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentQIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition cursor-pointer text-left ${
                    isActive
                      ? 'border-slate-900 bg-stone-50 ring-1 ring-slate-900 text-slate-900 font-bold'
                      : isFullyExecuted
                      ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
                      : isPartiallyExecuted
                      ? 'border-amber-200 bg-amber-50/70 text-amber-900'
                      : isWrong
                      ? 'border-rose-200 bg-rose-50/70 text-rose-900'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[11px] font-bold text-stone-400">
                      Q{idx + 1}.
                    </span>
                    <span className="truncate text-[11px] font-semibold">
                      {q.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {res && res.status !== 'not_attempted' ? (
                      <span className="font-mono text-[10px] font-bold">
                        {res.marks}/10
                      </span>
                    ) : null}

                    {isFullyExecuted ? (
                      <span className="text-emerald-600 font-bold">✓</span>
                    ) : isPartiallyExecuted ? (
                      <span className="text-amber-600 font-bold">◐</span>
                    ) : isWrong ? (
                      <span className="text-rose-600 font-bold">✕</span>
                    ) : isActive ? (
                      <span className="size-2 rounded-full bg-slate-900 inline-block" />
                    ) : (
                      <span className="size-2 rounded-full bg-stone-200 inline-block" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Score Legend & Summary */}
          <div className="pt-3 border-t border-stone-100 text-[10px] text-stone-500 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-slate-700 pb-1">
              <span>Attempted: {attemptedCount} of 10</span>
              <span>Total: {currentTotalMarks}/100</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Fully Executed (10/10 marks • 5/5 tests)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-600 font-bold">◐</span>
              <span>Partially Executed (1–9 marks)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-stone-200 inline-block" />
              <span>Not Attempted (0/10 marks)</span>
            </div>
          </div>
        </div>

        {/* Center/Right Column: Problem & Code Workspace */}
        <div className="lg:col-span-9 space-y-4">
          {/* Question Title & Language Bar */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-mono font-bold text-stone-700">
                    Question {currentQIndex + 1} of {verificationQuestionsList.length}
                  </span>
                  <span className="rounded-md bg-sky-50 border border-sky-200 px-2 py-0.5 text-[10px] font-bold text-sky-800">
                    {currentQuestion.category}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      currentQuestion.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : currentQuestion.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {currentQuestion.difficulty}
                  </span>
                  <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-mono text-stone-600">
                    Max: 10 Marks
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {currentQuestion.title}
                </h2>
                {currentQuestion.skills && (
                  <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                    <span className="text-[10px] font-semibold text-stone-400">Evaluates:</span>
                    {currentQuestion.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-mono text-stone-600"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-500">Language:</span>
                <select
                  value={selectedLang}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="rounded-xl border border-stone-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Problem Subtabs */}
            <div className="flex items-center gap-2 border-b border-stone-100 pt-2 text-xs">
              <button
                type="button"
                onClick={() => setCurrentTab('problem')}
                className={`pb-2 px-3 font-bold border-b-2 transition cursor-pointer ${
                  currentTab === 'problem'
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-stone-500 hover:text-slate-800'
                }`}
              >
                Problem Description
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('testcases')}
                className={`pb-2 px-3 font-bold border-b-2 transition cursor-pointer ${
                  currentTab === 'testcases'
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-stone-500 hover:text-slate-800'
                }`}
              >
                Test Cases (5 Vectors)
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('console')}
                className={`pb-2 px-3 font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'console'
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-stone-500 hover:text-slate-800'
                }`}
              >
                <span>Execution Console</span>
                {currentResult && currentResult.status !== 'not_attempted' && (
                  <span
                    className={`rounded px-1.5 py-0.2 text-[9px] font-mono font-bold ${
                      currentResult.status === 'fully_executed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : currentResult.status === 'partially_executed'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {currentResult.marks}/10 Marks
                  </span>
                )}
              </button>
            </div>

            {/* Tab 1: Problem Description */}
            {currentTab === 'problem' && (
              <div className="space-y-3.5 text-xs text-stone-700 leading-relaxed pt-1">
                <p className="whitespace-pre-line">{currentQuestion.description}</p>

                {currentQuestion.inputDescription && (
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Input Format:</span>
                    <p className="text-stone-600 whitespace-pre-line font-mono text-[11px]">
                      {currentQuestion.inputDescription}
                    </p>
                  </div>
                )}

                {currentQuestion.outputDescription && (
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Output Format:</span>
                    <p className="text-stone-600 whitespace-pre-line font-mono text-[11px]">
                      {currentQuestion.outputDescription}
                    </p>
                  </div>
                )}

                {currentQuestion.examples.map((ex, i) => (
                  <div key={i} className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-3 space-y-1 font-mono text-[11px]">
                    <div className="font-bold text-stone-700">Example {i + 1}:</div>
                    <div><strong className="text-slate-900">Input:</strong> {ex.input}</div>
                    <div><strong className="text-slate-900">Output:</strong> {ex.output}</div>
                    {ex.explanation && (
                      <div className="text-stone-500 font-sans text-xs">Explanation: {ex.explanation}</div>
                    )}
                  </div>
                ))}

                <div className="pt-1">
                  <span className="font-bold text-slate-900 block mb-1">Constraints:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-stone-600 font-mono text-[11px]">
                    {currentQuestion.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Test Cases (Sample Tests Visible, Hidden Tests Locked) */}
            {currentTab === 'testcases' && (
              <div className="space-y-3 pt-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    Verification Test Suite (5 Test Vectors)
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    2 Public Sample Tests • 3 Hidden Tests
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Sample Visible Test Cases */}
                  {currentQuestion.testCases
                    .filter((tc) => !tc.isHidden)
                    .map((tc) => (
                      <div
                        key={tc.id}
                        className="rounded-xl border border-stone-200 bg-stone-50 p-3 space-y-1 font-mono text-[11px]"
                      >
                        <div className="flex items-center justify-between text-slate-800 font-bold">
                          <span className="flex items-center gap-1.5">
                            <Eye className="size-3.5 text-sky-600" />
                            <span>Sample Test Case #{tc.id} (Visible)</span>
                          </span>
                          <span className="text-[10px] text-stone-400">Public Baseline</span>
                        </div>
                        <div><strong className="text-stone-600">Input:</strong> {tc.input}</div>
                        <div><strong className="text-stone-600">Expected Output:</strong> {tc.expectedOutput}</div>
                      </div>
                    ))}

                  {/* Hidden Test Cases (CRITICAL: Protected from extraction) */}
                  {currentQuestion.testCases
                    .filter((tc) => tc.isHidden)
                    .map((tc) => (
                      <div
                        key={tc.id}
                        className="rounded-xl border border-dashed border-stone-300 bg-stone-50/50 p-3 flex items-center justify-between text-stone-500 text-[11px]"
                      >
                        <div className="flex items-center gap-2">
                          <Lock className="size-3.5 text-stone-400" />
                          <span className="font-mono font-semibold">
                            Hidden Test Vector #{tc.id}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-stone-400 italic">
                          Protected verification vector (Evaluated on Run/Submit)
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Tab 3: Execution Console */}
            {currentTab === 'console' && (
              <div className="space-y-2 pt-1 font-mono text-xs">
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 text-slate-200 space-y-1.5 max-h-64 overflow-y-auto leading-relaxed">
                  {currentResult?.logs.map((log, i) => (
                    <div
                      key={i}
                      className={
                        log.includes('✓ Passed') || log.includes('[PASSED]')
                          ? 'text-emerald-400'
                          : log.includes('✕ Failed') || log.includes('[FAILED]') || log.includes('SYNTAX ERROR')
                          ? 'text-rose-400'
                          : log.includes('[EXECUTION SUMMARY]') || log.includes('[ISOLATED SANDBOX]')
                          ? 'text-sky-300 font-bold pt-1 border-t border-slate-800'
                          : log.includes('SAMPLE TEST CASES') || log.includes('HIDDEN TEST CASES')
                          ? 'text-amber-300 font-bold pt-1'
                          : 'text-slate-300'
                      }
                    >
                      {log}
                    </div>
                  )) || (
                    <p className="text-slate-500 italic">
                      Click [Run Code] below to evaluate test cases and inspect real sandbox outputs.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Code Editor */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">Code Editor</span>
                <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-mono text-stone-600">
                  {selectedLang}
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  {saveStatus === 'saving' ? 'Saving...' : '✓ Autosaved'}
                </span>
              </div>

              {/* Reset to clean starter button */}
              <button
                type="button"
                onClick={handleResetToTemplate}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-500 hover:text-slate-800 transition cursor-pointer"
                title="Reset code editor to blank function signature"
              >
                <RefreshCw className="size-3" />
                <span>Reset to Blank Template</span>
              </button>
            </div>

            <textarea
              value={activeCode}
              onChange={handleCodeChange}
              disabled={isTimeExpired}
              rows={12}
              className="w-full rounded-xl border border-stone-300 bg-slate-900 text-sky-300 font-mono text-xs p-4 focus:outline-none focus:ring-2 focus:ring-slate-900 leading-relaxed disabled:opacity-50"
              placeholder="Write your solution here..."
            />

            {/* Bottom Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
                className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-bold text-slate-900 hover:bg-stone-50 disabled:opacity-40 transition cursor-pointer"
              >
                <ChevronLeft className="size-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {/* Run Code (Tests code against sample + hidden vectors, does not submit) */}
                <button
                  type="button"
                  onClick={handleRunCode}
                  disabled={isRunningCode || isTimeExpired}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-900 bg-white px-4 py-2 text-xs font-bold text-slate-900 hover:bg-stone-100 shadow-2xs transition cursor-pointer"
                >
                  <Play className="size-3.5 text-emerald-600" />
                  <span>{isRunningCode ? 'Evaluating Sandbox...' : 'Run Code'}</span>
                </button>

                {/* Submit Code for this question and advance */}
                <button
                  type="button"
                  onClick={handleSubmitSingleQuestion}
                  disabled={isTimeExpired}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 shadow-xs transition cursor-pointer"
                >
                  <span>
                    {currentQIndex === verificationQuestionsList.length - 1
                      ? 'Review & Submit Final'
                      : 'Submit & Next'}
                  </span>
                  <ChevronRight className="size-4 text-sky-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Submit Confirmation Dialog */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-slate-900">
              <div className="size-10 rounded-xl bg-amber-50 border border-amber-200 grid place-items-center text-amber-700">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Finish Assessment?</h3>
                <p className="text-xs text-stone-500">
                  {attemptedCount} of 10 problems attempted • Current Score: {currentTotalMarks}/100 Marks
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to finish your assessment? Your test cases will be compiled into the objective evaluation summary and used to generate your verified skill profile and gap analysis.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
              >
                Continue Assessment
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 shadow-xs cursor-pointer"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
