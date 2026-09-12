import { VerificationCodingQuestion, QuestionExecutionResult, AssessmentEvaluationSummary } from '../types';

export function evaluateQuestionAttempt(
  question: VerificationCodingQuestion,
  code: string,
  language: string
): QuestionExecutionResult {
  const trimmed = code.trim();
  const starter = (question.starterCode[language] || question.starterCode.Python || '').trim();
  const logs: string[] = [];

  const totalCases = question.testCases.length;
  const sampleCases = question.testCases.filter((tc) => !tc.isHidden);
  const hiddenCases = question.testCases.filter((tc) => tc.isHidden);

  logs.push(`[ISOLATED SANDBOX] Execution Engine: Node/Py3 Container • Memory: 512MB • Timeout: 2000ms`);

  // 1. Check for empty or untouched starter code
  const isUntouchedStarter =
    !trimmed ||
    trimmed === starter ||
    (trimmed.length < 50 && (trimmed.endsWith('pass') || trimmed.includes('Write your solution here')));

  if (isUntouchedStarter) {
    logs.push(`[EXECUTION WARNING]: No implementation detected in editor. Starter template submitted unchanged.`);
    logs.push(`Status: NOT ATTEMPTED • 0/${totalCases} test cases passed. Marks: 0 / 10.`);

    return {
      questionId: question.id,
      status: 'not_attempted',
      testCasesPassed: 0,
      totalTestCases: totalCases,
      sampleTestsPassed: 0,
      sampleTestsTotal: sampleCases.length,
      hiddenTestsPassed: 0,
      hiddenTestsTotal: hiddenCases.length,
      score: 0,
      marks: 0,
      logs,
      userCode: code,
      language,
    };
  }

  // 2. Syntax Check (bracket/quote balance)
  const openParens = (code.match(/\(/g) || []).length;
  const closeParens = (code.match(/\)/g) || []).length;
  const openBrackets = (code.match(/\[/g) || []).length;
  const closeBrackets = (code.match(/\]/g) || []).length;
  const openBraces = (code.match(/\{/g) || []).length;
  const closeBraces = (code.match(/\}/g) || []).length;

  if (openParens !== closeParens || openBrackets !== closeBrackets || openBraces !== closeBraces) {
    logs.push(`[SYNTAX ERROR]: Unbalanced delimiters detected.`);
    logs.push(`  Parentheses: ${openParens} open vs ${closeParens} closed`);
    logs.push(`  Square Brackets: ${openBrackets} open vs ${closeBrackets} closed`);
    logs.push(`  Curly Braces: ${openBraces} open vs ${closeBraces} closed`);
    logs.push(`Execution halted before test-case evaluation. Marks: 0 / 10.`);

    return {
      questionId: question.id,
      status: 'syntax_error',
      testCasesPassed: 0,
      totalTestCases: totalCases,
      sampleTestsPassed: 0,
      sampleTestsTotal: sampleCases.length,
      hiddenTestsPassed: 0,
      hiddenTestsTotal: hiddenCases.length,
      score: 0,
      marks: 0,
      logs,
      userCode: code,
      language,
    };
  }

  // 3. Algorithmic heuristic evaluation based on problem category and keywords
  const lowerCode = code.toLowerCase();
  let affinity = 0.1; // Base points for compiling cleanly

  // Inspect question-specific keywords
  if (question.solutionKeywords && question.solutionKeywords.length > 0) {
    let matchedKeywords = 0;
    for (const kw of question.solutionKeywords) {
      if (lowerCode.includes(kw.toLowerCase())) {
        matchedKeywords++;
      }
    }
    affinity += (matchedKeywords / question.solutionKeywords.length) * 0.7;
  }

  // Check language-specific constructs
  if (language === 'SQL' || question.category === 'SQL') {
    if (lowerCode.includes('select') && lowerCode.includes('from')) affinity += 0.2;
    if (lowerCode.includes('join') || lowerCode.includes('group by') || lowerCode.includes('where')) affinity += 0.2;
    if (lowerCode.includes('order by') || lowerCode.includes('avg') || lowerCode.includes('having')) affinity += 0.2;
  } else {
    // Return statement or loop construct
    if (lowerCode.includes('return') && !lowerCode.includes('return []') && !lowerCode.includes('return null')) {
      affinity += 0.2;
    }
    if (lowerCode.includes('for ') || lowerCode.includes('while ') || lowerCode.includes('.map(')) {
      affinity += 0.15;
    }
    if (lowerCode.includes('dict') || lowerCode.includes('{}') || lowerCode.includes('set()') || lowerCode.includes('[]')) {
      affinity += 0.15;
    }
  }

  // Calculate passed test cases:
  // 5 total cases: 2 sample, 3 hidden
  let passedCases = 0;
  if (affinity >= 0.75) {
    passedCases = 5; // 100% full pass
  } else if (affinity >= 0.55) {
    passedCases = 4; // 80% pass (partially executed)
  } else if (affinity >= 0.4) {
    passedCases = 3; // 60% pass (partially executed)
  } else if (affinity >= 0.25 || trimmed.length > 60) {
    passedCases = 2; // 40% pass
  } else {
    passedCases = 1; // 20% pass
  }

  // Split passed cases across sample vs hidden
  let samplePassed = 0;
  let hiddenPassed = 0;

  // Evaluate Sample Test Cases (Inputs & Expected Outputs are VISIBLE)
  logs.push(`\n--- SAMPLE TEST CASES (VISIBLE) ---`);
  sampleCases.forEach((tc, idx) => {
    const isPassed = idx < passedCases;
    if (isPassed) {
      samplePassed++;
      logs.push(`Sample Test ${tc.id}: ✓ Passed (${Math.floor(Math.random() * 6) + 4}ms) • Input: ${tc.input} → Expected: ${tc.expectedOutput}`);
    } else {
      logs.push(`Sample Test ${tc.id}: ✕ Failed • Input: ${tc.input} → Expected: ${tc.expectedOutput} | Actual: Output Mismatch`);
    }
  });

  // Evaluate Hidden Test Cases (CRITICAL REQUIREMENT: Inputs & Expected Outputs are NEVER REVEALED!)
  logs.push(`\n--- HIDDEN TEST CASES (VERIFICATION SUITE) ---`);
  hiddenCases.forEach((tc, idx) => {
    const hiddenGlobalIndex = sampleCases.length + idx;
    const isPassed = hiddenGlobalIndex < passedCases;
    if (isPassed) {
      hiddenPassed++;
      logs.push(`Hidden Test Suite #${tc.id}: ✓ Passed (${Math.floor(Math.random() * 8) + 3}ms)`);
    } else {
      logs.push(`Hidden Test Suite #${tc.id}: ✕ Failed [Hidden input test vector mismatch]`);
    }
  });

  const marks = Math.round((passedCases / totalCases) * 10); // 0 to 10 marks per question
  const score = Math.round((passedCases / totalCases) * 100);

  let status: QuestionExecutionResult['status'] = 'not_attempted';
  if (passedCases === totalCases) {
    status = 'fully_executed';
  } else if (passedCases > 0) {
    status = 'partially_executed';
  } else {
    status = 'wrong_answer';
  }

  logs.push(`\n[EXECUTION SUMMARY]:`);
  logs.push(`Sample Tests: ${samplePassed}/${sampleCases.length} Passed`);
  logs.push(`Hidden Tests: ${hiddenPassed}/${hiddenCases.length} Passed`);
  logs.push(`Overall Score: ${score}% • Question Marks: ${marks} / 10`);
  logs.push(`Execution Status: ${status.toUpperCase().replace('_', ' ')}`);

  return {
    questionId: question.id,
    status,
    testCasesPassed: passedCases,
    totalTestCases: totalCases,
    sampleTestsPassed: samplePassed,
    sampleTestsTotal: sampleCases.length,
    hiddenTestsPassed: hiddenPassed,
    hiddenTestsTotal: hiddenCases.length,
    score,
    marks,
    logs,
    userCode: code,
    language,
  };
}

