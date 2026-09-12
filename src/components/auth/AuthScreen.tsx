import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Mail,
  ArrowRight,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Sparkles,
  ChevronLeft,
  Loader2,
  Send,
  ExternalLink,
} from 'lucide-react';
import {
  signInWithGoogle,
  sendPasswordlessEmailLink,
  checkIsEmailSignInLink,
  completeEmailLinkSignIn,
  isFirebaseConfigured,
} from '../../lib/firebaseClient';
import { AuthState } from '../../types';

interface AuthScreenProps {
  onAuthenticated: (user: any) => void;
  initialState?: AuthState;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated, initialState = 'LOGIN' }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const [email, setEmail] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('skillalign_email_for_sign_in') || '';
    }
    return '';
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const isConfigured = isFirebaseConfigured();

  // Handle incoming email link verification automatically on component mount
  useEffect(() => {
    if (checkIsEmailSignInLink()) {
      setAuthState('VERIFYING_LINK');
      const savedEmail = window.localStorage.getItem('skillalign_email_for_sign_in') || email;
      if (savedEmail) {
        completeEmailLinkSignIn(savedEmail).then(({ user, error }) => {
          if (error) {
            setErrorMessage(error.message || 'Email link verification failed or link has expired.');
            setAuthState('AUTH_ERROR');
          } else if (user) {
            setSuccessMessage('Email verified successfully. Signing in...');
            setAuthState('AUTHENTICATED');
            onAuthenticated(user);
          }
        });
      } else {
        // Need user to confirm the email address used for this link
        setAuthState('EMAIL_ENTERED');
        setErrorMessage('Please confirm your email address to complete verification.');
      }
    }
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Handle Google Sign-In with Firebase Auth
  const handleGoogleSignIn = async () => {
    if (!isConfigured) {
      setErrorMessage('Firebase is not configured yet. Please check project settings.');
      return;
    }

    setErrorMessage(null);
    setAuthState('GOOGLE_AUTHENTICATING');

    try {
      const { user, error } = await signInWithGoogle();
      if (error) {
        setErrorMessage(error.message || 'Google sign-in was cancelled or failed.');
        setAuthState('LOGIN');
      } else if (user) {
        setSuccessMessage('Google sign-in successful.');
        setAuthState('AUTHENTICATED');
        onAuthenticated(user);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred during Google sign-in.');
      setAuthState('LOGIN');
    }
  };

  // Handle Send Passwordless Email Verification Link
  const handleSendEmailLink = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      setAuthState('EMAIL_ENTERED');
      return;
    }

    if (!isConfigured) {
      setErrorMessage('Firebase Authentication is not configured yet.');
      return;
    }

    setErrorMessage(null);
    setAuthState('SENDING_LINK');

    try {
      const { success, error } = await sendPasswordlessEmailLink(cleanEmail);
      if (error) {
        setErrorMessage(error.message || 'Failed to send verification email link.');
        setAuthState('LOGIN');
      } else if (success) {
        setSuccessMessage(`Secure sign-in link sent to ${cleanEmail}`);
        setAuthState('LINK_SENT');
        setResendCooldown(60);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error initiating passwordless email sign-in.');
      setAuthState('LOGIN');
    }
  };

  // Manual completion of email link verification if needed
  const handleManualCompleteEmailLink = async () => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage('Please enter the email address you used to request the sign-in link.');
      return;
    }

    setErrorMessage(null);
    setAuthState('VERIFYING_LINK');

    const { user, error } = await completeEmailLinkSignIn(cleanEmail);
    if (error) {
      setErrorMessage(error.message || 'Could not verify link. Please request a new link.');
      setAuthState('AUTH_ERROR');
    } else if (user) {
      setSuccessMessage('Verified successfully!');
      setAuthState('AUTHENTICATED');
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
            <div className="text-center mb-7">
              <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-slate-900 text-white shadow-md mb-3.5">
                <ShieldCheck className="size-6 text-sky-400" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                SKILLALIGN
              </h1>
              <p className="text-xs font-bold text-sky-800 mt-1">
                &ldquo;Bridging the Gap Between Education, Skills & Industry.&rdquo;
              </p>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                &ldquo;Verify skills. Discover opportunities. Align talent with industry.&rdquo;
              </p>
            </div>

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

            {/* VIEW 1: LOGIN ENTRY (Google + Email) */}
            {(authState === 'LOGIN' ||
              authState === 'EMAIL_ENTERED' ||
              authState === 'SENDING_LINK' ||
              authState === 'GOOGLE_AUTHENTICATING') && (
              <div className="space-y-4">
                {/* Real Google Sign-In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={authState === 'GOOGLE_AUTHENTICATING' || authState === 'SENDING_LINK'}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-stone-300 bg-white text-slate-800 text-sm font-bold shadow-xs hover:bg-stone-50 hover:border-stone-400 active:scale-[0.99] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {authState === 'GOOGLE_AUTHENTICATING' ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-sky-600" />
                      <span>Connecting to Google...</span>
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

                {/* Divider */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="w-full border-t border-stone-200" />
                  <span className="bg-white px-3 text-[11px] font-bold text-slate-700 uppercase tracking-wider relative">
                    Or continue with email
                  </span>
                </div>

                {/* Passwordless Email Form */}
                <form onSubmit={handleSendEmailLink} className="space-y-3">
                  <div>
                    <label htmlFor="auth-email-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="auth-email-input"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrorMessage(null);
                        }}
                        placeholder="you@institution.edu or you@company.com"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
                        disabled={authState === 'SENDING_LINK'}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={authState === 'SENDING_LINK' || !email.trim()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-sm hover:bg-slate-800 active:scale-[0.99] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {authState === 'SENDING_LINK' ? (
                      <>
                        <Loader2 className="size-4 animate-spin text-sky-400" />
                        <span>Sending Verification Link...</span>
                      </>
                    ) : (
                      <>
                        <Send className="size-4 text-sky-400" />
                        <span>Continue with Email</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Security Note */}
                <div className="mt-4 pt-4 border-t border-stone-100 flex items-start gap-2 text-[11px] text-slate-700">
                  <Lock className="size-3.5 shrink-0 text-sky-700 mt-0.5" />
                  <span>
                    Powered by native <strong>Firebase Authentication</strong>. Secure passwordless sign-in with Zero-Trust Firestore Security Rules.
                  </span>
                </div>
              </div>
            )}

            {/* VIEW 2: PASSWORDLESS EMAIL LINK SENT */}
            {(authState === 'LINK_SENT' || authState === 'VERIFYING_LINK' || authState === 'AUTH_ERROR') && (
              <div className="space-y-4">
                <div className="text-center pb-2">
                  <div className="size-12 rounded-full bg-sky-50 border border-sky-200 text-sky-700 mx-auto grid place-items-center mb-2.5">
                    <Mail className="size-6" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Verify Your Email</h2>
                  <p className="text-xs text-slate-600 mt-1">
                    We sent a secure sign-in link to:
                  </p>
                  <p className="text-xs font-mono font-bold text-sky-800 bg-sky-50 py-1 px-2 rounded-md inline-block mt-1">
                    {email}
                  </p>
                </div>

                <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-3.5 text-xs text-slate-600 space-y-1.5">
                  <p className="font-semibold text-slate-800">Next Steps:</p>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Open your inbox and find the email from SkillAlign / Firebase.</li>
                    <li>Click the secure <strong>Sign In</strong> link in the email.</li>
                    <li>You will be instantly verified and redirected into your workspace.</li>
                  </ol>
                </div>

                {checkIsEmailSignInLink() && (
                  <button
                    type="button"
                    onClick={handleManualCompleteEmailLink}
                    disabled={authState === 'VERIFYING_LINK'}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold shadow-xs hover:bg-sky-500 transition cursor-pointer"
                  >
                    {authState === 'VERIFYING_LINK' ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin text-white" />
                        <span>Verifying Firebase Link...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="size-3.5" />
                        <span>Confirm Email Link on This Device</span>
                      </>
                    )}
                  </button>
                )}

                {/* Actions: Resend & Change Email */}
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthState('LOGIN');
                      setErrorMessage(null);
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
                  >
                    <ChevronLeft className="size-3.5" />
                    <span>Change Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSendEmailLink()}
                    disabled={resendCooldown > 0 || authState === 'SENDING_LINK'}
                    className="inline-flex items-center gap-1 font-bold text-sky-700 hover:text-sky-900 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                  >
                    <RefreshCw className={`size-3.5 ${authState === 'SENDING_LINK' ? 'animate-spin' : ''}`} />
                    <span>{resendCooldown > 0 ? `Resend link (${resendCooldown}s)` : 'Resend link'}</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Bottom Security Footer */}
          <div className="mt-6 text-center text-xs text-slate-700 space-y-1">
            <p className="flex items-center justify-center gap-1 font-medium">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>SkillAlign Intelligence Platform &bull; Native Firebase Integration</span>
            </p>
            <p className="text-[11px] text-slate-700">
              Verified Skills &bull; Automated Verification &bull; Attribute-Based Access Control
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="border-t border-stone-200/80 bg-white/60 py-4 text-center text-xs text-slate-700">
        SkillAlign &copy; {new Date().getFullYear()} &bull; Real Firebase Authentication &amp; Cloud Firestore
      </footer>
    </div>
  );
};
