export type Role = 'Student' | 'Institution' | 'Faculty' | 'Employer' | 'Admin';

export type MainView = 'auth' | 'home' | 'platform' | 'landing' | 'upload' | 'portal' | 'judge';

export type AuthState =
  | 'LOGIN'
  | 'EMAIL_ENTERED'
  | 'SENDING_LINK'
  | 'LINK_SENT'
  | 'VERIFYING_LINK'
  | 'AUTH_ERROR'
  | 'GOOGLE_AUTHENTICATING'
  | 'AUTHENTICATED'
  | 'LOADING_PROFILE'
  | 'WORKSPACE_SELECTION'
  | 'LOGGED_OUT';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  auth_provider?: string;
  selected_workspace?: Role;
  created_at?: string;
  updated_at?: string;
}

export type StudentFlowStep =
  | 'home'
  | 'role-select'
  | 'resume-upload'
  | 'resume-scanning'
  | 'claimed-skills'
  | 'verification-test'
  | 'test-results'
  | 'verified-profile'
  | 'skill-gap'
  | 'career-path'
  | 'dashboard';

export interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  explanation?: string;
  isHidden?: boolean;
}

export interface VerificationCodingQuestion {
  id: number;
  title: string;
  category: 'Python' | 'SQL' | 'Algorithms' | 'Problem Solving' | 'Machine Learning' | 'Data Structures';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  inputDescription?: string;
  outputDescription?: string;
  skills: string[];
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  starterCode: Record<string, string>;
  testCases: TestCase[];
  solutionKeywords?: string[];
}

export interface QuestionExecutionResult {
  questionId: number;
  status:
    | 'not_attempted'
    | 'syntax_error'
    | 'runtime_error'
    | 'wrong_answer'
    | 'time_limit'
    | 'partially_executed'
    | 'fully_executed';
  testCasesPassed: number;
  totalTestCases: number;
  sampleTestsPassed?: number;
  sampleTestsTotal?: number;
  hiddenTestsPassed?: number;
  hiddenTestsTotal?: number;
  score: number; // 0 to 100 percentage
  marks: number; // 0 to 10 marks per question
  isSubmitted?: boolean;
  logs: string[];
  userCode: string;
  language: string;
}

export interface AssessmentEvaluationSummary {
  attemptedCount: number;
  fullyExecutedCount: number;
  partiallyExecutedCount: number;
  failedCount: number;
  codingScore: number; // 0 to 100 total marks (10 Qs x 10 marks)
  overallScore: number;
  skillScores: Record<string, number>;
  executionQuality?: {
    fullExecution: number;
    partialExecution: number;
    runtimeErrors: number;
    syntaxErrors: number;
    timeLimit: number;
    wrongAnswer: number;
  };
  completedAt?: string;
}

export interface ClaimedSkillItem {
  skill: string;
  category: string;
  resumeEvidence: 'Strong' | 'Moderate' | 'Weak';
  confidenceLevel: 'High' | 'Medium-High' | 'Low / Needs Evidence' | 'Pending';
  verificationStatus: 'Pending' | 'Verified' | 'Partially Verified' | 'Needs Evidence' | 'Unverified';
  score?: number;
  evidenceNotes: string;
}

export type StudentSubPage =
  | 'dashboard'
  | 'resume-upload'
  | 'resume-analysis'
  | 'claimed-skills'
  | 'verification-test'
  | 'test-results'
  | 'verified-profile'
  | 'profile'
  | 'resume-ai'
  | 'analysis'
  | 'hub'
  | 'verification'
  | 'assessment'
  | 'coding'
  | 'jobs'
  | 'job-scanner'
  | 'career-path'
  | 'learning'
  | 'roadmap'
  | 'projects'
  | 'future'
  | 'future-skills'
  | 'assistant';

export type FacultySubPage =
  | 'dashboard'
  | 'courses'
  | 'skill-mapping'
  | 'student-readiness'
  | 'assessments'
  | 'curriculum-recommendations'
  | 'reports';

export type InstitutionSubPage =
  | 'dashboard'
  | 'students'
  | 'curriculum'
  | 'obsolescence'
  | 'analytics-charts'
  | 'training'
  | 'reassessment'
  | 'future-skills'
  | 'reports';

export type EmployerSubPage =
  | 'dashboard'
  | 'create-job'
  | 'candidates'
  | 'requirements'
  | 'future-skills';

export type AdminSubPage =
  | 'dashboard'
  | 'skills-ontology'
  | 'jobs-catalog'
  | 'market-trends'
  | 'curriculum-alignment'
  | 'future-skills'
  | 'reports';

export type Level = 'Beginner' | 'Intermediate' | 'Advanced';
export type Importance = 'Critical' | 'Important' | 'Optional';
export type VerificationStatus = 'VERIFIED' | 'SUPPORTED' | 'PARTIALLY SUPPORTED' | 'UNVERIFIED' | 'CONTRADICTED';
export type LearningStatus = 'Not Started' | 'In Progress' | 'Completed';
export type ProjectStatus = 'Planned' | 'In Progress' | 'Completed';

export interface Requirement {
  skill: string;
  importance: Importance;
  weight: number;
  level: Level;
}

export interface JobRole {
  id: string;
  name: string;
  industry: string;
  location: string;
  education: string;
  requirements: Requirement[];
  preferred: string[];
  required?: string[];
}

export interface LearnerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  degree?: string;
  branch: string;
  college?: string;
  graduation: string;
  targetRole: string;
  skills: Record<string, Level>;
  programmingLanguages?: string[];
  frameworks?: string[];
  databases?: string[];
  cloud?: string[];
  aiml?: string[];
  tools?: string[];
  softSkills?: string[];
  projects: number;
  experience: number;
  assessment: number;
  shareProfile: boolean;
  sourceFile?: string;
  certifications?: number;
  achievements?: number;
  profileCompleteness?: number;
  skillConfidence?: number;
  technicalReadiness?: number;
  roleReadiness?: number;
  industryAlignment?: number;
}

