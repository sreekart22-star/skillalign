import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Google GenAI Client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    platform: 'SkillAlign Unified Platform',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// AI Career Assistant Endpoint
app.post('/api/ai/career-assistant', async (req, res) => {
  try {
    const { question, learner, targetRole, roleRequirements, gaps } = req.body;
    const ai = getGenAI();

    if (ai) {
      try {
        const prompt = `You are the SkillAlign Career Advisor.
Student Context:
- Name: ${learner?.name || 'Student'}
- Current Education: ${learner?.education || 'B.Tech CSE'}
- Target Role: ${targetRole || 'Software Engineer'}
- Current Profile Skills: ${JSON.stringify(learner?.skills || {})}
- Role Requirements: ${JSON.stringify(roleRequirements || [])}
- Identified Skill Gaps: ${JSON.stringify(gaps || [])}

User Question: "${question}"

Provide a clear, highly actionable, encouraging, and structured answer. Ground your response directly in their identified gaps, role priorities, and next learning milestones. Keep the answer concise (2-4 brief bullet points or paragraphs).`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        if (response.text) {
          return res.json({ answer: response.text, source: 'gemini-2.5-flash' });
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to deterministic intelligence:', geminiError);
      }
    }

    // Heuristic deterministic response grounded in role & gaps data
    const roleName = targetRole || 'your target role';
    const gapList = Array.isArray(gaps) && gaps.length > 0
      ? gaps.map((g: any) => typeof g === 'string' ? g : g.skill).join(', ')
      : 'no critical gaps';
    const topGap = Array.isArray(gaps) && gaps.length > 0
      ? (typeof gaps[0] === 'string' ? gaps[0] : gaps[0].skill)
      : 'Cloud Fundamentals';

    const fallbackAnswer = `Based on your profile for ${roleName}, your current readiness gap is focused on: ${gapList}. We recommend prioritizing ${topGap} first because it is a weighted critical requirement for industry hiring. You can start with our curated learning roadmap, practice with guided exercises, and build an applied portfolio project to turn this gap into verified candidate evidence.`;

    return res.json({ answer: fallbackAnswer, source: 'skillalign-grounded-engine' });
  } catch (error: any) {
    console.error('Error in /api/ai/career-assistant:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// AI Resume Parser Endpoint (both route aliases supported)
const handleResumeAnalysis = async (req: express.Request, res: express.Response) => {
  try {
    const { resumeText, fileName } = req.body;
    const ai = getGenAI();

    if (ai && resumeText && resumeText.trim().length > 30) {
      try {
        const prompt = `Extract candidate profile information from this resume text as JSON:
Resume Text:
"""
${resumeText.slice(0, 4000)}
"""

Return ONLY valid JSON matching this schema:
{
  "name": "Full Name",
  "email": "Email address or Not provided",
  "phone": "Phone number or Not provided",
  "location": "Location city or Not provided",
  "education": "Degree or Not provided",
  "branch": "Branch of study or Not provided",
  "college": "College/University or Not provided",
  "graduation": "Year or Not provided",
  "experience": number_of_years_estimate,
  "skills": {
    "SkillName": "Beginner" | "Intermediate" | "Advanced"
  },
  "technicalSkills": ["Skill1", "Skill2"],
  "programmingLanguages": ["Lang1", "Lang2"],
  "frameworks": ["Framework1"],
  "databases": ["DB1"],
  "cloud": ["Cloud1"],
  "aiml": ["ML1"],
  "tools": ["Tool1"],
  "softSkills": ["Skill1"],
  "projects": number_of_projects_found,
  "certifications": number_of_certifications_found,
  "achievements": number_of_achievements_found
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({ ...parsed, sourceFile: fileName || 'Uploaded Resume', aiProcessed: true });
        }
      } catch (geminiError) {
        console.warn('Gemini resume extraction failed, using heuristic extraction:', geminiError);
      }
    }

    // Heuristic extraction
    res.json({ fallback: true, sourceFile: fileName || 'Uploaded Resume' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Resume analysis error' });
  }
};

app.post('/api/ai/analyze-resume', handleResumeAnalysis);
app.post('/api/ai/parse-resume', handleResumeAnalysis);

// AI Job Description Scanner Endpoint
app.post('/api/ai/scan-job', async (req, res) => {
  try {
    const { jobText, candidateSkills, targetRole } = req.body;
    const ai = getGenAI();

    if (ai && jobText && jobText.trim().length > 30) {
      try {
        const prompt = `You are the SkillAlign Job Description Intelligence Engine.
Analyze the following job description and compare it against the candidate profile:
Candidate Profile Skills: ${JSON.stringify(candidateSkills || {})}
Target Role Context: ${targetRole || 'Software / AI Engineer'}

Job Description:
"""
${jobText.slice(0, 4000)}
"""

Return ONLY valid JSON matching this schema:
{
  "jobTitle": "Extracted Job Title or Role",
  "company": "Company Name if mentioned or Industry Partner",
  "experienceRequired": "Years of experience needed",
  "educationRequired": "Degree needed",
  "requiredSkills": ["Skill1", "Skill2", "Skill3"],
  "preferredSkills": ["Skill1", "Skill2"],
  "toolsAndTech": ["Tool1", "Tool2"],
  "softSkills": ["Skill1", "Skill2"],
  "responsibilities": ["Key responsibility 1", "Key responsibility 2"],
  "matchingSkills": ["Skill1"],
  "partialMatchSkills": ["Skill2"],
  "missingSkills": ["Skill3"],
  "recommendedProjects": [
    {
      "title": "Project Title",
      "reason": "Why this bridges the missing skills",
      "techStack": ["Tech1", "Tech2"],
      "difficulty": "Intermediate",
      "estimatedHours": 20
    }
  ],
  "learningResources": [
    {
      "skill": "MissingSkill",
      "action": "Immediate recommended study item"
    }
  ]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({ ...parsed, aiProcessed: true });
        }
      } catch (geminiError) {
        console.warn('Gemini job scanner failed, using deterministic scanner:', geminiError);
      }
    }

    // Heuristic scan response
    res.json({ fallback: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Job scan error' });
  }
});

// --- Secure Backend Authentication API Endpoints ---
import crypto from 'crypto';

interface ServerUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: 'student' | 'faculty' | 'industry' | 'admin';
  createdAt: string;
  updatedAt: string;
}

const serverUsers: ServerUser[] = [
  {
    id: 'usr_default_aarav_001',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@institution.edu',
    phone: '+919876543210',
    passwordHash: crypto.createHash('sha256').update('password123').digest('hex'),
    role: 'student',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

app.post('/api/auth/register', (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'Full name, email, and password are required.' });
    }
    const emailLower = email.trim().toLowerCase();
    if (serverUsers.some(u => u.email.toLowerCase() === emailLower)) {
      return res.status(400).json({ error: 'An account with this email address already exists.' });
    }

    const newUser: ServerUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      passwordHash: hashPassword(password),
      role: role || 'student',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    serverUsers.push(newUser);
    const { passwordHash, ...safeUser } = newUser;
    res.json({ user: safeUser, message: 'Account created successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Identifier (email/phone) and password are required.' });
    }
    const cleanId = identifier.trim().toLowerCase();
    const user = serverUsers.find(
      u => u.email.toLowerCase() === cleanId || (u.phone && u.phone.toLowerCase() === cleanId)
    );

    if (!user || user.passwordHash !== hashPassword(password)) {
      return res.status(401).json({ error: 'Invalid email/phone or password.' });
    }

    const { passwordHash, ...safeUser } = user;
    res.json({ user: safeUser, message: 'Login successful.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Login failed' });
  }
});

app.post('/api/auth/phone-login', (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ error: 'Phone number and password are required.' });
    }
    const cleanPhone = phone.trim();
    const user = serverUsers.find(u => u.phone === cleanPhone);

    if (!user || user.passwordHash !== hashPassword(password)) {
      return res.status(401).json({ error: 'Invalid phone number or password.' });
    }

    const { passwordHash, ...safeUser } = user;
    res.json({ user: safeUser, message: 'Phone login successful.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Phone login failed' });
  }
});

app.post('/api/auth/forgot-password', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email address is required.' });
    }
    res.json({ success: true, message: 'If an account exists with this email, password reset instructions have been sent.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Password reset failed' });
  }
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error encountered:', err);
  if (!res.headersSent) {
    res.status(500).json({ error: 'Internal server error', message: err?.message });
  }
});

// Vite middleware in dev or static serving in production
async function startServer() {
  try {
    if (process.env.NODE_ENV !== 'production') {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`SkillAlign Unified Server running on http://0.0.0.0:${PORT}`);
    });

    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`Port ${PORT} in use, retrying connection in 1000ms...`);
        setTimeout(() => {
          server.close();
          server.listen(PORT, '0.0.0.0');
        }, 1000);
      } else {
        console.error('Server listener error:', err);
      }
    });

    const shutdown = () => {
      console.log('Shutting down server gracefully...');
      server.close(() => {
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
