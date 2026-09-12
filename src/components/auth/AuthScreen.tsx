import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Mail,
  Lock,
  Phone,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  LogIn,
  UserPlus,
  KeyRound,
  Building2,
  GraduationCap,
  Briefcase,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import {
  loginUser,
  loginWithPhone,
  loginAsDemoRole,
  registerUser,
  sendPasswordReset,
} from '../../lib/authService';
import { AuthState } from '../../types';

interface AuthScreenProps {
  onAuthenticated: (user: any) => void;
  initialState?: AuthState;
}

type AuthMode = 'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD' | 'PHONE_LOGIN';

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<AuthMode>('LOGIN');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+91');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phonePassword, setPhonePassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userRole, setUserRole] = useState<'student' | 'faculty' | 'industry' | 'institution'>('student');
  const [academicInstitute, setAcademicInstitute] = useState<string>('ABC Institute of Technology');
  const [academicUniversity, setAcademicUniversity] = useState<string>('National Technological University');
  const [academicDegree, setAcademicDegree] = useState<string>('B.Tech Computer Science');
  const [academicYear, setAcademicYear] = useState<string>('Final Year (2026)');
  const [academicRollNo, setAcademicRollNo] = useState<string>('CS2026-891');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle Email Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email address and password.');
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const { user, error } = await loginUser(email.trim(), password);
    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Login failed. Please check your credentials.');
    } else if (user) {
      setSuccessMessage('Login successful! Loading workspace...');
      onAuthenticated(user);
    }
  };

  // Handle Phone Login
  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim() || !phonePassword) {
      setErrorMessage('Please enter both phone number and password.');
      return;
    }

    const fullPhone = `${countryCode}${phoneNumber.trim()}`;
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const { user, error } = await loginWithPhone(fullPhone, phonePassword);
    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Phone login failed. Please check your credentials.');
    } else if (user) {
      setSuccessMessage('Phone login successful! Loading workspace...');
      onAuthenticated(user);
    }
  };

  // Handle Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !regEmail.trim() || !regPhone.trim() || !regPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const fullPhone = `${countryCode}${regPhone.trim()}`;
    const { user, error } = await registerUser({
      fullName: fullName.trim(),
      email: regEmail.trim(),
      phoneNumber: fullPhone,
      password: regPassword,
      role: userRole,
      academicInfo: userRole === 'student' ? {
        institute: academicInstitute,
        university: academicUniversity,
        degree: academicDegree,
        academicYear: academicYear,
        rollNo: academicRollNo,
      } : undefined,
    });
    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Registration failed. Please try again.');
    } else if (user) {
      setSuccessMessage('Account created successfully. Please log in.');
      setTimeout(() => {
        setMode('LOGIN');
        setEmail(regEmail.trim());
        setSuccessMessage(null);
      }, 1500);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const { success, error } = await sendPasswordReset(email.trim());
    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Password reset request failed.');
    } else if (success) {
      setSuccessMessage(`Password reset instructions sent to ${email.trim()}.`);
    }
  };

  // Handle Quick Demo Role Login
  const handleDemoRoleLogin = async (role: 'student' | 'faculty' | 'industry' | 'admin') => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    const { user, error } = await loginAsDemoRole(role);
    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Demo login failed.');
    } else if (user) {
      setSuccessMessage(`Logged in as Demo ${role.toUpperCase()}! Loading workspace...`);
      onAuthenticated(user);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col justify-between selection:bg-sky-100 selection:text-sky-900">
      {/* Top Header Bar */}
      <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-slate-900 grid place-items-center text-white shadow-xs">
              <ShieldCheck className="size-5 text-sky-400" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900">SkillAlign</span>
              <span className="hidden sm:inline-block ml-2 rounded-full bg-sky-50 border border-sky-200 px-2 py-0.5 text-[10px] font-bold text-sky-800">
                Academia–Industry Intelligence Platform
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
              <Sparkles className="size-3.5 text-amber-600 animate-pulse" />
              <span>Demo Mode</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Authentication Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="rounded-2xl border border-stone-200/90 bg-white shadow-xl shadow-stone-200/50 p-6 sm:p-8"
          >
            {/* Title & Brand */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-slate-900 text-white shadow-md mb-3.5">
                <ShieldCheck className="size-6 text-sky-400" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Welcome to SkillAlign
              </h1>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                {mode === 'LOGIN' && 'Sign in to continue to the SkillAlign Intelligence Platform.'}
                {mode === 'PHONE_LOGIN' && 'Sign in securely using your phone number and password.'}
                {mode === 'REGISTER' && 'Create your account to start aligning skills & opportunities.'}
                {mode === 'FORGOT_PASSWORD' && 'Recover your account password securely.'}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            {mode !== 'FORGOT_PASSWORD' && (
              <div className="grid grid-cols-2 gap-1 rounded-xl bg-stone-100 p-1 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setMode('LOGIN');
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
                    mode === 'LOGIN' || mode === 'PHONE_LOGIN'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-stone-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('REGISTER');
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
                    mode === 'REGISTER'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-stone-600 hover:text-slate-900'
                  }`}
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Error & Success Feedback Banners */}
            <AnimatePresence mode="wait">
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-5 rounded-xl border border-rose-200 bg-rose-50/90 p-3.5 flex items-start gap-2.5 text-xs text-rose-800"
                >
                  <AlertTriangle className="size-4 shrink-0 text-rose-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">{errorMessage}</p>
                  </div>
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50/90 p-3.5 flex items-start gap-2.5 text-xs text-emerald-800"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                  <p className="font-semibold">{successMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* EMAIL LOGIN FORM */}
            {mode === 'LOGIN' && (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@institution.edu"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setMode('FORGOT_PASSWORD');
                        setErrorMessage(null);
                        setSuccessMessage(null);
                      }}
                      className="text-xs font-semibold text-sky-700 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-sm hover:bg-slate-800 active:scale-[0.99] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin text-sky-400" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="size-4 text-sky-400" />
                        <span>Login</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMode('PHONE_LOGIN');
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-800 text-xs font-bold shadow-xs hover:bg-stone-50 transition cursor-pointer"
                  >
                    <Phone className="size-4 text-sky-600" />
                    <span>Continue with Phone</span>
                  </button>

                  <div className="pt-3">
                    <div className="relative flex py-1 items-center">
                      <div className="flex-grow border-t border-stone-200"></div>
                      <span className="flex-shrink mx-3 text-[10px] font-bold text-stone-600 uppercase tracking-widest">Or Quick Demo Login</span>
                      <div className="flex-grow border-t border-stone-200"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handleDemoRoleLogin('student')}
                        disabled={isLoading}
                        className="px-3 py-2 rounded-xl border border-sky-200 bg-sky-50 text-sky-900 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-sky-100 transition cursor-pointer"
                      >
                        <GraduationCap className="size-3.5 text-sky-700" />
                        <span>Demo Student</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDemoRoleLogin('faculty')}
                        disabled={isLoading}
                        className="px-3 py-2 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-900 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-indigo-100 transition cursor-pointer"
                      >
                        <Building2 className="size-3.5 text-indigo-700" />
                        <span>Demo Faculty</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDemoRoleLogin('industry')}
                        disabled={isLoading}
                        className="px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition cursor-pointer"
                      >
                        <Briefcase className="size-3.5 text-emerald-700" />
                        <span>Demo Industry</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDemoRoleLogin('admin')}
                        disabled={isLoading}
                        className="px-3 py-2 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-amber-100 transition cursor-pointer"
                      >
                        <ShieldAlert className="size-3.5 text-amber-700" />
                        <span>Demo Admin</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* PHONE LOGIN FORM */}
            {mode === 'PHONE_LOGIN' && (
              <form onSubmit={handlePhoneLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-24 px-2 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="+91">+91 (IN)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+971">+971 (UAE)</option>
                    </select>
                    <div className="relative flex-1">
                      <Phone className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="9876543210"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={phonePassword}
                      onChange={(e) => setPhonePassword(e.target.value)}
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-sm hover:bg-slate-800 active:scale-[0.99] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin text-sky-400" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="size-4 text-sky-400" />
                        <span>Login with Phone</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMode('LOGIN');
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-800 text-xs font-bold shadow-xs hover:bg-stone-50 transition cursor-pointer"
                  >
                    <Mail className="size-4 text-sky-600" />
                    <span>Back to Email Login</span>
                  </button>
                </div>
              </form>
            )}

            {/* REGISTER FORM */}
            {mode === 'REGISTER' && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Aarav Sharma"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="you@institution.edu"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-24 px-2 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="+91">+91 (IN)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+971">+971 (UAE)</option>
                    </select>
                    <div className="relative flex-1">
                      <Phone className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    User Type (Admin is strictly restricted)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setUserRole('student')}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        userRole === 'student'
                          ? 'border-sky-600 bg-sky-50 text-sky-900 shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <GraduationCap className="size-3.5 text-sky-700" />
                      <span>Student</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserRole('faculty')}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        userRole === 'faculty'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <Building2 className="size-3.5 text-indigo-700" />
                      <span>Faculty</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserRole('institution')}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        userRole === 'institution'
                          ? 'border-violet-600 bg-violet-50 text-violet-900 shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <Building2 className="size-3.5 text-violet-700" />
                      <span>Institute</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserRole('industry')}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                        userRole === 'industry'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <Briefcase className="size-3.5 text-emerald-700" />
                      <span>Employer</span>
                    </button>
                  </div>
                </div>

                {userRole === 'student' && (
                  <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-3 space-y-2.5">
                    <span className="text-xs font-bold text-sky-900 block">
                      Academic Affiliation Information (Verification Pending)
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">Institute / College</label>
                        <input
                          type="text"
                          value={academicInstitute}
                          onChange={(e) => setAcademicInstitute(e.target.value)}
                          placeholder="ABC Institute of Technology"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-xs text-slate-900"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">Degree / Branch</label>
                        <input
                          type="text"
                          value={academicDegree}
                          onChange={(e) => setAcademicDegree(e.target.value)}
                          placeholder="B.Tech Computer Science"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-xs text-slate-900"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">Academic Year</label>
                        <input
                          type="text"
                          value={academicYear}
                          onChange={(e) => setAcademicYear(e.target.value)}
                          placeholder="Final Year (2026)"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-xs text-slate-900"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">Roll Number / Student ID</label>
                        <input
                          type="text"
                          value={academicRollNo}
                          onChange={(e) => setAcademicRollNo(e.target.value)}
                          placeholder="CS2026-891"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-xs text-slate-900"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password (min 6 chars)
                  </label>
                  <div className="relative">
                    <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-sm hover:bg-slate-800 active:scale-[0.99] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-sky-400" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="size-4 text-sky-400" />
                      <span>Register Account</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* FORGOT PASSWORD FORM */}
            {mode === 'FORGOT_PASSWORD' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@institution.edu"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-sm hover:bg-slate-800 active:scale-[0.99] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-sky-400" />
                      <span>Sending Instructions...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="size-4 text-sky-400" />
                      <span>Send Password Reset Link</span>
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('LOGIN');
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
                  >
                    <ChevronLeft className="size-3.5" />
                    <span>Back to Sign In</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="border-t border-stone-200/80 bg-white/60 py-4 text-center text-xs text-stone-500">
        SkillAlign &copy; {new Date().getFullYear()} &bull; Secure Authentication &amp; Platform Intelligence
      </footer>
    </div>
  );
};