export interface StudentCohortMember {
  id: number;
  name: string;
  department: string;
  batch: string;
  career: string;
  alignment: number;
  employability: number;
  readiness: number;
  skills?: string[];
  gaps: Array<{
    skill: string;
    current: number;
    target: number;
    impact: number;
    area: string;
    training: string;
  }>;
}

export interface VerificationEvidence {
  skill: string;
  claim: string;
  estimate: string;
  confidence: number;
  proficiency: number;
  status: VerificationStatus;
  github: string;
  linkedin: string;
  resume: string;
  assessment: number;
  projects: string;
  reason: string;
  action: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  skill: string;
  importance: string;
  difficulty: string;
  duration: string;
  cover: string[];
  outcome: string;
  status: ProjectStatus;
}

export interface FutureSkillRow {
  skill: string;
  category: string;
  current: number;
  growth: number;
  roles: number;
  coverage: number;
  gap: number;
  status: 'EMERGING' | 'HIGH-GROWTH' | 'STABLE' | 'DECLINING';
  priority: number;
  action: 'ADD' | 'UPDATE' | 'RETAIN' | 'MONITOR';
}

export interface TrainingProgram {
  id: string;
  name: string;
  skill: string;
  duration: string;
  affected: number;
  improvement: number;
  description: string;
  impactRationale: string;
}

export interface CurriculumCourse {
  course: string;
  skill: string;
  level: Level;
  duration: string;
  department?: string;
  alignmentStatus?: 'Aligned' | 'Partially aligned' | 'Missing' | 'Emerging';
}

export interface MarketSkill {
  skill: string;
  demand: number;
  trend: string;
  roles: string;
  industry: string;
  priority: 'High' | 'Medium' | 'Low';
  confidence: number;
}

export interface ResourceLink {
  title: string;
  provider: string;
  difficulty: string;
  type: string;
  duration: string;
  url: string;
  description: string;
  button: string;
}

export interface ImpactMetrics {
  preScore: number;
  postScore: number;
  jump: number;
  alignmentBefore: number;
  alignmentAfter: number;
  employabilityBefore: number;
  employabilityAfter: number;
  futureBefore: number;
  futureAfter: number;
  employerMatchBefore: number;
  employerMatchAfter: number;
}

export interface AlignmentScoreBreakdown {
  overall: number;
  technicalPoints: number;
  roleReqPoints: number;
  projectPoints: number;
  experiencePoints: number;
  certPoints: number;
  emergingPoints: number;
  assessmentPoints: number;
  missingSkillPenalty: number;
  assessmentGapPenalty: number;
  explanation: string;
}

export interface JobDescriptionScanResult {
  jobTitle: string;
  company: string;
  experienceRequired: string;
  educationRequired: string;
  requiredSkills: string[];
  preferredSkills: string[];
  toolsAndTech: string[];
  softSkills: string[];
  responsibilities: string[];
  matchScore: number;
  matchingSkills: string[];
  partialMatchSkills: string[];
  missingSkills: string[];
  recommendedProjects: Array<{
    title: string;
    reason: string;
    techStack: string[];
    difficulty: string;
    estimatedHours: number;
  }>;
  learningResources: Array<{
    skill: string;
    action: string;
  }>;
  suggestedAssessment?: string;
}

export interface CareerPathStage {
  step: number;
  title: string;
  stageType: 'Current Skills' | 'Missing Skills' | 'Learning' | 'Practice' | 'Project' | 'Verification' | 'Internship' | 'Placement Readiness';
  milestones: string[];
  status: 'Completed' | 'Current' | 'Upcoming';
  skillsAddressed: string[];
}

export interface CareerPathModel {
  roleId: string;
  roleName: string;
  industry: string;
  timelineWeeks: number;
  stages: CareerPathStage[];
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  whyThisProject: string;
  skillsBuilt: string[];
  techStack: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  expectedOutput: string;
  portfolioValue: string;
  industryRelevance: string;
  missingSkillsBridged: string[];
}

export interface OpportunityItem {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Internship' | 'Full-Time' | 'Apprenticeship';
  stipend: string;
  requiredSkills: string[];
  preferredSkills: string[];
  studentMatchScore: number;
  alignmentMatchScore?: number;
  missingSkills: string[];
  readinessStatus: 'Ready to Apply' | 'Minor Gap' | 'Gap to Close';
  recommendedAction: string;
  verifiedEvidenceCount: number;
}

export interface CurriculumHeatmapCell {
  subject: string;
  code: string;
  department: string;
  year: string;
  semester: string;
  skillCoverage: Record<string, 'Strong' | 'Moderate' | 'Weak' | 'Missing'>;
  overallAlignment: number;
  missingIndustrySkills: string[];
  courseName?: string;
  courseCode?: string;
  currentCoverage?: number;
  industryDemand?: number;
  obsolescenceScore?: number;
  alignmentTier?: 'High Alignment' | 'Moderate Alignment' | 'High Obsolescence Risk' | string;
  recommendedUpdate?: string;
  suggestedNewTopics?: string[];
  potentialEmployabilityBoost?: string;
}

export interface JudgeStep {
  id: string;
  stepNumber: number;
  title: string;
  category: string;
  problemStatement: string;
  solutionImpact: string;
  interactiveDemoTarget: {
    role: Role;
    page: string;
  };
  metrics: Array<{ label: string; value: string }>;
  problemDescription?: string;
  highlights?: string[];
  demoJumpRoute?: string;
  demoJumpRole?: Role;
}