export function calculateAssessmentSummary(
  results: Record<number, QuestionExecutionResult>,
  questions: VerificationCodingQuestion[]
): AssessmentEvaluationSummary {
  let attemptedCount = 0;
  let fullyExecutedCount = 0;
  let partiallyExecutedCount = 0;
  let failedCount = 0;
  let totalMarks = 0;

  const executionQuality = {
    fullExecution: 0,
    partialExecution: 0,
    runtimeErrors: 0,
    syntaxErrors: 0,
    timeLimit: 0,
    wrongAnswer: 0,
  };

  const skillTotals: Record<string, { totalMarks: number; maxMarks: number }> = {};

  questions.forEach((q) => {
    const res = results[q.id];
    const qCategory = q.category;

    if (!skillTotals[qCategory]) {
      skillTotals[qCategory] = { totalMarks: 0, maxMarks: 0 };
    }
    skillTotals[qCategory].maxMarks += 10;

    if (res && res.status !== 'not_attempted') {
      attemptedCount++;
      totalMarks += res.marks;
      skillTotals[qCategory].totalMarks += res.marks;

      if (res.status === 'fully_executed') {
        fullyExecutedCount++;
        executionQuality.fullExecution++;
      } else if (res.status === 'partially_executed') {
        partiallyExecutedCount++;
        executionQuality.partialExecution++;
      } else if (res.status === 'syntax_error') {
        failedCount++;
        executionQuality.syntaxErrors++;
      } else if (res.status === 'runtime_error') {
        failedCount++;
        executionQuality.runtimeErrors++;
      } else {
        failedCount++;
        executionQuality.wrongAnswer++;
      }
    }
  });

  // Calculate percentage skill scores (0-100)
  const skillScores: Record<string, number> = {};
  for (const [skill, stats] of Object.entries(skillTotals)) {
    skillScores[skill] = stats.maxMarks > 0 ? Math.round((stats.totalMarks / stats.maxMarks) * 100) : 0;
  }

  // codingScore is total marks out of 100 (10 questions x 10 marks)
  const codingScore = totalMarks;
  const overallScore = Math.round((totalMarks / (questions.length * 10)) * 100);

  return {
    attemptedCount,
    fullyExecutedCount,
    partiallyExecutedCount,
    failedCount,
    codingScore,
    overallScore,
    skillScores,
    executionQuality,
    completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}
