import { Level, LearnerProfile } from '../types';

export interface ResumeExtractionResult {
  name: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  branch: string;
  experience: number;
  skills: Record<string, Level>;
  projects: number;
  certifications: number;
  achievements: number;
  sourceFile: string;
}

const skillAliases: Record<string, string[]> = {
  Python: ['python', 'py3', 'pandas', 'numpy'],
  SQL: ['sql', 'postgresql', 'mysql', 'sqlite', 'rdbms', 'queries'],
  Java: ['java', 'spring', 'jvm'],
  JavaScript: ['javascript', 'js', 'es6', 'node'],
  TypeScript: ['typescript', 'ts'],
  React: ['react', 'reactjs', 'react.js', 'redux', 'next.js'],
  Git: ['git', 'github', 'version control', 'gitlab'],
  'Machine Learning': ['machine learning', 'ml', 'scikit-learn', 'sklearn', 'regression', 'random forest'],
  Statistics: ['statistics', 'probability', 'hypothesis testing', 'statistical analysis'],
  Pandas: ['pandas', 'dataframes'],
  'Scikit-learn': ['scikit-learn', 'sklearn'],
  'Deep Learning': ['deep learning', 'neural networks', 'pytorch', 'tensorflow', 'keras'],
  'Generative AI': ['generative ai', 'genai', 'llm', 'large language models', 'rag', 'langchain', 'prompt engineering'],
  MLOps: ['mlops', 'model deployment', 'mlflow', 'wandb', 'kubeflow'],
  Docker: ['docker', 'containerization', 'dockerfile', 'compose'],
  AWS: ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'iam'],
  'Cloud Computing': ['cloud computing', 'gcp', 'azure', 'cloud architect'],
  Linux: ['linux', 'bash', 'shell scripting', 'ubuntu'],
  Cybersecurity: ['cybersecurity', 'infosec', 'penetration testing', 'vulnerability', 'owasp'],
  Networking: ['networking', 'tcp/ip', 'dns', 'firewalls', 'protocols'],
  'Power BI': ['power bi', 'powerbi', 'dax'],
  'Data Visualization': ['data visualization', 'tableau', 'matplotlib', 'seaborn'],
  APIs: ['api', 'rest api', 'restful', 'graphql', 'endpoints'],
  'System Design': ['system design', 'distributed systems', 'microservices', 'caching', 'load balancer'],
  'HTML/CSS': ['html', 'css', 'tailwind', 'sass', 'responsive design'],
};

