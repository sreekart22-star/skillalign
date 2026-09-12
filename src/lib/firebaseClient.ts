import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Role, UserProfile } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): Error {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map((p) => ({
        providerId: p.providerId,
        email: p.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Operation Error:', JSON.stringify(errInfo));
  return new Error(JSON.stringify(errInfo));
}

// Initialize Firebase App instance safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Cloud Firestore using the configured database ID
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Check if Firebase is configured properly
export const isFirebaseConfigured = (): boolean => {
  return Boolean(firebaseConfig?.apiKey && firebaseConfig?.projectId);
};

// Validate connection to Firestore on boot
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore connection warning: client is offline.');
    }
    return false;
  }
}

// Google Sign-In with real Firebase Authentication
export async function signInWithGoogle(): Promise<{ user: FirebaseUser | null; error: Error | null }> {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    return { user: result.user, error: null };
  } catch (err: any) {
    console.error('Firebase Google Sign-In error:', err);
    let errorToReturn = err instanceof Error ? err : new Error(String(err));
    if (err?.code === 'auth/unauthorized-domain' || (err?.message && err.message.includes('unauthorized-domain'))) {
      const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'skillalign-ksmc.vercel.app';
      errorToReturn = new Error(
        `Firebase Error (auth/unauthorized-domain): The domain '${currentDomain}' is not authorized in Firebase Console. Please add '${currentDomain}' in Firebase Console > Authentication > Settings > Authorized domains.`
      );
    }
    return { user: null, error: errorToReturn };
  }
}

// Action code settings for Passwordless Email Sign-In link
const getActionCodeSettings = () => {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  return {
    url: `${origin}${pathname}`,
    handleCodeInApp: true,
  };
};

// Send real passwordless email sign-in link via Firebase Authentication
export async function sendPasswordlessEmailLink(
  email: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const actionCodeSettings = getActionCodeSettings();
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('skillalign_email_for_sign_in', email);
    }
    return { success: true, error: null };
  } catch (err: any) {
    console.error('Firebase sendSignInLinkToEmail error:', err);
    let errorToReturn = err instanceof Error ? err : new Error(String(err));
    if (err?.code === 'auth/unauthorized-domain' || (err?.message && err.message.includes('unauthorized-domain'))) {
      const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'skillalign-ksmc.vercel.app';
      errorToReturn = new Error(
        `Firebase Error (auth/unauthorized-domain): The domain '${currentDomain}' is not authorized in Firebase Console. Please add '${currentDomain}' in Firebase Console > Authentication > Settings > Authorized domains.`
      );
    }
    return { success: false, error: errorToReturn };
  }
}

// Check if current URL is a Firebase email sign-in link
export function checkIsEmailSignInLink(): boolean {
  if (typeof window === 'undefined') return false;
  return isSignInWithEmailLink(auth, window.location.href);
}

// Verify email sign-in link with real Firebase Authentication
export async function completeEmailLinkSignIn(
  email: string
): Promise<{ user: FirebaseUser | null; error: Error | null }> {
  try {
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      throw new Error('Current URL is not a valid Firebase sign-in email link.');
    }
    const result = await signInWithEmailLink(auth, email, window.location.href);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('skillalign_email_for_sign_in');
    }
    return { user: result.user, error: null };
  } catch (err: any) {
    console.error('Firebase completeEmailLinkSignIn error:', err);
    let errorToReturn = err instanceof Error ? err : new Error(String(err));
    if (err?.code === 'auth/unauthorized-domain' || (err?.message && err.message.includes('unauthorized-domain'))) {
      const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'skillalign-ksmc.vercel.app';
      errorToReturn = new Error(
        `Firebase Error (auth/unauthorized-domain): The domain '${currentDomain}' is not authorized in Firebase Console. Please add '${currentDomain}' in Firebase Console > Authentication > Settings > Authorized domains.`
      );
    }
    return { user: null, error: errorToReturn };
  }
}

// Sign out using real Firebase Auth
export async function logOut(): Promise<{ success: boolean; error: Error | null }> {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (err: any) {
    console.error('Firebase signOut error:', err);
    return { success: false, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

// Fetch user profile from Cloud Firestore (/users/{userId})
export async function fetchUserProfile(
  uid: string
): Promise<{ profile: UserProfile | null; error: Error | null }> {
  const path = `users/${uid}`;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const data = snap.data();
      const profile: UserProfile = {
        id: uid,
        email: data.email || '',
        full_name: data.fullName || data.full_name || '',
        avatar_url: data.avatarUrl || data.avatar_url || '',
        auth_provider: data.authProvider || data.auth_provider || 'email',
        selected_workspace: data.selectedWorkspace || data.selected_workspace || undefined,
        created_at: data.createdAt || undefined,
        updated_at: data.updatedAt || undefined,
      };
      return { profile, error: null };
    }
    return { profile: null, error: null };
  } catch (err: any) {
    console.error('fetchUserProfile Firestore error:', err);
    return { profile: null, error: handleFirestoreError(err, OperationType.GET, path) };
  }
}

// Upsert user profile in Cloud Firestore (/users/{userId})
export async function upsertUserProfile(params: {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  authProvider?: string;
  selectedWorkspace?: Role;
}): Promise<{ profile: UserProfile | null; error: Error | null }> {
  const path = `users/${params.id}`;
  try {
    const userDocRef = doc(db, 'users', params.id);
    const snap = await getDoc(userDocRef);
    const existing = snap.exists() ? snap.data() : null;

    const payload = {
      id: params.id,
      email: params.email,
      fullName: params.fullName || existing?.fullName || existing?.full_name || params.email.split('@')[0],
      avatarUrl: params.avatarUrl || existing?.avatarUrl || existing?.avatar_url || '',
      authProvider: params.authProvider || existing?.authProvider || 'google',
      selectedWorkspace: params.selectedWorkspace || existing?.selectedWorkspace || null,
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(userDocRef, payload, { merge: true });

    const profile: UserProfile = {
      id: params.id,
      email: payload.email,
      full_name: payload.fullName,
      avatar_url: payload.avatarUrl,
      auth_provider: payload.authProvider,
      selected_workspace: (payload.selectedWorkspace as Role) || undefined,
      created_at: payload.createdAt,
      updated_at: payload.updatedAt,
    };

    return { profile, error: null };
  } catch (err: any) {
    console.error('upsertUserProfile Firestore error:', err);
    return { profile: null, error: handleFirestoreError(err, OperationType.WRITE, path) };
  }
}

// Save selected workspace to Firestore profile
export async function saveUserWorkspace(
  uid: string,
  workspace: Role
): Promise<{ success: boolean; error: Error | null }> {
  const path = `users/${uid}`;
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      selectedWorkspace: workspace,
      updatedAt: new Date().toISOString(),
    });
    return { success: true, error: null };
  } catch (err: any) {
    console.error('saveUserWorkspace Firestore error:', err);
    return { success: false, error: handleFirestoreError(err, OperationType.UPDATE, path) };
  }
}
