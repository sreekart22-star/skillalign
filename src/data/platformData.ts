import {
  JobRole,
  LearnerProfile,
  StudentCohortMember,
  VerificationEvidence,
  TrainingProgram,
  CurriculumCourse,
  MarketSkill,
  ResourceLink,
  Level,
  AlignmentScoreBreakdown,
  CareerPathModel,
  ProjectRecommendation,
  OpportunityItem,
  CurriculumHeatmapCell,
  JudgeStep,
  JobDescriptionScanResult,
} from '../types';

export const levelValueMap: Record<Level, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

export const technicalSkillsList: string[] = [
  'Python',
  'SQL',
  'HTML/CSS',
  'Java',
  'JavaScript',
  'TypeScript',
  'React',
  'Git',
  'Machine Learning',
  'Statistics',
  'Pandas',
  'Scikit-learn',
  'Deep Learning',
  'Generative AI',
  'MLOps',
  'Cloud Computing',
  'AWS',
  'Docker',
  'Linux',
  'Cybersecurity',
  'Networking',
  'Power BI',
  'Data Visualization',
  'APIs',
  'System Design',
];

export const jobRolesList: JobRole[] = [
  {
    id: 'ai-engineer',
    name: 'AI Engineer',
    industry: 'Technology',
    location: 'Bengaluru, India',
    education: 'B.Tech CSE / AI',
    requirements: [
      { skill: 'Python', importance: 'Critical', weight: 1.5, level: 'Advanced' },
      { skill: 'Machine Learning', importance: 'Critical', weight: 1.5, level: 'Advanced' },
      { skill: 'Statistics', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Deep Learning', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Git', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Generative AI', importance: 'Optional', weight: 0.5, level: 'Beginner' },
    ],
    preferred: ['MLOps', 'Docker', 'Cloud Computing'],
  },
  {
    id: 'cloud-engineer',
    name: 'Cloud Engineer',
    industry: 'Cloud & Infrastructure',
    location: 'Bengaluru / Remote',
    education: 'B.Tech / MCA',
    requirements: [
      { skill: 'AWS', importance: 'Critical', weight: 1.5, level: 'Advanced' },
      { skill: 'Cloud Computing', importance: 'Critical', weight: 1.5, level: 'Advanced' },
      { skill: 'Docker', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Linux', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Python', importance: 'Optional', weight: 0.5, level: 'Beginner' },
    ],
    preferred: ['Git', 'Networking', 'System Design'],
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    industry: 'Analytics & Finance',
    location: 'Mumbai, India',
    education: 'Any STEM degree',
    requirements: [
      { skill: 'SQL', importance: 'Critical', weight: 1.5, level: 'Advanced' },
      { skill: 'Python', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Data Visualization', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Power BI', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Statistics', importance: 'Optional', weight: 0.5, level: 'Beginner' },
    ],
    preferred: ['Pandas', 'Git'],
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    industry: 'Analytics & AI',
    location: 'Hyderabad, India',
    education: 'B.Tech / M.Sc Statistics',
    requirements: [
      { skill: 'Python', importance: 'Critical', weight: 1.5, level: 'Advanced' },
      { skill: 'Machine Learning', importance: 'Critical', weight: 1.5, level: 'Advanced' },
      { skill: 'SQL', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Statistics', importance: 'Important', weight: 1.0, level: 'Advanced' },
      { skill: 'Pandas', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Scikit-learn', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Git', importance: 'Optional', weight: 0.5, level: 'Beginner' },
    ],
    preferred: ['Deep Learning', 'Generative AI'],
  },
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    industry: 'Enterprise Software',
    location: 'Pune, India',
    education: 'B.Tech CSE / IT',
    requirements: [
      { skill: 'Java', importance: 'Critical', weight: 1.5, level: 'Advanced' },
      { skill: 'JavaScript', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Git', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'APIs', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'System Design', importance: 'Optional', weight: 0.5, level: 'Beginner' },
    ],
    preferred: ['React', 'Docker'],
  },
  {
    id: 'cybersecurity-analyst',
    name: 'Cybersecurity Analyst',
    industry: 'Information Security',
    location: 'Delhi NCR',
    education: 'B.Tech / Cybersecurity Cert',
    requirements: [
      { skill: 'Cybersecurity', importance: 'Critical', weight: 1.5, level: 'Advanced' },
      { skill: 'Networking', importance: 'Critical', weight: 1.5, level: 'Intermediate' },
      { skill: 'Linux', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Python', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Git', importance: 'Optional', weight: 0.5, level: 'Beginner' },
    ],
    preferred: ['Cloud Computing', 'Docker'],
  },
  {
    id: 'ml-engineer',
    name: 'ML Engineer',
    industry: 'Applied AI & Systems',
    location: 'Bengaluru / Hyderabad',
    education: 'B.Tech CSE / AI / M.Tech',
    requirements: [
      { skill: 'Python', importance: 'Critical', weight: 1.5, level: 'Advanced' },
      { skill: 'Machine Learning', importance: 'Critical', weight: 1.5, level: 'Advanced' },
      { skill: 'MLOps', importance: 'Critical', weight: 1.5, level: 'Intermediate' },
      { skill: 'Docker', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'APIs', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Deep Learning', importance: 'Important', weight: 1.0, level: 'Intermediate' },
    ],
    preferred: ['AWS', 'Git', 'System Design'],
  },
  {
    id: 'full-stack-developer',
    name: 'Full Stack Developer',
    industry: 'Product Engineering',
    location: 'Bengaluru / Pune',
    education: 'B.Tech / MCA / BCA',
    requirements: [
      { skill: 'React', importance: 'Critical', weight: 1.5, level: 'Advanced' },
      { skill: 'JavaScript', importance: 'Critical', weight: 1.5, level: 'Advanced' },
      { skill: 'SQL', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'APIs', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'Git', importance: 'Important', weight: 1.0, level: 'Intermediate' },
      { skill: 'HTML/CSS', importance: 'Important', weight: 1.0, level: 'Advanced' },
    ],
    preferred: ['Docker', 'System Design', 'TypeScript'],
  },
];

export const defaultLearner: LearnerProfile = {
  id: 'aarav-sharma-2026',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@institution.edu',
  phone: '+91 98450 12345',
  location: 'Bengaluru, India',
  education: 'B.Tech',
  branch: 'Computer Science & Engineering',
  graduation: '2026',
  targetRole: 'AI Engineer',
  skills: {
    Python: 'Advanced',
    SQL: 'Intermediate',
    Java: 'Intermediate',
    'HTML/CSS': 'Intermediate',
    Git: 'Intermediate',
  },
  projects: 3,
  experience: 1,
  assessment: 76,
  shareProfile: true,
  sourceFile: 'aarav_sharma_academic_cv.pdf',
  certifications: 2,
  achievements: 4,
};

export const initialLearnerProfile: LearnerProfile = defaultLearner;

export const studentCohortList: StudentCohortMember[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    department: 'Computer Science',
    batch: '2026',
    career: 'Cloud Engineer',
    alignment: 61,
    employability: 68,
    readiness: 55,
    gaps: [
      { skill: 'Cloud Computing', current: 23, target: 75, impact: 94, area: 'Cloud', training: 'Cloud Fundamentals' },
      { skill: 'Docker', current: 15, target: 65, impact: 89, area: 'Cloud', training: 'DevOps Foundations' },
      { skill: 'Python', current: 58, target: 75, impact: 61, area: 'Programming', training: 'Python for Data & Automation' },
    ],
  },
  {
    id: 2,
    name: 'Diya Patel',
    department: 'Computer Science',
    batch: '2026',
    career: 'Data Analyst',
    alignment: 79,
    employability: 83,
    readiness: 74,
    gaps: [
      { skill: 'Data Visualization', current: 46, target: 78, impact: 86, area: 'Analytics', training: 'Analytics Communication' },
      { skill: 'SQL', current: 67, target: 78, impact: 48, area: 'Analytics', training: 'Advanced SQL' },
    ],
  },
  {
    id: 3,
    name: 'Rohan Verma',
    department: 'Information Technology',
    batch: '2025',
    career: 'Software Engineer',
    alignment: 82,
    employability: 86,
    readiness: 77,
    gaps: [
      { skill: 'System Design', current: 61, target: 75, impact: 55, area: 'Architecture', training: 'Scalable Systems' },
    ],
  },
  {
    id: 4,
    name: 'Meera Iyer',
    department: 'Electronics',
    batch: '2026',
    career: 'AI Engineer',
    alignment: 72,
    employability: 76,
    readiness: 69,
    gaps: [
      { skill: 'Machine Learning', current: 48, target: 75, impact: 82, area: 'AI', training: 'Applied Machine Learning' },
    ],
  },
  {
    id: 5,
    name: 'Kabir Singh',
    department: 'Computer Science',
    batch: '2026',
    career: 'Software Engineer',
    alignment: 74,
    employability: 77,
    readiness: 71,
    gaps: [
      { skill: 'APIs', current: 40, target: 70, impact: 68, area: 'Web', training: 'Scalable Systems' },
    ],
  },
  {
    id: 6,
    name: 'Ananya Rao',
    department: 'Information Technology',
    batch: '2025',
    career: 'Data Scientist',
    alignment: 85,
    employability: 89,
    readiness: 81,
    gaps: [
      { skill: 'Deep Learning', current: 52, target: 75, impact: 72, area: 'AI', training: 'Applied Machine Learning' },
    ],
  },
  {
    id: 7,
    name: 'Vivaan Shah',
    department: 'Computer Science',
    batch: '2026',
    career: 'Cloud Engineer',
    alignment: 65,
    employability: 70,
    readiness: 60,
    gaps: [
      { skill: 'AWS', current: 30, target: 80, impact: 91, area: 'Cloud', training: 'Cloud Fundamentals' },
    ],
  },
  {
    id: 8,
    name: 'Ishita Gupta',
    department: 'Electronics',
    batch: '2025',
    career: 'Cybersecurity Analyst',
    alignment: 78,
    employability: 81,
    readiness: 75,
    gaps: [
      { skill: 'Networking', current: 55, target: 80, impact: 79, area: 'Security', training: 'Cybersecurity Defense' },
    ],
  },
];

export const initialVerificationEvidence: VerificationEvidence[] = [
  {
    skill: 'Python',
    claim: 'Advanced',
    estimate: 'Advanced',
    confidence: 92,
    proficiency: 82,
    status: 'VERIFIED',
    github: 'Strong (8 repos)',
    linkedin: 'Endorsed',
    resume: 'Confirmed in 3 projects',
    assessment: 82,
    projects: 'Strong applied proof',
    reason: 'Five relevant repositories, active commit cadence, assessment performance, and independent profile evidence are consistent.',
    action: 'Keep project evidence current with unit tests and documentation.',
  },
  {
    skill: 'React',
    claim: 'Advanced',
    estimate: 'Advanced',
    confidence: 87,
    proficiency: 78,
    status: 'VERIFIED',
    github: 'Strong (4 repos)',
    linkedin: 'Verified skill badge',
    resume: 'Frontend capstone',
    assessment: 78,
    projects: 'Multiple production builds',
    reason: 'Four React repositories and three relevant projects demonstrate sustained practical usage.',
    action: 'Add state-management and full-stack API integration evidence.',
  },
  {
    skill: 'AWS',
    claim: 'Advanced',
    estimate: 'Intermediate',
    confidence: 74,
    proficiency: 69,
    status: 'SUPPORTED',
    github: 'Partial (Terraform & S3)',
    linkedin: 'Found in coursework',
    resume: 'Cloud coursework',
    assessment: 74,
    projects: 'Moderate infrastructure evidence',
    reason: 'Most sources support foundational AWS knowledge, but production deployment evidence is limited for an Advanced rating.',
    action: 'Complete an AWS practical container deployment assessment.',
  },
  {
    skill: 'Docker',
    claim: 'Intermediate',
    estimate: 'Intermediate',
    confidence: 61,
    proficiency: 61,
    status: 'PARTIALLY SUPPORTED',
    github: 'Weak (1 Dockerfile)',
    linkedin: 'Not listed',
    resume: 'Mentioned',
    assessment: 61,
    projects: 'Minimal container orchestration',
    reason: 'Some evidence exists, but the available project and profile signals do not yet fully confirm practical proficiency.',
    action: 'Add a multi-container Docker Compose application to GitHub.',
  },
  {
    skill: 'Machine Learning',
    claim: 'Advanced',
    estimate: 'Advanced',
    confidence: 94,
    proficiency: 88,
    status: 'VERIFIED',
    github: 'Strong (Kaggle + 3 notebooks)',
    linkedin: 'Endorsed by faculty',
    resume: 'Churn prediction capstone',
    assessment: 88,
    projects: 'High quality ML pipelines',
    reason: 'High assessment score and multiple independent project sources strongly support the claimed level.',
    action: 'Share approved project notebook and model evaluation with hiring partners.',
  },
];

export const trainingProgramsList: TrainingProgram[] = [
  {
    id: 'cloud-fundamentals',
    name: 'Cloud Fundamentals',
    skill: 'Cloud Computing',
    duration: '6 weeks',
    affected: 412,
    improvement: 45,
    description: 'Practical AWS and cloud architecture principles, compute, IAM, storage, and serverless architectures.',
    impactRationale: 'Directly addresses the #1 role requirement gap across Cloud Engineer and DevOps tracks.',
  },
  {
    id: 'devops-foundations',
    name: 'DevOps Foundations',
    skill: 'Docker & CI/CD',
    duration: '5 weeks',
    affected: 376,
    improvement: 40,
    description: 'Containerization, Dockerfile optimizations, multi-stage builds, GitHub Actions CI/CD workflows.',
    impactRationale: 'High recruiter filter criterion for software and infrastructure roles.',
  },
  {
    id: 'analytics-communication',
    name: 'Analytics Communication',
    skill: 'Data Visualization & Storytelling',
    duration: '4 weeks',
    affected: 244,
    improvement: 28,
    description: 'Turning raw metrics into executive dashboards with Power BI and structured decision narratives.',
    impactRationale: 'Bridging technical computation and business stakeholder influence.',
  },
  {
    id: 'applied-machine-learning',
    name: 'Applied Machine Learning',
    skill: 'Machine Learning & MLOps',
    duration: '8 weeks',
    affected: 183,
    improvement: 32,
    description: 'Scikit-learn, cross-validation, feature engineering, model deployment, and performance monitoring.',
    impactRationale: 'Transforms theoretical academic understanding into job-ready portfolio projects.',
  },
  {
    id: 'scalable-systems',
    name: 'Scalable Systems & Design',
    skill: 'System Design & APIs',
    duration: '6 weeks',
    affected: 161,
    improvement: 25,
    description: 'Microservices architecture, caching strategies, load balancing, relational vs NoSQL trade-offs.',
    impactRationale: 'Key requirement for SDE-1 and junior backend engineering placement interviews.',
  },
];

export const curriculumCoursesList: CurriculumCourse[] = [
  { course: 'Programming Fundamentals', skill: 'Python', level: 'Intermediate', duration: '12 weeks', department: 'CSE', alignmentStatus: 'Aligned' },
  { course: 'Database Management Systems', skill: 'SQL', level: 'Intermediate', duration: '10 weeks', department: 'CSE', alignmentStatus: 'Partially aligned' },
  { course: 'Web Application Development', skill: 'HTML/CSS', level: 'Intermediate', duration: '8 weeks', department: 'CSE', alignmentStatus: 'Aligned' },
  { course: 'Object-Oriented Programming', skill: 'Java', level: 'Intermediate', duration: '12 weeks', department: 'CSE', alignmentStatus: 'Aligned' },
  { course: 'Version Control & Open Source', skill: 'Git', level: 'Beginner', duration: '6 weeks', department: 'CSE', alignmentStatus: 'Partially aligned' },
  { course: 'Cloud Infrastructure & Virtualization', skill: 'Cloud Computing', level: 'Intermediate', duration: '10 weeks', department: 'CSE', alignmentStatus: 'Missing' },
  { course: 'Containerization & Modern DevOps', skill: 'Docker', level: 'Intermediate', duration: '8 weeks', department: 'CSE', alignmentStatus: 'Missing' },
  { course: 'Applied Artificial Intelligence', skill: 'Machine Learning', level: 'Intermediate', duration: '12 weeks', department: 'CSE', alignmentStatus: 'Emerging' },
];

export const marketSkillsList: MarketSkill[] = [
  { skill: 'Generative AI', demand: 91, trend: '+34%', roles: 'AI Engineer, Data Scientist', industry: 'Technology', priority: 'High', confidence: 78 },
  { skill: 'Cloud Computing', demand: 89, trend: '+26%', roles: 'Cloud Engineer, DevOps', industry: 'Cloud Infrastructure', priority: 'High', confidence: 82 },
  { skill: 'Cybersecurity', demand: 87, trend: '+21%', roles: 'Security Analyst, Cloud Sec', industry: 'Security', priority: 'High', confidence: 80 },
  { skill: 'MLOps', demand: 84, trend: '+29%', roles: 'AI Engineer, ML Engineer', industry: 'AI & Data', priority: 'High', confidence: 74 },
  { skill: 'Data Engineering', demand: 82, trend: '+18%', roles: 'Data Engineer, ETL Developer', industry: 'Data Platforms', priority: 'Medium', confidence: 76 },
  { skill: 'Docker', demand: 79, trend: '+22%', roles: 'Software Engineer, DevOps', industry: 'Software Dev', priority: 'High', confidence: 85 },
  { skill: 'Python', demand: 94, trend: '+15%', roles: 'AI Engineer, Data Analyst, Backend', industry: 'Technology', priority: 'High', confidence: 92 },
  { skill: 'AWS', demand: 88, trend: '+20%', roles: 'Cloud Architect, Systems Engineer', industry: 'Cloud', priority: 'High', confidence: 88 },
];

export const curatedResourcesList: Record<string, ResourceLink[]> = {
  'Machine Learning': [
    {
      title: 'Machine Learning Crash Course',
      provider: 'Google for Developers',
      difficulty: 'Beginner',
      type: 'Official Course',
      duration: 'Self-paced (15 hrs)',
      url: 'https://developers.google.com/machine-learning/crash-course',
      description: "Google's practical introduction to machine learning with interactive explanations, visualizations and hands-on exercises in TensorFlow & Colab.",
      button: 'Open Google Course',
    },
    {
      title: 'Intro to Machine Learning',
      provider: 'Kaggle Learn',
      difficulty: 'Beginner',
      type: 'Interactive Micro-Course',
      duration: 'Approx 3 hours',
      url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
      description: 'Learn core machine-learning ideas and build decision trees and random forests with real housing data.',
      button: 'Start Kaggle Course',
    },
    {
      title: 'Intermediate Machine Learning',
      provider: 'Kaggle Learn',
      difficulty: 'Intermediate',
      type: 'Hands-on Course',
      duration: 'Approx 4 hours',
      url: 'https://www.kaggle.com/learn/intermediate-machine-learning',
      description: 'Learn about missing values, categorical variables, pipelines, cross-validation, XGBoost and data leakage.',
      button: 'Start Intermediate Course',
    },
    {
      title: 'Scikit-learn Official Guide & Docs',
      provider: 'scikit-learn.org',
      difficulty: 'Intermediate',
      type: 'Documentation & Examples',
      duration: 'Self-paced reference',
      url: 'https://scikit-learn.org/',
      description: 'Official API documentation, tutorials and benchmark examples for machine learning in Python.',
      button: 'Open Scikit Documentation',
    },
    {
      title: 'Machine Learning Skills Practice',
      provider: 'HackerRank',
      difficulty: 'Basic to Intermediate',
      type: 'Coding Challenges',
      duration: 'Self-paced',
      url: 'https://www.hackerrank.com/skills-directory/machine_learning_basic',
      description: 'Practice and evaluate machine-learning algorithms and statistical evaluation techniques.',
      button: 'Practice on HackerRank',
    },
    {
      title: "Machine Learning Crash Course: What's New",
      provider: 'Google for Developers',
      difficulty: 'Beginner',
      type: 'YouTube Video Tutorial',
      duration: '18 min video',
      url: 'https://www.youtube.com/watch?v=SAUeGtyLsrk',
      description: 'Official Google Developers video introduction to modern ML concepts and practical workflows.',
      button: 'Watch Video on YouTube',
    },
  ],
  'Cloud Computing': [
    {
      title: 'AWS Cloud Practitioner Essentials',
      provider: 'Amazon Web Services',
      difficulty: 'Beginner',
      type: 'Official Free Training',
      duration: '6 hours',
      url: 'https://aws.amazon.com/training/learn-about/cloud-practitioner/',
      description: 'Foundational cloud concepts, AWS core services, security, architecture, pricing, and support.',
      button: 'Explore AWS Training',
    },
    {
      title: 'Google Cloud Computing Foundations',
      provider: 'Google Cloud Skills Boost',
      difficulty: 'Beginner',
      type: 'Hands-on Labs',
      duration: 'Self-paced',
      url: 'https://www.cloudskillsboost.google/',
      description: 'Interactive labs exploring Google Cloud console, Compute Engine, storage, and networking.',
      button: 'Open Cloud Skills Boost',
    },
  ],
  Docker: [
    {
      title: 'Docker Getting Started Guide',
      provider: 'Docker Documentation',
      difficulty: 'Beginner',
      type: 'Official Walkthrough',
      duration: '2 hours',
      url: 'https://docs.docker.com/get-started/',
      description: 'Container fundamentals, building images, sharing on Docker Hub, and multi-container stacks with Compose.',
      button: 'Open Docker Guide',
    },
  ],
};

// Calculation helpers
export function requirementsForRole(roleName: string): JobRole {
  return jobRolesList.find((r) => r.name === roleName) || jobRolesList[0];
}

export function scoreForLearner(learner: LearnerProfile, role: JobRole): number {
  const totalWeight = role.requirements.reduce((sum, req) => sum + req.weight, 0);
  if (totalWeight === 0) return 0;

  const matchedWeight = role.requirements.reduce((sum, req) => {
    const userLevel = learner.skills[req.skill];
    if (!userLevel) return sum;
    const userVal = levelValueMap[userLevel] || 0;
    const reqVal = levelValueMap[req.level] || 1;
    const ratio = Math.min(1, userVal / reqVal);
    return sum + req.weight * ratio;
  }, 0);

  return Math.round((matchedWeight / totalWeight) * 100);
}

export function gapsForLearner(learner: LearnerProfile, role: JobRole) {
  return role.requirements.filter((req) => {
    const userLevel = learner.skills[req.skill];
    if (!userLevel) return true;
    return levelValueMap[userLevel] < levelValueMap[req.level];
  });
}

// 1. Transparent SkillAlign Alignment Score Engine
export function calculateDetailedAlignmentScore(learner: LearnerProfile, role: JobRole): AlignmentScoreBreakdown {
  const gaps = gapsForLearner(learner, role);
  const baseFit = scoreForLearner(learner, role); // 0-100 based on required skills

  // Factor 1: Technical skills fit (up to 30 pts)
  const technicalPoints = Math.round((baseFit / 100) * 28) + 2;

  // Factor 2: Role requirements satisfied (up to 20 pts)
  const metReqCount = role.requirements.length - gaps.length;
  const roleReqPoints = Math.round((metReqCount / Math.max(1, role.requirements.length)) * 18) + 2;

  // Factor 3: Practical Projects demonstrated (up to 15 pts)
  const projectCount = learner.projects || 0;
  const projectPoints = Math.min(15, projectCount * 5);

  // Factor 4: Verified Experience / Hands-on (up to 10 pts)
  const experienceYears = learner.experience || 0;
  const experiencePoints = Math.min(10, Math.round(experienceYears * 4) + 2);

  // Factor 5: Certifications & Proof (up to 10 pts)
  const certCount = learner.certifications || 1;
  const certPoints = Math.min(10, certCount * 4 + 2);

  // Factor 6: Emerging & Modern Skills bonus (up to 10 pts)
  const hasEmerging = Object.keys(learner.skills).some((s) =>
    ['Generative AI', 'Deep Learning', 'Docker', 'MLOps', 'PyTorch'].includes(s)
  );
  const emergingPoints = hasEmerging ? 8 : 3;

  // Factor 7: Assessment Performance (up to 10 pts)
  const assessmentScore = learner.assessment || 70;
  const assessmentPoints = Math.round((assessmentScore / 100) * 10);

  // Penalties:
  // Missing critical industry skills (-3 pts per critical gap, up to -15 pts)
  const criticalGapCount = gaps.filter((g) => g.importance === 'Critical').length;
  const missingSkillPenalty = criticalGapCount * 4;

  // Assessment gap / low proficiency penalty (-4 pts if below 75%)
  const assessmentGapPenalty = assessmentScore < 75 ? Math.round((75 - assessmentScore) * 0.25) : 0;

  // Raw combined score clamped between 25 and 96 (never 100% to reflect continuous learning)
  const rawScore =
    technicalPoints +
    roleReqPoints +
    projectPoints +
    experiencePoints +
    certPoints +
    emergingPoints +
    assessmentPoints -
    missingSkillPenalty -
    assessmentGapPenalty;

  const overall = Math.max(28, Math.min(96, rawScore));

  const explanation = `Score synthesized across 7 verifiable vectors: ${metReqCount}/${role.requirements.length} role requirements met, ${projectCount} demonstrated project artifacts, ${certCount} industry credential(s), and ${criticalGapCount} high-priority gap(s) identified for ${role.name}.`;

  return {
    overall,
    technicalPoints,
    roleReqPoints,
    projectPoints,
    experiencePoints,
    certPoints,
    emergingPoints,
    assessmentPoints,
    missingSkillPenalty,
    assessmentGapPenalty,
    explanation,
  };
}

// 2. AI Career Path Models for all 8 Roles
export const careerPathsByRole: Record<string, CareerPathModel> = {
  'Data Scientist': {
    roleId: 'data-scientist',
    roleName: 'Data Scientist',
    industry: 'Data & Predictive Analytics',
    timelineWeeks: 16,
    stages: [
      {
        step: 1,
        title: 'Foundations & Mathematical Tooling',
        stageType: 'Current Skills',
        milestones: ['Python NumPy / Pandas proficiency', 'Descriptive & inferential statistics', 'Relational database schema modeling (SQL)'],
        status: 'Completed',
        skillsAddressed: ['Python', 'SQL', 'Statistics'],
      },
      {
        step: 2,
        title: 'Classical Machine Learning & Validation',
        stageType: 'Learning',
        milestones: ['Supervised & unsupervised learning pipelines', 'Hyperparameter tuning & cross-validation', 'Scikit-learn model serialization'],
        status: 'Current',
        skillsAddressed: ['Machine Learning', 'Scikit-learn', 'Pandas'],
      },
      {
        step: 3,
        title: 'Deep Learning & Transformer Architectures',
        stageType: 'Missing Skills',
        milestones: ['Neural network fine-tuning (PyTorch)', 'Embeddings & semantic vector stores', 'Evaluation metrics (F1, AUC, BLEU)'],
        status: 'Upcoming',
        skillsAddressed: ['Deep Learning', 'PyTorch', 'Generative AI'],
      },
      {
        step: 4,
        title: 'Production Deployment & MLOps',
        stageType: 'Practice',
        milestones: ['FastAPI microservice containerization with Docker', 'Model latency optimization & ONNX runtime', 'Drift monitoring & retraining DAGs'],
        status: 'Upcoming',
        skillsAddressed: ['MLOps', 'Docker', 'APIs'],
      },
      {
        step: 5,
        title: 'Capstone Artifact & Benchmark Proof',
        stageType: 'Project',
        milestones: ['End-to-end predictive intelligence system with live demo', 'Open source reproducible GitHub repository', 'Automated technical documentation'],
        status: 'Upcoming',
        skillsAddressed: ['System Design', 'Git', 'Machine Learning'],
      },
      {
        step: 6,
        title: 'SkillAlign Evidence Verification',
        stageType: 'Verification',
        milestones: ['Proctored algorithmic & data modeling assessment', 'Automated code repository static analysis & unit tests', 'Industry mentor rubric review'],
        status: 'Upcoming',
        skillsAddressed: ['Code Quality', 'Verification'],
      },
      {
        step: 7,
        title: 'Industry Apprenticeship / Co-op',
        stageType: 'Internship',
        milestones: ['Work on live production telemetry data', 'Cross-functional alignment with engineering team', 'Model A/B test analysis in staging'],
        status: 'Upcoming',
        skillsAddressed: ['Workplace Readiness', 'Telemetry'],
      },
      {
        step: 8,
        title: 'Workforce Placement Readiness',
        stageType: 'Placement Readiness',
        milestones: ['Verified SkillAlign candidate docket generated', 'Direct match with verified enterprise recruiting partners', 'Offer letter evaluation'],
        status: 'Upcoming',
        skillsAddressed: ['Industry Placement'],
      },
    ],
  },
  'ML Engineer': {
    roleId: 'ml-engineer',
    roleName: 'ML Engineer',
    industry: 'Applied AI & Scaled Systems',
    timelineWeeks: 18,
    stages: [
      {
        step: 1,
        title: 'Software Engineering & Vector Algebra',
        stageType: 'Current Skills',
        milestones: ['Python OOP & typing', 'Data pipelines with Pandas', 'Matrix operations & linear algebra'],
        status: 'Completed',
        skillsAddressed: ['Python', 'Pandas'],
      },
      {
        step: 2,
        title: 'Model Training & Distributed Compute',
        stageType: 'Learning',
        milestones: ['PyTorch custom dataloaders', 'Distributed training with Accelerate', 'Quantization & pruning techniques'],
        status: 'Current',
        skillsAddressed: ['Machine Learning', 'Deep Learning'],
      },
      {
        step: 3,
        title: 'Containerization & Cloud Infrastructure',
        stageType: 'Missing Skills',
        milestones: ['Multi-stage Docker builds', 'Kubernetes pod orchestration for GPU workloads', 'Terraform cloud provisioning'],
        status: 'Upcoming',
        skillsAddressed: ['Docker', 'AWS', 'MLOps'],
      },
      {
        step: 4,
        title: 'API Microservices & Inference Serving',
        stageType: 'Practice',
        milestones: ['FastAPI asynchronous request queuing', 'Triton inference server deployment', 'gRPC payload streaming'],
        status: 'Upcoming',
        skillsAddressed: ['APIs', 'System Design'],
      },
      {
        step: 5,
        title: 'Production ML Pipeline Project',
        stageType: 'Project',
        milestones: ['Continuous training pipeline with MLflow and Airflow', 'CI/CD pipeline for model validation', 'Real-time telemetry and alerting'],
        status: 'Upcoming',
        skillsAddressed: ['MLOps', 'Git', 'Docker'],
      },
      {
        step: 6,
        title: 'SkillAlign Verified Benchmark',
        stageType: 'Verification',
        milestones: ['Hands-on containerized serving challenge', 'Automated benchmark test suite execution', 'Verified proof docket issuance'],
        status: 'Upcoming',
        skillsAddressed: ['Verification', 'Performance'],
      },
      {
        step: 7,
        title: 'Industry Immersion & Co-op',
        stageType: 'Internship',
        milestones: ['Production pipeline refactoring', 'Latency SLA reduction by 40%', 'Team code review participation'],
        status: 'Upcoming',
        skillsAddressed: ['Production Systems'],
      },
      {
        step: 8,
        title: 'Enterprise Role Placement',
        stageType: 'Placement Readiness',
        milestones: ['Enterprise candidate profile matching', 'System design interview readiness', 'Compensation negotiation'],
        status: 'Upcoming',
        skillsAddressed: ['Placement Ready'],
      },
    ],
  },
  'AI Engineer': {
    roleId: 'ai-engineer',
    roleName: 'AI Engineer',
    industry: 'Generative AI & Intelligent Agents',
    timelineWeeks: 14,
    stages: [
      {
        step: 1,
        title: 'LLM Foundations & Prompt Engineering',
        stageType: 'Current Skills',
        milestones: ['Gemini / OpenAI API SDK integrations', 'Structured JSON output enforcement', 'Prompt evaluation matrices'],
        status: 'Completed',
        skillsAddressed: ['Python', 'Generative AI'],
      },
      {
        step: 2,
        title: 'Retrieval Augmented Generation (RAG)',
        stageType: 'Learning',
        milestones: ['Vector embeddings & semantic chunking', 'ChromaDB / Pinecone hybrid search', 'Reranking algorithms and context pruning'],
        status: 'Current',
        skillsAddressed: ['Generative AI', 'APIs', 'Python'],
      },
      {
        step: 3,
        title: 'Agentic Workflows & Tool Calling',
        stageType: 'Missing Skills',
        milestones: ['Multi-step planning and tool dispatch', 'Human-in-the-loop validation loops', 'Stateful graph orchestrators (LangGraph)'],
        status: 'Upcoming',
        skillsAddressed: ['System Design', 'APIs'],
      },
      {
        step: 4,
        title: 'Evaluation & Guardrails',
        stageType: 'Practice',
        milestones: ['Hallucination detection frameworks', 'Input sanitization & safety guardrails', 'Automated synthetic benchmarking'],
        status: 'Upcoming',
        skillsAddressed: ['MLOps', 'Security'],
      },
      {
        step: 5,
        title: 'Full-Stack Intelligent Agent App',
        stageType: 'Project',
        milestones: ['Autonomous enterprise workflow agent', 'React real-time streaming interface', 'Containerized cloud hosting'],
        status: 'Upcoming',
        skillsAddressed: ['Generative AI', 'React', 'Docker'],
      },
      {
        step: 6,
        title: 'SkillAlign Verified AI Competency',
        stageType: 'Verification',
        milestones: ['Live prompt injection defense evaluation', 'RAG retrieval latency benchmark check', 'Verified badge issuance'],
        status: 'Upcoming',
        skillsAddressed: ['Verification', 'Security'],
      },
      {
        step: 7,
        title: 'AI Lab Internship',
        stageType: 'Internship',
        milestones: ['Fine-tuning domain-specific models', 'Evaluating production LLM cost efficiencies', 'Internal tooling delivery'],
        status: 'Upcoming',
        skillsAddressed: ['Applied GenAI'],
      },
      {
        step: 8,
        title: 'Enterprise AI Placement',
        stageType: 'Placement Readiness',
        milestones: ['Top AI team introductions', 'Technical design walkthrough', 'High-impact hire readiness'],
        status: 'Upcoming',
        skillsAddressed: ['Placement Ready'],
      },
    ],
  },
  'Software Engineer': {
    roleId: 'software-engineer',
    roleName: 'Software Engineer',
    industry: 'Core Enterprise & Systems Software',
    timelineWeeks: 16,
    stages: [
      {
        step: 1,
        title: 'Core Data Structures & Complexity Analysis',
        stageType: 'Current Skills',
        milestones: ['Arrays, trees, graphs, and dynamic programming', 'Big-O time and space optimization', 'Clean OOP design principles'],
        status: 'Completed',
        skillsAddressed: ['Java', 'Git'],
      },
      {
        step: 2,
        title: 'Web Protocols & REST API Architecture',
        stageType: 'Learning',
        milestones: ['HTTP semantics, headers, and status codes', 'RESTful API contract design with OpenAPI', 'Authentication via JWT & OAuth2'],
        status: 'Current',
        skillsAddressed: ['APIs', 'JavaScript'],
      },
      {
        step: 3,
        title: 'Relational & Distributed Databases',
        stageType: 'Missing Skills',
        milestones: ['PostgreSQL query indexing & EXPLAIN ANALYZE', 'ACID transactions and isolation levels', 'Redis caching strategies'],
        status: 'Upcoming',
        skillsAddressed: ['SQL', 'System Design'],
      },
      {
        step: 4,
        title: 'System Design & Distributed Patterns',
        stageType: 'Practice',
        milestones: ['Load balancers, reverse proxies, and CDNs', 'Message queues (Kafka / RabbitMQ) for async decoupling', 'Circuit breaker patterns'],
        status: 'Upcoming',
        skillsAddressed: ['System Design', 'Docker'],
      },
      {
        step: 5,
        title: 'High-Concurrency Backend Service Project',
        stageType: 'Project',
        milestones: ['Scalable multi-tenant SaaS backend', 'Automated unit and integration test suite (>80% coverage)', 'GitHub Actions CI/CD deployment'],
        status: 'Upcoming',
        skillsAddressed: ['Java', 'APIs', 'Git'],
      },
      {
        step: 6,
        title: 'SkillAlign Proctored Code Assessment',
        stageType: 'Verification',
        milestones: ['Live timed algorithmic problem solving', 'Code smell and security static audit', 'Verified engineering badge'],
        status: 'Upcoming',
        skillsAddressed: ['Verification', 'Clean Code'],
      },
      {
        step: 7,
        title: 'Product Engineering Internship',
        stageType: 'Internship',
        milestones: ['Production bug fixes and feature shipping', 'Collaborative agile sprints', 'Observability tracing setup'],
        status: 'Upcoming',
        skillsAddressed: ['Team Agility'],
      },
      {
        step: 8,
        title: 'Full-Time Campus Placement',
        stageType: 'Placement Readiness',
        milestones: ['Direct interview scheduling with partner enterprises', 'System design defense practice', 'Offer finalization'],
        status: 'Upcoming',
        skillsAddressed: ['Placement Ready'],
      },
    ],
  },
  'Full Stack Developer': {
    roleId: 'full-stack-developer',
    roleName: 'Full Stack Developer',
    industry: 'Modern Web Platforms',
    timelineWeeks: 14,
    stages: [
      {
        step: 1,
        title: 'Modern Frontend Fundamentals',
        stageType: 'Current Skills',
        milestones: ['TypeScript and React hooks mastery', 'Responsive layouts with Tailwind CSS', 'Client-side state management'],
        status: 'Completed',
        skillsAddressed: ['React', 'JavaScript', 'HTML/CSS'],
      },
      {
        step: 2,
        title: 'Server-Side Engineering & APIs',
        stageType: 'Learning',
        milestones: ['Node.js / Express microservices', 'Database integration with ORM (Prisma / Drizzle)', 'Secure cookie & token auth flows'],
        status: 'Current',
        skillsAddressed: ['APIs', 'SQL', 'Git'],
      },
      {
        step: 3,
        title: 'Full-Stack Performance & Security',
        stageType: 'Missing Skills',
        milestones: ['SSR / ISR caching with Next.js', 'OWASP Top 10 web vulnerability prevention', 'WebSocket real-time communication'],
        status: 'Upcoming',
        skillsAddressed: ['System Design', 'Docker'],
      },
      {
        step: 4,
        title: 'DevOps & Continuous Delivery',
        stageType: 'Practice',
        milestones: ['Docker container builds', 'Automated GitHub Actions CI/CD to Cloud Run', 'Zero-downtime database migrations'],
        status: 'Upcoming',
        skillsAddressed: ['Docker', 'Git'],
      },
      {
        step: 5,
        title: 'Commercial-Grade Web Platform Project',
        stageType: 'Project',
        milestones: ['Complete SaaS application with payment billing', 'Sub-second page load times', 'Lighthouse 95+ performance audit'],
        status: 'Upcoming',
        skillsAddressed: ['React', 'APIs', 'SQL'],
      },
      {
        step: 6,
        title: 'SkillAlign Verified Codebase Audit',
        stageType: 'Verification',
        milestones: ['Architectural design defense', 'Automated test coverage verification', 'Verified Full Stack Engineer credential'],
        status: 'Upcoming',
        skillsAddressed: ['Verification'],
      },
      {
        step: 7,
        title: 'Product Co-op / Startup Internship',
        stageType: 'Internship',
        milestones: ['Customer-facing feature delivery', 'Cross-browser compatibility QA', 'Analytics telemetry integration'],
        status: 'Upcoming',
        skillsAddressed: ['Product Craft'],
      },
      {
        step: 8,
        title: 'Elite Developer Placement',
        stageType: 'Placement Readiness',
        milestones: ['Direct portfolio showcase to tech recruiters', 'Take-home project defense mastery', 'Multi-offer selection'],
        status: 'Upcoming',
        skillsAddressed: ['Placement Ready'],
      },
    ],
  },
  'Data Analyst': {
    roleId: 'data-analyst',
    roleName: 'Data Analyst',
    industry: 'Business Intelligence & Operations',
    timelineWeeks: 12,
    stages: [
      {
        step: 1,
        title: 'Spreadsheet & Relational Querying Mastery',
        stageType: 'Current Skills',
        milestones: ['Advanced SQL window functions and CTEs', 'Data validation and schema understanding', 'Pivot tables and statistical functions'],
        status: 'Completed',
        skillsAddressed: ['SQL', 'Statistics'],
      },
      {
        step: 2,
        title: 'Python for Exploratory Data Analysis',
        stageType: 'Learning',
        milestones: ['Pandas data cleaning and merging', 'Outlier detection and normalization', 'Seaborn & Matplotlib visual synthesis'],
        status: 'Current',
        skillsAddressed: ['Python', 'Pandas'],
      },
      {
        step: 3,
        title: 'Business Intelligence Dashboards',
        stageType: 'Missing Skills',
        milestones: ['Power BI / Tableau data modeling (Star schema)', 'Interactive drill-down KPI dashboards', 'Automated scheduled refresh pipelines'],
        status: 'Upcoming',
        skillsAddressed: ['Data Visualization', 'Tableau'],
      },
      {
        step: 4,
        title: 'Predictive Modeling & Statistical Tests',
        stageType: 'Practice',
        milestones: ['Hypothesis testing and A/B test analysis', 'Linear regression for trend forecasting', 'Cohort retention analysis'],
        status: 'Upcoming',
        skillsAddressed: ['Statistics', 'Machine Learning'],
      },
      {
        step: 5,
        title: 'Executive BI Portfolio Project',
        stageType: 'Project',
        milestones: ['End-to-end e-commerce revenue analytics dashboard', 'Executive summary slide deck with actionable recommendations', 'Public Tableau / PowerBI showcase'],
        status: 'Upcoming',
        skillsAddressed: ['SQL', 'Data Visualization'],
      },
      {
        step: 6,
        title: 'SkillAlign Verified BI Challenge',
        stageType: 'Verification',
        milestones: ['Real-time SQL query benchmark test', 'Dashboard aesthetic and usability audit', 'Verified Data Analyst credential'],
        status: 'Upcoming',
        skillsAddressed: ['Verification'],
      },
      {
        step: 7,
        title: 'Corporate Analytics Internship',
        stageType: 'Internship',
        milestones: ['Executive reporting automation', 'Stakeholder presentation on customer churn', 'ETL pipeline quality auditing'],
        status: 'Upcoming',
        skillsAddressed: ['Executive Storytelling'],
      },
      {
        step: 8,
        title: 'High-Growth Placement Readiness',
        stageType: 'Placement Readiness',
        milestones: ['Pre-vetted introduction to enterprise BI teams', 'Case-study interview preparation', 'Placement finalization'],
        status: 'Upcoming',
        skillsAddressed: ['Placement Ready'],
      },
    ],
  },
  'Cloud Engineer': {
    roleId: 'cloud-engineer',
    roleName: 'Cloud Engineer',
    industry: 'Cloud Infrastructure & DevOps',
    timelineWeeks: 16,
    stages: [
      {
        step: 1,
        title: 'Linux Systems & Networking Fundamentals',
        stageType: 'Current Skills',
        milestones: ['Linux bash scripting and permissions', 'TCP/IP, DNS, VPC subnets, and routing tables', 'SSH key security and firewall rules'],
        status: 'Completed',
        skillsAddressed: ['Linux', 'Networking', 'Git'],
      },
      {
        step: 2,
        title: 'Containerization & Microservices',
        stageType: 'Learning',
        milestones: ['Docker container orchestration', 'Docker Compose multi-service stacks', 'Registry security and image vulnerability scanning'],
        status: 'Current',
        skillsAddressed: ['Docker', 'APIs'],
      },
      {
        step: 3,
        title: 'Cloud Providers (AWS / GCP) Architecture',
        stageType: 'Missing Skills',
        milestones: ['Compute Engine / EC2 auto-scaling groups', 'S3 / Cloud Storage lifecycle policies', 'IAM role least-privilege policies'],
        status: 'Upcoming',
        skillsAddressed: ['AWS', 'Cloud Computing'],
      },
      {
        step: 4,
        title: 'Infrastructure as Code (Terraform) & CI/CD',
        stageType: 'Practice',
        milestones: ['Terraform state management and modules', 'GitHub Actions automated cloud deployments', 'Zero-downtime rolling updates'],
        status: 'Upcoming',
        skillsAddressed: ['System Design', 'Git'],
      },
      {
        step: 5,
        title: 'Resilient Multi-Tier Cloud Project',
        stageType: 'Project',
        milestones: ['Highly available web cluster with load balancer', 'Automated failover and database read-replicas', 'Prometheus & Grafana telemetry dashboards'],
        status: 'Upcoming',
        skillsAddressed: ['Docker', 'AWS', 'Networking'],
      },
      {
        step: 6,
        title: 'SkillAlign Verified Cloud Lab Exam',
        stageType: 'Verification',
        milestones: ['Live timed outage troubleshooting scenario', 'Terraform configuration security audit', 'Verified Cloud Engineer badge'],
        status: 'Upcoming',
        skillsAddressed: ['Verification', 'Cloud Security'],
      },
      {
        step: 7,
        title: 'DevOps & Site Reliability Internship',
        stageType: 'Internship',
        milestones: ['Managing staging environments', 'Cloud cost optimization audit (saving 20%)', 'Participating in on-call incident simulations'],
        status: 'Upcoming',
        skillsAddressed: ['SRE Skills'],
      },
      {
        step: 8,
        title: 'Enterprise Infrastructure Placement',
        stageType: 'Placement Readiness',
        milestones: ['Placement matching with cloud consulting and tech giants', 'Architecture defense interview prep', 'Placement completion'],
        status: 'Upcoming',
        skillsAddressed: ['Placement Ready'],
      },
    ],
  },
  'Cybersecurity Analyst': {
    roleId: 'cybersecurity-analyst',
    roleName: 'Cybersecurity Analyst',
    industry: 'InfoSec & Security Operations',
    timelineWeeks: 16,
    stages: [
      {
        step: 1,
        title: 'Network Security & Packet Inspection',
        stageType: 'Current Skills',
        milestones: ['Wireshark packet capture analysis', 'OSI model and protocols (TLS, SSH, DNS)', 'Port scanning and reconnaissance with Nmap'],
        status: 'Completed',
        skillsAddressed: ['Networking', 'Linux'],
      },
      {
        step: 2,
        title: 'Security Operations & Threat Detection',
        stageType: 'Learning',
        milestones: ['SIEM log analysis with Splunk / Elastic', 'MITRE ATT&CK framework mapping', 'Incident response runbooks and triage'],
        status: 'Current',
        skillsAddressed: ['Cybersecurity', 'Linux'],
      },
      {
        step: 3,
        title: 'Vulnerability Assessment & Penetration Basics',
        stageType: 'Missing Skills',
        milestones: ['OWASP Top 10 web vulnerabilities (SQLi, XSS, CSRF)', 'Burp Suite proxy request tampering', 'CVSS vulnerability scoring'],
        status: 'Upcoming',
        skillsAddressed: ['Cybersecurity', 'Python'],
      },
      {
        step: 4,
        title: 'Security Automation with Python',
        stageType: 'Practice',
        milestones: ['Automated IP threat intelligence scraping', 'Log parsing and anomalous alert triggering', 'Automated firewall rule updates via APIs'],
        status: 'Upcoming',
        skillsAddressed: ['Python', 'APIs'],
      },
      {
        step: 5,
        title: 'SOC Detection & Defense Capstone Project',
        stageType: 'Project',
        milestones: ['Virtual SOC lab environment setup', 'Simulated brute-force attack detection and containment', 'Comprehensive post-incident postmortem report'],
        status: 'Upcoming',
        skillsAddressed: ['Cybersecurity', 'Networking'],
      },
      {
        step: 6,
        title: 'SkillAlign Verified Defense Challenge',
        stageType: 'Verification',
        milestones: ['Live capture-the-flag (CTF) defense exam', 'SOC report rubric verification by security practitioners', 'Verified Cyber Analyst credential'],
        status: 'Upcoming',
        skillsAddressed: ['Verification', 'Security'],
      },
      {
        step: 7,
        title: 'Enterprise SOC Internship',
        stageType: 'Internship',
        milestones: ['Tier-1 alert triage and escalation', 'Security compliance documentation (ISO 27001)', 'Phishing simulation campaign deployment'],
        status: 'Upcoming',
        skillsAddressed: ['SOC Operations'],
      },
      {
        step: 8,
        title: 'Enterprise Cyber Placement',
        stageType: 'Placement Readiness',
        milestones: ['Direct interview pipeline with banking and enterprise SOCs', 'Scenario-based technical interview prep', 'Placement offer acceptance'],
        status: 'Upcoming',
        skillsAddressed: ['Placement Ready'],
      },
    ],
  },
};

export function getCareerPathForRole(roleName: string, learner: LearnerProfile): CareerPathModel {
  const model = careerPathsByRole[roleName] || careerPathsByRole['Data Scientist'];
  // Dynamically personalize stages based on learner's actual skills!
  const gaps = gapsForLearner(learner, requirementsForRole(roleName));
  const gapSkills = gaps.map((g) => g.skill);

  return {
    ...model,
    stages: model.stages.map((stage) => {
      // If stage addresses gap skills that user doesn't have, ensure it's marked appropriately
      const hasGaps = stage.skillsAddressed.some((s) => gapSkills.includes(s));
      return {
        ...stage,
        status: hasGaps ? stage.status : 'Completed',
      };
    }),
  };
}

// 3. Dynamic AI Project Recommendation Engine based on student's actual gaps
export function generateProjectRecommendationsFromGaps(
  learner: LearnerProfile,
  role: JobRole
): ProjectRecommendation[] {
  const gaps = gapsForLearner(learner, role);
  const gapNames = gaps.map((g) => g.skill);

  const projectBank: Array<ProjectRecommendation & { requiredGapHints: string[] }> = [
    {
      id: 'proj-fastapi-docker-ml',
      title: 'Production ML Inference Engine with Docker & FastAPI',
      whyThisProject: `Bridges your critical gap in Docker, MLOps, and API deployment. Proves to hiring managers you can serve models with sub-50ms latency in containerized production.`,
      skillsBuilt: ['Docker', 'APIs', 'Machine Learning', 'Python', 'MLOps'],
      techStack: ['Python', 'FastAPI', 'Docker', 'Scikit-learn', 'GitHub Actions'],
      difficulty: 'Intermediate',
      estimatedTime: '18 hours across 2 weeks',
      expectedOutput: 'Containerized REST microservice with automated test suite, live Swagger UI, and Docker Hub image.',
      portfolioValue: 'Top-tier portfolio piece for Data Science & ML roles. Answers system architecture interview questions directly.',
      industryRelevance: '92% of production AI teams require Dockerized deployment and REST API interfaces.',
      missingSkillsBridged: ['Docker', 'APIs', 'MLOps'],
      requiredGapHints: ['Docker', 'APIs', 'MLOps', 'Machine Learning'],
    },
    {
      id: 'proj-rag-agent-doc',
      title: 'Enterprise Knowledge RAG Agent with Semantic Retrieval',
      whyThisProject: `Addresses modern industry demand for Generative AI and Vector Databases. Transforms raw documentation into a conversational intelligent assistant.`,
      skillsBuilt: ['Generative AI', 'Python', 'APIs', 'System Design'],
      techStack: ['Gemini 2.5 Flash', 'ChromaDB', 'FastAPI', 'React', 'TypeScript'],
      difficulty: 'Advanced',
      estimatedTime: '24 hours across 3 weeks',
      expectedOutput: 'Full-stack application supporting PDF ingestion, hybrid BM25 + vector search, and citation-backed answering.',
      portfolioValue: 'Demonstrates cutting-edge GenAI architectural competence beyond basic API wrappers.',
      industryRelevance: 'Emerging skill with 410% demand surge across corporate knowledge management.',
      missingSkillsBridged: ['Generative AI', 'APIs'],
      requiredGapHints: ['Generative AI', 'APIs', 'Deep Learning'],
    },
    {
      id: 'proj-financial-sql-bi',
      title: 'Real-Time Financial Telemetry & Cohort BI Dashboard',
      whyThisProject: `Directly targets your gap in advanced SQL and data pipeline modeling. Demonstrates capability to extract business-critical insights from millions of transactional records.`,
      skillsBuilt: ['SQL', 'Data Modeling', 'Statistics', 'Pandas'],
      techStack: ['PostgreSQL', 'DuckDB', 'Streamlit / React', 'Tailwind CSS'],
      difficulty: 'Intermediate',
      estimatedTime: '14 hours across 10 days',
      expectedOutput: 'Interactive dashboard with window-function-driven cohort retention curves, churn hazard rates, and KPI metrics.',
      portfolioValue: 'Essential evidence docket for Data Analyst and Data Scientist interviews.',
      industryRelevance: 'Required skill across 100% of financial, analytics, and product engineering job descriptions.',
      missingSkillsBridged: ['SQL', 'Statistics'],
      requiredGapHints: ['SQL', 'Statistics', 'Pandas'],
    },
    {
      id: 'proj-distributed-saas-backend',
      title: 'High-Throughput Multi-Tenant SaaS Backend with PostgreSQL',
      whyThisProject: `Solves your system design and database indexing gap. Shows employers you can write resilient server-side code that handles concurrency safely.`,
      skillsBuilt: ['System Design', 'SQL', 'APIs', 'Git'],
      techStack: ['Node.js / Java', 'PostgreSQL', 'Redis', 'Docker'],
      difficulty: 'Advanced',
      estimatedTime: '28 hours across 3 weeks',
      expectedOutput: 'Production-ready REST API with connection pooling, rate limiting, JWT RBAC security, and automated stress benchmarks.',
      portfolioValue: 'Gold-standard project for Software Engineer and Full Stack candidates.',
      industryRelevance: 'Every enterprise SaaS vendor evaluates candidate database design and concurrency competence.',
      missingSkillsBridged: ['System Design', 'SQL', 'APIs'],
      requiredGapHints: ['System Design', 'SQL', 'Java', 'APIs'],
    },
    {
      id: 'proj-cloud-kubernetes-sre',
      title: 'Cloud-Native Resilient Microservices Cluster on AWS',
      whyThisProject: `Closes your cloud infrastructure and automated CI/CD gap. Proves hands-on competence managing real-world cloud architectures.`,
      skillsBuilt: ['AWS', 'Cloud Computing', 'Docker', 'Networking'],
      techStack: ['AWS ECS / EKS', 'Terraform', 'Docker', 'Prometheus', 'Grafana'],
      difficulty: 'Advanced',
      estimatedTime: '22 hours across 2.5 weeks',
      expectedOutput: 'Terraform-provisioned AWS infrastructure running multi-container load-balanced web services with auto-scaling.',
      portfolioValue: 'Differentiates you from applicants who only know local development by proving cloud-native mindset.',
      industryRelevance: 'Cloud proficiency is cited in 84% of modern engineering job postings.',
      missingSkillsBridged: ['AWS', 'Cloud Computing', 'Docker'],
      requiredGapHints: ['AWS', 'Cloud Computing', 'Docker', 'Networking'],
    },
  ];

  // Prioritize projects that match candidate's actual missing skills
  const ranked = projectBank.sort((a, b) => {
    const aMatch = a.missingSkillsBridged.filter((s) => gapNames.includes(s)).length;
    const bMatch = b.missingSkillsBridged.filter((s) => gapNames.includes(s)).length;
    return bMatch - aMatch;
  });

  return ranked.slice(0, 3);
}

// 4. Sample Job Descriptions for Instant Demo & Testing
export const sampleJobDescriptions = [
  {
    title: 'Google Cloud — Associate AI/ML Solutions Engineer',
    company: 'Google Cloud India',
    text: `Job Summary:
We are seeking an Associate AI/ML Solutions Engineer to join Google Cloud. You will work with enterprise partners to design, prototype, and deploy cloud-native machine learning architectures and generative AI solutions.

Key Responsibilities:
- Design and implement end-to-end ML workflows using Python, PyTorch/TensorFlow, and Google Cloud Vertex AI.
- Package models into containerized microservices using Docker and expose secure RESTful APIs (FastAPI / gRPC).
- Build RAG (Retrieval Augmented Generation) pipelines with vector databases and Large Language Models.
- Write high-performance SQL queries across BigQuery and PostgreSQL databases.
- Automate MLOps retraining pipelines with CI/CD and telemetry monitoring.

Required Qualifications:
- Bachelor's degree in Computer Science, Data Science, or equivalent practical experience.
- Strong proficiency in Python and modern ML libraries (Scikit-learn, PyTorch, Pandas).
- Hands-on experience building and deploying REST APIs using FastAPI or Flask.
- Experience with Docker containerization and Git version control.
- Solid understanding of SQL, data modeling, and relational databases.

Preferred Qualifications:
- Familiarity with Generative AI APIs, prompt engineering, and embeddings.
- Experience with Google Cloud Platform (GCP) or AWS cloud infrastructure.
- Background in statistics and quantitative evaluation metrics.
- Strong written and verbal technical communication skills.`,
  },
  {
    title: 'Swiggy — Full Stack Software Development Engineer (SDE-2)',
    company: 'Swiggy',
    text: `About the Role:
Swiggy is looking for a dynamic Full Stack Software Engineer to build hyper-scale ordering and logistics management systems handling millions of transactions daily.

Responsibilities:
- Architect high-performance, accessible frontend interfaces in React.js and TypeScript.
- Build resilient backend microservices using Node.js/Java with high concurrency guarantees.
- Optimize complex PostgreSQL queries and database schemas for low latency read/writes.
- Implement containerized workflows using Docker and automate deployments via GitHub Actions CI/CD.
- Ensure strict web security standards and API rate-limiting protections.

Requirements:
- Strong command of React, JavaScript (ES6+), and modern CSS frameworks (Tailwind).
- In-depth knowledge of REST APIs, HTTP protocols, and server-side engineering.
- Proficiency in relational databases (PostgreSQL, MySQL) and database indexing strategies.
- Experience with Git, Docker, and Linux environments.
- Solid foundation in Data Structures, Algorithms, and Object-Oriented Design.`,
  },
  {
    title: 'Goldman Sachs — Quantitative Data & Analytics Associate',
    company: 'Goldman Sachs',
    text: `Position Overview:
Join the Global Analytics division at Goldman Sachs. We build data intelligence pipelines, predictive risk algorithms, and automated telemetry dashboards for international markets.

Key Requirements:
- Advanced SQL: Ability to write complex CTEs, window functions, and optimize query plans.
- Python: Deep expertise in Pandas, NumPy, and statistical hypothesis testing.
- Business Intelligence: Experience building interactive dashboards with Power BI, Tableau, or Streamlit.
- Machine Learning: Familiarity with regression, classification, and time-series forecasting.
- Education: Degree in Computer Science, Statistics, Mathematics, or Economics.`,
  },
];

// Heuristic / Client-side Job Description Scanner
export function scanJobDescriptionText(
  text: string,
  learner: LearnerProfile,
  targetRoleName?: string
): JobDescriptionScanResult {
  const lower = text.toLowerCase();

  // Extract skills from text
  const catalogSkills = [
    'Python',
    'Machine Learning',
    'SQL',
    'Statistics',
    'Pandas',
    'Scikit-learn',
    'Git',
    'Java',
    'JavaScript',
    'React',
    'APIs',
    'Docker',
    'Deep Learning',
    'Generative AI',
    'AWS',
    'Linux',
    'Networking',
    'Cybersecurity',
    'MLOps',
    'PyTorch',
    'System Design',
    'HTML/CSS',
    'Tableau',
    'Power BI',
  ];

  const foundSkills = catalogSkills.filter((skill) => {
    const s = skill.toLowerCase();
    return lower.includes(s);
  });

  const required = foundSkills.slice(0, 6);
  const preferred = foundSkills.slice(6, 10);

  // Compare against candidate profile skills
  const matchingSkills: string[] = [];
  const partialMatchSkills: string[] = [];
  const missingSkills: string[] = [];

  required.forEach((reqSkill) => {
    const candidateLevel = learner.skills[reqSkill];
    if (candidateLevel === 'Advanced' || candidateLevel === 'Intermediate') {
      matchingSkills.push(reqSkill);
    } else if (candidateLevel === 'Beginner') {
      partialMatchSkills.push(reqSkill);
    } else {
      missingSkills.push(reqSkill);
    }
  });

  preferred.forEach((prefSkill) => {
    if (!learner.skills[prefSkill] && !missingSkills.includes(prefSkill)) {
      missingSkills.push(prefSkill);
    } else if (learner.skills[prefSkill] && !matchingSkills.includes(prefSkill)) {
      matchingSkills.push(prefSkill);
    }
  });

  const totalPoints = required.length * 10 + preferred.length * 5;
  const earnedPoints = matchingSkills.length * 10 + partialMatchSkills.length * 5;
  const matchScore = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 65;

  // Extract company & title heuristics
  let jobTitle = targetRoleName || 'Target Engineering Role';
  if (lower.includes('data scientist')) jobTitle = 'Data Scientist';
  else if (lower.includes('ml engineer') || lower.includes('machine learning engineer')) jobTitle = 'Machine Learning Engineer';
  else if (lower.includes('ai engineer') || lower.includes('solutions engineer')) jobTitle = 'AI Solutions Engineer';
  else if (lower.includes('full stack')) jobTitle = 'Full Stack Developer';
  else if (lower.includes('software engineer') || lower.includes('sde')) jobTitle = 'Software Development Engineer';
  else if (lower.includes('data analyst')) jobTitle = 'Data Analyst';
  else if (lower.includes('cloud')) jobTitle = 'Cloud Infrastructure Engineer';
  else if (lower.includes('cyber')) jobTitle = 'Cybersecurity Analyst';

  let company = 'Industry Enterprise Partner';
  if (lower.includes('google')) company = 'Google Cloud India';
  else if (lower.includes('swiggy')) company = 'Swiggy';
  else if (lower.includes('goldman')) company = 'Goldman Sachs';
  else if (lower.includes('microsoft')) company = 'Microsoft';
  else if (lower.includes('amazon')) company = 'Amazon AWS';

  return {
    jobTitle,
    company,
    experienceRequired: '0 - 2 years (Entry / Early Career)',
    educationRequired: 'B.Tech / B.E. / M.Tech / MCA in Computer Science, Data Science, or related STEM',
    requiredSkills: required.length > 0 ? required : ['Python', 'SQL', 'Git', 'APIs'],
    preferredSkills: preferred.length > 0 ? preferred : ['Docker', 'Generative AI', 'AWS'],
    toolsAndTech: ['Git', 'Docker', 'FastAPI', 'PostgreSQL', 'VS Code'],
    softSkills: ['Analytical Problem Solving', 'Cross-Functional Collaboration', 'Clear Technical Writing'],
    responsibilities: [
      'Design, build, and deploy production-grade software and analytical pipelines.',
      'Collaborate with engineering teammates on code reviews and automated CI/CD releases.',
      'Maintain rigorous standards for performance, code quality, and security compliance.',
    ],
    matchScore,
    matchingSkills,
    partialMatchSkills,
    missingSkills,
    recommendedProjects: [
      {
        title: `Containerized ${missingSkills[0] || 'FastAPI'} Service for Production`,
        reason: `Directly demonstrates the top missing skill (${missingSkills[0] || 'Production APIs'}) required by ${company}.`,
        techStack: [missingSkills[0] || 'FastAPI', 'Docker', 'Python', 'Git'],
        difficulty: 'Intermediate',
        estimatedHours: 16,
      },
      {
        title: `Automated Pipeline & Telemetry for ${jobTitle}`,
        reason: `Shows hiring managers you can integrate ${matchingSkills.slice(0, 2).join(' + ')} into commercial-grade systems.`,
        techStack: ['Python', 'SQL', 'PostgreSQL', 'Docker'],
        difficulty: 'Advanced',
        estimatedHours: 24,
      },
    ],
    learningResources: missingSkills.map((sk) => ({
      skill: sk,
      action: `Complete hands-on documentation lab and build a single-purpose proof project in ${sk}.`,
    })),
    suggestedAssessment: `SkillAlign Proctored Diagnostic: ${jobTitle} Core Competency Exam`,
  };
}

// 5. Academia–Industry Curriculum Heatmap & Alignment Matrix
export const curriculumHeatmapData: CurriculumHeatmapCell[] = [
  {
    subject: 'Database Management Systems (DBMS)',
    code: 'CS-401',
    department: 'Computer Science & Engineering',
    year: 'Year 2',
    semester: 'Semester 4',
    skillCoverage: {
      SQL: 'Strong',
      'Data Modeling': 'Strong',
      'Relational Algebra': 'Strong',
      PostgreSQL: 'Moderate',
      'Cloud Databases': 'Missing',
      ETL: 'Missing',
      'Data Warehousing': 'Missing',
      'Vector Databases': 'Missing',
    },
    overallAlignment: 58,
    missingIndustrySkills: ['Cloud Databases', 'ETL', 'Data Warehousing', 'Vector Databases'],
  },
  {
    subject: 'Data Structures & Algorithms (DSA)',
    code: 'CS-302',
    department: 'Computer Science & Engineering',
    year: 'Year 2',
    semester: 'Semester 3',
    skillCoverage: {
      'C++ / Java': 'Strong',
      'Complexity Analysis': 'Strong',
      'Dynamic Programming': 'Strong',
      'Graph Theory': 'Moderate',
      'Real-world Benchmarking': 'Weak',
      'Concurrency & Multithreading': 'Weak',
      'Memory Profiling': 'Missing',
    },
    overallAlignment: 72,
    missingIndustrySkills: ['Real-world Benchmarking', 'Concurrency & Multithreading', 'Memory Profiling'],
  },
  {
    subject: 'Object Oriented Programming (OOP)',
    code: 'CS-304',
    department: 'Information Technology',
    year: 'Year 2',
    semester: 'Semester 3',
    skillCoverage: {
      Java: 'Strong',
      'OOP Principles': 'Strong',
      'Design Patterns': 'Moderate',
      Git: 'Weak',
      'Unit Testing (JUnit)': 'Weak',
      'CI/CD Workflows': 'Missing',
      'Clean Code Refactoring': 'Weak',
    },
    overallAlignment: 64,
    missingIndustrySkills: ['Git', 'CI/CD Workflows', 'Clean Code Refactoring'],
  },
  {
    subject: 'Artificial Intelligence & Machine Learning',
    code: 'CS-603',
    department: 'Computer Science (AI & ML)',
    year: 'Year 3',
    semester: 'Semester 6',
    skillCoverage: {
      'Python Math': 'Strong',
      'Classical ML (Scikit-learn)': 'Strong',
      'Search Algorithms': 'Strong',
      'Deep Learning (PyTorch)': 'Moderate',
      'MLOps Pipelines': 'Missing',
      'Docker Packaging': 'Missing',
      'Generative AI / LLMs': 'Missing',
      'Model Latency Tuning': 'Missing',
    },
    overallAlignment: 52,
    missingIndustrySkills: ['MLOps Pipelines', 'Docker Packaging', 'Generative AI / LLMs', 'Model Latency Tuning'],
  },
  {
    subject: 'Web Application Technologies',
    code: 'IT-502',
    department: 'Information Technology',
    year: 'Year 3',
    semester: 'Semester 5',
    skillCoverage: {
      'HTML / CSS': 'Strong',
      JavaScript: 'Strong',
      PHP: 'Moderate',
      React: 'Weak',
      TypeScript: 'Missing',
      'REST APIs': 'Moderate',
      'Cloud Serverless': 'Missing',
    },
    overallAlignment: 48,
    missingIndustrySkills: ['React', 'TypeScript', 'Cloud Serverless'],
  },
  {
    subject: 'Computer Networks & Cloud Systems',
    code: 'CS-505',
    department: 'Computer Science & Engineering',
    year: 'Year 3',
    semester: 'Semester 5',
    skillCoverage: {
      'OSI Model': 'Strong',
      'TCP/IP Protocols': 'Strong',
      Subnetting: 'Strong',
      'AWS / GCP Cloud': 'Weak',
      'Docker Containers': 'Weak',
      'Kubernetes Orchestration': 'Missing',
      'Infrastructure as Code': 'Missing',
    },
    overallAlignment: 56,
    missingIndustrySkills: ['AWS / GCP Cloud', 'Kubernetes Orchestration', 'Infrastructure as Code'],
  },
  {
    subject: 'Operating Systems & System Architecture',
    code: 'CS-403',
    department: 'Computer Science & Engineering',
    year: 'Year 2',
    semester: 'Semester 4',
    skillCoverage: {
      'Process Scheduling': 'Strong',
      'Deadlock Management': 'Strong',
      'Virtual Memory': 'Strong',
      'Linux Kernel Internals': 'Moderate',
      'Shell Scripting': 'Moderate',
      'Virtualization / cgroups': 'Weak',
      'Distributed Systems': 'Missing',
    },
    overallAlignment: 68,
    missingIndustrySkills: ['Virtualization / cgroups', 'Distributed Systems'],
  },
  {
    subject: 'Software Engineering & Project Management',
    code: 'CS-501',
    department: 'Computer Science & Engineering',
    year: 'Year 3',
    semester: 'Semester 5',
    skillCoverage: {
      'Waterfall Model': 'Strong',
      'Agile / Scrum': 'Moderate',
      'Software Testing Basics': 'Moderate',
      'GitHub Pull Request Review': 'Weak',
      'CI/CD Automated Testing': 'Missing',
      'Security Auditing (OWASP)': 'Missing',
      'Production Monitoring': 'Missing',
    },
    overallAlignment: 45,
    missingIndustrySkills: ['GitHub Pull Request Review', 'CI/CD Automated Testing', 'Security Auditing (OWASP)', 'Production Monitoring'],
  },
];

// 6. Opportunity Intelligence matched to verified skills
export const opportunityIntelligenceList: OpportunityItem[] = [
  {
    id: 'opp-1',
    title: 'Machine Learning Engineering Intern',
    company: 'PhonePe Technologies',
    location: 'Bengaluru, India (Hybrid)',
    type: 'Internship',
    stipend: '₹45,000 / month + Pre-Placement Offer (PPO)',
    requiredSkills: ['Python', 'Machine Learning', 'SQL', 'FastAPI'],
    preferredSkills: ['Docker', 'PyTorch', 'Git'],
    studentMatchScore: 84,
    missingSkills: ['Docker'],
    readinessStatus: 'Ready to Apply',
    recommendedAction: 'Complete Docker microservice containerization project to unlock 96% match.',
    verifiedEvidenceCount: 3,
  },
  {
    id: 'opp-2',
    title: 'Associate Data Scientist — Predictive Modeling',
    company: 'Fractal Analytics',
    location: 'Mumbai / Pune, India',
    type: 'Full-Time',
    stipend: '₹8.5 - 11.0 LPA',
    requiredSkills: ['Python', 'Pandas', 'Scikit-learn', 'Statistics', 'SQL'],
    preferredSkills: ['Generative AI', 'Docker'],
    studentMatchScore: 91,
    missingSkills: ['Generative AI'],
    readinessStatus: 'Ready to Apply',
    recommendedAction: 'Generate verified SkillAlign profile docket and submit instant application.',
    verifiedEvidenceCount: 4,
  },
  {
    id: 'opp-3',
    title: 'Cloud & AI Infrastructure Apprentice',
    company: 'Cognizant AI Labs',
    location: 'Hyderabad, India',
    type: 'Apprenticeship',
    stipend: '₹35,000 / month (6 months duration)',
    requiredSkills: ['Python', 'Linux', 'Cloud Computing', 'APIs'],
    preferredSkills: ['AWS', 'Docker', 'Kubernetes'],
    studentMatchScore: 72,
    missingSkills: ['AWS', 'Docker'],
    readinessStatus: 'Minor Gap',
    recommendedAction: 'Bridge Docker and AWS gaps using the guided 2-week learning path in Skill Hub.',
    verifiedEvidenceCount: 2,
  },
  {
    id: 'opp-4',
    title: 'Backend Software Development Engineer (SDE-1)',
    company: 'Razorpay Financial Technologies',
    location: 'Bengaluru, India',
    type: 'Full-Time',
    stipend: '₹14.0 - 18.0 LPA',
    requiredSkills: ['Java', 'SQL', 'APIs', 'System Design', 'Git'],
    preferredSkills: ['Docker', 'PostgreSQL', 'Redis'],
    studentMatchScore: 68,
    missingSkills: ['System Design', 'Docker'],
    readinessStatus: 'Gap to Close',
    recommendedAction: 'Demonstrate multi-tenant backend project in portfolio to satisfy system design benchmark.',
    verifiedEvidenceCount: 2,
  },
];

// 7. SIH Judge Presentation Mode Steps (Requirement 12: 12-Step Guided Flow)
export const judgePresentationSteps: JudgeStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'Upload Resume',
    category: 'Stage 1: Student Ingestion',
    problemStatement: 'Students upload unvetted resumes in PDF or DOCX format containing ambitious technical skill claims.',
    solutionImpact: 'Secure multi-format resume intake engine with instant parsing and candidate benchmarking.',
    interactiveDemoTarget: { role: 'Student', page: 'upload' },
    metrics: [
      { label: 'File Support', value: 'PDF, DOCX, DOC' },
      { label: 'Ingestion Time', value: '< 1.2s' },
    ],
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'Resume Intelligence',
    category: 'Stage 2: Semantic Analysis',
    problemStatement: 'Traditional keyword search fails to verify context, projects, or repository artifacts backing skill claims.',
    solutionImpact: '9-stage progressive intelligence extracting Education, Technical Skills, Repositories, and Experience.',
    interactiveDemoTarget: { role: 'Student', page: 'scanning' },
    metrics: [
      { label: 'Extraction Depth', value: '11 Core Dimensions' },
      { label: 'Confidence Model', value: 'Contextual Vector Mapping' },
    ],
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'Claimed Skills',
    category: 'Stage 3: Evidence Categorization',
    problemStatement: 'Unverified claims risk recruiter rejection if labeled as definitive proficiencies.',
    solutionImpact: 'Every skill labeled with Source, Evidence Strength, and Status: VERIFIED, PARTIALLY VERIFIED, NEEDS EVIDENCE, UNVERIFIED.',
    interactiveDemoTarget: { role: 'Student', page: 'claimed' },
    metrics: [
      { label: 'Claim Transparency', value: 'No Hallucinated Claims' },
      { label: 'Evidence Traces', value: 'Repository & Coursework' },
    ],
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'Skill Verification',
    category: 'Stage 4: Diagnostic Calibration',
    problemStatement: 'Candidates need an objective, unassisted evaluation mechanism tailored directly to their claimed abilities.',
    solutionImpact: 'Automated calibration generating tailored coding benchmarks across Python, SQL, ML, and Algorithms.',
    interactiveDemoTarget: { role: 'Student', page: 'claimed' },
    metrics: [
      { label: 'Test Generator', value: 'Adaptive 10-Problem Matrix' },
      { label: 'Integrity Shield', value: 'Live 10-Minute Timer' },
    ],
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'Personalized Coding Assessment',
    category: 'Stage 5: Secure Code Sandbox',
    problemStatement: 'Students must NEVER see solutions, hidden tests, or expected output before unassisted submission.',
    solutionImpact: 'Air-gapped starter code, real in-browser execution, 2 sample test cases, and 3 hidden test cases.',
    interactiveDemoTarget: { role: 'Student', page: 'test' },
    metrics: [
      { label: 'Problem Pool', value: '10 Diagnostic Problems' },
      { label: 'Test Case Security', value: 'Hidden Case Obfuscation' },
    ],
  },
  {
    id: 'step-6',
    stepNumber: 6,
    title: 'Skill Proof',
    category: 'Stage 6: Multi-Vector Proof Matrix',
    problemStatement: 'Employers demand verifiable proof beyond self-reported grades or multiple-choice trivia.',
    solutionImpact: 'SKILL PROOF table synthesizing Resume Claim (✓), Assessment Score (%), Project Repos, and Practical Evidence (%).',
    interactiveDemoTarget: { role: 'Student', page: 'verified' },
    metrics: [
      { label: 'Verification Tiers', value: 'High / Medium / Needs Evidence' },
      { label: 'Proof Docket', value: 'Immutable Recruiter Audit' },
    ],
  },
  {
    id: 'step-7',
    stepNumber: 7,
    title: 'Role Fit Engine',
    category: 'Stage 7: Workforce Role Alignment',
    problemStatement: 'Students apply blindly to jobs without understanding role-specific baseline prerequisites.',
    solutionImpact: 'Evaluates fit across 8 standardized industry roles with dynamic Skill Fit, Assessment Fit, and Education mapping.',
    interactiveDemoTarget: { role: 'Student', page: 'skillgap' },
    metrics: [
      { label: 'Role Coverage', value: '8 Standard Tech Roles' },
      { label: 'Top Candidate Fit', value: '84% Data Scientist Fit' },
    ],
  },
  {
    id: 'step-8',
    stepNumber: 8,
    title: 'Skill Gap',
    category: 'Stage 8: Precision Gap Detection',
    problemStatement: 'Students waste months studying irrelevant topics rather than critical hiring rejection flags.',
    solutionImpact: 'Classifies gaps into Critical (Docker, Deployment), Important (Quantization), and Optional (Spark).',
    interactiveDemoTarget: { role: 'Student', page: 'skillgap' },
    metrics: [
      { label: 'Critical Gap', value: 'Docker Containerization' },
      { label: 'Gap Actionability', value: 'Immediate Sprint Mapping' },
    ],
  },
  {
    id: 'step-9',
    stepNumber: 9,
    title: 'Next Best Action',
    category: 'Stage 9: Single Highest-Impact Project',
    problemStatement: 'Students are paralyzed by dozens of competing courses, tutorials, and certificates.',
    solutionImpact: 'Recommends ONE high-impact mission: "Build a Dockerized ML API" with step-by-step recruiter audit proof.',
    interactiveDemoTarget: { role: 'Student', page: 'skillgap' },
    metrics: [
      { label: 'Target Mission', value: 'Dockerized ML API' },
      { label: 'Sprint Duration', value: '2.5 Weeks' },
    ],
  },
  {
    id: 'step-10',
    stepNumber: 10,
    title: 'What-If Simulator',
    category: 'Stage 10: Career Trajectory Projection',
    problemStatement: 'Learners cannot visualize the quantitative career return on acquiring specific technologies.',
    solutionImpact: 'Interactive toggle simulating role fit boost (+7% with Docker, +6% with Cloud) with explicit AI projection disclaimer.',
    interactiveDemoTarget: { role: 'Student', page: 'skillgap' },
    metrics: [
      { label: 'Projected Uplift', value: '84% → 91% Role Fit' },
      { label: 'Disclaimer', value: 'Not a Hiring Guarantee' },
    ],
  },
  {
    id: 'step-11',
    stepNumber: 11,
    title: 'Institution Analytics',
    category: 'Stage 11: Academia Intelligence',
    problemStatement: 'Deans and Academic Councils have no automated audit showing which subjects lag behind industry tech stacks.',
    solutionImpact: 'Institutional Curriculum Audit showing 68% Alignment Index, 32% Batch Gap, and syllabus revision proposals.',
    interactiveDemoTarget: { role: 'Institution', page: 'curriculum' },
    metrics: [
      { label: 'Curriculum Index', value: '68% Alignment' },
      { label: 'Top Cohort Gaps', value: 'Docker, ML Deployment' },
    ],
  },
  {
    id: 'step-12',
    stepNumber: 12,
    title: 'Employer View',
    category: 'Stage 12: Talent Matching & Profiles',
    problemStatement: 'Enterprises spend ₹1.2L per hire screening candidates with misleading, unverified CVs.',
    solutionImpact: 'Pre-verified candidate sourcing directory with code benchmark percentiles and company tech stack alignment.',
    interactiveDemoTarget: { role: 'Employer', page: 'candidates' },
    metrics: [
      { label: 'Screening Time', value: '-68% Reduction' },
      { label: 'Candidate Pool', value: '100% Code Verified' },
    ],
  },
];

// 8. Realistic Fictional Demo Profile for 3-5 Minute Presentation
export const demoStudentDataScientist: LearnerProfile = {
  id: 'aarav-demo-sih2026',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@campus.edu.in',
  phone: '+91 98765 43210',
  location: 'Pune / Bengaluru, India',
  education: 'B.Tech in Computer Science & Engineering (Data Science Specialization)',
  degree: 'B.Tech CSE',
  branch: 'Data Science & Machine Learning',
  college: 'Pune Institute of Computer Technology (PICT)',
  graduation: 'Batch of 2026 (Final Year)',
  targetRole: 'Data Scientist',
  skills: {
    Python: 'Advanced',
    'Machine Learning': 'Intermediate',
    SQL: 'Intermediate',
    Statistics: 'Advanced',
    Pandas: 'Intermediate',
    'Scikit-learn': 'Intermediate',
    Git: 'Beginner',
  },
  programmingLanguages: ['Python', 'SQL', 'C++'],
  frameworks: ['Scikit-learn', 'Pandas', 'NumPy'],
  databases: ['PostgreSQL', 'SQLite'],
  cloud: ['Google Cloud (Foundations)'],
  aiml: ['Linear Regression', 'Decision Trees', 'Random Forests', 'K-Means'],
  tools: ['VS Code', 'Git', 'Jupyter Notebook'],
  softSkills: ['Analytical Rigor', 'Data Visualization', 'Technical Documentation'],
  projects: 3,
  experience: 0.5,
  assessment: 82,
  shareProfile: true,
  sourceFile: 'Aarav_Sharma_Resume_DataScience.pdf',
  certifications: 2,
  achievements: 3,
  profileCompleteness: 92,
  skillConfidence: 84,
  technicalReadiness: 78,
  roleReadiness: 79,
  industryAlignment: 81,
};
