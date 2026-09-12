import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  Loader2,
  Send,
  UserPlus,
  LogIn,
  KeyRound,
} from 'lucide-react';
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  sendPasswordReset,
  isFirebaseConfigured,
} from '../../lib/firebaseClient';
import { AuthState } from '../../types';

interface AuthScreenProps {
  onAuthenticated: (user: any) => void;
  initialState?: AuthState;
}

type AuthMode = 'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD';

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated, initialState = 'LOGIN' }) => {
  const [mode, setMode] = useState<AuthMode>('LOGIN');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const isConfigured = isFirebaseConfigured();

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    if (!isConfigured) {
      setErrorMessage('Firebase is not configured yet. Please check project settings.');
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const { user, error } = await signInWithGoogle();
      if (error) {
        setErrorMessage(error.message || 'Google sign-in failed or was cancelled.');
        setIsLoading(false);
      } else if (user) {
        setSuccessMessage('Google sign-in successful. Loading workspace...');
        onAuthenticated(user);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred during Google sign-in.');
      setIsLoading(false);
    }
  };

  // Handle Login with Email & Password
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const { user, error } = await signInWithEmail(email.trim(), password);
    if (error) {
      setErrorMessage(error.message || 'Login failed. Please check your credentials.');
      setIsLoading(false);
    } else if (user) {
      setSuccessMessage('Login successful! Redirecting...');
      onAuthenticated(user);
    }
  };

  // Handle Register (Sign Up)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const { user, error } = await signUpWithEmail(email.trim(), password);
    if (error) {
      setErrorMessage(error.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    } else if (user) {
      setSuccessMessage('Account created successfully! Redirecting...');
      onAuthenticated(user);
    }
  };

  // Handle Password Reset
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter your email address for password reset.');
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    const { success, error } = await sendPasswordReset(email.trim());
    setIsLoading(false);
    if (error) {
      setErrorMessage(error.message || 'Failed to send password reset email.');
    } else if (success) {
      setSuccessMessage(`Password reset link sent to ${email.trim()}. Please check your inbox.`);
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
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Firebase Auth Active</span>
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
                SKILLALIGN
              </h1>
              <p className="text-xs font-bold text-sky-800 mt-1">
                &ldquo;Bridging the Gap Between Education, Skills & Industry.&rdquo;
              </p>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                {mode === 'LOGIN' && 'Sign in with your email or Google account.'}
                {mode === 'REGISTER' && 'Create your account to start aligning skills & opportunities.'}
                {mode === 'FORGOT_PASSWORD' && 'Reset your account password securely.'}
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
                    mode === 'LOGIN'
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
                  Register
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

            {/* LOGIN FORM */}
            {mode === 'LOGIN' && (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-stone-300 bg-white text-slate-800 text-sm font-bold shadow-xs hover:bg-stone-50 hover:border-stone-400 active:scale-[0.99] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-sky-600" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <svg className="size-4.5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                <div className="relative flex items-center justify-center my-4">
                  <div className="w-full border-t border-stone-200" />
                  <span className="bg-white px-3 text-[11px] font-bold text-slate-700 uppercase tracking-wider relative">
                    Or with email &amp; password
                  </span>
                </div>

                <form onSubmit={handleLogin} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email address
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
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
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
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="size-4 text-sky-400" />
                        <span>Sign In</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* REGISTER FORM */}
            {mode === 'REGISTER' && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email address
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
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password (min 6 chars)
                  </label>
                  <div className="relative">
                    <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
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
                      <span>Create Account</span>
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
                    Enter your account email
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
                      <span>Sending Reset Link...</span>
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

            {/* Security Note */}
            <div className="mt-5 pt-4 border-t border-stone-100 flex items-start gap-2 text-[11px] text-stone-500">
              <Lock className="size-3.5 shrink-0 text-sky-600 mt-0.5" />
              <span>
                Powered by native <strong>Firebase Authentication</strong> (Email/Password &amp; Google). Zero-Trust security rules.
              </span>
            </div>
          </motion.div>

          {/* Bottom Security Footer */}
          <div className="mt-6 text-center text-xs text-stone-500 space-y-1">
            <p className="flex items-center justify-center gap-1 font-medium">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>SkillAlign Intelligence Platform &bull; Native Firebase Integration</span>
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="border-t border-stone-200/80 bg-white/60 py-4 text-center text-xs text-stone-500">
        SkillAlign &copy; {new Date().getFullYear()} &bull; Real Firebase Authentication &amp; Cloud Firestore
      </footer>
    </div>
  );
};
