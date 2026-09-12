import { Role, UserProfile } from '../types';

export interface LocalAuthUser {
  uid: string;
  email: string;
  phoneNumber?: string;
  fullName: string;
  avatarUrl?: string;
  authProvider: string;
  role?: 'student' | 'faculty' | 'industry' | 'admin' | 'institution';
  verificationStatus?: 'Pending' | 'Under Review' | 'Verified' | 'Rejected' | 'Suspended';
  academicInfo?: {
    institute?: string;
    university?: string;
    degree?: string;
    department?: string;
    academicYear?: string;
    rollNo?: string;
  };
}

const STORAGE_SESSION_KEY = 'skillalign_session_v1';
const STORAGE_USERS_KEY = 'skillalign_registered_users_v1';

const DEFAULT_USERS: LocalAuthUser[] = [
  {
    uid: 'usr_default_aarav_001',
    email: 'aarav.sharma@institution.edu',
    phoneNumber: '+919876543210',
    fullName: 'Aarav Sharma',
    avatarUrl: '',
    authProvider: 'email',
    role: 'student',
  },
  {
    uid: 'usr_default_faculty_002',
    email: 'dr.mehta@institution.edu',
    phoneNumber: '+919876543211',
    fullName: 'Dr. Rajesh Mehta',
    avatarUrl: '',
    authProvider: 'email',
    role: 'faculty',
  },
  {
    uid: 'usr_default_industry_003',
    email: 'recruiter@techcorp.com',
    phoneNumber: '+919876543212',
    fullName: 'Ananya Roy (TechCorp)',
    avatarUrl: '',
    authProvider: 'email',
    role: 'industry',
  },
  {
    uid: 'usr_default_admin_004',
    email: 'admin@skillalign.edu',
    phoneNumber: '+919876543213',
    fullName: 'System Administrator',
    avatarUrl: '',
    authProvider: 'email',
    role: 'admin',
  },
];

function getStoredUsers(): LocalAuthUser[] {
  try {
    if (typeof window === 'undefined') return DEFAULT_USERS;
    const raw = window.localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_USERS;
  } catch {
    return DEFAULT_USERS;
  }
}

function saveStoredUsers(users: LocalAuthUser[]) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch {}
}

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

// Local Demo Registration
export async function registerUser(params: {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'student' | 'faculty' | 'industry' | 'institution';
  academicInfo?: {
    institute?: string;
    university?: string;
    degree?: string;
    department?: string;
    academicYear?: string;
    rollNo?: string;
  };
}): Promise<{ user: LocalAuthUser | null; error: Error | null }> {
  try {
    const users = getStoredUsers();
    const emailLower = params.email.trim().toLowerCase();
    
    if (users.some((u) => u.email.toLowerCase() === emailLower)) {
      return { user: null, error: new Error('An account with this email address already exists.') };
    }

    const newUser: LocalAuthUser = {
      uid: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      fullName: params.fullName.trim(),
      email: params.email.trim(),
      phoneNumber: params.phoneNumber.trim(),
      authProvider: 'email',
      role: params.role || 'student',
      verificationStatus: 'Pending',
      academicInfo: params.academicInfo || {},
    };

    users.push(newUser);
    saveStoredUsers(users);
    setCurrentAuthUser(newUser);

    const workspaceRole = params.role === 'faculty' ? 'Faculty' : params.role === 'industry' ? 'Employer' : params.role === 'institution' ? 'Institution' : 'Student';

    upsertUserProfile({
      id: newUser.uid,
      email: newUser.email,
      fullName: newUser.fullName,
      authProvider: 'email',
      selectedWorkspace: workspaceRole as Role,
    });

    return { user: newUser, error: null };
  } catch (err: any) {
    return { user: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

// Local Demo Login
export async function loginUser(
  identifier: string,
  password: string
): Promise<{ user: LocalAuthUser | null; error: Error | null }> {
  try {
    const users = getStoredUsers();
    const cleanId = identifier.trim().toLowerCase();

    const user = users.find(
      (u) => u.email.toLowerCase() === cleanId || (u.phoneNumber && u.phoneNumber.toLowerCase() === cleanId)
    );

    if (!user) {
      return { user: null, error: new Error('Account not found. Please check your email or register a new account.') };
    }

    if (!password || password.length < 3) {
      return { user: null, error: new Error('Please enter a valid password.') };
    }

    setCurrentAuthUser(user);
    return { user, error: null };
  } catch (err: any) {
    return { user: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

// Local Demo Phone Login
export async function loginWithPhone(
  phone: string,
  password: string
): Promise<{ user: LocalAuthUser | null; error: Error | null }> {
  try {
    const users = getStoredUsers();
    const cleanPhone = phone.trim();

    const user = users.find((u) => u.phoneNumber === cleanPhone || u.phoneNumber?.includes(cleanPhone));

    if (!user) {
      return { user: null, error: new Error('Phone number not found. Please register or sign in with email.') };
    }

    if (!password || password.length < 3) {
      return { user: null, error: new Error('Please enter a valid password.') };
    }

    setCurrentAuthUser(user);
    return { user, error: null };
  } catch (err: any) {
    return { user: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

// Quick Demo Role Login
export async function loginAsDemoRole(
  role: 'student' | 'faculty' | 'industry' | 'admin'
): Promise<{ user: LocalAuthUser | null; error: Error | null }> {
  try {
    const users = getStoredUsers();
    let user = users.find((u) => u.role === role);
    if (!user) {
      user = {
        uid: `usr_demo_${role}_${Date.now()}`,
        email: `${role}@skillalign.demo`,
        fullName: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)} User`,
        authProvider: 'demo',
        role,
      };
      users.push(user);
      saveStoredUsers(users);
    }
    setCurrentAuthUser(user);
    return { user, error: null };
  } catch (err: any) {
    return { user: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

// Password Reset
export async function sendPasswordReset(email: string): Promise<{ success: boolean; error: Error | null }> {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, error: new Error('Please enter a valid email address.') };
    }
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: new Error('Unable to process your password reset request. Please try again.') };
  }
}

// Logout
export async function logoutUser(): Promise<{ success: boolean; error: Error | null }> {
  try {
    setCurrentAuthUser(null);
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: new Error(String(err)) };
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
