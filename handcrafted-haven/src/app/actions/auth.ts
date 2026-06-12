'use server'
// src/app/actions/auth.ts
// Server Actions for login, register, and logout.
// These run on the server — never expose secrets to the client.

import { redirect } from 'next/navigation';
import { createSession, deleteSession } from '@/lib/session';
import {
  getUserByEmail,
  createUser,
  hashPassword,
  verifyPassword,
} from '@/lib/auth-users';

// ── Types ───────────────────────────────────────────────────────────────────

export type AuthState = {
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    general?: string;
  };
  success?: boolean;
};

// ── Register ────────────────────────────────────────────────────────────────

export async function registerAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name     = (formData.get('name')     as string)?.trim();
  const email    = (formData.get('email')    as string)?.trim().toLowerCase();
  const password = (formData.get('password') as string);
  const role     = (formData.get('role')     as string) as 'buyer' | 'seller';

  // ── Validation ──────────────────────────────────────────────────────────
  const errors: AuthState['errors'] = {};

  if (!name || name.length < 2)
    errors.name = 'Name must be at least 2 characters.';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Please enter a valid email address.';

  if (!password || password.length < 8)
    errors.password = 'Password must be at least 8 characters.';

  if (password && !/[0-9]/.test(password))
    errors.password = 'Password must contain at least one number.';

  if (!role || !['buyer', 'seller'].includes(role))
    errors.role = 'Please select a role.';

  if (Object.keys(errors).length > 0) return { errors };

  // ── Check duplicate email ────────────────────────────────────────────────
  const existing = getUserByEmail(email);
  if (existing) {
    return { errors: { email: 'An account with this email already exists.' } };
  }

  // ── Create user and session ──────────────────────────────────────────────
  const passwordHash = await hashPassword(password);
  const user = createUser({ name, email, passwordHash, role, provider: 'credentials' });

  await createSession({
    id:       user.id,
    name:     user.name,
    email:    user.email,
    role:     user.role,
    provider: 'credentials',
  });

  // Redirect based on role
  redirect(role === 'seller' ? '/seller/dashboard' : '/');
}

// ── Login ────────────────────────────────────────────────────────────────────

export async function loginAction(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email    = (formData.get('email')    as string)?.trim().toLowerCase();
  const password = (formData.get('password') as string);

  // ── Validation ──────────────────────────────────────────────────────────
  const errors: AuthState['errors'] = {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Please enter a valid email address.';

  if (!password)
    errors.password = 'Password is required.';

  if (Object.keys(errors).length > 0) return { errors };

  // ── Verify credentials ──────────────────────────────────────────────────
  const user = getUserByEmail(email);

  if (!user || user.provider !== 'credentials') {
    return { errors: { general: 'Invalid email or password.' } };
  }

  const passwordMatch = await verifyPassword(password, user.passwordHash);
  if (!passwordMatch) {
    return { errors: { general: 'Invalid email or password.' } };
  }

  // ── Create session ───────────────────────────────────────────────────────
  await createSession({
    id:       user.id,
    name:     user.name,
    email:    user.email,
    role:     user.role,
    provider: 'credentials',
  });

  redirect(user.role === 'seller' ? '/seller/dashboard' : '/');
}

// ── Logout ───────────────────────────────────────────────────────────────────

export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect('/');
}