import React, { useState, useEffect } from 'react';
import {
  Role,
  LearnerProfile,
  LearningStatus,
  PortfolioProject,
  MainView,
  StudentFlowStep,
  QuestionExecutionResult,
  AssessmentEvaluationSummary,
  AuthState,
  UserProfile,
} from './types';
import { initialLearnerProfile, demoStudentDataScientist } from './data/platformData';
import {
  LocalAuthUser,
  subscribeAuth,
  logoutUser,
  fetchUserProfile,
  upsertUserProfile,
} from './lib/authService';
import { AuthScreen } from './components/auth/AuthScreen';
import { WorkspaceSelectionScreen } from './components/auth/WorkspaceSelectionScreen';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { ResumeUploadModal } from './components/ResumeUploadModal';
import { JudgeModeModal } from './components/JudgeModeModal';
import { ShieldCheck, Loader2 } from 'lucide-react';

// New Student Onboarding Flow Components
import { ResumeUploadView } from './components/student-flow/ResumeUploadView';
import { ResumeScanningView } from './components/student-flow/ResumeScanningView';
import { ClaimedSkillsView } from './components/student-flow/ClaimedSkillsView';
import { VerificationTestView } from './components/student-flow/VerificationTestView';
import { AssessmentResultView } from './components/student-flow/AssessmentResultView';
import { VerifiedSkillProfileView } from './components/student-flow/VerifiedSkillProfileView';
import { SkillGapAndPathView } from './components/student-flow/SkillGapAndPathView';

// Faculty Workspace
import { FacultyWorkspace } from './pages/faculty/FacultyWorkspace';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfile } from './pages/student/StudentProfile';
import { SkillAnalysisView } from './pages/student/SkillAnalysisView';
import { SkillHubView } from './pages/student/SkillHubView';
import { VerificationView } from './pages/student/VerificationView';
import { CodingAssessmentView } from './pages/student/CodingAssessmentView';
import { JobMatchesView } from './pages/student/JobMatchesView';
import { LearningRoadmapView } from './pages/student/LearningRoadmapView';
import { ProjectsPortfolioView } from './pages/student/ProjectsPortfolioView';
import { FutureSkillsView } from './pages/student/FutureSkillsView';
import { CareerAssistantView } from './pages/student/CareerAssistantView';
import { JobScannerView } from './pages/student/JobScannerView';
import { CareerPathView } from './pages/student/CareerPathView';

// Institution Pages
import { InstitutionOverview } from './pages/institution/InstitutionOverview';
import { CohortDirectoryView } from './pages/institution/CohortDirectoryView';
import { CurriculumAlignmentView } from './pages/institution/CurriculumAlignmentView';
import { ObsolescenceAnalyticsView } from './pages/institution/ObsolescenceAnalyticsView';
import { AdvancedChartsView } from './pages/institution/AdvancedChartsView';
import { TrainingInterventionsView } from './pages/institution/TrainingInterventionsView';
import { ReassessmentImpactView } from './pages/institution/ReassessmentImpactView';
import { InstitutionReportsView } from './pages/institution/InstitutionReportsView';

// Employer Pages
import { EmployerOverview } from './pages/employer/EmployerOverview';
import { CandidateDirectoryView } from './pages/employer/CandidateDirectoryView';
import { RoleProfilesView } from './pages/employer/RoleProfilesView';

// Admin Pages
import { AdminSystemControl } from './pages/admin/AdminSystemControl';