export function parseResumeClient(text: string, fileName: string): ResumeExtractionResult {
  const normalized = ` ${text.toLowerCase()} `;
  const detectedSkills: Record<string, Level> = {};

  for (const [skill, keywords] of Object.entries(skillAliases)) {
    const hasMatch = keywords.some((kw) => normalized.includes(kw));
    if (hasMatch) {
      if (normalized.includes(`senior ${skill.toLowerCase()}`) || normalized.includes(`advanced ${skill.toLowerCase()}`) || normalized.includes(`lead ${skill.toLowerCase()}`)) {
        detectedSkills[skill] = 'Advanced';
      } else if (normalized.includes(`intermediate ${skill.toLowerCase()}`) || normalized.includes(`experienced in ${skill.toLowerCase()}`)) {
        detectedSkills[skill] = 'Intermediate';
      } else {
        detectedSkills[skill] = 'Intermediate';
      }
    }
  }

  // If no skills matched at all, provide a baseline student set
  if (Object.keys(detectedSkills).length === 0) {
    detectedSkills['Python'] = 'Intermediate';
    detectedSkills['SQL'] = 'Beginner';
    detectedSkills['Git'] = 'Beginner';
  }

  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const phoneMatch = text.match(/(?:\+?91[-\s]?)?[6-9]\d{9}/) || text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 2);
  const candidateName = lines.find((l) => l.length < 50 && !l.includes('@') && !l.includes('http') && !/resume|curriculum|profile/i.test(l)) || fileName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');

  const educationMatch = text.match(/(?:b\.?\s?tech|bachelor|master|m\.?\s?tech|b\.?\s?e|b\.?\s?sc|m\.?\s?sc|mca)[^\n,.]*/i);
  const branchMatch = text.match(/(?:computer science|information technology|electronics|data science|artificial intelligence)/i);

  const projectCount = Math.max(1, (text.match(/project|capstone|portfolio|built|developed/gi) || []).length);
  const certCount = (text.match(/certif|credential|license|completed course/gi) || []).length;
  const experienceYears = Math.min(10, Math.floor((text.match(/experience|intern|worked as|developer at|engineer at/gi) || []).length * 0.7));
  const locationMatch = text.match(/(?:Bengaluru|Bangalore|Mumbai|Pune|Hyderabad|Delhi|Chennai|Kolkata|San Francisco|New York|Seattle)/i);

  return {
    name: candidateName,
    email: emailMatch ? emailMatch[0] : 'candidate.demo@skillalign.edu',
    phone: phoneMatch ? phoneMatch[0] : '+91 98765 43210',
    location: locationMatch ? locationMatch[0] : 'Bengaluru, India',
    education: educationMatch ? educationMatch[0].trim() : 'B.Tech in Computer Science',
    branch: branchMatch ? branchMatch[0] : 'Computer Science',
    experience: experienceYears,
    skills: detectedSkills,
    projects: Math.min(6, projectCount),
    certifications: Math.min(5, certCount),
    achievements: Math.max(2, (text.match(/achiev|award|hackathon|scholarship|rank|winner/gi) || []).length),
    sourceFile: fileName,
  };
}

export async function parseResumeWithAI(file: File): Promise<ResumeExtractionResult> {
  const text = file.type === 'text/plain' ? await file.text() : file.name;

  try {
    const res = await fetch('/api/ai/analyze-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText: text, fileName: file.name }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.name && data.skills) {
        return {
          name: data.name,
          email: data.email || 'candidate.demo@skillalign.edu',
          phone: data.phone || '+91 98765 43210',
          location: data.location || 'Bengaluru, India',
          education: data.education || 'B.Tech Computer Science',
          branch: 'Computer Science',
          experience: data.experience ?? 1,
          skills: data.skills,
          projects: data.projects ?? 3,
          certifications: data.certifications ?? 2,
          achievements: data.achievements ?? 3,
          sourceFile: file.name,
        };
      }
    }
  } catch (err) {
    console.warn('API resume parse failed or offline, continuing with local parser:', err);
  }

  return parseResumeClient(text, file.name);
}

export const sampleResumeAarav = `Aarav Sharma
aarav.sharma@institution.edu | +91 98450 12345 | Bengaluru, India
GitHub: github.com/aaravsharma | LinkedIn: linkedin.com/in/aaravsharma

EDUCATION:
B.Tech in Computer Science & Engineering (2022 - 2026)
Apex Institute of Technology, CGPA: 8.8/10

TECHNICAL SKILLS:
• Programming Languages: Python (Advanced), SQL (Intermediate), Java (Intermediate), HTML/CSS, JavaScript
• AI & Data: Machine Learning (Scikit-Learn, Pandas, NumPy), Statistics, Data Visualization
• Tools & Platforms: Git/GitHub, Docker, Linux, AWS Basics

PROJECTS:
1. Customer Churn Prediction Engine (Python, Pandas, Scikit-learn)
Built end-to-end ML model with 89% AUC-ROC predicting subscription cancellations.
2. Distributed Task Scheduler API (FastAPI, Redis, Docker)
Containerized backend service with RESTful endpoints and asynchronous queue processing.
3. Interactive Portfolio & Data Dashboard (React, Tailwind CSS)
Personal project showcase with live metrics and responsive layouts.

CERTIFICATIONS:
• AWS Certified Cloud Practitioner
• Coursera Deep Learning Specialization
`;

export const parseResumeText = (text: string) => parseResumeClient(text, 'resume.txt');
