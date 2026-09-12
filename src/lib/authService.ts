import { Role, UserProfile } from '../types';

export interface LocalAuthUser {
  uid: string;
  email: string;
  phoneNumber?: string;
  fullName: string;
  avatarUrl?: string;
  authProvider: string;
  role?: 'student' | 'faculty' | 'industry' | 'admin';
}

const STORAGE_SESSION_KEY = 'skillalign_session_v1';

const DEFAULT_USER: LocalAuthUser = {
  uid: 'usr_default_aarav_001',
  email: 'aarav.sharma@institution.edu',
  phoneNumber: '+919876543210',
  fullName: 'Aarav Sharma',
  avatarUrl: '',
  authProvider: 'email',
  role: 'student',
};

// Auth state listeners
type AuthListener = (user: LocalAuthUser | null) => void;
const listeners: AuthListener[] = [];

export function subscribeAuth(listener: AuthListener) {
  listeners.push(listener);
  listener(getCurrentAuthUser());
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

function notifyListeners(user: LocalAuthUser | null) {
  listeners.forEach((l) => l(user));
}

export function getCurrentAuthUser(): LocalAuthUser | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(STORAGE_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentAuthUser(user: LocalAuthUser | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    window.localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(STORAGE_SESSION_KEY);
  }
  notifyListeners(user);
}

// Register user via Backend API
export async function registerUser(params: {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'student' | 'faculty' | 'industry' | 'admin';
}): Promise<{ user: LocalAuthUser | null; error: Error | null }> {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    if (!res.ok) {
      return { user: null, error: new Error(data.error || 'Registration failed') };
    }
    const authUser: LocalAuthUser = {
      uid: data.user.id,
      email: data.user.email,
      phoneNumber: data.user.phone,
      fullName: data.user.fullName,
      authProvider: 'email',
      role: data.user.role,
    };
    setCurrentAuthUser(authUser);
    upsertUserProfile({
      id: authUser.uid,
      email: authUser.email,
      fullName: authUser.fullName,
      authProvider: 'email',
      selectedWorkspace: (authUser.role === 'faculty' ? 'College' : authUser.role === 'industry' ? 'Industry' : authUser.role === 'admin' ? 'Admin' : 'Student') as Role,
    });
    return { user: authUser, error: null };
  } catch (err: any) {
    // Fallback local registration if server unreachable
    return { user: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

// Login user via Backend API
export async function loginUser(
  identifier: string,
  password: string
): Promise<{ user: LocalAuthUser | null; error: Error | null }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { user: null, error: new Error(data.error || 'Login failed') };
    }
    const authUser: LocalAuthUser = {
      uid: data.user.id,
      email: data.user.email,
      phoneNumber: data.user.phone,
      fullName: data.user.fullName,
      authProvider: 'email',
      role: data.user.role,
    };
    setCurrentAuthUser(authUser);
    return { user: authUser, error: null };
  } catch (err: any) {
    return { user: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

// Phone Login via Backend API
export async function loginWithPhone(
  phone: string,
  password: string
): Promise<{ user: LocalAuthUser | null; error: Error | null }> {
  try {
    const res = await fetch('/api/auth/phone-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { user: null, error: new Error(data.error || 'Phone login failed') };
    }
    const authUser: LocalAuthUser = {
      uid: data.user.id,
      email: data.user.email,
      phoneNumber: data.user.phone,
      fullName: data.user.fullName,
      authProvider: 'phone',
      role: data.user.role,
    };
    setCurrentAuthUser(authUser);
    return { user: authUser, error: null };
  } catch (err: any) {
    return { user: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

// Password Reset via Backend API
export async function sendPasswordReset(email: string): Promise<{ success: boolean; error: Error | null }> {
  try {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: new Error(data.error || 'Password reset request failed') };
    }
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

// Logout
export async function logoutUser(): Promise<{ success: boolean; error: Error | null }> {
  try {
    setCurrentAuthUser(null);
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

// Profile management in localStorage
const STORAGE_PROFILES_KEY = 'skillalign_profiles_v1';

export async function fetchUserProfile(uid: string): Promise<{ profile: UserProfile | null; error: Error | null }> {
  try {
    if (typeof window === 'undefined') return { profile: null, error: null };
    const raw = window.localStorage.getItem(STORAGE_PROFILES_KEY);
    const profiles: Record<string, UserProfile> = raw ? JSON.parse(raw) : {};
    
    if (profiles[uid]) {
      return { profile: profiles[uid], error: null };
    }

    const defaultProfile: UserProfile = {
      id: uid,
      email: 'aarav.sharma@institution.edu',
      full_name: 'Aarav Sharma',
      avatar_url: '',
      auth_provider: 'email',
      selected_workspace: 'Student',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    profiles[uid] = defaultProfile;
    window.localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
    return { profile: defaultProfile, error: null };
  } catch (err: any) {
    return { profile: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

export async function upsertUserProfile(params: {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  authProvider?: string;
  selectedWorkspace?: Role;
}): Promise<{ profile: UserProfile | null; error: Error | null }> {
  try {
    if (typeof window === 'undefined') return { profile: null, error: null };
    const raw = window.localStorage.getItem(STORAGE_PROFILES_KEY);
    const profiles: Record<string, UserProfile> = raw ? JSON.parse(raw) : {};

    const existing = profiles[params.id];
    const updated: UserProfile = {
      id: params.id,
      email: params.email,
      full_name: params.fullName || existing?.full_name || params.email.split('@')[0],
      avatar_url: params.avatarUrl || existing?.avatar_url || '',
      auth_provider: params.authProvider || existing?.auth_provider || 'email',
      selected_workspace: params.selectedWorkspace || existing?.selected_workspace || undefined,
      created_at: existing?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    profiles[params.id] = updated;
    window.localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
    return { profile: updated, error: null };
  } catch (err: any) {
    return { profile: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

export async function saveUserWorkspace(uid: string, workspace: Role): Promise<{ success: boolean; error: Error | null }> {
  try {
    if (typeof window === 'undefined') return { success: true, error: null };
    const raw = window.localStorage.getItem(STORAGE_PROFILES_KEY);
    const profiles: Record<string, UserProfile> = raw ? JSON.parse(raw) : {};
    if (profiles[uid]) {
      profiles[uid].selected_workspace = workspace;
      profiles[uid].updated_at = new Date().toISOString();
      window.localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
    }
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err instanceof Error ? err : new Error(String(err)) };
  }
}