export function App() {
  // Authentication state
  const [currentUser, setCurrentUser] = useState<LocalAuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authState, setAuthState] = useState<AuthState>('LOGIN');
  const [isInitializingAuth, setIsInitializingAuth] = useState<boolean>(true);

  // START ON AUTH PER SPECIFICATION (AUTHENTICATION MUST BE THE FIRST SCREEN)
  const [mainView, setMainView] = useState<MainView>('auth');
  const [currentRole, setCurrentRole] = useState<Role>('Student');
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState<boolean>(false);
  const [isDemoStudentActive, setIsDemoStudentActive] = useState<boolean>(true);

  // Student Onboarding Flow state
  const [studentFlowStep, setStudentFlowStep] = useState<StudentFlowStep>('resume-upload');
  const [uploadedResumeFileName, setUploadedResumeFileName] = useState<string>('aarav_sharma_btech_cse.pdf');
  const [assessmentResults, setAssessmentResults] = useState<Record<number, QuestionExecutionResult>>({});
  const [assessmentSummary, setAssessmentSummary] = useState<AssessmentEvaluationSummary | undefined>(undefined);

  // Central platform state
  const [learner, setLearner] = useState<LearnerProfile>(demoStudentDataScientist);
  const [selectedSkillForHub, setSelectedSkillForHub] = useState<string>('Machine Learning');
  const [learningStatuses, setLearningStatuses] = useState<Record<string, LearningStatus>>({
    'Machine Learning': 'In Progress',
    'Cloud Computing': 'Not Started',
    'Docker': 'Not Started',
    'Data Visualization': 'Completed',
  });
  const [practiceStatuses, setPracticeStatuses] = useState<Record<string, LearningStatus>>({});
  const [planStatuses, setPlanStatuses] = useState<Record<string, LearningStatus>>({});
  const [assessmentSkills, setAssessmentSkills] = useState<string[]>(['Python', 'SQL']);
  const [projectStarted, setProjectStarted] = useState<boolean>(false);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [reassessmentCompleted, setReassessmentCompleted] = useState<boolean>(false);

  // Session initialization and auth synchronization
  useEffect(() => {
    const unsubscribe = subscribeAuth(async (authUserData) => {
      try {
        if (authUserData) {
          setCurrentUser(authUserData);
          setAuthState('LOADING_PROFILE');
          const { profile } = await fetchUserProfile(authUserData.uid);
          if (profile) {
            setUserProfile(profile);
            if (profile.selected_workspace) {
              setCurrentRole(profile.selected_workspace);
            }
          } else {
            const { profile: created } = await upsertUserProfile({
              id: authUserData.uid,
              email: authUserData.email,
              fullName: authUserData.fullName,
              avatarUrl: authUserData.avatarUrl || '',
              authProvider: authUserData.authProvider || 'email',
            });
            setUserProfile(created);
          }
          setAuthState('WORKSPACE_SELECTION');
          setMainView('portal');
        } else {
          setCurrentUser(null);
          setUserProfile(null);
          setAuthState('LOGIN');
          setMainView('auth');
        }
      } catch (err) {
        console.error('Auth state change error:', err);
        setAuthState('LOGIN');
        setMainView('auth');
      } finally {
        setIsInitializingAuth(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Handler for successful authentication from AuthScreen
  const handleAuthenticated = async (user: LocalAuthUser) => {
    setCurrentUser(user);
    setAuthState('LOADING_PROFILE');
    const { profile } = await fetchUserProfile(user.uid);
    if (profile) {
      setUserProfile(profile);
      if (profile.selected_workspace) {
        setCurrentRole(profile.selected_workspace);
      }
    } else {
      const { profile: created } = await upsertUserProfile({
        id: user.uid,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl || '',
        authProvider: user.authProvider || 'email',
      });
      setUserProfile(created);
    }
    setAuthState('WORKSPACE_SELECTION');
    setMainView('portal');
  };

  // Handler for Logout
  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setUserProfile(null);
    setAuthState('LOGIN');
    setMainView('auth');
  };

  // Handler for selecting workspace from WorkspaceSelectionScreen
  const handleSelectWorkspace = (role: Role) => {
    handleRoleChange(role);
    setAuthState('AUTHENTICATED');
    if (role === 'Student') {
      setStudentFlowStep('resume-upload');
    }
    setMainView('platform');
  };

  // Toggle benchmark demo student vs blank profile
  const handleToggleDemoStudent = () => {
    if (isDemoStudentActive) {
      setLearner(initialLearnerProfile);
      setIsDemoStudentActive(false);
    } else {
      setLearner(demoStudentDataScientist);
      setIsDemoStudentActive(true);
    }
  };

  // Role switch handler
  const handleRoleChange = (role: Role) => {
    setCurrentRole(role);
    if (role === 'Student') {
      setActivePage('dashboard');
    } else if (role === 'Institution') {
      setActivePage('curriculum');
    } else if (role === 'Faculty') {
      setActivePage('overview');
    } else if (role === 'Employer') {
      setActivePage('candidates');
    } else if (role === 'Admin') {
      setActivePage('system');
    }
  };

  const handleOpenSkillHub = (skill: string) => {
    setSelectedSkillForHub(skill);
    setActivePage('hub');
  };

  const handleAssessmentCompleted = (skill: string, score: number) => {
    setLearner((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skill]: score >= 80 ? 'Advanced' : 'Intermediate',
      },
    }));
    setAssessmentSkills((prev) => (prev.includes(skill) ? prev : [...prev, skill]));
  };

  const handleSimulateReassessment = () => {
    const nextState = !reassessmentCompleted;
    setReassessmentCompleted(nextState);
    if (nextState) {
      setLearner((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          'Cloud Computing': 'Advanced',
          Docker: 'Intermediate',
        },
      }));
    }
  };

  const handleUpdateRoadmapStatus = (item: string, status: LearningStatus) => {
    setLearningStatuses((prev) => ({ ...prev, [item]: status }));
  };

  // 0. INITIALIZING FIREBASE AUTH SESSION (Splash / Loader)
  if (isInitializingAuth) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4">
        <div className="size-14 rounded-2xl bg-slate-900 grid place-items-center mb-3 text-sky-400 shadow-md">
          <ShieldCheck className="size-7" />
        </div>
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
          <Loader2 className="size-4 animate-spin text-sky-600" />
          <span>Verifying Secure Auth Session...</span>
        </div>
      </div>
    );
  }

  // 1. AUTHENTICATION FIRST SCREEN (Mandatory per specification)
  // When SkillAlign opens, the FIRST screen must be Login. Do not show workspaces before authentication.
  if (!currentUser || mainView === 'auth' || authState === 'LOGIN' || authState === 'LOGGED_OUT') {
    return <AuthScreen onAuthenticated={handleAuthenticated} initialState={authState} />;
  }

  // 2. WORKSPACE SELECTION SCREEN (Post-Authentication Gateway)
  if (authState === 'WORKSPACE_SELECTION' || mainView === 'portal') {
    return (
      <>
        <WorkspaceSelectionScreen
          userEmail={currentUser.email || userProfile?.email || 'authenticated@skillalign.ai'}
          userProfile={userProfile}
          onSelectWorkspace={handleSelectWorkspace}
          onOpenJudgeMode={() => setIsJudgeModalOpen(true)}
          onLogout={handleLogout}
        />
        <JudgeModeModal
          isOpen={isJudgeModalOpen}
          onClose={() => setIsJudgeModalOpen(false)}
          onJumpToModule={(role, page) => {
            setCurrentRole(role);
            setActivePage(page);
            if (role === 'Student') {
              setStudentFlowStep('dashboard');
            }
            setMainView('platform');
          }}
        />
      </>
    );
  }

  // 3. HOME PAGE VIEW
  if (mainView === 'home') {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col">
        <Header
          currentRole={currentRole}
          onRoleChange={(r) => {
            handleRoleChange(r);
            setMainView('platform');
          }}
          mainView={mainView}
          onMainViewChange={setMainView}
          onOpenUpload={() => {
            setMainView('platform');
            setCurrentRole('Student');
            setStudentFlowStep('resume-upload');
          }}
          onOpenJudgeMode={() => setIsJudgeModalOpen(true)}
          activeResumeName={learner.sourceFile}
          isDemoStudentActive={isDemoStudentActive}
          onToggleDemoStudent={handleToggleDemoStudent}
          userEmail={currentUser.email || userProfile?.email || ''}
          onLogout={handleLogout}
          onOpenWorkspaceSelection={() => setMainView('portal')}
        />

        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HomePage
            onGetStarted={() => {
              setCurrentRole('Student');
              setStudentFlowStep('resume-upload');
              setMainView('platform');
            }}
            onSelectRole={(role) => {
              setCurrentRole(role);
              if (role === 'Student') {
                setStudentFlowStep('resume-upload');
                setActivePage('dashboard');
              } else if (role === 'Institution') {
                setActivePage('curriculum');
              } else if (role === 'Faculty') {
                setActivePage('overview');
              } else if (role === 'Employer') {
                setActivePage('candidates');
              } else if (role === 'Admin') {
                setActivePage('system');
              }
              setMainView('platform');
            }}
            onExplorePlatform={() => {
              setCurrentRole('Student');
              setStudentFlowStep('dashboard');
              setActivePage('dashboard');
              setMainView('platform');
            }}
            onOpenJudgeMode={() => setIsJudgeModalOpen(true)}
          />
        </div>

        <JudgeModeModal
          isOpen={isJudgeModalOpen}
          onClose={() => setIsJudgeModalOpen(false)}
          onJumpToModule={(role, page) => {
            setCurrentRole(role);
            setActivePage(page);
            if (role === 'Student') {
              if (page === 'upload') {
                setStudentFlowStep('resume-upload');
              } else if (page === 'scanning') {
                setStudentFlowStep('resume-scanning');
              } else if (page === 'claimed') {
                setStudentFlowStep('claimed-skills');
              } else if (page === 'test') {
                setStudentFlowStep('verification-test');
              } else if (page === 'verified') {
                setStudentFlowStep('verified-profile');
              } else if (page === 'skillgap') {
                setStudentFlowStep('skill-gap-path');
              } else {
                setStudentFlowStep('dashboard');
              }
            }
            setMainView('platform');
          }}
        />
      </div>
    );
  }

  // 4. PROBLEM & SIH ARCHITECTURE VIEW
  if (mainView === 'landing') {
    return (
      <>
        <LandingPage
          onEnterPlatform={(role, page) => {
            setCurrentRole(role);
            if (page) setActivePage(page);
            else if (role === 'Student') {
              setStudentFlowStep('dashboard');
              setActivePage('dashboard');
            } else if (role === 'Institution') setActivePage('curriculum');
            else if (role === 'Faculty') setActivePage('overview');
            else if (role === 'Employer') setActivePage('candidates');
            else if (role === 'Admin') setActivePage('system');
            setMainView('platform');
          }}
          onEnterJudgeMode={() => setIsJudgeModalOpen(true)}
          onLoadDemoStudent={() => {
            setLearner(demoStudentDataScientist);
            setIsDemoStudentActive(true);
          }}
        />
        <JudgeModeModal
          isOpen={isJudgeModalOpen}
          onClose={() => setIsJudgeModalOpen(false)}
          onJumpToModule={(role, page) => {
            setCurrentRole(role);
            setActivePage(page);
            if (role === 'Student') {
              setStudentFlowStep('dashboard');
            }
            setMainView('platform');
          }}
        />
      </>
    );
  }

  // 5. PLATFORM WORKSPACE VIEW
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col">
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        mainView={mainView}
        onMainViewChange={setMainView}
        onOpenUpload={() => setIsResumeModalOpen(true)}
        onOpenJudgeMode={() => setIsJudgeModalOpen(true)}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        activeResumeName={learner.sourceFile}
        isDemoStudentActive={isDemoStudentActive}
        onToggleDemoStudent={handleToggleDemoStudent}
        userEmail={currentUser?.email || userProfile?.email || ''}
        onLogout={handleLogout}
        onOpenWorkspaceSelection={() => setMainView('portal')}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar
          currentRole={currentRole}
          activePage={activePage}
          onNavigate={(page) => {
            setActivePage(page);
            // If student clicks sidebar item, take them to main student views
            if (currentRole === 'Student') {
              setStudentFlowStep('dashboard');
            }
            setSidebarOpen(false);
          }}
          isOpenMobile={sidebarOpen}
          onCloseMobile={() => setSidebarOpen(false)}
          learnerName={learner.name}
          hasAnalyzedResume={!!learner.sourceFile}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0">
          {/* STUDENT VIEWS & ONBOARDING JOURNEY */}
          {currentRole === 'Student' && (
            <>
              {/* Step Tracker when inside onboarding flow */}
              {studentFlowStep !== 'dashboard' && (
                <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    <span className="font-bold text-slate-900 shrink-0">Student Onboarding:</span>
                    {[
                      { step: 'resume-upload', label: '1. Resume' },
                      { step: 'resume-scanning', label: '2. Scan' },
                      { step: 'claimed-skills', label: '3. Claimed Skills' },
                      { step: 'verification-test', label: '4. Test (10 Qs)' },
                      { step: 'test-results', label: '5. Results' },
                      { step: 'verified-profile', label: '6. Verified Profile' },
                      { step: 'skill-gap', label: '7. Gaps & Path' },
                    ].map((s) => (
                      <button
                        key={s.step}
                        type="button"
                        onClick={() => setStudentFlowStep(s.step as StudentFlowStep)}
                        className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer shrink-0 ${
                          studentFlowStep === s.step
                            ? 'bg-slate-900 text-white font-bold shadow-2xs'
                            : 'text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setStudentFlowStep('dashboard')}
                    className="text-stone-500 hover:text-slate-900 font-semibold underline text-[11px] cursor-pointer"
                  >
                    Skip to Command Center (Benchmark Demo) →
                  </button>
                </div>
              )}

              {/* Step 1: Upload Resume */}
              {studentFlowStep === 'resume-upload' && (
                <ResumeUploadView
                  onProceedToScan={(resumeInfo) => {
                    setUploadedResumeFileName(resumeInfo.fileName);
                    setLearner((prev) => ({
                      ...prev,
                      ...resumeInfo.profile,
                      sourceFile: resumeInfo.fileName,
                    }));
                    setStudentFlowStep('resume-scanning');
                  }}
                  onAnalyzeResume={(file, profile) => {
                    setUploadedResumeFileName(file.name);
                    setLearner((prev) => ({
                      ...prev,
                      ...profile,
                      sourceFile: file.name,
                    }));
                    setStudentFlowStep('resume-scanning');
                  }}
                  onExplorePlatform={() => setStudentFlowStep('dashboard')}
                />
              )}

              {/* Step 2: Resume Scanning */}
              {studentFlowStep === 'resume-scanning' && (
                <ResumeScanningView
                  fileName={uploadedResumeFileName}
                  onScanningComplete={() => setStudentFlowStep('claimed-skills')}
                />
              )}

              {/* Step 3: Claimed Skills & Evidence */}
              {studentFlowStep === 'claimed-skills' && (
                <ClaimedSkillsView
                  profile={learner}
                  onStartVerification={() => setStudentFlowStep('verification-test')}
                />
              )}

              {/* Step 4: Verification Test (10 Problems, live timer, runner) */}
              {studentFlowStep === 'verification-test' && (
                <VerificationTestView
                  onTestSubmitted={(results, summary) => {
                    setAssessmentResults(results);
                    setAssessmentSummary(summary);
                    setStudentFlowStep('test-results');
                  }}
                />
              )}

              {/* Step 5: Diagnostic Assessment Results */}
              {studentFlowStep === 'test-results' && assessmentSummary && (
                <AssessmentResultView
                  summary={assessmentSummary}
                  onProceedToProfile={() => setStudentFlowStep('verified-profile')}
                />
              )}

              {/* Fallback if test results visited directly */}
              {studentFlowStep === 'test-results' && !assessmentSummary && (
                <AssessmentResultView
                  summary={{
                    attemptedCount: 8,
                    fullyExecutedCount: 5,
                    partiallyExecutedCount: 2,
                    failedCount: 3,
                    overallScore: 72,
                    skillScores: {
                      Python: 82,
                      SQL: 91,
                      'Problem Solving': 76,
                      Algorithms: 68,
                      'Machine Learning': 65,
                    },
                    questionResults: {},
                  }}
                  onProceedToProfile={() => setStudentFlowStep('verified-profile')}
                />
              )}

              {/* Step 6: Verified Skill Profile */}
              {studentFlowStep === 'verified-profile' && (
                <VerifiedSkillProfileView
                  profile={learner}
                  assessmentSummary={assessmentSummary}
                  onProceedToSkillGap={() => setStudentFlowStep('skill-gap')}
                />
              )}

              {/* Step 7: Skill Gap Engine & Personalized Path */}
              {studentFlowStep === 'skill-gap' && (
                <SkillGapAndPathView
                  profile={learner}
                  assessmentSummary={assessmentSummary}
                  onOpenDashboard={() => setStudentFlowStep('dashboard')}
                />
              )}

              {/* Step 8 & Active Pages: Full Student Dashboard */}
              {studentFlowStep === 'dashboard' && (
                <>
                  {activePage === 'dashboard' && (
                    <StudentDashboard
                      learner={learner}
                      onNavigate={(page, extraSkill) => {
                        if (extraSkill) setSelectedSkillForHub(extraSkill);
                        setActivePage(page);
                      }}
                      learningStatuses={learningStatuses}
                      onOpenResumeUpload={() => {
                        setStudentFlowStep('resume-upload');
                      }}
                    />
                  )}
                  {activePage === 'job-scanner' && (
                    <JobScannerView
                      learner={learner}
                      onOpenSkillHub={handleOpenSkillHub}
                      onNavigateToProjects={() => setActivePage('projects')}
                    />
                  )}
                  {activePage === 'career-path' && (
                    <CareerPathView
                      learner={learner}
                      onExploreGaps={() => setActivePage('analysis')}
                      onNavigateToInterventions={() => setActivePage('hub')}
                    />
                  )}
                  {activePage === 'profile' && (
                    <StudentProfile
                      learner={learner}
                      onUpdateLearner={setLearner}
                      onOpenResumeUpload={() => setIsResumeModalOpen(true)}
                      onNavigateToAnalysis={() => setActivePage('analysis')}
                    />
                  )}
                  {activePage === 'analysis' && (
                    <SkillAnalysisView
                      learner={learner}
                      onOpenHub={handleOpenSkillHub}
                      onAddLearning={(skill) => handleUpdateRoadmapStatus(skill, 'In Progress')}
                      learningStatuses={learningStatuses}
                      onNavigateToJobs={() => setActivePage('jobs')}
                    />
                  )}
                  {activePage === 'hub' && (
                    <SkillHubView
                      learner={learner}
                      initialSkill={selectedSkillForHub}
                      learningStatuses={learningStatuses}
                      onUpdateLearning={handleUpdateRoadmapStatus}
                      practiceStatuses={practiceStatuses}
                      onUpdatePractice={(task, status) =>
                        setPracticeStatuses((prev) => ({ ...prev, [task]: status }))
                      }
                      planStatuses={planStatuses}
                      onUpdatePlan={(task, status) =>
                        setPlanStatuses((prev) => ({ ...prev, [task]: status }))
                      }
                      assessmentSkills={assessmentSkills}
                      onRecordAssessment={(skill) => handleAssessmentCompleted(skill, 90)}
                      onStartProject={(skill) => {
                        setProjectStarted(true);
                        setActivePage('projects');
                      }}
                      projectStarted={projectStarted}
                      onBack={() => setActivePage('analysis')}
                    />
                  )}
                  {activePage === 'verification' && (
                    <VerificationView
                      onNavigateToCodingAssessment={() => setActivePage('coding')}
                    />
                  )}
                  {activePage === 'coding' && (
                    <CodingAssessmentView
                      onBack={() => setActivePage('verification')}
                      onAssessmentCompleted={(skill, score) => {
                        handleAssessmentCompleted(skill, score);
                      }}
                    />
                  )}
                  {activePage === 'jobs' && (
                    <JobMatchesView
                      learner={learner}
                      onOpenSkillHub={handleOpenSkillHub}
                      reassessmentCompleted={reassessmentCompleted}
                    />
                  )}
                  {activePage === 'roadmap' && (
                    <LearningRoadmapView
                      learner={learner}
                      learningStatuses={learningStatuses}
                      onUpdateStatus={handleUpdateRoadmapStatus}
                      onOpenHub={handleOpenSkillHub}
                    />
                  )}
                  {activePage === 'projects' && (
                    <ProjectsPortfolioView
                      learner={learner}
                      projects={portfolioProjects}
                      onUpdateProjects={setPortfolioProjects}
                    />
                  )}
                  {activePage === 'future' && (
                    <FutureSkillsView audience="Student" learner={learner} />
                  )}
                  {activePage === 'assistant' && (
                    <CareerAssistantView learner={learner} />
                  )}
                </>
              )}
            </>
          )}

          {/* INSTITUTION VIEWS */}
          {currentRole === 'Institution' && (
            <>
              {activePage === 'overview' && (
                <InstitutionOverview onNavigate={setActivePage} />
              )}
              {activePage === 'curriculum' && <CurriculumAlignmentView />}
              {activePage === 'obsolescence' && <ObsolescenceAnalyticsView />}
              {activePage === 'students' && <CohortDirectoryView />}
              {activePage === 'advanced-charts' && <AdvancedChartsView />}
              {activePage === 'training' && (
                <TrainingInterventionsView
                  onNavigateToReassessment={() => setActivePage('reassessment')}
                />
              )}
              {activePage === 'reassessment' && (
                <ReassessmentImpactView
                  onSimulateReassessment={handleSimulateReassessment}
                  reassessmentCompleted={reassessmentCompleted}
                />
              )}
              {activePage === 'future' && (
                <FutureSkillsView audience="Institution" />
              )}
              {activePage === 'reports' && <InstitutionReportsView />}
            </>
          )}

          {/* FACULTY / EMPLOYEE WORKSPACE (Section 22) */}
          {currentRole === 'Faculty' && (
            <FacultyWorkspace />
          )}

          {/* EMPLOYER VIEWS */}
          {currentRole === 'Employer' && (
            <>
              {activePage === 'overview' && (
                <EmployerOverview onNavigate={setActivePage} />
              )}
              {activePage === 'candidates' && (
                <CandidateDirectoryView reassessmentCompleted={reassessmentCompleted} />
              )}
              {activePage === 'roles' && <RoleProfilesView />}
              {activePage === 'future' && <FutureSkillsView audience="Employer" />}
            </>
          )}

          {/* ADMIN VIEWS */}
          {currentRole === 'Admin' && (
            <>
              {activePage === 'system' && <AdminSystemControl />}
              {activePage === 'future' && <FutureSkillsView audience="Admin" />}
            </>
          )}
        </main>
      </div>

      {/* Ingestion & Parsing Modal */}
      <ResumeUploadModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onApplyProfile={(updated) => {
          setLearner((prev) => ({
            ...prev,
            ...updated,
            skills: {
              ...prev.skills,
              ...(updated.skills || {}),
            },
          }));
        }}
      />

      {/* SIH Judge Presentation Mode Modal */}
      <JudgeModeModal
        isOpen={isJudgeModalOpen}
        onClose={() => setIsJudgeModalOpen(false)}
        onResetDemo={() => {
          setStudentFlowStep('resume-upload');
          setLearner(demoStudentDataScientist);
          setActivePage('dashboard');
          setCurrentRole('Student');
          setMainView('platform');
        }}
        onJumpToModule={(role, page) => {
          setCurrentRole(role);
          setActivePage(page);
          if (role === 'Student') {
            if (page === 'upload') {
              setStudentFlowStep('resume-upload');
            } else if (page === 'scanning') {
              setStudentFlowStep('resume-scanning');
            } else if (page === 'claimed') {
              setStudentFlowStep('claimed-skills');
            } else if (page === 'test') {
              setStudentFlowStep('verification-test');
            } else if (page === 'verified') {
              setStudentFlowStep('verified-profile');
            } else if (page === 'skillgap') {
              setStudentFlowStep('skill-gap-path');
            } else {
              setStudentFlowStep('dashboard');
            }
          }
          setMainView('platform');
        }}
      />
    </div>
  );
}

export default App;
